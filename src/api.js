const API_BASE = '/api';

export async function fetchItems() {
  const response = await fetch(`${API_BASE}/items`);
  if (!response.ok) throw new Error('Failed to fetch items');
  return response.json();
}

export async function fetchItemsByStatus(status) {
  const response = await fetch(`${API_BASE}/items/${status}`);
  if (!response.ok) throw new Error('Failed to fetch items');
  return response.json();
}

export async function createItem(item) {
  const response = await fetch(`${API_BASE}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  if (!response.ok) throw new Error('Failed to create item');
  return response.json();
}

export async function updateItem(id, updates) {
  const response = await fetch(`${API_BASE}/items/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  if (!response.ok) throw new Error('Failed to update item');
  return response.json();
}

export async function deleteItem(id) {
  const response = await fetch(`${API_BASE}/items/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete item');
}
