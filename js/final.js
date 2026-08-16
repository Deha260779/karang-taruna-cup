// ==========================================
// MODUL FINAL
// Menentukan peserta pertandingan final
// ==========================================



// ==========================================
// CEK ELEMENT HTML
// ==========================================

const div = document.getElementById("finalContainer");


// ==========================================
// AMBIL HASIL SEMIFINAL
// ==========================================

const hasilSemifinal =
    JSON.parse(localStorage.getItem("hasilSemifinal")) || [];


// ==========================================
// VALIDASI DATA SEMIFINAL
// ==========================================

if (!Array.isArray(hasilSemifinal)) {

    div.innerHTML = `
        <div class="card">

            <h2>⚠️ FINAL BELUM TERSEDIA</h2>

            <p>
                Data hasil semifinal tidak valid.
            </p>

        </div>
    `;

} else {

    // ==========================================
    // AMBIL SEMIFINAL 1
    // ==========================================

    const semifinal1 =
        hasilSemifinal.find(
            data => Number(data.no) === 1
        );


    // ==========================================
    // AMBIL SEMIFINAL 2
    // ==========================================

    const semifinal2 =
        hasilSemifinal.find(
            data => Number(data.no) === 2
        );


    // ==========================================
    // CEK PEMENANG SEMIFINAL
    // ==========================================

    if (
        !semifinal1 ||
        !semifinal2 ||
        !semifinal1.pemenang ||
        !semifinal2.pemenang
    ) {

        div.innerHTML = `
            <div class="card">

                <h2>⚠️ FINAL BELUM LENGKAP</h2>

                <p>
                    Kedua pertandingan semifinal
                    harus memiliki pemenang terlebih dahulu.
                </p>

            </div>
        `;

    } else {


        // ==========================================
        // AMBIL FINALIS
        // ==========================================

        const tim1 = semifinal1.pemenang;
        const tim2 = semifinal2.pemenang;


        // ==========================================
        // CEK FINALIS TIDAK BOLEH SAMA
        // ==========================================

        if (tim1 === tim2) {

            div.innerHTML = `
                <div class="card">

                    <h2>⚠️ DATA FINAL TIDAK VALID</h2>

                    <p>
                        Pemenang kedua semifinal tidak boleh
                        berasal dari tim yang sama.
                    </p>

                </div>
            `;

        } else {


            // ==========================================
            // DATA PESERTA FINAL
            // ==========================================

            const dataFinal = {

                fase: "FINAL",

                tim1: tim1,

                tim2: tim2

            };


            // ==========================================
            // SIMPAN PESERTA FINAL
            // ==========================================

            localStorage.setItem(
                "pesertaFinal",
                JSON.stringify(dataFinal)
            );


            // ==========================================
            // TAMPILKAN FINAL
            // ==========================================

            div.innerHTML = `

                <div class="card">

                    <h2>🏆 FINAL</h2>

                    <p>
                        Peserta pertandingan final
                    </p>

                    <div style="
                        display:flex;
                        justify-content:center;
                        align-items:center;
                        gap:25px;
                        margin:35px 0;
                        flex-wrap:wrap;
                    ">

                        <div style="
                            background:#f1f5ff;
                            padding:20px;
                            border-radius:10px;
                            min-width:220px;
                            font-size:20px;
                            font-weight:bold;
                            text-align:center;
                        ">
                            ${tim1}
                        </div>


                        <div style="
                            font-size:24px;
                            font-weight:bold;
                        ">
                            VS
                        </div>


                        <div style="
                            background:#f1f5ff;
                            padding:20px;
                            border-radius:10px;
                            min-width:220px;
                            font-size:20px;
                            font-weight:bold;
                            text-align:center;
                        ">
                            ${tim2}
                        </div>

                    </div>


                    <div style="
                        margin-top:20px;
                        padding:15px;
                        background:#e8f5e9;
                        border-radius:8px;
                        text-align:center;
                    ">

                        ✅ Pertandingan final telah ditetapkan.

                        <br><br>

                        <strong>
                            ${tim1} VS ${tim2}
                        </strong>

                    </div>

                </div>

            `;

        }

    }

}