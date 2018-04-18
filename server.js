const express = require('express')
const api = require('./app/api')

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())

app.use('/api', api)
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
