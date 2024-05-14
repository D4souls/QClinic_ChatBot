import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

export async function createThreat(){
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const thread = await openai.beta.threads.create();

    console.log(`New threat created!\nId: ${thread.id}`);
}

createThreat().catch(err => console.error(err));
