package com.projeto.product_list.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.projeto.product_list.model.Produto;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto,Long> {

    Produto findByNome(String nome);
}
