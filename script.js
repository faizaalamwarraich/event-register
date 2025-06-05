document.addEventListener('DOMContentLoaded', () => {
    const eventCardsContainer = document.getElementById('event-cards-container');
    let allEvents = [];
    const searchBar = document.getElementById('search-bar');
    fetch('events.json')
        .then(response => response.json())
        .then(data => {
            allEvents = data;
            allEvents = data;
            displayEvents(allEvents); 
        })
        .catch(error => console.error('Error fetching events:', error));
    if (searchBar) {
        searchBar.addEventListener('keyup', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredEvents = allEvents.filter(event => {
                return event.name.toLowerCase().includes(searchTerm);
            });
            displayEvents(filteredEvents);
        });
    }

    function displayEvents(events) {
        eventCardsContainer.innerHTML = '';
        if (events.length === 0) {
            eventCardsContainer.innerHTML = '<p class="col-12 text-center">No events found.</p>';
            return;
        }

        events.forEach(event => {
            const eventCard = `
                <div class="col-lg-4 col-md-6 mb-4 d-flex align-items-stretch">
                    <div class="card event-card w-100">
                        <img src="${event.image}" class="card-img-top event-card-image" alt="${event.name}">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${event.name}</h5>
                            <p class="card-text event-date-location mb-1"><small class="text-muted"><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()} at ${event.time}</small></p>
                            <p class="card-text event-date-location mb-2"><small class="text-muted"><strong>Location:</strong> ${event.location}</small></p>
                            <h6 class="card-subtitle mb-1 text-muted">Description:</h6>
                            <p class="card-text event-description flex-grow-1">${event.description}</p>
                            <div class="mt-auto text-center">
                                <a href="#" class="btn btn-primary btn-purple-theme">Register</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            eventCardsContainer.innerHTML += eventCard;
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.length > 1) {
                 const targetElement = document.querySelector(targetId);
                 if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                 }
            }
        });
    });

    const logoImg = document.querySelector('.navbar-brand img');
    if (logoImg) {
        logoImg.onerror = () => {
            logoImg.style.display = 'none'; 
            const brandText = logoImg.nextSibling;
            if (brandText && brandText.nodeType === Node.TEXT_NODE) {
            }
        };
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const questions = document.getElementById('questions').value;
            console.log('Contact Form Submitted:', {
                firstName,
                lastName,
                email,
                questions
            });
        
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    const heroTextElement = document.getElementById('hero-text');
    const textToType = "Discover Events Near You";
    if (heroTextElement) {
        heroTextElement.textContent = textToType; 
    }

    const signUpModal = document.getElementById('signUpModal');
    const logInModal = document.getElementById('logInModal');

    const openSignUpBtn = document.querySelector('.btn-signup'); 

    const closeSignUpModalBtn = document.getElementById('closeSignUpModal');
    const closeLogInModalBtn = document.getElementById('closeLogInModal');

    const switchToLogInLink = document.getElementById('switchToLogIn');
    const switchToSignUpLink = document.getElementById('switchToSignUp');

    const signUpForm = document.getElementById('signUpForm');
    const logInForm = document.getElementById('logInForm');

    function openModal(modal) {
        if (modal) modal.classList.add('active');
    }

    function closeModal(modal) {
        if (modal) modal.classList.remove('active');
    }

    if (openSignUpBtn) {
        openSignUpBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            openModal(signUpModal);
        });
    }

    if (closeSignUpModalBtn) {
        closeSignUpModalBtn.addEventListener('click', () => closeModal(signUpModal));
    }

    if (closeLogInModalBtn) {
        closeLogInModalBtn.addEventListener('click', () => closeModal(logInModal));
    }

    if (switchToLogInLink) {
        switchToLogInLink.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(signUpModal);
            openModal(logInModal, 'left');
        });
    }

    if (switchToSignUpLink) {
        switchToSignUpLink.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(logInModal);
            openModal(signUpModal, 'right');
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === signUpModal) {
            closeModal(signUpModal);
        }
        if (event.target === logInModal) {
            closeModal(logInModal);
        }
    });

    if (signUpForm) {
        signUpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullName = signUpForm.fullName.value;
            const email = signUpForm.email.value;
            const password = signUpForm.password.value;
            const confirmPassword = signUpForm.confirmPassword.value;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            console.log('Sign Up attempt:', { fullName, email, password });
            alert('Sign Up Successful! (Data logged to console)');
            signUpForm.reset();
            closeModal(signUpModal);
        });
    }

    if (logInForm) {
        logInForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = logInForm.email.value;
            const password = logInForm.password.value;
            console.log('Log In attempt:', { email, password });
            alert('Log In Successful! (Data logged to console)');
            logInForm.reset();
            closeModal(logInModal);
        });
    }
});
