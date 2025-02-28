package org.xchange.java.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.xchange.java.model.Object;
import org.xchange.java.repository.ObjectRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ObjectService {
    @Autowired
    private ObjectRepository objectRepository;

    public List<Object> getAllObjects() {
        return objectRepository.findAll();
    }

    public Optional<Object> getObjectById(Long id) {
        return objectRepository.findById(id);
    }

    public Object createObject(Object object) {
        return objectRepository.save(object);
    }

    public Object updateObject(Long id, Object object) {
        object.setId(id);
        return objectRepository.save(object);
    }

    public void deleteObject(Long id) {
        objectRepository.deleteById(id);
    }
}