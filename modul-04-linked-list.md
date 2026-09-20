# Modul 4: Linked List (Senarai Berantai)

> **Mata Kuliah:** Struktur Data | **Durasi:** 2 × 100 menit | **Prasyarat:** Modul 0–3

## 1. Capaian Pembelajaran

1. Menjelaskan konsep dynamic memory (`new`/`delete`), Node, Head, Tail.
2. Mengimplementasikan Single Linked List (insert/delete first/last/after).
3. Menjelaskan Double & Circular Linked List.
4. Menyelesaikan studi kasus antrean pelanggan berbasis Linked List.
5. Menjelaskan sejarah Linked List dan merefleksikan nilai filosofisnya (kebebasan terhubung & amanah memori).

## 2. Sejarah & Nilai Filosofis

**Sejarah singkat.** Linked list lahir bersama kecerdasan buatan! Pada 1955–1956, **Allen Newell, Cliff Shaw, dan Herbert Simon** menciptakan bahasa **IPL (Information Processing Language)** untuk program *Logic Theorist* — program pertama yang membuktikan teorema matematika otomatis. Mereka butuh memori yang bisa tumbuh-tumbuh kapan saja (simbol logika datang tak terduga), dan array kaku tidak cukup. Solusinya: pecah data menjadi *node* yang saling menunjuk lewat pointer. Ide ini diwariskan ke **LISP (John McCarthy, 1958)** — bahasa AI legendaris di mana *segala sesuatu adalah list* (`(1 2 3)` bahkan program itu sendiri list!). Setiap `new`/`delete`, `malloc`/`free`, bahkan garbage collector bahasa modern, adalah keturunan langsung ide 1955 ini.

**Mengapa dinamis itu penting?** Array berkata: "tentukan ukuran di awal, saya jamin kecepatan". Linked list berkata sebaliknya: "datanglah kapan saja, saya carikan tempat — tapi carilah saya dari depan". Inilah trade-off abadi komputasi: *aturan vs kebebasan, kecepatan akses vs kelenturan tumbuh*. Stack/Queue array (Modul 2–3) memilih aturan; linked list memilih kebebasan — dan Modul 5–7 (Tree, Graph, Hash chaining) semuanya berdiri di atas pilihan kedua ini.

**Nilai filosofis — rantai, amanah, dan arah.**
- *Individu yang terhubung.* Satu node tanpa `next` hanyalah data kesepian; tersambung, ia menjadi rantai pengetahuan. Seperti manusia: nilai kita ditentukan bukan hanya isi (`data`), melainkan ke siapa kita menunjuk (`next`) — relasi, rujukan, sanad ilmu.
- *Amanah memori (RAII).* Setiap `new` adalah janji untuk `delete`. Node yang dibuat lalu dilupakan = memory leak: memori yang "bocor" perlahan menenggelamkan program — metafora amanah yang dilalaikan. Destructor modul ini adalah pelajaran tanggung jawab: bersihkan apa yang Anda buat.
- *Urutan dan arah.* Single list hanya maju (tak bisa menyesali masa lalu), double list bisa mundur (muhasabah), circular list kembali ke awal (siklus/taubat). Pilih struktur sesuai kebutuhan moral masalah: kapan cukup maju, kapan perlu mundur, kapan harus memutar?
- *Kepala dan ekor.* `head` adalah awal yang harus dijaga (hilang = seluruh list hilang); `tail` adalah akhir yang mempercepat (tanpa tail, insert belakang O(n)). Organisasi yang sehat menjaga keduanya: visi awal dan eksekusi akhir.

> Renungan untuk laporan: bandingkan array (kontrak tetap) vs linked list (janji fleksibel) dengan pengalaman organisasi/kepanitiaan Anda. Kapan aturan kaku menyelamatkan, kapan kelenturan menyelamatkan? Apa "memory leak" dalam organisasi (amanah yang bocor)?

## 3. Konsep Dasar (diperdalam)

Linked List = kumpulan **node** yang tiap node menyimpan `data` + `pointer next`. Berbeda dengan array, ukurannya **dinamis** dan tidak harus bersebelahan di memori. Konsekuensinya: insert/delete di ujung (atau posisi yang pointer-nya sudah diketahui) bisa O(1), tapi akses indeks ke-i harus traversal O(n) dari head.

![Konsep HEAD -> node -> NULL](https://cdn.programiz.com/sites/tutorial2program/files/linked-list-concept.png)
*Gambar 1. Struktur dasar linked list. Sumber: Programiz.*

![Node 1 -> 2 -> 3](https://cdn.programiz.com/sites/tutorial2program/files/linked-list-with-data.png)
*Gambar 2. Linked list berisi data 1 → 2 → 3. Sumber: Programiz.*

![Singly linked list](https://media.geeksforgeeks.org/wp-content/uploads/20240826132228/singly-linked-list-in-c.webp)
*Gambar 3. Singly linked list. Sumber: GeeksforGeeks.*

| Jenis | Ciri | Kelebihan | Harga yang dibayar |
|---|---|---|---|
| Single | `next` satu arah, tail → `nullptr` | Simpel, hemat memori | Hapus belakang O(n), tak bisa mundur |
| Double | `prev` + `next`, traversal dua arah | Hapus node diketahui O(1), bisa mundur | 1 pointer ekstra per node |
| Circular | Tail → Head (tidak ada `nullptr`) | Cocok round-robin / antre melingkar | Loop tak sengaja = infinite loop |

### Array vs Linked List: kapan memakai apa? (pendalaman)

| Aspek | Array / Vector | Linked List |
|---|---|---|
| Akses indeks ke-i | O(1) langsung | O(n) traversal dari head |
| Insert/delete di depan (posisi diketahui) | O(n) geser | O(1) |
| Insert di belakang (dengan tail) | O(1) amortized (vector) | O(1) |
| Memori | Rapat, cache-friendly | Tersebar + 8 byte pointer/node, cache-miss |
| Ukuran | Tetap / tumbuh berkala (realloc) | Tumbuh satu per satu |
| Kegagalan khas | Overflow / realloc mahal | Leak, dangling, lupa null |

Aturan praktis: butuh akses acak cepat (searching/sorting Modul 1, matrix) → array/vector. Butuh tumbuh-susut dinamis di ujung + insert/delete posisi pointer-diketahui (stack/queue dinamis, chaining hash, adjacency list) → linked list. Di C++ modern, `std::vector` + `std::list`/`std::forward_list` sudah tersedia — tetapi memahami pointer mentah modul ini wajib sebelum memakai STL, agar Anda paham apa yang disembunyikan STL.

### Anatomi pointer yang wajib dikuasai

- **Stack vs heap:** variabel lokal hidup di call stack (otomatis hilang); `new Node` hidup di heap (awet sampai `delete`). List memakai heap agar node bertahan setelah fungsi insert selesai.
- **Dangling pointer:** pointer yang menunjuk memori yang sudah di-`delete`. Mengaksesnya = undefined behavior (kadang benar, kadang crash — bug paling sulit didebug).
- **Null sebagai tanda berhenti:** `nullptr` adalah "titik" di akhir kalimat list. Lupa mengecek null sebelum `->next` = crash segfault.
- **Sentinel & tail:** menyimpan `tail` mengubah insert belakang dari O(n) menjadi O(1) (studi kasus). *Sentinel node* (node boneka) bahkan menghilangkan kasus-khusus kosong — teknik advance untuk Tugas Expert.

### Kesalahan umum pemula

1. **Urutan sambung dibalik** (`prev->next = baru` sebelum `baru->next = prev->next`) → sisa list terputus/leak.
2. **`head = baru` sebelum `baru->next = head`** → head lama hilang selamanya.
3. **Lupa kasus kosong & 1 elemen** di `insertLast`/`deleteLast` → dereference nullptr.
4. **Lupa `tail = nullptr`** saat list menjadi kosong → dangling tail.
5. **Tidak ada destructor** → setiap uji program membocorkan memori; biasakan `valgrind`/sanitizer untuk memeriksa.

## 4. Implementasi Single Linked List (C++)

**Tujuan kode:** satu class lengkap yang menjadi template semua modul berikutnya (Stack/Queue berbasis Linked List memakai pola yang sama). Pahami 6 operasi + destructor.

```cpp
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
};

class LinkedList {
    Node* head;
public:
    LinkedList() : head(nullptr) {}

    void insertFirst(int x) {
        Node* baru = new Node{x, head};
        head = baru;
    }
    void insertLast(int x) {
        Node* baru = new Node{x, nullptr};
        if (!head) { head = baru; return; }
        Node* t = head;
        while (t->next) t = t->next;
        t->next = baru;
    }
    void insertAfter(Node* prev, int x) {
        if (!prev) return;
        Node* baru = new Node{x, prev->next};
        prev->next = baru;
    }
    void deleteFirst() {
        if (!head) return;
        Node* tmp = head; head = head->next; delete tmp;
    }
    void deleteLast() {
        if (!head) return;
        if (!head->next) { delete head; head = nullptr; return; }
        Node* t = head;
        while (t->next->next) t = t->next;
        delete t->next; t->next = nullptr;
    }
    void display() {
        for (Node* t = head; t; t = t->next) cout << t->data << " -> ";
        cout << "NULL\n";
    }
    Node* getHead() { return head; }
    ~LinkedList() { while (head) deleteFirst(); } // cegah memory leak
};
```

**Penjelasan per bagian:**

- **`struct Node { int data; Node* next; }`** — satu simpul = 1 data + 1 pointer ke simpul berikut. `new Node{x, head}` memakai **aggregate initialization**: field pertama = x, kedua = head. Node hidup di **heap** (awet setelah fungsi selesai), tidak seperti variabel lokal stack.
- **Konstruktor `LinkedList() : head(nullptr)`** — list kosong ditandai `head == nullptr`. Semua operasi mengandalkan konvensi ini, jadi inisialisasi benar adalah separuh kebenaran program.
- **`insertFirst` (O(1)):** buat node baru yang `next`-nya = head lama, lalu `head` pindah ke node baru. Urutan dua baris ini **tidak boleh dibalik**: jika `head = baru` dulu, alamat head lama hilang dan list lama bocor (leak). Trace: list `1->NULL`, insertFirst(0) → baru(0, next=1) → head=baru → `0->1->NULL`.
- **`insertLast` (O(n)):** node baru `next = nullptr` (calon tail). Kasus khusus list kosong → head = baru, selesai (tanpa ini, `t = head` = nullptr lalu `t->next` crash). Jika tidak kosong, pointer `t` berjalan (`while (t->next)`) sampai tail, lalu `t->next = baru`. Kelemahan O(n) inilah alasan studi kasus di bawah menyimpan pointer `tail` tambahan agar insert belakang O(1).
- **`insertAfter(prev, x)` (O(1)):** operasi primitif paling penting — dengan pointer `prev` yang sudah diketahui, selipkan node baru di belakangnya: `baru->next = prev->next; prev->next = baru;`. Urutan sama pentingnya: jika `prev->next = baru` dulu, sisa list setelah prev terputus. Guard `if (!prev) return;` mencegah dereference nullptr.
- **`deleteFirst` (O(1)):** simpan head lama di `tmp`, majukan head, baru `delete tmp`. Tanpa `tmp`, setelah `head = head->next` tidak ada lagi yang menunjuk node lama → leak. Guard list kosong mencegah crash.
- **`deleteLast` (O(n)):** dua kasus khusus — kosong (return) dan 1 elemen (`head->next == nullptr` → delete head, head = nullptr; tanpa cabang ini, loop `t->next->next` akan dereference nullptr). Untuk ≥2 elemen, `t` berhenti di **sebelum tail** (`while (t->next->next)`), lalu tail di-delete dan `t->next = nullptr` (t menjadi tail baru, wajib di-null-kan agar traversal berhenti).
- **`display`:** pointer jalan `t` dari head sampai `nullptr`, mencetak tiap data. Kondisi `t` ekuivalen `t != nullptr`. Kompleksitas O(n).
- **Destructor `~LinkedList`:** dipanggil otomatis saat objek keluar scope; menghapus semua node satu per satu. Tanpanya, setiap `new` tanpa `delete` menumpuk → **memory leak**. Inilah RAII paling sederhana di C++.

### Double Linked List (cuplikan)

**Ide:** tiap node punya dua pointer sehingga bisa jalan mundur. Operasi insert/delete perlu memperbaiki **dua arah**.

```cpp
struct DNode { int data; DNode *prev, *next; };
// insertFirst: baru->next = head; baru->prev = nullptr;
//              if (head) head->prev = baru; head = baru;
```

**Penjelasan:** `baru->prev = nullptr` karena menjadi head (tidak ada pendahulu). Jika list tidak kosong, head lama harus menunjuk balik: `head->prev = baru` — baris yang paling sering dilupakan pemula, akibatnya traversal mundur berhenti di head lama. Kelebihan: `deleteLast` menjadi O(1) jika pointer `tail` disimpan (cukup `tail = tail->prev; delete tail->next;`). Harga: 8 byte ekstra per node (64-bit) + 2 assignment tambahan tiap operasi.

### Circular Linked List (cuplikan)

**Ide:** tidak ada ujung — `tail->next = head`. Cocok untuk antre round-robin dan permainan eliminasi (Tugas 3).

```cpp
// tail->next = head (bukan nullptr)
// traversal: do { ... } while (t != head);
```

**Penjelasan:** karena tidak ada `nullptr`, loop `while (t)` tidak akan pernah berhenti → traversal **wajib** `do-while` yang berhenti saat kembali ke head. Insert/delete mirip single, tapi ada 2 kasus khusus: list kosong (node baru menunjuk dirinya sendiri) dan operasi di tail (pointer tail harus diperbarui). Jebakan klasik: lupa memperbarui `tail->next` setelah `deleteFirst` pada list 1 elemen → dangling pointer melingkar.

## 5. Studi Kasus: Antrean Pelanggan

**Soal:** pelanggan datang (diberi nomor antre otomatis) → masuk belakang; dilayani → keluar depan. Ini FIFO di atas Linked List dengan pointer `head` + `tail` agar **kedua operasi O(1)**.

```cpp
#include <iostream>
#include <string>
using namespace std;

struct Pelanggan { string nama; int nomor; Pelanggan* next; };

class Antrean {
    Pelanggan *head, *tail;
    int counter = 1;
public:
    Antrean(): head(nullptr), tail(nullptr) {}
    void datang(string nama) {
        Pelanggan* p = new Pelanggan{nama, counter++, nullptr};
        if (!head) head = tail = p;
        else { tail->next = p; tail = p; }
        cout << nama << " nomor antre " << p->nomor << endl;
    }
    void layani() {
        if (!head) { cout << "Antrean kosong\n"; return; }
        Pelanggan* tmp = head;
        cout << "Melayani: " << tmp->nama << endl;
        head = head->next;
        if (!head) tail = nullptr;
        delete tmp;
    }
    void tampil() {
        for (auto t = head; t; t = t->next)
            cout << t->nomor << ". " << t->nama << endl;
    }
};

int main() {
    Antrean a;
    a.datang("Ahmad"); a.datang("Budi"); a.datang("Citra");
    a.tampil(); a.layani(); a.tampil();
    return 0;
}
```

**Penjelasan alur:**

1. **`datang` (= insertLast O(1)):** `counter++` (post-increment) memberi nomor lalu menaikkan — pelanggan pertama dapat nomor 1. `new Pelanggan{nama, counter++, nullptr}` mengisi tiga field berurutan. Jika list kosong, head dan tail **keduanya** menunjuk node baru (satu baris `head = tail = p`; lupa salah satunya merusak operasi berikutnya). Jika tidak kosong, sambung `tail->next = p` lalu geser `tail = p` — tanpa traversal karena tail sudah disimpan.
2. **`layani` (= deleteFirst O(1)):** guard kosong mencegah crash. `tmp` menyimpan head lama; `head` maju; **jika head menjadi nullptr (tadi elemen terakhir), tail wajib ikut di-null-kan** — baris `if (!head) tail = nullptr;` ini krusial: tanpanya `tail` menggantung ke memori yang sudah di-delete, dan `datang` berikutnya akan menulis via dangling pointer. Terakhir `delete tmp`.
3. **`tampil`:** traversal biasa O(n). `auto t` dideduksi compiler menjadi `Pelanggan*`.
4. **Trace `main`:** datang ×3 → `1.Ahmad -> 2.Budi -> 3.Citra`; tampil mencetak ketiganya; layani menghapus Ahmad (head→Budi); tampil mencetak Budi, Citra. Semua operasi O(1) kecuali tampil.

**Contoh output:**
```
Ahmad nomor antre 1
Budi nomor antre 2
Citra nomor antre 3
1. Ahmad
2. Budi
3. Citra
Melayani: Ahmad
2. Budi
3. Citra
```

## 6. Tugas Praktikum 🧩

> Kumpulkan tiap tugas sebagai **file `.cpp` + screenshot output + analisis di laporan**. Pastikan `g++ -std=c++17` tanpa error dan tanpa memory leak (yakinkan dengan penalaran destructor).

### 🟢 Level Beginner — *Operasi Fondasi*

**Tugas B1: `search` + `deleteAfter` + Jejak Pointer (wajib).**
1. Tambahkan ke class `LinkedList` modul: `Node* search(int x)` (kembalikan pointer node pertama bernilai x, atau `nullptr`) dan `void deleteAfter(Node* prev)` (hapus node setelah prev; jika `prev`/`prev->next` null → tidak melakukan apa-apa).
2. Di `main`: bangun list `10 -> 20 -> 30` via `insertLast`; cetak; `search(20)` → `insertAfter(hasil, 25)` → cetak; `deleteAfter(search(20))` → cetak; `search(99)` → pastikan `nullptr` dan program tidak crash.
3. Di laporan: gambarkan diagram kotak-panah (head → node → ...) sebelum dan sesudah tiap operasi + jawab mengapa `deleteAfter` butuh guard ganda.
*Kriteria nilai:* kedua fungsi benar (50%), skenario uji lengkap + tidak crash (25%), diagram + jawaban guard (25%).

**Tugas B2: Hitung Panjang, Rata-rata & Balik Tampil.**
1. Tambahkan `int size()`, `double rataRata()`, dan `void tampilMundurRekursif(Node* t)` (cetak dari belakang via rekursi tanpa mengubah list).
2. Uji dengan list `5 -> 10 -> 15`: size=3, rata-rata=10, tampil mundur `15 10 5`.
3. Jawab di laporan: kompleksitas tiap fungsi + mengapa tampil-mundur rekursi memakai call stack (hubungkan ke Modul 2!).
*Kriteria nilai:* tiga fungsi benar (60%), uji kasus (20%), analisis + hubungan stack (20%).

### 🟡 Level Medium — *Dua Arah & Melingkar*

**Tugas M1: Double Linked List Riwayat Transaksi.**
1. Buat class `DList` (struct `DNode{string ket; int nominal; DNode *prev,*next}`) dengan `tambahDepan`, `tambahBelakang`, `hapusDepan`, `hapusBelakang`, `cetakMaju`, `cetakMundur`.
2. Skenario: tambah 5 transaksi campuran, cetak maju (kronologis) + mundur (audit terbaru dulu), hapus 1 depan + 1 belakang, cetak ulang. Pastikan `prev` diperbaiki di tiap operasi (khususnya `hapusBelakang` O(1) via tail).
3. Analisis: kapan double list mengalahkan single + berapa overhead memorinya untuk 1000 node (hitung byte).
*Kriteria nilai:* 6 operasi benar dua arah (50%), skenario + cetak dua arah (25%), analisis kapan & overhead (25%).

**Tugas M2: Antrean Pelanggan + Statistik.**
1. Perluas studi kasus `Antrean`: tambahkan `int size()`, `layaniBeberapa(int k)`, dan `rataTunggu` (asumsi tiap pelanggan 4 menit: tunggu pelanggan ke-i = (i-1)×4).
2. Uji: 6 pelanggan datang → layani 2 → 2 datang lagi → tampil + cetak rata-rata tunggu yang masih antre.
3. Diskusikan: mengapa studi kasus ini memakai list + tail (O(1)), bukan array geser (O(n))? Kapan array justru lebih baik?
*Kriteria nilai:* fitur tambahan benar (50%), skenario uji (25%), diskusi list vs array (25%).

### 🔴 Level Expert — *Algoritma & Tanggung Jawab Memori*

**Tugas E1: Kursi Musik / Josephus + Deteksi Cycle Floyd.**
1. Buat **Circular Linked List** untuk permainan eliminasi: n pemain melingkar, tiap hitungan ke-k tereliminasi, cetak urutan eliminasi + pemenang. Uji n=7, k=3 (pemenang yang benar = tentukan via program, bukan hafalan!).
2. Implementasikan **deteksi cycle Floyd** (`slow` 1 langkah, `fast` 2 langkah; bertemu → cycle) pada single list + fungsi `buatCycle(pos)` khusus uji. Buktikan: list normal → tidak cycle; setelah `buatCycle` → terdeteksi.
3. Tulis peringatan 1 paragraf: mengapa traversal circular **wajib** `do-while` (bukan `while(t)`) dan apa akibatnya jika `tail->next` lupa diperbarui setelah delete.
*Kriteria nilai:* Josephus benar (35%), Floyd benar dua kasus (35%), penjelasan jebakan circular (30%).

**Tugas E2: Balik List In-Place + LRU Mini.**
1. Implementasikan `reverseInPlace()` O(n) O(1) (tiga pointer `prev, curr, next`) + buktikan dengan cetak sebelum/sesudah untuk 5 elemen.
2. Bangun **cache LRU mini** kapasitas 3 di atas list + `unordered_map<int,Node*>`: akses (`get`) memindahkan node ke depan; insert penuh mengusir tail. Simulasikan akses `1,2,3,2,4` dan tunjukkan isi cache tiap langkah.
3. Refleksi filosofis 1 paragraf: hubungkan LRU ("yang lama tak dipakai akan dilupakan") dengan manajemen ilmu/hafalan — dan bagaimana desain ini mencegah "memory leak" pengetahuan?
*Kriteria nilai:* reverse benar (30%), LRU + simulasi (40%), refleksi (30%).

## 7. Video Pembelajaran 🎬

1. **freeCodeCamp – Data Structures Full Course using C/C++ (bab Linked List).**
   https://www.youtube.com/watch?v=B31LgI4Y4DQ
2. **Jenny's Lectures – Linked List Implementation in C/C++ (2,4 jt views).**
   https://www.youtube.com/watch?v=6wXZ_m3SbEs
3. **Fajar Baskoro – Linked List (Bahasa Indonesia).**
   https://www.youtube.com/watch?v=xVBOgxfWQr4

## 8. Referensi Website 🌐

1. GeeksforGeeks – *Linked List in C++* – https://www.geeksforgeeks.org/cpp/cpp-linked-list/
2. Programiz – *Linked List Data Structure* – https://www.programiz.com/dsa/linked-list
3. Programiz – *Types of Linked List* – https://www.programiz.com/dsa/linked-list-types
4. Programiz – *Linked List Operations* – https://www.programiz.com/dsa/linked-list-operations
