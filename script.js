let foodList = []
let goalReached = false

let breakfastBtn = document.querySelector('.breakfast-add-button')
let lunchBtn = document.querySelector('.lunch-add-button')
let dinnerBtn = document.querySelector('.dinner-add-button')
let extraFoodBtn = document.querySelector('.add-extra-food-button')

let showFoodBtn = document.querySelector('.show-food-button')
let setCalorieTargetBtn = document.querySelector('.set-calorie-target-button')
let resetBtn = document.querySelector('.reset-button')


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
        <div class="progress-text">0%</div>
        <div class="progress-bar"></div>
    </div>`

    return calorieTarget

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

function addExtraFood(){
    document.querySelector('.extra-food-section').innerHTML = 
        `<h3 class="extra-food-title">Add Extra Food</h3>
        <input type="text" class="extra-item-input" placeholder="Extra Item">
        <input type="text" class="extra-item-calories-input" placeholder="Calories">
        <button class="extra-add-button">Add</button>`

    let extraAddBtn = document.querySelector('.extra-add-button')
    extraAddBtn.addEventListener('click', () => {
        let itemInput = document.querySelector('.extra-item-input');
        let calorieInput = document.querySelector('.extra-item-calories-input');

        let item = itemInput.value;
        let itemCalorie = calorieInput.value;
        foodList.push({type: 'extra', item, itemCalorie})

        itemInput.value = ''
        calorieInput.value = ''
        getTotal()
    })
}

function resetAll(){
    foodList.length = 0
    document.querySelector('.target-calorie-display-section').innerHTML = ''
    document.querySelector('.total-calorie-display-section').innerHTML = ''
    document.querySelector('.show-foods').innerHTML = ''
    document.querySelector('.goal-message').classList.remove('show')
    document.querySelector('.calorie-target-input').value = ''
    goalReached = false
}

function updateProgressBar(totalCalories){
    let calorieTarget = setCalorieTarget()
    if(calorieTarget <= 0 || isNaN(calorieTarget)) return;

    let percentage = (totalCalories/calorieTarget) * 100;
    if (percentage > 100) percentage = 100;
    if (percentage < 0) percentage = 0;

    let progressBar = document.querySelector('.progress-bar')
    if(!progressBar) return;
    
    progressBar.style.width = percentage + '%';

    let progressText = document.querySelector('.progress-text')
    if(progressText){
        progressText.textContent = `${Math.round(percentage)}%`
    }

    if(percentage < 50){
        progressBar.style.backgroundColor = 'red';
    }else if(percentage < 80){
        progressBar.style.backgroundColor = 'orange';
    }else{
        progressBar.style.backgroundColor = 'green';
    }

    let message = document.querySelector('.goal-message')

    if(percentage >= 100 && !goalReached){
        goalReached = true;

        message.innerHTML = 
        `<div class="goal-reached-message">
            Goal Reached! Great Job!
        </div>`
        message.classList.add('show');
    }

    if (percentage < 100) {
        goalReached = false;
        message.classList.remove('show');
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
extraFoodBtn.addEventListener('click', addExtraFood)

showFoodBtn.addEventListener('click', displayFoods)
setCalorieTargetBtn.addEventListener('click', setCalorieTarget)
resetBtn.addEventListener('click', resetAll)