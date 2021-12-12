<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\CsvDataRepository;
use App\Repositories\CsvDataRepoInterface;

class RepositoriesServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
      
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->bind(CsvDataRepoInterface::class, CsvDataRepository::class);
    }
}
