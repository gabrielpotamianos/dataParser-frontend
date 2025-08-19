// api.js
const isProd = true;
const URL = isProd ? "https://dataparser.gabri-the-dev.com/" : "http://localhost:8000/"



export async function login(username, password) {
  const response = await fetch(`${URL}login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) throw new Error('Login failed');
  return response.json(); 
}

export async function getCandidates(token) {
  const response = await fetch(`${URL}candidates/`, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
     }
  });
  if (!response.ok) throw new Error('Login failed');
  return response.json(); 
}
