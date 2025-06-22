// נתוני האירועים וההיסטוריה
let universeData = [];
let timelineData = [];
let currentPerspective = 'cosmic';
let currentCategory = 'all';
let zoomLevel = 1;
let quizData = [];
let currentQuizIndex = 0;
let quizScore = 0;
let isQuizActive = false;

// URL-ים לקבצי הנתונים
const DATA_URLS = {
    json: 'https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/4397e0bff005bca3e0708b0092caa62e/ed180f92-d81b-4d8f-9cfa-5171a8d92301/c74f14b3.json',
    csv: 'https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/4397e0bff005bca3e0708b0092caa62e/828a2be7-2735-472d-8459-4782aed251c5/98141f10.csv'
};

// טעינת הנתונים בהתחלה
document.addEventListener('DOMContentLoaded', async function() {
    // יצירת נתונים ראשונים מיד
    createFallbackData();
    initializeApp();
    
    // טעינת נתונים חיצוניים ברקע
    try {
        await loadExternalData();
        initializeEventCards(); // עדכון כרטיסיות עם הנתונים החדשים
    } catch (error) {
        console.log('משתמש בנתונים הסטטיים');
    }
});

// טעינת נתונים חיצוניים
async function loadExternalData() {
    try {
        const jsonResponse = await fetch(DATA_URLS.json);
        if (jsonResponse.ok) {
            const newData = await jsonResponse.json();
            if (newData && newData.length > 0) {
                universeData = newData;
            }
        }
    } catch (error) {
        console.log('לא ניתן לטעון נתונים חיצוניים, משתמש בנתונים הסטטיים');
    }
}

// נתונים סטטיים מלאים
function createFallbackData() {
    universeData = [
        {
            title: "המפץ הגדול",
            date: "לפני 13.7 מיליארד שנה",
            category: "universe",
            description: "רגע יצירת היקום. כל החומר והאנרגיה שמוכרים לנו נוצרו ברגע יוצא דופן זה. הטמפרטורה הייתה אינסופית וכל פיזיקה שאנו מכירים החלה כאן.",
            facts: ["טמפרטורה: מיליארדי מעלות צלזיוס", "גודל ראשוני: קטן מפרוטון", "התרחבות מהירה מאוד תוך שברירי שנייה", "יצירת החלל והזמן"],
            importance: 10,
            yearsAgo: 13700000000
        },
        {
            title: "היווצרות האטומים הראשונים",
            date: "380,000 שנה לאחר המפץ הגדול",
            category: "universe",
            description: "היקום התקרר מספיק כדי לאפשר היווצרות אטומי מימן והליום ראשונים. זה הרגע שבו האור החל לנוע חופשית ביקום.",
            facts: ["טמפרטורה ירדה ל-3,000 מעלות צלזיוס", "האור החל לנוע חופשית", "יצירת קרינת הרקע הקוסמית", "75% מימן, 25% הליום"],
            importance: 8,
            yearsAgo: 13699620000
        },
        {
            title: "היווצרות הכוכבים הראשונים",
            date: "לפני 13.4 מיליארד שנה",
            category: "universe",
            description: "הכוכבים הראשונים נוצרו מענני גז מימן והליום. הם היו עצומים וחיו חיים קצרים וסוערים.",
            facts: ["כוכבים ענקיים בגודלם", "ללא יסודות כבדים", "חיים קצרים של מיליוני שנים", "מקור היישודות הכבדים הראשונים"],
            importance: 8,
            yearsAgo: 13400000000
        },
        {
            title: "פיצוצי סופרנובה",
            date: "לפני 12 מיליארד שנה",
            category: "universe",
            description: "פיצוצי הכוכבים הראשונים יצרו ומפזרו יסודות כבדים ביקום - הבסיס לכוכבי לכת ולחיים.",
            facts: ["יצירת יסודות כבדים כמו פחמן וחמצן", "הפצה של חומר ביקום", "מקור המתכות והמינרלים", "זרעים לדור הבא של כוכבים"],
            importance: 8,
            yearsAgo: 12000000000
        },
        {
            title: "היווצרות השמש",
            date: "לפני 4.6 מיליארד שנה",
            category: "universe",
            description: "השמש שלנו נוצרה מהתמוטטות ענן גז ואבק. היא כוכב דור שלישי שמכיל יסודות כבדים מכוכבים קודמים.",
            facts: ["מסה: 99.86% ממסת מערכת השמש", "טמפרטורת ליבה: 15 מיליון מעלות", "שורפת 600 מיליון טון מימן בשנייה", "צפויה לחיות עוד 5 מיליארד שנה"],
            importance: 9,
            yearsAgo: 4600000000
        },
        {
            title: "היווצרות כדור הארץ",
            date: "לפני 4.5 מיליארד שנה",
            category: "earth",
            description: "כדור הארץ נוצר מהצטברות גז, אבק ואסטרואידים סביב השמש הצעירה. התהליך אורך עשרות מיליוני שנים.",
            facts: ["נוצר בתהליך צבירה הדרגתית", "הירח נוצר בעקבות התנגשות עם גוף בגודל מאדים", "התקרר במשך מאות מיליוני שנים", "יצירת האטמוספירה הראשונית"],
            importance: 9,
            yearsAgo: 4500000000
        },
        {
            title: "הופעת החיים הראשונים",
            date: "לפני 3.8 מיליארד שנה",
            category: "life",
            description: "הופעת החיידקים הראשונים בימים הקדמוניים. זוהי תחילת הביולוגיה על פני כדור הארץ.",
            facts: ["חיידקים פשוטים בים", "ללא חמצן באטמוספירה", "מקור כל החיים הנוכחיים", "שימוש בכימיקלים לאנרגיה"],
            importance: 9,
            yearsAgo: 3800000000
        },
        {
            title: "התפתחות הפוטוסינתזה",
            date: "לפני 2.5 מיליארד שנה",
            category: "life",
            description: "החיידקים הכחולים-ירוקים פיתחו פוטוסינתזה - היכולת לייצר מזון מאור השמש ולהפיק חמצן.",
            facts: ["שינוי הרכב האטמוספירה", "הופעת חמצן", "אפשר חיים מורכבים יותר", "יצירת שכבת האוזון"],
            importance: 8,
            yearsAgo: 2500000000
        },
        {
            title: "הפיצוץ הקמבריוני",
            date: "לפני 550 מיליון שנה",
            category: "life",
            description: "התפרצות מגוון צורות חיים מורכבות בתקופה קצרה יחסית. רוב הקבוצות של בעלי חיים הופיעו בתקופה זו.",
            facts: ["התפתחות עיניים ושלדים", "מגוון עצום של צורות", "תחילת המאובנים הברורים", "אבולוציה מהירה"],
            importance: 7,
            yearsAgo: 550000000
        },
        {
            title: "יישוב היבשה",
            date: "לפני 400 מיליון שנה",
            category: "life",
            description: "צמחים ובעלי חיים התחילו לעזוב את הים ולהתיישב על היבשה. זה שינה את פני כדור הארץ לחלוטין.",
            facts: ["צמחים ראשונים על היבשה", "בעלי חיים עם ריאות", "יצירת יערות", "שינוי נוף כדור הארץ"],
            importance: 7,
            yearsAgo: 400000000
        },
        {
            title: "עידן הדינוזאורים",
            date: "לפני 250-65 מיליון שנה",
            category: "life",
            description: "הדינוזאורים שלטו בכדור הארץ במשך כ-185 מיליון שנה. הם התפתחו למגוון עצום של צורות וגדלים.",
            facts: ["מכוכב לכת של זוחלים קטנים לענקים", "התפתחות הטיסה", "יונקים קטנים חיו לצדם", "מגוון אקלימי גדול"],
            importance: 6,
            yearsAgo: 157500000
        },
        {
            title: "הכחדת הדינוזאורים",
            date: "לפני 65 מיליון שנה",
            category: "life",
            description: "אסטרואיד ענק התנגש בכדור הארץ וגרם להכחדה המונית. זה פתח את הדרך לשגשוג היונקים.",
            facts: ["אסטרואיד בקוטר 10 ק\"מ", "חורף גרעיני בן שנים", "הכחדת 75% מהמינים", "תחילת עידן היונקים"],
            importance: 7,
            yearsAgo: 65000000
        },
        {
            title: "הליכה על שתיים",
            date: "לפני 7 מיליון שנה",
            category: "human",
            description: "אבות האדם בשטחי אפריקה התחילו ללכת זקופים על שתי רגליים. זה היה צעד מכריע בהתפתחות האנושית.",
            facts: ["שחרור הידיים לשימוש בכלים", "יעילות אנרגטית בהליכה", "קור גוף משופר", "תחילת ההתפתחות המורכבת"],
            importance: 7,
            yearsAgo: 7000000
        },
        {
            title: "תקופת האבן",
            date: "לפני 2.6 מיליון שנה",
            category: "human",
            description: "תחילת ייצור כלים מאבן. זו הייתה תחילת הטכנולוגיה האנושית וחשיבה מופשטת.",
            facts: ["כלי אבן פשוטים", "תחילת הטכנולוגיה", "שימוש בכלים לציד", "התפתחות המוח"],
            importance: 7,
            yearsAgo: 2600000
        },
        {
            title: "שליטה באש",
            date: "לפני 800,000 שנה",
            category: "human",
            description: "האדם למד לשלוט באש - מהפכה שאפשרה בישול, חימום ואור. זה שינה את אורח החיים לחלוטין.",
            facts: ["בישול מזון", "הגנה מפני טורפים", "אור בלילה", "התחממות באזורים קרים"],
            importance: 8,
            yearsAgo: 800000
        },
        {
            title: "הופעת ההומו סאפיינס",
            date: "לפני 300,000 שנה",
            category: "human",
            description: "הופעת האדם המודרני באפריקה. מוח גדול, יכולת לשפה מורכבת וחשיבה סמלית מתקדמת.",
            facts: ["מוח בנפח 1,400 סמ\"ק", "יכולת לשפה מורכבת", "שימוש בכלים מתקדמים", "התפתחות תרבות"],
            importance: 8,
            yearsAgo: 300000
        },
        {
            title: "נדידה מאפריקה",
            date: "לפני 100,000 שנה",
            category: "human",
            description: "האדם המודרני החל לנדוד מאפריקה ולהתפשט ברחבי העולם. זה היה תחילת כיבוש כדור הארץ.",
            facts: ["הגעה לאסיה ואירופה", "הסתגלות לאקלימים שונים", "התפתחות תרבויות מקומיות", "פיתוח כלים מתמחים"],
            importance: 7,
            yearsAgo: 100000
        },
        {
            title: "אמנות המערות",
            date: "לפני 40,000 שנה",
            category: "human",
            description: "הופעת אמנות המערות המעידה על חשיבה סמלית, יצירתיות ותרבות מורכבת.",
            facts: ["ציורי בעלי חיים", "סמלים מופשטים", "תחילת האמנות", "ביטוי של תרבות"],
            importance: 6,
            yearsAgo: 40000
        },
        {
            title: "המהפכה החקלאית",
            date: "לפני 12,000 שנה",
            category: "human",
            description: "מעבר מציד ולקיטה לחקלאות וגידול בעלי חיים. זה אפשר יישובי קבע ותחילת הציוויליזציה.",
            facts: ["יישובי קבע", "גידול אוכלוסייה", "התפתחות כלים", "תחילת המסחר"],
            importance: 8,
            yearsAgo: 12000
        },
        {
            title: "המצאת הכתב",
            date: "לפני 5,500 שנה",
            category: "human",
            description: "תחילת ההיסטוריה המתועדת עם פיתוח מערכות כתיבה בבבל ומצרים.",
            facts: ["שימור ידע", "ניהול מדינות גדולות", "חוקים כתובים", "תחילת ההיסטוריה המתועדת"],
            importance: 7,
            yearsAgo: 5500
        },
        {
            title: "תקופת הברזל",
            date: "לפני 3,200 שנה",
            category: "human",
            description: "התחלת שימוש נרחב בברזל לייצור כלים ונשק. זה שינה את החברה והמלחמה.",
            facts: ["כלים חזקים יותר", "נשק יעיל", "התפתחות חקלאות", "שינוי מאזן הכוחות"],
            importance: 6,
            yearsAgo: 3200
        },
        {
            title: "חוקי ניוטון",
            date: "1687",
            category: "tech",
            description: "אייזק ניוטון מנסח את חוקי התנועה והכבידה האוניברסלית, יוצר את הפיזיקה הקלאסית.",
            facts: ["שלושה חוקי תנועה", "חוק הכבידה האוניברסלית", "בסיס לפיזיקה מודרנית", "מהפכה מדעית"],
            importance: 7,
            yearsAgo: 338
        },
        {
            title: "המהפכה התעשייתית",
            date: "1760",
            category: "tech",
            description: "תחילת המהפכה התעשייתית עם פיתוח מכונות הקיטור. שינוי דרמטי בחברה והכלכלה.",
            facts: ["מכונות קיטור", "ייצור המוני", "עיור מסיבי", "שינוי מבנה החברה"],
            importance: 8,
            yearsAgo: 265
        },
        {
            title: "תורת האבולוציה",
            date: "1859",
            category: "tech",
            description: "צ'ארלס דרווין מפרסם את 'מוצא המינים' ומציג את תורת האבולוציה על ידי ברירה טבעית.",
            facts: ["ברירה טבעית", "התפתחות המינים", "מהפכה בביולוגיה", "שינוי תפיסת המקום של האדם בטבע"],
            importance: 7,
            yearsAgo: 166
        },
        {
            title: "חוקי התורשה",
            date: "1865",
            category: "tech",
            description: "גרגור מנדל מגלה את חוקי התורשה, יוצר את הבסיס למדע הגנטיקה.",
            facts: ["ניתוח גרגרי אפונה", "חוקי התורשה", "בסיס לגנטיקה", "הבנת העברת תכונות"],
            importance: 6,
            yearsAgo: 160
        },
        {
            title: "הטבלה המחזורית",
            date: "1869",
            category: "tech",
            description: "דמיטרי מנדלייב מסדר את הטבלה המחזורית של היסודות, מסדר את הכימיה.",
            facts: ["סידור היסודות", "חיזוי יסודות חדשים", "הבנת מבנה החומר", "בסיס לכימיה מודרנית"],
            importance: 6,
            yearsAgo: 156
        },
        {
            title: "תורת היחסות",
            date: "1905-1915",
            category: "tech",
            description: "אלברט איינשטיין מפתח את תורת היחסות, מהפך את הבנתנו את החלל, הזמן והכבידה.",
            facts: ["E=mc²", "עקמומיות החלל-זמן", "יחסות מיוחדת וכללית", "בסיס לפיזיקה מודרנית"],
            importance: 8,
            yearsAgo: 110
        },
        {
            title: "מלחמת העולם הראשונה",
            date: "1914-1918",
            category: "human",
            description: "המלחמה הראשונה בהיקף עולמי, שינתה את מפת העולם ואת החברה האנושית.",
            facts: ["מיליוני נפגעים", "שינוי מפת אירופה", "טכנולוגיות מלחמה חדשות", "סוף אימפריות עתיקות"],
            importance: 6,
            yearsAgo: 107
        },
        {
            title: "גילוי הפניצילין",
            date: "1928",
            category: "tech",
            description: "אלכסנדר פלמינג מגלה את הפניצילין, תחילת עידן האנטיביוטיקה ומהפכה ברפואה.",
            facts: ["אנטיביוטיקה ראשונה", "הצלת מיליוני חיים", "מהפכה ברפואה", "טיפול בזיהומים"],
            importance: 7,
            yearsAgo: 97
        },
        {
            title: "מלחמת העולם השנייה",
            date: "1939-1945",
            category: "human",
            description: "המלחמה הרסנית ביותר בהיסטוריה האנושית, שינתה את הסדר העולמי.",
            facts: ["עשרות מיליוני נפגעים", "השואה", "שימוש בפצצת אטום", "הקמת האו\"ם"],
            importance: 7,
            yearsAgo: 82
        },
        {
            title: "הפצצה האטומית",
            date: "1945",
            category: "tech",
            description: "ניסוי טריניטי והפצצות הירושימה ונגסאקי - תחילת העידן הגרעיני.",
            facts: ["כוח הרס עצום", "סיום המלחמה", "תחילת העידן הגרעיני", "איזון אימה"],
            importance: 8,
            yearsAgo: 80
        },
        {
            title: "הקמת מדינת ישראל",
            date: "1948",
            category: "human",
            description: "הקמת מדינת ישראל אחרי 2000 שנות גלות - אירוע מכונן בהיסטוריה היהודית והמזרח התיכון.",
            facts: ["מדינה יהודית ראשונה מזה 2000 שנה", "הצהרת העצמאות", "קליטת עליה המונית", "חידוש השפה העברית"],
            importance: 6,
            yearsAgo: 77
        },
        {
            title: "גילוי מבנה ה-DNA",
            date: "1953",
            category: "tech",
            description: "ווטסון, קריק, פרנקלין ווילקינס מגלים את מבנה הסליל הכפול של ה-DNA.",
            facts: ["מבנה סליל כפול", "בסיס הגנטיקה המודרנית", "הבנת התורשה", "בסיס לביוטכנולוגיה"],
            importance: 8,
            yearsAgo: 72
        },
        {
            title: "שיגור ספוטניק",
            date: "1957",
            category: "tech",
            description: "ברית המועצות משיגרת את הלוויין הראשון, תחילת עידן החלל והמרוץ לירח.",
            facts: ["לוויין ראשון", "תחילת עידן החלל", "המרוץ לחלל", "השפעה על טכנולוגיה"],
            importance: 7,
            yearsAgo: 68
        },
        {
            title: "נחיתה על הירח",
            date: "1969",
            category: "tech",
            description: "ניל ארמסטרונג ובאז אולדרין נוחתים על הירח במסגרת משימת אפולו 11.",
            facts: ["צעד ענק למין האנושי", "הישג טכנולוגי עצום", "השראה לדורות", "מחקר מדעי"],
            importance: 7,
            yearsAgo: 56
        },
        {
            title: "נפילת חומת ברלין",
            date: "1989",
            category: "human",
            description: "נפילת חומת ברלין מסמלת את סיום המלחמה הקרה ואיחוד גרמניה.",
            facts: ["סיום המלחמה הקרה", "איחוד גרמניה", "דמוקרטיזציה במזרח אירופה", "שינוי הסדר העולמי"],
            importance: 6,
            yearsAgo: 36
        },
        {
            title: "מהפכת האינטרנט",
            date: "שנות ה-90",
            category: "tech",
            description: "האינטרנט הופך נגיש לציבור הרחב, מהפכת המידע והתקשורת.",
            facts: ["עולם מחובר", "גישה אוניברסלית למידע", "מסחר אלקטרוני", "רשתות חברתיות"],
            importance: 8,
            yearsAgo: 30
        },
        {
            title: "מיפוי הגנום האנושי",
            date: "2003",
            category: "tech",
            description: "השלמת פרויקט מיפוי הגנום האנושי - מפה מלאה של כל הגנים שלנו.",
            facts: ["מיפוי 20,000 גנים", "רפואה מותאמת אישית", "הבנת מחלות תורשתיות", "ביוטכנולוגיה מתקדמת"],
            importance: 7,
            yearsAgo: 22
        },
        {
            title: "מגפת הקורונה וחיסוני mRNA",
            date: "2020",
            category: "tech",
            description: "פיתוח מהיר של חיסוני mRNA להתמודדות עם מגפת הקורונה - הישג רפואי מדהים.",
            facts: ["פיתוח חיסון תוך שנה", "טכנולוגיית mRNA", "שיתוף פעולה עולמי", "מיליארדי מחוסנים"],
            importance: 7,
            yearsAgo: 5
        },
        {
            title: "מהפכת הבינה המלאכותית",
            date: "2022 ואילך",
            category: "tech",
            description: "פריצת דרך בבינה מלאכותית גנרטיבית עם מודלים כמו GPT, מסמנת תחילת עידן חדש.",
            facts: ["בינה מלאכותית גנרטיבית", "אוטומציה מתקדמת", "שינוי עולם העבודה", "יכולות יצירה וחשיבה"],
            importance: 9,
            yearsAgo: 3
        }
    ];
    
    // הכנת נתוני חידון
    quizData = [
        {
            question: "מתי התרחש המפץ הגדול?",
            answers: ["לפני 13.7 מיליארד שנה", "לפני 4.5 מיליארד שנה", "לפני מיליארד שנה", "לפני 100 מיליון שנה"],
            correct: 0,
            explanation: "המפץ הגדול התרחש לפני כ-13.7 מיליארד שנה והוא הרגע שבו נוצר היקום שלנו."
        },
        {
            question: "מתי נוצרה כדור הארץ?",
            answers: ["לפני 13.7 מיליארד שנה", "לפני 4.5 מיליארד שנה", "לפני מיליארד שנה", "לפני 500 מיליון שנה"],
            correct: 1,
            explanation: "כדור הארץ נוצרה לפני כ-4.5 מיליארד שנה מתוך דיסקת גז ואבק סביב השמש הצעירה."
        },
        {
            question: "מתי הופיעו החיים הראשונים על פני כדור הארץ?",
            answers: ["לפני 4.5 מיליארד שנה", "לפני 3.8 מיליארד שנה", "לפני מיליארד שנה", "לפני 500 מיליון שנה"],
            correct: 1,
            explanation: "החיים הראשונים (חיידקים) הופיעו לפני כ-3.8 מיליארד שנה בימים הקדמוניים."
        },
        {
            question: "מתי הופיע ההומו סאפיינס?",
            answers: ["לפני מיליון שנה", "לפני 300,000 שנה", "לפני 100,000 שנה", "לפני 50,000 שנה"],
            correct: 1,
            explanation: "האדם המודרני (הומו סאפיינס) הופיע לראשונה באפריקה לפני כ-300,000 שנה."
        },
        {
            question: "מתי התחילה המהפכה התעשייתית?",
            answers: ["1650", "1760", "1850", "1900"],
            correct: 1,
            explanation: "המהפכה התעשייתית החלה סביב שנת 1760 עם פיתוח מכונות הקיטור."
        },
        {
            question: "מי פיתח את תורת היחסות?",
            answers: ["ניוטון", "איינשטיין", "דרווין", "מנדל"],
            correct: 1,
            explanation: "אלברט איינשטיין פיתח את תורת היחסות המיוחדת והכללית בתחילת המאה ה-20."
        },
        {
            question: "מתי התגלה מבנה ה-DNA?",
            answers: ["1943", "1953", "1963", "1973"],
            correct: 1,
            explanation: "מבנה הסליל הכפול של ה-DNA התגלה בשנת 1953 על ידי ווטסון, קריק, פרנקלין ווילקינס."
        },
        {
            question: "איזה אירוע מסמל את תחילת עידן החלל?",
            answers: ["נחיתה על הירח", "שיגור ספוטניק", "שיגור טלסקופ האבל", "הקמת תחנת החלל"],
            correct: 1,
            explanation: "שיגור ספוטניק 1 בשנת 1957 היה הלוויין הראשון וסימן את תחילת עידן החלל."
        }
    ];
}

// אתחול האפליקציה
function initializeApp() {
    initializeParticles();
    initializeTimeline();
    initializeEventCards();
    initializeControls();
    initializeQuiz();
    initializePerspectiveTool();
    initializeModal();
    
    // גלילה חלקה
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            document.getElementById('timeline').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }
}

// אנימציית חלקיקים בכותרת
function initializeParticles() {
    const container = document.getElementById('particleCanvas');
    if (!container) return;
    
    const particleCount = 80;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // מאפיינים אקראיים
    const size = Math.random() * 3 + 1;
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    const speedX = (Math.random() - 0.5) * 1.5;
    const speedY = (Math.random() - 0.5) * 1.5;
    const opacity = Math.random() * 0.6 + 0.2;
    
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.opacity = opacity;
    
    container.appendChild(particle);
    
    // אנימציה
    function animateParticle() {
        x += speedX;
        y += speedY;
        
        // חזרה למסך אם יוצא מגבולות
        if (x < -10) x = window.innerWidth + 10;
        if (x > window.innerWidth + 10) x = -10;
        if (y < -10) y = window.innerHeight + 10;
        if (y > window.innerHeight + 10) y = -10;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        requestAnimationFrame(animateParticle);
    }
    
    animateParticle();
}

// אתחול ציר הזמן
function initializeTimeline() {
    renderTimeline();
    
    // פקדי זום
    const zoomInBtn = document.getElementById('zoomIn');
    const zoomOutBtn = document.getElementById('zoomOut');
    const resetZoomBtn = document.getElementById('resetZoom');
    
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', () => {
            zoomLevel = Math.min(5, zoomLevel * 1.5);
            renderTimeline();
        });
    }
    
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', () => {
            zoomLevel = Math.max(0.2, zoomLevel / 1.5);
            renderTimeline();
        });
    }
    
    if (resetZoomBtn) {
        resetZoomBtn.addEventListener('click', () => {
            zoomLevel = 1;
            renderTimeline();
        });
    }
}

// רינדור ציר הזמן
function renderTimeline() {
    const container = document.getElementById('timelineEvents');
    const axisContainer = document.getElementById('timelineAxis');
    if (!container || !axisContainer) return;

    container.innerHTML = '';
    axisContainer.innerHTML = '';

    let filteredData = getFilteredData();

    if (filteredData.length === 0) {
        container.innerHTML = '<div class="no-events">אין אירועים להצגה</div>';
        return;
    }

    // חישוב טווח זמנים
    const minYears = Math.min(...filteredData.map(d => d.yearsAgo));
    const maxYears = Math.max(...filteredData.map(d => d.yearsAgo));

    // הוספת תוויות זמן לציר
    addTimeLabels(axisContainer, minYears, maxYears);

    // יצירת נקודות על ציר הזמן
    filteredData.forEach((event, index) => {
        const eventElement = document.createElement('div');
        eventElement.className = `timeline-event category-${event.category}`;

        const position = calculateTimelinePosition(event.yearsAgo, minYears, maxYears);

        eventElement.style.left = position + '%';
        eventElement.style.top = (20 + (index % 4) * 80) + 'px';

        // יצירת הנקודה
        const dot = document.createElement('div');
        dot.className = 'event-dot';
        eventElement.appendChild(dot);

        // תווית עם כותרת ותאריך
        const label = document.createElement('div');
        label.className = 'event-label';

        const title = document.createElement('div');
        title.className = 'event-title';
        title.textContent = event.title;

        const date = document.createElement('div');
        date.className = 'event-date';
        date.textContent = event.date;

        label.appendChild(title);
        label.appendChild(date);
        eventElement.appendChild(label);

        // הוספת tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'event-tooltip';
        tooltip.innerHTML = `
            <strong>${event.title}</strong><br>
            <em>${event.date}</em><br>
            ${event.description.substring(0, 100)}...
        `;
        eventElement.appendChild(tooltip);

        // אירועי עכבר
        eventElement.addEventListener('mouseenter', () => {
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
        });

        eventElement.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
            tooltip.style.visibility = 'hidden';
        });

        // אירוע קליק
        eventElement.addEventListener('click', () => {
            showEventModal(event);
        });

        container.appendChild(eventElement);
    });
}

// הוספת תוויות זמן לציר
function addTimeLabels(axisContainer, minYears, maxYears) {
    if (!axisContainer) return;
    
    // יצירת תוויות לפי טווח הזמן
    let labels = [];
    
    if (maxYears <= 1000) {
        // תקופה מודרנית
        for (let i = 0; i <= 10; i++) {
            const years = minYears + (maxYears - minYears) * (i / 10);
            labels.push({
                position: i * 10,
                text: years < 1 ? 'היום' : `לפני ${Math.round(years)} שנה`
            });
        }
    } else if (maxYears <= 10000000) {
        // תקופה אנושית
        const milestones = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000];
        labels = milestones
            .filter(m => m >= minYears && m <= maxYears)
            .map(years => ({
                position: calculateTimelinePosition(years, minYears, maxYears),
                text: formatTimeLabel(years)
            }));
    } else {
        // תקופה גיאולוגית/קוסמית
        const milestones = [1, 1000, 1000000, 100000000, 1000000000, 4600000000, 13700000000];
        labels = milestones
            .filter(m => m >= minYears && m <= maxYears)
            .map(years => ({
                position: calculateTimelinePosition(years, minYears, maxYears),
                text: formatTimeLabel(years)
            }));
    }
    
    // יצירת תוויות
    labels.forEach(label => {
        const labelElement = document.createElement('div');
        labelElement.className = 'time-label';
        labelElement.style.left = label.position + '%';
        labelElement.textContent = label.text;
        axisContainer.appendChild(labelElement);
    });
}

// פורמט תווית זמן
function formatTimeLabel(years) {
    if (years < 1) return 'היום';
    if (years < 1000) return `לפני ${years} שנה`;
    if (years < 1000000) return `לפני ${Math.round(years / 1000)} אלף שנה`;
    if (years < 1000000000) return `לפני ${Math.round(years / 1000000)} מיליון שנה`;
    return `לפני ${(years / 1000000000).toFixed(1)} מיליארד שנה`;
}

// חישוב מיקום על ציר הזמן
function calculateTimelinePosition(yearsAgo, minYears, maxYears) {
    // בדיקה אם זה תקופה מודרנית (פחות מ-1000 שנה)
    if (maxYears <= 1000) {
        // סקלה לינארית לתקופה המודרנית
        return 100 - ((yearsAgo - minYears) / (maxYears - minYears)) * 100;
    }
    
    // בדיקה אם זה תקופה אנושית (פחות מ-10 מיליון שנה)
    if (maxYears <= 10000000) {
        // סקלה חצי-לוגריתמית
        const logMin = Math.log10(Math.max(1, minYears));
        const logMax = Math.log10(Math.max(1, maxYears));
        const logValue = Math.log10(Math.max(1, yearsAgo));
        return 100 - ((logValue - logMin) / (logMax - logMin)) * 100;
    }
    
    // לתקופות ארוכות יותר - סקלה לוגריתמית מתוקננת
    const logMin = Math.log10(Math.max(1, minYears));
    const logMax = Math.log10(Math.max(1, maxYears));
    const logValue = Math.log10(Math.max(1, yearsAgo));
    
    // היפוך הכיוון (העבר בימין, העתיד בשמאל) והוספת מרווח
    const position = 95 - ((logValue - logMin) / (logMax - logMin)) * 90;
    return Math.max(5, Math.min(95, position));
}

// סינון נתונים
function getFilteredData() {
    let data = [...universeData];
    
    // סינון לפי קטגוריה
    if (currentCategory !== 'all') {
        data = data.filter(event => event.category === currentCategory);
    }
    
    // סינון לפי פרספקטיבה
    if (currentPerspective !== 'cosmic') {
        data = data.filter(event => {
            const years = event.yearsAgo;
            switch (currentPerspective) {
                case 'geological':
                    return years <= 4600000000 && years >= 100000000;
                case 'human':
                    return years <= 10000000 && years >= 1000;
                case 'modern':
                    return years <= 1000;
                default:
                    return true;
            }
        });
    }
    
    return data.sort((a, b) => b.yearsAgo - a.yearsAgo);
}

// אתחול כרטיסיות אירועים
function initializeEventCards() {
    const eras = {
        'cosmic': document.getElementById('cosmic-cards'),
        'life': document.getElementById('life-cards'),
        'human': document.getElementById('human-cards'),
        'civilization': document.getElementById('civilization-cards'),
        'modern': document.getElementById('modern-cards')
    };
    
    // ניקוי כרטיסיות קודמות
    Object.values(eras).forEach(container => {
        if (container) container.innerHTML = '';
    });
    
    universeData.forEach(event => {
        const card = createEventCard(event);
        
        // חלוקה לפי תקופות
        if (event.yearsAgo > 4000000000) {
            eras.cosmic?.appendChild(card);
        } else if (event.yearsAgo > 10000000) {
            eras.life?.appendChild(card);
        } else if (event.yearsAgo > 10000) {
            eras.human?.appendChild(card);
        } else if (event.yearsAgo > 200) {
            eras.civilization?.appendChild(card);
        } else {
            eras.modern?.appendChild(card);
        }
    });
}

function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    
    card.innerHTML = `
        <div class="event-card-header">
            <h4>${event.title}</h4>
        </div>
        <div class="event-card-body">
            <div class="event-card-date">${event.date}</div>
            <div class="event-card-description">${event.description}</div>
        </div>
        <div class="event-card-footer">
            <span class="status status--info">${getCategoryName(event.category)}</span>
        </div>
    `;
    
    card.addEventListener('click', () => {
        showEventModal(event);
    });
    
    return card;
}

function getCategoryName(category) {
    const names = {
        'universe': 'יקום וחלל',
        'earth': 'כדור הארץ',
        'life': 'חיים',
        'human': 'אנושות',
        'tech': 'טכנולוגיה ומדע'
    };
    return names[category] || category;
}

// פקדים ובקרות
function initializeControls() {
    // פרספקטיבות
    document.querySelectorAll('.perspective-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.perspective-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentPerspective = e.target.dataset.perspective;
            renderTimeline();
            updatePerspectiveTool();
        });
    });
    
    // קטגוריות
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentCategory = e.target.dataset.category;
            renderTimeline();
        });
    });
}

// מודל לכרטיס אירוע
function initializeModal() {
    const modal = document.getElementById('eventModal');
    const closeBtn = document.getElementById('closeModal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (modal) modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            if (modal) modal.style.display = 'none';
        }
    });
}

function showEventModal(event) {
    const modal = document.getElementById('eventModal');
    const title = document.getElementById('modalTitle');
    const date = document.getElementById('modalDate');
    const category = document.getElementById('modalCategory');
    const description = document.getElementById('modalDescription');
    const facts = document.getElementById('modalFacts');
    
    if (!modal || !title || !date || !category || !description || !facts) return;
    
    title.textContent = event.title;
    date.textContent = event.date;
    category.textContent = getCategoryName(event.category);
    description.textContent = event.description;
    
    facts.innerHTML = '';
    if (event.facts && event.facts.length > 0) {
        event.facts.forEach(fact => {
            const li = document.createElement('li');
            li.textContent = fact;
            facts.appendChild(li);
        });
    } else {
        facts.innerHTML = '<li>עובדה מעניינת: אירוע מרכזי בהיסטוריה של היקום</li>';
    }
    
    modal.style.display = 'block';
}

// מערכת חידון
function initializeQuiz() {
    const startBtn = document.getElementById('startQuiz');
    const nextBtn = document.getElementById('nextQuestion');
    const checkBtn = document.getElementById('checkAnswer');
    const restartBtn = document.getElementById('restartQuiz');
    
    if (startBtn) startBtn.addEventListener('click', startQuiz);
    if (nextBtn) nextBtn.addEventListener('click', nextQuestion);
    if (checkBtn) checkBtn.addEventListener('click', checkAnswer);
    if (restartBtn) restartBtn.addEventListener('click', restartQuiz);
    
    showQuizSection('start');
}

function startQuiz() {
    currentQuizIndex = 0;
    quizScore = 0;
    isQuizActive = true;
    showQuizSection('question');
    displayQuestion();
}

function displayQuestion() {
    if (currentQuizIndex >= quizData.length) {
        showResults();
        return;
    }
    
    const question = quizData[currentQuizIndex];
    const questionTextEl = document.getElementById('questionText');
    const answersContainer = document.getElementById('answerOptions');
    const checkBtn = document.getElementById('checkAnswer');
    const nextBtn = document.getElementById('nextQuestion');
    const feedback = document.getElementById('quizFeedback');
    
    if (!questionTextEl || !answersContainer) return;
    
    questionTextEl.textContent = question.question;
    answersContainer.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const answerElement = document.createElement('div');
        answerElement.className = 'answer-option';
        answerElement.textContent = answer;
        answerElement.dataset.index = index;
        
        answerElement.addEventListener('click', () => {
            document.querySelectorAll('.answer-option').forEach(opt => opt.classList.remove('selected'));
            answerElement.classList.add('selected');
            if (checkBtn) checkBtn.disabled = false;
        });
        
        answersContainer.appendChild(answerElement);
    });
    
    if (checkBtn) checkBtn.disabled = true;
    if (nextBtn) nextBtn.disabled = true;
    if (feedback) feedback.style.display = 'none';
}

function checkAnswer() {
    const selectedOption = document.querySelector('.answer-option.selected');
    if (!selectedOption) return;
    
    const selectedIndex = parseInt(selectedOption.dataset.index);
    const question = quizData[currentQuizIndex];
    const isCorrect = selectedIndex === question.correct;
    
    if (isCorrect) {
        quizScore++;
    }
    
    const feedback = document.getElementById('quizFeedback');
    const checkBtn = document.getElementById('checkAnswer');
    const nextBtn = document.getElementById('nextQuestion');
    
    if (feedback) {
        feedback.className = `quiz-feedback ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`;
        feedback.textContent = question.explanation;
        feedback.style.display = 'block';
    }
    
    if (checkBtn) checkBtn.disabled = true;
    if (nextBtn) nextBtn.disabled = false;
}

function nextQuestion() {
    currentQuizIndex++;
    displayQuestion();
}

function showResults() {
    const percentage = Math.round((quizScore / quizData.length) * 100);
    const finalScoreEl = document.getElementById('finalScore');
    if (finalScoreEl) {
        finalScoreEl.textContent = `${quizScore}/${quizData.length} (${percentage}%)`;
    }
    showQuizSection('results');
}

function restartQuiz() {
    startQuiz();
}

function showQuizSection(section) {
    const sections = ['start', 'question', 'results'];
    sections.forEach(s => {
        const element = document.getElementById(`quiz${s.charAt(0).toUpperCase() + s.slice(1)}`);
        if (element) {
            element.style.display = s === section ? 'block' : 'none';
        }
    });
}

// כלי פרספקטיבת זמן
function initializePerspectiveTool() {
    const slider = document.getElementById('perspective-slider');
    if (slider) {
        slider.addEventListener('input', updatePerspectiveTool);
        updatePerspectiveTool();
    }
}

function updatePerspectiveTool() {
    const slider = document.getElementById('perspective-slider');
    const view = document.getElementById('perspectiveView');
    
    if (!slider || !view) return;
    
    const value = parseInt(slider.value);
    
    let filteredEvents = [];
    let timeRange = '';
    
    switch (value) {
        case 1: // מיליארדי שנים
            filteredEvents = universeData.filter(e => e.yearsAgo > 1000000000);
            timeRange = 'מיליארדי שנים: יקום וכדור הארץ';
            break;
        case 2: // מיליוני שנים
            filteredEvents = universeData.filter(e => e.yearsAgo <= 1000000000 && e.yearsAgo > 10000);
            timeRange = 'מיליוני שנים: חיים והתפתחות';
            break;
        case 3: // אלפי שנים
            filteredEvents = universeData.filter(e => e.yearsAgo <= 10000 && e.yearsAgo > 200);
            timeRange = 'אלפי שנים: ציוויליזציה אנושית';
            break;
        case 4: // מאות שנים
            filteredEvents = universeData.filter(e => e.yearsAgo <= 200);
            timeRange = 'מאות שנים: עידן מודרני';
            break;
    }
    
    view.innerHTML = `<h4>${timeRange}</h4>`;
    
    filteredEvents.slice(0, 8).forEach((event, index) => {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'perspective-event';
        eventDiv.style.left = (10 + (index * 10) % 80) + '%';
        eventDiv.style.top = (20 + Math.floor(index / 8) * 80) + 'px';
        eventDiv.innerHTML = `<strong>${event.title}</strong><br><small>${event.date}</small>`;
        
        setTimeout(() => {
            eventDiv.classList.add('visible');
            view.appendChild(eventDiv);
        }, index * 100);
    });
}

// רספונסיביות
window.addEventListener('resize', () => {
    renderTimeline();
});

console.log('אתר היסטוריה של היקום נטען בהצלחה!');