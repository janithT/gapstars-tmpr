<?php

namespace Tests\Unit;

use Tests\TestCase;

class CSVDataTest extends TestCase
{

    /**
     * A basic unit on sample csv data
     *
     * @return void
     */
    public function test_csv_Example()
    {

      //  $this->withoutMiddleware();
        $response = $this->get('/users_csv_data');
        $response->assertStatus($response->status(), 200);
    }

    /**
     * A basic unit on sample csv data
     *
     * @return void
     */
    public function test_csv_data_content_Example()
    {

        $this->withoutMiddleware();
        
        $response = $this->get('/users_csv_data')->getContent();

        if($response && json_decode($response)->status){
            $this->assertTrue(true);
        }else{
            $this->assertTrue(false);
        }

    }

    /**
     * A basic unit on sample csv data
     *
     * @return void
     */
    public function test_csv_data_content_totalusers_Example()
    {

        $this->withoutMiddleware();
        
        
        $response = $this->get('/users_csv_data')->getContent();

        if($response && json_decode($response)->total_users >= 0){
            $this->assertTrue(true);
        }else{
            $this->assertTrue(false);
        }

    }

        /**
     * A basic unit on sample csv data
     *
     * @return void
     */
    public function test_csv_data_content_array_Example()
    {

        $this->withoutMiddleware();
        
        $response = $this->get('/users_csv_data')->getContent();

        if(is_array(json_decode($response)->totalUserPercentages) or (json_decode($response)->totalUserPercentages instanceof Traversable)){
            $this->assertTrue(true);
        }else{
            $this->assertTrue(false);
        }

    }
}
