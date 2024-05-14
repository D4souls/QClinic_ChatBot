import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

export async function deleteAllAssistants(){
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const listAssistants = await openai.beta.assistants.list();

    for (const assistant of listAssistants.data){
        await openai.beta.assistants.del(assistant.id);
        console.log(`Assistant ${assistant.name} (${assistant.id}) deleted.`);
    }

    console.log("All assistants were deleted!");
}

deleteAllAssistants().catch(err => console.error(err));