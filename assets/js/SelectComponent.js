export default class SelectComponent {
  constructor({ options, container, placeholder = "Select Item", onChange }) {
    this.options = options;
    this.container = container;
    this.placeholder = placeholder;
    this.onChange = onChange; // Save the onChange handler

    // Create the custom select element
    this.customSelect = document.createElement("div");
    this.customSelect.classList.add("custom-select");
  }

  // Render the select dropdown with logos (if provided)
  render() {
    // Create the select button
    const selectBtn = document.createElement("span");
    selectBtn.classList.add("select-button");
    selectBtn.setAttribute("role", "combobox");
    selectBtn.setAttribute("aria-haspopup", "listbox");
    selectBtn.setAttribute("aria-expanded", "false");

    // Placeholder for the initial selection
    selectBtn.innerHTML = `<span class="selected-value">${this.placeholder}</span><span class="arrow"></span>`;
    this.customSelect.appendChild(selectBtn);

    // Create the dropdown list
    const selectDropdown = document.createElement("ul");
    selectDropdown.classList.add("select-dropdown");
    selectDropdown.setAttribute("role", "listbox");

    // Loop through the options array to create options
    this.options.forEach((option, index) => {
      const li = document.createElement("li");
      li.setAttribute("role", "option");

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.id = `option-${index}`;
      radio.name = "option";
      radio.value = option.value;

      const label = document.createElement("label");
      label.setAttribute("for", `option-${index}`);

      // Conditionally add the image if the logo exists
      if (option.logo) {
        const img = document.createElement("img");
        img.src = option.logo;
        img.alt = option.label;
        img.style.width = "36px";  // Adjust the size of the image
        img.style.marginRight = "10px";  // Add some space between image and text
        label.appendChild(img);  // Append the logo image
      }

      // Append the option name text
      label.appendChild(document.createTextNode(option.label));

      li.appendChild(radio);
      li.appendChild(label);
      selectDropdown.appendChild(li);
    });

    this.customSelect.appendChild(selectDropdown);
    this.container.appendChild(this.customSelect);
    this.handleSelectBehavior(); // Attach event listeners
  }

  // Handle the select dropdown behavior
  handleSelectBehavior() {
    const selectBtn = this.customSelect.querySelector(".select-button");
    const selectedValueSpan = this.customSelect.querySelector(".selected-value");
    const optionsList = this.customSelect.querySelectorAll(".select-dropdown li");

    // Toggle the dropdown
    selectBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.customSelect.classList.toggle("active");

      const isExpanded = selectBtn.getAttribute("aria-expanded") === "true";
      selectBtn.setAttribute("aria-expanded", !isExpanded ? "true" : "false");
    });

    // Handle option selection
    optionsList.forEach((option) => {
      option.addEventListener("click", (e) => {
        e.stopPropagation();
        const radio = option.querySelector("input");
        radio.checked = true;

        // Update the displayed selected value with the chosen option's name and logo
        selectedValueSpan.innerHTML = "";  // Clear previous content

        const label = option.querySelector("label").cloneNode(true);
        const img = label.querySelector("img");

        // Add the logo (if present) and the option name to the selected value
        if (img) {
          selectedValueSpan.appendChild(img.cloneNode(true));
        }
        selectedValueSpan.appendChild(document.createTextNode(` ${label.textContent.trim()}`));

        this.customSelect.classList.remove("active");
        selectBtn.setAttribute("aria-expanded", "false");

        // Trigger the onChange event and pass the selected value
        if (this.onChange) {
          this.onChange(radio.value); // Call onChange with selected value
        }
      });
    });

    // Close the dropdown when clicking outside of it
    document.addEventListener("click", () => {
      if (this.customSelect.classList.contains("active")) {
        this.customSelect.classList.remove("active");
        selectBtn.setAttribute("aria-expanded", "false");
      }
    });
  }
}
