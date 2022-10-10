async function connect(){
if(global.connection && global.connection.state !== 'disconnected') return global.connection
  const mysql = require('mysql2/promise')
  const connection =await mysql.createConnection("mysql://manutencao:Navigu_03@awseb-e-3px43ti4i9-stack-awsebrdsdatabase-o542scrhyptb.cuuomrcedmbe.sa-east-1.rds.amazonaws.com:3306/ebdb")
  global.connection = connection
  return connection
}

const tabelas = [
  ['servicos','embarcacao', 'equipamento', 'descricao', 'horimetro', 'data'],
  ['hrextras', 'hrinicial', 'hrfinal', 'hrtotal', 'data', 'recebido']
]

async function selectAll(tab){
  const conn = await connect()
  const sql = "Select * from " +tabelas[tab][0]
  const [rows] = await conn.query(sql)
  return rows
}

async function select(tab, id){

  const conn = await connect()
  const sql = "Select * from " +tabelas[tab]+ " where id = ?"
  const values = [id]
  const [rows] = await conn.query(sql, values)
  return rows
}

async function insert(tab, dados){
  const conn = await connect()
  const campos = tabelas[tab].slice(1).join()
  const sql = "INSERT INTO " +tabelas[tab][0]+ " ("+campos+ ") VALUES ("+dados+")"
  return await conn.query(sql)
}

async function update(tab, id, dados){
  const conn = await connect()
  const campos = tabelas[tab].slice(1)
  let param = []
  for(let i = 0; i < campos.length ; i++){
    param[i] = campos[i] + ' = '+dados[i]
  }
  const params = param.join()
  const sql = "UPDATE " +tabelas[tab][0]+" SET "+params+" WHERE ID = ?"
  const values = [id]
  return await conn.query(sql, values)
}

async function deleted(tab, id){
  const conn = await connect()
  const sql = "DELETE FROM " +tabelas[tab][0]+ " WHERE id = ?"
  const values = [id]
  return await conn.query(sql, values)
}

module.exports = {selectAll, select, insert, update, deleted}
