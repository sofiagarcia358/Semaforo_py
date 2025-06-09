function crearTemperaturaPanel() {
    const panel = document.createElement("div");
    panel.className = "panel-temperatura";

    const titulo = document.createElement("h2");
    titulo.innerText = "Temperaturas";

    const temperaturaInfo = document.createElement("div");
    temperaturaInfo.className = "info-temperatura";
    temperaturaInfo.id = "temp-valor";
    temperaturaInfo.innerText = "-- °C";

    const humedadInfo = document.createElement("div");
    humedadInfo.className = "info-temperatura";
    humedadInfo.id = "hum-valor";
    humedadInfo.innerText = "-- %";

    const otroTitulo = document.createElement("div");
    otroTitulo.className = "titulo-pendi";
    otroTitulo.innerText = "Estado del Ventilador";

    const ventiladorImg = document.createElement("img");
    ventiladorImg.src = "https://i5.walmartimages.com/asr/d56fef64-f394-4efa-b397-9c2044b97a61.087f7e09011492df4d402b6ac8fef141.jpeg"; // Imagen estática por defecto
    ventiladorImg.alt = "Estado del ventilador";
    ventiladorImg.className = "ventilador-img";
    ventiladorImg.id = "ventilador-img"; 

    panel.appendChild(titulo);
    panel.appendChild(temperaturaInfo);
    panel.appendChild(humedadInfo);
    panel.appendChild(otroTitulo);
    panel.appendChild(ventiladorImg);

    return panel;
}

function actualizarTemperaturaDesdeFirebase() {
    fetch("https://semaforo67-e5e01-default-rtdb.firebaseio.com/estado.json")
        .then(response => response.json())
        .then(data => {
            const temp = data.temp;
            const hum = data.hum;

            const tempElemento = document.getElementById("temp-valor");
            const humElemento = document.getElementById("hum-valor");
            const ventiladorImg = document.getElementById("ventilador-img");

            if (tempElemento && humElemento) {
                tempElemento.innerText = `${temp ?? "--"} °C`;
                humElemento.innerText = `${hum ?? "--"} %`;
            }

            // Control del ventilador
            if (ventiladorImg) {
                if (temp > 30) {
                    ventiladorImg.src = "https://www.grupodiarventilacion.com/static/images/loader_gif.gif"; // GIF animado
                    ventiladorImg.alt = "Ventilador en funcionamiento";
                } else {
                    ventiladorImg.src = "https://i5.walmartimages.com/asr/d56fef64-f394-4efa-b397-9c2044b97a61.087f7e09011492df4d402b6ac8fef141.jpeg"; // Imagen estática
                    ventiladorImg.alt = "Ventilador apagado";
                }
            }
        })
        .catch(err => {
            console.error("Error obteniendo temperatura/humedad:", err);
        });
}

export { crearTemperaturaPanel, actualizarTemperaturaDesdeFirebase };