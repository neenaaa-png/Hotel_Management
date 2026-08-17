// seed-guests.js - POST sample guests to the running API
const BASE = process.env.API_BASE || 'http://localhost:3000';
const guests = [
  { name: 'Alice Johnson', email: 'alice@example.com', phone: '555-0101' },
  { name: 'Bob Martin', email: 'bob@example.com', phone: '555-0102' },
  { name: 'Charlie Day', email: 'charlie@example.com', phone: '555-0103' }
];

async function postGuest(g){
  const res = await fetch(`${BASE}/api/guests`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(g) });
  return res.json();
}

async function run(){
  try{
    for(const g of guests){
      const created = await postGuest(g);
      console.log('Created guest', created.id || created);
    }
    console.log('Guests seeding complete');
  }catch(e){
    console.error('Error seeding guests:', e.message || e);
    process.exit(1);
  }
}

run();
