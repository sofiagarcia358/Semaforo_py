function crearSemaforo() {
    const contenedor = document.createElement("div");
    contenedor.className = "semaforo";

    const luces = {
        rojo: document.createElement("div"),
        amarillo: document.createElement("div"),
        verde: document.createElement("div")
    };

    Object.entries(luces).forEach(([color, luz]) => {
        luz.className = `luz ${color}`;
        contenedor.appendChild(luz);
    });

    function sincronizar() {
        fetch("https://semaforo67-e5e01-default-rtdb.firebaseio.com/estado.json")
            .then(res => res.json())
            .then(data => {
                const estado = data.luz;
                Object.entries(luces).forEach(([color, luz]) => {
                    luz.style.opacity = color === estado ? "1" : "0.3";
                });
            })
            .catch(err => console.error("Error sincronizando:", err));
    }

    setInterval(sincronizar, 500);
    sincronizar();

    return contenedor;
}



export { crearSemaforo };