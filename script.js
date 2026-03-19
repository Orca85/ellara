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
    copper: { rho: 0.0175, name: 'Koppar (Cu)', color: '#FF9B4D' },
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
  const rho = { copper: 0.0175, aluminium: 0.028 };

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
      example: 'Koppar (ρ = 0,0175), L = 50 m, A = 2,5 mm² → <strong>R = 0,0175 × 50 ÷ 2,5 = 0,35 Ω</strong>',
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
      example: 'R = 0,35 Ω, A = 2,5 mm², L = 50 m → <strong>ρ = 0,35 × 2,5 ÷ 50 = 0,0175 Ω·mm²/m (Koppar)</strong>',
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
      example: 'R = 0,35 Ω, A = 2,5 mm², ρ = 0,0175 (Koppar) → <strong>L = 0,35 × 2,5 ÷ 0,0175 = 50 m</strong>',
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
      example: 'ρ = 0,0175 (Koppar), L = 50 m, R = 0,35 Ω → <strong>A = 0,0175 × 50 ÷ 0,35 = 2,5 mm²</strong>',
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
    document.getElementById('theme-toggle').textContent = light ? '☀️' : '🌙';
  }

  function init() {
    const saved = localStorage.getItem('theme');
    apply(saved === 'light');

    document.getElementById('theme-toggle').addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      document.getElementById('theme-toggle').textContent = isLight ? '☀️' : '🌙';
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
    // Atomfysik
    { title: 'Atomens uppbyggnad', section: 'Atomfysik', anchor: '#atomfysik', keywords: 'atom proton neutron elektron kärna partikel' },
    { title: 'Laddning & Statisk elektricitet', section: 'Atomfysik', anchor: '#atomfysik', keywords: 'laddning statisk elektricitet överskott underskott plus minus' },
    { title: 'AC vs DC – Likström & Växelström', section: 'Atomfysik', anchor: '#atomfysik', keywords: 'ac dc likström växelström sinuskurva batteri vägguttag riktning' },
    { title: 'Hz – Hertz & frekvens', section: 'Atomfysik', anchor: '#atomfysik', keywords: 'hz hertz frekvens 50hz 60hz svängningar sekund europa usa' },
    // Material
    { title: 'Ledare, Halvledare & Isolatorer', section: 'Material', anchor: '#material', keywords: 'ledare halvledare isolator koppar aluminium resistivitet material' },
    { title: 'Resistivitetstabell', section: 'Material', anchor: '#material', keywords: 'resistivitet rho tabell koppar aluminium silver guld järn' },
    // Symboler
    { title: 'Elsymboler (IEC 60617)', section: 'Symboler', anchor: '#symboler', keywords: 'elsymboler iec kretschema batteri resistor kondensator spole lampa strömbrytare' },
    { title: 'Vad är IEC?', section: 'Symboler', anchor: '#symboler', keywords: 'iec international electrotechnical commission standard organisation' },
    { title: 'Minneslista – storheter & enheter', section: 'Symboler', anchor: '#symboler', keywords: 'storhet enhet volt ampere ohm watt hertz joule coulomb symbol' },
    // Kabeltyper
    { title: 'Kabeltyper – EK, FK, MK, RK', section: 'Kabeltyper', anchor: '#kopplingar', keywords: 'kabel ek fk mk rk enfasig trefasig installation kabeltyp' },
    // Kretsar
    { title: 'Ohms lag – U = R · I', section: 'Kretsar', anchor: '#kretsar', keywords: 'ohm ohms lag u r i spänning resistans ström beräkna formel' },
    { title: 'Effektlagen – P = U · I', section: 'Kretsar', anchor: '#kretsar', keywords: 'effekt p u i watt effektlagen formel beräkna' },
    { title: 'R = ρ · L/A – alla varianter', section: 'Kretsar', anchor: '#kretsar', keywords: 'rho resistivitet längd area resistans ledare formel varianter' },
    { title: 'Seriekoppling', section: 'Kretsar', anchor: '#kretsar', keywords: 'serie seriekrets seriekoppling rtot summera resistans ström itot ur1 ur2' },
    { title: 'Parallellkoppling', section: 'Kretsar', anchor: '#kretsar', keywords: 'parallell parallellkrets parallellkoppling rtot invers bråk spänning grenar i1 i2' },
    { title: 'Kirchhoffs strömlag – KCL', section: 'Kretsar', anchor: '#kretsar', keywords: 'kirchhoff kcl strömlag nod ström in ut summa förgrening kirchoffs lag' },
    { title: 'Kirchhoffs spänningslag – KVL', section: 'Kretsar', anchor: '#kretsar', keywords: 'kirchhoff kvl spänningslag slinga summa noll spänningsfall källspänning kirchoffs lag' },
    { title: 'Mätteknik – Amperemeter & Voltmeter', section: 'Kretsar', anchor: '#kretsar', keywords: 'amperemeter voltmeter mäta serie parallell koppla mätteknik' },
    { title: 'Beteckningar – Utot, UR1, Itot m.fl.', section: 'Kretsar', anchor: '#kretsar', keywords: 'beteckning utot ur1 ur2 itot i1 i2 rtot rpar index notation spänning ström resistans förklaring' },
    { title: 'Exempelräkning – Seriekrets', section: 'Kretsar', anchor: '#kretsar', keywords: 'exempel exempelräkning seriekrets serie rtot itot ur1 ur2 steg beräkning genomgång' },
    { title: 'Exempelräkning – Parallellkrets', section: 'Kretsar', anchor: '#kretsar', keywords: 'exempel exempelräkning parallellkrets parallell rtot itot i1 i2 steg beräkning genomgång' },
    { title: 'Exempelräkning – Kombinerad krets', section: 'Kretsar', anchor: '#kretsar', keywords: 'exempel exempelräkning kombinerad krets kombi blandad serie parallell rpar rtot steg beräkning' },
    // Installation
    { title: 'Resistans i ledare – R = ρ·L/A', section: 'Installation', anchor: '#installation', keywords: 'resistans ledare koppar aluminium längd area kalkylator' },
    { title: 'Säkringstabell & Ledarfärger', section: 'Installation', anchor: '#installation', keywords: 'säkring säkringstabell 6a 10a 16a 20a 25a ledarfärg area kabel grön röd grå blå gul' },
    { title: 'Spänningsfall – förklaring & kalkylator', section: 'Installation', anchor: '#installation', keywords: 'spänningsfall spänningsfall deltau 4% olagligt kalkylator installation standard vad är hur uppstår resistans ledare' },
    // Teckenförklaring
    { title: 'Teckenförklaring – Elektriska variabler (U, I, R, P…)', section: 'Tecken', anchor: '#tecken', keywords: 'teckenförklaring symbol variabel spänning u volt ström i ampere resistans r ohm effekt p watt frekvens hz laddning coulomb tid sekund' },
    { title: 'Teckenförklaring – Materialegenskaper (ρ, L, A)', section: 'Tecken', anchor: '#tecken', keywords: 'teckenförklaring rho ro resistivitet längd area material koppar aluminium ledare' },
    { title: 'Teckenförklaring – Index och beteckningar (tot, par, Δ)', section: 'Tecken', anchor: '#tecken', keywords: 'teckenförklaring index beteckning tot total par parallell delta förändring skillnad oändlighet ungefär notation' },
    { title: 'Teckenförklaring – Enhetsprefix (M, k, m, μ)', section: 'Tecken', anchor: '#tecken', keywords: 'teckenförklaring prefix mega kilo milli mikro enhet potens faktor storlek' },
    { title: 'Teckenförklaring – Alla formler samlade', section: 'Tecken', anchor: '#tecken', keywords: 'teckenförklaring formel ohms lag effektlag ledarresistans spänningsfall seriekoppling parallellkoppling' },
    { title: 'Teckenförklaring – Kretsschema-symboler', section: 'Tecken', anchor: '#tecken', keywords: 'teckenförklaring symbol batteri resistor lampa kondensator spole diod brytare säkring jord amperemeter voltmeter kretsschema' },
    { title: 'Teckenförklaring – Kabeltyp-beteckningar (EK, FK, MK, RK)', section: 'Tecken', anchor: '#tecken', keywords: 'teckenförklaring kabel ek fk mk rk kabeltyp beteckning installation' },
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
        <span class="search-result-section">${r.section}</span>
        <span class="search-result-title">${highlight(r.title, query)}</span>
      </li>`).join('');
    list.classList.add('visible');

    list.querySelectorAll('li[data-anchor]').forEach(li => {
      li.addEventListener('click', () => goTo(li.dataset.anchor));
    });
  }

  function goTo(anchor) {
    document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      name: '⚛️ Atomfysik',
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
        }
      ]
    },
    {
      name: '⚡ Ohms lag & Effekt',
      exercises: [
        {
          type: 'numeric',
          question: 'En krets har spänningen U = 12 V och resistansen R = 4 Ω. Hur stor är strömmen I?',
          hint: 'I = U / R',
          answer: 3,
          unit: 'A',
          explanation: 'I = U / R = 12 / 4 = 3 A'
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
          hint: 'I = P / U',
          answer: 5,
          unit: 'A',
          explanation: 'I = P / U = 1 150 / 230 = 5 A'
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
          hint: '1/R_tot = 1/R₁ + 1/R₂',
          answer: 4,
          unit: 'Ω',
          explanation: '1/R_tot = 1/6 + 1/12 = 2/12 + 1/12 = 3/12 → R_tot = 12/3 = 4 Ω. Parallellt ger alltid lägre resistans än den minsta.'
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
        }
      ]
    },
    {
      name: '🏗️ Installation & Dimensionering',
      exercises: [
        {
          type: 'numeric',
          question: 'Beräkna resistansen i en kopparledare: L = 25 m, A = 1,5 mm². (ρ_Cu = 0,0175 Ω·mm²/m)',
          hint: 'R = ρ · L / A',
          answer: 0.2917,
          unit: 'Ω',
          tolerance: 0.03,
          explanation: 'R = 0,0175 · 25 / 1,5 = 0,4375 / 1,5 ≈ 0,29 Ω'
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
          question: 'Beräkna spänningsfallet i %: I = 16 A, L = 30 m, A = 2,5 mm², koppar (ρ = 0,0175), U_nom = 230 V.',
          hint: 'ΔU = 2·ρ·L·I / A  →  % = ΔU/U_nom · 100',
          answer: 2.92,
          unit: '%',
          tolerance: 0.05,
          explanation: 'ΔU = 2 · 0,0175 · 30 · 16 / 2,5 = 6,72 V  →  6,72 / 230 · 100 ≈ 2,92 %  (OK – under 4 %)'
        },
        {
          type: 'mc',
          question: 'Vad är det maximalt tillåtna spänningsfallet i en installation (SS 437 01 40)?',
          options: ['2 %', '3 %', '4 %', '5 %'],
          answer: 2,
          explanation: '4 % är gränsen enligt svensk standard. Vid 230 V = max 9,2 V spänningsfall. Överskrids det är installationen inte godkänd.'
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
    q.textContent = ex.question;
    card.appendChild(q);

    /* hint */
    if (ex.hint) {
      const hint = document.createElement('div');
      hint.className = 'ex-hint';
      hint.textContent = '💡 ' + ex.hint;
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
