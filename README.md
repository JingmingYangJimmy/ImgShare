# Social AI / ImgShare

Brief: A full-stack AI powered social media prototype that lets users generate images from prompts (OpenAI DALL·E 3), upload images & videos, and search shared media by user or keyword.

## What It Does

1. User registration & login (JWT auth)
2. AI image generation from natural language prompts (frontend)
3. Upload images/videos with descriptions; store in Google Cloud Storage
4. Full‑text & filtered search via Elasticsearch (by user or message keywords)
5. Responsive gallery (images & videos) with lightbox, deletion UI stub

## Tech Stack

Frontend: React 18, React Router, Material UI, Ant Design, Styled Components, Axios, OpenAI JS SDK, react-photo-album, yet-another-react-lightbox.
Backend: Go (Gorilla Mux), JWT (HS256), Elasticsearch client (olivere v7), Google Cloud Storage client, UUID, multipart handling.
Infra: Google App Engine Flexible (Go runtime), Google Cloud Storage bucket, External Elasticsearch cluster, OpenAI API.

## Core Architecture (High Level)

React SPA → Axios → Go REST API → (Elasticsearch for search + GCS for media). AI generation happens client-side via OpenAI, then the resulting asset can be re-uploaded to backend.

## Key Endpoints

POST /signup | POST /signin | POST /upload (media_file + message) | GET /search?user= | GET /search?keywords= | (Planned) DELETE /post/{id}

## Highlights / Decisions

- Stateless auth via JWT stored in localStorage
- Media stored publicly (ACL set to AllUsers:Reader) for quick demo
- Match query with AND semantics for keyword search; empty keywords returns all posts
- File type inferred from extension for simple classification (image/video)

## Deployment

Backend: Google App Engine Flex (`app.yaml`).
Frontend: Any static hosting (e.g. Vercel/Netlify/Firebase) pointing to deployed backend base URL.

## Future Improvements

- Implement secure DELETE endpoint with ownership checks
- Hash & salt passwords (currently plaintext) using bcrypt/argon2
- Move hard-coded secrets (ES creds, JWT key) to environment variables / Secret Manager
- Add pagination & infinite scroll
- Add Go unit tests & React integration tests
- Fine-grained media access (signed URLs) & moderation

## Elevator Pitch

"Social AI combines generative AI with a minimal social sharing layer: prompt, create, upload, and instantly search your AI-crafted media."

---

For more details or collaboration interests, feel free to open issues or PRs.
