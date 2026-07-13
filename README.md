# Inkwell App

## Overview

Inkwell App is a simple web application for creating and managing books. The project was built to practice modular JavaScript, DOM interaction, and integration with Firebase Firestore. The main goal is to organize the code clearly using separate layers for the model, view, service, and controller.

## Features

- Create a new book with a title, description, and visibility setting
- Store book data in Firebase Firestore
- Keep the application structure organized with a controller-service-view pattern
- Provide a simple interface for the core book creation workflow

## Tech Stack

- HTML, CSS, and JavaScript
- Vite for development and build tooling
- Firebase Firestore for data storage
- ES modules for project organization

## Project Structure

- src/controllers: handles user actions and form submission
- src/models: defines the Book model
- src/services: contains Firestore operations
- src/views: manages form access and DOM interactions
- src/config: Firebase configuration
- src/tests: basic test examples

## Development Environment

This project was developed using:

- Visual Studio Code
- Node.js and npm
- Vite
- Firebase

## Getting Started

1. Install dependencies:
	```bash
	npm install
	```
2. Start the development server:
	```bash
	npm run dev
	```
3. Open the local Vite URL in your browser.

## Software Demo Video

A demo video can be added here (optional).

## Useful Websites

- [Vite Documentation](https://vite.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [MDN Web Docs](https://developer.mozilla.org/)

## Future Work

- Add book listing and editing features
- Improve the user interface and styling
- Add authentication and user-specific books
- Add stronger validation and error handling