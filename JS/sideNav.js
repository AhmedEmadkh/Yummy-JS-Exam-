"use strict";
/// <reference types="../@types/jquery" />
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
// Nav Animation
$(document).ready(() => {
  $(".fa-x").hide();

  $(".fa-align-justify").on("click", () => {
    $(".side-nav-menu").addClass("left");
    $(".fa-align-justify").hide();
    $(".fa-x").show();

    // Delay in milliseconds between each link animation
    const delayBetweenAnimations = 100;

    $(".links ul li").each(function (index) {
      $(this)
        .delay(index * delayBetweenAnimations)
        .animate(
          {
            top: 0,
            opacity: 1,
          },
          500
        );
    });
  });

  $(".fa-x").on("click", () => {
    $(".side-nav-menu").removeClass("left");
    $(".fa-align-justify").show();
    $(".fa-x").hide();

    // Delay in milliseconds between each link animation
    const delayBetweenAnimations = 100;

    $(".links ul li").each(function (index) {
      $(this)
        .delay(index * delayBetweenAnimations)
        .animate(
          {
            top: 300,
            opacity: 0,
          },
          200
        );
    });
  });
});
// **********************************************************************
// Close Function for side nav
function closeSideNav() {
  $(".side-nav-menu").removeClass("left");
  $(".fa-align-justify").show();
  $(".fa-x").hide();

  // Delay in milliseconds between each link animation
  const delayBetweenAnimations = 100;

  $(".links ul li").each(function (index) {
    $(this)
      .delay(index * delayBetweenAnimations)
      .animate(
        {
          top: 300,
          opacity: 0,
        },
        200
      );
  });
}

// ***********************************************************************
// Search
function showSearch(word) {
  return word.toLowerCase() === "search";
}
// Search
$(".links ul li").on("click", function () {
  closeSideNav();
  const clickedWord = $(this).html();

  if (showSearch(clickedWord)) {
    document.getElementById("container").innerHTML = `
      <div class="row py-5">
        <div class="col-md-6 ">
          <!-- Prevent form submission with onsubmit -->
          <form onsubmit="event.preventDefault(); searchByName(document.getElementById('searchInput').value)">
            <input id="searchInput" onkeyup="searchByName(this.value)"
              class="form-control bg-transparent text-white plac" type="text" placeholder="Search By Name">
          </form>
        </div>
        <div class="col-md-6">
          <input onkeyup="event.preventDefault(); searchByFLetter(this.value)" maxlength="1"
            class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
      </div>
      <div class="row g-4 py-5" id="rowData">
      </div>
      <div class="inner-loading-screen start-0 end-0 bottom-0 justify-content-center align-items-center position-absolute">
        <span class="loader text-white"></span>
      </div>
    `;
  }
});
// **********************************************************************
// Categories
function showCategories(word) {
  return word.toLowerCase() === "categories";
}

$(".links ul li").on("click", async function () {
  const clickedWord = $(this).html();

  if (showCategories(clickedWord)) {
    showLoadingScreen();

    try {
      document.getElementById("container").innerHTML = "";

      const newRow = document.createElement("div");
      newRow.className = "row g-4 py-5";
      newRow.id = "rowData";

      document.getElementById("container").appendChild(newRow);

      const responseCategories = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const dataCategories = await responseCategories.json();

      if (
        dataCategories &&
        dataCategories.categories &&
        dataCategories.categories.length > 0
      ) {
        for (const category of dataCategories.categories) {
          let box = `
            <div class="col-md-3 col-sm-6">
              <div class="meal position-relative rounded-2 overflow-hidden" data-id="${category.strCategory}">
                <img src="${category.strCategoryThumb}" class="w-100" alt="">
                <div class="meal-layer position-absolute d-flex align-items-center">
                  <h3>${category.strCategory}</h3>
                </div>
              </div>
            </div>
          `;
          newRow.innerHTML += box;
        }
        newRow.querySelectorAll(".meal").forEach((meal) => {
          meal.addEventListener("click", async function () {
            const categoryId = this.getAttribute("data-id");
            await displayMealsByCategory(categoryId);
          });
        });
      } else {
        console.log("No categories found");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      hideLoadingScreen();
    }
  }
});
// *************************************************************
function showArea(word) {
  return word.toLowerCase() === "area";
}
// Area
$(".links ul li").on("click", async function () {
  const clickedWord = $(this).html();

  if (showArea(clickedWord)) {
    showLoadingScreen();

    try {
      document.getElementById("container").innerHTML = "";
      const newRow = document.createElement("div");
      newRow.className = "row g-4 py-5";
      newRow.id = "rowData";
      document.getElementById("container").appendChild(newRow);
      const responseAreas = await fetch(
        "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
      );
      const dataAreas = await responseAreas.json();

      if (dataAreas && dataAreas.meals && dataAreas.meals.length > 0) {
        for (const area of dataAreas.meals) {
          let box = `
            <div class="col-md-3">
              <div onclick="getAreaMeals('${area.strArea}')" class="rounded-2 text-center cursor-pointer text-white">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${area.strArea}</h3>
              </div>
            </div>
          `;
          newRow.innerHTML += box;
        }
        newRow.querySelectorAll(".rounded-2").forEach((area) => {
          area.addEventListener("click", async function () {
            const areaName = this.querySelector("h3").innerText;
            await getAreaMeals(areaName);
          });
        });
      } else {
        console.log("No areas found");
      }
    } catch (error) {
      console.error("Error fetching areas:", error);
    } finally {
      hideLoadingScreen();
    }
  }
});

// *************************************************************
function showIngredients(word) {
  return word.toLowerCase() === "ingredients";
}
// Ingredients
$(".links ul li").on("click", async function () {
  const clickedWord = $(this).html();
  if (showIngredients(clickedWord)) {
    showLoadingScreen();
    try {
      document.getElementById("container").innerHTML = "";
      const newRow = document.createElement("div");
      newRow.className = "row g-4 py-5";
      newRow.id = "rowData";
      document.getElementById("container").appendChild(newRow);

      // Fetch data for ingredients
      const responseIngredients = await fetch(
        "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
      );
      const dataIngredients = await responseIngredients.json();

      if (
        dataIngredients &&
        dataIngredients.meals &&
        dataIngredients.meals.length > 0
      ) {
        // Limit the number of displayed ingredients to a maximum of 10
        const maxIngredients = Math.min(dataIngredients.meals.length, 20);

        // Find the ingredient with the maximum number of letters in the paragraph
        let maxLettersIngredient = "";
        let maxLettersCount = 0;

        for (let i = 0; i < maxIngredients; i++) {
          const ingredient = dataIngredients.meals[i];

          // Use slice to limit the paragraph to 40 characters
          const slicedParagraph = ingredient.strDescription.slice(0, 100);

          if (slicedParagraph.length > maxLettersCount) {
            maxLettersCount = slicedParagraph.length;
            maxLettersIngredient = ingredient.strIngredient;
          }

          let box = `
            <div class="col-md-3">
              <div onclick="getIngredientsMeals('${ingredient.strIngredient}')" class="rounded-2 text-center cursor-pointer text-white">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${ingredient.strIngredient}</h3>
                <p>${slicedParagraph}</p>
              </div>
            </div>
          `;
          newRow.innerHTML += box;
        }

        console.log(
          `Ingredient with the maximum letters: ${maxLettersIngredient}`
        );
      } else {
        console.log("No ingredients found");
      }
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    } finally {
      hideLoadingScreen();
    }
  }
});
// **********************************************************************
function showContact(word) {
  return word.toLowerCase() === "contact us";
}
// Contact
$(".links ul li").on("click", async function () {
  const clickedWord = $(this).html();
  if (showContact(clickedWord)) {
    showContactForm();
  }
});
function showContactForm() {
  document.getElementById("container").innerHTML = "";

  const newRow = document.createElement("div");
  newRow.className = "row g-4 py-5";
  newRow.id = "rowData";

  // Create the HTML form for the contact section
  const contactFormHTML = `
  <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
      <div class="row g-4">
        <div class="col-md-6">
          <input id="nameInput" onkeyup="inputsValidation() ;isName()" type="text" class="form-control contact"
            placeholder="Enter Your Name">
          <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none ">
            Special characters and numbers not allowed
          </div>
        </div>
        <div class="col-md-6">
          <input id="emailInput" onkeyup="inputsValidation();isEmail()" type="email" class="form-control contact "
            placeholder="Enter Your Email">
          <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
            Email not valid *exemple@yyy.zzz
          </div>
        </div>
        <div class="col-md-6">
          <input id="phoneInput" onkeyup="inputsValidation();isPhone()" type="text" class="form-control contact "
            placeholder="Enter Your Phone">
          <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
            Enter valid Phone Number
          </div>
        </div>
        <div class="col-md-6">
          <input id="ageInput" onkeyup="inputsValidation();isAge()" type="number" class="form-control contact "
            placeholder="Enter Your Age">
          <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
            Enter valid age from 18 to 99
          </div>
        </div>
        <div class="col-md-6">
          <input id="passwordInput" onkeyup="inputsValidation();isPass()" type="password" class="form-control contact "
            placeholder="Enter Your Password">
          <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
            Enter valid password *Minimum eight characters, at least one letter and one number:*
          </div>
        </div>
        <div class="col-md-6">
          <input id="repasswordInput" onkeyup="inputsValidation();isRePass()" type="password" class="form-control contact "
            placeholder="Repassword">
          <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
            Enter valid repassword
          </div>
        </div>
      </div>
      <button id="submitBtn" class="btn btn-outline-danger px-2 mt-3" disabled="true">Submit</button>
    </div>
  </div>
  `;

  newRow.innerHTML = contactFormHTML;
  document.getElementById("container").appendChild(newRow);

  // You may want to initialize any form-related functionality here
}
