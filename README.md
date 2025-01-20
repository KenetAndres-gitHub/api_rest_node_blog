# API REST con Node.js, Express y Sequelize

Este proyecto es una API para gestionar artículos en una base de datos PostgreSQL, utilizando Node.js, Express y Sequelize.

## Requisitos

- Node.js (versión recomendada: 18 o superior)
- PostgreSQL
- Un archivo de configuración en la carpeta `database` con credenciales de acceso (ya incluido como `config.js`)

## Instalación

1. Clona el repositorio:  
   git clone <URL_DEL_REPOSITORIO>
2. Instala las dependencias:  
   npm install
3. Inicia el servidor:  
   npm start

## Estructura de Carpetas

- `index.js`: Punto de entrada de la aplicación.  
- `database/`: Contiene la configuración de Sequelize (config y sequelize.js).  
- `models/`: Contiene los modelos de la base de datos (por ejemplo, Article.js).  
- `controllers/`: Contiene la lógica para cada ruta (por ejemplo, article.js).  
- `routes/`: Define las rutas (article.js).  
- `helpers/`: Incluye utilidades o funciones de validación.

## Endpoints Principales

- POST /api/add/articles: Crea un nuevo artículo.  
- GET /api/get/articles/:ultimos?: Muestra todos o los últimos N artículos.  
- GET /api/get/article/:id: Muestra un artículo por ID.  
- DELETE /api/delete/article/:id: Elimina un artículo por ID.  
- PUT /api/update/article/:id: Actualiza un artículo por ID.

## Contribuciones

1. Crea un fork de este repositorio.  
2. Crea una rama para tu nueva funcionalidad:  
   git checkout -b feature/nueva-funcionalidad  
3. Haz commit de tus cambios:  
   git commit -m "Descripción de la funcionalidad"  
4. Envía tus cambios a GitHub:  
   git push origin feature/nueva-funcionalidad  
5. Crea un Pull Request describiendo tus cambios.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.