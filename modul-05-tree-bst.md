# Modul 5: Tree & Binary Search Tree (BST)

> **Mata Kuliah:** Struktur Data | **Durasi:** 2 × 100 menit | **Prasyarat:** Modul 4 (pointer, Linked List, rekursi)

## 1. Capaian Pembelajaran

1. Menjelaskan terminologi: Root, Parent, Child, Leaf, Height, Depth.
2. Mengimplementasikan BST: Insertion, Deletion, Searching.
3. Mengimplementasikan traversal In-Order, Pre-Order, Post-Order, Level-Order.
4. Menyelesaikan studi kasus hirarki organisasi / file directory.
5. Menjelaskan sejarah Tree/BST dan merefleksikan nilai filosofisnya (hirarki & keseimbangan).

## 2. Sejarah & Nilai Filosofis

**Sejarah singkat.** Pohon adalah struktur data tertua yang dipinjam dari kehidupan: silsilah keluarga, taksonomi makhluk hidup (Linnaeus), hingga bagan organisasi. Di komputer, pohon biner dipakai untuk kompresi **Huffman (1952)** dan parsing ekspresi. Aturan *kiri < parent < kanan* (BST) membuat pencarian melompat setengah pohon tiap langkah — sepupu dekat binary search (Modul 1). Masalahnya: BST bisa miring menjadi list O(n) jika insert terurut. Maka lahirlah pohon *self-balancing*: **AVL (Adelson-Velsky & Landis, 1962)** — pohon pertama yang menyeimbangkan diri otomatis — disusul Red-Black Tree (penopang `std::map` C++) dan B-Tree (penopang database & filesystem). Level-order modul ini (memakai queue!) adalah jembatan ke BFS graf (Modul 6).

**Mengapa hirarki itu alami?** Karena banyak hal memang bertingkat: folder di dalam folder, atasan-bawahan, bab-subbab. Pohon memodelkannya tanpa redundansi: tiap node tepat satu parent (kecuali root), sehingga jalur root→node selalu tunggal dan jelas. BST menambahkan *ketertiban*: dengan satu aturan urutan, data yang tadinya acak menjadi dapat dicari O(log n) dan dicetak terurut O(n) via in-order.

**Nilai filosofis — akar, cabang, dan keseimbangan.**
- *Akar menentukan tegaknya pohon.* Root yang salah (aturan BST dilanggar di atas) merusak seluruh pencarian di bawahnya — seperti visi organisasi yang salah merusak semua unit. Validasi BST (Tugas) adalah audit "apakah akar masih lurus?".
- *Daun adalah hasil.* Leaf (tanpa anak) adalah ujung kerja nyata: file, karyawan pelaksana, fakta. Height mengukur seberapa dalam organisasi berlapis — terlalu dalam = birokrasi lambat (O(n) miring); seimbang = ramping dan cepat (O(log n)).
- *Tiga cara menghapus (leaf / 1 anak / 2 anak)* mengajarkan kepemimpinan pengganti: tanpa penerus → posisi hilang; satu penerus → naik langsung; dua kandidat → pilih successor terkecil dari kanan (yang paling layak, bukan yang paling dekat). Kode `hapus()` adalah etika suksesi!
- *Keseimbangan harus dirawat.* Pohon yang dibiarkan tumbuh liar menjadi miring; organisasi yang dibiarkan menjadi oligarki. AVL/Red-Black mengingatkan: keseimbangan bukan keadaan awal, melainkan *operasi yang terus dilakukan* (rotasi).

> Renungan untuk laporan: gambarkan "pohon" keluarga/organisasi Anda (root, parent, leaf-nya), ukur height-nya, lalu jawab: apakah ia seimbang? Operasi rotasi apa (desentralisasi? promosi?) yang akan menyeimbangkannya?

## 3. Terminologi (diperdalam)

```
        50 (Root, Depth 0)
       /  \
   30      70 (Parent)
  /  \    /  \
20  40  60  80 (Leaf)
```

- **Root:** simpul teratas (tidak punya parent). **Parent/Child:** relasi langsung. **Leaf:** tanpa anak. **Height:** jumlah sisi terpanjang root→leaf (pohon di atas = 2). **Depth:** jarak node→root (node 40 ber-depth 2).
- **BST rule:** untuk setiap node berlaku `kiri < parent < kanan` — dan ini harus benar di **seluruh subtree**, bukan hanya anak langsung. Satu pelanggaran jauh di bawah merusak seluruh pencarian.
- Konsekuensi rule: **in-order BST selalu menghasilkan urutan terurut** — properti yang dimanfaatkan studi kasus direktori alfabetis.

> Visualisasi interaktif (sangat disarankan dibuka saat praktikum): **VisuAlgo BST** – https://visualgo.net/en/bst

### Traversal (4 cara mengunjungi semua node)

![Inorder traversal](https://media.geeksforgeeks.org/wp-content/uploads/20250310153932992164/Inorder-Traversal-of-Binary-Tree-1.webp)
*Gambar 1. In-Order (kiri → root → kanan). Sumber: GeeksforGeeks.*

![Preorder traversal](https://media.geeksforgeeks.org/wp-content/uploads/20250310154630694049/Preorder-Traversal-of-Binary-Tree-1-.webp)
*Gambar 2. Pre-Order (root → kiri → kanan). Sumber: GeeksforGeeks.*

![Postorder traversal](https://media.geeksforgeeks.org/wp-content/uploads/20250310154150849148/Postorder-Traversal-of-Binary-Tree-1-.webp)
*Gambar 3. Post-Order (kiri → kanan → root). Sumber: GeeksforGeeks.*

| Traversal | Urutan | Hasil utk pohon di atas | Kegunaan khas |
|---|---|---|---|
| In-Order | kiri, root, kanan | 20 30 40 50 60 70 80 (terurut!) | Cetak terurut, validasi BST |
| Pre-Order | root, kiri, kanan | 50 30 20 40 70 60 80 | Salin struktur / bagan organisasi |
| Post-Order | kiri, kanan, root | 20 40 30 60 80 70 50 | Hapus tree (anak dulu baru parent) |
| Level-Order | per level (pakai Queue) | 50 30 70 20 40 60 80 | BFS, tampil per tingkat |

### Kapan memakai traversal apa? (pendalaman — hafalkan polanya)

- **In-order** = "baca BST seperti buku": selalu terurut untuk BST. Dipakai untuk validasi (hasil harus ascending), cetak kamus/daftar alfabetis, dan mengubah BST → array terurut.
- **Pre-order** = "fotokopi struktur": root dulu, sehingga dari hasil pre-order (+ in-order) struktur pohon bisa direkonstruksi. Dipakai untuk serialisasi, bagan organisasi (atasan dicetak sebelum bawahan), dan prefix expression.
- **Post-order** = "bereskan anak dulu": dipakai untuk **delete tree** (jangan hapus parent sebelum anaknya!) dan evaluasi expression tree (operand dulu baru operator).
- **Level-order** = "absensi per angkatan": satu-satunya yang iteratif (queue). Dipakai untuk BFS, cetak per tingkat, dan mencari node terdangkal.

### Height vs Depth vs Size (jangan tertukar!)

- **Depth(node)** = jarak node → root (root = 0). **Height(node)** = jarak terjauh node → leaf di bawahnya (leaf = 0). **Height(tree)** = height(root). **Size** = jumlah node.
- Pohon seimbang n node → height O(log n); pohon miring (insert terurut 1..n) → height O(n) = list berkedok pohon! Inilah motivasi AVL/Red-Black.
- Rekursi height: `1 + max(height(kiri), height(kanan))` — pola yang sama dipakai Tugas B1.

### Kesalahan umum pemula

1. **Lupa `t->kiri = insert(...)` (tanpa assignment)** → node baru terlepas (tidak tersambung).
2. **Lupa `bst.root = insert(...)`** di `main` → pohon pertama tidak pernah tersimpan (root tetap null).
3. **Mengizinkan duplikat diam-diam** — kode modul menolak duplikat; alternatif `<=` ke kanan harus konsisten di search/delete.
4. **Hapus 2 anak dengan menyalin pointer (bukan nilai)** → dua subtree yatim / double-free. Salin `data`, lalu hapus successor secara rekursif.
5. **Rekursi tanpa basis `if (!t) return`** → segfault. Setiap fungsi rekursif wajib punya pintu keluar.

## 4. Implementasi BST (C++)

**Tujuan kode:** memahami 4 operasi rekursif (insert/search/delete/traversal) + 1 iteratif (level-order). Kunci pola: setiap fungsi menerima `Node* t` (subtree saat ini) dan mengembalikan subtree hasil — pola yang sama dipakai di `main` (`bst.root = insert(...)`).

```cpp
#include <iostream>
#include <queue>
using namespace std;

struct Node {
    int data; Node *kiri, *kanan;
    Node(int x): data(x), kiri(nullptr), kanan(nullptr) {}
};

class BST {
public:
    Node* root = nullptr;

    Node* insert(Node* t, int x) {
        if (!t) return new Node(x);
        if (x < t->data) t->kiri = insert(t->kiri, x);
        else if (x > t->data) t->kanan = insert(t->kanan, x);
        return t;
    }
    Node* search(Node* t, int x) {
        if (!t || t->data == x) return t;
        return (x < t->data) ? search(t->kiri, x) : search(t->kanan, x);
    }
    Node* findMin(Node* t) {
        while (t && t->kiri) t = t->kiri;
        return t;
    }
    Node* hapus(Node* t, int x) { // 3 kasus: leaf, 1 anak, 2 anak
        if (!t) return t;
        if (x < t->data) t->kiri = hapus(t->kiri, x);
        else if (x > t->data) t->kanan = hapus(t->kanan, x);
        else {
            if (!t->kiri) { Node* r = t->kanan; delete t; return r; }
            if (!t->kanan) { Node* l = t->kiri; delete t; return l; }
            Node* m = findMin(t->kanan); // successor
            t->data = m->data;
            t->kanan = hapus(t->kanan, m->data);
        }
        return t;
    }
    void inorder(Node* t) {
        if (!t) return;
        inorder(t->kiri); cout << t->data << " "; inorder(t->kanan);
    }
    void preorder(Node* t) {
        if (!t) return;
        cout << t->data << " "; preorder(t->kiri); preorder(t->kanan);
    }
    void postorder(Node* t) {
        if (!t) return;
        postorder(t->kiri); postorder(t->kanan); cout << t->data << " ";
    }
    void levelorder() {
        if (!root) return;
        queue<Node*> q; q.push(root);
        while (!q.empty()) {
            Node* t = q.front(); q.pop();
            cout << t->data << " ";
            if (t->kiri) q.push(t->kiri);
            if (t->kanan) q.push(t->kanan);
        }
    }
};

int main() {
    BST bst;
    for (int x : {50, 30, 70, 20, 40, 60, 80}) bst.root = bst.insert(bst.root, x);
    cout << "Inorder: "; bst.inorder(bst.root); cout << endl;
    cout << "Preorder: "; bst.preorder(bst.root); cout << endl;
    cout << "Level: "; bst.levelorder(); cout << endl;
    bst.root = bst.hapus(bst.root, 30);
    cout << "Setelah hapus 30: "; bst.inorder(bst.root); cout << endl;
    return 0;
}
```

**Penjelasan per fungsi:**

- **`Node(int x): data(x), kiri(nullptr), kanan(nullptr)`** — constructor dengan initializer list: node baru selalu daun (kedua anak null). Tanpa ini, pointer liar berisi sampah dan traversal bisa crash.
- **`insert(t, x)`:** basis — jika subtree kosong (`!t`), buat node baru dan kembalikan (inilah yang nantinya disambung parent). Rekursi — jika `x` lebih kecil, selipkan ke kiri dan **sambung kembali** hasilnya (`t->kiri = insert(...)`); tanpa assignment ini, node baru terlepas. Jika `x` sama, kedua `if` gagal → return `t` tanpa perubahan (duplikat ditolak; alternatif: izinkan di kanan dengan `<=`). Kompleksitas O(h), h = tinggi (O(log n) seimbang, O(n) miring). **Trace insert 40** ke pohon {50,30,70,20}: 40<50→kiri; 40>30→kanan; kanan 30 kosong→buat node 40.
- **`search(t, x)`:** basis ganda — `!t` (jatuh dari daun → tidak ada) atau ketemu. Selain itu pilih satu cabang sesuai perbandingan (tidak pernah keduanya — penghematan setengah pohon tiap langkah, mirip binary search). Return pointer node (bisa dipakai `insertAfter`-style) atau `nullptr`.
- **`findMin(t)`:** susuri kiri terus sampai mentok — node terkiri = minimum subtree. Iteratif O(h). Dipakai delete kasus 2 anak sebagai **successor** (pengganti terkecil dari kanan yang dijamin > semua kiri).
- **`hapus(t, x)` — 3 kasus, fungsi tersulit modul ini:**
  1. *Navigasi* (2 baris pertama): belum ketemu → rekursi ke cabang yang benar dan sambung kembali (`t->kiri = hapus(...)`) — sama polanya dengan insert.
  2. *Ketemu + 0/1 anak:* jika tidak punya kiri → anak kanan (bisa null) naik menggantikan: simpan `r`, `delete t`, return `r`. Kasus leaf tercakup otomatis (r = null). Cerminannya untuk tanpa kanan. Parent yang memanggil otomatis tersambung via assignment rekursif — tidak perlu pointer parent!
  3. *Ketemu + 2 anak:* tidak bisa langsung timpa (dua subtree yatim). Solusi: salin nilai successor (`m = findMin(kanan)`) ke node ini, lalu hapus successor dari kanan (`t->kanan = hapus(t->kanan, m->data)` — rekursi ini pasti jatuh ke kasus 0/1 anak karena successor tidak punya kiri). BST rule terjaga: pengganti > semua kiri dan < sisa kanan.
  - **Trace hapus 30** (anak: 20, 40): successor = min(kanan 40...) = 40 → node 30 bernilai 40 → hapus 40 dari kanan (leaf) → subtree menjadi 40(20, null). In-order tetap terurut: 20 40 50 60 70 80.
- **`inorder/preorder/postorder`:** ketiganya hanya berbeda **posisi `cout`** relatif terhadap dua panggilan rekursif — hafalkan: in = tengah, pre = depan, post = belakang. Basis `if (!t) return` menghentikan di bawah daun. Masing-masing O(n) karena tiap node dikunjungi tepat sekali.
- **`levelorder`:** satu-satunya traversal **iteratif** — memakai `queue` (Modul 3!): push root, lalu selama antre: keluarkan depan, cetak, antrekan anaknya. Hasilnya terurut per tingkat (50; 30,70; 20,40,60,80). Pola ini = BFS graf (Modul 6).
- **`main`:** `for (int x : {...})` range-based loop membangun pohon contoh. `bst.root = insert(...)` — assignment root **wajib** karena insert pertama mengembalikan node baru dari `nullptr`. Output akhir "Setelah hapus 30" membuktikan delete + in-order masih terurut.

**Contoh output:**
```
Inorder: 20 30 40 50 60 70 80
Preorder: 50 30 20 40 70 60 80
Level: 50 30 70 20 40 60 80
Setelah hapus 30: 20 40 50 60 70 80
```

## 5. Studi Kasus: File Directory System

**Soal:** setiap folder = node BST (key = nama folder). In-order menghasilkan daftar alfabetis; pre-order dengan indentasi depth menghasilkan tampilan `tree` di terminal.

```cpp
// Ide: struct Dir { string nama; Dir *kiri, *kanan; vector<string> files; }
// preorder dengan depth => cetak indentasi:
// root
// ├── home
// │   ├── user
// └── var
```

**Penjelasan rancangan (untuk diimplementasikan sebagai Tugas 3):**

- Ganti `int data` menjadi `string nama` + `vector<string> files` (daftar file di folder itu). Pembanding `<`/`>` pada string bekerja leksikografis → in-order = alfabetis otomatis.
- Fungsi `cetakPreorder(Dir* t, int depth)`: cetak `string(depth*4, ' ') + t->nama`, lalu rekursi kiri/kanan dengan `depth+1`. Parameter depth meniru indentasi `tree`.
- **Tugas studi kasus:** tambahkan field `parent` (`Dir* parent`, diisi saat insert) dan fungsi `path()` — dari node, naik via `parent` sambil menumpuk nama, lalu cetak terbalik: `/root/home/user`. Uji dengan 7 folder. Ini melatih navigasi dua arah (down via kiri/kanan, up via parent) seperti filesystem nyata.

## 6. Tugas Praktikum 🧩

> Kumpulkan tiap tugas sebagai **file `.cpp` + screenshot output + analisis di laporan**. Pastikan `g++ -std=c++17` tanpa error.

### 🟢 Level Beginner — *Menjelajah Pohon*

**Tugas B1: Height, Leaf, Size + 4 Traversal (wajib).**
1. Salin class `BST` modul ke `tree_b1.cpp`. Tambahkan `int height(Node* t)`, `int countLeaf(Node* t)`, `int size(Node* t)` (semua rekursif).
2. Bangun pohon contoh `{50,30,70,20,40,60,80}`. Cetak: height (harus 2), leaf (harus 4: 20,40,60,80), size (7), dan keempat traversal (cocokkan dengan tabel modul!).
3. Di laporan: tunjukkan trace `height` untuk subtree 30 (langkah `1+max(...)`) + jawab mengapa basis `!t` mengembalikan -1 untuk height tapi 0 untuk size (definisi edge vs node — jelaskan!).
*Kriteria nilai:* tiga fungsi benar (40%), 4 traversal cocok tabel (30%), trace + penjelasan basis (30%).

**Tugas B2: Search + Insert Bertahap.**
1. Insert satu per satu `{50,30,70,20}` sambil mencetak in-order setiap tahap (tunjukkan pohon "tumbuh" terurut).
2. Cari `40` (tidak ada) dan `20` (ada) dengan `search`; cetak alamat/ketemu-tidak + jalur yang dilalui (mis. 50→30→20).
3. Jawab: mengapa search BST O(h) bukan O(n)? Kapan ia merosot jadi O(n)? (beri contoh urutan insert penyebabnya).
*Kriteria nilai:* insert bertahap + cetak (40%), search + jalur (30%), analisis O(h) vs O(n) (30%).

### 🟡 Level Medium — *Validasi & Hapus*

**Tugas M1: Validasi BST (rentang min–max).**
1. Implementasikan `bool isBST(Node* t, long mn, long mx)` — node valid jika `mn < data < mx`; rekursi kiri dengan `mx = data`, kanan dengan `mn = data`. Panggil awal dengan `LONG_MIN/LONG_MAX`.
2. Uji 3 kasus: (a) pohon contoh (valid), (b) pohon rusak manual (tukar 40↔60 → tidak valid), (c) pohon 1 node (valid).
3. Jelaskan mengapa cek "anak langsung" saja tidak cukup — beri contoh pelanggaran jauh di bawah yang lolos cek lokal tapi gagal cek rentang.
*Kriteria nilai:* fungsi rentang benar (50%), 3 uji kasus (25%), contoh pelanggaran-jauh (25%).

**Tugas M2: Hapus 3 Kasus + Bukti Terurut.**
1. Hapus dari pohon contoh secara berurutan: leaf (`20`), node 1 anak (setelah itu), node 2 anak (`30` dan `50`). Setelah tiap hapus, cetak in-order dan pastikan tetap ascending!
2. Dokumentasikan successor yangdipilih tiap hapus-2-anak + trace penyambungan (`t->kanan = hapus(...)`).
3. Analisis: mengapa hapus-2-anak wajib via successor (bukan menaikkan sembarang anak)? Apa yang rusak jika aturan dilanggar?
*Kriteria nilai:* 3 kasus hapus benar (50%), in-order tetap terurut tiap tahap (25%), analisis successor (25%).

### 🔴 Level Expert — *Organisasi & Keseimbangan*

**Tugas E1: Hirarki Organisasi + Path + Level.**
1. Ganti `int` menjadi `string jabatan` (BST alfabetis): insert 10 jabatan (mis. Rektor, Dekan, Kaprodi, ...). Cetak pre-order berindentasi sebagai bagan + in-order sebagai daftar alfabetis.
2. Tambahkan field `parent` + fungsi `path(node)` (naik via parent → `/Rektor/Dekan/Kaprodi`) dan `levelorder` per tingkat.
3. Uji: cari "Kaprodi", cetak path-nya; hapus satu jabatan tengah, tunjukkan bagan tetap konsisten.
*Kriteria nilai:* BST string + bagan (40%), parent/path + level (30%), uji cari & hapus (30%).

**Tugas E2: Bukti Kemiringan + Rotasi AVL Mini.**
1. Insert terurut `1..10` ke BST biasa: ukur height (harusnya 9 = miring O(n)) dan waktu search `10` vs pohon seimbang contoh modul. Sajikan perbandingan height + jumlah perbandingan.
2. Implementasikan **satu rotasi kanan** (`rotateRight`) + tunjukkan ia memperbaiki kasus miring-kiri 3 node (`30-20-10` → seimbang). Jelaskan kapan rotasi dipicu di AVL (faktor keseimbangan ±1).
3. Refleksi filosofis 1 paragraf: hubungkan "pohon miring = organisasi terlalu hierarkis" dengan solusi rotasi (desentralisasi) — kapan sentralisasi masih dibutuhkan?
*Kriteria nilai:* bukti kemiringan + ukur (35%), rotasi benar (35%), penjelasan AVL + refleksi (30%).

## 7. Video Pembelajaran 🎬

1. **Jenny's Lectures – BST Insertion and Deletion (DSA Full Course).**
   https://www.youtube.com/watch?v=cySVml6e_Fc
2. **Binary Search Trees – Insert and Remove Explained (animasi).**
   https://www.youtube.com/watch?v=wcIRPqTR3Kc

## 8. Referensi Website 🌐

1. GeeksforGeeks – *Binary Search Tree in C++* – https://www.geeksforgeeks.org/cpp/cpp-binary-search-tree/
2. GeeksforGeeks – *Tree Traversals* – https://www.geeksforgeeks.org/dsa/tree-traversals-inorder-preorder-and-postorder/
3. Programiz – *Tree Traversal* – https://www.programiz.com/dsa/tree-traversal
4. VisuAlgo – *BST Visualisation* – https://visualgo.net/en/bst
