# CamionTrack

CamionTrack is a comprehensive Fleet Management Application designed to streamline the operations of trucking and logistics companies. It provides tools for managing vehicles, drivers, trips, and maintenance, ensuring efficiency and compliance.

## Features

*   **Dashboard:** Overview of fleet status and key metrics.
*   **Vehicle Management:** CRUD operations for trucks and trailers.
*   **Driver Management:** Manage driver profiles and assignments.
*   **Trip Management:** Plan, track, and update trip statuses.
*   **Authentication:** Secure user authentication and role-based access control (Admin/Driver).
*   **Reporting:** Generate reports (PDF support included).

## Tech Stack

### Client
*   **Framework:** React (with Vite)
*   **Styling:** Tailwind CSS
*   **Routing:** React Router
*   **State/Data:** Context API, Axios
*   **Icons:** Lucide React
*   **Testing:** Vitest, React Testing Library

### API
*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Database:** MongoDB (via Mongoose)
*   **Authentication:** JWT, Bcrypt
*   **Security:** Helmet, CORS
*   **Testing:** Jest, Supertest

### DevOps
*   **Containerization:** Docker, Docker Compose
*   **Web Server:** Nginx (for serving the client in production)

## Prerequisites

*   [Docker](https://www.docker.com/) and Docker Compose
*   [Node.js](https://nodejs.org/) (if running locally without Docker)

## Getting Started

### Option 1: Using Docker (Recommended)

The easiest way to run the application is using Docker Compose.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ayoub-akraou/CamionTrack.git
    cd CamionTrack
    ```

2.  **Start the application:**
    ```bash
    docker-compose up --build
    ```

    This will start:
    *   The API server on port `3000`
    *   The Client application on port `80` (or `5173` depending on dev/prod config)
    *   MongoDB database

3.  **Access the application:**
    Open your browser and navigate to `http://localhost`.

### Option 2: Manual Setup

If you prefer to run the services individually:

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Start the API:**
    ```bash
    npm run serve
    ```

3.  **Start the Client:**
    ```bash
    npm run dev
    ```

## Project Structure

```
CamionTrack/
├── api/                # Backend Node.js/Express application
│   ├── src/            # Source code
│   ├── Dockerfile      # API Docker configuration
│   └── package.json    # API dependencies
├── client/             # Frontend React application
│   ├── src/            # Source code
│   ├── Dockerfile      # Client Docker configuration
│   ├── nginx.conf      # Nginx configuration
│   └── package.json    # Client dependencies
├── docker-compose.yml  # Docker orchestration
└── package.json        # Root scripts
```

## Testing

**Run API Tests:**
```bash
cd api
npm run test
```

**Run Client Tests:**
```bash
cd client
npm run test
```

## License

ISC
