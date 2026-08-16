// ======================================
// KARANG TARUNA CUP MANAGER
// MODUL PEMAIN
// Versi 1.0
// ======================================

const pilihTim = document.getElementById("pilihTim");
const namaPemain = document.getElementById("namaPemain");
const btnTambah = document.getElementById("btnTambah");
const daftarPemain = document.getElementById("daftarPemain");

// ambil data
const dataTim = DB.get("dataTim", []);
let dataPemain = DB.get("dataPemain", []);

// ==============================
// LOAD
// ==============================

loadTim();

pilihTim.addEventListener("change", tampilkanPemain);

btnTambah.addEventListener("click", tambahPemain);

// ==============================
// LOAD TIM
// ==============================

function loadTim(){

    pilihTim.innerHTML =
    `<option value="">-- Pilih Tim --</option>`;

    dataTim.forEach(tim=>{

        pilihTim.innerHTML +=
        `<option value="${tim}">
            ${tim}
        </option>`;

    });

}

// ==============================
// TAMBAH PEMAIN
// ==============================

function tambahPemain(){

    const tim = pilihTim.value;

    const nama = namaPemain.value.trim();

    if(tim===""){

        alert("Pilih tim terlebih dahulu");

        return;

    }

    if(nama===""){

        alert("Nama pemain belum diisi");

        return;

    }

    const sudahAda = dataPemain.find(p =>
    p.tim === tim &&
    p.nama.toLowerCase() === nama.toLowerCase()
);

if(sudahAda){
    alert("Nama pemain sudah ada pada tim ini.");
    return;
}

    dataPemain.push({

        id: Date.now(),

        tim: tim,

        nama: nama

    });

    DB.set("dataPemain", dataPemain);

    namaPemain.value="";

    tampilkanPemain();

}

// ==============================
// TAMPILKAN PEMAIN
// ==============================

function tampilkanPemain(){

    daftarPemain.innerHTML="";

    const tim = pilihTim.value;

    if(tim==="") return;

    const pemainTim = dataPemain.filter(p=>p.tim===tim);

    if(pemainTim.length===0){

        daftarPemain.innerHTML =
        "<i>Belum ada pemain.</i>";

        return;

    }

    pemainTim.forEach((p,i)=>{

        daftarPemain.innerHTML += `

<div class="card"
style="
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:10px;
padding:10px;
">

<div>

${i+1}. ${p.nama}

</div>

<div>

<button onclick="editPemain(${p.id})">

✏️

</button>

<button
style="background:#d32f2f;margin-left:5px;"
onclick="hapusPemain(${p.id})">

🗑️

</button>

</div>

</div>

`;

    });

}

// ==============================
// EDIT PEMAIN
// ==============================

function editPemain(id){

    const pemain = dataPemain.find(p => p.id === id);

    if(!pemain) return;

    const namaBaru = prompt(
        "Edit nama pemain",
        pemain.nama
    );

    if(namaBaru === null) return;

    if(namaBaru.trim() === "") return;

    pemain.nama = namaBaru.trim();

    DB.set("dataPemain", dataPemain);

    tampilkanPemain();

}

// ==============================
// HAPUS PEMAIN
// ==============================

function hapusPemain(id){

    const yakin = confirm(
        "Yakin ingin menghapus pemain ini?"
    );

    if(!yakin) return;

    dataPemain =
        dataPemain.filter(p => p.id !== id);

    DB.set("dataPemain", dataPemain);

    tampilkanPemain();

}