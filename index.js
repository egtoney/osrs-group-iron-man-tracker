const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const port = 3000;
const app = express();

app.use(cors());

app.use('/images/', express.static(path.join(__dirname, './images')));

app.get('/player/:username', async (req, res) => {
	try {
		const {data} = await axios.get('https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws', {
			params: {
				player: req.params.username
			}
		});
		res.send(data);
	} catch (e) {
		res.status(e.response.status).send();
	}
});

app.get('/', (req, res) => {
	res.sendFile('index.html', {root: __dirname});
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
});