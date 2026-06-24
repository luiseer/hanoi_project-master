const GameOptionsComp = ({ diskCount, setDiskCount, onSolve, onReset, solving }) => {
  return (
    <div className="controls">
      <div className="controls-group">
        <span className="controls-label">Discos</span>
        <button
          className="btn-icon"
          disabled={diskCount <= 2}
          onClick={() => setDiskCount(n => Math.max(2, n - 1))}
          aria-label="Reducir discos"
        >
          −
        </button>
        <span className="controls-value">{diskCount}</span>
        <button
          className="btn-icon"
          disabled={diskCount >= 8}
          onClick={() => setDiskCount(n => Math.min(8, n + 1))}
          aria-label="Aumentar discos"
        >
          +
        </button>
      </div>

      <div className="divider" aria-hidden="true" />

      <div className="controls-group">
        <button className="btn-action btn-action--danger" onClick={onReset} disabled={solving}>
          Reiniciar
        </button>
        <button className="btn-action btn-action--primary" onClick={onSolve} disabled={solving}>
          {solving ? 'Resolviendo…' : 'Resolver'}
        </button>
      </div>
    </div>
  );
};

export default GameOptionsComp;
