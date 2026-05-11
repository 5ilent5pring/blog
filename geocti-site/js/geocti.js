document.addEventListener('DOMContentLoaded', () => {
    const state = {
        posts: [],
        query: ''
    };

    const cards = document.querySelector('#cards');
    const search = document.querySelector('#search');
    const count = document.querySelector('#brief-count');
    const latest = document.querySelector('#latest-date');

    fetch('posts.json?t=' + Date.now())
        .then(response => response.json())
        .then(data => {
            state.posts = sortPosts(data.geoCTI || []);
            updateStats(state.posts, count, latest);
            render(state.posts, cards);
        })
        .catch(() => {
            if (cards) {
                cards.innerHTML = '<p class="empty-state">// Could not load geoCTI archive.</p>';
            }
        });

    if (search) {
        search.addEventListener('input', event => {
            state.query = event.target.value.toLowerCase().trim();
            render(filterPosts(state.posts, state.query), cards);
        });
    }
});

function sortPosts(posts) {
    return [...posts].sort((a, b) => {
        const dateDiff = new Date(b.date) - new Date(a.date);
        if (dateDiff !== 0) return dateDiff;
        return (a.title || '').localeCompare(b.title || '');
    });
}

function filterPosts(posts, query) {
    if (!query) return posts;
    return posts.filter(post => {
        const haystack = [
            post.title,
            post.description,
            post.date,
            ...(post.tags || [])
        ].join(' ').toLowerCase();
        return haystack.includes(query);
    });
}

function updateStats(posts, countEl, latestEl) {
    if (countEl) countEl.textContent = String(posts.length);
    if (latestEl) latestEl.textContent = posts[0]?.date || '--';
}

function render(posts, container) {
    if (!container) return;
    if (!posts.length) {
        container.innerHTML = '<p class="empty-state">// No matching briefs found.</p>';
        return;
    }

    container.innerHTML = posts.map(createCard).join('');
}

function createCard(post) {
    const tags = (post.tags || [])
        .slice(0, 8)
        .map(tag => `<span>#${escapeHtml(tag)}</span>`)
        .join('');

    return `
        <a class="card" href="${escapeAttribute(post.link || '#')}">
            <div class="meta">${escapeHtml(post.date || '')} <span class="badge">AI-assisted brief</span></div>
            <h2>${escapeHtml(post.title || 'Untitled')}</h2>
            <p>${escapeHtml(post.description || '')}</p>
            <div class="tags">${tags}</div>
        </a>
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
