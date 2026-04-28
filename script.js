let foodList = []
let calorieTarget = 0

let breakfastBtn = document.querySelector('.breakfast-add-button')
let lunchBtn = document.querySelector('.lunch-add-button')
let dinnerBtn = document.querySelector('.dinner-add-button')

let totalBtn = document.querySelector('.show-total-button')
let showFoodBtn = document.querySelector('.show-food-button')
let setCalorieTargetBtn = document.querySelector('.set-calorie-target-button')


function setCalorieTarget(){
    let calorieTargetInput = document.querySelector('.calorie-target-input')
    let targetValue = calorieTargetInput.value

    if(isNaN(targetValue) || targetValue.trim() === ''){
        console.log("Invalid entry. Calorie target must be a number")
        return
    }

    calorieTarget = Number(targetValue)

    document.querySelector('.target-calorie-display-section').innerHTML =
    `<div class = "target-calorie">
        Calorie Target: ${calorieTarget}
    </div>
    <div class="progress-display-section">
        <div class="progress-bar"></div>
    </div>`

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

function updateProgressBar(totalCalories){
    if(calorieTarget <= 0 || isNaN(calorieTarget)) return;

    let percentage = (totalCalories/calorieTarget) * 100;
    if (percentage > 100) percentage = 100;
    if (percentage < 0) percentage = 0;

    let progressBar = document.querySelector('.progress-bar')
    if(!progressBar) return;
    
    progressBar.style.width = percentage + '%';

    if(percentage < 50){
        progressBar.style.backgroundColor = 'red';
    }else if(percentage < 80){
        progressBar.style.backgroundColor = 'orange';
    }else{
        progressBar.style.backgroundColor = 'green';
    }


}

function getTotal(){
    let total = 0;
    if(foodList.length === 0){
        console.log('No Calories Entered')
        displayTotal(total)
        updateProgressBar(total)
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
    updateProgressBar(total)
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