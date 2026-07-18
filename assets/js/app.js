const positiveRules = [
      { id: 'P1', title: 'قانون ۱', output: 1, badge: 'ریسک بالا', conditions: [
        ['glucose', 'Glucose', '>', 101], ['glucose', 'Glucose', '<=', 154], ['bmi', 'BMI', '>', 43.3], ['age', 'Age', '>', 29]
      ]},
      { id: 'P2', title: 'قانون ۲', output: 1, badge: 'ریسک بالا', conditions: [
        ['glucose', 'Glucose', '>', 154]
      ]},
      { id: 'P3', title: 'قانون ۳', output: 1, badge: 'ریسک بالا', conditions: [
        ['glucose', 'Glucose', '>', 101], ['bmi', 'BMI', '>', 26.7], ['dpf', 'DiabetesPedigreeFunction', '>', 0.464], ['age', 'Age', '>', 29]
      ]}
    ];

    const negativeRules = [
      { id: 'N1', title: 'قانون ۱', output: 0, badge: 'ریسک پایین', conditions: [
        ['glucose', 'Glucose', '<=', 154], ['bmi', 'BMI', '<=', 26.7]
      ]},
      { id: 'N2', title: 'قانون ۲', output: 0, badge: 'ریسک پایین', conditions: [
        ['glucose', 'Glucose', '<=', 101]
      ]},
      { id: 'N3', title: 'قانون ۳', output: 0, badge: 'ریسک پایین', conditions: [
        ['glucose', 'Glucose', '<=', 154], ['age', 'Age', '<=', 29]
      ]},
      { id: 'N4', title: 'قانون ۴', output: 0, badge: 'ریسک پایین', conditions: [
        ['dpf', 'DiabetesPedigreeFunction', '>', 0.287], ['dpf', 'DiabetesPedigreeFunction', '<=', 0.307]
      ]},
      { id: 'N5', title: 'قانون ۵', output: 0, badge: 'ریسک پایین', conditions: [
        ['glucose', 'Glucose', '<=', 154], ['bmi', 'BMI', '<=', 43.3], ['dpf', 'DiabetesPedigreeFunction', '<=', 0.464]
      ]}
    ];

    const allRules = [...positiveRules, ...negativeRules];
    const inputIds = ['glucose', 'bmi', 'age', 'dpf'];
    let onlyMatched = false;

    const fieldLimits = {
      glucose: { min: 0, max: 220 },
      bmi: { min: 0, max: 70 },
      age: { min: 0, max: 110 },
      dpf: { min: 0, max: 2.5 }
    };

    function getValues() {
      return {
        glucose: Number(document.getElementById('glucose').value),
        bmi: Number(document.getElementById('bmi').value),
        age: Number(document.getElementById('age').value),
        dpf: Number(document.getElementById('dpf').value)
      };
    }

    function compare(value, op, threshold) {
      if (Number.isNaN(value)) return false;
      if (op === '>') return value > threshold;
      if (op === '>=') return value >= threshold;
      if (op === '<') return value < threshold;
      if (op === '<=') return value <= threshold;
      return value === threshold;
    }

    function evaluateRule(rule, values) {
      const checks = rule.conditions.map(([field, label, op, value]) => ({
        field,
        label,
        op,
        value,
        currentValue: values[field],
        passed: compare(values[field], op, value)
      }));

      return {
        ...rule,
        checks,
        matched: checks.every(check => check.passed),
        score: checks.filter(check => check.passed).length / checks.length
      };
    }

    function evaluate(values) {
      const positive = positiveRules.map(rule => evaluateRule(rule, values));
      const negative = negativeRules.map(rule => evaluateRule(rule, values));
      const matchedPositive = positive.filter(rule => rule.matched);
      const matchedNegative = negative.filter(rule => rule.matched);

      if (matchedPositive.length) {
        return { prediction: 1, tone: 'high', matchedRules: matchedPositive, positive, negative };
      }

      if (matchedNegative.length) {
        return { prediction: 0, tone: 'low', matchedRules: matchedNegative, positive, negative };
      }

      return { prediction: 0, tone: 'low', matchedRules: [], positive, negative };
    }

    function fmt(value) {
      if (value === '' || value === null || value === undefined || Number.isNaN(Number(value))) return '—';
      return Number(value).toLocaleString('fa-IR', { maximumFractionDigits: 3 });
    }

    function conditionText(check) {
      return `${check.label} ${check.op} ${check.value}`;
    }

    function setProgress(id, value) {
      const limit = fieldLimits[id];
      const percent = Number.isNaN(value) ? 0 : ((value - limit.min) / (limit.max - limit.min)) * 100;
      document.getElementById(id + 'Bar').style.width = Math.max(0, Math.min(100, percent)) + '%';
    }

    function renderRule(rule) {
      const typeClass = rule.output === 1 ? 'positive' : 'negative';
      const conditions = rule.checks.map(check => `
        <div class="condition ${check.passed ? 'ok' : 'fail'}">
          <span>${conditionText(check)}</span>
          <span class="status ${check.passed ? 'ok' : 'fail'}">${check.passed ? '✓ برقرار' : '× برقرار نیست'} | مقدار: ${fmt(check.currentValue)}</span>
        </div>
      `).join('');

      return `
        <article class="rule-card ${rule.matched ? 'matched' : ''} ${typeClass}">
          <div class="rule-top">
            <div>
              <h3>${rule.id} — ${rule.title}</h3>
              <p>${rule.badge}</p>
            </div>
            <span class="rule-output">${rule.output === 1 ? 'مثبت' : 'منفی'}</span>
          </div>
          <div class="score-row"><span>درصد شروط برقرار</span><strong>${Math.round(rule.score * 100)}٪</strong></div>
          <div class="progress ${rule.output === 1 ? 'danger' : ''}"><span style="width:${rule.score * 100}%"></span></div>
          <div>${conditions}</div>
        </article>
      `;
    }

    function updateUI() {
      const values = getValues();
      const result = evaluate(values);
      const hasMissing = inputIds.some(id => document.getElementById(id).value === '');
      const resultCard = document.getElementById('resultCard');
      resultCard.style.display = hasMissing ? 'none' : 'grid';

      inputIds.forEach(id => {
        const value = values[id];
        document.getElementById(id + 'Value').textContent = fmt(value);
        setProgress(id, value);
      });

      document.getElementById('miniGlucose').textContent = fmt(values.glucose);
      document.getElementById('miniBmi').textContent = fmt(values.bmi);
      document.getElementById('miniAge').textContent = fmt(values.age);
      document.getElementById('miniDpf').textContent = fmt(values.dpf);

      resultCard.className = `result-card ${result.tone === 'high' ? 'high' : 'low'}`;
      document.getElementById('resultTitle').textContent = hasMissing ? 'ورودی‌ها را کامل کن' : 'خروجی قوانین';
      document.getElementById('resultNumber').textContent = hasMissing ? 'نامشخص' : result.prediction === 1 ? 'ریسک بالا' : 'ریسک پایین';

      const matchedList = document.getElementById('matchedList');
      matchedList.innerHTML = result.matchedRules.length
        ? result.matchedRules.map(rule => `<span>${rule.id} — ${rule.title}</span>`).join('')
        : '<span>قانون فعالی وجود ندارد</span>';

      renderRules();
    }

    function renderRules() {
      const values = getValues();
      const hasMissing = inputIds.some(id => document.getElementById(id).value === '');
      const query = document.getElementById('ruleSearch')?.value.trim().toLowerCase() || '';

      if (hasMissing) {
        const grid = document.getElementById('rulesGrid');
        const empty = document.getElementById('emptyState');
        const quickRules = document.getElementById('quickRules');
        if (grid) grid.innerHTML = '';
        if (quickRules) quickRules.innerHTML = '';
        if (empty) {
          empty.textContent = 'برای نمایش قوانین فعال، ابتدا هر چهار عدد را وارد کنید.';
          empty.style.display = 'block';
        }
        return;
      }
      const evaluated = allRules.map(rule => evaluateRule(rule, values));
      const filtered = evaluated.filter(rule => {
        const text = [rule.id, rule.title, rule.badge, ...rule.checks.map(conditionText)].join(' ').toLowerCase();
        const matchesQuery = !query || text.includes(query);
        const matchesState = !onlyMatched || rule.matched;
        return matchesQuery && matchesState;
      });

      const grid = document.getElementById('rulesGrid');
      const empty = document.getElementById('emptyState');
      if (grid) grid.innerHTML = filtered.map(renderRule).join('');
      if (empty) empty.style.display = filtered.length ? 'none' : 'block';

      const quickRules = document.getElementById('quickRules');
      if (quickRules) quickRules.innerHTML = evaluated.map(renderRule).join('');
    }

    document.querySelectorAll('.tab-btn').forEach(button => {
      button.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
        button.classList.add('active');
        document.getElementById(button.dataset.tab).classList.add('active');
        renderRules();
      });
    });

    inputIds.forEach(id => {
      document.getElementById(id).addEventListener('input', updateUI);
    });

    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        inputIds.forEach(id => document.getElementById(id).value = '');
        updateUI();
      });
    }

    document.getElementById('ruleSearch').addEventListener('input', renderRules);

    document.getElementById('onlyMatchedBtn').addEventListener('click', event => {
      onlyMatched = !onlyMatched;
      event.currentTarget.classList.toggle('primary', onlyMatched);
      renderRules();
    });

    updateUI();

