import OpenAI from "openai";
import dotenv from 'dotenv';
import { createMessage } from "./Functions/createMessage.js";
import { runAssistant } from "./Functions/runAssistant.js";

dotenv.config();

export async function callAssistant(prompt){
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
    
    // Get threadID , assistantID & runID
    const threadID = process.env.OPENAI_ASSISTANT_THREAD_ID;
    const assistantID = await openai.beta.assistants.retrieve(
        process.env.OPENAI_ASSISTANT_ID
    );
    const runID = process.env.OPENAI_RUN_ID;
    
    // Message
    const msg = await createMessage(prompt, threadID);
    
    // Run assistant
    const run = await runAssistant(threadID, assistantID.id);
    
    const listMessages = await openai.beta.threads.messages.list(threadID);
    
    return listMessages;
}


// setTimeout(() => {
//     if (listMessages.body.data.length > 0) {
//         const message = listMessages.body.data.splice(0,2);

//         for (const data of message){
//             // Traslate datetime
//             let timestamp = data.created_at;
//             const date = new Date(timestamp * 1000);
//             const options = { timeZone: 'Europe/Madrid', hour12: false };
//             const spanishTime = date.toLocaleTimeString('es-ES', options);

//             console.log(`${spanishTime} ${data.role} > ${data.content[0].text.value}`);
//         }


//     } else {
//         console.log("No hay mensajes en el array.");
//     }
// }, 2000);

