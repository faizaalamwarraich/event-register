document.addEventListener('DOMContentLoaded', () => {
    const eventCardsContainer = document.getElementById('event-cards-container');
    let allEvents = [];
    const searchBar = document.getElementById('search-bar');

    // Fetch event data from JSON file
    fetch('events.json')
        .then(response => response.json())
        .then(data => {
            allEvents = data;
            allEvents = data;
            displayEvents(allEvents); // Display all events initially or based on search
        })
        .catch(error => console.error('Error fetching events:', error));

    // Event listener for the search bar
    if (searchBar) {
        searchBar.addEventListener('keyup', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredEvents = allEvents.filter(event => {
                return event.name.toLowerCase().includes(searchTerm);
            });
            displayEvents(filteredEvents);
        });
    }

    // Function to display events
    function displayEvents(events) {
        eventCardsContainer.innerHTML = ''; // Clear existing cards
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

    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.length > 1) { // Ensure it's not just '#'
                 const targetElement = document.querySelector(targetId);
                 if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                 }
            }
        });
    });

    // Optional: Add a placeholder logo image if you don't have one
    // This is just to prevent a broken image icon if 'placeholder-logo.png' doesn't exist.
    // You should replace 'placeholder-logo.png' with your actual logo.
    const logoImg = document.querySelector('.navbar-brand img');
    if (logoImg) {
        logoImg.onerror = () => {
            logoImg.style.display = 'none'; // Hide if image fails to load
            const brandText = logoImg.nextSibling;
            if (brandText && brandText.nodeType === Node.TEXT_NODE) {
                // Potentially add a fallback text or icon here if needed
            }
        };
    }

    // Contact Form Submission (Basic: logs to console and prevents default)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual submission
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
            // Here you would typically send the data to a server
            // For now, we can just clear the form or show a message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Hero Text Typing Animation
    const heroTextElement = document.getElementById('hero-text');
    const textToType = "Discover Events Near You";
    if (heroTextElement) {
        heroTextElement.textContent = textToType; // Set the text for CSS animation to reveal
        // The CSS animation 'typing' now loops infinitely and has no visible cursor.
    }

    // --- Auth Modal Functionality ---
    const signUpModal = document.getElementById('signUpModal');
    const logInModal = document.getElementById('logInModal');

    const openSignUpBtn = document.querySelector('.btn-signup'); // Using class selector

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
            e.preventDefault(); // Prevent navigating to #signup
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
            openModal(logInModal, 'left'); // Slide in from left
        });
    }

    if (switchToSignUpLink) {
        switchToSignUpLink.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(logInModal);
            openModal(signUpModal, 'right'); // Slide in from right
        });
    }

    // Close modal if user clicks outside of the modal content
    window.addEventListener('click', (event) => {
        if (event.target === signUpModal) {
            closeModal(signUpModal);
        }
        if (event.target === logInModal) {
            closeModal(logInModal);
        }
    });

    // Handle Sign Up form submission
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

    // Handle Log In form submission
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
