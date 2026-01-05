import React from "react";
import { useNavigate } from "react-router-dom";

const MascotaCard = () => {
  const navigate = useNavigate();

  const mascotas = [
    {
      imagen:
        "https://i.pinimg.com/originals/5f/29/1f/5f291f6b39b312ffdb27bb9bd8ccab0d.jpg",
      nombre: "Mishifu",
      edad: "2 años",
      genero: "Macho",
      raza: "Ragdoll",
      estado: "Adoptado",
    },
    {
      imagen:
        "https://static.vecteezy.com/system/resources/previews/014/026/567/original/cute-cartoon-anime-white-wolf-png.png",
      nombre: "Lou",
      edad: "1 año",
      genero: "Hembra",
      raza: "Lobo",
      estado: "Disponible",
    },
    {
      imagen:
        "https://i.pinimg.com/564x/6b/31/0a/6b310a18c8f750b5304711b2e3ef7e27.jpg",
      nombre: "Shadow",
      edad: "3 años",
      genero: "Macho",
      raza: "Doméstico",
      estado: "En adopción",
    },
    {
      imagen:
        "https://i.pinimg.com/originals/8b/c3/c9/8bc3c9bbbcf4fe2072bff325a65712eb.jpg",
      nombre: "Pingu",
      edad: "6 meses",
      genero: "Macho",
      raza: "Pingüino emperador",
      estado: "Disponible",
    },
  ];

  const irADetalle = (nombre: string) => {
    navigate(`/mascota/${nombre}`);
  };

  const irAFormularioNueva = () => {
    navigate("/nueva-mascota");
  };

  return (
    <div className="p-6">
      {/* Botón para agregar nueva mascota */}
      <div className="flex justify-center mb-6">
        <button
          onClick={irAFormularioNueva}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-200"
        >
          ➕ Agregar Nueva Mascota
        </button>
      </div>

      {/* Lista de mascotas */}
      <div className="flex flex-wrap justify-center gap-6">
        {mascotas.map((m, i) => (
          <div
            key={i}
            onClick={() => irADetalle(m.nombre)}
            className="flex bg-gray-200 rounded-2xl p-4 w-80 shadow-lg items-center cursor-pointer transition-transform duration-200 hover:scale-105"
          >
            <img
              src={m.imagen}
              alt={m.nombre}
              className="w-28 h-36 object-cover rounded-2xl mr-4"
            />
            <div className="text-sm">
              <p>
                <strong>Nombre:</strong> {m.nombre}
              </p>
              <p>
                <strong>Edad:</strong> {m.edad}
              </p>
              <p>
                <strong>Género:</strong> {m.genero}
              </p>
              <p>
                <strong>Raza:</strong> {m.raza}
              </p>
              <p>
                <strong>Estado:</strong> {m.estado}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MascotaCard;
