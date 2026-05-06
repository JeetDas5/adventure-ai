# Adventure AI

Adventure AI is a full-stack choose-your-own-adventure app with a FastAPI backend and a React + Vite frontend. The backend generates and stores interactive story content, while the frontend lets users create stories, follow story branches, and continue an adventure in the browser.

## Project Structure

- `backend/` - FastAPI app, database models, story generation, and API routes
- `frontend/` - Vite + React app for creating and playing stories

## Local Development

### Backend

Requirements:

- Python 3.11+

Run the backend from the `backend/` folder:

```bash
uv sync
uv run uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

If you prefer plain Python, use:

```bash
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend

Run the frontend from the `frontend/` folder:

```bash
npm install
npm run dev
```

## Environment Variables

### Backend `backend/.env`

Set these values for local development and deployment:

```env
DATABASE_URL=your_database_url
OPENAI_API_KEY=your_openai_api_key
ALLOWED_ORIGINS=http://localhost:5173,https://your-frontend-domain.vercel.app
```

### Frontend `frontend/.env`

Use this if you want to override the API base URL:

```env
VITE_API_BASE_URL=https://adventure-ai-c0pr.onrender.com/api
```

If `VITE_API_BASE_URL` is not set, the frontend uses the Render backend URL in production and `/api` in local development.

## Deployment Notes

### Backend on Render

- Runtime is pinned to Python 3.11 in `backend/runtime.txt`.
- Recommended start command:

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

### Frontend on Vercel

- The frontend is configured to call the Render API at `https://adventure-ai-c0pr.onrender.com/api` by default.
- Make sure the backend allows the Vercel origin in CORS.

## API Overview

- `GET /` - health/welcome response
- `POST /api/stories/create` - create a new story job
- `GET /api/jobs/{job_id}` - check story generation status
- `GET /api/stories/{story_id}/complete` - fetch a complete story

## Notes

- The backend uses FastAPI CORS middleware to allow local and Vercel origins.
- The frontend story flow is centered around the story generator and story loader components.