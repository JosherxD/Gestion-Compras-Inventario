# Gestión Compras e Inventario

Este proyecto es una aplicación para la gestión de compras e inventarios, desarrollada con un stack moderno que incluye un backend en Node.js con TypeScript y un frontend en React.

## Instrucciones de instalación y ejecución

### Requisitos previos
- Node.js (v16 o superior)
- npm o yarn
- MongoDB

### Instalación

1. Clona este repositorio:
   ```bash
   git clone <https://github.com/JosherxD/Gestion-Compras-Inventario.git>
   cd Gestion-Compras-Inventario
   ```

2. Instala las dependencias del backend:
   ```bash
   cd backend
   npm install
   ```

3. Instala las dependencias del frontend:
   ```bash
   cd ../frontend
   npm install
   ```

### Ejecución

#### Backend
1. Configura las variables de entorno en el archivo `.env` dentro de la carpeta `backend`.
2. Inicia el servidor:
   ```bash
   npm run startdev
   ```

#### Frontend
1. Inicia la aplicación React:
   ```bash
   npm start
   ```

La aplicación estará disponible en `http://localhost:3000` y el backend en `http://localhost:3000/api`.

## Stack utilizado

### Backend
- Node.js
- TypeScript
- Express
- Mongoose
- Jest (para pruebas)

### Frontend
- React
- CSS

## Endpoints de la API

### Productos
- **GET /api/productos**: Obtiene todos los productos.
- **POST /api/productos**: Crea un nuevo producto.
- **GET /api/productos/:id**: Obtiene un producto por ID.
- **PUT /api/productos/:id**: Actualiza un producto por ID.
- **DELETE /api/productos/:id**: Elimina un producto por ID.

#### Ejemplo de uso con `curl`:
```bash
curl -X GET http://localhost:3000/api/productos
```

### Órdenes
- **GET /api/ordenes**: Obtiene todas las órdenes.
- **POST /api/ordenes**: Crea una nueva orden.
- **GET /api/ordenes/:id**: Obtiene una orden por ID.
- **PUT /api/ordenes/:id**: Actualiza una orden por ID.
- **DELETE /api/ordenes/:id**: Elimina una orden por ID.

#### Ejemplo de uso con `curl`:
```bash
curl -X POST http://localhost:3000/api/ordenes -H "Content-Type: application/json" -d '{"customerId": "123", "items": [{"productId": "1", "quantity": 2, "price": 100}]}'
```

### Órdenes de Compra
- **GET /api/purchaseorders**: Obtiene todas las órdenes de compra.
- **GET /api/purchaseorders/:id**: Obtiene una orden de compra por ID.

## Comentarios y anotaciones técnicas

### Backend
- **Validación de datos**: Se utiliza `express-validator` para validar las entradas en el backend.
- **Gestión de errores**: El backend incluye manejo de errores centralizado.
- **Base de datos**: MongoDB se utiliza como base de datos principal.
- **Pruebas**: Se utilizan `jest` y `ts-jest` para pruebas unitarias en el backend.
- **Arquitectura**: El backend sigue una arquitectura limpia con separación de capas (controladores, casos de uso, servicios, modelos y repositorios).
- **Rutas destacadas**:
  - `/api/productos`: Gestión de productos (crear, listar, actualizar, eliminar).
  - `/api/ordenes`: Gestión de órdenes (crear, listar, actualizar, eliminar).
  - `/api/purchaseorders`: Gestión de órdenes de compra.

Markdown

# Gestión Compras Inventario

This Postman collection helps you interact with the Gestión Compras Inventario API.

## Get Started

This template guides you through CRUD operations (GET, POST, PUT, DELETE), variables, and tests.

### How to Use This Collection

#### Step 1: Send requests

RESTful APIs allow you to perform CRUD operations using the POST, GET, PUT, and DELETE HTTP methods.

This collection contains each of these request types. Open each request and click "Send" to see what happens.

#### Step 2: View responses

Observe the response tab for status code (200 OK), response time, and size.

#### Step 3: Send new Body data

Update or add new data in "Body" in the POST request. Typically, Body data is also used in PUT request.

```json
{
    "name": "Add your name in the body"
}
Step 4: Update the variable
Variables enable you to store and reuse values in Postman. We have created a variable called base_url with the sample request https://postman-api-learner.glitch.me. Replace it with your API endpoint to customize this collection.   

Step 5: Add tests in the "Scripts" tab
Adding tests to your requests can help you confirm that your API is working as expected. You can write test scripts in JavaScript and view the output in the "Test Results" tab.

API Endpoints
Ordenes
Get data

GET http://localhost:3000/api/ordenes
Description: This is a GET request and it is used to "get" data from an endpoint. There is no request body for a GET request, but you can use query parameters to help specify the resource you want data on (e.g., in this request, we have id=1). A successful GET response will have a 200 OK status, and should include some kind of response body - for example, HTML web content or JSON data.
Get data id

GET http://localhost:3000/api/ordenes/1745631075052
Description: This is a GET request and it is used to "get" data from an endpoint. There is no request body for a GET request, but you can use query parameters to help specify the resource you want data on (e.g., in this request, we have id=1). A successful GET response will have a 200 OK status, and should include some kind of response body - for example, HTML web content or JSON data.
Post data

POST http://localhost:3000/api/ordenes
Description: This is a POST request, submitting data to an API via the request body. This request submits JSON data, and the data is reflected in the response. A successful POST request typically returns a 200 OK or 201 Created response code.
Body (raw JSON):
JSON

{
    "customerId": "12345",
    "items": [
        {
            "productId": "1",
            "quantity": 1,
            "price": 2000.0
        },
        {
            "productId": "2",
            "quantity": 1,
            "price": 1000.0
        }
    ]
}
Update

PUT http://localhost:3000/api/ordenes/1745691637561
Description: This is a PUT request and it is used to overwrite an existing piece of data. For instance, after you create an entity with a POST request, you may want to modify that later. You can do that using a PUT request. You typically identify the entity being updated by including an identifier in the URL (eg. id=1). A successful PUT request typically returns a 200 OK, 201 Created, or 204 No Content response code.
Body (raw JSON):
JSON

{
  "status": "completado"
}
Delete{id}

DELETE http://localhost:3000/api/ordenes/1745691637561
Description: This is a DELETE request, and it is used to delete data that was previously created via a POST request. You typically identify the entity being updated by including an identifier in the URL (eg. id=1). A successful DELETE request typically returns a 200 OK, 202 Accepted, or 204 No Content response code.
Productos
Get data

GET http://localhost:3000/api/productos
Description: This is a GET request and it is used to "get" data from an endpoint. There is no request body for a GET request, but you can use query parameters to help specify the resource you want data on (e.g., in this request, we have id=1). A successful GET response will have a 200 OK status, and should include some kind of response body - for example, HTML web content or JSON data.
Get{id}

GET http://localhost:3000/api/productos/2
Description: This is a GET request and it is used to "get" data from an endpoint. There is no request body for a GET request, but you can use query parameters to help specify the resource you want data on (e.g., in this request, we have id=1). A successful GET response will have a 200 OK status, and should include some kind of response body - for example, HTML web content or JSON data.
Post

POST http://localhost:3000/api/productos
Description: This is a POST request, submitting data to an API via the request body. This request submits JSON data, and the data is reflected in the response. A successful POST request typically returns a 200 OK or 201 Created response code.
Body (raw JSON):
JSON

{
    "id": "03",
    "name": "play 5",
    "description": "centro de video juegos",
    "quantity": 60,
    "price": 5000,
    "imageUrl": ""
}
Post{id}

PUT http://localhost:3000/api/productos/1
Description: This is a POST request, submitting data to an API via the request body. This request submits JSON data, and the data is reflected in the response. A successful POST request typically returns a 200 OK or 201 Created response code.
Body (raw JSON):
JSON

{
  "name": "televisor actualizado",
  "description": "Este es un producto actualizado con tecno 4k",
  "quantity": 15,
  "price": 1200,
  "imageUrl": ""
}
Delete{id}

DELETE {{base_url}}/info?id=1
Description: This is a DELETE request, and it is used to delete data that was previously created via a POST request. You typically identify the entity being updated by including an identifier in the URL (eg. id=1). A successful DELETE request typically returns a 200 OK, 202 Accepted, or 204 No Content response code.
Producto mas vendido
New Request
GET
(Details not provided in the collection)
Orden de compra
GET

GET http://localhost:3000/api/purchaseorders
GET{ID}

GET http://localhost:3000/api/purchaseorders/1745637799121
Update a orden de compra{id}

PUT http://localhost:3000/api/ordenes/1745691637561
Description: This is a PUT request and it is used to overwrite an existing piece of data. For instance, after you create an entity with a POST request, you may want to modify that later. You can do that using a PUT request. You typically identify the entity being updated by including an identifier in the URL (eg. id=1). A successful PUT request typically returns a 200 OK, 201 Created, or 204 No Content response code.
Body (raw JSON):
JSON

{
  "status": "completado"
}
Pro tips
Use folders to group related requests and organize the collection.
Add more scripts to verify if the API works as expected and execute workflows.
Related templates
API testing basics
API documentation
Authorization methods
<!-- end list -->