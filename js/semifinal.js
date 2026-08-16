const tombol = document.getElementById("btnSemifinal");
const hasil = document.getElementById("hasilSemifinal");

if (!tombol || !hasil) {
    console.error("Element semifinal tidak ditemukan.");
} else {

    tombol.addEventListener("click", function () {

        // ==========================================
        // AMBIL DATA KLASEMEN
        // ==========================================

        const klasemen =
            JSON.parse(localStorage.getItem("klasemen"));

        if (!klasemen) {
            alert("Hitung klasemen terlebih dahulu.");
            return;
        }

        // ==========================================
        // AMBIL JUARA SETIAP GRUP
        // ==========================================

        const juaraA = klasemen.A[0];
        const juaraB = klasemen.B[0];
        const juaraC = klasemen.C[0];

        // ==========================================
        // AMBIL RUNNER-UP SETIAP GRUP
        // ==========================================

        const runnerA = klasemen.A[1];
        const runnerB = klasemen.B[1];
        const runnerC = klasemen.C[1];

        // ==========================================
        // CEK DATA
        // ==========================================

        if (!juaraA || !juaraB || !juaraC ||
            !runnerA || !runnerB || !runnerC) {

            alert(
                "Data klasemen belum lengkap.\n\n" +
                "Pastikan semua grup sudah memiliki peringkat."
            );

            return;
        }

        // ==========================================
        // CARI RUNNER-UP TERBAIK
        // URUTAN:
        // 1. Poin
        // 2. Selisih gol
        // 3. Gol memasukkan
        // ==========================================

        const runnerTerbaik = [
            {
                ...runnerA,
                grup: "A"
            },
            {
                ...runnerB,
                grup: "B"
            },
            {
                ...runnerC,
                grup: "C"
            }
        ];

        runnerTerbaik.sort((a, b) => {

            if (Number(b.poin) !== Number(a.poin)) {
                return Number(b.poin) - Number(a.poin);
            }

            if (Number(b.sg) !== Number(a.sg)) {
                return Number(b.sg) - Number(a.sg);
            }

            if (Number(b.gm) !== Number(a.gm)) {
                return Number(b.gm) - Number(a.gm);
            }

            return a.nama.localeCompare(b.nama);
        });

        const terbaik = runnerTerbaik[0];

        // ==========================================
        // BUAT SEMIFINAL
        // ==========================================

        let semifinal = [];

        // ==========================================
        // JIKA RUNNER-UP TERBAIK DARI GRUP A
        //
        // SEMIFINAL 1:
        // JUARA B VS RUNNER-UP A
        //
        // SEMIFINAL 2:
        // JUARA C VS JUARA A
        // ==========================================

        if (terbaik.grup === "A") {

            semifinal.push({

                no: 1,
                fase: "SEMIFINAL",

                tim1: juaraB.nama,
                tim2: runnerA.nama

            });

            semifinal.push({

                no: 2,
                fase: "SEMIFINAL",

                tim1: juaraC.nama,
                tim2: juaraA.nama

            });

        }

        // ==========================================
        // JIKA RUNNER-UP TERBAIK DARI GRUP B
        //
        // SEMIFINAL 1:
        // JUARA A VS JUARA B
        //
        // SEMIFINAL 2:
        // RUNNER-UP B VS JUARA C
        //
        // CONTOH:
        // THABET FC VS BARETA FC
        // DAMAR FC RW 4 VS PEMUDA RW 3 FC
        // ==========================================

        else if (terbaik.grup === "B") {

            semifinal.push({

                no: 1,
                fase: "SEMIFINAL",

                tim1: juaraA.nama,
                tim2: juaraB.nama

            });

            semifinal.push({

                no: 2,
                fase: "SEMIFINAL",

                tim1: runnerB.nama,
                tim2: juaraC.nama

            });

        }

        // ==========================================
        // JIKA RUNNER-UP TERBAIK DARI GRUP C
        //
        // SEMIFINAL 1:
        // JUARA A VS RUNNER-UP C
        //
        // SEMIFINAL 2:
        // JUARA B VS JUARA C
        // ==========================================

        else if (terbaik.grup === "C") {

            semifinal.push({

                no: 1,
                fase: "SEMIFINAL",

                tim1: juaraA.nama,
                tim2: runnerC.nama

            });

            semifinal.push({

                no: 2,
                fase: "SEMIFINAL",

                tim1: juaraB.nama,
                tim2: juaraC.nama

            });

        }

        // ==========================================
        // HAPUS DATA FASE LANJUTAN LAMA
        // ==========================================

        // Hasil semifinal lama harus dihapus
        // agar tidak tercampur dengan semifinal baru
        localStorage.removeItem("hasilSemifinal");

        // Hasil final lama juga harus dihapus
        // karena peserta semifinal bisa berubah
        localStorage.removeItem("hasilFinal");

        // Klasemen akhir lama juga harus dihapus
        localStorage.removeItem("klasemenAkhir");


        // ==========================================
        // SIMPAN SEMIFINAL BARU
        // ==========================================

        localStorage.setItem(
        "semifinal",
        JSON.stringify(semifinal)
        );

        // ==========================================
        // TAMPILKAN
        // ==========================================

        hasil.innerHTML = `

            <div class="card">

                <h2>🏆 SEMIFINAL</h2>

                <p>
                    Runner-up terbaik:
                    <strong>
                        ${terbaik.nama}
                    </strong>
                    dari Grup ${terbaik.grup}
                </p>

                <table
                    border="1"
                    width="100%"
                    cellpadding="8"
                    cellspacing="0"
                >

                    <tr>
                        <th>Semifinal</th>
                        <th>Pertandingan</th>
                    </tr>

                    <tr>
                        <td>SEMIFINAL 1</td>

                        <td>
                            <strong>
                                ${semifinal[0].tim1}
                            </strong>
                            VS
                            <strong>
                                ${semifinal[0].tim2}
                            </strong>
                        </td>
                    </tr>

                    <tr>
                        <td>SEMIFINAL 2</td>

                        <td>
                            <strong>
                                ${semifinal[1].tim1}
                            </strong>
                            VS
                            <strong>
                                ${semifinal[1].tim2}
                            </strong>
                        </td>
                    </tr>

                </table>

            </div>

        `;

        alert(
            "Semifinal berhasil dibuat.\n\n" +
            semifinal[0].tim1 +
            " VS " +
            semifinal[0].tim2 +
            "\n" +
            semifinal[1].tim1 +
            " VS " +
            semifinal[1].tim2
        );

    });

}