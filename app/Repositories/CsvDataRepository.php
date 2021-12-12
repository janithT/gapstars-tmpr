<?php

namespace App\Repositories;


Class CsvDataRepository implements CsvDataRepoInterface{

    function all(){

        try{
            if (!($csv_file = fopen('/Users/janiththenuwara/Downloads/export.csv', 'r'))) {
                return false;
            }
        }catch(\Exception $e){
            return Response()->json([
                "error" => $e->getMessage(),
                "status" => false
            ],500);
            
        }
        
        //read csv headers
        $key = fgetcsv($csv_file,"1024",";");
        
        // parse csv rows into array
        $csv_to_json = array();
            while ($row = fgetcsv($csv_file,"1024",";")) {
            $csv_to_json[] = array_combine($key, $row);
        }

        // release file handle
        fclose($csv_file);

        //return $csv_to_json;
        return Response()->json([
            "data" => $csv_to_json,
            "status" => true
        ]);

    }
}