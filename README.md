<div align="center">
    <!-- <a href="" target="_blank">
      <img src="" alt="Project Banner">
    </a> -->
  <h3 align="center">CRUD Operations #2</h3>
  <h4 align="center">School Exercise</h4>
</div>

## <br /> 📋 <a name="table">Table of Contents</a>

- ✨ [Introduction](#introduction)
- ⚙️ [Tech Stack](#tech-stack)
- 📝 [Features](#features)
- 🚀 [Quick Start](#quick-start)

## <br /> <a name="introduction">✨ Introduction</a>

**[FR]** 

**[EN]** 


## <br /> <a name="tech-stack">⚙️ Tech Stack</a>

- **REST API** (Representational State Transfer Application Programming Interface) is a specific type of API that adheres to the principles of REST, an architectural style for designing networked applications. REST APIs use standard HTTP methods (GET, POST, PUT, DELETE) to interact with resources, which are typically represented in JSON or XML format. REST APIs are stateless, meaning each request from a client to the server must contain all the information needed to understand and process the request. This approach simplifies the interactions between client and server and ensures scalability and performance.

- **Node.js** is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to execute JavaScript on the server side, enabling the creation of scalable and high-performance applications. Node.js's non-blocking, event-driven architecture makes it particularly suitable for building real-time, data-intensive applications.

- **Express** is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications. It simplifies the process of creating RESTful APIs by providing a thin layer of fundamental web application features, including routing, middleware support, and HTTP utilities.

- **MongoDB** is a NoSQL database system known for its flexibility and scalability, ideal for handling large volumes of unstructured or semi-structured data. It stores data in JSON-like documents, making it easy to integrate with modern applications. MongoDB's features include powerful querying capabilities, automatic sharding for horizontal scaling, flexible data models, and support for distributed transactions in recent versions.

- **Mongoose** is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a schema-based solution to model application data, ensuring data consistency and providing powerful tools for querying and validation. Mongoose simplifies the process of interacting with MongoDB by providing a higher abstraction layer.

- **NPM** (Node Package Manager) is the default package manager for Node.js. It allows developers to install, share, and manage dependencies in their projects. NPM provides access to a vast repository of open-source packages, facilitating the rapid development and integration of new features.

- **Bcrypt** is a library for hashing passwords in a secure manner. It uses a salt to protect against rainbow table attacks and employs a computationally intensive hashing algorithm, making brute-force attacks impractical. Bcrypt ensures that passwords are stored securely, enhancing the overall security of an application.

- **Dotenv** is a module that loads environment variables from a .env file into process.env. This practice helps manage configuration and secrets in Node.js applications, keeping them out of the source code and making it easier to change settings without modifying the application code.

- **Helmet** is a middleware for Express applications that helps secure apps by setting various HTTP headers. It mitigates common web vulnerabilities such as cross-site scripting (XSS), clickjacking, and other web attacks by configuring appropriate security-related HTTP headers.

- **Jsonwebtoken** (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties. It is commonly used for authentication and information exchange in web applications, allowing secure and verifiable transfer of information. JWTs are often used for implementing stateless authentication mechanisms.

- **Mongoose-unique-validator** is a plugin for Mongoose that adds pre-save validation for unique fields within a Mongoose schema. It simplifies the enforcement of uniqueness constraints in MongoDB documents, ensuring that certain fields, such as usernames or email addresses, remain unique.

- **Multer** is a middleware for handling multipart/form-data, which is primarily used for uploading files. It simplifies the process of handling file uploads in an Express application by providing various options for storage and file handling, making it easy to manage file uploads.


## <br/> <a name="features">📝 Features</a>

👉 **CRUD Operations**: Implement full Create, Read, Update, and Delete functionality for managing products.

👉 **Product Listing**: Retrieve all products with a single request.

👉 **Product Details**: Fetch detailed information for a specific product using its _id.

👉 **Product Creation**: Add new products to the database with required fields.

👉 **Product Update**: Modify existing product details by _id.

👉 **Product Deletion**: Remove products from the database by _id.

👉 **Error Handling**: Proper handling of errors during database operations with meaningful responses.

👉 **JSON Data Handling**: Use JSON format for request and response bodies to ensure consistency.



## <br /> <a name="quick-start">🚀 Quick Start</a>

Follow these steps to set up the project locally on your machine.

<br/>**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

To install nodemon globally on your machine, open your terminal and run the following command:
```bash
npm install -g nodemon
```

- **Nodemon** is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected. nodemon does not require any additional changes to your code or method of development. nodemon is a replacement wrapper for node .

<br/>**Cloning the Repository**

```bash
git clone {git remote URL}
```

<br/>**Installation**

Let's install the project dependencies for both the client and server, from your terminal, run:

```bash
# Navigate to the client directory
cd client

# Install the necessary dependencies for the client-side application
npm install
# or
yarn install

# Navigate back to the root directory
cd ..

# Navigate to the server directory
cd server

# Install the necessary dependencies for the server-side application
npm install
# or
yarn install
```

<br/>**Set Up Environment Variables**

Create a new file named .env inside the **server folder** and add the following content:

```env
# Database MongoDB
DB_USERNAME=
DB_PASSWORD=
DB_CLUSTER=
DATABASE=

# Json-Web-Token / for authentication
JWT_KEY=
```

Replace the placeholder values with your actual respective account credentials:
- [MongoDB](https://cloud.mongodb.com)


<br/>**Running the Project**

Installation will take a minute or two, but once that's done, you should be able to run the following command:

```bash
# Navigate to the client directory
cd client

# Start client
# If `npm start` doesn't work, try updating the dependencies in `package.json`.
npm start
# or
yarn start

# Navigate back to the root directory
cd ..

# Navigate to the server directory
cd server

# Start server
npm start
# or
yarn start
```

- Client running on [`http://localhost:4200`](http://localhost:4200)
- Server running on [`http://localhost:3000`](http://localhost:3000)

Choose the port your API is running on, and click `TEST-ROUTES` to test your API. <br> <br>































# Go Full Stack avec Node.js, Express et MongoDB

À partir de Node et d'Express, créez diverses routes pour les différentes fonctions à mettre à la disposition de votre API. Ensuite, vous ajouteez MongoDB, une base de données NoSQL, pour rendre votre API entièrement dynamique et vos données pleinement persistantes.



# Lancement
## Site : 
Votre application front-end doit s'exécuter dans un navigateur. 

Exécutez donc npm run start à partir du répertoire front-end, accédez à http://localhost:4200 avec votre navigateur.

## Serveur :
On peut lancer le serveur via le terminal : "node server"

Tester http://localhost:3000 via navigateur ou POSTMAN

Par défaut, si on lance le serveur ("node server"), puis qu'on apporte une modification, il faut relancer le serveur pour mise à jour.

Pour éviter cela, on installe "nodemon"  globalement (npm install -g nodemon). Lancer le serveur via "nodemon server".

# Compétences évaluées
- Créer un serveur web simple avec Express 
- Créer une API REST avec Node, Express et MongoDB 
- Mettre en place un système d'authentification sur une application Express 
- Gérer des fichiers utilisateur sur une application Express

# Technologies
- Node.js
- Express
- Mongoose (MongoDB)
- NPM : Bcrypt, Crypto-js, Dotenv, Express, Helmet, Jsonwebtoken, Mongoose-unique-validator, Multer, Password-validator, Validator

# Contexte
L'application est un magasin en ligne simple. Une API permet de Créer, Lire, Mettre à jour et Supprimer des éléments en vente (CRUD). L'API dispose d'un système d'authentification afin de la protéger. Une gestion des fichiers utilisateurs est intégrée afin de permettre aux clients de télécharger leurs propres images lors de la publication des annnonces.
