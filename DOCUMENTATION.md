# Hotel Management App - Documentation

1) DOMAIN

 - Hotel Management: Manage rooms, guests, and bookings for a small hotel.

2) DESCRIPTION

 - This simple web application allows creating, viewing, updating, and deleting hotel rooms. It's built with a Node.js Express backend, a static frontend (5 pages), and stores data in Amazon DynamoDB. Designed for deployment to AWS EC2 with DynamoDB as the persistent store.

3) SERVICES USED IN APPLICATION DEVELOPMENT

 - Amazon EC2: Host the Node.js application and static frontend.
 - Amazon DynamoDB: NoSQL database for storing room records.
 - (Local) Node.js + Express: Backend API server.
 - AWS SDK for JavaScript v3: Access DynamoDB from Node.js.

4) SUBMISSION REQUIREMENTS

 - Frontend screens (5): Home, Rooms, Create Room, Edit Room, Guests, Bookings (Guests and Bookings are placeholders to reach 5+ screens). Screenshots: Start the server locally and take screenshots of each page while interacting (not included here).

Notes on deployment:

 - Create a DynamoDB table named `Hotels` with primary key `id` (String).
 - On an EC2 instance, install Node.js, clone this repo, run `npm install`, set environment variables, and `npm start`.

API endpoints:

 - GET /api/rooms
 - GET /api/rooms/:id
 - POST /api/rooms
 - PUT /api/rooms/:id
 - DELETE /api/rooms/:id

Screenshots (place these files in the `screenshots/` folder):

- `screenshots/home.png` — Home page
- `screenshots/rooms.png` — Rooms listing
- `screenshots/create.png` — Create Room form
- `screenshots/edit.png` — Edit Room form
- `screenshots/guests.png` — Guests page
- `screenshots/bookings.png` — Bookings page

Take screenshots after starting the app locally (`npm start`) and interacting with the UI. Upload these images alongside this repository when submitting the lab.
