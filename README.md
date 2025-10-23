# ZerveMeData Frontend

A modern React + TypeScript SaaS platform for tracking and optimizing AI search rankings. This application helps businesses monitor their visibility in AI-powered search engines and provides actionable insights for improvement.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [API Integration](#api-integration)
- [Dynamic Dashboard System](#dynamic-dashboard-system)
- [Development](#development)
- [Deployment](#deployment)

## Overview

ZerveMeData is an enterprise-grade analytics platform that provides:
- AI search ranking tracking and optimization
- Dynamic, template-driven dashboards
- Project and report management
- AI model configuration and monitoring
- Data visualization and exploration

## Features

### Core Capabilities

- **Authentication & Authorization**
  - JWT-based authentication with token expiration
  - Protected routes with automatic redirects
  - Persistent login state via LocalStorage

- **Project Management**
  - Hierarchical organization: Organizations → Projects → Reports
  - Full CRUD operations for projects and reports
  - Soft delete functionality
  - Report configuration with customizable fields

- **Dynamic Dashboard System**
  - Template-driven report rendering from JSON configurations
  - Multiple visualization types: metrics, charts, tables, grids
  - Support for bar, line, pie, doughnut, and area charts
  - HTML content rendering in tables
  - Responsive grid layouts

- **AI Model Management**
  - Create and configure AI models
  - Model type categorization
  - Integration with report generation

- **Data Exploration**
  - Dataset browsing and preview
  - Domain options with KPI and attribute columns
  - Interactive data visualization

## Tech Stack

### Core Technologies

- **React** 18.3.0 - UI framework
- **TypeScript** 4.9.5 - Type-safe development
- **React Router** 6.21.1 - Client-side routing
- **Material UI** 5.6.0 - Component library
- **Bootstrap** 5.3.3 - Grid system and utilities
- **Chart.js** 3.9.1 + react-chartjs-2 - Data visualization
- **Axios** 1.8.2 - HTTP client
- **jwt-decode** 4.0.0 - JWT token handling

### Development Tools

- Create React App 5.0.1
- Jest + React Testing Library
- ESLint + React App configuration

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm 8+
- Access to the ZerveMeData backend API

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd zervemedatafe
```

2. Install dependencies:
```bash
npm install
```

3. Configure API credentials:
Create/update `src/configs/credentials.dev.json`:
```json
{
  "app_api_credentials": {
    "host": "https://your-api-host.com"
  }
}
```

4. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm start` - Runs development server
- `npm test` - Launches test runner
- `npm run build` - Builds production bundle
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/
│   ├── context_providers/     # React Context providers
│   │   ├── AuthContext.tsx    # Authentication state
│   │   ├── UserContext.tsx    # User data
│   │   └── ExplorerContext.tsx # Business logic
│   ├── pages/                 # Page components
│   │   ├── HomePage/          # Landing page
│   │   ├── login/             # Login page
│   │   ├── explore/           # Main dashboard
│   │   ├── contactus/         # Contact form
│   │   └── subscribe/         # Subscription page
│   ├── reports/               # Report components
│   │   └── DynamicReportRenderer.tsx
│   └── shared/                # Reusable components
│       ├── header/
│       ├── footer/
│       └── components/
├── types/                     # TypeScript type definitions
│   └── reportTemplates.ts
├── templates/                 # Dashboard JSON templates
│   ├── dashboardTemplate.json
│   └── salesDashboardTemplate.json
├── utils/                     # Utility functions
│   ├── templateLoader.ts
│   └── dashboardDataGenerator.ts
├── theme/                     # MUI theme configuration
├── configs/                   # Configuration files
├── assets/                    # Images and static files
├── App.tsx                    # Root component
└── index.tsx                  # Application entry point
```

## Architecture

### Context Providers

The application uses React Context API for state management:

1. **AuthContext** (`src/components/context_providers/AuthContext.tsx`)
   - Manages authentication state
   - Handles login/logout
   - Token validation and refresh
   - Protected route logic

2. **ExplorerContext** (`src/components/context_providers/ExplorerContext.tsx`)
   - Project, report, and model management
   - Dataset operations
   - Dashboard data fetching
   - API integration layer

3. **UserContext** (`src/components/context_providers/UserContext.tsx`)
   - User profile data
   - User preferences

### Routing Strategy

- **Public Routes**: Homepage, Login, Contact, Subscribe
  - Auto-redirect authenticated users to `/explore`
- **Protected Routes**: Explore, Profile, Models
  - Require valid JWT token
  - Redirect unauthenticated users to `/login`

### Component Hierarchy

```
App (ThemeProvider, ErrorBoundary)
└── LandingPage (Router)
    ├── AppHeader
    ├── Routes
    │   ├── Public Pages
    │   └── Protected Pages
    │       └── ExplorePage
    │           ├── DashboardSidebar
    │           └── Dashboard
    │               └── DynamicReportRenderer
    └── AppFooter
```

## API Integration

### Authentication

```typescript
POST /api/authentication/authorizeUser
Body: { UserNameOrEmail, Password }
Response: { token, userName }
```

### Core Endpoints

- **Projects**: `/api/project/*`
  - `GET /getAllOrgProjects`
  - `POST /create`
  - `POST /update`
  - `POST /{id}/softDeleteProject`

- **Reports**: `/api/report/*`
  - `POST /create`
  - `POST /update`
  - `POST /{id}/softDeleteReport`

- **Datasets**: `/api/datasets/*`
  - `GET /getAllDatasetNames`
  - `GET /getdata?id={id}&rowLimit={limit}`
  - `GET /getDatasetDomainOptions?id={id}`
  - `POST /getvizdata` - Dashboard data

- **Models**: `/api/models/*`
  - `GET /getAllModels`
  - `GET /getAllModelTypes`
  - `POST /create`
  - `POST /update`
  - `POST /{id}/softDeleteModel`

- **Configuration**: `/api/reportdataset/*`, `/api/Job/*`

## Dynamic Dashboard System

### Template Structure

Dashboard templates are JSON files defining the layout and components:

```json
{
  "type": "report",
  "title": "Dashboard Title",
  "description": "Dashboard description",
  "layout": "dashboard",
  "sections": [
    {
      "type": "card",
      "component": "Metric",
      "title": "Total Sales",
      "field": "totalSales",
      "format": "currency",
      "color": "success",
      "width": 6
    },
    {
      "type": "chart",
      "component": "Chart",
      "title": "Sales Overview",
      "chartType": "bar",
      "dataField": "salesData",
      "xField": "month",
      "yField": "sales",
      "width": 12,
      "height": 300
    }
  ]
}
```

### Supported Components

1. **Metrics/Text Cards**
   - Formats: currency, percentage, number, text
   - Color themes: primary, success, warning, error, info
   - Prefix/suffix support

2. **Charts** (via Chart.js)
   - Types: bar, line, pie, doughnut, area
   - Configurable axes and styling
   - Responsive sizing

3. **Tables**
   - Sortable columns
   - Custom formatters
   - HTML content support
   - Sticky headers
   - Configurable alignment

4. **Grids**
   - Flexible layouts
   - Responsive breakpoints
   - Nested components

### Creating a Dashboard

1. Define template in JSON (see `src/templates/`)
2. Backend returns template + data via `/api/datasets/getvizdata`
3. `DynamicReportRenderer` renders the dashboard
4. Components automatically bind to data fields

Example data structure:
```typescript
{
  totalSales: 125000,
  salesData: [
    { month: "Jan", sales: 12000 },
    { month: "Feb", sales: 15000 }
  ]
}
```

## Development

### Code Style

- TypeScript strict mode enabled
- ESLint with React App configuration
- Functional components with hooks
- Context API for state management

### Key Files

- `src/types/reportTemplates.ts` - TypeScript interfaces for dashboard system
- `src/components/reports/DynamicReportRenderer.tsx` - Core rendering engine
- `src/components/context_providers/ExplorerContext.tsx` - Business logic layer

### Adding a New Dashboard Component

1. Define component type in `src/types/reportTemplates.ts`
2. Create renderer in `DynamicReportRenderer.tsx`
3. Add switch case in `renderSection()`
4. Update JSON schema for templates

### Testing

```bash
npm test                    # Run tests in watch mode
npm test -- --coverage      # Generate coverage report
```

## Deployment

### Docker

Build the Docker image:
```bash
docker build -t zervemedatafe .
```

Run the container:
```bash
docker-compose up
```

The app includes SSL certificate configuration for HTTPS.

### Production Build

```bash
npm run build
```

Output: `build/` directory with optimized static files

### Environment Configuration

Update `src/configs/credentials.dev.json` for different environments or use environment variables.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Create feature branch from `main`
2. Follow existing code patterns
3. Add tests for new features
4. Submit pull request with clear description

## License

Proprietary - ZerveMeData

## Support

For issues or questions, contact the development team or visit `/contactus` in the application.