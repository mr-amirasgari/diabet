# 🩺 سامانه ارزیابی هوشمند سلامت (Health Assessment System)

این یک پلتفرم ساده تک‌صفحه‌ای (SPA) است که با استفاده از HTML، CSS و JavaScript خالص پیاده‌سازی شده است. هدف اصلی این پروژه، ارزیابی ریسک سلامتی کاربر بر اساس چهار پارامتر کلیدی (گلوکز، BMI، DPF و سن) با استفاده از یک سیستم قواعد مبتنی بر منطق (Rule-Based Prediction) است. همچنین دارای سیستم احراز هویت ابتدایی با ذخیره‌سازی محلی (LocalStorage) و قابلیت‌های دو زبانه (فارسی و انگلیسی) و تم تیره/روشن است.

## ✨ ویژگی‌های کلیدی

* **احراز هویت پایه:**
    * **نام کاربری:** ۴ تا ۱۰ حرف لاتین.
    * **رمز عبور:** ۶ تا ۱۰ کاراکتر (شامل حروف و عدد).
    * استفاده از LocalStorage برای شبیه‌سازی پایگاه داده کاربران.
* **سیستم ارزیابی سلامت:**
    * محاسبه ریسک بر اساس مجموعه‌ای از قواعد منطقی ثابت (مبتنی بر داده‌های پزشکی).
    * نمایش نتیجه به صورت بصری با نوار سنجش (Gauge Bar) و متن نهایی.
* **رابط کاربری کاربرپسند:**
    * **پشتیبانی دو زبانه:** فارسی (RTL) و انگلیسی (LTR).
    * **تم:** قابلیت جابه‌جایی بین حالت‌های روشن (Light Mode) و تیره (Dark Mode).
    * طراحی ریسپانسیو و مدرن با تمرکز بر سادگی.
* **اعتبارسنجی ورودی:** چک کردن محدوده‌های عددی (Min/Max) و الگوهای کاراکتری مورد نیاز برای فیلدها.

## 🚀 نصب و راه‌اندازی

این پروژه نیازی به هیچگونه وابستگی یا بک‌اند ندارد. برای راه‌اندازی، کافی است:

1.  فایل `index.html` را دانلود کنید (یا محتوای آن را کپی کنید).
2.  فایل را در رایانه خود ذخیره کنید.
3.  فایل `index.html` را مستقیماً در مرورگر وب خود باز کنید (با کلیک راست و انتخاب "Open with..." یا کشیدن فایل به پنجره مرورگر).

## 🛠️ نحوه استفاده

### ۱. ورود و ثبت نام (Auth Screen)

* **ثبت نام:**
    1.  بر روی دکمه‌ی "حساب کاربری ندارید؟ ثبت نام کنید." کلیک کنید.
    2.  یک نام کاربری جدید (فقط حروف لاتین، ۴-۱۰ کاراکتر) و رمز عبور (۶-۱۰ کاراکتر، شامل حروف و عدد) وارد کنید.
    3.  بر روی دکمه **"ثبت نام"** کلیک کنید.
* **ورود:**
    1.  نام کاربری و رمز عبور ثبت شده را وارد کنید.
    2.  بر روی دکمه **"ورود"** کلیک کنید.
    3.  در صورت موفقیت‌آمیز بودن، به **داشبورد ارزیابی** هدایت می‌شوید.

### ۲. داشبورد ارزیابی (Prediction Dashboard)

پس از ورود، چهار پارامتر سلامت را وارد کنید:

| پارامتر | واحد/توضیح | محدوده مجاز |
| :--- | :--- | :--- |
| **گلوکز (Glucose)** | mg/dL | ۱۰ تا ۵۰۰ |
| **شاخص توده بدنی (BMI)** | - | ۱۰ تا ۶۰ |
| **تابع شجره دیابت (DPF)** | - | ۰.۰۸ تا ۲.۵ |
| **سن (Age)** | سال | ۱ تا ۱۲۰ |

* پس از وارد کردن مقادیر، بر روی **"بررسی و نمایش نتایج"** کلیک کنید.
* سیستم ریسک شما را به صورت **ریسک پایین (۰.۰)** یا **ریسک بالا (۱.۰)** نمایش می‌دهد.

## ⚙️ منطق پیش‌بینی (Rule-Based Logic)

سیستم پیش‌بینی مبتنی بر مجموعه‌ای از قواعد IF/THEN است که بر اساس آستانه‌های مشخص برای متغیرهای ورودی عمل می‌کند. (این قواعد در کد جاوااسکریپت، تابع `checkRules` قابل مشاهده هستند).

## 🧑‍💻 مشارکت

این پروژه یک نمونه آموزشی/دمو است. اگر پیشنهادی برای بهبود ساختار، استایل، یا منطق دارید، از طریق ایجاد Issue یا Pull Request استقبال می‌شود.

---

***English Version***

# 🩺 Smart Health Assessment System

This is a single-page application (SPA) built purely with HTML, CSS, and vanilla JavaScript. Its primary goal is to assess a user's health risk based on four key parameters (Glucose, BMI, DPF, and Age) using a fixed rule-based prediction system. It also features basic authentication (using LocalStorage), bilingual support (Farsi/English), and a dark/light theme toggle.

## ✨ Key Features

* **Basic Authentication:**
    * **Username:** 4 to 10 Latin letters.
    * **Password:** 6 to 10 characters (must include letters and numbers).
    * Uses LocalStorage to simulate user persistence.
* **Health Assessment Engine:**
    * Calculates risk based on a fixed set of logical rules (Rule-Based Prediction).
    * Visual result display using a risk gauge bar and a final status text.
* **User Interface:**
    * **Bilingual Support:** Farsi (RTL) and English (LTR).
    * **Theming:** Toggle between Light Mode and Dark Mode.
    * Responsive and modern design focusing on clarity.
* **Input Validation:** Checks numerical ranges (Min/Max) and character patterns for input fields.

## 🚀 Installation and Setup

This project requires no dependencies or backend server. To run it:

1.  Download the `index.html` file (or copy its content).
2.  Save the file on your computer.
3.  Open `index.html` directly in your web browser (right-click and "Open with..." or drag the file into the browser window).

## 🛠️ How to Use

### 1. Login and Registration (Auth Screen)

* **Registration:**
    1.  Click the "Don't have an account? Register." button.
    2.  Enter a new username (Latin letters only, 4-10 chars) and a password (6-10 chars, including letters and numbers).
    3.  Click the **"Register"** button.
* **Login:**
    1.  Enter the registered username and password.
    2.  Click the **"Login"** button.
    3.  Upon success, you will be redirected to the **Assessment Dashboard**.

### 2. Assessment Dashboard (Prediction Dashboard)

After logging in, enter the four health parameters:

| Parameter | Unit/Description | Valid Range |
| :--- | :--- | :--- |
| **Glucose** | mg/dL | 10 to 500 |
| **Body Mass Index (BMI)** | - | 10 to 60 |
| **Diabetes Pedigree Function (DPF)** | - | 0.08 to 2.5 |
| **Age** | Years | 1 to 120 |

* After entering values, click **"Calculate and View Results"**.
* The system will display your risk as either **Low Risk (0.0)** or **High Risk (1.0)**.

## 🧑‍💻 Contributing

This project is intended as an educational/demo piece. Suggestions for improving the structure, styling, or logic are welcome via Issues or Pull Requests.
---

Created by **Amir Mohammad Asgari | امیرمحمد عسگری**  
Official website: [https://www.am-asgari.ir/](https://www.am-asgari.ir/)
