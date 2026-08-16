const div = document.getElementById("daftarSemifinal");
const dataPemain =
    JSON.parse(localStorage.getItem("dataPemain")) || [];
const semifinal = JSON.parse(localStorage.getItem("semifinal")) || [];
let hasilSemifinal =
JSON.parse(localStorage.getItem("hasilSemifinal")) || [];

tampilkan();

function tampilkan() {

    div.innerHTML = "";

    semifinal.forEach((m, i) => {

        const data = hasilSemifinal.find(x => x.no === i + 1 );

        div.innerHTML += `
            <div class="card" style="margin-bottom:20px;padding:15px">

                <h3>Semifinal ${i + 1}</h3>

                <b>${m.tim1}</b>

                <input
                    type="number"
                    id="g1_${i}"
                    value="${data ? data.gol1 : ""}"
                    min="0"
                    style="width:60px"
                    oninput="updatePencetakGol(${i})"
                >

                VS

                <input
                    type="number"
                    id="g2_${i}"
                    value="${data ? data.gol2 : ""}"
                    min="0"
                    style="width:60px"
                    oninput="updatePencetakGol(${i})"
                >

                <b>${m.tim2}</b>

                <br><br>

                <div id="pencetak_${i}"></div>

                <hr>

                <button onclick="simpan(${i})">
                    Simpan
                </button>

            </div>
        `;
    });

    // PENTING:
    // HTML harus sudah selesai dibuat terlebih dahulu
    semifinal.forEach((m, i) => {
        updatePencetakGol(i);
    });
}

function updatePencetakGol(i) {

    const container =
        document.getElementById(`pencetak_${i}`);

    if (!container) return;

    // Pertandingan semifinal yang sedang ditampilkan
    const pertandingan = semifinal[i];

    if (!pertandingan) return;

    // Ambil hasil yang sudah tersimpan, jika ada
    const data = hasilSemifinal.find(
        x => Number(x.no) === i + 1
    );

    // Ambil input skor
    const inputGol1 =
        document.getElementById(`g1_${i}`);

    const inputGol2 =
        document.getElementById(`g2_${i}`);

    if (!inputGol1 || !inputGol2) return;

    const gol1 = Number(inputGol1.value) || 0;
    const gol2 = Number(inputGol2.value) || 0;

    // Bersihkan dropdown lama
    container.innerHTML = "";


    // =====================================================
    // PENCETAK GOL TIM 1
    // =====================================================

    if (gol1 > 0) {

        container.innerHTML += `
            <h4>Pencetak Gol ${pertandingan.tim1}</h4>
        `;

        for (let n = 0; n < gol1; n++) {

            const pilihanSebelumnya =
                data?.pencetakGol1?.[n] || "";

            container.innerHTML += `
                <div style="margin-bottom:8px;">

                    <label>
                        Gol ke-${n + 1}
                    </label>

                    <select
                        id="pemain1_${i}_${n}"
                        style="width:220px;padding:6px;"
                    >

                        <option value="">
                            -- Pilih pemain --
                        </option>

                        ${
                            dataPemain
                                .filter(
                                    p =>
                                        p.tim === pertandingan.tim1
                                )
                                .map(
                                    p => `
                                        <option
                                            value="${p.nama}"
                                            ${
                                                pilihanSebelumnya === p.nama
                                                    ? "selected"
                                                    : ""
                                            }
                                        >
                                            ${p.nama}
                                        </option>
                                    `
                                )
                                .join("")
                        }

                    </select>

                </div>
            `;
        }
    }


    // =====================================================
    // PENCETAK GOL TIM 2
    // =====================================================

    if (gol2 > 0) {

        container.innerHTML += `
            <h4>Pencetak Gol ${pertandingan.tim2}</h4>
        `;

        for (let n = 0; n < gol2; n++) {

            const pilihanSebelumnya =
                data?.pencetakGol2?.[n] || "";

            container.innerHTML += `
                <div style="margin-bottom:8px;">

                    <label>
                        Gol ke-${n + 1}
                    </label>

                    <select
                        id="pemain2_${i}_${n}"
                        style="width:220px;padding:6px;"
                    >

                        <option value="">
                            -- Pilih pemain --
                        </option>

                        ${
                            dataPemain
                                .filter(
                                    p =>
                                        p.tim === pertandingan.tim2
                                )
                                .map(
                                    p => `
                                        <option
                                            value="${p.nama}"
                                            ${
                                                pilihanSebelumnya === p.nama
                                                    ? "selected"
                                                    : ""
                                            }
                                        >
                                            ${p.nama}
                                        </option>
                                    `
                                )
                                .join("")
                        }

                    </select>

                </div>
            `;
        }
    }
}

         

function simpan(i) {

    // ==========================================
    // CEK DATA SEMIFINAL
    // ==========================================

    if (!semifinal[i]) {
        alert("Data pertandingan semifinal tidak ditemukan.");
        return;
    }

    // ==========================================
    // AMBIL SKOR
    // ==========================================

    const inputGol1 = document.getElementById(`g1_${i}`);
    const inputGol2 = document.getElementById(`g2_${i}`);

    if (!inputGol1 || !inputGol2) {
        alert("Input skor tidak ditemukan.");
        return;
    }

    const gol1 = Number(inputGol1.value);
    const gol2 = Number(inputGol2.value);

    if (!Number.isInteger(gol1) || !Number.isInteger(gol2)) {
        alert("Masukkan skor dengan benar.");
        return;
    }

    if (gol1 < 0 || gol2 < 0) {
        alert("Skor tidak boleh negatif.");
        return;
    }
    // ==========================================
// SIMPAN DATA PENCETAK GOL
// ==========================================

const dataSemifinal = semifinal[i];

if (!dataSemifinal) {
    alert("Data semifinal tidak ditemukan.");
    return;
}


// Simpan skor
dataSemifinal.gol1 = gol1;
dataSemifinal.gol2 = gol2;
    // ==========================================
    // SEMIFINAL TIDAK BOLEH SERI
    // ==========================================

    if (gol1 === gol2) {
        alert("Semifinal tidak boleh seri.");
        return;
    }

    
    // =============================================
// AMBIL PENCETAK GOL TIM 1
// =============================================

const pencetakGol1 = [];

for (let n = 0; n < gol1; n++) {

    const select = document.getElementById(
        `pemain1_${i}_${n}`
    );

    if (!select || select.value === "") {
        alert(
            `Pilih pencetak gol ke-${n + 1} untuk ${semifinal[i].tim1}.`
        );
        return;
    }

    pencetakGol1.push(select.value);
}


// =============================================
// AMBIL PENCETAK GOL TIM 2
// =============================================

const pencetakGol2 = [];

for (let n = 0; n < gol2; n++) {

    const select = document.getElementById(
        `pemain2_${i}_${n}`
    );

    if (!select || select.value === "") {
        alert(
            `Pilih pencetak gol ke-${n + 1} untuk ${semifinal[i].tim2}.`
        );
        return;
    }

    pencetakGol2.push(select.value);
}

    // ==========================================
    // PEMENANG DAN KALAH
    // ==========================================

    const pemenang =
        gol1 > gol2
            ? semifinal[i].tim1
            : semifinal[i].tim2;

    const kalah =
        gol1 > gol2
            ? semifinal[i].tim2
            : semifinal[i].tim1;

    // ==========================================
    // BUAT DATA HASIL SEMIFINAL
    // ==========================================

    const data = {

        no: i + 1,

        fase: "SEMIFINAL",

        tim1: semifinal[i].tim1,

        tim2: semifinal[i].tim2,

        gol1: gol1,

        gol2: gol2,

        pencetakGol1: pencetakGol1,

        pencetakGol2: pencetakGol2,

        pemenang: pemenang,

        kalah: kalah
    };

    // ==========================================
    // HAPUS DATA LAMA UNTUK PERTANDINGAN INI
    // ==========================================

    hasilSemifinal =
        hasilSemifinal.filter(x => x.no !== i + 1);

    // ==========================================
    // MASUKKAN HASIL BARU
    // ==========================================

    // ==========================================
// SIMPAN / UPDATE HASIL SEMIFINAL
// ==========================================

const indexLama = hasilSemifinal.findIndex(
    pertandingan => pertandingan.no === data.no
);

if (indexLama !== -1) {

    // Jika nomor pertandingan sudah ada,
    // ganti data lama
    hasilSemifinal[indexLama] = data;

} else {

    // Jika belum ada, tambahkan
    hasilSemifinal.push(data);

}


// Urutkan berdasarkan nomor pertandingan
hasilSemifinal.sort(
    (a, b) => Number(a.no) - Number(b.no)
);


// Simpan ke localStorage
localStorage.setItem(
    "hasilSemifinal",
    JSON.stringify(hasilSemifinal)
);

    // ==========================================
    // CEK PENYIMPANAN
    // ==========================================

    console.log("HASIL SEMIFINAL TERSIMPAN:");
    console.log(hasilSemifinal);

    console.log(
        "localStorage:",
        localStorage.getItem("hasilSemifinal")
    );

    // ================================================
    // TAMPILKAN STATUS
    // ================================================

    alert(
    `Hasil semifinal ${data.tim1} ${gol1} - ${gol2} ${data.tim2} berhasil disimpan.`
    );

    // ================================================
    // JANGAN REFRESH TAMPILAN
    // ================================================
    // tampilkan();

}
