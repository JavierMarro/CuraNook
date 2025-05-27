# CuraNook - Exhibition Curation Platform :framed_picture:

**Sections:**

1. [Project description](#project-description)
2. [Set up instructions](#set-up-instructions)
3. [Features](#features)
4. [Technologies used](#technologies-used)
5. [API Integration](#api-integration)
6. [Documentation](#documentation)
7. [Resources](#resources)

## Project description:

CuraNook is an exhibition curation platform that enables users to explore virtual exhibitions from two different collections of antiquities and fine art. This platform serves researchers, students, and art enthusiasts who want to create their own collections of artwork.

**Key Features:**

- Browse artworks from the Art Institute of Chicago and Harvard Art Museums
- Sort through extensive art collections
- Paginated browsing with "Previous" and "Next" navigation
- Detailed artwork views with images and essential information
- Loading States: Visual feedback during data fetching
- Error Handling: Clear error messages for failed requests or missing data
- Responsive design that adapts to various screen sizes
- Accessible interface supporting screen readers and keyboard navigation

The platform integrates with two major museum APIs to provide users with access to thousands of artworks, enabling them to discover and explore art from different institutions in one unified interface.

<!--
Adding the following once integrated in project:
- Create multiple personal artwork collections
- Add and remove artworks from their collections
- View and manage their curated exhibitions
-->

## Set up instructions:

To run this platform locally you will need these in the version shown or a later version:

```
node v18.0.0 or higher
npm 8.0.0 or higher
pnpm (recommended)
```

Please follow these steps in order to run this project locally:

#### - Fork and/or clone the repository

You can fork this repository to your own GitHub account, then choose a directory where to clone it using the following command:

```bash
git clone https://github.com/JavierMarro/curanook.git
```

Alternatively you can skip the fork step and directly clone it.

#### - Install dependencies

Once the repository has been cloned, run the command below at the root directory to install the required dependencies:

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

#### - Set up environment variables

Create a `.env` file in the root directory and add your API keys:

```bash
# Copy the example environment file
cp .env.example .env
```

Add your Harvard Museums API key to the `.env` file:

```env
VITE_HARVARD_MUSEUMS_API_KEY=your_harvard_api_key_here
```

**Note:** You can obtain a free Harvard Museums API key from [Harvard Art Museums API](https://harvardartmuseums.org/collections/api). The Art Institute of Chicago API doesn't require an API key.

#### - Running the development server

Scripts that can be used in the terminal are available in the package.json. However, run the following command to get the website started:

```bash
# Using pnpm
pnpm dev

# Or using npm
npm run dev
```

The development server will start on `http://localhost:3000`. You can either hold the Ctrl or Command button and click on the localhost link in the terminal or copy and paste the address into your browser.

## Technologies used:

**Frontend:**

- **React 19** - Modern React with latest features
- **TypeScript** - Type safe development
- **TailwindCSS 4.0** - Utility first CSS framework
- **TanStack Router** - Type safe routing
- **TanStack Query** - Server state management and data fetching
- **Vite** - Fast build tool and development server

**UI Components:**

- **Aceternity UI** - Beautiful component library for landing page elements which also integrates Framer Motion for smooth animations and transitions
- **Lucide React** - Icon library
- **Lottie** - Loading/Error animations

**Development Tools:**

- **Vitest** - Unit testing framework
- **pnpm** - Fast, disk space efficient package manager

## API Integration:

This platform integrates with two major museum APIs to provide comprehensive access to art collections:

**1. Harvard Art Museums API**

- URL: https://harvardartmuseums.org/collections/api
- Requires free API key registration
- Provides access to Harvard's extensive art collection
- Supports sorting by rank, accession year, and last updated item
- Returns detailed artwork information including artist, date, medium, and dimensions

**2. Art Institute of Chicago API**

- URL: https://api.artic.edu/docs/
- No API key required
- Features one of the world's oldest and largest art collections
- Supports sorting by title, artist, and public domain status
- Includes IIIF image service for high-quality artwork images

**Security Best Practices:**

- API keys are stored securely in environment variables
- Frontend uses environment variables with `VITE_` prefix for safe client-side access
- No sensitive data is exposed in the client bundle

## Documentation:

### Project Architecture

The application follows a modern React architecture with the following structure:

```
src/
├── api/           # API integration and data fetching
├── components/    # Reusable UI components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
├── routes/        # Page components and routing
├── types/         # TypeScript interfaces & types
└── ui/            # Base UI components
```

### Initial wireframe and user stories

![CuraNook Wireframe](https://i.imgur.com/5ZdGJWA.png "CuraNook wireframe and user stories")

### Key Components

- **`ListAIChicago` & `ListHarvard`**: Main collection browsing components
- **`CardAIChicago` & `CardHarvard`**: Individual artwork display cards
- **`Pagination`**: Reusable pagination component
- **`Loading` & `Error`**: Shared UI state components

### Data Flow

1. **Route Selection**: Users navigate to `/browse` and select a museum
2. **Data Fetching**: TanStack Query manages API calls with caching and error handling
3. **State Management**: React hooks manage pagination and sorting
4. **UI Updates**: Components re-render based on data and user interactions

## Resources:

**Official Documentation:**

- [React Docs](https://react.dev/reference/react) - React 19 documentation
- [TanStack Docs](https://tanstack.com/router/latest/docs/framework/react/overview) - Router and Query documentation
- [TailwindCSS Docs](https://tailwindcss.com/docs) - Utility first CSS framework
- [TypeScript Docs](https://www.typescriptlang.org/docs/) - TypeScript language reference

**UI Components:**

- [Aceternity UI](https://ui.aceternity.com/components) - Components used: Lamp Section Header, Typewriter Effect, Navbar Menu, Expandable Cards and Tailwind CSS buttons

**Learning Resources:**

**TanStack:**

- [Video - Initialising project with TS Router + Query + Tailwind](https://www.youtube.com/watch?v=10J6RyMOxN0)
- [Video - Differences between TS Router and React Router](https://www.youtube.com/watch?v=qOwnQJOClrw)
- [Video - Front-End Project using TanStack features](https://www.youtube.com/watch?v=Qa5AisZTtH8)
- [Video - Fetching and displaying data with TanStack loaders](https://www.youtube.com/watch?v=FYloHKTrRnI)
- [Video - TS Query and network requests](https://www.youtube.com/watch?v=w9r55wd2CAk)

**TypeScript:**

- [Article - Working with TypeScript interfaces](https://www.freecodecamp.org/news/how-typescript-interfaces-work/)
- [Article - TypeScript Generics](https://medium.com/@ignatovich.dm/typescript-generics-a-simple-guide-with-practical-examples-ca3492eb821f)

**API Development:**

- [Harvard Museums API Toolkit](https://api-toolkit.herokuapp.com/) - Learning the Harvard API
- [Art Institute of Chicago API Docs](https://api.artic.edu/docs/) - Complete API documentation

**Additional Resources:**

- [GitHub](https://github.com/) - Version control
- [Medium - Software Engineering](https://medium.com/?tag=software-engineering) - Technical articles
- [FreeCodeCamp](https://www.freecodecamp.org/news/) - Web development tutorials
