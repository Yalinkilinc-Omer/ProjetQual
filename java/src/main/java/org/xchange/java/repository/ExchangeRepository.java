package org.xchange.java.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.xchange.java.model.Exchange;

@Repository
public interface ExchangeRepository extends JpaRepository<Exchange, Long> {
}