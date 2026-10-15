# Práctica HTML + CSS + JavaScript

Frontend integrado con la REST-API: https://github.com/max-lopzzz/practica-rest-api

## Qué usa de la API

| Página          | Petición                              |
|-----------------|---------------------------------------|
| `index.html`    | `POST /login`                         |
| `registro.html` | `POST /users`                         |
| `profile.html`  | `GET`, `PUT` y `DELETE /users/:id`    |
| `form.html`     | `POST /contactos`                     |
| `juego.html`    | `GET /game/:id` (y el juego: `GET` y `PUT /game/:id`) |

La URL de la API está en `api.js` (`API_URL`, por defecto `http://localhost:4000`).

## Cómo probarlo

1. Levanta la API (`npm run dev` en el repo del backend).
2. Sirve esta carpeta, por ejemplo con `python3 -m http.server 5500`, y abre http://localhost:5500.
3. Crea una cuenta en "Regístrate aquí" e inicia sesión.

## Videojuego: Clippy vs BonziBuddy

`juego.html` carga el juego de Unity (carpeta `game/`, compilado para WebGL) en un iframe:
`game/index.html?user_id=ID`. El ID se obtiene al iniciar sesión.

- El juego lee `user_id` de su URL y trae el nombre y los puntos con `GET /game/:id`.
- Clippy junta las bananas de Bonzi (+10 cada una) y esquiva sus cáscaras.
- El botón **Guardar puntaje** (o la tecla **G**) guarda los puntos con `PUT /game/:id` y body `{puntos}`.
- Si Bonzi deja a Clippy sin energía se pierden los puntos que no se guardaron.

El código del juego (proyecto de Unity) está en https://github.com/max-lopzzz/clippy-vs-bonzi
