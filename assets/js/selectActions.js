import SelectComponent from './SelectComponent.js';
import SelectWithLogos from './SelectWithLogos.js';

const years = [];
for (let year = 2025; year >= 1986; year--) {
  years.push({ value: `${year}`, label: `${year}` });
}


const selectComponent = new SelectComponent({
  options: years,
  name: 'year',
  placeholder: 'Select Vehicle Year',
  onChange: (value) => {
    console.log('Selected year:', value);
  }
});

selectComponent.render(document.getElementById('select-year-container'));

 
  // Example usage
  const makers = [
    {
      name: "Chevrolet",
      code: "CHE",
      logo: "https://d1knh3b6uo8q16.cloudfront.net/car_logos/chevrolet.svg"
    },
    {
      name: "Ford",
      code: "FOR",
      logo: "https://d1knh3b6uo8q16.cloudfront.net/car_logos/ford.svg"
    },
    {
      name: "Toyota",
      code: "TOY",
      logo: null  // No logo provided for this option
    }
  ];
  
  // Create the SelectWithLogos component
    const selectMaker =  new SelectWithLogos({
      options: makers,
      container: document.getElementById('select-vehicle-maker'),
      placeholder: "Select Vehicle Maker"  
  });
