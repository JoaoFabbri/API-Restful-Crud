// Função para buscar todos os clientes
async function buscarClientes() {
  try {
    const response = await fetch("http://localhost:3000/api/clientes");
    const data = await response.json();

    if (data.error) {
      console.error(data.error);
      return;
    }

    const tasksTableBody = document.getElementById("tasksTableBody");
    tasksTableBody.innerHTML = ""; // Limpar tabela antes de adicionar novos dados

    data.result.forEach((cliente) => {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
                <td>${cliente.cliente_id}</td>
                <td>${cliente.nome}</td>
                <td>${obterDataFormatada(cliente.nascimento)}</td>
                <td>
                    <button onclick="editarCliente(${
                      cliente.cliente_id
                    })">Editar</button>
                    <button onclick="excluirCliente(${
                      cliente.cliente_id
                    })">Excluir</button>
                </td>
            `;
      tasksTableBody.appendChild(newRow);
    });
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
  }
}

// Função para obter a data atual formatada no formato DD/MM/AAAA
function obterDataFormatada(dataString) {
  const data = new Date(dataString);
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0"); // Mês começa do zero
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

// Função para excluir um cliente
async function excluirCliente(cliente_id) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/clientes/${cliente_id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`Erro ao excluir cliente: ${response.statusText}`);
    }

    buscarClientes(); // Atualizar a tabela após excluir um cliente
  } catch (error) {
    console.error("Erro ao excluir cliente:", error);
  }
}

const editarCliente = (cliente = null) => {
  const modal = document.getElementById("myModal");
  modal.style.display = "block";

  if (cliente !== null) {
    const nomeModal = document.getElementById("nome");
    const nascimentoModal = document.getElementById("nascimento");

    // Exibir o modal
    nomeModal.value = cliente.nome;
    nascimentoModal.value = cliente.nascimento;
    // clienteEditado = cliente;
  }
};

let clienteEditado = {};

const adicionarTarefa = (cliente) => {
  console.log(cliente);
  if (clienteEditado && clienteEditado.cliente_id) {
    //chamaro backend para salvar o banco
    // atualizar usuário com od clienteEditado.cliente_id
  } else {
    //chamar o backend para salvar o banco
    //cria usuário no banco
  }
  //atualiza a tabela com buscarClientes()
  // limpa estado => clienteEditado = {}
  // nomeModal.value
  //nascimentoModal.value=''
  //modal.style.display = 'none'
};

const form = document.getElementById("editForm");

// Adicione um ouvinte de evento para o evento de envio do formulário
form.addEventListener("submit", function (event) {
  // Evite o comportamento padrão de envio do formulário, que é recarregar a página
  event.preventDefault();

  // Aqui você pode adicionar a lógica para lidar com o envio do formulário
  // Por exemplo, você pode obter os valores dos campos de entrada e fazer algo com eles
  const inputTask = document.querySelector(".input-task");

  const taskValue = inputTask.value;

  // Exemplo: Adicionar a tarefa à lista de tarefas
  adicionarTarefa(taskValue);

  // Limpar o campo de entrada após o envio do formulário

  inputTask.value = "";
});

window.onload = buscarClientes;
