// =============================
// Data Dummy Customer
// =============================
// let customers = [
//   { id: 1, nama: "Felecia Burke", email: "felecia@mail.com", PASSWORD: "******", no_hp: "081234567890", alamat: "Hong Kong, China", registered: "2018-07-12", status: "Active" },
//   { id: 2, nama: "Sophia Hale", email: "sophia@mail.com", PASSWORD: "******", no_hp: "081234567891", alamat: "New York, USA", registered: "2019-03-20", status: "Active" },
//   { id: 3, nama: "Pamela Garza", email: "pamela@mail.com", PASSWORD: "******", no_hp: "081234567892", alamat: "Boston, USA", registered: "2020-05-15", status: "Inactive" },
//   { id: 4, nama: "Addison James", email: "addison@mail.com", PASSWORD: "******", no_hp: "081234567893", alamat: "Sydney, Australia", registered: "2021-01-10", status: "Active" },
//   { id: 5, nama: "Jamie Rhodes", email: "jamie@mail.com", PASSWORD: "******", no_hp: "081234567894", alamat: "Los Angeles, USA", registered: "2019-07-22", status: "Inactive" }
// ];

let filteredCustomers = [...customers];
let sortDirection = {}; // untuk sort

// =============================
// Render Tabel Customer
// =============================
function renderTable() {
  const tbody = document.querySelector(".table tbody");
  tbody.innerHTML = "";

  tbody.innerHTML = filteredCustomers.map((c, i) => `
    <tr>
      <td><input type="checkbox" class="checkbox" value="${c.id}"></td>
      <td>${i + 1}</td>
      <td>${c.nama}</td>
      <td>${c.email}</td>
      <td>${c.PASSWORD}</td>
      <td>${c.no_hp}</td>
      <td>${c.alamat}</td>
    </tr>
  `).join("");

  // Update info jumlah data
  document.querySelector(".pagination-info").textContent =
    `Showing ${filteredCustomers.length} of ${customers.length} entries`;

  document.getElementById("totalCustomers").textContent = customers.length;

  // 🔄 Update statistik
  updateStats();
}

// =============================
// Filter & Search
// =============================

// 🔍 Pencarian
document.querySelector(".search-input").addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  filteredCustomers = customers.filter(c =>
    c.nama.toLowerCase().includes(term) ||
    c.email.toLowerCase().includes(term) ||
    c.alamat.toLowerCase().includes(term)
  );
  renderTable();
});

// 📌 Filter Status
document.getElementById("statusFilter").addEventListener("change", e => {
  const status = e.target.value;
  filteredCustomers = status === "All" ? [...customers] : customers.filter(c => c.status === status);
  renderTable();
});

// 📌 Filter Berdasarkan Tanggal
function filterByDate() {
  const dates = document.querySelectorAll('.filter-group input[type="date"]');
  const startDate = dates[0].value ? new Date(dates[0].value) : null;
  const endDate = dates[1].value ? new Date(dates[1].value) : null;

  filteredCustomers = customers.filter(c => {
    const regDate = new Date(c.registered);
    if (startDate && regDate < startDate) return false;
    if (endDate && regDate > endDate) return false;
    return true;
  });

  renderTable();
}
document.querySelectorAll('.filter-group input[type="date"]').forEach(input => {
  input.addEventListener("change", filterByDate);
});

// =============================
// Sort Tabel
// =============================
function sortTable(column) {
  sortDirection[column] = sortDirection[column] === "asc" ? "desc" : "asc";
  filteredCustomers.sort((a, b) => {
    let aVal = a[column], bVal = b[column];
    if (typeof aVal === "string") { aVal = aVal.toLowerCase(); bVal = bVal.toLowerCase(); }
    return sortDirection[column] === "asc" ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
  });
  renderTable();
}

// =============================
// Bulk Actions
// =============================
document.getElementById('selectAll').addEventListener('change', function () {
    const checkboxes = document.querySelectorAll('tbody .checkbox');
    checkboxes.forEach(checkbox => checkbox.checked = this.checked);
});

function bulkAccept() {
    const selected = document.querySelectorAll('tbody .checkbox:checked');
    if (!selected.length) return alert("Pilih minimal satu customer!");
    const ids = Array.from(selected).map(cb => cb.value);  // The value here is the id_akun
    customers = customers.map(c => ids.includes(c.id_akun.toString()) ? { ...c, status: "Active" } : c);
    filteredCustomers = [...customers];
    renderTable();
}

function bulkDelete() {
    const selected = document.querySelectorAll('tbody .checkbox:checked');
    if (!selected.length) return alert("Pilih minimal satu customer!");
    if (!confirm("Yakin ingin menghapus customer yang dipilih?")) return;
    const ids = Array.from(selected).map(cb => cb.value);  // The value here is the id_akun
    customers = customers.filter(c => !ids.includes(c.id_akun.toString()));
    filteredCustomers = [...customers];
    renderTable();
}



// =============================
// Checkbox "Select All"
// =============================
function toggleSelectAll(source) {
  document.querySelectorAll('tbody .checkbox').forEach(cb => cb.checked = source.checked);
}

// =============================
// Fungsi Print Tabel
// =============================
function printTable() {
  const tableContent = document.querySelector(".table-container").innerHTML;
  const newWindow = window.open("", "", "width=900,height=700");
  newWindow.document.write(`
    <html>
      <head>
        <title>Print Customers</title>
        <style>
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background: #f9fafb; }
        </style>
      </head>
      <body>
        <h2>Customer List</h2>
        ${tableContent}
      </body>
    </html>
  `);
  newWindow.document.close();
  newWindow.print();
}

// =============================
// Fungsi Export ke CSV
// =============================
function downloadCSV() {
  let csv = "No,Nama,Email,PASSWORD,No HP,Alamat\n";
  customers.forEach((c, i) => {
    csv += `"${i + 1}","${c.nama}","${c.email}","${c.PASSWORD}","${c.no_hp}","${c.alamat}"\n`;
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "customers.csv";
  link.click();
}

// =============================
// Update Statistik Cards
// =============================
function updateStats() {
  const totalUsers = customers.length;
  const activeUsers = customers.filter(c => c.status === "Active").length;
  const inactiveUsers = customers.filter(c => c.status === "Inactive").length;

  document.getElementById("totalUsers").textContent = totalUsers;
  document.getElementById("activeUsers").textContent = activeUsers;
  document.getElementById("inactiveUsers").textContent = inactiveUsers;
}

// =============================
// Init
// =============================
document.addEventListener("DOMContentLoaded", () => {
  renderTable();
  const selectAll = document.getElementById("selectAll");
  if (selectAll) {
    selectAll.addEventListener("change", function () { toggleSelectAll(this); });
  }
});
