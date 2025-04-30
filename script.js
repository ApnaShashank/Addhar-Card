document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded, initializing scripts...");
    try {
        // Check Ionicon availability
        if (!window.ionicons) {
            console.error("Ionicon library not loaded, icons may not display");
        } else {
            console.log("Ionicon library loaded successfully");
        }

        // Welcome Animation
        const welcomeOverlay = document.getElementById("welcomeOverlay");
        if (welcomeOverlay) {
            console.log("Starting welcome animation...");
            setTimeout(() => {
                welcomeOverlay.classList.add("hidden");
                console.log("Welcome animation completed");
            }, 3000);
        } else {
            console.error("Element #welcomeOverlay not found");
        }

        // Dark/Light Mode Toggle with localStorage
        const themeToggle = document.getElementById("themeToggle");
        const body = document.body;
        if (themeToggle && body) {
            const moonIcon = themeToggle.querySelector(".moon");
            const sunIcon = themeToggle.querySelector(".sun");
            if (moonIcon && sunIcon) {
                // Load saved theme
                const savedTheme = localStorage.getItem("theme") || "dark";
                body.setAttribute("data-theme", savedTheme);
                if (savedTheme === "light") {
                    moonIcon.classList.add("hidden");
                    sunIcon.classList.remove("hidden");
                }
                themeToggle.addEventListener("click", () => {
                    try {
                        console.log("Toggling theme...");
                        const currentTheme = body.getAttribute("data-theme");
                        const newTheme = currentTheme === "dark" ? "light" : "dark";
                        body.setAttribute("data-theme", newTheme);
                        localStorage.setItem("theme", newTheme);
                        moonIcon.classList.toggle("hidden", newTheme === "light");
                        sunIcon.classList.toggle("hidden", newTheme === "dark");
                        console.log(`Theme set to ${newTheme}`);
                    } catch (err) {
                        console.error("Theme toggle error:", err);
                    }
                });
            } else {
                console.error("Theme icons (.moon or .sun) not found");
            }
        } else {
            console.error("Element #themeToggle or body not found");
        }

        // Sidebar Toggle
        const sidebarBtn = document.querySelector("[data-sidebar-btn]");
        const sidebar = document.querySelector("[data-sidebar]");
        if (sidebarBtn && sidebar) {
            sidebarBtn.addEventListener("click", () => {
                try {
                    console.log("Toggling sidebar...");
                    sidebar.classList.toggle("active");
                    console.log("Sidebar toggled");
                } catch (err) {
                    console.error("Sidebar toggle error:", err);
                }
            });
        } else {
            console.error("Element [data-sidebar-btn] or [data-sidebar] not found");
        }

        // Navbar Navigation
        const navLinks = document.querySelectorAll("[data-nav-link]");
        const pages = document.querySelectorAll("[data-page]");
        
        if (navLinks.length && pages.length) {
            // Function to show a specific page
            function showPage(pageName) {
                console.log("Showing page:", pageName);
                
                // Hide all pages
                pages.forEach(page => {
                    page.classList.remove("active");
                });
                
                // Show the selected page
                const targetPage = document.querySelector(`[data-page="${pageName}"]`);
                if (targetPage) {
                    targetPage.classList.add("active");
                }
                
                // Update active state of navigation links
                navLinks.forEach(nav => {
                    if (nav.getAttribute("data-nav-link") === pageName) {
                        nav.classList.add("active");
                    } else {
                        nav.classList.remove("active");
                    }
                });
            }

            // Add click event listeners to navigation links
            navLinks.forEach(link => {
                link.addEventListener("click", () => {
                    const targetPage = link.getAttribute("data-nav-link");
                    console.log("Navigating to:", targetPage);
                    showPage(targetPage);
                });
            });

            // Show the initial active page (About)
            showPage("about");
        } else {
            console.error("Navigation elements not found");
        }

        // Portfolio Filter
        const filterButtons = document.querySelectorAll("[data-filter-btn]");
        const filterItems = document.querySelectorAll("[data-filter-item]");
        if (filterButtons.length && filterItems.length) {
            filterButtons.forEach(btn => {
                btn.addEventListener("click", () => {
                    try {
                        const filterValue = btn.textContent.toLowerCase().trim();
                        console.log("Applying filter:", filterValue);
                        filterButtons.forEach(b => b.classList.remove("active"));
                        btn.classList.add("active");
                        filterItems.forEach(item => {
                            const category = item.getAttribute("data-category").toLowerCase().trim();
                            item.classList.toggle("active", filterValue === "all" || filterValue === category);
                        });
                        console.log("Filter applied:", filterValue);
                    } catch (err) {
                        console.error("Filter error:", err);
                    }
                });
            });
        } else {
            console.error("Elements [data-filter-btn] or [data-filter-item] not found");
        }

        // Contact Form (Prevent default with alert)
        const form = document.querySelector("[data-form]");
        if (form) {
            form.addEventListener("submit", e => {
                e.preventDefault();
                console.log("Form submission prevented; update Formspree ID for functionality");
                alert("The contact form is currently disabled. Please use email or phone to reach out.");
            });
        } else {
            console.error("Element [data-form] not found");
        }

        // Resume PDF Generation
        window.generateResumePDF = function () {
            try {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();
                doc.setFontSize(16);
                doc.text("Shashank Gupta", 20, 20);
                doc.setFontSize(12);
                doc.text("Email: shashank8808108802@gmail.com", 20, 30);
                doc.text("Phone: +91 7355388120", 20, 40);
                doc.text("Location: Jiyanpur, Azamgarh, Uttar Pradesh, India", 20, 50);
                doc.text("Education:", 20, 60);
                doc.text("- BCA, Shoolini University (2023-Present)", 30, 70);
                doc.text("- 12th, Children Public School (2023)", 30, 80);
                doc.text("- 10th, Jaish Public School (2021)", 30, 90);
                doc.text("- ADCA Certification (Year TBD)", 30, 100);
                doc.text("Skills: HTML (Advanced), CSS (Moderate), AI Tools", 20, 110);
                doc.text("Projects:", 20, 120);
                doc.text("- The Gaming Hub: Interactive gaming website", 30, 130);
                doc.text("- The Archer: Arcade-style archery game", 30, 140);
                doc.text("- All-in-One Converter: Utility tool for conversions", 30, 150);
                doc.text("- E-commerce Store: Responsive online store", 30, 160);
                doc.text("Hobbies: Listening to music, learning new technologies", 20, 170);
                doc.text("Career Goal: Become an AI master and develop multiple skills", 20, 180);
                doc.save("resume.pdf");
                console.log("Resume PDF generated and downloaded");
            } catch (err) {
                console.error("Resume PDF generation error:", err);
                alert("Failed to generate resume PDF. Please try again or contact support.");
            }
        };
    } catch (err) {
        console.error("Global script error:", err.message, err.stack);
    }
});
