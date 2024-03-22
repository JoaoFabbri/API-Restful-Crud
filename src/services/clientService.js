
const db = require('./db');

module.exports = {
    buscarTodos: () =>{
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM clientes', (error, results)=>{
                if(error) {rejeitado(error);return;}
                aceito(results);
            });
        });
    },

    buscarUm: (cliente_id)=> {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM clientes WHERE cliente_id = ?', [cliente_id],(error,results) => {
                if(error){
                    rejeitado(error); 
                    return;
                }
                if(results.length > 0){
                    aceito(results[0]);
                }else{
                    aceito(false);
                }
            })
        }
        )
    },

    inserir: (nome, cpf, nascimento,email, telefone, sexo)=> {
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO clientes (nome, cpf, nascimento, email, telefone, sexo) VALUES (?, ?, ?, ?,?,?)', 
                [nome, cpf, nascimento,email, telefone, sexo],
                (error,results) => {

                if(error){
                    rejeitado(error); 
                    return
                }aceito (results.insertcliente_id);

                }
            );
        });
        
    },
    

    alterar: (cliente_id, nome, cpf, nascimento) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE clientes SET nome = ?, cpf = ?, nascimento = ? WHERE cliente_id = ?', 
                [nome, cpf, nascimento, cliente_id],
                (error, results) => {
                    if (error) {
                        rejeitado(error);
                        return;
                    }
                    aceito(results);
                }
            );
        });
    },
    
    

    excluir: (cliente_id)=>{
        return new Promise((aceito, rejeitado) =>{
            db.query('DELETE FROM clientes WHERE cliente_id =?', [cliente_id], (error, results) => {
                if(error) 
                {
                    rejeitado(error); return;
                } aceito(results); 
            })

        
    })

    }
    
};