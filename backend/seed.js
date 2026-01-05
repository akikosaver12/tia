require('dotenv').config();
const connectDB = require('./src/config/database');
const Product = require('./src/models/Product');
const Mascota = require('./src/models/Mascota');

// Datos de ejemplo para productos
const productsData = [
  {
    name: "Collar Ajustable para Perro",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400",
    category: "accessories",
    description: "Collar resistente y ajustable, ideal para paseos diarios",
    stock: 50
  },
  {
    name: "Comida Premium para Gatos",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400",
    category: "food",
    description: "Alimento balanceado rico en proteínas, 5kg",
    stock: 30
  },
  {
    name: "Casa para Mascotas",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1611003228941-98852ba62227?w=400",
    category: "accessories",
    description: "Casa cómoda y acogedora para mascotas pequeñas y medianas",
    stock: 15
  },
  {
    name: "Juguete Interactivo",
    price: 12.50,
    image: "https://images.unsplash.com/photo-1535241749838-299277b6305f?w=400",
    category: "toys",
    description: "Juguete dispensador de premios para entretenimiento",
    stock: 75
  },
  {
    name: "Champú Especial Anti-pulgas",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
    category: "accessories",
    description: "Champú medicado para el control de pulgas, 500ml",
    stock: 40
  },
  {
    name: "Arnés de Seguridad",
    price: 22.99,
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400",
    category: "accessories",
    description: "Arnés acolchado con reflectivos para mayor seguridad",
    stock: 35
  }
];

// Datos de ejemplo para mascotas
const mascotasData = [
  {
    nombre: "Max",
    años: 3,
    raza: "Labrador Retriever",
    estado: "saludable",
    genero: "macho",
    imagen: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400",
    peso: 28.5,
    colorPelaje: "Dorado",
    vacunas: [
      {
        nombre: "Rabia",
        fecha: new Date("2024-01-15"),
        proximaDosis: new Date("2025-01-15"),
        veterinario: "Dr. García"
      },
      {
        nombre: "Parvovirus",
        fecha: new Date("2024-02-20"),
        proximaDosis: new Date("2025-02-20"),
        veterinario: "Dr. García"
      }
    ],
    propietario: {
      nombre: "Juan Pérez",
      telefono: "+57 300 123 4567",
      email: "juan.perez@email.com"
    },
    observaciones: "Muy activo y juguetón. Le encanta nadar."
  },
  {
    nombre: "Luna",
    años: 2,
    raza: "Persa",
    estado: "saludable",
    genero: "hembra",
    imagen: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400",
    peso: 4.2,
    colorPelaje: "Blanco",
    vacunas: [
      {
        nombre: "Triple Felina",
        fecha: new Date("2024-03-10"),
        proximaDosis: new Date("2025-03-10"),
        veterinario: "Dra. Martínez"
      }
    ],
    propietario: {
      nombre: "María González",
      telefono: "+57 310 987 6543",
      email: "maria.gonzalez@email.com"
    },
    observaciones: "Tranquila y cariñosa. Prefiere espacios tranquilos."
  },
  {
    nombre: "Rocky",
    años: 5,
    raza: "Bulldog Francés",
    estado: "en tratamiento",
    genero: "macho",
    imagen: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400",
    peso: 12.8,
    colorPelaje: "Atigrado",
    vacunas: [
      {
        nombre: "Rabia",
        fecha: new Date("2023-11-05"),
        proximaDosis: new Date("2024-11-05"),
        veterinario: "Dr. López"
      }
    ],
    propietario: {
      nombre: "Carlos Ramírez",
      telefono: "+57 320 456 7890",
      email: "carlos.ramirez@email.com"
    },
    observaciones: "En tratamiento por alergia en la piel. Requiere dieta especial."
  },
  {
    nombre: "Mimi",
    años: 1,
    raza: "Siamés",
    estado: "saludable",
    genero: "hembra",
    imagen: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400",
    peso: 3.5,
    colorPelaje: "Crema con puntos oscuros",
    vacunas: [
      {
        nombre: "Triple Felina",
        fecha: new Date("2024-06-15"),
        proximaDosis: new Date("2025-06-15"),
        veterinario: "Dra. Martínez"
      }
    ],
    propietario: {
      nombre: "Ana Torres",
      telefono: "+57 315 234 5678",
      email: "ana.torres@email.com"
    },
    observaciones: "Muy curiosa y activa. Le gusta trepar."
  },
  {
    nombre: "Zeus",
    años: 4,
    raza: "Pastor Alemán",
    estado: "saludable",
    genero: "macho",
    imagen: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=400",
    peso: 35.0,
    colorPelaje: "Negro y marrón",
    vacunas: [
      {
        nombre: "Rabia",
        fecha: new Date("2024-04-20"),
        proximaDosis: new Date("2025-04-20"),
        veterinario: "Dr. García"
      },
      {
        nombre: "Parvovirus",
        fecha: new Date("2024-04-20"),
        veterinario: "Dr. García"
      }
    ],
    propietario: {
      nombre: "Pedro Sánchez",
      telefono: "+57 305 876 5432",
      email: "pedro.sanchez@email.com"
    },
    observaciones: "Excelente perro guardián. Entrenado en obediencia básica."
  }
];

// Función para poblar la base de datos
const seedDatabase = async () => {
  try {
    // Conectar a la base de datos
    await connectDB();

    console.log('\n🗑️  Limpiando base de datos...');
    
    // Eliminar datos existentes
    await Product.deleteMany({});
    await Mascota.deleteMany({});
    
    console.log('✅ Base de datos limpiada\n');

    console.log('📦 Insertando productos...');
    const products = await Product.insertMany(productsData);
    console.log(`✅ ${products.length} productos insertados\n`);

    console.log('🐾 Insertando mascotas...');
    const mascotas = await Mascota.insertMany(mascotasData);
    console.log(`✅ ${mascotas.length} mascotas insertadas\n`);

    console.log('🎉 ¡Datos de prueba insertados exitosamente!\n');
    console.log('📊 Resumen:');
    console.log(`   - Productos: ${products.length}`);
    console.log(`   - Mascotas: ${mascotas.length}`);
    console.log('\n✨ Puedes probar la API en: http://localhost:5000\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error poblando la base de datos:', error);
    process.exit(1);
  }
};

// Ejecutar el script
seedDatabase();
