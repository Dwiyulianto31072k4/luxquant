// =====================================================
// LUXQUANT - REFERRAL SYSTEM
// Version: 2.0 - Modular Structure
// =====================================================

console.log('🎁 LuxQuant Referral.js Loading...');

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if referral elements exist
    if (document.getElementById('referralCode')) {
        initReferralSystem();
    }
});

function initReferralSystem() {
    console.log('🎁 Initializing Referral System...');
    
    // Configuration
    const config = {
        originalPrice: 400,
        discountPercent: 5,
        validCodes: [
            '03451Lux', '02847Lux', '05632Lux', 
            '01258Lux', '09874Lux', '04569Lux',
            'SM138', 'MRCOWHALE', 'BHYUKNGLO', 
            'FARIDWHALEBTC', 'ERIKDI', 'thomatomb', 
            'tss07', 'brndn', 'febrian', 'crossteam', 
            'Neilsen', 'CYBRFI', 'ejeha', 'ndratraderalgo', 
            'DODO', 'CUANLAGI', 'scobedo'
        ],
        telegramAdmin: 'luxquantadmin'
    };
    
    config.discountPrice = config.originalPrice * (1 - config.discountPercent / 100);
    
    // State
    let isValidReferral = false;
    let generatedAccessCode = '';
    
    // DOM Elements
    const elements = {
        referralInput: document.getElementById('referralCode'),
        verifyBtn: document.getElementById('verifyBtn'),
        referralStatus: document.getElementById('referralStatus'),
        generatedCodeSection: document.getElementById('generatedCode'),
        accessCodeDisplay: document.getElementById('accessCodeDisplay'),
        copyBtn: document.getElementById('copyBtn'),
        accessBtn: document.getElementById('accessBtn'),
        priceAmount: document.getElementById('priceAmount'),
        discountInfo: document.getElementById('discountInfo'),
        btnText: document.getElementById('btnText')
    };
    
    // Event Listeners
    if (elements.verifyBtn) {
        elements.verifyBtn.addEventListener('click', verifyReferralCode);
    }
    
    if (elements.copyBtn) {
        elements.copyBtn.addEventListener('click', copyToClipboard);
    }
    
    if (elements.accessBtn) {
        elements.accessBtn.addEventListener('click', handleAccess);
    }
    
    if (elements.referralInput) {
        elements.referralInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') verifyReferralCode();
        });
    }
    
    // Functions
    function verifyReferralCode() {
        const enteredCode = elements.referralInput.value.trim();
        
        if (!enteredCode) {
            showStatus('Please enter a referral code to apply discount!', 'error');
            return;
        }
        
        if (config.validCodes.includes(enteredCode)) {
            // Generate access code
            const randomSuffix = generateRandomString(8);
            generatedAccessCode = `${enteredCode}-${randomSuffix}`;
            isValidReferral = true;
            
            // Update UI
            showStatus(`🎉 Valid KOL code! ${config.discountPercent}% discount applied successfully.`, 'success');
            showGeneratedCode(generatedAccessCode);
            showDiscountPrice();
            updateButtonText();
            
            // Disable inputs
            elements.referralInput.disabled = true;
            elements.verifyBtn.disabled = true;
            elements.verifyBtn.textContent = 'Applied ✅';
            
            console.log('✅ Referral code verified:', enteredCode);
        } else {
            showStatus('❌ Invalid referral code. You can still subscribe at regular price below.', 'error');
            hideGeneratedCode();
            hideDiscountPrice();
            isValidReferral = false;
        }
    }
    
    function showStatus(message, type) {
        elements.referralStatus.textContent = message;
        elements.referralStatus.className = `referral-status ${type}`;
    }
    
    function showGeneratedCode(code) {
        elements.accessCodeDisplay.textContent = code;
        elements.generatedCodeSection.classList.add('show');
    }
    
    function hideGeneratedCode() {
        elements.generatedCodeSection.classList.remove('show');
    }
    
    function showDiscountPrice() {
        elements.priceAmount.textContent = '380';
        elements.discountInfo.classList.add('show');
    }
    
    function hideDiscountPrice() {
        elements.priceAmount.textContent = '400';
        elements.discountInfo.classList.remove('show');
        resetButtonText();
    }
    
    function updateButtonText() {
        if (elements.btnText) {
            elements.btnText.textContent = `Get Discounted Access ($${config.discountPrice.toFixed(0)})`;
        }
    }
    
    function resetButtonText() {
        if (elements.btnText) {
            elements.btnText.textContent = 'Get Lifetime Access';
        }
    }
    
    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(generatedAccessCode);
            
            const originalText = elements.copyBtn.textContent;
            elements.copyBtn.textContent = 'Copied! ✅';
            elements.copyBtn.style.background = '#10b981';
            
            setTimeout(() => {
                elements.copyBtn.textContent = originalText;
                elements.copyBtn.style.background = '#ffd700';
            }, 2000);
        } catch (err) {
            console.error('Copy failed:', err);
            elements.copyBtn.textContent = 'Copy Failed';
        }
    }
    
    function handleAccess() {
        let message;
        
        if (isValidReferral && generatedAccessCode) {
            message = `Hi! I want to subscribe to LuxQuant Algorithm Lifetime Access with KOL discount.\n\n💰 Price: $${config.discountPrice.toFixed(0)} (${config.discountPercent}% KOL Discount)\n🎯 Access Code: ${generatedAccessCode}\n\nPlease process my subscription.`;
        } else {
            message = `Hi! I want to subscribe to LuxQuant Algorithm Lifetime Access.\n\n💰 Price: $${config.originalPrice} (Regular Price)\n\nPlease process my subscription.`;
        }
        
        const telegramUrl = `https://t.me/${config.telegramAdmin}?text=${encodeURIComponent(message)}`;
        window.open(telegramUrl, '_blank');
    }
    
    function generateRandomString(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    
    console.log('✅ Referral System initialized!');
}

console.log('✅ LuxQuant Referral.js Loaded!');
