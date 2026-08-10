// Live news integration for SmartFarm AI
const NEWS_API_URL = 'https://inshorts.deta.dev/news?category=all';
const NEWS_KEYWORDS = [
    'farm', 'farmer', 'agriculture', 'crop', 'soil', 'subsidy', 'market', 'price', 'weather', 'irrigation', 'pesticide', 'harvest', 'scheme', 'govt', 'policy'
];

function fetchLiveNews() {
    const loading = document.getElementById('newsLoading');
    const newsList = document.getElementById('liveNewsList');

    if (!loading || !newsList) return;

    loading.textContent = 'Loading live news and information...';
    loading.style.display = 'block';
    newsList.innerHTML = '';

    fetch(NEWS_API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const items = Array.isArray(data.data) ? data.data : [];
            const filtered = items.filter(item => {
                const text = `${item.title} ${item.content}`.toLowerCase();
                return NEWS_KEYWORDS.some(keyword => text.includes(keyword));
            });

            renderLiveNews(filtered.length ? filtered.slice(0, 6) : items.slice(0, 6));
        })
        .catch(error => {
            console.error('Live news fetch failed:', error);
            renderNewsFallback();
        });
}

function renderLiveNews(articles) {
    const loading = document.getElementById('newsLoading');
    const newsList = document.getElementById('liveNewsList');

    if (!newsList || !loading) return;

    if (!articles.length) {
        newsList.innerHTML = '<div class="news-card"><h3>No live news available</h3><p>Try refreshing or check your internet connection.</p></div>';
        loading.style.display = 'none';
        return;
    }

    const cards = articles.map(article => {
        const title = article.title || article.headline || 'Latest update';
        const description = article.content ? `${article.content.slice(0, 120)}...` : article.description || 'No additional details available.';
        const source = article.source || article.author || 'Live News';
        const time = article.date || article.time || '';
        const link = article.readMoreUrl || article.url || '#';

        return `
            <div class="news-card">
                <div class="news-icon">📰</div>
                <h3>${title}</h3>
                <p>${description}</p>
                <div class="news-meta">
                    <span>${source}</span>
                    ${time ? `<span>${time}</span>` : ''}
                </div>
                ${link !== '#' ? `<a class="news-link" href="${link}" target="_blank" rel="noopener noreferrer">Read more</a>` : ''}
            </div>
        `;
    }).join('');

    newsList.innerHTML = cards;
    loading.style.display = 'none';
}

function renderNewsFallback() {
    const loading = document.getElementById('newsLoading');
    const newsList = document.getElementById('liveNewsList');

    if (!newsList || !loading) return;

    loading.textContent = 'Unable to load live news. Showing latest farmer updates.';
    newsList.innerHTML = `
        <div class="news-card">
            <div class="news-icon">💸</div>
            <h3>Government announces new farm subsidy</h3>
            <p>New support has been released for micro-irrigation systems, targeting smallholder farmers.</p>
        </div>
        <div class="news-card">
            <div class="news-icon">🌾</div>
            <h3>Market prices update</h3>
            <p>Wheat and rice prices are trending higher, helping farmers secure better returns.</p>
        </div>
        <div class="news-card">
            <div class="news-icon">🛰️</div>
            <h3>Weather advisory issued</h3>
            <p>Heavy rainfall warnings are active for eastern regions; prepare drainage and protect crops.</p>
        </div>
    `;
}

window.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('liveNewsList')) {
        fetchLiveNews();
    }
});
