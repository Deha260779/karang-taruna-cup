document.addEventListener("DOMContentLoaded", function () {

    const rekapDiv =
        document.getElementById("rekapTurnamen");


    // =========================================
    // AMBIL DATA FINAL
    // =========================================

    const dataFinalTersimpan =
        localStorage.getItem("hasilFinal");


    // =========================================
    // AMBIL DATA SEMIFINAL
    // =========================================

    const dataSemifinalTersimpan =
        localStorage.getItem("hasilSemifinal");


    let hasilFinal = null;
    let hasilSemifinal = [];


    // =========================================
    // PARSE HASIL FINAL
    // =========================================

    if (dataFinalTersimpan) {

        try {

            hasilFinal =
                JSON.parse(dataFinalTersimpan);

        } catch (error) {

            console.error(
                "Data hasilFinal tidak valid:",
                error
            );

        }

    }


    // =========================================
    // PARSE HASIL SEMIFINAL
    // =========================================

    if (dataSemifinalTersimpan) {

        try {

            hasilSemifinal =
                JSON.parse(dataSemifinalTersimpan);

        } catch (error) {

            console.error(
                "Data hasilSemifinal tidak valid:",
                error
            );

            hasilSemifinal = [];

        }

    }


    // =========================================
    // JIKA HASIL FINAL BERUPA ARRAY
    // =========================================

    if (Array.isArray(hasilFinal)) {

        hasilFinal = hasilFinal[0] || null;

    }


    // =========================================
    // CEK HASIL FINAL
    // =========================================

    if (!hasilFinal) {

        rekapDiv.innerHTML = `

            <div class="card kosong">

                <h2>Data turnamen belum lengkap</h2>

                <p>
                    Hasil final belum ditemukan.
                </p>

            </div>

        `;

        return;

    }


    // =========================================
    // TAMPILKAN REKAP UTAMA
    // =========================================

    rekapDiv.innerHTML = `

        <!-- ================================= -->
        <!-- JUARA -->
        <!-- ================================= -->

        <div class="card juara">

            <h2>🏆 JUARA TURNAMEN</h2>

            <h1>
                ${hasilFinal.juara || "BELUM DITENTUKAN"}
            </h1>

            <h3>
                🥈 Runner-up:
                ${hasilFinal.runnerUp || "BELUM DITENTUKAN"}
            </h3>

        </div>


        <!-- ================================= -->
        <!-- HASIL FINAL -->
        <!-- ================================= -->

        <div class="card">

            <h2>🏆 HASIL FINAL</h2>

            <div class="pertandingan">

                ${hasilFinal.tim1}

                ${hasilFinal.gol1}

                -

                ${hasilFinal.gol2}

                ${hasilFinal.tim2}

            </div>

        </div>


        <!-- ================================= -->
        <!-- HASIL SEMIFINAL -->
        <!-- ================================= -->

        <div class="card">

            <h2>⚽ HASIL SEMIFINAL</h2>

            <div id="daftarSemifinal"></div>

        </div>

    `;


    // =========================================
    // AMBIL CONTAINER SEMIFINAL
    // =========================================

    const daftarSemifinal =
        document.getElementById("daftarSemifinal");


    // =========================================
    // CEK DATA SEMIFINAL
    // =========================================

    if (
        !Array.isArray(hasilSemifinal) ||
        hasilSemifinal.length === 0
    ) {

        daftarSemifinal.innerHTML = `

            <div class="kosong">

                Data semifinal belum tersedia.

            </div>

        `;

        return;

    }


    // =========================================
    // TAMPILKAN HASIL SEMIFINAL
    // =========================================

    hasilSemifinal.forEach(function (
        pertandingan,
        index
    ) {

        daftarSemifinal.innerHTML += `

            <div class="semifinal">

                <strong>
                    Semifinal ${index + 1}
                </strong>

                <br>

                ${pertandingan.tim1}

                ${pertandingan.gol1}

                -

                ${pertandingan.gol2}

                ${pertandingan.tim2}

            </div>

        `;

    });

});