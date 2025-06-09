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

    let parpadeoActivo = false;
    let intervaloParpadeo = null;
    let intervaloCiclo = null;
    let estadoActual = null;

    function apagarLuces() {
        Object.values(luces).forEach(luz => luz.style.opacity = "0.3");
    }

    function detenerParpadeo() {
        if (intervaloParpadeo) {
            clearInterval(intervaloParpadeo);
            intervaloParpadeo = null;
        }
        luces.amarillo.style.opacity = "0.3";
        parpadeoActivo = false;
    }

    function iniciarParpadeo() {
        detenerCiclo();
        detenerParpadeo();
        parpadeoActivo = true;
        let visible = false;

        intervaloParpadeo = setInterval(() => {
            visible = !visible;
            luces.amarillo.style.opacity = visible ? "1" : "0.3";
        }, 200);
    }

    function iniciarCiclo() {
        detenerParpadeo();
        detenerCiclo();
        const colores = ['rojo', 'amarillo', 'verde'];
        let i = 0;

        intervaloCiclo = setInterval(() => {
            const color = colores[i % colores.length];
            apagarLuces();
            luces[color].style.opacity = "1";
            i++;
        }, 1000);
    }

    function detenerCiclo() {
        if (intervaloCiclo) {
            clearInterval(intervaloCiclo);
            intervaloCiclo = null;
        }
    }

    function sincronizar() {
        fetch("https://semaforo67-e5e01-default-rtdb.firebaseio.com/estado.json")
            .then(res => res.json())
            .then(data => {
                const estado = data.luz;
                if (estado === estadoActual) return;
                estadoActual = estado;

                if (estado === "parpadeo") {
                    iniciarParpadeo();
                } else if (estado === "ciclo") {
                    iniciarCiclo();
                } else if (['rojo', 'amarillo', 'verde'].includes(estado)) {
                    detenerParpadeo();
                    detenerCiclo();
                    apagarLuces();
                    luces[estado].style.opacity = "1";
                } else {
                    detenerParpadeo();
                    detenerCiclo();
                    apagarLuces();
                }
            })
            .catch(err => console.error("Error sincronizando:", err));
    }

    setInterval(sincronizar, 500);
    sincronizar();

    return contenedor;
}

export { crearSemaforo };

