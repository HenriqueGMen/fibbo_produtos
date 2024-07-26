package com.projeto.product_list.converter;

import com.projeto.product_list.dto.ProdutoDTO;
import com.projeto.product_list.model.Produto;
import org.springframework.stereotype.Component;

@Component
public class ProdutoConverter {
    public ProdutoDTO convertToDTO(Produto produto) {
        ProdutoDTO produtoDTO = new ProdutoDTO();

        if(produto.getId() != null) {
            produtoDTO.setId(produto.getId());
        } else {
            throw new RuntimeException("O id não pode estar vazio");
        }

        if(!produto.getNome().isEmpty()) {
            produtoDTO.setNome(produto.getNome());
        } else {
            throw new RuntimeException("O nome não pode estar vazio");
        }

        if(!produto.getDescricao().isEmpty()) {
            produtoDTO.setDescricao(produto.getDescricao());
        } else {
            throw new RuntimeException("A descrição não pode estar vazia");
        }

        if(produto.getPreco() != null) {
            produtoDTO.setPreco(produto.getPreco());
        } else {
            throw new RuntimeException("Digite um preço válido");
        }

        return produtoDTO;
    }
}
