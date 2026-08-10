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
        'hero-subtitle': 'From Soil to Sale – Powered by AI',
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

// Change Language Function
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    
    // Update language selector
    document.getElementById('languageSelector').value = lang;
    
    // Translate all elements
    translatePage();
}

// Translate Page Function
function translatePage() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
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

    let recommendation = 'Multi-crop farming recommended';
    if (temperature > 30 && rainfall > 1000) {
        recommendation = 'Rice - High yield potential';
    } else if (temperature > 25 && rainfall < 600) {
        recommendation = 'Wheat - Water efficient crop';
    } else if (temperature > 35 && rainfall < 400) {
        recommendation = 'Millet - Drought resistant';
    } else if (rainfall > 800) {
        recommendation = 'Sugarcane - Good rainfall area';
    }

    document.getElementById('recommendedCrop').textContent = recommendation;
    document.getElementById('cropResult').classList.remove('hidden');
}

function updateMoisture(value) {
    document.getElementById('moistureValue').textContent = value + '%';
}

function getIrrigationAdvice() {
    const moisture = parseInt(document.getElementById('moistureLevel').value);
    const temp = parseFloat(document.getElementById('cropTemp').value);
    
    let status = 'Normal';
    let advice = 'Continue regular watering';
    
    if (moisture < 30) {
        status = '⚠️ URGENT - Water required immediately';
        advice = 'Irrigate within 24 hours. Recommended: 40-50mm';
    } else if (moisture < 50) {
        status = '⚠️ Low moisture detected';
        advice = 'Schedule irrigation for next 2-3 days. Recommended: 25-30mm';
    } else if (moisture > 70) {
        status = 'Moisture sufficient - Skip irrigation';
        advice = 'Monitor for waterlogging. Wait 3-4 days before watering';
    }
    
    if (temp > 35) {
        advice += ' (High temp - increase frequency)';
    }
    
    document.getElementById('irrigationStatus').textContent = status;
    document.getElementById('waterAdvice').textContent = advice;
    document.getElementById('irrigationResult').classList.remove('hidden');
}

function getWeatherAlerts() {
    const region = document.getElementById('region').value;
    
    const alerts = {
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
    
    document.getElementById('weatherContent').innerHTML = alerts[region] || 'Weather data unavailable';
    document.getElementById('weatherResult').classList.remove('hidden');
}

function detectDisease() {
    const cropType = document.getElementById('cropType').value;
    const leafCondition = document.getElementById('leafCondition').value;
    
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
    
    if (diseases[cropType] && diseases[cropType][leafCondition]) {
        const disease = diseases[cropType][leafCondition];
        document.getElementById('diseaseStatus').textContent = disease.status;
        document.getElementById('treatmentAdvice').textContent = disease.treatment;
    } else {
        document.getElementById('diseaseStatus').textContent = 'Unable to determine disease';
        document.getElementById('treatmentAdvice').textContent = 'Please consult with a plant pathologist.';
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
    
    document.getElementById('predictedYield').textContent = totalYield + ' quintals (' + yieldPerAcre.toFixed(1) + ' per acre)';
    document.getElementById('yieldQuality').textContent = quality;
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
    
    if (prices[crop] && prices[crop][mandi]) {
        const price = prices[crop][mandi];
        document.getElementById('currentPrice').textContent = '₹' + price.current;
        document.getElementById('priceTrend').textContent = price.trend;
        document.getElementById('bestTimeToSell').textContent = price.time;
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
