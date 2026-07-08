const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html) n.innerHTML = html; return n; };
function renderCards(id, rows){ const root=document.getElementById(id); rows.forEach(r=>root.appendChild(el('article','card',`<h3>${r.title}</h3><p>${r.text}</p>`))); }
function renderRules(){ const tb=document.querySelector('#rulesTable tbody'); SITE_DATA.rules.forEach(r=>tb.appendChild(el('tr','',`<td>${r.item}</td><td>${r.content}</td><td>${r.note}</td>`))); }
function renderCodes(){ const tb=document.querySelector('#codesTable tbody'); SITE_DATA.codes.forEach(r=>tb.appendChild(el('tr','',`<td><strong>${r.code}</strong></td><td>${r.meaning}</td>`))); }
function renderSteps(){ const root=document.getElementById('flowSteps'); SITE_DATA.flows.forEach((r,i)=>root.appendChild(el('article','step',`<div class="step-num">${String(i+1).padStart(2,'0')}</div><h3>${r.title}</h3><p>${r.text}</p>`))); }
renderCards('missionCards', SITE_DATA.missions); renderCards('joinCards', SITE_DATA.joins); renderRules(); renderCodes(); renderSteps();
