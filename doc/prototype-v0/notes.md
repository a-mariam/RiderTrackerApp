# Prototype v0 — Active Shift & Financial Tracker

## Current Logic Summary
Prototype v0 is a static-rate shift tracker that displays a rider's **Estimated Net Take-Home** and a **Shift Activity Audit Trail** persisted locally via MMKV storage.

- **Earnings & Bonus (Hardcoded Rates):**
  - Each completed delivery adds a fixed **₦1,200** payout and **3.5 km** estimated distance.
  - Completing **15 orders** unlocks a fixed **₦4,000** daily bonus.
  - **Net Take-Home** is calculated as `(Gross Earnings + Bonus) - Total Expenses`.
- **Expense Logging (Hardcoded Presets):**
  - Riders can only log two preset expenses via quick-action buttons: **Fuel (₦2,000)** and **Maintenance/Mechanic (₦500)**.
  - Logged expenses appear in the Shift Activity Audit Trail with a timestamp.

## Next Iteration Plan (v1)

### Problems found in v0
- Delivery payout (₦1,200), bonus (₦4,000), target (15) and distance (3.5 km/order) were hardcoded.
- Deliveries were a bare counter, so there was no per-delivery history, undo, or net-per-hour.
- Expense presets (₦2,000 Fuel / ₦500 Maintenance) were fixed, with no custom amounts.
- A fake "Chowdeck QA Simulation Panel" implied a server connection that doesn't exist.
- "Reset Shift" had no confirmation.

### Changes
- **Deliveries** become timestamped entries supplied through a `DeliveryRepository` interface. In production this would be Chowdeck's API; in the prototype it is a local, clearly labelled demo source.
- **Expenses** stay rider-entered: editable quick-tap presets plus a custom amount and category.
- **Targets and bonuses** move to configurable settings, not hardcoded constants. Values are examples, not Chowdeck policy.
- **Distance** is removed from v1 (it was an estimate, not real data).
- **Money formatting** gets a tested `formatNaira()` utility.
- **Reset Shift** requires confirmation.

### Build approach
- TDD: pure domain functions first (net profit, net per hour, target progress), then the repository, then the store, then the UI.
- Crash-safe persistence: a shift survives the app being killed.
