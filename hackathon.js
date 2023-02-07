let search = document.getElementById("search");
let submit = document.getElementById('submit');
let head = document.getElementById('head');
let showDishes = document.getElementById('dishes');
let dish = document.getElementById("oneDish");


function searchDishes(e) { // пошук страв за допомогою API
    e.preventDefault();

    // очищуємо вибрану страву (якщо є)
    document.getElementById('oneDish').style.display="none"; 
    dish.innerHTML = "";

    let input = search.value;
    if (input.trim()) {
        findDishes(input);
    }
}


function findDishes(input) { // виводимо всі страви, що знайшли
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`).then((result) => result.json())
        .then((data) => {
            head.innerHTML = `<h4>Search results for '${input}'</h4>`;
            // результат пошуку
            if (data.meals === null) {
                head.innerHTML = `<p>There are no search results for ${input}, please try another search input.</p>`;
                showDishes.innerHTML = "";
            }
            else {
                showDishes.innerHTML = data.meals.map((meal) => `
                <div class="meal" onclick="displayDish('${meal.idMeal}')">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                        <h3>${meal.strMeal}</h3>
                    </div>
                </div>
                `).join("");
            }
        });
        search.value = "";
}


findDishes('Pie'); // початковий пошук на головній сторінці


function displayDish(mealID) { // виводимо рецепт та інградієнти для вибраної страви
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`).then(response => response.json())
        .then(data => {
            document.getElementById('oneDish').style.display="block"; // робимо поле видимим
            
            dish.innerHTML = `
                <img src="${data.meals[0].strMealThumb}" alt="${data.meals[0].strMeal}"/>
                <h1>${data.meals[0].strMeal}</h1><br>
                <h2>Ingredients</h2>
                <ul id="list">
            `;

            let accessData = data["meals"][0]; // для простішого доступу
            let ul = document.getElementById('list');
            let ingradientList = []; 

            for (let i=1; i<21; i++) {
                if (accessData[`strIngredient${i}`]) {
                    ingradientList.push(accessData[`strIngredient${i}`]+ ' - '+ accessData[`strMeasure${i}`]);

                    let li=document.createElement('li');
                    li.innerHTML=accessData[`strIngredient${i}`]+ ' - '+ accessData[`strMeasure${i}`];
                    ul.appendChild(li);
                } 
                else {
                    break;
                }
            }

            dish.innerHTML += `
                </ul><br>
                <h2>Instruction</h2><br>
                <p>${data.meals[0].strInstructions}</p>
            `;
        });
}


submit.addEventListener('submit', searchDishes);
