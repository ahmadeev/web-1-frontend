//  восстановить таблицу из сессии
//  применяется после перезагрузки страницы
function restoreTableAfterRefresh() {
    if (stringCounter == 1 && window.localStorage.getItem('stringCounter') != null) {
        var counter = window.localStorage.getItem('stringCounter')
        while (stringCounter < counter) {
            var obj = JSON.parse(window.localStorage.getItem(stringCounter));
            var tableRow = document.getElementById('result_table').insertRow(stringCounter);
    
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
            currentTime.innerHTML = obj.currentTime;
            scriptExecutionTime.innerHTML = obj.scriptTime;

            stringCounter += 1
        }
        window.localStorage.setItem('stringCounter', stringCounter)
    }
}
