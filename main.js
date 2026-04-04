// ============================================
// MAIN.JS — StreamVault Core Logic
// ============================================

const VIDEOS_PER_PAGE = 20;
let currentPage      = 1;
let filteredVideos   = [];
let allVideos        = [];
let activeCategory   = 'All';
let heroTimer        = null;
let currentHero      = 0;
let heroIds          = [];

// ─── INIT ───────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    allVideos      = window.videoData   || [];
    heroIds        = window.heroVideos  || [];
    filteredVideos = [...allVideos];

    const path      = window.location.pathname;
    const parts     = path.split('/').filter(Boolean);
    const isHome    = path === '/' || path.includes('index');
    const isVideo   = path.includes('video') || (parts.length === 2);

    // Sticky header
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Search
    const si = document.getElementById('searchInput');
    if (si) si.addEventListener('input', debounce(handleSearch, 300));

    // Back to top
    const btt = document.getElementById('backTop');
    if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Mobile menu
    const mt = document.getElementById('menuToggle');
    const nl = document.getElementById('navLinks');
    if (mt && nl) {
        mt.addEventListener('click', () => nl.classList.toggle('open'));
    }

    if (isHome) {
        initHome();
    } else if (isVideo) {
        initVideoPage(parts[1]);
    }
});

// ─── SCROLL HANDLER ─────────────────────────
function handleScroll() {
    const header = document.getElementById('header');
    const btt    = document.getElementById('backTop');
    const y      = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 60);
    if (btt)    btt.classList.toggle('visible', y > 400);
}

// ─── HOME PAGE ───────────────────────────────
function initHome() {
    buildCategoryFilter();
    renderHero();
    renderHomeRows();
    startHeroAuto();
}

// ─── HERO SLIDER ────────────────────────────
function renderHero() {
    const container = document.getElementById('heroSlider');
    if (!container) return;

    const dots = document.getElementById('heroDots');
    const heroes = heroIds.map(id => allVideos.find(v => v.id === id)).filter(Boolean);
    if (!heroes.length) return;

    container.innerHTML = '';
    if (dots) dots.innerHTML = '';

    heroes.forEach((v, i) => {
        // Slide
        const slide = document.createElement('div');
        slide.className = 'hero-slide' + (i === 0 ? ' active' : '');
        slide.innerHTML = `
            <div class="hero-bg" style="background-image:url('${v.thumbnail}')"></div>
            <div class="hero-content">
                <div class="hero-badge">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                    ${v.category}
                </div>
                <h1 class="hero-title">${escHtml(v.title)}</h1>
                <div class="hero-rating">
                    <span class="stars">★★★★★</span>
                    <span class="score">${v.rating}</span>
                    <span class="count">${v.views} views</span>
                </div>
                <div class="hero-tags">
                    ${v.tags.slice(0,3).map(t => `<span class="hero-tag">${escHtml(t)}</span>`).join('')}
                </div>
                <div class="hero-actions">
                    <button class="btn-play" onclick="openVideo(${v.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                        Watch Now
                    </button>
                    <button class="btn-info" onclick="openVideo(${v.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        More Info
                    </button>
                </div>
            </div>
        `;
        container.appendChild(slide);

        // Dot
        if (dots) {
            const dot = document.createElement('button');
            dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Slide ${i+1}`);
            dot.addEventListener('click', () => goHero(i));
            dots.appendChild(dot);
        }
    });
}

function goHero(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots   = document.querySelectorAll('.hero-dot');
    const total  = slides.length;
    if (!total) return;
    index = ((index % total) + total) % total;

    slides[currentHero].classList.remove('active');
    if (dots[currentHero]) dots[currentHero].classList.remove('active');

    currentHero = index;
    slides[currentHero].classList.add('active');
    if (dots[currentHero]) dots[currentHero].classList.add('active');
}

function startHeroAuto() {
    if (heroTimer) clearInterval(heroTimer);
    heroTimer = setInterval(() => {
        const total = document.querySelectorAll('.hero-slide').length;
        if (total > 1) goHero(currentHero + 1);
    }, 6000);
}

// ─── CATEGORY FILTER ─────────────────────────
function buildCategoryFilter() {
    const wrap = document.getElementById('categoryFilter');
    if (!wrap) return;
    const cats = window.categories || ['All'];
    wrap.innerHTML = '';
    cats.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'cat-btn' + (cat === activeCategory ? ' active' : '');
        btn.textContent = cat;
        btn.addEventListener('click', () => {
            activeCategory = cat;
            document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterAndRender();
        });
        wrap.appendChild(btn);
    });
}

function filterAndRender() {
    const query = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
    filteredVideos = allVideos.filter(v => {
        const matchCat = activeCategory === 'All' || v.category === activeCategory;
        const matchQ   = !query || v.title.toLowerCase().includes(query)
                              || v.category.toLowerCase().includes(query)
                              || v.tags.some(t => t.toLowerCase().includes(query));
        return matchCat && matchQ;
    });
    currentPage = 1;
    renderGrid();
    renderPagination();
}

// ─── HOME ROWS ───────────────────────────────
function renderHomeRows() {
    // Top Row: sort by rating desc
    renderRow('topPicksRow', [...allVideos].sort((a,b) => b.rating - a.rating).slice(0, 14));
    // New Uploads: sort by date
    renderRow('newRow', [...allVideos].sort((a,b) => new Date(b.uploadDate)-new Date(a.uploadDate)).slice(0, 14));
    // Trending: sort by views
    renderRow('trendingRow', sortByViews([...allVideos]).slice(0, 14));
}

function renderRow(id, videos) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = '';
    videos.forEach(v => el.appendChild(createCard(v, 'row')));
}

function sortByViews(arr) {
    return arr.sort((a, b) => {
        const parse = s => {
            if (!s) return 0;
            const n = parseFloat(s);
            if (s.includes('M')) return n * 1e6;
            if (s.includes('K')) return n * 1e3;
            return n;
        };
        return parse(b.views) - parse(a.views);
    });
}

// ─── GRID PAGE ───────────────────────────────
function renderGrid() {
    const grid = document.getElementById('videoGrid');
    if (!grid) return;
    const start = (currentPage - 1) * VIDEOS_PER_PAGE;
    const slice = filteredVideos.slice(start, start + VIDEOS_PER_PAGE);
    grid.innerHTML = '';

    if (!slice.length) {
        grid.innerHTML = `
            <div class="no-results">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.069A1 1 0 0121 8.868V15a1 1 0 01-1.447.894L15 13.8M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/></svg>
                <h3>No videos found</h3>
                <p>Try a different search term or category.</p>
            </div>
        `;
        return;
    }

    slice.forEach(v => grid.appendChild(createCard(v, 'grid')));
}

// ─── CREATE CARD ─────────────────────────────
function createCard(video, variant = 'row') {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', video.title);
    card.addEventListener('click', () => openVideo(video.id));
    card.addEventListener('keydown', e => { if (e.key === 'Enter') openVideo(video.id); });

    const isNew = daysDiff(video.uploadDate) <= 7;

    card.innerHTML = `
        <div class="video-thumb">
            <img src="${video.thumbnail}" alt="${escHtml(video.title)}" loading="lazy">
            <div class="thumb-overlay">
                <div class="play-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </div>
            </div>
            ${video.duration ? `<span class="duration-badge">${escHtml(video.duration)}</span>` : ''}
            ${isNew ? `<span class="new-badge">New</span>` : ''}
        </div>
        <div class="video-body">
            <h3 class="video-title">${escHtml(video.title)}</h3>
            <div class="video-meta">
                <span class="video-rating">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    ${video.rating || ''}
                </span>
                ${video.views ? `<span class="video-views">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    ${escHtml(video.views)}
                </span>` : ''}
            </div>
        </div>
    `;
    return card;
}

// ─── PAGINATION ──────────────────────────────
function renderPagination() {
    const wrap = document.getElementById('pagination');
    if (!wrap) return;
    const total  = Math.ceil(filteredVideos.length / VIDEOS_PER_PAGE);
    if (total <= 1) { wrap.innerHTML = ''; return; }

    wrap.innerHTML = '';

    // Prev
    const prev = paginBtn('', true);
    prev.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>`;
    prev.disabled = currentPage === 1;
    prev.addEventListener('click', () => { if (currentPage > 1) { currentPage--; renderGrid(); renderPagination(); scrollUp(); } });
    wrap.appendChild(prev);

    // Page numbers
    const pages = getPageRange(currentPage, total);
    pages.forEach(p => {
        if (p === '…') {
            const el = document.createElement('span');
            el.className = 'page-ellipsis';
            el.textContent = '…';
            wrap.appendChild(el);
        } else {
            const btn = paginBtn(p, false);
            if (p === currentPage) btn.classList.add('active');
            btn.addEventListener('click', () => { currentPage = p; renderGrid(); renderPagination(); scrollUp(); });
            wrap.appendChild(btn);
        }
    });

    // Next
    const next = paginBtn('', true);
    next.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>`;
    next.disabled = currentPage === total;
    next.addEventListener('click', () => { if (currentPage < total) { currentPage++; renderGrid(); renderPagination(); scrollUp(); } });
    wrap.appendChild(next);
}

function paginBtn(text, isArrow) {
    const btn = document.createElement('button');
    btn.className = 'page-btn';
    if (text) btn.textContent = text;
    return btn;
}

function getPageRange(current, total) {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 4) return [1, 2, 3, 4, 5, '…', total];
    if (current >= total - 3) return [1, '…', total-4, total-3, total-2, total-1, total];
    return [1, '…', current-1, current, current+1, '…', total];
}

function scrollUp() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

// ─── SEARCH ─────────────────────────────────
function handleSearch() {
    filterAndRender();
}

// ─── VIDEO PAGE ──────────────────────────────
function initVideoPage(titleSlug) {
    const video = allVideos.find(v => slugify(v.title) === titleSlug);
    if (!video) { window.location.href = '/'; return; }

    document.title = `${video.title} – StreamVault`;

    // Player
    const iframe = document.getElementById('videoPlayer');
    if (iframe) iframe.src = video.embedUrl;

    // Info
    setText('playerTitle',    video.title);
    setText('playerCategory', video.category);
    setText('playerDate',     formatDate(video.uploadDate));
    setText('playerViews',    video.views || '');
    setText('playerRating',   video.rating || '');
    setText('playerDuration', video.duration || '');

    // Tags
    const tagsEl = document.getElementById('playerTags');
    if (tagsEl) {
        tagsEl.innerHTML = video.tags.map(t => `<span class="player-tag">${escHtml(t)}</span>`).join('');
    }

    // Related
    const relList = document.getElementById('relatedList');
    if (relList) {
        const related = allVideos
            .filter(v => v.id !== video.id && (v.category === video.category || v.tags.some(t => video.tags.includes(t))))
            .slice(0, 12);
        if (related.length < 12) {
            const extra = allVideos.filter(v => v.id !== video.id && !related.find(r => r.id === v.id)).slice(0, 12 - related.length);
            related.push(...extra);
        }
        relList.innerHTML = '';
        related.forEach(v => {
            const card = document.createElement('div');
            card.className = 'related-card';
            card.addEventListener('click', () => openVideo(v.id));
            card.innerHTML = `
                <div class="related-thumb">
                    <img src="${v.thumbnail}" alt="${escHtml(v.title)}" loading="lazy">
                </div>
                <div class="related-info">
                    <h4>${escHtml(v.title)}</h4>
                    <p>${escHtml(v.category)} · ${formatDate(v.uploadDate)}</p>
                </div>
            `;
            relList.appendChild(card);
        });
    }
}

// ─── NAVIGATION ─────────────────────────────
function openVideo(videoId) {
    const v = allVideos.find(v => v.id === videoId);
    if (!v) return;
    window.location.href = `/${slugify(v.category)}/${slugify(v.title)}`;
}

// ─── ROW ARROWS ─────────────────────────────
function scrollRow(rowId, dir) {
    const el = document.getElementById(rowId);
    if (el) el.scrollBy({ left: dir * 700, behavior: 'smooth' });
}

// ─── UTILITIES ───────────────────────────────
function slugify(text) {
    return String(text).toLowerCase().trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function escHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}

function formatDate(d) {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function daysDiff(dateStr) {
    return Math.floor((Date.now() - new Date(dateStr)) / 86400000);
}

function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

function debounce(fn, ms) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

// ─── EXPOSE GLOBALS ─────────────────────────
window.openVideo  = openVideo;
window.scrollRow  = scrollRow;
window.goHero     = goHero;
