package org.xchange.controller;

import org.junit.jupiter.api.Test;
import org.xchange.java.controller.LoginRequest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class LoginRequestTest {

    @Test
    public void testDefaultConstructor() {
        LoginRequest loginRequest = new LoginRequest();
        assertNull(loginRequest.getUsername());
        assertNull(loginRequest.getPassword());
    }

    @Test
    public void testParameterizedConstructor() {
        // Créer un objet LoginRequest avec nom d'utilisateur et mot de passe
        LoginRequest loginRequest = new LoginRequest("user", "pass");

        // Vérifier que le nom d'utilisateur est correctement défini
        assertEquals("user", loginRequest.getUsername());

        // Vérifier que le mot de passe est correctement défini
        assertEquals("pass", loginRequest.getPassword());
    }

    @Test
    public void testSetUsername() {
        // Créer un objet LoginRequest
        LoginRequest loginRequest = new LoginRequest();

        // Définir le nom d'utilisateur
        loginRequest.setUsername("user");

        // Vérifier que le nom d'utilisateur est correctement défini
        assertEquals("user", loginRequest.getUsername());
    }

    @Test
    public void testSetPassword() {
        // Créer un objet LoginRequest
        LoginRequest loginRequest = new LoginRequest();

        // Définir le mot de passe
        loginRequest.setPassword("pass");

        // Vérifier que le mot de passe est correctement défini
        assertEquals("pass", loginRequest.getPassword());
    }
}