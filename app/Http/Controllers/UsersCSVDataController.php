<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Collection;
use Carbon\Carbon;

class UsersCSVDataController extends Controller
{
    
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     *
     * @return \Illuminate\Http\JsonResponse
     * 
     * load all the users data from csv and return to home
     */

    public function csvData()
    {
        //get and read csv file if exist

        try{
            if (!($csv_file = fopen('/Users/janiththenuwara/Downloads/export.csv', 'r'))) {
                return;
            }
        }catch(\Exception $e){

            return Response()->json([
                "error" => $e->getMessage(),
                "status" => "faild"
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

        $total_user_percentages = $this->calculateChartValues($csv_to_json, count($csv_to_json));

        //return json data
        return response()->json([
            'status' => true,
            'totalUserPercentages' => $total_user_percentages,
            'total_users' => count($csv_to_json),
            'data' => $csv_to_json
        ]);

    }


    /**
         * 
         *  Calculate users data from csv and return to home
         *  filter it from first week - remaining
    */
    protected function calculateChartValues($val, $total){

         
        if($val && $total){

            $totalCSVArray = [];
            $totalCSVArraysec = [];
            $collection = collect($val);

            $timestart = $collection->sortBy('created_at')->pluck('created_at')->first();
            $timeend = $collection->sortBy('created_at')->pluck('created_at')->last();
            $date = Carbon::parse($timestart);

            while($date <= Carbon::parse($timeend)){
                
                $filtered= $collection->whereBetween('created_at', [$date->toDateString(),$date->addDays(6)->toDateString()]);

                 for($precentages=0;  $precentages <= 100; $precentages+=10 ){  
                    $filtered = $filtered
                    ->where('onboarding_perentage', '!=', '')
                    ->WhereNotNull('onboarding_perentage')
                    ->where('onboarding_perentage', '>=', $precentages);

                    $totalcounts = ( count($filtered) / $total ) * 100;
                    
                    array_push($totalCSVArraysec, $totalcounts);
                }
                array_push($totalCSVArray, $totalCSVArraysec);
                $totalCSVArraysec=[];
                $date = $date->addDays(1);
                              
            }

            return $totalCSVArray;

        }//end if
        else{
            return false;
        }
       

    }
}
