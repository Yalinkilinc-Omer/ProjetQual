package org.xchange.java.model;

import jakarta.persistence.*;

@Entity
public class Exchange {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String status; // par exemple: "PENDING", "ACCEPTED", "DECLINED"

    private Long userId;

    @ManyToOne
    @JoinColumn(name = "proposed_object_id", nullable = false)
    private ExchangeObject proposedObject;

    @ManyToOne
    @JoinColumn(name = "requested_object_id", nullable = false)
    private ExchangeObject requestedObject;

    public Exchange() {
    }

    public Exchange(Long id, String status, Long userId, ExchangeObject proposedObject, ExchangeObject requestedObject) {
        this.id = id;
        this.status = status;
        this.userId = userId;
        this.proposedObject = proposedObject;
        this.requestedObject = requestedObject;
    }

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
        return proposedObject;
    }

    public void setProposedObject(ExchangeObject proposedObject) {
        this.proposedObject = proposedObject;
    }

    public ExchangeObject getRequestedObject() {
        return requestedObject;
    }

    public void setRequestedObject(ExchangeObject requestedObject) {
        this.requestedObject = requestedObject;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
