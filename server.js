const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const mongoose = require('mongoose');
const recordsRouter = require('./routes/recordsRouter');
const usersRouter = require('./routes/usersRouter');
const cookies = require('cookie-parser');
const meRouter = require('./routes/meRouter');

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

/**EXPRESS MIDDLEWARE */
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', 
    credentials: true, }
  
));
app.use('/statics', express.static('statics'));
app.use(cookies());

/**MONGODB CONNECTION */
const dbUrl = 'mongodb+srv://encsooo:encsooo@cluster0.ug2lp.mongodb.net/record_db?retryWrites=true&w=majority';
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('Connection to database established!'))
  .catch((err) => console.log('[ERROR] DB Connection failed', err));

/**AVAILABLE ROUTES */
app.get('/', (req, res) => {
  res.send('Welcome to the record shop API!');
});

/**ROUTES */
app.use('/users', usersRouter);
app.use('/records', recordsRouter);
app.use('/me', meRouter); // handles all requests for logged in users


/**ERROR HANDLING - John Errori*/
app.use(function errorHandler(err, req, res, next) {
  res.status(err.status || 500).send({
    error: {
      message: err.message,
    },
  });
});
