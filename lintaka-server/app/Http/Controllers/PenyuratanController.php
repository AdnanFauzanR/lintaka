<?php

namespace App\Http\Controllers;

use App\Models\Penyuratan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class PenyuratanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $penyuratan = [];
        $wilayah = $request->query->get('wilayah');
        if ($wilayah) {
            $penyuratan = Penyuratan::where('wilayah', $wilayah)->get();
        } else {
            $penyuratan = Penyuratan::all();
        }

        $response = [];

        foreach($penyuratan as $item) {
            $urlDokumen = asset('storage/Penyuratan/' . $item->dokumen);
            $response[] = [
                'id' => $item->id,
                'nama' => $item->nama,
                'alamat' => $item->alamat,
                'nomor_hp' => $item->nomor_hp,
                'wilayah' => $item->wilayah,
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
        'nama' => 'required|string|max:50',
        'alamat' => 'required|string|max:50',
        'nomor_hp' => 'required|regex:/^[\d\s\-()+]+$/|max:15',
        'wilayah' => 'required|string|max:50',
        'tujuan' => 'required|string|max:100',
        'isi' => 'string|max:5000',
        'dokumen' => 'required|mimes:pdf,doc,docx,jpg,png,jpeg|max:10240',
    ],[
        'nama.required' => 'Nama harus diisi',
        'nama.max' => 'Nama tidak boleh lebih dari :max karakter',
        'alamat.required' => 'Alamat harus diisi',
        'alamat.max' => 'Alamat tidak boleh lebih dari :max karakter',
        'nomor_hp.required' => 'Nomor Hp harus diisi',
        'nomor_hp.regex' => 'Nomor hp harus angka',
        'nomor_hp.max' => 'Nomor hp tidak boleh lebih dari :max digit',
        'wilayah.required' => 'Wilayah pengaduan harus diisi',
        'wilayah.max' => 'Wilayah tidak boleh lebih dari :max karakter',
        'tujuan.required' => 'Tujuan pengaduan harus diisi',
        'tujuan.max' => 'Tujuan pengaduan tidak boleh lebih dari :max karakter',
        'isi.max' => 'Isi pengaduan tidak boleh lebih dari :max karakter',
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
    $dokumen->storeAs('Penyuratan', $filename, 'public');

    $penyuratan = new Penyuratan($request->all());
    $penyuratan->id = uniqid();
    $penyuratan->dokumen = $filename;
    $penyuratan->save();

    return response()->json([
        'success' => true,
        'message' => 'Surat berhasil ditambahkan'
    ], 201);
}


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $penyuratan = Penyuratan::find($id);

        if ($penyuratan) {
            $urlDokumen = asset('storage/Penyuratan/' . $penyuratan->dokumen);
            $penyuratan->dokumen = $urlDokumen;

            return response()->json([
                'success' => true,
                'penyuratan' => $penyuratan
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
        $penyuratan = Penyuratan::find($id);
        if (!$penyuratan) {
            return response()->json([
                'success' => false,
                'message' => 'Surat tidak ditemukan'
            ], 404);
        }

        Storage::disk('public')->delete($penyuratan->dokumen);
        $penyuratan->delete();

        return response()->json([
            'success' => true,
            'message' => 'Surat berhasil dihapus'
        ]);
    }

    public function download(string $id) {
        $penyuratan = Penyuratan::find($id);

        if(!$penyuratan) {
            return response()->json([
                'success' => false,
                'message' => 'Surat tidak ditemukan'
            ], 404);
        }

        $filePath = storage_path('app/public/Penyuratan/' . $penyuratan->dokumen);

        if(file_exists($filePath)) {
            $cleanFileName = Str::slug($penyuratan->dokumen);
            return response()->download($filePath, $cleanFileName);
        }

        return response()->json([
            'success' => false,
            'message' => 'File tidak ditemukan'
        ], 404);
    }
}
