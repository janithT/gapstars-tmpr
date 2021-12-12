<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CSVData extends Model
{

    public function format($res){

        return [
            'message' => $res->error,
            'status' => $res->status
        ];
    }
}
