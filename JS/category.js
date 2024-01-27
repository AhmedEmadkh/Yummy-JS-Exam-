// Function to show the Inner loading screen
function showLoadingScreen() {
  $(".inner-loading-screen .loader").fadeIn(0, function () {
    $(".inner-loading-screen").fadeIn(0, function () {
      $("body").css("overflow", "hidden");
    });
  });
  console.log("Showing");
}

// Function to hide the loading screen
function hideLoadingScreen() {
  $(".inner-loading-screen .loader").fadeOut(1000, function () {
    $(".inner-loading-screen").fadeOut(1000, function () {
      $("body").css("overflow", "auto");
    });
  });
  console.log("hidding");
}
// **********************************************************
// Display meals with the same category
async function displayMealsByCategory(categoryId) {
  showLoadingScreen();

  try {
    const responseMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryId}`);
    const dataMeals = await responseMeals.json();

    if (dataMeals && dataMeals.meals && dataMeals.meals.length > 0) {
      let cartoona = ``;

      for (const meal of dataMeals.meals) {
        let box = `
          <div class="col-md-3 col-sm-6">
            <div class="meal position-relative rounded-2 overflow-hidden" data-id="${meal.idMeal}">
              <img src="${meal.strMealThumb}" class="w-100" alt="">
              <div class="meal-layer position-absolute d-flex align-items-center">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
          </div>
        `;
        cartoona += box;
      }
      document.getElementById("rowData").innerHTML = cartoona;
    } else {
      console.log("No meals found for the selected category");
    }
  } catch (error) {
    console.error("Error fetching meals:", error);
  } finally {
    hideLoadingScreen();
  }
}