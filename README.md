<div align="center">

# Diabetes Rule Visualizer

An educational browser-based tool for exploring a transparent rule-based diabetes risk assessment workflow.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

</div>

---

## Overview

This project visualizes a fixed set of IF/THEN rules using four input variables:

- Glucose
- Body Mass Index (BMI)
- Age
- Diabetes Pedigree Function (DPF)

The application shows which conditions and rules are active and returns a simplified low-risk or high-risk educational result.

> **Important:** This project is an educational demonstration only. It is not a medical device, diagnostic system, clinical decision-support tool, or substitute for professional medical advice.

## Features

- Responsive single-page interface
- Rule-based evaluation
- Live input feedback
- Active-rule visualization
- Searchable rule library
- Summary of decision logic
- No external dependencies
- No backend or database required

## Project Structure

```text
diabetes-rule-visualizer/
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── app.js
├── .gitignore
├── index.html
└── README.md
```

## Run Locally

Clone the repository:

```bash
git clone https://github.com/mr-amirasgari/diabetes-rule-visualizer.git
cd diabetes-rule-visualizer
```

Open `index.html` directly in a modern web browser.

You can also run a small local server:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## How It Works

The application evaluates predefined positive and negative rules.

1. The user enters all four values.
2. Each rule condition is evaluated.
3. Positive rules are checked first.
4. If no positive rule matches, negative rules are checked.
5. The interface displays the matched rules and educational risk category.

This is a deterministic rule-based system and does not use machine learning.

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript

## Limitations

- Rules are fixed and manually defined.
- The application has not been clinically validated.
- Results must not be interpreted as a diagnosis.
- Data is processed only in the browser and is not stored by the project.

## Possible Improvements

- Add automated JavaScript tests
- Add configurable rule sets
- Add accessibility improvements
- Add English localization
- Add data export
- Add rule comparison charts
- Publish with GitHub Pages

## Author

**Amir Mohammad Asgari**

[GitHub Profile](https://github.com/mr-amirasgari)