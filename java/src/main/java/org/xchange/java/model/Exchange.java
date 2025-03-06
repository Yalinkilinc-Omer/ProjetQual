package org.xchange.java.model;

import jakarta.persistence.*;


@Entity
public class Exchange {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String status;

    @ManyToOne
    @JoinColumn(name = "proposed_object_id")
    private ExchangeObject proposedExchangeObject;

    @ManyToOne
    @JoinColumn(name = "requested_object_id")
    private ExchangeObject requestedExchangeObject;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    // Getters et setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public ExchangeObject getProposedObject() {
        return proposedExchangeObject;
    }

    public void setProposedObject(ExchangeObject proposedExchangeObject) {
        this.proposedExchangeObject = proposedExchangeObject;
    }

    public ExchangeObject getRequestedObject() {
        return requestedExchangeObject;
    }

    public void setRequestedObject(ExchangeObject requestedExchangeObject) {
        this.requestedExchangeObject = requestedExchangeObject;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // Méthodes métier
}
