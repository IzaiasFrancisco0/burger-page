import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './components/NavBar.jsx';
import SideBar from './components/SideBar.jsx';
import Burguer from './components/Burguer.jsx';
import Bebidas from './components/Bebidas.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    const [openCart, setOpenCart] = useState(false);
    const [burguers, setBurguers] = useState([]);
    const [bebidas, setBebidas] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const consumirApi = async () => {
            try {
                const response = await axios.get('http://localhost:5000/burguer');
                setBurguers(response.data);
                console.log("Dados da API recebidos no App:", response.data);
            } catch (err) {
                console.log("deu erro ao consumir api no App", err);
            }
        };

        consumirApi();
    }, []);

    useEffect(() => {
        const consumirApiBebidas = async () => {
            try {
                const response = await axios.get('http://localhost:5000/bebidas');
                setBebidas(response.data);
                console.log("Dados da API recebidos no App:", response.data);
            } catch (err) {
                console.log("deu erro ao consumir api no App", err);
            }
        }
        consumirApiBebidas()
    }, [])

    const handleSearch = (term) => {
        setSearchTerm(term);
        console.log("Termo de pesquisa:", term);
    };

    const filteredBurguers = burguers.filter(burguer =>
        burguer.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredBebidas = bebidas.filter(bebida =>
        bebida.nome.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    )

    console.log("Lista filtrada no App:", filteredBurguers);
    console.log(filteredBebidas)

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