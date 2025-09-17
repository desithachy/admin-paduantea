function bulkDelete(btn) {
    let checked = document.querySelectorAll('.checkbox:checked');
    if (checked.length === 0) {
        alert("Pilih minimal satu data untuk dihapus!");
        return;
    }

    if (!confirm("Yakin ingin menghapus data yang dipilih?")) return;

    let ids = [];
    checked.forEach(cb => {
        ids.push(cb.value);
    });

    // ambil info dari tombol
    let table = btn.getAttribute("data-table");
    let idField = btn.getAttribute("data-idfield");

    fetch("delete.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            table: table,
            idField: idField,
            ids: ids
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert("Data berhasil dihapus!");
            location.reload();
        } else {
            alert("Gagal menghapus data: " + (data.error || ""));
        }
    });
}
