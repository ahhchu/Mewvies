const express = require('express')
const app = express()
const port = 2999

app.get('/', (req, res) => {
    let sampleObj = {connection:"test ping successful", requestQuery:req.query};
    res.send(sampleObj);
})

app.get('/getMewvies/', (req, res) => {
    res.send('list of movies')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})