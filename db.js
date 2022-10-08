async function connect(){
if(global.connection && global.connection.state !== 'disconnected') return global.connection

  const mysql = require('mysql2/promise')
  const connection =await mysql.createConnection("mysql://manutencao:Navigu_03@awseb-e-3px43ti4i9-stack-awsebrdsdatabase-o542scrhyptb.cuuomrcedmbe.sa-east-1.rds.amazonaws.com:3306/api")
  global.connection = connection
  return connection
}

async function selectAll(){
  const conn = await connect()
  const [rows] = await conn.query("Select * from users")
  return rows
}

async function selectUser(id){
  const conn = await connect()
  const sql = "Select * from users where id = ?"
  const [rows] = await conn.query(sql, id)
  return rows
}

async function insertUser(user){
  const conn = await connect()
  const sql = "INSERT INTO users (user) VALUES (?)"
  const values = [user.nome]
  return await conn.query(sql, values)
}

async function updateUser(id , dados){
  const conn = await connect()
  const user = dados.nome
  const sql = "UPDATE users SET user = ? WHERE id = ?"
  const values = [user, id]
  return await conn.query(sql, values)
}

async function deleteUser(id){
  const conn = await connect()
  const sql = "DELETE FROM users WHERE id = ?"
  return await conn.query(sql, id)
}

module.exports = {selectAll, selectUser, insertUser, updateUser, deleteUser}
