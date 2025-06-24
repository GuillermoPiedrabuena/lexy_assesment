/**
 * Realiza una petición HTTP genérica.
 * @param {'GET'|'POST'|'PUT'|'DELETE'|'PATCH'} method - Método HTTP.
 * @param {string} baseUrl - URL base (ej: 'https://pokeapi.co/api/v2').
 * @param {string} path - Path del endpoint (ej: '/pokemon/pikachu').
 * @param {object} [payload] - Cuerpo de la petición para métodos que lo soportan.
 * @param {object} [headers] - Headers adicionales.
 * @returns {Promise<any>} - Respuesta parseada como JSON.
 */
export async function apiRequest(method, baseUrl, path, payload = null, headers = {}) {
  const url = `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };
  if (payload && method !== "GET") {
    options.body = JSON.stringify(payload);
  }
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
}