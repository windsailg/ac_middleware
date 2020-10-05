// app.js
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const time = require('moment-timezone')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

const MWTimeReport = (req, res, next) => {
  const start = Date.now()
  const today = new Date()
  const now = today.getFullYear() + '-' +
  ((today.getMonth() + 1) < 10 ? '0' : '') + (today.getMonth() + 1) + '-' +
  (today.getDate() < 10 ? '0' : '') + today.getDate() + ' ' +
  (today.getHours() < 10 ? '0' : '') + today.getHours() + ':' +
  (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + ':' +
  (today.getSeconds() < 10 ? '0' : '') + today.getSeconds()
  res.on('finish', () => {
    const duration = Date.now() - start
    console.log(now + ' | ' + req.method + ' from ' + req.path + ' | total time: ' + duration + 'ms')
  })
  next()
}

app.use(MWTimeReport)

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
