package org.xchange.java.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.xchange.java.model.Exchange;
import org.xchange.java.model.ExchangeObject;
import org.xchange.java.model.User;
import org.xchange.java.repository.ExchangeRepository;
import org.xchange.java.repository.ObjectRepository;
import org.xchange.java.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ExchangeService {

    @Autowired
    private ExchangeRepository exchangeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ObjectRepository objectRepository;


    public void acceptExchange(Long exchangeId) {
        Exchange exchange = exchangeRepository.findById(exchangeId)
                .orElseThrow(() -> new RuntimeException("Exchange not found"));

        // Récupérer les objets impliqués
        ExchangeObject proposedObject = exchange.getProposedObject();
        ExchangeObject requestedObject = exchange.getRequestedObject();

        // Récupérer les utilisateurs impliqués
        User owner = proposedObject.getUser();
        User requester = requestedObject.getUser();

        // Vérifier si l'utilisateur connecté est bien le propriétaire de l'objet proposé
        if (!owner.getId().equals(exchange.getUserId())) {
            throw new RuntimeException("You are not the owner of the proposed object");
        }

        // Vérifier si l'objet demandé est disponible
        if (!requestedObject.isAvailability()) {
            throw new RuntimeException("The requested object is not available");
        }

        // Changer la disponibilité des objets
        proposedObject.setAvailability(false);
        requestedObject.setAvailability(false);

        //changer les propriétaires des objets
        proposedObject.setUser(requester);
        requestedObject.setUser(owner);

        // Mettre à jour les objets
        objectRepository.save(proposedObject);

        objectRepository.save(requestedObject);

        // Mettre à jour le statut de l'échange
        exchange.setStatus("ACCEPTED");
        exchangeRepository.save(exchange);
    }

    public void rejectExchange(Long exchangeId) {
        Exchange exchange = exchangeRepository.findById(exchangeId)
                .orElseThrow(() -> new RuntimeException("Exchange not found"));

        exchange.setStatus("REJECTED");
        exchangeRepository.save(exchange);
    }

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
