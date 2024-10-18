function insert(data) {
    console.log("Начало выполнения функции вставки строки в таблицу")
    window.localStorage.setItem(stringCounter, data);
    console.log("Объект 'точка' добавлен в сессию")
    var obj = JSON.parse(window.localStorage.getItem(stringCounter));
    var tableRow = document.getElementById('resultTable').insertRow(stringCounter);


    var xValue = tableRow.insertCell(0);
	var yValue = tableRow.insertCell(1);
    var RValue = tableRow.insertCell(2);
    var isHit = tableRow.insertCell(3);
    var currentTime = tableRow.insertCell(4);
    var scriptExecutionTime = tableRow.insertCell(5);
    xValue.innerHTML = obj.x;
    yValue.innerHTML = obj.y;
    RValue.innerHTML = obj.R;
    isHit.innerHTML = obj.isHit;

    // var currentDate = new Date()
    // var currentTimeString = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds()
    // currentTime.innerHTML = currentTimeString;

    currentTime.innerHTML = "" + obj.currentTime;
    scriptExecutionTime.innerHTML = "" + obj.scriptTime;

    stringCounter += 1
    window.localStorage.setItem('stringCounter', stringCounter)
    console.log("Успешное выполнение вставки строки в таблицу")
}

stringCounter = 1;

$("#form").on("submit", function(){
    event.preventDefault();

    var RValue = []
    $("input:checkbox[name=RType]:checked").each(function(){
        RValue.push($(this).val());
    });

    var xValue = form.querySelector('input[name="xType"]:checked').value;
    var yValue = form.querySelector('[name="yType"]').value;

    for (var i of RValue) {
        var data = {'xType': xValue, 'yType': yValue, 'RType': i}

        $.ajax({
            url: '/fcgi-bin/server.jar',
            method: 'get',
            dataType: 'text',
            data: data,
            success: function(data){
                alert(data)
                insert(data)        
            },
            error: (jqXHR, textStatus, errorThrown) => {
                alert("Error: " + textStatus + ", " + errorThrown);
            }
        });
    }
});
