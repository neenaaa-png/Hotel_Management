// seed.js - POST sample rooms to the running API
const BASE = process.env.API_BASE || 'http://localhost:3000';
const rooms = [
  { name: 'Room 101', type: 'Single', price: 50, image: '/assets/room1.svg' },
  { name: 'Room 102', type: 'Double', price: 80, image: '/assets/room2.svg' },
  { name: 'Suite 201', type: 'Suite', price: 180, image: '/assets/room3.svg' },
  { name: 'Family 301', type: 'Family', price: 140, image: '/assets/room4.svg' }
];

async function postRoom(r){
  const res = await fetch(`${BASE}/api/rooms`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(r) });
  return res.json();
}

async function run(){
  try{
    for(const r of rooms){
      const created = await postRoom(r);
      console.log('Created', created.id || created);
    }
    console.log('Seeding complete');
  }catch(e){
    console.error('Error seeding:', e.message || e);
    process.exit(1);
  }
}

run();
