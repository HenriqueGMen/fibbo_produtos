package com.projeto.product_list.controller;

import com.projeto.product_list.dto.ProdutoDTO;
import com.projeto.product_list.model.Produto;
import com.projeto.product_list.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
@CrossOrigin(origins = "http://localhost:3000")
public class ProdutoController {
    @Autowired
    private ProdutoService produtoService;

    @PostMapping
    public ProdutoDTO create(@RequestBody Produto entity) {
        return produtoService.create(entity);
    }

    @GetMapping("/busca/{nome}")
    public ProdutoDTO getSearchProduct(@PathVariable String nome) {
        return produtoService.findByNome(nome);
    }

    @GetMapping
    public List<ProdutoDTO> list() {
        return produtoService.findAll();
    }

    @PutMapping("/{id}")
    public ProdutoDTO update(@PathVariable Long id, @RequestBody Produto entity) {
        return produtoService.update(id, entity);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        produtoService.delete(id);
    }

}
