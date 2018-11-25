const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
const toDo= require('./routes/list.router.js')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.use('/list', toDo);

app.listen(PORT, () => {
    console.log('listening on port', PORT);
    
});