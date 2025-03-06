package org.xchange.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.xchange.java.controller.CategoryController;
import org.xchange.java.model.Category;
import org.xchange.java.service.CategoryService;
import org.xchange.java.service.ObjectService;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;


public class CategoryControllerTest {

    @Mock
    private CategoryService categoryService;

    @Mock
    private ObjectService objectService;

    @InjectMocks
    private CategoryController categoryController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllCategories() {
        List<Category> categories = Arrays.asList(new Category(), new Category());
        when(categoryService.getAllCategories()).thenReturn(categories);

        ResponseEntity<List<Category>> response = categoryController.getAllCategories();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(categories, response.getBody());
    }

    @Test
    public void testGetCategoryById() {
        Category category = new Category();
        when(categoryService.getCategoryById(anyLong())).thenReturn(Optional.of(category));

        ResponseEntity<Category> response = categoryController.getCategoryById(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(category, response.getBody());
    }

    @Test
    public void testGetCategoryByIdNotFound() {
        when(categoryService.getCategoryById(anyLong())).thenReturn(Optional.empty());

        ResponseEntity<Category> response = categoryController.getCategoryById(1L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    public void testCreateCategory() {
        Category category = new Category();
        when(categoryService.createCategory(any(Category.class))).thenReturn(category);

        ResponseEntity<Category> response = categoryController.createCategory(category);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(category, response.getBody());
    }

    @Test
    public void testUpdateCategory() {
        Category category = new Category();
        when(categoryService.updateCategory(anyLong(), any(Category.class))).thenReturn(category);

        ResponseEntity<Category> response = categoryController.updateCategory(1L, category);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(category, response.getBody());
    }

    @Test
    public void testUpdateCategoryNotFound() {
        when(categoryService.updateCategory(anyLong(), any(Category.class))).thenReturn(null);

        ResponseEntity<Category> response = categoryController.updateCategory(1L, new Category());

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    public void testDeleteCategory() {
        doNothing().when(categoryService).deleteCategory(anyLong());

        ResponseEntity<Void> response = categoryController.deleteCategory(1L);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }

    @Test
    public void testGetObjectsByCategory() {
        List<Object> objects = Arrays.asList(new Object(), new Object());
        when(objectService.getObjectsByCategory(anyLong())).thenReturn(objects);

        ResponseEntity<List<Object>> response = categoryController.getObjectsByCategory(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(objects, response.getBody());
    }

    @Test
    public void testGetObjectsByCategoryNoContent() {
        when(objectService.getObjectsByCategory(anyLong())).thenReturn(Arrays.asList());

        ResponseEntity<List<Object>> response = categoryController.getObjectsByCategory(1L);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }
}