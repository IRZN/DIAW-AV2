import { useState } from 'react';
import { Link } from 'react-router-dom';
import { calcularResultado, calcularTotalVotos, obterVotos, zerarVotos } from '../services/votacaoService.js';

function Resultado() {
  const [votos, setVotos] = useState(() => obterVotos());
  const totalVotos = calcularTotalVotos(votos);
  const resultado = calcularResultado(votos);

  function handleZerarVotos() {
    const confirmou = window.confirm('Tem certeza de que deseja zerar todos os votos? Essa ação não pode ser desfeita.');
    if (confirmou) {
      zerarVotos();
      setVotos({});
    }
  }

  return (
    <main className="pagina pagina-resultado">
      <div className="pagina-cabecalho">
        <span className="sobretitulo">A parcial da semana</span>
        <h1>Placar da roça</h1>
        <p>Uma espiada na votação. Quem está mais perto de deixar o jogo?</p>
      </div>

      <section className="resumo-votos" aria-label="Total de votos">
        <span className="resumo-label">Votos computados</span>
        <strong>{totalVotos.toLocaleString('pt-BR')}</strong>
        <span className="resumo-nota">A votação é atualizada neste navegador.</span>
      </section>

      {totalVotos === 0 ? (
        <section className="resultado-vazio">
          <div className="vazio-ilustracao" aria-hidden="true">✳</div>
          <h2>Ainda não tem voto no embate.</h2>
          <p>O placar está zerado. Dê o primeiro voto e comece a mudar o jogo.</p>
          <Link to="/votacao" className="botao botao-principal">Ir para votação</Link>
        </section>
      ) : (
        <section className="placar-lista" aria-label="Resultado por participante">
          {resultado.map((participante, indice) => (
            <article key={participante.id} className={`placar-item ${indice === 0 ? 'placar-lider' : ''}`}>
              <div className="placar-posicao">{String(indice + 1).padStart(2, '0')}</div>
              <img src={participante.foto} alt={`Foto de ${participante.nome}`} className="placar-foto" />
              <div className="placar-dados">
                <div className="placar-nome-linha">
                  <h2>{participante.nome}</h2>
                  {indice === 0 && <span className="selo-lider">Sairia hoje</span>}
                </div>
                <div className="barra" aria-label={`${participante.percentual.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}% dos votos`}>
                  <div className="barra-preenchida" style={{ width: `${participante.percentual}%` }} />
                </div>
              </div>
              <div className="placar-numeros">
                <strong>{participante.percentual.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%</strong>
                <span>{participante.votos} {participante.votos === 1 ? 'voto' : 'votos'}</span>
              </div>
            </article>
          ))}
          <div className="placar-acoes">
            <Link to="/votacao" className="botao botao-secundario">Continuar votando</Link>
            <button type="button" className="botao botao-zerar" onClick={handleZerarVotos}>Zerar votação</button>
          </div>
        </section>
      )}
    </main>
  );
}

export default Resultado;
