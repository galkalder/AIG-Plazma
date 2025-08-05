# Plazma - Call Center Dashboard

לוח בקרה דינמי למרכז שירות עם React TypeScript ו-Node.js

## תיאור הפרויקט

Plazma הוא לוח בקרה מתקדם למרכז שירות שמציג נתונים בזמן אמת על צוותים שונים. המערכת מקבלת פרמטרים מה-URL ומציגה רק את הצוותים המבוקשים.

## תכונות עיקריות

- **טבלה דינמית**: מספר ה-DIVs נקבע לפי פרמטרים ב-URL
- **עיצוב מודרני**: UI יפה עם אנימציות וסגנון גרפי מתקדם
- **נתונים בזמן אמת**: חיבור ל-MSSQL לקבלת נתונים עדכניים
- **סיווג צוותים**: מיזוג נתונים משני שרתי MSSQL שונים
- **רענון אוטומטי**: הנתונים מתעדכנים כל 30 שניות

## מבנה הפרויקט

```
Plazma/
├── client/                 # React TypeScript Frontend
│   ├── src/
│   │   ├── components/     # קומפוננטות React
│   │   ├── hooks/         # Custom Hooks
│   │   ├── types/         # TypeScript Types
│   │   └── App.tsx        # קומפוננט ראשי
├── server/                # Node.js Backend
│   ├── src/
│   │   ├── routes/        # Express Routes
│   │   ├── services/      # Business Logic
│   │   └── config/        # Database Configuration
└── package.json           # Root Package Configuration
```

## התקנה והפעלה

### דרישות מקדימות
- Node.js (גרסה 16 ומעלה)
- npm או yarn
- גישה לשרתי MSSQL

### התקנה

1. **התקנת תלויות:**
```bash
npm run install-all
```

2. **הגדרת משתני סביבה:**
צור קובץ `.env` בתיקיית `server/`:
```env
PORT=5000
CLIENT_URL=http://localhost:3000
```

3. **הפעלת השרתים:**
```bash
# הפעלת שני השרתים במקביל
npm run dev

# או בנפרד:
npm run server  # Backend
npm run client  # Frontend
```

## שימוש

### URL Parameters
המערכת מקבלת פרמטר `teams` ב-URL:
- `http://localhost:3000` - מציג את כל הצוותים
- `http://localhost:3000?teams=TEAM1,TEAM2` - מציג רק צוותים ספציפיים

### מבנה נתונים
כל צוות מציג:
- **שם הצוות**: כותרת ראשית
- **זמן המתנה ממוצע**: תת-כותרת
- **שיחות ממתינות**: כמות
- **סה"כ סוכנים**: מספר כולל
- **סוכנים זמינים**: מספר זמינים
- **אחוז זמינות**: חישוב אוטומטי

## ארכיטקטורת בסיס הנתונים

### שרת RT (CCASQLIS)
- **Database**: `IVI_GENESYSCLD_RT`
- **Stored Procedure**: `AIGGETONLINEDATA`
- **תפקיד**: נתונים בזמן אמת

### שרת EDW (ISLPDWH01)
- **Database**: `AIG_EDW`
- **Views**: 
  - `DIM_VDN_PLZ`
  - `TIM_CALLCENTERS_V`
- **תפקיד**: סיווג צוותים

### מיזוג נתונים
המערכת מיזגת נתונים לפי השדה `USERTEAMCODE` בין שני השרתים.

## פיתוח

### Backend (Node.js + TypeScript)
- **Express.js**: שרת API
- **MSSQL**: חיבור לבסיס נתונים
- **TypeScript**: טיפוסים מחמירים
- **CORS**: תמיכה ב-Cross-Origin

### Frontend (React + TypeScript)
- **React 18**: ספריית UI
- **TypeScript**: טיפוסים מחמירים
- **Styled Components**: עיצוב מודרני
- **Axios**: בקשות HTTP
- **Custom Hooks**: לוגיקה נפרדת

### קומפוננטות עיקריות
- `TeamDashboard`: לוח הבקרה הראשי
- `TeamCard`: כרטיס צוות בודד
- `Header`: כותרת עם מידע על צוותים
- `LoadingSpinner`: אינדיקטור טעינה
- `ErrorMessage`: הצגת שגיאות

## תחזוקה

### לוגים
המערכת מפיקה לוגים מפורטים עבור:
- שגיאות חיבור לבסיס נתונים
- שגיאות API
- ביצועים

### ביצועים
- רענון אוטומטי כל 30 שניות
- טעינה מקדימה של נתונים
- עיצוב רספונסיבי

## רישיון

MIT License - פרויקט פתוח לשימוש חופשי

## צוות פיתוח

- Gal and May
- Plazma Development Team 