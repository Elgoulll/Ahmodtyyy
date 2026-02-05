document.addEventListener('DOMContentLoaded', function() {
    // Close Mobile Menu on Link Click
    const navLinks = document.querySelectorAll('.nav-link-custom');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList) {
                    navbarCollapse.classList.remove('show');
                }
                // Also close custom mobile menu
                const mobileMenu = document.getElementById('navbarMobile');
                if (mobileMenu) {
                    mobileMenu.classList.remove('show');
                    const toggle = document.getElementById('navbarToggle');
                    if (toggle) {
                        toggle.classList.remove('active');
                        toggle.setAttribute('aria-expanded', 'false');
                    }
                    const overlay = document.getElementById('mobileOverlay');
                    if (overlay) overlay.classList.remove('show');
                }
            }
        });
    });

    // Language Switcher
    const langSwitch = document.getElementById('langSwitch');
    let isArabic = true;

    // Navbar scroll variables
    const header = document.querySelector('header');
    let isHeaderVisible = true;
    let lastScrollTop = 0;

    const translations = {
        ar: {
            // Navigation
            brandName: 'العاصمة الفضية',
            brandSubtitle: 'للخدمات المتكاملة والتوريدات العمومية',
            home: 'الرئيسية',
            about: 'نحن',
            vision: 'رؤيتنا',
            services: 'خدماتنا',
            structure: 'الهيكل',
            team: 'فريقنا',
            contact: 'التواصل',
            whatsappBtn: 'واتساب',
            switchLangLabel: 'English',
            switchLangAria: 'Switch to English',
            
            // Hero Section
            heroTitle: 'مرحباً بكم',
            heroSubtitle: 'في العاصمة الفضية',
            ctaButton: 'ابدأ الآن',
            
            // About Section
            aboutTitle: 'من نحن',
            aboutText: 'نحن شركة العاصمة الفضية للخدمات الإدارية والقانونية والتوريدات العمومية. نمتلك خبرة أكثر من 20 عاماً في كافة مجالات الخدمات الإدارية والقانونية للأفراد والمؤسسات والشركات المصرية والأجنبية وخدمات رجال الأعمال داخل وخارج مصر.',
            
            // Vision, Mission, Values
            visionMissionTitle: 'رؤيتنا ورسالتنا وقيمنا',
            visionTitle: 'رؤيتنا',
            visionText: 'أن نكون من الشركات الرائدة في مجال الخدمات الإدارية والقانونية التي تتميز بالكفاءة والإبداع والثقة في تقديم الخدمات الإدارية والقانونية في مصر أو خارج مصر.',
            missionTitle: 'رسالتنا',
            missionText: 'أن نلبي احتياجات عملائنا الإدارية والقانونية بأعلى مستوى من الجودة والسرعة والدقة المهنية.',
            valuesTitle: 'قيمنا',
            valuesText: 'الالتزام بالقانون والعدل والشفافية والمسؤولية.',
            
            // Services Section
            servicesTitle: 'خدماتنا',
            adminServices: 'الخدمات الإدارية',
            adminService1: 'إنشاء وتعديل الشركات',
            adminService2: 'الملفات التأمينية والضريبية',
            adminService3: 'استقدام العمالة الأجنبية',
            adminService4: 'تنظيم ورش العمل والمؤتمرات',
            adminServiceDesc: 'خدمات إدارية شاملة لإنشاء وتعديل الشركات والملفات التأمينية والضريبية...',
            
            legalServices: 'الخدمات القانونية',
            legalService1: 'الترافع والتمثيل القضائي',
            legalService2: 'الاستشارات والدراسات القانونية',
            legalService3: 'صياغة العقود والاتفاقيات',
            legalService4: 'دعم رواد الأعمال',
            legalServiceDesc: 'خدمات قانونية شاملة تغطي الترافع والاستشارات وصياغة العقود...',
            
            logisticsServices: 'الخدمات اللوجستية والتوريدات',
            logisticsService1: 'إجراءات الجمارك',
            logisticsService2: 'تراخيص السيارات والمعدات',
            logisticsService3: 'الحصول على التأشيرات',
            logisticsService4: 'الأرشفة والطباعة',
            logisticsServiceDesc: 'خدمات لوجستية وتوريدات عمومية متكاملة تشمل الجمارك والتأشيرات...',
            
            // Buttons and Common Text
            readMore: 'اقرأ المزيد',
            
            // Service Modal Titles
            adminModalTitle: 'الخدمات الإدارية',
            legalModalTitle: 'الخدمات القانونية',
            logisticsModalTitle: 'الخدمات اللوجستية والتوريدات',
            
            // Structure Section
            structureTitle: 'الهيكل التنظيمي',
            adminDept: 'قسم الخدمات الإدارية',
            legalDept: 'قسم الخدمات القانونية',
            logisticsDept: 'قسم الخدمات اللوجيستية',
            suppliesDept: 'قسم التوريدات العمومية',
            
            // Team Section
            teamTitle: 'فريق العمل',
            teamText: 'فريق عملنا يتكون من محامين ومستشارين قانونيين ومحاسبين قانونيين مؤهلين ومتخصصين في مجالاتهم، يتمتعون بالخبرة والكفاءة والإلمام بأحدث التطورات القانونية والإدارية.',
            lawyer: 'محامي متخصص',
            accountant: 'محاسب قانوني',
            consultant: 'مستشار قانوني',
            legalServices2: 'الخدمات القانونية',
            financialServices: 'الخدمات المالية',
            consultingServices: 'الاستشارات',
            memberLawyer: 'محامي متخصص',
            memberLawyerRole: 'الخدمات القانونية',
            memberAccountant: 'محاسب قانوني',
            memberAccountantRole: 'الخدمات المالية',
            memberConsultant: 'مستشار قانوني',
            memberConsultantRole: 'الاستشارات',
            
            // Contact Section
            contactTitle: 'تواصل معنا',
            contactInfo: 'معلومات التواصل',
            location1: 'مبنى رقم 6 شارع الزهور - فيصل – الجيزة',
            location2: 'مبنى رقم 222 شارع جسر السويس – القاهرة',
            location3: 'فيلا رقم 40 قرية الريميفيرا – طريق القرى – الغردقة',
            phoneNumber: '01014887070',
            nameLabel: 'الاسم',
            emailLabel: 'البريد الإلكتروني',
            phoneLabel: 'رقم الهاتف',
            serviceLabel: 'نوع الخدمة',
            descriptionLabel: 'وصف الخدمة',
            attachmentLabel: 'إرفاق ملف',
            phoneHours: 'الهاتف: 9:00 ص - 4:00 م',
            whatsappHours: 'واتساب: 24/7',
            sendButton: 'إرسال',
            selectService: '-- اختر الخدمة --',
            administrativeServices: 'الخدمات الإدارية',
            governmentServices: 'الخدمات الحكومية',
            logisticsServicesOption: 'الخدمات اللوجيستية',
            legalServicesOption: 'الخدمات القانونية',
            generalSupplies: 'التوريدات العمومية',
            
            // Footer
            copyright: '© العاصمة الفضية. جميع الحقوق محفوظة.',

            // Modal Bodies
            adminModalBody: 'نقدم خدمات إدارية شاملة تغطي جميع جوانب العمليات الإدارية للشركات والمؤسسات:',
            adminModalLi1: 'خدمات إنشاء وتعديل الشركات بكافة أنواعها (وزارة الإستثمار – السجل التجاري...الخ)',
            adminModalLi2: 'خدمات إنشاء وتعديل ومتابعة الملفات التأمينية للشركات والأفراد',
            adminModalLi3: 'خدمات إنشاء وتعديل ومتابعة الملفات الضريبية بكافة أنواعها',
            adminModalLi4: 'خدمات إنشاء وتعديل ومتابعة ملف الشركة لدى مكتب العمل',
            adminModalLi5: 'خدمات إستقدام العمالة الأجنبية طبقاً لإحتياجات الشركة',
            adminModalLi6: 'خدمات توفير العمالة المصرية المدربة',
            adminModalLi7: 'خدمات عقد وتنظيم ورش العمل والمؤتمرات والمعارض',
            adminModalLi8: 'خدمات الإستشارات الإدارية بكافة أنواعها',
            adminModalLi9: 'تقديم الإستشارات الإدارية المتعلقة بتنفيذ أعمال الشركة',

            legalModalBody: 'نقدم الخدمات القانونية الشاملة في مختلف فروع القانون:',
            legalModalLi1: 'الترافع والتمثيل القضائي: نمثل عملائنا أمام المحاكم والهيئات القضائية والإدارية في جميع درجات التقاضي',
            legalModalLi2: 'الإستشارات والدراسات القانونية: نقدم المشورة القانونية لعملائنا في جميع المسائل',
            legalModalLi3: 'صياغة العقود والاتفاقيات: نصاغ جميع أنواع العقود بطريقة تضمن حفظ حقوقك',
            legalModalLi4: 'دعم رواد الأعمال: نساعد في إنشاء وتسجيل الشركات',
            legalModalLi5: 'المنازعات المدنية والشركات: معالجة المنازعات في مختلف المجالات',
            legalModalLi6: 'إنشاء وتعديل ومتابعة العقود بكافة أنواعها',
            legalModalLi7: 'صياغة ومراجعة الإتفاقيات والعقود واللوائح',
            legalModalLi8: 'صياغة الخطابات القانونية ودراسة الردود',
            legalModalLi9: 'مراجعة المراسلات وإبداء الرأي القانوني',
            legalModalLi10: 'خدمات التفاوض مع الجهات المختلفة',
            legalModalLi11: 'الأبحاث القانونية',
            legalModalLi12: 'تنظيم عقود العمل واللوائح الإدارية',

            logisticsModalBody: 'نقدم خدمات لوجستية وتوريدات عمومية متكاملة:',
            logisticsModalLi1: 'إجراءات الجمارك',
            logisticsModalLi2: 'تراخيص السيارات والمعدات',
            logisticsModalLi3: 'الحصول على التأشيرات',
            logisticsModalLi4: 'الأرشفة والطباعة',
            logisticsModalLi5: 'خدمات الشحن والنقل',
            logisticsModalLi6: 'إدارة المخازن والتخزين'
        },
        en: {
            // Navigation
            brandName: 'Silver Capital',
            brandSubtitle: 'for Integrated Services and General Supplies',
            home: 'Home',
            about: 'About',
            vision: 'Vision',
            services: 'Services',
            structure: 'Structure',
            team: 'Team',
            contact: 'Contact',
            whatsappBtn: 'WhatsApp',
            switchLangLabel: 'العربية',
            switchLangAria: 'Switch to Arabic',
            
            // Hero Section
            heroTitle: 'Welcome',
            heroSubtitle: 'to Silver Capital',
            ctaButton: 'Get Started',
            
            // About Section
            aboutTitle: 'About Us',
            aboutText: 'We are Silver Capital for Administrative, Legal, and General Supplies Services. We have over 20 years of experience in all fields of administrative, legal, and business services for individuals, institutions, and Egyptian and foreign companies within and outside Egypt.',
            
            // Vision, Mission, Values
            visionMissionTitle: 'Our Vision, Mission & Values',
            visionTitle: 'Our Vision',
            visionText: 'To be one of the leading companies in administrative and legal services distinguished by efficiency, creativity, and trust in providing administrative and legal services in Egypt or abroad.',
            missionTitle: 'Our Mission',
            missionText: 'To meet the administrative and legal needs of our clients at the highest level of quality, speed, and professional accuracy.',
            valuesTitle: 'Our Values',
            valuesText: 'Commitment to law, justice, transparency, and responsibility.',
            
            // Services Section
            servicesTitle: 'Our Services',
            adminServices: 'Administrative Services',
            adminService1: 'Company Registration and Amendment',
            adminService2: 'Insurance and Tax Files',
            adminService3: 'Foreign Labor Recruitment',
            adminService4: 'Workshop and Conference Organization',
            adminServiceDesc: 'Comprehensive administrative services for company creation and amendment, insurance and tax files...',
            
            legalServices: 'Legal Services',
            legalService1: 'Litigation and Legal Representation',
            legalService2: 'Legal Consultations and Studies',
            legalService3: 'Contracts and Agreements Drafting',
            legalService4: 'Entrepreneurs Support',
            legalServiceDesc: 'Comprehensive legal services covering litigation, consultations, and contract drafting...',
            
            logisticsServices: 'Logistics & Supply Services',
            logisticsService1: 'Customs Procedures',
            logisticsService2: 'Vehicle and Equipment Licenses',
            logisticsService3: 'Visa Acquisition',
            logisticsService4: 'Archiving and Printing',
            logisticsServiceDesc: 'Integrated logistics and supply services including customs and visa procedures...',
            
            // Buttons and Common Text
            readMore: 'Read More',
            
            // Service Modal Titles
            adminModalTitle: 'Administrative Services',
            legalModalTitle: 'Legal Services',
            logisticsModalTitle: 'Logistics & Supply Services',
            
            // Structure Section
            structureTitle: 'Organizational Structure',
            adminDept: 'Administrative Services Department',
            legalDept: 'Legal Services Department',
            logisticsDept: 'Logistics Services Department',
            suppliesDept: 'General Supplies Department',
            
            // Team Section
            teamTitle: 'Our Team',
            teamText: 'Our team consists of lawyers, legal consultants, and qualified legal accountants specialized in their fields, with expertise, competence, and knowledge of the latest legal and administrative developments.',
            lawyer: 'Specialized Lawyer',
            accountant: 'Legal Accountant',
            consultant: 'Legal Consultant',
            legalServices2: 'Legal Services',
            financialServices: 'Financial Services',
            consultingServices: 'Consulting',
            memberLawyer: 'Specialized Lawyer',
            memberLawyerRole: 'Legal Services',
            memberAccountant: 'Legal Accountant',
            memberAccountantRole: 'Financial Services',
            memberConsultant: 'Legal Consultant',
            memberConsultantRole: 'Consulting',
            
            // Contact Section
            contactTitle: 'Contact Us',
            contactInfo: 'Contact Information',
            location1: 'Building No. 6, Al-Zahoor Street - Faisal – Giza',
            location2: 'Building No. 222, Jiser Al-Suez Street – Cairo',
            location3: 'Villa No. 40, Al-Riviera Village – Road to Villages – Hurghada',
            phoneNumber: '01014887070',
            nameLabel: 'Name',
            emailLabel: 'Email Address',
            phoneLabel: 'Phone Number',
            serviceLabel: 'Service Type',
            descriptionLabel: 'Service Description',
            attachmentLabel: 'Attach File',
            phoneHours: 'Phone: 9:00 AM - 4:00 PM',
            whatsappHours: 'WhatsApp: 24/7',
            sendButton: 'Send',
            selectService: '-- Select a Service --',
            administrativeServices: 'Administrative Services',
            governmentServices: 'Government Services',
            logisticsServicesOption: 'Logistics Services',
            legalServicesOption: 'Legal Services',
            generalSupplies: 'General Supplies',
            
            // Footer
            copyright: '© 2023 Silver Capital. All rights reserved.',

            // Modal Bodies
            adminModalBody: 'We provide comprehensive administrative services covering all aspects of company operations and institutions:',
            adminModalLi1: 'Services for establishing and amending companies of all types (Ministry of Investment - Commercial Registry... etc.)',
            adminModalLi2: 'Services for establishing, amending, and monitoring insurance files for companies and individuals',
            adminModalLi3: 'Services for establishing, amending, and monitoring tax files of all types',
            adminModalLi4: 'Services for establishing, amending, and monitoring the company file at the Labor Office',
            adminModalLi5: 'Services for recruiting foreign labor according to company needs',
            adminModalLi6: 'Services for providing trained Egyptian labor',
            adminModalLi7: 'Services for organizing workshops, conferences, and exhibitions',
            adminModalLi8: 'Administrative consulting services of all types',
            adminModalLi9: 'Providing administrative consultations related to implementing company operations',

            legalModalBody: 'We provide comprehensive legal services in various branches of law:',
            legalModalLi1: 'Litigation and judicial representation: We represent our clients before courts and judicial and administrative authorities in all degrees of litigation',
            legalModalLi2: 'Legal consultations and studies: We provide legal advice to our clients on all matters',
            legalModalLi3: 'Drafting contracts and agreements: We draft all types of contracts in a way that ensures your rights are preserved',
            legalModalLi4: 'Supporting entrepreneurs: We help in establishing and registering companies',
            legalModalLi5: 'Civil and corporate disputes: Handling disputes in various fields',
            legalModalLi6: 'Creating, amending, and monitoring contracts of all types',
            legalModalLi7: 'Drafting and reviewing agreements, contracts, and regulations',
            legalModalLi8: 'Drafting legal letters and studying responses',
            legalModalLi9: 'Reviewing correspondence and expressing legal opinion',
            legalModalLi10: 'Negotiation services with various parties',
            legalModalLi11: 'Legal research',
            legalModalLi12: 'Organizing employment contracts and administrative regulations',

            logisticsModalBody: 'We provide integrated logistics and general supply services:',
            logisticsModalLi1: 'Customs procedures',
            logisticsModalLi2: 'Vehicle and equipment licenses',
            logisticsModalLi3: 'Obtaining visas',
            logisticsModalLi4: 'Archiving and printing',
            logisticsModalLi5: 'Shipping and transportation services',
            logisticsModalLi6: 'Warehouse management and storage'
        }
    };

    function switchLanguage() {
        isArabic = !isArabic;
        const lang = isArabic ? 'ar' : 'en';
        const dir = isArabic ? 'rtl' : 'ltr';
        

        document.querySelector('html').lang = lang;
        document.querySelector('html').dir = dir;
        document.body.dir = dir;
        // Show full target language name with globe icon
        langSwitch.innerHTML = `<i class="fas fa-globe"></i> ${isArabic ? translations.ar.switchLangLabel : translations.en.switchLangLabel}`;
        langSwitch.setAttribute('aria-label', isArabic ? translations.ar.switchLangAria : translations.en.switchLangAria);

        const brandText = document.querySelector('.brand-text');
        const brandSubtitle = document.querySelector('.brand-subtitle');
        if (lang === 'en') {
            brandText.style.textAlign = 'left';
            brandSubtitle.style.textAlign = 'left';
        } else {
            brandText.style.textAlign = 'right';
            brandSubtitle.style.textAlign = 'right';
        }

        // Update all page text
        document.querySelector('.brand-text').textContent = translations[lang].brandName;
        document.querySelector('.brand-subtitle').textContent = translations[lang].brandSubtitle;
        document.getElementById('nav-home').textContent = translations[lang].home;
        document.getElementById('nav-about').textContent = translations[lang].about;
        document.getElementById('nav-vision').textContent = translations[lang].vision;
        document.getElementById('nav-services').textContent = translations[lang].services;
        document.getElementById('nav-structure').textContent = translations[lang].structure;
        document.getElementById('nav-team').textContent = translations[lang].team;
        document.getElementById('nav-contact').textContent = translations[lang].contact;
        
        const whatsappBtn = document.getElementById('whatsappBtn');
        if (whatsappBtn) {
            whatsappBtn.innerHTML = `<i class="fab fa-whatsapp"></i> ${translations[lang].whatsappBtn}`;
        }

        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) heroTitle.textContent = translations[lang].heroTitle;
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) heroSubtitle.textContent = translations[lang].heroSubtitle;
        const heroBtn = document.querySelector('.hero-section .btn');
        if (heroBtn) heroBtn.textContent = translations[lang].ctaButton;

        const aboutTitle = document.querySelector('#about .section-title');
        if (aboutTitle) aboutTitle.textContent = translations[lang].aboutTitle;
        const aboutLead = document.querySelector('#about .lead');
        if (aboutLead) aboutLead.textContent = translations[lang].aboutText;

        document.querySelector('#vision .section-title').textContent = translations[lang].visionMissionTitle;
        const visionCards = document.querySelectorAll('#vision .card');
        if (visionCards.length > 0) {
            const visionTitle = visionCards[0].querySelector('.card-title');
            const visionText = visionCards[0].querySelector('.card-text');
            if (visionTitle) visionTitle.textContent = translations[lang].visionTitle;
            if (visionText) visionText.textContent = translations[lang].visionText;
        }
        if (visionCards.length > 1) {
            const missionTitle = visionCards[1].querySelector('.card-title');
            const missionText = visionCards[1].querySelector('.card-text');
            if (missionTitle) missionTitle.textContent = translations[lang].missionTitle;
            if (missionText) missionText.textContent = translations[lang].missionText;
        }
        if (visionCards.length > 2) {
            const valuesTitle = visionCards[2].querySelector('.card-title');
            const valuesText = visionCards[2].querySelector('.card-text');
            if (valuesTitle) valuesTitle.textContent = translations[lang].valuesTitle;
            if (valuesText) valuesText.textContent = translations[lang].valuesText;
        }

        const servicesTitle = document.querySelector('#services .section-title');
        if (servicesTitle) servicesTitle.textContent = translations[lang].servicesTitle;
        
        document.getElementById('adminServiceTitle').textContent = translations[lang].adminServices;
        document.getElementById('adminServiceDesc').textContent = translations[lang].adminServiceDesc;
        document.getElementById('adminReadMore').textContent = translations[lang].readMore;
        
        document.getElementById('legalServiceTitle').textContent = translations[lang].legalServices;
        document.getElementById('legalServiceDesc').textContent = translations[lang].legalServiceDesc;
        document.getElementById('legalReadMore').textContent = translations[lang].readMore;
        
        document.getElementById('logisticsServiceTitle').textContent = translations[lang].logisticsServices;
        document.getElementById('logisticsServiceDesc').textContent = translations[lang].logisticsServiceDesc;
        document.getElementById('logisticsReadMore').textContent = translations[lang].readMore;
        
        document.getElementById('adminModalTitle').textContent = translations[lang].adminModalTitle;
        document.getElementById('legalModalTitle').textContent = translations[lang].legalModalTitle;
        document.getElementById('logisticsModalTitle').textContent = translations[lang].logisticsModalTitle;

        // Update modal bodies
        const adminBody = document.querySelector('#adminModalBody p');
        if (adminBody) adminBody.textContent = translations[lang].adminModalBody;
        const adminLis = document.querySelectorAll('#adminModalBody li');
        if (adminLis[0]) adminLis[0].textContent = translations[lang].adminModalLi1;
        if (adminLis[1]) adminLis[1].textContent = translations[lang].adminModalLi2;
        if (adminLis[2]) adminLis[2].textContent = translations[lang].adminModalLi3;
        if (adminLis[3]) adminLis[3].textContent = translations[lang].adminModalLi4;
        if (adminLis[4]) adminLis[4].textContent = translations[lang].adminModalLi5;
        if (adminLis[5]) adminLis[5].textContent = translations[lang].adminModalLi6;
        if (adminLis[6]) adminLis[6].textContent = translations[lang].adminModalLi7;
        if (adminLis[7]) adminLis[7].textContent = translations[lang].adminModalLi8;
        if (adminLis[8]) adminLis[8].textContent = translations[lang].adminModalLi9;

        const legalBody = document.querySelector('#legalModalBody p');
        if (legalBody) legalBody.textContent = translations[lang].legalModalBody;
        const legalLis = document.querySelectorAll('#legalModalBody li');
        if (legalLis[0]) legalLis[0].textContent = translations[lang].legalModalLi1;
        if (legalLis[1]) legalLis[1].textContent = translations[lang].legalModalLi2;
        if (legalLis[2]) legalLis[2].textContent = translations[lang].legalModalLi3;
        if (legalLis[3]) legalLis[3].textContent = translations[lang].legalModalLi4;
        if (legalLis[4]) legalLis[4].textContent = translations[lang].legalModalLi5;
        if (legalLis[5]) legalLis[5].textContent = translations[lang].legalModalLi6;
        if (legalLis[6]) legalLis[6].textContent = translations[lang].legalModalLi7;
        if (legalLis[7]) legalLis[7].textContent = translations[lang].legalModalLi8;
        if (legalLis[8]) legalLis[8].textContent = translations[lang].legalModalLi9;
        if (legalLis[9]) legalLis[9].textContent = translations[lang].legalModalLi10;
        if (legalLis[10]) legalLis[10].textContent = translations[lang].legalModalLi11;
        if (legalLis[11]) legalLis[11].textContent = translations[lang].legalModalLi12;

        const logisticsBody = document.querySelector('#logisticsModalBody p');
        if (logisticsBody) logisticsBody.textContent = translations[lang].logisticsModalBody;
        const logisticsLis = document.querySelectorAll('#logisticsModalBody li');
        if (logisticsLis[0]) logisticsLis[0].textContent = translations[lang].logisticsModalLi1;
        if (logisticsLis[1]) logisticsLis[1].textContent = translations[lang].logisticsModalLi2;
        if (logisticsLis[2]) logisticsLis[2].textContent = translations[lang].logisticsModalLi3;
        if (logisticsLis[3]) logisticsLis[3].textContent = translations[lang].logisticsModalLi4;
        if (logisticsLis[4]) logisticsLis[4].textContent = translations[lang].logisticsModalLi5;
        if (logisticsLis[5]) logisticsLis[5].textContent = translations[lang].logisticsModalLi6;
        
        const serviceCards = document.querySelectorAll('#services .card');
        
        if (serviceCards.length > 0) {
            const adminTitle = serviceCards[0].querySelector('.card-title');
            if (adminTitle) adminTitle.textContent = translations[lang].adminServices;
            const adminLis = serviceCards[0].querySelectorAll('li');
            if (adminLis[0]) adminLis[0].textContent = translations[lang].adminService1;
            if (adminLis[1]) adminLis[1].textContent = translations[lang].adminService2;
            if (adminLis[2]) adminLis[2].textContent = translations[lang].adminService3;
            if (adminLis[3]) adminLis[3].textContent = translations[lang].adminService4;
        }
        
        if (serviceCards.length > 1) {
            const legalTitle = serviceCards[1].querySelector('.card-title');
            if (legalTitle) legalTitle.textContent = translations[lang].legalServices;
            const legalLis = serviceCards[1].querySelectorAll('li');
            if (legalLis[0]) legalLis[0].textContent = translations[lang].legalService1;
            if (legalLis[1]) legalLis[1].textContent = translations[lang].legalService2;
            if (legalLis[2]) legalLis[2].textContent = translations[lang].legalService3;
            if (legalLis[3]) legalLis[3].textContent = translations[lang].legalService4;
        }
        
        if (serviceCards.length > 2) {
            const logisticsTitle = serviceCards[2].querySelector('.card-title');
            if (logisticsTitle) logisticsTitle.textContent = translations[lang].logisticsServices;
            const logisticsLis = serviceCards[2].querySelectorAll('li');
            if (logisticsLis[0]) logisticsLis[0].textContent = translations[lang].logisticsService1;
            if (logisticsLis[1]) logisticsLis[1].textContent = translations[lang].logisticsService2;
            if (logisticsLis[2]) logisticsLis[2].textContent = translations[lang].logisticsService3;
            if (logisticsLis[3]) logisticsLis[3].textContent = translations[lang].logisticsService4;
        }

        // Update Structure Section
        const structTitle = document.getElementById('structureTitle');
        if (structTitle) {
            structTitle.textContent = translations[lang].structureTitle;
        }
        
        const structAdmin = document.getElementById('struct-admin');
        if (structAdmin) structAdmin.textContent = translations[lang].adminDept;
        
        const structLegal = document.getElementById('struct-legal');
        if (structLegal) structLegal.textContent = translations[lang].legalDept;
        
        const structLogistics = document.getElementById('struct-logistics');
        if (structLogistics) structLogistics.textContent = translations[lang].logisticsDept;
        
        const structSupplies = document.getElementById('struct-supplies');
        if (structSupplies) structSupplies.textContent = translations[lang].suppliesDept;

        // Update Team Section
        const teamTitle = document.getElementById('teamTitle');
        if (teamTitle) {
            teamTitle.textContent = translations[lang].teamTitle;
        }
        
        const teamDesc = document.getElementById('team-description');
        if (teamDesc) teamDesc.textContent = translations[lang].teamText;
        
        const memberLawyer = document.getElementById('member-lawyer');
        if (memberLawyer) memberLawyer.textContent = translations[lang].memberLawyer;
        
        const memberLawyerRole = document.getElementById('member-lawyer-role');
        if (memberLawyerRole) memberLawyerRole.textContent = translations[lang].memberLawyerRole;
        
        const memberAccountant = document.getElementById('member-accountant');
        if (memberAccountant) memberAccountant.textContent = translations[lang].memberAccountant;
        
        const memberAccountantRole = document.getElementById('member-accountant-role');
        if (memberAccountantRole) memberAccountantRole.textContent = translations[lang].memberAccountantRole;
        
        const memberConsultant = document.getElementById('member-consultant');
        if (memberConsultant) memberConsultant.textContent = translations[lang].memberConsultant;
        
        const memberConsultantRole = document.getElementById('member-consultant-role');
        if (memberConsultantRole) memberConsultantRole.textContent = translations[lang].memberConsultantRole;

        // Update Contact Section
        const contactTitle = document.getElementById('contactTitle');
        if (contactTitle) {
            contactTitle.textContent = translations[lang].contactTitle;
        }
        
        const contactInfo = document.getElementById('contactInfoTitle');
        if (contactInfo) contactInfo.textContent = translations[lang].contactInfo;
        
        const location1 = document.getElementById('location-1');
        if (location1) location1.innerHTML = `<i class="fas fa-map-marker-alt text-primary me-2"></i> ${translations[lang].location1}`;
        
        const location2 = document.getElementById('location-2');
        if (location2) location2.innerHTML = `<i class="fas fa-map-marker-alt text-primary me-2"></i> ${translations[lang].location2}`;
        
        const location3 = document.getElementById('location-3');
        if (location3) location3.innerHTML = `<i class="fas fa-map-marker-alt text-primary me-2"></i> ${translations[lang].location3}`;
        
        const phoneNum = document.getElementById('phone-number');
        if (phoneNum) phoneNum.innerHTML = `<i class="fas fa-phone text-primary me-2"></i> ${translations[lang].phoneNumber}`;
        
        const phoneHours = document.getElementById('phoneHours');
        if (phoneHours) phoneHours.textContent = translations[lang].phoneHours;
        
        const whatsappHours = document.getElementById('whatsappHours');
        if (whatsappHours) whatsappHours.textContent = translations[lang].whatsappHours;
        
        // Update contact form labels
        const nameLabel = document.getElementById('nameLabel');
        if (nameLabel) nameLabel.textContent = translations[lang].nameLabel;
        
        const emailLabel = document.getElementById('emailLabel');
        if (emailLabel) emailLabel.textContent = translations[lang].emailLabel;
        
        const phoneLabel = document.getElementById('phoneLabel');
        if (phoneLabel) phoneLabel.textContent = translations[lang].phoneLabel;
        
        const serviceLabel = document.getElementById('serviceLabel');
        if (serviceLabel) serviceLabel.textContent = translations[lang].serviceLabel;
        
        const descriptionLabel = document.getElementById('descriptionLabel');
        if (descriptionLabel) descriptionLabel.textContent = translations[lang].descriptionLabel;
        
        const attachmentLabel = document.getElementById('attachmentLabel');
        if (attachmentLabel) attachmentLabel.textContent = translations[lang].attachmentLabel;
        
        // Update service select options
        const serviceSelect = document.getElementById('service');
        if (serviceSelect && serviceSelect.options) {
            serviceSelect.options[0].text = translations[lang].selectService;
            serviceSelect.options[1].text = translations[lang].administrativeServices;
            serviceSelect.options[2].text = translations[lang].governmentServices;
            serviceSelect.options[3].text = translations[lang].logisticsServicesOption;
            serviceSelect.options[4].text = translations[lang].legalServicesOption;
            serviceSelect.options[5].text = translations[lang].generalSupplies;
        }
        
        const descriptionField = document.getElementById('description');
        if (descriptionField) {
            descriptionField.placeholder = lang === 'ar' ? 'اكتب وصفاً مختصراً للخدمة المطلوبة...' : 'Write a brief description of the service...';
        }
        
        // Update send button
        const submitBtn = document.querySelector('#contactForm button[type="submit"]');
        if (submitBtn) submitBtn.textContent = translations[lang].sendButton;

        const footerP = document.querySelector('footer p');
        if (footerP) footerP.textContent = translations[lang].copyright;

        // Update mobile menu elements
        const mobileLangLabel = document.getElementById('mobileLangLabel');
        const langSwitchMobile = document.getElementById('langSwitchMobile');
        if (mobileLangLabel) mobileLangLabel.textContent = isArabic ? translations.ar.switchLangLabel : translations.en.switchLangLabel;
        if (langSwitchMobile) langSwitchMobile.setAttribute('aria-label', isArabic ? translations.ar.switchLangAria : translations.en.switchLangAria);

        // Update mobile WhatsApp button
        const mobileWhatsappBtn = document.querySelector('.navbar-mobile .btn-whatsapp');
        if (mobileWhatsappBtn) {
            mobileWhatsappBtn.innerHTML = `<i class="fab fa-whatsapp"></i> ${translations[lang].whatsappBtn}`;
        }

        // Update mobile nav items if mobile menu exists
        const mobileNavItems = document.querySelectorAll('.navbar-mobile .nav-link-custom span[id]');
        mobileNavItems.forEach(span => {
            const id = span.id;
            if (id === 'nav-home') span.textContent = translations[lang].home;
            else if (id === 'nav-about') span.textContent = translations[lang].about;
            else if (id === 'nav-vision') span.textContent = translations[lang].vision;
            else if (id === 'nav-services') span.textContent = translations[lang].services;
            else if (id === 'nav-structure') span.textContent = translations[lang].structure;
            else if (id === 'nav-team') span.textContent = translations[lang].team;
            else if (id === 'nav-contact') span.textContent = translations[lang].contact;
        });
    }

    // Mobile menu toggle
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMobile = document.getElementById('navbarMobile');

    if (navbarToggle) {
        // Ensure we have a mobile container (created earlier in markup)
        const overlay = document.getElementById('mobileOverlay');

        // Populate mobile menu dynamically if empty
        if (navbarMobile && navbarMobile.children.length === 0) {
            // Close button and container
            navbarMobile.innerHTML = `
                <button class="mobile-close" id="navbarMobileClose" aria-label="Close menu">&times;</button>
                <ul class="navbar-nav-mobile" role="menu"></ul>
            `;

            const navList = document.querySelector('.navbar-nav');
            const mobileList = navbarMobile.querySelector('.navbar-nav-mobile');

            if (navList && mobileList) {
                // Clone nav items into mobile list
                navList.querySelectorAll('.nav-item').forEach(item => {
                    const clone = item.cloneNode(true);
                    // ensure links close menu
                    const link = clone.querySelector('.nav-link-custom');
                    if (link) {
                        link.addEventListener('click', () => {
                            navbarMobile.classList.remove('show');
                            navbarToggle.classList.remove('active');
                            navbarToggle.setAttribute('aria-expanded', 'false');
                            if (overlay) overlay.classList.remove('show');
                        });
                    }
                    mobileList.appendChild(clone);
                });
            }

            // Add language switch in mobile panel
            const liLang = document.createElement('li');
            liLang.innerHTML = `<button class="btn-lang-mobile" id="langSwitchMobile" aria-label="Switch language"><i class="fas fa-globe"></i> <span id="mobileLangLabel"></span></button>`;
            mobileList.insertBefore(liLang, mobileList.firstChild);

            // Add WhatsApp button
            const liWhats = document.createElement('li');
            liWhats.innerHTML = `<a class="btn-whatsapp" href="https://wa.me/201014887070" target="_blank"><i class="fab fa-whatsapp"></i> ${isArabic ? translations.ar.whatsappBtn : translations.en.whatsappBtn}</a>`;
            mobileList.appendChild(liWhats);

            // Close handler
            const mobileClose = document.getElementById('navbarMobileClose');
            if (mobileClose) mobileClose.addEventListener('click', () => {
                navbarMobile.classList.remove('show');
                navbarToggle.classList.remove('active');
                navbarToggle.setAttribute('aria-expanded', 'false');
                if (overlay) overlay.classList.remove('show');
            });

            // Overlay click closes menu
            if (overlay) overlay.addEventListener('click', () => {
                navbarMobile.classList.remove('show');
                navbarToggle.classList.remove('active');
                navbarToggle.setAttribute('aria-expanded', 'false');
                overlay.classList.remove('show');
            });

            // Mobile language switch wiring
            const langSwitchMobile = document.getElementById('langSwitchMobile');
            if (langSwitchMobile) {
                langSwitchMobile.addEventListener('click', function() {
                    // reuse same switchLanguage function
                    switchLanguage();
                    // keep menu open briefly to show change, then close
                    setTimeout(() => {
                        navbarMobile.classList.remove('show');
                        navbarToggle.classList.remove('active');
                        navbarToggle.setAttribute('aria-expanded', 'false');
                        if (overlay) overlay.classList.remove('show');
                    }, 350);
                });
            }
        }

        navbarToggle.addEventListener('click', function() {
            const isExpanded = this.classList.contains('active');
            this.classList.toggle('active');
            this.setAttribute('aria-expanded', !isExpanded);

            if (navbarMobile) {
                navbarMobile.classList.toggle('show');
            }
            if (overlay) {
                overlay.classList.toggle('show');
            }
        });

        // Close mobile menu when clicking outside (updated to include overlay)
        document.addEventListener('click', function(e) {
            if (!navbarToggle.contains(e.target) && navbarMobile && !navbarMobile.contains(e.target)) {
                navbarMobile.classList.remove('show');
                navbarToggle.classList.remove('active');
                navbarToggle.setAttribute('aria-expanded', 'false');
                if (overlay) overlay.classList.remove('show');
            }
        });
    }

    // Initialize on page load and attach event listener
    langSwitch.addEventListener('click', switchLanguage);

    // Apply the current language state immediately so Arabic layout is correct on first load
    function applyLanguageState() {
        const lang = isArabic ? 'ar' : 'en';
        const dir = isArabic ? 'rtl' : 'ltr';
        document.querySelector('html').lang = lang;
        document.querySelector('html').dir = dir;
        document.body.dir = dir;
        // Show full target language name with globe icon (top & mobile)
        langSwitch.innerHTML = `<i class="fas fa-globe"></i> ${isArabic ? translations.ar.switchLangLabel : translations.en.switchLangLabel}`;
        langSwitch.setAttribute('aria-label', isArabic ? translations.ar.switchLangAria : translations.en.switchLangAria);
        const mobileLangLabel = document.getElementById('mobileLangLabel');
        const langSwitchMobile = document.getElementById('langSwitchMobile');
        if (mobileLangLabel) mobileLangLabel.textContent = isArabic ? translations.ar.switchLangLabel : translations.en.switchLangLabel;
        if (langSwitchMobile) langSwitchMobile.setAttribute('aria-label', isArabic ? translations.ar.switchLangAria : translations.en.switchLangAria);
        document.querySelector('.brand-text').textContent = translations[lang].brandName;
        document.querySelector('.brand-subtitle').textContent = translations[lang].brandSubtitle;
        document.getElementById('nav-home').textContent = translations[lang].home;
        document.getElementById('nav-about').textContent = translations[lang].about;
        document.getElementById('nav-vision').textContent = translations[lang].vision;
        document.getElementById('nav-services').textContent = translations[lang].services;
        document.getElementById('nav-structure').textContent = translations[lang].structure;
        document.getElementById('nav-team').textContent = translations[lang].team;
        document.getElementById('nav-contact').textContent = translations[lang].contact;

        const whatsappBtn = document.getElementById('whatsappBtn');
        if (whatsappBtn) {
            whatsappBtn.innerHTML = `<i class="fab fa-whatsapp"></i> ${translations[lang].whatsappBtn}`;
        }

        // Update mobile WhatsApp button
        const mobileWhatsappBtn = document.querySelector('.navbar-mobile .btn-whatsapp');
        if (mobileWhatsappBtn) {
            mobileWhatsappBtn.innerHTML = `<i class="fab fa-whatsapp"></i> ${translations[lang].whatsappBtn}`;
        }

        // Update mobile nav items if mobile menu exists
        const mobileNavItems = document.querySelectorAll('.navbar-mobile .nav-link-custom span[id]');
        mobileNavItems.forEach(span => {
            const id = span.id;
            if (id === 'nav-home') span.textContent = translations[lang].home;
            else if (id === 'nav-about') span.textContent = translations[lang].about;
            else if (id === 'nav-vision') span.textContent = translations[lang].vision;
            else if (id === 'nav-services') span.textContent = translations[lang].services;
            else if (id === 'nav-structure') span.textContent = translations[lang].structure;
            else if (id === 'nav-team') span.textContent = translations[lang].team;
            else if (id === 'nav-contact') span.textContent = translations[lang].contact;
        });
    }

    // Apply initial language state now
    applyLanguageState();

    // Custom file input functionality
    const fileInputButton = document.getElementById('fileInputButton');
    const fileInput = document.getElementById('attachment');
    const fileInputText = document.getElementById('fileInputText');

    if (fileInputButton && fileInput) {
        fileInputButton.addEventListener('click', function() {
            fileInput.click();
        });
    }

    if (fileInput && fileInputText) {
        fileInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const fileName = this.files[0].name;
                const fileSize = (this.files[0].size / 1024).toFixed(2) + ' KB';
                fileInputText.textContent = `${fileName} (${fileSize})`;
            } else {
                fileInputText.textContent = isArabic ? 'لم يتم اختيار ملف' : 'No file chosen';
            }
        });
    }

    // Contact Form Submission with WhatsApp integration
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const description = document.getElementById('description').value;
        const attachment = document.getElementById('attachment').files[0];

        // Validate form
        if (!name || !email || !phone || !service) {
            alert(isArabic ? 'يرجى ملء جميع الحقول الإجبارية' : 'Please fill all required fields');
            return;
        }

        // Disable submit button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = isArabic ? 'جاري الإرسال...' : 'Sending...';

        // Get service label
        const serviceSelect = document.getElementById('service');
        const serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;

        // Create WhatsApp message
        let whatsappMessage = `
*${isArabic ? 'اسم المرسل' : 'Sender Name'}:* ${name}
*${isArabic ? 'البريد الإلكتروني' : 'Email'}:* ${email}
*${isArabic ? 'رقم الهاتف' : 'Phone'}:* ${phone}
*${isArabic ? 'نوع الخدمة' : 'Service Type'}:* ${serviceText}`;

        // Add description if provided
        if (description) {
            whatsappMessage += `\n*${isArabic ? 'وصف الخدمة' : 'Service Description'}:*\n${description}`;
        }

        // Add attachment info if file is selected
        if (attachment) {
            whatsappMessage += `\n*${isArabic ? 'الملف المرفق' : 'Attached File'}:* ${attachment.name} (${(attachment.size / 1024).toFixed(2)} KB)`;
        }

        const whatsappLink = `https://wa.me/201014887070?text=${encodeURIComponent(whatsappMessage)}`;

        // Show success message and open WhatsApp
        alert(isArabic ? '✓ سيتم فتح واتساب لإرسال رسالتك\nشكراً لتواصلك معنا' : '✓ Opening WhatsApp to send your message\nThank you for contacting us');
        window.open(whatsappLink, '_blank');
        contactForm.reset();

        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar Collapse on Mobile
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarCollapse && navbarCollapse.classList) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 768) {
                    navbarCollapse.classList.remove('show');
                }
            });
        });
    }

    // Animate on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Language switching is handled by switchLanguage() on page load

    // Add animation classes to elements
    document.querySelectorAll('.card, .structure-item, .team-member').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Modal Management - Initialize all read-more buttons
    function initializeModals() {
        const buttons = document.querySelectorAll('.btn-read-more');
        
        buttons.forEach((button, index) => {
            const modalId = button.getAttribute('data-modal');
            // Remove any existing listeners by cloning
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            // Add fresh listener
            newButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.classList.add('show');
                    modal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                }
            });
        });
    }
    
    // Call the initialization function immediately
    initializeModals();
    
    // Also initialize on load just in case
    window.addEventListener('load', initializeModals);

    // Close modal button
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal-backdrop');
            if (modal && modal.classList) {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close modal when clicking on backdrop
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-backdrop.show').forEach(modal => {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            });
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.service-modal-overlay.active').forEach(modal => {
                window.closeServiceModal(modal.id);
            });
        }
    });
});
