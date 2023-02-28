<?php 
   header("Access-Control-Allow-Origin: *");
   header('Content-Type: application/json');
   $rows = [];
   if (($open = fopen("data.csv", "r")) !== FALSE) 
   {
      while (($getdata = fgetcsv($open)) !== FALSE) 
      {        
         $rows[] = $getdata; 
      }
      fclose($open);
   }
   $headers = array_shift($rows);
   $data = [];
   foreach ($rows as $row) {
       $data[] = array_combine($headers, $row);
   }
   $status = 1;
   $response = [
    "status"=>$status,
    "message"=>"Get item data successfully",
    "data"=>$data,
   ];
   echo json_encode($response);
