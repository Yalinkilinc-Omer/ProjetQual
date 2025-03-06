package org.xchange.java.model;

   import jakarta.persistence.*;

   @Entity
   public class Exchange {
       @Id
       @GeneratedValue(strategy = GenerationType.IDENTITY)
       private Long id;
       private String status;

       @ManyToOne
       @JoinColumn(name = "proposed_object_id", nullable = false)
       private ExchangeObject proposedObject;

       @ManyToOne
       @JoinColumn(name = "requested_object_id", nullable = false)
       private ExchangeObject requestedObject;

       // Getters and setters
       public Long getId() {
           return id;
       }
       public void setId(Long id) {
           this.id = id;
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
   }