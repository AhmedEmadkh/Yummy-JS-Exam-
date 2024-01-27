"use strict";

$(function () {
  // Your existing code for fading out the loader and loading screen

  async function fetchData() {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const data = await response.json();
    return data;
  }

  async function get25Meal() {
    const mealArr = [];
    for (let i = 0; i < 25; i++) {
      const meal = await fetchData();
      mealArr.push(meal);
    }
    return mealArr;
  }

  // An async function to log the result
  async function logMeals(displaedData) {
    const meals = await displaedData;
    console.log(meals);
  }

  // Function to show the loading screen
  function showLoadingScreen() {
    $(".loader").fadeIn(0, function () {
      $(".loading-screen").fadeIn(0, function () {
        $("body").css("overflow", "hidden");
      });
    });
  }

  // Function to hide the loading screen
  function hideLoadingScreen() {
    $(".loader").fadeOut(1000, function () {
      $(".loading-screen").fadeOut(1000, function () {
        $("body").css("overflow", "auto");
      });
    });
  }

  // An async function to display the meals
  async function display() {
    showLoadingScreen();

    const meals = await get25Meal();
    let cartoona = ``;
    for (const element of meals) {
      let box = `
      <div class="col-md-3 col-sm-6">
      <div class="meal position-relative rounded-2 overflow-hidden" data-id="${element.meals[0].idMeal}">
        <img src="${element.meals[0].strMealThumb}" class="w-100" alt="">
        <div class="meal-layer position-absolute d-flex align-items-center">
          <h3>${element.meals[0].strMeal}</h3>
        </div>
      </div>
    </div>
    
      `;
      cartoona += box;
    }
    document.getElementById("rowData").innerHTML = cartoona;

    hideLoadingScreen();
  }

  // logMeals();
  display();

  // Display the details
  async function displayDetails(id) {
    showLoadingScreen();

    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const details = await response.json();
      console.log(details);
    
      // Create HTML for ingredients
      let ingredientsHTML = '';
      for (let i = 1; i <= 20; i++) {
        const ingredient = details.meals[0][`strIngredient${i}`];
        if (ingredient) {
          ingredientsHTML += `<li class="alert alert-info m-2 p-1">${ingredient}</li>`;
        }
      }
    
      // Create HTML for tags
      let tagsHTML = '';
      const tags = details.meals[0].strTags;
      if (tags) {
        const tagList = tags.split(',');
        for (const tag of tagList) {
          tagsHTML += `<li class="alert alert-danger m-2 p-1">${tag.trim()}</li>`;
        }
      }
    
      // Display the dynamic content
      document.getElementById('rowData').innerHTML = `
        <div class="col-md-4 text-white">
          <img class="w-100 rounded-3" src="${details.meals[0].strMealThumb}" alt="${details.meals[0].strMeal}">
          <h2>${details.meals[0].strMeal}</h2>
        </div>
        <div class="col-md-8 text-white">
          <header class="hstack justify-content-between">
            <h2>Instructions</h2>
            <button class="btn-close btn-close-white" id="btnClose"></button>
          </header>
          <p>${details.meals[0].strInstructions}</p>
          <h3><span class="fw-bolder">Area : </span>${details.meals[0].strArea}</h3>
          <h3><span class="fw-bolder">Category : </span>${details.meals[0].strCategory}</h3>
          <h3>Recipes :</h3>
          <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${ingredientsHTML}
          </ul>
          
          <h3>Tags :</h3>
          <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${tagsHTML}
          </ul>
          
          <a target="_blank" href="${details.meals[0].strSource}" class="btn btn-success">Source</a>
          <a target="_blank" href="${details.meals[0].strYoutube}" class="btn btn-danger">Youtube</a>
        </div>
      `;
    
      hideLoadingScreen();
    } catch (error) {
      console.error("Error fetching details:", error);
      hideLoadingScreen();
    }
  }

  $(document).on("click", ".meal", async function () {
    await displayDetails($(this).data("id"));
  });

  // Close button event
  $(document).on('click', '#btnClose', function () {
    display();
  });
});
async function displayDetails(id) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const details = await response.json();
  return details;
}