// Menunggu seluruh halaman HTML selesai dimuat
document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. SELECT ELEMEN (Sesuai instruksi 'select')
    // ==========================================
    const inputs = document.querySelectorAll("input");
    const inputAsal = inputs[0];
    const inputTujuan = inputs[1];
    const inputLantai = inputs[2];
    const textareaDeskripsi = document.querySelector("textarea");
    const btnHitung = document.querySelector(".btn-hitung");
    const areaHasil = document.getElementById("hasil-perhitungan");

    // ==========================================
    // 2. FUNGSI HITUNG BIAYA (Logika Utama)
    // ==========================================
    function kalkulasiBiaya() {
        const alamatAsal = inputAsal.value.trim();
        const alamatTujuan = inputTujuan.value.trim();
        const jumlahLantai = parseInt(inputLantai.value) || 1;
        const deskripsi = textareaDeskripsi.value.trim();

        // Validasi Sederhana
        if (alamatAsal === "" || alamatTujuan === "") {
            return false;
        }

        const tarifDasar = 50000;
        const biayaPerLantai = 15000;
        const totalBiaya = tarifDasar + (jumlahLantai * biayaPerLantai);

        // Menampilkan Ringkasan Hasil (Memanfaatkan Tailwind CSS)
        areaHasil.classList.remove("hidden");
        areaHasil.innerHTML = `
            <h3 class="text-lg font-bold text-green-600 mb-2">Ringkasan & Estimasi Biaya</h3>
            <p class="text-sm text-gray-700 mb-1"><strong>Rute:</strong> ${alamatAsal} &rarr; ${alamatTujuan}</p>
            <p class="text-sm text-gray-700 mb-1"><strong>Lantai Tangga:</strong> ${jumlahLantai} lantai (+Rp ${(jumlahLantai * biayaPerLantai).toLocaleString("id-ID")})</p>
            <p class="text-sm text-gray-700 mb-3"><strong>Catatan:</strong> ${deskripsi || "-"}</p>
            <hr class="my-3 border-gray-200">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Total Estimasi: Rp ${totalBiaya.toLocaleString("id-ID")}</h2>
            <button id="btn-lanjut-login" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg transition cursor-pointer">
                Lanjut Pembayaran via QRIS (Login)
            </button>
        `;

        // Event listener untuk tombol checkout/login di dalam hasil
        document.getElementById("btn-lanjut-login").addEventListener("click", function () {
            alert("Silakan Login terlebih dahulu untuk menyelesaikan pembayaran QRIS!");
        });

        return true;
    }

    // ==========================================
    // 3. HANDLE USER EVENT ('click' & 'change')
    // ==========================================

    // A. Event CLICK pada Tombol "Hitung Biaya Sekarang"
    btnHitung.addEventListener("click", function () {
        const sukses = kalkulasiBiaya();
        if (!sukses) {
            alert("Harap isi Alamat Asal dan Alamat Tujuan terlebih dahulu!");
        } else {
            areaHasil.scrollIntoView({ behavior: "smooth" });
        }
    });

    // B. Event CHANGE & INPUT (Otomatis memperbarui biaya saat user mengubah nilai lantai)
    inputLantai.addEventListener("change", function () {
        // Jika hasil sudah pernah ditampilkan, update nilainya secara otomatis saat lantai diubah
        if (!areaHasil.classList.contains("hidden")) {
            kalkulasiBiaya();
        }
    });
});