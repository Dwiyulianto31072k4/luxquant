// =====================================================
// LUXQUANT - MAIN JAVASCRIPT
// Version: 6.1 - With Mobile Menu Support
// =====================================================

console.log('🚀 LuxQuant Main.js Loading...');

// =====================================================
// CONFIGURATION
// =====================================================
const CONFIG = {
    api: {
        coingecko: {
            baseUrl: 'https://api.coingecko.com/api/v3',
            timeout: 10000
        },
        coinlore: {
            baseUrl: 'https://api.coinlore.net/api',
            timeout: 8000
        }
    },
    ticker: {
        updateInterval: 60000,
        animationDuration: '80s'
    },
    cryptoList: [
        { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', cmcId: 1 },
        { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', cmcId: 1027 },
        { id: 'binancecoin', symbol: 'BNB', name: 'BNB', cmcId: 1839 },
        { id: 'solana', symbol: 'SOL', name: 'Solana', cmcId: 5426 },
        { id: 'ripple', symbol: 'XRP', name: 'XRP', cmcId: 52 },
        { id: 'cardano', symbol: 'ADA', name: 'Cardano', cmcId: 2010 },
        { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin', cmcId: 74 },
        { id: 'chainlink', symbol: 'LINK', name: 'Chainlink', cmcId: 1975 }
    ]
};

// =====================================================
// STATE MANAGEMENT
// =====================================================
const state = {
    crypto: {
        data: null,
        lastUpdate: 0,
        isLoading: false
    },
    carousel: {
        currentSlide: 0,
        totalSlides: 5
    }
};

// =====================================================
// DOM READY
// =====================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM Ready - Initializing LuxQuant...');
    
    // Initialize all modules
    initLoader();
    initTicker();
    initHeader();
    initMobileMenu();  // NEW: Mobile menu initialization
    initCarousel();
    initSmoothScroll();
    
    console.log('✅ LuxQuant Initialized Successfully!');
});

// =====================================================
// LOADER MODULE
// =====================================================
function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1200);
    });
}

// =====================================================
// MOBILE MENU MODULE (NEW)
// =====================================================
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    if (!mobileMenuBtn || !mobileNav) {
        console.log('⚠️ Mobile menu elements not found');
        return;
    }
    
    // Toggle menu on button click
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking a link
    const mobileNavLinks = mobileNav.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    console.log('📱 Mobile menu initialized!');
}

// =====================================================
// TICKER MODULE - REAL-TIME CRYPTO PRICES
// =====================================================
function initTicker() {
    console.log('📊 Initializing Real-time Ticker...');
    
    fetchCryptoData();
    setInterval(fetchCryptoData, CONFIG.ticker.updateInterval);
}

async function fetchCryptoData() {
    if (state.crypto.isLoading) return;
    
    state.crypto.isLoading = true;
    console.log('📡 Fetching crypto prices...');
    
    try {
        let data = await fetchFromCoinGecko();
        
        if (!data) {
            console.log('⚠️ CoinGecko failed, trying Coinlore...');
            data = await fetchFromCoinlore();
        }
        
        if (data && data.length > 0) {
            state.crypto.data = data;
            state.crypto.lastUpdate = Date.now();
            renderTicker(data);
            console.log('✅ Ticker updated with live data!');
        } else {
            console.log('❌ All APIs failed, using fallback data');
            renderTicker(getFallbackData());
        }
    } catch (error) {
        console.error('💥 Error fetching crypto data:', error);
        renderTicker(getFallbackData());
    } finally {
        state.crypto.isLoading = false;
    }
}

async function fetchFromCoinGecko() {
    try {
        const ids = CONFIG.cryptoList.map(c => c.id).join(',');
        const url = `${CONFIG.api.coingecko.baseUrl}/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`;
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), CONFIG.api.coingecko.timeout);
        
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (!response.ok) throw new Error(`CoinGecko error: ${response.status}`);
        
        const data = await response.json();
        return formatCoinGeckoData(data);
    } catch (error) {
        console.error('CoinGecko fetch error:', error.message);
        return null;
    }
}

async function fetchFromCoinlore() {
    try {
        const url = `${CONFIG.api.coinlore.baseUrl}/tickers/?start=0&limit=20`;
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), CONFIG.api.coinlore.timeout);
        
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (!response.ok) throw new Error(`Coinlore error: ${response.status}`);
        
        const result = await response.json();
        return formatCoinloreData(result.data);
    } catch (error) {
        console.error('Coinlore fetch error:', error.message);
        return null;
    }
}

function formatCoinGeckoData(data) {
    return CONFIG.cryptoList
        .filter(crypto => data[crypto.id])
        .map(crypto => ({
            symbol: crypto.symbol,
            name: crypto.name,
            cmcId: crypto.cmcId,
            price: data[crypto.id].usd || 0,
            change: data[crypto.id].usd_24h_change || 0
        }));
}

function formatCoinloreData(data) {
    const symbolMap = {};
    CONFIG.cryptoList.forEach(c => {
        symbolMap[c.symbol] = c;
    });
    
    return data
        .filter(item => symbolMap[item.symbol])
        .slice(0, 8)
        .map(item => ({
            symbol: item.symbol,
            name: symbolMap[item.symbol].name,
            cmcId: symbolMap[item.symbol].cmcId,
            price: parseFloat(item.price_usd) || 0,
            change: parseFloat(item.percent_change_24h) || 0
        }));
}

function getFallbackData() {
    return [
        { symbol: 'BTC', name: 'Bitcoin', cmcId: 1, price: 104500, change: 2.15 },
        { symbol: 'ETH', name: 'Ethereum', cmcId: 1027, price: 3380, change: 3.42 },
        { symbol: 'BNB', name: 'BNB', cmcId: 1839, price: 695, change: -0.54 },
        { symbol: 'SOL', name: 'Solana', cmcId: 5426, price: 255, change: 5.21 },
        { symbol: 'XRP', name: 'XRP', cmcId: 52, price: 3.08, change: 1.87 },
        { symbol: 'ADA', name: 'Cardano', cmcId: 2010, price: 0.95, change: -1.23 },
        { symbol: 'DOGE', name: 'Dogecoin', cmcId: 74, price: 0.41, change: 2.98 },
        { symbol: 'LINK', name: 'Chainlink', cmcId: 1975, price: 28.20, change: 2.45 }
    ];
}

function renderTicker(data) {
    const tickerTrack = document.getElementById('tickerTrack');
    if (!tickerTrack) {
        console.error('❌ Ticker track element not found!');
        return;
    }
    
    const tickerHTML = data.map(crypto => {
        const changeClass = crypto.change >= 0 ? 'positive' : 'negative';
        const changePrefix = crypto.change >= 0 ? '+' : '';
        const formattedPrice = formatPrice(crypto.price);
        const iconUrl = `https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.cmcId}.png`;
        
        return `
            <div class="ticker-item">
                <img class="ticker-icon" src="${iconUrl}" alt="${crypto.symbol}" onerror="this.style.display='none'">
                <span class="ticker-symbol">${crypto.symbol}</span>
                <span class="ticker-price">$${formattedPrice}</span>
                <span class="ticker-change ${changeClass}">${changePrefix}${crypto.change.toFixed(2)}%</span>
            </div>
        `;
    }).join('');
    
    tickerTrack.innerHTML = tickerHTML + tickerHTML + tickerHTML;
}

function formatPrice(price) {
    if (price >= 1000) {
        return price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    } else if (price >= 1) {
        return price.toFixed(2);
    } else if (price >= 0.01) {
        return price.toFixed(3);
    } else {
        return price.toFixed(6);
    }
}

// =====================================================
// HEADER MODULE
// =====================================================
function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;
    
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, 100));
}

// =====================================================
// CAROUSEL MODULE
// =====================================================
function initCarousel() {
    const container = document.getElementById('carouselContainer');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!container) return;
    
    function updateCarousel() {
        container.style.transform = `translateX(-${state.carousel.currentSlide * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === state.carousel.currentSlide);
        });
    }
    
    function nextSlide() {
        state.carousel.currentSlide = (state.carousel.currentSlide + 1) % state.carousel.totalSlides;
        updateCarousel();
    }
    
    function prevSlide() {
        state.carousel.currentSlide = (state.carousel.currentSlide - 1 + state.carousel.totalSlides) % state.carousel.totalSlides;
        updateCarousel();
    }
    
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            state.carousel.currentSlide = i;
            updateCarousel();
        });
    });
    
    setInterval(nextSlide, 5000);
}

// =====================================================
// SMOOTH SCROLL MODULE
// =====================================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =====================================================
// UTILITY FUNCTIONS
// =====================================================
function throttle(func, wait) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, wait);
        }
    };
}

function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// =====================================================
// EXPORTS
// =====================================================
window.LuxQuant = {
    state,
    CONFIG,
    fetchCryptoData,
    renderTicker
};

console.log('✅ LuxQuant Main.js Loaded!');
