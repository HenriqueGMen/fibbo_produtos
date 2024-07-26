# 📦 Aplicação de Listagem de Produtos

## 📖 **Descrição do Projeto**

Aplicação de listagem e gerenciamento de produtos onde é permitido visualizar os produtos cadastrados, adicionar novos produtos, pesquisar, editar e excluir um produto.

## ✨ **Features**

- Tabela de produtos com paginação, sendo exibido 6 produtos por página.
- Pesquisa de produto pelo seu nome.
- Adicão de um novo produto
- Edição de um produto já existente.
- Exclusão de um produto.
- Modal para adicionar e editar produtos.


## 🚀 **Utilização**

### Visualizando Produtos

- A homepage exibe uma lista paginada de produtos.
- Use a barra de pesquisa para encontrar produtos específicos pelo nome.

### Adicionando um produto novo

- Clique no botão "Adicionar Produto".
- Preencha os dados do produto no modal que irá aparecer ao apertar no botão.
- Clique em "Adicionar" na modal para cadastrar um novo produto.

### Editando um produto

- Para Editar clique no icone de edição (🖉) do produto.
- Na modal que irá abrir atualize as informações do produto.
- Clique em "Editar" na modal para editar o produto escolhido.

### Deletando um produto

- Para Excluir clique no icone de edição (🖉) do produto.
- Confirme a exclusão no pop-up.

## 🧰 **Tecnologia Utilizadas**

- **Frontend:**
  - React
  - Axios
  - React Bootstrap
  - React Icons
  - React Paginate

- **Backend:**
  - Spring boot

- **Docker**


## 🛠️ **Rodando a Aplicação com Docker Compose**

### Pré-requisitos

- Docker
- Docker Compose

1. **Clone o repositório:**
  ~~~~sh
  git clone https://github.com/HenriqueGMen/fibbo_produtos.git
  cd nome-do-repositorio
  ~~~~

2. **Build e inizialização dos containers:**
  ~~~~sh
   docker-compose up --build
  ~~~~

3. **Acesse a aplicação:**
  -  A aplicação estará disponível em http://localhost:3000.

4. **Parando o container**
  ~~~~sh
   docker-compose down
  ~~~~


Developed with 💻 by [Henrique Mendonça](https://github.com/HenriqueGMen)
