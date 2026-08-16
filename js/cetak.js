// ===========================================
// KARANG TARUNA CUP MANAGER
// CETAK.JS
// ===========================================

const laporan = document.getElementById("laporan");
const jenis = document.getElementById("jenisLaporan");


// ===========================================
// TAMPILKAN LAPORAN
// ===========================================

function tampilkanLaporan() {

    if (!laporan || !jenis) return;

    const pilihan = jenis.value;

    switch (pilihan) {

        case "tim":
            cetakTim();
            break;

        case "pemain":
            cetakPemain();
            break;

        case "grup":
            cetakGrup();
            break;

        case "jadwal":
            cetakJadwal();
            break;

        case "hasil":
            cetakHasil();
            break;

        case "klasemen":
            cetakKlasemen();
            break;

        case "topskor":
        case "topSkor":
        case "top-skor":
        case "top_skor":
            cetakTopSkor();
            break;

        case "semifinal":
            cetakSemifinal();
            break;

        case "hasilSemifinal":
            cetakHasilSemifinal();
            break;

        case "final":
            cetakFinal();
            break;

        case "hasilFinal":
            cetakHasilFinal();
            break;

        case "juara":
            cetakJuara();
            break;

        default:
            laporan.innerHTML = `
                <div style="
                    text-align:center;
                    padding:40px;
                ">
                    <h3>Silakan pilih jenis laporan.</h3>
                </div>
            `;
    }
}


// ===========================================
// HEADER
// ===========================================

function header(judul) {

    return `

        <div style="
            text-align:center;
            margin-bottom:20px;
        ">

            <h2 style="margin-bottom:5px;">
                KARANG TARUNA CUP
            </h2>

            <h3 style="margin-top:5px;">
                DESA KARANGKEMIRI
            </h3>

            <p>
                Kecamatan Pekuncen, Kabupaten Banyumas
            </p>

            <hr>

            <h2>
                ${judul}
            </h2>

            <p>
                Dicetak :
                ${new Date().toLocaleString("id-ID")}
            </p>

        </div>

    `;
}


// ===========================================
// LAPORAN KOSONG
// ===========================================

function kosong(teks) {

    laporan.innerHTML =

        header("LAPORAN") +

        `
        <div style="
            text-align:center;
            padding:30px;
        ">

            <h3>${teks}</h3>

        </div>
        `;
}


// ===========================================
// 1. DAFTAR TIM
// ===========================================

function cetakTim() {

    const tim =
        JSON.parse(localStorage.getItem("dataTim")) ||
        JSON.parse(localStorage.getItem("tim")) ||
        [];

    if (!Array.isArray(tim) || tim.length === 0) {

        kosong("Belum ada data tim.");

        return;
    }

    let html = header("DAFTAR TIM");

    html += `

        <table
            border="1"
            width="100%"
            cellspacing="0"
            cellpadding="8"
            style="
                border-collapse:collapse;
                text-align:center;
            "
        >

            <tr>

                <th>No</th>

                <th>Nama Tim</th>

            </tr>
    `;

    tim.forEach((t, i) => {

        const namaTim =
            typeof t === "string"
                ? t
                : t.nama || t.tim || "-";

        html += `

            <tr>

                <td>${i + 1}</td>

                <td style="text-align:left;">
                    ${namaTim}
                </td>

            </tr>

        `;
    });

    html += `</table>`;

    laporan.innerHTML = html;
}


// ===========================================
// 2. DAFTAR PEMAIN
// ===========================================

function cetakPemain() {

    const pemain =
        JSON.parse(localStorage.getItem("dataPemain")) ||
        JSON.parse(localStorage.getItem("pemain")) ||
        [];

    if (!Array.isArray(pemain) || pemain.length === 0) {

        kosong("Belum ada data pemain.");

        return;
    }

    let html = header("DAFTAR PEMAIN");

    html += `

        <table
            border="1"
            width="100%"
            cellspacing="0"
            cellpadding="7"
            style="
                border-collapse:collapse;
                text-align:center;
            "
        >

            <tr>

                <th>No</th>

                <th>Nama Pemain</th>

                <th>Tim</th>

            </tr>
    `;

    pemain.forEach((p, i) => {

        html += `

            <tr>

                <td>${i + 1}</td>

                <td style="text-align:left;">
                    ${p.nama || "-"}
                </td>

                <td style="text-align:left;">
                    ${p.tim || "-"}
                </td>

            </tr>

        `;
    });

    html += `</table>`;

    laporan.innerHTML = html;
}


// ===========================================
// 3. PEMBAGIAN GRUP
// ===========================================

function cetakGrup() {

    const grup =
        JSON.parse(localStorage.getItem("dataGrup")) ||
        [];

    if (!Array.isArray(grup) || grup.length === 0) {

        kosong("Belum ada pembagian grup.");

        return;
    }

    let html = header("PEMBAGIAN GRUP");

    grup.forEach((g, index) => {

        html += `

            <h3>
                GRUP ${String.fromCharCode(65 + index)}
            </h3>

            <table
                border="1"
                width="100%"
                cellspacing="0"
                cellpadding="7"
                style="
                    border-collapse:collapse;
                    margin-bottom:20px;
                "
            >

                <tr>

                    <th>No</th>

                    <th>Nama Tim</th>

                </tr>
        `;

        if (Array.isArray(g)) {

            g.forEach((tim, i) => {

                const namaTim =
                    typeof tim === "string"
                        ? tim
                        : tim.nama || tim.tim || "-";

                html += `

                    <tr>

                        <td>${i + 1}</td>

                        <td>
                            ${namaTim}
                        </td>

                    </tr>

                `;
            });

        }

        html += `</table>`;
    });

    laporan.innerHTML = html;
}


// ===========================================
// 4. JADWAL PERTANDINGAN
// ===========================================

function cetakJadwal() {

    const jadwal =
        JSON.parse(localStorage.getItem("jadwal")) ||
        [];

    if (!Array.isArray(jadwal) || jadwal.length === 0) {

        kosong("Belum ada jadwal pertandingan.");

        return;
    }

    let html = header("JADWAL PERTANDINGAN");

    html += `

        <table
            border="1"
            width="100%"
            cellspacing="0"
            cellpadding="7"
            style="border-collapse:collapse;"
        >

            <tr>

                <th>No</th>

                <th>Grup</th>

                <th>Pertandingan</th>

            </tr>
    `;

    jadwal.forEach((m, i) => {

        html += `

            <tr>

                <td>${i + 1}</td>

                <td>
                    ${m.grup || "-"}
                </td>

                <td>
                    ${m.tim1 || "-"}
                    VS
                    ${m.tim2 || "-"}
                </td>

            </tr>

        `;
    });

    html += `</table>`;

    laporan.innerHTML = html;
}


// ===========================================
// 5. HASIL PERTANDINGAN
// ===========================================

function cetakHasil() {

    const hasil =
        JSON.parse(localStorage.getItem("hasil")) ||
        [];

    if (!Array.isArray(hasil) || hasil.length === 0) {

        kosong("Belum ada hasil pertandingan.");

        return;
    }

    let html = header("HASIL PERTANDINGAN");

    html += `

        <table
            border="1"
            width="100%"
            cellspacing="0"
            cellpadding="7"
            style="border-collapse:collapse;"
        >

            <tr>

                <th>No</th>

                <th>Grup</th>

                <th>Pertandingan</th>

                <th>Skor</th>

            </tr>
    `;

    hasil.forEach((m, i) => {

        html += `

            <tr>

                <td>${i + 1}</td>

                <td>${m.grup || "-"}</td>

                <td>
                    ${m.tim1}
                    VS
                    ${m.tim2}
                </td>

                <td>
                    <b>
                        ${m.gol1 ?? 0}
                        -
                        ${m.gol2 ?? 0}
                    </b>
                </td>

            </tr>

        `;
    });

    html += `</table>`;

    laporan.innerHTML = html;
}


// ===========================================
// 6. KLASEMEN
// ===========================================

function cetakKlasemen() {

    const klasemen =
        JSON.parse(localStorage.getItem("klasemen")) ||
        {};

    if (
        typeof klasemen !== "object" ||
        Object.keys(klasemen).length === 0
    ) {

        kosong("Klasemen belum dihitung.");

        return;
    }

    let html = header("KLASEMEN");

    for (const grup in klasemen) {

        html += `

            <h3>
                GRUP ${grup}
            </h3>

            <table
                border="1"
                width="100%"
                cellspacing="0"
                cellpadding="7"
                style="
                    border-collapse:collapse;
                    margin-bottom:20px;
                    text-align:center;
                "
            >

                <tr>

                    <th>Pos</th>

                    <th>Tim</th>

                    <th>Main</th>

                    <th>SG</th>

                    <th>Poin</th>

                </tr>
        `;

        if (Array.isArray(klasemen[grup])) {

            klasemen[grup].forEach((t, i) => {

                html += `

                    <tr>

                        <td>${i + 1}</td>

                        <td style="text-align:left;">
                            ${t.nama || t.tim || "-"}
                        </td>

                        <td>
                            ${t.main ?? 0}
                        </td>

                        <td>
                            ${t.sg ?? 0}
                        </td>

                        <td>
                            <b>
                                ${t.poin ?? 0}
                            </b>
                        </td>

                    </tr>

                `;
            });
        }

        html += `</table>`;
    }

    laporan.innerHTML = html;
}


// ===========================================
// 7. TOP SKOR
// ===========================================
//
// ATURAN:
//
// Grup A:
// BARETA LEGEND FC tidak dihitung.
//
// Grup B:
// Semua pertandingan dihitung.
//
// Grup C:
// DARAHAN FC tidak dihitung.
//
// Semifinal:
// Semua gol dihitung.
//
// Final:
// Semua gol dihitung.
//
// Data mendukung:
// pencetakGol1 / pencetakGol2
// dan
// pencetakGol11 / pencetakGol12
//
// ===========================================


function cetakTopSkor() {

    let daftarGol = [];


    // ==========================================
    // TIM YANG TIDAK DIHITUNG
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

        if (!nama || !tim) return;

        const pemain =
            daftarGol.find(p =>
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
    // AMBIL PENCETAK GOL
    // KOMPATIBEL DATA LAMA / BARU
    // ==========================================

    function ambilGolTim1(m) {

        if (Array.isArray(m.pencetakGol1)) {

            return m.pencetakGol1;

        }

        if (Array.isArray(m.pencetakGol11)) {

            return m.pencetakGol11;

        }

        return [];
    }


    function ambilGolTim2(m) {

        if (Array.isArray(m.pencetakGol2)) {

            return m.pencetakGol2;

        }

        if (Array.isArray(m.pencetakGol12)) {

            return m.pencetakGol12;

        }

        return [];
    }


    // ==========================================
    // HASIL FASE GRUP
    // ==========================================

    const hasil =
        JSON.parse(localStorage.getItem("hasil")) ||
        [];


    if (Array.isArray(hasil)) {

        hasil.forEach(m => {

            // Hanya Grup A, B, C

            if (
                !["A", "B", "C"]
                .includes(m.grup)
            ) {

                return;
            }


            // ==================================
            // CEK TIM TERBAWAH
            // ==================================

            const timTerbawah =
                timDikecualikan[m.grup];


            // Pertandingan melawan tim
            // yang dikecualikan tidak dihitung

            if (
                timTerbawah &&
                (
                    m.tim1 === timTerbawah ||
                    m.tim2 === timTerbawah
                )
            ) {

                return;
            }


            // ==================================
            // GOL TIM 1
            // ==================================

            ambilGolTim1(m)
                .forEach(nama => {

                    tambahGol(
                        nama,
                        m.tim1
                    );

                });


            // ==================================
            // GOL TIM 2
            // ==================================

            ambilGolTim2(m)
                .forEach(nama => {

                    tambahGol(
                        nama,
                        m.tim2
                    );

                });

        });

    }


    // ==========================================
    // SEMIFINAL
    // SEMUA GOL DIHITUNG
    // ==========================================

    const hasilSemifinal =
        JSON.parse(
            localStorage.getItem(
                "hasilSemifinal"
            )
        ) || [];


    if (Array.isArray(hasilSemifinal)) {

        hasilSemifinal.forEach(m => {

            ambilGolTim1(m)
                .forEach(nama => {

                    tambahGol(
                        nama,
                        m.tim1
                    );

                });


            ambilGolTim2(m)
                .forEach(nama => {

                    tambahGol(
                        nama,
                        m.tim2
                    );

                });

        });

    }


    // ==========================================
    // FINAL
    // ==========================================

    const hasilFinal =
        JSON.parse(
            localStorage.getItem(
                "hasilFinal"
            )
        ) || [];


    let finalData = null;


    if (Array.isArray(hasilFinal)) {

        finalData = hasilFinal[0];

    } else if (
        typeof hasilFinal === "object"
    ) {

        finalData = hasilFinal;

    }


    if (finalData) {

        ambilGolTim1(finalData)
            .forEach(nama => {

                tambahGol(
                    nama,
                    finalData.tim1
                );

            });


        ambilGolTim2(finalData)
            .forEach(nama => {

                tambahGol(
                    nama,
                    finalData.tim2
                );

            });

    }


    // ==========================================
    // URUTKAN
    // ==========================================

    daftarGol.sort((a, b) => {

        if (b.gol !== a.gol) {

            return b.gol - a.gol;

        }

        return a.nama.localeCompare(
            b.nama,
            "id"
        );

    });


    // ==========================================
    // TIDAK ADA DATA
    // ==========================================

    if (daftarGol.length === 0) {

        kosong(
            "Belum ada data gol yang dapat dihitung."
        );

        return;
    }


    // ==========================================
    // TABEL TOP SKOR
    // ==========================================

    let html =
        header("TOP SKOR TURNAMEN");


    html += `

        <div style="
            background:#f8f9fa;
            border:1px solid #ddd;
            padding:15px;
            margin-bottom:20px;
        ">

            <h3>
                ⚽ Ketentuan Perhitungan
            </h3>

            <p>
                🟢 Fase Grup:
                pertandingan melawan tim
                peringkat terakhir tidak dihitung.
            </p>

            <p>
                🟢 Grup 3 tim:
                seluruh pertandingan dihitung.
            </p>

            <p>
                🏆 Semifinal:
                seluruh gol dihitung.
            </p>

            <p>
                🏆 Final:
                seluruh gol dihitung.
            </p>

        </div>


        <table
            border="1"
            width="100%"
            cellspacing="0"
            cellpadding="8"
            style="
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

                    <b>
                        ${p.gol}
                    </b>

                </td>

            </tr>

        `;

    });


    html += `

            </tbody>

        </table>

    `;


    laporan.innerHTML = html;

}


// ===========================================
// SEMIFINAL
// ===========================================

function cetakSemifinal() {

    const semifinal =
        JSON.parse(
            localStorage.getItem("semifinal")
        ) || [];

    if (
        !Array.isArray(semifinal) ||
        semifinal.length === 0
    ) {

        kosong("Semifinal belum dibuat.");

        return;
    }

    let html =
        header("JADWAL SEMIFINAL");

    html += `

        <table
            border="1"
            width="100%"
            cellspacing="0"
            cellpadding="8"
            style="border-collapse:collapse;"
        >

            <tr>

                <th>No</th>

                <th>Pertandingan</th>

            </tr>
    `;

    semifinal.forEach((m, i) => {

        html += `

            <tr>

                <td>
                    ${i + 1}
                </td>

                <td>
                    ${m.tim1}
                    VS
                    ${m.tim2}
                </td>

            </tr>

        `;
    });

    html += `</table>`;

    laporan.innerHTML = html;
}


// ===========================================
// HASIL SEMIFINAL
// ===========================================

function cetakHasilSemifinal() {

    const hasil =
        JSON.parse(
            localStorage.getItem(
                "hasilSemifinal"
            )
        ) || [];

    if (
        !Array.isArray(hasil) ||
        hasil.length === 0
    ) {

        kosong(
            "Hasil semifinal belum tersedia."
        );

        return;
    }

    let html =
        header("HASIL SEMIFINAL");

    html += `

        <table
            border="1"
            width="100%"
            cellspacing="0"
            cellpadding="8"
            style="border-collapse:collapse;"
        >

            <tr>

                <th>No</th>

                <th>Pertandingan</th>

                <th>Skor</th>

                <th>Pemenang</th>

            </tr>
    `;

    hasil.forEach((m, i) => {

        html += `

            <tr>

                <td>${i + 1}</td>

                <td>
                    ${m.tim1}
                    VS
                    ${m.tim2}
                </td>

                <td>
                    ${m.gol1 ?? 0}
                    -
                    ${m.gol2 ?? 0}
                </td>

                <td>
                    ${m.pemenang || "-"}
                </td>

            </tr>

        `;
    });

    html += `</table>`;

    laporan.innerHTML = html;
}


// ===========================================
// 9. JADWAL FINAL
// FINAL OTOMATIS DARI PEMENANG SEMIFINAL
// ===========================================

function cetakFinal() {

    // Ambil hasil semifinal
    const hasilSemifinal =
        JSON.parse(
            localStorage.getItem("hasilSemifinal")
        ) || [];


    // ==========================================
    // CEK DATA SEMIFINAL
    // ==========================================

    if (
        !Array.isArray(hasilSemifinal) ||
        hasilSemifinal.length < 2
    ) {

        kosong(
            "Final belum dapat ditentukan. Hasil 2 semifinal harus tersedia."
        );

        return;
    }


    // ==========================================
    // FUNGSI MENENTUKAN PEMENANG
    // ==========================================

    function tentukanPemenang(m) {

        // Jika sistem semifinal sudah menyimpan
        // nama pemenang, gunakan data tersebut.

        if (m.pemenang) {
            return m.pemenang;
        }

        if (m.winner) {
            return m.winner;
        }

        if (m.pemenangTim) {
            return m.pemenangTim;
        }


        // ======================================
        // Jika tidak ada field pemenang,
        // hitung berdasarkan skor
        // ======================================

        const gol1 =
            Number(m.gol1 ?? 0);

        const gol2 =
            Number(m.gol2 ?? 0);


        if (gol1 > gol2) {

            return m.tim1;

        }

        if (gol2 > gol1) {

            return m.tim2;

        }


        // Jika skor sama dan ada pemenang
        // melalui adu penalti / extra time,
        // cek beberapa kemungkinan field.

        if (m.pemenangPenalti) {
            return m.pemenangPenalti;
        }

        if (m.pemenangAduPenalti) {
            return m.pemenangAduPenalti;
        }

        if (m.winnerAfterPenalty) {
            return m.winnerAfterPenalty;
        }


        return null;
    }


    // ==========================================
    // SEMIFINAL 1
    // ==========================================

    const semifinal1 =
        hasilSemifinal[0];


    // ==========================================
    // SEMIFINAL 2
    // ==========================================

    const semifinal2 =
        hasilSemifinal[1];


    // ==========================================
    // TENTUKAN PEMENANG
    // ==========================================

    const finalis1 =
        tentukanPemenang(semifinal1);


    const finalis2 =
        tentukanPemenang(semifinal2);


    // ==========================================
    // CEK FINALIS
    // ==========================================

    if (!finalis1 || !finalis2) {

        kosong(
            "Pemenang semifinal belum dapat ditentukan."
        );

        return;
    }


    // ==========================================
    // TAMPILKAN FINAL
    // ==========================================

    let html =
        header("JADWAL FINAL");


    html += `

        <table
            border="1"
            width="100%"
            cellspacing="0"
            cellpadding="10"
            style="
                border-collapse:collapse;
                text-align:center;
            "
        >

            <thead>

                <tr>

                    <th style="width:80px;">
                        No
                    </th>

                    <th>
                        Pertandingan Final
                    </th>

                </tr>

            </thead>

            <tbody>

                <tr>

                    <td>
                        1
                    </td>

                    <td>
                        <b>
                            ${finalis1}
                            VS
                            ${finalis2}
                        </b>
                    </td>

                </tr>

            </tbody>

        </table>


        <div style="
            margin-top:20px;
            padding:15px;
            background:#e8f5e9;
            border:1px solid #b7dfb9;
            text-align:center;
        ">

            🏆 <b>FINAL DITENTUKAN DARI HASIL SEMIFINAL</b>

            <br><br>

            Pemenang Semifinal 1 :
            <b>${finalis1}</b>

            <br>

            Pemenang Semifinal 2 :
            <b>${finalis2}</b>

        </div>

    `;


    laporan.innerHTML = html;

}


// ===========================================
// HASIL FINAL
// ===========================================

function cetakHasilFinal() {

    const hasil =
        JSON.parse(
            localStorage.getItem(
                "hasilFinal"
            )
        ) || [];

    if (
        !Array.isArray(hasil) ||
        hasil.length === 0
    ) {

        kosong(
            "Hasil final belum tersedia."
        );

        return;
    }

    let html =
        header("HASIL FINAL");

    html += `

        <table
            border="1"
            width="100%"
            cellspacing="0"
            cellpadding="8"
            style="border-collapse:collapse;"
        >

            <tr>

                <th>Pertandingan</th>

                <th>Skor</th>

                <th>Juara</th>

            </tr>
    `;

    hasil.forEach(m => {

        const juara =
            Number(m.gol1) >
            Number(m.gol2)
                ? m.tim1
                : m.tim2;

        html += `

            <tr>

                <td>
                    ${m.tim1}
                    VS
                    ${m.tim2}
                </td>

                <td>
                    ${m.gol1 ?? 0}
                    -
                    ${m.gol2 ?? 0}
                </td>

                <td>
                    <b>
                        ${juara}
                    </b>
                </td>

            </tr>

        `;
    });

    html += `</table>`;

    laporan.innerHTML = html;
}


// ===========================================
// 11. JUARA TURNAMEN
// ===========================================
//
// JUARA 1 & 2
// → diambil dari hasil FINAL
//
// JUARA 3 BERSAMA
// → otomatis diambil dari 2 tim yang KALAH
//   di semifinal
//
// Tidak menggunakan localStorage "juara3"
// agar tidak mengambil data lama.
// ===========================================

function cetakJuara() {

    // ==========================================
    // AMBIL HASIL SEMIFINAL
    // ==========================================

    const hasilSemifinal =
        JSON.parse(
            localStorage.getItem("hasilSemifinal")
        ) || [];


    // ==========================================
    // AMBIL HASIL FINAL
    // ==========================================

    const hasilFinal =
        JSON.parse(
            localStorage.getItem("hasilFinal")
        ) || [];


    // ==========================================
    // CEK HASIL FINAL
    // ==========================================

    if (
        !Array.isArray(hasilFinal) ||
        hasilFinal.length === 0
    ) {

        kosong(
            "Juara turnamen belum dapat ditentukan karena hasil final belum tersedia."
        );

        return;
    }


    // ==========================================
    // DATA FINAL
    // ==========================================

    const finalData =
        hasilFinal[0];


    // ==========================================
    // TENTUKAN JUARA 1 & 2
    // ==========================================

    let juara1 = null;
    let juara2 = null;


    const golFinal1 =
        Number(finalData.gol1 ?? 0);


    const golFinal2 =
        Number(finalData.gol2 ?? 0);


    // Jika ada field pemenang tersimpan,
    // prioritaskan field tersebut.

    const pemenangFinal =
        finalData.pemenang ||
        finalData.winner ||
        finalData.pemenangTim;


    if (pemenangFinal) {

        juara1 = pemenangFinal;


        if (pemenangFinal === finalData.tim1) {

            juara2 = finalData.tim2;

        } else {

            juara2 = finalData.tim1;

        }

    } else {

        // Berdasarkan skor final

        if (golFinal1 > golFinal2) {

            juara1 = finalData.tim1;

            juara2 = finalData.tim2;

        } else if (golFinal2 > golFinal1) {

            juara1 = finalData.tim2;

            juara2 = finalData.tim1;

        }

    }


    // ==========================================
    // JUARA 3 BERSAMA
    // DIAMBIL DARI TIM YANG KALAH DI SEMIFINAL
    // ==========================================

    const juara3 = [];


    if (Array.isArray(hasilSemifinal)) {

        hasilSemifinal.forEach(m => {

            if (!m) return;


            let pemenang = null;


            // ----------------------------------
            // Jika data sudah menyimpan pemenang
            // ----------------------------------

            if (m.pemenang) {

                pemenang = m.pemenang;

            } else if (m.winner) {

                pemenang = m.winner;

            } else if (m.pemenangTim) {

                pemenang = m.pemenangTim;

            }


            // ----------------------------------
            // Jika belum ada pemenang,
            // tentukan dari skor
            // ----------------------------------

            if (!pemenang) {

                const gol1 =
                    Number(m.gol1 ?? 0);

                const gol2 =
                    Number(m.gol2 ?? 0);


                if (gol1 > gol2) {

                    pemenang = m.tim1;

                } else if (gol2 > gol1) {

                    pemenang = m.tim2;

                }

            }


            // ----------------------------------
            // Tim yang kalah
            // ----------------------------------

            let timKalah = null;


            if (pemenang === m.tim1) {

                timKalah = m.tim2;

            } else if (pemenang === m.tim2) {

                timKalah = m.tim1;

            }


            // ----------------------------------
            // Masukkan ke Juara 3
            // ----------------------------------

            if (
                timKalah &&
                !juara3.includes(timKalah)
            ) {

                juara3.push(timKalah);

            }

        });

    }


    // ==========================================
    // VALIDASI JUARA 3
    // ==========================================

    if (juara3.length < 2) {

        kosong(
            "Juara 3 belum dapat ditentukan. Pastikan kedua hasil semifinal sudah tersimpan."
        );

        return;
    }


    // ==========================================
    // TAMPILKAN HASIL
    // ==========================================

    let html =
        header("JUARA TURNAMEN");


    html += `

        <div style="
            text-align:center;
            margin-bottom:25px;
        ">

            <h2>
                🏆 HASIL AKHIR TURNAMEN
            </h2>

        </div>


        <table
            border="1"
            width="100%"
            cellspacing="0"
            cellpadding="12"
            style="
                border-collapse:collapse;
                text-align:center;
                font-size:16px;
            "
        >

            <thead>

                <tr>

                    <th>
                        Peringkat
                    </th>

                    <th>
                        Tim
                    </th>

                </tr>

            </thead>

            <tbody>

                <tr>

                    <td>
                        🥇 <b>JUARA 1</b>
                    </td>

                    <td>
                        <b>
                            ${juara1 || "-"}
                        </b>
                    </td>

                </tr>


                <tr>

                    <td>
                        🥈 <b>JUARA 2</b>
                    </td>

                    <td>
                        <b>
                            ${juara2 || "-"}
                        </b>
                    </td>

                </tr>


                <tr>

                    <td>
                        🥉 <b>JUARA 3 BERSAMA</b>
                    </td>

                    <td>

                        <b>
                            ${juara3[0]}
                        </b>

                        <br>

                        <b>
                            ${juara3[1]}
                        </b>

                    </td>

                </tr>

            </tbody>

        </table>


        <div style="
            margin-top:20px;
            padding:15px;
            background:#f8f9fa;
            border:1px solid #ddd;
            text-align:center;
        ">

            <b>Dasar penentuan:</b>

            <br><br>

            Juara 1 dan Juara 2 ditentukan dari hasil final.

            <br>

            Juara 3 Bersama ditentukan dari
            <b>dua tim yang kalah di semifinal</b>.

        </div>

    `;


    laporan.innerHTML = html;

}


// ===========================================
// EVENT PILIH LAPORAN
// ===========================================

if (jenis) {

    jenis.addEventListener(
        "change",
        tampilkanLaporan
    );

}


// ===========================================
// JALANKAN
// ===========================================

tampilkanLaporan();