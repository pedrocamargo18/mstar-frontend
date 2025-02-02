import { useNavigate } from "react-router-dom";
import Button from "../ui/button";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-800 shadow-md">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between px-4 py-4 md:py-6">
        <h3 className="text-white text-xl md:text-2xl font-bold">MStar</h3>
        <Button 
          nameBtn="Login" 
          colorBtn="primary" 
          onClick={() => navigate("/login")} 
        />
      </div>
    </div>
  );
}
