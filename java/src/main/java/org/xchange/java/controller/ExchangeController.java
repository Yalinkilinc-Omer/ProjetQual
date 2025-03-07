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
import org.springframework.http.HttpStatus;

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
    // Accepter une demande d'échange
    @PostMapping("/{exchangeId}/accept")
    public ResponseEntity<?> acceptExchange(@PathVariable Long exchangeId) {
        try {
            exchangeService.acceptExchange(exchangeId);
            return ResponseEntity.ok("Exchange accepted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Refuser une demande d'échange
    @PostMapping("/{exchangeId}/reject")
    public ResponseEntity<?> rejectExchange(@PathVariable Long exchangeId) {
        try {
            exchangeService.rejectExchange(exchangeId);
            return ResponseEntity.ok("Exchange rejected successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/received")
    public ResponseEntity<List<Exchange>> getReceivedExchangeRequests(@RequestParam Long userId) {
        List<Exchange> exchanges = exchangeRepository.findReceivedExchangeRequests(userId);
        if (exchanges.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(exchanges);
    }



    @GetMapping("/{id}")
    public ResponseEntity<Exchange> getExchangeById(@PathVariable Long id) {
        Optional<Exchange> exchange = exchangeRepository.findById(id);
        return exchange.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Exchange>> getExchangesByUserId(@PathVariable Long userId) {
        List<Exchange> exchanges = exchangeRepository.findByUserId(userId);
        if (exchanges.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(exchanges);
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
