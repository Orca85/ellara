'use strict';

/* =========================================================
   OHMS LAW WHEEL  –  U = R * I
   ========================================================= */
(function () {
  let solveFor = 'U';

  const labels = {
    U: { sym: 'U', unit: 'V', full: 'Spänning' },
    R: { sym: 'R', unit: 'Ω', full: 'Resistans' },
    I: { sym: 'I', unit: 'A', full: 'Ström' },
  };

  const explanations = {
    U: {
      formula: 'U = R × I',
      title: 'Beräkna Spänning (U)',
      steps: [
        ['Vad vet du?', 'Resistansen R (Ω) och strömmen I (A)'],
        ['Formeln:', 'U = R × I'],
        ['Multiplicera:', 'Resistansen gånger strömmen ger spänningen'],
      ],
      example: 'R = 10 Ω, I = 2 A → <strong>U = 10 × 2 = 20 V</strong>',
    },
    R: {
      formula: 'R = U ÷ I',
      title: 'Beräkna Resistans (R)',
      steps: [
        ['Vad vet du?', 'Spänningen U (V) och strömmen I (A)'],
        ['Formeln:', 'R = U ÷ I'],
        ['Dividera:', 'Spänningen delat med strömmen ger resistansen'],
      ],
      example: 'U = 20 V, I = 2 A → <strong>R = 20 ÷ 2 = 10 Ω</strong>',
    },
    I: {
      formula: 'I = U ÷ R',
      title: 'Beräkna Ström (I)',
      steps: [
        ['Vad vet du?', 'Spänningen U (V) och resistansen R (Ω)'],
        ['Formeln:', 'I = U ÷ R'],
        ['Dividera:', 'Spänningen delat med resistansen ger strömmen'],
      ],
      example: 'U = 20 V, R = 10 Ω → <strong>I = 20 ÷ 10 = 2 A</strong>',
    },
  };

  function showExplain(v) {
    const box = document.getElementById('ohm-explain');
    const e = explanations[v];
    box.innerHTML = `
      <div class="var-explain-title">${e.title}</div>
      <div class="var-explain-formula">${e.formula}</div>
      <ul class="var-explain-steps">
        ${e.steps.map(([lbl, txt]) =>
          `<li><span class="step-label">${lbl}</span> ${txt}</li>`
        ).join('')}
      </ul>
      <div class="var-explain-example">Exempel: ${e.example}</div>`;
    box.classList.add('visible');
  }

  function init() {
    document.querySelectorAll('#ohm-wheel .wheel-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        solveFor = btn.dataset.var;
        updateUI();
        showExplain(solveFor);
      });
    });
    document.getElementById('ohm-calc').addEventListener('click', calculate);
    updateUI();
  }

  function updateUI() {
    document.querySelectorAll('#ohm-wheel .wheel-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.var === solveFor);
    });
    ['U', 'R', 'I'].forEach(v => {
      const inp = document.getElementById('ohm-' + v.toLowerCase());
      if (!inp) return;
      inp.disabled = (v === solveFor);
      inp.value = (v === solveFor) ? '' : inp.value;
      inp.placeholder = (v === solveFor) ? 'Beräknas…' : '0';
      const lbl = inp.previousElementSibling;
      if (lbl) lbl.textContent = labels[v].full + ' (' + labels[v].unit + ')';
    });
    document.getElementById('ohm-result').textContent = '';
  }

  function calculate() {
    const U = parseFloat(document.getElementById('ohm-u').value);
    const R = parseFloat(document.getElementById('ohm-r').value);
    const I = parseFloat(document.getElementById('ohm-i').value);
    let result, unit;

    if (solveFor === 'U') { result = R * I; unit = 'V'; }
    else if (solveFor === 'R') { result = U / I; unit = 'Ω'; }
    else { result = U / R; unit = 'A'; }

    const box = document.getElementById('ohm-result');
    if (!isFinite(result) || isNaN(result)) {
      box.textContent = 'Fyll i de två kända värdena!';
      box.style.color = '#FF4C4C';
    } else {
      box.textContent = labels[solveFor].full + ' = ' + format(result) + ' ' + unit;
      box.style.color = '';
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();


/* =========================================================
   POWER LAW WHEEL  –  P = U * I
   ========================================================= */
(function () {
  let solveFor = 'P';

  const labels = {
    P: { sym: 'P', unit: 'W', full: 'Effekt' },
    U: { sym: 'U', unit: 'V', full: 'Spänning' },
    I: { sym: 'I', unit: 'A', full: 'Ström' },
  };

  const explanations = {
    P: {
      formula: 'P = U × I',
      title: 'Beräkna Effekt (P)',
      steps: [
        ['Vad vet du?', 'Spänningen U (V) och strömmen I (A)'],
        ['Formeln:', 'P = U × I'],
        ['Multiplicera:', 'Spänningen gånger strömmen ger effekten i Watt'],
      ],
      example: 'U = 230 V, I = 5 A → <strong>P = 230 × 5 = 1 150 W</strong>',
    },
    U: {
      formula: 'U = P ÷ I',
      title: 'Beräkna Spänning (U)',
      steps: [
        ['Vad vet du?', 'Effekten P (W) och strömmen I (A)'],
        ['Formeln:', 'U = P ÷ I'],
        ['Dividera:', 'Effekten delat med strömmen ger spänningen'],
      ],
      example: 'P = 1 150 W, I = 5 A → <strong>U = 1 150 ÷ 5 = 230 V</strong>',
    },
    I: {
      formula: 'I = P ÷ U',
      title: 'Beräkna Ström (I)',
      steps: [
        ['Vad vet du?', 'Effekten P (W) och spänningen U (V)'],
        ['Formeln:', 'I = P ÷ U'],
        ['Dividera:', 'Effekten delat med spänningen ger strömmen'],
      ],
      example: 'P = 1 150 W, U = 230 V → <strong>I = 1 150 ÷ 230 = 5 A</strong>',
    },
  };

  function showExplain(v) {
    const box = document.getElementById('power-explain');
    const e = explanations[v];
    box.innerHTML = `
      <div class="var-explain-title">${e.title}</div>
      <div class="var-explain-formula">${e.formula}</div>
      <ul class="var-explain-steps">
        ${e.steps.map(([lbl, txt]) =>
          `<li><span class="step-label">${lbl}</span> ${txt}</li>`
        ).join('')}
      </ul>
      <div class="var-explain-example">Exempel: ${e.example}</div>`;
    box.classList.add('visible');
  }

  function init() {
    document.querySelectorAll('#power-wheel .wheel-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        solveFor = btn.dataset.var;
        updateUI();
        showExplain(solveFor);
      });
    });
    document.getElementById('power-calc').addEventListener('click', calculate);
    updateUI();
  }

  function updateUI() {
    document.querySelectorAll('#power-wheel .wheel-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.var === solveFor);
    });
    ['P', 'U', 'I'].forEach(v => {
      const inp = document.getElementById('pow-' + v.toLowerCase());
      if (!inp) return;
      inp.disabled = (v === solveFor);
      inp.value = (v === solveFor) ? '' : inp.value;
      inp.placeholder = (v === solveFor) ? 'Beräknas…' : '0';
    });
    document.getElementById('power-result').textContent = '';
  }

  function calculate() {
    const P = parseFloat(document.getElementById('pow-p').value);
    const U = parseFloat(document.getElementById('pow-u').value);
    const I = parseFloat(document.getElementById('pow-i').value);
    let result, unit;

    if (solveFor === 'P') { result = U * I; unit = 'W'; }
    else if (solveFor === 'U') { result = P / I; unit = 'V'; }
    else { result = P / U; unit = 'A'; }

    const box = document.getElementById('power-result');
    if (!isFinite(result) || isNaN(result)) {
      box.textContent = 'Fyll i de två kända värdena!';
      box.style.color = '#FF4C4C';
    } else {
      box.textContent = labels[solveFor].full + ' = ' + format(result) + ' ' + unit;
      box.style.color = '';
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();


/* =========================================================
   SERIES CIRCUIT CALC
   ========================================================= */
(function () {
  let count = 2;

  function getContainer() { return document.getElementById('serie-inputs'); }

  function addResistor() {
    count++;
    const row = document.createElement('div');
    row.className = 'circuit-row';
    row.innerHTML = `
      <span class="symbol">R${count}</span>
      <input type="number" min="0" step="any" placeholder="Ω" aria-label="R${count}">
      <button class="remove-btn" title="Ta bort" onclick="this.closest('.circuit-row').remove(); serieCalc()">✕</button>`;
    getContainer().appendChild(row);
    row.querySelector('input').addEventListener('input', serieCalc);
  }

  function serieCalc() {
    const vals = [...document.querySelectorAll('#serie-inputs input')]
      .map(i => parseFloat(i.value)).filter(v => !isNaN(v) && v >= 0);
    const tot = vals.reduce((a, b) => a + b, 0);
    const box = document.getElementById('serie-result');
    if (vals.length === 0) { box.textContent = '–'; return; }
    box.textContent = 'R_tot = ' + format(tot) + ' Ω';
  }

  function init() {
    document.getElementById('serie-add').addEventListener('click', addResistor);
    document.querySelectorAll('#serie-inputs input').forEach(i => i.addEventListener('input', serieCalc));
    document.getElementById('serie-calc-btn').addEventListener('click', serieCalc);
  }

  window.serieCalc = serieCalc;
  document.addEventListener('DOMContentLoaded', init);
})();


/* =========================================================
   PARALLEL CIRCUIT CALC
   ========================================================= */
(function () {
  let count = 2;

  function addResistor() {
    count++;
    const row = document.createElement('div');
    row.className = 'circuit-row';
    row.innerHTML = `
      <span class="symbol">R${count}</span>
      <input type="number" min="0.001" step="any" placeholder="Ω" aria-label="R${count}">
      <button class="remove-btn" title="Ta bort" onclick="this.closest('.circuit-row').remove(); parallelCalc()">✕</button>`;
    document.getElementById('parallel-inputs').appendChild(row);
    row.querySelector('input').addEventListener('input', parallelCalc);
  }

  function parallelCalc() {
    const vals = [...document.querySelectorAll('#parallel-inputs input')]
      .map(i => parseFloat(i.value)).filter(v => !isNaN(v) && v > 0);
    const box = document.getElementById('parallel-result');
    if (vals.length === 0) { box.textContent = '–'; return; }
    const invSum = vals.reduce((a, b) => a + 1 / b, 0);
    const tot = 1 / invSum;
    box.textContent = 'R_tot = ' + format(tot) + ' Ω';
  }

  function init() {
    document.getElementById('parallel-add').addEventListener('click', addResistor);
    document.querySelectorAll('#parallel-inputs input').forEach(i => i.addEventListener('input', parallelCalc));
    document.getElementById('parallel-calc-btn').addEventListener('click', parallelCalc);
  }

  window.parallelCalc = parallelCalc;
  document.addEventListener('DOMContentLoaded', init);
})();


/* =========================================================
   RESISTIVITY CALC  –  R = ρ*L / A
   ========================================================= */
(function () {
  const materials = {
    copper: { rho: 0.018, name: 'Koppar (Cu)', color: '#FF9B4D' },
    aluminium: { rho: 0.028, name: 'Aluminium (Al)', color: '#AAAACC' },
  };
  let selected = 'copper';

  function init() {
    document.querySelectorAll('.rho-item').forEach(el => {
      el.addEventListener('click', () => {
        selected = el.dataset.mat;
        document.querySelectorAll('.rho-item').forEach(x => x.classList.remove('active'));
        el.classList.add('active');
      });
    });
    document.querySelector('.rho-item[data-mat="copper"]').classList.add('active');
    document.getElementById('rho-calc-btn').addEventListener('click', calcR);
  }

  function calcR() {
    const L = parseFloat(document.getElementById('rho-L').value);
    const A = parseFloat(document.getElementById('rho-A').value);
    const { rho, name } = materials[selected];
    const box = document.getElementById('rho-result');
    if (isNaN(L) || isNaN(A) || A <= 0 || L <= 0) {
      box.textContent = 'Ange giltiga värden!';
      box.style.color = '#FF4C4C';
      return;
    }
    const R = (rho * L) / A;
    box.style.color = '';
    box.innerHTML = `${name}<br>R = ${format(R)} Ω`;
  }

  document.addEventListener('DOMContentLoaded', init);
})();


/* =========================================================
   VOLTAGE DROP CALC
   ========================================================= */
(function () {
  const rho = { copper: 0.018, aluminium: 0.028 };

  function calcDrop() {
    const I    = parseFloat(document.getElementById('vd-I').value);
    const L    = parseFloat(document.getElementById('vd-L').value);
    const A    = parseFloat(document.getElementById('vd-A').value);
    const Unom = parseFloat(document.getElementById('vd-Unom').value) || 230;
    const mat  = document.getElementById('vd-mat').value;

    const box = document.getElementById('vd-result');
    if (isNaN(I) || isNaN(L) || isNaN(A) || I <= 0 || L <= 0 || A <= 0) {
      box.className = 'vdrop-result';
      box.innerHTML = '<span class="vdrop-value">–</span>';
      return;
    }

    const deltaU = (2 * rho[mat] * L * I) / A;   // faktor 2 för fram + retur
    const pct    = (deltaU / Unom) * 100;
    const isWarn = pct > 4;

    box.className = 'vdrop-result ' + (isWarn ? 'warn' : 'ok');
    box.innerHTML = `
      <div class="vdrop-value" style="color:${isWarn ? '#FF4C4C' : '#4CFFA0'}">${format(pct)} %</div>
      <div class="vdrop-unit">Spänningsfall = ${format(deltaU)} V  (av ${Unom} V)</div>
      <div class="vdrop-detail">${isWarn
        ? 'Spänningsfallet överstiger 4 % – ej tillåtet enligt standard!'
        : 'OK – spänningsfallet är inom tillåten gräns (≤ 4 %).'}</div>`;
  }

  function init() {
    document.getElementById('vd-calc-btn').addEventListener('click', calcDrop);
    ['vd-I','vd-L','vd-A','vd-Unom','vd-mat'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', calcDrop);
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();


/* =========================================================
   RLA FORMULA VARIANTS  –  R = ρ · L / A
   ========================================================= */
(function () {
  const explanations = {
    R: {
      color: '#FFD700',
      title: 'Beräkna Resistans (R)',
      formula: 'R = ρ × L ÷ A',
      steps: [
        ['Vad vet du?', 'Resistivitet ρ (Ω·mm²/m), längd L (m) och area A (mm²)'],
        ['Steg 1:', 'Multiplicera resistiviteten med längden: ρ × L'],
        ['Steg 2:', 'Dividera resultatet med arean A'],
        ['Enhet:', 'Svaret ges i Ohm (Ω)'],
      ],
      example: 'Koppar (ρ = 0,018), L = 50 m, A = 2,5 mm² → <strong>R = 0,018 × 50 ÷ 2,5 = 0,36 Ω</strong>',
    },
    rho: {
      color: '#C0A0FF',
      title: 'Beräkna Resistivitet (ρ)',
      formula: 'ρ = R × A ÷ L',
      steps: [
        ['Vad vet du?', 'Resistansen R (Ω), arean A (mm²) och längden L (m)'],
        ['Steg 1:', 'Multiplicera resistansen med arean: R × A'],
        ['Steg 2:', 'Dividera med längden L'],
        ['Enhet:', 'Svaret ges i Ω·mm²/m (materialets resistivitet)'],
      ],
      example: 'R = 0,36 Ω, A = 2,5 mm², L = 50 m → <strong>ρ = 0,36 × 2,5 ÷ 50 = 0,018 Ω·mm²/m (Koppar)</strong>',
    },
    L: {
      color: '#4ECDC4',
      title: 'Beräkna Längd (L)',
      formula: 'L = R × A ÷ ρ',
      steps: [
        ['Vad vet du?', 'Resistansen R (Ω), arean A (mm²) och resistiviteten ρ'],
        ['Steg 1:', 'Multiplicera resistansen med arean: R × A'],
        ['Steg 2:', 'Dividera med resistiviteten ρ'],
        ['Enhet:', 'Svaret ges i meter (m)'],
      ],
      example: 'R = 0,36 Ω, A = 2,5 mm², ρ = 0,018 (Koppar) → <strong>L = 0,36 × 2,5 ÷ 0,018 = 50 m</strong>',
    },
    A: {
      color: '#4CFFA0',
      title: 'Beräkna Area (A)',
      formula: 'A = ρ × L ÷ R',
      steps: [
        ['Vad vet du?', 'Resistiviteten ρ, längden L (m) och resistansen R (Ω)'],
        ['Steg 1:', 'Multiplicera resistiviteten med längden: ρ × L'],
        ['Steg 2:', 'Dividera med resistansen R'],
        ['Enhet:', 'Svaret ges i mm² — välj närmast standardarea (1,5 / 2,5 / 4,0 mm²)'],
      ],
      example: 'ρ = 0,018 (Koppar), L = 50 m, R = 0,36 Ω → <strong>A = 0,018 × 50 ÷ 0,36 = 2,5 mm²</strong>',
    },
  };

  function showExplain(v) {
    const box = document.getElementById('rla-explain');
    const e = explanations[v];
    box.innerHTML = `
      <div class="var-explain-title" style="color:${e.color}">${e.title}</div>
      <div class="var-explain-formula">${e.formula}</div>
      <ul class="var-explain-steps">
        ${e.steps.map(([lbl, txt]) =>
          `<li><span class="step-label">${lbl}</span> ${txt}</li>`
        ).join('')}
      </ul>
      <div class="var-explain-example">Exempel: ${e.example}</div>`;
    box.classList.add('visible');
  }

  function init() {
    document.querySelectorAll('.fv-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.fv-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        showExplain(btn.dataset.rla);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();


/* =========================================================
   CLEAR BUTTONS
   ========================================================= */
(function () {
  function clearInputs(ids) {
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      if (el.tagName === 'SELECT') el.selectedIndex = 0;
      else el.value = '';
    });
  }
  function clearResult(id) {
    const el = document.getElementById(id);
    if (el) { el.textContent = ''; el.style.color = ''; el.className = el.className.replace(/\bwarn\b|\bok\b/g, '').trim(); }
  }

  function init() {
    // Ohms lag
    document.getElementById('ohm-clear').addEventListener('click', () => {
      clearInputs(['ohm-u','ohm-r','ohm-i']);
      clearResult('ohm-result');
      document.getElementById('ohm-explain').classList.remove('visible');
    });

    // Effektlagen
    document.getElementById('power-clear').addEventListener('click', () => {
      clearInputs(['pow-p','pow-u','pow-i']);
      clearResult('power-result');
      document.getElementById('power-explain').classList.remove('visible');
    });

    // Seriekoppling — återställ till 2 resistorer
    document.getElementById('serie-clear').addEventListener('click', () => {
      const container = document.getElementById('serie-inputs');
      container.innerHTML = `
        <div class="circuit-row">
          <span class="symbol">R1</span>
          <input type="number" min="0" step="any" placeholder="Ω" aria-label="R1">
        </div>
        <div class="circuit-row">
          <span class="symbol">R2</span>
          <input type="number" min="0" step="any" placeholder="Ω" aria-label="R2">
          <button class="remove-btn" title="Ta bort" onclick="this.closest('.circuit-row').remove(); serieCalc()">✕</button>
        </div>`;
      container.querySelectorAll('input').forEach(i => i.addEventListener('input', serieCalc));
      clearResult('serie-result');
    });

    // Parallellkoppling — återställ till 2 resistorer
    document.getElementById('parallel-clear').addEventListener('click', () => {
      const container = document.getElementById('parallel-inputs');
      container.innerHTML = `
        <div class="circuit-row">
          <span class="symbol">R1</span>
          <input type="number" min="0.001" step="any" placeholder="Ω" aria-label="R1">
        </div>
        <div class="circuit-row">
          <span class="symbol">R2</span>
          <input type="number" min="0.001" step="any" placeholder="Ω" aria-label="R2">
          <button class="remove-btn" title="Ta bort" onclick="this.closest('.circuit-row').remove(); parallelCalc()">✕</button>
        </div>`;
      container.querySelectorAll('input').forEach(i => i.addEventListener('input', parallelCalc));
      clearResult('parallel-result');
    });

    // R = ρ·L/A
    document.getElementById('rho-clear').addEventListener('click', () => {
      clearInputs(['rho-L','rho-A']);
      clearResult('rho-result');
    });

    // Spänningsfall
    document.getElementById('vd-clear').addEventListener('click', () => {
      clearInputs(['vd-I','vd-L','vd-A','vd-Unom','vd-mat']);
      document.getElementById('vd-Unom').value = '230';
      const box = document.getElementById('vd-result');
      box.className = 'vdrop-result';
      box.innerHTML = '<span class="vdrop-value">–</span>';
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();


/* =========================================================
   THEME TOGGLE
   ========================================================= */
(function () {
  function apply(light) {
    document.body.classList.toggle('light', light);
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = light ? 'Mörkt' : 'Ljust';
  }

  function init() {
    const saved = localStorage.getItem('theme');
    apply(saved === 'light'); // dark is default

    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        btn.textContent = isLight ? 'Mörkt' : 'Ljust';
      });
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();


/* =========================================================
   MOBILE SIDEBAR TOGGLE
   ========================================================= */
(function () {
  function init() {
    const sidebar = document.querySelector('.app-sidebar');
    if (!sidebar) return;

    // Create hamburger button (only shown < 900px via CSS)
    const hamburger = document.createElement('button');
    hamburger.className = 'app-hamburger';
    hamburger.setAttribute('aria-label', 'Öppna meny');
    hamburger.innerHTML = '<span class="material-symbols-outlined">menu</span>';
    document.body.appendChild(hamburger);

    // Overlay backdrop
    const overlay = document.createElement('div');
    overlay.className = 'app-sidebar-overlay';
    document.body.appendChild(overlay);

    function openSidebar() {
      sidebar.classList.add('is-open');
      overlay.classList.add('is-visible');
      document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
      sidebar.classList.remove('is-open');
      overlay.classList.remove('is-visible');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', openSidebar);
    overlay.addEventListener('click', closeSidebar);

    // Close on nav item click (mobile UX)
    sidebar.querySelectorAll('.app-nav-item').forEach(item => {
      item.addEventListener('click', closeSidebar);
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();


/* =========================================================
   EXAMPLE CALCULATION TABS
   ========================================================= */
(function () {
  function init() {
    document.querySelectorAll('.ex-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.ex-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.ex-panel').forEach(p => p.classList.add('hidden'));
        tab.classList.add('active');
        document.getElementById('ex-' + tab.dataset.ex).classList.remove('hidden');
      });
    });
  }
  document.addEventListener('DOMContentLoaded', init);
})();


/* =========================================================
   SEARCH
   ========================================================= */
(function () {
  const INDEX = [
    // ── Ellära ──────────────────────────────────────────────
    // Atomfysik
    { course: 'Ellära', title: 'Atomens uppbyggnad', section: 'Atomfysik', anchor: 'atomfysik.html', keywords: 'atom proton neutron elektron kärna partikel' },
    { course: 'Ellära', title: 'Laddning & Statisk elektricitet', section: 'Atomfysik', anchor: 'atomfysik.html', keywords: 'laddning statisk elektricitet överskott underskott plus minus' },
    { course: 'Ellära', title: 'AC vs DC – Likström & Växelström', section: 'Atomfysik', anchor: 'atomfysik.html', keywords: 'ac dc likström växelström sinuskurva batteri vägguttag riktning' },
    { course: 'Ellära', title: 'Hz – Hertz & frekvens', section: 'Atomfysik', anchor: 'atomfysik.html', keywords: 'hz hertz frekvens 50hz 60hz svängningar sekund europa usa' },
    // Material
    { course: 'Ellära', title: 'Ledare, Halvledare & Isolatorer', section: 'Material', anchor: 'material.html', keywords: 'ledare halvledare isolator koppar aluminium resistivitet material' },
    { course: 'Ellära', title: 'Resistivitetstabell', section: 'Material', anchor: 'material.html', keywords: 'resistivitet rho tabell koppar aluminium silver guld järn' },
    // Symboler
    { course: 'Ellära', title: 'Elsymboler (IEC 60617)', section: 'Symboler', anchor: 'symboler.html', keywords: 'elsymboler iec kretschema batteri resistor kondensator spole lampa strömbrytare' },
    { course: 'Ellära', title: 'Vad är IEC?', section: 'Symboler', anchor: 'symboler.html', keywords: 'iec international electrotechnical commission standard organisation' },
    { course: 'Ellära', title: 'Minneslista – storheter & enheter', section: 'Symboler', anchor: 'symboler.html', keywords: 'storhet enhet volt ampere ohm watt hertz joule coulomb symbol' },
    // Kabeltyper
    { course: 'Ellära', title: 'Kabeltyper – EK, FK, MK, RK', section: 'Kabeltyper', anchor: 'kabeltyper.html', keywords: 'kabel ek fk mk rk enfasig trefasig installation kabeltyp' },
    // Kabeldimensionering
    { course: 'Ellära', title: 'Kabeldimensionering – säkring & area', section: 'Kabeldim.', anchor: 'kabeldim.html', keywords: 'kabeldimensionering säkring area 6a 10a 16a 20a 25a 35a 50a kabel koppar area mm2' },
    { course: 'Ellära', title: 'Spänningsfall – kalkylator', section: 'Kabeldim.', anchor: 'kabeldim.html', keywords: 'spänningsfall kalkylator deltau 4% 9.2v max tillåtet koppar aluminium' },
    // Kretsar
    { course: 'Ellära', title: 'Ohms lag – U = R · I', section: 'Kretsar', anchor: 'kretsar.html', keywords: 'ohm ohms lag u r i spänning resistans ström beräkna formel' },
    { course: 'Ellära', title: 'Effektlagen – P = U · I', section: 'Kretsar', anchor: 'kretsar.html', keywords: 'effekt p u i watt effektlagen formel beräkna' },
    { course: 'Ellära', title: 'R = ρ · L/A – alla varianter', section: 'Kretsar', anchor: 'kretsar.html', keywords: 'rho resistivitet längd area resistans ledare formel varianter' },
    { course: 'Ellära', title: 'Seriekoppling', section: 'Kretsar', anchor: 'kretsar.html', keywords: 'serie seriekrets seriekoppling rtot summera resistans ström itot ur1 ur2' },
    { course: 'Ellära', title: 'Parallellkoppling', section: 'Kretsar', anchor: 'kretsar.html', keywords: 'parallell parallellkrets parallellkoppling rtot invers bråk spänning grenar i1 i2' },
    { course: 'Ellära', title: 'Kirchhoffs strömlag – KCL', section: 'Kretsar', anchor: 'kretsar.html', keywords: 'kirchhoff kcl strömlag nod ström in ut summa förgrening kirchoffs lag' },
    { course: 'Ellära', title: 'Kirchhoffs spänningslag – KVL', section: 'Kretsar', anchor: 'kretsar.html', keywords: 'kirchhoff kvl spänningslag slinga summa noll spänningsfall källspänning kirchoffs lag' },
    { course: 'Ellära', title: 'Mätteknik – Amperemeter & Voltmeter', section: 'Kretsar', anchor: 'kretsar.html', keywords: 'amperemeter voltmeter mäta serie parallell koppla mätteknik' },
    { course: 'Ellära', title: 'Transformatorn – varvsförhållande & effektbalans', section: 'Kretsar', anchor: 'kretsar.html', keywords: 'transformator varv n1 n2 u1 u2 i1 i2 effektbalans spänning steg upp ner' },
    { course: 'Ellära', title: 'Exempelräkning – Seriekrets', section: 'Kretsar', anchor: 'kretsar.html', keywords: 'exempel exempelräkning seriekrets serie rtot itot ur1 ur2 steg beräkning genomgång' },
    { course: 'Ellära', title: 'Exempelräkning – Parallellkrets', section: 'Kretsar', anchor: 'kretsar.html', keywords: 'exempel exempelräkning parallellkrets parallell rtot itot i1 i2 steg beräkning genomgång' },
    { course: 'Ellära', title: 'Exempelräkning – Kombinerad krets', section: 'Kretsar', anchor: 'kretsar.html', keywords: 'exempel exempelräkning kombinerad krets kombi blandad serie parallell rpar rtot steg beräkning' },
    // Trefas
    { course: 'Ellära', title: 'Trefas – fas- och linjespänning', section: 'Trefas', anchor: 'trefas.html', keywords: 'trefas fasspänning linjespänning 230v 400v rot3 sqrt3 1.732 fas neutral' },
    { course: 'Ellära', title: 'Sinusformad spänning & toppvärde', section: 'Trefas', anchor: 'trefas.html', keywords: 'sinus sinusvåg toppvärde upeak urms effektivvärde 325v rot2 frekvens period' },
    { course: 'Ellära', title: 'EMK & Mot-EMK', section: 'Trefas', anchor: 'trefas.html', keywords: 'emk elektromotorisk kraft mot-emk motor generator inducerad spänning magnetfält' },
    { course: 'Ellära', title: 'Spole & Induktiv reaktans X_L', section: 'Trefas', anchor: 'trefas.html', keywords: 'spole induktans reaktans xl induktiv 2pifL henry släpar fasförskjutning' },
    { course: 'Ellära', title: 'Kondensator & Kapacitiv reaktans X_C', section: 'Trefas', anchor: 'trefas.html', keywords: 'kondensator kapacitans reaktans xc kapacitiv farad leder fasförskjutning' },
    { course: 'Ellära', title: 'Fasförskjutning & Impedans Z', section: 'Trefas', anchor: 'trefas.html', keywords: 'fasförskjutning impedans z resistans reaktans vinkel phi grader radianer' },
    { course: 'Ellära', title: 'Effekttyper – P, Q och S', section: 'Trefas', anchor: 'trefas.html', keywords: 'effekttyper aktiv reaktiv skenbar p q s watt var voltampere effektfaktor cos phi trefas' },
    // Skydd
    { course: 'Ellära', title: 'Säkringar & automatsäkringar', section: 'Skydd', anchor: 'skydd.html', keywords: 'säkring automatsäkring b c d-klass utlösningsström kortslutning överström MCB' },
    { course: 'Ellära', title: 'Jordfelsbrytare (JFB)', section: 'Skydd', anchor: 'skydd.html', keywords: 'jordfelsbrytare jfb 30ma 300ma läckström personskydd brandskydd RCD RCCB' },
    { course: 'Ellära', title: 'Nödstopp & Arbetsbrytare', section: 'Skydd', anchor: 'skydd.html', keywords: 'nödstopp arbetsbrytare brytare röd svamp låsbar säkerhet maskinsäkerhet' },
    { course: 'Ellära', title: 'Överspänningsskydd & Transient', section: 'Skydd', anchor: 'skydd.html', keywords: 'överspänning transient blixt åsknedslag smutsig el varistor spänningspik skydd' },
    { course: 'Ellära', title: 'Kabeldimensionering & skydd', section: 'Skydd', anchor: 'skydd.html', keywords: 'kabeldim 1.5mm 2.5mm 10a 16a säkring halogenfri kabel' },
    // Installation
    { course: 'Ellära', title: 'Ledarfärger & postbeteckning', section: 'Installation', anchor: 'installation.html', keywords: 'ledarfärg brun svart grå blå grön gul PE N L1 L2 L3 PEN postbeteckning F1 Q1 K1' },
    { course: 'Ellära', title: 'Säkringstabell – area & säkring', section: 'Installation', anchor: 'installation.html', keywords: 'säkring säkringstabell 6a 10a 16a 20a 25a ledarfärg area kabel grön röd grå blå gul' },
    { course: 'Ellära', title: 'Spänningsfall – förklaring & kalkylator', section: 'Installation', anchor: 'installation.html', keywords: 'spänningsfall deltau 4% kalkylator installation standard ledare resistans' },
    { course: 'Ellära', title: 'Elcentralen – skenor & matning', section: 'Installation', anchor: 'installation.html', keywords: 'elcentral skena DIN PE neutral fas säkring JFB huvudbrytare matning TN-C TN-S' },
    { course: 'Ellära', title: 'Nätstationen – 10/20 kV → 400 V', section: 'Installation', anchor: 'installation.html', keywords: 'nätstation transformator 10kv 20kv 400v distribution jordplatta PEN ledare' },
    // Tecken
    { course: 'Ellära', title: 'Elektriska storheter & enheter (U, I, R, P…)', section: 'Tecken', anchor: 'tecken.html', keywords: 'teckenförklaring symbol variabel spänning u volt ström i ampere resistans r ohm effekt p watt frekvens hz laddning coulomb' },
    { course: 'Ellära', title: 'Materialegenskaper (ρ, L, A)', section: 'Tecken', anchor: 'tecken.html', keywords: 'rho resistivitet längd area material koppar aluminium ledare' },
    { course: 'Ellära', title: 'Enhetsprefix (M, k, m, μ)', section: 'Tecken', anchor: 'tecken.html', keywords: 'prefix mega kilo milli mikro enhet potens faktor storlek' },
    { course: 'Ellära', title: 'AC-storheter (Z, X_L, X_C, ω, S, cos φ)', section: 'Tecken', anchor: 'tecken.html', keywords: 'impedans reaktans vinkelfrekvens skenbar effekt effektfaktor z xl xc omega cos phi ac' },
    { course: 'Ellära', title: 'Kretsschema-symboler', section: 'Tecken', anchor: 'tecken.html', keywords: 'symbol batteri resistor lampa kondensator spole diod brytare säkring jord amperemeter voltmeter kretsschema' },
    // Matematik
    { course: 'Ellära', title: 'Bråkräkning – förkorta, addera, subtrahera', section: 'Matematik', anchor: 'matematik.html', keywords: 'bråk täljare nämnare förkorta addera subtrahera LCD minsta gemensamma nämnare' },
    { course: 'Ellära', title: 'Enhetsprefix – omvandlingar (k, m, μ, M)', section: 'Matematik', anchor: 'matematik.html', keywords: 'prefix kilo milli mikro mega omvandla 1000 0.001 potens tiopotens' },
    { course: 'Ellära', title: 'Pythagoras sats – impedanstriangeln', section: 'Matematik', anchor: 'matematik.html', keywords: 'pythagoras sats a2 b2 c2 hypotenusa impedans effekttriangel vinkel' },
    { course: 'Ellära', title: 'Procenträkning', section: 'Matematik', anchor: 'matematik.html', keywords: 'procent % beräkna andel spänningsfall 4% av 230v' },
    // Formelblad
    { course: 'Ellära', title: 'Formelblad – alla formler samlade', section: 'Formelblad', anchor: 'formler.html', keywords: 'formelblad alla formler ohms lag effekt reaktans impedans trefas spänningsfall serie parallell transformator' },

    // ── Installationsteknik – Nivå 1 ────────────────────────
    // (Lägg till poster här allt eftersom kapitel byggs ut)
    { course: 'Installationsteknik', title: 'Kursöversikt – Installationsteknik Nivå 1', section: 'Hem', anchor: '../installationsteknik/index.html', keywords: 'installationsteknik nivå 1 förläggning kapsling motorer styrning säkerhet ritningar felsökning hållbarhet' },
  ];

  let activeIdx = -1;

  function highlight(text, query) {
    const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(re, '<mark>$1</mark>');
  }

  function search(query) {
    if (!query) return [];
    const q = query.toLowerCase().trim();
    return INDEX.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.keywords.toLowerCase().includes(q) ||
      item.section.toLowerCase().includes(q)
    );
  }

  function renderResults(results, query) {
    const list = document.getElementById('search-results');
    activeIdx = -1;
    if (!results.length) {
      list.innerHTML = `<li class="search-no-results">Inga träffar för "<strong>${query}</strong>"</li>`;
      list.classList.add('visible');
      return;
    }
    list.innerHTML = results.map((r, i) => `
      <li data-anchor="${r.anchor}" data-idx="${i}">
        <span class="search-result-section">${r.course ? `<span class="search-result-course">${r.course}</span> ` : ''}${r.section}</span>
        <span class="search-result-title">${highlight(r.title, query)}</span>
      </li>`).join('');
    list.classList.add('visible');

    list.querySelectorAll('li[data-anchor]').forEach(li => {
      li.addEventListener('click', () => goTo(li.dataset.anchor));
    });
  }

  function goTo(anchor) {
    window.location.href = anchor;
    closeResults();
    document.getElementById('search-input').blur();
  }

  function closeResults() {
    document.getElementById('search-results').classList.remove('visible');
    activeIdx = -1;
  }

  function init() {
    const input   = document.getElementById('search-input');
    const clearBtn = document.getElementById('search-clear');
    const list    = document.getElementById('search-results');

    input.addEventListener('input', () => {
      const q = input.value.trim();
      clearBtn.classList.toggle('visible', q.length > 0);
      if (!q) { closeResults(); return; }
      renderResults(search(q), q);
    });

    // Keyboard navigation
    input.addEventListener('keydown', e => {
      const items = list.querySelectorAll('li[data-anchor]');
      if (!items.length) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIdx = Math.min(activeIdx + 1, items.length - 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIdx = Math.max(activeIdx - 1, 0);
      } else if (e.key === 'Enter' && activeIdx >= 0) {
        goTo(items[activeIdx].dataset.anchor);
        return;
      } else if (e.key === 'Escape') {
        closeResults(); return;
      } else { return; }
      items.forEach((li, i) => li.classList.toggle('active', i === activeIdx));
      items[activeIdx]?.scrollIntoView({ block: 'nearest' });
    });

    clearBtn.addEventListener('click', () => {
      input.value = '';
      clearBtn.classList.remove('visible');
      closeResults();
      input.focus();
    });

    document.addEventListener('click', e => {
      if (!document.getElementById('search-wrap').contains(e.target)) closeResults();
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();


/* =========================================================
   HELPER
   ========================================================= */
function format(n) {
  if (Math.abs(n) < 0.001) return n.toExponential(3);
  if (Math.abs(n) >= 10000) return n.toFixed(0);
  if (Math.abs(n) >= 1000)  return n.toFixed(1);
  if (Math.abs(n) >= 10)    return n.toFixed(2);
  return n.toFixed(4).replace(/\.?0+$/, '');
}


/* =========================================================
   EXERCISES
   ========================================================= */
(function () {

  /* ------ Exercise data ------ */
  const CATEGORIES = [
    {
      name: '⚛️ Atomfysik & Grundbegrepp',
      exercises: [
        {
          type: 'mc',
          question: 'Vilken partikel har negativ elektrisk laddning?',
          options: ['Proton', 'Neutron', 'Elektron'],
          answer: 2,
          explanation: 'Elektronen har laddning −1. Protonen har +1 och neutronen är neutral (0).'
        },
        {
          type: 'numeric',
          question: 'En neutral syrgasatom har 8 protoner. Hur många elektroner har den?',
          hint: 'Neutral atom → #elektroner = #protoner',
          answer: 8,
          unit: 'st',
          tolerance: 0,
          explanation: 'En neutral atom har alltid lika många elektroner som protoner. 8 protoner → 8 elektroner.'
        },
        {
          type: 'mc',
          question: 'Vad karaktäriserar växelström (AC)?',
          options: ['Konstant spänning i en riktning', 'Sinusformig spänning som byter riktning', 'Pulsad spänning med hög frekvens'],
          answer: 1,
          explanation: 'AC (Alternating Current) svänger sinusformigt och byter riktning. I Sverige: 230 V / 50 Hz.'
        },
        {
          type: 'mc',
          question: 'Vad händer med en atom som förlorar 2 elektroner?',
          options: ['Den blir positivt laddad (+2)', 'Den blir negativt laddad (−2)', 'Den blir neutral', 'Den splittras'],
          answer: 0,
          explanation: 'Varje förlorad elektron (−1) ger överskott av protoner (+1). Förlorar 2 elektroner → laddning +2.'
        },
        {
          type: 'numeric',
          question: 'Elnätet i Sverige har frekvensen 50 Hz. Hur lång är en period T (i ms)?',
          hint: 'T = <span class="frac"><span>1</span><span>f</span></span>. Svara i millisekunder.',
          answer: 20,
          unit: 'ms',
          tolerance: 0,
          explanation: 'T = <span class="frac"><span>1</span><span>f</span></span> = <span class="frac"><span>1</span><span>50</span></span> = 0,02 s = 20 ms. En hel sinussvängning tar alltså 20 millisekunder.'
        },
        {
          type: 'mc',
          question: 'Vad är en jon?',
          options: [
            'En atom med lika många protoner och elektroner',
            'En atom med fler eller färre elektroner än protoner',
            'En atomkärna utan elektronskal'
          ],
          answer: 1,
          explanation: 'En jon är en laddad atom. Positiv jon (katjon) = färre elektroner än protoner. Negativ jon (anjon) = fler elektroner.'
        },
        {
          type: 'mc',
          question: 'Vilket material är bäst lämpad som elektrisk ledare?',
          options: ['Glas', 'Koppar', 'Plast', 'Gummi'],
          answer: 1,
          explanation: 'Koppar har mycket lågt resistivitet (ρ ≈ 0,017 Ω·mm²/m) och används i nästan all elkabel. Glas, plast och gummi är isolatorer.'
        },
        {
          type: 'mc',
          question: 'Vad mäter en voltmeter?',
          options: ['Strömmen genom en komponent', 'Spänningsskillnaden mellan två punkter', 'Resistansen i en ledare'],
          answer: 1,
          explanation: 'En voltmeter mäter potentialskillnaden (spänningen) mellan sina mätspetsar. Den kopplas parallellt med det som ska mätas.'
        }
      ]
    },
    {
      name: '⚡ Ohms lag & Effekt',
      exercises: [
        {
          type: 'numeric',
          question: 'En krets har spänningen U = 12 V och resistansen R = 4 Ω. Hur stor är strömmen I?',
          hint: 'I = <span class="frac"><span>U</span><span>R</span></span>',
          answer: 3,
          unit: 'A',
          explanation: 'I = <span class="frac"><span>U</span><span>R</span></span> = <span class="frac"><span>12</span><span>4</span></span> = 3 A'
        },
        {
          type: 'numeric',
          question: 'En ström på I = 3 A flödar genom ett motstånd R = 20 Ω. Vad är spänningen U?',
          hint: 'U = R · I',
          answer: 60,
          unit: 'V',
          explanation: 'U = R · I = 20 · 3 = 60 V'
        },
        {
          type: 'numeric',
          question: 'En vattenkokare drar I = 8,7 A vid spänningen U = 230 V. Vad är effekten P?',
          hint: 'P = U · I',
          answer: 2001,
          unit: 'W',
          tolerance: 0.02,
          explanation: 'P = U · I = 230 · 8,7 = 2 001 W ≈ 2 000 W (2 kW)'
        },
        {
          type: 'numeric',
          question: 'En mikrovågsugn har effekten P = 1 150 W vid U = 230 V. Hur stor är strömmen I?',
          hint: 'I = <span class="frac"><span>P</span><span>U</span></span>',
          answer: 5,
          unit: 'A',
          explanation: 'I = <span class="frac"><span>P</span><span>U</span></span> = <span class="frac"><span>1 150</span><span>230</span></span> = 5 A'
        },
        {
          type: 'numeric',
          question: 'En elspis drar I = 13 A från elnätet (U = 230 V). Vad är resistansen R?',
          hint: 'R = <span class="frac"><span>U</span><span>I</span></span>',
          answer: 17.69,
          unit: 'Ω',
          tolerance: 0.05,
          explanation: 'R = <span class="frac"><span>U</span><span>I</span></span> = <span class="frac"><span>230</span><span>13</span></span> ≈ 17,7 Ω'
        },
        {
          type: 'numeric',
          question: 'En glödlampa har R = 1 000 Ω och kopplas till U = 230 V. Hur stor effekt P utvecklar den?',
          hint: 'P = <span class="frac"><span>U²</span><span>R</span></span>',
          answer: 52.9,
          unit: 'W',
          tolerance: 0.05,
          explanation: 'P = <span class="frac"><span>U²</span><span>R</span></span> = <span class="frac"><span>230²</span><span>1 000</span></span> = <span class="frac"><span>52 900</span><span>1 000</span></span> = 52,9 W'
        },
        {
          type: 'numeric',
          question: 'En elvärmare har P = 2 000 W och R = 26,45 Ω. Hur stor ström I flödar?',
          hint: 'I = √(<span class="frac"><span>P</span><span>R</span></span>)',
          answer: 8.7,
          unit: 'A',
          tolerance: 0.05,
          explanation: 'I = √(<span class="frac"><span>P</span><span>R</span></span>) = √(<span class="frac"><span>2 000</span><span>26,45</span></span>) ≈ 8,7 A. (Eller: I = <span class="frac"><span>P</span><span>U</span></span> = <span class="frac"><span>2 000</span><span>230</span></span> ≈ 8,7 A)'
        },
        {
          type: 'mc',
          question: 'Vilket uttryck för effekt P är korrekt när du känner till U och R?',
          options: ['P = U · R', 'P = <span class="frac"><span>U²</span><span>R</span></span>', 'P = <span class="frac"><span>R</span><span>U²</span></span>', 'P = <span class="frac"><span>U</span><span>R²</span></span>'],
          answer: 1,
          explanation: 'P = <span class="frac"><span>U²</span><span>R</span></span>. Härleds ur P = U · I och Ohms lag I = <span class="frac"><span>U</span><span>R</span></span>: P = U · <span class="frac"><span>U</span><span>R</span></span> = <span class="frac"><span>U²</span><span>R</span></span>.'
        }
      ]
    },
    {
      name: '🔌 Kretsar & Mätteknik',
      exercises: [
        {
          type: 'numeric',
          question: 'Tre resistorer kopplas i serie: R₁ = 100 Ω, R₂ = 150 Ω, R₃ = 250 Ω. Vad är R_tot?',
          hint: 'R_tot = R₁ + R₂ + R₃',
          answer: 500,
          unit: 'Ω',
          explanation: 'R_tot = 100 + 150 + 250 = 500 Ω. Vid seriekoppling summeras alltid resistanserna.'
        },
        {
          type: 'numeric',
          question: 'Två resistorer kopplas i parallell: R₁ = 6 Ω, R₂ = 12 Ω. Vad är R_tot?',
          hint: '<span class="frac"><span>1</span><span>R_tot</span></span> = <span class="frac"><span>1</span><span>R₁</span></span> + <span class="frac"><span>1</span><span>R₂</span></span>',
          answer: 4,
          unit: 'Ω',
          explanation: '<span class="frac"><span>1</span><span>R_tot</span></span> = <span class="frac"><span>1</span><span>6</span></span> + <span class="frac"><span>1</span><span>12</span></span> = <span class="frac"><span>2</span><span>12</span></span> + <span class="frac"><span>1</span><span>12</span></span> = <span class="frac"><span>3</span><span>12</span></span> → R_tot = <span class="frac"><span>12</span><span>3</span></span> = 4 Ω. Parallellt ger alltid lägre resistans än den minsta.'
        },
        {
          type: 'mc',
          question: 'Hur kopplas en amperemeter in i en krets?',
          options: ['I serie med lasten', 'Parallellt med lasten', 'Parallellt med spänningskällan'],
          answer: 0,
          explanation: 'Amperemetern kopplas i serie – all ström måste flöda genom den. Internmotståndet ≈ 0 Ω för att inte påverka kretsen.'
        },
        {
          type: 'mc',
          question: 'Vad händer om du kopplar en voltmeter i serie (fel koppling)?',
          options: ['Inget – voltmetern fungerar ändå', 'Strömmen stoppas – kretsen slutar fungera', 'Spänningen dubbleras'],
          answer: 1,
          explanation: 'Voltmetern har mycket högt internmotstånd (≈ ∞). I serie blockerar den all ström och kretsen slutar fungera.'
        },
        {
          type: 'numeric',
          question: 'Tre resistorer R₁ = 15 Ω, R₂ = 20 Ω, R₃ = 30 Ω kopplas parallellt till U = 120 V. Vad är strömmen I_R2?',
          hint: 'I_R2 = <span class="frac"><span>U</span><span>R₂</span></span> (samma spänning över alla grenar)',
          answer: 6,
          unit: 'A',
          explanation: 'I parallellkrets gäller samma spänning: I_R2 = <span class="frac"><span>U</span><span>R₂</span></span> = <span class="frac"><span>120</span><span>20</span></span> = 6 A'
        },
        {
          type: 'numeric',
          question: 'En seriekrets har U_tot = 24 V, R₁ = 4 Ω, R₂ = 8 Ω. Vad är spänningen U_R1 över R₁?',
          hint: 'I = <span class="frac"><span>U_tot</span><span>R_tot</span></span>, sedan U_R1 = R₁ · I',
          answer: 8,
          unit: 'V',
          explanation: 'R_tot = 4 + 8 = 12 Ω. I = <span class="frac"><span>24</span><span>12</span></span> = 2 A. U_R1 = R₁ · I = 4 · 2 = 8 V. (Kontroll: U_R2 = 8 · 2 = 16 V. 8 + 16 = 24 V ✓)'
        },
        {
          type: 'numeric',
          question: 'Tre resistorer R₁ = 15 Ω, R₂ = 20 Ω, R₃ = 30 Ω kopplas parallellt. Vad är R_tot?',
          hint: '<span class="frac"><span>1</span><span>R_tot</span></span> = <span class="frac"><span>1</span><span>15</span></span> + <span class="frac"><span>1</span><span>20</span></span> + <span class="frac"><span>1</span><span>30</span></span>. Hitta gemensam nämnare (60).',
          answer: 6.67,
          unit: 'Ω',
          tolerance: 0.05,
          explanation: '<span class="frac"><span>1</span><span>R_tot</span></span> = <span class="frac"><span>4</span><span>60</span></span> + <span class="frac"><span>3</span><span>60</span></span> + <span class="frac"><span>2</span><span>60</span></span> = <span class="frac"><span>9</span><span>60</span></span> = <span class="frac"><span>3</span><span>20</span></span>. R_tot = <span class="frac"><span>20</span><span>3</span></span> ≈ 6,67 Ω'
        },
        {
          type: 'mc',
          question: 'Vad gäller för strömmar i en parallellkrets (Kirchhoffs strömlag)?',
          options: [
            'Strömmen är lika stor i alla grenar',
            'Summan av inkommande strömmar = summan av utgående strömmar i varje nod',
            'Strömmen halveras för varje gren man lägger till'
          ],
          answer: 1,
          explanation: 'KCL: I en nod är summan av inflödande ström = summan av utflödande. I_tot = I₁ + I₂ + I₃. Ingen ström "försvinner".'
        }
      ]
    },
    {
      name: '🏗️ Installation & Dimensionering',
      exercises: [
        {
          type: 'numeric',
          question: 'Beräkna resistansen i en kopparledare: L = 25 m, A = 1,5 mm². (ρ_Cu = 0,018 Ω·mm²/m)',
          hint: 'R = <span class="frac"><span>ρ · L</span><span>A</span></span>',
          answer: 0.30,
          unit: 'Ω',
          tolerance: 0.03,
          explanation: 'R = <span class="frac"><span>0,018·25</span><span>1,5</span></span> = <span class="frac"><span>0,45</span><span>1,5</span></span> = 0,30 Ω'
        },
        {
          type: 'mc',
          question: 'Vilken minsta ledararea (mm²) krävs för en 16 A säkring?',
          options: ['1,5 mm²', '2,5 mm²', '4,0 mm²', '6,0 mm²'],
          answer: 1,
          explanation: '16 A → 2,5 mm² (grå). 1,5 mm² är för 10 A och 4,0 mm² för 20 A. Fel area ger brandrisk!'
        },
        {
          type: 'numeric',
          question: 'Beräkna spänningsfallet i %: I = 16 A, L = 30 m, A = 2,5 mm², koppar (ρ = 0,018), U_nom = 230 V.',
          hint: 'U_fall = <span class="frac"><span>2·ρ·L·I</span><span>A</span></span> → % = <span class="frac"><span>U_fall</span><span>U_nom</span></span> · 100',
          answer: 3.01,
          unit: '%',
          tolerance: 0.1,
          explanation: 'U_fall = <span class="frac"><span>2·0,018·30·16</span><span>2,5</span></span> = 6,912 V → <span class="frac"><span>6,912</span><span>230</span></span> · 100 ≈ 3,0 % (OK – under 4 %)'
        },
        {
          type: 'mc',
          question: 'Vad är det maximalt tillåtna spänningsfallet i en installation (SS 437 01 40)?',
          options: ['2 %', '3 %', '4 %', '5 %'],
          answer: 2,
          explanation: '4 % är gränsen enligt svensk standard. Vid 230 V = max 9,2 V spänningsfall. Överskrids det är installationen inte godkänd.'
        },
        {
          type: 'numeric',
          question: 'En aluminiumledare: L = 40 m, A = 4 mm². (ρ_Al = 0,029 Ω·mm²/m). Beräkna R.',
          hint: 'R = <span class="frac"><span>ρ · L</span><span>A</span></span>',
          answer: 0.29,
          unit: 'Ω',
          tolerance: 0.02,
          explanation: 'R = <span class="frac"><span>0,029·40</span><span>4</span></span> = <span class="frac"><span>1,16</span><span>4</span></span> = 0,29 Ω. Aluminium leder sämre än koppar — används mest i starkström och kablar utomhus.'
        },
        {
          type: 'numeric',
          question: 'Beräkna spänningsfallet (V): I = 10 A, L = 20 m, A = 1,5 mm², koppar (ρ = 0,018).',
          hint: 'U_fall = <span class="frac"><span>2·ρ·L·I</span><span>A</span></span>',
          answer: 4.8,
          unit: 'V',
          tolerance: 0.1,
          explanation: 'U_fall = <span class="frac"><span>2·0,018·20·10</span><span>1,5</span></span> = <span class="frac"><span>7,2</span><span>1,5</span></span> = 4,8 V. Vid 230 V: <span class="frac"><span>4,8</span><span>230</span></span>·100 ≈ 2,1 % (OK).'
        },
        {
          type: 'mc',
          question: 'Vilken minsta ledararea (mm²) krävs för en 20 A säkring?',
          options: ['1,5 mm²', '2,5 mm²', '4,0 mm²', '6,0 mm²'],
          answer: 2,
          explanation: '20 A → 4,0 mm² (gul). 2,5 mm² klarar 16 A. Använder du för liten area överhettas kabeln.'
        },
        {
          type: 'mc',
          question: 'Varför gångrar man med 2 i spänningsfallsformeln (U_fall = 2·ρ·L·I/A)?',
          options: [
            'För att säkerhetsmarginalen alltid ska vara dubbel',
            'För att strömmen flödar både fram och tillbaka (retur)',
            'För att AC-spänning är √2 gånger toppvärdet'
          ],
          answer: 1,
          explanation: 'Strömmen flödar ut till lasten OCH tillbaka. Totala ledarlängden är 2 × L. Därav faktorn 2.'
        }
      ]
    },
    {
      name: '🔄 Trefas',
      exercises: [
        {
          type: 'numeric',
          question: 'Fasspänningen i ett trefasnät är U_f = 230 V. Vad är linjespänningen U_L?',
          hint: 'U_L = √3 · U_f ≈ 1,732 · U_f',
          answer: 400,
          unit: 'V',
          tolerance: 0.02,
          explanation: 'U_L = √3 · 230 ≈ 1,732 · 230 ≈ 400 V. Det är därför vi säger "400/230 V" för trefasnätet.'
        },
        {
          type: 'numeric',
          question: 'Linjespänningen är U_L = 400 V. Vad är fasspänningen U_f?',
          hint: 'U_f = <span class="frac"><span>U_L</span><span>√3</span></span> ≈ <span class="frac"><span>U_L</span><span>1,732</span></span>',
          answer: 231,
          unit: 'V',
          tolerance: 0.02,
          explanation: 'U_f = <span class="frac"><span>400</span><span>1,732</span></span> ≈ 231 V ≈ 230 V. Det är spänningen i vanliga hushållsuttag.'
        },
        {
          type: 'mc',
          question: 'Hur stor är fasförskjutningen mellan faserna i ett trefassystem?',
          options: ['90°', '120°', '180°', '60°'],
          answer: 1,
          explanation: '360° / 3 faser = 120° mellan varje fas. Faserna kallas L1, L2, L3 och är sinusvågor 120° förskjutna.'
        },
        {
          type: 'numeric',
          question: 'En trefasmotor: U_L = 400 V, I = 10 A, cosφ = 0,8. Beräkna aktiv effekt P.',
          hint: 'P = √3 · U_L · I · cosφ',
          answer: 5543,
          unit: 'W',
          tolerance: 0.02,
          explanation: 'P = √3 · 400 · 10 · 0,8 = 1,732 · 400 · 10 · 0,8 ≈ 5 543 W ≈ 5,5 kW'
        },
        {
          type: 'mc',
          question: 'Vad innebär cosφ = 1 (effektfaktor = 1)?',
          options: [
            'Lasten är rent resistiv — all effekt är aktiv',
            'Lasten är rent induktiv — all effekt är reaktiv',
            'Lasten drar dubbel ström'
          ],
          answer: 0,
          explanation: 'cosφ = 1 (φ = 0°) → ström och spänning är i fas. All tillförd effekt används som aktiv effekt. Typiskt för glödlampor och elradiatorer.'
        },
        {
          type: 'mc',
          question: 'Vilken fördel har trefas jämfört med enfas för kraftöverföring?',
          options: [
            'Lägre frekvens ger mindre förluster',
            'Tre gånger mer effekt med samma ledartjocklek och spänning',
            'Trefas har alltid lägre spänning'
          ],
          answer: 1,
          explanation: 'Med tre faser kan man överföra tre gånger mer effekt med samma kabelarea och spänning — eller samma effekt med tunnare kablar. Dessutom ger trefas en konstant totaleffekt.'
        }
      ]
    },
    {
      name: '🛡️ Skydd & Säkerhet',
      exercises: [
        {
          type: 'mc',
          question: 'Vad skyddar en säkring primärt mot?',
          options: ['Jordfel (läckström till jord)', 'Överström som kan överhetta kabeln', 'Spänningsfall i ledaren'],
          answer: 1,
          explanation: 'Säkringen bryter vid för hög ström för att skydda kabeln från överhettning och brand. Den skyddar INTE mot jordfel — det gör jordfelsbrytaren.'
        },
        {
          type: 'mc',
          question: 'Vid vilken utlösningsström bryter en jordfelsbrytare (RCD) för personskydd?',
          options: ['30 mA', '100 mA', '300 mA', '500 mA'],
          answer: 0,
          explanation: '30 mA (0,03 A) är gränsen för personskydd. Redan 25–50 mA kan orsaka kammarflimmer. 100 mA eller 300 mA används för egendomsskydd (t.ex. brandskydd).'
        },
        {
          type: 'mc',
          question: 'Vad är skillnaden mellan en jordfelsbrytare och ett överspänningsskydd?',
          options: [
            'Jordfelsbrytaren skyddar mot läckström; överspänningsskyddet mot spännigtoppar',
            'De skyddar mot samma sak men med olika känslighet',
            'Jordfelsbrytaren skyddar mot blixtnedslag'
          ],
          answer: 0,
          explanation: 'Jordfelsbrytare (RCD) känner av skillnad i ström (ut vs in). Överspänningsskydd (SPD) begränsar spännigtoppar från t.ex. blixtnedslag eller nätfel.'
        },
        {
          type: 'mc',
          question: 'En B16-automatsäkring löser ut. Vad betyder "B"?',
          options: [
            'Säkringen är av typ B (medelhög utlösningskänslighet)',
            'Säkringen är blå',
            'Säkringen klarar max 16 kW'
          ],
          answer: 0,
          explanation: 'B-kurvan anger utlösningskarakteristiken. B = utlöser vid 3–5 × märkström. C = 5–10 × (för motorer). D = 10–20 × (stora startströmmar).'
        },
        {
          type: 'mc',
          question: 'Vad menas med skyddsjord (PE)?',
          options: [
            'En ledare som ansluter metalldelar till jord för att förhindra farlig beröringsspänning',
            'En extra neutralledare för att balansera trefassystemet',
            'En isoleringstejp som täcker skarvar'
          ],
          answer: 0,
          explanation: 'PE (Protective Earth) kopplar alla exponerade metalldelar (hus på apparater) till jord. Vid isolationsfel flödar strömmen via PE och löser ut säkringen — inte via personen.'
        },
        {
          type: 'mc',
          question: 'Vilket av dessa påståenden om en automatsäkring är korrekt?',
          options: [
            'Den kan återställas manuellt efter utlösning',
            'Den måste bytas ut varje gång den löser ut',
            'Den skyddar enbart mot kortslutning, inte mot överbelastning'
          ],
          answer: 0,
          explanation: 'Automatsäkringen har en återställningsknapp — tryck in och den är klar igen. En smältsäkring däremot måste bytas. Automaten skyddar mot BÅDE kortslutning och överbelastning.'
        },
        {
          type: 'mc',
          question: 'Vad händer med PEN-skruven i en DiAze-central när man ska installera en jordfelsbrytare?',
          options: [
            'Den skruvas IN så att PE och N separeras',
            'Den skruvas UT så att PE och N separeras',
            'Den lämnas orörd — JFB kopplas direkt på PEN'
          ],
          answer: 0,
          explanation: 'PEN-skruven är högergängad men med omvänd funktion: skruvas IN → PE och N separeras (JFB kan installeras). Skruvas UT → PE och N kopplas ihop till PEN igen.'
        },
        {
          type: 'mc',
          question: 'Vilken utlösningsnivå har en jordfelsbrytare för förhöjt personskydd (t.ex. i dagis eller vid badkar)?',
          options: ['30 mA', '10 mA', '100 mA', '300 mA'],
          answer: 1,
          explanation: '10 mA används där extra skydd krävs — t.ex. i barns miljöer, vid badkar och dusch. Standard personskydd är 30 mA. 300 mA används för brand- och egendomsskydd i industri.'
        },
        {
          type: 'mc',
          question: 'Vad är gränsen mellan lågspänning och högspänning?',
          options: ['500 V', '750 V', '1 000 V', '1 500 V'],
          answer: 2,
          explanation: 'Lågspänning = upp till 1 000 V AC. Högspänning = över 1 000 V AC. Det svenska elnätet (230/400 V) är lågspänning. Kraftledningar på 10 kV och uppåt är högspänning.'
        }
      ]
    },
    {
      name: '🎨 Ledarfärger & Kabeldimensionering',
      exercises: [
        {
          type: 'mc',
          question: 'Vilken färg har L1 i ett trefassystem enligt svensk standard?',
          options: ['Svart', 'Brun', 'Grå', 'Blå'],
          answer: 1,
          explanation: 'L1 = Brun. Ordning att komma ihåg: L1 Brun, L2 Svart, L3 Grå — enligt SS 4364000 / IEC 60446.'
        },
        {
          type: 'mc',
          question: 'Vilken färg har L2 i ett trefassystem enligt svensk standard?',
          options: ['Brun', 'Grå', 'Svart', 'Vit'],
          answer: 2,
          explanation: 'L2 = Svart. Tänk: L1 Brun, L2 Svart, L3 Grå.'
        },
        {
          type: 'mc',
          question: 'Vilken färg har L3 i ett trefassystem enligt svensk standard?',
          options: ['Brun', 'Svart', 'Blå', 'Grå'],
          answer: 3,
          explanation: 'L3 = Grå. Faserna: L1 Brun, L2 Svart, L3 Grå.'
        },
        {
          type: 'mc',
          question: 'En blå ledare i ett trefassystem representerar vad?',
          options: ['L3 (fas)', 'Skyddsjord (PE)', 'Nolledaren (N)', 'Tändtråd'],
          answer: 2,
          explanation: 'Blå = Nolledare (N). Blå färg är reserverad för neutralledaren och ska aldrig användas som fas- eller skyddsjordsledare.'
        },
        {
          type: 'mc',
          question: 'Vilken färg har skyddsjordsledaren (PE)?',
          options: ['Blå', 'Gul', 'GrönGul', 'Röd'],
          answer: 2,
          explanation: 'Skyddsjord (PE, Protective Earth) = GrönGul. Denna färg är reserverad enbart för skyddsjord och får absolut inte användas till något annat.'
        },
        {
          type: 'mc',
          question: 'Vilka av följande är godkända färger för tändtråd (switched live)?',
          options: [
            'Brun, Svart, Grå',
            'Svart, Vit, Orange, Rosa',
            'Blå, Lila, Röd',
            'Grön, Gul, Turkos'
          ],
          answer: 1,
          explanation: 'Tändtråd (switched live) kan vara Svart, Vit, Orange eller Rosa. Dessa skiljer sig från fasledarna (L1–L3) och nolledaren (blå).'
        },
        {
          type: 'mc',
          question: 'Vad kallas den gröna/gula ledaren med förkortningen PE?',
          options: ['Phase Earth', 'Protective Earth', 'Primary Electrode', 'Power Earth'],
          answer: 1,
          explanation: 'PE = Protective Earth (skyddsjord på svenska). Den kopplar metallhöljen på apparater till jord och löser ut säkringen vid isolationsfel.'
        },
        {
          type: 'mc',
          question: 'Vilken minsta kabelarea (koppar) krävs för en 6 A säkring?',
          options: ['0,75 mm²', '1 mm²', '1,5 mm²', '2,5 mm²'],
          answer: 1,
          explanation: '6 A → 1 mm². Tumregel: 6 A = 1 mm², 10 A = 1,5 mm², 16 A = 2,5 mm², 20 A = 4 mm², 25 A = 6 mm², 32 A = 10 mm².'
        },
        {
          type: 'mc',
          question: 'Vilken minsta kabelarea (koppar) krävs för en 10 A säkring?',
          options: ['1 mm²', '1,5 mm²', '2,5 mm²', '4 mm²'],
          answer: 1,
          explanation: '10 A → 1,5 mm². Gäller normala installationer med kortare längder (60–80 m).'
        },
        {
          type: 'mc',
          question: 'Vilken minsta kabelarea (koppar) krävs för en 16 A säkring?',
          options: ['1,5 mm²', '2,5 mm²', '4 mm²', '6 mm²'],
          answer: 1,
          explanation: '16 A → 2,5 mm². Det vanligaste i vanliga vägguttag i svenska bostäder.'
        },
        {
          type: 'mc',
          question: 'Du ska installera en krets med 25 A säkring. Vilken minsta kabelarea i koppar krävs?',
          options: ['4 mm²', '6 mm²', '10 mm²', '16 mm²'],
          answer: 1,
          explanation: '25 A → 6 mm². Dimensioneringsregel: 25 A = 6 mm², 32 A = 10 mm².'
        },
        {
          type: 'mc',
          question: 'En kabel med area 4 mm² (koppar) — vilken säkring dimensioneras den för?',
          options: ['16 A', '20 A', '25 A', '32 A'],
          answer: 1,
          explanation: '4 mm² = 20 A. Kom ihåg tabellen: 1 mm²=6A, 1,5 mm²=10A, 2,5 mm²=16A, 4 mm²=20A, 6 mm²=25A, 10 mm²=32A.'
        }
      ]
    },
    {
      name: '⚡ Strömgenomgång',
      exercises: [
        {
          type: 'mc',
          question: 'Vad är verkan av 10–40 mA under sekunder upp till någon minut?',
          options: [
            'Under känselreaktion – ingen märkbar effekt',
            'Tendens till kramp, men det går att släppa taget',
            'Smärtsam svår kramp i armar och skuldror, svårighet att andas vid tider över 2 s',
            'Hjärtkammarflimmer och hjärtstillestånd'
          ],
          answer: 2,
          explanation: '10–40 mA (sekunder upp till någon minut): Vanligtvis ingen organisk skada. Sannolikt uppstår smärtsam, svår kramp i armar och skuldror. Även svårighet att andas vid tider över 2 sekunder.'
        },
        {
          type: 'mc',
          question: 'Vad händer vid 40–400 mA under kortare tid än 0,2 sekunder?',
          options: [
            'Ingen påverkan – exponeringstiden är för kort',
            'Kraftig chock med smärtsam svår kramp. Återgående störningar i hjärtfunktionen, risk för hjärtkammarflimmer',
            'Direkt hjärtstillestånd och medvetslöshet',
            'Enbart smärtsam kramp i armar, ingen hjärtpåverkan'
          ],
          answer: 1,
          explanation: '40–400 mA, < 0,2 s: Kraftig chock med smärtsam svår kramp. Återgående störningar i hjärtfunktionen, men även risk för hjärtkammarflimmer som ökar med varaktighet och styrka.'
        },
        {
          type: 'mc',
          question: 'Vad händer vid 40–400 mA under längre tid än 0,2 sekunder?',
          options: [
            'Smärtsam kramp i armar och skuldror, ingen hjärtpåverkan',
            'Kraftig chock med svår kramp och vanligen återgående störningar i hjärtfunktionen med risk för hjärtkammarflimmer',
            'Ingen känsla om man är frisk',
            'Bara brännskador utan hjärtpåverkan'
          ],
          answer: 1,
          explanation: '40–400 mA, > 0,2 s: Kraftig chock med smärtsam svår kramp. Vanligen återgående störningar i hjärtfunktionen, men risk för hjärtkammarflimmer ökar med varaktighet och styrka.'
        },
        {
          type: 'mc',
          question: 'Vad är skillnaden i hjärtpåverkan mellan 40–400 mA vid < 0,2 s och > 0,2 s?',
          options: [
            'Ingen skillnad – effekten är identisk',
            'Vid < 0,2 s finns RISK för hjärtkammarflimmer; vid > 0,2 s är störningarna VANLIGEN återgående men risken ökar ytterligare',
            'Vid > 0,2 s är det helt ofarligt för hjärtat',
            'Vid < 0,2 s stannar hjärtat direkt'
          ],
          answer: 1,
          explanation: '< 0,2 s: Risk för hjärtkammarflimmer som ökar med tid och styrka. > 0,2 s: Vanligen återgående störningar men risken för flimmer är fortsatt reell och ökar med varaktighet och styrka.'
        },
        {
          type: 'mc',
          question: 'Vilken strömstyrka ger smärtsam svår kramp i armar och skuldror men vanligtvis ingen organisk skada?',
          options: ['< 0,5 mA', '< 10 mA', '10–40 mA', '40–400 mA'],
          answer: 2,
          explanation: '10–40 mA (sekunder upp till någon minut): Vanligtvis ingen organisk skada, men smärtsam svår kramp i armar och skuldror. Svårighet att andas kan uppstå vid exponering över 2 sekunder.'
        }
      ]
    },
    {
      name: '🔒 IP-klass',
      exercises: [
        {
          type: 'mc',
          question: 'Vad anger den FÖRSTA siffran i en IP-beteckning?',
          options: [
            'Skydd mot vatten',
            'Skydd mot damm och fasta föremål',
            'Kapslingens temperaturklass',
            'Skydd mot elektrisk stöt'
          ],
          answer: 1,
          explanation: 'Första siffran (0–6) anger skydd mot fasta föremål och damm. Andra siffran (0–9) anger skydd mot vatten.'
        },
        {
          type: 'mc',
          question: 'Vad innebär IP44?',
          options: [
            'Dammtät och tål nedsänkning',
            'Skydd mot föremål > 1 mm och stänkvatten från alla håll',
            'Skydd mot finger och droppvatten',
            'Dammskyddad och tål vattenstråle'
          ],
          answer: 1,
          explanation: 'IP44: Första 4 = föremål > 1 mm (tråd). Andra 4 = stänkvatten från alla riktningar. IP44 är minimikrav i badrumszon 2.'
        },
        {
          type: 'mc',
          question: 'Vilken minsta IP-klass krävs i badrumszon 2?',
          options: ['IP20', 'IP24', 'IP44', 'IP55'],
          answer: 2,
          explanation: 'Badrumszon 2 (0–60 cm utanför zon 1, upp till 2,25 m höjd): Minst IP44. Zon 1 kräver IPX7 och bara klenspänning ≤ 12 V AC.'
        },
        {
          type: 'mc',
          question: 'En utomhusarmatur är märkt IP65. Vad innebär den första siffran 6?',
          options: ['Skydd mot föremål > 1 mm', 'Dammskyddad', 'Dammtät', 'Stänkskyddad'],
          answer: 2,
          explanation: 'Första siffran 6 = Dammtät. Inget damm kan tränga in alls. Andra siffran 5 = skyddad mot vattenstråle.'
        },
        {
          type: 'mc',
          question: 'Vilka regler gäller i badrumszon 1?',
          options: [
            'IP24 och max 230 V',
            'IP44 och max 230 V',
            'IPX7 och bara klenspänning (≤ 12 V AC)',
            'IP55 och fast installation tillåten'
          ],
          answer: 2,
          explanation: 'Zon 1 (inuti badkar/duschkabin): Minst IPX7 (nedsänkningsskyddad), och endast klenspänning ≤ 12 V AC. Inga 230 V-apparater.'
        },
        {
          type: 'mc',
          question: 'Vad innebär den andra siffran 7 i en IP-beteckning?',
          options: [
            'Kraftig vattenstråle',
            'Nedsänkning 0–1 m',
            'Nedsänkning > 1 m',
            'Högtrycksrengöring'
          ],
          answer: 1,
          explanation: 'Andra siffran 7 = nedsänkning 0–1 m under begränsad tid. Siffran 8 = nedsänkning > 1 m (enl. tillverkarens spec). Siffran 9 = högtrycks-/ångreningstvätt.'
        }
      ]
    },
    {
      name: '🔄 Eldistribution & Nätformer',
      exercises: [
        {
          type: 'mc',
          question: 'Vad kännetecknar TN-S-systemet?',
          options: [
            'PE och N kombineras i en PEN-ledare hela vägen',
            'PE och N är separata ledare från transformatorn till uttaget',
            'Nätet är isolerat från jord',
            'PE kopplas till en egen jordelektrod på platsen'
          ],
          answer: 1,
          explanation: 'TN-S (Terra–Neutral–Separated): Separata PE och N hela vägen. Modern standard, femledarsystem i trefas. JFB kan installeras var som helst.'
        },
        {
          type: 'mc',
          question: 'I vilken nätform kombineras PE och N till en gemensam PEN-ledare?',
          options: ['TN-S', 'TN-C', 'IT', 'TT'],
          answer: 1,
          explanation: 'TN-C (Terra–Neutral–Combined): PE och N kombineras till PEN-ledaren. Fyra ledare i trefas (L1, L2, L3, PEN). PEN splittras i elcentralen.'
        },
        {
          type: 'mc',
          question: 'Varför kan man INTE installera en JFB direkt i ett TN-C-system utan åtgärd?',
          options: [
            'JFB kräver alltid ett 5-ledarsystem',
            'PE och N är samankopplade via PEN – JFB kan inte mäta strömskillnaden',
            'TN-C-systemet har för hög ström',
            'JFB är inte godkänd i svenska bostäder'
          ],
          answer: 1,
          explanation: 'JFB mäter skillnaden mellan ström ut (L) och ström in (N). I TN-C är PE och N samma ledare (PEN) — JFB ser ingen differens. Lösning: splitta PEN vid PEN-skruven och installera JFB efter den punkten.'
        },
        {
          type: 'mc',
          question: 'Vilket nätssystem är vanligast i svenska bostäder?',
          options: ['TN-C', 'TN-S', 'TN-C-S', 'IT'],
          answer: 2,
          explanation: 'TN-C-S är vanligast i Sverige: PEN-ledare inkommande från nätet, sedan separata PE och N ut till kretsarna i elcentralen.'
        },
        {
          type: 'mc',
          question: 'Vad händer vid ett isolationsfel i en TN-S-installation med JFB?',
          options: [
            'Ingenting – TN-S är immunt mot isolationsfel',
            'Felströmmen flödar via PE, JFB detekterar obalansen och löser ut',
            'Säkringen löser alltid ut innan JFB',
            'PEN-skruven måste lossas manuellt'
          ],
          answer: 1,
          explanation: 'I TN-S: Fas → isolationsfel → jordat hölje → PE → neutral. JFB mäter I_L ≠ I_N och löser ut på < 40 ms. PE ger en lågohmig väg som skapar tillräcklig differensström.'
        },
        {
          type: 'mc',
          question: 'Vilket system används på sjukhus och i gruvor där ett enskilt jordfel inte ska ge driftstopp?',
          options: ['TN-C', 'TN-S', 'TN-C-S', 'IT'],
          answer: 3,
          explanation: 'IT-systemet: Nätet är isolerat från jord. Vid ett enskilt jordfel flödar ingen farlig ström och driften fortsätter. En isolationsövervakare larmar. Används där avbrott är oacceptabla.'
        }
      ]
    }
  ];

  /* ------ State ------ */
  const state = {}; // { cardId: 'correct' | 'wrong' | 'unanswered' }
  let cardCounter = 0;

  /* ------ Render ------ */
  function render() {
    const root = document.getElementById('exercises-root');
    if (!root) return;
    root.innerHTML = '';
    cardCounter = 0;

    CATEGORIES.forEach(cat => {
      const group = document.createElement('div');
      group.className = 'ex-group';

      const header = document.createElement('div');
      header.className = 'ex-category-header';
      header.textContent = cat.name;
      group.appendChild(header);

      const grid = document.createElement('div');
      grid.className = 'ex-grid';

      cat.exercises.forEach(ex => {
        cardCounter++;
        const id = 'ex-' + cardCounter;
        if (!state[id]) state[id] = 'unanswered';
        grid.appendChild(buildCard(ex, id, cardCounter));
      });

      group.appendChild(grid);
      root.appendChild(group);
    });

    updateScore();
  }

  function buildCard(ex, id, num) {
    const card = document.createElement('div');
    card.className = 'ex-card';
    card.id = id;

    /* meta row */
    const meta = document.createElement('div');
    meta.className = 'ex-meta';
    meta.innerHTML = `
      <span class="ex-num"># ${num}</span>
      <span class="ex-type-badge ${ex.type === 'mc' ? 'mc' : 'numeric'}">${ex.type === 'mc' ? 'Flerval' : 'Beräkning'}</span>`;
    card.appendChild(meta);

    /* question */
    const q = document.createElement('div');
    q.className = 'ex-question';
    q.innerHTML = ex.question;
    card.appendChild(q);

    /* hint */
    if (ex.hint) {
      const hint = document.createElement('div');
      hint.className = 'ex-hint';
      hint.innerHTML = '💡 ' + ex.hint;
      card.appendChild(hint);
    }

    /* answer area */
    if (ex.type === 'mc') {
      card.appendChild(buildMC(ex, id));
    } else {
      card.appendChild(buildNumeric(ex, id));
    }

    /* feedback */
    const fb = document.createElement('div');
    fb.className = 'ex-feedback';
    fb.id = id + '-fb';
    card.appendChild(fb);

    /* restore state */
    if (state[id] !== 'unanswered') restoreCard(card, ex, id);

    return card;
  }

  function buildMC(ex, id) {
    const wrap = document.createElement('div');
    wrap.className = 'mc-options';
    wrap.id = id + '-opts';
    const letters = ['A', 'B', 'C', 'D'];

    ex.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'mc-opt';
      btn.innerHTML = `<span class="opt-letter">${letters[i]}</span>${opt}`;
      btn.addEventListener('click', () => handleMC(ex, id, i));
      wrap.appendChild(btn);
    });

    return wrap;
  }

  function buildNumeric(ex, id) {
    const wrap = document.createElement('div');

    const row = document.createElement('div');
    row.className = 'num-row';

    const inp = document.createElement('input');
    inp.type = 'number';
    inp.step = 'any';
    inp.placeholder = '?';
    inp.id = id + '-inp';
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') handleNumeric(ex, id); });

    const unit = document.createElement('span');
    unit.className = 'num-unit';
    unit.textContent = ex.unit || '';

    row.appendChild(inp);
    row.appendChild(unit);

    const btn = document.createElement('button');
    btn.className = 'ex-check-btn';
    btn.id = id + '-btn';
    btn.textContent = 'Kontrollera';
    btn.style.width = '100%';
    btn.style.marginTop = '0.5rem';
    btn.addEventListener('click', () => handleNumeric(ex, id));

    wrap.appendChild(row);
    wrap.appendChild(btn);
    return wrap;
  }

  /* ------ Handlers ------ */
  function handleMC(ex, id, chosen) {
    if (state[id] !== 'unanswered') return;
    const correct = chosen === ex.answer;
    state[id] = correct ? 'correct' : 'wrong';

    const opts = document.querySelectorAll('#' + id + '-opts .mc-opt');
    opts.forEach((btn, i) => {
      btn.disabled = true;
      if (i === ex.answer) btn.classList.add('correct');
      else if (i === chosen && !correct) btn.classList.add('wrong');
      else btn.classList.add('dimmed');
    });

    showFeedback(id, correct, ex.explanation);
    markCard(id, correct);
    updateScore();
  }

  function handleNumeric(ex, id) {
    if (state[id] !== 'unanswered') return;
    const inp = document.getElementById(id + '-inp');
    const val = parseFloat(inp.value.replace(',', '.'));
    if (isNaN(val)) { inp.focus(); return; }

    const tol = ex.tolerance !== undefined ? ex.tolerance : 0.02;
    const diff = Math.abs(val - ex.answer);
    const correct = ex.answer === 0 ? diff < 0.01 : (diff / Math.abs(ex.answer)) <= tol;

    state[id] = correct ? 'correct' : 'wrong';
    inp.disabled = true;
    inp.classList.add(correct ? 'input-correct' : 'input-wrong');

    const btn = document.getElementById(id + '-btn');
    if (btn) btn.disabled = true;

    showFeedback(id, correct, ex.explanation, correct ? null : `Rätt svar: ${ex.answer} ${ex.unit || ''}`);
    markCard(id, correct);
    updateScore();
  }

  /* ------ UI helpers ------ */
  function showFeedback(id, correct, explanation, extra) {
    const fb = document.getElementById(id + '-fb');
    if (!fb) return;
    fb.className = 'ex-feedback visible ' + (correct ? 'fb-correct' : 'fb-wrong');
    fb.innerHTML = (correct ? '<strong>✓ Rätt!</strong> ' : '<strong>✗ Fel.</strong> ')
      + (extra ? `<em>${extra}</em> – ` : '')
      + explanation;
  }

  function markCard(id, correct) {
    const card = document.getElementById(id);
    if (card) card.classList.add(correct ? 'state-correct' : 'state-wrong');
  }

  function restoreCard(card, ex, id) {
    const correct = state[id] === 'correct';
    card.classList.add(correct ? 'state-correct' : 'state-wrong');

    const fb = card.querySelector('.ex-feedback');
    if (fb) {
      fb.className = 'ex-feedback visible ' + (correct ? 'fb-correct' : 'fb-wrong');
      fb.innerHTML = (correct ? '<strong>✓ Rätt!</strong> ' : '<strong>✗ Fel.</strong> ') + ex.explanation;
    }

    if (ex.type === 'mc') {
      const opts = card.querySelectorAll('.mc-opt');
      opts.forEach((btn, i) => {
        btn.disabled = true;
        if (i === ex.answer) btn.classList.add('correct');
        else btn.classList.add('dimmed');
      });
    } else {
      const inp = card.querySelector('input');
      if (inp) { inp.disabled = true; inp.classList.add(correct ? 'input-correct' : 'input-wrong'); }
      const btn = card.querySelector('.ex-check-btn');
      if (btn) btn.disabled = true;
    }
  }

  /* ------ Score ------ */
  function updateScore() {
    const total   = Object.keys(state).length;
    const correct = Object.values(state).filter(s => s === 'correct').length;
    const answered = Object.values(state).filter(s => s !== 'unanswered').length;

    const elCorrect = document.getElementById('score-correct');
    const elTotal   = document.getElementById('score-total');
    const bar       = document.getElementById('score-bar');

    if (!elCorrect) return;
    elCorrect.textContent = correct;
    elTotal.textContent   = total;
    bar.style.width       = (answered > 0 ? (correct / total * 100) : 0) + '%';

    // Bump animation
    elCorrect.classList.remove('bump');
    void elCorrect.offsetWidth;
    elCorrect.classList.add('bump');
    setTimeout(() => elCorrect.classList.remove('bump'), 300);
  }

  /* ------ Reset ------ */
  function resetAll() {
    Object.keys(state).forEach(k => { state[k] = 'unanswered'; });
    render();
  }

  /* ------ Init ------ */
  document.addEventListener('DOMContentLoaded', () => {
    render();
    const resetBtn = document.getElementById('reset-all-btn');
    if (resetBtn) resetBtn.addEventListener('click', resetAll);
  });

})();


/* =========================================================
   LEDARFÄRGER & KABELDIMENSIONERING – TABELLQUIZ
   ========================================================= */
(function () {
  'use strict';

  const WIRE_COLORS = [
    { ledare: 'L1',              farg: 'Brun',     ok: ['brun'] },
    { ledare: 'L2',              farg: 'Svart',    ok: ['svart'] },
    { ledare: 'L3',              farg: 'Grå',      ok: ['grå', 'gra'] },
    { ledare: 'Nolla (N)',       farg: 'Blå',      ok: ['blå', 'bla'] },
    { ledare: 'Skyddsjord (PE)', farg: 'GrönGul', ok: ['gröngul', 'gulgrön', 'grön-gul', 'gul-grön', 'grön gul', 'gul grön'] },
  ];

  const CABLE_DIM = [
    { sakring: '6 A',  farg: 'Grön',  area: '1 mm²',   okS: ['6'],  okF: ['grön', 'gron'],  okA: ['1', '1 mm²', '1mm²'] },
    { sakring: '10 A', farg: 'Röd',   area: '1,5 mm²', okS: ['10'], okF: ['röd', 'rod'],    okA: ['1,5', '1.5', '1,5 mm²'] },
    { sakring: '16 A', farg: 'Grå',   area: '2,5 mm²', okS: ['16'], okF: ['grå', 'gra'],    okA: ['2,5', '2.5', '2,5 mm²'] },
    { sakring: '20 A', farg: 'Blå',   area: '4 mm²',   okS: ['20'], okF: ['blå', 'bla'],    okA: ['4', '4 mm²'] },
    { sakring: '25 A', farg: 'Gul',   area: '6 mm²',   okS: ['25'], okF: ['gul'],           okA: ['6', '6 mm²'] },
    { sakring: '32 A', farg: 'Svart', area: '10 mm²',  okS: ['32'], okF: ['svart'],         okA: ['10', '10 mm²'] },
  ];

  const DIM_MODES = [
    { key: 'farg',    label: 'Gissa färg' },
    { key: 'sakring', label: 'Gissa säkring' },
    { key: 'area',    label: 'Gissa kabelarea' },
    { key: 'random',  label: '🎲 Slumpa' },
  ];

  let dimMode      = 'farg';
  let randomCount  = 1;
  let randomPattern = []; // per row: array of hidden col indices (0=säkring,1=färg,2=area)

  function generateRandomPattern() {
    randomPattern = CABLE_DIM.map(() => {
      const cols = [0, 1, 2];
      for (let i = cols.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cols[i], cols[j]] = [cols[j], cols[i]];
      }
      return cols.slice(0, randomCount);
    });
  }

  function matches(input, accepted) {
    const v = input.trim().toLowerCase();
    return accepted.some(a => a.toLowerCase() === v);
  }

  const COL_PH   = ['A', 'färg', 'mm²'];
  const COL_VALS = [r => r.sakring, r => r.farg, r => r.area];

  function buildDimRows() {
    return CABLE_DIM.map((row, i) => {
      const hidden = dimMode === 'random'
        ? randomPattern[i] || []
        : dimMode === 'sakring' ? [0] : dimMode === 'farg' ? [1] : [2];

      const cells = [row.sakring, row.farg, row.area].map((val, c) =>
        hidden.includes(c)
          ? `<td><input class="tq-input" data-idx="${i}" data-col="${c}" type="text" placeholder="${COL_PH[c]}" autocomplete="off" spellcheck="false"></td>`
          : `<td class="tq-cell">${val}</td>`
      );
      return `<tr>${cells.join('')}</tr>`;
    }).join('');
  }

  function renderDimTable() {
    document.querySelectorAll('.tq-mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === dimMode);
    });
    const countBar = document.getElementById('dim-count-bar');
    if (countBar) countBar.style.display = dimMode === 'random' ? 'flex' : 'none';
    if (dimMode === 'random') generateRandomPattern();
    const tbody = document.querySelector('#dim-table tbody');
    if (tbody) tbody.innerHTML = buildDimRows();
    const score = document.getElementById('dim-score');
    if (score) score.textContent = '';
  }

  function checkWire() {
    const inputs = document.querySelectorAll('#wire-table .tq-input');
    let correct = 0;
    inputs.forEach((inp, i) => {
      const ok = matches(inp.value, WIRE_COLORS[i].ok);
      inp.className = 'tq-input ' + (ok ? 'tq-correct' : 'tq-wrong');
      inp.disabled = true;
      if (ok) { correct++; }
      else {
        let hint = inp.parentNode.querySelector('.tq-wrong-hint');
        if (!hint) { hint = document.createElement('span'); hint.className = 'tq-wrong-hint'; inp.parentNode.appendChild(hint); }
        hint.textContent = '→ ' + WIRE_COLORS[i].farg;
      }
    });
    document.getElementById('wire-score').textContent = correct + '/' + inputs.length + ' rätt';
  }

  const COL_OK   = [r => r.okS, r => r.okF, r => r.okA];

  function checkDim() {
    const inputs = document.querySelectorAll('#dim-table .tq-input');
    let correct = 0;
    inputs.forEach(inp => {
      const rowIdx = parseInt(inp.dataset.idx);
      const col    = parseInt(inp.dataset.col);
      const row    = CABLE_DIM[rowIdx];
      const accepted   = COL_OK[col](row);
      const correctVal = COL_VALS[col](row);
      const ok = matches(inp.value, accepted);
      inp.className = 'tq-input ' + (ok ? 'tq-correct' : 'tq-wrong');
      inp.disabled = true;
      if (ok) { correct++; }
      else {
        let hint = inp.parentNode.querySelector('.tq-wrong-hint');
        if (!hint) { hint = document.createElement('span'); hint.className = 'tq-wrong-hint'; inp.parentNode.appendChild(hint); }
        hint.textContent = '→ ' + correctVal;
      }
    });
    document.getElementById('dim-score').textContent = correct + '/' + inputs.length + ' rätt';
  }

  function resetWire() {
    document.querySelectorAll('#wire-table .tq-input').forEach(inp => {
      inp.value = ''; inp.className = 'tq-input'; inp.disabled = false;
      const hint = inp.parentNode.querySelector('.tq-wrong-hint');
      if (hint) hint.remove();
    });
    document.getElementById('wire-score').textContent = '';
  }

  function init() {
    const root = document.getElementById('ledarfarger-quiz-root');
    if (!root) return;

    root.innerHTML = `
      <div class="tq-wrap">
        <h4 class="tq-subtitle">Trefas – Ledarfärger</h4>
        <p class="tq-desc">Skriv in rätt färg för varje ledare. Skiftläge spelar ingen roll.</p>
        <div class="tq-table-scroll">
          <table class="tq-table" id="wire-table">
            <thead><tr><th>Ledare</th><th>Färg</th></tr></thead>
            <tbody>
              ${WIRE_COLORS.map((row, i) => `
                <tr>
                  <td class="tq-cell tq-label">${row.ledare}</td>
                  <td><input class="tq-input" type="text" placeholder="?" autocomplete="off" spellcheck="false"></td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
        <div class="tq-actions">
          <button class="tq-check-btn" id="wire-check-btn">Kontrollera</button>
          <button class="tq-reset-btn" id="wire-reset-btn">↺ Återställ</button>
          <span class="tq-score" id="wire-score"></span>
        </div>
      </div>

      <div class="tq-wrap">
        <h4 class="tq-subtitle">Säkring → Färg → Min. kabelarea</h4>
        <p class="tq-desc">Välj vilken kolumn du vill öva på, fyll i alla rader och kontrollera.</p>
        <div class="tq-mode-bar">
          ${DIM_MODES.map(m => `<button class="tq-mode-btn${m.key === dimMode ? ' active' : ''}" data-mode="${m.key}">${m.label}</button>`).join('')}
        </div>
        <div class="tq-count-bar" id="dim-count-bar" style="display:none">
          <span class="tq-count-label">Ta bort:</span>
          ${[1,2,3].map(n => `<button class="tq-count-btn${n===1?' active':''}" data-count="${n}">${n}</button>`).join('')}
        </div>
        <div class="tq-table-scroll">
          <table class="tq-table" id="dim-table">
            <thead><tr><th>Säkring</th><th>Färg</th><th>Min. kabelarea</th></tr></thead>
            <tbody>${buildDimRows()}</tbody>
          </table>
        </div>
        <div class="tq-actions">
          <button class="tq-check-btn" id="dim-check-btn">Kontrollera</button>
          <button class="tq-reset-btn" id="dim-reset-btn">↺ Återställ</button>
          <span class="tq-score" id="dim-score"></span>
        </div>
      </div>
    `;

    document.getElementById('wire-check-btn').addEventListener('click', checkWire);
    document.getElementById('wire-reset-btn').addEventListener('click', resetWire);
    document.getElementById('dim-check-btn').addEventListener('click', checkDim);
    document.getElementById('dim-reset-btn').addEventListener('click', renderDimTable);

    document.querySelectorAll('.tq-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => { dimMode = btn.dataset.mode; renderDimTable(); });
    });

    document.querySelectorAll('.tq-count-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        randomCount = parseInt(btn.dataset.count);
        document.querySelectorAll('.tq-count-btn').forEach(b => b.classList.toggle('active', b === btn));
        renderDimTable();
      });
    });

    root.addEventListener('keydown', e => {
      if (e.key !== 'Enter') return;
      if (e.target.closest('#wire-table')) document.getElementById('wire-check-btn').click();
      else if (e.target.closest('#dim-table')) document.getElementById('dim-check-btn').click();
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();


/* =========================================================
   MS-SUBQ ZOOM OVERLAY
   ========================================================= */
(function () {
  const overlay = document.createElement('div');
  overlay.className = 'ms-zoom-overlay';
  overlay.innerHTML = `
    <div class="ms-zoom-card">
      <div class="ms-zoom-label"></div>
      <div class="ms-zoom-hint"></div>
      <div class="ms-zoom-row ms-input-row">
        <input class="ms-input ms-zoom-input" type="number" step="any" placeholder="Svar…"/>
        <button class="ms-check-btn ms-zoom-check">Kontrollera</button>
      </div>
      <div class="ms-feedback ms-zoom-feedback"></div>
    </div>`;
  document.body.appendChild(overlay);

  const oLabel    = overlay.querySelector('.ms-zoom-label');
  const oHint     = overlay.querySelector('.ms-zoom-hint');
  const oInput    = overlay.querySelector('.ms-zoom-input');
  const oCheck    = overlay.querySelector('.ms-zoom-check');
  const oFeedback = overlay.querySelector('.ms-zoom-feedback');

  let origInput = null;
  let origBtn   = null;
  let origFb    = null;

  function close() { overlay.classList.remove('visible'); }
  overlay.addEventListener('click', close);
  overlay.querySelector('.ms-zoom-card').addEventListener('click', e => e.stopPropagation());

  oInput.addEventListener('keydown', e => { if (e.key === 'Enter') oCheck.click(); });

  oCheck.addEventListener('click', () => {
    if (origInput) origInput.value = oInput.value;
    if (origBtn)   origBtn.click();
    if (origFb) {
      oFeedback.className = 'ms-feedback ms-zoom-feedback ' + (origFb.classList.contains('ms-correct') ? 'ms-correct' : origFb.classList.contains('ms-wrong') ? 'ms-wrong' : '');
      oFeedback.innerHTML = origFb.innerHTML;
      if (origFb.classList.contains('ms-correct')) setTimeout(close, 1400);
    }
  });

  document.querySelectorAll('.ms-subq:not(.locked)').forEach(subq => {
    subq.addEventListener('click', e => {
      if (e.target.closest('input, button')) return;
      e.stopPropagation();

      oLabel.innerHTML    = subq.querySelector('.ms-subq-label')?.innerHTML || '';
      oHint.innerHTML     = subq.querySelector('.ms-subq-hint')?.innerHTML  || '';
      origInput           = subq.querySelector('.ms-input');
      origBtn             = subq.querySelector('.ms-check-btn');
      origFb              = subq.querySelector('.ms-feedback');

      oInput.value        = origInput?.value || '';
      oInput.placeholder  = origInput?.placeholder || 'Svar…';
      oInput.step         = origInput?.step || 'any';
      oFeedback.className = 'ms-feedback ms-zoom-feedback';
      oFeedback.innerHTML = origFb?.innerHTML || '';
      if (origFb?.classList.contains('ms-correct')) oFeedback.classList.add('ms-correct');
      if (origFb?.classList.contains('ms-wrong'))   oFeedback.classList.add('ms-wrong');

      overlay.classList.add('visible');
      setTimeout(() => oInput.focus(), 80);
    });
  });
})();

/* =========================================================
   SYM-CARD & TRIANGLE ZOOM OVERLAY
   ========================================================= */
(function () {
  const overlay = document.createElement('div');
  overlay.className = 'sym-zoom-overlay';
  overlay.innerHTML = '<div class="sym-zoom-card"><svg></svg><div class="sym-zoom-name"></div><div class="sym-zoom-sub"></div><div class="sym-zoom-extra"></div></div>';
  document.body.appendChild(overlay);

  const oSvg   = overlay.querySelector('svg');
  const oName  = overlay.querySelector('.sym-zoom-name');
  const oSub   = overlay.querySelector('.sym-zoom-sub');
  const oExtra = overlay.querySelector('.sym-zoom-extra');

  // Only close when clicking the backdrop, not the card
  overlay.querySelector('.sym-zoom-card').addEventListener('click', e => e.stopPropagation());

  function close() { overlay.classList.remove('visible'); }
  overlay.addEventListener('click', close);

  function resetCard() {
    oSvg.style.display = '';
    oSub.innerHTML  = '';
    oExtra.innerHTML = '';
  }

  // Symbol cards
  document.querySelectorAll('.sym-card').forEach(card => {
    card.addEventListener('click', e => {
      e.stopPropagation();
      resetCard();
      const src = card.querySelector('svg');
      oSvg.setAttribute('viewBox', src.getAttribute('viewBox'));
      oSvg.innerHTML = src.innerHTML;
      oName.textContent = card.querySelector('.sym-name')?.textContent || '';
      oSub.textContent  = card.querySelector('.sym-sub')?.textContent  || '';
      overlay.classList.add('visible');
    });
  });

  // Triangle cards
  document.querySelectorAll('.triangle-ref-card').forEach(card => {
    card.addEventListener('click', e => {
      e.stopPropagation();
      resetCard();
      const src = card.querySelector('.triangle-svg');
      oSvg.setAttribute('viewBox', src.getAttribute('viewBox'));
      oSvg.innerHTML = src.innerHTML;
      oName.textContent = card.querySelector('h3')?.textContent || '';
      const hints = card.querySelector('.triangle-hints');
      const units = card.querySelector('.triangle-units');
      if (hints) oExtra.appendChild(hints.cloneNode(true));
      if (units) oExtra.appendChild(units.cloneNode(true));
      overlay.classList.add('visible');
    });
  });

  // Guided solver steps — event delegation (steps are dynamically rendered)
  document.addEventListener('click', e => {
    const step = e.target.closest('.kk-step');
    if (!step) return;
    e.stopPropagation();

    const num     = step.querySelector('.kk-step-num')?.textContent   || '';
    const title   = step.querySelector('.kk-step-title')?.innerHTML   || '';
    const formula = step.querySelector('.kk-step-formula')?.innerHTML || '';
    const note    = step.querySelector('.kk-step-sub')?.innerHTML     || '';
    const calc    = step.querySelector('.kk-step-calc')?.innerHTML    || '';
    const result  = step.querySelector('.kk-step-result')?.innerHTML  || '';

    oSvg.setAttribute('viewBox', '0 0 1 1');
    oSvg.innerHTML = '';
    oSvg.style.display = 'none';

    oName.innerHTML = `<span style="font-size:1rem;font-weight:600;color:#9ca3af;letter-spacing:.05em">STEG ${num}</span><br>${title}`;
    oSub.innerHTML  = '';
    oExtra.innerHTML = `
      <div class="kk-zoom-formula">${formula}</div>
      ${note ? `<div class="kk-zoom-note">${note}</div>` : ''}
      <div class="kk-zoom-calc">${calc}</div>
      <div class="kk-zoom-result">${result}</div>`;

    overlay.classList.add('visible');
  });
})();

/* =========================================================
   BILD-LIGHTBOX  –  klickbara bilder med klassen .zoomable
   ========================================================= */
(function () {
  const overlay = document.createElement('div');
  overlay.id = 'img-lightbox';
  overlay.innerHTML = '<img id="img-lightbox-img" src="" alt="">';
  document.body.appendChild(overlay);

  const lbImg = document.getElementById('img-lightbox-img');

  overlay.addEventListener('click', () => overlay.classList.remove('visible'));

  function initZoomable() {
    document.querySelectorAll('main img, .content img, article img, section img, img.zoomable').forEach(img => {
      if (img.closest('#img-lightbox')) return;
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        overlay.classList.add('visible');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initZoomable);
})();

/* =========================================================
   FORMELBYGGAREN  –  Floating formula calculator widget
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Variable metadata ---------- */
  const VARS = {
    U:     { sym: 'U',      label: 'Spänning',           unit: 'V',        group: 'dc'  },
    R:     { sym: 'R',      label: 'Resistans',           unit: 'Ω',        group: 'dc'  },
    I:     { sym: 'I',      label: 'Ström',               unit: 'A',        group: 'dc'  },
    P:     { sym: 'P',      label: 'Aktiv effekt',        unit: 'W',        group: 'dc'  },
    rho:   { sym: 'ρ',      label: 'Resistivitet',        unit: 'Ω·mm²/m',  group: 'mat' },
    Llen:  { sym: 'L',      label: 'Längd (kabel)',       unit: 'm',        group: 'mat' },
    A:     { sym: 'A',      label: 'Ledararea',           unit: 'mm²',      group: 'mat' },
    Ufall: { sym: 'U_fall', label: 'Spänningsfall',       unit: 'V',        group: 'mat' },
    f:     { sym: 'f',      label: 'Frekvens',            unit: 'Hz',       group: 'ac'  },
    T:     { sym: 'T',      label: 'Period',              unit: 's',        group: 'ac'  },
    omega: { sym: 'ω',      label: 'Vinkelfrekvens',      unit: 'rad/s',    group: 'ac'  },
    XL:    { sym: 'X_L',    label: 'Induktiv reaktans',   unit: 'Ω',        group: 'rea' },
    XC:    { sym: 'X_C',    label: 'Kapacitiv reaktans',  unit: 'Ω',        group: 'rea' },
    X:     { sym: 'X',      label: 'Reaktans',            unit: 'Ω',        group: 'rea' },
    Z:     { sym: 'Z',      label: 'Impedans',            unit: 'Ω',        group: 'rea' },
    Lind:  { sym: 'L',      label: 'Induktans',           unit: 'H',        group: 'rea' },
    C:     { sym: 'C',      label: 'Kapacitans',          unit: 'F',        group: 'rea' },
    Ufas:  { sym: 'U_fas',  label: 'Fasspänning',         unit: 'V',        group: '3f'  },
    Uled:  { sym: 'U_led',  label: 'Linjespänning',       unit: 'V',        group: '3f'  },
    cosfi: { sym: 'cos φ',  label: 'Effektfaktor',        unit: '',         group: '3f'  },
    S:     { sym: 'S',      label: 'Skenbar effekt',      unit: 'VA',       group: 'pwr' },
    Q:     { sym: 'Q',      label: 'Reaktiv effekt',      unit: 'VAr',      group: 'pwr' },
    U1:    { sym: 'U₁',     label: 'Primärspänning',      unit: 'V',        group: 'tra' },
    U2:    { sym: 'U₂',     label: 'Sekundärspänning',    unit: 'V',        group: 'tra' },
    N1:    { sym: 'N₁',     label: 'Primärlindning',      unit: 'varv',     group: 'tra' },
    N2:    { sym: 'N₂',     label: 'Sekundärlindning',    unit: 'varv',     group: 'tra' },
  };

  const GROUPS = {
    dc:  'DC – Grunder',
    mat: 'Material & kablar',
    ac:  'AC – Frekvens',
    rea: 'Reaktans & impedans',
    '3f': 'Trefas',
    pwr: 'Effekttyper',
    tra: 'Transformator',
  };

  /* ---------- Formula database (~50 varianter) ---------- */
  const FORMULAS = [
    // Ohms lag
    { name: 'Ohms lag',           expr: 'U = R × I',              sf: 'U',     req: ['R','I'],              unit: 'V',        calc: v => v.R * v.I },
    { name: 'Ohms lag',           expr: 'R = U / I',              sf: 'R',     req: ['U','I'],              unit: 'Ω',        calc: v => v.U / v.I },
    { name: 'Ohms lag',           expr: 'I = U / R',              sf: 'I',     req: ['U','R'],              unit: 'A',        calc: v => v.U / v.R },
    // Effektlagen
    { name: 'Effektlagen',        expr: 'P = U × I',              sf: 'P',     req: ['U','I'],              unit: 'W',        calc: v => v.U * v.I },
    { name: 'Effektlagen',        expr: 'U = P / I',              sf: 'U',     req: ['P','I'],              unit: 'V',        calc: v => v.P / v.I },
    { name: 'Effektlagen',        expr: 'I = P / U',              sf: 'I',     req: ['P','U'],              unit: 'A',        calc: v => v.P / v.U },
    // Effekt via R
    { name: 'Effekt (via R)',     expr: 'P = I² × R',             sf: 'P',     req: ['I','R'],              unit: 'W',        calc: v => v.I**2 * v.R },
    { name: 'Effekt (via R)',     expr: 'I = √(P / R)',           sf: 'I',     req: ['P','R'],              unit: 'A',        calc: v => Math.sqrt(v.P / v.R) },
    { name: 'Effekt (via R)',     expr: 'R = P / I²',             sf: 'R',     req: ['P','I'],              unit: 'Ω',        calc: v => v.P / v.I**2 },
    // Effekt via U
    { name: 'Effekt (via U)',     expr: 'P = U² / R',             sf: 'P',     req: ['U','R'],              unit: 'W',        calc: v => v.U**2 / v.R },
    { name: 'Effekt (via U)',     expr: 'U = √(P × R)',           sf: 'U',     req: ['P','R'],              unit: 'V',        calc: v => Math.sqrt(v.P * v.R) },
    { name: 'Effekt (via U)',     expr: 'R = U² / P',             sf: 'R',     req: ['U','P'],              unit: 'Ω',        calc: v => v.U**2 / v.P },
    // Materialresistans
    { name: 'Materialresistans',  expr: 'R = ρ × L / A',          sf: 'R',     req: ['rho','Llen','A'],     unit: 'Ω',        calc: v => v.rho * v.Llen / v.A },
    { name: 'Materialresistans',  expr: 'ρ = R × A / L',          sf: 'rho',   req: ['R','A','Llen'],       unit: 'Ω·mm²/m',  calc: v => v.R * v.A / v.Llen },
    { name: 'Materialresistans',  expr: 'L = R × A / ρ',          sf: 'Llen',  req: ['R','A','rho'],        unit: 'm',        calc: v => v.R * v.A / v.rho },
    { name: 'Materialresistans',  expr: 'A = ρ × L / R',          sf: 'A',     req: ['rho','Llen','R'],     unit: 'mm²',      calc: v => v.rho * v.Llen / v.R },
    // Spänningsfall
    { name: 'Spänningsfall',      expr: 'U_fall = 2ρLI / A',      sf: 'Ufall', req: ['rho','Llen','I','A'], unit: 'V',        calc: v => 2*v.rho*v.Llen*v.I/v.A },
    { name: 'Spänningsfall',      expr: 'L = U_fall×A / (2ρI)',   sf: 'Llen',  req: ['Ufall','A','rho','I'],unit: 'm',        calc: v => v.Ufall*v.A/(2*v.rho*v.I) },
    { name: 'Spänningsfall',      expr: 'I = U_fall×A / (2ρL)',   sf: 'I',     req: ['Ufall','A','rho','Llen'],unit: 'A',     calc: v => v.Ufall*v.A/(2*v.rho*v.Llen) },
    { name: 'Spänningsfall',      expr: 'A = 2ρLI / U_fall',      sf: 'A',     req: ['rho','Llen','I','Ufall'],unit: 'mm²',  calc: v => 2*v.rho*v.Llen*v.I/v.Ufall },
    // Frekvens / Period
    { name: 'Frekvens',           expr: 'f = 1 / T',              sf: 'f',     req: ['T'],                  unit: 'Hz',       calc: v => 1/v.T },
    { name: 'Frekvens',           expr: 'T = 1 / f',              sf: 'T',     req: ['f'],                  unit: 's',        calc: v => 1/v.f },
    // Vinkelfrekvens
    { name: 'Vinkelfrekvens',     expr: 'ω = 2π × f',             sf: 'omega', req: ['f'],                  unit: 'rad/s',    calc: v => 2*Math.PI*v.f },
    { name: 'Vinkelfrekvens',     expr: 'f = ω / (2π)',           sf: 'f',     req: ['omega'],              unit: 'Hz',       calc: v => v.omega/(2*Math.PI) },
    // Induktiv reaktans
    { name: 'Induktiv reaktans',  expr: 'X_L = 2πfL',             sf: 'XL',    req: ['f','Lind'],           unit: 'Ω',        calc: v => 2*Math.PI*v.f*v.Lind },
    { name: 'Induktiv reaktans',  expr: 'f = X_L / (2πL)',        sf: 'f',     req: ['XL','Lind'],          unit: 'Hz',       calc: v => v.XL/(2*Math.PI*v.Lind) },
    { name: 'Induktiv reaktans',  expr: 'L = X_L / (2πf)',        sf: 'Lind',  req: ['XL','f'],             unit: 'H',        calc: v => v.XL/(2*Math.PI*v.f) },
    // Kapacitiv reaktans
    { name: 'Kapacitiv reaktans', expr: 'X_C = 1 / (2πfC)',       sf: 'XC',    req: ['f','C'],              unit: 'Ω',        calc: v => 1/(2*Math.PI*v.f*v.C) },
    { name: 'Kapacitiv reaktans', expr: 'f = 1 / (2πC×X_C)',      sf: 'f',     req: ['XC','C'],             unit: 'Hz',       calc: v => 1/(2*Math.PI*v.C*v.XC) },
    { name: 'Kapacitiv reaktans', expr: 'C = 1 / (2πf×X_C)',      sf: 'C',     req: ['f','XC'],             unit: 'F',        calc: v => 1/(2*Math.PI*v.f*v.XC) },
    // Impedans
    { name: 'Impedans',           expr: 'Z = √(R² + X²)',         sf: 'Z',     req: ['R','X'],              unit: 'Ω',        calc: v => Math.sqrt(v.R**2 + v.X**2) },
    { name: 'Impedans',           expr: 'R = √(Z² − X²)',         sf: 'R',     req: ['Z','X'],              unit: 'Ω',        calc: v => { const d=v.Z**2-v.X**2; return d>=0?Math.sqrt(d):NaN; } },
    { name: 'Impedans',           expr: 'X = √(Z² − R²)',         sf: 'X',     req: ['Z','R'],              unit: 'Ω',        calc: v => { const d=v.Z**2-v.R**2; return d>=0?Math.sqrt(d):NaN; } },
    // Ohms lag (AC)
    { name: 'Ohms lag (AC)',      expr: 'U = Z × I',              sf: 'U',     req: ['Z','I'],              unit: 'V',        calc: v => v.Z*v.I },
    { name: 'Ohms lag (AC)',      expr: 'Z = U / I',              sf: 'Z',     req: ['U','I'],              unit: 'Ω',        calc: v => v.U/v.I },
    { name: 'Ohms lag (AC)',      expr: 'I = U / Z',              sf: 'I',     req: ['U','Z'],              unit: 'A',        calc: v => v.U/v.Z },
    // Trefasspänning
    { name: 'Trefasspänning',     expr: 'U_led = U_fas × √3',     sf: 'Uled',  req: ['Ufas'],               unit: 'V',        calc: v => v.Ufas*Math.sqrt(3) },
    { name: 'Trefasspänning',     expr: 'U_fas = U_led / √3',     sf: 'Ufas',  req: ['Uled'],               unit: 'V',        calc: v => v.Uled/Math.sqrt(3) },
    // Trefaseffekt
    { name: 'Trefaseffekt',       expr: 'P = √3×U_led×I×cosφ',    sf: 'P',     req: ['Uled','I','cosfi'],   unit: 'W',        calc: v => Math.sqrt(3)*v.Uled*v.I*v.cosfi },
    { name: 'Trefaseffekt',       expr: 'I = P / (√3×U_led×cosφ)',sf: 'I',     req: ['P','Uled','cosfi'],   unit: 'A',        calc: v => v.P/(Math.sqrt(3)*v.Uled*v.cosfi) },
    { name: 'Trefaseffekt',       expr: 'cosφ = P / (√3×U_led×I)',sf: 'cosfi', req: ['P','Uled','I'],       unit: '',         calc: v => v.P/(Math.sqrt(3)*v.Uled*v.I) },
    { name: 'Trefaseffekt',       expr: 'U_led = P / (√3×I×cosφ)',sf: 'Uled',  req: ['P','I','cosfi'],      unit: 'V',        calc: v => v.P/(Math.sqrt(3)*v.I*v.cosfi) },
    // Skenbar effekt
    { name: 'Skenbar effekt',     expr: 'S = √(P² + Q²)',         sf: 'S',     req: ['P','Q'],              unit: 'VA',       calc: v => Math.sqrt(v.P**2+v.Q**2) },
    { name: 'Skenbar effekt',     expr: 'P = √(S² − Q²)',         sf: 'P',     req: ['S','Q'],              unit: 'W',        calc: v => { const d=v.S**2-v.Q**2; return d>=0?Math.sqrt(d):NaN; } },
    { name: 'Skenbar effekt',     expr: 'Q = √(S² − P²)',         sf: 'Q',     req: ['S','P'],              unit: 'VAr',      calc: v => { const d=v.S**2-v.P**2; return d>=0?Math.sqrt(d):NaN; } },
    // Effektfaktor
    { name: 'Effektfaktor',       expr: 'cosφ = P / S',           sf: 'cosfi', req: ['P','S'],              unit: '',         calc: v => v.P/v.S },
    { name: 'Effektfaktor',       expr: 'P = S × cosφ',           sf: 'P',     req: ['S','cosfi'],          unit: 'W',        calc: v => v.S*v.cosfi },
    { name: 'Effektfaktor',       expr: 'S = P / cosφ',           sf: 'S',     req: ['P','cosfi'],          unit: 'VA',       calc: v => v.P/v.cosfi },
    // Transformator
    { name: 'Transformator',      expr: 'U₂ = U₁ × N₂ / N₁',     sf: 'U2',    req: ['U1','N1','N2'],       unit: 'V',        calc: v => v.U1*v.N2/v.N1 },
    { name: 'Transformator',      expr: 'U₁ = U₂ × N₁ / N₂',     sf: 'U1',    req: ['U2','N1','N2'],       unit: 'V',        calc: v => v.U2*v.N1/v.N2 },
    { name: 'Transformator',      expr: 'N₁ = N₂ × U₁ / U₂',     sf: 'N1',    req: ['N2','U1','U2'],       unit: 'varv',     calc: v => v.N2*v.U1/v.U2 },
    { name: 'Transformator',      expr: 'N₂ = N₁ × U₂ / U₁',     sf: 'N2',    req: ['N1','U1','U2'],       unit: 'varv',     calc: v => v.N1*v.U2/v.U1 },
  ];

  /* ---------- State ---------- */
  const selected = new Set();

  /* ---------- Build widget DOM ---------- */
  function buildWidget() {
    // FAB
    const fab = document.createElement('button');
    fab.id = 'fb-fab';
    fab.setAttribute('aria-label', 'Öppna Formelbyggaren');
    fab.setAttribute('aria-expanded', 'false');
    fab.textContent = 'f(x)';
    document.body.appendChild(fab);

    // Panel
    const widget = document.createElement('div');
    widget.id = 'fb-widget';
    widget.setAttribute('role', 'dialog');
    widget.setAttribute('aria-modal', 'true');
    widget.setAttribute('aria-label', 'Formelbyggaren');
    widget.innerHTML = `
      <div class="fb-header">
        <span class="fb-title">Formelbyggaren</span>
        <button class="fb-close" aria-label="Stäng">✕</button>
      </div>
      <div class="fb-body">
        <p class="fb-hint">Bocka i de värden du <strong>känner till</strong>:</p>
        <div class="fb-vargroups" id="fb-vargroups"></div>
        <div style="margin-top:0.5rem">
          <button class="fb-reset" id="fb-reset">Rensa allt</button>
        </div>
        <div id="fb-results-section" hidden>
          <div class="fb-divider"></div>
          <p class="fb-hint">Välj vad du vill räkna ut:</p>
          <div class="fb-formulas" id="fb-formulas"></div>
        </div>
        <div id="fb-calc-section" hidden>
          <div class="fb-divider"></div>
          <div id="fb-calc"></div>
        </div>
      </div>
    `;
    document.body.appendChild(widget);

    // Build variable chips
    const container = widget.querySelector('#fb-vargroups');
    ['dc','mat','ac','rea','3f','pwr','tra'].forEach(gk => {
      const vars = Object.entries(VARS).filter(([,v]) => v.group === gk);
      if (!vars.length) return;
      const section = document.createElement('div');
      section.className = 'fb-group';
      section.innerHTML = `<div class="fb-group-label">${GROUPS[gk]}</div><div class="fb-chips"></div>`;
      const chips = section.querySelector('.fb-chips');
      vars.forEach(([key, meta]) => {
        const btn = document.createElement('button');
        btn.className = 'fb-chip';
        btn.dataset.key = key;
        btn.title = meta.label + (meta.unit ? ` (${meta.unit})` : '');
        btn.innerHTML = `<span class="fb-chip-sym">${meta.sym}</span><span class="fb-chip-unit">${meta.unit || '–'}</span>`;
        btn.addEventListener('click', () => toggleVar(key));
        chips.appendChild(btn);
      });
      container.appendChild(section);
    });

    // Events
    fab.addEventListener('click', () => {
      const open = widget.classList.toggle('fb-open');
      fab.setAttribute('aria-expanded', String(open));
      if (open) widget.querySelector('.fb-close').focus();
    });
    widget.querySelector('.fb-close').addEventListener('click', closeWidget);
    widget.querySelector('#fb-reset').addEventListener('click', resetAll);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeWidget(); });
  }

  function closeWidget() {
    document.getElementById('fb-widget').classList.remove('fb-open');
    document.getElementById('fb-fab').setAttribute('aria-expanded', 'false');
  }

  function resetAll() {
    selected.clear();
    document.querySelectorAll('.fb-chip').forEach(b => b.classList.remove('fb-chip--on'));
    document.getElementById('fb-results-section').hidden = true;
    document.getElementById('fb-calc-section').hidden = true;
    document.getElementById('fb-formulas').innerHTML = '';
    document.getElementById('fb-calc').innerHTML = '';
  }

  function toggleVar(key) {
    const btn = document.querySelector(`.fb-chip[data-key="${key}"]`);
    if (selected.has(key)) {
      selected.delete(key);
      btn.classList.remove('fb-chip--on');
    } else {
      selected.add(key);
      btn.classList.add('fb-chip--on');
    }
    // Clear calc when selection changes
    document.getElementById('fb-calc-section').hidden = true;
    document.getElementById('fb-calc').innerHTML = '';
    document.querySelectorAll('.fb-formula-card').forEach(c => c.classList.remove('fb-formula-card--active'));
    updateResults();
  }

  function updateResults() {
    const resultsEl = document.getElementById('fb-results-section');
    const formulasEl = document.getElementById('fb-formulas');

    if (selected.size === 0) { resultsEl.hidden = true; return; }

    const matches = FORMULAS.filter(f =>
      f.req.every(r => selected.has(r)) && !selected.has(f.sf)
    );

    formulasEl.innerHTML = '';
    if (!matches.length) {
      formulasEl.innerHTML = '<p class="fb-no-match">Inga formler matchar — prova att avmarkera en variabel.</p>';
    } else {
      matches.forEach(formula => {
        const card = document.createElement('button');
        card.className = 'fb-formula-card';
        card.innerHTML = `<span class="fb-formula-expr">${formula.expr}</span><span class="fb-formula-meta">${formula.name}</span>`;
        card.addEventListener('click', () => {
          document.querySelectorAll('.fb-formula-card').forEach(c => c.classList.remove('fb-formula-card--active'));
          card.classList.add('fb-formula-card--active');
          showCalculator(formula);
        });
        formulasEl.appendChild(card);
      });
    }
    resultsEl.hidden = false;
  }

  function showCalculator(formula) {
    const calcSection = document.getElementById('fb-calc-section');
    const calcEl = document.getElementById('fb-calc');
    const sfMeta = VARS[formula.sf];

    calcEl.innerHTML = `
      <div class="fb-calc-title">Räkna ut ${sfMeta.sym} – ${sfMeta.label}</div>
      <div class="fb-calc-inputs" id="fb-inputs"></div>
      <button class="fb-calc-btn" id="fb-calc-go">Räkna ut</button>
      <div class="fb-calc-result" id="fb-result" hidden></div>
    `;

    const inputsEl = calcEl.querySelector('#fb-inputs');
    formula.req.forEach(varKey => {
      const meta = VARS[varKey];
      const row = document.createElement('div');
      row.className = 'fb-input-row';
      row.innerHTML = `
        <label class="fb-input-label">${meta.sym}${meta.unit ? ` <span class="fb-input-unit">(${meta.unit})</span>` : ''}</label>
        <input class="fb-input" type="number" data-var="${varKey}" placeholder="${meta.label}" step="any" inputmode="decimal">
      `;
      inputsEl.appendChild(row);
    });

    calcEl.querySelector('#fb-calc-go').addEventListener('click', runCalc);
    calcEl.querySelector('#fb-inputs').addEventListener('keydown', e => {
      if (e.key === 'Enter') runCalc();
    });
    // Auto-focus first input
    const first = calcEl.querySelector('.fb-input');
    if (first) first.focus();

    calcSection.hidden = false;
    setTimeout(() => calcSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);

    function runCalc() {
      const vals = {};
      let ok = true;
      calcEl.querySelectorAll('.fb-input').forEach(inp => {
        const val = parseFloat(inp.value);
        if (!isFinite(val)) { ok = false; inp.classList.add('fb-input--err'); }
        else { inp.classList.remove('fb-input--err'); vals[inp.dataset.var] = val; }
      });
      if (!ok) return;

      const result = formula.calc(vals);
      const resultEl = calcEl.querySelector('#fb-result');
      if (!isFinite(result) || isNaN(result)) {
        resultEl.innerHTML = `<span class="fb-result-err">Ogiltigt resultat – kontrollera värdena.</span>`;
      } else {
        resultEl.innerHTML = `<span class="fb-result-val">${fmtNum(result)}</span>${formula.unit ? `<span class="fb-result-unit"> ${formula.unit}</span>` : ''}`;
      }
      resultEl.hidden = false;
    }
  }

  function fmtNum(n) {
    const abs = Math.abs(n);
    if (abs === 0) return '0';
    if (abs < 0.001 || abs >= 1e6) return n.toExponential(3);
    if (Number.isInteger(n)) return n.toString();
    return parseFloat(n.toPrecision(5)).toString();
  }

  document.addEventListener('DOMContentLoaded', buildWidget);
})();

/* =========================================================
   KAPITELNAVIGATION – Förkunskaper, nästa steg & progress
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Kapitelmetadata ---------- */
  // Rekommenderad studieordning + beroenden
  const CHAPTERS = [
    {
      id: 'atomfysik', url: 'atomfysik.html', icon: '⚛️', title: 'Atomfysik',
      prereqs: [], next: ['material'], quiz: 'atomfysik_test.html',
    },
    {
      id: 'material', url: 'material.html', icon: '🧱', title: 'Material',
      prereqs: ['atomfysik'], next: ['kretsar', 'kabeltyper'], quiz: 'material_test.html',
    },
    {
      id: 'kretsar', url: 'kretsar.html', icon: '⚙️', title: 'Kretsar & Lagar',
      prereqs: ['atomfysik', 'material'], next: ['trefas', 'kabeldim'], quiz: 'kretsar_test.html',
    },
    {
      id: 'kabeltyper', url: 'kabeltyper.html', icon: '🔌', title: 'Kabeltyper',
      prereqs: ['material'], next: ['kabeldim'], quiz: 'kabeltyper_test.html',
    },
    {
      id: 'kabeldim', url: 'kabeldim.html', icon: '📏', title: 'Kabeldim.',
      prereqs: ['kretsar', 'kabeltyper'], next: ['skydd', 'installation'], quiz: 'kabeldim_test.html',
    },
    {
      id: 'trefas', url: 'trefas.html', icon: '🔄', title: 'Trefassystem',
      prereqs: ['kretsar'], next: ['skydd'], quiz: 'trefas_test.html',
    },
    {
      id: 'skydd', url: 'skydd.html', icon: '🛡️', title: 'Skydd & Säkerhet',
      prereqs: ['kretsar', 'kabeldim'], next: ['installation'], quiz: 'skydd_test.html',
    },
    {
      id: 'installation', url: 'installation.html', icon: '🏗️', title: 'Installation',
      prereqs: ['kabeltyper', 'kabeldim', 'skydd'], next: [], quiz: 'installation_test.html',
    },
  ];

  const STORAGE_KEY = 'ellara_progress';

  /* ---------- Progress helpers ---------- */
  function getProgress() {
    try { return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')); }
    catch { return new Set(); }
  }

  function saveProgress(set) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  }

  function toggleDone(id) {
    const p = getProgress();
    if (p.has(id)) p.delete(id); else p.add(id);
    saveProgress(p);
    return p.has(id);
  }

  function currentFile() {
    return window.location.pathname.split('/').pop() || 'index.html';
  }

  /* ---------- Chapter page: prereq bar + done btn + next bar ---------- */
  function initChapterNav() {
    const chapter = CHAPTERS.find(c => c.url === currentFile());
    if (!chapter) return;

    const progress = getProgress();
    let isDone = progress.has(chapter.id);

    // Build top bar
    const bar = document.createElement('div');
    bar.className = 'ch-nav-bar';

    if (chapter.prereqs.length) {
      const section = document.createElement('div');
      section.className = 'ch-nav-section';
      const lbl = document.createElement('span');
      lbl.className = 'ch-nav-label';
      lbl.textContent = 'Förkunskaper:';
      section.appendChild(lbl);
      chapter.prereqs.forEach(pid => {
        const pc = CHAPTERS.find(c => c.id === pid);
        if (!pc) return;
        const done = progress.has(pid);
        const chip = document.createElement('a');
        chip.href = pc.url;
        chip.className = 'ch-prereq-chip' + (done ? ' ch-prereq-chip--done' : '');
        chip.textContent = `${pc.icon} ${pc.title}${done ? ' ✓' : ''}`;
        section.appendChild(chip);
      });
      bar.appendChild(section);
    } else {
      const lbl = document.createElement('span');
      lbl.className = 'ch-nav-label';
      lbl.textContent = 'Startkapitel';
      bar.appendChild(lbl);
    }

    const doneBtn = document.createElement('button');
    doneBtn.className = 'ch-done-btn' + (isDone ? ' ch-done-btn--active' : '');
    doneBtn.textContent = isDone ? '✓ Klar' : 'Markera som klar';
    doneBtn.addEventListener('click', () => {
      isDone = toggleDone(chapter.id);
      doneBtn.className = 'ch-done-btn' + (isDone ? ' ch-done-btn--active' : '');
      doneBtn.textContent = isDone ? '✓ Klar' : 'Markera som klar';
    });
    bar.appendChild(doneBtn);

    // Inject after search bar (or at start of main-content)
    const searchWrap = document.getElementById('search-wrap');
    const mainContent = document.querySelector('.main-content');
    if (searchWrap) searchWrap.insertAdjacentElement('afterend', bar);
    else if (mainContent) mainContent.prepend(bar);

    const footer = document.querySelector('footer');

    // Bottom "next steps" bar
    if (chapter.next.length) {
      const nextBar = document.createElement('div');
      nextBar.className = 'ch-next-bar';
      const lbl = document.createElement('span');
      lbl.className = 'ch-nav-label';
      lbl.textContent = 'Nästa steg:';
      nextBar.appendChild(lbl);
      chapter.next.forEach(nid => {
        const nc = CHAPTERS.find(c => c.id === nid);
        if (!nc) return;
        const chip = document.createElement('a');
        chip.href = nc.url;
        chip.className = 'ch-next-chip';
        chip.textContent = `${nc.icon} ${nc.title} →`;
        nextBar.appendChild(chip);
      });
      if (footer) footer.insertAdjacentElement('beforebegin', nextBar);
    }

    // Test banner
    if (chapter.quiz) {
      const testBar = document.createElement('div');
      testBar.className = 'ch-test-bar';
      testBar.innerHTML = `
        <div class="ch-test-bar-text">
          <div class="ch-test-bar-title">Redo att testa dina kunskaper?</div>
          <div class="ch-test-bar-sub">10–15 frågor · Blandat · Klara 95% för att markera kapitlet som klart</div>
        </div>
        <a href="${chapter.quiz}" class="ch-test-btn">Starta test →</a>
      `;
      if (footer) footer.insertAdjacentElement('beforebegin', testBar);
    }
  }

  /* ---------- Index page: done dots on chapter cards ---------- */
  function initIndexProgress() {
    if (!document.querySelector('.chapter-card')) return;
    const progress = getProgress();
    document.querySelectorAll('.chapter-card').forEach(card => {
      const href = card.getAttribute('href') || '';
      const file = href.split('/').pop();
      const ch = CHAPTERS.find(c => c.url === file);
      if (!ch || !progress.has(ch.id)) return;
      card.classList.add('ch-card--done');
      const dot = document.createElement('div');
      dot.className = 'ch-card-done-dot';
      dot.textContent = '✓';
      dot.title = 'Klar!';
      card.appendChild(dot);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initChapterNav();
    initIndexProgress();
  });
})();

/* =========================================================
   QUIZ-MOTOR – Per-kapitel kunskapstester
   ========================================================= */
(function () {
  'use strict';
  if (typeof QUIZ_DATA === 'undefined') return;

  const { chapterId, chapterTitle, chapterUrl, icon, passPct = 95, questions } = QUIZ_DATA;
  const STORAGE_KEY = 'ellara_progress';

  // Shuffle array in place
  function shuffle(arr) { return arr.sort(() => Math.random() - 0.5); }

  const shuffled = shuffle([...questions]);
  let current = 0, score = 0;
  const answered = [];

  const root = document.getElementById('quiz-root');
  if (!root) return;

  function render() {
    if (current < shuffled.length) renderQuestion();
    else renderResults();
    root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderQuestion() {
    const q = shuffled[current];
    const n = current + 1;
    const total = shuffled.length;
    const pct = Math.round(((n - 1) / total) * 100);

    root.innerHTML = `
      <div class="quiz-header">
        <a href="${chapterUrl}" class="quiz-back">← ${icon} ${chapterTitle}</a>
        <div class="quiz-progress-wrap">
          <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>
          <div class="quiz-progress-text">Fråga ${n} av ${total}</div>
        </div>
      </div>
      <div class="quiz-card" id="quiz-card">
        <div class="quiz-q-type">${q.type === 'mc' ? '📋 Flerval' : '🔢 Beräkning'}</div>
        <div class="quiz-q-text">${q.q}</div>
        ${q.type === 'mc' ? buildMC(q) : buildNum(q)}
        <div class="quiz-explanation" id="quiz-exp" hidden></div>
        <button class="quiz-next-btn" id="quiz-next" hidden></button>
      </div>`;

    if (q.type === 'mc') attachMC(q);
    else attachNum(q);
  }

  function buildMC(q) {
    return `<div class="quiz-opts">${q.opts.map((o, i) =>
      `<button class="quiz-opt" data-i="${i}">${o}</button>`).join('')}</div>`;
  }

  function buildNum(q) {
    return `<div class="quiz-num-wrap">
      <input class="quiz-num-input" id="qni" type="number" step="any" inputmode="decimal" placeholder="Ange svar…" autocomplete="off">
      ${q.unit ? `<span class="quiz-num-unit">${q.unit}</span>` : ''}
      <button class="quiz-num-btn" id="qnb">Kontrollera</button>
    </div>`;
  }

  function attachMC(q) {
    root.querySelectorAll('.quiz-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = +btn.dataset.i;
        const ok = i === q.ans;
        root.querySelectorAll('.quiz-opt').forEach(b => {
          b.disabled = true;
          const j = +b.dataset.i;
          if (j === q.ans) b.classList.add('quiz-opt--correct');
          else if (j === i && !ok) b.classList.add('quiz-opt--wrong');
        });
        if (ok) score++;
        answered.push({ q, ok, given: q.opts[i] });
        showExp(q, ok);
      });
    });
  }

  function attachNum(q) {
    const inp = root.querySelector('#qni');
    const btn = root.querySelector('#qnb');
    function check() {
      const v = parseFloat(inp.value.replace(',', '.'));
      if (!isFinite(v)) { inp.classList.add('quiz-input--err'); return; }
      inp.classList.remove('quiz-input--err');
      const tol = q.tol !== undefined ? q.tol : Math.max(0.01, Math.abs(q.ans) * 0.02);
      const ok = Math.abs(v - q.ans) <= tol;
      inp.disabled = true; btn.disabled = true;
      inp.classList.add(ok ? 'quiz-num-input--correct' : 'quiz-num-input--wrong');
      if (ok) score++;
      answered.push({ q, ok, given: v });
      showExp(q, ok);
    }
    btn.addEventListener('click', check);
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
    setTimeout(() => inp.focus(), 50);
  }

  function showExp(q, ok) {
    const expEl = root.querySelector('#quiz-exp');
    const correctStr = q.type === 'num'
      ? `${q.ans}${q.unit ? ' ' + q.unit : ''}`
      : q.opts[q.ans];
    expEl.innerHTML = `
      <div class="quiz-exp-status ${ok ? 'quiz-exp--ok' : 'quiz-exp--fail'}">
        ${ok ? '✓ Rätt!' : `✗ Fel – rätt svar: <strong>${correctStr}</strong>`}
      </div>
      ${q.exp ? `<div class="quiz-exp-text">${q.exp}</div>` : ''}`;
    expEl.hidden = false;
    const nxt = root.querySelector('#quiz-next');
    nxt.textContent = current + 1 < shuffled.length ? 'Nästa fråga →' : 'Se resultat →';
    nxt.hidden = false;
    nxt.addEventListener('click', () => { current++; render(); });
  }

  function renderResults() {
    const total = shuffled.length;
    const pct = Math.round((score / total) * 100);
    const pass = pct >= passPct;

    if (pass) {
      try {
        const p = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));
        p.add(chapterId);
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...p]));
      } catch (e) {}
    }

    root.innerHTML = `
      <div class="quiz-results">
        <div class="quiz-results-icon">${pass ? '🏆' : '📚'}</div>
        <div class="quiz-results-score quiz-results--${pass ? 'pass' : 'fail'}">${pct}%</div>
        <div class="quiz-results-fraction">${score} av ${total} rätt</div>
        <div class="quiz-results-msg">${pass
          ? `Utmärkt! ${icon} <strong>${chapterTitle}</strong> har markerats som klar.`
          : `Fortsätt träna! Du behöver ${passPct}% för att klara testet.`}</div>
        <div class="quiz-results-actions">
          <button class="quiz-retry-btn" id="qr-retry">Försök igen</button>
          <a href="${chapterUrl}" class="quiz-back-btn">← Tillbaka till kapitlet</a>
        </div>
        <details class="quiz-breakdown">
          <summary>Visa alla svar (${score}/${total})</summary>
          <div class="quiz-breakdown-list">
            ${answered.map((a, i) => `
              <div class="quiz-breakdown-item breakdown--${a.ok ? 'ok' : 'fail'}">
                <span class="breakdown-num">${i + 1}.</span>
                <span class="breakdown-q">${a.q.q}</span>
                <span class="breakdown-result">${a.ok ? '✓' : '✗'}</span>
              </div>`).join('')}
          </div>
        </details>
      </div>`;

    root.querySelector('#qr-retry').addEventListener('click', () => {
      current = 0; score = 0; answered.length = 0;
      shuffle(shuffled);
      render();
    });
  }

  document.addEventListener('DOMContentLoaded', render);
})();
