function showSearch() {
  $(".links ul li").on("click", function () {
    const word = $(this).html();
    if (word.toLowerCase() == "search") {
      console.log("clicked");
      return true;
    }else{
      return false;
    }
  });
}
showSearch();
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
// ****************************************************************
// Search By Name
hideLoadingScreen();
async function searchByName(mealName) {
  showLoadingScreen(); // Show loading screen when starting to fetch data

  try {
    // Fetch data
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
    );
    const data = await response.json();

    if (data && data.meals && data.meals.length > 0) {
      // Process and display data
      let cartoona = ``;

      for (let i = 0; i < data.meals.length; i++) {
        let box = `
          <div class="col-md-3 col-sm-6">
            <div class="meal position-relative rounded-2 overflow-hidden" data-id="${data.meals[i].idMeal}">
              <img src="${data.meals[i].strMealThumb}" class="w-100" alt="">
              <div class="meal-layer position-absolute d-flex align-items-center">
                <h3>${data.meals[i].strMeal}</h3>
              </div>
            </div>
          </div>
        `;
        cartoona += box;
      }
      document.getElementById("rowData").innerHTML = cartoona;
    } else {
      console.log("No meals found");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    hideLoadingScreen(); // Hide loading screen after data is processed
  }
}
// ****************************************************************
// Search Wit One Letter
async function searchByFLetter(mealFletter) {
  showLoadingScreen(); // Show loading screen when starting to fetch data

  try {
    // Fetch data
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${mealFletter}`
    );
    const data = await response.json();

    if (data && data.meals && data.meals.length > 0) {
      // Process and display data
      let cartoona = ``;

      for (let i = 0; i < data.meals.length; i++) {
        let box = `
          <div class="col-md-3 col-sm-6">
            <div class="meal position-relative rounded-2 overflow-hidden" data-id="${data.meals[i].idMeal}">
              <img src="${data.meals[i].strMealThumb}" class="w-100" alt="">
              <div class="meal-layer position-absolute d-flex align-items-center">
                <h3>${data.meals[i].strMeal}</h3>
              </div>
            </div>
          </div>
        `;
        cartoona += box;
      }
      document.getElementById("rowData").innerHTML = cartoona;
    } else {
      console.log("No meals found");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    hideLoadingScreen(); // Hide loading screen after data is processed
  }
}

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
$(document).on("click", "#btnClose", function () {
  searchByName("");
});
