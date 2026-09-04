# OPTIMAL-TRUCK 🚛

OPTIMAL-TRUCK is a comprehensive logistics and humanitarian transport platform designed to connect **Dealers**, **Truck Drivers**, and **NGOs** in real-time. By optimizing empty truck space, OPTIMAL-TRUCK enhances profitability for drivers while facilitating urgent humanitarian transports across the network.

---

## 🌟 Key Features

### For Dealers
* **Live Truck Tracking:** View real-time GPS locations of all available empty trucks on an interactive map.
* **Direct Booking:** Inspect nearby trucks, view their capacity, and instantly send a direct booking request to their inbox.
* **Network Broadcasting:** Broadcast open loads to the network and allow nearby drivers to view and accept them.

### For Drivers
* **Status Management:** Toggle your availability and share live GPS location so dealers can find you.
* **Order Inbox:** Receive direct load requests and urgent charity missions directly to your dashboard.
* **Active Navigation:** Accept loads and instantly receive dynamic routing, distance, and ETA calculations using the OSRM and OpenStreetMap routing engine.
* **Charity & Social Requests:** Volunteer empty space to transport critical medical or relief supplies for verified NGOs.

### For NGOs & Emergency Services
* **Urgent Broadcasts:** Immediately ping all available trucks in the vicinity with emergency humanitarian transport requests.
* **Cost Efficiency:** Leverage drivers willing to transport supplies at fuel-only costs or pro bono.

---

## 🛠️ Technology Stack

* **Frontend Framework:** [React 19](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Routing:** [React Router v7](https://reactrouter.com/)
* **Maps & Geolocation:** [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/)
* **Routing Engine:** [OSRM API](https://project-osrm.org/) & Nominatim Geocoding
* **Icons:** [Lucide React](https://lucide.dev/)
* **State Management & Database:** Unified cloud persistence layer with optional [Supabase](https://supabase.com/) PostgreSQL integration & real-time sync.

---

## 🗄️ Cloud Database & Vercel Deployment

LongRide includes a **Dual-Mode Cloud Architecture** designed to eliminate "Account not found" errors when deployed to Vercel:

### 1. Instant Zero-Config Mode (Default)
Out of the box on Vercel or localhost, LongRide provides:
* **Pre-seeded demo accounts** with instant one-click login buttons (Driver, Dealer, Emergency NGO, and `mohithdande3@gmail.com`).
* **Cloud Persistence Active** mode with cross-tab and cross-session synchronization.
* Any new account registered is stored and can be signed into immediately.

### 2. Full Supabase PostgreSQL & Real-Time Setup (Recommended for Production)
To connect your own dedicated Supabase PostgreSQL cloud database:
1. Create a free project at [Supabase](https://supabase.com/).
2. Open the **SQL Editor** in your Supabase dashboard and run the schema file provided in this repository:
   * Execute the queries in `supabase_schema.sql` to create `users`, `orders`, and `charity_orders` tables with Row Level Security.
3. In your **Vercel Project Settings** -> **Environment Variables**, add:
   * `VITE_SUPABASE_URL`: Your Supabase Project URL (`https://xyz.supabase.co`)
   * `VITE_SUPABASE_ANON_KEY`: Your Supabase public anonymous API key
4. For local development, copy `.env.example` to `.env` and fill in your Supabase keys.
5. Redeploy on Vercel — the badge on the login page will show `Cloud Database Connected (Supabase)`.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd prototype
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173` in your web browser.

---

## 🧪 Testing the Multi-Role Workflow

OPTIMAL-TRUCK is designed to run synchronously across different roles. To fully experience the live data flow, follow these steps:

1. **Open two browser tabs or separate windows.**
2. **Tab 1 (Driver):** 
   - Register/Login as a **Driver**.
   - Navigate to **Status & Updates** and toggle on **Share Live Location**.
3. **Tab 2 (Dealer/NGO):** 
   - Register/Login as a **Dealer** or **NGO**.
   - Navigate to the **Overview Map** or **Broadcast** page.
4. **Interact:** 
   - Send a load request or charity broadcast from Tab 2.
   - Watch it appear instantly in the Driver's inbox in Tab 1 thanks to cross-tab state synchronization!
   - Accept the load as a Driver to see the live navigation engine dynamically plot your route from your GPS location using the OSRM routing API.

---

## 📄 License

This project is licensed under the MIT License.
