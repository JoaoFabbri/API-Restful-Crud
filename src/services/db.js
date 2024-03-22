
const mysql = require('mysql');

const connection = mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE, 
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    authPlugin: 'mysql_native_password'
})

connection.connect((error)=>{
    if (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }else {
    console.log(`Conectado ao Banco de Dados: ${process.env.DB_DATABASE}`)
    }
});

module.exports = connection; 