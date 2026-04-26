let foodList = []

let breakfastBtn = document.querySelector('.breakfast-add-button')
let lunchBtn = document.querySelector('.lunch-add-button')
let dinnerBtn = document.querySelector('.dinner-add-button')

let totalBtn = document.querySelector('.show-total-button')
let showFoodBtn = document.querySelector('.show-food-button')
let setCalorieTargetBtn = document.querySelector('.set-calorie-target-button')


function setCalorieTarget(){
    let calorieTargetInput = document.querySelector('.calorie-target-input')
    let calorieTarget = calorieTargetInput.value

    if(isNaN(calorieTarget)){
        console.log("Invalid entry. Calorie target must be a number")
        return
    }

    console.log(`Calorie target set to: ${calorieTarget}`)
}

function addFood(type) {
    let itemInput = document.querySelector(`.${type}-item-input`);
    let calorieInput = document.querySelector(`.${type}-item-calories-input`);

    let item = itemInput.value;
    let itemCalorie = calorieInput.value;

    if(isNaN(itemCalorie)){
        console.log("Invalid entry. Calories must be a number")
        return
    }

    if(item.trim() === '' || itemCalorie.trim() === ''){
        console.log("Invalid entry. Enter all values")
        return
    }
    foodList.push({type, item, itemCalorie})

    itemInput.value = ''
    calorieInput.value = ''

    console.log(foodList)
    getTotal()
    
}

function getTotal(){
    let total = 0;
    if(foodList.length === 0){
        console.log('No Calories Entered')
        displayTotal(total)
        return
    }

    if(foodList.length > 1){
        for(let i=0; i<foodList.length; i++){
            total += Number(foodList[i].itemCalorie)
        }
    }else{
        total = Number(foodList[0].itemCalorie)
    }

    console.log(total)
    displayTotal(total)
}

function displayTotal(total){
    let Totalhtml = ''

    if(total > 0){
        Totalhtml += 
        `<div class = "total-calories">
            Total Calories Today:
            <div>${total}</div>
        </div>`
    }else{
        Totalhtml += 
        `<div class = "total-calories">
            No Calories Entered
        </div>`
    }

    document.querySelector('.total-calorie-display-section').innerHTML = Totalhtml
    
}

function displayFoods(){
    let foodSection = ''

    foodList.forEach((food, index) => {
        foodSection +=
        `<div class = "food-item">
            <ul>
                <li>Type: ${food.type}</li>
                <li>Item: ${food.item}</li>
                <li>Calories: ${food.itemCalorie}</li>
            </ul>

            <button onclick="deleteFood(${index})"> Delete </button>

        </div>`
    })
    document.querySelector('.show-foods').innerHTML = foodSection
}

function deleteFood(index){
    foodList.splice(index, 1)
    displayFoods()
    getTotal()
}

breakfastBtn.addEventListener('click', () => addFood('breakfast'))
lunchBtn.addEventListener('click', () => addFood('lunch'))
dinnerBtn.addEventListener('click', () => addFood('dinner'))

totalBtn.addEventListener('click', getTotal)
showFoodBtn.addEventListener('click', displayFoods)
setCalorieTargetBtn.addEventListener('click', setCalorieTarget)