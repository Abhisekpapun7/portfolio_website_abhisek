document.addEventListener("DOMContentLoaded", function() {
    gsap.from(".fade-in", {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.3
    });
});

const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", function() {
    const text = "Abhisek Mallick";
    const target = document.querySelector(".animated-name");

    function typeAnimation() {
        target.innerHTML = ""; // Clear previous text
        let index = 0;
        
        function typeLetter() {
            if (index < text.length) {
                target.innerHTML += text[index];
                index++;
                setTimeout(typeLetter, 100); // Typing speed
            } else {
                setTimeout(() => {
                    eraseAnimation();
                }, 2000); // Pause before erasing
            }
        }

        function eraseAnimation() {
            if (target.innerHTML.length > 0) {
                target.innerHTML = target.innerHTML.slice(0, -1);
                setTimeout(eraseAnimation, 50); // Erasing speed
            } else {
                setTimeout(typeAnimation, 1000); // Pause before restarting
            }
        }

        typeLetter();
    }

    typeAnimation();
});


// about section code
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(event) {
        event.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        target.scrollIntoView({
            behavior: "smooth"
        });
    });
});



//skill section animation code

document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    // Fade-in animation for elements
    gsap.utils.toArray(".fade-in").forEach((element) => {
        gsap.from(element, {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
        });
    });

    // Smooth scrolling for the Skills section
    const skillsLink = document.getElementById("skills-link");
    const skillsSection = document.getElementById("skills");

    if (skillsLink && skillsSection) {
        skillsLink.addEventListener("click", function (event) {
            event.preventDefault();
            skillsSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    }
});


// code for the contact section section

document.addEventListener("DOMContentLoaded", function () {
    // Smooth scrolling for the Contact section
    const contactLink = document.getElementById("contact-link");
    const contactSection = document.getElementById("contact");

    if (contactLink && contactSection) {
        contactLink.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default anchor behavior

            contactSection.scrollIntoView({
                behavior: "smooth", // Enables smooth scrolling
                block: "start"
            });
        });
    }
});

// logic for sending message

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch("https://your-vercel-app.vercel.app/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('responseMessage').textContent = data.message;
    })
    .catch(error => {
        document.getElementById('responseMessage').textContent = 'Error sending message: ' + error.message;
        console.error('Error:', error);
    });
});
