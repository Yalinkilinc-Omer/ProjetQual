package org.xchange.java.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.xchange.java.model.ExchangeObject;
import org.xchange.java.repository.ObjectRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ObjectService {

    private final ObjectRepository objectRepository;

    @Autowired
    public ObjectService(ObjectRepository objectRepository) {
        this.objectRepository = objectRepository;
    }
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
    public List<ExchangeObject> getObjectsByUser(Long userId) {
        return objectRepository.findByUserId(userId);
    }
    public List<Object> getObjectsByCategory(Long categoryId) {
        return objectRepository.findByCategoryId(categoryId);
    }
}