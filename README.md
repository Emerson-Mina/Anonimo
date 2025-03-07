# Chat en Tiempo Real

Este es un chat en tiempo real basado en HTML, CSS, JavaScript y Socket.io. Permite la comunicación instantánea entre múltiples usuarios en la misma red.

## Estructura del Proyecto

```
/chat-app
│── index.html     # Estructura principal del chat
│── styles.css     # Estilos del chat
│── chat.js        # Lógica del chat con Socket.io
```

## Instalación y Configuración

### Requisitos
- Tener Python instalado.
- Tener acceso a una red local para pruebas con múltiples dispositivos.

### Pasos para Configurar el Proyecto

1. Clona este repositorio o crea los archivos mencionados

```sh
git clone https://github.com/tuusuario/chat-app.git
cd chat-app
```

## Ejecutar el Frontend

Para ver el chat en tu navegador, usa el siguiente comando:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

Accede en tu navegador:

```
http://192.168.1.13:8000
```

## Exponer el Chat a Otros Dispositivos

### Encuentra tu IP Local

Ejecuta este comando para obtener tu IP:

```sh
ip a | grep inet
```

Busca una dirección tipo **192.168.x.x** o **10.x.x.x**.

### Abre el Firewall para Permitir Conexiones (Si es Necesario)

```sh
sudo ufw allow 8000
```

Para quitar las reglas después:

```sh
sudo ufw delete allow 8000
```

### Accede desde Otro Dispositivo

En un navegador de otro dispositivo (PC o celular en la misma red), escribe:

```
http://su ip local :8000
```

Esto cargará el chat en tiempo real.

## Listo para Usar

Tu chat está funcionando en la red local. Puedes conectarte desde cualquier dispositivo en la misma red. Si necesitas exponerlo en internet, usa `ngrok`.
