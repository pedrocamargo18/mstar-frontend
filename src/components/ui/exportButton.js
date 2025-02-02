import React from "react";

export default function ExportButton({ desc, format, page}) {

  const handleExport = async () => {
    try {

      const response = await fetch(
        `http://localhost:5000/exportar-${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${page}.xlsx`;
        link.click();
      } else {
        throw new Error("Erro ao exportar relatório.");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const handleExportPDF = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/exportar-${page}-pdf`
      );

      if (!response.ok) {
        throw new Error("Erro ao exportar o PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${page}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao baixar o PDF:", error);
    }
  };

  return (
    <button
      onClick={ format === 'xlsx' ? handleExport : handleExportPDF}
      className="bg-accent-coral text-white py-2 px-4 rounded ml-3 hover:bg-red-600"
    >
      {desc}
    </button>
  );
}
