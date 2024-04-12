import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

export async function runAssistant(threadID, assistantID){
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const runAssistant = await openai.beta.threads.runs.create(threadID, {
        assistant_id: assistantID,
        additional_instructions: "Recuerda que si hay que crear una sentencia SQL solamente debes retornar esa si información adicional de su funcionamiento"
    });
    
    let run = await openai.beta.threads.runs.retrieve(threadID, runAssistant.id);

    while (run.status === 'in_progress' || run.status === 'queued') {
        console.log("waiting...");
        await new Promise((resolve) => setTimeout(resolve, 5000));
        run = await openai.beta.threads.runs.retrieve(threadID, runAssistant.id);
    }

    console.log("Assistant is running...");
}

// runAssistant().catch(err => console.error(err));