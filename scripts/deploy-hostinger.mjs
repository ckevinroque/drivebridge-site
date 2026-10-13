// Builds the site and publishes dist/ to the `hostinger` branch, with the built
// files at the top level, for Hostinger's Git deployment (which copies files
// but doesn't build). Usage: npm run deploy:hostinger
import { execFileSync } from 'node:child_process';
import { cpSync, mkdtempSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const BRANCH = 'hostinger';

const run = (cmd, args, cwd) =>
  execFileSync(cmd, args, { cwd, stdio: 'inherit', shell: cmd === 'npm' && process.platform === 'win32' });
const git = (args, cwd) => execFileSync('git', args, { cwd, encoding: 'utf8' }).trim();

run('npm', ['run', 'build']);
const source = git(['rev-parse', '--short', 'HEAD']);
const dir = mkdtempSync(join(tmpdir(), 'drivebridge-hostinger-'));

try {
  if (git(['ls-remote', '--heads', 'origin', BRANCH])) {
    run('git', ['fetch', 'origin', BRANCH]);
    run('git', ['worktree', 'add', '-B', BRANCH, dir, `origin/${BRANCH}`]);
  } else {
    run('git', ['worktree', 'add', '--detach', dir]);
    run('git', ['checkout', '--orphan', BRANCH], dir);
  }
  for (const name of readdirSync(dir)) {
    if (name !== '.git') rmSync(join(dir, name), { recursive: true, force: true });
  }
  cpSync('dist', dir, { recursive: true });
  run('git', ['add', '--all'], dir);
  if (git(['status', '--porcelain'], dir)) {
    run('git', ['commit', '-m', `Built site from ${source}`], dir);
    run('git', ['push', 'origin', BRANCH], dir);
  } else {
    console.log(`${BRANCH} is already up to date`);
  }
} finally {
  run('git', ['worktree', 'remove', '--force', dir]);
}
