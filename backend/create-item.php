<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

try {
    $datas = json_decode(file_get_contents('php://input'), true);
    $open = fopen("data.csv", "a");
    $read = fopen("data.csv", "r");

    $rows = [];
    while (($getdata = fgetcsv($read)) !== FALSE) {
        $rows[] = $getdata;
    }
    fclose($read);
    $last_arr = end($rows);

    if (isset($last_arr[0])) {
        $no_rows = $last_arr[0] + 1;
    }

    $form_data = [
        "id" => $no_rows,
        "name" => $datas['name'],
        "state" => $datas['state'],
        "zip" => $datas['zip'],
        "amount" => $datas['amount'],
        "qty" => $datas['qty'],
        "item" => $datas['item'],
    ];
    fputcsv($open, $form_data);
    fclose($open);

    $status = 1;
    $message = "item stored successfully";
} catch (Exception $e) {
    $status = 0;
    $message = $e->getMessage();
}
$response = [
    "status" => $status,
    "message" => $message,
];
echo json_encode($response);
