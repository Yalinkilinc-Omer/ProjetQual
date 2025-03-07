package org.xchange.config;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.xchange.java.model.Category;
import org.xchange.java.repository.CategoryRepository;
import org.xchange.java.service.CategoryService;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CorsConfigTest {

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private CategoryService categoryService;

    private Category sampleCategory;

    @BeforeEach
    void setUp() {
        sampleCategory = new Category();
        sampleCategory.setId(1L);
        sampleCategory.setName("Electronics");
    }

    @Test
    void testGetAllCategories() {
        // Simulation : lorsqu'on appelle findAll(), on renvoie deux catégories
        Category anotherCategory = new Category();
        anotherCategory.setId(2L);
        anotherCategory.setName("Books");

        when(categoryRepository.findAll()).thenReturn(Arrays.asList(sampleCategory, anotherCategory));

        // Appel du service
        List<Category> categories = categoryService.getAllCategories();

        // Vérification
        assertNotNull(categories);
        assertEquals(2, categories.size());
        verify(categoryRepository, times(1)).findAll();
    }

    @Test
    void testGetCategoryById() {
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(sampleCategory));
        Optional<Category> found = categoryService.getCategoryById(1L);
        assertTrue(found.isPresent());
        assertEquals("Electronics", found.get().getName());
        verify(categoryRepository, times(1)).findById(1L);
    }

    @Test
    void testCreateCategory() {
        when(categoryRepository.save(sampleCategory)).thenReturn(sampleCategory);
        Category created = categoryService.createCategory(sampleCategory);
        assertNotNull(created);
        assertEquals("Electronics", created.getName());
        verify(categoryRepository, times(1)).save(sampleCategory);
    }

    @Test
    void testUpdateCategory() {
        Category updatedCategory = new Category();
        updatedCategory.setId(1L);
        updatedCategory.setName("Updated Electronics");

        // Simulation : save() retourne la catégorie mise à jour
        when(categoryRepository.save(updatedCategory)).thenReturn(updatedCategory);

        Category result = categoryService.updateCategory(1L, updatedCategory);
        assertEquals("Updated Electronics", result.getName());
        verify(categoryRepository, times(1)).save(updatedCategory);
    }

    @Test
    void testDeleteCategory() {
        categoryService.deleteCategory(1L);
        verify(categoryRepository, times(1)).deleteById(1L);
    }
}
