import express from 'express';
import bodyParser from "body-parser";
import { botQuery, testQuery } from './database.js';
import { callAssistant } from './chatBot/chatbot.js'
import { formatBotResponse } from './database.js';

const app = express();
app.use(bodyParser.json());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({message:"Something broke!", error: err.message});
})

const port = 8080;
const ip = `http://localhost:${port}`;

app.listen(port, () => {
    console.log(`[?] Server is running on ${ip}`)
})

app.get("/test", async (req, res) => {
    
    try {
        
        const test = await testQuery();

        if (test.success){
            return res.status(200).send(test.data)
        }

        return res.status(404).send(test.error)

    } catch (error) {
        return res.status(500).send(error.message)
    }
});

app.post("/assistant", async (req, res) => {
    
    try {
        
        const assistant = await callAssistant(req.body.prompt);

        if (assistant){           
            const executeQuery = await botQuery(formatBotResponse(assistant));

            if (executeQuery.success) {
                return res.status(200).send({status: 200, data: executeQuery.data});
            }
        }

        return res.status(404).send(test.error)

    } catch (error) {
        return res.status(500).send(error.message)
    }
});