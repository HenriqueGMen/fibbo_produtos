import React from 'react'
import axios from 'axios'
import { FaSearch } from 'react-icons/fa'
import './Components.css'

const SearchBar = ({ onSearch, fetchProdutos, setCurrentPage }) => {
  const handleSearch = async (e) => {
    e.preventDefault()
    const query = e.target.elements.search.value

    if (query.trim() === '') {
      fetchProdutos()
      setCurrentPage(0) 
    } else {
      try {
        const response = await axios.get(`http://localhost:3333/produtos/busca/${query}`)
        console.log('Search response:', response.data)

        const produtosFiltrados = Array.isArray(response.data) ? response.data : [response.data]
        onSearch(produtosFiltrados)
        setCurrentPage(0) 
        
      } catch (error) {
        console.error('Erro ao buscar produtos:', error)
        onSearch([])
        setCurrentPage(0)
      }
    }
  }

  return (
    <form className="search-container" onSubmit={handleSearch}>
      <input type="text" name="search" className="search-input" placeholder="Buscar produtos..." />
      <button type="submit" className="search-button">
        <FaSearch />
      </button>
    </form>
  )
}

export default SearchBar;
