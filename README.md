# Vibely

Vibely is a React single-page social platform for sharing posts, discovering people, and keeping up with activity in your circle. The client provides authenticated sign-up and sign-in, an API-backed home feed, profiles, post details, comments, likes, shares, follow suggestions, and notifications.

**Live demo:** [vibely-navy.vercel.app](https://vibely-navy.vercel.app)

> The frontend talks to a separate API at `https://route-posts.routemisr.com`. A reachable API and a valid account are required for authenticated features.

## What is implemented

- Create an account with name, username, email, date of birth, gender, and password validation.
- Sign in and sign out; the client stores the returned bearer token in browser `localStorage`.
- Load the authenticated feed and create text or image posts.
- Like, share, edit, and delete posts; open a post at `/postdetails/:postid`.
- Add comments with optional images, and edit or delete your own comments.
- Browse and filter follow suggestions, then follow another user.
- View a profile, profile posts, follower/following counts, and change the profile photo or password.
- View notifications for likes, shares, and comments, and mark all notifications as read.

## Tech stack

- **React 19** and **TypeScript**
- **Vite 8** with `@vitejs/plugin-react`
- **Tailwind CSS 4** through `@tailwindcss/vite`
- **HeroUI** and **@gravity-ui/icons** for interface controls and icons
- **React Router 7** for client-side routing
- **TanStack Query** for API queries, mutations, and cache invalidation
- **Axios** for HTTP requests
- **React Hook Form** with **Zod** validation
- **Lucide React**, **React Spinners**, and **Sonner** for UI details and feedback

The repository uses npm with the checked-in `package-lock.json` (lockfile version 3). It does not declare a Node.js `engines` range; use a current Node.js release compatible with the listed Vite and TypeScript versions.

## Getting started

The default branch is `main`.

```bash
git clone https://github.com/zeyadhatem00/Vibely-social-media-platform.git
cd Vibely-social-media-platform
npm ci
npm run dev
```

Vite prints the local development URL in the terminal. The app requires network access to the API described in [Configuration](#configuration); the repository does not include a local backend or seed database.

### Available scripts

These commands are defined in `package.json`:

```bash
npm run dev       # start Vite with hot module replacement
npm run build     # run TypeScript project builds and create a production bundle
npm run lint      # lint the repository with ESLint
npm run preview   # preview the built bundle locally
```

To check a production build locally:

```bash
npm run build
npm run preview
```

## Configuration and backend

The current client has no `.env.example` and does not read `import.meta.env` or `process.env`. The API base URL is currently hard-coded in `src/const/env.ts`:

```text
https://route-posts.routemisr.com
```

Authentication requests use `/users/signup` and `/users/signin`. After sign-in, protected requests send the token as `Authorization: Bearer <token>`. The API is used for profile data, posts, comments, follows, media uploads, password changes, and notifications. If that service is unavailable, sign-in and the authenticated pages cannot operate even when the frontend builds successfully.

## Routes

| Path | Purpose |
| --- | --- |
| `/` | Login screen |
| `/signup` | Account creation |
| `/Home` | Authenticated feed and post composer |
| `/Notifications` | Notifications and “mark all as read” |
| `/Profile` | Current user profile and profile posts |
| `/follow` | Follow suggestions (also available from the mobile navigation) |
| `/postdetails/:postid` | Single-post view with comments |

The route guards redirect unauthenticated visitors to `/` and redirect an already authenticated visitor away from the login/sign-up screens. `vercel.json` rewrites requests to `index.html` so client-side routes can be served by a Vercel deployment.

## Project structure

```text
src/
├── App.tsx                         # Router host and toast provider
├── main.tsx                        # React, auth, user-data, and Query providers
├── Routes/Routes.tsx               # Authenticated and public route definitions
├── pages/                          # Login, sign-up, home, profile, notifications
├── Layouts/                        # Auth and main shells
├── components/                    # Navigation, guards, posts, comments, and forms
├── Services/Auth/                  # Sign-in and sign-up API calls
├── context/                        # Token and current-user data contexts
├── validation/                    # Zod schemas for account and password forms
├── const/env.ts                    # API base URL
└── data/data.ts                    # Remote image URLs used by the auth presentation
```

## Notes for development

- The app is API-backed rather than a standalone local demo; use an account supported by the configured service.
- The profile page includes a remote Unsplash cover fallback for an empty `cover` value, and several UI surfaces use a remote placeholder avatar when no profile photo is present.
- The auth screen uses three remote presentation avatars and a decorative `+12k` label; these are visual content, not verified platform metrics.
- The client-side token is persisted in `localStorage`; clear the `token` entry to reset the local session.
- There is no license file or license declaration in the repository snapshot.
