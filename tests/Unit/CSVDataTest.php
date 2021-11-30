<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use App\Http\controllers\UsersCSVDataController;
use Illuminate\Contracts\Routing\ResponseFactory;
use App\User;

class CSVDataTest extends TestCase
{
    
    /**
     * A basic unit test example.
     *
     * 
     * @test
     */
    public function only_login_user_access()
    {
       
        $response = $this->get('/user')->asserRedirect('/login');
        //$this->assertTrue(true);
    }
}
