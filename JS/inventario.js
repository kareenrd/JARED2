

class inventario{

    listar(){
        document.getElementById('contenido_inicio').innerHTML = 'Tabla';
        document.getElementById('title_page').innerHTML = 'Inventario';
        // console.log(document.getElementById('contenido_inicio').outerHTML);


        $.ajax({
            url: '/methods/crud.php',
            data: parametros,
             beforeSend: function(objeto){
            //$("#loader").html("Cargando...");
          },
            success:function(data){
                console.log('cmpletado')
            }
        })
    }

}

var inv = new inventario();