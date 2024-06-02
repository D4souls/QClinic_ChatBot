import { extractSQLQuery, filterSQLQuery, filterSQLBannedQuery } from '../utils/extractSQLQuery.js';
import { callAssistant } from './chatbot.js'
import { botQuery } from '../database.js';
import { prettyResponse } from '../utils/createPrettyResponse.js';
import { logBannedQuery } from '../utils/logBannedQuery.js';

// Ollama functions
export async function executeAsync(userPrompt){
    
    if (!userPrompt) return false;

     console.log(`[INFO] [LLAMA3] User message: ${userPrompt}`);

    try {
        
        
        const startTime = process.hrtime();
        
        console.time("[INFO] [LLAMA3] Time");

        const AIRes = await callAssistant(userPrompt); 

        console.timeEnd("[INFO] [LLAMA3] Time");

        const endTime = process.hrtime(startTime);

        // Format time to miliseconds
        const responseTime = (endTime[0] + endTime[1] / 1e9).toFixed(2);

        const firstFilter = filterSQLQuery(AIRes.response);
        if (firstFilter){

            const executeQuery = await botQuery(AIRes.response);
            return executeQuery;

        } else {

            const queryType = extractSQLQuery(AIRes.response);

            if (queryType.status) {
    
                // Filter query type
                const filterQuery = filterSQLBannedQuery(queryType.data);
                if (filterQuery) {

                    await logBannedQuery(queryType.data, userPrompt, responseTime);

                    return { data: "Banned action detected", type: 'BannedAction' };
                }
    
                const executeQuery = await botQuery(queryType.data);
                if (executeQuery.type == 'SELECT') return executeQuery;
                
                const createPrettyResponse = await prettyResponse(executeQuery);
                 return { data: createPrettyResponse.data, type: createPrettyResponse.type };
    
            } else {
                return { data: AIRes, type: 'info' }
            }

        }


    } catch (error) {
        console.error(error);
    }
}