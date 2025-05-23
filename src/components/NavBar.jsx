import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { PiHamburger } from "react-icons/pi";

export default function NavBar({ openCart, setOpenCart, onSearch, cartItems }) {
    const navigate = useNavigate();
    const [pesquisar, setPesquisar] = useState('');

    const handleNavigate = (e) => {
        const value = e.target.value;
        if (value) navigate(value);
    };

    const handleChangeInput = (event) => {
        const value = event.target.value;
        setPesquisar(value);
        onSearch(value);
    };

    return (
    <nav className="bg-neutral-800 w-full h-auto sm:h-20 flex flex-col sm:flex-row sm:justify-center sm:items-center px-4 py-4 sm:py-0 gap-4 sm:gap-0">
      
      <h1 className="flex text-3xl lg:mb-0 mr-4 mb-4 flex-wrap break-words lg:text-4xl max-w-[500px] w-full lg:mr-[300px] text-white ">
        Garage Burger
        <PiHamburger className="text-white text-4xl lg:text-5xl ml-4"/>
      </h1>
      <input
         className="p-2 rounded-md w-full sm:w-[500px] sm:mr-40 bg-white border border-gray-300 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
        type="text"
        placeholder="Pesquisar um Produto"
        value={pesquisar}
        onChange={handleChangeInput}
      />

      <select onChange={handleNavigate} className="p-2 rounded-md w-full sm:w-auto sm:mr-4 bg-white border border-gray-300 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition">
        <option value="">Navegar para...</option>
        <option value="/burguer">Burguers</option>
        <option value="/bebidas">Bebidas</option>
      </select>

      <span
        onClick={() => setOpenCart(!openCart)}
        className="cursor-pointer flex items-center justify-center text-white"
      >
        <FiShoppingCart className="text-2xl ml-4" />
        {cartItems && cartItems.length > 0 && (
          <span className="text-sm pl-2">
            ({cartItems.reduce((total, item) => total + item.quantidade, 0)})
          </span>
        )}
      </span>
    </nav>
  );
}