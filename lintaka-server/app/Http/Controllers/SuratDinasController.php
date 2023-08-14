<?php

namespace App\Http\Controllers;

use App\Models\SuratDinas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;

class SuratDinasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $surat_dinas = [];
        $wilayah = $request->query->get('wilayah');
        if($wilayah) {
            $surat_dinas = SuratDinas::where('tujuan', $wilayah)
                            ->orWhere('tujuan', 'Semua Kelurahan')
                            ->get();
        } else {
            $surat_dinas = SuratDinas::all();
        }

        $response = [];

        foreach($surat_dinas as $item) {
            $urlDokumen = asset('storage/Penyuratan/' . $item->dokumen);
            $response[] = [
                'id' => $item->id,
                'judul' => $item->judul,
                'tujuan' => $item->tujuan,
                'isi' => $item->isi,
                'dokumen' => $urlDokumen,
                'created_at' => $item->created_at,
                'updated_at' => $item->updated_at
            ];
        }

        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'judul' => 'required|string',
        'tujuan' => 'required|string|max:50',
        'isi' => 'required|string|max:5000',
        'dokumen' => 'required|mimes:pdf,doc,docx,jpg,jpeg,png|max:10240'
    ], [
        'judul.required' => 'Judul surat harus diisi',
        'tujuan.required' => 'Tujuan surat harus diisi',
        'tujuan.max' => 'Tujuan surat tidak boleh lebih dari :max karakter',
        'isi.required' => 'Isi surat tidak boleh kosong',
        'isi.max' => 'Isi surat tidak boleh lebih dari :max karakter',
        'dokumen.required' => 'Dokumen surat tidak boleh kosong',
        'dokumen.mimes' => 'Dokumen surat harus dengan format :mimes',
        'dokumen.max' => 'Dokumen surat tidak boleh lebih dari :max'
    ]);

    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'errors' => $validator->errors()
        ], 400);
    }

    $dokumen = $request->file('dokumen');
    $filename = $dokumen->getClientOriginalName();
    $dokumen->storeAs('Surat Dinas', $filename, 'public');

    $user = JWTAuth::parseToken()->authenticate();

    $surat_dinas = new SuratDinas($request->all());
    $surat_dinas->id = uniqid();
    $surat_dinas->user_id = $user->id;
    $surat_dinas->dokumen = $filename;
    $surat_dinas->save();

    return response()->json([
        'success' => true,
        'message' => 'Surat berhasil ditambahkan'
    ]);
}


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $surat_dinas = SuratDinas::find($id);

        if($surat_dinas) {
            $urlDokumen = asset('storage/Surat Dinas/' . $surat_dinas->dokumen);
            $surat_dinas->dokumen = $urlDokumen;

            return response()->json([
                'success' => true,
                'surat_dinas' => $surat_dinas
            ], 201);

        }
        return response()->json([
            'success' => false,
            'message' => 'Surat tidak ditemukan'
        ], 404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $surat_dinas = SuratDinas::find($id);
        if(!$surat_dinas) {
            return response()->json([
                'success' => false,
                'message' => 'Surat tidak ditemukan'
            ], 404);
        }

        Storage::disk('public')->delete($surat_dinas->dokumen);
        $surat_dinas->delete();

        return response()->json([
            'success' => true,
            'message' => 'Surat berhasil dihapus'
        ]);
    }

    public function download(string $id) {
        $surat_dinas = SuratDinas::find($id);

        if(!$surat_dinas) {
            return response()->json([
                'success' => false,
                'message' => 'Surat tidak ditemukan'
            ], 404);
        }

        $file_path = storage_path('app/public/Surat Dinas/' . $surat_dinas->dokumen);

        if(file_exists($file_path)) {
            $cleanFileName = Str::slug($surat_dinas->dokumen);
            return response()->download($file_path, $cleanFileName);
        }

        return response()->json([
            'success' => false,
            'message' => 'File tidak ditemukan'
        ], 404);
    }
}
