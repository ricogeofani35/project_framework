<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index()
    {
        $user = User::latest()->paginate(10);

        return new UserResource(true, 'List Data Users', $user);
    }

    public function show(User $user)
    {
        return new UserResource(true, 'Detail Data Users', $user);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_username'        => 'required|unique:users',
            'password'        => 'required|min:6|confirmed',
            'user_name'        => 'required',
            'user_email'        => 'required|unique:users|email',
            'user_alamat'        => 'required',
            'user_notelp'        => 'required',
            'user_level'        => 'required',
        ]);

        if($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'user_username'        => $request->user_username,
            'user_password'        => bcrypt($request->user_password),
            'user_name'        => $request->user_name,
            'user_email'        => $request->user_email,
            'user_alamat'        => $request->user_alamat,
            'user_notelp'        => $request->user_notelp,
            'user_level'        => $request->user_level,
        ]);

        return new userResource(true, 'create user Date Successfully', $user);
    }

    public function update(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'user_username'        => 'required',
            'password'        => 'required|min:6|confirmed',
            'user_name'        => 'required',
            'user_email'        => 'required|email',
            'user_alamat'        => 'required',
            'user_notelp'        => 'required',
            'user_level'        => 'required',
        ]);

        if($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user->update([
            'user_username'        => $request->user_username,
            'user_password'        => bcrypt($request->user_password),
            'user_name'        => $request->user_name,
            'user_email'        => $request->user_email,
            'user_alamat'        => $request->user_alamat,
            'user_notelp'        => $request->user_notelp,
            'user_level'        => $request->user_level,
        ]);

        return new UserResource(true, 'Update User Date Successfully', $user);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return new UserResource(true, 'Delete User Date Successfully', null);
    }
}
