const express = require('express')
const routes = express.Router()
const db = require('./db')

routes.get('/:id', async (req, res) => {
  const user = await db.selectUser(req.params.id)
  return res.json(user)
})

routes.get('/', async (req, res) => {
  const user = await db.selectAll()
  return res.json(user)
})

routes.post('/add', async (req, res) => {
  const body = req.body
  const result = await db.insertUser(body)
  return res.json({'id': result[0].insertId})
})

routes.post('/update', async (req, res) => {
  const body = req.body
  const result = await db.updateUser(body.id, body.dados)
  return res.json(result)
})

routes.delete('/:id', async (req, res) => {
  const id = req.params.id
  const user = await db.deleteUser(id)
  return res.json(user)
})


module.exports = routes