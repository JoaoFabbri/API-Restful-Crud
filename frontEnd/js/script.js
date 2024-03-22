// Função para buscar todos os clientes
async function buscarClientes() {
  try {
      const response = await fetch('http://localhost:3000/api/clientes');
      const data = await response.json();

      if (data.error) {
          console.error(data.error);
          return;
      }

      const tasksTableBody = document.getElementById('tasksTableBody');
      tasksTableBody.innerHTML = ''; // Limpar tabela antes de adicionar novos dados

      data.result.forEach(cliente => {
          const newRow = document.createElement('tr');
          newRow.innerHTML = `
              <td>${cliente.cliente_id}</td>
              <td>${cliente.nome}</td>
              <td>${obterDataFormatada(cliente.nascimento)}</td>
              <td>
                  <button onclick="editarCliente(${cliente.cliente_id})">Editar</button>
                  <button onclick="excluirCliente(${cliente.cliente_id})">Excluir</button>
              </td>
          `;
          tasksTableBody.appendChild(newRow);
      });
  } catch (error) {
      console.error('Erro ao buscar clientes:', error);
  }
}

// Função para obter a data atual formatada no formato DD/MM/AAAA
function obterDataFormatada(dataString) {
  const data = new Date(dataString);
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês começa do zero
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

// Função para excluir um cliente
async function excluirCliente(cliente_id) {
  try {
      const response = await fetch(`http://localhost:3000/api/clientes/${cliente_id}`, {
          method: 'DELETE'
      });

      if (!response.ok) {
          throw new Error(`Erro ao excluir cliente: ${response.statusText}`);
      }

      buscarClientes(); // Atualizar a tabela após excluir um cliente
  } catch (error) {
      console.error('Erro ao excluir cliente:', error);
  }
}



// Executar a função de buscar clientes ao carregar a página
window.onload = buscarClientes;
