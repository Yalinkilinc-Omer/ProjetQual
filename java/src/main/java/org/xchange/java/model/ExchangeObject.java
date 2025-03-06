package org.xchange.java.model;

import jakarta.persistence.*;

@Entity
public class ExchangeObject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private boolean availability;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    // Getters et setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public boolean isAvailability() {
        return availability;
    }
    public void setAvailability(boolean availability) {
        this.availability = availability;
    }
    public Category getCategory() {
        return category;
    }
    public void setCategory(Category category) {
        this.category = category;
    }
    // Méthodes métier
}