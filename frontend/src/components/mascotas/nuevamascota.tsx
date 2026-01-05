import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function App() {
  const [imagen, setImagen] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      // Convertir el archivo a JPEG solo como nombre (el backend debería manejarlo realmente)
      const renamedFile = new File([files[0]], files[0].name.replace(/\.[^/.]+$/, ".jpeg"), { type: "image/jpeg" });
      setImagen(URL.createObjectURL(renamedFile));
    }
  };
  const handleSubmit = () => {
    // Aquí podrías enviar datos al backend y luego redirigir
    navigate("/mascotas"); // 👉 cambia "/mascotas" por la ruta que quieras
  };

  return (
    <div className="bg-gray-300 p-8 rounded-2xl max-w-3xl mx-auto mt-8 font-sans">
      <div className="flex flex-wrap gap-6">
        
        {/* Inputs */}
        <div className="flex-1">
          {['Nombre', 'Estado', 'Raza', 'Edad', 'Género'].map((campo, i) => (
            <div key={i} className="mb-3">
              <label className="block mb-1 font-medium">{campo}</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-xl bg-[#7a6e6e] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder={`Ingrese ${campo.toLowerCase()}`}
              />
            </div>
          ))}
        </div>

        {/* Imagen */}
        <div
          className={`w-56 h-64 rounded-full flex items-center justify-center text-center text-white text-base relative overflow-hidden transition-colors ${
            imagen ? "bg-transparent" : "bg-[#7a6e6e]"
          }`}
        >
          {imagen ? (
            <img
              src={imagen}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <label htmlFor="imagen" className="cursor-pointer">
              Subir una imagen
            </label>
          )}
          <input
            id="imagen"
            type="file"
            accept="image/jpeg"
            onChange={handleImagenChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Enfermedades */}
      <div className="mt-6">
        <label className="block mb-1 font-medium">Enfermedades</label>
        <textarea
          rows={4}
          className="w-full rounded-xl px-4 py-2 bg-[#7a6e6e] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholder="Escriba aquí las enfermedades"
        />
      </div>

      {/* Historial médico */}
      <div className="mt-6">
        <label className="block mb-1 font-medium">Historial médico</label>
        <textarea
          rows={5}
          className="w-full rounded-xl px-4 py-2 bg-[#7a6e6e] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholder="Escriba aquí el historial médico"
        />
      </div>

      {/* Botón */}
      <div className="mt-8">
        <button
          onClick={handleSubmit}
          className="bg-[#7a6e6e] hover:bg-[#5c5252] text-white px-6 py-3 rounded-xl font-medium transition-colors"
        >
          Crear mi mascota
        </button>
      </div>
    </div>
  );
}

export default App;
