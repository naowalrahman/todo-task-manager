# Todo List/Task Manager App

A simple to-do list/task manager application built with React, TypeScript, and Material UI. This app allows users to add tasks, mark them as complete, and delete them. The app can be viewed online [here](https://naowalrahman.rocks/todo-task-manager).

## Features

- **Add Tasks**: Create new tasks with descriptions
- **Mark Tasks as Complete**: Toggle tasks between complete and incomplete states
- **Delete Tasks**: Remove tasks from the list
- **Task Filtering**: Filter tasks by completion, or display all tasks at once in list view
- **Visual Feedback**: Receive notifications upon task state change (i.e. add/delete/complete/incomplete actions)
- **Theming**: Toggle between light and dark theme

## Technologies Used

- **React**: Frontend library for building the user interface
- **TypeScript**: Type-safe JavaScript for better development experience
- **Material UI**: Modern component library for clean, intuitive, and responsive UI
- **Vite**: Fast build tool for web development

## Local Setup

Running the app locally requires [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to be installed on your system.

1. Clone the repository:

   ```
   git clone https://github.com/naowalrahman/todo-task-manager.git
   cd todo-task-manager
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm run dev
   ```

4. Open your browser and navigate to the URL shown in your terminal (typically http://localhost:5173/)

## Building for Production

To build the app for production:

```
npm run build
```

The build files will be generated in the `dist` directory.

## Preview Production Build

To preview the production build locally:

```
npm run preview
```

Then navigate to the URL shown in your terminal (typically http://localhost:4173/).

## Development Commands

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start development server         |
| `npm run build`   | Build for production             |
| `npm run lint`    | Run ESLint to check code quality |
| `npm run format`  | Format code with Prettier        |
| `npm run preview` | Preview production build         |
