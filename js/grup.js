const tombol = document.getElementById("btnAcak");
const hasil = document.getElementById("hasilGrup");

tombol.addEventListener("click", function () {

    const grup = [
        [
            "THABET FC",
            "KKL FC",
            "BARETA LEGEND FC",
            "PERSEMA FC"
        ],
        [
            "DAMAR FC RW 4",
            "SATELIT FC RW 4",
            "BARETA FC"
        ],
        [
            "DARAHAN FC",
            "CALIFORNIA FC RW 5",
            "RANGKAS JAYA FC",
            "PEMUDA RW 3 FC"
        ]
    ];

    hasil.innerHTML = "";

    for (let i = 0; i < grup.length; i++) {

        hasil.innerHTML += `
        <h3>Grup ${String.fromCharCode(65 + i)}</h3>
        <ol>
            ${grup[i].map(nama => `<li>${nama}</li>`).join("")}
        </ol>
        <hr>
        `;
    }

    localStorage.setItem("dataGrup", JSON.stringify(grup));

    alert("Pembagian grup berhasil disimpan.");
});