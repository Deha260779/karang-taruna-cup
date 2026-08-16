const tombol = document.getElementById("btnJadwal");
const hasil = document.getElementById("hasilJadwal");

tombol.addEventListener("click", function () {

    localStorage.removeItem("jadwal");

    const jadwal = [

        // ===== GRUP A =====
        { grup:"A", tim1:"THABET FC", tim2:"KKL FC" },
        { grup:"A", tim1:"BARETA LEGEND FC", tim2:"PERSEMA FC" },
        { grup:"A", tim1:"THABET FC", tim2:"BARETA LEGEND FC" },
        { grup:"A", tim1:"KKL FC", tim2:"PERSEMA FC" },
        { grup:"A", tim1:"THABET FC", tim2:"PERSEMA FC" },
        { grup:"A", tim1:"KKL FC", tim2:"BARETA LEGEND FC" },

        // ===== GRUP B =====
        { grup:"B", tim1:"DAMAR FC RW 4", tim2:"SATELIT FC RW 4" },
        { grup:"B", tim1:"BARETA FC", tim2:"DAMAR FC RW 4" },
        { grup:"B", tim1:"SATELIT FC RW 4", tim2:"BARETA FC" },

        // ===== GRUP C =====
        { grup:"C", tim1:"DARAHAN FC", tim2:"CALIFORNIA FC RW 5" },
        { grup:"C", tim1:"RANGKAS JAYA FC", tim2:"PEMUDA RW 3 FC" },
        { grup:"C", tim1:"DARAHAN FC", tim2:"RANGKAS JAYA FC" },
        { grup:"C", tim1:"CALIFORNIA FC RW 5", tim2:"PEMUDA RW 3 FC" },
        { grup:"C", tim1:"DARAHAN FC", tim2:"PEMUDA RW 3 FC" },
        { grup:"C", tim1:"CALIFORNIA FC RW 5", tim2:"RANGKAS JAYA FC" }

    ];

    localStorage.setItem("jadwal", JSON.stringify(jadwal));

    hasil.innerHTML = `
    <table border="1" width="100%" cellspacing="0" cellpadding="6">
        <tr>
            <th>No</th>
            <th>Grup</th>
            <th>Pertandingan</th>
        </tr>

        ${jadwal.map((m,i)=>`
        <tr>
            <td>${i+1}</td>
            <td>${m.grup}</td>
            <td>${m.tim1} VS ${m.tim2}</td>
        </tr>
        `).join("")}
    </table>`;

    alert("Jadwal berhasil dibuat.");

});