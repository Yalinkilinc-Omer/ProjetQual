package org.xchange.java.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.xchange.java.model.ExchangeObject;

import java.util.List;

@Repository
public interface ObjectRepository extends JpaRepository<ExchangeObject, Long> {
}