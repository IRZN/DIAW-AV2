function ParticipanteCard({ participante, onVotar }) {
  const { nome, foto, naRoca } = participante;

  return (
    <article className={`participante-card ${naRoca ? 'card-roca' : 'card-fora'}`}>
      <div className="participante-foto-wrap">
        <img className="participante-foto" src={foto} alt={`Foto de ${nome}`} loading="lazy" />
        {naRoca && <span className="selo-roca">Na roça</span>}
      </div>
      <div className="participante-info">
        <h3>{nome}</h3>
        {onVotar && (
          <button className="botao botao-votar" type="button" onClick={() => onVotar(participante)}>
            Votar para eliminar <span aria-hidden="true">↗</span>
          </button>
        )}
      </div>
    </article>
  );
}

export default ParticipanteCard;
