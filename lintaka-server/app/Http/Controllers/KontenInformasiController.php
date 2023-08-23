<?php

namespace App\Http\Controllers;

use App\Models\KontenInformasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class KontenInformasiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $req_wilayah = $request->query->get('wilayah');
        $response = [];
        if($req_wilayah) {
            $konten_informasi = KontenInformasi::with('user')->orderBy('updated_at', 'desc')->get();
            foreach($konten_informasi as $item) {
                $urlFoto = asset('storage/Konten Informasi/' . $item->foto);
                // $item->foto = $urlFoto;
                $wilayah = $item->user->wilayah;
                if($wilayah === $req_wilayah) {
                    $response[] = [
                        'id' => $item->id,
                        'judul' => $item->judul,
                        'isi' => $item->isi,
                        'foto' => $urlFoto,
                        'created_at' => $item->created_at,
                        'updated_at' => $item->updated_at
                    ];
                }
            }
        } else {
            $konten_informasi = KontenInformasi::with('user')->orderBy('updated_at', 'desc')->get();
            foreach($konten_informasi as $item) {
                $urlFoto = asset('storage/Konten Informasi/' . $item->foto);
                // $item->foto = $urlFoto;
                $wilayah = $item->user->wilayah;
                $response[] = [
                    'id' => $item->id,
                    'judul' => $item->judul,
                    'isi' => $item->isi,
                    'foto' => $urlFoto,
                    'wilayah' => $wilayah,
                    'created_at' => $item->created_at,
                    'updated_at' => $item->updated_at
                ];
            }
        }

        return response()->json($response, 200);
    }


public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'judul' => 'required|string',
        'isi' => 'required|string|max:50000',
        'foto' => 'required|mimes:jpg,png,jpeg,heic|max:10240'
    ],[
        'judul.required' => 'Judul berita harus diisi',
        'foto.required' => 'Foto berita tidak boleh kosong',
        'foto.mimes' => 'Foto harus dengan format :mimes',
        'foto.max' => 'Foto tidak boleh lebih dari :max',
        'isi.required' => 'Isi berita tidak boleh kosong',
        'isi.max' => 'Isi berita tidak boleh lebih dari :max karakter'
    ]);

    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'errors' => $validator->errors()
        ], 422);
    }

    // Validation passed, continue with file upload and saving the data

    $foto = $request->file('foto');
    $filename = $foto->getClientOriginalName();
    $foto->storeAs('Konten Informasi', $filename, 'public');

    $user = JWTAuth::parseToken()->authenticate();

    $konten_informasi = new KontenInformasi($request->except('foto'));
    $konten_informasi->id = uniqid();
    $konten_informasi->user_id = $user->id;
    $konten_informasi->foto = $filename; // Set the filename directly
    $konten_informasi->save();

    return response()->json([
        'success' => true,
        'message' => 'Konten Informasi berhasil ditambahkan'
    ], 201);
}


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $konten_informasi = KontenInformasi::with('user')->find($id);

        if($konten_informasi) {
            $urlFoto = asset('storage/Konten Informasi/' . $konten_informasi->foto);
            $konten_informasi->foto = $urlFoto;
            return response()->json([
                'success' => true,
                'konten_informasi' => $konten_informasi
            ], 201);
        }

        return response()->json([
            'success' => false,
            'message' => 'Konten Informasi tidak ditemukan'
        ], 404);
    }

    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'judul' => 'string',
            'isi' => 'string|max:50000',
            'foto' => 'required|mimes:jpg,png|max:10240'
        ],[
            'foto.required' => 'Foto berita tidak boleh kosong',
            'foto.mimes' => 'Foto harus dengan format :mimes',
            'foto.max' => 'Foto tidak boleh lebih dari :max',
            'isi.max' => 'Isi berita tidak boleh lebih dari :max karakter'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $konten_informasi = KontenInformasi::find($id);

        if (!$konten_informasi) {
            return response()->json([
                'success' => false,
                'message' => 'Konten informasi tidak ditemukan'
            ], 404);
        }

        // Update the data based on the validated input
        $user = JWTAuth::parseToken()->authenticate();

        $konten_informasi->judul = $request->input('judul');
        $konten_informasi->isi = $request->input('isi');
        $konten_informasi->user_id = $user->id;

        $foto = $request->file('foto');
        $fotoPath = $foto->getClientOriginalName();
        $foto->storeAs('Konten Informasi', $fotoPath, 'public');

        // Delete the old photo
        if ($konten_informasi->foto) {
            Storage::disk('public')->delete('Konten Informasi/' . $konten_informasi->foto);
        }

        // Update the foto attribute with the new filename
        $konten_informasi->foto = $fotoPath;

        $konten_informasi->save();

        return response()->json([
            'success' => true,
            'message' => 'Konten Informasi berhasil diperbarui',
        ], 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $konten_informasi = KontenInformasi::find($id);
        if(!$konten_informasi) {
            return response()->json([
                'success' => false,
                'message' => 'Konten Informasi tidak ditemukan'
            ], 404);
        }

        Storage::disk('public')->delete($konten_informasi->foto);

        $konten_informasi->delete();

        return response()->json([
            'success' => true,
            'message' => 'Konten Informasi berhasil dihapus'
        ], 200);
    }
}
