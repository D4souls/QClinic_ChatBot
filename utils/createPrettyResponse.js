import { callAssistant } from '../chatBot/chatbot.js';

export async function prettyResponse(info){;

    if (info.success){

        const prompt = `Devuelve al usuario un mensaje de texto indicando que se completó la operación anterior. No quiero un mensaje SQL simplemente un mensaje como por ejemplo: ¡Èxito! Todo ha funcionado a la primera.`;
    
        const AIRes = await callAssistant(prompt);

        console.log(AIRes.response);

        return {data: AIRes, type: 'info' };

    } else if (!info.success){

        const prompt = `Devuelve al usuario un mensaje de texto indicando que NO se completó la operación anterior. No quiero un mensaje SQL simplemente un mensaje como: La consulta anterior no se ha podido llevar acabo...`;
    
        const AIRes = await callAssistant(prompt);
        
        console.log(AIRes.response);

        return {data: AIRes, type: 'info' };

    } else {

        const prompt = `Devuelve al usuario un mensaje indicando que NO se completó la operación anterior.El error que se ha generado es: ${info.error}. Explica al usuario el porqué con se completó la operación anterior.`;
    
        const AIRes = await callAssistant(prompt);
        
        console.log(AIRes.response);

        return {data: AIRes, type: 'info' };
    }


}