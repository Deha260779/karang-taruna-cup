// ==========================================
// HASIL FINAL
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const hasilDiv = document.getElementById("hasilFinal");


    // ==========================================
    // CEK ELEMENT HTML
    // ==========================================

    if (!hasilDiv) {

        console.error(
            'Element dengan id="hasilFinal" tidak ditemukan.'
        );

        return;
    }


    // ==========================================
    // AMBIL DATA FINAL
    // ==========================================

    const hasilSemifinal =
    JSON.parse(localStorage.getItem("hasilSemifinal")) || [];

    const semifinal1 =
    hasilSemifinal.find(data => data.no === 1)
    || hasilSemifinal[0];

    const semifinal2 =
    hasilSemifinal.find(data => data.no === 2)
    || hasilSemifinal[1];


    // ==========================================
    // CEK DATA FINAL
    // ==========================================

    // ============================================
// CEK PEMENANG SEMIFINAL
// ============================================

if (!semifinal1 || !semifinal2 ||
    !semifinal1.pemenang || !semifinal2.pemenang) {

    hasilDiv.innerHTML = `
        <div class="card">

            <h2>⚠️ FINAL BELUM LENGKAP</h2>

            <p>
                Pastikan kedua pertandingan semifinal
                sudah memiliki pemenang.
            </p>

        </div>
    `;

    return;
}

// ============================================
// AMBIL FINALIS DARI PEMENANG SEMIFINAL
// ============================================

    const tim1 = semifinal1.pemenang;
    const tim2 = semifinal2.pemenang;

    const dataPemain =
    JSON.parse(localStorage.getItem("dataPemain")) || [];

    // ==========================================
    // TAMPILKAN FORM SKOR FINAL
    // ==========================================

    hasilDiv.innerHTML = `

        <div class="card">

            <h2>FINAL</h2>

            <div style="
                display:flex;
                justify-content:center;
                align-items:center;
                gap:15px;
                margin:30px 0;
                font-size:20px;
                font-weight:bold;
            ">

                <span>${tim1}</span>

                <input
                    type="number"
                    id="golFinal1"
                    min="0"
                    style="
                        width:60px;
                        padding:8px;
                        text-align:center;
                        font-size:20px;
                    "
                >

                <span>VS</span>

                <input
                    type="number"
                    id="golFinal2"
                    min="0"
                    style="
                        width:60px;
                        padding:8px;
                        text-align:center;
                        font-size:20px;
                    "
                >

                <span>${tim2}</span>

            </div>
            <hr>

<div id="pencetakGolContainer1"></div>

<div id="pencetakGolContainer2"></div>

</div>


            <button
                id="btnSimpanFinal"
                style="
                    background:#1769e0;
                    color:white;
                    border:none;
                    padding:12px 30px;
                    border-radius:8px;
                    font-size:16px;
                    cursor:pointer;
                "
            >
                Simpan
            </button>

        </div>

    `;
    // =====================================================
// AMBIL SELECT PENCETAK GOL DARI CONTAINER PERTANDINGAN
// =====================================================



// =====================================================
// PENCETAK GOL FINAL
// =====================================================

const containerPemain1 =
    document.getElementById("pencetakGolContainer1");

const containerPemain2 =
    document.getElementById("pencetakGolContainer2");


// =====================================================
// FUNGSI MEMBUAT SELECT PENCETAK GOL
// =====================================================

function buatSelectPencetakGol(container, jumlahGol, dataPemainTim, namaTim) {

    if (!container) return;

    container.innerHTML = "";

    if (jumlahGol <= 0) return;


    // Judul
    const judul = document.createElement("h3");

    judul.textContent = "Pencetak Gol " + namaTim;

    container.appendChild(judul);


    // Buat select sesuai jumlah gol
    for (let i = 1; i <= jumlahGol; i++) {

        const wrapper = document.createElement("div");

        wrapper.style.marginBottom = "10px";


        const label = document.createElement("label");

        label.textContent = "Gol ke-" + i + " : ";

        wrapper.appendChild(label);


        const select = document.createElement("select");

        select.className = "pencetak-gol";

        select.dataset.tim = namaTim;

        select.dataset.gol = i;


        // Pilihan awal
        const pilihanAwal = document.createElement("option");

        pilihanAwal.value = "";

        pilihanAwal.textContent = "-- Pilih Pencetak Gol --";

        select.appendChild(pilihanAwal);


        // Masukkan pemain dari tim tersebut
        dataPemainTim.forEach(pemain => {

            const option = document.createElement("option");

            option.value = pemain.nama;

            option.textContent = pemain.nama;

            select.appendChild(option);

        });


        wrapper.appendChild(select);

        container.appendChild(wrapper);

    }
}


// =====================================================
// AMBIL DATA PEMAIN MASING-MASING TIM
// =====================================================

const pemainTim1 =
    dataPemain.filter(p => p.tim === tim1);

const pemainTim2 =
    dataPemain.filter(p => p.tim === tim2);


// =====================================================
// FUNGSI UPDATE PENCETAK GOL
// =====================================================

function updatePencetakGol() {

    const inputGol1 =
        document.getElementById("golFinal1");

    const inputGol2 =
        document.getElementById("golFinal2");

    if (!inputGol1 || !inputGol2) return;


    const jumlahGol1 =
        parseInt(inputGol1.value) || 0;

    const jumlahGol2 =
        parseInt(inputGol2.value) || 0;


    buatSelectPencetakGol(
        containerPemain1,
        jumlahGol1,
        pemainTim1,
        tim1
    );


    buatSelectPencetakGol(
        containerPemain2,
        jumlahGol2,
        pemainTim2,
        tim2
    );
}


// =====================================================
// UPDATE SAAT SKOR DIUBAH
// =====================================================

const inputGol1 =
    document.getElementById("golFinal1");

const inputGol2 =
    document.getElementById("golFinal2");


if (inputGol1) {

    inputGol1.addEventListener(
        "input",
        updatePencetakGol
    );

}


if (inputGol2) {

    inputGol2.addEventListener(
        "input",
        updatePencetakGol
    );

}


// =====================================================
// TAMPILKAN SAAT HALAMAN PERTAMA DIBUKA
// =====================================================

updatePencetakGol();

// =====================================================
// MUAT DATA FINAL YANG SUDAH TERSIMPAN
// =====================================================

function muatHasilFinalTersimpan() {

    const dataTersimpan = localStorage.getItem("hasilFinal");

    if (!dataTersimpan) {
        return;
    }

    try {

        const data = JSON.parse(dataTersimpan);

        if (!Array.isArray(data) || data.length === 0) {
            return;
        }

        const finalData = data[0];

        // Isi skor
        const inputGol1 = document.getElementById("golFinal1");
        const inputGol2 = document.getElementById("golFinal2");

        if (inputGol1) {
            inputGol1.value = finalData.gol1;
        }

        if (inputGol2) {
            inputGol2.value = finalData.gol2;
        }

        // Update jumlah pilihan pencetak gol
        updatePencetakGol();

        // Isi kembali pencetak gol Tim 1
        const selectGol1 = document.querySelectorAll(
            "#pencetakGolContainer1 select"
        );

        if (Array.isArray(finalData.pencetakGol1)) {

            selectGol1.forEach((select, index) => {

                if (finalData.pencetakGol1[index]) {
                    select.value = finalData.pencetakGol1[index];
                }

            });

        }

        // Isi kembali pencetak gol Tim 2
        const selectGol2 = document.querySelectorAll(
            "#pencetakGolContainer2 select"
        );

        if (Array.isArray(finalData.pencetakGol2)) {

            selectGol2.forEach((select, index) => {

                if (finalData.pencetakGol2[index]) {
                    select.value = finalData.pencetakGol2[index];
                }

            });

        }

    } catch (error) {

        console.error(
            "Gagal memuat hasil final:",
            error
        );

    }
}




    // ==========================================
    // EVENT SIMPAN
    // ==========================================

    document
        .getElementById("btnSimpanFinal")
        .addEventListener("click", simpanFinal);


    // ==========================================
    // FUNGSI SIMPAN FINAL
    // ==========================================

    function simpanFinal() {

        const input1 =
            document.getElementById("golFinal1");

        const input2 =
            document.getElementById("golFinal2");


        if (
            input1.value === "" ||
            input2.value === ""
        ) {

            alert("Masukkan skor terlebih dahulu.");

            return;
        }


        const gol1 = Number(input1.value);
        const gol2 = Number(input2.value);

        const pencetakGol1 = Array.from(
        document.querySelectorAll("#pencetakGolContainer1 select")
        ).map(select => select.value);

        const pencetakGol2 = Array.from(
        document.querySelectorAll("#pencetakGolContainer2 select")
        ).map(select => select.value);

        if (gol1 > 0 && pencetakGol1 === "") {
        alert("Pilih pencetak gol " + tim1);
        return;
}

        if (gol2 > 0 && pencetakGol2 === "") {
        alert("Pilih pencetak gol " + tim2);
        return;
}
        // ======================================
        // FINAL TIDAK BOLEH SERI
        // ======================================

        if (gol1 === gol2) {

            alert(
                "Skor final tidak boleh seri."
            );

            return;
        }


        // ======================================
        // TENTUKAN JUARA
        // ======================================

        const juara =
            gol1 > gol2
                ? tim1
                : tim2;


        const runnerUp =
            gol1 > gol2
                ? tim2
                : tim1;


        // ======================================
        // DATA HASIL FINAL
        // ======================================

        const hasilFinal = [{
        no: 1,

        fase: "FINAL",

        tim1: tim1,
        tim2: tim2,

        gol1: gol1,
        gol2: gol2,

        pencetakGol1: pencetakGol1,
        pencetakGol2: pencetakGol2,

        juara: juara,
        pemenang: juara,
        runnerUp: runnerUp
}];


        // ======================================
        // SIMPAN
        // ======================================

        localStorage.setItem(
            "hasilFinal",
            JSON.stringify(hasilFinal)
        );


        // ======================================
        // TAMPILKAN HASIL
        // ======================================

        hasilDiv.innerHTML = `

            <div class="card">

                <h2>🏆 HASIL FINAL</h2>

                <h2>
                    ${tim1}
                    ${gol1}
                    -
                    ${gol2}
                    ${tim2}
                </h2>

                <h2>
                    ${tim1}
                    ${gol1}
                     -
                    ${gol2}
                    ${tim2}
                </h2>

                <div style="margin:20px 0; text-align:left;">

                    <h3>⚽ Pencetak Gol</h3>

                    <p>
                        <strong>${tim1}</strong>:
                         ${
                Array.isArray(pencetakGol1) && pencetakGol1.length > 0
                ? pencetakGol1.filter(nama => nama).join(", ")
                : "-"
        }
                    </p>

                    <p>
                        <strong>${tim2}</strong>:
                        ${
                Array.isArray(pencetakGol2) && pencetakGol2.length > 0
                ? pencetakGol2.filter(nama => nama).join(", ")
                : "-"
        }
    </p>

</div>

<hr>

                <h2>🏆 JUARA</h2>

                <h1>
                    ${juara}
                </h1>

                <h3>
                    🥈 Runner-up:
                    ${runnerUp}
                </h3>

            </div>

        `;

        alert(
            "Hasil final berhasil disimpan.\n\n" +
            "Juara: " + juara
        );

    }
    muatHasilFinalTersimpan();
});