# Pawdiac

Pawdiac is Sunny's side-quest app: a native iOS cosmic intelligence system for understanding dogs, plus a waitlist landing page for launch demand capture.

## Projects

- `landing/` — Node/Express landing page with email capture
- `ios/Pawdiac/` — SwiftUI native iOS app scaffold
- `PRD.md` — living product requirements
- `BRAND.md` — brand system
- `COSMIC_PROFILE_MODEL.md` — canine cosmic input model

## Landing Page

```bash
cd /Users/sunnydulay/.openclaw/workspace/pawdiac/landing
npm install
npm start
```

Local URL: `http://localhost:5082`

Waitlist data is stored at `landing/data/waitlist.json`.

## iOS App

Open `ios/Pawdiac/Pawdiac.xcodeproj` in Xcode.

If building from CLI, use:

```bash
DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer xcodebuild -project ios/Pawdiac/Pawdiac.xcodeproj -scheme Pawdiac -destination 'generic/platform=iOS' build
```
