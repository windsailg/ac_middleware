// app.js
const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

const MWTimeReport = (req, res, next) => {
  const start = Date.now()
  const today = new Date()
  const now = today.getFullYear() + '-' +
  String(today.getMonth() + 1).padStart(2, '0') + '-' +
  String(today.getDate()).padStart(2, '0') + ' ' +
  String(today.getHours()).padStart(2, '0') + ':' +
  String(today.getMinutes()).padStart(2, '0') + ':' +
  String(today.getSeconds()).padStart(2, '0')
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
