package org.xchange.controller;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.xchange.java.controller.ExchangeController;
import org.xchange.java.model.Exchange;
import org.xchange.java.model.ExchangeObject;
import org.xchange.java.repository.ExchangeRepository;
import org.xchange.java.repository.ObjectRepository;
import org.xchange.java.repository.UserRepository;
import org.xchange.java.service.ExchangeService;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

public class ExchangeControllerTest {

    @Mock
    private ExchangeService exchangeService;

    @Mock
    private ObjectRepository objectRepository;

    @Mock
    private ExchangeRepository exchangeRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ExchangeController exchangeController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllExchanges() {
        // Créer une liste d'échanges factices
        List<Exchange> exchanges = Arrays.asList(new Exchange(), new Exchange());
        when(exchangeService.getAllExchanges()).thenReturn(exchanges);

        // Appeler la méthode du contrôleur
        List<Exchange> response = exchangeController.getAllExchanges();

        // Vérifier que la réponse est correcte
        assertEquals(exchanges, response);
    }

    @Test
    public void testGetExchangeById() {
        // Créer un objet Exchange factice
        Exchange exchange = new Exchange();
        when(exchangeRepository.findById(anyLong())).thenReturn(Optional.of(exchange));

        // Appeler la méthode du contrôleur
        ResponseEntity<Exchange> response = exchangeController.getExchangeById(1L);

        // Vérifier que le statut de la réponse est OK
        assertEquals(HttpStatus.OK, response.getStatusCode());
        // Vérifier que le corps de la réponse est l'objet Exchange attendu
        assertEquals(exchange, response.getBody());
    }

    @Test
    public void testGetExchangeByIdNotFound() {
        // Retourner un Optional vide pour simuler un échange introuvable
        when(exchangeRepository.findById(anyLong())).thenReturn(Optional.empty());

        // Appeler la méthode du contrôleur
        ResponseEntity<Exchange> response = exchangeController.getExchangeById(1L);

        // Vérifier que le statut de la réponse est NOT_FOUND
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    public void testGetExchangesByUserId() {
        // Créer une liste d'échanges factices
        List<Exchange> exchanges = Arrays.asList(new Exchange(), new Exchange());
        when(exchangeRepository.findByUserId(anyLong())).thenReturn(exchanges);

        // Appeler la méthode du contrôleur
        ResponseEntity<List<Exchange>> response = exchangeController.getExchangesByUserId(1L);

        // Vérifier que le statut de la réponse est OK
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(exchanges, response.getBody());
    }

    @Test
    public void testGetExchangesByUserIdNotFound() {
        // Retourner une liste vide pour simuler aucun échange trouvé
        when(exchangeRepository.findByUserId(anyLong())).thenReturn(Arrays.asList());
        ResponseEntity<List<Exchange>> response = exchangeController.getExchangesByUserId(1L);

        // Vérifier que le statut de la réponse est NOT_FOUND
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    public void testCreateExchange() {
        // Créer un objet Exchange factice
        Exchange exchange = new Exchange();
        ExchangeObject proposedObject = new ExchangeObject();
        proposedObject.setId(1L);
        ExchangeObject requestedObject = new ExchangeObject();
        requestedObject.setId(2L);
        exchange.setProposedObject(proposedObject);
        exchange.setRequestedObject(requestedObject);

        when(objectRepository.findById(1L)).thenReturn(Optional.of(proposedObject));
        when(objectRepository.findById(2L)).thenReturn(Optional.of(requestedObject));
        when(exchangeRepository.save(any(Exchange.class))).thenReturn(exchange);

        // Appeler la méthode du contrôleur
        Exchange response = exchangeController.createExchange(exchange);

        // Vérifier que la réponse est correcte
        assertEquals(exchange, response);
    }

    @Test
    public void testUpdateExchange() {
        Exchange exchange = new Exchange();
        when(exchangeService.updateExchange(anyLong(), any())).thenReturn(exchange);

        ResponseEntity<Exchange> response = exchangeController.updateExchange(1L, exchange);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(exchange, response.getBody());
    }

    @Test
    public void testDeleteExchange() {
        doNothing().when(exchangeService).deleteExchange(anyLong());

        ResponseEntity<Void> response = exchangeController.deleteExchange(1L);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }
}