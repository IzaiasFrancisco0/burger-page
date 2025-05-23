import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './components/NavBar.jsx';
import SideBar from './components/SideBar.jsx';
import Burguer from './components/Burguer.jsx';
import Bebidas from './components/Bebidas.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
    const [openCart, setOpenCart] = useState(false);
    const [burguers, setBurguers] = useState([]);
    const [bebidas, setBebidas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const consumirApi = async () => {
            try {
                const response = await axios.get(`${API_URL}/burguer`);
                setBurguers(response.data);
            } catch (err) {
                console.log("deu erro ao consumir api no App", err);
            }
        };

        consumirApi();
    }, []);

    useEffect(() => {
        const consumirApiBebidas = async () => {
            try {
                const response = await axios.get(`${API_URL}/bebidas`);
                setBebidas(response.data);
            } catch (err) {
                console.log("deu erro ao consumir api no App", err);
            }
        }
        consumirApiBebidas()
    }, [])

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

   const filteredBurguers = Array.isArray(burguers)
  ? burguers.filter(burguer =>
      burguer.nome.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];

   const filteredBebidas = Array.isArray(bebidas)
  ? bebidas.filter(bebida =>
      bebida.nome.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];


    const addToCart = (item) => {
        setCartItems(prev => {
            const itemExistente = prev.find(prod => prod.nome === item.nome);
            if (itemExistente) {
                return prev.map(prod =>
                    prod.nome === item.nome ? { ...prod, quantidade: prod.quantidade + 1 } : prod
                );
            } else {
                return [...prev, { ...item, quantidade: 1 }];
            }
        });
    };

    return (
        <Router>
            <div className="w-full flex flex-col">
                <NavBar openCart={openCart} setOpenCart={setOpenCart} onSearch={handleSearch} cartItems={cartItems} />

                <div className="flex w-full transition-all duration-300 ease-in-out">
                    <div
                        className={`transition-all duration-300 ease-in-out ${openCart ? 'w-[85%]' : 'w-full'
                            }`}
                    >
                        <Routes>
                            <Route path="/" element={<Burguer burguers={filteredBurguers} addToCart={addToCart} />} />
                            <Route path="/burguer" element={<Burguer burguers={filteredBurguers} addToCart={addToCart} />} />
                            <Route path="/bebidas" element={<Bebidas bebidas={filteredBebidas} addToCart={addToCart} />} />
                        </Routes>
                    </div>

                    <div
                        className={`transition-all duration-300 ease-in-out ${openCart ? 'w-[15%]' : 'w-0 overflow-hidden'
                            }`}
                    >
                        <SideBar openCart={openCart} cartItems={cartItems} setOpenCart={setOpenCart} setCartItems={setCartItems} />
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;