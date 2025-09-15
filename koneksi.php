<?php
    $local = "localhost";
    $username = "root";
    $password = "";
    $db = "paduantea";

    $conn = new mysqli ($local, $username, $password, $db);

    if ($conn->connect_errno){
        echo 'gagal melakukan koneksi ke database : '.$conn->connect_errno;
    }else{
       // echo 'Koneksi berhasil';
    }
?>