<?php

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : "";

if ($contentType === "application/json") {
    $content = trim(file_get_contents("php://input")); //Datos en bruto.
    $decoded = json_decode($content, true);
    $output = null;

    // Diferentes acciones posibles a realizar
    if($decoded["formData"] == "changeStatus") {
        $prev = $decoded["parameters"]["previous"];

        $output = ($prev == "on") ? "off" : "on";
    } elseif ($decoded["formData"] == "getnewdata") {
        $output = '<p>Nuevos datos...</p>';
    }
    else{
        // Error! 
    }

    $result = ["result" => $output];
    echo json_encode($result);
}