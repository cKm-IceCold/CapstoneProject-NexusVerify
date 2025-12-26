# Nexus Verify: Frontend

The React frontend for **Nexus Verify**, a secure real estate platform providing document verification and audited pricing.

## 🚀 Features

- **Role-Based Access**: Specialized dashboards for Customers, Real Estate Companies, and Auditors.
- **Secure Authentication**: Integrated with Firebase Authentication (Email/Password & Google Sign-In).
- **Document Registry**: Interface for companies to upload and register property documents.
- **Verification Workflow**: Auditors can review and verify property details and pricing.
- **Public Search**: Integrated with **Estate Intel API** to provide real-time price validation for Land and Residential properties.
  - **Dynamic Search**: Search state is managed globally (`LandingPage`), allowing seamless interaction between the Home Hero search and the Listings results.
  - **Location Intelligence**: Auto-competes and validates locations against the Estate Intel database (e.g., `Lekki Phase 1` -> `lekki-phase-1`).

## 🛠️ Tech Stack

- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **API Integration**: Estate Intel API (via Vite Proxy)
- **State Management**: React Context API & Lifted State
- **Routing**: React Router DOM

## 📥 Installation & Setup

1. **Navigate to the project directory**:
   ```bash
   cd my-react-app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root of `my-react-app` and add your keys:
   ```env
   # Firebase Config
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   
   # Estate Intel API
   VITE_EI_SECRET_KEY=your_estate_intel_secret_key
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   > **Note**: The dev server uses a proxy (`vite.config.js`) to route `/api_estate/*` requests to `https://api.estateintel.com` to bypass CORS issues.

## 🔐 Authentication

Authentication is handled via `src/context/AuthContext.jsx`. It provides:
- `currentUser`: The currently logged-in user object.
- `login(email, password)`: Sign in with email/password.
- `signup(email, password)`: Register a new account.
- `googleSignIn()`: Sign in with Google.
- `logout()`: Sign out.

## 🌐 API Integration (Estate Intel)

The SearchBar (`src/components/searchBar.jsx`) interacts with the Estate Intel API to fetch current market prices.
- **Proxy**: Requests are rewritten from `/api_estate/...` to `https://api.estateintel.com/...`.
- **Endpoints**:
  - `/locations`: Dynamic location dropdown.
  - `/residential-prices` & `/land-prices`: Price verification data.

## 📂 Project Structure

- `src/components`: UI components (LandingPage, Home, Listings, SearchBar, etc.)
- `src/context`: Global state management (AuthContext)
- `src/firebase`: Firebase configuration
- `src/assets`: Static assets (images, logos)
