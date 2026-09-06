# Travel Unbounded — Full Stack Web Application (Phase 1 & Phase 2)

Production-style travel company web application built for **Travel Unbounded** to showcase experiential destination packages, company heritage, global office locations, and capture travel booking enquiries with real-time validation, dynamic CMS catalog management, AI itinerary planning, and MongoDB persistence.

---

## Live Links & Submissions

* **Live Deployed Application:** [https://travel-unbounded-delta-lac.vercel.app](https://travel-unbounded-delta-lac.vercel.app)
* **Admin Operations Portal:** [https://travel-unbounded-delta-lac.vercel.app/admin/login](https://travel-unbounded-delta-lac.vercel.app/admin/login)
* **Live API Enquiries Endpoint:** [https://travel-unbounded-delta-lac.vercel.app/api/enquiry](https://travel-unbounded-delta-lac.vercel.app/api/enquiry)
* **GitHub Repository:** [https://github.com/ananyadarna/travelUnbounded](https://github.com/ananyadarna/travelUnbounded)

---

## Core Application Features

### Phase 1 — Core Platform
1. **Homepage & Destinations Showcase:** Browse curated domestic packages (Kerala, Himachal, Ladakh, Andaman, Goa) and international safaris (Kenya, Vietnam, Tanzania, Iceland, Sri Lanka).
2. **About Us & Global Footprint:** Company story, core service pillars, and office hubs in **Bengaluru (HQ)**, **Kochi**, and **Nairobi**.
3. **Booking Form & Live Validation:** Interactive form featuring real-time input error checking (email regex, phone validation, future travel date validation), disabled loading button, and green UI success confirmation.
4. **Backend API & MongoDB Persistence:** Server-validated `POST /api/enquiry` endpoint persisting records to MongoDB Atlas with `createdAt` timestamps, and `GET /api/enquiry` list endpoint.

### Phase 2 — Operations Suite & CMS
1. **Admin Operations Portal (`/admin`):** Authenticated executive portal protected by `/api/admin/login` and `/api/admin/check-auth` session management.
2. **Lead & Operations Management:**
   * Live metric cards (*Total Submissions*, *New Action Required*, *Converted Leads*, *Conversion Rate*).
   * Search by customer name, email, or phone number.
   * Filter leads by status (*New*, *Contacted*, *Converted*, *Closed*).
   * Dynamic inline lead status updates.
   * View attached customer AI itineraries in an interactive modal inspector.
   * **One-Click CSV Export** to download lead database tables for team operations.
3. **Live Destination Catalog CMS:** Add, edit pricing/duration/details, or delete travel packages live on site without code changes, persisting directly to MongoDB.
4. **Performance & Funnel Analytics:** Financial pipeline revenue estimation, conversion rate tracking, and status funnel progress bars.
5. **Interactive AI Trip Planner Widget:** Floating chatbot widget allowing travelers to select destination regions (*Incredible India* or *World Expeditions*), travel styles, and trip duration to generate day-by-day itineraries attached directly to booking enquiries.

---

## Tech Stack

* **Frontend:** Next.js 14 (App Router), React 19, Tailwind CSS
* **Icons & UI:** Lucide React (`lucide-react`)
* **Backend API:** Next.js Serverless API Routes (`/api/enquiry`, `/api/admin/login`, `/api/admin/check-auth`, `/api/admin/destinations`)
* **Database:** MongoDB Atlas (Mongoose ODM with cached connection helper)
* **Deployment:** Vercel (Dynamic SSR rendering)
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
ADMIN_EMAIL=admin@travelunbounded.com
ADMIN_PASSWORD=Password123!
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

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

### `GET /api/admin/destinations`
Fetches all live website destination packages from MongoDB.

### `POST /api/admin/destinations`
Adds a new destination package live to the website catalog.

### `PUT /api/admin/destinations`
Updates existing destination package pricing, duration, or details.

### `DELETE /api/admin/destinations?id={id}`
Deletes a destination package from the website catalog.

---

## License
Licensed under the MIT License.
