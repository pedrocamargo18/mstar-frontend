import Sidebar from "../components/commons/sidebar";
import Chart from "../components/ui/chart";

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto ">
        <h1 className="text-3xl font-bold text-gray-800 bg">
          Bem-vindo à Dashboard
        </h1>
        <p className="text-gray-600 mt-2">Escolha uma opção no menu lateral.</p>
        <div className="mt-8 bg-white rounded-md shadow-md">
          <Chart />
        </div>
      </div>
    </div>
  );
}
