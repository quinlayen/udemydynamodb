const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', (req,res)=>{
    res.send("Sup");
});

app.post('/sup', (req, res)=>{
    let body = req.body;
    body.message = `Sup ${body.name}`;
    res.json(body)
})

app.listen(3000, ()=>{
    console.log("listening on 3000")
})
