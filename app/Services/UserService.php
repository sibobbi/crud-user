<?php

namespace App\Services;

use App\Enums\LoggerType;
use App\Models\User;

class UserService
{
    public function update(User $authUser, array $updateData, $uuid): \Illuminate\Http\JsonResponse
    {
        $user = User::query()->where('uuid',$uuid)->firstOrFail();

        $user->update($updateData);

        $authUser->addHistory(LoggerType::UPDATE, $uuid);

        return response()->json($user);
    }
    public function destroy(User $authUser, $uuid): \Illuminate\Http\JsonResponse
    {
        $deleteUser = User::query()->where('uuid',$uuid)->firstOrFail();

        $deleteUser->delete();

        $authUser->addHistory(LoggerType::SOFT_DELETE, $uuid);

        return response()->json(['message' => 'Пользователь мягко удален']);
    }

    public function restore(User $authUser, $uuid): \Illuminate\Http\JsonResponse
    {
        $user = User::query()->withTrashed()->where('uuid',$uuid)->firstOrFail();

        $user->restore();

        $authUser->addHistory(LoggerType::RESTORE, $uuid);

        return response()->json(['message' => 'Пользователь восстановлен']);
    }

    public function remove(User $authUser, $uuid): \Illuminate\Http\JsonResponse
    {
        $removeUser = User::query()->withTrashed()->where('uuid',$uuid)->firstOrFail();

        $authUser->forceDelete();

        $authUser->addHistory(LoggerType::REMOVE, $uuid);

        return response()->json(['message' => 'Пользователь удален навсегда']);
    }

}
