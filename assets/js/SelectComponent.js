class CustomSelect {
    constructor(element) {
      this.customSelect = element;
      this.selectBtn = this.customSelect.querySelector(".select-button");
      this.selectedValue = this.customSelect.querySelector(".selected-value");
      this.optionsList = this.customSelect.querySelectorAll(".select-dropdown li");
  
      this.init();
    }
  
    init() {
      // Toggle the dropdown visibility when the button is clicked
      this.selectBtn.addEventListener("click", (e) => this.toggleDropdown(e));
  
      // Handle selecting an option from the dropdown
      this.optionsList.forEach(option => {
        option.addEventListener("click", (e) => this.selectOption(e, option));
        option.addEventListener("keyup", (e) => this.selectOptionByKey(e, option));
      });
  
      // Close the dropdown if clicking outside of the custom select
      document.addEventListener("click", (e) => this.handleDocumentClick(e));
    }
  
    toggleDropdown(e) {
      e.stopPropagation();
      const isExpanded = this.selectBtn.getAttribute("aria-expanded") === "true";
      this.customSelect.classList.toggle("year-active");
      this.selectBtn.setAttribute("aria-expanded", !isExpanded ? "true" : "false");
    }
  
    selectOption(e, option) {
      e.stopPropagation();
      this.selectedValue.textContent = option.querySelector("label").textContent;
      this.customSelect.classList.remove("year-active");
      this.selectBtn.setAttribute("aria-expanded", "false");
    }
  
    selectOptionByKey(e, option) {
      if (e.key === "Enter") {
        this.selectOption(e, option);
      }
    }
  
    handleDocumentClick(e) {
      if (!this.customSelect.contains(e.target) && this.customSelect.classList.contains("year-active")) {
        this.customSelect.classList.remove("year-active");
        this.selectBtn.setAttribute("aria-expanded", "false");
      }
    }
  
    static initAll() {
      const customSelectElements = document.querySelectorAll(".custom-select");
      customSelectElements.forEach(element => {
        new CustomSelect(element);
      });
    }
  }
  
  // Initialize all custom selects on document ready
  document.addEventListener("DOMContentLoaded", () => {
    CustomSelect.initAll();
  });
  