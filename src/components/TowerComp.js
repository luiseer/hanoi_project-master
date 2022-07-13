const TowerComp = ({ id, disks, handleDrop, handleDrag }) => {
  return (
    <div
      className="column-container"
      id={id}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="center-bar" />
      {disks.map((tile, index) => {
        const tileCount = disks.length;
        const tileStyles = {
          width: `${tile.width}em`,
        };
        tileStyles.marginTop =
          index === 0 ? `calc(80vh - ${tileCount * 40 + 20}px)` : "0";
        return (
          <div
            {...tile}
            className="tile"
            draggable
            key={`column-${id}-${tile.id}`}
            onDragOver={(e) => e.preventDefault()}
            onDragStart={(e) => handleDrag(e, tile, id)}
            style={tileStyles}
          />
        );
      })}
    </div>
  );
};

export default TowerComp;
