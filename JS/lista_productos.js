
class productos {

    listar() {
        document.getElementById('page_lista_productos').style.display = 'block';
        //document.getElementById('cumple_arturito').style.display = 'none';
        
        document.getElementById('contenido_lista_productos').innerHTML = '';

        $.ajax({
            url: 'methods/crud.php',
            type: 'POST',
            data: {
                codigo: 1
            },
            success: function (response) {
                var datos = JSON.parse(response)
                var contenido = 
                '<thead>'+
                    '<tr>'+
                        '<th style="width: 10px"> ID </th>'+
                        '<th>Nombre Producto</th>'+
                        '<th>Fragancia</th>'+
                        '<th>Color</th>'+
                        '<th>Tamaño</th>'+
                        '<th>Cantidad</th>'+
                        '<th></th>'+
                    '</tr>'+
                '</thead>'+
                '<tbody>';

                document.getElementById('lista_productos').style.display = 'block';
                for(var i in datos){
                    //console.log('i:'+i+' nombre:'+datos[i].nombre_producto)
                    contenido += 
                    '<tr>'+
                        '<td>'+ datos[i].id +'</td>'+
                        '<td>'+ datos[i].nombre_producto +'</td>'+
                        '<td>'+ datos[i].fragancia +'</td>'+
                        '<td>'+ datos[i].color +'</td>'+
                        '<td>'+ datos[i].tamano +'</td>'+
                        '<td > '+
                            '<span class="badge badge-pill badge-'+prod.colores_cantidad_productos(datos[i].cantidad)+'" style="color: white; font-size:20px;" id="cant_producto">'+ datos[i].cantidad +'</span>'+
                        '</td>'+
                        '<td>'+
                            '<ul class="list-inline m-0">'+
                                '<li class="list-inline-item">'+
                                    '<button class="btn btn-outline-success" onclick="prod.open_modal(2, '+ datos[i].id +')"><i class="fa fa-edit" ></i></button>'+
                                '</li>'+
                                '<li class="list-inline-item">'+
                                    '<button class="btn btn-outline-danger" onclick="prod.open_modal(3, '+ datos[i].id +')"><i class="fa fa-trash"></i></button>'+
                                '</li>'+
                            '</ul>'+

                        '</td>'+
                        
                    '</tr>';
                }
                document.getElementById('contenido_lista_productos').innerHTML += '</tbody>'+contenido;
                
            }
        });
    }

    colores_cantidad_productos(cantidad){
        if(cantidad > 0 && cantidad <= 5){
            return 'danger';
        }else if (cantidad > 5 && cantidad <= 8){
            return 'warning';
        } else if (cantidad > 8){
            return 'success';
        } else if(cantidad == 0){
            return 'dark';
        }
    }
    /**
     * 1: Crear
     * 2: Editar
     * 3: eliminar
     */
    open_modal(option, id){
        if(option == 1){
            console.log('crear elemento '+id);
            $("#myModal").modal()
            prod.create_pedido();
        } else if (option == 2){
            console.log('editar elemento '+id);
            $("#myModal").modal();
            prod.edit_product(id);
        } else {
            console.log('eliminar elemento '+id);
            $("#myModal").modal();
        }
    }

    create_pedido(){
        document.getElementById('btn_add_modal').setAttribute('onclick','prod.crear_producto()');
        document.getElementById('modal_title').innerHTML = 'Crear producto';
        document.getElementById('modal_content').innerHTML = 
        '<form class="was-validated" id="nuevo_producto">'+
            '<div class="form-group">'+
                '<label for="nobre_producto">Nombre producto:</label>'+
                '<input type="text" class="form-control" id="nobre_producto" placeholder="Nombre producto" name="nobre_producto" required value="prueba">'+
                '<div class="valid-feedback">Valid.</div>'+
                '<div class="invalid-feedback">Please fill out this field.</div>'+
            '</div>'+
            '<div class="form-group">'+
                '<label for="fragancia">Fragancia:</label>'+
                '<input type="text" class="form-control" id="fragancia" placeholder="Fragancia" name="fragancia" required value="prueba">'+
                '<div class="valid-feedback">Valid.</div>'+
                '<div class="invalid-feedback">Please fill out this field.</div>'+
            '</div>'+
            '<div class="form-group">'+
                '<label for="color">Color:</label>'+
                '<input type="text" class="form-control" id="color" placeholder="Color" name="color" required value="prueba">'+
                '<div class="valid-feedback">Valid.</div>'+
                '<div class="invalid-feedback">Please fill out this field.</div>'+
            '</div>'+
            '<div class="form-group">'+
                '<label for="tamano">Tamaño:</label>'+
                '<input type="text" class="form-control" id="tamano" placeholder="Tamaño" name="tamano" required value="prueba">'+
                '<div class="valid-feedback">Valid.</div>'+
                '<div class="invalid-feedback">Please fill out this field.</div>'+
            '</div>'+
            '<div class="form-group">'+
                '<label for="cantidad">Cantidad:</label>'+
                '<input type="number" class="form-control" id="cantidad" placeholder="Cantidad" name="cantidad" required value="20">'+
                '<div class="valid-feedback">Valid.</div>'+
                '<div class="invalid-feedback">Please fill out this field.</div>'+
            '</div>'+
            '<div class="form-group">'+
                '<label for="tipo">Tipo producto:</label>'+
                '<input type="text" class="form-control" id="tipo" placeholder="Tipo producto" name="tipo" required value="prueba">'+
                '<div class="valid-feedback">Valid.</div>'+
                '<div class="invalid-feedback">Please fill out this field.</div>'+
            '</div>'+
            /*'<div class="form-group form-check">'+
                '<label class="form-check-label">'+
                    '<input class="form-check-input" type="checkbox" name="remember" required> I agree on blabla.'+
                    '<div class="valid-feedback">Valid.</div>'+
                    '<div class="invalid-feedback">Check this checkbox to continue.</div>'+
                '</label>'+
            '</div>'+*/
            //'<button class="btn btn-primary" onclick="prod.crear_producto()">Crear</button>'+
        '</form>';
    }

    crear_producto(){
        var df = {};
        var elem = document.getElementById('nuevo_producto').elements;
        for(var i = 0; i < elem.length; i++){
            if(elem[i].type == 'button' || elem[i].type == 'submit'){
                //
            }else{
                df[elem[i].name] = elem[i].value; 
            }
        }
        $.ajax({
            url: 'methods/crud.php',
            type: 'POST',
            data: {
                codigo: 2,
                info: df
            },
            success: function (response) {
                if(response === 'true'){
                    prod.listar();
                }
            }
        });
    
    }

    edit_product(id){
        document.getElementById('modal_title').innerHTML = 'Editar producto';
        document.getElementById('modal_content').innerHTML = 'Formulario:';
    }

    login(){
        var df = {};
        var elem = document.getElementById('form_login').elements;
        for(var i = 0; i < elem.length; i++){
        console.log(elem[i]);
            if(elem[i].type == 'button' || elem[i].type == 'submit'){
                //
            }else{
                df[elem[i].name] = elem[i].value; 
            }
        }
        console.log(df);
    }

}

var prod = new productos();