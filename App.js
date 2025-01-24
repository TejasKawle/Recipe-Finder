const button = document.querySelector("#searchBtn");
const input = document.querySelector("#ingredients");
let spinner=document.querySelector(".spinner");
const hideCotainer=document.querySelector(".recipes");

// Fetching the recipe data
const fetchRecipe = async (items) => {
  const apiKey = `56e928c7b81a498395a1e673d765ace3`;
  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${items}&number=50&apiKey=${apiKey}`;

  spinner.style.display="block"
  try {
    const response = await fetch(url); // API call

    if (!response.ok) {
      throw new Error("Failed to fetch recipes"); // Handle error
    }

    const data = await response.json(); // Parse the response
    console.log(data);

    displayRecipe(data); // Call displayRecipe to show data
  } catch (error) {
    console.error(`Error: ${error}`);
    alert("Unable to fetch recipes. Please try again later.");
  }finally{
     spinner.style.display="none"
  }
};

// Display the recipes
const displayRecipe = (data) => {
  const recipeContainer = document.querySelector(".recipes");
  recipeContainer.innerHTML = ""; // Clear previous results

  data.forEach((recipe) => {
    const card = document.createElement("div");
    card.classList.add("recipe-cards");

    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" height="300px" width="300px">
      <h2>${recipe.title}</h2>
    `;

    recipeContainer.appendChild(card); // Append the card to the container
  });
};

// Event listener for the button
button.addEventListener("click", () => {
    hideCotainer.innerHTML=""
  const items = input.value.trim(); // Get and trim user input
  if (items === "") {
    alert("Please enter some ingredients!"); // Validate input
    return;
  }

  document.querySelector("#ingredients").value=""
  
  fetchRecipe(items); // Fetch recipes
});
