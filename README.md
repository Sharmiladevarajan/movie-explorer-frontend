
# Movie Explorer Frontend

A modern, Netflix-style movie explorer built with Next.js, React, TypeScript, RTK Query, Redux Toolkit, and Tailwind CSS.

## Features
- Browse movies by category
- Search movies by title, director, or description
- Admin mode for adding, editing, and deleting movies
- Responsive, animated UI
- End-to-end tested with Jest and React Testing Library

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
```bash
npm install
# or
yarn install
```

### Running the Development Server
```bash
npm run dev
# or
yarn dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Running Tests
```bash
npm test
```

### Building for Production
```bash
npm run build
npm start
```

### Linting & Formatting
```bash
npm run lint
npm run format
```

### Environment Variables
Create a `.env.local` file for any required environment variables (e.g., API base URL).

### Docker Support
Build and run the frontend in Docker:
```bash
docker build -t movie-explorer-frontend .
docker run -p 3000:3000 movie-explorer-frontend
```

## Project Structure
- `src/app/` - Main app pages and routes
- `src/components/` - Reusable UI components
- `src/contexts/` - React context providers
- `src/lib/` - API utilities
- `src/store/` - Redux store and RTK Query API slices
- `src/types/` - TypeScript types
- `__tests__/` - UI and E2E tests

## End-to-End Testing
- Tests are located in `src/__tests__/`
- Run with `npm test`

## Contributing
Pull requests are welcome! Please open an issue first to discuss changes.

## License
MIT
