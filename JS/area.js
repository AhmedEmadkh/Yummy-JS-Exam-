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
async function getAreaMeals(areaName) {
  showLoadingScreen();

  try {
    const responseMeals = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`
    );
    const dataMealsForArea = await responseMeals.json();

    if (dataMealsForArea && dataMealsForArea.meals && dataMealsForArea.meals.length > 0) {
      let cartoona = ``;

      // Limit the loop to the first 20 meals
      const maxMeals = Math.min(dataMealsForArea.meals.length, 20);
      for (let i = 0; i < maxMeals; i++) {
        const meal = dataMealsForArea.meals[i];
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

