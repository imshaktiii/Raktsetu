# RaktaSetu

RaktaSetu is a centralized Digital Gateway designed for the Ministry of Health to connect voluntary blood donors with hospitals, blood banks, and clinical centers in real-time. By providing a secure, high-performance platform for donor registration, real-time inventory monitoring, blood camps coordination, and digital certification, the system streamlines critical healthcare workflows to reduce blood deficit and optimize donation operations.

## Project Description

In many regions, blood acquisition and transfusion networks remain fragmented. Clinical units frequently experience localized shortages of specific blood types while nearby banks have surplus stock, primarily due to lack of a centralized registry.

RaktaSetu resolves this issue by providing:
* A centralized national directory connecting voluntary donors, clinical coordinators, and blood banks.
* A live, searchable state-level blood stock inventory tracker.
* Decentralized coordination tools for managing blood camps, scheduling donation slots, and issuing official digitized certificates.
* Highly secure authentication controls protecting patient privacy and medical record confidentiality.

## Features

### Authentication and Access Control
* Secured JWT session authentication with encrypted credential transport.
* Authorization levels separating donor, hospital, and blood bank workspaces.
* Protected route guards preventing unauthenticated access to personal panels.

### Donor Registry
* Dynamic searchable directory allowing coordinators to search donors by state, district, city, and blood type.
* Multi-step donor profile wizard collecting health history and last donation dates.
* Automated duplicate registration checks.

### Live Stock Inventory Tracker
* State, district, and city-level blood stock directories.
* Real-time stock status color keys indicating availability.
* Automatic seeding and update tracking per location.

### Request Management
* Direct request boards for urgent blood requirements.
* Verification badges and contact panels.

### Blood Camps Coordination
* Listing of scheduled camps filtered by city.
* Donation slot scheduling and attendance logs.

### Digital Certification
* Verification-ready digital blood donation certificates containing custom QR code placeholders.
* Interactive download and printing styles optimized for paper.
* Circular digital donor identity cards showing critical metrics.

### Profile Customization
* Secure profile picture uploads supported by custom file destination middleware.
* Instant avatar rendering.

## Technology Stack

| Component | Technology | Purpose |
|---|---|---|
| Frontend | React.js | Single Page Application framework |
| Build Tool | Vite | Fast frontend build utility |
| Styling | Tailwind CSS | Responsive utility-first style framework |
| Backend | Node.js, Express.js | REST API server |
| Database | MongoDB Atlas | Cloud-hosted NoSQL document database |
| Authentication | JSON Web Tokens (JWT) | Secure stateless session management |
| File Uploads | Multer | Multipart form data parser middleware |
| API Client | Axios | HTTP client for backend communication |
| Deployment | Render | Managed hosting environment |

## System Architecture

```
User -> Browser Client (React/Vite) -> Express REST API -> MongoDB Atlas (Database)
```

1. **User Interaction**: Users access the portal through a responsive web interface built using React and Tailwind CSS.
2. **API Gateways**: The frontend issues Axios HTTP requests to the Node/Express backend over secure SSL channels.
3. **Authentication Wall**: Request headers containing JWT signatures are processed by Express middleware to verify donor identity.
4. **Data Layer**: The backend retrieves, validates, and stores records inside a MongoDB Atlas database cluster using Mongoose schemas.

## Folder Structure

```
Raktsetu/
├── dist/                   # Frontend production bundle
├── public/                 # Static assets
├── vercel.json            # Vercel routing configurations
├── package.json           # Frontend dependencies and scripts
├── vite.config.js         # Vite configuration settings
├── src/                    # Frontend source folder
│   ├── api/                # Axios API call modules
│   ├── components/         # Reusable UI widgets
│   ├── context/            # Authentication context providers
│   ├── data/               # Regional static drop-down data files
│   ├── pages/              # Routed view files
│   ├── utils/              # Image resolution and helper modules
│   ├── App.jsx             # React router configuration
│   └── main.jsx            # Application mount point
└── server/                 # Backend source folder
    ├── config/             # DB connection settings
    ├── controllers/        # Express route controller handlers
    ├── middleware/         # Auth verification and file upload middleware
    ├── models/             # Mongoose database schema models
    ├── routes/             # REST routing maps
    ├── uploads/            # Local temporary profile image storage
    ├── .env                # Backend environment configuration file
    ├── server.js           # Server initialization file
    └── package.json        # Backend dependencies and scripts
```

## Environment Variables

Configure these keys inside a `.env` file in the `server` directory before launching the backend service:

* `MONGODB_URI`: Connection string pointing to your MongoDB database instance.
* `JWT_SECRET`: Signature key used to encrypt and verify JSON Web Tokens.
* `PORT`: Node server hosting port.
* `FRONTEND_URL`: URL of the deployed client interface to populate CORS origin headers.

Configure these keys for the frontend build:

* `VITE_API_BASE_URL`: URL of the hosted backend application API.

## Installation Guide

### Prerequisites
* Node.js (version 18 or above)
* npm (version 9 or above)
* MongoDB database instance

### 1. Clone the Repository
```bash
git clone https://github.com/placeholder/Raktsetu.git
cd Raktsetu
```

### 2. Configure Backend Service
```bash
cd server
npm install
```
Create a `.env` file inside the `server/` directory and populate the required configuration settings:
```env
MONGODB_URI=mongodb+srv://user:pass@host/db
JWT_SECRET=supersecretkey
PORT=5000
FRONTEND_URL=http://localhost:5173
```
Start the backend development server:
```bash
npm run dev
```

### 3. Configure Frontend Client
Return to the project root directory, install the client dependencies, and create an environment configuration file:
```bash
cd ..
npm install
```
Start the frontend development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
* `POST /api/auth/register`: Create a new user/donor account.
* `POST /api/auth/login`: Authenticate credentials and return a session token.

### Donors
* `GET /api/donors/search`: Query registered donors with state/city filters.
* `GET /api/donors/profile`: Retrieve personal medical history and profile metadata.
* `PUT /api/donors/profile`: Modify current location and contact details.
* `POST /api/donors/upload-photo`: Upload and store a new profile picture.

### Blood Requests
* `GET /api/requests`: Fetch active emergency blood requests.
* `POST /api/requests`: Publish a new critical patient blood requirement.

### Blood Camps
* `GET /api/camps`: Retrieve scheduled donation camps.
* `POST /api/camps`: Register attendance slots for a camp.

### Blood Stock
* `GET /api/blood-stock`: Get live blood stock levels across all regions.

### Certificates
* `GET /api/certificate/:donorId`: Retrieve authorized donation logs and certificate details.

## Security Features

* **Password Encryption**: Accounts are protected by one-way password hashing before saving to the database.
* **Stateless Token Verification**: Secure API routes require a valid Authorization header signature to retrieve profile details.
* **CORS Validation**: Middleware filters incoming requests to restrict access to trusted client hosts.
* **Input Restrictions**: Form submissions validate input parameters before saving to the database.

## Future Scope

* **Hospital System Integration**: Direct integrations with hospital databases to automate request postings.
* **Automatic Notification Pipelines**: Real-time alerts via SMS and email notifying local donors about urgent requirements.
* **Mapping Frameworks**: Interactive map overlays showing blood camps and banks.
* **Demand Prediction Engine**: Utilizing history databases to predict seasonal blood shortages.
* **Dedicated Mobile Client**: Building lightweight iOS and Android interfaces.
* **QR Verification Panels**: Direct verification portals checking certificate QR codes for authenticity.

## Learning Outcomes

* Configured multi-role routing checks for dashboard routing panels.
* Built secure multi-origin CORS configurations handling preflight OPTIONS handshakes on hosted servers.
* Structured absolute static directory maps inside Express files ensuring clean file hosting under any directory.
* Designed and managed reactive state filters to process regional database queries dynamically.

## Contributors

* Contributor Name - GitHub Username

## License

This project is licensed under the MIT License.

## Contact

* **GitHub**: https://github.com/your-username
* **LinkedIn**: https://linkedin.com/in/your-username
* **Email**: contact@your-domain.com
