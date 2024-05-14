import { writeLog } from "./writeLog.js";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export async function logBannedQuery(iaQuery, userQuery){
    const newEntry = `Date: ${new Date().toISOString()} - Banned SQL query: ${iaQuery} - User prompt: ${userQuery}\n`;

    const currentDir = dirname(fileURLToPath(import.meta.url));

    const logPath = join(currentDir, '..', 'bannedActions.log');

    await writeLog(logPath, newEntry);
}