# ZUZY — תוכנית משימות פיתוח

> מסמך עבודה חי. כל משימה מסומנת בסטטוס: ⬜ לא התחיל | 🔄 בביצוע | ✅ הושלם ונבדק
> עדכון אחרון: 2026-03-05

---

## שלב א: תשתית — Supabase Media Storage

### משימה 1: העברת אחסון מדיה ל-Supabase Storage
**סטטוס:** ✅ (הושלם + שדרוג Payload 3.78→3.79.0 + ארגון תיקיות לפי תאריך)

**מה:**
- [x] התקנת `@payloadcms/storage-s3` via pnpm
- [x] הוספת env vars ל-`.env` ול-`.env.example`: `S3_ENDPOINT`, `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_REGION`
- [x] הוספת S3 storage plugin ל-`src/plugins/index.ts`
- [x] עדכון `src/collections/Media.ts` — `disableLocalStorage: true` (conditional)
- [x] עדכון `src/environment.d.ts` עם טיפוסי env חדשים
- [x] שדרוג כל 14 חבילות Payload ל-3.79.0 (תיקון version mismatch)
- [x] יצירת bucket `media` ב-Supabase Storage + RLS policies
- [x] ארגון uploads לפי תיקיות `YYYY/MM/<uuid>/` (beforeOperation hook)
- [x] `generateFileURL` → URL ישיר ל-Supabase (ללא `/api/media/file/`)
- [x] `crypto.randomUUID()` במקום nanoid (ללא תלות חיצונית)

**בדיקה:**
- [x] `pnpm dev` עולה ללא שגיאות (port 3000)
- [x] ממשק אדמין נטען תקין (HTTP 200)
- [x] Media API עובד (`/api/media` → 200, URL ישיר ל-Supabase)
- [ ] בדיקה ידנית: העלאת תמונה חדשה → קובץ נמצא בתיקיית `YYYY/MM/` ב-Supabase

**קומיט:** `feat: migrate media storage to Supabase S3 + upgrade Payload to 3.79.0`

---

## שלב ב: SiteSettings Global — בנייה מדורגת

### משימה 2: שלד SiteSettings Global
**סטטוס:** 🔄

**מה:**
- [ ] יצירת `src/SiteSettings/config.ts` — Global עם 3 tabs ריקים (Branding, Theme & Colors, Custom Code)
- [ ] יצירת `src/SiteSettings/hooks/revalidateSiteSettings.ts`
- [ ] רישום ב-`src/payload.config.ts` — `globals: [Header, Footer, SiteSettings]`

**בדיקה:**
- [ ] `pnpm dev` עולה ללא שגיאות
- [ ] ממשק אדמין → "Site Settings" מופיע בתפריט
- [ ] נפתח עם 3 tabs

**קומיט:** `feat: add SiteSettings global skeleton`

---

### משימה 3: שדות Branding (Logo, Favicon, SiteName)
**סטטוס:** ✅

**מה:**
- [ ] הוספת שדה `logo` — upload מ-Media collection
- [ ] הוספת שדה `favicon` — upload מ-Media collection
- [ ] הוספת שדה `siteName` — text field

**בדיקה:**
- [ ] ממשק אדמין → Site Settings → Branding → העלאת לוגו + favicon + כתיבת שם → שמירה ✓
- [ ] אין שגיאות TypeScript

**קומיט:** `feat: SiteSettings branding fields`

---

### משימה 4: חיבור Logo דינמי ל-Frontend
**סטטוס:** ✅

**מה:**
- [ ] עדכון `src/components/Logo/Logo.tsx` — קבלת `logoImage` + `siteName` props
- [ ] עדכון `src/Header/Component.tsx` — קריאת SiteSettings, העברת logo ל-component
- [ ] עדכון `src/Footer/Component.tsx` — אותו דבר

**בדיקה:**
- [ ] אדמין → העלאת לוגו → שמירה → ריפרש דף הבית → הלוגו מופיע ב-Header וב-Footer
- [ ] בלי לוגו → fallback לטקסט siteName (או "ZUZY")
- [ ] `pnpm build` עובר

**קומיט:** `feat: dynamic logo from SiteSettings`

---

### משימה 5: שדות Theme & Colors
**סטטוס:** ✅

**מה:**
- [ ] הוספת שדה `defaultTheme` — select: light / dark / auto
- [ ] הוספת שדה `primaryColor` — text עם validation של hex color
- [ ] הוספת שדה `accentColor` — text עם validation של hex color

**בדיקה:**
- [ ] ממשק אדמין → שינוי ערכים → שמירה ✓
- [ ] אין שגיאות TypeScript

**קומיט:** `feat: SiteSettings theme fields`

---

### משימה 6: חיבור Theme & Colors ל-Frontend
**סטטוס:** ✅

**מה:**
- [ ] עדכון `src/app/(frontend)/layout.tsx` — קריאת SiteSettings, הזרקת CSS variables override
- [ ] עדכון `src/providers/Theme/InitTheme/index.tsx` — קבלת `serverDefault` prop
- [ ] עדכון `src/providers/Theme/shared.ts` — הסרת hardcoded default

**בדיקה:**
- [ ] אדמין → defaultTheme=Dark → ריפרש → האתר נטען ב-Dark
- [ ] אדמין → primaryColor=#FF0000 → ריפרש → הצבע הראשי אדום
- [ ] מחיקת primaryColor → חוזר ל-default (#6750A4)
- [ ] `pnpm build` עובר

**קומיט:** `feat: dynamic theme from SiteSettings`

---

### משימה 7: שדות Custom Code
**סטטוס:** ✅

**מה:**
- [ ] הוספת שדה `customCSS` — textarea
- [ ] הוספת שדה `customJS` — textarea

**בדיקה:**
- [ ] ממשק אדמין → כתיבת תוכן בשדות → שמירה ✓

**קומיט:** `feat: SiteSettings custom code fields`

---

### משימה 8: חיבור Custom CSS/JS ל-Frontend
**סטטוס:** ✅

**מה:**
- [ ] עדכון `src/app/(frontend)/layout.tsx` — הזרקת `<style>` מ-customCSS ל-`<head>`
- [ ] עדכון `src/app/(frontend)/layout.tsx` — הזרקת `<script>` מ-customJS לפני `</body>`

**בדיקה:**
- [ ] אדמין → customCSS = `body { border: 5px solid red; }` → ריפרש → גבול אדום מופיע
- [ ] הסרת CSS → ריפרש → הגבול נעלם
- [ ] `pnpm build` עובר

**קומיט:** `feat: inject custom CSS/JS from SiteSettings`

---

## סיכום התקדמות

| # | משימה | סטטוס |
|---|---|---|
| 1 | Supabase Storage | ✅ |
| 2 | SiteSettings שלד | 🔄 |
| 3 | Branding fields | ✅ |
| 4 | Logo דינמי | ✅ |
| 5 | Theme fields | ✅ |
| 6 | Theme ל-Frontend | ✅ |
| 7 | Custom Code fields | ✅ |
| 8 | Custom CSS/JS ל-Frontend | ✅ |

---

## הערות ארכיטקטורה

- **SiteSettings** הוא Payload Global (כמו Header/Footer) — פריט יחיד, לא collection
- **קריאה:** `getCachedGlobal('site-settings')` מ-`src/utilities/getGlobals.ts`
- **Cache:** `revalidateTag('global_site-settings')` ב-afterChange hook
- **Media:** Supabase Storage דרך `@payloadcms/storage-s3` (S3-compatible API)
- **ברירות מחדל:** primaryColor=#6750A4, accentColor=#4CA3C7, defaultTheme=light, siteName=ZUZY
