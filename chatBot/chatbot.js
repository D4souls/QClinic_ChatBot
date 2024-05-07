import { ToTimeOnly } from '../utils/formatDateTime.js';

export async function callAssistant(userPrompt){
    const url = 'http://localhost:11434/api/generate'
    const dataToSend = {
        model: "qclinic_chatbot",
        prompt: userPrompt,
        stream: false,
        options: {
            temperature: 0.9,

        }
    }

    const method = { 
        method: 'POST', 
        body: JSON.stringify(dataToSend), 
        headers: { 'Content-Type': 'application/json' } 
    }


    try {
        
        const APIRes = await fetch(url, method)
            .then(response => response.text())
            .catch((error) => console.error(error))
            .then(data => {
                const json = JSON.parse(data);
                return json;
            });

        const AIFinalRes = {
            response: APIRes.response,
            created: ToTimeOnly(APIRes.created_at)
        }

        return AIFinalRes;

    } catch (error) {
        console.error(error);
    }
}

