
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenu) {
    mobileMenu.addEventListener('click', function() {
        const navItems = document.getElementById('nav-items');
        if (navItems) {
            navItems.classList.toggle('show');
        }
    });
}

const handleselect = () => {
    const customSelect = document.querySelector(".custom-select");
    const selectBtn = document.querySelector(".select-button");
    const selectedValue = document.querySelector(".selected-value");
    const optionsList = document.querySelectorAll(".select-dropdown li");

    // Ensure that the required elements exist before adding event listeners
    if (customSelect && selectBtn && selectedValue && optionsList.length) {
        // Toggle the dropdown visibility when the button is clicked
        selectBtn.addEventListener("click", (e) => {
            e.stopPropagation();

            customSelect.classList.toggle("active");

            // Update the aria-expanded attribute
            const isExpanded = selectBtn.getAttribute("aria-expanded") === "true";
            selectBtn.setAttribute("aria-expanded", !isExpanded ? "true" : "false");
        });

        // Handle selecting an option from the dropdown
        optionsList.forEach((option) => {
            option.addEventListener("click", (e) => {
                e.stopPropagation();  // Prevents clicks on the option from closing the dropdown unexpectedly

                // Update the displayed selected value
                selectedValue.textContent = option.querySelector("label").textContent;

                // Remove the active class to close the dropdown
                customSelect.classList.remove("active");

                // Update the aria-expanded attribute to reflect the closed state
                selectBtn.setAttribute("aria-expanded", "false");
            });
        });

        // Close the dropdown if clicking outside of the custom select
        document.addEventListener("click", () => {
            if (customSelect.classList.contains("active")) {
                customSelect.classList.remove("active");
                selectBtn.setAttribute("aria-expanded", "false");
            }
        });

        // Allow selecting an option using the Enter key
        optionsList.forEach((option) => {
            option.addEventListener("keyup", (e) => {
                if (e.key === "Enter") {
                    // Update the selected value
                    selectedValue.textContent = option.querySelector("label").textContent;

                    // Close the dropdown
                    customSelect.classList.remove("active");

                    // Update aria-expanded
                    selectBtn.setAttribute("aria-expanded", "false");
                }
            });
        });
    }
};

// Call handleselect after window loads
window.onload = handleselect;
