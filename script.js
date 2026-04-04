// ============================================
// SMART FARMING AI - FRONTEND WITH BACKEND API
// Connected to Flask Backend Server
// ============================================

// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// ===== CROP RECOMMENDATION =====
function getRecommendation() {
    const soilType = document.getElementById('soilType').value;
    const temperature = parseInt(document.getElementById('temperature').value);
    const rainfall = parseInt(document.getElementById('rainfall').value);

    if (!soilType || !temperature || !rainfall) {
        showAlert('Please fill all fields', 'error');
        return;
    }

    fetch(`${API_BASE_URL}/crop-recommendation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            soil_type: soilType,
            temperature: temperature,
            rainfall: rainfall
        })
    })
    .then(r => r.json())
    .then(data => {
        if (data.success) {
            const resultBox = document.getElementById('cropResult');
            document.getElementById('recommendedCrop').innerHTML = `
                <strong>${data.crop}</strong><br>
                <small style="color: #666;">Confidence: ${data.confidence}</small>
            `;
            resultBox.classList.remove('hidden');
            resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    })
    .catch(err => showAlert('Backend not available. Run: python app.py', 'warning'));
}

// ===== SMART IRRIGATION =====
function updateMoisture(value) {
    document.getElementById('moistureValue').textContent = value + '%';
}

function getIrrigationAdvice() {
    const moistureLevel = parseInt(document.getElementById('moistureLevel').value);
    const temperature = parseInt(document.getElementById('cropTemp').value);

    if (!temperature) {
        showAlert('Please enter temperature', 'error');
        return;
    }

    fetch(`${API_BASE_URL}/irrigation-advice`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            moisture_level: moistureLevel,
            temperature: temperature
        })
    })
    .then(r => r.json())
    .then(data => {
        if (data.success) {
            const resultBox = document.getElementById('irrigationResult');
            document.getElementById('irrigationStatus').innerHTML = `<strong>${data.status}</strong>`;
            document.getElementById('waterAdvice').innerHTML = `
                <strong>Water Amount:</strong> ${data.water_amount}<br>
                <strong>Advice:</strong> ${data.advice}<br>
                <strong>Next Check:</strong> ${data.next_check_hours} hours
            `;
            resultBox.classList.remove('hidden');
            resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    })
    .catch(err => showAlert('Backend not available', 'warning'));
}

// ===== WEATHER ALERTS =====
function getWeatherAlerts() {
    const region = document.getElementById('region').value;

    if (!region) {
        showAlert('Please select a region', 'error');
        return;
    }

    fetch(`${API_BASE_URL}/weather-alerts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ region: region })
    })
    .then(r => r.json())
    .then(data => {
        if (data.success) {
            let alertsHTML = `
                <div style="background: #fff3cd; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                    <p style="margin: 0.5rem 0;">🌡️ <strong>Temperature:</strong> ${data.temperature}</p>
                    <p style="margin: 0.5rem 0;">💧 <strong>Humidity:</strong> ${data.humidity}</p>
                    <p style="margin: 0.5rem 0;">💨 <strong>Wind Speed:</strong> ${data.wind_speed}</p>
                </div>
                <p><strong>⚠️ Alerts:</strong></p>
                <ul style="margin-left: 1.5rem;">
            `;
            data.alerts.forEach(alert => {
                alertsHTML += `<li>${alert}</li>`;
            });
            alertsHTML += `
                </ul>
                <p style="background: #d4edda; padding: 0.75rem; border-radius: 5px; margin-top: 1rem;">
                    <strong>✅ ${data.recommendation}</strong>
                </p>
            `;
            const resultBox = document.getElementById('weatherResult');
            document.getElementById('weatherContent').innerHTML = alertsHTML;
            resultBox.classList.remove('hidden');
            resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    })
    .catch(err => showAlert('Backend not available', 'warning'));
}

// ===== DISEASE DETECTION =====
function detectDisease() {
    const cropType = document.getElementById('cropType').value;
    const leafCondition = document.getElementById('leafCondition').value;

    if (!cropType || !leafCondition) {
        showAlert('Please select both crop and leaf condition', 'error');
        return;
    }

    fetch(`${API_BASE_URL}/disease-detection`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            crop_type: cropType,
            leaf_condition: leafCondition
        })
    })
    .then(r => r.json())
    .then(data => {
        if (data.success) {
            const resultBox = document.getElementById('diseaseResult');
            document.getElementById('diseaseStatus').innerHTML = `
                <strong>${data.status}</strong><br>
                <small>Severity: ${data.severity.toUpperCase()}</small>
            `;
            document.getElementById('treatmentAdvice').innerHTML = `
                ${data.treatment}<br><br>
                <strong>Cost:</strong> ${data.estimated_cost}
            `;
            resultBox.classList.remove('hidden');
            resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    })
    .catch(err => showAlert('Backend not available', 'warning'));
}

// ===== YIELD PREDICTION =====
function predictYield() {
    const cropName = document.getElementById('yieldCrop').value;
    const landArea = parseFloat(document.getElementById('landArea').value);
    const fertilizerUsed = parseFloat(document.getElementById('fertilizerUsed').value);

    if (!cropName || !landArea || !fertilizerUsed || landArea < 1) {
        showAlert('Please fill all fields correctly', 'error');
        return;
    }

    fetch(`${API_BASE_URL}/yield-prediction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            crop_name: cropName,
            land_area: landArea,
            fertilizer_used: fertilizerUsed
        })
    })
    .then(r => r.json())
    .then(data => {
        if (data.success) {
            const resultBox = document.getElementById('yieldResult');
            document.getElementById('predictedYield').innerHTML = `
                <strong>${data.total_yield}</strong><br>
                <small>(${data.yield_per_acre} per acre)</small>
            `;
            document.getElementById('yieldQuality').innerHTML = `
                <strong>${data.quality}</strong><br>
                <strong>Revenue:</strong> ${data.total_revenue}<br>
                <strong>Profit:</strong> ${data.profit}<br>
                <strong>ROI:</strong> ${data.roi_percent}
            `;
            resultBox.classList.remove('hidden');
            resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    })
    .catch(err => showAlert('Backend not available', 'warning'));
}

// ===== MARKET PRICE PREDICTION =====
function getPriceData() {
    const crop = document.getElementById('priceaCrop').value;
    const mandi = document.getElementById('mandi').value;

    if (!crop || !mandi) {
        showAlert('Please select both crop and market', 'error');
        return;
    }

    fetch(`${API_BASE_URL}/price-prediction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            crop: crop,
            mandi: mandi
        })
    })
    .then(r => r.json())
    .then(data => {
        if (data.success) {
            const resultBox = document.getElementById('priceResult');
            document.getElementById('currentPrice').innerHTML = `<strong>${data.current_price} per quintal</strong>`;
            document.getElementById('bestTimeToSell').innerHTML = `
                <strong>${data.best_time_to_sell}</strong><br>
                <small>${data.recommendation}</small>
            `;
            document.getElementById('priceTrend').innerHTML = `
                <strong>Predicted (30 days):</strong> ${data.predicted_price_30days}<br>
                <small>${data.trend} - ${data.price_change_percent}</small>
            `;
            resultBox.classList.remove('hidden');
            resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    })
    .catch(err => showAlert('Backend not available', 'warning'));
}

// ===== GOVERNMENT SCHEMES =====
function applyScheme(scheme) {
    fetch(`${API_BASE_URL}/schemes`)
    .then(r => r.json())
    .then(data => {
        const schemeInfo = data.schemes[scheme];
        if (schemeInfo) {
            const info = `
${scheme} SCHEME DETAILS

Amount: ${schemeInfo.amount}
Installments: ${schemeInfo.installments}
Eligibility: ${schemeInfo.eligibility}
Website: ${schemeInfo.website}
            `;
            alert(info);
        }
    })
    .catch(err => {
        alert(`${scheme}\n\nContact local agricultural office for details.`);
    });
}

// ===== UTILITY FUNCTIONS =====
function scrollToDemo() {
    document.getElementById('demo').scrollIntoView({ behavior: 'smooth' });
}

function showAlert(message, type = 'info') {
    const alertBox = document.createElement('div');
    alertBox.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#e74c3c' : type === 'warning' ? '#f39c12' : '#27ae60'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;
    alertBox.textContent = message;
    document.body.appendChild(alertBox);
    setTimeout(() => alertBox.remove(), 3000);
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ SmartFarm AI Loaded! 🌾');
    
    // Check backend connection
    fetch(`${API_BASE_URL}/health`)
    .then(r => r.json())
    .then(data => {
        console.log('✅ Backend Connected');
        showAlert('Backend server connected!', 'success');
    })
    .catch(err => {
        console.log('⚠️ Backend not connected');
    });

    // Smooth scroll navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.getElementById(this.getAttribute('href').substring(1));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Scroll animations
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideIn 0.5s ease forwards';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card, .demo-card').forEach(card => {
        observer.observe(card);
    });
});

window.addEventListener('load', function() {
    console.log('🌾 Ready for interaction!');
});

// ===== SMART IRRIGATION LOGIC =====
function updateMoisture(value) {
    document.getElementById('moistureValue').textContent = value + '%';
}

function getIrrigationAdvice() {
    const moistureLevel = parseInt(document.getElementById('moistureLevel').value);
    const temperature = parseInt(document.getElementById('cropTemp').value);

    // Validate inputs
    if (!temperature) {
        showAlert('Please enter temperature', 'error');
        return;
    }

    let status = '';
    let waterAdvice = '';
    let waterAmountHTML = '';

    // Irrigation Decision Logic with water calculations
    if (moistureLevel < 30) {
        status = '🔴 URGENT - Need Irrigation NOW';
        if (temperature > 35) {
            waterAdvice = 'Provide 40-50mm water immediately. High temperature increases evaporation.';
            waterAmountHTML = '💧 Water needed: 40-50mm | Time: Immediately';
        } else if (temperature > 25) {
            waterAdvice = 'Provide 30-40mm water in the next 2-3 hours.';
            waterAmountHTML = '💧 Water needed: 30-40mm | Time: 2-3 hours';
        } else {
            waterAdvice = 'Provide 25-30mm water within 6 hours.';
            waterAmountHTML = '💧 Water needed: 25-30mm | Time: Within 6 hours';
        }
    } else if (moistureLevel >= 30 && moistureLevel < 50) {
        status = '🟡 MODERATE - Monitor Closely';
        waterAdvice = 'Water may be needed in 1-2 days depending on weather. Keep monitoring.';
        waterAmountHTML = '📊 Status: Monitor | Next check: 24 hours';
    } else if (moistureLevel >= 50 && moistureLevel < 70) {
        status = '🟢 GOOD - No Action Needed';
        waterAdvice = 'Soil has adequate moisture. Continue routine monitoring.';
        waterAmountHTML = '✅ Status: Optimal | Next check: 48 hours';
    } else {
        status = '🔵 CAUTION - Excess Moisture';
        waterAdvice = 'Avoid irrigation. Risk of waterlogging. Ensure proper drainage.';
        waterAmountHTML = '⚠️ Status: High | Action: Improve drainage';
    }

    // Show result
    const resultBox = document.getElementById('irrigationResult');
    document.getElementById('irrigationStatus').innerHTML = `<strong>${status}</strong>`;
    document.getElementById('waterAdvice').innerHTML = `<strong>💡 Advice:</strong> ${waterAdvice}<br><strong>${waterAmountHTML}</strong>`;
    resultBox.classList.remove('hidden');
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ===== WEATHER ALERTS LOGIC =====
function getWeatherAlerts() {
    const region = document.getElementById('region').value;

    if (!region) {
        showAlert('Please select a region', 'error');
        return;
    }

    let alerts = '';

    const weatherData = {
        north: {
            temp: '8-22°C',
            humidity: '45-65%',
            windSpeed: '15-20 km/h',
            alerts: ['❄️ Frost Alert: Minimum temperature 8°C expected', '☔ Light showers expected next 2 days', '💨 Wind speed: 15-20 km/h with gusts'],
            prevAlerts: '🌪️ Hailstorm warning (Tomorrow 2-4 PM)',
            recommendation: '🌾 Good for wheat planting operations'
        },
        south: {
            temp: '22-35°C',
            humidity: '60-75%',
            windSpeed: '10-15 km/h',
            alerts: ['☀️ High UV index (Level 9)', '🌊 Monsoon approaching in 5 days', '💨 Squalls possible in evening hours'],
            prevAlerts: '⛈️ Heavy rainfall (3 days ago - 150mm)',
            recommendation: '🌱 Ideal for rice transplantation'
        },
        east: {
            temp: '25-32°C',
            humidity: '70-85%',
            windSpeed: '20-25 km/h',
            alerts: ['☔ Heavy rainfall alert (140mm expected)', '💧 High humidity (80-85%)', '🌪️ Strong winds expected (Gust: 30 km/h)'],
            prevAlerts: '🌀 Cyclonic formation being monitored',
            recommendation: '⚠️ Avoid outdoor farm activities'
        },
        west: {
            temp: '28-38°C',
            humidity: '25-40%',
            windSpeed: '25-30 km/h',
            alerts: ['☀️ Heatwave conditions (Temp: 38°C)', '💨 Dry winds (30 km/h velocity)', '🌤️ Clear skies expected for 7 days'],
            prevAlerts: '🌪️ Dust storms (Last week)',
            recommendation: '💧 Increase irrigation frequency'
        }
    };

    const data = weatherData[region] || weatherData.north;

    let alertsHTML = `
        <div style="background: #fff3cd; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
            <p style="margin: 0.5rem 0;">🌡️ <strong>Temperature:</strong> ${data.temp}</p>
            <p style="margin: 0.5rem 0;">💧 <strong>Humidity:</strong> ${data.humidity}</p>
            <p style="margin: 0.5rem 0;">💨 <strong>Wind Speed:</strong> ${data.windSpeed}</p>
        </div>
        <p><strong>⚠️ Current Weather Alerts:</strong></p>
        <ul style="margin-left: 1.5rem;">
    `;

    data.alerts.forEach(alert => {
        alertsHTML += `<li style="margin-bottom: 0.5rem;">${alert}</li>`;
    });

    alertsHTML += `
        </ul>
        <p style="margin-top: 1rem;"><strong>📰 Recent:</strong> ${data.prevAlerts}</p>
        <p style="background: #d4edda; padding: 0.75rem; border-radius: 5px; margin-top: 1rem;"><strong>✅ Recommendation:</strong> ${data.recommendation}</p>
    `;

    const resultBox = document.getElementById('weatherResult');
    document.getElementById('weatherContent').innerHTML = alertsHTML;
    resultBox.classList.remove('hidden');
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ===== DISEASE & PEST DETECTION LOGIC =====
function detectDisease() {
    const cropType = document.getElementById('cropType').value;
    const leafCondition = document.getElementById('leafCondition').value;

    if (!cropType || !leafCondition) {
        showAlert('Please select both crop and leaf condition', 'error');
        return;
    }

    let status = '';
    let treatment = '';
    let severity = '';

    // Disease Detection Logic
    if (leafCondition === 'healthy') {
        status = '✅ CROP IS HEALTHY - No disease detected';
        treatment = '✓ Continue regular monitoring<br>✓ Maintain proper irrigation schedule<br>✓ Apply preventive sprays monthly';
        severity = 'HEALTHY';
    } else if (leafCondition === 'yellowing') {
        status = '⚠️ MEDIUM RISK - Nutrient Deficiency or Fungal Infection';
        severity = 'MEDIUM';
        if (cropType === 'wheat') {
            treatment = '🔧 Treatment Plan:<br>1. Apply Urea (50kg/acre) for Nitrogen deficiency<br>2. Spray Mancozeb 75% WP (2.5g/L) for fungal infection<br>3. Repeat after 7 days<br>💰 Estimated Cost: ₹500-800';
        } else if (cropType === 'rice') {
            treatment = '🔧 Treatment Plan:<br>1. Identify deficiency type (N/P/K)<br>2. Spray Carbendazim 50% WP (500ml in 200L water) for rice blast<br>3. Apply NPK (20:20:20) fertilizer<br>💰 Estimated Cost: ₹400-600';
        } else if (cropType === 'cotton') {
            treatment = '🔧 Treatment Plan:<br>1. Apply Iron chelate for iron deficiency<br>2. Spray Trichoderma for pest management<br>3. Improve drainage<br>💰 Estimated Cost: ₹300-500';
        } else {
            treatment = '🔧 Treatment Plan:<br>1. Increase N-P-K fertilizer application<br>2. Apply broad-spectrum fungicide<br>3. Monitor for spread<br>💰 Estimated Cost: ₹500-700';
        }
    } else if (leafCondition === 'spots') {
        status = '🔴 HIGH RISK - Leaf Spot Disease Detected';
        severity = 'HIGH';
        if (cropType === 'wheat') {
            treatment = '🔧 Urgent Treatment:<br>1. Spray Hexaconazole 5% EC (1.5ml/L) immediately<br>2. Remove infected leaves carefully<br>3. Avoid overhead irrigation<br>4. Repeat spray after 10 days<br>💰 Estimated Cost: ₹800-1200';
        } else if (cropType === 'rice') {
            treatment = '🔧 Urgent Treatment:<br>1. Apply Copper fungicide (Bordeaux mixture)<br>2. Improve field drainage to reduce humidity<br>3. Remove stubble from infected areas<br>4. Spray every 7-10 days<br>💰 Estimated Cost: ₹600-900';
        } else if (cropType === 'cotton') {
            treatment = '🔧 Urgent Treatment:<br>1. Spray Mancozeb + Metalaxyl combination<br>2. Quarantine affected area<br>3. Monitor spread closely<br>4. Increase ventilation between plants<br>💰 Estimated Cost: ₹900-1300';
        } else {
            treatment = '🔧 Urgent Treatment:<br>1. Use broad-spectrum fungicide<br>2. Isolate infected plants<br>3. Improve air circulation<br>4. Remove affected leaves<br>💰 Estimated Cost: ₹700-1000';
        }
    } else if (leafCondition === 'wilting') {
        status = '🔴 CRITICAL - Root Rot or Wilt Disease';
        severity = 'CRITICAL';
        treatment = '🚨 EMERGENCY ACTION REQUIRED:<br>1. REDUCE IRRIGATION IMMEDIATELY<br>2. Apply Trichoderma to soil urgently<br>3. Consult local agricultural officer ASAP<br>4. Consider crop rotation next season<br>5. Drain excess water from field<br>⚠️ Risk: May require crop replacement<br>💰 Estimated Cost: ₹1500-2500';
    }

    // Show result
    const resultBox = document.getElementById('diseaseResult');
    document.getElementById('diseaseStatus').innerHTML = `<strong>${status}</strong><br><small style="color: #e74c3c;">Severity: ${severity}</small>`;
    document.getElementById('treatmentAdvice').innerHTML = treatment;
    resultBox.classList.remove('hidden');
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ===== YIELD PREDICTION LOGIC =====
function predictYield() {
    const cropName = document.getElementById('yieldCrop').value;
    const landArea = parseFloat(document.getElementById('landArea').value);
    const fertilizerUsed = parseFloat(document.getElementById('fertilizerUsed').value);

    if (!cropName || !landArea || !fertilizerUsed || landArea < 1) {
        showAlert('Please fill all fields with valid values', 'error');
        return;
    }

    // ML model for yield prediction
    let yieldPerAcre = 0;
    let quality = '';
    let totalCost = 0;
    let potentialProfit = 0;

    // Base yields for different crops (quintals per acre)
    const baseYields = {
        'wheat': 40,
        'rice': 45,
        'maize': 35,
        'cotton': 15,
        'sugarcane': 50,
        'potato': 200,
        'onion': 150,
        'pulses': 18,
        'mustard': 12
    };

    // Market prices (₹ per quintal)
    const marketPrices = {
        'wheat': 2100,
        'rice': 3200,
        'maize': 1800,
        'cotton': 5200,
        'sugarcane': 350,
        'potato': 1200,
        'onion': 1600,
        'pulses': 4500,
        'mustard': 4800
    };

    const baseCrop = cropName.toLowerCase();
    yieldPerAcre = baseYields[baseCrop] || 40;

    // Adjust based on fertilizer application
    if (fertilizerUsed >= 50) {
        yieldPerAcre = yieldPerAcre * 1.2;
        quality = 'A+ Grade (Premium Quality)';
        totalCost = landArea * 5000;
    } else if (fertilizerUsed >= 35) {
        yieldPerAcre = yieldPerAcre * 1.1;
        quality = 'A Grade (Good Quality)';
        totalCost = landArea * 4000;
    } else if (fertilizerUsed >= 20) {
        yieldPerAcre = yieldPerAcre * 1.0;
        quality = 'B Grade (Average Quality)';
        totalCost = landArea * 3000;
    } else {
        yieldPerAcre = yieldPerAcre * 0.8;
        quality = 'C Grade (Below Average)';
        totalCost = landArea * 2000;
    }

    // Calculate totals
    const totalYield = (yieldPerAcre * landArea).toFixed(2);
    const price = marketPrices[baseCrop] || 2500;
    potentialProfit = (totalYield * price) - totalCost;

    // Show result
    const resultBox = document.getElementById('yieldResult');
    document.getElementById('predictedYield').innerHTML = `
        <strong>${totalYield} Quintals</strong> 
        <br><small>(${yieldPerAcre.toFixed(2)} per acre)</small>
    `;
    document.getElementById('yieldQuality').innerHTML = `
        <strong>${quality}</strong>
        <br><small>💰 Estimated Revenue: ₹${(totalYield * price).toFixed(0)}</small>
        <br><small>📊 Profit (after costs): ₹${potentialProfit.toFixed(0)}</small>
    `;
    resultBox.classList.remove('hidden');
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ===== MARKET PRICE PREDICTION LOGIC =====
function getPriceData() {
    const crop = document.getElementById('priceaCrop').value;
    const mandi = document.getElementById('mandi').value;

    if (!crop || !mandi) {
        showAlert('Please select both crop and market', 'error');
        return;
    }

    let currentPrice = 0;
    let bestTime = '';
    let trend = '';
    let priceChangePercent = 0;

    // Sample market data (in ₹ per quintal) with variations
    const marketData = {
        wheat: { delhi: 2100, punjab: 2000, gujarati: 2050 },
        rice: { delhi: 3200, punjab: 3100, gujarati: 3150 },
        cotton: { delhi: 5200, punjab: 5000, gujarati: 5100 },
        potato: { delhi: 1200, punjab: 1100, gujarati: 1150 }
    };

    // Historical data for trend prediction
    const trendData = {
        wheat: { time: 'March-April (Peak Season)', trend: '📈 Prices likely to increase 5-8%', forecast: 'Strong demand in summer months', lastPrice: 2000, change: 5 },
        rice: { time: 'February-March (Best)', trend: '📊 Prices stable, slight fluctuations', forecast: 'Moderate trading activity', lastPrice: 3100, change: 3 },
        cotton: { time: 'October-November', trend: '📉 May decline after harvest', forecast: 'High supply expected', lastPrice: 5400, change: -4 },
        potato: { time: 'April-June (High)', trend: '📈 Expect 10-15% price increase', forecast: 'Limited stock + summer demand', lastPrice: 1100, change: 12 }
    };

    if (marketData[crop] && marketData[crop][mandi]) {
        currentPrice = marketData[crop][mandi];
    }

    const trend_info = trendData[crop] || { time: 'Next 2-3 weeks', trend: '📊 Monitor market closely', forecast: 'Market conditions variable', lastPrice: 2500, change: 2 };
    bestTime = trend_info.time;
    trend = trend_info.trend;
    priceChangePercent = trend_info.change;

    const predictedPrice = (currentPrice * (1 + priceChangePercent / 100)).toFixed(0);

    // Show result
    const resultBox = document.getElementById('priceResult');
    document.getElementById('currentPrice').innerHTML = `<strong>₹${currentPrice}</strong> per quintal`;
    document.getElementById('bestTimeToSell').innerHTML = `<strong>${bestTime}</strong><br><small>${trend}</small>`;
    document.getElementById('priceTrend').innerHTML = `
        <strong>Predicted Price (30 days):</strong> ₹${predictedPrice}
        <br><small style="color: ${priceChangePercent > 0 ? '#27ae60' : '#e74c3c'};">
            ${priceChangePercent > 0 ? '📈' : '📉'} Price change: ${priceChangePercent > 0 ? '+' : ''}${priceChangePercent}%
        </small>
        <br><small>💡 ${trend_info.forecast}</small>
    `;
    resultBox.classList.remove('hidden');
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ===== GOVERNMENT SCHEMES INFORMATION =====
function applyScheme(scheme) {
    const schemes = {
        'PM-KISAN': {
            amount: '₹6,000 per year',
            installments: '3 installments of ₹2,000 each',
            eligibility: 'All land-holding farmer families (up to 2 hectares)',
            howToApply: 'Apply at https://pmkisan.gov.in or nearest CSC',
            docs: '✓ Aadhar Card\n✓ Land records\n✓ Bank account details',
            benefits: 'Direct income support to improve farming'
        },
        'PMFBY': {
            amount: 'Claim up to 70% of crop loss',
            installments: 'Premium: 1.5%-5.5% of sum insured',
            eligibility: 'All farmers with notified crops',
            howToApply: 'Link with bank. Insurance activated automatically',
            docs: '✓ Land records\n✓ Crop details\n✓ Bank account',
            benefits: 'Protection against crop losses from natural calamities'
        },
        'SHC': {
            amount: 'Free soil testing (once every 2 years)',
            installments: 'No cost to farmers',
            eligibility: 'All farmers',
            howToApply: 'Visit local Krishi Vigyan Kendra or Agricultural Office',
            docs: '✓ Land ownership proof\n✓ Soil sample',
            benefits: 'Improve soil fertility and optimize fertilizer use'
        },
        'eNAM': {
            amount: 'Direct market access - no middlemen',
            installments: 'Minimal transaction charges (1-2%)',
            eligibility: 'Registered farmers with PAN/Aadhar',
            howToApply: 'Register at https://enam.gov.in with details',
            docs: '✓ Farmer ID\n✓ Bank account\n✓ Phone number',
            benefits: 'Better prices by selling directly to buyers'
        }
    };

    const schemeInfo = schemes[scheme] || schemes['PM-KISAN'];
    
    const detailedInfo = `
╔════════════════════════════════════════════════════════════════╗
║           ${scheme.toUpperCase()} SCHEME DETAILS                    ║
╚════════════════════════════════════════════════════════════════╝

💰 FINANCIAL BENEFIT:
   Amount: ${schemeInfo.amount}
   Installments: ${schemeInfo.installments}

👥 ELIGIBILITY:
   ${schemeInfo.eligibility}

📝 REQUIRED DOCUMENTS:
${schemeInfo.docs}

🔗 HOW TO APPLY:
   ${schemeInfo.howToApply}

✅ KEY BENEFITS:
   ${schemeInfo.benefits}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 TIP: Contact your nearest Agricultural Office or 
        Gram Panchayat for personalized assistance!
    `;

    alert(detailedInfo);
}

// ===== SMOOTH SCROLL FUNCTION =====
function scrollToDemo() {
    const demoSection = document.getElementById('demo');
    if (demoSection) {
        demoSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== ALERT FUNCTION =====
function showAlert(message, type = 'info') {
    const alertBox = document.createElement('div');
    alertBox.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#e74c3c' : type === 'success' ? '#27ae60' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;
    alertBox.textContent = message;
    document.body.appendChild(alertBox);
    
    setTimeout(() => alertBox.remove(), 3000);
}

// ===== SMOOTH SCROLL FOR NAVIGATION LINKS =====
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== INITIALIZE PAGE =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ SmartFarm AI Demo Loaded Successfully! 🌾');
    
    // Add animation to cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideIn 0.5s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .demo-card, .scheme-card').forEach(card => {
        observer.observe(card);
    });

    // Prevent form submission
    document.querySelectorAll('.demo-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
        });
    });
});

// ===== PAGE LOAD COMPLETE =====
window.addEventListener('load', function() {
    console.log('🌾 Page fully loaded! Ready for interactive demos.');
});
