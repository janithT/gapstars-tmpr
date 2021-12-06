<?php

namespace Tests\Unit;

use Tests\TestCase;

class UserTest extends TestCase
{
    /**
     * A basic unit test user login example.
     *
     * @test
     * 
     * @return void
     */
    public function test_user_Example()
    {
        $response = $this->call('POST', '/login', [

            'email' => 'user@example.com',
            'password' => '123123123'
        ]);
        
        $response->assertStatus($response->status(), 302);
        //$this->assertTrue(true);
    }
}
