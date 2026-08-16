const tombol = document.getElementById("btnHitung");
const hasil = document.getElementById("hasilKlasemen");

tombol.addEventListener("click", function () {

    hasil.innerHTML = "";

    // ==========================================
    // AMBIL HASIL PERTANDINGAN
    // ==========================================

    const hasilPertandingan =
        JSON.parse(localStorage.getItem("hasil")) || [];


    // ==========================================
    // DATA GRUP
    // ==========================================

    const grup = {

        A: [
            "THABET FC",
            "KKL FC",
            "BARETA LEGEND FC",
            "PERSEMA FC"
        ],

        B: [
            "DAMAR FC RW 4",
            "SATELIT FC RW 4",
            "BARETA FC"
        ],

        C: [
            "DARAHAN FC",
            "CALIFORNIA FC RW 5",
            "RANGKAS JAYA FC",
            "PEMUDA RW 3 FC"
        ]

    };


    // ==========================================
    // TIM TERBAWAH YANG HASILNYA TIDAK DIHITUNG
    // ==========================================

    const timDikecualikan = {

        A: "BARETA LEGEND FC",

        B: null,

        C: "DARAHAN FC"

    };


    // ==========================================
    // PENYIMPAN KLASemen
    // ==========================================

    let semuaGrup = {};


    // ==========================================
    // PROSES SETIAP GRUP
    // ==========================================

    for (let namaGrup in grup) {

        let klasemen = [];


        // ======================================
        // BUAT DATA AWAL SETIAP TIM
        // ======================================

        grup[namaGrup].forEach(nama => {

            klasemen.push({

                nama: nama,

                main: 0,

                menang: 0,

                seri: 0,

                kalah: 0,

                gm: 0,

                gk: 0,

                sg: 0,

                poin: 0

            });

        });


        // ======================================
        // TIM TERBAWAH GRUP
        // ======================================

        const timTerbawah =
            timDikecualikan[namaGrup];


        // ======================================
        // HITUNG HASIL PERTANDINGAN
        // ======================================

        hasilPertandingan.forEach(h => {

            const t1 =
                klasemen.find(x => x.nama === h.tim1);

            const t2 =
                klasemen.find(x => x.nama === h.tim2);


            // Bukan pertandingan grup ini
            if (!t1 || !t2) return;


            // ==================================
            // JIKA MELAWAN TIM TERBAWAH
            // MAKA TIDAK DIHITUNG
            // ==================================

            if (
                timTerbawah &&
                (
                    h.tim1 === timTerbawah ||
                    h.tim2 === timTerbawah
                )
            ) {

                return;

            }


            // ==================================
            // HITUNG MAIN
            // ==================================

            t1.main++;
            t2.main++;


            // ==================================
            // HITUNG GOL
            // ==================================

            t1.gm += Number(h.gol1);
            t1.gk += Number(h.gol2);

            t2.gm += Number(h.gol2);
            t2.gk += Number(h.gol1);


            // ==================================
            // HITUNG POIN
            // ==================================

            if (Number(h.gol1) > Number(h.gol2)) {

                t1.menang++;
                t2.kalah++;

                t1.poin += 3;

            }

            else if (Number(h.gol2) > Number(h.gol1)) {

                t2.menang++;
                t1.kalah++;

                t2.poin += 3;

            }

            else {

                t1.seri++;
                t2.seri++;

                t1.poin++;
                t2.poin++;

            }

        });


        // ======================================
        // HITUNG SELISIH GOL
        // ======================================

        klasemen.forEach(t => {

            t.sg = t.gm - t.gk;

        });


        // ======================================
        // URUTKAN KLASEMEN
        // ======================================

        // ==========================================
// URUTKAN KLASEMEN
// TIM TERBAWAH SELALU DI POSISI TERAKHIR
// ==========================================

klasemen.sort((a, b) => {

    // ======================================
    // 0. TIM TERBAWAH SELALU TERAKHIR
    // ======================================

    if (timTerbawah) {

        if (a.nama === timTerbawah && b.nama !== timTerbawah) {
            return 1;
        }

        if (b.nama === timTerbawah && a.nama !== timTerbawah) {
            return -1;
        }
    }


    // ======================================
    // 1. POIN
    // ======================================

    if (b.poin !== a.poin) {
        return b.poin - a.poin;
    }


    // ======================================
    // 2. SELISIH GOL
    // ======================================

    if (b.sg !== a.sg) {
        return b.sg - a.sg;
    }


    // ======================================
    // 3. GOL MEMASUKKAN
    // ======================================

    if (b.gm !== a.gm) {
        return b.gm - a.gm;
    }


    // ======================================
    // 4. NAMA TIM
    // ======================================

    return a.nama.localeCompare(b.nama);

});


        // ======================================
        // SIMPAN DATA GRUP
        // ======================================

        semuaGrup[namaGrup] = klasemen;


        // ======================================
        // TAMPILKAN KLASEMEN
        // ======================================

        hasil.innerHTML += `

            <h2>GRUP ${namaGrup}</h2>

            ${
                timTerbawah
                    ? `
                        <p style="
                            background:#fff3cd;
                            padding:10px;
                            border-radius:6px;
                        ">
                            ⚠️ Hasil pertandingan melawan
                            <b>${timTerbawah}</b>
                            tidak dihitung dalam klasemen.
                        </p>
                    `
                    : ""
            }

            <table
                border="1"
                width="100%"
                cellspacing="0"
                cellpadding="5"
            >

                <tr>

                    <th>Pos</th>
                    <th>Tim</th>
                    <th>M</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>GM</th>
                    <th>GK</th>
                    <th>SG</th>
                    <th>Poin</th>

                </tr>


                ${klasemen.map((t, i) => `

                    <tr>

                        <td>${i + 1}</td>

                        <td>
                            ${t.nama}
                        </td>

                        <td>
                            ${t.main}
                        </td>

                        <td>
                            ${t.menang}
                        </td>

                        <td>
                            ${t.seri}
                        </td>

                        <td>
                            ${t.kalah}
                        </td>

                        <td>
                            ${t.gm}
                        </td>

                        <td>
                            ${t.gk}
                        </td>

                        <td>
                            ${t.sg}
                        </td>

                        <td>
                            <b>${t.poin}</b>
                        </td>

                    </tr>

                `).join("")}

            </table>

            <br><br>

        `;

    }


    // ==========================================
    // SIMPAN KLASEMEN
    // ==========================================

    localStorage.setItem(
        "klasemen",
        JSON.stringify(semuaGrup)
    );


    // ==========================================
    // AMBIL RUNNER-UP SETIAP GRUP
    // ==========================================

    const runnerUpA = semuaGrup.A[1];
    const runnerUpB = semuaGrup.B[1];
    const runnerUpC = semuaGrup.C[1];


    // ==========================================
    // DATA RUNNER-UP
    // ==========================================

    const daftarRunnerUp = [

        {
            grup: "A",
            ...runnerUpA
        },

        {
            grup: "B",
            ...runnerUpB
        },

        {
            grup: "C",
            ...runnerUpC
        }

    ];


    // ==========================================
    // TENTUKAN RUNNER-UP TERBAIK
    // ==========================================

    daftarRunnerUp.sort((a, b) => {

        // POIN
        if (b.poin !== a.poin) {

            return b.poin - a.poin;

        }


        // SELISIH GOL
        if (b.sg !== a.sg) {

            return b.sg - a.sg;

        }


        // GOL MEMASUKKAN
        if (b.gm !== a.gm) {

            return b.gm - a.gm;

        }


        // NAMA
        return a.nama.localeCompare(b.nama);

    });


    const runnerUpTerbaik = daftarRunnerUp[0];


    // ==========================================
    // SIMPAN RUNNER-UP TERBAIK
    // ==========================================

    localStorage.setItem(
        "runnerUpTerbaik",
        JSON.stringify(runnerUpTerbaik)
    );


    // ==========================================
    // TAMPILKAN RUNNER-UP TERBAIK
    // ==========================================

    hasil.innerHTML += `

        <div
            class="card"
            style="
                margin-top:20px;
                padding:20px;
                background:#e8f5e9;
                border-radius:10px;
            "
        >

            <h2>
                🏆 RUNNER-UP TERBAIK
            </h2>

            <h1>
                ${runnerUpTerbaik.nama}
            </h1>

            <p>
                Grup ${runnerUpTerbaik.grup}
            </p>

            <p>

                <b>
                    ${runnerUpTerbaik.poin}
                </b>
                Poin

                &nbsp; | &nbsp;

                <b>
                    ${runnerUpTerbaik.sg}
                </b>
                SG

                &nbsp; | &nbsp;

                <b>
                    ${runnerUpTerbaik.gm}
                </b>
                GM

            </p>

        </div>

    `;


    // ==========================================
    // KONFIRMASI
    // ==========================================

    alert(
        "Klasemen berhasil dihitung.\n\n" +

        "Runner-up Grup A: " +
        runnerUpA.nama + "\n" +

        "Runner-up Grup B: " +
        runnerUpB.nama + "\n" +

        "Runner-up Grup C: " +
        runnerUpC.nama + "\n\n" +

        "Runner-up terbaik: " +
        runnerUpTerbaik.nama
    );

});