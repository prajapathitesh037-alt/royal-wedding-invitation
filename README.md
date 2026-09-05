# 👑 Royal Rajasthani Wedding Invitation Website
### *Aakarsh weds Pragya*

A digital wedding invitation web experience inspired by the architecture, culture, and aesthetics of Rajasthan (Udaipur palaces, warm ivory, antique gold, deep burgundy, and royal typography).

---

## 🌟 Key Features

1. **Cinematic Hero Opening**: Full-screen illuminated palace at night with glowing full moon, floating golden particles (HTML5 Canvas), calligraphic couple typography, and pulsing scroll indicator.
2. **Royal Invitation & Date Reveal**: Ivory card with Rajasthani corner flourishes, parents' tribute, and an interactive **"Reveal The Auspicious Date"** trigger revealing February 16, 2027.
3. **Wedding Celebrations Itinerary**: Five ceremony cards (*Mehendi, Haldi, Sangeet, Vivah Mandap, and Grand Reception*) with 2K royal imagery, timings, venues, and dress code recommendations.
4. **Cinematic Moments Carousel**: Smooth touch-swipe & desktop-drag carousel with antique gold borders, rotational offsets, and dot pagination.
5. **Instagram #AakarshWedsPragya**: One-click copy-to-clipboard for the wedding hashtag with a notification toast.
6. **Luxury RSVP System**: Custom form with validation, guest counter, dietary preferences, personal blessing messages, and `localStorage` persistence.
7. **Destination & Stylized Map**: Oberoi Udaivilas venue specifications with embedded map preview and direct "Open in Google Maps" action.
8. **Live Countdown Timer**: Real-time ticker to 16 February 2027 (Days, Hours, Minutes, Seconds).
9. **Ambient Royal Melody**: Synthesized Indian Raag sitar & tanpura chime generator via Web Audio API (playable with zero external audio dependencies).

---

## 📁 Project Structure

```
/
├── index.html                  # Semantic, accessible HTML5 single-page royal invitation
├── css/
│   └── style.css               # Vanilla CSS3 luxury design system, animations, responsive layout
├── js/
│   └── script.js               # Interactive controls, animations, countdown, RSVP, carousel, copy hashtag
├── assets/
│   ├── images/                 # 2K palace and ceremony photography
│   ├── icons/                  # Royal SVGs
│   └── audio/                  # Audio assets
└── README.md                   # Project documentation
```

---

## 🔌 Connecting to Firebase / Supabase

The RSVP logic is encapsulated inside the `RSVPService` class in `js/script.js`.

### 1. Connecting Firebase Firestore:
```javascript
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore(app);

class RSVPService {
  static async submitRSVP(rsvpData) {
    try {
      const docRef = await addDoc(collection(db, "rsvps"), {
        ...rsvpData,
        timestamp: new Date()
      });
      return { success: true, id: docRef.id };
    } catch (e) {
      return { success: false, error: e };
    }
  }
}
```

### 2. Connecting Supabase:
```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

class RSVPService {
  static async submitRSVP(rsvpData) {
    const { data, error } = await supabase
      .from('wedding_rsvps')
      .insert([ rsvpData ]);
    return { success: !error, error };
  }
}
```

---

## 🚀 Running Locally

You can serve the directory using any static web server:

```bash
# Using Python
python -m http.server 8000

# Using Node / npx
npx serve .
```

Open `http://localhost:8000` in your web browser.
