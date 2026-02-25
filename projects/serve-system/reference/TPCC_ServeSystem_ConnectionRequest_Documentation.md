# Serve System - Connection Request Documentation

## Overview

The Serve System can automatically create **Rock Connection Requests** when a person signs up for a serve opportunity. This allows coordinators to track and follow up with new volunteers through Rock's Connection system.

Connection requests are **optional** — they are only created when a `ConnectionOpportunityId` is configured on the Serve Opportunity Role.

---

## System Architecture

### Connection Request Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Person Signs Up                           │
│              (for Role + Campus + Shifts)                    │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │ Does Role have a     │
          │ ConnectionOpportunity│
          │ configured?          │
          └──────┬───────────────┘
                 │
          ┌──────┴──────┐
          │Yes          │No
          ▼             ▼
  ┌───────────────┐  ┌──────────────┐
  │ Check for     │  │ Skip         │
  │ existing      │  │ connection   │
  │ active request│  │ request      │
  └───┬───────────┘  └──────────────┘
      │
  ┌───┴──────────┐
  │Has existing  │No existing
  │active request│request
  ▼              ▼
┌────────────┐ ┌────────────────────────┐
│ Link signup│ │ Check DataView filter  │
│ to existing│ │ (if configured)        │
│ request    │ └───────┬────────────────┘
└────────────┘         │
                ┌──────┴──────┐
                │Passes       │Fails
                ▼             ▼
        ┌───────────────┐  ┌──────────────┐
        │ Create new    │  │ Skip         │
        │ ConnectionReq │  │ connection   │
        │ with ALL shift│  │ request      │
        │ times in      │  └──────────────┘
        │ Comments      │
        └───────────────┘
```

---

## Configuration

### Setting Up Connection Requests on a Role

Connection requests are configured at the **Serve Opportunity Role** level:

1. Navigate to **Serve Opportunity Detail** page
2. Edit or create a **Role**
3. Set the **Connection Opportunity** dropdown to the desired Rock Connection Opportunity
4. Optionally set a **DataView** to restrict which people get connection requests

#### Role Settings That Affect Connection Requests

| Setting | Purpose |
|---------|---------|
| **Connection Opportunity** | Links the role to a Rock Connection Opportunity. If set, sign-ups for this role create connection requests. If blank, no connection requests are created. |
| **DataView** | Optional filter. If set, only people who appear in this DataView will have connection requests created. Others will still be signed up but without a connection request. |

---

## How Connection Requests Are Created

### When a Person Signs Up

The system creates connection requests **before** processing individual shift sign-ups, so that all selected shifts are included in the request's comments.

#### Step-by-Step Process

1. **Collect all shift times** — All shifts the person selected are gathered upfront
2. **Build comment** — A single comment is built containing all shift date/times
3. **Check for existing request** — Query for an active `ConnectionRequest` matching the person + connection opportunity
4. **If no existing request:**
   a. Check DataView filter (if configured on the role)
   b. If person passes filter (or no filter), create a new `ConnectionRequest`
   c. Assign default connector based on campus
5. **If request already exists:** Link the sign-up to the existing active request
6. **Link to sign-ups** — All sign-ups in the loop are linked to the single connection request via `ConnectionRequestId`

### Comment Format

**Single shift:**
```
Signed up for {RoleName} for {OpportunityName} at January 15, 2026 9:00 AM.
```

**Multiple shifts:**
```
Signed up for {RoleName} for {OpportunityName} at:
- January 15, 2026 9:00 AM
- January 22, 2026 9:00 AM
- January 29, 2026 9:00 AM
```

**Family member (single shift):**
```
Signed up for {RoleName} for {OpportunityName} by {PrimaryPersonFullName} at January 15, 2026 9:00 AM.
```

**Family member (multiple shifts):**
```
Signed up for {RoleName} for {OpportunityName} by {PrimaryPersonFullName} at:
- January 15, 2026 9:00 AM
- January 22, 2026 9:00 AM
```

---

## Connection Request Fields

When a new connection request is created, the following fields are populated:

| Field | Value | Source |
|-------|-------|--------|
| `PersonAliasId` | The volunteer's primary alias ID | `person.PrimaryAliasId` |
| `ConnectionOpportunityId` | From the role configuration | `role.ConnectionOpportunityId` |
| `CampusId` | Selected campus, or person's primary campus | `campus?.Id ?? person.PrimaryCampusId` |
| `ConnectionState` | `Active` | Always set to Active |
| `ConnectionStatusId` | Default status from the Connection Type | First status where `IsDefault == true` |
| `Comments` | All shift times (see format above) | Built from all selected shifts |
| `CreatedDateTime` | Current Rock datetime | `RockDateTime.Now` |
| `ConnectorPersonAliasId` | Default connector for the campus | `ConnectionOpportunity.GetDefaultConnectorPersonAliasId(campusId)` |

---

## Family Member Handling

When a primary person signs up family members for the same shifts:

1. **Separate connection requests** are created for each family member (not shared with the primary person)
2. The comment includes the primary person's name: `"by {person.FullName}"`
3. Each family member's connection request includes **all** shift times they were signed up for
4. The same DataView filter check applies per family member
5. Campus defaults to the family member's primary campus if no campus was explicitly selected

---

## Duplicate Prevention

The system prevents duplicate connection requests:

- Before creating a new request, it queries for any **active** `ConnectionRequest` where:
  - `PersonAliasId` matches the volunteer
  - `ConnectionOpportunityId` matches the role's connection opportunity
  - `ConnectionState == Active`
- If one exists, the sign-up is linked to it without creating a duplicate
- This means if a person signs up again later for a different instance of the same opportunity, they will be linked to their existing active connection request (the comments from the original sign-up remain unchanged)

---

## Sign-Up to Connection Request Linkage

Each `ServeOpportunityInstanceSignUp` record has a nullable `ConnectionRequestId` field:

- If a connection request was created or found, all sign-ups for that person are linked via this field
- If no connection request was created (no ConnectionOpportunity configured, or DataView filter excluded the person), this field is `null`
- Multiple sign-ups can reference the same connection request (one request per person per opportunity)

---

## Code Location

| Component | File |
|-----------|------|
| Sign-up handler (connection request creation) | `Plugins/org_tpcc/ServeSystem/SignUp/ServeSignUp.ascx.cs` — `btnSave_Click` method |
| SignUp model (ConnectionRequestId FK) | `org.tpcc.ServeSystem/Model/ServeOpportunityInstanceSignUp/ServeOpportunityInstanceSignUp.cs` |
| Role model (ConnectionOpportunityId FK) | `org.tpcc.ServeSystem/Model/ServeOpportunityRole/ServeOpportunityRole.cs` |
| Database schema | `org.tpcc.ServeSystem/Migrations/001_CreateDb.cs` |

---

## Troubleshooting

### Connection Request Not Created
- Verify the **Role** has a `ConnectionOpportunityId` set
- Check if a **DataView** filter is configured on the role and whether the person is in it
- Check if there is already an **active** connection request for this person + opportunity (the system reuses existing ones)

### Only One Shift Showing in Comments
- This was fixed to aggregate all shift times before creating the connection request
- If you see single-shift comments, verify you are running the latest version of the plugin

### Wrong Connector Assigned
- The connector is assigned via `ConnectionOpportunity.GetDefaultConnectorPersonAliasId(campusId)`
- Check the Connection Opportunity's campus-specific default connectors in Rock admin
- If no campus-specific connector is set, the opportunity-level default connector is used

### Family Member Not Getting Connection Request
- Verify the family member passes the DataView filter (if configured)
- Check that the family member has a valid `PrimaryAliasId`
- Family member connection requests are separate from the primary person's request
