const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(express.static("public"));

const PORT = 3000;

// ===============================
// LOCAL DATABASE
// ===============================

const DATA_FILE = path.join(__dirname, "data.json");

function loadData() {
  if (!fs.existsSync(DATA_FILE)) {
    const data = {
      rooms: [
        {
          id: "demo-1",
          name: "Room 101",
          type: "Single",
          price: 50,
          image: "/assets/room1.svg"
        },
        {
          id: "demo-2",
          name: "Room 102",
          type: "Double",
          price: 80,
          image: "/assets/room2.svg"
        },
        {
          id: "demo-3",
          name: "Suite 201",
          type: "Suite",
          price: 180,
          image: "/assets/room3.svg"
        },
        {
          id: "demo-4",
          name: "Family 301",
          type: "Family",
          price: 140,
          image: "/assets/room4.svg"
        }
      ],

      guests: [],

      bookings: []
    };

    fs.writeFileSync(
      DATA_FILE,
      JSON.stringify(data, null, 2)
    );

    return data;
  }

  return JSON.parse(
    fs.readFileSync(DATA_FILE, "utf8")
  );
}

function saveData() {
  fs.writeFileSync(
    DATA_FILE,
    JSON.stringify(db, null, 2)
  );
}

let db = loadData();


// ===============================
// HEALTH CHECK
// ===============================

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    database: "Local JSON",
    rooms: db.rooms.length,
    guests: db.guests.length,
    bookings: db.bookings.length
  });
});


// ===============================
// ROOMS
// ===============================

app.get("/api/rooms", (req, res) => {
  res.json(db.rooms);
});


app.get("/api/rooms/:id", (req, res) => {

  const room = db.rooms.find(
    r => r.id === req.params.id
  );

  if (!room) {
    return res.status(404).json({
      error: "Room not found"
    });
  }

  res.json(room);
});


app.post("/api/rooms", (req, res) => {

  const {
    name,
    type,
    price,
    image
  } = req.body;

  if (!name || !type || price === undefined) {
    return res.status(400).json({
      error: "Name, type and price are required"
    });
  }

  const room = {
    id: uuidv4(),
    name,
    type,
    price: Number(price),
    image: image || ""
  };

  db.rooms.push(room);

  saveData();

  res.status(201).json(room);
});


app.put("/api/rooms/:id", (req, res) => {

  const index = db.rooms.findIndex(
    r => r.id === req.params.id
  );

  if (index === -1) {
    return res.status(404).json({
      error: "Room not found"
    });
  }

  db.rooms[index] = {
    ...db.rooms[index],
    ...req.body
  };

  saveData();

  res.json(db.rooms[index]);
});


app.delete("/api/rooms/:id", (req, res) => {

  const index = db.rooms.findIndex(
    r => r.id === req.params.id
  );

  if (index === -1) {
    return res.status(404).json({
      error: "Room not found"
    });
  }

  const deleted = db.rooms.splice(index, 1)[0];

  saveData();

  res.json({
    message: "Room deleted",
    room: deleted
  });
});


// ===============================
// GUESTS
// ===============================

app.get("/api/guests", (req, res) => {
  res.json(db.guests);
});


app.get("/api/guests/:id", (req, res) => {

  const guest = db.guests.find(
    g => g.id === req.params.id
  );

  if (!guest) {
    return res.status(404).json({
      error: "Guest not found"
    });
  }

  res.json(guest);
});


app.post("/api/guests", (req, res) => {

  const {
    name,
    email,
    phone
  } = req.body;

  if (!name) {
    return res.status(400).json({
      error: "Guest name is required"
    });
  }

  const guest = {
    id: uuidv4(),
    name,
    email: email || "",
    phone: phone || ""
  };

  db.guests.push(guest);

  saveData();

  res.status(201).json(guest);
});


app.put("/api/guests/:id", (req, res) => {

  const index = db.guests.findIndex(
    g => g.id === req.params.id
  );

  if (index === -1) {
    return res.status(404).json({
      error: "Guest not found"
    });
  }

  db.guests[index] = {
    ...db.guests[index],
    ...req.body
  };

  saveData();

  res.json(db.guests[index]);
});


app.delete("/api/guests/:id", (req, res) => {

  const index = db.guests.findIndex(
    g => g.id === req.params.id
  );

  if (index === -1) {
    return res.status(404).json({
      error: "Guest not found"
    });
  }

  const deleted = db.guests.splice(index, 1)[0];

  saveData();

  res.json({
    message: "Guest deleted",
    guest: deleted
  });
});


// ===============================
// BOOKINGS
// ===============================

app.get("/api/bookings", (req, res) => {
  res.json(db.bookings);
});


app.get("/api/bookings/:id", (req, res) => {

  const booking = db.bookings.find(
    b => b.id === req.params.id
  );

  if (!booking) {
    return res.status(404).json({
      error: "Booking not found"
    });
  }

  res.json(booking);
});


app.post("/api/bookings", (req, res) => {

  const {
    guest,
    roomId,
    checkin,
    checkout
  } = req.body;

  if (!guest || !roomId || !checkin || !checkout) {
    return res.status(400).json({
      error: "All booking fields are required"
    });
  }

  const room = db.rooms.find(
    r => r.id === roomId
  );

  if (!room) {
    return res.status(400).json({
      error: "Room not found"
    });
  }

  const booking = {
    id: uuidv4(),
    guest,
    roomId,
    checkin,
    checkout
  };

  db.bookings.push(booking);

  saveData();

  res.status(201).json(booking);
});


app.delete("/api/bookings/:id", (req, res) => {

  const index = db.bookings.findIndex(
    b => b.id === req.params.id
  );

  if (index === -1) {
    return res.status(404).json({
      error: "Booking not found"
    });
  }

  const deleted = db.bookings.splice(index, 1)[0];

  saveData();

  res.json({
    message: "Booking deleted",
    booking: deleted
  });
});


// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {

  console.log("");
  console.log("=================================");
  console.log("Sunrise Hotel Backend");
  console.log("=================================");
  console.log(`Server: http://localhost:${PORT}`);
  console.log("Database: LOCAL JSON");
  console.log(`Rooms: ${db.rooms.length}`);
  console.log(`Guests: ${db.guests.length}`);
  console.log(`Bookings: ${db.bookings.length}`);
  console.log("=================================");
  console.log("");
});