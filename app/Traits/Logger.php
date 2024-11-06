<?php

namespace App\Traits;

use App\Enums\LoggerType;
use App\Models\History;

trait Logger
{
    public function addHistory(LoggerType $loggerType, $uuid)
    {
        $newHistory = new History([
            'event' => $loggerType->value,
            'description' => $loggerType->getDescription($uuid)
        ]);

        $this->histories()->save($newHistory);

    }

}
