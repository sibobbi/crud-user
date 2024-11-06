<?php

namespace App\Enums;

enum LoggerType: string
{
    case UPDATE = 'update';
    case SOFT_DELETE = 'soft_delete';
    case RESTORE = 'restore';
    case REMOVE = 'remove';

    public function getDescription($uuid): string
    {
        $message = match ($this) {
            self::UPDATE => 'Обновление пользователя ',
            self::SOFT_DELETE => 'Мягкое удаление пользователя ',
            self::RESTORE => 'Восстановление пользователя ',
            self::REMOVE => 'Полное удаление пользователя ',
        };

        return $message . $uuid;
    }
}
