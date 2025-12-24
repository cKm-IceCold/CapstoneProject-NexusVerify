# CapstoneProject-NexusVerify
Capstone Project Outline: The Secure & Audited Real Estate Ledger

This document outlines the scope, features, and 5-week development plan for a frontend capstone project focused on solving trust issues in property transactions. The project will be a secure, responsive portal built with React, focusing on document verification and transparent pricing via external auditors.

1. Project Idea (REVISED)

Title: Nexus Verify: Secure Property Ledger and Audited Pricing

Core Concept: A digital platform designed to mitigate real estate fraud by registering land documents and connecting

property listings to transparent, audited price valuations. The platform acts as a secure intermediary layer, ensuring all documents, pricing, and government zoning status are verified before a property is listed for sale.Target Users:

Customers: Prospective buyers/renters seeking verified property documents, fair market pricing, and assurance the land is not in a government-reserved or illegal zone.

Real Estate Companies: Agents/companies registering documents and submitting properties for audit.

Auditors: External, verified professionals who input the final, official property valuation.

2. Key Project Features (REVISED)

Category

Feature

Description

Core Security & Data

Digital Document Registry

Real estate companies register document hashes (simulated using UUID/SHA-256 generation on submission) to create an immutable ledger in Firestore, verifying document authenticity.



Government Zone Verification

Companies must submit a verifiable Government Zone ID (simulated) to confirm the property is in an allocated, legal area, mitigating demolition risk.



Audited Price Submission Workflow

A multi-step workflow: Company submits a listing -> Auditor reviews and submits the final, verified price -> Listing becomes public.



Verified Listing View

Property listings clearly display a "Verified Document" badge, the "Audited Price" (no seller-set price is shown), and a Government Zone Status Badge.

Core Functionality

Advanced Search & Filtering

Filter listings by location, Auditor's price range, verified status, and property type.



Listing Detail Page

Shows property details, a link to view the document hash, the Auditor’s valuation report summary, and contact info.

User Authentication & Data

Role-Based Authentication

Differentiate users into three roles: Customer (Browsing), Company (Submitting), Auditor (Verifying). (Using Firestore for basic role assignment).



Company Document Management

A dashboard for companies to view the status of their submitted documents and audit requests.

3. API & Data Strategy (ADJUSTED for Django Backend)

API Choice: The React frontend will simulate interaction with a Django/DRF backend for authentication and data retrieval.

Rationale: The React capstone focuses on frontend state and UI complexity. We will use Firebase/Firestore as the persistence layer for convenience, but the data flow will mirror calls to a secure, role-based Django API.

Authentication (Simulated Django Token Auth):

Frontend will assume a successful login returns a Django Auth Token and the user's Role (customer, company, or auditor).

The AuthModal component will simulate the POST /api/v1/auth/login/ request.

Persistence Layer: Firestore (Firebase) is used for frontend data persistence, but all queries and mutations are designed to mimic Django ORM operations via DRF views.

Collection 1: /verified_listings: Stores listing data, including the final audited price, the associated documentHash, and the governmentZoneId.

Collection 2: /document_ledger: Acts as the simulated blockchain/ledger. Stores the documentHash, companyId, timestamp, and status (e.g., 'Registered', 'Revoked'). This demonstrates immutability.

Collection 3: /users: Stores user profiles and their role ('customer', 'company', 'auditor') for role-based access control.

4. Required React Components (REVISED)

The project will use functional components and hooks (useState, useEffect). Role-based components are now crucial.

Component

Role

Access

State/Props

App

Main application, manages global authentication and user role.

All

userId, userRole

Header

Navigation and role-specific dashboard links.

All

userRole

AuthModal

Handles sign-in/registration and initial role assignment. (Simulates Django API call)

All

Input state

SearchForm

Inputs for location, price range (audited value), and filters.

Customer

Search query state

ListingList & ListingCard

Display verified properties with the audited price.

Customer

listings, auditedPrice

CompanyDashboard

Main hub for real estate companies.

Company

List of submitted documents/listings.

DocumentRegisterForm

Allows companies to submit document details, generate a hash, and submit the Government Zone ID.

Company

Document input and hash/zone generation.

AuditorDashboard

Displays listings awaiting price verification.

Auditor

List of properties needing audit.

PriceAuditForm

Auditor interface to input the verified property price and submit.

Auditor

listingId, verifiedPrice input.

ListingDetails

Dedicated property page, including the documentHash link.

All

Fetches full details.

5. 5-Week Project Plan (REVISED)

The plan focuses on building the security and audit workflows before the public-facing search features.

Week

Focus Area

Deliverables

Week 1: Setup & Role-Based Auth

Project setup, Tailwind styling, and core authentication.

React project setup. Implement AuthModal that simulates a successful Django Token login and returns the user's role. Store userRole in Firestore for persistence. Static mockups for all three dashboards (Customer, Company, Auditor). Complete mobile-first responsiveness.

Week 2: Secure Document Ledger & Zoning

Implement the core Company workflow, including document registry and Government Zone ID submission.

Build DocumentRegisterForm. Implement mock hashing logic (UUID). Company submits hash, details, and Government Zone ID to the immutable /document_ledger and /unverified_listings.

Week 3: Auditor Verification Workflow

Implement the price submission and auditing mechanism.

Build the AuditorDashboard to view unverified listings. Build PriceAuditForm. Implement logic to update the /verified_listings collection status and price upon Auditor submission.

Week 4: Customer Search & Viewing

Implement public-facing search and verified listing view.

Build the public SearchForm and ListingList. Ensure search queries only hit properties marked as verified. Display the "Audited Price" and the "Government Zone Verified" badge on the ListingCard.

Week 5: Polish & Submission

Final styling, bug fixing, documentation, and review prep.

Ensure 100% responsiveness, accessibility checks, and robust error handling across all user roles. Final code cleanup, comments, and comprehensive project documentation (README). Test the full cycle: Company -> Auditor -> Customer.

6. Important Planning Considerations

State Management: React Context will manage the global state, particularly the active user's role and userId for conditional rendering and access control.

Security Simulation: The "blockchain" ledger is a simulation using Firestore's write operations to model immutability. The focus is on the frontend implementation of this concept, not true decentralized technology.

Access Control: All data fetching and component rendering must be guarded by the userRole (e.g., only 'auditor' can see the PriceAuditForm).

Error Handling: Critical for this project. Clear, role-specific error messages must be used if a user tries to access data without the correct permission.
