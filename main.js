const YOUR_APP_ID = "993b6c5e";
const YOUR_APP_KEY = "77c226a9415cc2708301b97c64d04290";
const requestUrl = `https://api.edamam.com/search?q=kale&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;

let food = null;

let endPoint = document.getElementById("recipes");

function handleRecipeClick() {
  fetchRecipe(food);
}

function handleFoodChange() {
  food = document.querySelector("#food-input").value;
}

async function fetchRecipe(food) {
  let response = await fetch(
    `https://api.edamam.com/search?q=${food}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`
  );
  let data = await response.json();

  endPoint.innerHTML = "";
  getRecipesFromAPI(data);
  console.log(data);
}

function getRecipesFromAPI(findings) {
  for (let i = 0; i < 5; i++) {
    let imgUrl = findings.hits[i].recipe.image;
    let img = document.createElement("img");
    img.setAttribute("src", imgUrl);

    let labelName = findings.hits[i].recipe.label;
    let label = document.createElement("a");
    let labelhref = findings.hits[i].recipe.url;
    label.setAttribute("href", labelhref);
    label.innerText = labelName;

    let caloriesNumber = findings.hits[i].recipe.calories;
    let calories = document.createElement("p");
    calories.innerText = `${Math.round(caloriesNumber)} calories`;

    // let cuisineOrigin = findings.hits[i].recipe.cuisineType[0];
    // let cuisines = document.createElement("p");
    // cuisines.innerText = `${cuisineOrigin} cuisine`;
    //didn't work, not sure why

    let divForTheRecipe = document.createElement("div");

    divForTheRecipe.append(img, label, calories);

    endPoint.appendChild(divForTheRecipe);
    divForTheRecipe.setAttribute("class", "plate");
  }
}
