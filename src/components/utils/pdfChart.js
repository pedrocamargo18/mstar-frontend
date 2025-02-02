import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const exportChartToPDF = async (chartRef) => {
  if (!chartRef || !chartRef.current) return;

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  pdf.setFontSize(18);
  pdf.text("Gráfico de Entradas e Saídas Mensais", 140, 15, null, null, "center");

  const canvas = await html2canvas(chartRef.current, {
    scale: 2,
    useCORS: true,
  });

  const imgData = canvas.toDataURL("image/png");
  const imgWidth = 260;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 15, 30, imgWidth, imgHeight);
  pdf.save("grafico_entradas_saidas.pdf");
};
