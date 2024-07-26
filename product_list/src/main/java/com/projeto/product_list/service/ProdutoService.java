package com.projeto.product_list.service;

import com.projeto.product_list.converter.ProdutoConverter;
import com.projeto.product_list.dto.ProdutoDTO;
import com.projeto.product_list.model.Produto;
import com.projeto.product_list.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProdutoService {
    @Autowired
    private ProdutoRepository produtoRepository;
    @Autowired
    private ProdutoConverter produtoConverter;

    public ProdutoDTO create(Produto entity) {
        if(produtoRepository.findByNome(entity.getNome()) != null) {
            throw new RuntimeException("Esse produto já existe!");
        }

        Produto createProduto = produtoRepository.save(entity);

        return produtoConverter.convertToDTO(createProduto);
    }

    public ProdutoDTO findByNome(String nome) {
        Produto produto = produtoRepository.findByNome(nome);

        if(produto == null) {
            throw new RuntimeException("Não existe produto com o nome: " + nome);
        }

        return produtoConverter.convertToDTO(produto);
    }

    public List<ProdutoDTO> findAll() {
        List<ProdutoDTO> produtoDTOS = new ArrayList<>();

        produtoRepository.findAll().forEach(produto -> {
            produtoDTOS.add(produtoConverter.convertToDTO(produto));
        });

        return produtoDTOS;
    }

    public ProdutoDTO update(Long id, Produto entity) {
        Produto produto = produtoRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found with id " + id));

        produto.setNome(entity.getNome());
        produto.setDescricao(entity.getDescricao());
        produto.setPreco(entity.getPreco());

        Produto updatedProduto = produtoRepository.save(produto);

        return produtoConverter.convertToDTO(updatedProduto);
    }

    public void delete(Long id) {
        if(!produtoRepository.existsById(id)) {
            throw new RuntimeException("Product not found with id " + id);
        }

        produtoRepository.deleteById(id);
    }
}
