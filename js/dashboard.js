const div = document.getElementById("dashboard");

const tim = JSON.parse(localStorage.getItem("tim")) || [];
const jadwal = JSON.parse(localStorage.getItem("jadwal")) || [];
const hasil = JSON.parse(localStorage.getItem("hasil")) || [];
const semifinal = JSON.parse(localStorage.getItem("semifinal")) || [];
const hasilSemifinal = JSON.parse(localStorage.getItem("hasilSemifinal")) || [];
const final = JSON.parse(localStorage.getItem("final")) || [];
const hasilFinal = JSON.parse(localStorage.getItem("hasilFinal")) || [];

div.innerHTML = `

<div class="card">

<h2>📊 Progress Turnamen</h2>

<table border="1" width="100%" cellpadding="8">

<tr>
<td>Total Tim</td>
<td><b>${tim.length}</b></td>
</tr>

<tr>
<td>Pertandingan Grup</td>
<td>${hasil.length} / ${jadwal.length}</td>
</tr>

<tr>
<td>Semifinal</td>
<td>${hasilSemifinal.length} / ${semifinal.length}</td>
</tr>

<tr>
<td>Final</td>
<td>${hasilFinal.length} / ${final.length}</td>
</tr>

</table>

</div>

`;