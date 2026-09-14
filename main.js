document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("data-container");

  
  if (typeof dataMahasiswa !== "undefined") {
    let htmlContent = `
      <table border="1" cellpadding="8" cellspacing="0">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Mahasiswa</th>
            <th>Nilai</th>
          </tr>
        </thead>
        <tbody>
    `;

    dataMahasiswa.forEach((mahasiswa, index) => {
      htmlContent += `
        <tr>
          <td>${index + 1}</td>
          <td>${mahasiswa.nama}</td>
          <td>${mahasiswa.nilai}</td>
        </tr>
      `;
    });

    htmlContent += `
        </tbody>
      </table>
    `;

    container.innerHTML = htmlContent;
  } else {
    container.innerHTML = "<p>Data mahasiswa tidak ditemukan.</p>";
  }
});