// ==========================================
// KARANG TARUNA CUP MANAGER
// MODUL TOP SKOR
// ==========================================


// ==========================================
// AMBIL ELEMENT HTML
// ==========================================

const tabel = document.getElementById("tabelTopSkor");
const status = document.getElementById("statusTopSkor");


// ==========================================
// AMBIL DATA DARI LOCAL STORAGE
// ==========================================

const hasil =
    JSON.parse(localStorage.getItem("hasil")) || [];

const hasilSemifinal =
    JSON.parse(localStorage.getItem("hasilSemifinal")) || [];

const hasilFinal =
    JSON.parse(localStorage.getItem("hasilFinal")) || [];


// ==========================================
// STATUS TURNAMEN
// ==========================================

const jumlahPertandinganGrup = 15;

const selesai = hasil.filter(m =>
    ["A", "B", "C"].includes(m.grup)
).length;


if (selesai < jumlahPertandinganGrup) {

    status.style.background = "#fff3cd";
    status.style.color = "#856404";

    status.innerHTML = `
        🟡 <b>FASE GRUP BERLANGSUNG</b><br>
        Pertandingan selesai :
        <b>${selesai} / ${jumlahPertandinganGrup}</b><br>
        Top Skor masih bersifat sementara.
    `;

} else {

    status.style.background = "#d4edda";
    status.style.color = "#155724";

    status.innerHTML = `
        🟢 <b>FASE GRUP SELESAI</b><br>
        Seluruh pertandingan grup telah selesai.<br>
        Top Skor menggunakan perhitungan resmi turnamen.
    `;

}


// ==========================================
// PENYIMPAN DATA TOP SKOR
// ==========================================

let daftarGol = [];


// ==========================================
// TIM PERINGKAT TERAKHIR
// PERTANDINGAN MELAWAN TIM INI
// TIDAK DIHITUNG UNTUK TOP SKOR
// ==========================================

const timDikecualikan = {

    A: "BARETA LEGEND FC",

    B: null,

    C: "DARAHAN FC"

};


// ==========================================
// FUNGSI TAMBAH GOL
// ==========================================

function tambahGol(nama, tim) {

    if (!nama || !tim) {
        return;
    }


    const pemain = daftarGol.find(p =>
        p.nama === nama &&
        p.tim === tim
    );


    if (pemain) {

        pemain.gol++;

    } else {

        daftarGol.push({

            nama: nama,

            tim: tim,

            gol: 1

        });

    }

}


// ==========================================
// FUNGSI AMBIL PENCETAK GOL
// ==========================================
// Menggunakan pencetakGol11 / pencetakGol12
// sesuai struktur data pertandingan.
// ==========================================

function prosesGolPertandingan(m) {

    if (!m) {
        return;
    }


    // ======================================
    // GOL TIM 1
    // ======================================

    let pencetakTim1 = [];


    if (Array.isArray(m.pencetakGol11)) {

        pencetakTim1 = m.pencetakGol11;

    } else if (Array.isArray(m.pencetakGol1)) {

        // fallback jika ada data lama

        pencetakTim1 = m.pencetakGol1;

    }


    pencetakTim1.forEach(nama => {

        tambahGol(nama, m.tim1);

    });


    // ======================================
    // GOL TIM 2
    // ======================================

    let pencetakTim2 = [];


    if (Array.isArray(m.pencetakGol12)) {

        pencetakTim2 = m.pencetakGol12;

    } else if (Array.isArray(m.pencetakGol2)) {

        // fallback jika ada data lama

        pencetakTim2 = m.pencetakGol2;

    }


    pencetakTim2.forEach(nama => {

        tambahGol(nama, m.tim2);

    });

}


// ==========================================
// HITUNG GOL FASE GRUP
// ==========================================

hasil.forEach(m => {


    // ======================================
    // HANYA GRUP A, B, C
    // ======================================

    if (!["A", "B", "C"].includes(m.grup)) {

        return;

    }


    // ======================================
    // CEK TIM PERINGKAT TERAKHIR
    // ======================================

    const timTerbawah =
        timDikecualikan[m.grup];


    // ======================================
    // JIKA PERTANDINGAN MELAWAN
    // TIM TERBAWAH → TIDAK DIHITUNG
    // ======================================

    if (
        timTerbawah &&
        (
            m.tim1 === timTerbawah ||
            m.tim2 === timTerbawah
        )
    ) {

        return;

    }


    // ======================================
    // HITUNG SEMUA GOL PERTANDINGAN
    // ======================================

    prosesGolPertandingan(m);

});


// ==========================================
// HITUNG GOL SEMIFINAL
// ==========================================
// Semua gol semifinal dihitung.
// ==========================================

hasilSemifinal.forEach(m => {

    prosesGolPertandingan(m);

});


// ==========================================
// HITUNG GOL FINAL
// ==========================================
// Semua gol final dihitung.
// ==========================================


// Karena hasilFinal bisa berupa array
// atau object, ambil data pertandingan.

let finalData = null;


if (Array.isArray(hasilFinal)) {

    finalData = hasilFinal[0];

} else {

    finalData = hasilFinal;

}


// Jika data final tersedia

if (finalData) {

    prosesGolPertandingan(finalData);

}


// ==========================================
// URUTKAN TOP SKOR
// ==========================================

daftarGol.sort((a, b) => {


    // ======================================
    // GOL TERBANYAK DI ATAS
    // ======================================

    if (b.gol !== a.gol) {

        return b.gol - a.gol;

    }


    // ======================================
    // JIKA GOL SAMA
    // URUT BERDASARKAN NAMA
    // ======================================

    return a.nama.localeCompare(b.nama);

});


// ==========================================
// TAMPILKAN TABEL TOP SKOR
// ==========================================

if (daftarGol.length === 0) {


    tabel.innerHTML = `

        <div style="
            text-align:center;
            padding:20px;
        ">

            <p>⚽ Belum ada data gol.</p>

        </div>

    `;


} else {


    let html = `

        <table
            border="1"
            cellpadding="10"
            cellspacing="0"
            style="
                width:100%;
                border-collapse:collapse;
                text-align:center;
            "
        >

            <thead>

                <tr>

                    <th>No</th>

                    <th>Nama Pemain</th>

                    <th>Tim</th>

                    <th>Gol</th>

                </tr>

            </thead>

            <tbody>

    `;


    // ======================================
    // MASUKKAN DATA PEMAIN
    // ======================================

    daftarGol.forEach((p, i) => {


        html += `

            <tr>

                <td>
                    ${i + 1}
                </td>

                <td style="
                    text-align:left;
                ">
                    ${p.nama}
                </td>

                <td style="
                    text-align:left;
                ">
                    ${p.tim}
                </td>

                <td>
                    <b>${p.gol}</b>
                </td>

            </tr>

        `;

    });


    // ======================================
    // TUTUP TABEL
    // ======================================

    html += `

            </tbody>

        </table>

    `;


    // ======================================
    // TAMPILKAN KE HALAMAN
    // ======================================

    tabel.innerHTML = html;

}