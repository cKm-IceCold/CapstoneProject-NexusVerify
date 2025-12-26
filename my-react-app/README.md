# Nexus Verify: Frontend

The React frontend for **Nexus Verify**, a secure real estate platform providing document verification and audited pricing.

## 🚀 Features

- **Role-Based Access**: Specialized dashboards for Customers, Real Estate Companies, and Auditors.
- **Secure Authentication**: Integrated with Firebase Authentication (Email/Password & Google Sign-In).
- **Document Registry**: Interface for companies to upload and register property documents.
- **Verification Workflow**: Auditors can review and verify property details and pricing.
- **Public Search**: Customers can search for verified listings.

## 🛠️ Tech Stack

- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **State Management**: React Context API
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
   Create a `.env` file in the root of `my-react-app` and add your Firebase configuration keys:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```

## 🔐 Authentication

Authentication is handled via `src/context/AuthContext.jsx`. It provides:
- `currentUser`: The currently logged-in user object.
- `login(email, password)`: Sign in with email/password.
- `signup(email, password)`: Register a new account.
- `googleSignIn()`: Sign in with Google.
- `logout()`: Sign out.

## 📂 Project Structure

- `src/components`: UI components (Login, Register, Dashboard, etc.)
- `src/context`: Global state management (AuthContext)
- `src/firebase`: Firebase configuration
- `src/assets`: Static assets (images, logos)
