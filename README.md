![](./assets/HEADER_BackEnd.jpg)




# ÁGORA 📅
## Descripción del proyecto
[⬆️](#índice)

>*ÁGORA es un término griego que significa plaza o punto de reunión y esa es la metáfora que se ha empleado para vertebrar esta WebApp dedicada a conectar a los estudiantes de EDEM con el resto del ecosistema de Marina de Empresas ,formado por LANZADERA y ANGELS.

Ágora solo es accesible a los alumnos que cursen o hayan cursado formación en EDEM. 
>Sus principales características son:
>- [X] Acceso seguro mediante login con triple factor de autenticación
>- [X] Seguridad mediante CAPTCHA
>- [X] Home con acceso a menú diario de cafetería
>- [X] Noticias de Marina de Empresas
>- [X] Posibilidad de comentar noticias y dar like a las mismas
>- [X] Filtrado de palabras malsonantes en comentarios mediante el uso de IA
>- [X] Eventos personalizados para cada usuario mediante el empleo de IA
>- [X] Catálogo de eventos general
>- [X] Panel de notificaciones de usuario con las noticias y eventos no vistos
>- [X] Chat en tiempo real para conectar a los usuarios del ecosistema de MdE 
>- [X] Opción para eliminar conversaciones
>- [X] Panel de perfil de usuario con foto y enlaces a perfiles profesionales
>- [X] En perfil de usuario se añaden y editan las preferencias de eventos


>El despliegue del BACKEND  de la WebApp de ágora lo hemos realizado en la siguiente plataforma:

| PLATAFORMA    | USO |
| :-----------:   | :---------- |
|MongoDB Atlas| Aquí está la base de datos pre-poblada con la que efectuaremos las pruebas de conexión de la API.  |
|RAILWAY         |Plataforma de despligue,donde se ejecuta el servidor que permite entregar información desde y hacia la base de datos. |

***


***
# SWAGGER
## DOCUMENTACIÓN
[⬆️](#índice)
![](./assets/TSN_Swagger_1.jpg)
>Por problemas en el despliegue de la API 

> __Note__
No es posible proporcionar ningún vínculo de testing de SWAGGER porque el despliegue en railway creaba problemas con el archivo *basicInfo.js*
> __Warning__
El departamento de Ciberseguridad requiere que se cree una base de datos paralela para que se testee sobre ella o bien que se porvea una API key a quien vaya a consumir la API.
***
# MONGODB Atlas
## Vista del CLÚSTER que contiene la base de datos que nutre AGORA
[⬆️](#índice)
![](./assets/TSN_Atlas_1.jpg)

***
# ENDPOINTS de la API
## ENDPOINTS de la Colección: Usuarios
[⬆️](#índice)

| ACCÍON  | OPERACIÓN CRUD | RUTA
| :-----------:   | :---------- | :----------- |
|Crear usuario | POST  | localhost:8080/users/register|

>Body-> raw (json)
```js
{
    "name":"Sofia",
    "email": "sofia@sofia.com",
    "password": "123456",
    "age":"25"
}
```
| ACCÍON  | OPERACIÓN CRUD | RUTA
| :-----------:   | :---------- | :----------- |
|Login usuario | POST  | localhost:8080/users/login|

>Body-> raw (json)
```js
{
    "email": "sofia@sofia.com",
    "password": "123456"
}
```
| ACCÍON  | OPERACIÓN CRUD | RUTA
| :-----------:   | :---------- | :----------- |
|Logout usuario | DELETE | localhost:8080/users/logout|

>HEADERS -> Authorisation

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ2NTJlZDhjNjQzZGM1YWJlOGViNDYiLCJpYXQiOjE2ODIzMzA5MzR9.5bva2ATkY3EnTk6MupZQdz87Hb7YXxivv7tdQqs0EKA

>Body-> raw (json)
```js
{
    "email": "sofia@sofia.com",
    "password": "123456"
}
```
| ACCÍON  | OPERACIÓN CRUD | RUTA
| :-----------:   | :---------- | :----------- |
|Eliminar usuario | DELETE | localhost:8080/users/deleteUserById/|

> __Warning__
Se requiere estar logueado como ADMIN para realizar esta operación.

>HEADERS -> Authorisation
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ2NTJlZDhjNjQzZGM1YWJlOGViNDYiLCJpYXQiOjE2ODIzMzA5MzR9.5bva2ATkY3EnTk6MupZQdz87Hb7YXxivv7tdQqs0EKA'

>Params -> User_ID
'644652ed8c643dc5abe8eb46'
| ACCÍON  | OPERACIÓN CRUD | RUTA
| :-----------:   | :---------- | :----------- |
|Ver usuario por su ID | GET | localhost:8080/users/getById/|

>Params -> User_ID
'644652ed8c643dc5abe8eb46'

## ENDPOINTS de la Colección: Publicaciones
[⬆️](#índice)

| ACCÍON  | OPERACIÓN CRUD | RUTA
| :-----------:   | :---------- | :----------- |
|Crear publicación | POST | localhost:8080/posts/create|

>HEADERS -> Authorisation

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ2NTJlZDhjNjQzZGM1YWJlOGViNDYiLCJpYXQiOjE2ODIzMzA5MzR9.5bva2ATkY3EnTk6MupZQdz87Hb7YXxivv7tdQqs0EKA

>Body-> raw (json)
```js
{
    "title": "Sofia, the alumni killer",
    "body": "Y si...olvidó mi cumple",
    "userId" :"644652ed8c643dc5abe8eb46"
}
```
| ACCÍON  | OPERACIÓN CRUD | RUTA
| :-----------:   | :---------- | :----------- |
|Actualizar publicación | PUT | localhost:8080/posts/update/|

>HEADERS -> Authorisation

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ2NTJlZDhjNjQzZGM1YWJlOGViNDYiLCJpYXQiOjE2ODIzMzA5MzR9.5bva2ATkY3EnTk6MupZQdz87Hb7YXxivv7tdQqs0EKA

>Body-> raw (json)
```js
{
    "title": "Post 2 UPDATED",
    "body": "Así vemos QUE SÍ varia este contenido"
}
```
| ACCÍON  | OPERACIÓN CRUD | RUTA
| :-----------:   | :---------- | :----------- |
|Borrar publicación | DELETE | localhost:8080/posts/delete/|


>HEADERS -> Authorisation
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ2NTJlZDhjNjQzZGM1YWJlOGViNDYiLCJpYXQiOjE2ODIzMzA5MzR9.5bva2ATkY3EnTk6MupZQdz87Hb7YXxivv7tdQqs0EKA'

>Params -> Publicación_ID
'644672e7725ae01cac4808f0'

| ACCÍON  | OPERACIÓN CRUD | RUTA
| :-----------:   | :---------- | :----------- |
|Mostrar publicación por ID | GET | localhost:8080/posts/postsById/|


>HEADERS -> Authorisation
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ2NTJlZDhjNjQzZGM1YWJlOGViNDYiLCJpYXQiOjE2ODIzMzA5MzR9.5bva2ATkY3EnTk6MupZQdz87Hb7YXxivv7tdQqs0EKA'

>Params -> Publicación_ID
'644672e7725ae01cac4808f0'


| ACCÍON  | OPERACIÓN CRUD | RUTA
| :-----------:   | :---------- | :----------- |
|Mostrar publicación por título | GET | localhost:8080/posts/postsByTitle|


>HEADERS -> Authorisation
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ2NTJlZDhjNjQzZGM1YWJlOGViNDYiLCJpYXQiOjE2ODIzMzA5MzR9.5bva2ATkY3EnTk6MupZQdz87Hb7YXxivv7tdQqs0EKA'

>Params -> Título
'Palabras que contengan título'


| ACCÍON  | OPERACIÓN CRUD | RUTA
| :-----------:   | :---------- | :----------- |
|Todas los usuarios+publ+coment | GET | localhost:8080/posts/getAllPosts|


>HEADERS -> Authorisation
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ2NTJlZDhjNjQzZGM1YWJlOGViNDYiLCJpYXQiOjE2ODIzMzA5MzR9.5bva2ATkY3EnTk6MupZQdz87Hb7YXxivv7tdQqs0EKA'


| ACCÍON  | OPERACIÓN CRUD | RUTA
| :-----------:   | :---------- | :----------- |
|Ver publicaciones paginadas | GET | localhost:8080/posts/getPostsPaginated?page=1&limit=10|


>HEADERS -> Authorisation
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ2NTJlZDhjNjQzZGM1YWJlOGViNDYiLCJpYXQiOjE2ODIzMzA5MzR9.5bva2ATkY3EnTk6MupZQdz87Hb7YXxivv7tdQqs0EKA'

>Params -> 
-page : 1
-limit: 10


| ACCÍON  | OPERACIÓN CRUD | RUTA
| :-----------:   | :---------- | :----------- |
|Dar LIKE a publicación | PUT | localhost:8080/posts/likes/|


>HEADERS -> Authorisation
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ2NTJlZDhjNjQzZGM1YWJlOGViNDYiLCJpYXQiOjE2ODIzMzA5MzR9.5bva2ATkY3EnTk6MupZQdz87Hb7YXxivv7tdQqs0EKA'

>Params -> Publicación_ID

| ACCÍON  | OPERACIÓN CRUD | RUTA
| :-----------:   | :---------- | :----------- |
|Quitar LIKE a publicación | DELETE | localhost:8080/posts/dislike/|


>HEADERS -> Authorisation
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ2NTJlZDhjNjQzZGM1YWJlOGViNDYiLCJpYXQiOjE2ODIzMzA5MzR9.5bva2ATkY3EnTk6MupZQdz87Hb7YXxivv7tdQqs0EKA'

>Params -> Publicación_ID


## ENDPOINTS de la Colección: Comentarios
[⬆️](#índice)

| ACCÍON  | OPERACIÓN CRUD | RUTA
| :-----------:   | :---------- | :----------- |
|Crear comentario | POST | localhost:8080/comments/create|

>HEADERS -> Authorisation

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ2NTJlZDhjNjQzZGM1YWJlOGViNDYiLCJpYXQiOjE2ODIzMzA5MzR9.5bva2ATkY3EnTk6MupZQdz87Hb7YXxivv7tdQqs0EKA

>Body-> raw (json)
```js
{
    "commentTitle" : "Comentario para borrar",
    "commentBody": "Comentario para borrar",
    "userId": "644652ed8c643dc5abe8eb46",
    "postId" : "644672b7725ae01cac4808ed"
}
```
| ACCÍON  | OPERACIÓN CRUD | RUTA
| :-----------:   | :---------- | :----------- |
|Borrar comentario | DELETE | localhost:8080/comments/delete/|


>HEADERS -> Authorisation
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ2NTJlZDhjNjQzZGM1YWJlOGViNDYiLCJpYXQiOjE2ODIzMzA5MzR9.5bva2ATkY3EnTk6MupZQdz87Hb7YXxivv7tdQqs0EKA'

>Params -> Comentario_ID

| ACCÍON  | OPERACIÓN CRUD | RUTA
| :-----------:   | :---------- | :----------- |
|Crear comentario por ID public.| POST | localhost:8080/comments/commentByPostId/|

>HEADERS -> Authorisation

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ2NTJlZDhjNjQzZGM1YWJlOGViNDYiLCJpYXQiOjE2ODIzMzA5MzR9.5bva2ATkY3EnTk6MupZQdz87Hb7YXxivv7tdQqs0EKA

>Body-> raw (json)
```js
{
    "commentTitle" : "Comentario KILLER ",
    "commentBody": "Es mentira"
}

```

***
# Herramientas empleadas en el proyecto (TOOLSET) ⚙️

-Github (dónde alojamos repositorios)

-Node (entorno de ejecución para ejecutar JavaScript en la parte del servidor):
	-Versión: 18.16.0 
 	-Doc: https://nodejs.org/dist/latest-v18.x/docs/api/ 

-Express (es un framework para Node Js)
	-Versión: 4,18,2
	-Doc: https://expressjs.com/en/4x/api.html 

-Mongoose (ODM Ayuda a modelar una base de datos de MONGODB de manera sencilla)
	-Versión: 7.2.2
	-Doc: https://mongoosejs.com/docs/guide.html 

-Sequelize (ORM Ayuda a modelar una base de datos de MySQL de manera sencilla)
	-Versión: 
	-Doc: https://sequelize.org/api/v6/identifiers.html 
	-Security: https://github.com/sequelize/sequelize/blob/main/SECURITY.md 

-Multer (middleware que permite la subida de documentos e imágenes a través de formulario)
	-Versión: 1.4.5-lts.1 
	-Doc: https://github.com/expressjs/multer/blob/master/doc/README-es.md 
-DOTENV (herramienta para asignar variables de entorno a valores que queremos ocultar -como el puerto, clave de token etc, y evitar que se suban a repositorios /publicarlas )
	-Versión: 16.1.3
	-Doc: https://www.npmjs.com/package/dotenv 

-JSONWEBTOKEN (herramienta de creación de tokens para archivos en formato JSON)
	-Versión: 9.0.0
	-Doc: https://www.npmjs.com/package/jsonwebtoken 

-BCRYPTJS (herramienta para cifrar contraseñas -hashearlas)
	-Versión:  2.4.3
	-Doc: https://www.npmjs.com/package/bcryptjs 

-CORS (recurso que usamos para que al trabajar en modo local el backend .Evita que las peticiones a las APIS no lancen errores  al ser llamadas desde el frontend que a su vez, tambien lanza dichas peticiones en local. Una vez el backend se despliega, ya no es necesario usar esta dependencia)
	-Versión: 2.8.5
	-Doc: https://www.npmjs.com/package/cors 

-NODEMAILER (módulo para el evío de mails)
	-Versión: 6.9.3
	-Doc: https://nodemailer.com/about/ 
	-Extra: https://www.npmjs.com/package/nodemailer 

-NODEMON (dependencia de desarrollo usada para evitar tener que levantar el servidor tras efectuar cambios en el código)
	-Versión: 2.0.22
	-Doc: https://www.npmjs.com/package/nodemon 




>* [*TRELLO*](https://trello.com/) - Planificador de tareas (Versión: no disponible)
>* [*POSTMAN*](https://www.postman.com/) - Software para probar y documentar endpoints (Versión: 10.13.5)
>* [*SWAGGER*](https://swagger.io/) - Plataforma de documentación de API's (Versión: 4.6.2)
>* [*VISUAL STUDIO CODE*](https://code.visualstudio.com/) - Editor de código (Versión: 1.75.1)
>* [*NodeJS*](https://code.visualstudio.com/) - Entorno de ejecución para crear servidores en backend (Versión: 18.15.0)
>* [*Nodemon*](https://www.npmjs.com/package/nodemon/) - Herramienta para desarrollo que levanta el servidor automáticamente tras cada cambio realizado en el código (Versión: 18.15.0)
>* [*MONGODB*](https://www.mongodb.com//) - Gestor de base de datos (Versión: 6.0)
>* [*MONGOOSE*](https://mongoosejs.com/) - Herramienta de modelado de objetos para Node Js (Versión: 7.0.4)
>* [*ATLAS (MONGODB)*](https://cloud.mongodb.com/) - Alojamiento de MONGODB para la/s base/s de datos empleando clústers (Versión: 6.0)
>* [*BCRYPT*](https://code.visualstudio.com/) - Dependencia para la encriptación y comprobación de contraseñas (Versión: 1.4.3)
>* [*JASON WEB TOKEN*](https://code.visualstudio.com/) - Dependencia para generar tokens de acceso (Versión: 9.0.0)
>* [*DOTENV*](https://code.visualstudio.com/) - Dependencia para establecer las variables globales y poder desplegar (Versión: 16.0.3)
>* [*VERCEL*](https://code.visualstudio.com/) - Plataforma para el despliegue del servidor(Versión: 1.75.1)
>* [*Live Server*](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) -Extension de Visual Studio para check durante la fase de desarrollo y en entorno local.

***
# Autores ✒️
[⬆️](#índice)

**Guillermo Soler** - | *Coding* | - [GuilleSoler87](https://github.com/GuilleSoler87

**Francisco Niederleytner
** - | *Coding* | - [pacool1234](https://github.com/pacool1234)

***
**Joan Baldó** - | *Coding* | - [joanbaldo](https://github.com/joanbaldo)

***