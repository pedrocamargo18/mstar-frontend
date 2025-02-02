import { useState } from "react";

export default function ModalNovaMercadoria({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    nome: "",
    nro_registro: "",
    fabricante: "",
    tipo: "",
    descricao: "",
  });
  const [error, setError] = useState(""); 

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/add-mercadorias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao adicionar mercadoria");
      }

      const newMercadoria = await response.json();
      
      if (newMercadoria) {
        onAdd(newMercadoria);
        onClose(); 
        window.location.reload();

      } else {
        throw new Error("Erro ao adicionar mercadoria");
      }
    } catch (error) {
      console.error("Erro:", error);
      setError(error.message); 
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Adicionar Mercadoria</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="nro_registro"
            placeholder="Nº Registro"
            value={formData.nro_registro}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="fabricante"
            placeholder="Fabricante"
            value={formData.fabricante}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="tipo"
            placeholder="Tipo de Mercadoria"
            value={formData.tipo}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="descricao"
            placeholder="Descrição"
            value={formData.descricao}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          ></textarea>
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
