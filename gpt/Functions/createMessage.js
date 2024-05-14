import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

export async function createMessage(msg, threadID){
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    // Create new message
    const message = await openai.beta.threads.messages.create(threadID, {
        role: 'user',
        content: msg
    });
    
    console.log(`New message created!\nMessage: ${msg}\nThreadID: ${threadID}`);
}


// const threadID = process.env.OPENAI_ASSISTANT_THREAD_ID;
// const message = "Quiero cambiar mi contraseña";
// createMessage(message, threadID).catch(err => console.error(err));