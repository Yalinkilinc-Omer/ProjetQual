package org.xchange.java.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.xchange.java.model.ExchangeObject;
import org.xchange.java.repository.ObjectRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ObjectService {
    @Autowired
    private ObjectRepository objectRepository;

    public List<ExchangeObject> getAllObjects() {
        return objectRepository.findAll();
    }

    public Optional<ExchangeObject> getObjectById(Long id) {
        return objectRepository.findById(id);
    }

    public ExchangeObject createObject(ExchangeObject exchangeObject) {
        return objectRepository.save(exchangeObject);
    }

    public ExchangeObject updateObject(Long id, ExchangeObject exchangeObject) {
        exchangeObject.setId(id);
        return objectRepository.save(exchangeObject);
    }

    public void deleteObject(Long id) {
        objectRepository.deleteById(id);
    }
}