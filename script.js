const lowerDisplay = document.getElementById('lower-display')
const upperDisplay = document.getElementById('upper-display')
const currentOperator = document.getElementById('current-operator')
const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const buttonDecimal = document.querySelector('.decimal')
const buttonClear = document.querySelector('.clear')
const buttonDelete = document.querySelector('.delete')
const buttonPosNeg = document.querySelector('.positive-negative')
const buttonResult = document.querySelector('.result')
const buttonZeroes = document.querySelector('.zeroes')

let decimalAdded = false
let firstOperandAdded = false
let secondOperandAdded = false
let operatorAdded = false
let firstOperand = 0
let secondOperand = 0
let operator = ''
let result = 0
let resultShown = false


numbers.forEach(event =>
    event.addEventListener('click', (event) => {
        event.preventDefault()
        if (resultShown === true) {
            clearAll()
        }
        if (lowerDisplay.textContent.length < 11) {
            changeClearBtn()
            if (lowerDisplay.textContent === '0') {
            lowerDisplay.textContent = event.target.value
            } else {
            addSign(event.target)
            }
        } 
    }))

buttonZeroes.addEventListener('click', (event) => {
    if (lowerDisplay.textContent !== '0' && lowerDisplay.textContent.length < 11) {
        addSign(event.target)
    }
})

operators.forEach(event => 
     event.addEventListener('click', (event) => {
         event.preventDefault()
         if (resultShown === true) {
            upperDisplay.classList.remove('hidden')
            currentOperator.classList.remove('hidden')
            addOperator(event.target)
            addFirstOperand()
            lowerDisplay.textContent = '0'
            secondOperandAdded = false
            resultShown = false
            secondOperand = 0
            result = 0
        }
         if (firstOperand) {
            addOperator(event.target)
         } else {
            upperDisplay.classList.remove('hidden')
            currentOperator.classList.remove('hidden')
            addOperator(event.target)
            addFirstOperand()
            lowerDisplay.textContent = '0'
         }
}))

buttonResult.addEventListener('click', (event) => {
    event.preventDefault()
    if (firstOperandAdded === true && operatorAdded === true) {
        addSecondOperand()
        showResult()
    }
})

buttonPosNeg.addEventListener('click', (event) => {
    event.preventDefault()
    if (lowerDisplay.textContent[0] === '-') {
        lowerDisplay.textContent = lowerDisplay.textContent.substring(1, lowerDisplay.textContent.length);
    } else if
        (lowerDisplay.textContent !== '0') {
        lowerDisplay.textContent = '-' + lowerDisplay.textContent
        }
})

buttonDecimal.addEventListener('click', (event) => {
    event.preventDefault()
        if ((lowerDisplay.textContent.length < 11) && (!decimalAdded)) {
            addSign(event.target)
            changeClearBtn()
            decimalAdded = true
            }
})

buttonClear.addEventListener('click', (event) => {
    event.preventDefault()
    clearAll()
})

buttonDelete.addEventListener('click', event => {
    event.preventDefault()
    if (lowerDisplay.textContent.length === 1) {
        lowerDisplay.textContent = '0'
        if (firstOperandAdded === false) {
            buttonClear.textContent = 'C'}
    } else if (lowerDisplay.textContent.length > 1) {
        lowerDisplay.textContent = lowerDisplay.textContent.substring(0, lowerDisplay.textContent.length - 1);
    }
})

function addSign (sign) {
    lowerDisplay.textContent += sign.value
}

function addOperator(sign) {
    currentOperator.textContent = sign.value
    operator = sign.value
    operatorAdded = true
}

function addFirstOperand() {
    upperDisplay.textContent = lowerDisplay.textContent
    firstOperand = Number(lowerDisplay.textContent)
    firstOperandAdded = true
}

function addSecondOperand() {
    secondOperandAdded = true
    secondOperand = Number(lowerDisplay.textContent)
}

function showResult() {
    upperDisplay.textContent = '0'
    currentOperator.textContent = '0'
    upperDisplay.classList.add('hidden')
    currentOperator.classList.add('hidden')
    if (operator === '+') {
            result = firstOperand + secondOperand
        } else 
        if (operator === '-') {
            result = firstOperand - secondOperand
        } else 
        if (operator === '*') {
            result = firstOperand * secondOperand
        } else {
            result = firstOperand / secondOperand
        }
    lowerDisplay.textContent = result    
    resultShown = true
    operatorAdded = false
    firstOperandAdded = false
    secondOperandAdded = false
    firstOperand = 0
    secondOperand = 0
    operator = ''
}

function changeClearBtn() {
    buttonClear.textContent = 'CE'
}

function clearAll () {
    lowerDisplay.textContent = '0'
    upperDisplay.textContent = '0'
    currentOperator.textContent = '0'
    decimalAdded = false
    operatorAdded = false
    firstOperandAdded = false
    secondOperandAdded = false
    resultShown = false
    firstOperand = 0
    secondOperand = 0
    operator = ''
    result = 0
    buttonClear.textContent = 'C'
    upperDisplay.classList.add('hidden')
    currentOperator.classList.add('hidden')
}