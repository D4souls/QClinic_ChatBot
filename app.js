import express from 'express';
import bodyParser from "body-parser";
import { botQuery, testQuery } from './database.js';
import { callAssistant } from './chatBot/chatbot.js'
import { formatBotResponse } from './database.js';
import { filterQuery } from './chatBot/Functions/filterQuery.js';

const app = express();
app.use(bodyParser.json());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({message:"Something broke!", error: err.message});
});

const port = 4047;
const ip = `http://localhost:${port}`;

app.listen(port, () => {
    console.log(`[?] Server is running on ${ip}`)
})

app.get("/test", async (req, res) => {
    
    try {
        
        const test = await testQuery();

        if (test.success){
            return res.status(200).send(test.data)
        } else if (!test.success) {
            return res.status(404).send(test.error)
        }

        return res.status(403).send({status: 403, data: test.error})

    } catch (error) {
        return res.status(500).send(error.message)
    }
});

app.post("/assistant", async (req, res) => {
    
    try {
        const prompt = req.body.prompt;

        const assistant = await callAssistant(prompt);
        const formattedPrompt = formatBotResponse(assistant);

        // Filter query
        if (await filterQuery(formattedPrompt, prompt)) return res.status(403).send({status: 403, data: "Banned action detected"});

        if (formattedPrompt){           
            const executeQuery = await botQuery(formattedPrompt);

            if (executeQuery.success) {
                return res.status(200).send({status: 200, data: executeQuery.data});
            }

            return res.status(404).send({status: 404, data: executeQuery.error});
        }

        return res.status(404).send({status: 404, data: executeQuery.error});

    } catch (error) {
        return res.status(500).send({status: 500, data: error.message});
    }
});