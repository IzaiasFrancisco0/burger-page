import { useState } from 'react';
import { FiShoppingCart } from "react-icons/fi";

export default function Burguer({ burguers: propBurguers, addToCart }) {
    const [localBurguers, setLocalBurguers] = useState([]);

    const hasPropBurguers = Array.isArray(propBurguers) && propBurguers.length > 0;
    const burguersToRender = hasPropBurguers ? propBurguers : localBurguers;

    return (
        <div className="bg-white p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-[90%] ml-[5%]">
            {burguersToRender.map((burg, index) => (
                <div
                    key={index}
                    className="border rounded-lg shadow-md p-4 w-[100%] h-[370px] flex flex-col items-center justify-between"
                >
                    <img
                        className="w-[150px] h-[150px] object-cover rounded"
                        src={burg.imagem}
                        alt={burg.nome}
                    />
                    <h2 className="font-semibold text-center mt-2">{burg.nome}</h2>
                    <p className="text-sm text-gray-600 text-center h-16 overflow-hidden">{burg.descricao}</p>
                    <p className="text-lg font-bold text-green-700">R$ {burg.preco.toFixed(2)}</p>
                    <button
                        onClick={() => addToCart(burg)}
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
