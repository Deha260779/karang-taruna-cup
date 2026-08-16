const hasilAkhir = document.getElementById("hasilAkhir");


// =====================================================
// AMBIL DATA FINAL
// =====================================================

const hasilFinalData =
    JSON.parse(localStorage.getItem("hasilFinal")) || null;


// =====================================================
// AMBIL DATA SEMIFINAL
// =====================================================

const hasilSemifinal =
    JSON.parse(localStorage.getItem("hasilSemifinal")) || [];


// =====================================================
// CEK DATA FINAL
// =====================================================

if (!hasilFinalData) {

    hasilAkhir.innerHTML = `
        <p style="color:red;">
            Data hasil final belum tersedia.
        </p>
    `;

    throw new Error("Data hasilFinal belum tersedia.");
}


// =====================================================
// AMBIL DATA PERTANDINGAN FINAL
// =====================================================


const finalData = Array.isArray(hasilFinalData)
    ? hasilFinalData[0]
    : hasilFinalData;


// =====================================================
// CEK DATA FINAL
// =====================================================

if (!finalData) {

    hasilAkhir.innerHTML = `
        <p style="color:red;">
            Data pertandingan final tidak ditemukan.
        </p>
    `;

    throw new Error(
        "Data pertandingan final tidak ditemukan."
    );
}


// =====================================================
// AMBIL NAMA TIM FINAL
// =====================================================

const timFinal1 = finalData.tim1;
const timFinal2 = finalData.tim2;


// =====================================================
// AMBIL SKOR FINAL
// =====================================================

const golFinal1 = Number(finalData.gol1);
const golFinal2 = Number(finalData.gol2);



// =====================================================
// TENTUKAN JUARA DAN RUNNER-UP
// =====================================================

let juara = "";
let runnerUp = "";

if (golFinal1 > golFinal2) {

    juara = timFinal1;
    runnerUp = timFinal2;

} else if (golFinal2 > golFinal1) {

    juara = timFinal2;
    runnerUp = timFinal1;

} else {

    juara = "BELUM DITENTUKAN";
    runnerUp = "BELUM DITENTUKAN";
}


// =====================================================
// CARI TIM YANG KALAH DI SEMIFINAL
// =====================================================

let semifinalisKalah = [];

hasilSemifinal.forEach(function (pertandingan) {

    const gol1 = Number(pertandingan.gol1);
    const gol2 = Number(pertandingan.gol2);

    if (gol1 > gol2) {

        semifinalisKalah.push(pertandingan.tim2);

    } else if (gol2 > gol1) {

        semifinalisKalah.push(pertandingan.tim1);

    }

});


// =====================================================
// BUANG TIM YANG SUDAH MASUK FINAL
// =====================================================

semifinalisKalah = semifinalisKalah.filter(function (tim) {

    return tim !== juara && tim !== runnerUp;

});


// =====================================================
// HILANGKAN DATA DUPLIKAT
// =====================================================

semifinalisKalah = [...new Set(semifinalisKalah)];


// =====================================================
// BUAT DATA PERINGKAT
// =====================================================

const peringkat = [
    {
        posisi: 1,
        tim: juara,
        status: "JUARA"
    },

    {
        posisi: 2,
        tim: runnerUp,
        status: "RUNNER-UP"
    },

    {
        posisi: 3,
        tim: semifinalisKalah[0] || "--",
        status: "JUARA 3 BERSAMA"
    },

    {
        posisi: 3,
        tim: semifinalisKalah[1] || "--",
        status: "JUARA 3 BERSAMA"
    }
];


// =====================================================
// TAMPILKAN HASIL
// =====================================================

hasilAkhir.innerHTML = `

<table>

    <tr>
        <th>PERINGKAT</th>
        <th>TIM</th>
        <th>STATUS</th>
    </tr>

    ${peringkat.map(function (data) {

        return `
            <tr>

                <td class="juara">
                    ${data.posisi}
                </td>

                <td class="juara">
                    ${data.tim}
                </td>

                <td>
                    ${data.status}
                </td>

            </tr>
        `;

    }).join("")}

</table>

`;


// =====================================================
// SIMPAN KLASEMEN AKHIR
// =====================================================

localStorage.setItem(
    "klasemenAkhir",
    JSON.stringify(peringkat)
);