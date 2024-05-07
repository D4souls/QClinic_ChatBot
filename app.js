import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";

import { executeAsync } from './ollama.js';

import dotenv from 'dotenv'
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({message:"Something broke!", error: err.message});
});

const port = 4047;
const ip = 'localhost';
const fullAddress = `http://${ip}:${port}`;

const apiVersion = 1;
const apiPath = `/api/v${apiVersion}`

app.listen(port, () => {
    console.log(`\u001b[35m[System] Server is running on ${fullAddress}\u001b[0m`);
})


app.post(`${apiPath}/ollama`, async (req, res) => {

    const userPrompt = req.body.prompt;
    if (!userPrompt) res.status(404).send({status: 404, data: "No prompt send"});

    const AIRes = await executeAsync(userPrompt);

    return res.status(200).send({status: 200, data: AIRes.data, type: AIRes.type})

})