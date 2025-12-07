const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3500;

app.use('/', require('./routes/root'));

app.listen(PORT, () => console.log(`running api app on port ${PORT}`));