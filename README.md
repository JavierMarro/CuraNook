# CuraNook - Exhibition Curation Platform :framed_picture:

**Sections:**

1. [Project description](#project-description)
2. [Set up instructions](#set-up-instructions)
3. [Technologies used](#technologies-used)
4. [API Integration](#api-integration)
5. [Documentation](#documentation)
6. [Resources](#resources)
7. [Contributing](#contributing)
8. [Contact](#contact)

## Project description:

CuraNook is an exhibition curation platform that enables users to explore virtual exhibitions from two different collections of antiquities and fine art. This platform serves researchers, students, and art enthusiasts alike who want to create their own collections of artwork.

**Key Features:**

- Browse artworks from the Art Institute of Chicago and Harvard Art Museums
- Sort through extensive art collections
- Paginated browsing with "Previous" and "Next" navigation
- Detailed artwork views with images and essential information
- Loading States: Visual feedback during data fetching
- Error Handling: Clear error messages for failed requests or missing data
- Responsive design that adapts to various screen sizes (tablets WIP!)
- Accessible interface supporting screen readers and keyboard navigation
- Guest users can create multiple personal artwork collections
- Add and remove artworks from their collections
- View and manage their curated exhibitions

## Set up instructions:

To run this platform locally you will need these in the version shown or a later version:

```
node v22.9.0 or higher
pnpm 10.11.0 or higher (recommended)
npm 11.2.0 or higher
```

Please follow these steps in order to run this project locally:

#### - Fork and/or clone the repository

Firstly, fork this repository to your own GitHub account and using the terminal navigate to your chosen directory, then tweak the following command to add your username and clone the repo to the directory:

```bash
git clone https://github.com/your_username/curanook.git
```

Then type the command `code .` to open the project in your source code editor.

#### - Install dependencies

Once the repository has been forked and cloned, run the command below at the root directory to install the required dependencies:

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

#### - Set up environment variables

Create a new `.env` file in the root directory or rename the current `.env.example` file and add your Harvard Museums API key:

```env
VITE_HARVARD_MUSEUMS_API_KEY=your_harvard_api_key_here
```

**Note:** You can request a free Harvard Museums API key from [Harvard Art Museums API - Access to the API](https://harvardartmuseums.org/collections/api).

The Art Institute of Chicago API doesn't require an API key.

#### - Running the development server

Scripts that can be used in the terminal are available in the package.json. Now run the following command to get the website started:

```bash
# Using pnpm
pnpm dev

# Or using npm
npm run dev
```

The development server will (possibly) start on `http://localhost:3000`. You can either hold the Ctrl or Command button and click on the localhost link in the terminal or copy and paste the address into your browser.

## Technologies used:

**Frontend:**

- **React v19.0.0** - Modern React with latest features
- **TypeScript v5.7.2** - Type safe development
- **TailwindCSS v4.0.6** - Utility first CSS framework
- **TanStack Router v1.114.3** - Type safe routing
- **TanStack Query v5.76.1** - Server state management and data fetching
- **Vite v6.1.0** - Fast build tool and development server

**Backend:**

- **Dexie.js v4.0.11** - Database accessible to users via the browser

**UI Components:**

- **Aceternity UI** - Component library which integrates Framer Motion for smooth animations and transitions
- **Lucide React** - Icon library
- **LottieFiles** - Loading/Error animations

**Development Tools:**

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
- Supports sorting by title, artist, and public domain status (amongst other fields)

**Security best practices:**

- API keys are stored securely in environment variables
- Frontend uses environment variables with `VITE_` prefix for safe client-side access
- No sensitive data is exposed in the client bundle
- Sanitation of API sorting queries (encodeURIComponent)

## Documentation:

### Project Architecture

The application follows a modern React architecture with the following structure:

```
src/
├── api/           # API integration and data fetching
├── components/    # API UI components
├── db/            # Database integration
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
├── routes/        # Page components and routing
├── types/         # TypeScript interfaces & types
└── ui/            # Base UI components
```

### Wireframe and user stories

![CuraNook Wireframe](https://i.imgur.com/GQz3NHj.png "CuraNook wireframe and user stories")

### Key Components

- **`ListAIChicago` & `ListHarvard`**: Main collection browsing components
- **`CardAIChicago` & `CardHarvard`**: Individual artwork display cards
- **`Pagination`**: Reusable pagination component

### Data Flow

1. **Route selection**: Users navigate to `/browse` and select a museum
2. **Data fetching**: TanStack Query manages API calls with caching and error handling
3. **State management**: React hooks manage pagination and sorting
4. **UI updates**: Components re-render based on data and user interactions

### API Data Architectural Decision

**Data structure preservation**

When approaching this project I had to decide whether to preserve the original APIs response structures or transform the data at the API layer. I went for preserving the original data structure for several reasons:

- **Metadata access**: Components can access all available fields from each API
- **Performance**: No additional processing overhead during data fetching
- **Flexibility**: Easy to access new fields without modifying API functions
- **Debugging**: Simplified data tracing from API to component
- **Type safety**: TypeScript interfaces ensure compile-time validation
- **UX**: Give users the option to browse from one source or another

**API response handling:**

```typescript
// Art Institute of Chicago - returns native structure
{
  artworks: AIChicagoArtwork[];     // Raw API data
  iiif_url: string;                // Image URL construction base
  pagination: PaginationInfo;      // Native pagination data
}

// Harvard Museums - returns native structure
{
  artworks: HarvardListSummary[];  // Raw API data
  info: HarvardApiInfo;            // Native pagination and metadata
}
```

**Trade offs considered:**

- **Current approach**: Optimal for rich data access and flexible component design
- **Alternative (Adapter Design Pattern)**: In my opinion, necessary to avoid code repetition when scaling beyond 3-4 APIs

My current design supports the current dropdown museum selection while maintaining flexibility for future features like title based search without requiring architectural changes.

## Resources:

**Official Documentation:**

- [React Docs](https://react.dev/reference/react) - React 19 documentation
- [TanStack Docs](https://tanstack.com/router/latest/docs/framework/react/overview) - Router and Query documentation
- [TypeScript Docs](https://www.typescriptlang.org/docs/) - TypeScript language reference
- [Dexie.js Docs](https://dexie.org/docs/Dexie.js.html) - Wrapper library for IndexedDB
- [TailwindCSS Docs](https://tailwindcss.com/docs) - Utility first CSS framework

**UI Components:**

- [Aceternity UI](https://ui.aceternity.com/components) - Components used: Lamp Section Header, Typewriter Effect, Navbar Menu, Expandable Cards, Lens and Tailwind CSS buttons

**Log of learning resources used:**

**API Development:**

- [Harvard Museums API Toolkit](https://api-toolkit.herokuapp.com/) - Learning the Harvard API
- [Art Institute of Chicago API Docs](https://api.artic.edu/docs/) - Complete API documentation

**TanStack:**

- [Video - Initialising project with TS Router + Query + Tailwind](https://www.youtube.com/watch?v=10J6RyMOxN0)
- [Video - Differences between TS Router and React Router](https://www.youtube.com/watch?v=qOwnQJOClrw)
- [Video - TS Query and network requests](https://www.youtube.com/watch?v=w9r55wd2CAk)
- [Video - In-depth TS Router and Query in a project](https://www.youtube.com/watch?v=Qa5AisZTtH8)
- [Video - TS useMutation hook](https://www.youtube.com/watch?v=33YmNXZFZIY)
- [Article - Fetching Data with TS Queries](https://antematter.io/blogs/simplify-api-data-fetching-with-tanstack-queries)

**TypeScript:**

- [Article - A Handbook for Developers](https://www.freecodecamp.org/news/learn-typescript-with-react-handbook/)
- [Article - TypeScript Generics](https://medium.com/@ignatovich.dm/typescript-generics-a-simple-guide-with-practical-examples-ca3492eb821f)

**Dexie.js**

- [Article tutorial - Mastering Dexie.js, complete guide](https://app.studyraid.com/en/courses/11356/mastering-dexiejs-a-complete-guide-to-indexeddb-development)
- [Article - Implementation in ReactJS](https://cleverzone.medium.com/simplify-indexeddb-using-dexie-js-dexie-js-implementation-in-reactjs-48429c66f8ef)

**Additional Resources:**

- [GitHub](https://github.com/) - Version control & Forums to find solutions to issues encountered
- [W3Schools](https://www.w3schools.com/) - For CSS styling related inspiration
- [Stack Overflow](https://stackoverflow.com/questions) - Forums to find solutions to issues encountered

## Roadmap

In the nearest future, main priorities are:

- Implementing a search bar so users can look up artwork by title or artist
- Adding filters to allow browsing artwork by creation period
- Adding authentication so users can log in, which then would enable them sharing collections more easily

<!-- ## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are appreciated.

1. Fork the Project
2. Create your Feature branch (`git checkout -b feature/Mind-blowingFeature`)
3. Commit your changes (`git commit -m 'Write here a descriptive message about your mind-blowing feature'`)
4. Push to the branch (`git push origin feature/Mind-blowingFeature`)
5. Open a Pull Request

## Contact

You can get in touch by opening an issue in this repo [here](https://github.com/JavierMarro/curanook/issues) and I will get back to you as soon as possible. -->
