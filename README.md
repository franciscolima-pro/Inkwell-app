# Inkwell App

## Overview

Inkwell App is a web application for creating, organizing, and managing digital books.

Users can create books, add chapters to each book, and create pages inside individual chapters. The application provides CRUD functionality throughout the book hierarchy while maintaining a clean and reusable user interface.

The project was originally developed using JavaScript and an MVC-inspired architecture. It was later migrated to TypeScript and, for this module, redesigned using React to practice component-based development, state management, routing, and modern frontend application architecture.

The application uses Firebase Cloud Firestore as its database and React components to dynamically render and update the user interface.

## Features

### Book Management

* Create books with title, description, and visibility settings
* Edit existing books
* Delete books
* View book details
* Navigate between books and their chapters

### Chapter Management

* Create chapters inside books
* Define chapter ordering
* Edit existing chapters
* Delete chapters
* Open individual chapters
* Navigate between books and chapters

### Page Management

* Create pages inside chapters
* Define page ordering
* Store page titles and content
* Edit existing pages
* Delete pages
* Display pages organized within their chapters

### User Interface

* Responsive web interface
* Reusable React components
* Consistent styling across books, chapters, and pages
* Interactive forms with validation
* Navigation between application pages
* Empty states for collections without content
* Action buttons for opening, editing, and deleting content

### Data Management

* Store application data using Firebase Cloud Firestore
* Retrieve books, chapters, and pages asynchronously
* Organize database operations through dedicated service classes
* Maintain separate TypeScript models for application entities

## Tech Stack

* React
* TypeScript
* React Router
* HTML5
* CSS3
* Vite
* Firebase Cloud Firestore
* JavaScript APIs
* ES Modules

React is used to build the application's component-based user interface, while React Router manages navigation between books and chapters. Vite provides the development server and build tooling.

Firebase Cloud Firestore is used as the application's NoSQL document database for storing and retrieving books, chapters, and pages.

## Architecture

The application follows a component-based architecture inspired by the original MVC structure.

### Models

Models define the structure and types of the application's main entities.

Examples:

* `Book`
* `Chapter`
* `Page`

### Components

Reusable React components are responsible for displaying application elements and handling user interactions.

Examples:

* `Header`
* `BookCard`
* `BookForm`
* `ChapterCard`
* `ChapterForm`
* `PageCard`
* `PageForm`

### Pages

Pages represent the main views of the React application and coordinate components, state, services, and navigation.

Examples:

* `BooksPage`
* `BookDetailsPage`
* `ChapterDetailsPage`

### Services

Services are responsible for communication with Firebase Cloud Firestore and encapsulate database operations.

Examples:

* `BookService`
* `ChapterService`
* `PageService`

### Routing

React Router is used to navigate between different parts of the application.

Main routes include:

* `/` — Books
* `/books/:bookId` — Book details and chapters
* `/chapters/:chapterId` — Chapter details and pages

## Project Structure

```text
src/
├── components/
│   ├── Header.tsx
│   ├── BookCard.tsx
│   ├── BookForm.tsx
│   ├── ChapterCard.tsx
│   ├── ChapterForm.tsx
│   ├── PageCard.tsx
│   └── PageForm.tsx
│
├── pages/
│   ├── BooksPage.tsx
│   ├── BookDetailsPage.tsx
│   └── ChapterDetailsPage.tsx
│
├── models/
│   ├── Book.ts
│   ├── Chapter.ts
│   └── Page.ts
│
├── services/
│   ├── BookService.ts
│   ├── ChapterService.ts
│   └── PageService.ts
│
├── config/
│   └── firebase.ts
│
├── css/
│   └── style.css
│
├── App.tsx
└── main.tsx
```

## Development Environment

This project was developed using:

* Visual Studio Code
* Node.js and npm
* React
* TypeScript
* Vite
* Firebase
* Git and GitHub

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

### 3. Open the application

Open the local Vite URL displayed in the terminal.

The application runs locally using Vite's development server.

## Firebase Configuration

The application requires a Firebase project with Cloud Firestore configured.

The Firebase configuration is stored in:

```text
src/config/firebase.ts
```

For a production application, Firebase Authentication and appropriate Firestore Security Rules should be configured to protect database access. Firebase recommends using Authentication and Firestore Security Rules for access control in Web applications.

## Learning Objectives

This project was developed as a learning project to practice:

* TypeScript
* React
* React components
* React state management
* React hooks
* React Router
* Form handling
* Event handling
* Asynchronous programming
* Object-oriented programming
* Modular application architecture
* CRUD operations
* Firebase Firestore
* Responsive CSS
* Component reuse
* Separation of responsibilities

## Software Demo Video

A demo video can be added here.

## Useful Websites

* Vite Documentation
* Firebase Firestore Documentation
* TypeScript Documentation
* React Documentation
* React Router Documentation
* MDN Web Docs

## Future Work

Possible future improvements include:

* Add user authentication
* Associate books with individual users
* Improve Firestore Security Rules
* Add book cover images
* Add a rich text editor for pages
* Add search and filtering functionality
* Add drag-and-drop chapter and page ordering
* Add book sharing and public book discovery
* Improve accessibility
* Add automated tests using Jest or another testing framework
* Add deployment configuration
* Deploy the application to a production environment
* Add real-time Firestore listeners for live updates
