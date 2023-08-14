<?php

namespace App\Http\Controllers;

use App\Models\Pengaduan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class PengaduanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $pengaduan = [];
        $wilayah = $request->query->get('wilayah');
        if ($wilayah) {
            $pengaduan = Pengaduan::where('wilayah', $wilayah)->orderBy('created_at', 'desc')->get();
        } else {
            $pengaduan = Pengaduan::orderBy('created_at', 'desc')->get();
        }

        $response = [];

        foreach($pengaduan as $item) {
            $urlFoto = asset('storage/Pengaduan/' . $item->bukti);

            $response[] = [
                'id' => $item->id,
                'nama' => $item->nama,
                'alamat' => $item->alamat,
                'nomor_hp' => $item->nomor_hp,
                'wilayah' => $item->wilayah,
                'tujuan' => $item->tujuan,
                'jenis' => $item->jenis,
                'isi' => $item->isi,
                'bukti' => $urlFoto,
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
        'jenis' => 'required|string',
        'isi' => 'string|max:5000',
        'bukti' => 'required|mimes:pdf,doc,docx,jpg,png,jpeg|max:10240',
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
        'jenis.required' => 'Jenis pengaduan harus diisi',
        'isi.max' => 'Isi pengaduan tidak boleh lebih dari :max karakter',
        'bukti.required' => 'Bukti pengaduan tidak boleh kosong',
        'bukti.mimes' => 'Bukti pengaduan harus dengan format :mimes',
        'bukti.max' => 'Bukti pengaduan tidak boleh lebih dari :max'
    ]);

    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'errors' => $validator->errors()
        ], 400);
    }

    $bukti = $request->file('bukti');
    $filename = $bukti->getClientOriginalName();
    $bukti->storeAs('Pengaduan', $filename, 'public');

    $pengaduan = new Pengaduan($request->all());
    $pengaduan->id = uniqid();
    $pengaduan->bukti = $filename;
    $pengaduan->save();

    return response()->json([
        'success' => true,
        'message' => 'Pengaduan berhasil ditambahkan'
    ], 201);
}


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $pengaduan = Pengaduan::find($id);

        if ($pengaduan) {
            $urlBukti = asset('storage/Pengaduan/' . $pengaduan->bukti);
            $pengaduan->bukti = $urlBukti;
            return response()->json([
                'success' => true,
                'pengaduan' => $pengaduan
            ], 201);
        }

        return response()->json([
            'success' => false,
            'message' => 'Pengaduan tidak ditemukan'
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
        $pengaduan = Pengaduan::find($id);
        if (!$pengaduan) {
            return response()->json([
                'success' => false,
                'message' => 'Pengaduan tidak ditemukan'
            ], 404);
        }

        Storage::disk('public')->delete($pengaduan->bukti);

        $pengaduan->delete();

        return response()->json([
            'success' => true,
            'message' => 'Pengaduan berhasil dihapus'
        ], 200);
    }

    public function download(string $id)
    {
        $pengaduan = Pengaduan::find($id);

        if (!$pengaduan) {
            return response()->json([
                'success' => false,
                'message' => 'Pengaduan tidak ditemukan'
            ], 404);
        }

        $filePath = storage_path('app/public/Pengaduan/' . $pengaduan->bukti);

        if (file_exists($filePath)) {
            $cleanFileName = Str::slug($pengaduan->bukti);
            return response()->download($filePath, $cleanFileName);
        }

        return response()->json([
            'success' => false,
            'message' => 'File tidak ditemukan'
        ], 404);
    }
}
