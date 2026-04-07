# 💻 StackOverflow Clone (Next.js & Appwrite)

<div align="center">
  A modern, fully functional Q&A platform inspired by StackOverflow. Built with Next.js, Appwrite, and Tailwind CSS.
</div>

---

## 🚀 Overview

This project is a full-stack web application that replicates the core functionalities of StackOverflow. It uses **Next.js** for seamless server-side rendering and routing, combined with **Appwrite** (via the Node.js SDK) to handle backend services like database management and user authentication. The user interface is highly responsive and styled using **Tailwind CSS**, supplemented by beautifully animated components from **Magic UI** and UI primitives.

## ✨ Features

- **Robust Authentication**: Secure user sign-up and log-in with email and password via Appwrite Auth.
- **Questions & Answers**: Core Q&A functionality—users can ask questions, provide answers, and engage in discussions.
- **Voting System**: Upvote and downvote functionality for both questions and answers to surface the best solutions.
- **Comments & Discussions**: Threaded comments on specific posts for clarification and context.
- **Rich Text & Markdown**: Full Markdown support for writing and formatting questions and code snippets effortlessly.
- **Search Functionality**: Quickly find relevant questions and topics across the database.
- **Theming**: Dark and Light mode support for better accessibility and user preference.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, TypeScript)
- **Backend/BaaS:** [Appwrite](https://appwrite.io/) (Auth, Databases, Storage)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Magic UI](https://magicui.design/) / Radix UI / Shadcn (via `components.json`)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

---

## 🚦 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/download/) (v16.14.0 or higher)
- npm, yarn, or pnpm
- An [Appwrite](https://appwrite.io/docs/installation) instance (Cloud or Self-Hosted, v1.0.0 or higher)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/professionaldev527/next.js-appwrite-stackoverflow.git
   cd next.js-appwrite-stackoverflow
