<?php
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

$jsondata = array();
/*echo '->';
print_r($_GET);
echo '<-';*/
if( isset($_GET['parametro1']) ) {

    if( $_GET['parametro1'] == 'valor1' ) {

        $jsondata['success'] = true;
        $jsondata['message'] = 'Hola! El valor recibido es correcto.';

    } else {

        $jsondata['success'] = false;
        $jsondata['message'] = 'Hola! El valor recibido no es correcto.';

    }

    //Aunque el content-type no sea un problema en la mayoría de casos, es recomendable especificarlo
    header('Content-type: application/json; charset=utf-8');
    echo json_encode($jsondata);
    exit();

}

/*
$sql="SELECT * FROM inventario";
$result = mysqli_query($conn,$sql);

mysqli_close($conn);

*/









?>