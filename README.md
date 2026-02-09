# TrackNotes

Does the following sound familiar to you?
- "Hey I thought about the synth layer at 01:12 in the latest version of our song"
- "OK what song are you talking about, because to me that section you're referring to is at 01:05"
- "It's simple, it's the 4th version of our demo for [song], the one where we added the fuzz on the bass"
- "Wait, you're still on the 4th version? We're working on the 6th one now!"

A collaborative music versioning and feedback platform for bands. 
Upload demos, visualize waveforms, leave timestamped comments and
make educated and impactful decisions about the music you make.

## Tech Stack
* **Frontend:** Angular (Standalone) & [wavesurfer.js](https://wavesurfer.xyz/)
* **Backend:** NestJS & [TypeORM](https://typeorm.io/)
* **Database:** PostgreSQL (Hosted on Neon/Supabase)
* **DevOps:** Docker (Target environment) & Nginx

## Project Structure
```text
tracknote-workspace/
├── backend/          # NestJS API (Port 3000)
├── frontend/         # Angular Application (Port 4200)
└── docker-compose.yml # Infrastructure for production