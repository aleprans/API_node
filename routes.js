const express = require('express')
const routes = express.Router()
const db = require('./db')

// Rotas 
// 1.X SERVICOS 
// 2.X HORAS EXTRAS 

// X.1 SELECT
// X.2 INSERT
// X.3 UPDATE
// X.4 DELETE

// EXEMPLO ROTA 11 = SELECT DE SERVICOS

// Rotas para servicos (1.X)

routes.get('/11', async (req, res) => {
  const serv = await db.selectAll(0)
  return res.json(serv)
})

routes.get('/11/:id', async (req, res) => {
  const serv = await db.select(0, req.params.id)
  return res.json(serv)
})

routes.post('/12', async (req, res) => {
  const body = req.body
  const result = await db.insert(0, body)
  return res.json({'id': result[0].insertId})
})


routes.post('/13', async (req, res) => {
  const body = req.body
  const result = await db.update(0, body.id, body.dados)
  return res.json(result.affectedRows)
})

routes.delete('/14/:id', async (req, res) => {
  const id = req.params.id
  const serv = await db.deleted(0, id)
  return res.json(serv.affectedRows)
})


// Rotas para horas extras (2.X)

routes.get('/21/:id', async (req, res) => {
  const hext = await db.select(1, req.params.id)
  return res.json(hext)
})

routes.get('/21', async (req, res) => {
  const hext = await db.selectAll(1)
  return res.json(hext)
})

routes.post('/22', async (req, res) => {
  const body = req.body
  const result = await db.insert(1, body)
  return res.json({'id': result[0].insertId})
})


routes.post('/23', async (req, res) => {
  const body = req.body
  const result = await db.update(1, body.id, body.dados)
  return res.json(result.affectedRows)
})

routes.get('/24/:id', async (req, res) => {
  const id = req.params.id
  const hext = await db.deleted(1, id)
  return res.json(hext.affectedRows)
})


module.exports = routes