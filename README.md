# Hotel Management Lab App

Simple hotel management app for AWS EC2 + DynamoDB lab.

Run locally:

```bash
npm install
cp .env.example .env
# Set AWS credentials or use instance role
npm start
```

Seed sample rooms (posts to running API):

```bash
# ensure server is running
npm run seed
```

Seed sample guests:

```bash
# ensure server is running
npm run seed:guests
```

Create DynamoDB table:

1. Table name: `Hotels`
2. Partition key: `id` (String)

Deployment notes: Launch an EC2 instance with a role that allows DynamoDB actions, install Node.js, clone this repo, set environment variables, and run `npm start`.
