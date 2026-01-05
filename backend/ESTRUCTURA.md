# 📂 Estructura Completa del Backend

```
backend/
│
├── 📄 server.js                    # ⭐ Punto de entrada principal
├── 📄 package.json                 # Dependencias del proyecto
├── 📄 .env                         # ⚠️ Variables de entorno (EDITAR AQUÍ)
├── 📄 .env.example                 # Plantilla de variables
├── 📄 .gitignore                   # Archivos ignorados por Git
├── 📄 README.md                    # Documentación completa
├── 📄 QUICK_START.md               # Guía de inicio rápido
├── 📄 seed.js                      # Script para datos de prueba
│
└── 📁 src/
    │
    ├── 📁 config/
    │   └── database.js             # Conexión a MongoDB
    │
    ├── 📁 models/
    │   ├── Product.js              # Modelo de Producto
    │   └── Mascota.js              # Modelo de Mascota
    │
    ├── 📁 controllers/
    │   ├── productController.js    # Lógica de productos
    │   └── mascotaController.js    # Lógica de mascotas
    │
    ├── 📁 routes/
    │   ├── products.js             # Rutas de productos
    │   └── mascotas.js             # Rutas de mascotas
    │
    └── 📁 middleware/
        └── errorHandler.js         # Manejo de errores
```

## 🔑 Archivos Clave

### 1. ⚠️ `.env` - EDITAR PRIMERO
```env
MONGODB_URI=mongodb+srv://manolosanchez2005:TU_PASSWORD@...
```
**Acción requerida**: Reemplaza `<db_password>` con tu contraseña real de MongoDB

### 2. 🚀 `server.js`
Punto de entrada que:
- Conecta a MongoDB
- Configura Express
- Define las rutas
- Inicia el servidor en puerto 5000

### 3. 📊 `seed.js`
Script para poblar la base de datos con:
- 6 productos de ejemplo
- 5 mascotas de ejemplo

**Ejecutar con**: `npm run seed`

## 🗂️ Organización por Capas

### 📁 Models (Modelos)
Define la estructura de datos en MongoDB
- `Product.js` → Esquema de productos
- `Mascota.js` → Esquema de mascotas

### 📁 Controllers (Controladores)
Contiene la lógica de negocio
- CRUD completo (Create, Read, Update, Delete)
- Validaciones
- Filtros y búsquedas

### 📁 Routes (Rutas)
Define los endpoints de la API
- `/api/products` → Rutas de productos
- `/api/mascotas` → Rutas de mascotas

### 📁 Middleware
Funcionalidades transversales
- Manejo de errores
- Validaciones (futuro)
- Autenticación (futuro)

## 🔗 Flujo de una Petición

```
1. Cliente (Frontend)
   ↓
2. server.js (Express)
   ↓
3. Routes (products.js o mascotas.js)
   ↓
4. Controllers (productController.js o mascotaController.js)
   ↓
5. Models (Product.js o Mascota.js)
   ↓
6. MongoDB (Base de datos)
   ↓
7. Respuesta al cliente
```

## 📝 Endpoints Disponibles

### Productos
- `GET    /api/products`       → Listar todos
- `GET    /api/products/:id`   → Ver uno
- `POST   /api/products`       → Crear nuevo
- `PUT    /api/products/:id`   → Actualizar
- `DELETE /api/products/:id`   → Eliminar

### Mascotas
- `GET    /api/mascotas`                    → Listar todas
- `GET    /api/mascotas/:id`                → Ver una
- `GET    /api/mascotas/nombre/:nombre`     → Buscar por nombre
- `POST   /api/mascotas`                    → Crear nueva
- `PUT    /api/mascotas/:id`                → Actualizar
- `DELETE /api/mascotas/:id`                → Eliminar
- `POST   /api/mascotas/:id/vacunas`        → Agregar vacuna
- `GET    /api/mascotas/:id/proximas-vacunas` → Ver próximas vacunas

## 🎯 Próximos Pasos

1. ✅ **Instalar**: `npm install`
2. ✅ **Configurar**: Editar `.env` con tu contraseña
3. ✅ **Poblar**: `npm run seed`
4. ✅ **Iniciar**: `npm run dev`
5. ✅ **Probar**: Abrir http://localhost:5000

## 💡 Tips

- 🔄 **Auto-reload**: Usa `npm run dev` para desarrollo
- 🧪 **Datos de prueba**: Ejecuta `npm run seed` las veces que quieras
- 📝 **Logs**: Verás todas las peticiones en la consola
- 🐛 **Debug**: Los errores se muestran con detalles en desarrollo

---

**¿Perdido?** Lee `QUICK_START.md` para instrucciones paso a paso.
