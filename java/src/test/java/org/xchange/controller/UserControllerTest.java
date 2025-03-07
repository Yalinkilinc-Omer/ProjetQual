package org.xchange.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.xchange.java.controller.LoginRequest;
import org.xchange.java.controller.UserController;
import org.xchange.java.model.User;
import org.xchange.java.service.UserService;
import java.util.Arrays;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllUsers() {
        List<User> users = Arrays.asList(new User(), new User());
        when(userService.getAllUsers()).thenReturn(users);

        List<User> result = userController.getAllUsers();
        assertEquals(2, result.size());
        verify(userService, times(1)).getAllUsers();
    }

    @Test
    public void testCreateUser() {
        User user = new User();
        when(userService.createUser(any(User.class))).thenReturn(user);
        String username = "user";
        String password = "pass";
        String email = "email@mail.com";
        user.setUsername(username);
        user.setPassword(password);
        user.setEmail(email);

        User result = userController.createUser(user);
        assertEquals(user, result);
        verify(userService, times(1)).createUser(user);
    }

    @Test
    public void testLoginSuccess() {
        User user = new User();
        LoginRequest loginRequest = new LoginRequest("user", "pass");
        when(userService.login("user", "pass")).thenReturn(user);

        ResponseEntity<User> response = userController.login(loginRequest);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(user, response.getBody());
        verify(userService, times(1)).login("user", "pass");
    }

    @Test
    public void testLoginFailure() {
        LoginRequest loginRequest = new LoginRequest("user", "pass");
        when(userService.login("user", "pass")).thenReturn(null);

        ResponseEntity<User> response = userController.login(loginRequest);
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertNull(response.getBody());
        verify(userService, times(1)).login("user", "pass");
    }

    @Test
    public void testUpdateUser() {
        User user = new User();
        user.setId(1L);
        when(userService.updateUser(anyLong(), any(User.class))).thenReturn(user);

        User result = userController.updateUser(user);
        assertEquals(user, result);
        verify(userService, times(1)).updateUser(1L, user);
    }

    @Test
    public void testDeleteUser() {
        User user = new User();
        user.setId(1L);
        doNothing().when(userService).deleteUser(1L);

        userController.deleteUser(user);
        verify(userService, times(1)).deleteUser(1L);
    }
}