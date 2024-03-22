
const express = require('express');
const router = express.Router();

const clienteControl = require('./control/clientControl');
const clientControl = require('./control/clientControl');

router.get('/clientes', clienteControl.buscarTodos);
router.get('/clientes/:cliente_id', clienteControl.buscarUm);
router.post('/clientes', clienteControl.inserir);
router.put('/clientes/:cliente_id', clienteControl.alterar);
router.delete('/clientes/:cliente_id', clienteControl.excluir)

module.exports = router;