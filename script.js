// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add active class to navigation links on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Bot Card Hover Effects
document.querySelectorAll('.bot-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Pricing Card Hover Effects
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.02)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    
    // Here you would typically send this data to a server
    console.log('Form submitted:', data);
    
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Add animation on scroll for bot cards
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.bot-card, .pricing-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial check and scroll event listener
animateOnScroll();
window.addEventListener('scroll', animateOnScroll);

// AI Chat functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    
    // Admin responses for purchase
    const adminResponses = {
        basic: {
            greeting: [
                "Welcome to our Basic Plan consultation!",
                "I'm here to help you with:",
                "- Understanding the Basic Plan features",
                "- Setting up your first bot",
                "- Payment processing",
                "- Getting started with automation"
            ],
            questions: {
                features: [
                    "The Basic Plan includes:",
                    "- 1 Bot License",
                    "- Basic Support",
                    "- 30-Day Free Trial",
                    "- Regular Updates",
                    "Perfect for beginners and small projects!"
                ],
                payment: [
                    "For the Basic Plan ($49.99), you can pay with:",
                    "- Credit Card",
                    "- PayPal",
                    "- Bank Transfer",
                    "Would you like to proceed with payment?"
                ],
                setup: [
                    "I'll help you set up your Basic Plan:",
                    "1. Choose your bot type",
                    "2. Configure settings",
                    "3. Connect to your system",
                    "4. Start automating!"
                ]
            }
        },
        professional: {
            greeting: [
                "Welcome to our Professional Plan consultation!",
                "I'm here to help you with:",
                "- Multiple bot licenses",
                "- Advanced features",
                "- Priority support",
                "- Customization options"
            ],
            questions: {
                features: [
                    "The Professional Plan ($99.99) includes:",
                    "- 3 Bot Licenses",
                    "- Priority Support",
                    "- 60-Day Free Trial",
                    "- Advanced Features",
                    "- Customization",
                    "Perfect for growing businesses!"
                ],
                payment: [
                    "For the Professional Plan ($99.99), you can pay with:",
                    "- Credit Card",
                    "- PayPal",
                    "- Bank Transfer",
                    "- Cryptocurrency",
                    "Would you like to proceed with payment?"
                ],
                setup: [
                    "I'll help you set up your Professional Plan:",
                    "1. Choose your bot types",
                    "2. Configure advanced settings",
                    "3. Set up priority support",
                    "4. Start your automation journey!"
                ]
            }
        },
        enterprise: {
            greeting: [
                "Welcome to our Enterprise Plan consultation!",
                "I'm here to help you with:",
                "- Unlimited licenses",
                "- 24/7 Support",
                "- Custom solutions",
                "- API access"
            ],
            questions: {
                features: [
                    "The Enterprise Plan ($199.99) includes:",
                    "- Unlimited Licenses",
                    "- 24/7 Support",
                    "- Custom Solutions",
                    "- Priority Updates",
                    "- API Access",
                    "Perfect for large organizations!"
                ],
                payment: [
                    "For the Enterprise Plan ($199.99), you can pay with:",
                    "- Credit Card",
                    "- Bank Transfer",
                    "- Custom payment terms available",
                    "Would you like to discuss payment options?"
                ],
                setup: [
                    "I'll help you set up your Enterprise Plan:",
                    "1. Custom solution planning",
                    "2. System integration",
                    "3. Team training",
                    "4. API configuration"
                ]
            }
        }
    };

    // Function to start chat with admin
    function startChat(planType) {
        // Clear existing messages
        chatMessages.innerHTML = '';
        
        // Add admin greeting
        const greeting = adminResponses[planType].greeting.join('<br>');
        addMessage(greeting, true);
        
        // Set chat state to active
        chatMessages.setAttribute('data-chat-state', 'active');
        
        // Set plan type
        chatMessages.setAttribute('data-plan-type', planType);
        
        // Focus input field
        userInput.focus();
    }

    // Sample AI responses for different topics
    const aiResponses = {
        purchase: {
            welcome: [
                "Welcome to Bot Automation Shop! I'm here to assist you with your automation journey.",
                "I can help you with:",
                "1. Choosing the right bot for your needs",
                "2. Understanding our pricing plans",
                "3. Making a purchase",
                "4. Setting up your automation",
                "What would you like to know more about?"
            ],
            help: {
                general: [
                    "I'm here to help you every step of the way!",
                    "Just let me know what you need assistance with, and I'll guide you through it.",
                    "You can ask about:",
                    "- Which bot is best for your needs",
                    "- How to use our bots effectively",
                    "- Pricing and payment options",
                    "- Technical setup and support",
                    "What would you like to know more about?"
                ],
                bot_selection: [
                    "I'm here to help you find the perfect bot for your needs!",
                    "Let me know:",
                    "1. What tasks you want to automate",
                    "2. Your budget",
                    "3. Your technical experience level",
                    "I'll recommend the best solution for you!",
                    "Would you like to tell me more about your needs?"
                ],
                pricing: [
                    "I'm happy to help you understand our pricing!",
                    "We have three plans to suit every need:",
                    "1. Basic - Perfect for beginners",
                    "2. Professional - Ideal for growing businesses",
                    "3. Enterprise - For large organizations",
                    "Each plan comes with amazing features and support.",
                    "Would you like to know more about any specific plan?"
                ],
                payment: [
                    "Great news! We have several convenient payment options:",
                    "You can pay with:",
                    "- Credit Card (Visa, Mastercard, Amex)",
                    "- PayPal (Quick and secure)",
                    "- Bank Transfer (For enterprise clients)",
                    "- Cryptocurrency (Bitcoin and Ethereum)",
                    "We also offer flexible payment plans and discounts for long-term commitments.",
                    "Which payment method would you prefer?"
                ],
                purchase: [
                    "I'm excited to help you make your purchase!",
                    "Here's what you need to do:",
                    "1. Choose your preferred bot",
                    "2. Select a pricing plan",
                    "3. Choose your payment method",
                    "4. Complete the purchase",
                    "I'm here to guide you through each step!",
                    "Would you like to start with any of these steps?"
                ],
                setup: [
                    "I'm ready to help you set up your automation!",
                    "After purchase, I can assist you with:",
                    "1. Installation",
                    "2. Configuration",
                    "3. First-time setup",
                    "4. Customization",
                    "I'll be with you every step of the way!",
                    "Would you like to know more about any of these steps?"
                ]
            },
            success: {
                purchase: [
                    "Great choice! You've made a smart investment in automation.",
                    "Your purchase is a step towards efficiency and growth!",
                    "I'm here to help you get started with your new bot!",
                    "Would you like to know about next steps?"
                ],
                setup: [
                    "I'm thrilled to help you set up your automation!",
                    "Your bot is ready to revolutionize your workflow!",
                    "I'll be here to assist you every step of the way!",
                    "Would you like to start the setup process?"
                ]
            }
        },
        default: [
            "I'm here to help you with your automation journey!",
            "Just let me know what you need assistance with, and I'll guide you through it.",
            "You can ask about:",
            "- Which bot is best for your needs",
            "- How to use our bots effectively",
            "- Pricing and payment options",
            "- Technical setup and support",
            "What would you like to know more about?"
        ]
    };

    function addMessage(text, isBot = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isBot ? 'bot' : 'user'}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const textDiv = document.createElement('div');
        textDiv.className = 'message-text';
        textDiv.innerHTML = text;
    // Add user message
    addMessage(message, false);
    
    // Clear input
    userInput.value = '';
    
    // Get AI response
    const response = getResponse(message);
    
    // Add AI response
    setTimeout(() => {
        addMessage(response);
    }, 1000); // Simulate AI thinking time
}

// Event listeners for Buy Now buttons
const buyButtons = document.querySelectorAll('.buy-button');
const aiChatModal = document.getElementById('ai-chat-modal');
const closeChatBtn = document.getElementById('close-chat');
if (buyButtons) {
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const planType = this.closest('.pricing-card').classList.contains('featured') ? 'professional' : 
                this.closest('.pricing-card').querySelector('.price').textContent === '$49.99' ? 'basic' : 'enterprise';
            if (aiChatModal) aiChatModal.style.display = 'flex';
            startChat(planType);
        });
    });
}
if (closeChatBtn) {
    closeChatBtn.addEventListener('click', function() {
        if (aiChatModal) aiChatModal.style.display = 'none';
    });
}

// Event listeners for chat
if (sendButton) {
    sendButton.addEventListener('click', sendMessage);
}
if (userInput) {
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// Add smooth fade-in for hero section
const hero = document.querySelector('.hero');
if (hero) {
    hero.style.opacity = '0';
    setTimeout(() => {
        hero.style.opacity = '1';
        hero.style.transition = 'opacity 1s ease-in';
    }, 100);
}

// Bot Offerings Tab Switcher (Nav Bar)
const botNavTabs = document.querySelectorAll('.bot-nav-tab');
const botTabGroups = {
    playpixels: document.getElementById('tab-playpixels'),
    sunflowerland: document.getElementById('tab-sunflowerland'),
    fishingfrenzy: document.getElementById('tab-fishingfrenzy')
};
botNavTabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
        e.preventDefault();
        botNavTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        Object.keys(botTabGroups).forEach(key => {
            botTabGroups[key].style.display = (this.dataset.tab === key) ? 'block' : 'none';
        });
        // Scroll to bot section if not already in view
        document.getElementById('game-bots').scrollIntoView({behavior: 'smooth'});
    });
});
}); // Close DOMContentLoaded event listener

// Initial welcome message
addMessage(aiResponses.purchase.welcome.join('<br>'));

document.addEventListener('DOMContentLoaded', function() {
  const translations = {
    en: {
      nav: {
        home: 'Home',
        playpixels: 'PlayPixelsXyz',
        sunflowerland: 'SunflowerLand',
        fishingfrenzy: 'FishingFrenzy'
      },
      hero: {
        title: 'Automate Your Tasks with Our Smart Bots',
        desc: 'Efficient, Reliable, and Customizable Automation Solutions',
        chat: 'Start Live Chat'
      },
      groups: {
        playpixels: 'PlayPixelsXyz Bots',
        sunflowerland: 'SunflowerLand Bots',
        fishingfrenzy: 'FishingFrenzy Bots'
      },
      footer: {
        about: 'About Us',
        aboutdesc: 'We provide smart automation solutions to help businesses streamline their operations.',
        quick: 'Quick Links',
        support: 'Support',
        doc: 'Documentation',
        faq: 'FAQ',
        portal: 'Support Portal'
      }
    },
    th: {
      nav: {
        home: 'หน้าหลัก',
        playpixels: 'เพลย์พิกเซลส์',
        sunflowerland: 'ซันฟลาวเวอร์แลนด์',
        fishingfrenzy: 'ฟิชชิ่งเฟรนซี่'
      },
      hero: {
        title: 'ทำงานอัตโนมัติด้วยบอทอัจฉริยะของเรา',
        desc: 'โซลูชันอัตโนมัติที่มีประสิทธิภาพ เชื่อถือได้ และปรับแต่งได้',
        chat: 'แชทสดกับทีมงาน'
      },
      groups: {
        playpixels: 'บอทเพลย์พิกเซลส์',
        sunflowerland: 'บอทซันฟลาวเวอร์แลนด์',
        fishingfrenzy: 'บอทฟิชชิ่งเฟรนซี่'
      },
      footer: {
        about: 'เกี่ยวกับเรา',
        aboutdesc: 'เรามีโซลูชันอัตโนมัติอัจฉริยะเพื่อช่วยให้ธุรกิจดำเนินงานได้อย่างมีประสิทธิภาพ',
        quick: 'ลิงก์ด่วน',
        support: 'ฝ่ายสนับสนุน',
        doc: 'เอกสาร',
        faq: 'คำถามที่พบบ่อย',
        portal: 'ศูนย์ช่วยเหลือ'
      }
    }
  };

  const langSelect = document.getElementById('lang-select');
  if (!langSelect) return;
  // Detect browser language on load
  const userLang = navigator.language || navigator.userLanguage;
  if (userLang && userLang.toLowerCase().startsWith('th')) {
    langSelect.value = 'th';
    setLanguage('th');
  } else {
    langSelect.value = 'en';
    setLanguage('en');
  }
  // Language switcher event
  langSelect.addEventListener('change', function() {
    setLanguage(langSelect.value);
  });
  function setLanguage(lang) {
    // Navbar
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
      if (link.getAttribute('href') === '#home') link.textContent = translations[lang].nav.home;
      if (link.getAttribute('href') === '#playpixels-group') link.textContent = translations[lang].nav.playpixels;
      if (link.getAttribute('href') === '#sunflowerland-group') link.textContent = translations[lang].nav.sunflowerland;
      if (link.getAttribute('href') === '#fishingfrenzy-group') link.textContent = translations[lang].nav.fishingfrenzy;
    });
    // Hero
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) heroTitle.textContent = translations[lang].hero.title;
    const heroDesc = document.querySelector('.hero p');
    if (heroDesc) heroDesc.textContent = translations[lang].hero.desc;
    const chatBtn = document.querySelector('.live-chat-btn');
    if (chatBtn) chatBtn.childNodes[1].textContent = translations[lang].hero.chat;
    // Bot group labels
    const playLabel = document.querySelector('#playpixels-group .bot-tab-label');
    if (playLabel) playLabel.textContent = translations[lang].groups.playpixels;
    const sunLabel = document.querySelector('#sunflowerland-group .bot-tab-label');
    if (sunLabel) sunLabel.textContent = translations[lang].groups.sunflowerland;
    const fishLabel = document.querySelector('#fishingfrenzy-group .bot-tab-label');
    if (fishLabel) fishLabel.textContent = translations[lang].groups.fishingfrenzy;
    // Footer
    const about = document.querySelector('.footer-section h3');
    if (about) about.textContent = translations[lang].footer.about;
    const aboutDesc = document.querySelector('.footer-section p');
    if (aboutDesc) aboutDesc.textContent = translations[lang].footer.aboutdesc;
    const quick = document.querySelectorAll('.footer-section h3')[1];
    if (quick) quick.textContent = translations[lang].footer.quick;
    const support = document.querySelectorAll('.footer-section h3')[2];
    if (support) support.textContent = translations[lang].footer.support;
    const doc = document.querySelectorAll('.footer-section ul')[2]?.children[0]?.children[0];
    if (doc) doc.textContent = translations[lang].footer.doc;
    const faq = document.querySelectorAll('.footer-section ul')[2]?.children[1]?.children[0];
    if (faq) faq.textContent = translations[lang].footer.faq;
    const portal = document.querySelectorAll('.footer-section ul')[2]?.children[2]?.children[0];
    if (portal) portal.textContent = translations[lang].footer.portal;
  }
});
