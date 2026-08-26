# Travel Unbounded — Full Stack Web Application (Phase 1)

Production-style travel company web application built for **Travel Unbounded** to showcase experiential destination packages, company heritage, global office locations, and capture travel booking enquiries with real-time validation and MongoDB persistence.

---

## Live Links & Submissions

* **Live Deployed Application:** [https://travel-unbounded-delta-lac.vercel.app](https://travel-unbounded-delta-lac.vercel.app)
* **Live API Enquiries Endpoint:** [https://travel-unbounded-delta-lac.vercel.app/api/enquiry](https://travel-unbounded-delta-lac.vercel.app/api/enquiry)
* **Video Recording Demo Link:** [https://drive.google.com/file/d/1arh-SLkqyLd-OGc62cUr3QM74ONdGdqJ/view?usp=drive_link](https://drive.google.com/file/d/1arh-SLkqyLd-OGc62cUr3QM74ONdGdqJ/view?usp=drive_link)
* **GitHub Repository:** [https://github.com/ananyadarna/travelUnbounded](https://github.com/ananyadarna/travelUnbounded)

---

## Core Application Workflow

1. **Homepage & Trips Showcase:** Browse hand-picked domestic packages (Kerala, Himachal, Ladakh, Andaman, Goa) and international safaris (Kenya, Vietnam, Tanzania, Iceland, Sri Lanka).
2. **About Us & Global Footprint:** Explore the company story, core service pillars, and office hubs in **Bengaluru (HQ)**, **Kochi**, and **Nairobi**.
3. **Booking Form & Live Validation:** Interactive form featuring real-time input error checking (email regex, valid phone numbers, future travel date validation), disabled loading button, and a green success confirmation UI.
4. **Backend API & MongoDB Data Persistence:** Server-validated `POST /api/enquiry` serverless endpoint persisting records to MongoDB Atlas with `createdAt` timestamps, and `GET /api/enquiry` list endpoint.

---

## Tech Stack

* **Frontend:** Next.js (App Router), React 19, Tailwind CSS
* **Icons & UI:** Lucide React (`lucide-react`)
* **Backend API:** Next.js Serverless API Routes (`POST /api/enquiry`, `GET /api/enquiry`)
* **Database:** MongoDB Atlas (Mongoose ODM with cached connection helper)
* **Language:** JavaScript / ES2024

---

## Getting Started & Local Setup

### 1. Prerequisites
* Node.js v18 or higher
* npm or yarn package manager
* MongoDB Atlas connection string (or local MongoDB URI)

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/ananyadarna/travelUnbounded.git
cd travelUnbounded
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
```
*(Refer to `.env.example` for the environment template).*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Core Features & Pages

### 1. Home Page (`/`)
* **Hero Banner:** Full-width responsive banner featuring company positioning (*"India's Most Trusted Experiential Travel Experts"*) and a quick Call-to-Action.
* **India Destinations Section:** 5 curated Indian destinations (Kerala, Himachal Pradesh, Ladakh, Andaman, Goa) displayed as responsive cards with starting price badges.
* **International Destinations Section:** 5 global destinations (Kenya, Vietnam, Tanzania, Iceland, Sri Lanka) with highlight badges.
* **Responsive Grid:** Reflows from 5 columns (desktop) to 2-3 columns (tablet) down to 1 column (mobile).

### 2. About Page (`/about`)
* **Company Heritage:** Official company story detailing experiential travel philosophy.
* **Why Choose Us:** 4 value pillars (Personally Vetted Stays, Native Local Guides, Tailor-Made Itineraries, 24x7 Concierge).
* **Global Offices:** Detailed address cards for **Bengaluru HQ**, **Kochi Office**, and **Nairobi Office**.

### 3. Contact & Booking Enquiry Page (`/contact`)
* **Interactive Booking Form:**
  * `Full Name` (required)
  * `Country Code` dropdown (`+91`, `+1`, `+44`, `+61`, `+254`, `+971`)
  * `Contact Number` (required, 7-15 digits format)
  * `Email Address` (required, valid email regex format)
  * `Date of Travel` (required, **future date validation**)
  * `Number of People` (required, min 1)
  * `Hotel Category` (`Standard`, `Deluxe`, `Luxury`)
  * `Number of Children` (optional, min 0)
* **Form UX States:**
  * Inline validation error messages under invalid inputs.
  * Disabled submit button with loading spinner (`[Submitting...]`).
  * Styled green confirmation card UI upon success (no browser `alert()`).
  * Styled red error alert on server/network failure.

---

## API Documentation

### `POST /api/enquiry`
Submits and validates a travel booking enquiry, persisting it into MongoDB.

* **Request Body:**
```json
{
  "fullName": "Ananya Darna",
  "countryCode": "+91",
  "contactNumber": "9876543210",
  "email": "ananya@example.com",
  "dateOfTravel": "2026-10-15",
  "numberOfPeople": 2,
  "hotelCategory": "Deluxe",
  "numberOfChildren": 1
}
```

* **Success Response (`201 Created`):**
```json
{
  "success": true,
  "message": "Enquiry submitted successfully",
  "data": {
    "id": "66cc21ab...",
    "fullName": "Ananya Darna",
    "email": "ananya@example.com",
    "createdAt": "2026-08-26T11:25:00.000Z"
  }
}
```

* **Validation Error Response (`400 Bad Request`):**
```json
{
  "success": false,
  "message": "Travel date must be a valid future date"
}
```

### `GET /api/enquiry`
Retrieves list of all submitted travel enquiries.

---

## Phase 2 — Future Scope

1. **AI Travel Chatbot Widget:** Conversational AI using Gemini/OpenAI to generate custom day-by-day itineraries tailored to budget & preferences.
2. **Admin Lead Dashboard:** Authenticated portal for travel managers to filter, view, and update enquiry conversion statuses (*New*, *Contacted*, *Converted*, *Closed*).

---

## License
Licensed under the MIT License.
