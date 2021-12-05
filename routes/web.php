<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

 Route::get('/', function () {
    return view('auth/login');
}); 

Auth::routes(); 

Route::group(["middleware" =>"web"], function(){

    Route::get('api/documentation', '\L5Swagger\Http\Controllers\SwaggerController@api')->name('l5swagger.api');
    
Route::group(["middleware" =>"gapstars-auth"], function(){
        /* Route::get('/', 'HomeController@index')->name('home'); */
        Route::get('/home', 'HomeController@index')->name('home');
        
        // Auth user routes
        Route::prefix('/user')->group(function () {
            Route::get('', 'CurrentUserController@show');
            Route::patch('', 'CurrentUserController@update');
            Route::patch('/update', 'CurrentUserController@updateuser');
            Route::patch('/password', 'CurrentUserController@updatePassword');
        });

        //Only admin routes 
        Route::group(["middleware" => "admin"], function(){

            // admin users routes
            Route::get('/allusers', 'AllUsersController@index');
            Route::get('user/{user}', 'AllUsersController@show');
            Route::patch('user/{user}', 'AllUsersController@update');
            Route::delete('clients/{user}/destroy', 'AllUsersController@destroy');

            //admin csv data routes
            
            Route::get('/users_csv_data', 'UsersCSVDataController@csvData');

         });
});
});

