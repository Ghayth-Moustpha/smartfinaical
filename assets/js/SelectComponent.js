export default class SelectComponent {
  constructor({ options = [], name = "select", placeholder = "Select an option", onChange = () => {} }) {
    this.options = options;
    this.name = name;
    this.placeholder = placeholder;
    this.onChange = onChange;
    this.selectedValue = null;
  }

  // Method to render the custom select component
  render(container) {
    // Create main wrapper div
    const customSelect = document.createElement("div");
    customSelect.classList.add("custom-select");

    // Create select button
    const selectBtn = document.createElement("span");
    selectBtn.classList.add("select-button");
    selectBtn.setAttribute("role", "combobox");
    selectBtn.setAttribute("aria-haspopup", "listbox");
    selectBtn.setAttribute("aria-expanded", "false");
    selectBtn.innerHTML = `
      <span class="selected-value">${this.placeholder}</span>
      <span class="arrow"></span>
    `;

    customSelect.appendChild(selectBtn);

    // Create dropdown menu
    const selectDropdown = document.createElement("ul");
    selectDropdown.classList.add("select-dropdown");
    selectDropdown.setAttribute("role", "listbox");

    // Populate dropdown with options
    this.options.forEach((option, index) => {
      const li = document.createElement("li");
      li.setAttribute("role", "option");

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.id = `${this.name}-${index}`;
      radio.name = this.name;
      radio.value = option.value;

      const label = document.createElement("label");
      label.setAttribute("for", `${this.name}-${index}`);
      label.textContent = option.label;

      li.appendChild(radio);
      li.appendChild(label);
      selectDropdown.appendChild(li);
    });

    customSelect.appendChild(selectDropdown);
    container.appendChild(customSelect);

    // Add event listeners for the select behavior
    this.handleSelectBehavior(customSelect);
  }

  // Method to handle the dropdown behavior
  handleSelectBehavior(customSelect) {
    const selectBtn = customSelect.querySelector(".select-button");
    const selectedValueSpan = customSelect.querySelector(".selected-value");
    const optionsList = customSelect.querySelectorAll(".select-dropdown li");

    selectBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      customSelect.classList.toggle("active");

      const isExpanded = selectBtn.getAttribute("aria-expanded") === "true";
      selectBtn.setAttribute("aria-expanded", !isExpanded ? "true" : "false");
    });

    optionsList.forEach((option) => {
      option.addEventListener("click", (e) => {
        e.stopPropagation();
        const radio = option.querySelector("input");
        this.selectedValue = radio.value;

        selectedValueSpan.textContent = option.querySelector("label").textContent;
        customSelect.classList.remove("active");
        selectBtn.setAttribute("aria-expanded", "false");

        // Trigger the onChange callback with the selected value
        this.onChange(this.selectedValue);
      });
    });

    // Close the dropdown when clicking outside
    document.addEventListener("click", () => {
      if (customSelect.classList.contains("active")) {
        customSelect.classList.remove("active");
        selectBtn.setAttribute("aria-expanded", "false");
      }
    });
  }
}
