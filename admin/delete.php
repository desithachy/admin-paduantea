<?php
include "koneksi.php";

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['ids'], $data['table'], $data['idField']) 
    && count($data['ids']) > 0) {
    
    $table = mysqli_real_escape_string($conn, $data['table']);
    $idField = mysqli_real_escape_string($conn, $data['idField']);
    
    // pastikan hanya huruf/angka/underscore agar aman
    if (!preg_match('/^[a-zA-Z0-9_]+$/', $table) || !preg_match('/^[a-zA-Z0-9_]+$/', $idField)) {
        echo json_encode(["success" => false, "error" => "Invalid input"]);
        exit;
    }

    $ids = array_map('intval', $data['ids']);
    $idString = implode(",", $ids);

    $query = "DELETE FROM $table WHERE $idField IN ($idString)";
    if (mysqli_query($conn, $query)) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => mysqli_error($conn)]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Invalid data"]);
}
?>
