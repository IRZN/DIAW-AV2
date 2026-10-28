import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Votacao from './pages/Votacao.jsx';
import Resultado from './pages/Resultado.jsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/votacao" element={<Votacao />} />
        <Route path="/resultado" element={<Resultado />} />
        <Route path="*" element={<main className="pagina pagina-nao-encontrada"><h1>Esse caminho não existe.</h1><p>Volte para o começo da fazenda.</p><a className="botao botao-principal" href="/">Ir para o início</a></main>} />
      </Routes>
      <footer className="rodape">A Fazenda 2026 <span aria-hidden="true">·</span> O voto é seu, a decisão também.</footer>
    </BrowserRouter>
  );
}

export default App;
