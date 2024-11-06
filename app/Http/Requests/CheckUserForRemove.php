<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CheckUserForRemove extends FormRequest
{

    public function rules():array
    {
        if ($this->user()->uuid === $this->route('user')) {
            throw new \Exception('Нельзя удалять свою учетную запись');
        }

        return  [];
    }
}
