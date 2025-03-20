import fetch from "node-fetch";

export async function getAccessToken(): Promise<string> {
  const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.AUTH0_CLIENT_ID_ADMIN,
      client_secret: process.env.AUTH0_CLIENT_SECRET_ADMIN,
      audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
      grant_type: "client_credentials",
    }),
  });

  if (!response.ok) {
    throw new Error(`Error obteniendo el token de acceso: ${response.statusText}`);
  }

  const data = await response.json();
  return data.access_token;
}


export async function getAuth0UserByEmail(accessToken: string, email: string) {
  const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users-by-email?email=${email}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Error buscando usuario en Auth0: ${response.statusText}`);
  }

  const users = await response.json();
  return users.length > 0 ? users[0] : null;
}


export async function createAuth0User(accessToken: string, userData: any) {
  const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error(`Error creando usuario en Auth0: ${response.statusText}`);
  }

  return await response.json();
}
