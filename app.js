import { CATEGORIES, PATTERNS, SEASONS, COLORS, colorOf, recommend } from './match.js';
import { icon, mountIcons } from './icons.js';
mountIcons();

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------------- 저장소 (브라우저 IndexedDB) ---------------- */
const dbReady = new Promise((resolve, reject) => {
  const req = indexedDB.open('baby-closet', 1);
  req.onupgradeneeded = () => req.result.createObjectStore('items', { keyPath: 'id' });
  req.onsuccess = () => resolve(req.result);
  req.onerror = () => reject(req.error);
});
async function tx(mode, fn) {
  const db = await dbReady;
  return new Promise((resolve, reject) => {
    const t = db.transaction('items', mode);
    const r = fn(t.objectStore('items'));
    t.oncomplete = () => resolve(r?.result);
    t.onerror = () => reject(t.error);
  });
}
const db = {
  all: () => tx('readonly', (s) => s.getAll()),
  put: (item) => tx('readwrite', (s) => s.put(item)),
  del: (id) => tx('readwrite', (s) => s.delete(id)),
  clear: () => tx('readwrite', (s) => s.clear()),
};

let items = [];
let filter = '전체';

/* ---------------- 공통 ---------------- */
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.remove('hidden');
  clearTimeout(toast.timer); toast.timer = setTimeout(() => t.classList.add('hidden'), 2600);
}
function showView(name) {
  document.querySelectorAll('.view').forEach((v) => v.classList.toggle('active', v.id === `view-${name}`));
  document.querySelectorAll('.tabbar button').forEach((b) => b.classList.toggle('active', b.dataset.view === name));
  window.scrollTo(0, 0);
}
document.querySelectorAll('.tabbar button').forEach((b) => b.addEventListener('click', () => showView(b.dataset.view)));
function refreshBadge() {
  const on = aiEnabled();
  $('#ai-badge').textContent = on ? '무료 AI 켜짐' : 'AI 꺼짐';
  $('#ai-badge').classList.toggle('on', on);
}
const tagsHtml = (it) => `
  <span class="tag"><span class="dot" style="background:${colorOf(it.color).hex}"></span>${esc(it.color)}</span>
  <span class="tag">${esc(it.category)}</span>
  <span class="tag">${esc(it.pattern)}</span>
  ${(it.seasons || []).map((s) => `<span class="tag">${esc(s)}</span>`).join('')}`;

/* ---------------- 옷장 목록 ---------------- */
function renderCloset() {
  $('#filters').innerHTML = ['전체', ...CATEGORIES]
    .map((c) => `<button class="${c === filter ? 'on' : ''}" data-f="${c}">${c} ${c === '전체' ? items.length : items.filter((i) => i.category === c).length}</button>`)
    .join('');
  const list = items.filter((i) => filter === '전체' || i.category === filter);
  $('#empty').classList.toggle('hidden', items.length > 0);
  $('#grid').innerHTML = list.map((it) => `
    <button class="tile" data-id="${it.id}">
      <img src="${it.photo}" alt="${esc(it.name)}" loading="lazy">
      <div class="meta">
        <div class="name">${esc(it.name)}</div>
        <div class="sub"><span class="dot" style="background:${colorOf(it.color).hex}"></span>${esc(it.color)} · ${esc(it.category)}</div>
      </div>
    </button>`).join('');
}
$('#filters').addEventListener('click', (e) => {
  const b = e.target.closest('button'); if (!b) return;
  filter = b.dataset.f; renderCloset();
});
$('#grid').addEventListener('click', (e) => {
  const t = e.target.closest('.tile'); if (t) openDetail(t.dataset.id);
});

/* ---------------- 상세 + 추천 ---------------- */
function openDetail(id) {
  const it = items.find((i) => i.id === id); if (!it) return;
  const { byCat, outfit } = recommend(it, items);
  const pct = (s) => `${Math.round(s * 100)}점`;

  const bestHtml = outfit.length ? `
    <h3 class="with-ico">${icon('sparkle', 26)}오늘의 추천 코디</h3>
    <div class="card best">
      <div class="outfit">
        <img src="${it.photo}" alt="">
        ${outfit.map((o) => `<span class="plus">+</span><img src="${o.item.photo}" alt="${esc(o.item.name)}">`).join('')}
      </div>
      ${outfit.map((o) => `<p class="reason"><b>${esc(o.item.name)}</b> — ${esc(o.reason)}</p>`).join('')}
    </div>` : '';

  const cats = CATEGORIES.filter((c) => byCat[c]);
  const listHtml = cats.length
    ? cats.map((cat) => `
      <h3>어울리는 ${esc(cat)}</h3>
      <div class="rec-list">
        ${byCat[cat].slice(0, 5).map((r) => `
          <button class="rec" data-id="${r.item.id}">
            <img src="${r.item.photo}" alt="">
            <div class="info"><b>${esc(r.item.name)}</b><p>${esc(r.reason)}</p></div>
            <span class="score">${pct(r.score)}</span>
          </button>`).join('')}
      </div>`).join('')
    : `<p class="muted" style="margin-top:20px">함께 입을 만한 다른 종류의 옷이 아직 없어요. ${
        it.category === '하의' ? '상의' : '하의'}나 아우터를 더 등록해 보세요!</p>`;

  $('#sheet-content').innerHTML = `
    <div class="detail">
      <img src="${it.photo}" alt="">
      <div><h2>${esc(it.name)}</h2><div class="tags">${tagsHtml(it)}</div>
        ${it.analyzedBy ? `<p class="muted small">분석: ${esc(it.analyzedBy)}</p>` : ''}</div>
    </div>
    ${bestHtml}
    ${listHtml}
    <div class="actions">
      <button class="row-btn" id="edit-item">수정</button>
      <button class="danger" id="delete-item">삭제</button>
    </div>`;
  $('#sheet').classList.remove('hidden');
  $('#sheet-content').querySelectorAll('.rec').forEach((b) => b.addEventListener('click', () => openDetail(b.dataset.id)));
  $('#delete-item').onclick = async () => {
    if (!confirm(`'${it.name}'을(를) 옷장에서 삭제할까요?`)) return;
    await db.del(it.id); await load(); closeSheet(); toast('삭제했어요');
  };
  $('#edit-item').onclick = () => { closeSheet(); startEdit(it); };
  $('.sheet-body').scrollTop = 0;
}
const closeSheet = () => $('#sheet').classList.add('hidden');
$('#sheet-close').onclick = closeSheet;
$('#sheet').addEventListener('click', (e) => { if (e.target.id === 'sheet') closeSheet(); });

/* ---------------- 사진 처리 ---------------- */
function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => reject(new Error('사진을 열 수 없어요'));
    img.src = url;
  });
}
function resizeToDataUrl(img, max = 1024) {
  const k = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
  const c = document.createElement('canvas');
  c.width = Math.round(img.naturalWidth * k); c.height = Math.round(img.naturalHeight * k);
  c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
  return c.toDataURL('image/jpeg', 0.85);
}

// AI 없이: 배경(가장자리 색)을 빼고 가장 많이 나오는 색을 팔레트에서 찾음
function localColor(img) {
  const N = 64, c = document.createElement('canvas'); c.width = c.height = N;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, 0, 0, N, N);
  const d = ctx.getImageData(0, 0, N, N).data;
  const px = (x, y) => { const i = (y * N + x) * 4; return [d[i], d[i + 1], d[i + 2]]; };
  const border = [];
  for (let i = 0; i < N; i++) border.push(px(i, 0), px(i, N - 1), px(0, i), px(N - 1, i));
  const bg = [0, 1, 2].map((k) => border.reduce((s, p) => s + p[k], 0) / border.length);
  const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
  const buckets = new Map();
  for (let y = 4; y < N - 4; y++) for (let x = 4; x < N - 4; x++) {
    const p = px(x, y);
    if (dist(p, bg) < 45) continue;
    const key = p.map((v) => v >> 5).join(',');
    const b = buckets.get(key) || { n: 0, sum: [0, 0, 0] };
    b.n++; p.forEach((v, k) => (b.sum[k] += v)); buckets.set(key, b);
  }
  let best = null; for (const b of buckets.values()) if (!best || b.n > best.n) best = b;
  const rgb = best ? best.sum.map((v) => v / best.n) : bg;
  const hex2rgb = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
  return COLORS.reduce((a, c) => (dist(hex2rgb(c.hex), rgb) < dist(hex2rgb(a.hex), rgb) ? c : a)).name;
}

/* ---------------- 무료 AI 사진 분석 (기기 안에서 실행, CLIP 모델) ---------------- */
// 처음 한 번 모델(약 90MB)을 받아 브라우저에 저장해 두고, 그다음부터는 인터넷 없이도 무료로 분석해요.
const AI_LIB = 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.6';
const AI_MODEL = 'Xenova/clip-vit-base-patch32';
const aiEnabled = () => { try { return localStorage.getItem('free-ai') !== 'off'; } catch { return true; } };

let classifierPromise = null;
function loadClassifier(onProgress) {
  if (!classifierPromise) {
    classifierPromise = (async () => {
      const { pipeline } = await import(AI_LIB);
      const files = {};
      return pipeline('zero-shot-image-classification', AI_MODEL, {
        dtype: 'q8',
        progress_callback: (p) => {
          if (p.status !== 'progress' || !p.total) return;
          files[p.file] = [p.loaded, p.total];
          const [l, t] = Object.values(files).reduce((a, [x, y]) => [a[0] + x, a[1] + y], [0, 0]);
          onProgress?.(Math.round((l / t) * 100));
        },
      });
    })().catch((err) => { classifierPromise = null; throw err; });
  }
  return classifierPromise;
}

// 각 항목을 여러 영어 설명으로 물어보고 점수를 합산 (CLIP은 영어 문장으로 판단)
const CATEGORY_PROMPTS = {
  '상의': ['a t-shirt', 'a long sleeve shirt', 'a sweatshirt', 'a baby bodysuit top', 'a knit sweater'],
  '하의': ['a pair of pants', 'baby trousers', 'leggings', 'shorts', 'a skirt'],
  '원피스·우주복': ['a dress', 'a baby romper', 'a one-piece baby jumpsuit with legs', 'a sleepsuit'],
  '아우터': ['a jacket', 'a cardigan', 'a padded coat', 'a vest', 'a hooded zip-up jacket'],
};
const PATTERN_PROMPTS = {
  '무지': ['a plain solid color garment'],
  '무늬': ['a striped garment', 'a checkered garment', 'a polka dot garment', 'a garment with a printed character pattern'],
};
const WARMTH_PROMPTS = {
  light: ['thin light summer clothing', 'short sleeve clothing'],
  mid: ['spring or autumn clothing with long sleeves'],
  warm: ['thick warm winter clothing', 'fleece or padded winter clothing'],
};

async function vote(clf, image, groups) {
  const entries = Object.entries(groups).flatMap(([k, list]) => list.map((t) => [k, `a product photo of ${t}`]));
  const res = await clf(image, entries.map(([, t]) => t));
  const sc = {};
  for (const { label, score } of res) {
    const k = entries.find(([, t]) => t === label)[0];
    sc[k] = (sc[k] || 0) + score;
  }
  return Object.entries(sc).sort((a, b) => b[1] - a[1]); // [[항목, 점수], ...]
}

async function analyzeFree(dataUrl, onProgress) {
  const clf = await loadClassifier(onProgress);
  const [cat, pat, warm] = [
    await vote(clf, dataUrl, CATEGORY_PROMPTS),
    await vote(clf, dataUrl, PATTERN_PROMPTS),
    await vote(clf, dataUrl, WARMTH_PROMPTS),
  ];
  const seasons = { light: ['여름'], mid: ['봄', '가을'], warm: ['겨울'] }[warm[0][0]];
  return { category: cat[0][0], categoryConfidence: cat[0][1], pattern: pat[0][0], seasons };
}
/* ---------------- 옷 추가 / 수정 폼 ---------------- */
let draft = null; // 저장 전 옷 정보

function chipGroup(el, options, value, multi, render = (o) => esc(o)) {
  el.innerHTML = options.map((o) => `<button type="button" data-v="${esc(o)}" class="${(multi ? value.includes(o) : value === o) ? 'on' : ''}">${render(o)}</button>`).join('');
  el.onclick = (e) => {
    const b = e.target.closest('button'); if (!b) return;
    if (multi) b.classList.toggle('on');
    else { el.querySelectorAll('button').forEach((x) => x.classList.remove('on')); b.classList.add('on'); }
  };
}
const chipValue = (el, multi) => {
  const on = [...el.querySelectorAll('button.on')].map((b) => b.dataset.v);
  return multi ? on : on[0];
};

function fillForm(d) {
  const f = $('#item-form');
  f.name.value = d.name || '';
  chipGroup($('#f-category'), CATEGORIES, d.category, false);
  chipGroup($('#f-color'), COLORS.map((c) => c.name), d.color, false,
    (n) => `<span class="dot" style="background:${colorOf(n).hex}"></span>${esc(n)}`);
  chipGroup($('#f-pattern'), PATTERNS, d.pattern, false);
  chipGroup($('#f-seasons'), SEASONS, d.seasons || [], true);
  f.classList.remove('hidden');
}

function resetAdd() {
  draft = null;
  $('#file-input').value = '';
  $('#preview').classList.add('hidden');
  $('#pick-hint').classList.remove('hidden');
  $('#item-form').classList.add('hidden');
  setStatus('');
}
function setStatus(msg, busy = false) {
  const s = $('#analyze-status'); s.textContent = msg; s.classList.toggle('busy', busy);
}

function startEdit(it) {
  draft = { ...it };
  $('#preview').src = it.photo; $('#preview').classList.remove('hidden'); $('#pick-hint').classList.add('hidden');
  setStatus('정보를 고친 뒤 저장하세요');
  fillForm(draft);
  showView('add');
}

$('#file-input').addEventListener('change', async (e) => {
  const file = e.target.files[0]; if (!file) return;
  try {
    const img = await loadImage(file);
    const photo = resizeToDataUrl(img);
    $('#preview').src = photo; $('#preview').classList.remove('hidden'); $('#pick-hint').classList.add('hidden');
    $('#item-form').classList.add('hidden');
    draft = { id: crypto.randomUUID(), photo, createdAt: Date.now(),
      name: '', category: '상의', color: localColor(img), subColors: [], pattern: '무지', seasons: [] };

    if (aiEnabled()) {
      setStatus('AI가 사진을 분석하고 있어요…', true);
      try {
        const r = await analyzeFree(photo, (pct) =>
          setStatus(`AI 준비 중… ${pct}% (처음 한 번만 받아요)`, true));
        Object.assign(draft, r, { analyzedBy: '무료 AI (기기 안에서 분석)' });
        setStatus(r.categoryConfidence < 0.45
          ? '🤔 종류가 헷갈려요. 맞게 골라 주세요'
          : '✅ 자동 분석 완료! 틀린 곳이 있으면 고쳐 주세요');
        refreshBadge();
      } catch (err) {
        console.error(err);
        draft.analyzedBy = '사진 색상 추출';
        setStatus('⚠️ AI를 불러오지 못했어요(인터넷 확인). 색상만 자동으로 골랐어요');
      }
    } else {
      draft.analyzedBy = '사진 색상 추출';
      setStatus('🎨 색상을 자동으로 골랐어요. 종류와 계절을 선택해 주세요');
    }
    if (!draft.name) draft.name = `${draft.color} ${draft.category}`;
    fillForm(draft);
  } catch (err) {
    setStatus(`⚠️ ${err.message}`);
  }
});

$('#item-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!draft) return;
  const f = e.target;
  const item = {
    ...draft,
    category: chipValue($('#f-category')) || '상의',
    color: chipValue($('#f-color')) || '흰색',
    pattern: chipValue($('#f-pattern')) || '무지',
    seasons: chipValue($('#f-seasons'), true),
  };
  item.name = f.name.value.trim() || `${item.color} ${item.category}`;
  try {
    await db.put(item);
  } catch (err) {
    toast('저장하지 못했어요. 기기 저장공간을 확인해 주세요'); return;
  }
  await load();
  resetAdd();
  filter = '전체';
  renderCloset();
  showView('closet');
  toast('옷장에 저장했어요');
  openDetail(item.id);
});

/* ---------------- 설정 ---------------- */
$('#ai-toggle').checked = aiEnabled();
$('#ai-toggle').onchange = (e) => {
  try { localStorage.setItem('free-ai', e.target.checked ? 'on' : 'off'); } catch {}
  refreshBadge(); toast(e.target.checked ? 'AI 분석을 켰어요' : 'AI 분석을 껐어요');
};
$('#ai-preload').onclick = async () => {
  const b = $('#ai-preload'); b.disabled = true; b.textContent = 'AI 받는 중…';
  try {
    await loadClassifier((pct) => (b.textContent = `AI 받는 중… ${pct}%`));
    b.textContent = '✅ 준비 완료'; refreshBadge();
  } catch {
    b.disabled = false; b.textContent = 'AI 미리 받기'; toast('받지 못했어요. 인터넷 연결을 확인해 주세요');
  }
};
$('#wipe').onclick = async () => {
  if (!confirm('등록한 옷을 모두 지울까요? 되돌릴 수 없어요.')) return;
  await db.clear(); await load(); toast('옷장을 비웠어요');
};

/* ---------------- 시작 ---------------- */
async function load() {
  items = (await db.all()).sort((a, b) => b.createdAt - a.createdAt);
  renderCloset();
}
refreshBadge();
load();
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
// 개발·시연용: 콘솔에서 window.__closet 으로 접근
window.__closet = { db, load, localColor, recommend };
