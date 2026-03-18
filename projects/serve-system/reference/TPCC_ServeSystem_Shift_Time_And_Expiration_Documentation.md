# Serve System - Shift Times and Expirations Guide

## Overview

Serve shift timing and cutoff behavior is controlled at two levels:

- **Instance schedule level** on the **Serve Opportunity Instance Detail** block
- **Shift level** on the **Role Schedule Configurator** block

These settings work together. Schedule-level values provide defaults and fallbacks. Shift-level values provide the most specific operational value for a specific role/schedule/campus or specific shift.

---

## Shift Time Resolution

The system resolves effective shift start and end times using the most specific matching `ServeShiftTimeDefinition` record in this order:

1. **Schedule + Role + Campus**
2. **Schedule + Role**
3. **Role + Campus**
4. **Schedule + Campus**
5. **Role**
6. **Schedule default**
7. **Base iCal schedule time**

If no override record matches, the shift uses the underlying iCal schedule time.

---

## What Each Admin Screen Owns

## Serve Opportunity Instance Detail

The instance detail screen manages:

- The **instance schedules** for the serve opportunity instance
- The **schedule default shift time** for each instance schedule
- The **schedule expiration** for each instance schedule
- The **role defaults across all schedules** for the instance
- The **schedule-scoped role overrides** for each instance schedule

If the instance is partitioned by campus, each role override row can also be scoped to:

- **All Campuses**
- **A specific campus**

That means the instance detail now manages:

- generalized role defaults across all schedules
- campus-specific role defaults across all schedules when partitioned by campus
- schedule-scoped role overrides
- schedule + role + campus overrides

## Role Schedule Configurator

The Role Schedule Configurator manages:

- **Role counts** per schedule cell
- **Shift-time edits** in a schedule/role grid
- **Shift expirations** for existing shifts

When the instance is partitioned by campus, the configurator works in the context of the currently selected campus.

---

## Current Editing Model

In the current UI:

- **All-schedules role defaults** are edited in instance detail
- **Schedule default times** are edited in instance detail
- **Schedule + Role** overrides can be edited in instance detail and in the configurator
- **Schedule + Role + Campus** overrides can be edited in instance detail when partitioned by campus, and in the configurator for the selected campus

The resolution service also understands additional shapes such as **Role + Campus**, **Schedule + Campus**, and **Role-only** fallback records if they already exist in data, but those are not the primary shapes created by the current admin UI.

---

## Expiration Precedence

Sign-up availability checks expiration in this order:

1. **Shift expiration**
2. **Instance schedule expiration**
3. No expiration

This means:

- A shift-level expiration overrides the schedule-level expiration
- If a shift has no expiration, the schedule expiration still closes sign-up for that shift

---

## Where to Edit Expirations

## Instance Detail

Use instance detail when you want to set the expiration for the whole schedule on the instance.

Example:
All `Saturday 5 PM` shifts for this instance should close on Friday at noon unless a specific shift says otherwise.

## Role Schedule Configurator

Use the configurator when you want to set or change the expiration on a specific shift record.

The configurator expirations tab displays the schedule expiration as the initial fallback value when the shift has no explicit expiration. After saving in that tab, the saved value becomes a **shift-level expiration**.

---

## Campus Filtering Notes

When an instance is partitioned by campus:

- The instance detail override editor can save overrides for **All Campuses** or a specific campus
- The configurator operates against the **selected campus context**

The configurator does not currently expose a separate "no campus filter" editing mode for partitioned instances.

---

## Practical Examples

## Example 1: Schedule default only

- Schedule default for `Sunday 9 AM` is `8:00 AM - 9:00 AM`
- No role override exists

All roles inherit `8:00 AM - 9:00 AM`.

## Example 2: Role override for all campuses

- Schedule default is `8:00 AM - 9:00 AM`
- All-schedules `Greeter` default is `7:30 AM - 9:00 AM`

Greeters inherit `7:30 AM - 9:00 AM`; all other roles inherit the default.

## Example 3: Campus-specific role override

- Schedule default is `8:00 AM - 9:00 AM`
- All-schedules `Greeter` default for **All Campuses** is `7:30 AM - 9:00 AM`
- All-schedules `Greeter` default for **Northwest** is `7:15 AM - 9:00 AM`

Northwest greeters use `7:15 AM - 9:00 AM`.
Greeters at other campuses use `7:30 AM - 9:00 AM`.

## Example 4: Expiration fallback

- Schedule expiration is `Friday 12:00 PM`
- Shift A has no explicit expiration
- Shift B has explicit expiration `Thursday 5:00 PM`

Shift A closes Friday at noon.
Shift B closes Thursday at 5:00 PM.
