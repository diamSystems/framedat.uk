/* ============================================
   framed@ — Admin Dashboard JavaScript
   Demo mode with simulated real-time data
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initAdminAuth();
});

/* --- Authentication --- */
function initAdminAuth() {
    const authSection = document.getElementById('admin-auth');
    const dashboard = document.getElementById('admin-dashboard');
    const form = document.getElementById('admin-login-form');

    if (!authSection || !dashboard || !form) return;

    // Check if already authenticated
    if (localStorage.getItem('framed_admin') === 'true') {
        authSection.style.display = 'none';
        dashboard.style.display = 'block';
        initDashboard();
        return;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const pass = document.getElementById('admin-pass').value;

        if (pass === 'framed2026') {
            localStorage.setItem('framed_admin', 'true');
            authSection.style.display = 'none';
            dashboard.style.display = 'block';
            initDashboard();
        } else {
            const btn = form.querySelector('.btn');
            btn.textContent = 'INCORRECT';
            btn.style.borderColor = '#E63946';
            btn.style.color = '#E63946';
            setTimeout(() => {
                btn.textContent = 'Access Dashboard';
                btn.style.borderColor = '';
                btn.style.color = '';
            }, 1500);
        }
    });
}

/* --- Dashboard Init --- */
function initDashboard() {
    loadStats();
    loadChart();
    loadTopPages();
    initLiveFeed();
    initUploadZone();

    // Simulate real-time stat updates
    setInterval(updateStatsRealtime, 5000);
    setInterval(addLiveFeedItem, 4000);
}

/* --- Stats --- */
const baseStats = {
    visitors: 2847,
    tickets: 156,
    subscribers: 412,
    revenue: 2340
};

function loadStats() {
    animateNumber('stat-visitors', baseStats.visitors);
    animateNumber('stat-tickets', baseStats.tickets);
    animateNumber('stat-subscribers', baseStats.subscribers);
    animateNumber('stat-revenue', baseStats.revenue, '£');

    document.getElementById('stat-visitors-trend').textContent = '+12.4% vs last month';
    document.getElementById('stat-tickets-trend').textContent = '+8 this week';
    document.getElementById('stat-subscribers-trend').textContent = '+23 this month';
    document.getElementById('stat-revenue-trend').textContent = '+18.2% vs last month';
}

function animateNumber(id, target, prefix = '') {
    const el = document.getElementById(id);
    if (!el) return;

    let current = 0;
    const step = Math.ceil(target / 40);
    const interval = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(interval);
        }
        el.textContent = prefix + current.toLocaleString();
    }, 30);
}

function updateStatsRealtime() {
    // Randomly increment stats to simulate real-time
    const visitorDelta = Math.floor(Math.random() * 5) + 1;
    const subscriberDelta = Math.random() > 0.7 ? 1 : 0;
    const ticketDelta = Math.random() > 0.8 ? 1 : 0;

    baseStats.visitors += visitorDelta;
    baseStats.subscribers += subscriberDelta;
    baseStats.tickets += ticketDelta;
    baseStats.revenue += ticketDelta * 15;

    document.getElementById('stat-visitors').textContent = baseStats.visitors.toLocaleString();
    document.getElementById('stat-subscribers').textContent = baseStats.subscribers.toLocaleString();
    document.getElementById('stat-tickets').textContent = baseStats.tickets.toLocaleString();
    document.getElementById('stat-revenue').textContent = '£' + baseStats.revenue.toLocaleString();
}

/* --- Chart --- */
function loadChart() {
    const barsContainer = document.getElementById('chart-bars');
    const labelsContainer = document.getElementById('chart-labels');
    if (!barsContainer || !labelsContainer) return;

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const data = [342, 418, 387, 456, 521, 689, 614];
    const maxVal = Math.max(...data);

    barsContainer.innerHTML = '';
    labelsContainer.innerHTML = '';

    data.forEach((val, i) => {
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        bar.style.height = '0%';

        const valueLabel = document.createElement('span');
        valueLabel.className = 'chart-bar__value';
        valueLabel.textContent = val;
        bar.appendChild(valueLabel);

        barsContainer.appendChild(bar);

        // Animate in
        setTimeout(() => {
            bar.style.height = ((val / maxVal) * 100) + '%';
        }, 100 + (i * 80));

        const label = document.createElement('span');
        label.className = 'chart-label';
        label.textContent = days[i];
        labelsContainer.appendChild(label);
    });
}

/* --- Top Pages --- */
function loadTopPages() {
    const pages = {
        'page-home': 1243,
        'page-events': 876,
        'page-archive': 534,
        'page-about': 312,
        'page-contact': 189
    };

    Object.entries(pages).forEach(([id, val]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val.toLocaleString();
    });
}

/* --- Live Feed --- */
const livePages = [
    '/events', '/', '/archive', '/about', '/contact',
    '/events/opening-night', '/tickets', '/archive'
];

const liveSources = [
    'Manchester, UK', 'Leeds, UK', 'Liverpool, UK', 'London, UK',
    'Sheffield, UK', 'Birmingham, UK', 'Newcastle, UK'
];

function initLiveFeed() {
    const feed = document.getElementById('live-feed');
    if (!feed) return;

    // Initial items
    for (let i = 0; i < 5; i++) {
        addLiveFeedItem();
    }

    updateLiveCount();
}

function addLiveFeedItem() {
    const feed = document.getElementById('live-feed');
    if (!feed) return;

    const page = livePages[Math.floor(Math.random() * livePages.length)];
    const source = liveSources[Math.floor(Math.random() * liveSources.length)];

    const item = document.createElement('div');
    item.className = 'live-feed__item';
    item.innerHTML = `
        <span class="live-feed__page">${page}</span>
        <span>${source}</span>
        <span class="live-feed__time">just now</span>
    `;

    feed.insertBefore(item, feed.firstChild);

    // Keep max 10 items
    while (feed.children.length > 10) {
        feed.removeChild(feed.lastChild);
    }

    // Update timestamps on existing items
    const items = feed.querySelectorAll('.live-feed__item');
    items.forEach((el, i) => {
        const time = el.querySelector('.live-feed__time');
        if (i === 0) time.textContent = 'just now';
        else if (i === 1) time.textContent = '4s ago';
        else time.textContent = (i * 4) + 's ago';
    });

    updateLiveCount();
}

function updateLiveCount() {
    const el = document.getElementById('live-count');
    if (el) {
        el.textContent = Math.floor(Math.random() * 8) + 3;
    }
}

/* --- Upload Zone --- */
function initUploadZone() {
    const zone = document.getElementById('upload-zone');
    const input = document.getElementById('upload-input');
    const preview = document.getElementById('upload-preview');
    const form = document.getElementById('archive-upload-form');

    if (!zone || !input) return;

    zone.addEventListener('click', () => input.click());

    zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.classList.add('upload-zone--active');
    });

    zone.addEventListener('dragleave', () => {
        zone.classList.remove('upload-zone--active');
    });

    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('upload-zone--active');
        handleFiles(e.dataTransfer.files);
    });

    input.addEventListener('change', () => {
        handleFiles(input.files);
    });

    function handleFiles(files) {
        Array.from(files).forEach(file => {
            if (!file.type.startsWith('image/')) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                const item = document.createElement('div');
                item.className = 'upload-preview__item';
                item.innerHTML = `
                    <img src="${e.target.result}" alt="${file.name}">
                    <button class="upload-preview__remove" type="button">&times;</button>
                `;

                item.querySelector('.upload-preview__remove').addEventListener('click', () => {
                    item.remove();
                });

                preview.appendChild(item);
            };
            reader.readAsDataURL(file);
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.btn');
            const eventName = document.getElementById('upload-event').value;

            btn.textContent = 'UPLOADING...';
            setTimeout(() => {
                btn.textContent = 'UPLOADED';
                preview.innerHTML = '';
                form.reset();

                setTimeout(() => {
                    btn.textContent = 'Upload to Archive';
                    alert('In production, "' + eventName + '" images would be uploaded to the archive and visible on the Archive page.');
                }, 1000);
            }, 1500);
        });
    }
}
