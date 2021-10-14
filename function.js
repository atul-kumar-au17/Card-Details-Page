class UI {
    static nameUI = document.querySelector('#name');
    static numberUI = document.querySelector('#card-num');
    static expiresUI = document.querySelector('#expiry');
    static cvvUI = document.querySelector('#card-cvv');
  
    static populateMonthDropDown() {
        const select = document.querySelector("#select-month");  
        for(let i = 1; i < 13; i++) {
            let option = document.createElement("option");
            if(i < 10) option.innerText = `0${i}`;
                else option.innerText = i;
            option.value = i;
            select.appendChild(option);
        };
        UI.populateYearDropDown();
        UI.reset();
        UI.numberUI.firstElementChild.innerText = Card.cardNumber;
    };
  
    static populateYearDropDown() {
        const select = document.querySelector("#select-year"); 
        for(let i = 2030; i > 2020; i--) {
            let option = document.createElement("option");
            option.innerText = i;
            option.value = i % 100;
            select.appendChild(option);
        };
    };
  
    static displayCardDetails() {
        document.querySelector('.no-1').innerText = Card.cardNumber;
        document.querySelector('.no-2').innerText = Card.cardHolderName;
        document.querySelector('.no-3').innerText = Card.month;
        document.querySelector('.no-4').innerText = Card.year;
        document.querySelector('.no-5').innerText = Card.cvv;
        UI.clearInputs();
    };
  
    static clearInputs() {
        document.querySelector('#card-number').value = '';
        document.querySelector('#card-holder-name').value = '';
        document.querySelector('#CVV').value = '';
        document.querySelector('#select-year').value = 'Year';
        document.querySelector('#select-month').value = 'Month';
    };
  
    static flipImage() {
        UI.nameUI.style.display = 'none';
        UI.numberUI.style.display = 'none';
        UI.expiresUI.style.display = 'none';
        UI.cvvUI.style.display = 'inline-block';
        document.querySelector('.img-fluid').setAttribute('src', 'back.png');
    };
  
    static reset() {
        UI.nameUI.style.display = 'inline-block';
        UI.numberUI.style.display = 'inline-block';
        UI.expiresUI.style.display = 'inline-block';
        UI.cvvUI.style.display = 'none';
        document.querySelector('.img-fluid').setAttribute('src', 'front.png');
    };
  };
  
  class Card {
    static cardNumber = '#### #### #### ####';
    static cardHolderName = '';
    static cvv = '***';
    static year = '';
    static month = '';
  
    static updateCardNumber(value) {
        if(value !== '') {
            let i = 0;
            const strDefault = '#### #### #### ####';
            const endList = strDefault.split('');
            const strList = value.split('');
            console.log(endList);
            while(strList.length > 0) {
                if(i === 4 || i === 9 || i === 14) i++;
                if(i > 4 && i < 14) {
                    endList[i] = '*';
                    strList.shift();
                    i++;
                } else {
                    endList[i] = strList.shift();
                    i++;
                };
            };
            Card.cardNumber = endList.join('');   
            UI.numberUI.firstElementChild.innerText = endList.join('');
        } else document.querySelector('.number-ui').innerText = '#### #### #### ####';
    };
  
    static updateCardHolderName(value) {
        Card.cardHolderName = value.toUpperCase();
        if(value !== '') document.querySelector('.name-ui').innerText = value;
            else document.querySelector('.name-ui').innerText = '';
    };
  
    static updateCVV(value) {
        Card.cvv = value.toUpperCase();
        if(value !== '') document.querySelector('.cvv-ui').innerText = value;
            else document.querySelector('.cvv-ui').innerText = '***';
    };
  
    static updateYear(value) {
        if(value !== 'Year') {
            Card.year = value;
            document.querySelector('.year').innerText = value;
        };
    };
  
    static updateMonth(value) {
        if(value !== 'Month') {
            Card.month = value;
            if(value < 10) document.querySelector('.month').innerText = `0${value}`;
                else document.querySelector('.month').innerText = value;
        };
    };
  };
  
  class Events {
    static keyEventType(e) {
        if(e.target.id === 'card-number') Card.updateCardNumber(e.target.value);
            else if(e.target.id === 'card-holder-name') Card.updateCardHolderName(e.target.value);
                else if(e.target.id === 'CVV') Card.updateCVV(e.target.value);
    };
  
    static clickEventType(e) {
        if(e.target.id === 'select-year') Card.updateYear(e.target.value);
            else if(e.target.id === 'select-month') Card.updateMonth(e.target.value);
                else if(e.target.id === 'CVV') UI.flipImage();
                    else UI.reset();
    };
  };
  
  function loadAllEventListeners() {
    addEventListener('DOMContentLoaded', UI.populateMonthDropDown)
    document.querySelector('.ui').addEventListener('keyup', (e) => Events.keyEventType(e));
    document.querySelector('.ui').addEventListener('click', (e) => Events.clickEventType(e));
    document.querySelector('.btn').addEventListener('click', UI.displayCardDetails);
  };
  
  loadAllEventListeners();