<?php

    //Capturando Datos del formulario
    $destino = "malumapropiedades@gmail.com";
    $nombre = $_POST["nombre"];
    $telefono = $_POST["telefono"];
    $email = $_POST["email"];
    $propiedad = $_POST["propiedademail"];
    $horaMin = $_POST["hora-min"];
    $horaMax = $_POST["hora-Max"];
    $diaVisita = $_POST["dia-visita"];
    $horaVisita = $_POST["hora-visita"];
    $subject = $_POST["asunto"];
    $mensaje = $_POST["mensaje"];

    require("archivosformulario/class.phpmailer.php");
    $mail = new PHPMailer();

    $mail->Username = $email;
    $mail->FromName = $nombre;
    $mail->AddAddress("malumapropiedades@gmail.com"); // Dirección a la que llegaran los mensajes.
   
// Aquí van los datos que apareceran en el correo que reciba
    //adjuntamos un archivo

    $mail->WordWrap = 50;
    $mail->IsHTML(true);
    $mail->Subject  =  $subject;
    $mail->Body     =  "Nombre: $nombre \n<br />".
        "Telefono: $telefono \n<br />".
        "Email: $email \n<br />".
        "Propiedad: $propiedad \n<br />".
        "Horario de llamada: desde $horaMin hasta $horaMax \n<br />".
        "Dia de visita: $diaVisita \n<br />".
        "Hora de visita: $horaVisita \n<br />".
        "Mensaje: $mensaje \n<br />";
    $mail->AddAttachment($archivo['tmp_name'], $archivo['name']);

    // Datos del servidor SMTP Totalmente necesarios para la salida del correo

    $mail->IsSMTP();
    $mail->Host = "mail.maluma.com.ar";  // Servidor de Salida.
    $mail->SMTPAuth = true;
    $mail->Username = "no-reply@maluma.com.ar";  // Correo Electrónico
    $mail->Password = "M@luma2020"; // Contraseña



    if ($mail->Send())
        echo "<script>alert('Formulario enviado exitosamente, le responderemos lo más pronto posible.');location.href ='javascript:history.back()';document.getElementById('contacto').reset();</script>";
    else
        echo "<script>alert('Error al enviar el formulario');</script>";