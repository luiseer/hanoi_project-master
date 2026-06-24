const TowerComp = ({ id, disks, onDrag, onDrop }) => {
  return (
    <div
      className="tower"
      id={id}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <span className="tower-label">Torre {id}</span>
      <div className="tower-rod" aria-hidden="true" />
      <div className="tower-base" aria-hidden="true" />
      {disks.map((tile, idx) => {
        const count = disks.length;
        return (
          <div
            key={`tower-${id}-${tile.id}`}
            draggable
            className="tile"
            data-value={tile.value}
            data-index={idx}
            style={{ width: `${tile.width + 2}rem` }}
            onDragStart={(e) => onDrag(e, tile, id)}
            onDragOver={(e) => e.preventDefault()}
          />
        );
      })}
    </div>
  );
};

export default TowerComp;
