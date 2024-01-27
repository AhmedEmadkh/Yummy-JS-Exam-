"use strict";
/// <reference types="../@types/jquery" />
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
// ***********************************************************************
function showSearch(word) {
  return word.toLowerCase() === "search";
}
// Search
$(".links ul li").on("click", function () {
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
      // Clear the entire container
      document.getElementById("container").innerHTML = '';

      // Create a new row inside the container
      const newRow = document.createElement("div");
      newRow.className = "row g-4 py-5";
      newRow.id = "rowData";

      // Append the new row to the container
      document.getElementById("container").appendChild(newRow);

      // Fetch data for categories
      const responseCategories = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
      const dataCategories = await responseCategories.json();

      if (dataCategories && dataCategories.categories && dataCategories.categories.length > 0) {
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

        // Attach click event to meals for fetching meals with the same category
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
