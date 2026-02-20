# Serve System Plugin for Rock RMS

A comprehensive volunteer scheduling and sign-up system for Rock RMS, developed by DTS for Traders Point Christian Church.

## Overview

The Serve System plugin provides a complete solution for managing volunteer opportunities, scheduling, and sign-ups within Rock RMS. It extends Rock's built-in serving capabilities with features like:

- **Serve Opportunities** - Define serving positions with roles, campuses, and custom attributes
- **Flexible Scheduling** - Create recurring or one-time serving instances with configurable shifts
- **Self-Service Sign-Up** - Public-facing sign-up block for volunteers to select shifts
- **Role-Based Configuration** - Different roles per opportunity with custom attributes per role
- **Multi-Campus Support** - Campus-specific scheduling and filtering
- **Automated Notifications** - Confirmation emails to volunteers and notification emails to coordinators
- **Custom Email Templates** - Hierarchical content templates based on role and campus

## Features

### For Administrators

- **Serve Opportunity Management** - Create and manage serving opportunities with descriptions, categories, and settings
- **Role Configuration** - Define roles with minimum age requirements, DataView filters, and custom sign-up attributes
- **Instance Scheduling** - Generate serving instances from schedules with automatic shift creation
- **Notification Recipients** - Configure who receives notifications filtered by campus and/or role
- **Content Templates** - Create role/campus-specific email content with Lava templating

### For Volunteers

- **Browse Opportunities** - View available serving opportunities filtered by campus
- **Self-Service Sign-Up** - Select shifts and complete sign-up with role-specific attributes
- **Confirmation Emails** - Receive confirmation with shift details and role-specific instructions

### For Coordinators

- **Sign-Up Management** - View and manage sign-ups with filtering and search
- **Notification Emails** - Receive alerts when new volunteers sign up for your area
- **Connection Integration** - Optionally create connection requests for follow-up

## Requirements

- Rock RMS v17.0 or higher
- .NET Framework 4.7.2
- .NET 8.0 SDK (for rock-dev-tool)
- [SparkDevNetwork.Rock.DevTool](https://www.nuget.org/packages/SparkDevNetwork.Rock.DevTool) (for development)

## Installation

### For Production Use

1. Download the latest plugin package from the Releases page
2. In Rock RMS, navigate to **Admin Tools > General Settings > Rock Shop**
3. Click **Install Package** and upload the plugin package
4. Run any pending database migrations

### For Development

See the [Development Setup](#development-setup) section below.

## Development Setup

This project uses [rock-dev-tool](https://github.com/SparkDevNetwork/rock-development-tools) from SparkDevNetwork for development environment management.

### Prerequisites

1. **Install rock-dev-tool**
   ```bash
   # Install globally via dotnet CLI
   dotnet tool install --global SparkDevNetwork.Rock.DevTool
   ```

   After installation, the tool is available as `rock-dev-tool` in your terminal.

2. **Have a Rock RMS instance available**
   - Either a local development instance
   - Or access to the Rock source code

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/Serve-System.git
   cd Serve-System
   ```

2. **Initialize or update the Rock development environment**
   ```bash
   rock-dev-tool env update
   ```

   This will:
   - Configure your Rock RMS source location
   - Set up the `Rock/` symlink to your Rock installation
   - Configure build output paths

3. **Verify environment.json**

   The `environment.json` file should contain:
   ```json
   {
     "organization": {
       "name": "Traders Point Christian Church",
       "code": "org.tpcc"
     },
     "rock": {
       "version": "17.2.4"
     },
     "plugins": []
   }
   ```

4. **Restore NuGet packages**
   ```bash
   cd ServeSystem
   dotnet restore
   ```

5. **Build the project**
   ```bash
   dotnet build
   ```

   The build automatically copies the DLL to `Rock/RockWeb/Bin/`.

### Project Structure

```
Serve-System/
├── Rock/                          # Symlink to Rock RMS (created by rock-dev-tool)
├── ServeSystem/
│   ├── org.tpcc.ServeSystem/      # Main plugin assembly
│   │   ├── Controls/              # Custom Rock controls
│   │   ├── Migrations/            # Entity Framework migrations
│   │   ├── Model/                 # Entity models and services
│   │   │   ├── ServeOpportunity/
│   │   │   ├── ServeOpportunityInstance/
│   │   │   ├── ServeOpportunityInstanceShift/
│   │   │   ├── ServeOpportunityInstanceSignUp/
│   │   │   ├── ServeOpportunityRole/
│   │   │   └── ...
│   │   ├── Reporting/             # Data filters and reports
│   │   ├── SystemGuid/            # System GUID constants
│   │   └── *.cs                   # Helper classes
│   ├── Plugins/
│   │   └── org_tpcc/
│   │       └── ServeSystem/       # Block files (.ascx/.ascx.cs)
│   ├── plugin.json                # Plugin manifest
│   └── plugin-lock.json           # Plugin file inventory
├── docs/                          # Documentation
├── environment.json               # rock-dev-tool configuration
├── CHANGELOG.md                   # Version history
└── README.md                      # This file
```

### Building and Testing

```bash
# Build in Debug mode (copies to RockWeb/Bin automatically)
cd ServeSystem
dotnet build

# Build in Release mode (for packaging)
dotnet build -c Release

# Package the plugin for distribution
rock-dev-tool plugin pack
```

### Database Migrations

Migrations are automatically applied when Rock starts. To create a new migration:

1. Add your migration class in `org.tpcc.ServeSystem/Migrations/`
2. Follow Rock's migration naming convention: `XXX_MigrationName.cs`
3. Implement `Up()` and `Down()` methods

## Blocks

| Block | Location | Description |
|-------|----------|-------------|
| Serve Opportunity List | `~/Plugins/org_tpcc/ServeSystem/ServeOpportunityList.ascx` | Grid of all serve opportunities |
| Serve Opportunity Detail | `~/Plugins/org_tpcc/ServeSystem/ServeOpportunityDetail.ascx` | Create/edit opportunities with roles, recipients, and templates |
| Serve Opportunity Instance List | `~/Plugins/org_tpcc/ServeSystem/ServeOpportunityInstanceList.ascx` | Grid of instances for an opportunity |
| Serve Opportunity Instance Detail | `~/Plugins/org_tpcc/ServeSystem/ServeOpportunityInstanceDetail.ascx` | Create/edit serving instances |
| Serve Opportunity Instance Active List | `~/Plugins/org_tpcc/ServeSystem/ServeOpportunityInstanceActiveList.ascx` | Active instances across opportunities |
| Serve Opportunity Instance Sign-Up List | `~/Plugins/org_tpcc/ServeSystem/ServeOpportunityInstanceSignUpList.ascx` | Grid of sign-ups for an instance |
| Serve Opportunity Instance Sign-Up Detail | `~/Plugins/org_tpcc/ServeSystem/ServeOpportunityInstanceSignUpDetail.ascx` | View/edit individual sign-up |
| Role Schedule Configurator | `~/Plugins/org_tpcc/ServeSystem/RoleScheduleConfigurator.ascx` | Configure role schedules for instances |
| Serve Sign-Up | `~/Plugins/org_tpcc/ServeSystem/SignUp/ServeSignUp.ascx` | Public-facing volunteer sign-up wizard |

## Data Model

```
ServeOpportunity
├── Roles (ServeOpportunityRole)
│   └── Sign-Up Attributes (Rock Attribute)
├── Notification Recipients (ServeOpportunityNotificationRecipient)
├── Content Templates (ServeOpportunityNotificationContentTemplate)
└── Instances (ServeOpportunityInstance)
    └── Shifts (ServeOpportunityInstanceShift)
        └── Sign-Ups (ServeOpportunityInstanceSignUp)
```

## Email System

The plugin includes two email workflows:

### Confirmation Emails
Sent to volunteers when they sign up. Supports:
- `{{ Person }}` - The volunteer
- `{{ ServeOpportunity }}`, `{{ ServeOpportunityInstance }}`, `{{ ServeOpportunityRole }}`, `{{ Campus }}`
- `{{ ShiftDetails }}` - Array of shift date/times
- `{{ ContentTemplate }}` - Role/campus-specific content from templates

### Notification Emails
Sent to coordinators when sign-ups occur. Supports:
- All confirmation fields (except ContentTemplate)
- `{{ NotificationRole }}`, `{{ NotificationCampus }}` - Recipient's filter context
- `{{ People }}` - All volunteers in notification
- `{{ SignUps }}` - All sign-up records

See [docs/TPCC_ServeSystem_Email_Documentation.md](docs/TPCC_ServeSystem_Email_Documentation.md) for complete documentation.

## Contributing

This project follows the [Gitflow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow).

### Branch Structure

- `main` - Production-ready code, tagged with version numbers
- `develop` - Integration branch for features (default branch for PRs)
- `feature/*` - New features branch off from `develop`
- `release/*` - Release preparation branches
- `hotfix/*` - Emergency fixes for production

### Development Workflow

1. Fork the repository
2. Create a feature branch from `develop`
   ```bash
   git checkout develop
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request targeting `develop`

