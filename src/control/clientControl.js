

const clienteService = require('../services/clientService');


module.exports= {
    buscarTodos: async (req, res) =>{
        let json = {error: '', result:[]}

        let clientes = await clienteService.buscarTodos();

        for (let i in clientes){
            json.result.push({
                cliente_id: clientes[i].cliente_id,
                nome: clientes[i].nome,
                cpf: clientes[i].cpf,
                email: clientes[i].email,
                telefone: clientes[i].telefone,
                nascimento: clientes[i].nascimento,
                sexo: clientes[i].sexo,
            });
        }
        res.json(json);
    }, 
    buscarUm: async (req, res) =>{
        let json = {error: '', result:{}};

        let cliente_id = req.params.cliente_id;
        console.log(cliente_id)

        let cliente = await clienteService.buscarUm(cliente_id);

        if(cliente){
            json.result=cliente;
        }
        res.json(json);

    },

    inserir: async (req, res) =>{
        let json = {error: '', result:{}};

        let nome = req.body.nome;
        let cpf = req.body.cpf;
        let nascimento = req.body.nascimento
        

        

        if(nome && cpf && nascimento){
            let clienteCodigo  = await clienteService.inserir(nome, cpf, nascimento);
            json.result= {
                cliente_id: clienteCodigo,
                nome,
                cpf,
                nascimento
            };
        }else{
            json.error = 'Campos não enviados.'
        }
        res.json(json);
    },

    alterar: async (req, res) => {
        let json = {error: '', result:{}};
    
        let nome = req.body.nome;
        let cpf = req.body.cpf;
        let nascimento = req.body.nascimento;
        let cliente_id = req.params.cliente_id;
    
        if (cliente_id && nome && cpf && nascimento) {
            await clienteService.alterar(cliente_id, nome, cpf, nascimento); // Passando cliente_id como parâmetro
            json.result = {
                cliente_id,
                nome,
                cpf,
                nascimento
            };
        } else {
            json.error = 'Campos não enviados.'
        }
        res.json(json);
    },
    
    excluir: async(req, res) =>{
        let json = {error: '', result:{}};

        await clienteService.excluir(req.params.cliente_id);

        res.json(json);
        
    }

    
}