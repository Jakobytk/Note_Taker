const express = require('express');
const path = require('path');
// const db = require('./db/db.json');
// const api = require('./public/assets/js/index');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);
app.use(express.static('public'));

app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received`);

  const { title, text } = req.body;
  
  if (title, text) {
    const newReview = {
      title,
      text
    };

    fs.readFile('./db/db.json', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedReviews = JSON.parse(data);
        parsedReviews.push(newReview);

        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedReviews),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successful')
        );
      }
    });

    const response = {
      status: 'success',
      body: newReview,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error');
  }
});


// app.post('/notes', (req, res) => 
//     res.sendFile(path.join(__dirname, '/public/notes.html'))
// );

// app.delete('/notes', (req, res) => 
//     res.sendFile(path.join(__dirname, '/public/notes.html'))
// );

app.listen(PORT, () => 
    console.log(`app listening at http://localhost:${PORT}`)
);