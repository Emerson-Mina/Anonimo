const socket = io(":3000"); //!Puede usar localhost o usar la ip ortorgada por su ONU "Router" en ifconfig
let usuarioNombre = null;

socket.on("asignarNombre", (nombre) => {
    usuarioNombre = nombre;
    notificarConexion();
});

socket.on("usuarioConectado", (data) => {
    mostrarMensaje(`🔔 <strong>${data.usuario}</strong> se ha unido al chat`, false);
    if (data.sonido) {
        reproducirSonido(data.sonido);
    }
});

socket.on("mensaje", async (data) => {
    const esMio = data.usuario === usuarioNombre;
    mostrarMensaje(`${data.usuario}: ${data.mensaje}`, esMio, data.hora);
    if (!esMio) {
        mostrarNotificacion(data.usuario, data.mensaje);
        await notificarMensaje();
    }
});

function enviarMensaje() {
    const input = document.getElementById("mensaje");
    if (input.value.trim() !== "") {
        socket.emit("mensaje", input.value);
        input.value = "";
    }
}

function mostrarMensaje(mensaje, esMio, hora = "") {
    const chat = document.getElementById("chat");
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message");
    if (esMio) msgDiv.classList.add("self");
    msgDiv.innerHTML = `<p>${mensaje}</p><small>${hora}</small>`;
    chat.appendChild(msgDiv);
    chat.scrollTop = chat.scrollHeight;
}

function mostrarNotificacion(usuario, mensaje) {
    if (Notification.permission === "granted") {
        new Notification("Nuevo mensaje", {
            body: `${usuario}: ${mensaje}`,
            icon: "https://thumbs.dreamstime.com/b/icono-desconocido-de-las-personas-del-grupo-pictograma-an%C3%B3nimo-aislado-en-el-fondo-blanco-ejemplo-la-muestra-vector-146954424.jpg"//?Esto es una imagen que use como icono para la notificaicon en el navegador
        });
    }
}

function notificarConexion() {
    fetch("http://localhost:3002/api/notificar-conexion", { method: "POST" })
        .then(response => response.json())
        .then(data => console.log("📢 Notificación de conexión enviada:", data))
        .catch(error => console.error("❌ Error en la notificación de conexión:", error));
}

async function notificarMensaje() {
    try {
        const response = await fetch("http://localhost:3003/api/notificar-mensaje", { method: "POST" });
        const data = await response.json();
        console.log("📢 Notificación de mensaje enviada:", data);
        if (data.sonido) {
            reproducirSonido(data.sonido);
        }
    } catch (error) {
        console.error("❌ Error en la notificación de mensaje:", error);
    }
}

function reproducirSonido(url) {
    const audio = new Audio(url);
    audio.play().catch(error => console.error("🔊 Error al reproducir sonido:", error));
}

if (Notification.permission !== "granted") {
    Notification.requestPermission();
}
