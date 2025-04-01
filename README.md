```
    ▗▖  ▗▖▗▖  ▗▖    ▗▖  ▗▖▗▄▄▄▖▗▄▄▄ ▗▄▄▄▖ ▗▄▖      
    ▐▛▚▞▜▌ ▝▚▞▘     ▐▛▚▞▜▌▐▌   ▐▌  █  █  ▐▌ ▐▌     
    ▐▌  ▐▌  ▐▌      ▐▌  ▐▌▐▛▀▀▘▐▌  █  █  ▐▛▀▜▌     
    ▐▌  ▐▌  ▐▌      ▐▌  ▐▌▐▙▄▄▖▐▙▄▄▀▗▄█▄▖▐▌ ▐▌     


 ▗▄▄▖ ▗▄▖ ▗▖   ▗▖   ▗▄▄▄▖ ▗▄▄▖▗▄▄▄▖▗▄▄▄▖ ▗▄▖ ▗▖  ▗▖
▐▌   ▐▌ ▐▌▐▌   ▐▌   ▐▌   ▐▌     █    █  ▐▌ ▐▌▐▛▚▖▐▌
▐▌   ▐▌ ▐▌▐▌   ▐▌   ▐▛▀▀▘▐▌     █    █  ▐▌ ▐▌▐▌ ▝▜▌
▝▚▄▄▖▝▚▄▞▘▐▙▄▄▖▐▙▄▄▖▐▙▄▄▖▝▚▄▄▖  █  ▗▄█▄▖▝▚▄▞▘▐▌  ▐▌
```

# My Media Collection

A Next.js application for managing your personal collections of books, movies, and TV series. Built with React, TypeScript, and Next.js.

## Features

- **Multiple Collections**: Manage books, movies, and TV series in separate collections
- **Search & Filter**: Easily find items in your collections
- **Responsive Design**: Works on desktop and mobile devices
- **Persistent Storage**: Collections are saved in localStorage
- **Type Safety**: Built with TypeScript for better developer experience

## Tech Stack

- **Framework**: Next.js 15
- **UI**: React 19
- **Styling**: Tailwind CSS
- **Testing**: Jest and React Testing Library
- **E2E Testing**: Cypress
- **Type Checking**: TypeScript

## Installation

1. Clone the repository:

```bash
git clone https://github.com/papoola/my-media-collection.git
cd my-media-collection
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Commands

### Development

- **Start development server**:
  ```bash
  npm run dev
  ```
  Starts the development server with Turbopack for faster builds.

- **Build for production**:
  ```bash
  npm run build
  ```
  Creates an optimized production build.

- **Start production server**:
  ```bash
  npm run start
  ```
  Starts the application in production mode.

- **Lint code**:
  ```bash
  npm run lint
  ```
  Runs ESLint to check for code quality issues.

### Testing

- **Run all tests**:
  ```bash
  npm test
  ```
  Runs all Jest tests once.

- **Watch mode**:
  ```bash
  npm run test:watch
  ```
  Runs tests in watch mode, re-running tests when files change.

- **Coverage report**:
  ```bash
  npm run test:coverage
  ```
  Runs tests and generates a coverage report.

- **Run specific test files**:
  ```bash
  npm test -- <filename>
  ```
  Example: `npm test -- useBooks.test.tsx`

### E2E Testing

- **Open Cypress**:
  ```bash
  npm run cypress
  ```
  Opens the Cypress Test Runner in interactive mode.

- **Run Cypress headless**:
  ```bash
  npm run cypress:headless
  ```
  Runs Cypress tests in headless mode (useful for CI).

## Project Structure

- `/src/app/*` - Next.js app router pages
- `/src/components/*` - Reusable React components
- `/src/hooks/*` - Custom React hooks for data management
- `/src/types/*` - TypeScript type definitions
- `/src/__tests__/*` - Test files organized by type (components, hooks)

## Data Management

The application uses custom hooks for data management:

- `useBooks()` - Manages the book collection
- `useMovies()` - Manages the movie collection
- `useSeries()` - Manages the TV series collection

Each hook provides:
- Loading state
- CRUD operations
- Persistent storage via localStorage

## Testing

The project includes comprehensive tests:

- **Unit Tests**: For hooks and utility functions
- **Component Tests**: For UI components
- **Integration Tests**: For page functionality

Run tests with `npm test` or `npm run test:watch` for development.

## License

[MIT](LICENSE)
