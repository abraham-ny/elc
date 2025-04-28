document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const cards = document.querySelectorAll('.card');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetId = link.getAttribute('href').substring(1);
            const targetCard = document.getElementById(targetId);

            // Remove active class from all cards
            cards.forEach(card => card.classList.remove('active-card'));

            // Add active class to the selected card
            targetCard.querySelector('.card').classList.add('active-card');
        });
    });

    // Feedback form submission handling
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formMessage = document.getElementById('formMessage');
            formMessage.textContent = '';
            formMessage.className = '';

            const formData = new FormData(feedbackForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                feedback: formData.get('feedback')
            };

            if (!data.feedback.trim()) {
                formMessage.textContent = 'Please enter your feedback.';
                formMessage.className = 'text-danger';
                return;
            }

            try {
                // Replace the URL below with your deployed Google Apps Script web app URL
                const response = await fetch('https://script.google.com/macros/s/AKfycbwttkWLN9pRSoumisQrDJRoXjCz8b318eo1fTlBi171uL5HA0U4ZcGkB6Gx1PIvfieigw/exec', {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                // Since mode: 'no-cors' is used, we cannot check response.ok
                formMessage.textContent = 'Thank you for your feedback!';
                formMessage.className = 'text-success';
                feedbackForm.reset();
            } catch (error) {
                formMessage.textContent = 'An error occurred while submitting your feedback. Please try again later.';
                formMessage.className = 'text-danger';
            }
        });
    }
});
