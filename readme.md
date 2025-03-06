# ObjectXChange

Ce projet est une application web complète permettant aux utilisateurs d'échanger des objets. Le backend est construit avec Spring Boot, fournissant une API RESTful, tandis que le frontend est développé avec Next.js, offrant une interface utilisateur réactive et moderne.

## Fonctionnalités

* Inscription et connexion des utilisateurs
* Ajout et gestion des objets à échanger
* Recherche et filtrage des objets disponibles
* Proposition et gestion des échanges entre utilisateurs
* Validation ou refus des demandes d'échange

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :
* [Java 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
* [Maven](https://maven.apache.org/install.html)
* [Node.js](https://nodejs.org/) et [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
* [PostgreSQL](https://www.postgresql.org/download/)

## Configuration du backend (Spring Boot)

1. Clonez le dépôt :
    ```bash
    git clone https://github.com/Lilecaz/ProjetQual
    cd java
    ```

2. Configurez la base de données dans `src/main/resources/application.properties` :
    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/objectxchange
    spring.datasource.username=votre_utilisateur
    spring.datasource.password=votre_mot_de_passe
    spring.jpa.hibernate.ddl-auto=update
    ```

3. Executez l'application 
    Executez l'application en lancant JavaApplication.java

## Configuration du frontend (Next.js)

1. Clonez le dépôt (si ce n'est pas déjà fait) :
    ```bash
    git clone https://github.com/Lilecaz/ProjetQual
    cd next
    ```

2. Installez les dépendances :
    ```bash
    npm install # ou yarn install
    ```

3. Configurez l'URL de l'API backend dans un fichier `.env.local` à la racine du projet frontend :
    ```plaintext
    NEXT_PUBLIC_API_BASE_URL=http://localhost:9000/api (le port selon ce que vous avez mis dans votre back-end)
    ```

4. Démarrez le serveur de développement :
    ```bash
    npm run dev # ou yarn dev
    ```

## Tests

* Backend (Spring Boot) : Exécutez les tests unitaires et d'intégration avec `./mvnw test`.
* Frontend (Next.js) : Exécutez les tests avec `npm test` ou `yarn test`.

## Auteurs

* Celil YILMAZ

## Licence

Ce projet est sous licence [MIT](LICENSE)