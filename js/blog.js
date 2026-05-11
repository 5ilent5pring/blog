document.addEventListener('DOMContentLoaded', () => {
    const GEOCTI_BASE = 'https://geocti.5ilent5pring.org';

    // 1. Handle deep-linking (if someone visits 5ilent5pring.org/#sat)
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        // Normalize category names to page IDs
        // (e.g. "geoCTI" from template → "geocti" for showPage)
        const pageMap = {
            'geoCTI': 'geocti',
            'sat-notes': 'sat',
            'book-reviews': 'books',
            'case-studies': 'cases',
            'technical': 'technical'
        };
        const page = pageMap[hash] || hash;
        if (typeof showPage === 'function') showPage(page);
    }

    // 2. Fetch the post database with a Cache Buster (?t=...)
    // This ensures you never see a cached "empty" version of the blog.
    fetch('posts.json?t=' + new Date().getTime())
        .then(response => response.json())
        .then(data => {
            // Map JSON keys (from main.go) to HTML Section IDs (from index.html)
            const mapping = {
                'writings': 'writings-page',
                'sat-notes': 'sat-page',
                'technical': 'technical-page',
                'case-studies': 'cases-page',
                'book-reviews': 'books-page',
                'geoCTI': 'geocti-page'
            };

            // Populate each specific category page
            Object.keys(mapping).forEach(jsonKey => {
                const targetId = mapping[jsonKey];
                const posts = jsonKey === 'writings'
                    ? getHumanPosts(data)
                    : normalizeGeoPostLinks(data[jsonKey] || [], GEOCTI_BASE);
                const limit = jsonKey === 'geoCTI' ? 6 : undefined;
                renderToGrid(sortPostsChronologically(posts).slice(0, limit), targetId);
            });

            // Populate the home page without letting the automated feed dominate it.
            renderHome(data, GEOCTI_BASE);
        })
        .catch(err => console.error("Critical Error: Could not load blog database.", err));
});

/**
 * Renders an array of posts into a specific grid container
 */
function renderToGrid(posts, containerId) {
    const container = document.querySelector(`#${containerId} .cards-grid`);
    if (!container) return;

    if (posts.length === 0) {
        container.innerHTML = `<p class="empty-state">// No entries found in this category yet.</p>`;
        return;
    }

    container.innerHTML = posts.map(post => createCard(post)).join('');
}

/**
 * Shows human-authored writing first, with a small bridge to geoCTI.
 */
function renderHome(data, geoBase) {
    const humanContainer = document.querySelector('#latest-human-grid');
    const geoContainer = document.querySelector('#geocti-preview-grid');

    if (humanContainer) {
        const latestHuman = sortPostsChronologically(getHumanPosts(data)).slice(0, 6);
        humanContainer.innerHTML = latestHuman.length
            ? latestHuman.map(post => createCard(post)).join('')
            : `<p class="empty-state">// Human-authored posts will appear here as the main blog grows.</p>`;
    }

    if (geoContainer) {
        const latestGeo = sortPostsChronologically(normalizeGeoPostLinks(data.geoCTI || [], geoBase)).slice(0, 3);
        geoContainer.innerHTML = latestGeo.length
            ? latestGeo.map(post => createCard(post, { badge: 'AI-assisted brief' })).join('')
            : `<p class="empty-state">// geoCTI feed is not available yet.</p>`;
    }
}

function getHumanPosts(data) {
    return Object.entries(data)
        .filter(([key]) => key !== 'geoCTI')
        .flatMap(([, posts]) => Array.isArray(posts) ? posts : []);
}

function normalizeGeoPostLinks(posts, geoBase) {
    return posts.map(post => {
        if (!post || post.category !== 'geoCTI') return post;
        if (/^https?:\/\//.test(post.link || '')) return post;
        return {
            ...post,
            link: `${geoBase}/${post.link || ''}`.replace(/([^:]\/)\/+/g, '$1')
        };
    });
}

function sortPostsChronologically(posts) {
    return [...posts].sort((a, b) => {
        const dateDiff = new Date(b.date) - new Date(a.date);
        if (dateDiff !== 0) return dateDiff;
        return (a.title || '').localeCompare(b.title || '');
    });
}

/**
 * Creates the HTML for a single post card
 */
function createCard(post, options = {}) {
    // Ensure tags exist to avoid errors
    const tagsHtml = post.tags
        ? post.tags.slice(0, 8).map(t => `<span style="color:var(--accent); font-size:0.75rem; margin-right:8px;">#${escapeHtml(t)}</span>`).join('')
        : '';
    const badgeHtml = options.badge ? `<span> | ${escapeHtml(options.badge)}</span>` : '';
    const categoryHtml = post.category ? `<span> | ${escapeHtml(post.category)}</span>` : '';
    const link = escapeAttribute(post.link || '#');

    return `
        <article class="card" onclick="window.location.href='${link}'" style="cursor: pointer;">
            <div class="meta">
                <span>> ${escapeHtml(post.date || '')}</span>${categoryHtml}${badgeHtml}
            </div>
            <h3>${escapeHtml(post.title || 'Untitled')}</h3>
            <p>${escapeHtml(post.description || '')}</p>
            <div class="tags">
                ${tagsHtml}
            </div>
        </article>
    `;
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function escapeAttribute(value) {
    return escapeHtml(value).replace(/`/g, '&#96;');
}
