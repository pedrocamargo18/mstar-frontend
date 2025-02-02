import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, useEffect, useRef } from "react";
import { exportChartToPDF } from "../utils/pdfChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const monthNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export default function Chart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Entradas",
        data: [],
        backgroundColor: "rgba(75,192,192,0.7)",
      },
      {
        label: "Saídas",
        data: [],
        backgroundColor: "rgba(255,99,132,0.7)",
      },
    ],
  });

  const chartRef = useRef();

  useEffect(() => {
    fetchEntradasEsaidasPorMes();
  }, []);

  const fetchEntradasEsaidasPorMes = async () => {
    try {
      const entradasResponse = await fetch(
        "http://localhost:5000/entradas-por-mes"
      );
      const saidasResponse = await fetch(
        "http://localhost:5000/saidas-por-mes"
      );
      const entradasData = await entradasResponse.json();
      const saidasData = await saidasResponse.json();

      const meses = monthNames;
      const entradas = Array(12).fill(0);
      const saidas = Array(12).fill(0);

      entradasData.forEach((entrada) => {
        entradas[entrada.mes - 1] = entrada.quantidade;
      });

      saidasData.forEach((saida) => {
        saidas[saida.mes - 1] = saida.quantidade;
      });

      setChartData({
        labels: meses,
        datasets: [
          {
            label: "Entradas",
            data: entradas,
            backgroundColor: "rgba(75,192,192,0.7)",
          },
          {
            label: "Saídas",
            data: saidas,
            backgroundColor: "rgba(255,99,132,0.7)",
          },
        ],
      });
    } catch (error) {
      console.error(
        "Erro ao carregar dados de entradas e saídas por mês:",
        error
      );
    }
  };

  return (
    <div className="p-6 w-full">
      <div>
        <button
          onClick={() => exportChartToPDF(chartRef)}
          className="mb-4 p-3 bg-gradient-to-r from-accent-coral to-red-400 text-white rounded-lg shadow-lg hover:from-red-500 hover:to-red-700"
        >
          Exportar para PDF
        </button>
      </div>

      <h2 className="text-md font-semibold mb-4 text-center">
        Entradas e Saídas por Mês
      </h2>
      <div
        ref={chartRef}
        className="chart-container bg-white p-4 rounded-lg shadow-lg"
        style={{ height: "400px" }}
      >
        <Bar
          data={chartData}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>
    </div>
  );
}
