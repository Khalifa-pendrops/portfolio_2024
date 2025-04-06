# My Portfolio Website

This is my personal portfolio website built using **React (with Vite)**, **Node.js**, **Express.js**, **MongoDB**, **TheNewsAPI**, and **Axios**. It showcases who I am, some of the projects I’ve worked on, and gives visitors the opportunity to explore top news stories and get in touch with me.

---

## Features

- **Modern UI/UX** built with React and Vite for fast, responsive performance.
- **Tech Section** to showcase my projects and skillset.
- **News Section** powered by [TheNewsAPI](https://www.thenewsapi.com/) to display trending global headlines.
- **Contact Form** that allows users to reach out to me - messages are saved in MongoDB.
- **Backend API** powered by Node.js and Express for form submission handling and database connectivity.

---

## Technologies Used

### Frontend
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/) - For making HTTP requests to APIs and the backend

### Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) - For storing form submissions

### External API
- [TheNewsAPI](https://www.thenewsapi.com/) - For fetching global top news stories

---

## Setup Instructions

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- MongoDB instance (local or Atlas)
- TheNewsAPI key

---

### Clone the Repository

```
git clone https://github.com/your-username/your-portfolio.git
cd your-portfolio

```

---

### Set Up Environment Variables

Create a .env file in the root of the server directory with the following:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NEWS_API_KEY=your_thenewsapi_key

```

---

### Install Dependencies

1. Backend

```
cd server
npm install

```


2. Frontend

```
cd ../client
npm install

```

---

### Run the Application

1. Start Backend

```
cd server
npm run dev

```


2. Start Frontend

```
cd ../client
npm run dev

```

---
