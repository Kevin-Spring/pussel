const express = require('express');
const fs = require('fs');
const cors = require('cors');
const { getDailySeed } = require('./daily');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Load existing results
const resultsFile = './results.json';

function loadResults() {
	try {
		const data = fs.readFileSync(resultsFile, 'utf8');
		return JSON.parse(data);
	} catch {
		return [];
	}
}

function saveResult(newResult) {
	const results = loadResults();
	results.push(newResult);
	fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
}

// GET /daily-seed
app.get('/daily-seed', (req, res) => {
	const seed = getDailySeed();
	res.json({ seed });
});

// GET /results
app.get('/results', (req, res) => {
	const results = loadResults();
	res.json(results);
});

// POST /results
app.post('/results', (req, res) => {
	const { moves, time, date, isDaily, mode } = req.body;

	if (typeof moves !== 'number' || typeof time !== 'number') {
		return res.status(400).json({ error: 'Invalid data' });
	}

	const newResult = {
		moves,
		time,
		date: date || new Date().toISOString(),
		isDaily: !!isDaily,
		mode: mode || 'unknown',
	};

	saveResult(newResult);
	res.status(201).json({ message: 'Result saved' });
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
