/* VARIABLES */
let num1 = num2 = op = 0;

/* DISPLAY */
const display = document.getElementById("display");
function populate(value) {
    if (value == "ಠ_ಠ?") {
        display.textContent = value;
    } else {
        display.textContent = value;
    }
}

/* OPERATE */
function operate(op, num1 = 0, num2 = 0) {
    switch (op) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            if (num2 == 0) num2 = 1;
            return num1 * num2;
        case '/':
            if (num2 == 0) {
                return "ಠ_ಠ?";
            }
            return num1 / num2;
    }
}

/* DOM */
/* Number buttons */
const numbers = document.querySelector("#numbers");
numbers.addEventListener('click', function(event) {
    if (event.target.tagName == 'BUTTON') {
        if (op == 0) {
            num1 += event.target.textContent;
            num1 = Number(num1);
            populate(num1);
            console.log(`First input: ${num1}.`);
        } else {
            num2 += event.target.textContent;
            num2 = Number(num2);
            populate(num2);
            console.log(`First input: ${num1}.\nSecond input: ${num2}.`);
        }
    }
})

/* Decimal button */
let decimalUsed = false;
const decimal = document.getElementById("decimal");
decimal.addEventListener('click', function(event) {
    if (decimalUsed == false) decimalUsed = true;
})

/* Operator buttons */
const ops = document.querySelectorAll('.operators');
for (let button of ops) {
    button.addEventListener('click', function(event) {
        if (num2 != 0) {
            let result = operate(op, num1, num2);
            populate(result);
            console.log(result)
            num1 = result;
            num2 = 0;
            decimalUsed = false;
        } else {
            op = event.target.value;    
            console.log('Operator stored!')
        }
    })
}

/* = button */
const equal = document.getElementById("equal");
equal.addEventListener('click', () => {
    if (op != 0) {
        let result = operate(op, num1, num2);
        populate(result);
        console.log(`${num1} ${op} ${num2}`);
        console.log(result);
        num1 = result;
        num2 = 0;
        decimalUsed = false;
    }
})

/* Clear buttons */
const ac = document.getElementById("ac");
ac.addEventListener('click', () => {
    num1 = num2 = op = 0;
    populate(0);
    console.clear();
})
const c = document.getElementById("c");
c.addEventListener('click', () => {
    alert("last number inpute cleared!")
})

console.log("Hello Check Check")
