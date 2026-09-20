# Modul 6: Graph (Graf)

> **Mata Kuliah:** Struktur Data | **Durasi:** 2 × 100 menit | **Prasyarat:** Modul 2–3 (Stack, Queue)

## 1. Capaian Pembelajaran

1. Menjelaskan Vertex, Edge, Directed vs Undirected, Weighted vs Unweighted.
2. Mengimplementasikan Adjacency Matrix & Adjacency List.
3. Mengimplementasikan BFS (dengan Queue) dan DFS (dengan Stack/rekursi).
4. Menyelesaikan studi kasus rute terpendek / jaringan sosial.
5. Menjelaskan sejarah Graph (Euler–Königsberg) dan merefleksikan nilai filosofisnya (keterhubungan).

## 2. Sejarah & Nilai Filosofis

**Sejarah singkat.** Teori graf lahir dari teka-teki jembatan! Tahun 1736, **Leonhard Euler** membuktikan warga Königsberg tidak bisa menyeberangi ketujuh jembatan kota tepat sekali lalu kembali ke awal — dan dari bukti itu lahir teori graf (derajat ganjil/genap, Eulerian trail). Dua abad kemudian graf menjadi bahasa universal: peta, jaringan listrik, internet, hingga jejaring sosial. **Edsger Dijkstra (1956/1959)** menemukan algoritma jalur terpendek berbobot (setiap GPS memakainya), sementara BFS/DFS menjadi cara baku menjelajahi graf — BFS dengan queue (Modul 3!), DFS dengan stack/rekursi (Modul 2!). Tanpa graf + BFS, tidak ada Google Maps, tidak ada "saran teman", tidak ada routing paket internet.

**Mengapa graf itu umum?** Karena Tree (Modul 5) hanyalah graf khusus (terhubung, tanpa cycle); Linked List (Modul 4) adalah graf garis; bahkan array adalah graf path. Graf adalah bentuk paling jujur dari relasi: *vertex* (siapa) + *edge* (hubungan apa). Directed vs undirected membedakan relasi simetris (pertemanan: A—B) dan asimetris (follow: A→B); weighted menambahkan *harga* hubungan (jarak, biaya, waktu) — tanpa bobot, "terpendek" berarti tersedikit pemberhentian; dengan bobot, berarti termurah/tercepat.

**Nilai filosofis — tidak ada yang terisolasi.**
- *Derajat = keterhubungan.* `hitungDerajat(v)` menghitung berapa relasi dimiliki seseorang. Graf mengingatkan: nilai vertex ditentukan tetangganya — ilmu, rezeki, dan kesempatan mengalir lewat edge.
- *BFS = melebar sebelum mendalam.* Kunjungi semua tetangga dulu sebelum melompat jauh — etika silaturahmi: utamakan yang dekat (keluarga, tetangga) sebelum yang jauh. BFS pula yang menjamin jalur terpendek: yang sistematis sampai lebih cepat daripada yang serampangan (DFS).
- *DFS = menyelam sampai mentok.* Satu jalur diikuti hingga ujung, baru backtrack — etika riset: dalami satu bidang hingga tuntas sebelum pindah. DFS menemukan cycle dan jalan buntu yang BFS lewatkan.
- *Cycle = lingkaran setan.* Dalam directed graph, cycle berarti kebuntuan dependensi (A butuh B, B butuh A). Mendeteksinya (Tugas Expert) adalah muhasabah sistem: adakah lingkaran dalam hidup/organisasi Anda yang harus diputus?
- *Terputus vs terhubung.* Graf bisa terputus (komponen terpisah): kode BFS/DFS dari satu start tidak menjangkau semuanya. Pelajaran: menjangkau semua butuh loop semua vertex — dakwah/pendidikan tidak boleh hanya dari satu titik.

> Renungan untuk laporan: petakan 6–8 orang terdekat Anda sebagai graf (undirected untuk pertemanan, directed untuk "mengagumi"). Hitung derajat tiap orang, temukan siapa "penghubung" (artikulasi intuitif), lalu jawab: edge apa yang jika putus akan memisahkan graf — dan apa maknanya?

## 3. Konsep & Representasi (diperdalam)

- **Vertex (simpul):** entitas (kota, pengguna). **Edge (sisi):** relasi (jalan, pertemanan).
- **Undirected:** A—B (dua arah, misal pertemanan). **Directed:** A→B (satu arah, misal follow). **Weighted:** edge punya bobot (jarak/biaya); unweighted hanya ada/tidak.
- **Adjacency Matrix** `V×V`: cek edge O(1), tapi memori O(V²) — boros untuk graf besar jarang. **Adjacency List** `vector<vector<int>>`: hanya menyimpan edge yang ada, O(V+E) — standar praktikum dan industri untuk graf sparse.

> Visualisasi interaktif: **VisuAlgo DFS/BFS** – https://visualgo.net/en/dfsbfs (buka saat praktikum, jalankan langkah demi langkah)

### BFS vs DFS

![BFS step 0](https://cdn.programiz.com/sites/tutorial2program/files/graph-bfs-step-0.png)
*Gambar 1. Persiapan BFS: queue + visited. Sumber: Programiz.*

![BFS step 1](https://cdn.programiz.com/sites/tutorial2program/files/graph-bfs-step-1.png)
*Gambar 2. Kunjungi vertex awal, masukkan tetangga ke queue. Sumber: Programiz.*

![DFS step 0](https://cdn.programiz.com/sites/tutorial2program/files/graph-dfs-step-0.png)
*Gambar 3. Persiapan DFS dengan stack. Sumber: Programiz.*

| Aspek | BFS (Breadth-First) | DFS (Depth-First) |
|---|---|---|
| Struktur | Queue (Modul 3) | Stack / Rekursi (Modul 2) |
| Arah | Melebar per level: semua tetangga dulu | Menyelam: satu jalur sampai mentok, baru backtrack |
| Jaminan | Jarak terpendek (graf unweighted) | Tidak menjamin terpendek |
| Cocok | Koneksi terdekat, rute tersedikit | Deteksi cycle, topological sort, maze, komponen |
| Analogi | Riak air melebar | Penyelam gua dengan tali |

### Matrix vs List: kapan memakai apa? (pendalaman)

| Aspek | Adjacency Matrix (`V×V`) | Adjacency List (`vector<vector<int>>`) |
|---|---|---|
| Cek edge `u-v` | O(1) | O(derajat(u)) |
| Memori | O(V²) — boros jika jarang | O(V+E) — hemat untuk sparse |
| Iterasi tetangga | O(V) selalu (scan baris) | O(derajat) — pas untuk BFS/DFS |
| Cocok | Graf kecil/padat, Floyd-Warshall | Graf besar/jarang (jalan, sosmed) — pilihan default |

Aturan praktis: V ≤ 200 dan butuh cek edge cepat → matrix. V besar + E sedikit (peta kota, follow graph) → list. Weighted: matrix simpan bobot (0/∞ = tak ada edge), list simpan `pair<tetangga,bobot>`.

### Taksonomi graf yang wajib bisa disebutkan

- **Directed vs Undirected:** follow (satu arah) vs pertemanan (dua arah). `addEdge(u,v,true)` = directed.
- **Weighted vs Unweighted:** berbobot (jarak/biaya → Dijkstra) vs tak berbobot (BFS cukup).
- **Connected vs Disconnected:** terhubung semua vs ada komponen terpisah (butuh loop semua vertex!).
- **Cyclic vs Acyclic (DAG):** ber-cycle (butuh deteksi!) vs tanpa cycle (bisa topological sort: urutan kuliah prasyarat, build dependency).
- **Dense vs Sparse:** padat (E ≈ V²) vs jarang (E ≈ V) — menentukan matrix vs list.

### Kesalahan umum pemula

1. **Lupa `visited`** → infinite loop pada graf ber-cycle (0→1→0→1...).
2. **Tandai visited sesudah pop (bukan sebelum push)** → node sama ter-push berkali-kali (ledakan queue).
3. **Hanya BFS/DFS dari 1 start pada graf terputus** → komponen lain tak terjangkau. Solusi: loop semua vertex belum visited.
4. **DFS rekursif terlalu dalam** → stack overflow pada graf garis panjang. Solusi: versi iteratif dengan `stack<int>` eksplisit.
5. **Directed disimpan dua arah** (lupa flag) → hasil BFS/DFS salah arah (follow dianggap pertemanan).

### Graph di dunia nyata

- **Maps & logistik:** rute terpendek (BFS tak berbobot, Dijkstra berbobot), ojek online, armada.
- **Sosial:** saran teman (jarak 2 = teman-dari-teman), influencer (derajat tinggi), komunitas (komponen/klaster).
- **Sistem:** dependensi package, jadwal kuliah (topological sort DAG), deteksi deadlock (cycle!), jaringan komputer (routing).

## 4. Implementasi (Adjacency List, C++)

**Tujuan kode:** satu class graf tak-berarah yang menunjukkan (a) pembangunan adjacency list, (b) BFS iteratif dengan queue, (c) DFS rekursif — ketiganya pola yang dipakai ulang di studi kasus.

```cpp
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

class Graph {
    int V; vector<vector<int>> adj;
public:
    Graph(int v): V(v), adj(v) {}
    void addEdge(int u, int v, bool directed = false) {
        adj[u].push_back(v);
        if (!directed) adj[v].push_back(u);
    }
    void BFS(int start) {
        vector<bool> visited(V, false);
        queue<int> q;
        visited[start] = true; q.push(start);
        while (!q.empty()) {
            int u = q.front(); q.pop();
            cout << u << " ";
            for (int v : adj[u])
                if (!visited[v]) { visited[v] = true; q.push(v); }
        }
        cout << endl;
    }
    void DFSUtil(int u, vector<bool>& visited) {
        visited[u] = true; cout << u << " ";
        for (int v : adj[u])
            if (!visited[v]) DFSUtil(v, visited);
    }
    void DFS(int start) {
        vector<bool> visited(V, false);
        DFSUtil(start, visited);
        cout << endl;
    }
};

int main() {
    Graph g(6);
    g.addEdge(0, 1); g.addEdge(0, 2);
    g.addEdge(1, 3); g.addEdge(1, 4);
    g.addEdge(2, 5);
    cout << "BFS dari 0: "; g.BFS(0); // 0 1 2 3 4 5
    cout << "DFS dari 0: "; g.DFS(0); // 0 1 3 4 2 5
    return 0;
}
```

**Penjelasan per fungsi:**

- **`Graph(int v): V(v), adj(v)`** — membuat `v` list kosong (indeks 0..v−1). Vertex di sini berupa **angka**; untuk nama kota/pengguna, petakan dulu via `map<string,int>` atau enum.
- **`addEdge(u, v, directed=false)`:** untuk tak-berarah, tiap edge disimpan **dua kali** (`u→v` dan `v→u`) — itulah harga adjacency list undirected (memori 2E). Parameter default `false` membuat panggilan `addEdge(0,1)` otomatis dua arah; isi `true` untuk directed (follow, jalan satu arah) yang hanya menyimpan satu arah. Validasi `u,v < V` disederhanakan di sini — versi produksi perlu guard.
- **`BFS(start)` — bedah 5 langkah:**
  1. `visited` mencegah kunjungan ulang (tanpa ini, graf ber-cycle → infinite loop; node 0→1→0→1... selamanya).
  2. Tandai start visited **sebelum push** (bukan sesudah pop!) — penandaan telat menyebabkan node yang sama ter-push berkali-kali dari tetangga berbeda.
  3. Loop: keluarkan depan (`front`+`pop` — ingat `pop` STL void, harus dua langkah), cetak (artinya "dikunjungi resmi").
  4. Untuk tiap tetangga `v` yang belum visited: tandai + antrekan. Urutan tetangga di `adj[u]` menentukan urutan cetak — itulah mengapa output BFS deterministik untuk graf ini.
  5. Kompleksitas O(V+E): tiap vertex masuk-keluar queue sekali, tiap edge diperiksa 2 kali.
- **`DFSUtil` (rekursi = stack implisit):** tandai + cetak **lalu** rekursi ke tiap tetangga belum visited. Call stack menggantikan `stack<int>` eksplisit: saat jalur mentok, fungsi return (backtrack otomatis) dan melanjutkan tetangga berikutnya di frame atas. Depth rekursi = panjang jalur terpanjang — graf sangat dalam bisa stack overflow (versi iteratif dengan `stack` eksplisit lebih aman).
- **`DFS(start)`:** wrapper yang menyiapkan `visited` lalu memanggil util. Catatan: kode ini hanya menjangkau komponen yang terhubung ke start; untuk graf terputus, bungkus dengan loop semua vertex (Tugas: komponen terhubung).
- **Trace graf `main` (0:{1,2}, 1:{0,3,4}, 2:{0,5}):**
  - BFS: q=[0] → visit 0, antre 1,2 → visit 1, antre 3,4 → visit 2, antre 5 → visit 3,4,5 → `0 1 2 3 4 5` (per level!).
  - DFS: 0 → tetangga 1 → tetangga 3 (mentok, backtrack) → 4 (mentok) → kembali ke 0 → tetangga 2 → 5 → `0 1 3 4 2 5` (menyelam!).
  - Perhatikan vertex sama, urutan beda — bukti karakteristik masing-masing.

**Contoh output:**
```
BFS dari 0: 0 1 2 3 4 5
DFS dari 0: 0 1 3 4 2 5
```

## 5. Studi Kasus: Jaringan Sosial & Rute Terpendek

**Soal:** (1) dari seorang pengguna, temukan semua koneksi per derajat (teman, teman-dari-teman, ...); (2) pada peta kota tak-berbobot, cari rute pemberhentian tersedikit. Keduanya = BFS yang **mencatat jarak + predecessor**, bukan sekadar mencetak.

```cpp
// Modifikasi BFS untuk menyimpan jarak & predecessor:
vector<int> jarak(V, -1), prev(V, -1);
// jarak[start] = 0; saat visit v dari u: jarak[v] = jarak[u]+1; prev[v] = u;
// Rekonstruksi rute: telusuri prev dari target ke start, lalu balik.
```

**Penjelasan rancangan (untuk diimplementasikan sebagai Tugas 2):**

1. **Inisialisasi:** `jarak` = -1 (artinya "belum terjangkau"), `prev` = -1. `jarak[start] = 0` (jarak ke diri sendiri nol).
2. **Saat BFS menemukan tetangga baru `v` dari `u`:** isi `jarak[v] = jarak[u] + 1` (satu edge lebih jauh dari u) dan `prev[v] = u` ("saya ditemukan dari u"). Karena BFS mengunjungi per level, **penemuan pertama `v` dijamin lewat jalur terpendek** — penemuan berikutnya (jika ada) pasti ≥ sama panjangnya, jadi abaikan (guard visited sudah menangani).
3. **Derajat koneksi:** setelah BFS, `jarak[i]` = derajat pengguna i dari start (1 = teman langsung, 2 = teman-dari-teman). Yang tetap -1 = tidak terhubung sama sekali.
4. **Rekonstruksi rute:** dari `target`, ikuti `prev` mundur (`target → prev[target] → ... → start`), kumpulkan, lalu **balik** urutannya. Contoh: prev[6]=4, prev[4]=1, prev[1]=0 → mundur [6,4,1,0] → balik [0,1,4,6] = rute terpendek.
5. **Mengapa DFS tidak bisa untuk ini:** DFS menemukan target lewat jalur acak (bisa memutar), bukan terpendek. Perbandingan kedua urutan kunjungan pada graf yang sama adalah inti laporan: BFS melebar (jarak minimal), DFS menyelam (eksplorasi maksimal).

**Skenario uji:** 7 kota (0–6) dengan jalan. Cari rute pemberhentian paling sedikit dari kota 0 ke kota 6 dengan BFS di atas, cetak rute + jumlahnya, lalu bandingkan dengan urutan kunjungan DFS.

## 6. Tugas Praktikum 🧩

> Kumpulkan tiap tugas sebagai **file `.cpp` + screenshot output + analisis di laporan**. Pastikan `g++ -std=c++17` tanpa error.

### 🟢 Level Beginner — *Membangun & Menjelajah*

**Tugas B1: Matrix + Derajat + Tampil Tetangga (wajib).**
1. Buat class `GraphMatrix` (V=6, `int mat[V][V]` nol semua): `addEdge(u,v)` undirected + `hitungDerajat(v)` (jumlah 1 di baris v) + `tampilTetangga(v)`.
2. Bangun graf modul (`0-1,0-2,1-3,1-4,2-5`) lalu cetak: matrix 6×6, derajat tiap vertex (mis. deg(1)=3), tetangga 1 (harusnya 0,3,4).
3. Jawab: kompleksitas `hitungDerajat` (O(V)) vs versi list (O(derajat)) + kapan matrix lebih unggul?
*Kriteria nilai:* matrix + fungsi benar (50%), cetak 3 hal (25%), analisis O + kapan (25%).

**Tugas B2: BFS vs DFS Manual + Trace (wajib).**
1. Salin class `Graph` (list) modul ke `graph_b2.cpp`. Jalankan BFS dan DFS dari 0 pada graf modul; pastikan output `0 1 2 3 4 5` vs `0 1 3 4 2 5`.
2. Di laporan buat **trace tabel BFS** (isi queue tiap iterasi) dan **trace call-stack DFS** (urutan masuk/keluar rekursi) — tunjukkan mengapa urutannya beda.
3. Jawab: struktur data apa di balik tiap algoritma (queue vs stack) dan apa yang terjadi jika `visited` dihapus? (prediksi + buktikan dengan menghapusnya!).
*Kriteria nilai:* kedua output benar (40%), dua trace (35%), jawaban struktur + eksperimen visited (25%).

### 🟡 Level Medium — *Jarak & Komponen*

**Tugas M1: BFS Jarak + Predecessor + Rute (inti studi kasus).**
1. Implementasikan `BFSJarak(start)` yang mengembalikan `jarak[]` dan `prev[]` sesuai rancangan studi kasus + fungsi `cetakRute(target)` (telusuri prev mundur, lalu balik).
2. Uji pada 7 kota: `0-1,0-2,1-3,1-4,2-5,4-5,4-6,5-6`. Cetak: jarak semua kota dari 0, rute `0→6` + jumlah pemberhentian (harusnya 3 edge via 0-1-4-6 atau 0-2-5-6), dan derajat koneksi tiap kota.
3. Bandingkan dengan urutan DFS dari 0: apakah DFS menemukan rute sependek BFS? Jelaskan mengapa ya/tidak dengan 1 paragraf + data.
*Kriteria nilai:* jarak+prev+rute benar (50%), uji 7 kota + jumlah (25%), banding DFS vs BFS (25%).

**Tugas M2: Graf Terputus + Directed.**
1. Tambahkan `addEdgeDirected(u,v)` + `BFS/DFSAll()` (loop semua vertex: jika belum visited → travers dari sana; hitung jumlah komponen).
2. Uji: graf 6 vertex dengan edge `0-1,1-2` dan `3-4` (vertex 5 sendirian) → harus terdeteksi 3 komponen; lalu tambahkan edge directed `2→3` dan tunjukkan BFS dari 0 kini menjangkau 3 tetapi BFS dari 3 tidak menjangkau 0 (asimetri!).
3. Analisis: mengapa `addEdge` undirected menyimpan 2× (memori 2E) dan kapan directed wajib dipakai? (beri 2 contoh nyata).
*Kriteria nilai:* komponen + directed benar (50%), dua uji asimetri (25%), analisis memori + contoh (25%).

### 🔴 Level Expert — *Cycle, Topologi & Berbobot*

**Tugas E1: Deteksi Cycle Directed (3-warna).**
1. Implementasikan `punyaCycle()` dengan DFS + status `0=putih(belum),1=abu(sedang diproses),2=hitam(selesai)`: bertemu tetangga abu → cycle! Uji: segitiga `0→1→2→0` (cycle!) vs `0→1→2` (aman) vs undirected `0-1-2-0` (jelaskan mengapa versi undirected butuh aturan parent, bukan 3-warna polos).
2. Cetak cycle yang ditemukan (tumpukan rekursi saat abu bertemu) untuk graf pertama.
3. Jelaskan 1 paragraf: mengapa cycle pada *dependency* (prasyarat kuliah, build) fatal — dan bagaimana topological sort mustahil jika cycle ada?
*Kriteria nilai:* 3-warna benar 3 kasus (50%), cetak cycle (20%), penjelasan dependensi (30%).

**Tugas E2: Dijkstra Mini + Peta Kampus.**
1. Perluas adjacency list ke berbobot (`vector<vector<pair<int,int>>>`): implementasikan **Dijkstra sederhana** O(V²) (tanpa heap) dari titik start: `jarak[]`, `prev[]`, himpunan `selesai[]`.
2. Uji pada peta 6 titik kampus (beri nama: Gerbang, Rektorat, Lab, Kantin, Masjid, Asrama + 8 jalan berbobot menit). Cetak jarak + rute tercepat Gerbang→Masjid.
3. Bandingkan hasil vs BFS tak-berbobot pada graf sama (abaikan bobot): tunjukkan kasus di mana "tersedikit pemberhentian" ≠ "tercepat" — dan refleksikan 1 paragraf: kapan jumlah langkah menipu, kapan bobot (waktu/biaya) yang jujur?
*Kriteria nilai:* Dijkstra benar (50%), peta + rute (25%), banding BFS + refleksi (25%).

## 7. Video Pembelajaran 🎬

1. **Abdul Bari – Graph Traversals BFS & DFS.**
   https://www.youtube.com/watch?v=pcKY4hjDrxk
2. **freeCodeCamp – Graph Algorithms for Technical Interviews (Full Course).**
   https://www.youtube.com/watch?v=tWVWeAqZ0WU
3. **Data Structures – BFS and DFS Graph Traversals.**
   https://www.youtube.com/watch?v=vf-cxgUXcMk

## 8. Referensi Website 🌐

1. GeeksforGeeks – *Graph and Representations* – https://www.geeksforgeeks.org/dsa/graph-and-its-representations/
2. Programiz – *BFS Graph Algorithm* – https://www.programiz.com/dsa/graph-bfs
3. Programiz – *DFS Algorithm* – https://www.programiz.com/dsa/graph-dfs
4. VisuAlgo – *Graph Traversal* – https://visualgo.net/en/dfsbfs
