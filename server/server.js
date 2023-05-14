const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const colors = require('colors');

dotenv.config({
	path: './.env',
});

// -------------------------------- Application --------------------------------
const app = express();
app.use(cors());
app.use(express.json());

// -------------------------------- Staring Application -------------------------
const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
	console.log(`applicaiton running at port: ${PORT}`.bgCyan)
);

// -------------------------------- Handling HTTP Requests -----------------------

app.get('/', (req, res) => {
	res.send('Welcome home server');
});
