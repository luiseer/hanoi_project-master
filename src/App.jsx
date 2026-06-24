import { useEffect, useState, useRef, useCallback } from "react";
import GameOptionsComp from "./components/GameOptionsComp";
import TowerComp from "./components/TowerComp";
import WinMessageComp from "./components/WinMessageComp";
import Tower from "./utils/Tower";
import "./App.css";

function createInitialTowers(diskCount) {
  const tower1 = new Tower("tower1");
  const tower2 = new Tower("tower2");
  const tower3 = new Tower("tower3");
  for (let i = diskCount; i > 0; i--) {
    tower1.add(i);
  }
  return { 1: tower1, 2: tower2, 3: tower3 };
}

const App = () => {
  const [diskCount, setDiskCount] = useState(3);
  const [moveCount, setMoveCount] = useState(0);
  const [dragTile, setDragTile] = useState(null);
  const [solving, setSolving] = useState(false);
  const intervalRef = useRef(null);
  const towersRef = useRef(createInitialTowers(3));
  const [tiles, setTiles] = useState({
    1: towersRef.current[1].disks.traverse(),
    2: towersRef.current[2].disks.traverse(),
    3: towersRef.current[3].disks.traverse(),
  });

  const refreshTiles = useCallback(() => {
    const t = towersRef.current;
    setTiles({
      1: t[1].disks.traverse(),
      2: t[2].disks.traverse(),
      3: t[3].disks.traverse(),
    });
  }, []);

  const reset = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    towersRef.current = createInitialTowers(diskCount);
    setMoveCount(0);
    setSolving(false);
    refreshTiles();
  }, [diskCount, refreshTiles]);

  useEffect(() => {
    reset();
  }, [diskCount]);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleDrag = useCallback((e, tile, towerId) => {
    const t = towersRef.current;
    if (t[towerId].disks.head === tile) {
      setDragTile({ tile, towerId });
    } else {
      e.preventDefault();
    }
  }, []);

  const handleDrop = useCallback((e) => {
    if (!dragTile) return;
    const t = towersRef.current;
    const dropColumn = Number(e.currentTarget.id);
    const source = t[dragTile.towerId];
    const destination = t[dropColumn];
    const goodMove = source.moveTopTo(destination);
    if (goodMove) {
      setMoveCount(n => n + 1);
    }
    refreshTiles();
  }, [dragTile, refreshTiles]);

  const handleSolve = useCallback(() => {
    const t = towersRef.current;
    if (t[3].disks.length === diskCount) return;
    if (solving) return;
    setSolving(true);
    const solution = t[1].moveDisks(diskCount, t[3], t[2]);
    intervalRef.current = setInterval(() => {
      const { done } = solution.next();
      if (done) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setSolving(false);
      } else {
        setMoveCount(n => n + 1);
        refreshTiles();
      }
    }, 500);
  }, [diskCount, solving, refreshTiles]);

  const winCondition = towersRef.current[3].disks.length === diskCount;

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Torres de Hanoi</h1>
        <p className="app-subtitle">Torre {diskCount} — Recursividad en acci&oacute;n</p>
      </header>

      <GameOptionsComp
        diskCount={diskCount}
        setDiskCount={setDiskCount}
        onSolve={handleSolve}
        onReset={reset}
        solving={solving}
      />

      <div className="towers-container">
        <TowerComp id={1} disks={tiles[1]} onDrag={handleDrag} onDrop={handleDrop} />
        <TowerComp id={2} disks={tiles[2]} onDrag={handleDrag} onDrop={handleDrop} />
        <TowerComp id={3} disks={tiles[3]} onDrag={handleDrag} onDrop={handleDrop} />
      </div>

      <div className="move-counter">
        <span className="move-label">Movimientos</span>
        <span className="move-value">{moveCount}</span>
      </div>

      {winCondition && !solving && (
        <WinMessageComp moveCount={moveCount} onReset={reset} />
      )}
    </div>
  );
};

export default App;
