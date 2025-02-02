import { useEffect, useState } from "react";
import Sidebar from "../components/commons/sidebar";
import Button from "../components/ui/button";
import ExportButton from "../components/ui/exportButton";
import moment from "moment";
import ModalSaida from "../components/commons/modalSaida";

export default function Saida() {
  const [saidas, setSaidas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchEntradas = async () => {
    try {
      const response = await fetch("http://localhost:5000/saidas");
      if (!response.ok) {
        throw new Error("Erro ao buscar saidas");
      }
      const data = await response.json();
      setSaidas(data);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntradas();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="container mx-auto my-4 px-4 bg-white rounded-md shadow-md sm:px-6 lg:px-8">
        <div className="top-0 max-w-full flex items-center justify-between py-5">
          <h2 className="text-3xl font-semibold border-b-4 border-accent-coral inline-block pb-1">Saídas</h2>
          <div>
            <ExportButton desc="Exportar PDF" format="pdf" page="saidas" />
            <Button
              onClick={() => {
                setModalOpen(true);
              }}
              nameBtn="Nova Saida"
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
                {saidas.length > 0 ? (
                  saidas.map((saida, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border">
                        {moment(saida.created_at).format("DD/MM/YYYY HH:mm")}
                      </td>
                      <td className="py-2 px-4 border">{saida.id}</td>
                      <td className="py-2 px-4 border">{saida.quantidade}</td>
                      <td className="py-2 px-4 border">
                        {saida.mercadoria_nome}
                      </td>
                      <td className="py-2 px-4 border">{saida.local}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-2 px-4 text-center">
                      Nenhuma saída encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {modalOpen && (
          <ModalSaida
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onAdd={(nova) => setSaidas([...saidas, nova])}
          />
        )}
      </div>
    </div>
  );
}
