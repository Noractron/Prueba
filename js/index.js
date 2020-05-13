
$(document).ready(function () {
    $('#formulario').submit(function (e) {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: './buscador.php',
            data: $(this).serialize(),
            success: function (response) {
                var jsonData = JSON.parse(response);
                $(".informacion").empty();
                if (jsonData) {
                    colocaHtml(jsonData);
                }
            }
        });
    });
});

//Inicializamos el input Ciudad

$.ajax({
    url: "./data-1.json",
    type: "GET",
    data: {},
    dataType: 'json', // ¡¡¡ Iportantisimo definir el datatype JSON !!!
    success: function (data) {
        /*Sacar elementos unicos del arreglo*/
        const distinctCity = [...new Set(data.map(x=>x.Ciudad))];
        distinctCity.sort();
        for (var i = 0; i <= distinctCity.length-1; i++) {
            $("#selectCiudad").append("<option value= '" + distinctCity[i] + "'>" + distinctCity[i] + "</option>");
        }
        // var ciudad = {};    
        // var ciudades = data.filter(function (e) {
        //     return ciudad[e.Ciudad] ? false : (ciudad[e.Ciudad] = true);
        // });
        // for (var i = 0; i <= 5; i++) {
        //     $("#selectCiudad").append("<option value= '" + ciudades[i].Ciudad + "'>" + ciudades[i].Ciudad + "</option>");
        // }
        const distinctTipo = [...new Set(data.map(x=>x.Tipo))];
        distinctTipo.sort();
        for (var i = 0; i <= distinctTipo.length-1; i++) {
            $("#selectTipo").append("<option value= '" + distinctTipo[i] + "'>" + distinctTipo[i] + "</option>");
        }
        // var tipo = {};
        // var tipos = data.filter(function (e) {
        //     return tipo[e.Tipo] ? false : (tipo[e.Tipo] = true);
        // });
        // for (var i = 0; i <= 2; i++) {
        //     $("#selectTipo").append("<option value='" + tipos[i].Tipo + "'>" + tipos[i].Tipo + "</option>");
        // }

        $('select').material_select(); //Se debe inicializar el select para que este funcione

    }
})



//funcion para mostrar todos los elementos al ejecutar el boton mostrar Todos

$('#mostrarTodos').click(function () {
    mostrarTodos();
});

function mostrarTodos() {
    $.ajax({
        url: "mostrar.php",
        type: "GET",
        success: function (response) {
            response = JSON.parse(response);
            $(".informacion").empty();
            colocaHtml(response);
        }
    });
}

function colocaHtml(arreglo) {
    $.each(arreglo, function (i, data) {
        $(".informacion").append(`
            <div class="tituloContenido card itemMostrado">
                <img src="img/home.jpg">
                <div class="card-stacked">
                   <div class="card-content">
                      <b>Dirección:</b> ${data.Direccion} <br>
                      <b>Ciudad:</b> ${data.Ciudad}<br>
                      <b>Telefono:</b> ${data.Telefono}<br>
                      <b>Codigo Postal:</b> ${data.Codigo_Postal}<br>
                      <b>Tipo:</b> ${data.Tipo}<br>
                      <b>Precio:</b> ${data.Precio}<br>
                      </div>
                  <div class="card-action"> <a href="#">Ver mas</a> </div> </div> </div> </div>

        `)
    });
}


/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function (callback, timeout) {
    $(this).scroll(function () {
        var $this = $(this);
        if ($this.data('scrollTimeout')) {
            clearTimeout($this.data('scrollTimeout'));
        }
        $this.data('scrollTimeout', setTimeout(callback, timeout));
    });
};



/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider() {
    $("#rangoPrecio").ionRangeSlider({
        type: "double",
        grid: false,
        min: 0,
        max: 100000,
        from: 200,
        to: 80000,
        prefix: "$"
    });
}

/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/

function playVideoOnScroll() {
    var ultimoScroll = 0,
        intervalRewind;
    var video = document.getElementById('vidFondo');
    $(window)
        .scroll((event) => {
            var scrollActual = $(window).scrollTop();
            try {
                if (scrollActual > ultimoScroll) {
                    video.currentTime = 0;
                    video.play();
                } else {
                    //this.rewind(1.0, video, intervalRewind);
                    video.currentTime = 0;
                    video.play();
                }
            } catch (e) {

            }
            ultimoScroll = scrollActual;
        })
        .scrollEnd(() => {
            video.pause();
        }, 10)
}



inicializarSlider();
playVideoOnScroll();