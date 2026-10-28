import { useState } from 'react';
import { Link } from 'react-router-dom';
import ParticipanteCard from '../components/ParticipanteCard.jsx';
import { listarNaRoca, listarForaDaRoca, registrarVoto } from '../services/votacaoService.js';

function Votacao() {
  const naRoca = listarNaRoca();
  const foraDaRoca = listarForaDaRoca();
  const [ultimoVoto, setUltimoVoto] = useState(null);
  const [quantidadeVotos, setQuantidadeVotos] = useState(0);
  const [erro, setErro] = useState('');

  function handleVotar(participante) {
    try {
      registrarVoto(participante.id);
      setUltimoVoto(participante);
      setQuantidadeVotos((atual) => atual + 1);
      setErro('');
    } catch {
      setErro('Não foi possível registrar seu voto. Tente novamente.');
    }
  }

  return (
    <main className="pagina pagina-votacao">
      <div className="pagina-cabecalho">
        <span className="sobretitulo">O destino está nas suas mãos</span>
        <h1>Quem deixa a Fazenda?</h1>
        <p>Escolha um dos peões da roça para eliminar. Pode votar quantas vezes quiser.</p>
      </div>

      {ultimoVoto && (
        <div className="aviso-voto" role="status">
          <span className="aviso-icone" aria-hidden="true">✓</span>
          <div>
            <strong>Voto computado!</strong>
            <p>Você votou em <b>{ultimoVoto.nome}</b>. Até agora, foram {quantidadeVotos} {quantidadeVotos === 1 ? 'voto' : 'votos'} nesta visita.</p>
            <Link to="/resultado">Acompanhar a parcial <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      )}
      {erro && <p className="mensagem-erro" role="alert">{erro}</p>}

      <section className="secao-roca">
        <div className="secao-titulo"><h2>Na roça</h2><span>03 peões em risco</span></div>
        <div className="grade-roca">
          {naRoca.map((participante) => <ParticipanteCard key={participante.id} participante={participante} onVotar={handleVotar} />)}
        </div>
      </section>

      <section className="secao-fora-roca">
        <div className="secao-titulo"><h2>Os outros peões</h2><span>Fora da votação desta semana</span></div>
        <div className="grade-participantes">
          {foraDaRoca.map((participante) => <ParticipanteCard key={participante.id} participante={participante} />)}
        </div>
      </section>
    </main>
  );
}

export default Votacao;
