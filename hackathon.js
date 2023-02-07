let search = document.getElementById("search");
let submit = document.getElementById("submit");
let head = document.getElementById("head");
let showDishes = document.getElementById("dishes");
let dish = document.getElementById("oneDish");
let frigeName = document.getElementById("ingredientInput");
let frigeCount = document.getElementById("ingredientCount");
let frigeMeasure = document.getElementById("ingredientMeasure");
let frigeCategory = document.getElementById("ingredientCategory");

function searchDishes(e) { // пошук страв за допомогою API
    e.preventDefault();

    // очищуємо вибрану страву (якщо є)
    document.getElementById("oneDish").style.display="none"; 
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
                head.innerHTML = `<p>Sorry, but unfortunately we don't know a dish called '${input}', please try another search input.</p>`;
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


findDishes("Pie"); // початковий пошук на головній сторінці


function displayDish(mealID) { // виводимо рецепт та інградієнти для вибраної страви
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`).then(response => response.json())
        .then(data => {
            document.getElementById("oneDish").style.display="block"; // робимо поле видимим
            
            dish.innerHTML = `
                <img src="${data.meals[0].strMealThumb}" alt="${data.meals[0].strMeal}"/>
                <h1>${data.meals[0].strMeal}</h1><br>
                <h2>Ingredients</h2>
                <ul id="list">
            `;

            let accessData = data["meals"][0]; // для простішого доступу
            let ul = document.getElementById("list");
            let ingradientList = []; 

            for (let i=1; i<21; i++) {
                if (accessData[`strIngredient${i}`]) {
                    ingradientList.push(accessData[`strIngredient${i}`]+ ' - '+ accessData[`strMeasure${i}`]);

                    let li=document.createElement("li");
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


submit.addEventListener("submit", searchDishes);


function SaveIngredient() { // робота на сторінці frige.html
    document.getElementById("toHide").style.display="none";
    document.getElementById("toShow").style.display="block";

    let inputFrigeName = frigeName.value;
    let inputFrigeCount = frigeCount.value;
    let inputFrigeMeasure = frigeMeasure.value;
    let inputFrigeCategory = frigeCategory.value;

    let ulMilk = document.getElementById("milk");
    let ulMeat = document.getElementById("meat");
    let ulFr_vg = document.getElementById("frut_vegetables");
    let ulOther = document.getElementById("other");

    let li1=document.createElement("li");
    li1.innerHTML=`${inputFrigeName} - ${inputFrigeCount} ${inputFrigeMeasure}`;

    if(inputFrigeCategory=="Milk") {
        ulMilk.appendChild(li1);
    }
    else if(inputFrigeCategory=="Meat"){
        ulMeat.appendChild(li1);
    }
    else if(inputFrigeCategory=="Fruits and vegetables"){
        ulFr_vg.appendChild(li1);
    }
    else {
        ulOther.appendChild(li1);
    } 
}