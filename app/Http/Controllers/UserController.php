<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckUserForRemove;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request): \Illuminate\Http\JsonResponse
    {


        $sortField = $request->get('sortField', 'created_at');
        $sortOrder = $request->get('sortOrder', 'asc');


        $validSortFields = ['name', 'last_name', 'created_at'];
        $validSortOrders = ['asc', 'desc'];


        if (!in_array($sortField, $validSortFields)) {
            return response()->json(['error' => 'Invalid sort field'], 400);
        }

        if (!in_array($sortOrder, $validSortOrders)) {
            return response()->json(['error' => 'Invalid sort order'], 400);
        }


        $users = User::query()
            ->orderBy($sortField, $sortOrder)
            ->paginate(10);


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

    public function destroy(CheckUserForRemove $request, $uuid, UserService $service): \Illuminate\Http\JsonResponse
    {
        return $service->destroy($request->user(), $uuid);
    }

    public function restore(Request $request,$uuid, UserService $service): \Illuminate\Http\JsonResponse
    {
        return $service->restore($request->user(),$uuid);
    }

    public function remove(CheckUserForRemove $request, $uuid, UserService $service): \Illuminate\Http\JsonResponse
    {
        return $service->destroy($request->user(), $uuid);
    }
}
