import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../server/useAuth";
import { FaBars } from "react-icons/fa";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { logout } = useAuth()
  const navigate = useNavigate();


  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () =>{
    logout()
    navigate('/login')
  }

  return (
    <div>
      <div
        className={`lg:w-64 w-56 bg-gray-800 text-white p-4 fixed inset-0 lg:relative lg:block transition-all duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } min-h-screen`} 
      >
        <h2 className="text-2xl font-bold mb-6">MStar</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/dashboard" className="hover:bg-gray-700 p-2 rounded">
            Dashboard
          </Link>
          <Link to="/mercadorias" className="hover:bg-gray-700 p-2 rounded">
            Mercadorias
          </Link>
          <Link to="/entrada" className="hover:bg-gray-700 p-2 rounded">
            Entradas
          </Link>
          <Link to="/saida" className="hover:bg-gray-700 p-2 rounded">
            Saídas
          </Link>
          <button  onClick={handleLogout} className="bg-accent-coral p-2 rounded hover:bg-red-900 transition">
            Sair
          </button>
        </nav>
      </div>

      <button
        onClick={toggleSidebar}
        className="lg:hidden absolute top-4 left-4 p-2 bg-gray-800 text-white rounded"
      >
        <FaBars className="h-6 w-6" />
      </button>
    </div>
  );
}
