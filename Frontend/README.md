# Transcript Assistant Frontend

This is a Vite + React + TypeScript frontend for the Transcript backend.

Quick start:

1. Install dependencies

```bash
cd Frontend
npm install
```

2. Start dev server (ensure backend is running at http://localhost:8000)

```bash
npm run dev
```

3. Optionally build for production

```bash
npm run build
npm run preview
```

Environment variables:
- VITE_API_BASE (defaults to http://localhost:8000/api/v1/transcript)

Notes:
- This frontend expects the backend endpoints described in Backend/app/api/v1/routers/route_transcript.py
- Do not modify the backend; the frontend communicates via the REST API.
