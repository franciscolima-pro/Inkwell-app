# Inkwell App

## Overview

Inkwell App is a web application designed to create, organize, and manage digital books. The project allows users to create books, add chapters, and manage pages inside each chapter.

The main purpose of this project is to practice modern web development concepts, including TypeScript, object-oriented programming, modular architecture, DOM manipulation, and Firebase Firestore integration.

The application follows a structured architecture based on the separation of responsibilities between Models, Views, Services, and Controllers, improving maintainability and scalability.

## Features

### Book Management
- Create books with title, description, and visibility settings
- Edit existing books
- Delete books
- View book details

### Chapter Management
- Create chapters inside books
- Define chapter ordering
- Edit and delete chapters
- Navigate between books and chapters

### Page Management
- Create pages inside chapters
- Store page title, content, and order
- Edit and delete pages
- Display pages organized by chapter order

### Data Management
- Store application data using Firebase Firestore
- Convert Firestore documents into TypeScript model instances
- Organize database operations through service classes

## Tech Stack

- TypeScript
- HTML, CSS, and JavaScript APIs
- Vite for development and build tooling
- Firebase Firestore for database storage
- ES Modules for code organization

## Architecture

The project follows an MVC-inspired architecture:

### Models
Responsible for representing application entities and controlling data structure.

Examples:
- Book
- Chapter
- Page

### Views
Responsible for DOM manipulation and user interface updates.

Examples:
- BookView
- BookDetailsView
- ChapterDetailsView

### Controllers
Responsible for handling user actions and coordinating between views and services.

Examples:
- BookController
- BookDetailsController
- ChapterDetailsController

### Services
Responsible for communication with Firebase Firestore.

Examples:
- BookService
- ChapterService
- PageService

## Project Structure
```
src/
├── controllers/
│   ├── BookController.ts
│   ├── BookDetailsController.ts
│   └── ChapterDetailsController.ts
├── models/
│   ├── Book.ts
│   ├── Chapter.ts
│   └── Page.ts
├── services/
│   ├── BookService.ts
│   ├── ChapterService.ts
│   └── PageService.ts
├── views/
│   ├── BookView.ts
│   ├── BookDetailsView.ts
│   └── ChapterDetailsView.ts
├── config/
│   └── firebase.ts
├── app.ts
├── book.ts
└── chapter.ts
```
## Development Environment

This project was developed using:

- Visual Studio Code
- Node.js and npm
- Vite
- TypeScript
- Firebase

## Getting Started

1. Install dependencies:

   npm install

2. Start the development server:

   npm run dev

3. Open the local Vite URL in your browser.

## Software Demo Video

A demo video can be added here (optional).

## Useful Websites

- Vite Documentation - https://vitejs.dev/
- Firebase Documentation - https://firebase.google.com/docs
- TypeScript Documentation - https://www.typescriptlang.org/docs/
- MDN Web Docs - https://developer.mozilla.org/

## Future Work

- Migrate the application from static frontend to React framework
- Implement dynamic page generation with React components
- Replace Firebase Firestore with a backend database
- Add user authentication with React and session management
- Convert book, chapter, and page management to React state management
- Implement form handling and validation with React hooks
- Add routing for navigation between different views
- Deploy the React application with a backend server