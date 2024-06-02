import { writeFile, readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export async function logBannedQuery(iaQuery, userQuery, responseTime) {
    const newEntry = {
        date: new Date().toISOString(),
        bannedSQLQuery: iaQuery,
        userPrompt: userQuery,
        responseTime: responseTime
    };

    const currentDir = dirname(fileURLToPath(import.meta.url));
    const logPath = join(currentDir, '..', 'logs/bannedActions.json');

    let logData = [];

    try {
        
        const fileContent = await readFile(logPath, 'utf-8');
        logData = JSON.parse(fileContent);
    } catch (error) {
        
        if (error.code !== 'ENOENT') {
            throw error;
        }
    }

    logData.push(newEntry);

    await writeFile(logPath, JSON.stringify(logData, null, 2), 'utf-8');
}
