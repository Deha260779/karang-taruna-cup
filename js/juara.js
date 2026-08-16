document.addEventListener("DOMContentLoaded", function () {

    const tombol = document.getElementById("btnJuara");
    const hasilJuara = document.getElementById("hasilJuara");

    // =====================================================
    // CEK ELEMEN
    // =====================================================

    if (!tombol) {
        console.error("Tombol dengan ID btnJuara tidak ditemukan.");
        return;
    }

    if (!hasilJuara) {
        console.error("Div dengan ID hasilJuara tidak ditemukan.");
        return;
    }


    // =====================================================
    // EVENT TOMBOL JUARA
    // =====================================================

    tombol.addEventListener("click", function () {

        // =================================================
        // AMBIL DATA HASIL FINAL
        // =================================================

        const dataTersimpan = localStorage.getItem("hasilFinal");

        // Jika belum ada data
        if (!dataTersimpan) {

            alert("Hasil final belum tersedia.");
            return;
        }


        // =================================================
        // PARSE DATA
        // =================================================

        let data;

        try {

            data = JSON.parse(dataTersimpan);

        } catch (error) {

            console.error("Data hasilFinal tidak valid:", error);

            alert("Data hasil final tidak valid.");
            return;
        }


        // =================================================
        // AMBIL DATA PERTANDINGAN FINAL
        // =================================================

        const finalData = Array.isArray(data)
            ? data[0]
            : data;


        // =================================================
        // CEK DATA FINAL
        // =================================================

        if (!finalData) {

            alert("Data hasil final belum tersedia.");
            return;
        }


        // =================================================
        // AMBIL DATA
        // =================================================

        const tim1 = finalData.tim1;
        const tim2 = finalData.tim2;

        const gol1 = finalData.gol1;
        const gol2 = finalData.gol2;

        const juara = finalData.juara;
        const runnerUp = finalData.runnerUp;


        // =================================================
        // CEK JUARA
        // =================================================

        if (!juara || !runnerUp) {

            alert("Data juara dan runner-up belum tersedia.");
            return;
        }


        // =================================================
        // TAMPILKAN HASIL
        // =================================================

        hasilJuara.innerHTML = `

            <div class="card">

                <h2>🏆 HASIL AKHIR TURNAMEN</h2>

                <h2>
                    ${tim1}
                    ${gol1}
                    -
                    ${gol2}
                    ${tim2}
                </h2>

                <hr>

                <h2>🏆 JUARA</h2>

                <h1>${juara}</h1>

                <h3>
                    🥈 Runner-up: ${runnerUp}
                </h3>

            </div>

        `;

    });

});