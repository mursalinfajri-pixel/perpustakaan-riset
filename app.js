let seluruhRiset = [];

// 1. Ambil data dari data.json secara asynchronous
async function ambilDataRiset() {
    try {
        const response = await fetch('data.json');
        seluruhRiset = await response.json();
        tampilkanRiset(seluruhRiset);
    } catch (error) {
        console.error("Gagal memuat data riset:", error);
        document.getElementById('katalogGrid').innerHTML = `<p class="text-red-500 col-span-full text-center">Gagal memuat data. Silakan coba lagi nanti.</p>`;
    }
}

// 2. Fungsi untuk menampilkan kartu riset ke dalam HTML
function tampilkanRiset(data) {
    const grid = document.getElementById('katalogGrid');
    grid.innerHTML = ''; // Kosongkan grid terlebih dahulu

    if (data.length === 0) {
        grid.innerHTML = `<p class="text-gray-500 col-span-full text-center py-10">Riset tidak ditemukan.</p>`;
        return;
    }

    data.forEach(riset => {
        const card = `
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
                <div>
                    <div class="flex justify-between items-start mb-3">
                        <span class="text-xs font-semibold bg-blue-50 text-blue-700 px-2.5 py-1 rounded">
                            ${riset.kategori}
                        </span>
                        <span class="text-xs text-gray-400 font-medium">${riset.tahun}</span>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800 mb-2 hover:text-blue-900 cursor-pointer">${riset.judul}</h3>
                    <p class="text-sm text-gray-500 mb-4">Penulis: <span class="font-medium text-gray-700">${riset.penulis}</span></p>
                    <p class="text-gray-600 text-sm line-clamp-3 mb-4">${riset.abstrak}</p>
                </div>
                <a href="${riset.link}" class="inline-block text-center bg-blue-900 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-indigo-900 transition-colors">
                    Baca Selengkapnya
                </a>
            </div>
        `;
        grid.innerHTML += card;
    });
}

// 3. Fitur Pencarian Real-time
document.getElementById('searchInput').addEventListener('input', (e) => {
    const kataKunci = e.target.value.toLowerCase();
    const hasilFilter = seluruhRiset.filter(riset => 
        riset.judul.toLowerCase().includes(kataKunci) || 
        riset.penulis.toLowerCase().includes(kataKunci)
    );
    tampilkanRiset(hasilFilter);
});

// 4. Fitur Filter Kategori
function filterKategori(kategori) {
    if (kategori === 'Semua') {
        tampilkanRiset(seluruhRiset);
    } else {
        const hasilFilter = seluruhRiset.filter(riset => riset.kategori === kategori);
        tampilkanRiset(hasilFilter);
    }
}

// Jalankan fungsi saat halaman selesai dimuat
window.onload = ambilDataRiset;
