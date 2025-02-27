# ObjectXChange
    
    Ce projet est une application web complète permettant aux utilisateurs d'échanger des objets. Le backend est construit avec Spring Boot, fournissant une API RESTful, tandis que le frontend est développé avec Next.js, offrant une interface utilisateur réactive et moderne.
    
    ## Fonctionnalités
    
    *   Inscription et connexion des utilisateurs
    *   Ajout et gestion des objets à échanger
    *   Recherche et filtrage des objets disponibles
    *   Proposition et gestion des échanges entre utilisateurs
    *   Validation ou refus des demandes d'échange
    
    ## Prérequis
    
    Avant de commencer, assurez-vous d'avoir installé les éléments suivants :
    
    *   [JDK 17](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html)
    *   [Node.js](https://nodejs.org/)
    *   [npm](https://www.npmjs.com/) ou [yarn](https://yarn.co/)
    *   [Maven](https://maven.apache.org/)
    *   [PostgreSQL](https://www.postgresql.org/) (ou une autre base de données de votre choix)
    
    ## Configuration du backend (Spring Boot)
    
    1.  Clonez le dépôt :
        
        ```bash
        git clone https://github.com/Lilecaz/ProjetQual
        cd backend
        ```
        
    2.  Configurez la base de données dans `src/main/resources/application.properties` :
        
        ```properties
        spring.datasource.url=jdbc:postgresql://localhost:5432/objectxchange
        spring.datasource.username=votre_utilisateur
        spring.datasource.password=votre_mot_de_passe
        spring.jpa.hibernate.ddl-auto=update
        ```
        
    3.  Construisez et exécutez l'application :
        
        ```bash
        ./mvnw spring-boot:run
        ```
        
    
    ## Configuration du frontend (Next.js)
    
    1.  Clonez le dépôt (si ce n'est pas déjà fait) :
        
        ```bash
        git clone <URL_du_dépôt>
        cd frontend
        ```
        
    2.  Installez les dépendances :
        
        ```bash
        npm install # ou yarn install
        ```
        
    3.  Configurez l'URL de l'API backend dans un fichier `.env.local` à la racine du projet frontend :
        
        ```plaintext
        NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
        ```
        
    4.  Démarrez le serveur de développement :
        
        ```bash
        npm run dev # ou yarn dev
        ```
        
    
    ## Tests
    
    *   Backend (Spring Boot) : Exécutez les tests unitaires et d'intégration avec `./mvnw test`.
    *   Frontend (Next.js) : Exécutez les tests avec `npm test` ou `yarn test`.
    
    ## Déploiement
    
    *   Backend (Spring Boot) : Construisez un fichier JAR exécutable avec `./mvnw clean package` et déployez-le sur un serveur d'applications Java.
    *   Frontend (Next.js) : Construisez une version de production avec `npm run build` ou `yarn build`, puis exportez-la avec `npm run export` ou `yarn export`. Servez les fichiers statiques à partir du répertoire `out`.
    
    ## Auteurs
    
    *   [Votre nom]
    
    ## Licence
    
    Ce projet est sous licence [MIT](LICENSE)
    ```