<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public function register(Request $request)
{
    $validator = Validator::make($request->all(), [
        'nama' => 'required|max:50',
        'username' => 'required|max:50|unique:users',
        'wilayah' => 'required|max:50',
        'password' => 'required|confirmed|min:8'
    ],[
        'nama.required' => 'Nama harus diisi',
        'nama.max' => 'Nama tidak boleh lebih dari :max karakter',
        'username.required' => 'Username harus diisi',
        'username.max' => 'Username tidak boleh lebih dari :max karakter',
        'username.unique' => 'Username sudah ada',
        'wilayah.required' => 'Wilayah harus diisi',
        'wilayah.max' => 'Wilayah tidak boleh lebih dari :max karakter',
        'password.required' => 'Password harus diisi',
        'password.confirmed' => 'Masukkan ulang password dengan benar',
        'password.min' => 'Password tidak boleh kurang dari :min karakter'
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    if($request->wilayah === 'Somba Opu') {
        $role = Role::where('role', 'kecamatan')->select('id')->get();
    } else {
        $role = Role::where('role', 'kelurahan')->select('id')->get();
    }

    $user = User::create([
        'nama' => $request->nama,
        'role_id' => $role[0]->id,
        'username' => $request->username,
        'wilayah' => $request->wilayah,
        'password' => Hash::make($request->password)
    ]);

    if ($user) {
        return response()->json([
            'success' => true,
            'message' => 'Admin berhasil ditambahkan',
            'role' => $role
        ], 201);
    }

    return response()->json([
        'success' => false,
        'message' => 'Gagal menambahkan admin'
    ]);
}

public function login(Request $request)
{
    $validator = Validator::make($request->all(), [
        'username' => 'required',
        'password' => 'required|min:8'
    ],[
        'username.required' => 'Username harus diisi',
        'password.required' => 'Password harus diisi',
        'password.min' => 'Password tidak boleh kurang dari :min karakter'
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    $credentials = $request->only(['username', 'password']);

    if (!$token = JWTAuth::attempt($credentials)) {
        return response()->json([
            'success' => false,
            'message' => 'Username atau Password Anda salah'
        ], 404);
    }

    $user = User::where('username', $request->username)->with('role')->firstOrFail();
        $role = $user->role->role;

    return response()->json([
        'success' => true,
        'message' => 'User ' . $request->username . ' sedang login',
        'token' => $token,
        'wilayah' => $user->wilayah,
        'role' => $role
    ]);
}

public function logout(Request $request)
{
    JWTAuth::invalidate(JWTAuth::getToken());

    return response()->json([
        'success' => true,
        'message' => 'User telah logout'
    ], 200);
}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        $response = [];

        foreach($users as $user) {
            $response[] = [
                'id' => $user->id,
                'nama' => $user->nama,
                'username' => $user->username,
                'wilayah' => $user->wilayah,
            ];
        }

        return response()->json($response);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::find($id);
        if($user) {
            return response()->json([
                'success' => true,
                'admin' => [
                    'id' => $user->id,
                    'nama' => $user->nama,
                    'username' => $user->username,
                    'wilayah' => $user->wilayah,
                    'password' => $user->password
                ]
            ], 201);
        }

        return response()->json([
            'success' => false,
            'message' => 'Admin tidak ditemukan'
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'max:50',
            'username' => 'max:50|unique:users',
            'wilayah' => 'max:50',
            'password' => 'required|confirmed|min:8'
        ],[
            'nama.max' => 'Nama tidak boleh lebih dari :max karakter',
            'username.max' => 'Username tidak boleh lebih dari :max karakter',
            'username.unique' => 'Username sudah ada',
            'wilayah.max' => 'Wilayah tidak boleh lebih dari :max karakter',
            'password.required' => 'Password harus diisi',
            'password.confirmed' => 'Masukkan ulang password dengan benar',
            'password.min' => 'Password tidak boleh kurang dari :min karakter'
        ]);

        if($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::find($id);

        if(!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Admin tidak ditemukan'
            ], 404);
        }

        if($request->wilayah === 'Somba Opu') {
            $role = Role::where('role', 'kecamatan')->select('id')->get();
        } else {
            $role = Role::where('role', 'kelurahan')->select('id')->get();
        }

        $user->nama = $request->nama;
        $user->role_id = $role[0]->id;
        $user->wilayah = $request->wilayah;
        $user->username = $request->username;
        $user->password = Hash::make($request->password);

        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Admin berhasil diubah'
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Admin tidak ditemukan'
            ], 404);
        }

        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'Admin berhasil dihapus'
        ]);
    }
}
