package org.xchange.java.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.xchange.java.repository.ExchangeRepository;
import org.xchange.java.model.Exchange;

import java.util.List;
import java.util.Optional;

@Service
public class ExchangeService {
    @Autowired
    private ExchangeRepository exchangeRepository;

    public List<Exchange> getAllExchanges() {
        return exchangeRepository.findAll();
    }

    public Optional<Exchange> getExchangeById(Long id) {
        return exchangeRepository.findById(id);
    }

    public Exchange createExchange(Exchange exchange) {
        return exchangeRepository.save(exchange);
    }

    public Exchange updateExchange(Long id, Exchange exchange) {
        exchange.setId(id);
        return exchangeRepository.save(exchange);
    }

    public void deleteExchange(Long id) {
        exchangeRepository.deleteById(id);
    }
}
