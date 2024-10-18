function afterRefresh() {

    if (stringCounter == 1 && window.localStorage.getItem('stringCounter') != null) {
        var counter = window.localStorage.getItem('stringCounter')
        while (stringCounter < counter) {
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
            //yValue.innerHTML = parseFloat(obj.y).toFixed(2);
            RValue.innerHTML = obj.R;
            isHit.innerHTML = obj.isHit;
            currentTime.innerHTML = obj.currentTime;
            scriptExecutionTime.innerHTML = obj.scriptTime;
            stringCounter += 1
        }
        window.localStorage.setItem('stringCounter', stringCounter)


    }

}

afterRefresh();
//window.onload = function() {afterRefresh();}