import { useState, useEffect } from "react";
import Sidebar from "../components/commons/sidebar";
import ExportButton from "../components/ui/exportButton";
import Button from "../components/ui/button";
import ModalNovaMercadoria from "../components/commons/modalMercadorias";

export default function GerenciarMercadorias() {
  const [mercadorias, setMercadorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage, setItemsPerPage] = useState(10); 

  const fetchMercadorias = async () => {
    try {
      const response = await fetch("http://localhost:5000/mercadorias");
      if (!response.ok) {
        throw new Error("Erro ao buscar mercadorias");
      }
      const data = await response.json();
      setMercadorias(data);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMercadorias();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mercadorias.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(mercadorias.length / itemsPerPage);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="container mx-auto my-4 px-4 bg-white rounded-md shadow-md sm:px-6 lg:px-8">
        <div className="top-0 max-w-full flex items-center justify-between py-5">
          <h2 className="text-3xl font-semibold border-b-4 border-accent-coral inline-block pb-1">
            Lista de Mercadorias
          </h2>
          <div>
            <ExportButton desc="Exportar PDF" format="pdf" page="mercadorias" />
            <ExportButton desc="Exportar XLSX" format="xlsx" page="mercadorias" />
            <Button
              nameBtn="Nova Mercadoria"
              onClick={() => setModalOpen(true)}
              colorBtn="success"
            />
          </div>
        </div>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse mt-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 border">Nome</th>
                  <th className="py-2 px-4 border">Nº Registro</th>
                  <th className="py-2 px-4 border">Fabricante</th>
                  <th className="py-2 px-4 border">Tipo</th>
                  <th className="py-2 px-4 border">Descrição</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((mercadoria, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border">{mercadoria.nome}</td>
                      <td className="py-2 px-4 border">{mercadoria.nro_registro}</td>
                      <td className="py-2 px-4 border">{mercadoria.fabricante}</td>
                      <td className="py-2 px-4 border">{mercadoria.tipo}</td>
                      <td className="py-2 px-4 border">{mercadoria.descricao}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-2 px-4 text-center">
                      Nenhuma mercadoria encontrada
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

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
          </div>
        )}
        {modalOpen && (
          <ModalNovaMercadoria
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onAdd={(nova) => setMercadorias([...mercadorias, nova])}
          />
        )}
      </div>
    </div>
  );
}
