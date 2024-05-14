import OpenAI from "openai";
import dotenv from 'dotenv';
import { writeFileSync } from 'fs';
import { assistantInstructions } from "../instructions.js";

dotenv.config();

export async function createAssistant(){
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const createAssistant = await openai.beta.assistants.create({
        name: "QClinic Assistant",
        model: 'gpt-3.5-turbo-16k-0613',
        instructions: assistantInstructions
    });

    console.log(`New assistant created!\nName: ${createAssistant.name}\nId: ${createAssistant.id}`);
}

createAssistant().catch(err => console.error(err));
