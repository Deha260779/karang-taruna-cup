// =====================================================
// KARANG TARUNA CUP MANAGER
// HASIL PERTANDINGAN + PENCETAK GOL
// =====================================================

// -----------------------------------------
// ELEMENT
// -----------------------------------------

const hasilDiv = document.getElementById("daftarPertandingan");


// -----------------------------------------
// DATA JADWAL
// -----------------------------------------

const jadwal =
    JSON.parse(localStorage.getItem("jadwal")) || [];


// -----------------------------------------
// DATA HASIL
// -----------------------------------------

let hasil =
    JSON.parse(localStorage.getItem("hasil")) || [];


// -----------------------------------------
// DATA PEMAIN
// -----------------------------------------

let dataPemain = [];


// Jika sistem DB tersedia, gunakan DB
if (
    typeof DB !== "undefined" &&
    typeof DB.get === "function"
) {
    dataPemain = DB.get("dataPemain", []);
}

// Jika DB tidak tersedia, coba ambil dari localStorage
if (!Array.isArray(dataPemain) || dataPemain.length === 0) {

    dataPemain =
        JSON.parse(
            localStorage.getItem("dataPemain")
        ) || [];

}


// =====================================================
// TAMPILKAN DATA
// =====================================================

tampilkan();


// =====================================================
// FUNGSI TAMPILKAN PERTANDINGAN
// =====================================================

function tampilkan() {

    if (!hasilDiv) return;

    hasilDiv.innerHTML = "";


    jadwal.forEach((m, i) => {

        // Ambil hasil pertandingan yang sudah tersimpan
        const data = hasil.find(
            x => Number(x.no) === i
        );


        hasilDiv.innerHTML += `

        <div
            class="card"
            style="
                margin-bottom:15px;
                padding:15px;
            "
        >

            <b>Grup ${m.grup}</b>

            <br><br>


            <!-- ================================= -->
            <!-- PERTANDINGAN -->
            <!-- ================================= -->

            <div>

                <b>${m.tim1}</b>

                <input
                    type="number"
                    id="g1_${i}"
                    min="0"
                    value="${data ? data.gol1 : ""}"
                    style="
                        width:60px;
                        margin:0 5px;
                    "
                    oninput="updatePencetakGol(${i})"
                >

                VS

                <input
                    type="number"
                    id="g2_${i}"
                    min="0"
                    value="${data ? data.gol2 : ""}"
                    style="
                        width:60px;
                        margin:0 5px;
                    "
                    oninput="updatePencetakGol(${i})"
                >

                <b>${m.tim2}</b>

            </div>


            <br>


            <!-- ================================= -->
            <!-- PENCETAK GOL -->
            <!-- ================================= -->

            <div
                id="pencetak_${i}"
                style="margin-top:10px;"
            ></div>


            <br>


            <!-- ================================= -->
            <!-- TOMBOL SIMPAN -->
            <!-- ================================= -->

            <button
                onclick="simpan(${i})"
            >
                Simpan Hasil
            </button>

        </div>

        `;


        // Setelah HTML dibuat,
        // tampilkan dropdown pencetak gol
        updatePencetakGol(i);

    });

}


// =====================================================
// UPDATE PENCETAK GOL
// =====================================================

function updatePencetakGol(i) {

    const container =
        document.getElementById(`pencetak_${i}`);

    if (!container) return;


    const pertandingan = jadwal[i];

    if (!pertandingan) return;


    // -----------------------------------------
    // AMBIL DATA HASIL SEBELUMNYA
    // -----------------------------------------

    const data = hasil.find(
        x => Number(x.no) === i
    );


    // -----------------------------------------
    // AMBIL SKOR
    // -----------------------------------------

    const inputGol1 =
        document.getElementById(`g1_${i}`);

    const inputGol2 =
        document.getElementById(`g2_${i}`);


    if (!inputGol1 || !inputGol2) return;


    const gol1 =
        Number(inputGol1.value) || 0;

    const gol2 =
        Number(inputGol2.value) || 0;


    // -----------------------------------------
    // BERSIHKAN TAMPILAN LAMA
    // -----------------------------------------

    container.innerHTML = "";


    // =================================================
    // PENCETAK GOL TIM 1
    // =================================================

    if (gol1 > 0) {

        container.innerHTML += `

            <div style="
                margin-bottom:10px;
                padding:10px;
                border:1px solid #ddd;
                border-radius:8px;
            ">

                <b>
                    Pencetak Gol ${pertandingan.tim1}
                </b>

        `;


        for (let n = 0; n < gol1; n++) {

            const pilihanSebelumnya =
                data &&
                Array.isArray(data.pencetakGol1)
                    ? data.pencetakGol1[n] || ""
                    : "";


            container.innerHTML += `

                <div
                    style="
                        margin-top:8px;
                    "
                >

                    <label>
                        Gol ke-${n + 1}
                    </label>

                    <select
                        id="pemain1_${i}_${n}"
                        style="
                            width:220px;
                            padding:6px;
                            margin-left:5px;
                        "
                    >

                        <option value="">
                            -- Pilih pemain --
                        </option>

                        ${
                            dataPemain
                                .filter(
                                    p =>
                                        p.tim ===
                                        pertandingan.tim1
                                )
                                .map(
                                    p => `

                                    <option
                                        value="${p.nama}"
                                        ${
                                            pilihanSebelumnya ===
                                            p.nama
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


        container.innerHTML += `

            </div>

        `;
    }


    // =================================================
    // PENCETAK GOL TIM 2
    // =================================================

    if (gol2 > 0) {

        container.innerHTML += `

            <div style="
                margin-bottom:10px;
                padding:10px;
                border:1px solid #ddd;
                border-radius:8px;
            ">

                <b>
                    Pencetak Gol ${pertandingan.tim2}
                </b>

        `;


        for (let n = 0; n < gol2; n++) {

            const pilihanSebelumnya =
                data &&
                Array.isArray(data.pencetakGol2)
                    ? data.pencetakGol2[n] || ""
                    : "";


            container.innerHTML += `

                <div
                    style="
                        margin-top:8px;
                    "
                >

                    <label>
                        Gol ke-${n + 1}
                    </label>

                    <select
                        id="pemain2_${i}_${n}"
                        style="
                            width:220px;
                            padding:6px;
                            margin-left:5px;
                        "
                    >

                        <option value="">
                            -- Pilih pemain --
                        </option>

                        ${
                            dataPemain
                                .filter(
                                    p =>
                                        p.tim ===
                                        pertandingan.tim2
                                )
                                .map(
                                    p => `

                                    <option
                                        value="${p.nama}"
                                        ${
                                            pilihanSebelumnya ===
                                            p.nama
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


        container.innerHTML += `

            </div>

        `;
    }

}


// =====================================================
// SIMPAN HASIL PERTANDINGAN
// =====================================================

function simpan(i) {

    const pertandingan = jadwal[i];


    if (!pertandingan) {

        alert(
            "Data pertandingan tidak ditemukan."
        );

        return;
    }


    // -----------------------------------------
    // AMBIL SKOR
    // -----------------------------------------

    const inputGol1 =
        document.getElementById(`g1_${i}`);

    const inputGol2 =
        document.getElementById(`g2_${i}`);


    if (!inputGol1 || !inputGol2) {

        alert(
            "Input skor tidak ditemukan."
        );

        return;
    }


    const nilaiGol1 =
        inputGol1.value;

    const nilaiGol2 =
        inputGol2.value;


    // -----------------------------------------
    // CEK SKOR
    // -----------------------------------------

    if (
        nilaiGol1 === "" ||
        nilaiGol2 === ""
    ) {

        alert(
            "Masukkan skor terlebih dahulu."
        );

        return;
    }


    const gol1 =
        Number(nilaiGol1);

    const gol2 =
        Number(nilaiGol2);


    if (
        !Number.isInteger(gol1) ||
        !Number.isInteger(gol2)
    ) {

        alert(
            "Skor harus berupa angka."
        );

        return;
    }


    if (
        gol1 < 0 ||
        gol2 < 0
    ) {

        alert(
            "Skor tidak boleh negatif."
        );

        return;
    }


    // =================================================
    // AMBIL PENCETAK GOL TIM 1
    // =================================================

    const pencetakGol1 = [];


    for (
        let n = 0;
        n < gol1;
        n++
    ) {

        const select =
            document.getElementById(
                `pemain1_${i}_${n}`
            );


        if (
            !select ||
            select.value === ""
        ) {

            alert(
                `Pilih pencetak gol ke-${n + 1} untuk ${pertandingan.tim1}.`
            );

            return;
        }


        pencetakGol1.push(
            select.value
        );
    }


    // =================================================
    // AMBIL PENCETAK GOL TIM 2
    // =================================================

    const pencetakGol2 = [];


    for (
        let n = 0;
        n < gol2;
        n++
    ) {

        const select =
            document.getElementById(
                `pemain2_${i}_${n}`
            );


        if (
            !select ||
            select.value === ""
        ) {

            alert(
                `Pilih pencetak gol ke-${n + 1} untuk ${pertandingan.tim2}.`
            );

            return;
        }


        pencetakGol2.push(
            select.value
        );
    }


    // =================================================
    // HAPUS DATA LAMA
    // =================================================

    hasil =
        hasil.filter(
            x =>
                Number(x.no) !== i
        );


    // =================================================
    // SIMPAN DATA BARU
    // =================================================

    hasil.push({

        no: i,

        grup:
            pertandingan.grup,

        tim1:
            pertandingan.tim1,

        tim2:
            pertandingan.tim2,

        gol1:
            gol1,

        gol2:
            gol2,

        // DATA BARU UNTUK TOP SKOR
        pencetakGol1:
            pencetakGol1,

        pencetakGol2:
            pencetakGol2

    });


    // =================================================
    // SIMPAN KE LOCAL STORAGE
    // =================================================

    localStorage.setItem(
        "hasil",
        JSON.stringify(hasil)
    );


    alert(
        "Hasil pertandingan dan pencetak gol berhasil disimpan."
    );


    // Refresh tampilan
    tampilkan();

}