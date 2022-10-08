async function connect(){
if(global.connection && global.connection.state !== 'disconnected') return global.connection
  const mysql = require('mysql2/promise')
  const connection =await mysql.createConnection("mysql://manutencao:Navigu_03@awseb-e-3px43ti4i9-stack-awsebrdsdatabase-o542scrhyptb.cuuomrcedmbe.sa-east-1.rds.amazonaws.com:3306/ebdb")
  global.connection = connection
  return connection
}

const teste = [
  {
    embarcacao: 'P23',
    equipamento: 'teste',
    descricao: 'teste',
    horimetro: 1234,
    data: '20/12/22'
  }
]

async function selectAll(){
  const conn = await connect()
  const [rows] = await conn.query("Select * from servicos")
  return rows
}

async function selectServico(id){
  const conn = await connect()
  const sql = "Select * from servicos where id = ?"
  const [rows] = await conn.query(sql, id)
  return rows
}

async function insertServico(serv){
  const conn = await connect()
  const sql = "INSERT INTO servicos (embarcacao, equipamento, descricao, horimetro, data) VALUES (?, ?, ?, ? ,?)"
  const values = [serv.embarcacao, serv.equipamento, serv.descricao, serv.horimetro, serv.data]
  return await conn.query(sql, values)
}

async function updateServico(id , dados){
  const conn = await connect()
  const sql = "UPDATE servicos SET embarcacao = ?, equipamento = ?, descricao = ?, horimetro = ?, data = ? WHERE id = ?"
  const values = [dados.embarcacao, dados.equipamento, dados.descricao, dados.horimetro, dados.data, id]
  return await conn.query(sql, values)
}

async function deleteServico(id){
  const conn = await connect()
  const sql = "DELETE FROM servicos WHERE id = ?"
  return await conn.query(sql, id)
}

module.exports = {selectAll, selectServico, insertServico, updateServico, deleteServico}
