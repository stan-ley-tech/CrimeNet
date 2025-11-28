import Graph from 'graphology'

export function generateWepesiGraph() {
  const graph = new Graph()

  // Kingpin
  graph.addNode('king', {
    label: 'Juma "King" Otieno',
    type: 'person',
    role: 'Syndicate Leader',
    risk: 96,
    size: 45,
    color: '#00D4FF',
    x: 0,
    y: 0,
  })

  // 3 Lieutenants
  ;['Ali Mohammed', 'Fatuma Hassan', 'Peter Odhiambo'].forEach((name, i) => {
    const id = `lt${i}`
    graph.addNode(id, {
      label: name,
      type: 'person',
      risk: 85 + i * 4,
      size: 32,
      color: '#00D4FF',
      x: Math.cos(i * 2.1) * 350,
      y: Math.sin(i * 2.1) * 350,
    })
    graph.addEdge('king', id, { type: 'command', color: '#00D4FF', size: 6 })
  })

  // 40+ mule accounts
  for (let i = 0; i < 45; i++) {
    const acc = `acc${i}`
    graph.addNode(acc, {
      label: `KE8291${1000 + i}`,
      type: 'account',
      risk: 55 + Math.random() * 35,
      size: 16,
      color: '#FF6B00',
      x: Math.random() * 1000 - 500,
      y: Math.random() * 800 - 400,
    })
  }

  // 30 SIM/phones
  for (let i = 0; i < 30; i++) {
    const phone = `sim${i}`
    graph.addNode(phone, {
      label: `07${Math.floor(Math.random() * 90000000 + 10000000)}`,
      type: 'phone',
      risk: 60 + Math.random() * 30,
      size: 18,
      color: '#00FF9D',
      x: Math.random() * 1000 - 500,
      y: Math.random() * 800 - 400,
    })
  }

  // 5 shell companies
  ;['Swift Logistics Ltd', 'Coastal Freight Co', 'Nairobi Express', 'EastLink Traders', 'Premier Movers'].forEach(
    (name, i) => {
      graph.addNode(`co${i}`, {
        label: name,
        type: 'company',
        risk: 88,
        size: 28,
        color: '#C13CFF',
        x: Math.cos(i * 1.3) * 600,
        y: Math.sin(i * 1.3) * 600,
      })
    },
  )

  return graph
}
