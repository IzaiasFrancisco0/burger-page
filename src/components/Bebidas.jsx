import { useState } from 'react';
import { FiShoppingCart } from "react-icons/fi";

export default function Bebidas({ bebidas: propBebidas, addToCart }) {
    const [localBebidas, setLocalBebidas] = useState([]);

    const hasPropBebidas = Array.isArray(propBebidas) && propBebidas.length > 0;
    const bebidasToRender = hasPropBebidas ? propBebidas : localBebidas;

    return (
   <div className="bg-white min-h-screen p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-[90%] ml-[5%]">
  {bebidasToRender.map((bebida, index) => (
    <div
      key={index}
      className="border rounded-lg shadow-md p-4 w-[98%] sm:w-auto lg:w-[100%] h-[370px] flex flex-col items-center justify-between mx-auto"
    >
      <img 
        src={bebida.imagem} 
        alt={bebida.nome} 
        className="w-[150px] h-[150px] object-cover mb-2"
      />
      <h2 className="font-semibold text-center">{bebida.nome}</h2>
      <p className="text-sm text-gray-600 text-center h-16 overflow-hidden">{bebida.descricao}</p>
      <p className="text-lg font-bold text-green-700">R$ {bebida.preco.toFixed(2)}</p>
      <button 
        onClick={() => addToCart(bebida)} 
        className="mt-2 bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded flex items-center transition-transform duration-300 hover:scale-105 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
      >
        Adicionar ao Carrinho
        <FiShoppingCart className="ml-2 text-lg" />
      </button>
    </div>
  ))}
</div>

    );
}
