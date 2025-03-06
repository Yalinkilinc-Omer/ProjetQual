package org.xchange.java.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.xchange.java.model.Exchange;
import org.xchange.java.model.ExchangeObject;
import org.xchange.java.model.User;
import org.xchange.java.repository.ExchangeRepository;
import org.xchange.java.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ExchangeService {

    @Autowired
    private ExchangeRepository exchangeRepository;
    @Autowired
    private UserRepository userRepository;


    public List<Exchange> getAllExchanges() {
        return exchangeRepository.findAll();
    }

    public Optional<Exchange> getExchangeById(Long id) {
        return exchangeRepository.findById(id);
    }

    public Exchange createExchange(Long proposedObjectId, Long requestedObjectId, String status, Long userId) {

        User user = userRepository.findById(userId).orElseThrow(()-> new RuntimeException("User not found"));
        ExchangeObject proposedObject = new ExchangeObject();
        proposedObject.setId(proposedObjectId);

        ExchangeObject requestedObject = new ExchangeObject();
        requestedObject.setId(requestedObjectId);


        Exchange exchange = new Exchange();
        exchange.setProposedObject(proposedObject);
        exchange.setRequestedObject(requestedObject);
        exchange.setStatus(status);

        return exchangeRepository.save(exchange);
    }

    public Exchange updateExchange(Long id, String status) {
        Exchange exchange = exchangeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Exchange not found"));
        exchange.setStatus(status);
        return exchangeRepository.save(exchange);
    }

    public void deleteExchange(Long id) {
        exchangeRepository.deleteById(id);
    }
}
