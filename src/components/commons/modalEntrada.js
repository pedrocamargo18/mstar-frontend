import { useState, useEffect } from "react";

export default function ModalEntrada({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    quantidade: "",
    dataHora: "",
    local: "",
    mercadoriaId: "",
  });

  const [mercadorias, setMercadorias] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetch("http://localhost:5000/mercadorias")
        .then((response) => response.json())
        .then((data) => {
          setMercadorias(data);
        })
        .catch((error) => {
          console.error("Erro ao carregar mercadorias:", error);
        });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormData((prevState) => ({
      ...prevState
    }));

    try {
      const response = await fetch("http://localhost:5000/add-entrada", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao adicionar entrada");
      }

      const newEntrada = await response.json();

      if (newEntrada) {
        onAdd(newEntrada);
        onClose();
        window.location.reload();
      } else {
        throw new Error("Erro ao adicionar entrada");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Adicionar Entrada</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            name="quantidade"
            placeholder="Quantidade"
            value={formData.quantidade}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="local"
            placeholder="Local"
            value={formData.local}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <select
            name="mercadoriaId"
            value={formData.mercadoriaId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Selecione a Entrada</option>
            {mercadorias.map((mercadoria) => (
              <option key={mercadoria.id} value={mercadoria.id}>
                {mercadoria.nome}
              </option>
            ))}
          </select>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-accent-success text-white rounded"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
