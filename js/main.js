// =========================
// main.js – AltekFlo
// =========================

document.addEventListener("DOMContentLoaded", () => {
    setupSmoothScrolling();
    setupInterestForm();
});

// =========================
// Smooth scrolling for anchor links
// =========================
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");

            if (targetId.length > 1) {
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    e.preventDefault();
                    targetEl.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        });
    });
}

// =========================
// Interest / Early Access Form
// =========================
function setupInterestForm() {
    const form = document.getElementById("interest-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Basic validation (frontend only)
        if (
            !data.business_name ||
            !data.email ||
            !data.whatsapp ||
            !data.intended_use
        ) {
            alert("Please fill in all required fields.");
            return;
        }

        // Very light UX feedback
        const submitBtn = form.querySelector("button");
        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting...";

        // --------------------------------
        // PLACEHOLDER: Submission logic
        // --------------------------------
        // Later you can:
        // - send this to your backend
        // - send to n8n
        // - send to Google Forms
        // - store in DB
        //
        // Example (future):
        // fetch("/api/interest", { method: "POST", body: JSON.stringify(data) })

        console.log("Interest form submitted:", data);

        // Simulated success
        setTimeout(() => {
            alert(
                "Thank you! Your request has been received. We will contact you soon."
            );
            form.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = "Request Access";
        }, 800);
    });
}
