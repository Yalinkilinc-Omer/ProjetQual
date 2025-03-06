package org.xchange.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.xchange.java.controller.ObjectController;
import org.xchange.java.model.ExchangeObject;
import org.xchange.java.model.User;
import org.xchange.java.service.ObjectService;
import org.xchange.java.service.UserService;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

public class ObjectControllerTest {

    @Mock
    private ObjectService objectService;

    @Mock
    private UserService userService;

    @InjectMocks
    private ObjectController objectController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetObjectsByUser() {
        List<ExchangeObject> objects = Arrays.asList(new ExchangeObject(), new ExchangeObject());
        when(objectService.getObjectsByUser(anyLong())).thenReturn(objects);

        ResponseEntity<List<ExchangeObject>> response = objectController.getObjectsByUser(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, response.getBody().size());
        verify(objectService, times(1)).getObjectsByUser(1L);
    }

    @Test
    public void testGetAllObjects() {
        List<ExchangeObject> objects = Arrays.asList(new ExchangeObject(), new ExchangeObject());
        when(objectService.getAllObjects()).thenReturn(objects);

        ResponseEntity<List<ExchangeObject>> response = objectController.getAllObjects();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, response.getBody().size());
        verify(objectService, times(1)).getAllObjects();
    }

    @Test
    public void testGetObjectById() {
        ExchangeObject object = new ExchangeObject();
        when(objectService.getObjectById(anyLong())).thenReturn(Optional.of(object));

        ResponseEntity<ExchangeObject> response = objectController.getObjectById(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody() instanceof ExchangeObject);
        verify(objectService, times(1)).getObjectById(1L);
    }

    @Test
    public void testGetObjectByIdNotFound() {
        when(objectService.getObjectById(anyLong())).thenReturn(Optional.empty());

        ResponseEntity<ExchangeObject> response = objectController.getObjectById(1L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(objectService, times(1)).getObjectById(1L);
    }

    @Test
    public void testCreateObject() {
        ExchangeObject object = new ExchangeObject();
        User user = new User();
        when(userService.getCurrentUser()).thenReturn(user);
        when(objectService.createObject(any(ExchangeObject.class))).thenReturn(object);

        ResponseEntity<ExchangeObject> response = objectController.createObject(object);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertInstanceOf(ExchangeObject.class, response.getBody());
        verify(userService, times(1)).getCurrentUser();
        verify(objectService, times(1)).createObject(object);
    }

    @Test
    public void testUpdateObject() {
        ExchangeObject object = new ExchangeObject();
        User user = new User();
        when(userService.getCurrentUser()).thenReturn(user);
        when(objectService.updateObject(anyLong(), any(ExchangeObject.class))).thenReturn(object);

        ResponseEntity<ExchangeObject> response = objectController.updateObject(1L, object);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        verify(userService, times(1)).getCurrentUser();
        verify(objectService, times(1)).updateObject(1L, object);
    }

    @Test
    public void testUpdateObjectNotFound() {
        ExchangeObject object = new ExchangeObject();
        User user = new User();
        when(userService.getCurrentUser()).thenReturn(user);
        when(objectService.updateObject(anyLong(), any(ExchangeObject.class))).thenReturn(null);

        ResponseEntity<ExchangeObject> response = objectController.updateObject(1L, object);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(userService, times(1)).getCurrentUser();
        verify(objectService, times(1)).updateObject(1L, object);
    }

    @Test
    public void testDeleteObject() {
        doNothing().when(objectService).deleteObject(anyLong());

        ResponseEntity<Void> response = objectController.deleteObject(1L);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(objectService, times(1)).deleteObject(1L);
    }
}