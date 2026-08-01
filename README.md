# AV Academy — Frontend

Next.js 14 (App Router) + TypeScript + Tailwind CSS. Talks to the `av-academy-backend` Express API.

## Setup

```bash
npm install
cp .env.local.example .env.local
# set NEXT_PUBLIC_API_URL to your backend URL
npm run dev
```

Runs on `http://localhost:3000`.

## Folder structure

```
app/
├── layout.tsx, page.tsx, globals.css
├── (auth)/login, (auth)/register       # public auth pages
├── courses/[id]                         # public course detail + playlist
├── dashboard/                            # student: my enrolled courses
└── admin/
    ├── page.tsx                          # pending enrollment requests
    ├── students/                          # NIC search + grant/revoke access
    └── courses/[id]/lessons/              # manage lesson playlist per course
components/
├── ui/         # shared buttons, inputs, cards
├── course/     # CourseCard, LessonPlaylist, VideoPlayer
└── admin/      # StudentSearchResult, EnrollmentTable
lib/api.ts       # Axios instance, auto-attaches JWT from cookie
context/AuthContext.tsx
types/index.ts   # mirrors backend models (User, Course, Lesson, Enrollment)
```

## Pages status

Every page currently has a `TODO` comment describing what it should fetch/render — wired to the exact backend routes documented in `av-academy-backend/README.md`. Build order suggestion:

1. `AuthContext` — login/register/me
2. Home page — course catalogue (`GET /api/courses`)
3. Course detail — playlist + locked/unlocked lessons
4. Student dashboard — my enrollments
5. Admin: NIC search → grant access
6. Admin: course + lesson management (add YouTube link + OS downloads)
# AV_Academy_FE
