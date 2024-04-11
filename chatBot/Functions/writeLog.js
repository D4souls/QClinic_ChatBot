import fs from 'fs';

export async function writeLog(pathLog, data){
    await fs.appendFile(pathLog, data, 'utf8', (err) => {
        console.warn(`[!] Banned prompt detected!\nData: ${data}`);
        if (err) return "Error detected writing log: ", err;
    });
}