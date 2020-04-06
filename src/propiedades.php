<?php
// INICIO - DATOS INMOBILIARIA //
$inm = 'MLM';
$apiK = 'UTO7KGFTOXGXOKTUKBIXHQOUO';

$url='http://xintelapi.com.ar/';

$dataSet=$_GET['data'];

if($dataSet === 'destacados') {
    
    $data = array(
        'json' => 'fichas.destacadas',
        'inm' => $inm,
        'apiK' => $apiK,
    );

} elseif ($dataSet === 'propiedad') {
    
    $data=array(
        'json'=>'fichas.propiedades',
        'suc'=> 'MLM',
        'emprendimiento'=>'True',
        'inm' => $inm,
        'apiK' => $apiK,
        'id'=> $_GET['ficha'],
    );

} elseif ($dataSet === 'emprendimientos') {
    
    $data = array(
        'json' => 'resultados.emprendimientos',
        'inm' => $inm,
        'apiK' => $apiK,
    );

} elseif ($dataSet === 'emprendimiento') {

    $data = array(
        'json' => 'ficha.emprendimientos',
        'inm' => $inm,
        'apiK' => $apiK,
        'id'=> $_GET['ficha'],
    );

} elseif ($dataSet === 'barrios') {
    
    $data = array(
        'json' => 'datos.select.buscador',
        'in_bar' => $_GET['in_bar'],
        'inm' =>$inm,
        'apiK' =>$apiK,
    );

} else {
    
    // $barrio = "";
    // $tipoInmueble = "";
    // $ambientes = "";
    // $valorMinimo = "";
    // $valorMaximo = "";
    // $page = "";
    
    $data = array(
        'json' => 'resultados.fichas',
        'inm' => $inm,
        'apiK' => $apiK,
        'tipo_operacion' => urldecode($_GET['tipo_operacion']),
        'rppagina' => '12',
    );

    if(isset($_GET['tipo'])){ $data['tipo_inmueble'] = $_GET['tipo']; }
    if(isset($_GET['barrio'])){ $data['barrios1'] = $_GET['barrio']; }
    if(isset($_GET['ambientes'])){ $data['Ambientes'] = $_GET['ambientes']; }
    // if(isset($_GET['ambientesMax'])){ $data['Ambientes2'] = $_GET['ambientesMax']; }
    if(isset($_GET['min'])){ $data['valor_minimo'] = $_GET['min']; }
    if(isset($_GET['max'])){ $data['valor_maximo'] = $_GET['max']; }
    if(isset($_GET['moneda'])){ $data['moneda'] = urldecode($_GET['moneda']); }
    if(isset($_GET['page'])){ $data['page'] = $_GET['page']; }
}

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_TIMEOUT, 15);
$result = curl_exec($ch);

echo ($result);

curl_close($ch);

?>