package org.xchange.controller;

import org.junit.jupiter.api.Test;
import org.xchange.java.controller.LoginRequest;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class LoginRequestTest {

    @Test
    public void testDefaultConstructor() {
        LoginRequest loginRequest = new LoginRequest();
        assertEquals(null, loginRequest.getUsername());
        assertEquals(null, loginRequest.getPassword());
    }

    @Test
    public void testParameterizedConstructor() {
        LoginRequest loginRequest = new LoginRequest("user", "pass");
        assertEquals("user", loginRequest.getUsername());
        assertEquals("pass", loginRequest.getPassword());
    }

    @Test
    public void testSetUsername() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("user");
        assertEquals("user", loginRequest.getUsername());
    }

    @Test
    public void testSetPassword() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setPassword("pass");
        assertEquals("pass", loginRequest.getPassword());
    }
}