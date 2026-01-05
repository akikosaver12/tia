# 🐾 Backend de Mascotas - API REST con MongoDB

Backend completo para la aplicación de gestión de mascotas y productos, construido con **Node.js**, **Express** y **MongoDB**.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Endpoints de la API](#endpoints-de-la-api)
- [Modelos de Datos](#modelos-de-datos)

## ✨ Características

- ✅ API RESTful completa
- ✅ MongoDB con Mongoose ODM
- ✅ CRUD completo para Productos y Mascotas
- ✅ Sistema de vacunas para mascotas
- ✅ Búsquedas y filtros avanzados
- ✅ Validación de datos
- ✅ Manejo de errores centralizado
- ✅ CORS configurado
- ✅ Soft delete (eliminación suave)

## 🛠️ Tecnologías

- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **dotenv** - Variables de entorno
- **cors** - Manejo de CORS
- **morgan** - Logger HTTP

## 📦 Instalación

### 1. Instalar Node.js

Asegúrate de tener **Node.js v16+** instalado:

```bash
node --version
npm --version
```

### 2. Instalar dependencias

```bash
cd backend
npm install
```

## ⚙️ Configuración

### 1. Configurar MongoDB

Edita el archivo `.env` y reemplaza `<db_password>` con tu contraseña real de MongoDB:

```env
PORT=5000
MONGODB_URI=mongodb+srv://manolosanchez2005:TU_PASSWORD_AQUI@manuel.ftfhp.mongodb.net/mascotas-db?retryWrites=true&w=majority&appName=manuel
NODE_ENV=development
```

⚠️ **IMPORTANTE**: Reemplaza `TU_PASSWORD_AQUI` con tu contraseña real de MongoDB Atlas.

### 2. Verificar conexión

Para verificar que todo está configurado correctamente, ejecuta:

```bash
npm start
```

Deberías ver:

```
✅ MongoDB Conectado: manuel.ftfhp.mongodb.net
📊 Base de datos: mascotas-db
🚀 Servidor corriendo en puerto 5000
```

## 🚀 Uso

### Modo Desarrollo (con auto-reload)

```bash
npm run dev
```

### Modo Producción

```bash
npm start
```

El servidor estará disponible en: `http://localhost:5000`

## 📡 Endpoints de la API

### **Productos**

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/products` | Obtener todos los productos |
| `GET` | `/api/products/:id` | Obtener producto por ID |
| `POST` | `/api/products` | Crear nuevo producto |
| `PUT` | `/api/products/:id` | Actualizar producto |
| `DELETE` | `/api/products/:id` | Eliminar producto (soft delete) |

**Query params para GET /api/products:**
- `category` - Filtrar por categoría
- `search` - Buscar por nombre/descripción
- `minPrice` - Precio mínimo
- `maxPrice` - Precio máximo

**Ejemplo de petición POST:**

```json
{
  "name": "Collar para perro",
  "price": 15.99,
  "image": "https://example.com/collar.jpg",
  "category": "accessories",
  "description": "Collar resistente de nylon",
  "stock": 50
}
```

### **Mascotas**

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/mascotas` | Obtener todas las mascotas |
| `GET` | `/api/mascotas/:id` | Obtener mascota por ID |
| `GET` | `/api/mascotas/nombre/:nombre` | Buscar mascota por nombre |
| `POST` | `/api/mascotas` | Crear nueva mascota |
| `PUT` | `/api/mascotas/:id` | Actualizar mascota |
| `DELETE` | `/api/mascotas/:id` | Eliminar mascota (soft delete) |
| `POST` | `/api/mascotas/:id/vacunas` | Agregar vacuna a mascota |
| `GET` | `/api/mascotas/:id/proximas-vacunas` | Obtener próximas vacunas |

**Query params para GET /api/mascotas:**
- `estado` - Filtrar por estado (saludable, enfermo, etc.)
- `raza` - Filtrar por raza
- `search` - Buscar por nombre/raza

**Ejemplo de petición POST:**

```json
{
  "nombre": "Max",
  "años": 3,
  "raza": "Labrador",
  "estado": "saludable",
  "genero": "macho",
  "imagen": "https://example.com/max.jpg",
  "peso": 25.5,
  "colorPelaje": "dorado",
  "propietario": {
    "nombre": "Juan Pérez",
    "telefono": "+57 300 123 4567",
    "email": "juan@example.com"
  }
}
```

**Ejemplo de agregar vacuna:**

```json
{
  "nombre": "Rabia",
  "fecha": "2024-01-15",
  "proximaDosis": "2025-01-15",
  "veterinario": "Dr. García"
}
```

## 📊 Modelos de Datos

### Product Schema

```javascript
{
  name: String,        // Nombre del producto
  price: Number,       // Precio
  image: String,       // URL de la imagen
  category: String,    // Categoría
  description: String, // Descripción
  stock: Number,       // Stock disponible
  active: Boolean,     // Si está activo
  createdAt: Date,     // Fecha de creación
  updatedAt: Date      // Fecha de actualización
}
```

### Mascota Schema

```javascript
{
  nombre: String,      // Nombre de la mascota
  años: Number,        // Edad
  raza: String,        // Raza
  estado: String,      // Estado de salud
  genero: String,      // Género (macho/hembra)
  imagen: String,      // URL de la imagen
  peso: Number,        // Peso en kg
  colorPelaje: String, // Color del pelaje
  vacunas: [{          // Array de vacunas
    nombre: String,
    fecha: Date,
    proximaDosis: Date,
    veterinario: String
  }],
  propietario: {       // Información del dueño
    nombre: String,
    telefono: String,
    email: String
  },
  observaciones: String,
  active: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Probar la API

### Con cURL

```bash
# Obtener todos los productos
curl http://localhost:5000/api/products

# Crear un producto
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Collar","price":15.99,"category":"accessories"}'

# Obtener todas las mascotas
curl http://localhost:5000/api/mascotas
```

### Con Postman o Thunder Client

1. Importa la colección desde `/docs/postman_collection.json` (si existe)
2. O crea las peticiones manualmente usando los endpoints listados arriba

## 📁 Estructura del Proyecto

```
backend/
├── server.js                 # Punto de entrada
├── package.json              # Dependencias
├── .env                      # Variables de entorno
├── .gitignore               # Archivos ignorados por Git
└── src/
    ├── config/
    │   └── database.js      # Configuración de MongoDB
    ├── models/
    │   ├── Product.js       # Modelo de Producto
    │   └── Mascota.js       # Modelo de Mascota
    ├── controllers/
    │   ├── productController.js
    │   └── mascotaController.js
    ├── routes/
    │   ├── products.js
    │   └── mascotas.js
    └── middleware/
        └── errorHandler.js  # Manejo de errores
```

## 🐛 Solución de Problemas

### Error: "MongoServerError: bad auth"

❌ **Problema**: Contraseña incorrecta en MongoDB

✅ **Solución**: Verifica que la contraseña en `.env` sea correcta

### Error: "EADDRINUSE: address already in use"

❌ **Problema**: El puerto 5000 ya está en uso

✅ **Solución**: 
```bash
# Cambiar puerto en .env
PORT=5001
```

### Error: "Cannot find module 'express'"

❌ **Problema**: Dependencias no instaladas

✅ **Solución**:
```bash
npm install
```

## 📝 Notas Importantes

- ⚠️ **Seguridad**: En producción, implementa autenticación y autorización
- 🔐 **Variables de entorno**: Nunca subas el archivo `.env` a Git
- 📊 **Base de datos**: MongoDB Atlas tiene un límite gratuito de 512 MB
- 🚀 **Producción**: Considera usar PM2 o similar para producción

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

ISC

---

**Creado con ❤️ para la gestión de mascotas**
