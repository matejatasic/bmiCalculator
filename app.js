//Variables
let heightInput = document.getElementById('heightInput');
let weightInput = document.getElementById('weightInput');
let feetHeight = document.getElementById('feetHeight');
let standardBtn = document.getElementById('standardBtn');
let metricBtn = document.getElementById('metricBtn');
let submitBtn = document.getElementById('submitBtn');
let outputDiv = document.getElementById('outputDiv');
let feetDiv = document.getElementById('feetDiv');
let measure = 'metric';
let empty = false;
let result;

//Event Listeners
submitBtn.addEventListener('click', calculate)
metricBtn.addEventListener('click', () => {
    changeMeasure('metric');
});
standardBtn.addEventListener('click', () => {
    changeMeasure('standard');
});

//Functions

//Calculate BMI
function calculate() {
    feet = feetHeight.value;
    let height = heightInput.value;
    let weight = weightInput.value;
    if(measure === 'metric') {
        checkInput(height, weight)
        bmi = (weight / ((height/100)**2)).toFixed(1);
    
    }
    else if (measure === 'standard') {
        let height1 = (feetHeight * 12) + height;
        checkInput(height1, weight);
        bmi = ((weight / height1 / height1) * 703).toFixed(1);
    }  

    if(empty === false) {
        checkBmi(bmi);
        showOutput(bmi);
    }
}

//Check if there are empty input fields and show warning
function checkInput(height, weight) {
    if(isNaN(height / weight)) {
        outputDiv.innerHTML = `
        <div class="alert alert-danger mt-3 w-50">
            <h6>Fill Out All The Fields!</h6>
        </div>
        `;
        setTimeout(() => {
            outputDiv.innerHTML = '';
        }, 2000);
        empty = true;
    }       
    else {
        empty = false;
    }
}

//Check the span of the BMI
function checkBmi(bmi) {
    if(bmi < 18.5) {
        result = 'underweight';
    }
    else if(bmi < 24.9) {
        result = 'normal';
    }
    else if(bmi < 29.9) {
        result = 'overweight';
    }
    else {
        result = 'obese';
    }
}

//Show output according to BMI span
function showOutput(bmi) {
    outputDiv.innerHTML = `
        <div class="row mt-3">
            <div class="col-sm-6 text-center">
                <h3>Your Results</h3>
                <h5>Your BMI: ${bmi}</h5>
                <h5>You are ${result}</h5>
            </div>
            <div class="col-sm-6 text-center">
                <h4>BMI Categories</h3>
                <h6>Underweight: < 18.5</h6>
                <h6>Normal: 18.5 - 24.9</h6>
                <h6>Overweight: 25 - 29.9</h6>
                <h6>Obesity: 30 or greater</h6>
            </div>
        </div>
    `;
}

//Change measures with wich to calculate BMI
function changeMeasure(val) {
    measure = val;
    if(val === 'metric') {
        heightInput.value = '';
        weightInput.value = '';
        feetHeight.value = '';
        heightInput.placeholder = 'Please type in your height in centimeters';
        weightInput.placeholder = 'Please type in your weight in kilograms';
        outputDiv.innerHTML = '';
        feetDiv.style.display = 'none';
    }
    else {
        heightInput.value = '';
        weightInput.value = '';
        heightInput.placeholder = 'Please type in your height in inches';
        weightInput.placeholder = 'Please type in your weight in pounds';
        outputDiv.innerHTML = '';
        feetDiv.style.display = 'inline';  
    }
}