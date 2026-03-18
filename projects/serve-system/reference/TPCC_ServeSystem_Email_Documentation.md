# Serve System - Email Communications Guide

## Overview

The Serve System sends two types of emails when a volunteer signs up:

1. **Confirmation Emails** - Sent to the volunteer confirming their sign-up
2. **Notification Emails** - Sent to staff/coordinators alerting them of new sign-ups

Both use Rock **System Communications** and support Lava merge fields for dynamic content.

---

## Quick Setup

### 1. Configure Staff Contacts (Recommended First)

Before setting up emails, assign staff contacts for each role on the **Serve Opportunity Detail** page. These contacts are used in emails (as the sender name/address and as a merge field).

Each role can have:
- A **default contact** (person or group) - used for all campuses
- **Campus-specific contacts** - override the default for that campus

> When an email is sent, the system finds the most specific contact: campus-specific first, then default.

### 2. Select System Communications

On the Serve Opportunity Detail page, choose:
- **Confirmation Email Template** - the System Communication sent to volunteers
- **Notification Email Template** - the System Communication sent to staff/coordinators

A default **"Serve Sign-Up Confirmation"** System Communication is installed with the plugin under the "Serve" category. It is pre-configured to send from the staff contact's email address.

### 3. Add Content Templates (Optional)

Content templates let you customize the confirmation email body per role, role category, and/or campus. The rendered content is available as `{{ ContentTemplate }}` in the confirmation System Communication.

### 4. Add Notification Recipients

Define who receives notification emails, optionally filtered by campus and/or role.

---

## Confirmation Emails

### When Sent
Immediately after a volunteer signs up.

### Who Receives Them
The volunteer who signed up.

### Sender (From) Address

The default System Communication uses Lava in the **From** fields:

| Field | Default Value | Purpose |
|-------|--------------|---------|
| **From Email** | `{{ StaffContact.Person.Email }}` | Sends from the staff contact's email, so replies go to them |
| **From Name** | `{{ StaffContact.Name }}` | Displays the staff contact's name |

> If no staff contact is configured for the role/campus, these fields will be empty and Rock will fall back to the System Communication's global default or the organization email.

You can customize these in **Admin Tools > Communications > System Communications > Serve Sign-Up Confirmation**.

### Available Lava Merge Fields

These fields are available in the System Communication **Subject**, **From**, **From Name**, and **Body**:

| Merge Field | Description |
|-------------|-------------|
| `{{ Person.NickName }}` | Volunteer's first name |
| `{{ Person.FullName }}` | Volunteer's full name |
| `{{ Person.Email }}` | Volunteer's email |
| `{{ ServeOpportunity.Name }}` | Name of the serve opportunity (e.g., "Easter Serve 2026") |
| `{{ ServeOpportunityInstance.Name }}` | Name of the instance (e.g., "Easter Weekend") |
| `{{ ServeOpportunityRole.Name }}` | The role they signed up for (e.g., "Usher") |
| `{{ Campus.Name }}` | The campus of their shift (empty when the shift is not campus-specific) |
| `{{ StaffContact.Name }}` | Staff contact display name (person or group name) |
| `{{ StaffContact.Type }}` | `"Person"` or `"Group"` |
| `{{ StaffContact.Person.Email }}` | Staff contact's email address |
| `{{ StaffContact.Person.FullName }}` | Staff contact's full name |
| `{{ StaffContact.Group.Name }}` | Staff contact group name (if group-based) |
| `{{ ContentTemplate }}` | Rendered content template HTML (see below) |
| `{{ ShiftDetails }}` | List of shift date/time details (see below) |

#### ShiftDetails

Each item in the `{{ ShiftDetails }}` list contains:

| Property | Example |
|----------|---------|
| `{{ shift.Id }}` | Shift record ID |
| `{{ shift.SignUpId }}` | Sign-up record ID for this shift |
| `{{ shift.Date }}` | `"April 20, 2026"` |
| `{{ shift.StartTime }}` | `"9:00 AM"` |
| `{{ shift.EndTime }}` | `"12:00 PM"` |

**Example usage:**
```lava
{% for shift in ShiftDetails %}
  {{ shift.Date }} from {{ shift.StartTime }} to {{ shift.EndTime }}
{% endfor %}
```

---

## Content Templates

Content templates allow you to customize the email body based on who is signing up and where. They are configured on the **Serve Opportunity Detail** page under the confirmation email section.

### How Template Matching Works

When a volunteer signs up, the system picks the **most specific** template that matches their role, role category, and campus:

| Priority | Match | Example |
|----------|-------|---------|
| 1 (most specific) | Role + Campus | "Usher" at "Northwest" |
| 2 | Role only | "Usher" at any campus |
| 3 | Role Category + Campus | "Guest Services" roles at "Northwest" |
| 4 | Role Category only | "Guest Services" roles at any campus |
| 5 | Campus only | Any role at "Northwest" |
| 6 | Default | No role, no category, no campus |

If no template matches, `{{ ContentTemplate }}` will be empty.

### Example Scenario

You have 6 campuses and 20+ roles across several ministries. Instead of creating templates for every role/campus combination (120+ templates), you can use **Role Categories**:

| Template | Role | Role Category | Campus | Content |
|----------|------|---------------|--------|---------|
| A | — | Kids Ministry | — | Kids-specific instructions for all campuses |
| B | — | Guest Services | Northwest | NW-specific guest services info |
| C | — | Guest Services | — | General guest services info |
| D | — | — | — | Default fallback for everyone |

- A "Kids Check-In" volunteer at any campus gets **Template A**
- A "Greeter" (Guest Services) at Northwest gets **Template B**
- A "Greeter" at Downtown gets **Template C**
- An "Audio Tech" at any campus gets **Template D**

### Lava in Content Templates

Content templates have access to the same confirmation merge fields listed above (`Person`, `Campus`, `ServeOpportunity`, `ServeOpportunityInstance`, `ServeOpportunityRole`, `ShiftDetails`, `StaffContact`, etc.). The `{{ ContentTemplate }}` field itself is **not** available inside the content template because it is the rendered output of that template.

You can write dynamic content such as:

```lava
<p>Thanks for signing up as <strong>{{ ServeOpportunityRole.Name }}</strong>
at {{ Campus.Name }}!</p>

{% if StaffContact.Name != empty %}
<p>Your team lead is {{ StaffContact.Name }}.
   Questions? Email {{ StaffContact.Person.Email }}.</p>
{% endif %}

<p>Please arrive 30 minutes before your shift.</p>
```

---

## Notification Emails

### When Sent
After sign-ups are processed, grouped by opportunity.

### Who Receives Them
Staff and coordinators defined as **Notification Recipients** on the Serve Opportunity Detail page.

### Recipient Filtering

Each recipient can be filtered by campus and/or role:

| Recipient | Campus | Role | Receives notifications for... |
|-----------|--------|------|-------------------------------|
| Sarah | — | Auditorium Team | All "Auditorium Team" sign-ups at every campus |
| John | Northwest | — | All sign-ups at Northwest, any role |
| Maria | Northwest | Kids Check-In | Only "Kids Check-In" at Northwest |
| Admin Group | — | — | All sign-ups for this opportunity |

### Available Lava Merge Fields

| Merge Field | Description |
|-------------|-------------|
| `{{ Person.NickName }}` | The notification recipient's name |
| `{{ ServeOpportunity.Name }}` | The opportunity name |
| `{{ ServeOpportunityInstance.Name }}` | The instance name |
| `{{ ServeOpportunityRole.Name }}` | The role from the sign-ups |
| `{{ Campus.Name }}` | The campus from the sign-ups |
| `{{ NotificationRole.Name }}` | The recipient's role filter (may be empty) |
| `{{ NotificationCampus.Name }}` | The recipient's campus filter (may be empty) |
| `{{ People }}` | List of unique people who signed up |
| `{{ SignUps }}` | List of all sign-up records |
| `{{ ShiftDetails }}` | List of shifts with sign-up details |

> **Note:** Notification emails do **not** include `{{ ContentTemplate }}`. Content templates are only for confirmation emails.

#### Notification ShiftDetails

Each shift in the notification `{{ ShiftDetails }}` list includes:

| Property | Description |
|----------|-------------|
| `{{ shift.Id }}` | Shift record ID |
| `{{ shift.Date }}` | Shift date |
| `{{ shift.StartTime }}` | Start time |
| `{{ shift.EndTime }}` | End time |
| `{{ shift.People }}` | List of people who signed up for this shift |
| `{{ shift.SignUpIds }}` | List of sign-up IDs |
| `{{ shift.SignUps }}` | Full sign-up records for that shift |

---

## Example Templates

### Confirmation Email (System Communication Body)

```lava
<p>Hi {{ Person.NickName }},</p>

<p>You're confirmed to serve with <strong>{{ ServeOpportunity.Name }}</strong>
as <strong>{{ ServeOpportunityRole.Name }}</strong>
{% if Campus %} at {{ Campus.Name }}{% endif %}!</p>

{% if ShiftDetails != empty %}
<p><strong>Your Schedule:</strong></p>
<ul>
{% for shift in ShiftDetails %}
  <li>{{ shift.Date }} &mdash; {{ shift.StartTime }} to {{ shift.EndTime }}</li>
{% endfor %}
</ul>
{% endif %}

{% if ContentTemplate and ContentTemplate != empty %}
{{ ContentTemplate }}
{% else %}
<p>We'll send more details as the event approaches.</p>
{% endif %}

{% if StaffContact.Name != empty %}
<p>Thanks,<br>{{ StaffContact.Name }}</p>
{% endif %}
```

### Notification Email (System Communication Body)

```lava
<p>Hi {{ Person.NickName }},</p>

<p>New volunteers have signed up for <strong>{{ ServeOpportunity.Name }}</strong>.</p>

{% if NotificationRole or NotificationCampus %}
<p><em>You're receiving this because you coordinate
  {% if NotificationRole %}{{ NotificationRole.Name }}{% endif %}
  {% if NotificationRole and NotificationCampus %} at {% endif %}
  {% if NotificationCampus %}{{ NotificationCampus.Name }}{% endif %}.</em></p>
{% endif %}

<p><strong>{{ People | Size }} new volunteer{{ People | Size | Minus:1 | AtLeast:0 | Plus:0 | Default:'s' }}</strong></p>

{% for shift in ShiftDetails %}
<h4>{{ shift.Date }} &mdash; {{ shift.StartTime }} to {{ shift.EndTime }}</h4>
<ul>
{% for person in shift.People %}
  <li>{{ person.FullName }} ({{ person.Email }})</li>
{% endfor %}
</ul>
{% endfor %}
```

---

## Troubleshooting

### Confirmation emails not sending
- Verify a **Confirmation Email Template** is selected on the Serve Opportunity
- Check that the System Communication is **active** in Admin Tools > Communications
- Review Rock's **Communication History** for errors
- Check SMTP/email transport settings

### Emails showing wrong sender
- Verify a **Staff Contact** is assigned for the role + campus
- Check the System Communication's **From** and **From Name** fields use the Lava merge fields (`{{ StaffContact.Person.Email }}` and `{{ StaffContact.Name }}`)
- If no staff contact is configured, the email will fall back to Rock's default sender

### Content template not appearing
- Verify a content template exists that matches the volunteer's role/campus
- Review the [matching priority table](#how-template-matching-works) above
- Create a **default template** (no role, no category, no campus) as a catch-all
- Make sure the confirmation System Communication body includes `{{ ContentTemplate }}`

### Notification emails not sending
- Verify a **Notification Email Template** is selected
- Verify at least one **Notification Recipient** is configured
- Check that the recipient's campus/role filters match the sign-ups
- If using a group recipient, verify the group has active members
