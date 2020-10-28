'strict mode'
function add(a,b){
    return a+b;
}
function subtract(a,b){
    return a-b
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    if (b==0){
        return "ERROR. Division by 0";
    }
    return a/b;
}
function operate(operator,a,b){
    return operator(a,b);
}
let displayValue = '';
const display = document.querySelector('#display');
let result=0;
let a;
let b;
let number='';
let operator;
let computed = 0;
let decimalActivated = 0;
const decimal = document.querySelector('#decimal');
function saveInput(e){
    if(this.classList.contains('operators')){
        decimalActivated = 0;
        computed = 0;
        if (a===undefined){
            a = Number(number);
            number = '';
            
        }
        else{
            b = Number(number);
            result = operate(window[operator],a,b);
            a = result;
            b = undefined;
            number = '';

        }
        operator = this.getAttribute('id');
    }
    else if(this.getAttribute('id')=='decimal'){
        decimalActivated = 1;
        number+=this.textContent;
    }
    else{
        if (computed===1){
            a = undefined;
            b = undefined;
            result = 0;
            number = ''
            displayValue = '';
            computed = 0;
        }
        number+=this.textContent;
        
    }
    decimal.disabled = decimalActivated;
    displayValue+=this.textContent;
    display.textContent = displayValue;
}
function compute(){
    if (a===undefined){
        a = Number(number);
    }
    else if (b===undefined){
        b = Number(number);
    }
    if (b!=undefined){
        result = operate(window[operator],a,b);
    }
    else{
        result = a;
    }
    //let result = operate(window[operators[0]],numbers[0],numbers[1]);
    let visualResult;
    if (typeof result==='number'){
        visualResult = Math.round((result+Number.EPSILON)*100)/100;
    }
    else{
        visualResult = result;
    }
    decimalActivated = 1;
    decimal.disabled = decimalActivated;
    return visualResult;

}
function clearAll(){
    displayValue = '';
    display.textContent = '0';
    result = undefined;
    a = undefined;
    b = undefined;
    number = '';
    decimalActivated = 0;
    decimal.disabled = decimalActivated;
}
const buttons = document.querySelectorAll('.toDisplay');
buttons.forEach(el=>el.addEventListener('click',saveInput)) ;
const equal = document.querySelector('#equal');
equal.addEventListener('click',function(){
    displayValue = compute();
    display.textContent = displayValue;
    computed = 1;
});
const clear = document.querySelector('#clear');
clear.addEventListener('click', clearAll);
function deleteLastSymbol(){
    if (number!=''&&computed===0){
        if (number.substring(number.length-1)==="."){
            decimalActivated = 0;
            decimal.disabled = decimalActivated;
        }
        number = number.slice(0,-1);
        displayValue=displayValue.slice(0,-1);
        display.textContent = displayValue;
    }
    if(displayValue==''){
        display.textContent = '0';
    }
}
const backspace = document.querySelector('#backspace');
backspace.addEventListener('click',deleteLastSymbol);
//Add keyboard support
function inputFromKeyboard(e){
    keyName = e.key;
    if (keyName == "Enter") keyName = "=";
    const key = document.querySelector(`button[name='${keyName}']`);
    if (key) key.click();
}
window.addEventListener('keydown',inputFromKeyboard);

//THEMES
const container = document.querySelector('#container');
function changeDecoration(arr){
    container.setAttribute('style',`background-color: ${arr[0]}` );
    buttons.forEach(el=>el.setAttribute('style',`background-color: ${arr[1]}; color: ${arr[2]}`));
    clear.setAttribute('style',`background-color:${arr[3]}; color: ${arr[2]}`);
    equal.setAttribute('style',`background-color: ${arr[4]}; color: ${arr[2]}`);
    buttons.forEach(el=>el.classList.add('withoutBorders'));
    clear.classList.add('withoutBorders');
    equal.classList.add('withoutBorders');
    backspace.setAttribute('style',`background-color: ${arr[1]}; color: ${arr[2]}`);
    backspace.classList.add('withoutBorders');
    display.setAttribute('style','background-color:dimgray; color: white');
}
const light = document.querySelector('#light');
const lightColors = ['paleturquoise','transparent','black','transparent','transparent'];
light.addEventListener('click',function(){
    changeDecoration(lightColors);
});
const dark = document.querySelector('#dark');
const darkColors = ['dimgray','transparent','white','transparent','transparent'];
dark.addEventListener('click', function(){
    changeDecoration(darkColors);
    display.removeAttribute('style');
});
const retro = document.querySelector('#retro');
const retroColors = ['rosybrown','transparent','black','transparent','transparent'];
retro.addEventListener('click',function(){
    changeDecoration(retroColors);
});
const defaultTheme = document.querySelector('#default');
defaultTheme.addEventListener('click',function(){
    container.removeAttribute('style');
    buttons.forEach(el=>el.removeAttribute('style'));
    clear.removeAttribute('style');
    equal.removeAttribute('style');
    backspace.removeAttribute('style');
    buttons.forEach(el=>el.classList.remove('withoutBorders'));
    equal.classList.remove('withoutBorders');
    clear.classList.remove('withoutBorders');
    backspace.classList.remove('withoutBorders');
    display.removeAttribute('style');

});