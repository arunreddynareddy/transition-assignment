const express = require('express');
const axios = require('axios');
const dotenv = require("dotenv");
const { evaluateChecklist } = require('./checklist');
const path = require('path');

const app = express();
dotenv.config();

const port = process.env.PORT;
const URL = process.env.APIURL;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Endpoint to fetch and evaluate the checklist
app.get('/evaluate', async (req, res) => {
    try {
        const response = await axios.get(URL);
        const data = response.data;

        const result = evaluateChecklist(data);

        res.json(result);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
