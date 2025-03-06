package org.xchange.java.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.xchange.java.model.Exchange;
import org.xchange.java.model.ExchangeObject;
import org.xchange.java.model.User;
import org.xchange.java.repository.ExchangeRepository;
import org.xchange.java.repository.ObjectRepository;
import org.xchange.java.service.ExchangeService;
import org.xchange.java.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/exchanges")
public class ExchangeController {

    @Autowired
    private ExchangeService exchangeService;


    @Autowired
    private ObjectRepository objectRepository;

    @Autowired
    private ExchangeRepository exchangeRepository;


    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<Exchange> getAllExchanges() {
        return exchangeService.getAllExchanges();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Exchange> getExchangeById(@PathVariable Long id) {
        return exchangeService.getExchangeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Exchange createExchange(@RequestBody Exchange exchange) {
        if (exchange.getProposedObject() == null || exchange.getProposedObject().getId() == null) {
            throw new IllegalArgumentException("Proposed object ID must not be null");
        }
        if (exchange.getRequestedObject() == null || exchange.getRequestedObject().getId() == null) {
            throw new IllegalArgumentException("Requested object ID must not be null");
        }

        ExchangeObject proposedObject = objectRepository.findById(exchange.getProposedObject().getId())
                .orElseThrow(() -> new RuntimeException("Proposed object not found"));
        ExchangeObject requestedObject = objectRepository.findById(exchange.getRequestedObject().getId())
                .orElseThrow(() -> new RuntimeException("Requested object not found"));

        exchange.setProposedObject(proposedObject);
        exchange.setRequestedObject(requestedObject);
        return exchangeRepository.save(exchange);
    }



    @PutMapping("/{id}")
    public ResponseEntity<Exchange> updateExchange(@PathVariable Long id, @RequestBody Exchange exchange) {
        Exchange updatedExchange = exchangeService.updateExchange(id, exchange.getStatus());
        return ResponseEntity.ok(updatedExchange);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExchange(@PathVariable Long id) {
        exchangeService.deleteExchange(id);
        return ResponseEntity.noContent().build();
    }
}
