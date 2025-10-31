const express = require('express');
var cors = require('cors');
require('dotenv/config');
const {connectToMongo}=require('./db');
const app = express();
var port = process.env.PORT || '5000'
app.use(cors());
app.use(express.json());
console.log(`Your port is ${port}`);
connectToMongo('mongodb://127.0.0.1:27017/CodeVerse');

app.use('/ide', require('./routes/ide'))
app.use('/upcomingcontest', require('./routes/upcomingcontest'))
app.use('/question', require('./routes/question'))
app.use('/login', require('./routes/login'))
app.use('/register', require('./routes/register'))
app.use('/forgotPassword', require('./routes/forgotPassword'))
app.use('/modifyProfile', require('./routes/modifyProfile'))
app.use('/images', require('./routes/images/image'))
app.use('/code', require('./routes/code'))
app.use('/',require('./routes/chatSection'));

app.listen(port, () => {
  console.log(`CodeVerse backend listening at http://localhost:${port}`)
})



