import React, { useState } from 'react';

const MascotaInfo = () => {
  const [tab, setTab] = useState('info');
  const [showModal, setShowModal] = useState(false);

  const [formVacuna, setFormVacuna] = useState<{
    nombre: string;
    fecha: string;
    imagen: File | null;
  }>({
    nombre: '',
    fecha: '',
    imagen: null,
  });

  const [vacunasAplicadas, setVacunasAplicadas] = useState([
    {
      id: 1,
      nombre: 'Antirrábica',
      fecha: '2024-05-10',
      imagen: 'https://via.placeholder.com/100',
    },
    {
      id: 2,
      nombre: 'Triple Felina',
      fecha: '2024-03-02',
      imagen: 'https://via.placeholder.com/100',
    },
  ]);

  const mascota = {
    nombre: 'Bella',
    especie: 'Felino',
    sexo: 'Hembra',
    raza: 'Criolla',
    imagen:
      'https://i.pinimg.com/originals/dc/b4/9c/dcb49c0c2d2c9cf01bc03cb9bcf00f57.jpg',
  };

  const handleNuevaVacuna = () => {
    setShowModal(true);
  };

  const handleSubmitVacuna = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const nuevaVacuna = {
      id: Date.now(),
      nombre: formVacuna.nombre,
      fecha: formVacuna.fecha,
      imagen: formVacuna.imagen
        ? URL.createObjectURL(formVacuna.imagen)
        : 'https://via.placeholder.com/100',
    };
    setVacunasAplicadas([...vacunasAplicadas, nuevaVacuna]);
    setFormVacuna({ nombre: '', fecha: '', imagen: null });
    setShowModal(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Tabs */}
      <div className="flex border-b border-gray-300 mb-4">
        <button
          className={`px-4 py-2 ${
            tab === 'info'
              ? 'bg-gray-200 font-semibold rounded-t-lg'
              : 'bg-white text-gray-600'
          }`}
          onClick={() => setTab('info')}
        >
          Información
        </button>
        <button
          className={`px-4 py-2 ml-1 ${
            tab === 'vacunas'
              ? 'bg-gray-200 font-semibold rounded-t-lg'
              : 'bg-white text-gray-600'
          }`}
          onClick={() => setTab('vacunas')}
        >
          Registro de vacunas
        </button>
      </div>

      {/* Pestaña Información */}
      {tab === 'info' && (
        <div className="flex bg-gray-300 p-6 rounded-2xl items-center gap-8">
          <div className="flex-1 space-y-4">
            <div>
              <label className="block font-medium">Nombre de la mascota</label>
              <input
                type="text"
                value={mascota.nombre}
                readOnly
                className="block w-full mt-1 p-2 border border-gray-400 rounded"
              />
            </div>

            <div>
              <label className="block font-medium">Especie</label>
              <input
                type="text"
                value={mascota.especie}
                readOnly
                className="block w-full mt-1 p-2 border border-gray-400 rounded"
              />
            </div>

            <div>
              <label className="block font-medium">Sexo</label>
              <input
                type="text"
                value={mascota.sexo}
                readOnly
                className="block w-full mt-1 p-2 border border-gray-400 rounded"
              />
            </div>

            <div>
              <label className="block font-medium">Raza</label>
              <input
                type="text"
                value={mascota.raza}
                readOnly
                className="block w-full mt-1 p-2 border border-gray-400 rounded"
              />
            </div>
          </div>

          <div>
            <img
              src={mascota.imagen}
              alt="Mascota"
              className="w-64 h-64 object-cover rounded-full border-4 border-white shadow-md"
            />
          </div>
        </div>
      )}

      {/* Pestaña Registro de vacunas */}
      {tab === 'vacunas' && (
        <div className="bg-gray-300 p-6 rounded-2xl space-y-4">
          <div className="space-y-3">
            {vacunasAplicadas.map((vacuna) => (
              <div
                key={vacuna.id}
                className="flex items-center justify-between bg-white p-3 rounded shadow"
              >
                <div>
                  <p className="font-semibold">{vacuna.nombre}</p>
                  <p className="text-sm text-gray-600">
                    Fecha: {vacuna.fecha}
                  </p>
                </div>
                <img
                  src={vacuna.imagen}
                  alt={vacuna.nombre}
                  className="w-16 h-16 object-cover rounded"
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleNuevaVacuna}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
          >
            + Agregar nueva vacuna
          </button>
        </div>
      )}

      {/* Modal formulario */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Registrar nueva vacuna</h2>
            <form onSubmit={handleSubmitVacuna} className="space-y-4">
              <div>
                <label className="block font-medium">Nombre de la vacuna</label>
                <input
                  type="text"
                  value={formVacuna.nombre}
                  onChange={(e) =>
                    setFormVacuna({ ...formVacuna, nombre: e.target.value })
                  }
                  required
                  className="block w-full mt-1 p-2 border border-gray-400 rounded"
                />
              </div>

              <div>
                <label className="block font-medium">Fecha de aplicación</label>
                <input
                  type="date"
                  value={formVacuna.fecha}
                  onChange={(e) =>
                    setFormVacuna({ ...formVacuna, fecha: e.target.value })
                  }
                  required
                  className="block w-full mt-1 p-2 border border-gray-400 rounded"
                />
              </div>

              <div>
                <label className="block font-medium">Imagen comprobante</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormVacuna({
                      ...formVacuna,
                      imagen: e.target.files && e.target.files[0] ? e.target.files[0] : null,
                    })
                  }
                  className="block w-full mt-1 p-2 border border-gray-400 rounded"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MascotaInfo;
