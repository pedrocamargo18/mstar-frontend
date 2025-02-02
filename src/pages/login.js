import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/button";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    let valid = true;
    let newErrors = { email: "", password: "" };

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "E-mail inválido";
      valid = false;
    }

    if (password.length < 8) {
      newErrors.password = "A senha deve ter pelo menos 8 caracteres";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao fazer login");
      }
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

const handleBack = (e) => {
  e.preventDefault();
  navigate("/");
}

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1">E-mail:</label>
          <input
            type="email"
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite seu e-mail"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          <label className="text-gray-700 font-semibold mt-3 mb-1">Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite sua senha"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          <Button nameBtn="Entrar" colorBtn="primary" />
          <button type="button" onClick={handleBack} className="text-sm px-4 py-2 mt-2 bg-gray-500 rounded-md text-white font-semibold whitespace-nowrap hover:opacity-95 disabled:opacity-70 mx-2">Voltar</button>
        </form>
      </div>
    </div>
  );
}
