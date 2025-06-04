function crearHeader(callbackCambiarColor) {
    const header = document.createElement("header");
    header.className = "header";

    const titulo = document.createElement("h1");
    titulo.innerText = "Control de Semáforo";
    header.appendChild(titulo);

    const botones = [
        { color: "rojo", label: "Rojo" },
        { color: "amarillo", label: "Amarillo" },
        { color: "verde", label: "Verde" },
        { color: "negro", label: "Apagar" }
    ];

    const contenedorBotones = document.createElement("div");
    contenedorBotones.className = "botones";

    botones.forEach(({ color, label }) => {
        const btn = document.createElement("button");
        btn.innerText = label;
        btn.className = `btn ${color}`;
        btn.onclick = () => {
            const estado = color === "negro" ? null : color;
            fetch("https://semaforo67-e5e01-default-rtdb.firebaseio.com/estado.json", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ luz: estado })
            });

            callbackCambiarColor(estado);
        };
        contenedorBotones.appendChild(btn);
    });

    header.appendChild(contenedorBotones);
    return header;
}

export { crearHeader };

