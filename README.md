
================================================================Installing Node.js ==============================================================================================================
# Node.js Installation Guide

This guide provides step-by-step instructions for installing Node.js on various platforms. Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine, ideal for building scalable and fast network applications.

---

## 📦 What You’ll Need

- Admin access to your system
- Internet connection

---

## 🖥️ Installation Instructions

### 🔹 Windows

1. Go to the [official Node.js website](https://nodejs.org).
2. Download the **LTS** version (recommended for most users).
3. Run the downloaded `.msi` installer.
4. Follow the installation wizard:
   - Accept the license agreement
   - Choose the installation path
   - Make sure the option *“Add to PATH”* is checked
5. To Verify, Open **Command Prompt** and run:
   ```bash
   node -v
   npm -v



================================================================Installing NestJS ==============================================================================================================

# 🚀 NestJS Installation Guide

NestJS is a progressive Node.js framework for building efficient, reliable, and scalable server-side applications using TypeScript.

---

## ✅ Prerequisites

Before you begin, make sure the following are installed:

- **Node.js** (v16.0.0 or higher recommended)  
  Install from [nodejs.org](https://nodejs.org)


## 🧰 Install the Nest CLI

Use npm to install the NestJS Command Line Interface globally:

```bash
npm install -g @nestjs/cli

-to verify NestJS

nest --version

To Run the Application
npm run start

================================================================Installing Reactjs ==============================================================================================================


# 🐳 Docker Installation Guide

Docker is a platform that enables developers to build, ship, and run applications in containers. This guide helps you install Docker on your local machine.

---

## ✅ Prerequisites

- Admin access to your computer
- A supported OS (Windows, macOS, or Linux)
- Internet connection

---

## 🖥️ Installation Steps

### 🔹 Windows

1. Download Docker Desktop for Windows from:  
   [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)

2. Run the installer and follow the setup wizard.

3. After installation:
   - Docker Desktop will start automatically.
   - You may need to enable WSL 2 (the installer will guide you if needed).

4. Verify Docker installation:
   ```bash
   docker --version



================================================================Installing Mongo DB=======================================================================================================


# 🍃 MongoDB Installation Guide

MongoDB is a popular NoSQL database known for its flexibility, scalability, and ease of use. This guide covers installation on Windows, macOS, and Linux.

---

## ✅ Prerequisites

- Admin rights on your machine
- Internet connection

---

## 🖥️ Installation Instructions

### 🔹 Windows

1. Go to the MongoDB Community Server page:  
   [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

2. Select:
   - Version: Latest
   - Platform: Windows
   - Package: `.msi`

3. Download and run the installer:
   - Choose “Complete” setup
   - Enable **MongoDB as a service**
   - Optionally install **MongoDB Compass** (GUI)

4. Verify installation:
   Open Command Prompt and run:
   ```bash
   mongod --version
   

================================================================Cloning the Reposoitories=======================================================================================================


NestJs Project (Backend)
========================

1. Clone the repository:
      https://github.com/kumarsunnyil/DaikinNest.git
      cd DaikinNest
      git pull
2. Install the dependencies:
      npm install 
3. npm run start

ReactJs Front End 
=========
1. https://github.com/kumarsunnyil/DaikinNest.git
2. cd DaikinNest
3. git pull
#to install the modules 
4. npm install 
5. npm start

to run docker 
1. Go to the installation folder of the backend server
2. cd DaikinNest
3. docker compose up -d
