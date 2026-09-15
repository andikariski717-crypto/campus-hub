const input = document.getElementById("searchInput");
const hasil = document.getElementById("searchResult");

input.addEventListener("input", function () {

    const kata = input.value.toLowerCase().trim();

    hasil.innerHTML = "";

    if (kata === "") {
        return;
    }

    dataMahasiswa.forEach(function (mahasiswa) {

        const namaMahasiswa = mahasiswa.nama.toLowerCase();

        if (namaMahasiswa.includes(kata)) {

            const item = document.createElement("div");

            item.innerHTML = mahasiswa.nama;

            item.style.padding = "10px";
            item.style.border = "1px solid black";
            item.style.backgroundColor = "white";
            item.style.cursor = "pointer";

            item.addEventListener("click", function () {

                input.value = mahasiswa.nama;

                hasil.innerHTML = `
                     <div style="padding:10px; border:1px solid black; background:white;">
                      <h3>${mahasiswa.nama}</h3>
                      <p>Nilai: ${mahasiswa.nilai}</p>
                     </div>
                `;
            });

            hasil.appendChild(item);
        }
    });
});