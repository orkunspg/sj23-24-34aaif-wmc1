var select = document.querySelectorAll(".currency"),
    input_currency = document.getElementById('input_currency'),
    output_currency = document.getElementById('output_currency'),
    history_output = document.getElementById('history_output'),
    date_input = document.getElementById('date'),
    convertButton = document.getElementById('convertButton'),
    swapButton = document.getElementById('swapButton'),
    historyButton = document.getElementById('historyButton');

fetch(`https://api.frankfurter.app/currencies`)
    .then((data) => data.json())
    .then((data) => {
        const entries = Object.entries(data);
        for (var i = 0; i < entries.length; i++) {
            select[0].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
            select[1].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
        }
    });

convertButton.addEventListener('click', convert);
swapButton.addEventListener('click', swapCurrencies);
historyButton.addEventListener('click', getHistoricalRate);

function convert() {
    var input_currency_val = input_currency.value;
    if (select[0].value != select[1].value) {
        const host = 'api.frankfurter.app';
        fetch(`https://${host}/latest?amount=${input_currency_val}&from=${select[0].value}&to=${select[1].value}`)
            .then((val) => val.json())
            .then((val) => {
                output_currency.value = Object.values(val.rates)[0];
                animateConversion();
            });
    } else {
        alert("Bitte zwei verschiedene Währungen auswählen");
    }
}

function swapCurrencies() {
    var temp = select[0].value;
    select[0].value = select[1].value;
    select[1].value = temp;
    animateSwap();
}

function getHistoricalRate() {
    var input_currency_val = input_currency.value;
    var date = date_input.value;
    if (select[0].value != select[1].value && date) {
        const host = 'api.frankfurter.app';
        fetch(`https://${host}/${date}?amount=${input_currency_val}&from=${select[0].value}&to=${select[1].value}`)
            .then((val) => val.json())
            .then((val) => {
                if (val.rates) {
                    history_output.value = Object.values(val.rates)[0];
                } else {
                    alert("Keine Daten für das ausgewählte Datum verfügbar.");
                }
            });
    } else {
        alert("Bitte Datum und zwei verschiedene Währungen auswählen");
    }
}

function animateConversion() {
    output_currency.classList.add('highlight');
    setTimeout(() => {
        output_currency.classList.remove('highlight');
    }, 1000);
}

function animateSwap() {
    select[0].classList.add('swap');
    select[1].classList.add('swap');
    setTimeout(() => {
        select[0].classList.remove('swap');
        select[1].classList.remove('swap');
    }, 500);
}
