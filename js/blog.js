document.addEventListener('DOMContentLoaded', () => {
    // 1. Handle deep-linking (if someone visits 5ilent5pring.org/#sat)
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        // This function is defined in your index.html
        if (typeof showPage === 'function') showPage(hash);
    }

    // 2. Fetch the post database with a Cache Buster (?t=...)
    // This ensures you never see a cached "empty" version of the blog.
    fetch('posts.json?t=' + new Date().getTime())
        .then(response => response.json())
        .then(data => {
            // Map JSON keys (from main.go) to HTML Section IDs (from index.html)
            const mapping = {
                'sat-notes': 'sat-page',
                'technical': 'technical-page',
                'case-studies': 'cases-page',
                'book-reviews': 'books-page'
            };

            // Populate each specific category page
            Object.keys(mapping).forEach(jsonKey => {
                const targetId = mapping[jsonKey];
                const posts = data[jsonKey] || [];
                renderToGrid(posts, targetId);
            });

            // Populate the Home Page with the 6 most recent articles
            renderHome(data);
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
        container.innerHTML = `<p style="color:var(--text-muted)">// No entries found in this category.</p>`;
        return;
    }

    container.innerHTML = posts.map(post => createCard(post)).join('');
}

/**
 * Flattens all categories and shows the latest 6 on the homepage
 */
function renderHome(data) {
    const container = document.querySelector('#home-page .cards-grid');
    if (!container) return;

    let allPosts = [];
    Object.values(data).forEach(categoryArray => {
        allPosts = allPosts.concat(categoryArray);
    });

    // Sort by date (newest first)
    allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Render top 6
    const latest = allPosts.slice(0, 6);
    container.innerHTML = latest.map(post => createCard(post)).join('');
}

/**
 * Creates the HTML for a single post card
 */
function createCard(post) {
    // Ensure tags exist to avoid errors
    const tagsHtml = post.tags 
        ? post.tags.map(t => `<span style="color:var(--accent); font-size:0.75rem; margin-right:8px;">#${t}</span>`).join('') 
        : '';

    return `
        <article class="card" onclick="window.location.href='${post.link}'" style="cursor: pointer;">
            <div class="meta">
                <span>> ${post.date}</span>
            </div>
            <h3>${post.title}</h3>
            <p>${post.description}</p>
            <div class="tags">
                ${tagsHtml}
            </div>
        </article>
    `;
}