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

document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();
    const responseMessage = document.getElementById('responseMessage');

    if (!name || !email || !message) {
        responseMessage.textContent = "❌ All fields are required.";
        responseMessage.style.color = "red";
        return;
    }

    responseMessage.textContent = "⏳ Sending...";
    responseMessage.style.color = "blue";

    try {
        const response = await fetch("https://portfolio-backend-psi-six.vercel.app/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        responseMessage.textContent = "✅ " + result.message;
        responseMessage.style.color = "green";
        this.reset();  // Clear form after successful submission

    } catch (error) {
        responseMessage.textContent = "❌ Error sending message: " + error.message;
        responseMessage.style.color = "red";
        console.error("Error:", error);
    }
});


// code for comming soon section
// Optional JavaScript to show a scroll effect or interactivity for the Coming Soon section
document.addEventListener("DOMContentLoaded", function() {
    const comingSoonSection = document.getElementById("coming-soon");
    const workImage = document.querySelector(".work-image");
  
    // Example: Add a fade-in effect to the section when the page loads
    comingSoonSection.style.opacity = 0;
    setTimeout(() => {
      comingSoonSection.style.transition = "opacity 1s ease-in-out";
      comingSoonSection.style.opacity = 1;
    }, 500);
  
    // Optionally, add an image for "work in progress"
    workImage.setAttribute("src", "images/coming_soon.png");  // Change the source to your image path
  });
  