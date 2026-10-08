# Modul 4: Senarai Berantai (*Linked List*)

> **Mata Kuliah:** Struktur Data | **Durasi:** 2 × 100 menit | **Prasyarat:** Modul 0–3

> **Panduan menjalankan program:**
> 1. Mulailah dengan contoh dasar pada `linkedlist.cpp`.
> 2. Salin satu contoh program secara utuh ke dalam berkas `.cpp`.
> 3. Kompilasi program dengan perintah `g++ -std=c++17 nama.cpp -o nama`.
> 4. Jalankan program dengan perintah `./nama` pada Linux/macOS atau `.\nama.exe` pada Windows.
> 5. Bandingkan keluaran program dengan contoh keluaran pada bagian terkait.

## 1. Capaian Pembelajaran

Setelah menyelesaikan modul ini, mahasiswa mampu:

1. Menjelaskan konsep memori dinamis, `new`, `delete`, simpul, `head`, dan `tail`.
2. Mengimplementasikan operasi penyisipan dan penghapusan pada senarai berantai tunggal.
3. Menjelaskan karakteristik senarai berantai ganda dan senarai berantai melingkar.
4. Menyelesaikan studi kasus antrean pelanggan dengan menggunakan senarai berantai.
5. Menjelaskan sejarah senarai berantai dan menerapkan pengelolaan memori secara bertanggung jawab.

## 2. Sejarah dan Nilai Filosofis

**Sejarah singkat.** Linked list lahir bersama kecerdasan buatan! Pada 1955–1956, **Allen Newell, Cliff Shaw, dan Herbert Simon** menciptakan bahasa **IPL (Information Processing Language)** untuk program *Logic Theorist* — program pertama yang membuktikan teorema matematika otomatis. Mereka butuh memori yang bisa tumbuh-tumbuh kapan saja (simbol logika datang tak terduga), dan array kaku tidak cukup. Solusinya: pecah data menjadi *node* yang saling menunjuk lewat pointer. Ide ini diwariskan ke **LISP (John McCarthy, 1958)** — bahasa AI legendaris di mana *segala sesuatu adalah list* (`(1 2 3)` bahkan program itu sendiri list!). Setiap `new`/`delete`, `malloc`/`free`, bahkan garbage collector bahasa modern, adalah keturunan langsung ide 1955 ini.

**Mengapa dinamis itu penting?** Array berkata: "tentukan ukuran di awal, saya jamin kecepatan". Linked list berkata sebaliknya: "datanglah kapan saja, saya carikan tempat — tapi carilah saya dari depan". Inilah trade-off abadi komputasi: *aturan vs kebebasan, kecepatan akses vs kelenturan tumbuh*. Stack/Queue array (Modul 2–3) memilih aturan; linked list memilih kebebasan — dan Modul 5–7 (Tree, Graph, Hash chaining) semuanya berdiri di atas pilihan kedua ini.

**Nilai filosofis — rantai, amanah, dan arah.**
- *Individu yang terhubung.* Satu node tanpa `next` hanyalah data kesepian; tersambung, ia menjadi rantai pengetahuan. Seperti manusia: nilai kita ditentukan bukan hanya isi (`data`), melainkan ke siapa kita menunjuk (`next`) — relasi, rujukan, sanad ilmu.
- *Amanah memori (RAII).* Setiap `new` adalah janji untuk `delete`. Node yang dibuat lalu dilupakan = memory leak: memori yang "bocor" perlahan menenggelamkan program — metafora amanah yang dilalaikan. Destructor modul ini adalah pelajaran tanggung jawab: bersihkan apa yang Anda buat.
- *Urutan dan arah.* Single list hanya maju (tak bisa menyesali masa lalu), double list bisa mundur (muhasabah), circular list kembali ke awal (siklus/taubat). Pilih struktur sesuai kebutuhan moral masalah: kapan cukup maju, kapan perlu mundur, kapan harus memutar?
- *Kepala dan ekor.* `head` adalah awal yang harus dijaga (hilang = seluruh list hilang); `tail` adalah akhir yang mempercepat (tanpa tail, insert belakang O(n)). Organisasi yang sehat menjaga keduanya: visi awal dan eksekusi akhir.

> Renungan untuk laporan: bandingkan array (kontrak tetap) vs linked list (janji fleksibel) dengan pengalaman organisasi/kepanitiaan Anda. Kapan aturan kaku menyelamatkan, kapan kelenturan menyelamatkan? Apa "memory leak" dalam organisasi (amanah yang bocor)?

## 3. Konsep Dasar

Senarai berantai merupakan kumpulan **simpul (*node*)**. Setiap simpul menyimpan `data` dan penunjuk `next` yang mengarah ke simpul berikutnya. Berbeda dari larik, simpul-simpul tersebut tidak harus menempati lokasi yang bersebelahan di memori. Senarai dapat bertambah atau berkurang secara dinamis. Penyisipan atau penghapusan pada posisi yang penunjuknya sudah diketahui dapat dilakukan dalam O(1), sedangkan akses ke elemen ke-`i` memerlukan penelusuran dari `head` dengan kompleksitas O(n).

![Konsep HEAD -> node -> NULL](https://cdn.programiz.com/sites/tutorial2program/files/linked-list-concept.png)
*Gambar 1. Struktur dasar linked list. Sumber: Programiz.*

![Node 1 -> 2 -> 3](https://cdn.programiz.com/sites/tutorial2program/files/linked-list-with-data.png)
*Gambar 2. Linked list berisi data 1 → 2 → 3. Sumber: Programiz.*

![Singly linked list](https://media.geeksforgeeks.org/wp-content/uploads/20240826132228/singly-linked-list-in-c.webp)
*Gambar 3. Singly linked list. Sumber: GeeksforGeeks.*

| Jenis | Ciri | Kelebihan | Harga yang dibayar |
|---|---|---|---|
| Tunggal | `next` satu arah, `tail` → `nullptr` | Sederhana dan hemat memori | Penghapusan dari belakang O(n) dan tidak dapat bergerak mundur |
| Ganda | `prev` dan `next`, penelusuran dua arah | Dapat menghapus simpul yang diketahui dalam O(1) | Membutuhkan satu penunjuk tambahan per simpul |
| Melingkar | `tail` → `head`, tanpa `nullptr` di ujung | Sesuai untuk *round-robin* atau antrean melingkar | Kondisi berhenti yang salah dapat menimbulkan perulangan tak berhingga |

### Perbandingan Larik dan Senarai Berantai

| Aspek | Array / Vector | Linked List |
|---|---|---|
| Akses indeks ke-i | O(1) langsung | O(n) traversal dari head |
| Insert/delete di depan (posisi diketahui) | O(n) geser | O(1) |
| Insert di belakang (dengan tail) | O(1) amortized (vector) | O(1) |
| Memori | Rapat, cache-friendly | Tersebar + 8 byte pointer/node, cache-miss |
| Ukuran | Tetap / tumbuh berkala (realloc) | Tumbuh satu per satu |
| Kegagalan khas | Overflow / realloc mahal | Leak, dangling, lupa null |

Gunakan larik atau `vector` ketika program membutuhkan akses acak yang cepat, seperti pada pencarian, pengurutan, dan pengolahan matriks. Gunakan senarai berantai ketika data sering bertambah atau berkurang dan program sudah mengetahui posisi simpul yang akan diubah. C++ modern menyediakan `std::list` dan `std::forward_list`, tetapi pemahaman tentang penunjuk tetap diperlukan agar mahasiswa memahami cara kerja struktur tersebut.

### Konsep Penunjuk yang Perlu Dikuasai

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

## 4. Implementasi Senarai Berantai Tunggal dalam C++

**Tujuan program:** Program membangun satu kelas senarai berantai tunggal yang memuat enam operasi utama dan sebuah destruktor. Tumpukan dan antrean berbasis senarai berantai menggunakan pola pengelolaan simpul yang sama.

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

// Contoh pakai yang bisa langsung jalan.
// Simpan SEMUA kode ke file linkedlist.cpp
int main() {
    LinkedList list;
    cout << "Awal: "; list.display();

    list.insertFirst(20);
    list.insertFirst(10);
    cout << "Setelah tambah depan 20 lalu 10: "; list.display();

    list.insertLast(30);
    cout << "Setelah tambah belakang 30: "; list.display();

    Node* ketemu = nullptr;
    // cari manual pakai getHead (contoh search sederhana)
    for (Node* t = list.getHead(); t; t = t->next)
        if (t->data == 20) { ketemu = t; break; }
    if (ketemu) {
        list.insertAfter(ketemu, 25);
        cout << "Setelah selip 25 sesudah 20: "; list.display();
    }

    list.deleteFirst();
    cout << "Setelah hapus depan: "; list.display();

    list.deleteLast();
    cout << "Setelah hapus belakang: "; list.display();
    return 0;
}
```

**Cara menjalankan:**

```bash
g++ -std=c++17 linkedlist.cpp -o linkedlist
./linkedlist
# di Windows: .\linkedlist.exe
```

**Output:**

```text
Awal: NULL
Setelah tambah depan 20 lalu 10: 10 -> 20 -> NULL
Setelah tambah belakang 30: 10 -> 20 -> 30 -> NULL
Setelah selip 25 sesudah 20: 10 -> 20 -> 25 -> 30 -> NULL
Setelah hapus depan: 20 -> 25 -> 30 -> NULL
Setelah hapus belakang: 20 -> 25 -> NULL
```

> **Istilah penting:**
> - **Senarai berantai (*linked list*)** menghubungkan sejumlah simpul melalui penunjuk.
> - **Simpul (*node*)** menyimpan data dan penunjuk. **`Head`** menunjuk simpul pertama, sedangkan **`tail`** menunjuk simpul terakhir.
> - Operasi **`insertFirst`**, **`insertLast`**, dan **`insertAfter`** menyisipkan simpul pada posisi yang ditentukan.
> - Operasi **`deleteFirst`** dan **`deleteLast`** menghapus simpul pertama atau terakhir.
> - **Penelusuran (*traversal*)** mengunjungi setiap simpul secara berurutan dari `head`.
> - Operator **`new`** mengalokasikan memori, sedangkan **`delete`** membebaskan memori yang tidak lagi digunakan.

**Penjelasan setiap bagian:**

- **`struct Node { int data; Node* next; }`** — satu simpul = 1 data + 1 pointer ke simpul berikut. `new Node{x, head}` memakai **aggregate initialization**: field pertama = x, kedua = head. Node hidup di **heap** (awet setelah fungsi selesai), tidak seperti variabel lokal stack.
- **Konstruktor `LinkedList() : head(nullptr)`** — list kosong ditandai `head == nullptr`. Semua operasi mengandalkan konvensi ini, jadi inisialisasi benar adalah separuh kebenaran program.
- **`insertFirst` (O(1)):** buat node baru yang `next`-nya = head lama, lalu `head` pindah ke node baru. Urutan dua baris ini **tidak boleh dibalik**: jika `head = baru` dulu, alamat head lama hilang dan list lama bocor (leak). Trace: list `1->NULL`, insertFirst(0) → baru(0, next=1) → head=baru → `0->1->NULL`.
- **`insertLast` (O(n)):** node baru `next = nullptr` (calon tail). Kasus khusus list kosong → head = baru, selesai (tanpa ini, `t = head` = nullptr lalu `t->next` crash). Jika tidak kosong, pointer `t` berjalan (`while (t->next)`) sampai tail, lalu `t->next = baru`. Kelemahan O(n) inilah alasan studi kasus di bawah menyimpan pointer `tail` tambahan agar insert belakang O(1).
- **`insertAfter(prev, x)` (O(1)):** operasi primitif paling penting — dengan pointer `prev` yang sudah diketahui, selipkan node baru di belakangnya: `baru->next = prev->next; prev->next = baru;`. Urutan sama pentingnya: jika `prev->next = baru` dulu, sisa list setelah prev terputus. Guard `if (!prev) return;` mencegah dereference nullptr.
- **`deleteFirst` (O(1)):** simpan head lama di `tmp`, majukan head, baru `delete tmp`. Tanpa `tmp`, setelah `head = head->next` tidak ada lagi yang menunjuk node lama → leak. Guard list kosong mencegah crash.
- **`deleteLast` (O(n)):** dua kasus khusus — kosong (return) dan 1 elemen (`head->next == nullptr` → delete head, head = nullptr; tanpa cabang ini, loop `t->next->next` akan dereference nullptr). Untuk ≥2 elemen, `t` berhenti di **sebelum tail** (`while (t->next->next)`), lalu tail di-delete dan `t->next = nullptr` (t menjadi tail baru, wajib di-null-kan agar traversal berhenti).
- **`display`:** pointer jalan `t` dari head sampai `nullptr`, mencetak tiap data. Kondisi `t` ekuivalen `t != nullptr`. Kompleksitas O(n).
- **Destructor `~LinkedList`:** dipanggil otomatis saat objek keluar scope; menghapus semua node satu per satu. Tanpanya, setiap `new` tanpa `delete` menumpuk → **memory leak**. Inilah RAII paling sederhana di C++.

### Senarai Berantai Ganda

**Ide sederhana:** gerbong punya sambungan depan-belakang. Jadi bisa jalan maju dan mundur. Simpan ke `dlist.cpp` lalu jalan.

```cpp
#include <iostream>
using namespace std;
struct DNode { int data; DNode *prev, *next; };

class DList {
    DNode *head, *tail;
public:
    DList(): head(nullptr), tail(nullptr) {}
    void tambahBelakang(int x) {
        DNode* b = new DNode{x, tail, nullptr};
        if (!head) head = tail = b;
        else { tail->next = b; tail = b; }
    }
    void cetakMaju() {
        cout << "maju: ";
        for (DNode* t = head; t; t = t->next) cout << t->data << " ";
        cout << endl;
    }
    void cetakMundur() {
        cout << "mundur: ";
        for (DNode* t = tail; t; t = t->prev) cout << t->data << " ";
        cout << endl;
    }
};

// Contoh pakai. Simpan SEMUA kode ke dlist.cpp
int main() {
    DList d;
    d.tambahBelakang(10); d.tambahBelakang(20); d.tambahBelakang(30);
    d.cetakMaju();   // 10 20 30
    d.cetakMundur(); // 30 20 10
    return 0;
}
```

**Cara menjalankan:** `g++ -std=c++17 dlist.cpp -o dlist` lalu `./dlist`. Output: `maju: 10 20 30` dan `mundur: 30 20 10`.

> **Istilah penting:** Penunjuk `prev` mengarah ke simpul sebelumnya, sedangkan penunjuk `next` mengarah ke simpul berikutnya.

**Penjelasan:** Program menghubungkan simpul baru dengan `tail` lama, kemudian memindahkan `tail` ke simpul baru. Penunjuk `prev` pada simpul pertama harus bernilai `nullptr`. Program harus memperbarui `head->prev` setelah penghapusan agar penelusuran mundur tetap valid.

### Senarai Berantai Melingkar

**Gagasan utama:** Senarai berantai melingkar menghubungkan simpul terakhir kembali ke simpul pertama. Struktur ini sesuai untuk proses berulang, seperti penjadwalan *round-robin* atau simulasi kursi musik. Simpan contoh program sebagai `clist.cpp`.

```cpp
#include <iostream>
using namespace std;
struct CNode { int data; CNode* next; };

int main() {
    // buat lingkaran 1 -> 2 -> 3 -> balik ke 1
    CNode* n1 = new CNode{1, nullptr};
    CNode* n2 = new CNode{2, nullptr};
    CNode* n3 = new CNode{3, nullptr};
    n1->next = n2; n2->next = n3; n3->next = n1; // melingkar!
    CNode* head = n1;
    cout << "2 putaran: ";
    CNode* t = head;
    for (int i = 0; i < 6; i++) { cout << t->data << " "; t = t->next; }
    cout << endl;
    // traversal wajib do-while biar berhenti pas balik ke head:
    cout << "1 putaran (do-while): ";
    t = head;
    if (head) {
        do { cout << t->data << " "; t = t->next; } while (t != head);
    }
    cout << endl;
    return 0;
}
```

**Cara menjalankan:** `g++ -std=c++17 clist.cpp -o clist` lalu `./clist`. Output: `2 putaran: 1 2 3 1 2 3` dan `1 putaran (do-while): 1 2 3`.

**Penjelasan (kalimat pendek):** karena tidak ada ujung, pakai `do-while` yang berhenti saat balik ke awal. Kalau pakai `while(t)` biasa, tidak pernah berhenti karena tidak ada yang kosong.

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

**Cara menjalankan:** simpan ke `antrean.cpp`, lalu `g++ -std=c++17 antrean.cpp -o antrean` lalu `./antrean`.

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

> **Ringkasan operasi:** Fungsi `datang` menambahkan pelanggan di belakang, fungsi `layani` menghapus pelanggan terdepan, dan fungsi `tampil` menampilkan seluruh pelanggan. Penyimpanan `head` dan `tail` memungkinkan operasi penambahan serta pelayanan berjalan dalam O(1).

## 6. Tugas Praktikum 🧩

> Kumpulkan setiap tugas dalam bentuk **berkas `.cpp`, tangkapan layar keluaran, dan analisis dalam laporan**. Pastikan `g++ -std=c++17` dapat mengompilasi program tanpa galat. Jelaskan pula cara destruktor mencegah kebocoran memori.

### 🟢 Tingkat Dasar — *Operasi Dasar*

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

### 🟡 Tingkat Menengah — *Dua Arah dan Melingkar*

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

### 🔴 Tingkat Lanjut — *Algoritma dan Tanggung Jawab Memori*

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
