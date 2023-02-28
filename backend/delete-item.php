<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
$rows = [];
$reqest_data = json_decode(file_get_contents('php://input'), true);
$open = fopen("data.csv", "r");
while (($getdata = fgetcsv($open)) !== FALSE) {
   $rows[] = $getdata;
}
fclose($open);

$write = fopen("data.csv", "w");
foreach ($rows as $row) {
   if ($row[0] != $reqest_data['id']) {
      fputcsv($write, $row);
   }
}
fclose($write);
$status = 1;
$response = [
   "status" => $status,
   "message" => "Item deleted successfully",
];
echo json_encode($response);
