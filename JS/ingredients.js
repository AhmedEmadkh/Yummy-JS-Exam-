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
// **********************************************************

async function getIngredientsMeals(ingredient) {
  showLoadingScreen();

  try {
    const responseMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const dataMealsForIngredient = await responseMeals.json();

    if (dataMealsForIngredient && dataMealsForIngredient.meals && dataMealsForIngredient.meals.length > 0) {
      let cartoona = ``;

      // Limit the number of displayed meals to a maximum of 20
      const maxMeals = Math.min(dataMealsForIngredient.meals.length, 20);

      for (let i = 0; i < maxMeals; i++) {
        const meal = dataMealsForIngredient.meals[i];
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