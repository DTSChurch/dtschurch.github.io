# Serve System - Notification & Confirmation Email Documentation

## Overview

The Serve System includes two distinct email workflows:
1. **Confirmation Emails** - Sent to volunteers when they sign up
2. **Notification Emails** - Sent to coordinators/leaders when new sign-ups occur

Both systems support customizable content templates with a hierarchical matching system based on role and campus.

---

## System Architecture

### Email Flow Process

```
┌─────────────────────────────────────────────────────────────┐
│                    Person Signs Up                          │
│              (for Role + Campus + Shift)                    │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ├──────────────────────┬─────────────────────────┐
                     │                      │                         │
                     ▼                      ▼                         ▼
          ┌──────────────────┐  ┌──────────────────────┐  ┌─────────────────┐
          │ Confirmation     │  │ Notification         │  │ Content         │
          │ System Email     │  │ System Email         │  │ Template Lookup │
          │ (configured on   │  │ (configured on       │  │ (hierarchical   │
          │  Opportunity)    │  │  Opportunity)        │  │  matching)      │
          └────────┬─────────┘  └─────────┬────────────┘  └────────┬────────┘
                   │                      │                         │
                   │                      │                         │
                   ▼                      ▼                         ▼
          ┌──────────────────┐  ┌──────────────────────┐  ┌─────────────────┐
          │ Send to Volunteer│  │ Send to Recipients   │  │ Used in         │
          │ - Person who     │  │ - Filter by Campus/  │  │ Confirmation    │
          │   signed up      │  │   Role               │  │ Email as        │
          │ - Includes       │  │ - Person or Group    │  │ ContentTemplate │
          │   ContentTemplate│  │ - NO ContentTemplate │  │ merge field     │
          └──────────────────┘  └──────────────────────┘  └─────────────────┘
```

---

## Configuration Locations

### Serve Opportunity Detail Page

All email configuration is done at the **Serve Opportunity** level:

#### 1. Confirmation Email Section
- **Location:** ServeOpportunityDetail.ascx - "Confirmation Email" panel
- **Settings:**
  - **Confirmation System Communication** dropdown - Select the Rock System Communication template
  - **Content Templates** (nested panel) - Define custom content by role/campus combination

#### 2. Notification Email Section  
- **Location:** ServeOpportunityDetail.ascx - "Notification Email" panel
- **Settings:**
  - **Notification System Communication** dropdown - Select the Rock System Communication template
  - **Notification Recipients** grid - Define who receives notifications with optional filters

---

## Confirmation Emails

### When They're Sent
Automatically sent immediately after a person successfully signs up for a serve opportunity.

### Who Receives Them
The person who signed up.

### Configuration Steps

1. **Select System Communication Template**
   - Navigate to Serve Opportunity detail page
   - Open "Confirmation Email" panel
   - Select a System Communication from the dropdown
   - This template defines the email structure (subject, from, etc.)

2. **Create Content Templates (Optional but Recommended)**
   - Open the nested "Content Templates" panel
   - Click "Add" to create a new template
   - Select Role, Role Category, and/or Campus for specificity
   - Enter Lava template content in the editor
   - Content template is rendered and available as `{{ ContentTemplate }}` merge field

### Content Template Hierarchy

The system uses **hierarchical matching** to select the most specific template:

```
Priority 1: Role + Campus (Most Specific)
    ↓
Priority 2: Role Only
    ↓
Priority 3: Role Category + Campus
    ↓
Priority 4: Role Category Only
    ↓
Priority 5: Campus Only
    ↓
Priority 6: Default (no role/category/campus specified)
    ↓
Priority 7: Empty string (if no templates configured)
```

**Example Scenario:**

You have these templates configured:
- Template A: Role="Auditorium Team", Campus="Northwest"
- Template B: Role="Auditorium Team", Campus=None
- Template C: RoleCategory="Kids Ministry", Campus="Northwest"
- Template D: RoleCategory="Kids Ministry", Campus=None
- Template E: Role=None, Campus="Northwest"
- Template F: Role=None, Campus=None (Default)

**Matching Results:**
- Person signs up for "Auditorium Team" at "Northwest Campus" → Uses **Template A** ✅
- Person signs up for "Auditorium Team" at "Downtown Campus" → Uses **Template B** (role matches)
- Person signs up for "Kids Check-In" (category "Kids Ministry") at "Northwest Campus" → Uses **Template C**
- Person signs up for "Kids Check-In" (category "Kids Ministry") at "Downtown Campus" → Uses **Template D**
- Person signs up for unrelated category at "Northwest Campus" → Uses **Template E**
- Person signs up for unrelated category at "Downtown Campus" → Uses **Template F**
- No templates configured → `{{ ContentTemplate }}` is empty

### Available Lava Variables (Confirmation Emails)

| Variable | Type | Description | Example Usage |
|----------|------|-------------|---------------|
| `{{ Person }}` | Person | The volunteer who signed up | `{{ Person.NickName }}` |
| `{{ ServeOpportunity }}` | ServeOpportunity | The opportunity entity | `{{ ServeOpportunity.Name }}` |
| `{{ ServeOpportunityInstance }}` | ServeOpportunityInstance | The instance entity | `{{ ServeOpportunityInstance.Name }}` |
| `{{ ServeOpportunityRole }}` | ServeOpportunityRole | The actual role signed up for | `{{ ServeOpportunityRole.Name }}` |
| `{{ Campus }}` | Campus | The actual campus of the shift | `{{ Campus.Name }}` |
| `{{ ShiftDetails }}` | List&lt;object&gt; | Array of shifts signed up for | See below |
| `{{ ContentTemplate }}` | string (HTML) | Rendered custom content based on role/campus | Direct output |
| `{{ StaffContact.Type }}` | string | `Person`, `Group`, or empty | `{{ StaffContact.Type }}` |
| `{{ StaffContact.Name }}` | string | Display name for signer contact | `{{ StaffContact.Name }}` |
| `{{ StaffContact.Person }}` | Person | Resolved signer person (if configured) | `{{ StaffContact.Person.FullName }}` |
| `{{ StaffContact.Group }}` | Group | Resolved signer group (if configured) | `{{ StaffContact.Group.Name }}` |

### Subject/From Lava Variables

System Communication **Subject** and **From Name/Address** fields can use the same merge context as the body.
Commonly-used fields are:

- `{{ Person }}` / `{{ Person.NickName }}`
- `{{ ServeOpportunity }}`
- `{{ ServeOpportunityInstance }}`
- `{{ ServeOpportunityRole }}`
- `{{ Campus }}`
- `{{ StaffContact }}`

#### ShiftDetails Object Structure

Each item in the `ShiftDetails` array contains:
```lava
{
  "Id": 123,              // Shift ID
  "SignUpId": 456,        // Sign-Up ID
  "Date": "October 15, 2025",
  "StartTime": "9:00 AM",
  "EndTime": "12:00 PM"
}
```

### Example Confirmation Email Template

**System Communication Body:**
```lava
<h1>You're Confirmed, {{ Person.NickName }}! 🎉</h1>

<p>Thanks for signing up to serve with <strong>{{ ServeOpportunity.Name }}</strong>!</p>

<h2>Your Schedule:</h2>
<ul>
{% for shift in ShiftDetails %}
  <li>
    <strong>{{ shift.Date }}</strong><br>
    {{ shift.StartTime }} - {{ shift.EndTime }}
    {% if Campus %}at {{ Campus.Name }}{% endif %}
  </li>
{% endfor %}
</ul>

<h2>Important Information for {{ ServeOpportunityRole.Name }}</h2>
{{ ContentTemplate }}

<p>Questions? Contact us at serve@church.org</p>
```

**Content Template (Role: "Auditorium Team", Campus: "Northwest"):**
```lava
<div class="role-specific-content">
  <h3>Setup Instructions</h3>
  <ul>
    <li>Arrive 30 minutes before service</li>
    <li>Check in at the audio booth</li>
    <li>Parking is available in Lot B</li>
  </ul>
  
  <h3>What to Bring</h3>
  <ul>
    <li>Your volunteer badge</li>
    <li>Comfortable shoes</li>
  </ul>
</div>
```

---

## Notification Emails

### When They're Sent
Automatically sent after sign-ups are processed, grouped by opportunity.

### Who Receives Them
Defined by **Notification Recipients** configured on the opportunity. Recipients can be filtered by role and/or campus.

### Configuration Steps

1. **Select System Communication Template**
   - Navigate to Serve Opportunity detail page
   - Open "Notification Email" panel
   - Select a System Communication from the dropdown

2. **Add Notification Recipients**
   - Click "Add" in the Notification Recipients grid
   - Choose recipient type (Person or Group toggle)
   - Optionally filter by Campus and/or Role
   - Save the recipient

### Recipient Filtering Logic

Recipients only receive notifications for sign-ups that match their filters:

**Example Configuration:**

| Recipient | Campus Filter | Role Filter | Receives Notifications For |
|-----------|---------------|-------------|---------------------------|
| Sarah (Auditorium Coordinator) | None | Auditorium Team | All Auditorium Team sign-ups across all campuses |
| John (Northwest Campus Lead) | Northwest | None | All sign-ups at Northwest campus regardless of role |
| Maria (Northwest Kids Lead) | Northwest | Kids Ministry | Only Kids Ministry sign-ups at Northwest campus |
| Admin Group | None | None | All sign-ups for this opportunity |

**Matching Process:**
1. System groups all new sign-ups by opportunity
2. For each recipient:
   - If recipient has a campus filter, only include sign-ups from that campus
   - If recipient has a role filter, only include sign-ups for that role
   - If recipient has both filters, sign-up must match BOTH
   - If recipient has no filters, include all sign-ups
3. If any sign-ups match the recipient's filters, send them one email with all matching sign-ups

### Available Lava Variables (Notification Emails)

| Variable | Type | Description | Notes |
|----------|------|-------------|-------|
| `{{ ServeOpportunity }}` | ServeOpportunity | The opportunity entity | Always present |
| `{{ ServeOpportunityInstance }}` | ServeOpportunityInstance | The instance entity | Always present |
| `{{ ServeOpportunityRole }}` | ServeOpportunityRole | The actual role from the shifts in this notification | Always present (taken from first signup's shift) |
| `{{ Campus }}` | Campus | The actual campus from the shifts in this notification | May be null if shifts have no campus |
| `{{ NotificationRole }}` | ServeOpportunityRole | The role filter applied to this recipient | ⚠️ May be null if recipient has no role filter |
| `{{ NotificationCampus }}` | Campus | The campus filter applied to this recipient | ⚠️ May be null if recipient has no campus filter |
| `{{ ShiftDetails }}` | List&lt;object&gt; | Array of shifts with new sign-ups | See below |
| `{{ People }}` | List&lt;Person&gt; | Array of unique people who signed up | Across all shifts in this notification |
| `{{ SignUps }}` | List&lt;ServeOpportunityInstanceSignUp&gt; | Array of all sign-up objects | All matching sign-ups in this notification |
| `{{ Person }}` | Person | The notification recipient | Always present |

**Important Notes:**
- **Notification emails do NOT include `{{ ContentTemplate }}`** - content templates are only for confirmation emails.
- **`Campus` and `ServeOpportunityRole`** represent the actual campus/role from the shifts being reported. Since signups are filtered by the recipient's filters, all signups will match the filter criteria.
- **`NotificationCampus` and `NotificationRole`** represent the recipient's configured filters. Use these to display context like "You're receiving this because you coordinate [NotificationRole] at [NotificationCampus]".

#### ShiftDetails Object Structure (Notifications)

Each item in the `ShiftDetails` array contains:
```lava
{
  "Id": 123,                    // Shift ID
  "SignUpIds": [456, 457, 458], // Array of all sign-up IDs for this shift
  "SignUps": [...]              // Array of ServeOpportunityInstanceSignUp objects for this shift
  "People": [...]               // Array of unique Person objects who signed up for this shift
  "Date": "October 15, 2025",
  "StartTime": "9:00 AM",
  "EndTime": "12:00 PM"
}
```

### Example Notification Email Template

#### Basic Template (Shift Summary)
```lava
<h1>New Sign-Ups for {{ ServeOpportunity.Name }}</h1>

<p>Hello {{ Person.NickName }},</p>

<p>You're receiving this notification because new volunteers have signed up for shifts you're coordinating.</p>

{% if NotificationCampus and NotificationRole %}
  <p><em>You're receiving this for: {{ NotificationRole.Name }} at {{ NotificationCampus.Name }}</em></p>
{% elsif NotificationCampus %}
  <p><em>You're receiving this for: {{ NotificationCampus.Name }}</em></p>
{% elsif NotificationRole %}
  <p><em>You're receiving this for: {{ NotificationRole.Name }}</em></p>
{% endif %}

<p><strong>Campus:</strong> {{ Campus.Name }}<br>
<strong>Role:</strong> {{ ServeOpportunityRole.Name }}</p>

<h2>New Sign-Ups:</h2>
<table>
  <thead>
    <tr>
      <th>Date & Time</th>
      <th>Number of Volunteers</th>
    </tr>
  </thead>
  <tbody>
  {% for shift in ShiftDetails %}
    <tr>
      <td>{{ shift.Date }}<br>{{ shift.StartTime }} - {{ shift.EndTime }}</td>
      <td>{{ shift.SignUpIds | Size }} volunteer(s)</td>
    </tr>
  {% endfor %}
  </tbody>
</table>

<p>
  <a href="{{ 'Global' | Attribute:'InternalApplicationRoot' }}/page/1234?OpportunityId={{ ServeOpportunity.Id }}">
    View All Sign-Ups
  </a>
</p>
```

#### Detailed Template (With Names)
```lava
<h1>New Sign-Ups for {{ ServeOpportunity.Name }}</h1>

<p>Hello {{ Person.NickName }},</p>

{% if NotificationCampus and NotificationRole %}
  <p><em>You're coordinating: {{ NotificationRole.Name }} at {{ NotificationCampus.Name }}</em></p>
{% elsif NotificationCampus %}
  <p><em>You're coordinating at: {{ NotificationCampus.Name }}</em></p>
{% elsif NotificationRole %}
  <p><em>You're coordinating: {{ NotificationRole.Name }}</em></p>
{% endif %}

<p><strong>Campus:</strong> {{ Campus.Name }}<br>
<strong>Role:</strong> {{ ServeOpportunityRole.Name }}</p>

<h2>Volunteers Who Signed Up:</h2>
<p>Total: {{ People | Size }} volunteer(s)</p>

<h3>By Shift:</h3>
{% for shift in ShiftDetails %}
  <div style="margin-bottom: 20px;">
    <h4>{{ shift.Date }} - {{ shift.StartTime }} to {{ shift.EndTime }}</h4>
    <ul>
    {% for person in shift.People %}
      <li>{{ person.FullName }} - {{ person.Email }}</li>
    {% endfor %}
    </ul>
  </div>
{% endfor %}

<h3>All Volunteers (Unique):</h3>
<ul>
{% for person in People %}
  <li>{{ person.FullName }} - {{ person.Email }} - {{ person.MobilePhone | Default:'No phone' }}</li>
{% endfor %}
</ul>

<p>
  <a href="{{ 'Global' | Attribute:'InternalApplicationRoot' }}/page/1234?OpportunityId={{ ServeOpportunity.Id }}">
    View Full Details in Serve System
  </a>
</p>
```

---

## Technical Implementation

### Code Flow

#### Confirmation Email Process
**File:** `ServeOpportunityInstanceSignUpService.cs`  
**Method:** `SendConfirmationEmailsIfPossible(Person person, List<ServeOpportunityInstanceSignUp> signUps)`

1. **Reload Sign-Ups:** Fresh context prevents disposed ObjectContext errors
2. **Group by Opportunity:** Multiple sign-ups grouped together
3. **Load Opportunity & System Communication:** From ConfirmationSystemEmailId
4. **Build ShiftDetails:** Extract date/time from each shift
5. **Lookup Content Template:** 
   ```csharp
   var templateService = new ServeOpportunityNotificationContentTemplateService(rockContext);
   var templateContent = templateService.GetMostSpecificTemplate(
       oppId,
       actualSignUpRoleId,
       actualSignUpCampusId
   );
   ```
6. **Render Content Template:** Use ServeHelper.RenderServeTemplate() with merge fields
7. **Add to Merge Fields:** Include rendered template as "ContentTemplate"
8. **Send Email:** To the person who signed up

#### Notification Email Process
**File:** `ServeOpportunityInstanceSignUpService.cs`  
**Method:** `SendNotificationEmailsIfPossible(ServeOpportunityNotificationRecipient recipient, List<ServeOpportunityInstanceSignUp> signUps)`

1. **Reload Sign-Ups:** Fresh context
2. **Filter by Recipient:** Only sign-ups matching recipient's campus/role filters
3. **Group by Opportunity:** Multiple sign-ups grouped together
4. **Load Opportunity & System Communication:** From NotificationSystemEmailId
5. **Build ShiftDetails:** Aggregated by shift with SignUpIds array
6. **Build Merge Fields:** Use recipient's filter values for Role/Campus
7. **Resolve Recipients:** 
   - If PersonId: Single person
   - If GroupId: All active group members
8. **Send Email:** To each resolved recipient

### Template Service

**File:** `ServeOpportunityNotificationContentTemplateService.cs`  
**Method:** `GetMostSpecificTemplate(int opportunityId, int? roleId, int? campusId)`

Implements hierarchical template selection:
```csharp
// 1. Try Role + Campus
var template = GetTemplate(opportunityId, roleId, campusId);
if (template != null) return template.Content;

// 2. Try Role only
template = GetTemplate(opportunityId, roleId, null);
if (template != null) return template.Content;

// 3. Try Campus only
template = GetTemplate(opportunityId, null, campusId);
if (template != null) return template.Content;

// 4. Try Default
template = GetTemplate(opportunityId, null, null);
if (template != null) return template.Content;

// 5. Return empty
return string.Empty;
```

---

## Best Practices

### Content Templates

1. **Always Create a Default Template**
   - Ensures all volunteers get consistent information
   - Role/Campus specific templates can add to or override default

2. **Use Role-Specific Templates For:**
   - Special training requirements
   - Role-specific instructions or check-in procedures
   - Required gear or attire
   - Different arrival times

3. **Use Campus-Specific Templates For:**
   - Parking instructions
   - Building access codes
   - Campus-specific contacts
   - Location details

4. **Use Role+Campus Templates For:**
   - Highly specific scenarios
   - Different role implementations per campus
   - Campus-specific role coordinators

### Notification Recipients

1. **Avoid Over-Notifying**
   - Don't add recipients without filters unless they need ALL notifications
   - Use role/campus filters to send targeted notifications

2. **Consider Using Groups**
   - Easier to manage team members
   - Automatic updates as team membership changes
   - Good for rotating coordinators

3. **Test Your Filters**
   - Verify recipients get expected notifications
   - Check that filters aren't too restrictive

### System Communication Templates

1. **Keep Structure in System Communication**
   - Header, footer, styling in System Communication
   - Variable content in ContentTemplate

2. **Always Handle Null Values**
   ```lava
   {% if Campus %}
     <p>Location: {{ Campus.Name }}</p>
   {% endif %}
   ```

3. **Provide Fallback Content**
   ```lava
   {% if ContentTemplate != '' %}
     {{ ContentTemplate }}
   {% else %}
     <p>Thank you for signing up! We'll send more details soon.</p>
   {% endif %}
   ```

---

## Troubleshooting

### Confirmation Emails Not Sending
- ✅ Check ConfirmationSystemEmailId is set on the opportunity
- ✅ Verify System Communication exists and is active
- ✅ Check email settings in Rock (SMTP, from address)
- ✅ Look in Rock Communication History

### Notification Emails Not Sending
- ✅ Check NotificationSystemEmailId is set on the opportunity
- ✅ Verify at least one notification recipient is configured
- ✅ Check recipient's campus/role filters match the sign-ups
- ✅ If using a group, verify it has active members

### ContentTemplate is Empty
- ✅ Verify content templates are configured on the opportunity
- ✅ Check template matching: does a template exist for the role/campus combination?
- ✅ Remember: Hierarchy is Role+Campus → Role → Campus → Default
- ✅ Create a default template (no role, no campus) as a catch-all

### Wrong Content Template Loading
- ✅ Understand the hierarchy: most specific template wins
- ✅ Check if a more specific template exists that's being selected
- ✅ Review the matching logic in the hierarchy section above

---
