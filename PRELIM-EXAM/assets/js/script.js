// Add this to your script.js
document.addEventListener('DOMContentLoaded', function() {
    // Preload hero background image
    const heroBg = new Image();
    heroBg.src = '../img/bg.jpg';
    
    heroBg.onload = function() {
        // Add class when image is loaded
        document.querySelector('.hero').classList.add('has-bg');
        
        // Fade in background
        document.querySelector('.hero').style.transition = 'background-image 0.5s ease';
    };
    
    heroBg.onerror = function() {
        // Handle image loading error
        console.warn('Hero background image failed to load, using gradient fallback');
        document.querySelector('.hero').style.background = 
            'linear-gradient(135deg, var(--color-maroon), var(--color-brown))';
    };
    
    // Smooth scroll for scroll indicator
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Account for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

        document.addEventListener('DOMContentLoaded', function() {
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            const navMenu = document.querySelector('.nav-menu');
            
            if (menuToggle) {
                menuToggle.addEventListener('click', function() {
                    navMenu.classList.toggle('active');
                    const icon = this.querySelector('i');
                    icon.classList.toggle('fa-bars');
                    icon.classList.toggle('fa-times');
                });
            }
            
            // Close menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    if (navMenu) {
                        navMenu.classList.remove('active');
                        const icon = document.querySelector('.mobile-menu-toggle i');
                        if (icon) {
                            icon.classList.add('fa-bars');
                            icon.classList.remove('fa-times');
                        }
                    }
                });
            });
            
            // Add scroll effect to header
            window.addEventListener('scroll', function() {
                const header = document.querySelector('header');
                if (window.scrollY > 100) {
                    header.style.boxShadow = 'var(--shadow-md)';
                } else {
                    header.style.boxShadow = 'var(--shadow-sm)';
                }
            });
        });
               document.addEventListener('DOMContentLoaded', function() {
            // Mobile menu
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            const navMenu = document.querySelector('.nav-menu');
            
            if (menuToggle) {
                menuToggle.addEventListener('click', function() {
                    navMenu.classList.toggle('active');
                    const icon = this.querySelector('i');
                    icon.classList.toggle('fa-bars');
                    icon.classList.toggle('fa-times');
                });
            }
            
            // Event filtering
            const filterButtons = document.querySelectorAll('.filter-btn');
            const eventCards = document.querySelectorAll('.event-card');
            
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    const filter = this.getAttribute('data-filter');
                    
                    // Show/hide events based on filter
                    eventCards.forEach(card => {
                        if (filter === 'all') {
                            card.style.display = 'block';
                        } else {
                            const categories = card.getAttribute('data-category');
                            if (categories.includes(filter)) {
                                card.style.display = 'block';
                            } else {
                                card.style.display = 'none';
                            }
                        }
                        
                        // Add animation for showing cards
                        if (card.style.display === 'block') {
                            card.style.animation = 'fadeIn 0.5s ease';
                        }
                    });
                });
            });
            
            // Calendar functionality
            const calendar = document.getElementById('calendar');
            const currentMonth = document.getElementById('currentMonth');
            const prevMonthBtn = document.getElementById('prevMonth');
            const nextMonthBtn = document.getElementById('nextMonth');
            
            let currentDate = new Date();
            
            function renderCalendar(date) {
                const year = date.getFullYear();
                const month = date.getMonth();
                
                // Set month header
                const monthNames = [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                ];
                currentMonth.textContent = `${monthNames[month]} ${year}`;
                
                // Clear calendar
                calendar.innerHTML = '';
                
                // Add day headers
                const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                dayHeaders.forEach(day => {
                    const dayElement = document.createElement('div');
                    dayElement.className = 'calendar-day header';
                    dayElement.textContent = day;
                    calendar.appendChild(dayElement);
                });
                
                // Get first day of month
                const firstDay = new Date(year, month, 1);
                const startingDay = firstDay.getDay();
                
                // Get days in month
                const daysInMonth = new Date(year, month + 1, 0).getDate();
                
                // Add empty cells for days before first day of month
                for (let i = 0; i < startingDay; i++) {
                    const emptyDay = document.createElement('div');
                    emptyDay.className = 'calendar-day empty';
                    calendar.appendChild(emptyDay);
                }
                
                // Add days of month
                const today = new Date();
                const eventDays = [15, 17, 20, 21, 25, 28]; // Days with events
                
                for (let day = 1; day <= daysInMonth; day++) {
                    const dayElement = document.createElement('div');
                    dayElement.className = 'calendar-day';
                    dayElement.textContent = day;
                    
                    // Check if today
                    if (day === today.getDate() && 
                        month === today.getMonth() && 
                        year === today.getFullYear()) {
                        dayElement.classList.add('today');
                    }
                    
                    // Check if has event
                    if (eventDays.includes(day)) {
                        dayElement.classList.add('has-event');
                        dayElement.title = 'Has JPCS Event';
                    }
                    
                    dayElement.addEventListener('click', function() {
                        // Highlight clicked day
                        document.querySelectorAll('.calendar-day').forEach(d => {
                            d.classList.remove('selected');
                        });
                        this.classList.add('selected');
                        
                        // Filter events for this day
                        const selectedDate = new Date(year, month, day);
                        const dateStr = selectedDate.toDateString();
                        console.log('Selected date:', dateStr);
                        // You could implement date-based filtering here
                    });
                    
                    calendar.appendChild(dayElement);
                }
            }
            
            // Initial calendar render
            renderCalendar(currentDate);
            
            // Month navigation
            prevMonthBtn.addEventListener('click', function() {
                currentDate.setMonth(currentDate.getMonth() - 1);
                renderCalendar(currentDate);
            });
            
            nextMonthBtn.addEventListener('click', function() {
                currentDate.setMonth(currentDate.getMonth() + 1);
                renderCalendar(currentDate);
            });
            
            // Pagination
            const pageButtons = document.querySelectorAll('.page-btn');
            pageButtons.forEach(button => {
                button.addEventListener('click', function() {
                    pageButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    // Implement pagination logic here
                });
            });
            
            // Event registration buttons
            document.querySelectorAll('.btn-sm').forEach(button => {
                if (button.textContent.includes('Register')) {
                    button.addEventListener('click', function(e) {
                        e.preventDefault();
                        const eventTitle = this.closest('.event-card').querySelector('.event-title').textContent;
                        alert(`Redirecting to registration for: ${eventTitle}`);
                        // In production, this would redirect to registration page
                        // window.location.href = 'registration.html?event=' + encodeURIComponent(eventTitle);
                    });
                }
            });
            
            // Smooth scroll for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    if (this.getAttribute('href') !== '#') {
                        e.preventDefault();
                        const targetId = this.getAttribute('href');
                        const targetElement = document.querySelector(targetId);
                        
                        if (targetElement) {
                            window.scrollTo({
                                top: targetElement.offsetTop - 80,
                                behavior: 'smooth'
                            });
                        }
                    }
                });
            });
        });


// MOBILE VIEW

        document.addEventListener('DOMContentLoaded', function() {
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            const navMenu = document.querySelector('.nav-menu');
            
            if (menuToggle) {
                menuToggle.addEventListener('click', function() {
                    navMenu.classList.toggle('active');
                    const icon = this.querySelector('i');
                    icon.classList.toggle('fa-bars');
                    icon.classList.toggle('fa-times');
                });
            }
        });


// OFFICERS

       document.addEventListener('DOMContentLoaded', function() {
            // Mobile menu
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            const navMenu = document.querySelector('.nav-menu');
            
            if (menuToggle) {
                menuToggle.addEventListener('click', function() {
                    navMenu.classList.toggle('active');
                    const icon = this.querySelector('i');
                    icon.classList.toggle('fa-bars');
                    icon.classList.toggle('fa-times');
                });
            }
            
            // Officer filtering
            const filterButtons = document.querySelectorAll('.filter-btn');
            const officerCards = document.querySelectorAll('.officer-card');
            
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    const filter = this.getAttribute('data-filter');
                    
                    // Show/hide officers based on filter
                    officerCards.forEach(card => {
                        if (filter === 'all') {
                            card.style.display = 'block';
                        } else {
                            const categories = card.getAttribute('data-category');
                            if (categories.includes(filter)) {
                                card.style.display = 'block';
                            } else {
                                card.style.display = 'none';
                            }
                        }
                        
                        // Add animation for showing cards
                        if (card.style.display === 'block') {
                            card.style.animation = 'fadeIn 0.5s ease';
                        }
                    });
                });
            });
            
            // Contact link interactions
            document.querySelectorAll('.contact-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    if (this.getAttribute('href').startsWith('mailto:')) {
                        const officerName = this.closest('.officer-card').querySelector('.officer-name').textContent;
                        console.log(`Emailing ${officerName}`);
                    }
                });
            });
            
            // Hover effect for org chart nodes
            document.querySelectorAll('.chart-node').forEach(node => {
                node.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-5px)';
                    this.style.boxShadow = 'var(--shadow-md)';
                });
                
                node.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = 'var(--shadow-sm)';
                });
            });
            
            // Smooth scroll for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    if (this.getAttribute('href') !== '#') {
                        e.preventDefault();
                        const targetId = this.getAttribute('href');
                        const targetElement = document.querySelector(targetId);
                        
                        if (targetElement) {
                            window.scrollTo({
                                top: targetElement.offsetTop - 80,
                                behavior: 'smooth'
                            });
                        }
                    }
                });
            });
        });