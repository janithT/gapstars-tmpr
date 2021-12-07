<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\User::create([
            'name' => 'user test',
            'email' => 'user@example.com',
            'phone' => '0912222222',
            'password' => bcrypt('123123'),
            'active' => 1
            
        ]);
    }
}
