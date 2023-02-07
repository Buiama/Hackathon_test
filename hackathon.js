//declaring variables and getting elements from the DOM
const search = document.getElementById("search");
const submit = document.getElementById('submit');
const resultHeading = document.getElementById('result-heading');
const mealsEl = document.getElementById('meals');
const singleMealEl = document.getElementById("single-meal");


//fetching meals from the API
function searchMeal(e) {
    //eliminate default behavior of the DOM
    e.preventDefault();
document.getElementById('single-meal').style.display="none";
    //clear the single meal section in the DOM
    singleMealEl.innerHTML = "";

    //declaring the search variable
    const term = search.value;

    //check if the input is empty
    if (term.trim()) {
        loadInitialMeals(term);
    }
}

//enter the filtered meal list
function loadInitialMeals(term) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then((res) => res.json())
        .then((data) => {
            resultHeading.innerHTML = `<h4>Search results for '${term}'</h4>`;
            if (data.meals === null) {
                resultHeading.innerHTML = `<p>There are no search results for ${term}, please try another search term.</p>`;
                mealsEl.innerHTML = "";
            } else {
                mealsEl.innerHTML = data.meals.map((meal) => `
                <div class="meal" onclick="display('${meal.idMeal}')">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                        <h3>${meal.strMeal}</h3>
                    </div>
                </div>
                `).join("");
            }
        });
        //clear the search term
        search.value = "";
}

loadInitialMeals('Pie');

function display(mealID) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;

    console.log(url);

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('single-meal').style.display="block";
            let f = data["meals"][0]
            
            singleMealEl.innerHTML = `
            <img src="${data.meals[0].strMealThumb}" alt="${data.meals[0].strMeal}"/>
            <h1>${data.meals[0].strMeal}</h1><br>
            <h2>Ingredients</h2>
            <ul id="ulList">`;
            let ul=document.getElementById('ulList');
            let listIng = [];

            for (let i=1; i<21; i++) {
                if (f[`strIngredient${i}`]) {
                    listIng.push(f[`strIngredient${i}`]+ ' - '+ f[`strMeasure${i}`]);

                    let li=document.createElement('li');
                    li.innerHTML=f[`strIngredient${i}`]+ ' - '+ f[`strMeasure${i}`];
                    ul.appendChild(li);
                } 
                else {
                    break;
                }
            }
            singleMealEl.innerHTML += `
            </ul><br>
            <h2>Instruction</h2><br>
            <p>${data.meals[0].strInstructions}</p>
            `;
            console.log("data: ",data.meals[0]);
        });
}
/****************************************************************************************************************************************/
const FoodDAta = data => {
    document.getElementById('single-meal').style.display="block";
    // let ul=document.getElementById('ingrade');
    // let div=document.getElementById('Details');
    // show.style.display='none';

    // let food = data["meals"][0];

    // console.log(food);
    // let foodThumb=food['strMealThumb'];
    // let title=food['strMeal'];

    // const  showA=document.createElement('div');

    // const showInfo=`
    //             <div class="row row-cols-12 align-items-center justify-content-center" >
    //                   <div class="card m-5"  id="ImageClick" style="width: 18rem; padding: 2%">
    //                         <img src="${foodThumb}" class="card-img-top img-fluid img-responsive align-items-center" alt="...">
    //                        <div class="card-body">
    //                      <h5 class="card-title">${title}</h5>
    //                </div>
    //                </div>
    //            </div>
    //                 `;
    // showA.innerHTML=showInfo;
    // div.appendChild(showA);

    // let h3=document.createElement('h3');
    // h3.innerHTML=food['strMeal'];
    // for (let i = 1; i <= 20; i++) {


    // let li=document.createElement('li');

    //     if (food[`strIngredient${i}`]) {
    //         console.log(food[`strIngredient${i}`]);
    //         li.innerHTML=food[`strIngredient${i}`]
    //         ul.appendChild(li);


    //     } else {

    //         break;
    //     }
    // }
    // div.appendChild(h3);
    // div.appendChild(ul);
}
/****************************************************************************************************************************************/
//fetching meals from the API by ID
// function getMealByID(mealID) {
//     fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
//         .then((res) => res.json())
//         .then((data) => {
//             const meal = data.meals[0];
//             addMealToDOM(meal);
//         })
// }

//adding meals to the DOM
// function addMealToDOM(meal) {
//     const ingredients = [];

//     for (let i=1; i<=20; ++i) {
//         if (meal[`strIngredients${i}`]) {
//             ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
//         } else {
//             break;
//         }
//     }

//     singleMealEl.innerHTML = `
//     // <hr/>
//     <div class="single-meal">
//         <h1>${meal.strMeal}</h1>
//         <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
//         <div class="single-meal-info">
//             ${meal.strCategory ? `<p><span class="categoryAndOrigin">Category:</span>${meal.strCategory}</p>` : ''}
//             ${meal.strArea ? `<p><span class=categoryAndOrigin>Origin:</span></p>` : ''}
//         </div>
//         <div class="main">
//             <p id="meal-making-instructions">${meal.strInstructions}</p>
//             <hr/>
//             <h2>Ingredients</h2>
//             <ul>${ingredients.map((ing) => `<li>${ing}</li>`).join('')}</ul>
//         </div>
//     </div>
//     `;
// }

//scroll to a single meal by clicking
// function scrollTo() {
//     window.location = '#single-meal';
// }


//adding event listeners to the buttons and elements
submit.addEventListener('submit', searchMeal);

// mealsEl.addEventListener('click', (e) => {
//     const mealInfo = e.path.find(item => {
//         if (item.classList) {
//             return item.classList.contains('meal-info');
//         } else {
//             return false;
//         }
//     });
//     if (mealInfo) {
//         const mealID = mealInfo.getAttribute('data-mealid');
//         getMealByID(mealID);
//     }
//     scrollTo("single-meal");
// });