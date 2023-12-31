const express = require('express');
const path = require('path');
// const db = require('./db/db.json');
// const api = require('./public/assets/js/index.js');
const fs = require('fs');
const uuid = require('./public/helpers/uuid')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);
app.use(express.static('public'));

app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.post('/api/notes', (req, res) => {
    
    console.info(`${req.method} request received`);
  
    const { title, text } = req.body;

    if (title && text) {
      
      const newReview = {
        title,
        text,
        id: uuid(),
      };
  
     
      fs.readFile('./db/db.json', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const parsedReviews = JSON.parse(data);
          
          parsedReviews.push(newReview);
  
          fs.writeFile(
            './db/db.json',
            JSON.stringify(parsedReviews, null, 2),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successful!')
          );
        }
      });
  }});

// app.get('/api/notes', (req, res) => 
//     res.sendFile(path.join(__dirname, 'public/notes.html'))
// );

// app.delete('/notes', (req, res) => 
//     res.sendFile(path.join(__dirname, '/public/notes.html'))
// );

app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.listen(PORT, () => 
    console.log(`app listening at http://localhost:${PORT}`)
);