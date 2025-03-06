package org.xchange.java.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.xchange.java.model.ExchangeObject;
import org.xchange.java.service.ObjectService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/object")
public class ObjectController {

    private final ObjectService objectService;

    @Autowired
    public ObjectController(ObjectService objectService) {
        this.objectService = objectService;
    }

    @GetMapping
    public ResponseEntity<List<ExchangeObject>> getAllObjects() {
        List<ExchangeObject> exchangeObjects = objectService.getAllObjects();
        return ResponseEntity.ok(exchangeObjects);
    }


    @GetMapping("/{id}")
    public ResponseEntity<ExchangeObject> getObjectById(@PathVariable Long id) {
        Optional<ExchangeObject> object = objectService.getObjectById(id);
        if (object.isPresent()) {
            return ResponseEntity.ok(object.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<ExchangeObject> createObject(@RequestBody ExchangeObject exchangeObject) {
        ExchangeObject createdExchangeObject = objectService.createObject(exchangeObject);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdExchangeObject);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExchangeObject> updateObject(@PathVariable Long id, @RequestBody ExchangeObject exchangeObject) {
        ExchangeObject updatedExchangeObject = objectService.updateObject(id, exchangeObject);
        if (updatedExchangeObject != null) {
            return ResponseEntity.ok(updatedExchangeObject);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteObject(@PathVariable Long id) {
        objectService.deleteObject(id);
        return ResponseEntity.noContent().build();
    }

}