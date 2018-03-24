const express = require('express')
const app = express()

app.get('/api/hello', (req, res) => {
  hello = {
    who:"World!",
    with:"Love",
    and:"Passion"
  }
  res.send(hello)
})

app.get('/api/test', (req, res) => res.send({test:"Dummy"}))

app.listen(3000, () => console.log('Example app listening on port 3000!'))

