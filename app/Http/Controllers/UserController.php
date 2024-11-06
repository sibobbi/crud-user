<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request): \Illuminate\Http\JsonResponse
    {
        $users = User::query()->paginate(10);

        return response()->json($users);
    }

    public function show($uuid): \Illuminate\Http\JsonResponse
    {
        $user = User::query()->where('uuid',$uuid)->firstOrFail();

        return response()->json($user);
    }
    public function update(UpdateUserRequest $request, $uuid, UserService $service): \Illuminate\Http\JsonResponse
    {
        return $service->update($request->user(), $request->validated(), $uuid);
    }

    public function destroy(Request $request, $uuid, UserService $service): \Illuminate\Http\JsonResponse
    {
        return $service->destroy($request->user(), $uuid);
    }

    public function restore(Request $request,$uuid, UserService $service): \Illuminate\Http\JsonResponse
    {
        return $service->restore($request->user(),$uuid);
    }

    public function remove(Request $request, $uuid, UserService $service): \Illuminate\Http\JsonResponse
    {
        return $service->destroy($request->user(), $uuid);
    }
}
