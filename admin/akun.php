<?php
include "koneksi.php";

// kalau dipanggil dengan ?ajax=1, kirim data JSON untuk admin.js
$queryRead = "SELECT * FROM akun";
$resultQuery = mysqli_query($conn, $queryRead);
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PaduanTea Dashboard</title>
    <link rel="stylesheet" href="admin.css" />
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <div class="container">
      <!-- Sidebar -->
      <nav class="sidebar">
        <div class="logo">Paduan<span>Tea</span></div>
        <div class="nav-menu">
          <a href="#" class="nav-item active"
            ><i class="fas fa-user"></i> Akun</a
          >
          <a href="#" class="nav-item"
            ><i class="fas fa-history"></i> History Pembelian</a
          >
          <a href="#" class="nav-item"
            ><i class="fas fa-shopping-cart"></i> Keranjang</a
          >
          <a href="#" class="nav-item"
            ><i class="fas fa-sign-in-alt"></i> Log Login</a
          >
          <a href="#" class="nav-item"
            ><i class="fas fa-map-marker-alt"></i> Lokasi Outlet</a
          >
          <a href="#" class="nav-item"><i class="fas fa-utensils"></i> Menu</a>
          <a href="#" class="nav-item"
            ><i class="fas fa-shopping-bag"></i> Order
            <span class="badge">19</span></a
          >
          <a href="#" class="nav-item"
            ><i class="fas fa-file-alt"></i> Order Detail</a
          >
          <a href="#" class="nav-item"
            ><i class="fas fa-ticket-alt"></i> Voucher</a
          >
        </div>
      </nav>

      <!-- Main Content -->
      <main class="main-content">
        <!-- Stats Cards -->
        <div class="stats-cards">
          <div class="stat-card">
            <i class="fas fa-user"></i>
            <span id="totalUsers">0</span>
          </div>
          <div class="stat-card">
            <i class="fas fa-shopping-bag"></i>
            <span id="totalOrders">0</span>
          </div>
          <div class="stat-card">
            <i class="fas fa-sync-alt"></i>
            <span id="activeUsers">0</span>
          </div>
          <div class="stat-card">
            <i class="fas fa-shopping-cart"></i>
            <span id="inactiveUsers">0</span>
          </div>
        </div>

        <!-- Breadcrumb -->
        <div class="breadcrumb">
          <i class="fas fa-home"></i>
          <a href="#">E-Commerce</a>
          <i class="fas fa-chevron-right"></i>
          <span>Customers</span>
        </div>

        <!-- Page Header -->
        <div class="content-header">
          <h1 class="page-title">Customers (<span id="totalCustomers">0</span>)</h1>
          <div>
            <button class="actions-btn" onclick="printTable()"><i class="fas fa-print"></i></button>
            <button class="actions-btn" onclick="downloadCSV()"><i class="fas fa-download"></i></button>
          </div>
        </div>

        <!-- Filters -->
        <div class="filters">
          <div class="filter-group">
            <label>Status</label>
            <select class="filter-select" id="statusFilter">
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div class="search-container">
            <i class="fas fa-search"></i>
            <input
              type="text"
              class="search-input"
              placeholder="Search customer"
            />
          </div>
          <button class="add-btn">
            <i class="fas fa-plus"></i> Add Customer
          </button>
        </div>

        <div class="bulk-actions">
  <button class="btn-accept" onclick="bulkAccept()" >Accept Selected</button>
  <button class="btn-delete" onclick="bulkDelete(this)" data-table="akun" data-idfield="id_akun">Delete Selected</button>
</div>


        <!-- Table -->
        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th><input type="checkbox" id="selectAll" /></th>
                <!-- <th>#</th> -->
                <th>Nama</th>
                <th>Email</th>
                <th>Password</th>
                <th>No HP</th>
                <th>Alamat</th>
              </tr>
            </thead>
            <tbody>
              <?php
               $i = 1;
            while ($list = mysqli_fetch_assoc($resultQuery)) {
                echo "
                <tr>
                    <td><input type='checkbox' class='checkbox' value='{$list['id_akun']}' id='select{$i}' /></td>
                    <td>{$list['nama']}</td>
                    <td>{$list['email']}</td>
                    <td>{$list['PASSWORD']}</td>
                    <td>{$list['no_hp']}</td>
                    <td>{$list['alamat']}</td>
                </tr>";
                $i++;
            }
                ?>

            </tbody>
          </table>
        </div>

        <div class="pagination">
          <div class="pagination-info">Showing 0 of 0 entries</div>
        </div>
      </main>
    </div>

    <script src="testing.js"></script>
  </body>
</html>
