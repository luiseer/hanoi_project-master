# Torres de Hanoi

Visualizador interactivo del clásico problema de las **Torres de Hanoi** con un algoritmo de resolución **recursivo** implementado como **generador (ES6)** en React 18 + Vite.

---

## Lógica del Algoritmo Recursivo

### Planteamiento

El problema consiste en mover una pila de `n` discos desde una **torre origen** hasta una **torre destino** usando una **torre auxiliar**, bajo dos reglas:

1. Solo se puede mover **un disco a la vez** (el superior de cada torre).
2. **Ningún disco puede colocarse sobre otro más pequeño**.

### Solución Recursiva

La solución se define con tres pasos fundamentales, que forman el núcleo recursivo:

```
mover(n, origen, destino, auxiliar):
  1. mover(n-1, origen, auxiliar, destino)
  2. mover el disco n de origen → destino
  3. mover(n-1, auxiliar, destino, origen)
```

**Caso base**: `n = 0` → no hacer nada (termina la recursión).

### Implementación en el Código

El algoritmo vive en `src/utils/Tower.js` como un **generador recursivo** (función `*`):

```js
// src/utils/Tower.js:29-35

*moveDisks(n, target, buffer) {
  if (n > 0) {
    // 1. Mover n-1 discos de origen → buffer (usando target como auxiliar)
    yield *this.moveDisks(n - 1, buffer, target);

    // 2. Mover el disco superior de origen → destino
    yield this.moveTopTo(target);

    // 3. Mover n-1 discos de buffer → destino (usando this como auxiliar)
    yield *buffer.moveDisks(n - 1, target, this);
  }
}
```

**Claves de esta implementación:**

- `yield *` delega en el sub-generador, permitiendo que cada movimiento se emita uno por uno sin bloquear el event loop.
- Cada `yield` emite un movimiento atómico (`moveTopTo`), que el frontend consume con un `setInterval` para animar la solución paso a paso (`src/App.jsx:77-90`).
- La recursión explota el **teorema de la recurrencia**: `T(n) = 2T(n-1) + 1`, resultando en `2ⁿ - 1` movimientos mínimos.

### Traza de Ejecución para 3 Discos

```
moveDisks(3, Torre3, Torre2)
├── moveDisks(2, Torre2, Torre3)
│   ├── moveDisks(1, Torre3, Torre2)
│   │   ├── moveDisks(0, Torre2, Torre3) → caso base
│   │   ├── Mover disco 1: Torre1 → Torre3
│   │   └── moveDisks(0, Torre3, Torre1) → caso base
│   ├── Mover disco 2: Torre1 → Torre2
│   └── moveDisks(1, Torre2, Torre1)
│       ├── moveDisks(0, Torre1, Torre3) → caso base
│       ├── Mover disco 1: Torre3 → Torre2
│       └── moveDisks(0, Torre2, Torre3) → caso base
├── Mover disco 3: Torre1 → Torre3
└── moveDisks(2, Torre3, Torre1)
    ├── moveDisks(1, Torre1, Torre3)
    │   ├── moveDisks(0, Torre3, Torre2) → caso base
    │   ├── Mover disco 1: Torre2 → Torre1
    │   └── moveDisks(0, Torre1, Torre3) → caso base
    ├── Mover disco 2: Torre2 → Torre3
    └── moveDisks(1, Torre3, Torre2)
        ├── moveDisks(0, Torre2, Torre1) → caso base
        ├── Mover disco 1: Torre1 → Torre3
        └── moveDisks(0, Torre3, Torre2) → caso base
```

Total: **7 movimientos** (`2³ - 1`).

---

## Estructura del Proyecto

```
tower_hanoi_app/
├── index.html              # Entry point Vite
├── vite.config.js          # Configuración Vite + React
├── package.json
├── public/
│   └── vite.svg            # Favicon
├── src/
│   ├── main.jsx            # Mount de React
│   ├── App.jsx            # Componente principal
│   ├── App.css             # Estilos modernos 2026
│   ├── index.css           # Reset + variables CSS
│   ├── components/
│   │   ├── GameOptionsComp.jsx  # Controles (discos, resolver, reiniciar)
│   │   ├── TowerComp.jsx        # Renderiza una torre con sus discos
│   │   └── WinMessageComp.jsx   # Overlay de victoria
│   ├── utils/
│   │   ├── Stack.js        # Stack implementado como lista enlazada
│   │   └── Tower.js        # Torre con algoritmo recursivo (generador)
│   └── helpers/
│       └── deepCopy.js     # Copia profunda con prototipo
└── README.md
```

---

## Estructuras de Datos

### Stack (`src/utils/Stack.js`)

Pila basada en **lista enlazada simple** con nodos `{id, value, width, next}`:

| Método     | Comportamiento                        |
|------------|---------------------------------------|
| `push(v)`  | Inserta al inicio (nuevo head)        |
| `pop()`    | Extrae el head y lo retorna           |
| `peek()`   | Retorna el head sin extraerlo         |
| `traverse()` | Recorre la lista y retorna un array |

### Tower (`src/utils/Tower.js`)

| Método                     | Comportamiento                                      |
|----------------------------|-----------------------------------------------------|
| `add(value)`               | Apila un disco (push al Stack)                      |
| `moveTopTo(target)`        | Mueve el disco superior si la regla lo permite      |
| `*moveDisks(n, t, b)`      | **Generador recursivo** que resuelve el problema    |

---

## Componentes

| Componente           | Props recibe                                       | Rol                             |
|----------------------|----------------------------------------------------|---------------------------------|
| `GameOptionsComp`    | `diskCount, setDiskCount, onSolve, onReset, solving` | Panel de control               |
| `TowerComp`          | `id, disks, onDrag, onDrop`                        | Torre visual con Drag & Drop    |
| `WinMessageComp`     | `moveCount`                                        | Overlay de victoria             |

---

## Cómo Ejecutar

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000` en el navegador.

---

## Demo Visual

La UI actualizada a 2026 incluye:

- Tema oscuro/claro automático (`prefers-color-scheme`)
- Gradientes en discos y títulos
- Animaciones sutiles (hover, fade-in en victoria)
- Responsive
- Sin dependencias externas de UI — CSS personalizado con variables

---

## Licencia

MIT
