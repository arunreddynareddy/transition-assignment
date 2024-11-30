const express = require('express');
const axios = require('axios');
const { evaluateChecklist } = require('./checklist');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Endpoint to fetch and evaluate the checklist
app.get('/evaluate', async (req, res) => {
    try {
        const response = await axios.get('http://qa-gb.api.dynamatix.com:3100/api/applications/getApplicationById/67339ae56d5231c1a2c63639');
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
