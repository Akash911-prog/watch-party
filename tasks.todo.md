# Watch Party — Build Checklist

Suggested build order, grouped by phase. Room-level permission roles (host-only
controls, etc.) are intentionally deferred until the core flow works end-to-end.

---

## Phase 1 — Data Layer

### 1. Create new DB schema
- [x] `Video` model
  - `id`, `youtubeId` (unique), `title`, `uploadedBy`, `createdAt`, `expiresAt`
- [x] `Room` model
  - `id`, `videoId` (FK → Video), `hostId`, `createdAt`
- [ ] `RoomMember` join table (optional now, needed later for permissions)
  - `id`, `roomId`, `userId`, `joinedAt`
- [x] Add `@@index([expiresAt])` on `Video` for efficient TTL cleanup queries
- [x] Run Prisma migration, verify against Aiven Postgres instance

---

## Phase 2 — YouTube Upload Pipeline

### 2. Set up Google OAuth
- [x] Create project in Google Cloud Console
- [x] Enable YouTube Data API v3
- [x] Configure OAuth consent screen
- [x] Create OAuth client credentials (client ID + secret)
- [x] Run one-time OAuth flow against your app's YouTube channel to obtain a
      refresh token
- [x] Store `YOUTUBE_CLIENT_ID`, `YOUTUBE_CLIENT_SECRET`, `YOUTUBE_REFRESH_TOKEN`
      as server env vars

### 3. Upload policy acknowledgment
- [ ] Add `acknowledgedUploadPolicy: z.literal(true)` to the upload Zod schema
      (enforced server-side, not just a UI checkbox)
- [ ] Write the actual policy text (uploader is responsible for content they
      upload; no copyrighted/illegal content)
- [ ] Add checkbox + policy text to the upload UI

### 4. YouTube upload endpoints (direct-to-YouTube, not relayed through server)
- [ ] `POST /videos/create-upload-session` — server creates a resumable upload
      session via YouTube Data API, returns short-lived upload URL
- [ ] Client uploads file directly to that URL (`PUT`), never touches your server
- [ ] `POST /videos` — client confirms completed upload with resulting
      `youtubeId`, server saves `Video` record with `expiresAt = now + 6h`
- [ ] Handle YouTube processing delay — poll or check `processingDetails.processingStatus`
      before allowing room creation with that video

### 5. Client-side upload UI
- [ ] File picker + title input
- [ ] Upload policy checkbox (blocks submit until checked)
- [ ] Progress indicator during direct-to-YouTube upload
- [ ] "Processing..." state while YouTube finishes processing
- [ ] Error handling (upload failure, quota exceeded, etc.)

---

## Phase 3 — TTL Cleanup

### 6. Add cron job for TTL cleanup
- [ ] Decide: app-level `node-cron` (simpler, can call YouTube delete API too)
      vs. `pg_cron` on Aiven (DB-only, would still need a second job for the
      YouTube-side deletion) — **leaning toward app-level only, to avoid two
      overlapping systems**
- [ ] Job: find `Video` rows where `expiresAt < now()`
- [ ] For each: call YouTube `videos.delete()`, then delete the DB row
- [ ] Run on an interval (e.g. every 10 minutes)
- [ ] Log/handle failures gracefully (e.g. YouTube delete fails but DB row
      still gets cleaned up, or vice versa)

---

## Phase 4 — Real-Time Sync Core

### 7. WebSocket server
- [ ] `server/src/sockets/` — connection handling, message routing per room
- [ ] `server/src/processes/room/` — room state (in-memory `Map`), join/leave,
      broadcast logic
- [ ] Shared event types in `packages/shared/types/room-events.ts`
      (`play` / `pause` / `seek` / `sync`)

### 8. `VideoProvider` abstraction + `YouTubeProvider`
- [ ] `video-provider.interface.ts` — generic `load / play / pause / seekTo /
      getCurrentTime / getDuration / onStateChange`
- [ ] `youtube-provider.ts` — IFrame API implementation
- [ ] `index.ts` — single swap point (`createVideoProvider()`)

### 9. Room creation/joining flow
- [ ] Create room tied to a `videoId` (host)
- [ ] Generate shareable link/room code
- [ ] Join-room UI (enter code / follow link)
- [ ] Handle late joiners — sync to current room state on connect

---

## Phase 5 — Player UI Polish

### 10. Custom player UI
- [ ] Hide native YouTube controls (`controls: 0`, `disablekb: 1`, `fs: 0`)
- [ ] `PlayerControls.tsx` — custom play/pause/seek/volume/fullscreen
- [ ] `PlayerProgressBar.tsx` — custom scrubber synced to `getCurrentTime()`
- [ ] Wire controls to `useRoomSync` (local actions emit WS events, incoming
      WS events drive the provider)
- [ ] Guard against feedback loops (local vs. remote-triggered state changes)

---

## Phase 6 — Resilience

### 11. Retry logic in `api-client`
- [ ] Exponential backoff wrapper around requests (1s → 2s → ... → 30s cap)
- [ ] Hard cap at 2 minutes total, then surface a clear error to the user
- [ ] Only retry connection-level failures / 502-504 — never retry legitimate
      4xx responses
- [ ] Optional `onRetry` callback so the UI can show "waking up the server..."

### 12. Health-check ping on app load
- [ ] Fire-and-forget `GET /health` on initial app mount to pre-warm the
      Render free-tier instance before the user takes any real action

---

## Deferred — Room-Level Permissions (after core flow works)

- [ ] Host-only playback controls (only host can play/pause/seek by default)
- [ ] Promote/demote co-host
- [ ] Kick/ban from room
- [ ] Room visibility/privacy settings