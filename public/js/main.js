window.onload = function() {
    leer();
    labelsX = [];
    dataY = [];
}

function objetoAjax() {
    var xmlhttp = false;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

function leer() {

    var ajax = objetoAjax();
    formdata = new FormData();
    formdata.append('_token', document.getElementById('token').getAttribute("content"));
    formdata.append('_method', 'GET');

    ajax.open("POST", "leer", true);

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);

            for (var i = 0; i < respuesta.length; i++) {
                labelsX.push(respuesta[i].nombre);
                dataY.push(respuesta[i].num);
            }
            // creamos el chart
            chartCreate();
        }
    }

    ajax.send(formdata)
}

function chartCreate() {
    const data = {
        labels: labelsX,
        datasets: [{
            label: 'Número de Pokemons por tipo',
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(249, 188, 63)',
                'rgb(97, 77, 35)',
                'rgb(65, 216, 26)',
                'rgb(254, 173, 0)',
                'rgb(62, 90, 155)',
                'rgb(6, 13, 32)',
                'rgb(81, 82, 72)',
                'rgb(248, 0, 255)',
                'rgb(255, 0, 108)',
                'rgb(218, 223, 240)',
                'rgb(94, 78, 159)',
                'rgb(187, 158, 186)'

            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(249, 188, 63)',
                'rgb(97, 77, 35)',
                'rgb(65, 216, 26)',
                'rgb(254, 173, 0)',
                'rgb(62, 90, 155)',
                'rgb(6, 13, 32)',
                'rgb(81, 82, 72)',
                'rgb(248, 0, 255)',
                'rgb(255, 0, 108)',
                'rgb(218, 223, 240)',
                'rgb(94, 78, 159)',
                'rgb(187, 158, 186)'

            ],
            data: dataY,
        }]
    };
    const config = {
        type: 'doughnut',
        data: data,
        // options: {}
    };
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}