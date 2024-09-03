export default class SelectWithLogos {
    constructor({ options, container, placeholder = "Select Item" }) {
      this.options = options;
      this.container = container;
      this.placeholder = placeholder;
      this.customSelect = document.createElement("div");
      this.customSelect.classList.add("custom-select");
      this.render();
      this.handleSelectBehavior();
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
        radio.value = option.code;
  
        const label = document.createElement("label");
        label.setAttribute("for", `option-${index}`);
  
        // Conditionally add the image if the logo exists
        if (option.logo) {
          const img = document.createElement("img");
          img.src = option.logo;
          img.alt = option.name;
          img.style.width = "36px";  // Adjust the size of the image
          label.appendChild(img);  // Append the logo image
        }
  
        // Append the option name text
        label.appendChild(document.createTextNode(option.name));
  
        li.appendChild(radio);
        li.appendChild(label);
        selectDropdown.appendChild(li);
      });
  
      this.customSelect.appendChild(selectDropdown);
      this.container.appendChild(this.customSelect);
    }
  
    // Handle the select dropdown behavior
    handleSelectBehavior() {
      const selectBtn = this.customSelect.querySelector(".select-button");
      const selectedValueSpan = this.customSelect.querySelector(".selected-value");
      const optionsList = this.customSelect.querySelectorAll(".select-dropdown li");
  
      selectBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.customSelect.classList.toggle("active");
  
        const isExpanded = selectBtn.getAttribute("aria-expanded") === "true";
        selectBtn.setAttribute("aria-expanded", !isExpanded ? "true" : "false");
      });
  
      optionsList.forEach((option) => {
        option.addEventListener("click", (e) => {
          e.stopPropagation();
          const radio = option.querySelector("input");
  
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
  

  