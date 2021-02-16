// putting dom into variables
const display1El = document.querySelector('.dis-1');
const display2El = document.querySelector('.dis-2');
const tempEl = document.querySelector('.dis-temp');
const buttonEl = document.querySelectorAll('.number');
const operationEl = document.querySelectorAll('.operation');
const clearAllEl = document.querySelector('.all-clear-btn');
const lastEntityClear = document.querySelector('.last-entity-clear-btn');
const equalEl = document.querySelector('.equal-btn');

// Initial value
let dis1Num = '';
let dis2Num = '';
let result = null;
let lastOperation = '';
let haveDot = false;

// take number
buttonEl.forEach(button => {
    button.addEventListener('click', function(e) {
        if(e.target.innerText === '.' && !haveDot) {
            haveDot = true;
        } else if(e.target.innerText === '.' && haveDot) {
            return;
        }

        dis2Num += e.target.innerText;
        display2El.innerText = dis2Num;
    })
});

operationEl.forEach(operation => {
    operation.addEventListener('click', function(e) {
        if(!dis2Num) return;
        haveDot = false;
        const operationName = e.target.innerText;
        if(dis1Num && dis2Num && result) {
            mathOperation()
        } else {
            result = parseFloat(dis2Num);
        }

        clearVar(operationName);
        lastOperation = operationName;
    })
});

function clearVar(name = '') {
    dis1Num += dis2Num + ' ' + name + ' ';
    display1El.innerText = dis1Num;
    display2El.innerText = '';
    dis2Num = ''
    tempEl.innerText = result;
}

// Math Operation function 
function mathOperation() {
    if(lastOperation === 'X') {
        result = parseFloat(result) * parseFloat(dis2Num);
    } else if(lastOperation === '/') {
        result = parseFloat(result) / parseFloat(dis2Num);
    } else if(lastOperation === '-') {
        result = parseFloat(result) - parseFloat(dis2Num);
    } else if(lastOperation === '+') {
        result = parseFloat(result) + parseFloat(dis2Num);
    } else if(lastOperation === '%') {
        result = parseFloat(result) % parseFloat(dis2Num);
    }
}

equalEl.addEventListener('click', function(e) {
    if(!dis1Num || !dis2Num) return;
    haveDot = false;
    mathOperation();
    clearVar()
    display2El.innerText = result;
    tempEl.innerText = '0'
})

clearAllEl.addEventListener('click', function(e) {
    display1El.innerText = '0';
    display2El.innerText = '0';
    dis1Num = '';
    dis2Num = '';
    tempEl.innerText = '0';
})

lastEntityClear.addEventListener('click', function(e) {
    display2El.innerText = '0';
    dis2Num = '';
})

window.addEventListener('keydown', function(e) {
    if(
        e.key === '0' ||
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||
        e.key === '9' ||
        e.key === '.'
    ) {
        buttonClick(e.key);
    } else if(
        e.key === '/' ||
        e.key === '%' ||
        e.key === '-' ||
        e.key === '+'
    ) {
        operationClick(e.key);
    } else if(e.key === '*') {
        operationClick('X');
    } else if(e.key === 'Enter' || e.key === '=') {
        equalClick()
    }
})

function buttonClick(key) {
    buttonEl.forEach(button => {
        if(button.innerText === key) {
            button.click();
        }
    })
}

function operationClick(key) {
    operationEl.forEach(operation => {
        if(operation.innerText === key) {
            operation.click();
        }
    })
}

function equalClick() {
    equalEl.click()
}