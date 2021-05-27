<?php


    //print_r($_POST);
    if(!empty($_POST)){
        $data = $_POST["codigo"];
        //print_r($data);
        $info = $_POST;
        switch ($data) {
            case 1: 
                $res = obtener_inventario($data);
                break;
            case 2: 
                $res = crear_producto($info);
                break;
            default:
            
            break;
        }
        echo json_encode($res);
    } else {
        echo 'coja oficio no envio bien la data';
    }
    
    function conect (){
        $servername = "localhost";
        $database = "jared";
        $username = "root";
        $password = "";
        // Create connection
        $conn = mysqli_connect($servername, $username, $password, $database);
        // Check connection
        if (!$conn) {
            die("Connection failed: " . mysqli_connect_error());
        }
        return $conn;
    }

    function obtener_inventario($data) {
        $sql = 'SELECT * FROM inventario';
        $response = conect()->query($sql);
        //var_dump($response->fetch_row());
        //var_dump(mysqli_fetch_row($response));
        $res = array();
        while($fila = $response->fetch_assoc()) {
            $res[] = $fila;
        }
        return $res;
    }

    function crear_producto($data){
        $info = $data['info'];
        $conn = conect();
        $sql = 'INSERT INTO inventario(`id`, `nombre_producto`, `fragancia`, `color`, `tamano`, `cantidad`) VALUES (0,\''.$info['nobre_producto'].'\',\''.$info['fragancia'].'\',\''.$info['color'].'\',\''.$info['tamano'].'\',\''.$info['cantidad'].'\')';
        
        $response = mysqli_query($conn, $sql);
        
        if($response == 1){
            return true;
        } else {
            return false;
        }
        

    
    }
    


?>