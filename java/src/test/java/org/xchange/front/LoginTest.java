package org.xchange.front;
import org.junit.jupiter.api.AfterAll;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.*;

public class LoginTest {

    private static WebDriver driver;

    @BeforeAll
    public static void setUp() {
        // Assurez-vous que vous avez téléchargé ChromeDriver et qu'il est dans votre PATH
        driver = new ChromeDriver();
    }

    @Test
    public void testLoginPageElements() {
        driver.get("http://localhost:3000/login"); // Remplacez par l'URL de votre page de login

        // Vérifier que les champs username et password sont présents
        WebElement usernameField = driver.findElement(By.id("username"));
        WebElement passwordField = driver.findElement(By.id("password"));

        assertNotNull(usernameField);
        assertNotNull(passwordField);
    }

    @Test
    public void testInvalidLogin() {
        driver.get("http://localhost:3000/login");

        // Remplir le formulaire avec des informations incorrectes
        WebElement usernameField = driver.findElement(By.id("username"));
        WebElement passwordField = driver.findElement(By.id("password"));
        WebElement submitButton = driver.findElement(By.cssSelector("button[type='submit']"));

        usernameField.sendKeys("invalidUser");
        passwordField.sendKeys("invalidPassword");
        submitButton.click();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement errorElement = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(".text-red-500")));

        WebElement errorMessage = driver.findElement(By.cssSelector(".text-red-500"));
        assertTrue(errorMessage.isDisplayed());
        assertTrue(errorMessage.getText().contains("Invalid username or password"));
    }

    @Test
    public void testValidLogin() {
        driver.get("http://localhost:3000/login");

        // Remplir le formulaire avec des informations valides
        WebElement usernameField = driver.findElement(By.id("username"));
        WebElement passwordField = driver.findElement(By.id("password"));
        WebElement submitButton = driver.findElement(By.cssSelector("button[type='submit']"));

        usernameField.sendKeys("test"); // Remplace par un utilisateur valide
        passwordField.sendKeys("test123"); // Remplace par un mot de passe valide
        submitButton.click();


        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.urlContains("dashboard"));

        String currentUrl = driver.getCurrentUrl();
        assertTrue(currentUrl.contains("dashboard"));
    }

    @Test
    public void testFormValidation() {
        driver.get("http://localhost:3000/login");

        WebElement submitButton = driver.findElement(By.cssSelector("button[type='submit']"));

        submitButton.click();

        // Vérifier que les erreurs de formulaire sont affichées
        WebElement usernameError = driver.findElement(By.xpath("//input[@id='username']/following-sibling::p"));
        WebElement passwordError = driver.findElement(By.xpath("//input[@id='password']/following-sibling::p"));

        assertTrue(usernameError.isDisplayed());
        assertTrue(passwordError.isDisplayed());
    }

    @AfterAll
    public static void tearDown() {
        // Fermer le navigateur après les tests
        if (driver != null) {
            driver.quit();
        }
    }
}

