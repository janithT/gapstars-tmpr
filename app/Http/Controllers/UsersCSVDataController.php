<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Collection;
use Carbon\Carbon;
use App\Repositories\CsvDataRepoInterface;


class UsersCSVDataController extends Controller
{
    private $csvDataRepository;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(CsvDataRepoInterface $csvDataRepository)
    {
        $this->middleware('auth');
        $this->csvDataRepository = $csvDataRepository;
    }

    /**
     *
     * @return \Illuminate\Http\JsonResponse
     * 
     * load all the users data from csv and return to home
     */

    public function csvData()
    {
        //get and read csv file if exist from repository
        $csvData = $this->csvDataRepository->all();
        
        if(!$csvData->getData()->status){
            return response()->json([
                'status' => false,
                'error' => $csvData->getData()->error,
            ],500);
        }else{
            $csvData=$csvData->getData()->data;
            $total_user_percentages = $this->calculateChartValues($csvData, count($csvData));
            //return json data
            return response()->json([
                'status' => true,
                'totalUserPercentages' => $total_user_percentages ? $total_user_percentages : false,
                'total_users' => count($csvData),
            ]);
        }
 
    }


    /**
         * 
         *  Calculate users data from csv and return to home
         *  filter it from first week - remaining
    */
    protected function calculateChartValues($val, $total){

        // If parameters not exists
        if(!$val && !$total){
            return false;
        }
        else{
            //initialize array and variables
            $totalCSVArray = [];
            $weekly_array = [];
            $collection = collect($val);

            $date_start = $collection->sortBy('created_at')->pluck('created_at')->first();
            $date_end = $collection->sortBy('created_at')->pluck('created_at')->last();
            $date = Carbon::parse($date_start);

            while($date <= Carbon::parse($date_end)){
                
                $weekly_data= $collection->whereBetween('created_at', [$date->toDateString(),$date->addDays(6)->toDateString()]);

                 for($precentages=0;  $precentages <= 100; $precentages+=10 ){  
                    $weekly_precentages = $weekly_data->where('onboarding_perentage', '!=', '')
                    ->WhereNotNull('onboarding_perentage')->where('onboarding_perentage', '>=', $precentages);

                    $totalcounts = ( count($weekly_precentages) / $total ) * 100;
                    array_push($weekly_array, $totalcounts);
                }
                //push weekly array to chart data
                array_push($totalCSVArray, $weekly_array);
                $weekly_array=[];
                $date = $date->addDays(1);
                              
            }

            return $totalCSVArray;
        }
       

    }
}
