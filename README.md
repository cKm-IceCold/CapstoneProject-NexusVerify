# Nexus Verify: Frontend Portal

Nexus Verify is a secure, responsive real estate platform built with React and Tailwind CSS. It connects to a robust Django REST Framework backend to ensure property document authenticity and transparent market valuation.

## 🚀 Key Project Features

### 1. Unified Scrollable Experience
- **Single-Page Landing**: The homepage now features a seamless, scrollable experience that integrates the "Home" hero, "How It Works" info, and live "Listings" sections.
- **Dynamic Navigation**: A fixed, responsive Navbar provides quick access to core sections and user-specific dashboards.

### 2. Real-Time API Integration
- **Django Backend Connection**: Completely integrated with a real Django REST Framework backend at `http://localhost:8000`.
- **Global Auth Context**: Manages user sessions, role-based access, and token-based authentication (stored securely in `localStorage`).

### 3. Property Registration & Document Upload
- **Comprehensive Form**: Real estate companies can register properties with full detail (Title, Location, Zoning, Risk Level).
- **Media Support**: Supports direct uploading of land documents (PDFs) and property images to the backend.
- **Automatic Pending Status**: New submissions are automatically marked as `PENDING` until an auditor reviews them.

### 4. Auditor Price Submission Workflow
- **Auditor Dashboard**: A dedicated interface for verified professionals to see all properties awaiting valuation.
- **Price Audit Value**: Auditors can input the final market value and approve properties with a single click, instantly moving them to the public listings.

### 5. Role-Based Navigation
- **Dynamic UI**: Navigation links and dashboard access change automatically based on whether the user is a `Customer`, `Real Estate Company`, or `Auditor`.

---

## 🛠️ Technology Stack
- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router 7
- **Authentication**: Token-based (Django REST Framework)
- **Backend**: Django & Django REST Framework (DRF)
- **State Management**: React Context API (`AuthContext`)

---

## 📥 Installation & Setup

1. **Clone the repository**:
   ```bash
   cd CapstoneProject-NexusVerify/my-react-app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure the API**:
   - Ensure your Django backend is running at `http://localhost:8000`.
   - Update API URLs in `src/context/AuthContext.jsx` if necessary.

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```

---

## 🔐 Architecture Notes
- **Persistence**: While earlier plans considered Firestore, the project has been fully migrated to a **Django + DRF** architecture for production-grade security and role management.
- **Responsiveness**: The UI is optimized for both desktop and mobile layouts, with a dedicated mobile-responsive menu.
- **Security**: Permission-protected routes and conditional rendering ensure that only authorized users can access the Registration form and Auditor dashboard.
