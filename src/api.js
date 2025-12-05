// src/api.js
const BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

async function handleRes(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json();
}

export const fetchFamilies = () => fetch(`${BASE}/families`).then(handleRes);
export const createFamily = (name) =>
  fetch(`${BASE}/families`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  }).then(handleRes);
export const deleteFamily = (id) =>
  fetch(`${BASE}/families/${id}`, { method: 'DELETE' }).then(handleRes);

export const fetchMembers = (familyId) =>
  fetch(`${BASE}/families/${familyId}/members`).then(handleRes);
export const addMember = (familyId, data) =>
  fetch(`${BASE}/families/${familyId}/members`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(handleRes);

export const updateMember = (id, data) =>
  fetch(`${BASE}/members/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(handleRes);

export const deleteMember = (id) =>
  fetch(`${BASE}/members/${id}`, { method: 'DELETE' }).then(handleRes);
