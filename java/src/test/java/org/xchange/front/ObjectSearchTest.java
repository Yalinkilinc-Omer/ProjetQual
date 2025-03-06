package org.xchange.front;

import org.junit.jupiter.api.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class ObjectSearchTest {

    WebDriver driver;
    WebDriverWait wait;

    @BeforeEach
    public void setUp() {
        // Initialize WebDriver (make sure you have ChromeDriver configured)
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.get("http://localhost:3000/objects");
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("search"))); // on attends que les objets chargent (ca faisait tout crash sinon)
    }

    @AfterEach
    public void tearDown() {
        // Close the browser after each test
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    public void testSearchTermReturnsResults() {
        // Target the input element by class and placeholder


        WebElement searchInput = driver.findElement(By.cssSelector("input[placeholder='Rechercher']"));
        searchInput.sendKeys("PlayStation");  // Replace with the term you want to search

        // Wait for the results to be updated
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.cssSelector(".rounded-xl.border.bg-card")));

        // Verify that objects are returned
        List<WebElement> searchResults = driver.findElements(By.cssSelector(".rounded-xl.border.bg-card"));
        assertFalse(searchResults.isEmpty(), "No objects found for the search term.");

        // Verify if the name of the objects contains the search term
        for (WebElement result : searchResults) {
            String objectName = result.findElement(By.cssSelector(".text-lg.font-semibold.mb-1")).getText().toLowerCase();
            assertTrue(objectName.contains("playstation"), "Object name does not contain search term.");
        }
    }

 @Test
  public void testSearchWithNoResults() {

      WebElement searchInput = driver.findElement(By.cssSelector("input[placeholder='Rechercher']"));
      searchInput.sendKeys("NonExistingObject");

      // Wait for the "No objects found" message to be displayed
      wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("p.text-gray-600.mb-4")));

      // Verify that the "No objects found" message is displayed
      WebElement noResultsMessage = driver.findElement(By.cssSelector("p.text-gray-600.mb-4"));
      assertTrue(noResultsMessage.isDisplayed(), "The 'No objects found' message should be displayed.");
  }

    @Test
    public void testSearchWithEmptyTerm() {
        WebElement searchInput = driver.findElement(By.cssSelector("input[placeholder='Rechercher']"));
        searchInput.clear();  // Clear any search text

        // Wait for the page to reload with all objects
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.cssSelector(".rounded-xl.border.bg-card")));

        // Verify that objects are displayed
        List<WebElement> searchResults = driver.findElements(By.cssSelector(".rounded-xl.border.bg-card"));
        assertFalse(searchResults.isEmpty(), "No objects should be displayed with an empty search term.");
    }

    @Test // Fonctionne pas
    public void testCategoryFilterWorks() {
        // Attente de la visibilité de l'élément de recherche
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("search")));

        // Sélectionner le menu déroulant de la catégorie
        WebElement categorySelect = driver.findElement(By.cssSelector(".lucide-chevron-down"));
        categorySelect.click();

        // Attendre que les options de catégorie soient visibles
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(".select-menu")));

        // Sélectionner la catégorie "Livres"
        WebElement categoryItem = driver.findElement(By.xpath("//span[text()='Livres']"));
        categoryItem.click();

        // Attendre que les résultats soient mis à jour
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.cssSelector(".rounded-xl.border.bg-card")));

        // Vérifier que les objets sont filtrés par catégorie
        List<WebElement> searchResults = driver.findElements(By.cssSelector(".rounded-xl.border.bg-card"));
        for (WebElement result : searchResults) {
            String category = result.findElement(By.cssSelector(".bg-blue-100")).getText();
            assertEquals("Livres", category, "Object is not in the selected category.");
        }
    }


    @Test // fonctionne pas (pb avec le bouton de filtre)
    public void testResetFilters() {
        // Apply a search term
        WebElement searchInput = driver.findElement(By.cssSelector("input[placeholder='Rechercher']"));
        searchInput.sendKeys("Phone");

        // Apply a category filter
        WebElement categorySelect = driver.findElement(By.cssSelector(".select-trigger"));
        categorySelect.click();
        WebElement categoryItem = driver.findElement(By.xpath("//span[text()='Electronics']"));
        categoryItem.click();

        // Wait for the results to be updated
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.cssSelector(".rounded-xl.border.bg-card")));

        // Verify that filters are applied
        List<WebElement> searchResults = driver.findElements(By.cssSelector(".rounded-xl.border.bg-card"));
        assertFalse(searchResults.isEmpty(), "No objects found with applied filters.");

        // Reset filters
        WebElement resetButton = driver.findElement(By.xpath("//button[text()='Clear Filters']"));
        resetButton.click();

        // Wait for the page to reload with all objects
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.cssSelector(".rounded-xl.border.bg-card")));

        // Verify that results are reset
        List<WebElement> resetResults = driver.findElements(By.cssSelector(".rounded-xl.border.bg-card"));
        assertFalse(resetResults.isEmpty(), "Objects should be displayed after resetting filters.");
    }
}