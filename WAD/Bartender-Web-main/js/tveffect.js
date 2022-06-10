var ingredientCount = 0; //use var for bigger scope. Let is for within a local function only
var isCompleted = false;
var idChosen = [];
var base = ["coffee", "juice", "tea"];
var mix = ["milk", "mint", "fizzy", "caramel"];
var recipe = [];
var recipeInverted = [];
const ids = [
  "coffee,milk,mint",
  "coffee,milk,fizzy",
  "coffee,milk,caramel",
  "coffee,fizzy,mint",
  "coffee,fizzy,caramel",
  "coffee,mint,caramel",
  "coffee,fizzy,fizzy",
  "coffee,milk,milk",
  "coffee,mint,mint",
  "coffee,caramel,caramel",
  "tea,mint,caramel",
  "tea,fizzy,caramel",
  "tea,milk,mint",
  "tea,fizzy,mint",
  "tea,milk,fizzy",
  "tea,milk,caramel",
  "tea,mint,mint",
  "tea,fizzy,fizzy",
  "tea,milk,milk",
  "tea,caramel,caramel",
  "juice,caramel,caramel",
  "juice,mint,mint",
  "juice,fizzy,fizzy",
  "juice,milk,milk",
  "juice,milk,fizzy",
  "juice,mint,caramel",
  "juice,milk,mint",
  "juice,milk,caramel",
  "juice,fizzy,mint",
  "juice,fizzy,caramel",
];

const names = [
  "Athenaeum",
  "Golden Eden",
  "Caramel Pinecone",
  "Foamy Reef",
  "Brown Mix",
  "Soothing Sugar",
  "Moonlit Alley",
  "Night of Swirling Stars",
  "Devil Demise",
  "Bitter End",
  "Sweet Love",
  "Soft Touch",
  "Boreal Watch",
  "Fresh Fiz",
  "Misty Graden",
  "Love Poem",
  "Unlimited Mint Work",
  "Scholar Afternoon",
  "Brightcrown",
  "Tart Brilliance",
  "Yangu",
  "Laughter n Cheer",
  "Gray Valley",
  "Sweet Cider",
  "Dawning Dew",
  "Barbatos Boon",
  "Birch Sap",
  "Snow Kiss",
  "More Ayaya",
  "Manhattan",
];

// ids query from database and stores all drinks' recipes -> list
// backend needs to fix this function
function getAllRecipes() {
  ids.push(JSON.parse(localStorage.getItem("*")));
  return ids;
}

function zoomOut() {
  background = document.getElementById("bg");
  background.className = "bg-small";
  ingredient_panel = document.getElementById("i-panel");
  ingredient_panel.className = "ingredient-container visible";
  button = document.getElementById("btn");
  btn.style.visibility = "hidden";
}

function clicked(element) {
  element.style.visibility = "inherit";
  element.style.border = "10px solid rgba(255, 255, 255, 0)";
  ingredientCount += 1;
  idChosen.push(element.id);
}

function resetState() {
  console.log("resetted");
  elements = document.getElementsByClassName("ingredient-img");
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.border = "none";
  }
  hideBottle();
  ingredientCount = 0;
  isCompleted = false;
  idChosen = [];
  recipe = [];
  recipeInverted = [];

  const parent2 = document.getElementById("bottle-bg");
  const child2 = document.getElementById("result");
  const para2 = document.createElement("h3");
  para2.id = "result";
  const node2 = document.createTextNode("");
  para2.appendChild(node2);
  parent2.replaceChild(para2, child2);

  const parent3 = document.getElementById("bottle-bg");
  const child3 = document.getElementById("drink-description");
  const para3 = document.createElement("p");
  para3.id = "drink-description";
  const node3 = document.createTextNode("");
  para3.appendChild(node3);
  parent3.replaceChild(para3, child3);
}

function showBottle() {
  item = document.getElementById("bottle");
  item.style.display = "block";
  item = document.getElementById("bottle-bg");
  item.style.display = "block";
}

function hideBottle() {
  item = document.getElementById("bottle");
  item.style.display = "none";
}

function pickIngredients() {
  for (var i = 0; i < idChosen.length; i++) {
    for (var j = 0; j < base.length; j++) {
      if (idChosen[i] === base[j]) {
        recipe.push(idChosen[i].toString());
        recipeInverted.push(idChosen[i].toString());
      }
    }
  }
  for (var i = 0; i < idChosen.length; i++) {
    if (idChosen[i] != recipeInverted[0]) {
      recipe.push(idChosen[i].toString());
    }
  }
  for (var i = 2; i > 0; i--) {
    recipeInverted.push(recipe[i]);
  }
  recipeInverted = recipeInverted.toString();
  recipe = recipe.toString();
  return recipe;
}

function findName() {
  let found = false;
  for (var i = 0; i < ids.length; i++) {
    if (recipe == ids[i]) {
      found = true;
    }
    if (recipeInverted == ids[i]) {
      found = true;
    }
    if (found) {
      return names[i];
    }
  }
}

function viewResult(drink_name, ingredients_name) {
  const parent = document.getElementById("bottle-bg");
  const child = document.getElementById("result");
  const para = document.createElement("h3");
  para.id = "result";
  const node = document.createTextNode(drink_name);
  para.appendChild(node);
  parent.replaceChild(para, child);

  const parent1 = document.getElementById("bottle-bg");
  const child1 = document.getElementById("drink-description");
  const para1 = document.createElement("p");
  para1.id = "drink-description";
  const node1 = document.createTextNode(
    "A refreshing drink, made of " + ingredients_name + ". Rated 10/10."
  );
  para1.appendChild(node1);
  parent1.replaceChild(para1, child1);
}

function verify() {
  // check if already show bottle
  if (ingredientCount === 3) {
    if (isCompleted == true) {
      resetState();
      return;
    }
    // check if chosen 1 main ingredient (base) and 2 additional mixes
    let idCount = 0;
    for (var i = 0; i < idChosen.length; i++) {
      for (var j = 0; j < base.length; j++) {
        if (idChosen[i] === base[j]) {
          idCount += 1;
        }
      }
    }
    i = 0;
    j = 0;
    if (idCount == 1) {
      showBottle();
      item = document.getElementById("bottle");
      item.className = "bottle bottle-shake";
      getAllRecipes();
      let ingre_names = pickIngredients();
      let drink_name = findName();
      console.log(drink_name);
      viewResult(drink_name, ingre_names);
      isCompleted = true;
      idCount = 0;
    } else {
      alert("You should choose only 1 main and 2 other mixes");
      resetState();
    }
  } else {
    // check if choose more or less than 3 ingredients
    alert(
      ingredientCount + " is not the right number of ingredients. Require: 3"
    );
    resetState();
    return;
  }
}
