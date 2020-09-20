// app.js
const express = require('express')
const app = express()
const port = 4000

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

const MWTimeReport = (req, res, next) => {
  const today = new Date()
  const now = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds() + ':' + today.getMilliseconds()
  console.log('Time: ' + now + ' | ' + req.method + ' from ' + req.path)
  next()
}

app.get('/', MWTimeReport)
app.get('/', (req, res, next) => {
  res.send(`
    <form action="/" method="POST">
      列出全部 Todo
      <input type="text" name="value" value="">
      <button type="submit">Submit</button>
    </form>
    `)
})

app.get('/new', (req, res) => {
  res.send('新增 Todo 頁面')
})

app.get('/:id', (req, res) => {
  res.send('顯示一筆 Todo')
})

app.post('/', (req, res) => {
  res.send('新增一筆  Todo 成功')
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
