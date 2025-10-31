# 🚀 Code_Verse – A Competitive Programming Portal  

**Code_Verse** is a full-stack web platform designed for competitive programmers 🧠💻.  
It provides an integrated environment to **write, compile, manage, and share code**, along with features for **DSA practice**, **contests**, and **user profiles** — all in one place!

---

## 🌟 Features

### 🧩 Code Editor  
- Real-time online IDE with multiple language support  
- Syntax highlighting and instant output display  
- Code saving and retrieval per user  

### 💬 Chat System  
- Real-time group & private chat between users  
- Socket-based implementation for instant communication  

### 📚 DSA Questions  
- Users can create, edit, and manage their own DSA problems  
- Others can read and practice them  
- Great for self-preparation and peer learning  

### 🏆 Contests  
- Upcoming contests fetched from platforms like **Codeforces**, **LeetCode**, and **CodeChef**  
- Displays name, platform, start time, and duration  

### 👤 Profile Management  
- Update personal details and profile image (via Cloudinary integration)  
- Manage your questions, codes, and activity easily  

---

## 🛠️ Tech Stack

### Frontend (Client)
- **React.js** ⚛️  
- **Bootstrap & CSS Animations** 🎨  
- **Axios** for API requests  

### Backend (Server)
- **Node.js + Express.js** 🚀  
- **MongoDB (Mongoose ORM)** 🗄️  
- **JWT Authentication** 🔒  
- **Cloudinary** for image upload  
- **Socket.io** for chat  

---

## ⚙️ Installation & Setup
- Install [Node.js](https://nodejs.org/en/), [ReactJs](https://reactjs.org/docs/getting-started.html), [MongoDB](https://www.mongodb.com/)
```bash
# Clone the repository  
git clone https://github.com/Drakshi22/Code_Verse.git  

# Navigate to the project folder  
cd Code_Verse  

# Install dependencies for both frontend & backend  
cd client && npm install  
cd ../server && npm install  

# Run the backend  
npm start  

# Run the frontend  
npm start
```
## 🔧 Environment Variables
```python

MONGO_URL=*****
# Secrect keys given by API: https://www.jdoodle.com/
# Please set it before using application, otherwise cpp and java won't work

JDOODLE_CLIENTID=*****
JDOODLE_CLIENTSECRET=*****
CLOUDINARY_NAME=*****
CLOUDINARY_API_KEY=*****
CLOUDINARY_API_SECRET=*****

```
## How to run ?
```python
# start React server (frontend) 
npm start
# start node.js server (backend)
nodemon index.js
```

## 🚀 Future Enhancements
- Add dark/light theme toggle 🌗  
- Improve leaderboard & contest history  
- Add more language support for code editor  
- Integrate AI-based code suggestions 🤖

