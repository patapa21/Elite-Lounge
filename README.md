# Elite Lounge — Booking System

Online booking and admin management system for Elite Lounge.

---

## Project Structure

```
Elite-Lounge/
├── public/
│   └── index.html          # HTML entry point
├── src/
│   ├── index.js             # User booking page entry
│   ├── admin.js             # Admin panel entry
│   ├── elite-lounge.jsx     # User booking app
│   └── elite-lounge-admin.jsx  # Admin panel app
├── .gitignore
├── package.json
└── README.md
```

---

## Pages

| URL | Page |
|-----|------|
| `/` | User booking page |
| `/#/admin` | Admin panel (login required) |

---

## 1. Firebase Setup

### A. Create Firebase Project
1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project** → name it `elite-lounge`
3. Disable Google Analytics (optional) → **Create project**

### B. Enable Firestore
1. In your project → **Build → Firestore Database**
2. Click **Create database** → choose **Start in test mode** (update rules before going live)
3. Select a region close to your users → **Enable**

### C. Enable Authentication
1. **Build → Authentication → Get started**
2. Under **Sign-in method** → enable **Email/Password**
3. Go to **Users** tab → **Add user** → enter your admin email + password

### D. Get Firebase Config
1. **Project Settings** (gear icon) → scroll to **Your apps**
2. Click **</>** (Web) → register app → copy the config object
3. Paste the values into `src/elite-lounge-admin.jsx` inside `FB_CONFIG`:

```js
const FB_CONFIG = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID",
};
```

### E. Firestore Security Rules (before going live)
In Firestore → **Rules**, replace with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /reservation_history/{doc} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 2. Install Dependencies

```bash
npm install
npm install firebase
```

---

## 3. Run Locally

```bash
npm start
```

Opens at `http://localhost:3000`
Admin panel at `http://localhost:3000/#/admin`

---

## 4. Deploy to GitHub Pages

### First time:
```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/elite-lounge.git
git push -u origin main
npm run deploy
```

### On GitHub:
- Go to your repo → **Settings → Pages**
- Set Branch to `gh-pages` → **Save**

### Future updates:
```bash
git add .
git commit -m "update description"
git push
npm run deploy
```

---

## 5. Deploy to Vercel (recommended)

1. Push your code to GitHub (steps above, skip `npm run deploy`)
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repo
4. Framework Preset: **Create React App**
5. Click **Deploy**

Vercel auto-deploys on every `git push`.

---

## 6. EmailJS Setup (for booking confirmation emails)

1. Go to [emailjs.com](https://www.emailjs.com) → create a free account
2. Add an **Email Service** (Gmail recommended)
3. Create an **Email Template** — use these variables:
   - `{{to_email}}`, `{{client_name}}`, `{{client_email}}`, `{{client_phone}}`
   - `{{branch_name}}`, `{{services}}`, `{{provider_name}}`
   - `{{appt_date}}`, `{{appt_time}}`, `{{ref_no}}`
   - `{{down_payment}}`, `{{balance}}`, `{{total_price}}`
   - `{{nail_type}}`, `{{nail_removal}}`, `{{client_type}}`, `{{client_allergies}}`
   - `{{client_note}}`, `{{terms_agreed}}`
4. In Admin panel → **Settings** → enter your EmailJS Service ID, Template ID, and Public Key

---

## Notes

- The `window.storage` API is used for QR code, branch/service/provider images, and active bookings
- Completed and cancelled reservations are archived to **Firestore** (`reservation_history` collection)
- Photos (receipt, reference, current look) are stored as base64 in `window.storage` — consider Firebase Storage for production at scale
- Admin login is powered by **Firebase Authentication**
