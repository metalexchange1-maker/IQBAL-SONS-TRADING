// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme') || 'light';

// Set initial theme
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Modal Functionality
const orderBtn = document.getElementById('orderBtn');
const heroOrderBtn = document.getElementById('heroOrderBtn');
const closeModal = document.getElementById('closeModal');
const medicineModal = document.getElementById('medicineModal');
const medicinesGrid = document.getElementById('medicinesGrid');
const medicineSearch = document.getElementById('medicineSearch');

// Sample medicine data (150 medicines)
const medicines = [
    { name: "Panadol 500mg", price: "Rs. 50" },
    { name: "Brufen 400mg", price: "Rs. 80" },
    { name: "Augmentin 625mg", price: "Rs. 120" },
    { name: "Amoxil 500mg", price: "Rs. 90" },
    { name: "Ventolin Inhaler", price: "Rs. 300" },
    { name: "Lipitor 20mg", price: "Rs. 150" },
    { name: "Crestor 10mg", price: "Rs. 180" },
    { name: "Glucophage 500mg", price: "Rs. 60" },
    { name: "Lantus Solostar", price: "Rs. 1200" },
    { name: "Novorapid", price: "Rs. 1100" },
    { name: "Lasix 40mg", price: "Rs. 70" },
    { name: "Concor 5mg", price: "Rs. 100" },
    { name: "Coversyl 5mg", price: "Rs. 130" },
    { name: "Zyrtec 10mg", price: "Rs. 85" },
    { name: "Claritin 10mg", price: "Rs. 95" },
    { name: "Voltaren 50mg", price: "Rs. 110" },
    { name: "Arinac Forte", price: "Rs. 65" },
    { name: "Telfast 120mg", price: "Rs. 140" },
    { name: "Avomine 25mg", price: "Rs. 55" },
    { name: "Stemetil 5mg", price: "Rs. 45" },
    { name: "Flagyl 400mg", price: "Rs. 40" },
    { name: "Ciprofloxacin 500mg", price: "Rs. 75" },
    { name: "Diazepam 5mg", price: "Rs. 35" },
    { name: "Xanax 0.5mg", price: "Rs. 65" },
    { name: "Prozac 20mg", price: "Rs. 120" },
    { name: "Zoloft 50mg", price: "Rs. 130" },
    { name: "Synthroid 50mcg", price: "Rs. 95" },
    { name: "Levothyroxine 100mcg", price: "Rs. 85" },
    { name: "Metformin 500mg", price: "Rs. 55" },
    { name: "Januvia 100mg", price: "Rs. 250" },
    { name: "Actos 30mg", price: "Rs. 180" },
    { name: "Avandia 4mg", price: "Rs. 160" },
    { name: "Cozaar 50mg", price: "Rs. 110" },
    { name: "Diovan 80mg", price: "Rs. 140" },
    { name: "Plavix 75mg", price: "Rs. 200" },
    { name: "Effient 10mg", price: "Rs. 220" },
    { name: "Coumadin 5mg", price: "Rs. 45" },
    { name: "Pradaxa 150mg", price: "Rs. 280" },
    { name: "Xarelto 20mg", price: "Rs. 300" },
    { name: "Eliquis 5mg", price: "Rs. 320" },
    { name: "Nexium 40mg", price: "Rs. 170" },
    { name: "Prevacid 30mg", price: "Rs. 150" },
    { name: "Prilosec 20mg", price: "Rs. 130" },
    { name: "Zantac 150mg", price: "Rs. 60" },
    { name: "Pepcid 20mg", price: "Rs. 55" },
    { name: "Immodium 2mg", price: "Rs. 40" },
    { name: "Lomotil 2.5mg", price: "Rs. 50" },
    { name: "Miralax 17g", price: "Rs. 120" },
    { name: "Colace 100mg", price: "Rs. 45" },
    { name: "Senokot 8.6mg", price: "Rs. 35" },
    { name: "Dulcolax 5mg", price: "Rs. 30" },
    { name: "Benadryl 25mg", price: "Rs. 25" },
    { name: "Allegra 180mg", price: "Rs. 110" },
    { name: "Singulair 10mg", price: "Rs. 95" },
    { name: "Advair Diskus", price: "Rs. 450" },
    { name: "Spiriva Handihaler", price: "Rs. 500" },
    { name: "Proair HFA", price: "Rs. 280" },
    { name: "Proventil HFA", price: "Rs. 270" },
    { name: "Ventolin HFA", price: "Rs. 290" },
    { name: "Atrovent HFA", price: "Rs. 320" },
    { name: "Combivent Respimat", price: "Rs. 380" },
    { name: "Symbicort 160/4.5", price: "Rs. 420" },
    { name: "Dulera 100/5", price: "Rs. 400" },
    { name: "Flovent HFA 110mcg", price: "Rs. 350" },
    { name: "Qvar 40mcg", price: "Rs. 330" },
    { name: "Pulmicort Flexhaler", price: "Rs. 410" },
    { name: "Asmanex Twisthaler", price: "Rs. 390" },
    { name: "Alvesco 80mcg", price: "Rs. 370" },
    { name: "Arnuity Ellipta", price: "Rs. 430" },
    { name: "Breo Ellipta", price: "Rs. 450" },
    { name: "Incruse Ellipta", price: "Rs. 420" },
    { name: "Anoro Ellipta", price: "Rs. 440" },
    { name: "Stiolto Respimat", price: "Rs. 460" },
    { name: "Spiriva Respimat", price: "Rs. 480" },
    { name: "Tudorza Pressair", price: "Rs. 470" },
    { name: "Seebri Neohaler", price: "Rs. 450" },
    { name: "Utibron Neohaler", price: "Rs. 490" },
    { name: "Lonhala Magnair", price: "Rs. 510" },
    { name: "Yupelri", price: "Rs. 530" },
    { name: "Brovana", price: "Rs. 520" },
    { name: "Perforomist", price: "Rs. 540" },
    { name: "Striverdi Respimat", price: "Rs. 560" },
    { name: "Arcapta Neohaler", price: "Rs. 550" },
    { name: "ProAir RespiClick", price: "Rs. 300" },
    { name: "AirDuo RespiClick", price: "Rs. 320" },
    { name: "Arnuity RespiClick", price: "Rs. 340" },
    { name: "Flovent Diskus", price: "Rs. 360" },
    { name: "Serevent Diskus", price: "Rs. 380" },
    { name: "Advair Diskus", price: "Rs. 400" },
    { name: "Symbicort Turbuhaler", price: "Rs. 420" },
    { name: "Bricanyl Turbuhaler", price: "Rs. 280" },
    { name: "Oxeze Turbuhaler", price: "Rs. 350" },
    { name: "Pulmicort Turbuhaler", price: "Rs. 370" },
    { name: "Aptiophus", price: "Rs. 600" },
    { name: "Cayston", price: "Rs. 580" },
    { name: "Colistimethate", price: "Rs. 560" },
    { name: "Tobi Podhaler", price: "Rs. 620" },
    { name: "Bethkis", price: "Rs. 590" },
    { name: "Kitabis Pak", price: "Rs. 640" },
    { name: "Arikayce", price: "Rs. 680" },
    { name: "Zithromax 250mg", price: "Rs. 150" },
    { name: "Biaxin 500mg", price: "Rs. 170" },
    { name: "Levaquin 500mg", price: "Rs. 190" },
    { name: "Avelox 400mg", price: "Rs. 210" },
    { name: "Cefdinir 300mg", price: "Rs. 130" },
    { name: "Cefuroxime 500mg", price: "Rs. 120" },
    { name: "Cephalexin 500mg", price: "Rs. 80" },
    { name: "Doxycycline 100mg", price: "Rs. 70" },
    { name: "Minocycline 100mg", price: "Rs. 90" },
    { name: "Tetracycline 500mg", price: "Rs. 60" },
    { name: "Erythromycin 500mg", price: "Rs. 75" },
    { name: "Azithromycin 250mg", price: "Rs. 85" },
    { name: "Clindamycin 300mg", price: "Rs. 110" },
    { name: "Vancomycin 125mg", price: "Rs. 200" },
    { name: "Linezolid 600mg", price: "Rs. 350" },
    { name: "Daptomycin 500mg", price: "Rs. 400" },
    { name: "Ceftriaxone 1g", price: "Rs. 180" },
    { name: "Cefotaxime 1g", price: "Rs. 160" },
    { name: "Cefepime 1g", price: "Rs. 220" },
    { name: "Piperacillin 4g", price: "Rs. 240" },
    { name: "Meropenem 1g", price: "Rs. 280" },
    { name: "Imipenem 500mg", price: "Rs. 260" },
    { name: "Aztreonam 1g", price: "Rs. 230" },
    { name: "Gentamicin 80mg", price: "Rs. 45" },
    { name: "Tobramycin 80mg", price: "Rs. 50" },
    { name: "Amikacin 500mg", price: "Rs. 70" },
    { name: "Colistin 150mg", price: "Rs. 90" },
    { name: "Polymyxin B", price: "Rs. 85" },
    { name: "Trimethoprim 100mg", price: "Rs. 35" },
    { name: "Sulfamethoxazole 800mg", price: "Rs. 40" },
    { name: "Nitrofurantoin 100mg", price: "Rs. 55" },
    { name: "Fosfomycin 3g", price: "Rs. 120" },
    { name: "Metronidazole 500mg", price: "Rs. 45" },
    { name: "Tinidazole 500mg", price: "Rs. 50" },
    { name: "Clotrimazole 1%", price: "Rs. 30" },
    { name: "Miconazole 2%", price: "Rs. 35" },
    { name: "Fluconazole 150mg", price: "Rs. 65" },
    { name: "Itraconazole 100mg", price: "Rs. 85" },
    { name: "Voriconazole 200mg", price: "Rs. 180" },
    { name: "Posaconazole 100mg", price: "Rs. 200" },
    { name: "Isavuconazole 200mg", price: "Rs. 220" },
    { name: "Amphotericin B 50mg", price: "Rs. 150" },
    { name: "Nystatin 100000U", price: "Rs. 25" },
    { name: "Griseofulvin 500mg", price: "Rs. 70" },
    { name: "Terbinafine 250mg", price: "Rs. 95" }
];

// Function to display medicines
function displayMedicines(medicinesArray) {
    medicinesGrid.innerHTML = '';
    medicinesArray.forEach(medicine => {
        const medicineItem = document.createElement('div');
        medicineItem.className = 'medicine-item';
        medicineItem.innerHTML = `
            <div class="medicine-name">${medicine.name}</div>
            <div class="medicine-price">${medicine.price}</div>
        `;
        medicinesGrid.appendChild(medicineItem);
    });
}

// Function to filter medicines
function filterMedicines(searchTerm) {
    const filteredMedicines = medicines.filter(medicine =>
        medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    displayMedicines(filteredMedicines);
}

// Event Listeners for Modal
orderBtn.addEventListener('click', () => {
    medicineModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    displayMedicines(medicines);
});

heroOrderBtn.addEventListener('click', () => {
    medicineModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    displayMedicines(medicines);
});

closeModal.addEventListener('click', () => {
    medicineModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
medicineModal.addEventListener('click', (e) => {
    if (e.target === medicineModal) {
        medicineModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Search functionality
medicineSearch.addEventListener('input', (e) => {
    filterMedicines(e.target.value);
});

// Smooth scrolling for navigation links
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

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.style.display = 'none';
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Scroll animation for elements
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

// Observe elements for scroll animation
document.querySelectorAll('.service-card, .feature, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Display initial medicines
    displayMedicines(medicines);
    
    // Add click event to logo for home navigation
    document.querySelector('.logo-link').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('home').scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Keyboard navigation for modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && medicineModal.style.display === 'block') {
        medicineModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Form submission handling
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will contact you soon.');
    this.reset();
});