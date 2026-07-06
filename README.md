# Campuses & Students — Client

Frontend for a CRUD app that manages college campuses and the students enrolled at them. Pairs with the [server repo](https://github.com/Mattstov/Final-Project-Server-CSCI395).

## What it does

- Browse, add, edit, and delete campuses
- Browse, add, edit, and delete students
- Enroll a student at a campus, or un-enroll them (a student can also just have no campus)
- Deleting a campus doesn't delete its students — they become unenrolled
- Search/filter students by name or email
- Dark mode toggle
- Form validation (required fields, email format, GPA between 0.0 and 4.0)
- Loading and error states on every page that fetches data

## Stack

- React 19 + TypeScript, built with Vite
- React Router for routing (NavLink for active nav state, 404 page for unmatched routes)
- TanStack Query for all server data — fetching, caching, and invalidating on mutations
- Zustand for client-only state (dark mode, student search filter)
- Tailwind CSS for styling

## Run Locally

1. Clone this repository and move into the client folder:

```bash
cd campuses-client
```

2. Install dependencies:

```bash
npm install
```

3. Create an environment file from the example:

```bash
cp .env.example .env
```

4. Set the API URL in `.env`:

```bash
VITE_API_BASE_URL=https://final-project-server-csci395.onrender.com
```

5. Start the dev server:

```bash
npm run dev
```

Then open the local URL shown by Vite (usually `http://localhost:5173`).

## Deployed URLs

- Frontend: https://finalproject395.vercel.app
- Backend: https://final-project-server-csci395.onrender.com/
