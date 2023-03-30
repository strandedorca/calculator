/* VARIABLES */
let num1 = num2 = op = "";

/* DISPLAY */
/* Display 0 if there's no value */
const display = document.getElementById("display");
function populate(value) {
    if (value == "") {
        display.textContent = "0";
    } else {
        display.textContent = value;
    }
}

/* OPERATE */
/* Basic mathematic operations, including the division by 0 case */
function operate(op, num1 = "", num2 = "") {
    num1 = Number(num1);
    num2 = Number(num2);
    switch (op) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            // if (num2 == "") num2 = 1;
            return num1 * num2;
        case '/':
            if (num2 == 0) {
                return "ಠ_ಠ?";
            }
            return Math.round((num1 / num2) * 100) / 100;
    }
}

/* DOM */
/* Number buttons */
let decimalUsed = false;
/* Another way to assign handler to multiple elements: assign to its parent */
const numbers = document.querySelector("#numbers");
numbers.addEventListener('click', function(event) {
    /* If not a button -> not interested */
    if (event.target.tagName == 'BUTTON') {
        if (event.target.id != "decimal" || (event.target.id == "decimal" && decimalUsed == false)) {
            console.log(event.target.id);
            console.log(decimalUsed);
            /* Check if the decimal point is used */
            if (event.target.id == "decimal") {
                decimalUsed = true;
            }
            if (op == "") {
                /* event.target is the element that is clicked */
                num1 += event.target.textContent;
                populate(num1);
                console.log(`First input: ${num1}.`);
            } else {
                num2 += event.target.textContent;
                populate(num2);
                console.log(`First input: ${num1}.\nSecond input: ${num2}.`);
            }
        }
    }
})

/* Operator buttons */
const ops = document.querySelectorAll('.operators');
for (let button of ops) {
    button.addEventListener('click', function(event) {
        if (num2 != "") {
            let result = operate(op, num1, num2);
            populate(result);
            console.log(result)
            num1 = result;
            num2 = "";
            decimalUsed = false;
        } else {
            op = event.target.value;    
            console.log('Operator stored!')
        }
    })
}

/* Equal button */
const equal = document.getElementById("equal");
equal.addEventListener('click', () => {
    if (op != "") {
        if (num2 == "") {
            /* Do nothing if the second operant is not provided */
            return;
        }
        let result = operate(op, num1, num2);
        populate(result);
        console.log(`${num1} ${op} ${num2}`);
        console.log(result);
        num1 = result;
        num2 = "";
        decimalUsed = false;
    }
})

/* Clear everythng */
const ac = document.getElementById("ac");
ac.addEventListener('click', () => {
    num1 = num2 = op = "";
    populate("");
    console.clear();
    decimalUsed = false;
})

/* Clear the last input */
const c = document.getElementById("c");
c.addEventListener('click', function(event) {
    if (op == "") {
        num1 = num1.slice(0, num1.length - 1);
        populate(num1);
        console.log(`First input: ${num1}.`);
    } else {
        num2 = num2.slice(0, num2.length - 1);
        populate(num2);
        console.log(`First input: ${num1}.\nSecond input: ${num2}.`);
    }
    console.log("last input cleared")
})

console.log("Hello Check Check")
