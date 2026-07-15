'use strict';

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

function renderCards(targetId, items) {
  const target = document.getElementById(targetId);
  if (!target) return;

  target.innerHTML = items.map((item) => `
    <article class="card">
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.text)}</p>
    </article>
  `).join('');
}

function renderRules() {
  const tbody = document.querySelector('#rulesTable tbody');
  if (!tbody) return;

  tbody.innerHTML = SITE_DATA.rules.map((rule) => `
    <tr>
      <td>${escapeHtml(rule.item)}</td>
      <td>${escapeHtml(rule.content)}</td>
      <td>${escapeHtml(rule.note)}</td>
    </tr>
  `).join('');
}

function renderDetailRules() {
  const target = document.getElementById('detailRules');
  if (!target) return;

  target.innerHTML = SITE_DATA.detailRules.map((rule) => `
    <details class="rule-card">
      <summary><span class="rule-icon">${escapeHtml(rule.icon)}</span>${escapeHtml(rule.title)}</summary>
      <div class="rule-card-body">
        ${rule.blocks.map((block) => `
          <section class="rule-block">
            <h4>${escapeHtml(block.heading)}</h4>
            <ul>
              ${block.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
            </ul>
          </section>
        `).join('')}
      </div>
    </details>
  `).join('');
}

function renderFlow() {
  const target = document.getElementById('flowSteps');
  if (!target) return;

  target.innerHTML = SITE_DATA.flows.map((flow, index) => `
    <article class="step">
      <div class="step-num">${String(index + 1).padStart(2, '0')}</div>
      <h3>${escapeHtml(flow.title)}</h3>
      <p>${escapeHtml(flow.text)}</p>
    </article>
  `).join('');
}

function renderCodes() {
  const target = document.getElementById('codesGrid');
  if (!target) return;

  target.innerHTML = SITE_DATA.codes.map((group, index) => {
    const parent = group.items[0];
    const children = group.items.slice(1);
    const groupCode = parent.code.split('.')[0];

    return `
      <details class="code-group"${index === 0 ? ' open' : ''}>
        <summary>
          <span class="code-summary-number">${escapeHtml(groupCode)}</span>
          <span class="code-summary-meaning">${escapeHtml(group.title)}</span>
          <span class="code-arrow" aria-hidden="true">▼</span>
        </summary>
        <div class="code-list">
          <div class="code-row code-header">
            <span class="code-number">番号</span>
            <span class="code-meaning">対応内容</span>
            <span class="code-pd">PD人数</span>
            <span class="code-criminals">犯罪者人数</span>
            <span class="code-heli">犯罪者ヘリ台数</span>
            <span class="code-prison">プリズン</span>
            <span class="code-ivtime">押収時間(車)</span>
            <span class="code-ivprice">押収価格(車)</span>
            <span class="code-loot">成果物</span>
            <span class="code-distortion">歪み耐久時間</span>
            <span class="code-hostage">人質有無</span>
            <span class="code-prefire">先撃ち</span>
            <span class="code-npckill">NPC殺人</span>
          </div>
          <div class="code-row code-row-parent">
            <span class="code-number">${escapeHtml(parent.code)}</span>
            <span class="code-meaning">${escapeHtml(parent.meaning || '')}</span>
            <span class="code-pd">${escapeHtml(parent.pdCount || '')}</span>
            <span class="code-criminals">${escapeHtml(parent.criminals || '')}</span>
            <span class="code-heli">${escapeHtml(parent.criminalHeli || '')}</span>
            <span class="code-prison">${escapeHtml(parent.prison || '')}</span>
            <span class="code-ivtime">${escapeHtml(parent.ivTime || '')}</span>
            <span class="code-ivprice">${escapeHtml(parent.ivPrice || '')}</span>
            <span class="code-loot">${escapeHtml(parent.loot || '')}</span>
            <span class="code-distortion">${escapeHtml(parent.distortionDuration || '')}</span>
            <span class="code-hostage">${escapeHtml(parent.hostage || '')}</span>
            <span class="code-prefire">${escapeHtml(parent.prefire || '')}</span>
            <span class="code-npckill">${escapeHtml(parent.npcKill || '')}</span>
          </div>
          ${children.map((item) => `
            <div class="code-row">
              <span class="code-number">${escapeHtml(item.code)}</span>
              <span class="code-meaning">${escapeHtml(item.meaning || '')}</span>
              <span class="code-pd">${escapeHtml(item.pdCount || '')}</span>
              <span class="code-criminals">${escapeHtml(item.criminals || '')}</span>
              <span class="code-heli">${escapeHtml(item.criminalHeli || '')}</span>
              <span class="code-prison">${escapeHtml(item.prison || '')}</span>
              <span class="code-ivtime">${escapeHtml(item.ivTime || '')}</span>
              <span class="code-ivprice">${escapeHtml(item.ivPrice || '')}</span>
              <span class="code-loot">${escapeHtml(item.loot || '')}</span>
              <span class="code-distortion">${escapeHtml(item.distortionDuration || '')}</span>
              <span class="code-hostage">${escapeHtml(item.hostage || '')}</span>
              <span class="code-prefire">${escapeHtml(item.prefire || '')}</span>
              <span class="code-npckill">${escapeHtml(item.npcKill || '')}</span>
            </div>
          `).join('')}
        </div>
      </details>
    `;
  }).join('');
}

function init() {
  renderCards('missionCards', SITE_DATA.missions);
  renderRules();
  renderDetailRules();
  renderFlow();
  renderCodes();
  renderCards('joinCards', SITE_DATA.joins);
}

document.addEventListener('DOMContentLoaded', init);
