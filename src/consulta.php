<?php

    //Capturando Datos del formulario
    $destino = "malumapropiedades@gmail.com";
    $nombre = $_POST["inputName"];
    $email = $_POST["inputEmail"];
    $subject = $_POST["subject"];
    $telefono = $_POST["inputPhone"];
    $mensaje = $_POST["message"];


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
        "Email: $email \n<br />".
        "Telefono: $telefono \n<br />".
        "Mensaje: $mensaje \n<br />";

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

