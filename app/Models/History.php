<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class History extends Model
{

    protected $fillable = ['event','description'];
    public function loggerable(): \Illuminate\Database\Eloquent\Relations\MorphTo
    {
        return $this->morphTo();
    }
}
