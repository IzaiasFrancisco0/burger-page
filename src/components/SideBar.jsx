import { IoMdClose } from "react-icons/io";
import { BsCartXFill } from "react-icons/bs";

export default function SideBar({ openCart, cartItems, setOpenCart, setCartItems }) {
  const total = cartItems.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  const handleDecreaseQuantity = (indexToUpdate) => {
    const updatedItems = cartItems.map((item, index) => {
      if (index === indexToUpdate) {
        return { ...item, quantidade: item.quantidade - 1 };
      }
      return item;
    }).filter(item => item.quantidade > 0); 

    setCartItems(updatedItems);
  };

  return (
    <>
      {openCart && (
        <div
          className={`
            bg-neutral-800 text-white overflow-y-auto p-4
            ${openCart ? 'block' : 'hidden'}
            sm:static sm:h-[130vh] sm:w-full 
            fixed top-0 left-0 w-full h-screen z-50 sm:z-0 sm:bg-neutral-800 sm:bg-opacity-100
          `}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold">Carrinho</h2>
            <span
              onClick={() => setOpenCart(false)}
              className="cursor-pointer"
            >
              <IoMdClose className="text-3xl hover:text-gray-300" />
            </span>
          </div>

          {cartItems.length === 0 ? (
            <p className="text-lg">Carrinho vazio</p>
          ) : (
            <>
              <ul className="space-y-4">
                {cartItems.map((item, index) => (
                  <li key={index} className="border-b pb-2 border-gray-600">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold pb-2 text-lg sm:text-xl">{item.nome}</p>
                      <button
                        onClick={() => handleDecreaseQuantity(index)}
                        className="text-white hover:text-red-400"
                        aria-label="Diminuir quantidade ou remover item"
                      >
                        <BsCartXFill className="text-xl" />
                      </button>
                    </div>
                    <p className="text-base sm:text-lg">Quantidade: {item.quantidade}</p>
                    <p className="text-base sm:text-lg">
                      Preço: R$ {(item.preco * item.quantidade).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 text-lg text-green-700 sm:text-xl font-bold text-left">
                Total: R$ {total.toFixed(2)}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
