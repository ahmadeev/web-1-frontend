//  очистить сессию и таблицу, заблокировать кнопку 'submit'
//  применена к кнопке 'reset'
function resetButtonHandler() {
    var submitButton = form.querySelector('#submitButton');
    submitButton.setAttribute("disabled", "")
    window.localStorage.clear()
    for (var i = 1; i != stringCounter; i++) {
        var table = document.getElementById('result_table')
        table.deleteRow(1)
        stringCounter = 1
        window.localStorage.setItem('stringCounter', stringCounter)
    }
}

//  провалидировать значения полей, разблокировать кнопку 'submit' в случае правильных значений
//  работает от изменений в форме
function validateInputFields() {
    var submitButton = form.querySelector('#submitButton');
    var xInput = form.querySelector('input[name="xType"]:checked').value;
    var yInput = form.querySelector('[name="yType"]').value;
    var RInput = form.querySelector('input[name="RType"]:checked').value;

    if (yInput.match(/^-?\d+(?:[.,]\d+)?$/)
        && parseFloat(yInput) <= 3
        && parseFloat(yInput) >= -3
        && parseFloat(yInput) != null
        && parseInt(xInput) != null
        && parseInt(RInput) != null) {
        submitButton.removeAttribute("disabled");
        
    } else {
        submitButton.setAttribute("disabled", "");
    }
    xInput = null;
    yInput = null;
    RInput = null;
}

const form = document.getElementById("form")
form.onchange = function() {validateInputFields()};
