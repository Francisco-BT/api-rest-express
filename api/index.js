const express = require('express');
const cors = require('cors');

const routerApi = require('./routes');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('../src/middleware/error.handler');

const app = express();
const port = process.env.PORT || 3000;
// const whiteList = ['http://localhost:8080', 'https://myapp.com/', '*'];

app.use(express.json());
app.use(
  cors(),
  //   {
  //   origin: (origin, callback) => {
  //     if (whiteList.includes(origin)) {
  //       callback(null, true);
  //     } else {
  //       callback(new Error('not allowed'));
  //     }
  //   },
  // }
);

app.get('/api', (req, res) => {
  res.send('Hi from my server in express');
});

routerApi(app);

app.use(logErrors, ormErrorHandler, boomErrorHandler, errorHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('');
});
