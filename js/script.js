const input = document.getElementById("namaTim");
const tombol = document.getElementById("btnTambah");
const daftar = document.getElementById("daftarTim");

let tim = DB.get("dataTim", []);
let pemain = DB.get("dataPemain", {});
if (daftar) {
    tampilkanTim();
}

tombol.addEventListener("click", function () {

    const nama = input.value.trim();

    if (nama === "") {
        alert("Nama tim belum diisi");
        return;
    }

    tim.push(nama);

    DB.set("dataTim", tim);

    alert("Data berhasil disimpan");

    tampilkanTim();

    input.value = "";
    input.focus();

});

function tampilkanTim() {

    daftar.innerHTML = "";

    for (let i = 0; i < tim.length; i++) {

        daftar.innerHTML += `
        <div style="
            display:flex;
            justify-content:space-between;
            align-items:center;
            margin:10px 0;
            border-bottom:1px solid #ddd;
            padding:8px 0;
        ">
            <span>${i + 1}. ${tim[i]}</span>

            <div>
                <button onclick="editTim(${i})">Edit</button>

                <button onclick="hapusTim(${i})"
                style="background:#d32f2f;margin-left:8px;">
                    Hapus
                </button>
            </div>
        </div>
        `;
    }
}
function editTim(index){

    const namaBaru = prompt("Edit nama tim", tim[index]);

    if(namaBaru === null) return;

    if(namaBaru.trim() === "") return;

    tim[index] = namaBaru.trim();

    DB.set("dataTim", tim);

    tampilkanTim();

}
function hapusTim(index){

    const yakin = confirm(
        "Yakin ingin menghapus tim ini?"
    );

    if(!yakin) return;

    tim.splice(index, 1);

    DB.set("dataTim", tim);

    tampilkanTim();

}