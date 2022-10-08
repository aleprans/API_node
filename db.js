async function connect(){
if(global.connection && global.connection.state !== 'disconnected') return global.connection
  const mysql = require('mysql2/promise')
  const connection =await mysql.createConnection("mysql://manutencao:Navigu_03@awseb-e-3px43ti4i9-stack-awsebrdsdatabase-o542scrhyptb.cuuomrcedmbe.sa-east-1.rds.amazonaws.com:3306/ebdb")
  global.connection = connection
  return connection
}

async function selectAll(){
  const conn = await connect()
  const [rows] = await conn.query("Select * from servicos")
  return rows
}

// async function selectServico(id){
//   const conn = await connect()
//   const sql = "Select * from servico where id = ?"
//   const [rows] = await conn.query(sql, id)
//   return rows
// }

// async function insertServico(serv){
//   const conn = await connect()
//   const sql = "INSERT INTO servicos (serv) VALUES (?)"
//   const values = [serv.nome]
//   return await conn.query(sql, values)
// }

// async function updateUser(id , dados){
//   const conn = await connect()
//   const user = dados.nome
//   const sql = "UPDATE users SET user = ? WHERE id = ?"
//   const values = [user, id]
//   return await conn.query(sql, values)
// }

// async function deleteUser(id){
//   const conn = await connect()
//   const sql = "DELETE FROM users WHERE id = ?"
//   return await conn.query(sql, id)
// }

module.exports = {selectAll}
