# 🚀 Inicio Rápido - Backend

## Paso 1: Configurar MongoDB

Edita el archivo `.env` y reemplaza `<db_password>` con tu contraseña real:

```env
MONGODB_URI=mongodb+srv://manolosanchez2005:TU_PASSWORD_REAL@manuel.ftfhp.mongodb.net/mascotas-db?retryWrites=true&w=majority&appName=manuel
```

## Paso 2: Instalar dependencias

```bash
npm install
```

## Paso 3: Poblar la base de datos con datos de prueba

```bash
npm run seed
```

Esto creará:
- ✅ 6 productos de ejemplo
- ✅ 5 mascotas de ejemplo con sus vacunas

## Paso 4: Iniciar el servidor

```bash
npm run dev
```

Verás algo como:

```
✅ MongoDB Conectado: manuel.ftfhp.mongodb.net
📊 Base de datos: mascotas-db
==================================================
🚀 Servidor corriendo en puerto 5000
🌍 Entorno: development
📡 URL: http://localhost:5000
==================================================
```

## Paso 5: Probar la API

Abre tu navegador en:

- **Ruta principal**: http://localhost:5000
- **Productos**: http://localhost:5000/api/products
- **Mascotas**: http://localhost:5000/api/mascotas

## ✅ ¡Listo!

Ahora tu backend está corriendo y listo para conectarse con el frontend.

## 🔧 Comandos Útiles

```bash
# Iniciar en modo desarrollo (auto-reload)
npm run dev

# Iniciar en modo producción
npm start

# Volver a poblar la base de datos
npm run seed
```

## 📱 Probar con el Frontend

1. Asegúrate de que el backend esté corriendo en puerto 5000
2. Ve a la carpeta del frontend
3. Ejecuta `npm start`
4. El frontend se conectará automáticamente al backend

## 🐛 Problemas Comunes

### Error: "bad auth"
❌ Contraseña incorrecta en `.env`
✅ Verifica tu contraseña de MongoDB Atlas

### Error: "EADDRINUSE"
❌ Puerto 5000 ya está en uso
✅ Cambia el puerto en `.env` o cierra la aplicación que usa el puerto

### Error: "Cannot find module"
❌ Dependencias no instaladas
✅ Ejecuta `npm install`

---

¿Necesitas ayuda? Revisa el README.md completo para más información.
