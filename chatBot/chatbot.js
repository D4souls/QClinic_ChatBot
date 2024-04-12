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

