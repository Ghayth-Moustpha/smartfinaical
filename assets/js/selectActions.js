let survey;
import SelectComponent from "./SelectComponent.js"

const loadSurvey = async () => {
  try {
    const response = await fetch('questions.json');
    if (!response.ok) {
      throw new Error('Failed to load survey file');
    }

    survey = await response.json(); // Load survey as a global object
    console.log('Survey loaded:', survey);

    // Render the first question once survey is loaded
    renderFirstQuestion();
  } catch (error) {
    console.error('Error loading survey:', error);
  }
};



// Function to fetch options from the API based on previous answers
const fetchOptions = async (url, params) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${url}?${queryString}`);
    const data = await response.json();
    return data.options; // Assuming the API returns an "options" array
  } catch (error) {
    console.error("Error fetching options:", error);
    return [];
  }
};

// Function to handle the survey logic and show next questions
const updateSurvey = async (question, value ,  additionalParams = [] ) => {
  question.userAnswer = value;
  
 

  let new_options;

  const nextQuestion = survey.survey.pages[0].questions.find(q => q.questionId === question.questionId + 1);
  console.log(nextQuestion);
  if (nextQuestion.hasOwnProperty("options")) {
    options = question.options;
  } else  {
    let params = additionalParams.reduce((acc, param) => {
      return { ...acc, ...param };
    }, {});

    
    console.log(params)

    options = await fetchOptions(nextQuestion.optionsUrl, params);

  } 
  

    // Show and render the next question
    nextQuestion.isVisible = true;
    
    nextQuestion.options = options;
    
    const nextQuestionContainer = document.getElementById(`select-${nextQuestion.questionId}-container`);

    const selectComponent = new SelectComponent({
      options: nextQuestion.options,
      name: nextQuestion.questionText,
      placeholder: nextQuestion.questionText,
      container : nextQuestionContainer,
      onChange: (value) => {
        updateSurvey(nextQuestion, value); // Continue the flow
      }
    });
    selectComponent.render() ;
  }


// Function to render the first question
const renderFirstQuestion = () => {
  const firstQuestion = survey.survey.pages[0].questions[0];
  const firstQuestionContainer = document.getElementById('select-year-container');

  const selectComponent = new SelectComponent({
    options: firstQuestion.options,
    container: firstQuestionContainer,
    placeholder: firstQuestion.questionText,
    onChange: (value) => {
      updateSurvey(firstQuestion, value, [{"year" : value }]);  // Custom logic for survey update
    }
  });

  // Now render the component
  selectComponent.render();
};

// Load the survey on page load
window.onload = () => {
  loadSurvey();
};
