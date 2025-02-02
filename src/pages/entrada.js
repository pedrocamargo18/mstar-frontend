import { useState, useEffect } from "react";
import Sidebar from "../components/commons/sidebar";
import Button from "../components/ui/button";
import ExportButton from "../components/ui/exportButton";
import moment from "moment";
import ModalEntrada from "../components/commons/modalEntrada";

export default function Entrada() {
  const [entradas, setEntradas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchEntradas = async () => {
    try {
      const response = await fetch("http://localhost:5000/entradas");
      if (!response.ok) {
        throw new Error("Erro ao buscar entradas");
      }
      const data = await response.json();
      setEntradas(data);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntradas();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = entradas.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(entradas.length / itemsPerPage);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="container mx-auto my-4 px-4 bg-white rounded-md shadow-md sm:px-6 lg:px-8">
        <div className="top-0 max-w-full flex items-center justify-between py-5">
          <h2 className="text-3xl font-semibold border-b-4 border-accent-coral inline-block pb-1">
            Entradas
          </h2>
          <div>
            <ExportButton desc="Exportar PDF" format="pdf" page="entradas" />
            <Button
              onClick={() => setModalOpen(true)}
              nameBtn="Nova Entrada"
              colorBtn="success"
            />
          </div>
        </div>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className="overflow-x-auto flex justify-center">
            <table className="min-w-full table-auto border-collapse mt-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 border">Criado em</th>
                  <th className="py-2 px-4 border">ID</th>
                  <th className="py-2 px-4 border">Quantidade</th>
                  <th className="py-2 px-4 border">Mercadoria</th>
                  <th className="py-2 px-4 border">Local</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((entrada, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border">
                        {moment(entrada.created_at).format("DD/MM/YYYY HH:mm")}
                      </td>
                      <td className="py-2 px-4 border">{entrada.id}</td>
                      <td className="py-2 px-4 border">{entrada.quantidade}</td>
                      <td className="py-2 px-4 border">{entrada.mercadoria_nome}</td>
                      <td className="py-2 px-4 border">{entrada.local}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-2 px-4 text-center">
                      Nenhuma entrada encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded-l"
            >
              Anterior
            </button>
            <span className="px-4 py-2">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded-r"
            >
              Próxima
            </button>
          </div>
        )}

        {modalOpen && (
          <ModalEntrada
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onAdd={(nova) => setEntradas([...entradas, nova])}
          />
        )}
      </div>
    </div>
  );
}
