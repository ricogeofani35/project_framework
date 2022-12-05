<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class LoginController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        //set validation
        $validator = Validator::make($request->all(), [
            'user_email'     => 'required',
            'user_password'  => 'required'
        ]);

        //if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        
        // jika validation false
        if($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // get credential from request
        $credentials = $request->only('user_email', 'user_password');

        // if auth failed
        if(!auth()->guard('api')->attempt($credentials)) {
            return response()->json([
                'success'   => false,
                'message'   => 'Email atau Password Anda Salah',
            ], 401);
        }

        // if auth success
        return response()->json([
            'success'   => true,
            'user'      => auth()->guard('api')->user()
        ], 200);

    }
}
