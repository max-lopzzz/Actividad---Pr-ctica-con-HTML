# Práctica HTML + CSS + JavaScript

Frontend integrado con la REST-API: https://github.com/max-lopzzz/practica-rest-api

## Qué usa de la API

| Página          | Petición                              |
|-----------------|---------------------------------------|
| `index.html`    | `POST /login`                         |
| `registro.html` | `POST /users`                         |
| `profile.html`  | `GET`, `PUT` y `DELETE /users/:id`    |
| `form.html`     | `POST /contactos`                     |

La URL de la API está en `api.js` (`API_URL`, por defecto `http://localhost:4000`).

## Cómo probarlo

1. Levanta la API (`npm run dev` en el repo del backend).
2. Sirve esta carpeta, por ejemplo con `python3 -m http.server 5500`, y abre http://localhost:5500.
3. Crea una cuenta en "Regístrate aquí" e inicia sesión.
