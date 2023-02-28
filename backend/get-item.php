<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
$rows = [];
$data = [];
$reqest_data = json_decode(file_get_contents('php://input'), true);
if (($open = fopen("data.csv", "r")) !== FALSE) {
   while (($getdata = fgetcsv($open)) !== FALSE) {
      $rows[] = $getdata;
   }
}
fclose($open);
$headers = array_shift($rows);
foreach ($rows as $row) {
   if ($row[0] == $reqest_data['id']) {
      $data = array_combine($headers, $row);
   }
}

$status = 1;
$response = [
   "status" => $status,
   "message" => "Get item data successfully",
   "data" => $data,
];
echo json_encode($response);
