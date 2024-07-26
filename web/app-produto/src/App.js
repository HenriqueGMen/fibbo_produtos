import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Table, Button } from 'react-bootstrap'
import { FaTrash, FaEdit } from 'react-icons/fa'
import ModalProduto from './components/ModalProduto'
import SearchBar from './components/SearchBar'
import ReactPaginate from 'react-paginate'
import './App.css'

function App() {
  const [produtos, setProdutos] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [produtoParaEditar, setProdutoParaEditar] = useState(null)

  const itemsPerPage = 5

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const response = await axios.get("http://localhost:3333/produtos");
      const sortedProdutos = Array.isArray(response.data) ? response.data.sort((a, b) => a.nome.localeCompare(b.nome)) : [];
      setProdutos(sortedProdutos);
    } catch (error) {
      setProdutos([]);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este produto?');
    if(confirmDelete) {
      try {
        await axios.delete(`http://localhost:3333/produtos/${id}`);
        fetchProdutos();
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
      }
    }
  };

  const handleEditClick = (produto) => {
    setProdutoParaEditar(produto);
    setShowModal(true);
  };

  const handleAddClick = () => {
    setProdutoParaEditar(null);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setProdutoParaEditar(null);
  };

  const handleSearch = async (produtosFiltrados) => {
    console.log('Search produtosFiltrados:', produtosFiltrados);
    setProdutos(produtosFiltrados);
    setCurrentPage(0);  // Reset current page to 0
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = produtos.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(produtos.length / itemsPerPage);

  return (
    <Container className="container">
      <h1>Lista de Produtos</h1>
      <SearchBar onSearch={handleSearch} fetchProdutos={fetchProdutos} setCurrentPage={setCurrentPage} />
      <Button onClick={handleAddClick} variant="primary" className="button">
        Adicionar Produto
      </Button>
      <div className="table-container">
        <Table striped bordered hover className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.nome}</td>
                <td>{produto.descricao}</td>
                <td>R$ {produto.preco}</td>
                <td>
                  <div className="icon-container">
                    <Button
                      variant="warning"
                      className="icon-button"
                      onClick={() => handleEditClick(produto)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      onClick={() => handleDelete(produto.id)}
                      variant="danger"
                      className="icon-button"
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <ReactPaginate
        previousLabel={"← Anterior"}
        nextLabel={"Próximo →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
      />
      <ModalProduto
        showModal={showModal}
        setShowModal={handleModalClose}
        fetchProdutos={fetchProdutos}
        produtoParaEditar={produtoParaEditar}
      />
      <div className={`modal-background ${showModal ? 'modal-open' : ''}`}></div>
    </Container>
  );
}

export default App;