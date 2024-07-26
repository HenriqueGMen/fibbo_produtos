import React, { useState, useEffect } from "react"
import { Modal, Button, Form, Container } from "react-bootstrap"
import { FaTimes } from "react-icons/fa"
import axios from "axios"
import "./Components.css"

const ModalProduto = ({ showModal, setShowModal, fetchProdutos, produtoParaEditar }) => {
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [preco, setPreco] = useState("")

  useEffect(() => {
    if (produtoParaEditar) {
      setNome(produtoParaEditar.nome)
      setDescricao(produtoParaEditar.descricao)
      setPreco(produtoParaEditar.preco.toString())
    } else {
      setNome("")
      setDescricao("")
      setPreco("")
    }
  }, [produtoParaEditar])

  useEffect(() => {
    if (!showModal) {
      setNome("")
      setDescricao("")
      setPreco("")
    }
  }, [showModal])

  const handleClose = () => {
    setShowModal(false)
  }

  const handleSalvarProduto = async () => {
    try {
      const precoNumber = parseFloat(preco.replace(",", "."))

      if(!nome.trim()) {
        alert("Por favor, digite o nome do produto.")
        return
      }

      if(!descricao.trim()) {
        alert("Por favor, digite a descrição do produto.")
        return
      }

      if (isNaN(precoNumber) || precoNumber <= 0) {
        alert("Por favor, digite um preço válido.")
        return
      }

      if (produtoParaEditar) {
        await axios.put(`http://localhost:3333/produtos/${produtoParaEditar.id}`, {
          nome,
          descricao,
          preco: precoNumber
        })
      } else {
        await axios.post("http://localhost:3333/produtos", {
          nome,
          descricao,
          preco: precoNumber
        })
      }

      fetchProdutos()
      handleClose()
    } catch (error) {
      console.error("Erro ao salvar produto:", error)
    }
  }

  return (
    <Modal show={showModal} onHide={handleClose} centered className="custom-modal">
      <Container className="container-form-modal">
        <Modal.Header style={{ borderBottom: "none" }}>
          <FaTimes className="close-icon" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body className="modal-body">
          <Form>
            <Form.Group controlId="formNome">
              <Form.Label style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                Nome do Produto
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome do produto"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formDescricao">
              <Form.Label className="form-text-label" style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                Descrição do Produto
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a descrição do produto"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPreco">
              <Form.Label style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                Preço do Produto
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o preço"
                value={preco}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^\d.,]/g, "")
                  setPreco(value)
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: "none" }}>
          <Button variant="success" onClick={handleSalvarProduto} className="button">
            {produtoParaEditar ? "Editar" : "Adicionar"}
          </Button>
        </Modal.Footer>
      </Container>
    </Modal>
  )
}

export default ModalProduto
