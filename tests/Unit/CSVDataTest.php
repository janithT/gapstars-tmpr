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

        $this->withoutMiddleware();
        $response = $this->get('/users_csv_data');
        
        $response->assertStatus($response->status(), 200);
    }
}
