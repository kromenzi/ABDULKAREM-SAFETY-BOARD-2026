# ABDULKAREM SAFETY BOARD

> **المرجع الرسمي الكامل للنظام — مبني على الكود الفعلي**
> Last Audit: 2026-08-11 | Build: PASSING | Lint: CLEAN | Status: DEVELOPMENT READY

---

## 1. System Overview

**ABDULKAREM SAFETY BOARD** is a comprehensive, industrial-grade **Health, Safety & Environment (HSE) management platform** built as a client-side React SPA. It provides a centralized dashboard for managing all aspects of workplace safety across multiple facilities and departments.

| Attribute | Value |
|---|---|
| **System Name** | ABDULKAREM SAFETY BOARD |
| **Nature** | Client-Side SPA (No traditional backend required for core modules) |
| **Target Users** | HSE Officers, Safety Managers, Site Engineers, Department Heads, Admins |
| **Languages** | Arabic (RTL) + English (LTR) — switchable at runtime |
| **Default Theme** | Dark Mode + Emerald Color Theme |
| **Running Port** | 3000 (Dev) |
| **System Version** | 2.4.0 |

### Core Systems

- HSE Operations (Incidents, Reports, Risk Assessment, NCR)
- Fire Protection (Equipment, Inspections, Maintenance, Drills, Muster)
- Training & Competency (Trainings, Matrix, Competency)
- Licenses & Equipment Authorization
- ESP Safety Vision (AI Camera Surveillance System)
- Enterprise Reports & Documents
- Escalation Management
- Audit & Compliance (ISO, LOTO, Permits)
- Safety Signs (Multilingual, QR, PDF)
- Full System Backup & Restore

---

## 2. Complete System Module Map (Actual)

```
/
├── /                         → Public Home Page
├── /report/:id               → Public Safety Report (QR access)
│
└── /admin
    │
    ├── /login                → Authentication
    ├── /dashboard            → Main KPI Dashboard
    │
    ├── ── ESP Safety Vision ──
    ├── /vision/dashboard     → AI Vision Command Center
    ├── /vision/live          → Live Camera Monitoring (Grid)
    ├── /vision/cameras       → Camera Management
    ├── /vision/devices       → Edge Devices (NVR/DVR/ESP32)
    ├── /vision/map           → Factory Map with Camera Overlay
    ├── /vision/rules         → AI Safety Rules Configuration
    ├── /vision/events        → Safety Events Log
    ├── /vision/alerts        → AI Alerts Management
    ├── /vision/analytics     → Vision Analytics
    ├── /vision/settings      → Vision System Settings
    │
    ├── ── HSE Operations ──
    ├── /employees            → Employees & Safety Records
    ├── /reports              → Safety Observation Reports (SOR)
    ├── /incidents            → Incidents, Near Miss + RCA (5-Why, Fishbone)
    ├── /risk-assessment      → Risk Assessment (5x5 Matrix)
    ├── /ncr                  → Non-Conformance Reports (NCR)
    ├── /ncr/new              → Create NCR
    ├── /ncr/:id              → Edit NCR
    ├── /safety-pyramid       → Safety Pyramid Analytics
    │
    ├── ── Management Escalation ──
    ├── /escalations          → Escalation Dashboard
    ├── /escalations/history  → Escalation History
    ├── /escalations/matrix   → Escalation Matrix
    │
    ├── ── Audits & Compliance ──
    ├── /inspections          → Safety Inspections
    ├── /audits               → Audits & ISO
    ├── /compliance           → Compliance Dashboard
    ├── /loto                 → Lockout Tagout (LOTO)
    ├── /permits              → Permits to Work (PTW)
    │
    ├── ── Licenses & Equipment Auth ──
    ├── /licenses             → License Management + Dashboard
    ├── /equipment-auth       → Equipment Authorization
    ├── /trainings            → Training & Competency
    ├── /training-matrix      → Competency Matrix
    ├── /competency           → Competency Records
    │
    ├── ── Assets & Emergency ──
    ├── /assets               → Safety Assets
    ├── /visitors             → Visitors & Induction
    ├── /emergency            → Emergency & Drills
    ├── /fire-protection      → Fire Protection (Full Module)
    │
    ├── ── Enterprise Reports ──
    ├── /files                → Documents & Files
    ├── /reports-documents/safety-signs → Safety Signs (primary)
    ├── /safety-signs         → Safety Signs (alias)
    ├── /enterprise-reports   → Enterprise Reports 300DPI
    ├── /contracts            → Contracts
    ├── /forms                → Form Templates
    ├── /invoices             → Invoices
    │
    ├── ── Communication & Culture ──
    ├── /gamification         → Safety Champions
    ├── /sections             → Content Sections
    ├── /posts                → Safety Posts/News
    ├── /inbound-inbox        → Email Inbox
    ├── /email-settings       → Email SMTP Settings
    ├── /notification-rules   → Notification & Alert Rules
    │
    └── ── Administration ──
        ├── /users            → Users & Roles
        ├── /activity         → Activity Log
        ├── /plants           → Plants & Sites
        ├── /integrations     → System Integrations
        └── /settings         → System Settings (includes Backup/Restore)
```

---

## 3. Navigation Groups (Sidebar — Actual)

The sidebar is organized into **9 collapsible groups**:

| # | Group | Key Modules |
|---|---|---|
| 1 | ESP Safety Vision | Vision Dashboard, Live, Cameras, Devices, Map, Rules, Events, Analytics |
| 2 | Overview | Dashboard |
| 3 | HSE Operations | Employees, SOR Reports, Incidents+RCA, Risk Assessment, NCR, Safety Pyramid |
| 4 | Management Escalation | Escalation Dashboard, History, Matrix |
| 5 | Audits & Compliance | Inspections, Audits+ISO, Compliance, LOTO, Permits |
| 6 | Licenses & Equipment Auth | Licenses, Training, Equipment Auth, Expiring Items, Matrix, Reports |
| 7 | Assets & Emergency | Safety Assets, Visitors, Emergency+Drills, Fire Protection |
| 8 | Enterprise Reports | Documents, Safety Signs, Enterprise Reports, Contracts, Forms, Invoices |
| 9 | Administration | Users+Roles, Activity Log, Plants+Sites, Integrations, Settings |

---

## 4. Complete Route Map

| Route | Component File | Purpose | Auth |
|---|---|---|---|
| `/` | `pages/home.tsx` | Public home / landing | No |
| `/report/:id` | `pages/public-report.tsx` | Public safety report by ID | No |
| `/admin/login` | `pages/admin/login.tsx` | Admin authentication | No |
| `/admin/dashboard` | `pages/admin/dashboard.tsx` | Main KPI dashboard | Yes |
| `/admin/employees` | `pages/admin/employees.tsx` | Employee & safety records | Yes |
| `/admin/reports` | `pages/admin/reports.tsx` | Safety Observation Reports (SOR) | Yes |
| `/admin/incidents` | `pages/admin/incidents.tsx` | Incidents + Near Miss + RCA | Yes |
| `/admin/risk-assessment` | `pages/admin/risk-assessment.tsx` | 5x5 Risk Matrix | Yes |
| `/admin/ncr` | `pages/admin/ncr/list.tsx` | NCR List | Yes |
| `/admin/ncr/new` | `pages/admin/ncr/form.tsx` | Create NCR | Yes |
| `/admin/ncr/:id` | `pages/admin/ncr/form.tsx` | Edit NCR | Yes |
| `/admin/safety-pyramid` | `pages/admin/safety-pyramid.tsx` | Safety Pyramid Analytics | Yes |
| `/admin/escalations` | `pages/admin/escalations/dashboard.tsx` | Escalation Dashboard | Yes |
| `/admin/escalations/history` | `pages/admin/escalations/history.tsx` | Escalation History | Yes |
| `/admin/escalations/matrix` | `pages/admin/escalations/matrix.tsx` | Escalation Matrix | Yes |
| `/admin/inspections` | `pages/admin/inspections.tsx` | Safety Inspections | Yes |
| `/admin/audits` | `pages/admin/audits.tsx` | Audits & ISO | Yes |
| `/admin/compliance` | `pages/admin/compliance.tsx` | Compliance Dashboard | Yes |
| `/admin/loto` | `pages/admin/loto.tsx` | Lockout Tagout | Yes |
| `/admin/permits` | `pages/admin/permits.tsx` | Permits to Work | Yes |
| `/admin/licenses` | `pages/admin/licenses.tsx` | License Management | Yes |
| `/admin/equipment-auth` | `pages/admin/equipment-auth.tsx` | Equipment Authorization | Yes |
| `/admin/trainings` | `pages/admin/trainings.tsx` | Training & Competency | Yes |
| `/admin/training-matrix` | `pages/admin/training-matrix.tsx` | Competency Matrix | Yes |
| `/admin/competency` | `pages/admin/competency.tsx` | Competency Records | Yes |
| `/admin/assets` | `pages/admin/assets.tsx` | Safety Assets | Yes |
| `/admin/visitors` | `pages/admin/visitors.tsx` | Visitors & Induction | Yes |
| `/admin/emergency` | `pages/admin/emergency.tsx` | Emergency & Drills | Yes |
| `/admin/fire-protection` | `pages/admin/fire-protection.tsx` | Fire Protection System | Yes |
| `/admin/files` | `pages/admin/files.tsx` | Documents & Files | Yes |
| `/admin/reports-documents/safety-signs` | `pages/admin/safety-signs/` | Safety Signs (primary route) | Yes |
| `/admin/safety-signs` | `pages/admin/safety-signs/` | Safety Signs (alias route) | Yes |
| `/admin/enterprise-reports` | `pages/admin/enterprise-reports.tsx` | Enterprise 300DPI Reports | Yes |
| `/admin/contracts` | `pages/admin/contracts.tsx` | Contracts | Yes |
| `/admin/forms` | `pages/admin/forms.tsx` | Form Templates | Yes |
| `/admin/invoices` | `pages/admin/invoices.tsx` | Invoices | Yes |
| `/admin/gamification` | `pages/admin/gamification.tsx` | Safety Champions | Yes |
| `/admin/sections` | `pages/admin/sections.tsx` | Content Sections | Yes |
| `/admin/posts` | `pages/admin/posts.tsx` | Posts / News | Yes |
| `/admin/inbound-inbox` | `pages/admin/inbox.tsx` | Email Inbox | Yes |
| `/admin/email-settings` | `pages/admin/email-settings.tsx` | Email SMTP Config | Yes |
| `/admin/notification-rules` | `pages/admin/notification-rules.tsx` | Alert & Notification Rules | Yes |
| `/admin/users` | `pages/admin/users.tsx` | Users & Roles | Yes |
| `/admin/activity` | `pages/admin/activity-logs.tsx` | Activity Log | Yes |
| `/admin/plants` | `pages/admin/plants.tsx` | Plants & Sites | Yes |
| `/admin/integrations` | `pages/admin/integrations.tsx` | Integrations | Yes |
| `/admin/settings` | `pages/admin/settings.tsx` | System Settings + Backup | Yes |
| `/admin/vision/dashboard` | `pages/admin/vision/dashboard.tsx` | Vision Command Center | Yes |
| `/admin/vision/live` | `pages/admin/vision/live.tsx` | Live Monitoring Grid | Yes |
| `/admin/vision/cameras` | `pages/admin/vision/cameras.tsx` | Camera Management | Yes |
| `/admin/vision/devices` | `pages/admin/vision/devices.tsx` | Edge Devices | Yes |
| `/admin/vision/map` | `pages/admin/vision/map.tsx` | Factory Map | Yes |
| `/admin/vision/rules` | `pages/admin/vision/rules.tsx` | AI Safety Rules | Yes |
| `/admin/vision/events` | `pages/admin/vision/events.tsx` | Safety Events | Yes |
| `/admin/vision/alerts` | `pages/admin/vision/alerts.tsx` | AI Alerts | Yes |
| `/admin/vision/analytics` | `pages/admin/vision/analytics.tsx` | Vision Analytics | Yes |
| `/admin/vision/settings` | `pages/admin/vision/settings.tsx` | Vision Settings | Yes |

---

## 5. Data Architecture

### Storage Layers

| Layer | Technology | What is Stored |
|---|---|---|
| Primary | localStorage | Settings, safety signs, fire protection data, vision store, current user session |
| Backup | IndexedDB (SafetyBoardBackups) | Compressed ZIP backup blobs + metadata |
| API/Cache | TanStack React Query | Users, posts, sections, forms, reports, documents, activity logs, permissions |
| In-Memory | React useState | NCRs, safety reports, employees (mock data — session only) |

### Single Source of Truth

| Entity | Source |
|---|---|
| System Settings & Branding | `DataContext` → `localSettings` → `localStorage['board_settings']` |
| Current Session | `DataContext` → `currentUser` → `localStorage['board_current_user']` |
| Safety Signs | `DataContext` → `safetySigns` → `localStorage['board_safety_signs']` |
| Fire Protection | `fire-protection-store.ts` → `localStorage` |
| Vision/Camera | `vision-store.ts` → `localStorage` |
| Users/Posts/Documents | TanStack Query → Backend API |
| NCRs | `DataContext` → `ncrs` (React useState — in-memory) |
| Safety Reports (SOR) | `DataContext` → `safetyReports` (React useState — in-memory) |
| Backups | `BackupService` → IndexedDB `SafetyBoardBackups` |

---

## 6. Data Relationships

```
User (Role)
   ├── hasPermission(module, action) → PermissionRow[role x module x actions[]]
   └── ActivityLog[action, details, module, timestamp]

Employee
   ├── departmentId → Department
   ├── Training Records
   ├── License Records
   └── Equipment Authorizations

Safety Report (SOR)
   ├── reportNo (auto-generated with prefix)
   ├── department, location, riskLevel
   └── images[] (base64 inline)

NCR
   ├── department, location
   ├── correctiveActions[] → NCRActionRow
   └── images[] (base64)

Incident (RCA)
   ├── fiveWhys[] → FiveWhyItem[whyNo, question, answer]
   ├── fishbone[] → FishboneCategory[Man, Machine, Method, Material, Environment]
   └── correctiveActions[] → {action, responsible, targetDate, status}

FireEquipmentItem
   ├── FireInspectionRecord (equipmentId ref)
   ├── FirePumpTestRecord (pumpId ref)
   ├── FireMaintenanceWorkOrder (equipmentId ref)
   └── FireAlertItem (equipmentRef)

SafetySign
   ├── revisions[] → SignRevision[revisionNumber, status, notes]
   ├── relatedDocumentIds[] → DocumentItem
   └── printCount / viewCount (tracked on each interaction)
```

---

## 7. Analytics Architecture

```
Data Source (localStorage / API)
   ↓
DataContext (data-context.tsx)
   ↓
Page Component (dashboard.tsx)
   ↓
AnalyticsStats calculation:
   - totalReports, openReports, highRiskReports
   - totalNCRs, openNCRs, closedNCRs, ncrClosureRate
   - riskDistribution {low, medium, high, critical}
   - statusDistribution, categoryDistribution
   - departmentDistribution, ncrSeverity
   - trendData[] {month, reports, ncrs}
   ↓
Recharts Components (Bar, Pie, Area)
   ↓
Dashboard UI
```

---

## 8. Dashboard Specification `/admin/dashboard`

**KPI Cards:**
- Total Safety Reports
- Open Reports
- High Risk Reports
- Total NCRs
- Open NCRs
- NCR Closure Rate %
- Total Documents
- System Activities

**Charts:**
- Risk Distribution (Pie) — Low/Medium/High/Critical
- NCR Status (Bar) — draft/submitted/assigned/in_progress/closed
- Monthly Trend (Area) — SOR reports + NCRs over time
- Category Distribution
- Department Distribution

**Other Widgets:**
- IncidentPyramid component (safety pyramid visualization)
- Recent Reports table
- Recent NCRs table

---

## 9. Fire Protection Module `/admin/fire-protection`

```
Equipment Categories:
├── Extinguisher (powder, CO2, water, foam)
├── Fire Pump (diesel, electric, jockey)
├── Alarm Panel
└── Hydrant / Hose Reel

Workflow:
Equipment → Inspection (Checklist: pass/fail) → Finding → Maintenance WO

Data Types (src/types/fire-protection.ts):
├── FireEquipmentItem
├── FireInspectionRecord + ChecklistItemResult
├── FirePumpTestRecord
├── FireAlarmZone
├── FireMaintenanceWorkOrder
├── FireAlertItem (inspection_due, maintenance_due, expired, pump_failure)
└── FireProtectionSettings

Store: src/lib/fire-protection-store.ts → localStorage
```

---

## 10. Backup & Restore Architecture

### What is Backed Up

| Category | Keys |
|---|---|
| Settings | Keys containing: settings, config, theme, branding |
| Database | All other localStorage keys |
| Folder Structure | files/documents, files/images, files/reports, files/training, files/uploads |
| Manifest | id, date, version, createdBy, recordCount, fileCount |
| Checksum | SHA-256 of entire ZIP blob |

### Backup Flow

```
Collect localStorage → Classify (settings / database)
→ Create JSZip → Add database-backup.json
→ Add settings.json → Add manifest.json
→ Compress (blob) → SHA-256 checksum
→ Save to IndexedDB (SafetyBoardBackups)
→ Trigger .zip download
```

### Restore Flow

```
Upload .zip file → JSZip.loadAsync()
→ Validate manifest.json (existence check)
→ Read database/database-backup.json
→ Write all keys to localStorage
→ Read settings/settings.json
→ Write all settings to localStorage
→ Reload application
```

**Service:** `src/lib/backup-service.ts`
**Component:** `src/components/backup-restore-module.tsx`
**IndexedDB:** `SafetyBoardBackups` / store: `backups` / keyPath: `metadata.id`

---

## 11. Safety Signs `/admin/reports-documents/safety-signs`

**Categories:** Fire Safety, PPE, Machinery, Traffic, Chemical, General, Electrical

**Document Structure:**
- Document Number: `SS-{CAT}-{NNN}` (e.g., SS-FS-001)
- Revision: Rev.01, Rev.02, ...
- Status: Active / Under Review / Archived
- Bilingual: titleAr + titleEn + safetyInstructionsAr[] + safetyInstructionsEn[]

**Features:**
- Revision history tracking (full revisions[])
- Print count + View count (tracked in localStorage)
- QR code (links to documentNumber)
- PDF/Print generation
- Image attachment
- Related document links

**Routes:**
- Primary: `/admin/reports-documents/safety-signs`
- Alias: `/admin/safety-signs`

---

## 12. Security Architecture

| Aspect | Implementation |
|---|---|
| Authentication | Mock local auth (3 hardcoded demo users) + optional `/api/auth/me` session |
| CSRF Protection | `X-CSRF-Token` header from `/api/auth/csrf` on all non-GET requests |
| Session Storage | `localStorage['board_current_user']` |
| Authorization | `hasPermission(module, action)` — admin bypasses all; others check permissionRows |
| Role System | admin / manager / editor / viewer |
| Protected Routes | `<ProtectedRoute>` redirects unauthenticated to `/admin/login` |
| Input Handling | `escapeHtml()` in print templates |
| Password Handling | Passwords stripped from user object before storing in context/localStorage |

### Demo Credentials

| Email | Password | Role |
|---|---|---|
| admin@board.com | password123 | Admin |
| safety@board.com | password123 | Manager |
| eng@board.com | password123 | Editor |

---

## 13. Permissions Matrix

| Module | Admin | Manager | Editor | Viewer |
|---|---|---|---|---|
| Dashboard | Yes | Yes | Yes | Yes |
| Employees | Yes | Yes | Yes | Yes |
| Safety Reports (SOR) | Yes | reports:read | - | - |
| Incidents / RCA | Yes | Yes | Yes | Yes |
| Risk Assessment | Yes | Yes | Yes | Yes |
| NCR | Yes | ncr:read | - | - |
| Safety Pyramid | Yes | Yes | Yes | Yes |
| Escalations | Yes | Yes | Yes | Yes |
| Inspections | Yes | Yes | Yes | Yes |
| Audits / ISO | Yes | Yes | Yes | Yes |
| Compliance | Yes | Yes | Yes | Yes |
| LOTO | Yes | Yes | Yes | Yes |
| Permits | Yes | docs or reports:read | - | - |
| Licenses | Yes | Yes | Yes | Yes |
| Equipment Auth | Yes | Yes | Yes | Yes |
| Training | Yes | Yes | Yes | Yes |
| Fire Protection | Yes | Yes | Yes | Yes |
| Documents/Files | Yes | Yes | Yes | Yes |
| Safety Signs | Yes | Yes | Yes | Yes |
| Enterprise Reports | Yes | Yes | Yes | Yes |
| Contracts | Yes | docs:read | - | - |
| Forms | Yes | forms:read | - | - |
| Invoices | Yes | docs:read | - | - |
| Sections | Yes | sections:read | - | - |
| Posts | Yes | content:read | - | - |
| Inbox / Email | Yes | settings:read | - | - |
| Users | Yes | users:read | - | - |
| Activity Log | Yes | activity:read | - | - |
| Plants / Sites | Yes | settings:read | - | - |
| Settings | Yes | settings:read | - | - |
| Vision | Yes | Yes | Yes | Yes |

---

## 14. File Structure

```
src/
├── App.tsx                    → Root router (all 56 routes defined here)
├── main.tsx                   → React entry point
├── index.css                  → Global CSS, design tokens, @media print rules
├── types.ts                   → Shared types (SafetySign, etc.)
│
├── lib/
│   ├── data-context.tsx       → PRIMARY: Global state + auth + all CRUD
│   ├── backup-service.ts      → Backup/Restore (JSZip + IndexedDB + SHA-256)
│   ├── fire-protection-store.ts → Fire protection state store
│   ├── vision-store.ts        → Vision/camera AI system state
│   ├── ocr-parser.ts          → OCR (Tesseract.js)
│   ├── queryClient.ts         → TanStack Query config + CSRF + apiRequest
│   └── utils.ts               → cn() utility
│
├── types/
│   └── fire-protection.ts     → Fire protection TypeScript types
│
├── hooks/
│   ├── use-mobile.ts          → Mobile breakpoint hook
│   └── use-toast.ts           → Toast hook
│
├── components/
│   ├── layouts/
│   │   └── admin-layout.tsx   → Sidebar + Header + Navigation
│   ├── ui/                    → ShadCN UI components (40+ components)
│   ├── training/              → Training-specific components
│   ├── backup-restore-module.tsx
│   ├── camera-health-dashboard.tsx
│   ├── camera-stream.tsx
│   ├── compliance-dashboard.tsx
│   ├── document-thumbnail.tsx
│   ├── error-boundary.tsx
│   ├── export-preview-modal.tsx
│   ├── file-preview-dialog.tsx
│   ├── global-print-template.tsx  → Print header/footer HTML generators
│   ├── global-search-dialog.tsx   → Ctrl+K global search
│   ├── incident-pyramid.tsx       → Safety pyramid chart
│   ├── print-share-dialog.tsx     → Unified print/PDF/share dialog
│   └── universal-file-viewer.tsx
│
└── pages/
    ├── home.tsx
    ├── not-found.tsx
    ├── public-report.tsx
    └── admin/
        ├── login.tsx, dashboard.tsx, incidents.tsx, reports.tsx ...
        ├── ncr/ (list.tsx, form.tsx)
        ├── escalations/ (dashboard.tsx, history.tsx, matrix.tsx)
        ├── safety-signs/ (directory)
        └── vision/ (10 pages)
```

---

## 15. Technology Stack

| Category | Technology | Version |
|---|---|---|
| Language | TypeScript | ~5.9.3 |
| Framework | React | ^19.2.0 |
| Router | Wouter | ^3.9.0 |
| State/Data | TanStack React Query | ^5.90 |
| UI Components | Radix UI (40+ primitives) | Various |
| Styling | Tailwind CSS | ^3.4.19 |
| Animations | Framer Motion | ^12.36 |
| Icons | Lucide React | ^0.562 |
| Charts | Recharts | ^2.15 |
| PDF | jsPDF + jsPDF-AutoTable | ^4.2 / ^5.0 |
| ZIP | JSZip | ^3.10 |
| OCR | Tesseract.js | ^7.0 |
| QR Code | qrcode.react | ^4.2 |
| Forms | React Hook Form + Zod | ^7.70 / ^4.3 |
| Date | date-fns | ^4.1 |
| Build | Vite | ^7.2.4 |
| Linting | ESLint | ^9.39 |
| Toast | Sonner | ^2.0.7 |
| Themes | next-themes | ^0.4.6 |

---

## 16. Environment Setup

### Quick Start

```bash
npm install
npm run dev
# Available at: http://localhost:3000
```

### Scripts

```bash
npm run dev        # Dev server (port 3000, all interfaces)
npm run build      # TypeScript check + Vite production build
npm run lint       # ESLint check
npm run preview    # Preview production build
```

### Environment Variables

```
VITE_SITE_NAME=ABDULKAREM SAFETY BOARD
```

### Development vs Production

| Aspect | Development | Production |
|---|---|---|
| Server | Vite HMR port 3000 | Static dist/ served by any web server |
| Bundle | Unbundled | ~2.8 MB JS, ~184 KB CSS |
| API | Optional (falls back to mock) | Optional |

---

## 17. Audit Log

Written via `logActivity(action, details, module)` in DataContext.

| Field | Notes |
|---|---|
| action | e.g., "Create User", "Update Safety Sign" |
| details | Human-readable description |
| performedBy | User ID |
| performedByName | User display name |
| module | users / content / sections / forms / reports / settings / activity / ncr / documents |
| timestamp | Auto-generated ISO string |

Stored via: `POST /api/activity-logs`
Viewed at: `/admin/activity`

---

## 18. Architecture Cleanup — 2026-08-11

### Fixed

- **Black Block in Print (Critical)** — Radix Dialog Overlay was rendered as solid black block during print. Fixed by targeting `[role="dialog"]` directly and hiding all `div:not([role="dialog"])` siblings inside `[data-radix-portal]`.
- **Dark Mode Colors in Print** — Added CSS variable overrides inside `@media print` to force light theme for all elements regardless of active dark/light mode.
- **RCA 4-Tab Print** — Added `print-all-tabs` CSS utility to force all `[role="tabpanel"]` visible during print and hide the tab list. Applied in `incidents.tsx`.
- **Sidebar Logo Size** — Reduced expanded logo 25% (`h-12 → h-9`, `w-72px → w-54px`). Collapsed logo (`h-11 → h-[34px]`). Added `object-contain`.

### Verified

- Build: PASSING (0 errors)
- Lint: CLEAN (0 warnings)
- TypeScript: 0 type errors
- 56 routes verified against App.tsx
- All data sources verified against data-context.tsx

---

## 19. Known Limitations

```
1. Authentication is demo-only (3 hardcoded users in data-context.tsx).
   Production auth requires backend integration.

2. Most HSE modules use in-memory or localStorage state.
   Data is lost on browser clear. Backend DB required for production.

3. Production bundle is ~2.8 MB (>500KB Vite warning).
   Recommend dynamic import() code splitting.

4. File uploads stored as base64 in localStorage.
   Not suitable for large files in production.

5. No automated test suite (unit / integration / e2e).
   Manual testing only.

6. OCR (Tesseract.js) is client-side and slow for large documents.
   Recommend server-side OCR for production.

7. Vision/Camera module is a UI prototype.
   No real RTSP stream integration — requires WebRTC backend.

8. Email sending requires a configured SMTP backend.
   Client-side config is stored; sending is server-side.
```

---

## 20. Development Readiness

| Check | Status | Notes |
|---|---|---|
| Build | PASSING | Exit code 0 |
| TypeScript | PASSING | 0 type errors |
| Lint | PASSING | 0 ESLint errors |
| Routes | VERIFIED | All 56 routes confirmed in App.tsx |
| Core Modules | FUNCTIONAL | Dashboard, Reports, Incidents, Fire, Licenses, Vision |
| Print System | FIXED | Black block resolved, all 4 tabs print correctly |
| Backup/Restore | IMPLEMENTED | JSZip + IndexedDB + SHA-256 checksum |
| Security | MOCK ONLY | Demo auth, not production-ready |
| Automated Tests | NONE | No test suite present |
| Backend | OPTIONAL | System works without backend; some features degrade |

---

## FINAL STATUS

```
Development Status: DEVELOPMENT READY
System Version:     2.4.0
Last Audit:         2026-08-11
Build:              PASSING
Lint:               CLEAN
TypeScript:         0 ERRORS
Routes:             56 ROUTES VERIFIED
Print System:       FIXED
```

> The system is **development ready** with a complete, functional UI across all 56 routes.
> Production deployment requires backend integration for authentication, persistent storage, and email.
# ABDULKAREM-SAFETY-BOARD-2026
# ABDULKAREM-SAFETY-BOARD-2026
