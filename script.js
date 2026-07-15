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
          <div class="code-row code-row-parent">
            <span class="code-number">${escapeHtml(parent.code)}</span>
            <span class="code-meaning">${escapeHtml(parent.meaning)}</span>
          </div>
          ${children.map((item) => `
            <div class="code-row">
              <span class="code-number">${escapeHtml(item.code)}</span>
              <span class="code-meaning">${escapeHtml(item.meaning)}</span>
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
