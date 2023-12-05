const express = require('express');

const PORT = process.env.port || 3001;

const app = express();

app.listen(PROT, () => 
    console.log(`app listening at http://localhost:${PORT}`)
);