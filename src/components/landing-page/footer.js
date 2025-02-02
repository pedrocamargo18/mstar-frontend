import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <div className="w-full bg-gray-800 p-8">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 text-white text-center md:justify-between">
        <p> &copy; 2025 MStar - Pedro Luz </p>
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <p className="font-normal transition-colors hover:text-red-500 focus:text-red-500">Fale Conosco</p>
          </li>
          <li>
            <p className="font-normal transition-colors hover:text-red-500 focus:text-red-500">Redes sociais</p>
          </li>
        </ul>
      <div className="flex justify-center gap-6 mt-4">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
          <FaFacebook className="h-6 w-6 text-white hover:text-blue-500 transition-all duration-300" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
          <FaTwitter className="h-6 w-6 text-white hover:text-blue-400 transition-all duration-300" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
          <FaInstagram className="h-6 w-6 text-white hover:text-pink-500 transition-all duration-300" />
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
          <FaLinkedin className="h-6 w-6 text-white hover:text-blue-700 transition-all duration-300" />
        </a>
      </div>
      </div>
    </div>
  );
}
