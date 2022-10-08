const express = require('express')
const routes = express.Router()
const db = require('./db')

routes.get('/:id', async (req, res) => {
  const user = await db.selectServico(req.params.id)
  return res.json(user)
})

routes.get('/', async (req, res) => {
  const user = await db.selectAll()
  return res.json(user)
})

routes.post('/add', async (req, res) => {
  const body = req.body
  const result = await db.insertServico(body)
  return res.json({'id': result[0].insertId})
})


routes.post('/update', async (req, res) => {
  const body = req.body
  const result = await db.updateServico(body.id, body.dados)
  return res.json(result.affectedRows)
})

routes.get('/delete/:id', async (req, res) => {
  const id = req.params.id
  const serv = await db.deleteServico(id)
  return res.json(serv.affectedRows)
})


module.exports = routes