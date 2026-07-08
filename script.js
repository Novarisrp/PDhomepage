const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html) n.innerHTML = html; return n; };
function renderCards(id, rows){ const root=document.getElementById(id); rows.forEach(r=>root.appendChild(el('article','card',`<h3>${r.title}</h3><p>${r.text}</p>`))); }
function renderRules(){ const tb=document.querySelector('#rulesTable tbody'); SITE_DATA.rules.forEach(r=>tb.appendChild(el('tr','',`<td>${r.item}</td><td>${r.content}</td><td>${r.note}</td>`))); }
function renderCodes(){ const tb=document.querySelector('#codesTable tbody'); SITE_DATA.codes.forEach(r=>tb.appendChild(el('tr','',`<td><strong>${r.code}</strong></td><td>${r.meaning}</td>`))); }
function renderSteps(){ const root=document.getElementById('flowSteps'); SITE_DATA.flows.forEach((r,i)=>root.appendChild(el('article','step',`<div class="step-num">${String(i+1).padStart(2,'0')}</div><h3>${r.title}</h3><p>${r.text}</p>`))); }
renderCards('missionCards', SITE_DATA.missions); renderCards('joinCards', SITE_DATA.joins); renderRules(); renderCodes(); renderSteps();

function renderDetailRules() {
  const container = document.getElementById("detailRules");
  if (!container || !SITE_DATA.detailRules) return;

  container.innerHTML = SITE_DATA.detailRules.map(rule => `
    <details class="rule-card">
      <summary>${rule.icon} ${rule.title}</summary>

      <div class="rule-card-body">
        ${rule.blocks.map(block => `
          <div class="rule-block">
            <h4>${block.heading}</h4>
            <ul>
              ${block.items.map(item => `<li>${item}</li>`).join("")}
            </ul>
          </div>
        `).join("")}
      </div>
    </details>
  `).join("");
}

renderDetailRules();
