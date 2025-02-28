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
    private Object proposedObject;

    @ManyToOne
    @JoinColumn(name = "requested_object_id")
    private Object requestedObject;

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

    public Object getProposedObject() {
        return proposedObject;
    }

    public void setProposedObject(Object proposedObject) {
        this.proposedObject = proposedObject;
    }

    public Object getRequestedObject() {
        return requestedObject;
    }

    public void setRequestedObject(Object requestedObject) {
        this.requestedObject = requestedObject;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // Méthodes métier
}
