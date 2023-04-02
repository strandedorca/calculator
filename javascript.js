/* VARIABLES */
let num1 = num2 = op = "";

/* DISPLAY */
/* Display 0 if there's no value */
const display = document.getElementById("display");
function populate(value) {
    value = value.toString();
    if (value == "") {
        display.textContent = "0";
    } else {
        if (value.length < 8) {
            display.style.fontSize = "2.5rem";
        } else if (value.length == 8) {
            display.style.fontSize = "2.25rem";
        } else if (value.length == 9) {
            display.style.fontSize = "2.0rem";
        } else {
            let n = value.length - 5;
            let sup = document.createElement("sup");
            sup.textContent = n;
            display.textContent = value.slice(0, 4) + "×10";
            display.appendChild(sup);
            return;
        }

        if (value.length)
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
            /* Check if the decimal point is used */
            if (event.target.id == "decimal") {
                decimalUsed = true;
            }
            if (op == "") {
                num1 += event.target.value;
                populate(num1);
            } else {
                num2 += event.target.value;
                populate(num2);
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
            console.log(num1, op, num2, result);
            populate(result);
            console.log(result);
            num1 = result; 
            num2 = "";
            decimalUsed = false;
            op = event.target.value;
            console.log(num2, op)
        } else {
            op = event.target.value; 
            console.log(op);   
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
        console.log(num1, op, num2, result);
        populate(result);
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
    decimalUsed = false;
})

/* Clear the last input */
const c = document.getElementById("c");
c.addEventListener('click', function(event) {
    if (op == "") {
        num1 = num1.slice(0, num1.length - 1);
        populate(num1);
    } else {
        num2 = num2.slice(0, num2.length - 1);
        populate(num2);
    }
})

/* CLICK ANIMATION */
const allButtons = document.querySelectorAll("button");
for (let button of allButtons) {
    button.addEventListener("mousedown", () => button.classList.toggle("is-active"));
    button.addEventListener("mouseup", () => button.classList.toggle("is-active"));
    // button.addEventListener("mouseup", (event) => console.log(event.target.textContent))
    document.addEventListener("keydown", () => button.classList.toggle("is-active"));

    document.addEventListener("keyup", (event) => {
        console.log(button.id, button.value, event.key)
        if (event.key == button.id || event.key == button.value) {
            button.classList.toggle("is-active");
            button.click();
        }    
    });
}
