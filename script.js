// Live news integration for SmartFarm AI
const NEWS_API_URL = window.location.protocol === 'file:'
    ? 'https://inshorts.deta.dev/news?category=all'
    : '/api/news';
const NEWS_KEYWORDS = [
    'farm', 'farmer', 'agriculture', 'crop', 'soil', 'subsidy', 'market', 'price', 'weather', 'irrigation', 'pesticide', 'harvest', 'scheme', 'govt', 'policy', 'flood', 'cyclone', 'drought', 'disaster', 'rescue', 'relief', 'heatwave', 'landslide'
];

const DISASTER_MANAGEMENT_ADVISORY = {
    title: 'Disaster Management Advisory for Farmers',
    content: 'Before storms, floods, or heatwaves, move livestock to safe shelter, protect farm equipment, keep emergency contacts ready, and follow official local advisories.',
    source: 'Disaster Management',
    time: 'Safety Advisory',
    icon: '🛟'
};

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

            const liveItems = filtered.length ? filtered.slice(0, 5) : items.slice(0, 5);
            renderLiveNews([...liveItems, DISASTER_MANAGEMENT_ADVISORY]);
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
        const icon = article.icon || '📰';

        return `
            <div class="news-card">
            <div class="news-icon">${icon}</div>
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
    translateLegacyText();
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
        <div class="news-card disaster-news-card">
            <div class="news-icon">${DISASTER_MANAGEMENT_ADVISORY.icon}</div>
            <h3>${DISASTER_MANAGEMENT_ADVISORY.title}</h3>
            <p>${DISASTER_MANAGEMENT_ADVISORY.content}</p>
            <div class="news-meta">
                <span>${DISASTER_MANAGEMENT_ADVISORY.source}</span>
                <span>${DISASTER_MANAGEMENT_ADVISORY.time}</span>
            </div>
        </div>
    `;
    translateLegacyText();
}

// ===== LANGUAGE TRANSLATION SYSTEM =====
const translations = {
    en: {
        // Navigation
        'nav-home': 'Home',
        'nav-features': 'Features',
        'nav-demo': 'Demo',
        'nav-schemes': 'Schemes',
        
        // Hero Section
        'hero-title': 'Smart Farming, Smart Earnings 🌾',
        'hero-subtitle': 'From Soil to Sale – Powered by AR SmartFarm',
        'hero-desc': 'Complete guidance from Sowing → Growing → Harvesting → Selling',
        'hero-btn': 'Start Demo',
        
        // Features
        'features-title': 'Our Smart Modules 🔹',
        'feature-crop': 'Smart Crop Recommendation',
        'feature-crop-desc': 'ML model analyzes soil, weather & location to suggest the best crop',
        'feature-irrigation': 'Smart Irrigation System',
        'feature-irrigation-desc': 'IoT sensors optimize water usage based on soil moisture & temperature',
        'feature-weather': 'Weather Prediction & Alerts',
        'feature-weather-desc': 'Real-time alerts for rain, heatwaves, and frost conditions',
        'feature-disease': 'Disease & Pest Detection',
        'feature-disease-desc': 'AI-powered Computer Vision detects diseases and pest attacks',
        'feature-yield': 'Yield Prediction',
        'feature-yield-desc': 'Forecasts expected crop output for better planning',
        'feature-price': 'Market Price Prediction',
        'feature-price-desc': 'Shows current mandi prices and future trends for smart selling',
        'feature-subsidy': 'Subsidy & Scheme Finder',
        'feature-subsidy-desc': 'Discover government subsidies, eligibility criteria, and application guides for farmers.',
        'feature-news': 'Farmer News & Alerts',
        'feature-news-desc': 'Get the latest agriculture news, policy updates, weather alerts, and market subsidy announcements.',
        
        // Demo Section
        'demo-title': '🔹 Interactive Demo',
        'demo-crop': '📱 1. Smart Crop Recommendation',
        'demo-irrigation': '💧 2. Smart Irrigation Advisor',
        'demo-weather': '🌦️ 3. Weather Prediction & Alerts',
        'demo-disease': '🐛 4. Disease & Pest Detection',
        'demo-yield': '📊 5. Yield Prediction',
        'demo-price': '💰 6. Smart Market Price Prediction',
        
        // Schemes
        'schemes-title': '🚜 Government Schemes & Benefits',
        'scheme-pm-kisan': 'PM-KISAN Samman Nidhi',
        'scheme-pm-kisan-desc': 'Direct income support of ₹6,000/year to all farmers',
        'scheme-fasal': 'Pradhan Mantri Fasal Bima Yojana',
        'scheme-fasal-desc': 'Crop insurance coverage against natural calamities',
        'scheme-soil': 'Soil Health Card Scheme',
        'scheme-soil-desc': 'Free soil testing to improve fertility and productivity',
        'scheme-enam': 'e-NAM - National Agriculture Market',
        'scheme-enam-desc': 'Direct online marketing platform for farmers',
        'learn-more': 'Learn More',
        
        // News
        'news-title': 'Latest Farmer Subsidies & News',
        'refresh-news': 'Refresh Live News',
        
        // Stats
        'stats-farmers': 'Active Farmers',
        'stats-yield': 'Yield Increase',
        'stats-water': 'Water Saved',
        'stats-income': 'Avg Income Rise',
        
        // How It Works
        'works-title': 'How SmartFarm AI Works 🔄',
        'works-data': 'Data Collection',
        'works-data-desc': 'IoT sensors collect real-time soil, weather & crop data',
        'works-analysis': 'AI Analysis',
        'works-analysis-desc': 'Machine learning models analyze patterns & trends',
        'works-recommendations': 'Smart Recommendations',
        'works-recommendations-desc': 'Personalized advice for better farming decisions',
        'works-results': 'Better Results',
        'works-results-desc': 'Increased yield, reduced costs, higher profits',
        
        // Benefits
        'benefits-title': 'Benefits for Farmers 💚',
        'benefit-yield': 'Increased Yield',
        'benefit-yield-desc': 'Optimize farming practices to get 20-30% more output',
        'benefit-profit': 'Higher Profit',
        'benefit-profit-desc': 'Reduce costs & improve prices with smart selling',
        'benefit-water': 'Water Efficiency',
        'benefit-water-desc': 'Precision irrigation saves up to 40% water',
        'benefit-eco': 'Eco-Friendly',
        'benefit-eco-desc': 'Sustainable farming reduces environmental impact',
        'benefit-easy': 'Easy to Use',
        'benefit-easy-desc': 'Simple app interface works on basic smartphones',
        'benefit-protection': 'Risk Protection',
        'benefit-protection-desc': 'Weather alerts & disease detection prevent losses',
        
        // Testimonials
        'testimonials-title': 'Farmer Success Stories 🌟',
        
        // FAQ
        'faq-title': 'Frequently Asked Questions ❓',
        'faq-free': '❓ Is this app free to use?',
        'faq-free-ans': 'Yes! SmartFarm AI is completely free for farmers. Government supported initiative.',
        'faq-offline': '❓ Does it work offline?',
        'faq-offline-ans': 'Yes, the app works in low connectivity areas. Syncs when internet is available.',
        'faq-equipment': '❓ Do I need special equipment?',
        'faq-equipment-ans': 'Optional IoT sensors enhance accuracy, but app works with manual data entry too.',
        'faq-security': '❓ Is my data secure?',
        'faq-security-ans': '100% secure. Data encrypted & only used for your farming decisions.',
        'faq-languages': '❓ In which languages is it available?',
        'faq-languages-ans': 'Hindi, Punjabi, Gujarati, Tamil, Telugu, Kannada & English.',
        'faq-started': '❓ How do I get started?',
        'faq-started-ans': 'Download the app, create account, enter your location & farm details. Done!',
        
        // CTA
        'cta-title': 'Ready to Transform Your Farming?',
        'cta-desc': 'Join thousands of farmers already benefiting from AI-powered decisions',
        'cta-download': 'Download App Now',
        'cta-video': 'Watch Demo Video',
        
        // Comparison
        'comparison-title': 'Features Comparison 🎯',
        'feature-subsidy': '💰 Subsidy & Schemes',
        'feature-crop-rec': '🌾 Crop Recommendation',
        'feature-smart-irr': '💧 Smart Irrigation',
        'feature-disease-det': '🐛 Disease Detection',
        'feature-yield-pred': '📊 Yield Prediction',
        'feature-price-forecast': '💹 Market Price Forecast',
        'feature-weather-pred': '🌦️ Weather Prediction',
        'feature-offline': '📱 Offline Mode',
        'feature-security': '🔒 Data Security',
        'feature-cost': '💵 Cost',
        
        // Efficiency
        'efficiency-title': 'Why SmartFarm AI is Lightweight? ⚡',
        'efficiency-code': 'Optimized Code',
        'efficiency-code-desc': 'Clean, efficient code without unnecessary bloat. Only essential features are included.',
        'efficiency-assets': 'Compressed Assets',
        'efficiency-assets-desc': 'Images and media are optimized for low-bandwidth areas. Smart caching system.',
        'efficiency-loading': 'Smart Loading',
        'efficiency-loading-desc': 'Features load progressively. Offline functionality doesn\'t require full download.',
        'efficiency-tracking': 'Minimal Tracking',
        'efficiency-tracking-desc': 'No unnecessary analytics or ads. Privacy-focused design reduces data usage.',
        
        // Footer
        'footer-company': 'SmartFarm AI',
        'footer-desc': 'Empowering farmers with AI-driven decisions',
        'footer-quick': 'Quick Links',
        'footer-support': 'Support',
        'footer-schemes': 'Government Schemes',
        'footer-help': 'Help Center',
        'footer-contact': 'Contact Us',
        'footer-privacy': 'Privacy Policy',
        'footer-terms': 'Terms & Conditions',
        'footer-copyright': '© 2026 SmartFarm AI |  Designed & Developed by Aman Kumar Ranout🌾',
        'footer-made': 'Made with 💚 for Indian Farmers',
        
        // Founder Section
        'founder-title': 'Founder & Developer 👨‍💼',
        'founder-name': 'Er. A.K. Ranuot',
        'founder-title-role': 'Founder & Developer',
        'founder-subtitle': 'Data Scientist & AI Engineer',
        'founder-bio': 'Pursuing B.Tech CSE at SBBS University, Jalandhar. Passionate about developing AI solutions to help farmers increase productivity and sustainability.'
    },
    hi: {
        // Navigation
        'nav-home': 'होम',
        'nav-features': 'विशेषताएं',
        'nav-demo': 'डेमो',
        'nav-schemes': 'योजनाएं',
        
        // Hero Section
        'hero-title': 'स्मार्ट खेती, स्मार्ट आय 🌾',
        'hero-subtitle': 'मिट्टी से बिक्री तक – AI द्वारा संचालित',
        'hero-desc': 'बुवाई → विकास → कटाई → विक्रय तक संपूर्ण मार्गदर्शन',
        'hero-btn': 'डेमो शुरू करें',
        
        // Features
        'features-title': 'हमारे स्मार्ट मॉड्यूल 🔹',
        'feature-crop': 'स्मार्ट फसल सिफारिश',
        'feature-crop-desc': 'एमएल मॉडल मिट्टी, मौसम और स्थान का विश्लेषण करके सर्वोत्तम फसल का सुझाव देता है',
        'feature-irrigation': 'स्मार्ट सिंचाई प्रणाली',
        'feature-irrigation-desc': 'IoT सेंसर मिट्टी की नमी और तापमान के आधार पर जल उपयोग को अनुकूलित करते हैं',
        'feature-weather': 'मौसम की भविष्यवाणी और सतर्कता',
        'feature-weather-desc': 'बारिश, गर्मी की लहरों और पाले की स्थिति के लिए रीयल-टाइम सतर्कता',
        'feature-disease': 'रोग और कीट पहचान',
        'feature-disease-desc': 'एआई-संचालित कंप्यूटर विजन रोगों और कीटों के हमलों का पता लगाता है',
        'feature-yield': 'उपज की भविष्यवाणी',
        'feature-yield-desc': 'बेहतर योजना के लिए अपेक्षित फसल उत्पादन की पूर्वानुमान',
        'feature-price': 'बाजार मूल्य पूर्वानुमान',
        'feature-price-desc': 'वर्तमान मंडी कीमतें और स्मार्ट बिक्री के लिए भविष्य के रुझान दिखाता है',
        'feature-subsidy': 'सब्सिडी और योजना खोजक',
        'feature-subsidy-desc': 'सरकारी सब्सिडी, पात्रता मानदंड और किसानों के लिए आवेदन गाइड खोजें।',
        'feature-news': 'किसान समाचार और सतर्कता',
        'feature-news-desc': 'कृषि समाचार, नीति अपडेट, मौसम सतर्कता और बाजार सब्सिडी घोषणाएं प्राप्त करें।',
        
        // Demo Section
        'demo-title': '🔹 इंटरैक्टिव डेमो',
        'demo-crop': '📱 1. स्मार्ट फसल सिफारिश',
        'demo-irrigation': '💧 2. स्मार्ट सिंचाई सलाहकार',
        'demo-weather': '🌦️ 3. मौसम की भविष्यवाणी और सतर्कता',
        'demo-disease': '🐛 4. रोग और कीट पहचान',
        'demo-yield': '📊 5. उपज की भविष्यवाणी',
        'demo-price': '💰 6. स्मार्ट बाजार मूल्य पूर्वानुमान',
        
        // Schemes
        'schemes-title': '🚜 सरकारी योजनाएं और लाभ',
        'scheme-pm-kisan': 'पीएम-किसान सम्मान निधि',
        'scheme-pm-kisan-desc': 'सभी किसानों को ₹6,000/वर्ष की सीधी आय सहायता',
        'scheme-fasal': 'प्रधानमंत्री फसल बीमा योजना',
        'scheme-fasal-desc': 'प्राकृतिक आपदाओं के विरुद्ध फसल बीमा कवरेज',
        'scheme-soil': 'मिट्टी स्वास्थ्य कार्ड योजना',
        'scheme-soil-desc': 'उर्वरता और उत्पादकता में सुधार के लिए मुफ्त मिट्टी परीक्षण',
        'scheme-enam': 'ई-एनएएम - राष्ट्रीय कृषि बाजार',
        'scheme-enam-desc': 'किसानों के लिए सीधा ऑनलाइन विपणन मंच',
        'learn-more': 'और जानें',
        
        // News
        'news-title': 'नवीनतम किसान सब्सिडी और समाचार',
        'refresh-news': 'लाइव समाचार ताज़ा करें',
        
        // Stats
        'stats-farmers': 'सक्रिय किसान',
        'stats-yield': 'उपज में वृद्धि',
        'stats-water': 'बचाई गई पानी',
        'stats-income': 'औसत आय वृद्धि',
        
        // How It Works
        'works-title': 'SmartFarm AI कैसे काम करता है 🔄',
        'works-data': 'डेटा संग्रह',
        'works-data-desc': 'IoT सेंसर वास्तविक समय में मिट्टी, मौसम और फसल डेटा एकत्र करते हैं',
        'works-analysis': 'एआई विश्लेषण',
        'works-analysis-desc': 'मशीन लर्निंग मॉडल पैटर्न और रुझानों का विश्लेषण करते हैं',
        'works-recommendations': 'स्मार्ट सिफारिशें',
        'works-recommendations-desc': 'बेहतर खेती निर्णयों के लिए व्यक्तिगत सलाह',
        'works-results': 'बेहतर परिणाम',
        'works-results-desc': 'बढ़ी हुई उपज, कम लागत, अधिक लाभ',
        
        // Benefits
        'benefits-title': 'किसानों के लिए लाभ 💚',
        'benefit-yield': 'बढ़ी हुई उपज',
        'benefit-yield-desc': 'खेती की प्रथाओं को अनुकूलित करके 20-30% अधिक उत्पादन प्राप्त करें',
        'benefit-profit': 'अधिक लाभ',
        'benefit-profit-desc': 'स्मार्ट बिक्री के साथ लागत कम करें और कीमतें बेहतर करें',
        'benefit-water': 'जल दक्षता',
        'benefit-water-desc': 'सटीक सिंचाई 40% तक पानी बचाती है',
        'benefit-eco': 'पर्यावरण अनुकूल',
        'benefit-eco-desc': 'टिकाऊ खेती पर्यावरण प्रभाव को कम करती है',
        'benefit-easy': 'उपयोग करना आसान',
        'benefit-easy-desc': 'सरल ऐप इंटरफेस बुनियादी स्मार्टफोन पर काम करता है',
        'benefit-protection': 'जोखिम सुरक्षा',
        'benefit-protection-desc': 'मौसम सतर्कता और रोग पहचान नुकसान से बचाती है',
        
        // Testimonials
        'testimonials-title': 'किसान सफलता की कहानियां 🌟',
        
        // FAQ
        'faq-title': 'अक्सर पूछे जाने वाले प्रश्न ❓',
        'faq-free': '❓ क्या यह ऐप मुफ्त है?',
        'faq-free-ans': 'हां! SmartFarm AI किसानों के लिए पूरी तरह मुफ्त है। सरकार द्वारा समर्थित पहल।',
        'faq-offline': '❓ क्या यह ऑफलाइन काम करता है?',
        'faq-offline-ans': 'हां, ऐप कम कनेक्टिविटी वाले क्षेत्रों में काम करता है। इंटरनेट उपलब्ध होने पर सिंक होता है।',
        'faq-equipment': '❓ क्या मुझे विशेष उपकरण की आवश्यकता है?',
        'faq-equipment-ans': 'वैकल्पिक IoT सेंसर सटीकता बढ़ाते हैं, लेकिन ऐप मैनुअल डेटा प्रविष्टि के साथ भी काम करता है।',
        'faq-security': '❓ क्या मेरा डेटा सुरक्षित है?',
        'faq-security-ans': '100% सुरक्षित। डेटा एन्क्रिप्ट किया गया है और केवल आपके खेती संबंधी निर्णयों के लिए उपयोग किया जाता है।',
        'faq-languages': '❓ यह किस भाषा में उपलब्ध है?',
        'faq-languages-ans': 'हिंदी, पंजाबी, गुजराती, तमिल, तेलुगु, कन्नड़ और अंग्रेजी।',
        'faq-started': '❓ मैं कैसे शुरुआत करूं?',
        'faq-started-ans': 'ऐप डाउनलोड करें, खाता बनाएं, अपना स्थान और खेत विवरण दर्ज करें। बस!',
        
        // CTA
        'cta-title': 'अपनी खेती को बदलने के लिए तैयार हैं?',
        'cta-desc': 'हजारों किसानों में शामिल हों जो पहले से ही एआई-संचालित निर्णयों से लाभ उठा रहे हैं',
        'cta-download': 'ऐप अभी डाउनलोड करें',
        'cta-video': 'डेमो वीडियो देखें',
        
        // Comparison
        'comparison-title': 'विशेषताओं की तुलना 🎯',
        'feature-subsidy': '💰 सब्सिडी और योजनाएं',
        'feature-crop-rec': '🌾 फसल सिफारिश',
        'feature-smart-irr': '💧 स्मार्ट सिंचाई',
        'feature-disease-det': '🐛 रोग पहचान',
        'feature-yield-pred': '📊 उपज की भविष्यवाणी',
        'feature-price-forecast': '💹 बाजार मूल्य पूर्वानुमान',
        'feature-weather-pred': '🌦️ मौसम की भविष्यवाणी',
        'feature-offline': '📱 ऑफलाइन मोड',
        'feature-security': '🔒 डेटा सुरक्षा',
        'feature-cost': '💵 लागत',
        
        // Efficiency
        'efficiency-title': 'SmartFarm AI हल्का क्यों है? ⚡',
        'efficiency-code': 'अनुकूलित कोड',
        'efficiency-code-desc': 'अनावश्यक अव्यवस्था के बिना स्वच्छ, कुशल कोड। केवल आवश्यक विशेषताएं शामिल हैं।',
        'efficiency-assets': 'संपीड़ित संपत्ति',
        'efficiency-assets-desc': 'कम बैंडविड्थ वाले क्षेत्रों के लिए छवियां और मीडिया अनुकूलित हैं। स्मार्ट कैशिंग सिस्टम।',
        'efficiency-loading': 'स्मार्ट लोडिंग',
        'efficiency-loading-desc': 'विशेषताएं क्रमिक रूप से लोड होती हैं। ऑफलाइन कार्यक्षमता के लिए पूर्ण डाउनलोड की आवश्यकता नहीं है।',
        'efficiency-tracking': 'न्यूनतम ट्रैकिंग',
        'efficiency-tracking-desc': 'कोई अनावश्यक विश्लेषिकी या विज्ञापन नहीं। गोपनीयता-केंद्रित डिज़ाइन डेटा उपयोग को कम करता है।',
        
        // Footer
        'footer-company': 'SmartFarm AI',
        'footer-desc': 'एआई-संचालित निर्णयों के साथ किसानों को सशक्त बनाना',
        'footer-quick': 'त्वरित लिंक',
        'footer-support': 'समर्थन',
        'footer-schemes': 'सरकारी योजनाएं',
        'footer-help': 'सहायता केंद्र',
        'footer-contact': 'संपर्क करें',
        'footer-privacy': 'गोपनीयता नीति',
        'footer-terms': 'नियम और शर्तें',
        'footer-copyright': '© 2026 SmartFarm AI | अमन कुमार रानौट द्वारा डिज़ाइन और विकसित🌾',
        'footer-made': 'भारतीय किसानों के लिए 💚 के साथ बनाया गया',
        
        // Founder Section
        'founder-title': 'संस्थापक और विकास कर्ता 👨‍💼',
        'founder-name': 'Er. A.K. रानौट',
        'founder-title-role': 'संस्थापक और विकास कर्ता',
        'founder-subtitle': 'डेटा विज्ञानी और एआई इंजीनियर',
        'founder-bio': 'SBBS विश्वविद्यालय, जालंधर में B.Tech CSE का पीछा कर रहे हैं। किसानों की उत्पादकता और स्थिरता बढ़ाने में मदद के लिए AI समाधान विकसित करने के लिए भावुक।'
    }
};

// Current Language
let currentLanguage = localStorage.getItem('language') || 'en';

const resultTranslations = {
    en: {
        'result-recommended-crop': 'Recommended Crop:',
        'result-status': 'Status:',
        'result-water-recommendation': 'Water Recommendation:',
        'result-detection': 'Detection Result:',
        'result-treatment': 'Suggested Treatment:',
        'result-expected-yield': 'Expected Yield:',
        'result-quality': 'Quality Grade:',
        'result-current-price': 'Current Price:',
        'result-per-quintal': 'per quintal',
        'result-best-time': 'Best Time to Sell:',
        'result-price-trend': 'Price Trend:',
        'crop-multi': 'Multi-crop farming recommended',
        'crop-rice': 'Rice - High yield potential',
        'crop-wheat': 'Wheat - Water efficient crop',
        'crop-millet': 'Millet - Drought resistant',
        'crop-sugarcane': 'Sugarcane - Good rainfall area',
        'irrigation-normal': 'Normal',
        'irrigation-regular': 'Continue regular watering',
        'irrigation-urgent': 'URGENT - Water required immediately',
        'irrigation-urgent-advice': 'Irrigate within 24 hours. Recommended: 40-50mm',
        'irrigation-low': 'Low moisture detected',
        'irrigation-low-advice': 'Schedule irrigation for next 2-3 days. Recommended: 25-30mm',
        'irrigation-sufficient': 'Moisture sufficient - Skip irrigation',
        'irrigation-sufficient-advice': 'Monitor for waterlogging. Wait 3-4 days before watering',
        'irrigation-hot': ' (High temp - increase frequency)',
        'yield-unit': 'quintals',
        'yield-acre': 'per acre',
        'quality-average': 'Average',
        'quality-organic': 'Good (Organic)',
        'quality-good': 'Good',
        'quality-high': 'High Yield',
        'price-upward': 'Upward',
        'price-downward': 'Downward',
        'price-stable': 'Stable',
        'price-2-3-weeks': 'In 2-3 weeks',
        'price-1-2-weeks': 'In 1-2 weeks',
        'price-wait-harvest': 'Wait for harvest',
        'price-immediate': 'Sell immediately',
        'price-1-week': 'Sell in 1 week'
    },
    hi: {
        'result-recommended-crop': 'अनुशंसित फसल:',
        'result-status': 'स्थिति:',
        'result-water-recommendation': 'पानी की सलाह:',
        'result-detection': 'पहचान का परिणाम:',
        'result-treatment': 'सुझाया गया उपचार:',
        'result-expected-yield': 'अनुमानित उपज:',
        'result-quality': 'गुणवत्ता श्रेणी:',
        'result-current-price': 'वर्तमान कीमत:',
        'result-per-quintal': 'प्रति क्विंटल',
        'result-best-time': 'बेचने का सही समय:',
        'result-price-trend': 'कीमत का रुझान:',
        'crop-multi': 'मिश्रित फसल खेती की सलाह',
        'crop-rice': 'चावल - अधिक उपज की संभावना',
        'crop-wheat': 'गेहूं - कम पानी वाली फसल',
        'crop-millet': 'बाजरा - सूखा प्रतिरोधी',
        'crop-sugarcane': 'गन्ना - अच्छी वर्षा वाला क्षेत्र',
        'irrigation-normal': 'सामान्य',
        'irrigation-regular': 'नियमित रूप से पानी देते रहें',
        'irrigation-urgent': 'अति आवश्यक - तुरंत पानी दें',
        'irrigation-urgent-advice': '24 घंटे के भीतर सिंचाई करें। सुझाई गई मात्रा: 40-50 मिमी',
        'irrigation-low': 'नमी कम है',
        'irrigation-low-advice': 'अगले 2-3 दिनों में सिंचाई करें। सुझाई गई मात्रा: 25-30 मिमी',
        'irrigation-sufficient': 'नमी पर्याप्त है - सिंचाई छोड़ दें',
        'irrigation-sufficient-advice': 'जलभराव पर नजर रखें। पानी देने से पहले 3-4 दिन प्रतीक्षा करें',
        'irrigation-hot': ' (अधिक तापमान - आवृत्ति बढ़ाएं)',
        'yield-unit': 'क्विंटल',
        'yield-acre': 'प्रति एकड़',
        'quality-average': 'औसत',
        'quality-organic': 'अच्छा (जैविक)',
        'quality-good': 'अच्छा',
        'quality-high': 'उच्च उपज',
        'price-upward': 'बढ़ता हुआ',
        'price-downward': 'गिरता हुआ',
        'price-stable': 'स्थिर',
        'price-2-3-weeks': '2-3 सप्ताह में',
        'price-1-2-weeks': '1-2 सप्ताह में',
        'price-wait-harvest': 'कटाई तक प्रतीक्षा करें',
        'price-immediate': 'तुरंत बेचें',
        'price-1-week': '1 सप्ताह में बेचें'
    }
};

translations.pa = Object.assign({}, translations.en, {
    'nav-home': 'ਮੁੱਖ ਪੰਨਾ',
    'nav-features': 'ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ',
    'nav-demo': 'ਡੈਮੋ',
    'nav-schemes': 'ਯੋਜਨਾਵਾਂ',
    'hero-title': 'ਸਮਾਰਟ ਖੇਤੀ, ਸਮਾਰਟ ਕਮਾਈ 🌾',
    'hero-subtitle': 'ਮਿੱਟੀ ਤੋਂ ਮੰਡੀ ਤੱਕ – AR SmartFarm ਨਾਲ',
    'hero-btn': 'ਡੈਮੋ ਸ਼ੁਰੂ ਕਰੋ',
    'features-title': 'ਸਾਡੇ ਸਮਾਰਟ ਮੋਡੀਊਲ',
    'demo-title': 'ਇੰਟਰਐਕਟਿਵ ਡੈਮੋ',
    'demo-crop': '1. ਸਮਾਰਟ ਫਸਲ ਸਿਫਾਰਸ਼',
    'demo-irrigation': '2. ਸਮਾਰਟ ਸਿੰਚਾਈ ਸਲਾਹਕਾਰ',
    'demo-weather': '3. ਮੌਸਮ ਦੀ ਭਵਿੱਖਬਾਣੀ ਅਤੇ ਚੇਤਾਵਨੀਆਂ',
    'demo-disease': '4. ਰੋਗ ਅਤੇ ਕੀੜੇ ਦੀ ਪਛਾਣ',
    'demo-yield': '5. ਪੈਦਾਵਾਰ ਦੀ ਭਵਿੱਖਬਾਣੀ',
    'demo-price': '6. ਸਮਾਰਟ ਮੰਡੀ ਭਾਅ ਦੀ ਭਵਿੱਖਬਾਣੀ',
    'feature-crop': 'ਸਮਾਰਟ ਫਸਲ ਸਿਫਾਰਸ਼',
    'feature-irrigation': 'ਸਮਾਰਟ ਸਿੰਚਾਈ ਪ੍ਰਣਾਲੀ',
    'feature-weather': 'ਮੌਸਮ ਦੀ ਜਾਣਕਾਰੀ ਅਤੇ ਚੇਤਾਵਨੀਆਂ',
    'feature-disease': 'ਰੋਗ ਅਤੇ ਕੀੜੇ ਦੀ ਪਛਾਣ',
    'feature-yield': 'ਪੈਦਾਵਾਰ ਦੀ ਭਵਿੱਖਬਾਣੀ',
    'feature-price': 'ਮੰਡੀ ਭਾਅ ਦੀ ਭਵਿੱਖਬਾਣੀ',
    'disease-photo-label': 'ਪੱਤੇ ਦੀ ਤਸਵੀਰ (ਵਿਕਲਪਿਕ):',
    'refresh-news': 'ਲਾਈਵ ਖ਼ਬਰਾਂ ਤਾਜ਼ਾ ਕਰੋ',
    'label-soil-type': 'ਮਿੱਟੀ ਦੀ ਕਿਸਮ:',
    'option-select-soil': 'ਮਿੱਟੀ ਦੀ ਕਿਸਮ ਚੁਣੋ',
    'option-loamy': 'ਦੋਮਟ ਮਿੱਟੀ',
    'option-clayey': 'ਚੀਕਣੀ ਮਿੱਟੀ',
    'option-sandy': 'ਰੇਤਲੀ ਮਿੱਟੀ',
    'option-black': 'ਕਾਲੀ ਮਿੱਟੀ',
    'label-temperature': 'ਔਸਤ ਤਾਪਮਾਨ (°C):',
    'label-rainfall': 'ਸਾਲਾਨਾ ਵਰਖਾ (ਮਿ.ਮੀ.):',
    'button-recommend': 'ਸਿਫਾਰਸ਼ ਲਵੋ',
    'label-moisture': 'ਮਿੱਟੀ ਦੀ ਨਮੀ (%):',
    'label-current-temperature': 'ਮੌਜੂਦਾ ਤਾਪਮਾਨ (°C):',
    'button-irrigation': 'ਸਿੰਚਾਈ ਦੀ ਸਥਿਤੀ ਜਾਂਚੋ',
    'label-region': 'ਆਪਣਾ ਖੇਤਰ ਚੁਣੋ:',
    'option-select-region': 'ਖੇਤਰ ਚੁਣੋ',
    'option-north': 'ਉੱਤਰੀ ਭਾਰਤ',
    'option-south': 'ਦੱਖਣੀ ਭਾਰਤ',
    'option-east': 'ਪੂਰਬੀ ਭਾਰਤ',
    'option-west': 'ਪੱਛਮੀ ਭਾਰਤ',
    'button-weather': 'ਮੌਸਮ ਦੀ ਚੇਤਾਵਨੀ ਲਵੋ',
    'label-crop-type': 'ਫਸਲ ਦੀ ਕਿਸਮ:',
    'option-select-crop': 'ਫਸਲ ਚੁਣੋ',
    'option-wheat': 'ਕਣਕ',
    'option-rice': 'ਝੋਨਾ',
    'option-cotton': 'ਕਪਾਹ',
    'option-sugarcane': 'ਗੰਨਾ',
    'label-leaf-condition': 'ਪੱਤੇ ਦੀ ਹਾਲਤ (ਵਿਕਲਪਿਕ):',
    'option-select-condition': 'ਹਾਲਤ ਚੁਣੋ',
    'option-healthy': 'ਸਿਹਤਮੰਦ (ਹਰਾ)',
    'option-yellowing': 'ਪੀਲੇ ਪੱਤੇ',
    'option-spots': 'ਭੂਰੇ ਧੱਬੇ',
    'option-wilting': 'ਮੁਰਝਾਉਣਾ',
    'button-analyze': 'ਫਸਲ ਦੀ ਜਾਂਚ ਕਰੋ',
    'label-crop-name': 'ਫਸਲ ਦਾ ਨਾਮ:',
    'label-area': 'ਜ਼ਮੀਨ ਦਾ ਰਕਬਾ (ਏਕੜ):',
    'label-fertilizer': 'ਖਾਦ (ਕਿਲੋ/ਏਕੜ):',
    'button-yield': 'ਪੈਦਾਵਾਰ ਦੀ ਭਵਿੱਖਬਾਣੀ ਕਰੋ',
    'label-market-crop': 'ਫਸਲ ਚੁਣੋ:',
    'option-potato': 'ਆਲੂ',
    'label-mandi': 'ਮੰਡੀ:',
    'option-select-market': 'ਮੰਡੀ ਚੁਣੋ',
    'option-delhi': 'ਦਿੱਲੀ ਮੰਡੀ',
    'option-punjab': 'ਪੰਜਾਬ ਮੰਡੀ',
    'option-gujarat': 'ਗੁਜਰਾਤ ਮੰਡੀ',
    'button-price': 'ਭਾਅ ਦੀ ਭਵਿੱਖਬਾਣੀ ਲਵੋ',
    'placeholder-temperature': '25',
    'placeholder-rainfall': '800',
    'placeholder-temperature-current': '30',
    'placeholder-crop': 'ਜਿਵੇਂ: ਕਣਕ',
    'placeholder-area': '10',
    'placeholder-fertilizer': '50'
});

const legacyTranslations = {
    hi: {
        'Profile Photo': 'प्रोफ़ाइल फोटो', 'Visit Founder Website': 'संस्थापक की वेबसाइट देखें',
        'Compare SmartFarm AI\'s app size and features with other popular agricultural and mobile applications': 'SmartFarm AI के ऐप आकार और सुविधाओं की तुलना अन्य कृषि और मोबाइल ऐप से करें',
        'Feature': 'विशेषता', 'Kisan Network': 'किसान नेटवर्क', 'ENAM Mandi': 'ई-नाम मंडी', 'Weather App': 'मौसम ऐप',
        'Live Updates': 'लाइव अपडेट', 'AI-Powered': 'एआई-संचालित', 'Real-time': 'रीयल-टाइम', 'Computer Vision': 'कंप्यूटर विजन',
        'ML Model': 'एमएल मॉडल', 'AI Prediction': 'एआई पूर्वानुमान', 'Live Rates': 'लाइव दरें', 'Mandi Prices': 'मंडी भाव',
        'Detailed': 'विस्तृत', 'Works Offline': 'ऑफलाइन काम करता है', 'End-to-End Encrypted': 'एंड-टू-एंड एन्क्रिप्टेड',
        'FREE': 'मुफ्त', 'Basic': 'बुनियादी', 'Secure': 'सुरक्षित', 'Ads': 'विज्ञापनों सहित',
        'Government Update': 'सरकारी अपडेट', 'Market Update': 'बाजार अपडेट', 'Weather Alert': 'मौसम सतर्कता',
        'Disaster Management': 'आपदा प्रबंधन', 'Safety Advisory': 'सुरक्षा सलाह', 'Subsidy News': 'सब्सिडी समाचार',
        'Pest Alert': 'कीट सतर्कता', 'Digital Initiative': 'डिजिटल पहल', 'Read more': 'और पढ़ें',
        'Loading live news and information...': 'लाइव समाचार और जानकारी लोड हो रही है...',
        'Unable to load live news. Showing latest farmer updates.': 'लाइव समाचार लोड नहीं हो सका। नवीनतम किसान अपडेट दिखाए जा रहे हैं।',
        'Latest Farmer Subsidies & News': 'नवीनतम किसान सब्सिडी और समाचार',
        'PM-KISAN Yojana: ₹6,000 Installments Begin': 'पीएम-किसान योजना: ₹6,000 की किस्त शुरू',
        'Record Wheat Procurement at ₹2,450 per Quintal': '₹2,450 प्रति क्विंटल पर गेहूं की रिकॉर्ड खरीद',
        'Monsoon Alert: Heavy Rainfall Expected in North India': 'मानसून सतर्कता: उत्तर भारत में भारी बारिश की संभावना',
        'Disaster Management Advisory for Farmers': 'किसानों के लिए आपदा प्रबंधन सलाह',
        'New Subsidy for Drip Irrigation Systems': 'ड्रिप सिंचाई प्रणाली के लिए नई सब्सिडी',
        'Army Worm Attack Warning for Cotton Farmers': 'कपास किसानों के लिए आर्मी वर्म हमले की चेतावनी',
        'e-NAM Platform: 1 Million Farmers Trading Online': 'ई-नाम प्लेटफॉर्म: 10 लाख किसान ऑनलाइन व्यापार कर रहे हैं',
        'Government announces new farm subsidy': 'सरकार ने नई कृषि सब्सिडी की घोषणा की',
        'Market prices update': 'बाजार भाव अपडेट', 'Weather advisory issued': 'मौसम सलाह जारी',
        'Please fill all fields': 'कृपया सभी जानकारी भरें', 'Please select a region': 'कृपया क्षेत्र चुनें',
        'Please select both crop and leaf condition': 'कृपया फसल और पत्ते की स्थिति दोनों चुनें',
        'Please consult with a plant pathologist.': 'कृपया पौधा रोग विशेषज्ञ से सलाह लें।'
    },
    pa: {
        'Profile Photo': 'ਪ੍ਰੋਫਾਈਲ ਫੋਟੋ', 'Visit Founder Website': 'ਸੰਸਥਾਪਕ ਦੀ ਵੈੱਬਸਾਈਟ ਵੇਖੋ',
        'Compare SmartFarm AI\'s app size and features with other popular agricultural and mobile applications': 'SmartFarm AI ਦੇ ਐਪ ਆਕਾਰ ਅਤੇ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਦੀ ਹੋਰ ਖੇਤੀਬਾੜੀ ਅਤੇ ਮੋਬਾਈਲ ਐਪਾਂ ਨਾਲ ਤੁਲਨਾ ਕਰੋ',
        'Feature': 'ਵਿਸ਼ੇਸ਼ਤਾ', 'Kisan Network': 'ਕਿਸਾਨ ਨੈੱਟਵਰਕ', 'ENAM Mandi': 'ਈ-ਨਾਮ ਮੰਡੀ', 'Weather App': 'ਮੌਸਮ ਐਪ',
        'Live Updates': 'ਲਾਈਵ ਅੱਪਡੇਟ', 'AI-Powered': 'ਏਆਈ-ਸੰਚਾਲਿਤ', 'Real-time': 'ਰੀਅਲ-ਟਾਈਮ', 'Computer Vision': 'ਕੰਪਿਊਟਰ ਵਿਜ਼ਨ',
        'ML Model': 'ਐਮਐਲ ਮਾਡਲ', 'AI Prediction': 'ਏਆਈ ਭਵਿੱਖਬਾਣੀ', 'Live Rates': 'ਲਾਈਵ ਭਾਅ', 'Mandi Prices': 'ਮੰਡੀ ਭਾਅ',
        'Detailed': 'ਵਿਸਥਾਰਪੂਰਵਕ', 'Works Offline': 'ਆਫਲਾਈਨ ਕੰਮ ਕਰਦਾ ਹੈ', 'End-to-End Encrypted': 'ਐਂਡ-ਟੂ-ਐਂਡ ਇਨਕ੍ਰਿਪਟਡ',
        'FREE': 'ਮੁਫ਼ਤ', 'Basic': 'ਬੁਨਿਆਦੀ', 'Secure': 'ਸੁਰੱਖਿਅਤ', 'Ads': 'ਇਸ਼ਤਿਹਾਰਾਂ ਸਮੇਤ',
        'Government Update': 'ਸਰਕਾਰੀ ਅੱਪਡੇਟ', 'Market Update': 'ਮੰਡੀ ਅੱਪਡੇਟ', 'Weather Alert': 'ਮੌਸਮ ਚੇਤਾਵਨੀ',
        'Disaster Management': 'ਆਫ਼ਤ ਪ੍ਰਬੰਧਨ', 'Safety Advisory': 'ਸੁਰੱਖਿਆ ਸਲਾਹ', 'Subsidy News': 'ਸਬਸਿਡੀ ਖ਼ਬਰਾਂ',
        'Pest Alert': 'ਕੀੜੇ ਦੀ ਚੇਤਾਵਨੀ', 'Digital Initiative': 'ਡਿਜੀਟਲ ਪਹਿਲ', 'Read more': 'ਹੋਰ ਪੜ੍ਹੋ',
        'Loading live news and information...': 'ਲਾਈਵ ਖ਼ਬਰਾਂ ਅਤੇ ਜਾਣਕਾਰੀ ਲੋਡ ਹੋ ਰਹੀ ਹੈ...',
        'Unable to load live news. Showing latest farmer updates.': 'ਲਾਈਵ ਖ਼ਬਰਾਂ ਲੋਡ ਨਹੀਂ ਹੋ ਸਕੀਆਂ। ਨਵੀਆਂ ਕਿਸਾਨ ਖ਼ਬਰਾਂ ਦਿਖਾਈਆਂ ਜਾ ਰਹੀਆਂ ਹਨ।',
        'Latest Farmer Subsidies & News': 'ਨਵੀਆਂ ਕਿਸਾਨ ਸਬਸਿਡੀ ਅਤੇ ਖ਼ਬਰਾਂ',
        'PM-KISAN Yojana: ₹6,000 Installments Begin': 'ਪੀਐਮ-ਕਿਸਾਨ ਯੋਜਨਾ: ₹6,000 ਦੀ ਕਿਸ਼ਤ ਸ਼ੁਰੂ',
        'Record Wheat Procurement at ₹2,450 per Quintal': '₹2,450 ਪ੍ਰਤੀ ਕੁਇੰਟਲ ਤੇ ਕਣਕ ਦੀ ਰਿਕਾਰਡ ਖਰੀਦ',
        'Monsoon Alert: Heavy Rainfall Expected in North India': 'ਮਾਨਸੂਨ ਚੇਤਾਵਨੀ: ਉੱਤਰੀ ਭਾਰਤ ਵਿੱਚ ਭਾਰੀ ਬਾਰਿਸ਼ ਦੀ ਸੰਭਾਵਨਾ',
        'Disaster Management Advisory for Farmers': 'ਕਿਸਾਨਾਂ ਲਈ ਆਫ਼ਤ ਪ੍ਰਬੰਧਨ ਸਲਾਹ',
        'New Subsidy for Drip Irrigation Systems': 'ਡ੍ਰਿਪ ਸਿੰਚਾਈ ਪ੍ਰਣਾਲੀ ਲਈ ਨਵੀਂ ਸਬਸਿਡੀ',
        'Army Worm Attack Warning for Cotton Farmers': 'ਕਪਾਹ ਕਿਸਾਨਾਂ ਲਈ ਆਰਮੀ ਵਰਮ ਹਮਲੇ ਦੀ ਚੇਤਾਵਨੀ',
        'e-NAM Platform: 1 Million Farmers Trading Online': 'ਈ-ਨਾਮ ਪਲੇਟਫਾਰਮ: 10 ਲੱਖ ਕਿਸਾਨ ਆਨਲਾਈਨ ਵਪਾਰ ਕਰ ਰਹੇ ਹਨ',
        'Government announces new farm subsidy': 'ਸਰਕਾਰ ਨੇ ਨਵੀਂ ਖੇਤੀ ਸਬਸਿਡੀ ਦਾ ਐਲਾਨ ਕੀਤਾ',
        'Market prices update': 'ਮੰਡੀ ਭਾਅ ਅੱਪਡੇਟ', 'Weather advisory issued': 'ਮੌਸਮ ਸਲਾਹ ਜਾਰੀ',
        'Please fill all fields': 'ਕਿਰਪਾ ਕਰਕੇ ਸਾਰੀ ਜਾਣਕਾਰੀ ਭਰੋ', 'Please select a region': 'ਕਿਰਪਾ ਕਰਕੇ ਖੇਤਰ ਚੁਣੋ',
        'Please select both crop and leaf condition': 'ਕਿਰਪਾ ਕਰਕੇ ਫਸਲ ਅਤੇ ਪੱਤੇ ਦੀ ਹਾਲਤ ਦੋਵੇਂ ਚੁਣੋ',
        'Please consult with a plant pathologist.': 'ਕਿਰਪਾ ਕਰਕੇ ਪੌਦਾ ਰੋਗ ਮਾਹਿਰ ਨਾਲ ਸਲਾਹ ਕਰੋ।'
    }
};

function translateLegacyText() {
    const dictionary = Object.assign({}, legacyTranslations[currentLanguage] || {});
    const english = Object.assign({}, translations.en, resultTranslations.en);
    const selected = Object.assign({}, translations[currentLanguage], resultTranslations[currentLanguage]);
    Object.keys(english).forEach(key => {
        if (selected[key] && english[key] !== selected[key]) {
            dictionary[english[key]] = selected[key];
        }
    });
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach(node => {
        const parent = node.parentElement;
        if (!parent || ['SCRIPT', 'STYLE', 'OPTION'].includes(parent.tagName) || parent.closest('[data-i18n]')) return;
        if (!node.dataset.originalText) node.dataset.originalText = node.nodeValue;
        const original = node.dataset.originalText.trim();
        if (original) node.nodeValue = node.dataset.originalText.replace(original, dictionary[original] || original);
    });
    document.querySelectorAll('[alt], [aria-label]').forEach(element => {
        ['alt', 'aria-label'].forEach(attribute => {
            if (!element.hasAttribute(attribute)) return;
            const key = `original${attribute.charAt(0).toUpperCase()}${attribute.slice(1)}`;
            if (!element.dataset[key]) element.dataset[key] = element.getAttribute(attribute);
            const original = element.dataset[key];
            element.setAttribute(attribute, dictionary[original] || original);
        });
    });
}
resultTranslations.pa = Object.assign({}, resultTranslations.en, {
    'result-recommended-crop': 'ਸਿਫਾਰਸ਼ ਕੀਤੀ ਫਸਲ:',
    'result-status': 'ਸਥਿਤੀ:',
    'result-water-recommendation': 'ਪਾਣੀ ਦੀ ਸਿਫਾਰਸ਼:',
    'result-detection': 'ਜਾਂਚ ਨਤੀਜਾ:',
    'result-treatment': 'ਸੁਝਾਇਆ ਇਲਾਜ:',
    'result-expected-yield': 'ਉਮੀਦ ਕੀਤੀ ਪੈਦਾਵਾਰ:',
    'result-quality': 'ਗੁਣਵੱਤਾ:',
    'result-current-price': 'ਮੌਜੂਦਾ ਭਾਅ:',
    'result-per-quintal': 'ਪ੍ਰਤੀ ਕੁਇੰਟਲ',
    'result-best-time': 'ਵੇਚਣ ਦਾ ਵਧੀਆ ਸਮਾਂ:',
    'result-price-trend': 'ਭਾਅ ਦਾ ਰੁਝਾਨ:',
    'crop-multi': 'ਮਿਲੀ-ਜੁਲੀ ਫਸਲ ਦੀ ਸਿਫਾਰਸ਼',
    'crop-rice': 'ਝੋਨਾ - ਵੱਧ ਪੈਦਾਵਾਰ ਦੀ ਸੰਭਾਵਨਾ',
    'crop-wheat': 'ਕਣਕ - ਘੱਟ ਪਾਣੀ ਵਾਲੀ ਫਸਲ',
    'crop-millet': 'ਬਾਜਰਾ - ਸੋਕਾ ਸਹਿਣਸ਼ੀਲ ਫਸਲ',
    'crop-sugarcane': 'ਗੰਨਾ - ਵੱਧ ਵਰਖਾ ਵਾਲਾ ਖੇਤਰ',
    'irrigation-normal': 'ਸਧਾਰਨ',
    'irrigation-regular': 'ਨਿਯਮਿਤ ਪਾਣੀ ਦਿੰਦੇ ਰਹੋ',
    'irrigation-urgent': 'ਜ਼ਰੂਰੀ - ਤੁਰੰਤ ਪਾਣੀ ਦੀ ਲੋੜ ਹੈ',
    'irrigation-urgent-advice': '24 ਘੰਟਿਆਂ ਵਿੱਚ ਸਿੰਚਾਈ ਕਰੋ। ਸੁਝਾਈ ਮਾਤਰਾ: 40-50 ਮਿ.ਮੀ.',
    'irrigation-low': 'ਨਮੀ ਘੱਟ ਹੈ',
    'irrigation-low-advice': 'ਅਗਲੇ 2-3 ਦਿਨਾਂ ਵਿੱਚ ਸਿੰਚਾਈ ਕਰੋ। ਸੁਝਾਈ ਮਾਤਰਾ: 25-30 ਮਿ.ਮੀ.',
    'irrigation-sufficient': 'ਨਮੀ ਕਾਫ਼ੀ ਹੈ - ਸਿੰਚਾਈ ਨਾ ਕਰੋ',
    'irrigation-sufficient-advice': 'ਪਾਣੀ ਖੜ੍ਹਾ ਹੋਣ ਤੋਂ ਬਚੋ। ਪਾਣੀ ਦੇਣ ਤੋਂ ਪਹਿਲਾਂ 3-4 ਦਿਨ ਉਡੀਕ ਕਰੋ',
    'irrigation-hot': ' (ਵੱਧ ਤਾਪਮਾਨ - ਸਿੰਚਾਈ ਦੀ ਨਿਗਰਾਨੀ ਵਧਾਓ)',
    'yield-unit': 'ਕੁਇੰਟਲ',
    'yield-acre': 'ਪ੍ਰਤੀ ਏਕੜ',
    'quality-average': 'ਔਸਤ',
    'quality-organic': 'ਚੰਗੀ (ਜੈਵਿਕ)',
    'quality-good': 'ਚੰਗੀ',
    'quality-high': 'ਵੱਧ ਪੈਦਾਵਾਰ',
    'price-upward': 'ਵੱਧ ਰਿਹਾ',
    'price-downward': 'ਘੱਟ ਰਿਹਾ',
    'price-stable': 'ਸਥਿਰ',
    'price-2-3-weeks': '2-3 ਹਫ਼ਤਿਆਂ ਵਿੱਚ',
    'price-1-2-weeks': '1-2 ਹਫ਼ਤਿਆਂ ਵਿੱਚ',
    'price-wait-harvest': 'ਕਟਾਈ ਤੱਕ ਉਡੀਕ ਕਰੋ',
    'price-immediate': 'ਤੁਰੰਤ ਵੇਚੋ',
    'price-1-week': '1 ਹਫ਼ਤੇ ਵਿੱਚ ਵੇਚੋ'
});

function resultText(key) {
    return resultTranslations[currentLanguage][key] || resultTranslations.en[key] || key;
}

// Change Language Function
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    
    // Update language selector
    document.getElementById('languageSelector').value = lang;
    
    // Translate all elements
    translatePage();
    refreshVisibleResults();
}

// Translate Page Function
function translatePage() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = translations[currentLanguage][key] || resultTranslations[currentLanguage][key];
        if (translation) {
            element.textContent = translation;
        }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const placeholder = translations[currentLanguage][key] || translations.en[key];
        if (placeholder) element.setAttribute('placeholder', placeholder);
    });
    translateLegacyText();
}

function refreshVisibleResults() {
    const cropResult = document.getElementById('cropResult');
    if (cropResult && !cropResult.classList.contains('hidden') && document.getElementById('soilType').value && document.getElementById('temperature').value && document.getElementById('rainfall').value) {
        getRecommendation();
    }

    const irrigationResult = document.getElementById('irrigationResult');
    if (irrigationResult && !irrigationResult.classList.contains('hidden')) {
        getIrrigationAdvice();
    }

    const weatherResult = document.getElementById('weatherResult');
    if (weatherResult && !weatherResult.classList.contains('hidden') && document.getElementById('region').value) {
        getWeatherAlerts();
    }

    const diseaseResult = document.getElementById('diseaseResult');
    if (diseaseResult && !diseaseResult.classList.contains('hidden')) {
        detectDisease();
    }

    const yieldResult = document.getElementById('yieldResult');
    if (yieldResult && !yieldResult.classList.contains('hidden') && document.getElementById('yieldCrop').value && document.getElementById('landArea').value && document.getElementById('fertilizerUsed').value) {
        predictYield();
    }

    const priceResult = document.getElementById('priceResult');
    if (priceResult && !priceResult.classList.contains('hidden') && document.getElementById('priceaCrop').value && document.getElementById('mandi').value) {
        getPriceData();
    }
}

// Initialize Language
function initLanguage() {
    document.documentElement.lang = currentLanguage;
    document.getElementById('languageSelector').value = currentLanguage;
    translatePage();
}

window.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('liveNewsList')) {
        fetchLiveNews();
    }
    initLanguage();

    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isOpen = navMenu.classList.toggle('open');
            navToggle.classList.toggle('active', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        navMenu.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('open');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
});

// ===== SMOOTH SCROLLING AND NAVIGATION =====
function scrollToDemo() {
    const demoSection = document.getElementById('demo');
    if (demoSection) {
        demoSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== DEMO FUNCTIONS =====
function getRecommendation() {
    const soilType = document.getElementById('soilType').value;
    const temperature = parseFloat(document.getElementById('temperature').value);
    const rainfall = parseFloat(document.getElementById('rainfall').value);
    
    const recommendations = {
        'loamy': { wheat: 20, rice: 15, sugarcane: 25, cotton: 18 },
        'clayey': { rice: 28, wheat: 12, sugarcane: 20, maize: 18 },
        'sandy': { peanut: 30, cotton: 22, maize: 15, millet: 25 },
        'black': { cotton: 35, sugarcane: 28, wheat: 20, 'chickpea': 22 }
    };

    if (!soilType || !temperature || !rainfall) {
        alert('Please fill all fields');
        return;
    }

    let recommendationKey = 'crop-multi';
    if (temperature > 30 && rainfall > 1000) {
        recommendationKey = 'crop-rice';
    } else if (temperature > 25 && rainfall < 600) {
        recommendationKey = 'crop-wheat';
    } else if (temperature > 35 && rainfall < 400) {
        recommendationKey = 'crop-millet';
    } else if (rainfall > 800) {
        recommendationKey = 'crop-sugarcane';
    }

    document.getElementById('recommendedCrop').textContent = resultText(recommendationKey);
    document.getElementById('cropResult').classList.remove('hidden');
}

function updateMoisture(value) {
    document.getElementById('moistureValue').textContent = value + '%';
}

function getIrrigationAdvice() {
    const moisture = parseInt(document.getElementById('moistureLevel').value);
    const temp = parseFloat(document.getElementById('cropTemp').value);
    
    let status = resultText('irrigation-normal');
    let advice = resultText('irrigation-regular');
    
    if (moisture < 30) {
        status = '⚠️ ' + resultText('irrigation-urgent');
        advice = resultText('irrigation-urgent-advice');
    } else if (moisture < 50) {
        status = '⚠️ ' + resultText('irrigation-low');
        advice = resultText('irrigation-low-advice');
    } else if (moisture > 70) {
        status = resultText('irrigation-sufficient');
        advice = resultText('irrigation-sufficient-advice');
    }
    
    if (temp > 35) {
        advice += resultText('irrigation-hot');
    }
    
    document.getElementById('irrigationStatus').textContent = status;
    document.getElementById('waterAdvice').textContent = advice;
    document.getElementById('irrigationResult').classList.remove('hidden');
}

function getWeatherAlerts() {
    const region = document.getElementById('region').value;
    
    const englishAlerts = {
        'north': `<p>🌡️ <strong>Temperature Alert:</strong> High wind speed (20-25 km/h) expected. Protect crops from damage.</p>
                  <p>☔ <strong>Rainfall:</strong> Light showers in 2-3 days. Good for irrigation planning.</p>
                  <p>⚠️ <strong>Advisory:</strong> Frost warning for early morning. Protect tender plants.</p>`,
        'south': `<p>☔ <strong>Monsoon Alert:</strong> Heavy rainfall expected in 24-48 hours.</p>
                  <p>💨 <strong>Wind:</strong> Moderate winds (15 km/h). No significant threat.</p>
                  <p>⚠️ <strong>Advisory:</strong> Ensure proper drainage. Risk of water logging.</p>`,
        'east': `<p>🌪️ <strong>Storm Warning:</strong> Thunderstorm likely by evening. Secure loose materials.</p>
                 <p>☔ <strong>Rainfall:</strong> Moderate to heavy in next 3 days.</p>
                 <p>⚠️ <strong>Advisory:</strong> Avoid field work during storm. Prepare livestock shelter.</p>`,
        'west': `<p>🌞 <strong>Heat Wave Alert:</strong> Temperature may reach 42-44°C. Increase irrigation.</p>
                 <p>💨 <strong>Dry Wind:</strong> High evaporation rate expected.</p>
                 <p>⚠️ <strong>Advisory:</strong> Mulch fields to retain moisture. Monitor for heat stress.</p>`
    };

    const hindiAlerts = {
        'north': `<p>🌡️ <strong>तापमान सतर्कता:</strong> तेज हवा (20-25 किमी/घंटा) चलने की संभावना है। फसलों को नुकसान से बचाएं।</p>
                  <p>☔ <strong>वर्षा:</strong> 2-3 दिनों में हल्की बारिश। सिंचाई की योजना के लिए उपयुक्त।</p>
                  <p>⚠️ <strong>सलाह:</strong> सुबह पाले की चेतावनी। नाजुक पौधों की रक्षा करें।</p>`,
        'south': `<p>☔ <strong>मानसून सतर्कता:</strong> अगले 24-48 घंटों में भारी बारिश की संभावना।</p>
                  <p>💨 <strong>हवा:</strong> मध्यम हवा (15 किमी/घंटा)। कोई बड़ा खतरा नहीं।</p>
                  <p>⚠️ <strong>सलाह:</strong> उचित जल निकासी सुनिश्चित करें। जलभराव का खतरा है।</p>`,
        'east': `<p>🌪️ <strong>तूफान चेतावनी:</strong> शाम तक आंधी आने की संभावना। ढीली वस्तुओं को सुरक्षित करें।</p>
                 <p>☔ <strong>वर्षा:</strong> अगले 3 दिनों में मध्यम से भारी बारिश।</p>
                 <p>⚠️ <strong>सलाह:</strong> तूफान के दौरान खेत में काम न करें। पशुओं के लिए आश्रय तैयार करें।</p>`,
        'west': `<p>🌞 <strong>लू की सतर्कता:</strong> तापमान 42-44°C तक पहुंच सकता है। सिंचाई बढ़ाएं।</p>
                 <p>💨 <strong>सूखी हवा:</strong> वाष्पीकरण की दर अधिक रहने की संभावना।</p>
                 <p>⚠️ <strong>सलाह:</strong> नमी बनाए रखने के लिए खेतों में मल्च डालें। गर्मी के तनाव पर नजर रखें।</p>`
    };

    const punjabiAlerts = {
        north: '<p>🌡️ <strong>ਤਾਪਮਾਨ ਚੇਤਾਵਨੀ:</strong> ਤੇਜ਼ ਹਵਾ (20-25 ਕਿਮੀ/ਘੰਟਾ) ਦੀ ਸੰਭਾਵਨਾ ਹੈ। ਫਸਲਾਂ ਦੀ ਰੱਖਿਆ ਕਰੋ।</p><p>☔ <strong>ਵਰਖਾ:</strong> 2-3 ਦਿਨਾਂ ਵਿੱਚ ਹਲਕੀ ਬਾਰਿਸ਼।</p><p>⚠️ <strong>ਸਲਾਹ:</strong> ਸਵੇਰੇ ਪਾਲੇ ਤੋਂ ਨਾਜ਼ੁਕ ਪੌਦਿਆਂ ਦੀ ਰੱਖਿਆ ਕਰੋ।</p>',
        south: '<p>☔ <strong>ਮਾਨਸੂਨ ਚੇਤਾਵਨੀ:</strong> ਅਗਲੇ 24-48 ਘੰਟਿਆਂ ਵਿੱਚ ਭਾਰੀ ਬਾਰਿਸ਼ ਦੀ ਸੰਭਾਵਨਾ।</p><p>💨 <strong>ਹਵਾ:</strong> ਦਰਮਿਆਨੀ ਹਵਾ।</p><p>⚠️ <strong>ਸਲਾਹ:</strong> ਪਾਣੀ ਦੀ ਨਿਕਾਸੀ ਠੀਕ ਰੱਖੋ।</p>',
        east: '<p>🌪️ <strong>ਤੂਫ਼ਾਨ ਚੇਤਾਵਨੀ:</strong> ਸ਼ਾਮ ਤੱਕ ਆੰਧੀ ਦੀ ਸੰਭਾਵਨਾ।</p><p>☔ <strong>ਵਰਖਾ:</strong> ਅਗਲੇ 3 ਦਿਨਾਂ ਵਿੱਚ ਦਰਮਿਆਨੀ ਤੋਂ ਭਾਰੀ ਬਾਰਿਸ਼।</p><p>⚠️ <strong>ਸਲਾਹ:</strong> ਤੂਫ਼ਾਨ ਦੌਰਾਨ ਖੇਤ ਵਿੱਚ ਕੰਮ ਨਾ ਕਰੋ।</p>',
        west: '<p>🌞 <strong>ਲੂ ਦੀ ਚੇਤਾਵਨੀ:</strong> ਤਾਪਮਾਨ 42-44°C ਤੱਕ ਪਹੁੰਚ ਸਕਦਾ ਹੈ।</p><p>💨 <strong>ਸੁੱਕੀ ਹਵਾ:</strong> ਪਾਣੀ ਦੇ ਵੱਧ ਵਾਸਪੀਕਰਨ ਦੀ ਸੰਭਾਵਨਾ।</p><p>⚠️ <strong>ਸਲਾਹ:</strong> ਨਮੀ ਬਚਾਉਣ ਲਈ ਖੇਤ ਵਿੱਚ ਮਲਚ ਪਾਓ।</p>'
    };
    
    const alerts = currentLanguage === 'hi' ? hindiAlerts : currentLanguage === 'pa' ? punjabiAlerts : englishAlerts;
    const unavailable = currentLanguage === 'hi' ? 'मौसम की जानकारी उपलब्ध नहीं है' : currentLanguage === 'pa' ? 'ਮੌਸਮ ਦੀ ਜਾਣਕਾਰੀ ਉਪਲਬਧ ਨਹੀਂ ਹੈ' : 'Weather data unavailable';
    document.getElementById('weatherContent').innerHTML = alerts[region] || unavailable;
    document.getElementById('weatherResult').classList.remove('hidden');
}

function previewLeafPhoto(event) {
    const file = event.target.files && event.target.files[0];
    const preview = document.getElementById('leafPhotoPreview');
    if (!file || !preview) return;

    if (!file.type.startsWith('image/')) {
        event.target.value = '';
        alert(currentLanguage === 'pa' ? 'ਕਿਰਪਾ ਕਰਕੇ ਪੱਤੇ ਦੀ ਤਸਵੀਰ ਚੁਣੋ।' : 'Please choose a leaf image.');
        return;
    }
    preview.src = URL.createObjectURL(file);
    preview.classList.remove('hidden');
}

function detectDisease() {
    const cropType = document.getElementById('cropType').value;
    const leafCondition = document.getElementById('leafCondition').value;
    const leafPhoto = document.getElementById('leafPhoto').files[0];

    if (!cropType || (!leafCondition && !leafPhoto)) {
        const message = currentLanguage === 'hi'
            ? 'कृपया फसल चुनें और पत्ते की तस्वीर या स्थिति दें।'
            : currentLanguage === 'pa'
                ? 'ਕਿਰਪਾ ਕਰਕੇ ਫਸਲ ਚੁਣੋ ਅਤੇ ਪੱਤੇ ਦੀ ਤਸਵੀਰ ਜਾਂ ਹਾਲਤ ਦਿਓ।'
                : 'Please select a crop and provide a leaf photo or condition.';
        alert(message);
        return;
    }

    if (leafPhoto && !leafCondition) {
        const photoMessage = currentLanguage === 'hi'
            ? 'तस्वीर प्राप्त हुई। AI रोग मॉडल अभी प्रशिक्षित नहीं है।'
            : currentLanguage === 'pa'
                ? 'ਤਸਵੀਰ ਮਿਲ ਗਈ ਹੈ। ਏਆਈ ਰੋਗ ਮਾਡਲ ਅਜੇ ਸਿਖਲਾਈ ਪ੍ਰਾਪਤ ਨਹੀਂ ਹੈ।'
                : 'Photo received. The AI disease model is not trained yet.';
        document.getElementById('diseaseStatus').textContent = photoMessage;
        document.getElementById('treatmentAdvice').textContent = currentLanguage === 'hi'
            ? 'कृपया कृषि विशेषज्ञ से सलाह लें।'
            : currentLanguage === 'pa'
                ? 'ਕਿਰਪਾ ਕਰਕੇ ਖੇਤੀ ਮਾਹਿਰ ਨਾਲ ਸਲਾਹ ਕਰੋ।'
                : 'Please consult an agricultural expert.';
        document.getElementById('diseaseResult').classList.remove('hidden');
        return;
    }
    
    const diseases = {
        'wheat': {
            'healthy': { status: '✅ No disease detected', treatment: 'Continue regular care and monitoring.' },
            'yellowing': { status: '⚠️ Possible Yellow Rust infection', treatment: 'Apply fungicide spray. Use Propiconazole or Hexaconazole.' },
            'spots': { status: '⚠️ Possible Septoria Leaf Blotch', treatment: 'Use Mancozeb or Carbendazim spray immediately.' },
            'wilting': { status: '🔴 Serious - Root Rot suspected', treatment: 'Improve drainage, reduce watering. Consult agronomist urgently.' }
        },
        'rice': {
            'healthy': { status: '✅ No disease detected', treatment: 'Maintain optimal water level and nutrient management.' },
            'yellowing': { status: '⚠️ Possible Nutrient Deficiency (Iron)', treatment: 'Apply iron sulfate or chelated iron solution.' },
            'spots': { status: '⚠️ Possible Brown Leaf Spot', treatment: 'Spray Trichoderma or Pseudomonas solution.' },
            'wilting': { status: '🔴 Serious - Blast disease suspected', treatment: 'Apply Tricyclazole immediately. Reduce nitrogen fertilizer.' }
        }
    };

    const hindiDiseases = {
        'wheat': {
            'healthy': { status: '✅ कोई रोग नहीं मिला', treatment: 'नियमित देखभाल और निगरानी जारी रखें।' },
            'yellowing': { status: '⚠️ पीला रतुआ संक्रमण संभव', treatment: 'फफूंदनाशक का छिड़काव करें। प्रोपिकोनाजोल या हेक्साकोनाजोल का उपयोग करें।' },
            'spots': { status: '⚠️ सेप्टोरिया पत्ती धब्बा संभव', treatment: 'तुरंत मैंकोजेब या कार्बेन्डाजिम का छिड़काव करें।' },
            'wilting': { status: '🔴 गंभीर - जड़ सड़न की आशंका', treatment: 'जल निकासी सुधारें और पानी कम करें। तुरंत कृषि विशेषज्ञ से संपर्क करें।' }
        },
        'rice': {
            'healthy': { status: '✅ कोई रोग नहीं मिला', treatment: 'उचित जल स्तर और पोषक प्रबंधन बनाए रखें।' },
            'yellowing': { status: '⚠️ पोषक तत्वों की कमी (लोहा) संभव', treatment: 'आयरन सल्फेट या चिलेटेड आयरन घोल डालें।' },
            'spots': { status: '⚠️ भूरा पत्ती धब्बा संभव', treatment: 'ट्राइकोडर्मा या स्यूडोमोनास घोल का छिड़काव करें।' },
            'wilting': { status: '🔴 गंभीर - झुलसा रोग की आशंका', treatment: 'तुरंत ट्राइसाइक्लाजोल डालें। नाइट्रोजन उर्वरक कम करें।' }
        }
    };
    
    const punjabiDiseases = {
        wheat: {
            healthy: { status: '✅ ਕੋਈ ਬਿਮਾਰੀ ਨਹੀਂ ਮਿਲੀ', treatment: 'ਨਿਯਮਿਤ ਦੇਖਭਾਲ ਅਤੇ ਨਿਗਰਾਨੀ ਜਾਰੀ ਰੱਖੋ।' },
            yellowing: { status: '⚠️ ਪੀਲਾ ਰਤੂਆ ਹੋਣ ਦੀ ਸੰਭਾਵਨਾ', treatment: 'ਫਫੂੰਦਨਾਸ਼ਕ ਦੀ ਸਲਾਹ ਲਈ ਖੇਤੀ ਮਾਹਿਰ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।' },
            spots: { status: '⚠️ ਪੱਤੇ ਦੇ ਧੱਬੇ ਹੋਣ ਦੀ ਸੰਭਾਵਨਾ', treatment: 'ਤੁਰੰਤ ਖੇਤੀ ਮਾਹਿਰ ਦੀ ਸਲਾਹ ਲਓ।' },
            wilting: { status: '🔴 ਗੰਭੀਰ - ਜੜ੍ਹਾਂ ਦੇ ਸੜਨ ਦੀ ਸੰਭਾਵਨਾ', treatment: 'ਪਾਣੀ ਦੀ ਨਿਕਾਸੀ ਸੁਧਾਰੋ ਅਤੇ ਤੁਰੰਤ ਮਾਹਿਰ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।' }
        },
        rice: {
            healthy: { status: '✅ ਕੋਈ ਬਿਮਾਰੀ ਨਹੀਂ ਮਿਲੀ', treatment: 'ਪਾਣੀ ਦਾ ਪੱਧਰ ਅਤੇ ਪੋਸ਼ਕ ਪ੍ਰਬੰਧਨ ਠੀਕ ਰੱਖੋ।' },
            yellowing: { status: '⚠️ ਪੋਸ਼ਕ ਤੱਤਾਂ ਦੀ ਕਮੀ ਦੀ ਸੰਭਾਵਨਾ', treatment: 'ਖੇਤੀ ਮਾਹਿਰ ਦੀ ਸਲਾਹ ਨਾਲ ਇਲਾਜ ਕਰੋ।' },
            spots: { status: '⚠️ ਭੂਰੇ ਪੱਤੇ ਦੇ ਧੱਬੇ ਦੀ ਸੰਭਾਵਨਾ', treatment: 'ਖੇਤੀ ਮਾਹਿਰ ਨਾਲ ਸਲਾਹ ਕਰੋ।' },
            wilting: { status: '🔴 ਗੰਭੀਰ - ਝੁਲਸਾ ਰੋਗ ਦੀ ਸੰਭਾਵਨਾ', treatment: 'ਤੁਰੰਤ ਖੇਤੀ ਮਾਹਿਰ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।' }
        }
    };

    const diseaseData = currentLanguage === 'hi' ? hindiDiseases : currentLanguage === 'pa' ? punjabiDiseases : diseases;
    if (diseaseData[cropType] && diseaseData[cropType][leafCondition]) {
        const disease = diseaseData[cropType][leafCondition];
        document.getElementById('diseaseStatus').textContent = disease.status;
        document.getElementById('treatmentAdvice').textContent = disease.treatment;
    } else {
        document.getElementById('diseaseStatus').textContent = currentLanguage === 'hi' ? 'रोग का पता नहीं लगाया जा सका' : currentLanguage === 'pa' ? 'ਬਿਮਾਰੀ ਦਾ ਪਤਾ ਨਹੀਂ ਲੱਗ ਸਕਿਆ' : 'Unable to determine disease';
        document.getElementById('treatmentAdvice').textContent = currentLanguage === 'hi' ? 'कृपया पौधा रोग विशेषज्ञ से सलाह लें।' : currentLanguage === 'pa' ? 'ਕਿਰਪਾ ਕਰਕੇ ਖੇਤੀ ਮਾਹਿਰ ਨਾਲ ਸਲਾਹ ਕਰੋ।' : 'Please consult with a plant pathologist.';
    }
    
    document.getElementById('diseaseResult').classList.remove('hidden');
}

function predictYield() {
    const crop = document.getElementById('yieldCrop').value;
    const area = parseFloat(document.getElementById('landArea').value);
    const fertilizer = parseFloat(document.getElementById('fertilizerUsed').value);
    
    if (!crop || !area || !fertilizer) {
        alert('Please fill all fields');
        return;
    }
    
    // Simple prediction model
    let yieldPerAcre = 20; // base yield in quintals
    
    if (fertilizer > 60) yieldPerAcre += 8;
    else if (fertilizer > 40) yieldPerAcre += 4;
    
    let quality = 'Average';
    if (fertilizer < 40) quality = 'Good (Organic)';
    else if (fertilizer < 60) quality = 'Good';
    else quality = 'High Yield';
    
    const totalYield = (yieldPerAcre * area).toFixed(2);
    
    document.getElementById('predictedYield').textContent = totalYield + ' ' + resultText('yield-unit') + ' (' + yieldPerAcre.toFixed(1) + ' ' + resultText('yield-acre') + ')';
    document.getElementById('yieldQuality').textContent = resultText(quality === 'Average' ? 'quality-average' : quality === 'Good (Organic)' ? 'quality-organic' : quality === 'Good' ? 'quality-good' : 'quality-high');
    document.getElementById('yieldResult').classList.remove('hidden');
}

function getPriceData() {
    const crop = document.getElementById('priceaCrop').value;
    const mandi = document.getElementById('mandi').value;
    
    const prices = {
        'wheat': { 'delhi': { current: 2450, trend: '📈 Upward', time: 'In 2-3 weeks' },
                   'punjab': { current: 2400, trend: '📈 Upward', time: 'In 1-2 weeks' },
                   'gujarati': { current: 2500, trend: '➡️ Stable', time: 'Wait for harvest' } },
        'rice': { 'delhi': { current: 3200, trend: '📉 Downward', time: 'Sell immediately' },
                  'punjab': { current: 3100, trend: '📉 Downward', time: 'Sell in 1 week' },
                  'gujarati': { current: 3300, trend: '📈 Upward', time: 'Wait 1-2 weeks' } }
    };

    const priceTextKeys = {
        '📈 Upward': 'price-upward',
        '📉 Downward': 'price-downward',
        '➡️ Stable': 'price-stable',
        'In 2-3 weeks': 'price-2-3-weeks',
        'In 1-2 weeks': 'price-1-2-weeks',
        'Wait for harvest': 'price-wait-harvest',
        'Sell immediately': 'price-immediate',
        'Sell in 1 week': 'price-1-week',
        'Wait 1-2 weeks': 'price-1-2-weeks'
    };
    
    if (prices[crop] && prices[crop][mandi]) {
        const price = prices[crop][mandi];
        document.getElementById('currentPrice').textContent = '₹' + price.current;
        const trendIcon = price.trend.startsWith('📈') ? '📈 ' : price.trend.startsWith('📉') ? '📉 ' : '➡️ ';
        document.getElementById('priceTrend').textContent = trendIcon + resultText(priceTextKeys[price.trend]);
        document.getElementById('bestTimeToSell').textContent = resultText(priceTextKeys[price.time]);
    }
    
    document.getElementById('priceResult').classList.remove('hidden');
}

function applyScheme(scheme) {
    const schemes = {
        'PM-KISAN': 'Eligible farmers receive ₹6,000 annually in 3 installments. Register at pmkisan.gov.in',
        'PMFBY': 'Crop insurance at nominal premiums. Contact your nearest bank or agriculture office.',
        'SHC': 'Get free soil testing for nutrient analysis. Visit your agricultural extension center.',
        'eNAM': 'Sell directly online without middlemen. Register on e-nam.gov.in with your mobile number.'
    };
    
    if (schemes[scheme]) {
        alert('📋 ' + scheme + '\n\n' + schemes[scheme] + '\n\n💡 Tip: Contact your local agriculture officer for more details and assistance.');
    }
}
