// =====================================================
// LUXQUANT VIP - ADVANCED JAVASCRIPT
// Version: 3.0
// =====================================================

// Global Variables
let chartInstance = null;
let currentTestimonial = 0;
let priceUpdateInterval = null;
let particlesArray = [];

// DOM Elements Cache
const elements = {
    loader: document.getElementById('loader'),
    header: document.getElementById('header'),
    navLinks: document.getElementById('navLinks'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    backToTop: document.getElementById('backToTop'),
    cookieConsent: document.getElementById('cookieConsent'),
    notificationContainer: document.getElementById('notificationContainer'),
    testimonialTrack: document.getElementById('testimonialTrack'),
    performanceChart: document.getElementById('performanceChart'),
    refreshChart: document.getElementById('refreshChart'),
    fullscreenChart: document.getElementById('fullscreenChart')
};

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing LuxQuant VIP...');
    
    // Initialize core features first
    initLoader();
    
    // Initialize other features after a delay to ensure DOM is ready
    setTimeout(() => {
        initNavigation();
        initScrollEffects();
        initMouseEffects();
        initParticles();
        initPriceTicker();
        initPerformanceChart();
        initSocialMediaEffects();
        initTestimonials();
        initCookieConsent();
        initNotifications();
        initBackToTop();
        initAnimations();
        initChartControls();
        initLiveStats();
        initPremiumEffects();
    }, 100);
});

// Loading Screen with Progress
function initLoader() {
    const progressBar = document.getElementById('loaderProgressBar');
    const percentage = document.getElementById('loaderPercentage');
    let progress = 0;
    
    // Check if elements exist
    if (!progressBar || !percentage) {
        console.error('Loader elements not found');
        // Hide loader anyway after delay
        setTimeout(() => {
            if (elements.loader) {
                elements.loader.classList.add('hidden');
                document.body.classList.remove('loading');
                document.body.style.overflow = 'auto';
            }
        }, 1000);
        return;
    }
    
    const updateProgress = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = `${progress}%`;
        percentage.textContent = `${Math.round(progress)}%`;
        
        if (progress === 100) {
            clearInterval(updateProgress);
            setTimeout(() => {
                elements.loader.classList.add('hidden');
                document.body.classList.remove('loading');
                document.body.style.overflow = 'auto';
                // Only show notification if container exists
                if (elements.notificationContainer) {
                    showNotification('Welcome to LuxQuant VIP', 'Experience premium crypto trading signals', 'success');
                }
            }, 500);
        }
    }, 100);
}

// Navigation System
function initNavigation() {
    console.log('Initializing navigation...');
    
    // Check if elements exist
    if (!elements.mobileMenuBtn || !elements.navLinks) {
        console.error('Navigation elements not found');
        return;
    }
    
    // Mobile Menu Toggle
    elements.mobileMenuBtn.addEventListener('click', () => {
        elements.navLinks.classList.toggle('active');
        elements.mobileMenuBtn.classList.toggle('active');
    });
    
    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            elements.navLinks.classList.remove('active');
            elements.mobileMenuBtn.classList.remove('active');
        });
    });
    
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a[data-nav]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-nav') === current) {
                item.classList.add('active');
            }
        });
    });
}

// Scroll Effects
function initScrollEffects() {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Header scroll effect
        if (currentScroll > 100) {
            elements.header.classList.add('scrolled');
        } else {
            elements.header.classList.remove('scrolled');
        }
        
        // Parallax effects
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            const yPos = -(currentScroll * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        lastScroll = currentScroll;
    });
}

// Mouse Effects
function initMouseEffects() {
    const mouseFollower = document.querySelector('.mouse-follower');
    const mouseDot = document.querySelector('.mouse-dot');
    
    if (!mouseFollower || !mouseDot) {
        console.log('Mouse effects elements not found - skipping');
        return;
    }
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    let dotX = 0, dotY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    const animateFollower = () => {
        followerX += (mouseX - followerX - 20) * 0.1;
        followerY += (mouseY - followerY - 20) * 0.1;
        
        dotX += (mouseX - dotX - 4) * 0.15;
        dotY += (mouseY - dotY - 4) * 0.15;
        
        mouseFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
        mouseDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
        
        requestAnimationFrame(animateFollower);
    };
    
    animateFollower();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .stat-card, .feature-card');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            mouseFollower.style.transform += ' scale(1.5)';
            mouseDot.style.transform += ' scale(1.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            mouseFollower.style.transform = mouseFollower.style.transform.replace(' scale(1.5)', '');
            mouseDot.style.transform = mouseDot.style.transform.replace(' scale(1.5)', '');
        });
    });
}

// Particle System
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < 100; i++) {
        particlesArray.push(new Particle());
    }
    
    // Animate particles
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particlesArray.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particlesArray.forEach((a, i) => {
            particlesArray.slice(i + 1).forEach(b => {
                const distance = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
                if (distance < 100) {
                    ctx.strokeStyle = `rgba(255, 215, 0, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Price Ticker System
function initPriceTicker() {
    console.log('🚀 Initializing LuxQuant Price Ticker...');
    
    // Crypto list
    const cryptoList = [
        'bitcoin',
        'ethereum', 
        'binancecoin',
        'solana',
        'cardano',
        'ripple',
        'polkadot',
        'avalanche-2',
        'polygon',
        'chainlink'
    ];
    
    const tickerContent = document.querySelector('.ticker-content');
    if (!tickerContent) {
        console.error('❌ Ticker content not found');
        return;
    }
    
    // Ensure ticker wrapper is visible
    const tickerWrapper = document.querySelector('.price-ticker-wrapper');
    if (tickerWrapper) {
        tickerWrapper.style.display = 'flex';
        tickerWrapper.classList.remove('hidden');
    }
    
    // Clear existing content
    tickerContent.innerHTML = '';
    
    // Create loading state first
    createLoadingTicker(tickerContent, cryptoList);
    
    // Initialize seamless scrolling immediately
    initSeamlessScroll();
    
    // Fetch prices with fallback
    fetchCryptoPrices(cryptoList);
    
    // Set up regular updates (every 60 seconds)
    if (window.priceUpdateInterval) {
        clearInterval(window.priceUpdateInterval);
    }
    
    window.priceUpdateInterval = setInterval(() => {
        fetchCryptoPrices(cryptoList);
    }, 60000);
}

// Create loading ticker
function createLoadingTicker(container, cryptoList) {
    const cryptoSymbols = {
        'bitcoin': 'BTC',
        'ethereum': 'ETH',
        'binancecoin': 'BNB',
        'solana': 'SOL',
        'cardano': 'ADA',
        'ripple': 'XRP',
        'polkadot': 'DOT',
        'avalanche-2': 'AVAX',
        'polygon': 'MATIC',
        'chainlink': 'LINK'
    };
    
    // Create triple content for seamless scrolling
    for (let loop = 0; loop < 3; loop++) {
        cryptoList.forEach(cryptoId => {
            const symbol = cryptoSymbols[cryptoId] || cryptoId.toUpperCase();
            const item = document.createElement('span');
            item.className = 'ticker-item';
            item.setAttribute('data-crypto', cryptoId);
            item.innerHTML = `
                <span class="ticker-symbol">${symbol}</span>
                <span class="ticker-price">Loading...</span>
                <span class="ticker-change loading">--</span>
            `;
            container.appendChild(item);
        });
    }
}

// Fetch crypto prices
async function fetchCryptoPrices(cryptoList) {
    try {
        // Use mock data for demo
        const mockPrices = {
            'bitcoin': { price: 67420, change: 2.45 },
            'ethereum': { price: 3840, change: 1.23 },
            'binancecoin': { price: 582, change: -0.87 },
            'solana': { price: 198, change: 4.56 },
            'cardano': { price: 0.624, change: -1.34 },
            'ripple': { price: 0.532, change: 0.92 },
            'polkadot': { price: 7.89, change: 2.17 },
            'avalanche-2': { price: 36.7, change: -2.45 },
            'polygon': { price: 0.934, change: 1.67 },
            'chainlink': { price: 16.43, change: 3.21 }
        };
        
        // Update with mock data
        cryptoList.forEach(cryptoId => {
            if (mockPrices[cryptoId]) {
                const basePrice = mockPrices[cryptoId].price;
                const baseChange = mockPrices[cryptoId].change;
                
                // Add some randomness
                const priceVariation = (Math.random() - 0.5) * 0.02;
                const changeVariation = (Math.random() - 0.5) * 2;
                
                updateAllTickerItems(cryptoId, {
                    price: basePrice * (1 + priceVariation),
                    change: baseChange + changeVariation
                });
            }
        });
        
    } catch (error) {
        console.error('Error fetching prices:', error);
    }
}

// Update all ticker items
function updateAllTickerItems(cryptoId, priceData) {
    const tickerItems = document.querySelectorAll(`.ticker-item[data-crypto="${cryptoId}"]`);
    
    tickerItems.forEach(item => {
        const priceElement = item.querySelector('.ticker-price');
        const changeElement = item.querySelector('.ticker-change');
        
        if (priceElement && changeElement) {
            // Format and display price
            const formattedPrice = formatPrice(priceData.price);
            priceElement.textContent = `$${formattedPrice}`;
            
            // Format and display change
            const change = priceData.change;
            const isPositive = change >= 0;
            const formattedChange = `${isPositive ? '+' : ''}${change.toFixed(2)}%`;
            
            changeElement.textContent = formattedChange;
            changeElement.className = `ticker-change ${isPositive ? 'positive' : 'negative'}`;
            
            // Add update animation
            item.classList.add('price-updated');
            setTimeout(() => item.classList.remove('price-updated'), 1000);
            
            // Significant change animation
            if (Math.abs(change) >= 5) {
                item.classList.add('significant-change');
                setTimeout(() => item.classList.remove('significant-change'), 2000);
            }
        }
    });
}

// Format price
function formatPrice(price) {
    if (price >= 1000) {
        return price.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
    } else if (price >= 10) {
        return price.toFixed(2);
    } else if (price >= 1) {
        return price.toFixed(3);
    } else if (price >= 0.01) {
        return price.toFixed(4);
    } else {
        return price.toFixed(6);
    }
}

// Initialize seamless scroll
function initSeamlessScroll() {
    const ticker = document.querySelector('.price-ticker');
    if (!ticker) return;
    
    // Calculate and apply smooth scrolling
    const applyScroll = () => {
        const contentWidth = ticker.scrollWidth / 3;
        const duration = contentWidth / 25; // 25px per second
        
        ticker.style.animation = `seamlessTickerScroll ${duration}s linear infinite`;
    };
    
    // Apply scroll after a short delay
    setTimeout(applyScroll, 500);
    
    // Recalculate on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(applyScroll, 300);
    });
}

// Performance Chart
function initPerformanceChart() {
    const ctx = elements.performanceChart?.getContext('2d');
    if (!ctx) return;
    
    // Chart data for last 30 days
    const chartData = {
        labels: generateDateLabels(30),
        datasets: [{
            label: 'Win Rate %',
            data: generateWinRateData(30),
            borderColor: '#FFD700',
            backgroundColor: 'rgba(255, 215, 0, 0.1)',
            borderWidth: 3,
            pointRadius: 0,
            pointHoverRadius: 8,
            pointBackgroundColor: '#FFD700',
            pointBorderColor: '#000',
            pointBorderWidth: 2,
            tension: 0.4,
            fill: true
        }]
    };
    
    // Chart configuration
    const config = {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    titleColor: '#FFD700',
                    bodyColor: '#fff',
                    borderColor: '#FFD700',
                    borderWidth: 1,
                    cornerRadius: 8,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        title: function(context) {
                            return `Date: ${context[0].label}`;
                        },
                        label: function(context) {
                            return `Win Rate: ${context.parsed.y.toFixed(1)}%`;
                        },
                        afterLabel: function(context) {
                            const signals = Math.floor(Math.random() * 100) + 20;
                            const tp = Math.floor(signals * context.parsed.y / 100);
                            const sl = signals - tp;
                            return [
                                `Signals: ${signals}`,
                                `TP: ${tp} | SL: ${sl}`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#b0b0b0',
                        font: {
                            size: 11
                        },
                        maxRotation: 45,
                        minRotation: 45,
                        callback: function(value, index) {
                            return index % 5 === 0 ? this.getLabelForValue(value) : '';
                        }
                    }
                },
                y: {
                    display: true,
                    min: 50,
                    max: 100,
                    grid: {
                        color: 'rgba(255, 215, 0, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#b0b0b0',
                        font: {
                            size: 12
                        },
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    };
    
    chartInstance = new Chart(ctx, config);
    
    // Animate chart stats
    animateChartStats();
}

function generateDateLabels(days) {
    const labels = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    
    return labels;
}

function generateWinRateData(days) {
    const data = [];
    let previousValue = 85;
    
    for (let i = 0; i < days; i++) {
        // Generate realistic win rate fluctuations
        const change = (Math.random() - 0.5) * 10;
        previousValue = Math.max(70, Math.min(98, previousValue + change));
        data.push(previousValue);
    }
    
    return data;
}

function animateChartStats() {
    const stats = {
        totalSignals: 1822,
        successful: 1524,
        stopLoss: 257,
        winRate: 85.6
    };
    
    animateNumber('chartTotalSignals', 0, stats.totalSignals, 2000);
    animateNumber('chartSuccessful', 0, stats.successful, 2000);
    animateNumber('chartStopLoss', 0, stats.stopLoss, 2000);
    animateNumber('chartWinRate', 0, stats.winRate, 2000, true);
}

// Chart Controls
function initChartControls() {
    // Period selection
    document.querySelectorAll('.chart-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelector('.chart-tab.active').classList.remove('active');
            this.classList.add('active');
            
            const period = this.getAttribute('data-period');
            updateChartPeriod(period);
            
            // Update period text
            const periodText = document.getElementById('chartPeriodText');
            if (periodText) {
                if (period === '30d') {
                    periodText.textContent = 'Last 30 Days';
                } else if (period === '7d') {
                    periodText.textContent = 'Last 7 Days';
                } else if (period === '24h') {
                    periodText.textContent = 'Last 24 Hours';
                }
            }
        });
    });
    
    // Refresh button
    elements.refreshChart?.addEventListener('click', () => {
        const icon = elements.refreshChart.querySelector('svg');
        icon.style.animation = 'spin 0.5s ease-in-out';
        
        setTimeout(() => {
            icon.style.animation = '';
            refreshChartData();
            showNotification('Chart Updated', 'Latest data loaded successfully', 'success');
        }, 500);
    });
    
    // Fullscreen button
    elements.fullscreenChart?.addEventListener('click', () => {
        const chartWrapper = document.querySelector('.performance-chart-wrapper');
        
        if (!document.fullscreenElement) {
            chartWrapper.requestFullscreen().catch(err => {
                console.error('Error attempting to enable fullscreen:', err);
            });
        } else {
            document.exitFullscreen();
        }
    });
}

function updateChartPeriod(period) {
    const days = period === '30d' ? 30 : period === '7d' ? 7 : 1;
    
    if (chartInstance) {
        chartInstance.data.labels = generateDateLabels(days);
        chartInstance.data.datasets[0].data = generateWinRateData(days);
        chartInstance.update('active');
    }
}

function refreshChartData() {
    if (chartInstance) {
        chartInstance.data.datasets[0].data = generateWinRateData(chartInstance.data.labels.length);
        chartInstance.update('active');
    }
}

// Social Media Hover Effects
function initSocialMediaEffects() {
    const socialCards = document.querySelectorAll('.social-card');
    
    socialCards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--mouse-x', `${x}px`);
            this.style.setProperty('--mouse-y', `${y}px`);
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--mouse-x', `${x}px`);
            this.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// Testimonials Slider
function initTestimonials() {
    const track = elements.testimonialTrack;
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    
    if (!track) return;
    
    const testimonials = track.querySelectorAll('.testimonial-card');
    const totalTestimonials = testimonials.length;
    
    // Clone testimonials for infinite loop
    testimonials.forEach(testimonial => {
        const clone = testimonial.cloneNode(true);
        track.appendChild(clone);
    });
    
    function updateTestimonial() {
        const offset = currentTestimonial * 100;
        track.style.transform = `translateX(-${offset}%)`;
        
        // Reset to beginning when reaching cloned testimonials
        if (currentTestimonial >= totalTestimonials) {
            setTimeout(() => {
                track.style.transition = 'none';
                currentTestimonial = 0;
                track.style.transform = `translateX(0%)`;
                setTimeout(() => {
                    track.style.transition = 'transform var(--transition-slow)';
                }, 50);
            }, 600);
        }
    }
    
    prevBtn?.addEventListener('click', () => {
        if (currentTestimonial <= 0) {
            track.style.transition = 'none';
            currentTestimonial = totalTestimonials;
            track.style.transform = `translateX(-${currentTestimonial * 100}%)`;
            setTimeout(() => {
                track.style.transition = 'transform var(--transition-slow)';
                currentTestimonial--;
                updateTestimonial();
            }, 50);
        } else {
            currentTestimonial--;
            updateTestimonial();
        }
    });
    
    nextBtn?.addEventListener('click', () => {
        currentTestimonial++;
        updateTestimonial();
    });
    
    // Auto-advance
    setInterval(() => {
        currentTestimonial++;
        updateTestimonial();
    }, 5000);
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left
            currentTestimonial++;
            updateTestimonial();
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe right
            if (currentTestimonial > 0) {
                currentTestimonial--;
                updateTestimonial();
            }
        }
    }
}

// Live Stats Updates
function initLiveStats() {
    // Simulate live updates
    setInterval(() => {
        // Update win rate
        const winRate = (85 + Math.random() * 10).toFixed(1);
        const winRateElement = document.getElementById('liveWinRate');
        if (winRateElement) {
            winRateElement.textContent = `${winRate}%`;
            winRateElement.classList.add('pulse');
            setTimeout(() => winRateElement.classList.remove('pulse'), 1000);
        }
        
        // Update total signals
        const signalsElement = document.getElementById('liveTotalSignals');
        if (signalsElement) {
            const currentSignals = parseInt(signalsElement.textContent.replace(',', ''));
            const newSignals = currentSignals + Math.floor(Math.random() * 5);
            signalsElement.textContent = newSignals.toLocaleString();
        }
        
        // Update active users
        const usersElement = document.getElementById('liveActiveUsers');
        if (usersElement) {
            const baseUsers = 2847;
            const variation = Math.floor(Math.random() * 200 - 100);
            usersElement.textContent = (baseUsers + variation).toLocaleString();
        }
    }, 10000);
    
    // Win rate sparkline
    initSparkline();
}

function initSparkline() {
    const canvas = document.getElementById('winrateSparkline');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = 150;
    canvas.height = 40;
    
    const data = Array.from({ length: 20 }, () => 80 + Math.random() * 15);
    
    function drawSparkline() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const step = canvas.width / (data.length - 1);
        const scale = canvas.height / 20; // 20% range
        
        ctx.beginPath();
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 2;
        
        data.forEach((value, i) => {
            const x = i * step;
            const y = canvas.height - ((value - 80) * scale);
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Add gradient fill
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, 'rgba(255, 215, 0, 0.3)');
        gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
    }
    
    drawSparkline();
    
    // Update sparkline periodically
    setInterval(() => {
        data.shift();
        data.push(80 + Math.random() * 15);
        drawSparkline();
    }, 2000);
}

// Cookie Consent
function initCookieConsent() {
    const consent = elements.cookieConsent;
    if (!consent) return;
    
    // Check if user has already consented
    if (!localStorage.getItem('cookieConsent')) {
        setTimeout(() => {
            consent.classList.add('show');
        }, 2000);
    }
    
    document.getElementById('acceptCookies')?.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        consent.classList.remove('show');
        showNotification('Cookies Accepted', 'Thank you for accepting our cookie policy', 'success');
    });
    
    document.getElementById('declineCookies')?.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        consent.classList.remove('show');
    });
}

// Notification System
function initNotifications() {
    // Show welcome notification is handled in loader
}

function showNotification(title, message, type = 'info') {
    const container = elements.notificationContainer;
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <div class="notification-text">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    container.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
}

function getNotificationIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    return icons[type] || icons.info;
}

// Back to Top
function initBackToTop() {
    const backToTop = elements.backToTop;
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Animations
function initAnimations() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out',
            once: true,
            offset: 100
        });
    }
    
    // Initialize GSAP animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero animations
        gsap.from('.hero-title', {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.5
        });
        
        gsap.from('.hero-subtitle', {
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.7
        });
        
        // Parallax scrolling
        gsap.to('.hero-glow', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            },
            y: 200,
            opacity: 0.3
        });
        
        // Feature cards stagger animation
        gsap.from('.feature-card', {
            scrollTrigger: {
                trigger: '.features-grid',
                start: 'top 80%'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1
        });
        
        // Stats counter animation
        gsap.from('.stat-card', {
            scrollTrigger: {
                trigger: '.live-stats',
                start: 'top 80%'
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2
        });
    }
}

// Premium Visual Effects
function initPremiumEffects() {
    // Animate stats on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && !statNumber.classList.contains('animated')) {
                    statNumber,classList.add('animated');
                    animateValue(statNumber);
                }
            }
        });
    }, observerOptions);
    
    // Observe all stat cards
    document.querySelectorAll('.stat-card').forEach(card => {
        statsObserver.observe(card);
    });
    
    // Floating elements parallax
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        document.querySelectorAll('.floating-chart').forEach((chart, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            chart.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        document.querySelectorAll('.orb').forEach((orb, index) => {
            const speed = (index + 1) * 10;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            orb.style.transform = orb.style.transform.replace(/translate\([^)]*\)/, `translate(${x}px, ${y}px)`);
        });
    });
    
    // Premium glow effect on hover
    document.querySelectorAll('.btn-primary, .pricing-card, .social-card').forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.setProperty('--glow-intensity', '1');
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.setProperty('--glow-intensity', '0');
        });
    });
    
    // Ripple effect on buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation to CSS
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Animate value with easing
function animateValue(element) {
    const endValue = element.textContent;
    const isPercentage = endValue.includes('%');
    const isNumber = endValue.includes(',');
    
    let targetValue = parseFloat(endValue.replace(/[^0-9.-]+/g, ''));
    let startValue = 0;
    let duration = 2000;
    
    if (isPercentage) {
        startValue = targetValue - 20;
    } else if (isNumber) {
        startValue = targetValue - 500;
    }
    
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutQuart(progress);
        const current = startValue + (targetValue - startValue) * eased;
        
        if (isPercentage) {
            element.textContent = current.toFixed(1) + '%';
        } else if (isNumber) {
            element.textContent = Math.round(current).toLocaleString();
        } else {
            element.textContent = Math.round(current);
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Utility Functions
function animateNumber(elementId, start, end, duration, isPercentage = false) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const startTime = performance.now();
    const range = end - start;
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = start + range * easeOutQuart(progress);
        
        if (isPercentage) {
            element.textContent = current.toFixed(1) + '%';
        } else {
            element.textContent = Math.round(current).toLocaleString();
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form validation (if needed in future)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Performance optimization
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Optimize scroll events
const optimizedScroll = debounce(() => {
    // Scroll-related operations
    const scrolled = window.pageYOffset;
    const viewportHeight = window.innerHeight;
    
    // Update progress indicator if exists
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        const docHeight = document.documentElement.scrollHeight - viewportHeight;
        const progress = (scrolled / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
    }
}, 100);

window.addEventListener('scroll', optimizedScroll);

// Intersection Observer for lazy loading
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: '50px'
});

// Observe all images with data-src
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Advanced hover effects
document.querySelectorAll('.btn, .feature-card, .pricing-card').forEach(element => {
    element.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.style.setProperty('--mouse-x', `${x}px`);
        this.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        elements.navLinks?.classList.remove('active');
        elements.mobileMenuBtn?.classList.remove('active');
    }
    
    // Arrow keys for testimonial navigation
    if (e.key === 'ArrowLeft') {
        document.getElementById('testimonialPrev')?.click();
    } else if (e.key === 'ArrowRight') {
        document.getElementById('testimonialNext')?.click();
    }
});

// Performance monitoring
const performanceData = {
    loadTime: 0,
    firstPaint: 0,
    firstContentfulPaint: 0
};

window.addEventListener('load', () => {
    // Measure performance
    if (window.performance) {
        const perfData = window.performance.timing;
        performanceData.loadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        // Get paint timings
        const paintMetrics = performance.getEntriesByType('paint');
        paintMetrics.forEach(metric => {
            if (metric.name === 'first-paint') {
                performanceData.firstPaint = metric.startTime;
            } else if (metric.name === 'first-contentful-paint') {
                performanceData.firstContentfulPaint = metric.startTime;
            }
        });
        
        console.log('Performance Metrics:', performanceData);
    }
});

// Dynamic theme based on time
function updateThemeBasedOnTime() {
    const hour = new Date().getHours();
    const isDayTime = hour >= 6 && hour < 18;
    
    if (isDayTime) {
        document.documentElement.style.setProperty('--bg-dark', '#0A0A0A');
    } else {
        document.documentElement.style.setProperty('--bg-dark', '#050505');
    }
}

updateThemeBasedOnTime();
setInterval(updateThemeBasedOnTime, 60000); // Check every minute

// Prevent right-click on images
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
    }
});

// Service Worker Registration (for PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful');
        }).catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// Network status detection
window.addEventListener('online', () => {
    showNotification('Connection Restored', 'You are back online', 'success');
});

window.addEventListener('offline', () => {
    showNotification('Connection Lost', 'Please check your internet connection', 'error');
});

// Clipboard functionality
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Copied!', 'Text copied to clipboard', 'success');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Copied!', 'Text copied to clipboard', 'success');
    }
}

// Add copy functionality to elements with data-copy attribute
document.querySelectorAll('[data-copy]').forEach(element => {
    element.addEventListener('click', () => {
        const textToCopy = element.getAttribute('data-copy');
        copyToClipboard(textToCopy);
    });
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (priceUpdateInterval) clearInterval(priceUpdateInterval);
    // Save any necessary data
    sessionStorage.setItem('lastVisit', new Date().toISOString());
});

// Console branding
console.log('%cLuxQuant VIP', 'color: #FFD700; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);');
console.log('%cPremium Crypto Trading Signals', 'color: #FFA500; font-size: 16px;');
console.log('%c🚀 Join the elite traders today!', 'color: #00FF88; font-size: 14px;');
console.log('%c⚠️ This is a browser feature intended for developers. Do not paste any code here!', 'color: #FF3366; font-size: 12px; font-weight: bold;');

// Initialize everything
console.log('LuxQuant VIP - All systems operational ✅');
