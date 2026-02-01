import { homedir } from "node:os";
import { join, resolve, win32, posix } from "node:path";

export function getProjectPath(workingDirectory: string) {
    let resolvedPath = resolve(workingDirectory);

    // On Windows, remove the drive letter (e.g., "C:" or "D:") from the path
    // to avoid it becoming part of the project ID
    if (process.platform === 'win32' && /^[a-zA-Z]:/.test(resolvedPath)) {
        resolvedPath = resolvedPath.substring(2); // Remove "C:" or "D:" etc.
    }

    const projectId = resolvedPath.replace(/[^a-zA-Z0-9]/g, '-');
    const claudeConfigDir = process.env.CLAUDE_CONFIG_DIR || join(homedir(), '.claude');
    return join(claudeConfigDir, 'projects', projectId);
}