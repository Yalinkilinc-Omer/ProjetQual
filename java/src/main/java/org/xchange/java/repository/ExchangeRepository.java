package org.xchange.java.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.xchange.java.model.Exchange;
import org.xchange.java.model.ExchangeObject;

import java.util.List;

@Repository
public interface ExchangeRepository extends JpaRepository<Exchange, Long> {
    List<Exchange> findByUserId(Long userId);


    @Query("SELECT e FROM Exchange e WHERE e.requestedObject.user.id = :userId")
    List<Exchange> findReceivedExchangeRequests(@Param("userId") Long userId);

}