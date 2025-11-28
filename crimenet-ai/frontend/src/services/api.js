export async function getGraph() {
  const res = await fetch('/api/graph');
  if (!res.ok) throw new Error('Failed to fetch graph');
  return res.json();
}

export async function getNodeDetails(nodeId) {
  const res = await fetch(`/api/node/${encodeURIComponent(nodeId)}`);
  if (!res.ok) throw new Error('Failed to fetch node details');
  return res.json();
}

export async function getAlerts() {
  const res = await fetch('/api/alerts');
  if (!res.ok) throw new Error('Failed to fetch alerts');
  return res.json();
}

export async function simulate(node_id, action_type) {
  const res = await fetch('/api/simulate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ node_id, action_type })
  });
  if (!res.ok) throw new Error('Failed to simulate');
  return res.json();
}

export async function login(role) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role })
  });
  if (!res.ok) throw new Error('Failed to login');
  return res.json();
}
