const WinMessageComp = ({ moveCount }) => {
  return (
    <div className="win-overlay">
      <div className="win-card">
        <span className="win-icon" aria-hidden="true">🎉</span>
        <h2 className="win-title">Has ganado</h2>
        <p className="win-subtitle">
          Completaste el juego en{' '}
          <span className="win-highlight">{moveCount}</span> movimientos
        </p>
      </div>
    </div>
  );
};

export default WinMessageComp;
