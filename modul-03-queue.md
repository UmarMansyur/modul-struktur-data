# Modul 3: Antrean (*Queue*)

> **Mata Kuliah:** Struktur Data | **Durasi:** 1 × 100 menit | **Prasyarat:** Modul 2

> **Panduan menjalankan program:**
> 1. Salin satu contoh program secara utuh ke dalam berkas `.cpp`.
> 2. Kompilasi program dengan perintah `g++ -std=c++17 nama.cpp -o nama`.
> 3. Jalankan program dengan perintah `./nama` pada Linux/macOS atau `.\nama.exe` pada Windows.
> 4. Bandingkan keluaran program dengan contoh keluaran pada bagian terkait.

## 1. Capaian Pembelajaran

Setelah menyelesaikan modul ini, mahasiswa mampu:

1. Menjelaskan prinsip FIFO dan operasi `enqueue`, `dequeue`, `front`, serta `rear`.
2. Mengimplementasikan antrean linear dan antrean melingkar serta menjelaskan masalah pemborosan ruang memori.
3. Menjelaskan prinsip dasar antrean berprioritas (*priority queue*).
4. Mensimulasikan antrean layanan bank dan penjadwalan dokumen pada pencetak.
5. Menjelaskan sejarah teori antrean dan menghubungkan prinsip FIFO dengan penerapannya.

## 2. Sejarah dan Nilai Filosofis

**Sejarah singkat.** Teori antrean lahir dari masalah nyata: insinyur telepon Denmark **Agner Krarup Erlang (1909)** harus menghitung berapa operator yang dibutuhkan sentral telepon Kopenhagen agar penelepon tidak menunggu terlalu lama. Dari situ lahir rumus Erlang-B/C yang masih dipakai provider telekomunikasi hingga kini. Di ilmu komputer, antrean menjadi tulang punggung sistem: *print spooler* (cetakan mengantre), *job scheduler* OS, *buffer* jaringan, dan — yang menjembatani modul ini ke Modul 6 — ***Breadth-First Search* (BFS)**: graf dijelajahi lapis demi lapis dengan queue. Varian *circular buffer* lahir dari keterbatasan memori embedded: indeks melingkar agar sel terpakai ulang tanpa geser data. Adapun *priority queue* (biasanya heap, **J. W. J. Williams, 1964**) lahir dari kebutuhan yang berlawanan: tidak semua pelanggan sama — pasien gawat darurat harus menyalip antrean.

**Mengapa FIFO itu revolusioner?** Sebelum antrean formal, pelayanan bersifat rebutan (siapa kuat dia dulu). FIFO menegakkan prinsip *yang datang dulu, dilayani dulu* — sederhana, transparan, dan bisa diaudit. Circular queue menambahkan pelajaran efisiensi: sumber daya yang sudah dipakai (sel depan) bisa *didaur ulang*, bukan dibuang. Priority queue menambahkan kebijaksanaan: keadilan murni kadang harus mengalah pada kemaslahatan ( nyawa > urutan datang).

**Nilai filosofis — keadilan, kesabaran, dan prioritas.**
- *Antre = menghormati waktu orang lain.* Menyerobot antrean dalam kode (race condition) sama tercelanya dengan menyerobot antrean di loket: merusak kepercayaan sistem.
- *Sabar dalam proses.* Queue mengajarkan bahwa setiap elemen pasti mendapat giliran — tidak ada yang dilompati (FIFO murni). Dalam belajar: kuasai dasar dulu sebelum melompat ke materi lanjut.
- *Keadilan vs kasih.* Bank memakai FIFO (adil), IGD memakai prioritas (kasih). Programmer yang bijak tahu kapan memakai `queue` dan kapan memakai `priority_queue` — salah pilih bisa fatal (pasien gawat ikut antre) atau boros (VIP menunggu hal sepele).
- *Siklus kehidupan.* Circular queue (modulo) adalah metafora "kembali ke awal": memori, musim, dan kesempatan berputar. Yang kosong di depan akan terisi lagi — asalkan sistemnya dirancang melingkar, bukan linier yang boros.

> Renungan untuk laporan: amati satu antrean nyata (kantin, bank, SPBU). Apakah ia FIFO murni, circular (nomor berputar), atau prioritas (jalur lansia/disabilitas)? Apa yang terjadi jika aturannya dilanggar — dan bagaimana Anda memodelkannya dalam kode?

## 3. Konsep FIFO

Antrean menerapkan prinsip **elemen pertama yang masuk akan keluar lebih dahulu** (*First In, First Out* atau FIFO). Variabel `FRONT` menunjuk elemen yang akan keluar, sedangkan `REAR` menunjuk posisi penambahan elemen. Berbeda dari tumpukan, antrean menjalankan operasi pada dua ujung yang berbeda. Setiap operasi utama tetap memiliki kompleksitas waktu O(1).

![FIFO queue](https://cdn.programiz.com/sites/tutorial2program/files/queue.png)
*Gambar 1. Elemen 1 keluar sebelum 2. Sumber: Programiz.*

![Enqueue Dequeue FRONT REAR](https://cdn.programiz.com/sites/tutorial2program/files/Queue-program-enqueue-dequeue.png)
*Gambar 2. Pergerakan FRONT/REAR. Sumber: Programiz.*

![Circular increment](https://cdn.programiz.com/sites/tutorial2program/files/circular-increment.png)
*Gambar 3. Circular queue: posisi kembali ke awal. Sumber: Programiz.*

### Pemborosan Ruang pada Antrean Linear

Pada implementasi berbasis larik, setiap operasi `dequeue` memajukan `FRONT`. Akibatnya, program tidak dapat memakai kembali sel kosong di bagian depan ketika `REAR` sudah mencapai indeks terakhir. Sebagai contoh, antrean berkapasitas lima menolak elemen baru setelah `REAR` mencapai indeks 4, meskipun beberapa elemen di bagian depan sudah keluar. **Antrean melingkar** mengatasi masalah tersebut dengan operasi modulo `(REAR + 1) % SIZE` agar indeks dapat kembali ke awal larik.

| Variasi | Ciri | Kondisi Full | Kapan dipakai |
|---|---|---|---|
| Linear | `FRONT` hanya bergerak maju | `REAR == SIZE - 1` | Pengantar konsep |
| Circular | Melingkar via modulo | `(REAR+1)%SIZE == FRONT` | Buffer, printer spooler, BFS |
| Priority | Prioritas keluar dulu (heap) | tergantung heap | Penjadwalan, rumah sakit |
| Deque | Dua ujung (depan-belakang) | tergantung implementasi | Sliding window, palindrom |

### Mengapa Operasi pada Ujung Antrean Memiliki Kompleksitas O(1)?

Operasi `enqueue` mengakses `REAR`, sedangkan operasi `dequeue` mengakses `FRONT`. Kedua indeks tersebut sudah diketahui sehingga program tidak perlu mencari atau menggeser elemen. Sebaliknya, `vector::erase(begin())` memiliki kompleksitas O(n) karena operasi tersebut menggeser semua elemen setelah posisi awal. Antrean berbasis larik memerlukan kapasitas tetap dan logika modulo. Antrean berbasis senarai berantai memerlukan penunjuk serta alokasi memori untuk setiap elemen.

### Antrean Dua Ujung (*Deque*)

`std::deque` (*double-ended queue*) mendukung penambahan dan penghapusan elemen pada kedua ujung dengan kompleksitas O(1). Struktur ini dapat digunakan untuk memeriksa palindrom, menghitung *sliding window maximum*, serta menjadi kontainer bawaan bagi `std::stack` dan `std::queue`. Gunakan `deque` ketika masalah membutuhkan operasi pada bagian depan dan belakang secara langsung.

### Kesalahan umum pemula

1. **Lupa membangunkan FRONT** (`if (isEmpty()) FRONT = 0;`) — queue dianggap kosong selamanya walau REAR bergerak.
2. **Lupa reset saat elemen terakhir keluar** (`FRONT == REAR → -1,-1`) — `isEmpty()` tidak pernah benar lagi.
3. **`pop()` STL void** — wajib `front()` dulu baru `pop()`. Menulis `x = q.pop();` tidak compile; menulis `q.pop()` tanpa baca dulu = data hilang.
4. **Modulo bilangan negatif** — `(REAR+1)%SIZE` aman karena REAR ≥ -1, tetapi rumus umum `(FRONT-1+SIZE)%SIZE` wajib tambah SIZE dulu agar tidak negatif.
5. **Comparator priority_queue terbalik** — `return true` berarti "a tenggelam" (kalah prioritas). Uji selalu dengan 3 data yang urutan insert ≠ urutan keluar.

### Penerapan Antrean

- **Sistem operasi:** print spooler, thread pool, interrupt buffer, packet queue router.
- **BFS (Modul 6):** antrean vertex yang belum dikunjungi — jaminan jarak terpendek.
- **Streaming & embedded:** circular buffer audio/video (produsen-konsumen beda kecepatan).
- **Layanan:** bank, kasir, IGD (prioritas), penjadwalan CPU.

## 4. Implementasi

### 4.1 Antrean Linear Berbasis Larik

**Tujuan program:** Program menunjukkan fungsi `FRONT` dan `REAR` serta menggunakan kondisi `FRONT == REAR == -1` untuk menandai antrean kosong. Pemahaman ini menjadi dasar sebelum mahasiswa mempelajari antrean melingkar.

```cpp
#include <iostream>
using namespace std;
#define MAX 100
class Queue {
    int data[MAX]; int FRONT, REAR;
public:
    Queue(): FRONT(-1), REAR(-1) {}
    bool isEmpty() { return FRONT == -1; }
    void enqueue(int x) {
        if (REAR == MAX-1) { cout << "Overflow\n"; return; }
        if (isEmpty()) FRONT = 0;
        data[++REAR] = x;
    }
    int dequeue() {
        if (isEmpty()) { cout << "Underflow\n"; return -1; }
        int v = data[FRONT];
        if (FRONT == REAR) FRONT = REAR = -1;
        else FRONT++;
        return v;
    }
    int front() { return isEmpty() ? -1 : data[FRONT]; }
    void cetak() {
        if (isEmpty()) { cout << "[kosong]"; return; }
        cout << "[depan] ";
        for (int i = FRONT; i <= REAR; i++) cout << data[i] << " ";
        cout << "[belakang] (FRONT=" << FRONT << " REAR=" << REAR << ")";
    }
};

// Contoh pakai yang bisa langsung jalan.
// Simpan SEMUA kode ke file queue_linear.cpp
int main() {
    Queue q;
    q.enqueue(10); cout << "masuk 10: "; q.cetak(); cout << endl;
    q.enqueue(20); cout << "masuk 20: "; q.cetak(); cout << endl;
    q.enqueue(30); cout << "masuk 30: "; q.cetak(); cout << endl;
    cout << "depan = " << q.front() << " (cuma ngintip)" << endl;
    cout << "keluar = " << q.dequeue() << endl;
    cout << "sesudah keluar: "; q.cetak(); cout << endl;
    cout << "keluar = " << q.dequeue() << endl;
    cout << "keluar = " << q.dequeue() << endl;
    cout << "isi akhir: "; q.cetak(); cout << endl;
    cout << "coba keluar saat kosong = " << q.dequeue() << endl;
    return 0;
}
```

**Cara menjalankan:**

```bash
g++ -std=c++17 queue_linear.cpp -o queue_linear
./queue_linear
# di Windows: .\queue_linear.exe
```

**Output:**

```text
masuk 10: [depan] 10 [belakang] (FRONT=0 REAR=0)
masuk 20: [depan] 10 20 [belakang] (FRONT=0 REAR=1)
masuk 30: [depan] 10 20 30 [belakang] (FRONT=0 REAR=2)
depan = 10 (cuma ngintip)
keluar = 10
sesudah keluar: [depan] 20 30 [belakang] (FRONT=1 REAR=2)
keluar = 20
keluar = 30
isi akhir: [kosong]
Underflow
coba keluar saat kosong = -1
```

> **Istilah penting:**
> - **Antrean (*queue*)** melayani elemen berdasarkan urutan kedatangannya.
> - **FIFO (*First In, First Out*)** berarti elemen pertama yang masuk akan keluar lebih dahulu.
> - Operasi **`enqueue`** menambahkan elemen dari belakang, **`dequeue`** menghapus elemen dari depan, dan **`front`** membaca elemen terdepan.
> - Variabel **`FRONT`** menunjuk elemen terdepan, sedangkan **`REAR`** menunjuk elemen paling belakang.

**Penjelasan program:**

- **Konstruktor `FRONT = REAR = -1`:** menandai kosong. Alternatif populer: `front = 0, rear = -1, count = 0` (Tugas 3) yang tidak butuh reset — tapi konvensi -1/-1 di sini paling mudah untuk pemula.
- **`enqueue`:**
  - Guard `REAR == MAX-1` = overflow. Perhatikan kelemahannya: guard ini tidak tahu sel depan sudah kosong (inilah memory wastage — REAR mentok walau FRONT sudah jauh).
  - `if (isEmpty()) FRONT = 0;` — enqueue **pertama** membangunkan FRONT dari -1 ke 0. Enqueue berikutnya tidak menyentuh FRONT (hanya REAR yang bergerak). Lupa baris ini = FRONT tetap -1 = queue dianggap kosong selamanya.
  - `data[++REAR] = x` — pre-increment seperti push stack: REAR menunjuk slot terisi terakhir.
- **`dequeue`:**
  - Simpan `v = data[FRONT]` dulu (nilai harus diamankan sebelum indeks digeser).
  - **Kasus elemen terakhir (`FRONT == REAR`):** reset keduanya ke -1 agar queue kembali ke status kosong murni. Tanpa reset, FRONT akan melampaui REAR dan `isEmpty()` (yang hanya cek `FRONT == -1`) tidak akan pernah benar lagi — bug klasik.
  - Kasus umum: `FRONT++` (depan maju satu). Elemen lama tidak dihapus fisik, hanya ditinggalkan — akan tertimpa enqueue jauh nanti (atau tidak pernah, itulah pemborosan).
  - Return `v` (nilai yang keluar), bukan indeks.
- **`front` (peek):** mengintip tanpa menggeser — dipakai simulasi bank ("siapa berikutnya?") dan BFS.
- **Trace kapasitas 3:** enqueue(10,20) → F=0,R=1; dequeue → return 10, F=1; dequeue → return 20, F=R=1→reset F=R=-1 (kosong); dequeue → "Underflow".
- **Kompleksitas:** semua O(1). Kelemahan satu-satunya adalah wastage di atas.

### 4.2 Antrean Melingkar

**Tujuan program:** Program memperbaiki keterbatasan antrean linear dengan membungkus indeks melalui operasi modulo. Dengan cara ini, program dapat menggunakan kembali sel kosong di bagian depan. Rumus utama yang digunakan adalah `(x + 1) % SIZE`.

```cpp
#include <iostream>
using namespace std;
#define SIZE 5
class CircularQueue {
    int data[SIZE]; int FRONT, REAR;
public:
    CircularQueue(): FRONT(-1), REAR(-1) {}
    bool isEmpty() { return FRONT == -1; }
    bool isFull() { return (REAR+1)%SIZE == FRONT; }
    void enqueue(int x) {
        if (isFull()) { cout << "Penuh!\n"; return; }
        if (isEmpty()) FRONT = 0;
        REAR = (REAR+1)%SIZE; data[REAR] = x;
    }
    int dequeue() {
        if (isEmpty()) { cout << "Kosong!\n"; return -1; }
        int v = data[FRONT];
        if (FRONT == REAR) FRONT = REAR = -1;
        else FRONT = (FRONT+1)%SIZE;
        return v;
    }
    void cetak() {
        if (isEmpty()) { cout << "[kosong]"; return; }
        cout << "isi (dari depan): ";
        int i = FRONT;
        while (true) {
            cout << data[i] << " ";
            if (i == REAR) break;
            i = (i+1)%SIZE;
        }
        cout << "(FRONT=" << FRONT << " REAR=" << REAR << ")";
    }
};

// Contoh pakai yang bisa langsung jalan.
// Simpan ke file queue_circular.cpp
int main() {
    CircularQueue q;
    cout << "Isi 10,20,30,40:" << endl;
    q.enqueue(10); q.enqueue(20); q.enqueue(30); q.enqueue(40);
    q.cetak(); cout << endl;
    cout << "keluar 2 orang: " << q.dequeue() << ", " << q.dequeue() << endl;
    q.cetak(); cout << endl;
    cout << "Masuk 50,60 (60 pakai tempat kosong depan):" << endl;
    q.enqueue(50); q.enqueue(60);
    q.cetak(); cout << endl;
    cout << "Coba masuk 70 (harusnya Penuh!):" << endl;
    q.enqueue(70);
    q.cetak(); cout << endl;
    return 0;
}
```

**Cara menjalankan:**

```bash
g++ -std=c++17 queue_circular.cpp -o queue_circular
./queue_circular
```

**Output:**

```text
Isi 10,20,30,40:
isi (dari depan): 10 20 30 40 (FRONT=0 REAR=3)
keluar 2 orang: 10, 20
isi (dari depan): 30 40 (FRONT=2 REAR=3)
Masuk 50,60 (60 pakai tempat kosong depan):
isi (dari depan): 30 40 50 60 (FRONT=2 REAR=0)
Coba masuk 70 (harusnya Penuh!):
Penuh!
isi (dari depan): 30 40 50 60 (FRONT=2 REAR=0)
```

> **Istilah penting:**
> - Antrean **melingkar (*circular*)** mengembalikan indeks ke awal setelah mencapai indeks terakhir sehingga program dapat memakai kembali ruang kosong.
> - Operator **modulo (`%`)** menghasilkan sisa pembagian. Sebagai contoh, `(4 + 1) % 5 = 0` mengembalikan indeks 4 ke indeks 0.
> - **Pemborosan ruang (*memory wastage*)** terjadi ketika larik masih memiliki sel kosong, tetapi implementasi antrean linear tidak dapat menggunakannya kembali.

**Penjelasan program:**

- **Modulo sebagai "belokan":** `(REAR+1) % SIZE` memetakan `4 → 0` (untuk SIZE 5). Jadi setelah REAR=4, enqueue berikut menempati sel 0 yang sudah kosong — tidak ada sel terbuang selama jumlah elemen < SIZE.
- **`isFull`: `(REAR+1)%SIZE == FRONT`** — "slot berikutnya dari REAR adalah FRONT" berarti lingkaran penuh. Konsekuensinya ada **satu sel yang selalu dikorbankan** (kapasitas efektif SIZE−1) agar kondisi full bisa dibedakan dari kondisi `FRONT == REAR` yang dipakai untuk... elemen tunggal! Alternatif tanpa korban: simpan `count` terpisah (Tugas 3) — full saat `count == SIZE`, empty saat `count == 0`.
- **`enqueue`:** urutan guard → bangunkan FRONT → majukan REAR melingkar → tulis. Perhatikan REAR awal -1: `(-1+1)%5 = 0` → slot 0, benar untuk elemen pertama (di C++ `(-1+1)` = 0 dulu baru modulo, aman; hati-hati modulo bilangan negatif murni di kasus lain).
- **`dequeue`:** identik dengan linear kecuali `FRONT = (FRONT+1)%SIZE` (maju melingkar). Cabang reset terakhir tetap ada.
- **Jejak untuk `SIZE = 5`:** Program menerima `10, 20, 30, 40` sehingga `FRONT = 0` dan `REAR = 3`. Kapasitas efektifnya berjumlah empat elemen karena implementasi mengorbankan satu sel. Setelah dua operasi `dequeue`, `FRONT` berpindah ke indeks 2. Program kemudian memasukkan `50` pada indeks 4 dan `60` pada indeks 0. Isi logis antrean menjadi `30, 40, 50, 60`. Contoh ini menunjukkan bahwa antrean melingkar dapat menggunakan kembali ruang di bagian depan.
- **Kompleksitas:** tetap O(1) semua operasi; modulo adalah operasi aritmetika konstan.

### 4.3 Pengenalan Antrean Berprioritas dengan STL

**Gagasan utama:** Antrean berprioritas mengeluarkan elemen berdasarkan tingkat kepentingannya, bukan semata-mata berdasarkan urutan kedatangan. Sebagai contoh, layanan gawat darurat mendahulukan pasien dengan kondisi paling kritis. C++ biasanya mengimplementasikan struktur ini dengan *heap*.

```cpp
#include <queue>
#include <iostream>
using namespace std;
// Simpan ke file queue_prioritas.cpp
int main() {
    priority_queue<int> pq; // max-heap: terbesar keluar dulu
    cout << "Masuk: 30, 10, 50" << endl;
    pq.push(30); pq.push(10); pq.push(50);
    cout << "Keluar (yang besar dulu): ";
    while (!pq.empty()) { cout << pq.top() << " "; pq.pop(); }
    cout << endl;
    // output: 50 30 10
    return 0;
}
```

**Cara menjalankan:** `g++ -std=c++17 queue_prioritas.cpp -o queue_prioritas` lalu `./queue_prioritas`. Output: `Keluar (yang besar dulu): 50 30 10`.

> **Istilah penting:** **Prioritas** menunjukkan tingkat kepentingan suatu elemen, sedangkan **heap** mengatur data agar elemen dengan prioritas tertinggi dapat diakses secara efisien.

**Penjelasan (kalimat pendek):**

- `priority_queue<int> pq` — default = **max-heap**: `top()` selalu elemen terbesar, bukan yang terdahulu. Push 30,10,50 → internal heap menata ulang (bukan urutan insert).
- `push` O(log n) (naik/turun heap), `top` O(1), `pop` O(log n) — sedikit lebih mahal dari queue biasa O(1), harga untuk prioritas.
- Output `50 30 10` membuktikan urutan keluar = urutan nilai, bukan urutan masuk. Untuk min-heap (terkecil dulu): `priority_queue<int, vector<int>, greater<int>>`.
- Untuk tipe custom (struct Nasabah), heap butuh **comparator** — lihat studi kasus di bawah.

## 5. Studi Kasus: Antrean Bank dan Penjadwalan Pencetak

**Ruang lingkup studi kasus:** Bagian pertama memodelkan satu loket bank dengan prinsip FIFO menggunakan `std::queue`. Bagian kedua memodelkan penjadwalan dokumen pada pencetak menggunakan `priority_queue` dan pembanding khusus.

```cpp
#include <iostream>
#include <queue>
#include <string>
using namespace std;

struct Nasabah { string nama; int noAntre; bool prioritas; }; // prioritas = lansia/VIP

struct Banding { // comparator untuk priority_queue
    bool operator()(Nasabah a, Nasabah b) {
        return a.prioritas < b.prioritas; // prioritas=true di depan
    }
};

int main() {
    // --- Simulasi Bank: 1 loket, FIFO ---
    queue<string> bank;
    bank.push("Ahmad"); bank.push("Budi"); bank.push("Citra");
    cout << "Melayani: " << bank.front() << endl; bank.pop();
    cout << "Berikutnya: " << bank.front() << endl;

    // --- Printer Spooler dengan prioritas ---
    priority_queue<Nasabah, vector<Nasabah>, Banding> pq;
    pq.push({"Dokumen-10hlm", 1, false});
    pq.push({"Surat-Penting-VIP", 2, true});
    pq.push({"Tugas-5hlm", 3, false});
    cout << "\nUrutan cetak:\n";
    while (!pq.empty()) {
        cout << "- " << pq.top().nama << endl; pq.pop();
    }
    return 0;
}
```

**Penjelasan per bagian:**

1. **Bank (`std::queue<string>`):** `push` = datang (enqueue belakang), `front` = intip depan, `pop` = layani — perhatikan `pop()` STL **tidak mengembalikan nilai** (void!), jadi pola wajibnya selalu `front()` dulu baru `pop()`. Output: "Melayani: Ahmad" lalu "Berikutnya: Budi". Murni FIFO: urutan keluar = urutan datang.
2. **`struct Banding` (comparator):** `priority_queue` memanggil `Banding(a,b)` untuk memutuskan siapa di atas. Semantiknya membingungkan pemula: return `true` berarti **a kalah prioritas dari b** (a tenggelam). `a.prioritas < b.prioritas` → jika a=false(0), b=true(1): `0<1`=true → a tenggelam → b (VIP) naik. Hasil: VIP selalu di `top()`. Tiga parameter template `priority_queue<Nasabah, vector<Nasabah>, Banding>` = (tipe elemen, container dasar, pembanding).
3. **Printer:** push 3 dokumen (VIP di tengah) → heap menaikkan VIP ke top. Loop `while (!empty()) { top; pop; }` mencetak: "Surat-Penting-VIP", lalu dua sisanya (urutan keduanya tak dijamin karena prioritas sama — heap tidak stabil!). Pelajaran: untuk prioritas sama + butuh FIFO, tambahkan nomor antre sebagai tie-breaker di comparator.
4. **Perbandingan:** bank memakai `queue` (O(1), adil), printer memakai `priority_queue` (O(log n), mengutamakan penting). Memilih yang salah = VIP menunggu (rugi) atau pasien gawat ikut antre (fatal).

**Cara menjalankan:** simpan ke `bank_printer.cpp`, lalu `g++ -std=c++17 bank_printer.cpp -o bank_printer` lalu `./bank_printer`.

**Contoh output:**
```
Melayani: Ahmad
Berikutnya: Budi

Urutan cetak:
- Surat-Penting-VIP
- Dokumen-10hlm
- Tugas-5hlm
```

> **Ringkasan:** Antrean bank menggunakan urutan kedatangan, sedangkan penjadwalan pencetak dapat mendahulukan dokumen yang memiliki prioritas lebih tinggi. Kedua contoh program sudah memiliki fungsi `main` dan dapat langsung dikompilasi.

## 6. Tugas Praktikum 🧩

> Kumpulkan setiap tugas dalam bentuk **berkas `.cpp`, tangkapan layar keluaran, dan analisis dalam laporan**. Pastikan `g++ -std=c++17` dapat mengompilasi program tanpa galat.

### 🟢 Tingkat Dasar — *Memahami Langkah Dasar*

**Tugas B1: Linear Queue Manual + Jejak FRONT/REAR (wajib).**
1. Salin class `Queue` dari kode 4.1 ke `queue_b1.cpp`.
2. Di `main`, eksekusi dan **cetak FRONT, REAR, dan isi logis setiap langkah**: `enqueue(10)`, `enqueue(20)`, `dequeue()`, `enqueue(30)`, `dequeue()`, `dequeue()`, `dequeue()` (underflow!).
3. Di laporan jawab: (a) berapa FRONT/REAR tiap langkah? (b) kapan reset `-1,-1` terjadi dan mengapa wajib? (c) tunjukkan satu skenario *memory wastage* (REAR mentok padahal isi sedikit).
*Kriteria nilai:* program jalan (40%), jejak FRONT/REAR benar (30%), jawaban + skenario wastage (30%).

**Tugas B2: Antrean Kantin dengan `std::queue<string>`.**
1. Buat program interaktif: perintah `datang <nama>` (push), `layani` (tampilkan `front()` lalu `pop()`), `lihat` (tampilkan depan + ukuran), `keluar`.
2. Uji dengan skenario: datang Andi, datang Budi, layani, datang Citra, lihat, layani, layani. Dokumentasikan output tiap perintah.
3. Tulis 1 paragraf: mengapa `pop()` STL tidak mengembalikan nilai — dan pola aman apa yang harus dipakai?
*Kriteria nilai:* perintah berjalan (50%), skenario uji lengkap (25%), penjelasan pola front-then-pop (25%).

### 🟡 Tingkat Menengah — *Menerapkan Varian*

**Tugas M1: Circular Queue + Bukti Penghematan.**
1. Salin `CircularQueue` (SIZE=5) ke `queue_m1.cpp`. Lakukan: enqueue 10,20,30,40,50 (hingga full) → dequeue 2× → enqueue 60,70 → cetak isi logis (harusnya 30,40,50,60 — 70 ditolak "Penuh!").
2. Tunjukkan bahwa skenario **yang sama gagal** pada Linear Queue (REAR mentok). Sajikan tabel perbandingan sisi-per-sisi di laporan.
3. Jelaskan di laporan: mengapa `isFull = (REAR+1)%SIZE == FRONT` mengorbankan satu sel? Gambarkan lingkaran 5 sel saat full.
*Kriteria nilai:* demonstrasi reuse sel 0 (40%), perbandingan linear vs circular (30%), penjelasan satu-sel-korban + gambar (30%).

**Tugas M2: Bank 2 Loket + Rata-rata Tunggu.**
1. Buat simulasi: 10 nasabah bernomor 1–10 datang berurutan; nomor genap → loket A (`queue<int>`), ganjil → loket B. Tiap nasabah butuh 3 menit; loket melayani bergantian per menit simulasi (atau hitung analitik: posisi dalam antre × 3 menit).
2. Cetak: urutan layan tiap loket + waktu tunggu tiap nasabah + rata-rata tunggu keseluruhan.
3. Analisis: apa yang terjadi jika 1 loket tutup (semua ke 1 antrean)? Hitung ulang rata-ratanya dan simpulkan.
*Kriteria nilai:* pemisahan genap/ganjil benar (30%), hitung tunggu + rata-rata (40%), analisis 1-loket (30%).

### 🔴 Tingkat Lanjut — *Menggabungkan dan Menganalisis*

**Tugas E1: Queue Linked-List + Circular dengan `count` (tanpa sel korban).**
1. Implementasikan **Queue berbasis Linked List** (enqueue di tail, dequeue di head, O(1) keduanya) — jembatan ke Modul 4. Uji enqueue 5 data + dequeue 2 + tampil.
2. Implementasikan **Circular Queue varian `count`**: field `front, rear, count`; full saat `count == SIZE`, empty saat `count == 0` (tidak ada sel korban!). Buktikan kapasitas efektif = SIZE penuh (enqueue 5 berhasil semua untuk SIZE=5).
3. Bandingkan ketiga implementasi (linear array, circular korban-1, circular count, linked list) dalam tabel: kapasitas efektif, memori, kapan dipakai. Pilih satu untuk *printer spooler* kampus dan pertahankan pilihan Anda 1 paragraf.
*Kriteria nilai:* kedua implementasi benar (50%), bukti kapasitas penuh (20%), tabel banding + justifikasi (30%).

**Tugas E2: Priority Queue IGD + Tie-Breaker Adil.**
1. Perluas studi kasus printer menjadi **IGD**: struct `{nama, kegawatan (1-5), noDatang}`; comparator: kegawatan lebih tinggi dulu; jika sama → `noDatang` lebih kecil dulu (FIFO dalam prioritas sama).
2. Uji dengan 6 pasien (termasuk 2 berprioritas sama tapi datang beda) dan buktikan urutan keluar menghormati keduanya.
3. Refleksi filosofis 1 paragraf: kapan prioritas dibenarkan menabrak FIFO — dan batas apa yang mencegahnya menjadi pilih kasih?
*Kriteria nilai:* comparator 2 kunci benar (40%), uji tie-breaker (30%), refleksi (30%).

## 7. Video Pembelajaran 🎬

1. **freeCodeCamp – Data Structures Full Course (bab Queue 4:32).**
   https://www.youtube.com/watch?v=B31LgI4Y4DQ
2. **Sudhakar Atchala – Queue array (2:17), linked list (2:42), circular (2:58).**
   https://www.youtube.com/watch?v=GlZ5sAPnClA
3. **CodeLucky – Stack and Queue Explained: LIFO vs FIFO.**
   https://www.youtube.com/watch?v=Ws5Vk01WzpU

## 8. Referensi Website 🌐

1. Programiz – *Queue Data Structure* – https://www.programiz.com/dsa/queue
2. Programiz – *Circular Queue* – https://www.programiz.com/dsa/circular-queue
3. Programiz – *Priority Queue* – https://www.programiz.com/dsa/priority-queue
4. GeeksforGeeks – *Queue Data Structure* – https://www.geeksforgeeks.org/dsa/queue-data-structure/
5. GeeksforGeeks – *Circular Queue in C++* – https://www.geeksforgeeks.org/cpp/cpp-program-to-implement-circular-queue/
