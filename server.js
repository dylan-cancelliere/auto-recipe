const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

let data = [];

app.use(express.urlencoded());
app.use(express.json());

app.get('/api/dataa', (req, res) => {
	res.send({ data: 'abc123' });
});

app.put('/api/data', (req, res) => {
	console.log(req.body);
	console.log('this shit broke');
	res.send({ data: 'Message recieved' });
	// res.send();
});

app.listen(port, () => console.log(`Listening on port ${port}`));
