<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

try {
   $rows = [];
   $reqest_data = json_decode(file_get_contents('php://input'), true);
   $open = fopen("data.csv", "r");
   while (($getdata = fgetcsv($open)) !== FALSE) {
      $rows[] = $getdata;
   }
   fclose($open);

   $write = fopen("data.csv", "w");
   foreach ($rows as $row) {
      if ($row[0] == $reqest_data['id']) {
         $row[1] = $reqest_data['name'];
         $row[2] = $reqest_data['state'];
         $row[3] = $reqest_data['zip'];
         $row[4] = $reqest_data['amount'];
         $row[5] = $reqest_data['qty'];
         $row[6] = $reqest_data['item'];
      }
      fputcsv($write, $row);
   }
   fclose($write);
   $status = 1;
} catch (Exception $e) {
   $status = 0;
   $message = $e->getMessage();
}
$response = [
   "status" => $status,
   "message" => "Item updated successfully",
];
echo json_encode($response);
