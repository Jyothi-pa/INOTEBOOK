# #1. Project Setup
Backend Setup (Node.js + Express + MongoDB)

1.1. Initialize the project:
mkdir inotebook
cd inotebook
npm init -y

1.2. Install dependencies:
npm install express mongoose bcryptjs jsonwebtoken cors dotenv
npm install --save-dev nodemon

1.3
# basic project structure
inotebook/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── Note.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── notes.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
└── README.md
