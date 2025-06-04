import { crearSemaforo } from './Senna/sema.js';
import { crearHeader } from './header.js';

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    const semaforo = crearSemaforo();

    const actualizarSemaforo = (color) => {
        const luces = semaforo.querySelectorAll(".luz");
        luces.forEach(luz => {
            luz.style.opacity = luz.classList.contains(color) ? "1" : "0.3";
        });

        if (color === null) {
            luces.forEach(luz => luz.style.opacity = "0.3");
        }
    };

    const header = crearHeader(actualizarSemaforo);

    root.appendChild(header);
    root.appendChild(semaforo);
});


