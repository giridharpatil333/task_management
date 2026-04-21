# TaskFlow — Modern Task Management Dashboard

TaskFlow is a production-quality task management application built with React, TypeScript, and Tailwind CSS. It features a clean architecture, smooth animations, and a polished user interface.

## 🚀 Features

- **Full CRUD Operations**: Create, Read, Update, and Delete tasks seamlessly.
- **Task Organization**:
  - Manual Drag & Drop reordering.
  - Filter by Status (Pending/Completed) and Priority (Low, Medium, High).
  - Search tasks with debounced input.
- **Rich UI/UX**:
  - Dark Mode support with persistence.
  - List and Grid view toggles.
  - Drag & Drop reordering using `@dnd-kit`.
  - Micro-interactions and smooth transitions using Tailwind CSS.
  - Confirmation dialogs for destructive actions.
- **Persistence**: Automatic state persistence to `localStorage`.
- **Keyboard Shortcuts**: Press `N` to quickly open the "New Task" modal.
- **Responsive Design**: Mobile-first layout that scales beautifully from small screens to desktops.
- **Clean Architecture**: Modular structure with separated concerns (store, hooks, components, features).

## 🛠️ Tech Stack

- **Core**: React 18, TypeScript (Strict Mode)
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Drag & Drop**: dnd-kit
- **Icons & UI**: Custom SVG icons, Inter font
- **Testing**: Jest, React Testing Library
- **Build Tool**: Vite

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Running Tests

To run the unit tests:
```bash
npm test
```

## 🏗️ Project Structure

```
src/
 ├── components/       # Reusable UI components
 ├── constants/        # Configuration and static values
 ├── features/tasks/   # Task-specific logic and components
 ├── hooks/            # Custom React hooks
 ├── pages/            # Page-level components
 ├── store/            # Zustand state stores
 ├── types/            # TypeScript interfaces/types
 ├── utils/            # Helper functions and storage wrappers
 └── App.tsx           # Root component
```

## ⌨️ Keyboard Shortcuts

- `N`: Open New Task Modal
- `ESC`: Close Modals/Dialogs

---

Built with ❤️ by Antigravity
