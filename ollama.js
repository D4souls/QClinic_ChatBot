import { extractSQLQuery, filterSQLQuery, filterSQLBannedQuery } from './utils/extractSQLQuery.js';
import { callAssistant } from './chatBot/chatbot.js'
import { botQuery } from './database.js';
import { prettyResponse } from './utils/createPrettyResponse.js';

// Ollama functions
export async function executeAsync(userPrompt){
    
    if (!userPrompt) return false;

    console.log(`User message: ${userPrompt}`);

    try {
        
        const AIRes = await callAssistant(userPrompt); 

        const firstFilter = filterSQLQuery(AIRes.response);
        if (firstFilter){

            const executeQuery = await botQuery(AIRes.response);
            return { data: executeQuery.data, type: 'SQL' }

        } else {

            const queryType = extractSQLQuery(AIRes.response);

            if (queryType.status) {
    
                // Filter query type
                const filterQuery = filterSQLBannedQuery(queryType.data);
                if (filterQuery) return { data: "Banned action detected", type: 'BannedAction' };
    
                const executeQuery = await botQuery(queryType.data);
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