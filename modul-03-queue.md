# Modul 3: Queue (Antrean)

> **Mata Kuliah:** Struktur Data | **Durasi:** 1 × 100 menit | **Prasyarat:** Modul 2

## 1. Capaian Pembelajaran

1. Menjelaskan prinsip FIFO dan operasi Enqueue, Dequeue, Front, Rear.
2. Mengimplementasikan Linear Queue dan Circular Queue, menjelaskan masalah *memory wastage*.
3. Mengenal Priority Queue.
4. Mensimulasikan antrean layanan bank / printer spooler.
5. Menjelaskan sejarah Queue (teori antrean Erlang) dan merefleksikan nilai filosofisnya (keadilan & kesabaran).

## 2. Sejarah & Nilai Filosofis

**Sejarah singkat.** Teori antrean lahir dari masalah nyata: insinyur telepon Denmark **Agner Krarup Erlang (1909)** harus menghitung berapa operator yang dibutuhkan sentral telepon Kopenhagen agar penelepon tidak menunggu terlalu lama. Dari situ lahir rumus Erlang-B/C yang masih dipakai provider telekomunikasi hingga kini. Di ilmu komputer, antrean menjadi tulang punggung sistem: *print spooler* (cetakan mengantre), *job scheduler* OS, *buffer* jaringan, dan — yang menjembatani modul ini ke Modul 6 — ***Breadth-First Search* (BFS)**: graf dijelajahi lapis demi lapis dengan queue. Varian *circular buffer* lahir dari keterbatasan memori embedded: indeks melingkar agar sel terpakai ulang tanpa geser data. Adapun *priority queue* (biasanya heap, **J. W. J. Williams, 1964**) lahir dari kebutuhan yang berlawanan: tidak semua pelanggan sama — pasien gawat darurat harus menyalip antrean.

**Mengapa FIFO itu revolusioner?** Sebelum antrean formal, pelayanan bersifat rebutan (siapa kuat dia dulu). FIFO menegakkan prinsip *yang datang dulu, dilayani dulu* — sederhana, transparan, dan bisa diaudit. Circular queue menambahkan pelajaran efisiensi: sumber daya yang sudah dipakai (sel depan) bisa *didaur ulang*, bukan dibuang. Priority queue menambahkan kebijaksanaan: keadilan murni kadang harus mengalah pada kemaslahatan ( nyawa > urutan datang).

**Nilai filosofis — keadilan, kesabaran, dan prioritas.**
- *Antre = menghormati waktu orang lain.* Menyerobot antrean dalam kode (race condition) sama tercelanya dengan menyerobot antrean di loket: merusak kepercayaan sistem.
- *Sabar dalam proses.* Queue mengajarkan bahwa setiap elemen pasti mendapat giliran — tidak ada yang dilompati (FIFO murni). Dalam belajar: kuasai dasar dulu sebelum melompat ke materi lanjut.
- *Keadilan vs kasih.* Bank memakai FIFO (adil), IGD memakai prioritas (kasih). Programmer yang bijak tahu kapan memakai `queue` dan kapan memakai `priority_queue` — salah pilih bisa fatal (pasien gawat ikut antre) atau boros (VIP menunggu hal sepele).
- *Siklus kehidupan.* Circular queue (modulo) adalah metafora "kembali ke awal": memori, musim, dan kesempatan berputar. Yang kosong di depan akan terisi lagi — asalkan sistemnya dirancang melingkar, bukan linier yang boros.

> Renungan untuk laporan: amati satu antrean nyata (kantin, bank, SPBU). Apakah ia FIFO murni, circular (nomor berputar), atau prioritas (jalur lansia/disabilitas)? Apa yang terjadi jika aturannya dilanggar — dan bagaimana Anda memodelkannya dalam kode?

## 3. Konsep FIFO (diperdalam)

Queue = antrean loket: **pertama masuk, pertama keluar** (First In, First Out). `FRONT` = depan (keluar), `REAR` = belakang (masuk). Kebalikan dari Stack: operasi terjadi di **dua ujung berbeda**, tapi masing-masing tetap O(1).

![FIFO queue](https://cdn.programiz.com/sites/tutorial2program/files/queue.png)
*Gambar 1. Elemen 1 keluar sebelum 2. Sumber: Programiz.*

![Enqueue Dequeue FRONT REAR](https://cdn.programiz.com/sites/tutorial2program/files/Queue-program-enqueue-dequeue.png)
*Gambar 2. Pergerakan FRONT/REAR. Sumber: Programiz.*

![Circular increment](https://cdn.programiz.com/sites/tutorial2program/files/circular-increment.png)
*Gambar 3. Circular queue: posisi kembali ke awal. Sumber: Programiz.*

### Masalah Linear Queue (memory wastage)

Pada array, setiap dequeue menggeser `FRONT` maju → sel depan **terbuang** (memory wastage) meski masih kosong. Contoh kapasitas 5: enqueue 5 elemen (REAR=4, penuh), dequeue 3 kali (FRONT=3) → hanya 2 elemen tersisa tapi `enqueue` menolak karena `REAR == MAX-1`. Solusi: **Circular Queue** dengan aritmetika modulo `(REAR+1) % SIZE` sehingga indeks kembali ke 0.

| Variasi | Ciri | Kondisi Full | Kapan dipakai |
|---|---|---|---|
| Linear | FRONT hanya maju | `REAR == SIZE-1` | Pengantar konsep saja |
| Circular | Melingkar via modulo | `(REAR+1)%SIZE == FRONT` | Buffer, printer spooler, BFS |
| Priority | Prioritas keluar dulu (heap) | tergantung heap | Penjadwalan, rumah sakit |
| Deque | Dua ujung (depan-belakang) | tergantung implementasi | Sliding window, palindrom |

### Mengapa operasi ujung selalu O(1)? (pendalaman)

Baik enqueue (di REAR) maupun dequeue (di FRONT), keduanya menyentuh langsung indeks yang sudah diketahui — tanpa geser, tanpa pencarian. Inilah bedanya dengan `vector::erase(begin())` yang O(n) karena menggeser semua elemen. Harga yang dibayar queue array: kapasitas tetap + logika bungkus (modulo) + satu sel korban (atau variabel `count`). Queue linked-list membayar dengan pointer + alokasi per elemen.

### Deque: kakak queue yang lebih bebas

`std::deque` (*double-ended queue*) mengizinkan insert/delete di **kedua ujung** O(1) — gabungan stack + queue. Kegunaannya: cek palindrom (bandingkan depan-belakang), *sliding window maximum*, dan basis default `std::stack`/`std::queue` di STL. Jika soal butuh "antre tapi kadang menyalip dari depan", deque jawabannya.

### Kesalahan umum pemula

1. **Lupa membangunkan FRONT** (`if (isEmpty()) FRONT = 0;`) — queue dianggap kosong selamanya walau REAR bergerak.
2. **Lupa reset saat elemen terakhir keluar** (`FRONT == REAR → -1,-1`) — `isEmpty()` tidak pernah benar lagi.
3. **`pop()` STL void** — wajib `front()` dulu baru `pop()`. Menulis `x = q.pop();` tidak compile; menulis `q.pop()` tanpa baca dulu = data hilang.
4. **Modulo bilangan negatif** — `(REAR+1)%SIZE` aman karena REAR ≥ -1, tetapi rumus umum `(FRONT-1+SIZE)%SIZE` wajib tambah SIZE dulu agar tidak negatif.
5. **Comparator priority_queue terbalik** — `return true` berarti "a tenggelam" (kalah prioritas). Uji selalu dengan 3 data yang urutan insert ≠ urutan keluar.

### Queue di dunia nyata

- **Sistem operasi:** print spooler, thread pool, interrupt buffer, packet queue router.
- **BFS (Modul 6):** antrean vertex yang belum dikunjungi — jaminan jarak terpendek.
- **Streaming & embedded:** circular buffer audio/video (produsen-konsumen beda kecepatan).
- **Layanan:** bank, kasir, IGD (prioritas), penjadwalan CPU.

## 4. Implementasi

### 4.1 Linear Queue (Array)

**Tujuan kode:** memahami peran ganda FRONT/REAR dan konvensi kosong `FRONT == REAR == -1` sebelum naik ke versi circular yang lebih rumit.

```cpp
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
};
```

**Penjelasan detail:**

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

### 4.2 Circular Queue

**Tujuan kode:** memperbaiki linear queue — indeks **membungkus** dengan modulo sehingga sel depan yang kosong bisa dipakai lagi. Satu-satunya konsep baru adalah `(x+1) % SIZE`.

```cpp
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
};
```

**Penjelasan detail:**

- **Modulo sebagai "belokan":** `(REAR+1) % SIZE` memetakan `4 → 0` (untuk SIZE 5). Jadi setelah REAR=4, enqueue berikut menempati sel 0 yang sudah kosong — tidak ada sel terbuang selama jumlah elemen < SIZE.
- **`isFull`: `(REAR+1)%SIZE == FRONT`** — "slot berikutnya dari REAR adalah FRONT" berarti lingkaran penuh. Konsekuensinya ada **satu sel yang selalu dikorbankan** (kapasitas efektif SIZE−1) agar kondisi full bisa dibedakan dari kondisi `FRONT == REAR` yang dipakai untuk... elemen tunggal! Alternatif tanpa korban: simpan `count` terpisah (Tugas 3) — full saat `count == SIZE`, empty saat `count == 0`.
- **`enqueue`:** urutan guard → bangunkan FRONT → majukan REAR melingkar → tulis. Perhatikan REAR awal -1: `(-1+1)%5 = 0` → slot 0, benar untuk elemen pertama (di C++ `(-1+1)` = 0 dulu baru modulo, aman; hati-hati modulo bilangan negatif murni di kasus lain).
- **`dequeue`:** identik dengan linear kecuali `FRONT = (FRONT+1)%SIZE` (maju melingkar). Cabang reset terakhir tetap ada.
- **Trace SIZE=5:** enqueue 10,20,30,40,50 → F=0,R=4 (full, karena (4+1)%5=0==F). dequeue×2 → F=2 (10,20 keluar). enqueue(60) → R=(4+1)%5=0 → sel 0 dipakai ulang! Isi logis: 30,40,50,60. Inilah yang mustahil di linear queue.
- **Kompleksitas:** tetap O(1) semua operasi; modulo adalah operasi aritmetika konstan.

### 4.3 Priority Queue (pengenalan, STL)

**Ide:** bukan FIFO murni — yang keluar duluan adalah prioritas tertinggi (diimplementasikan dengan **heap**, bukan array geser). Contoh: IGD rumah sakit, penjadwalan CPU, printer VIP.

```cpp
#include <queue>
#include <iostream>
using namespace std;
int main() {
    priority_queue<int> pq; // max-heap: terbesar keluar dulu
    pq.push(30); pq.push(10); pq.push(50);
    while (!pq.empty()) { cout << pq.top() << " "; pq.pop(); }
    // output: 50 30 10
    return 0;
}
```

**Penjelasan:**

- `priority_queue<int> pq` — default = **max-heap**: `top()` selalu elemen terbesar, bukan yang terdahulu. Push 30,10,50 → internal heap menata ulang (bukan urutan insert).
- `push` O(log n) (naik/turun heap), `top` O(1), `pop` O(log n) — sedikit lebih mahal dari queue biasa O(1), harga untuk prioritas.
- Output `50 30 10` membuktikan urutan keluar = urutan nilai, bukan urutan masuk. Untuk min-heap (terkecil dulu): `priority_queue<int, vector<int>, greater<int>>`.
- Untuk tipe custom (struct Nasabah), heap butuh **comparator** — lihat studi kasus di bawah.

## 5. Studi Kasus: Antrean Bank & Printer Spooler

**Soal dua bagian:** (1) bank 1 loket = FIFO murni dengan `std::queue`; (2) printer = prioritas (dokumen VIP menyalip) dengan `priority_queue` + comparator custom.

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

**Contoh output:**
```
Melayani: Ahmad
Berikutnya: Budi

Urutan cetak:
- Surat-Penting-VIP
- Dokumen-10hlm
- Tugas-5hlm
```

## 6. Tugas Praktikum 🧩

> Kumpulkan tiap tugas sebagai **file `.cpp` + screenshot output + analisis di laporan**. Pastikan `g++ -std=c++17` tanpa error.

### 🟢 Level Beginner — *Memahami Gerakan Dasar*

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

### 🟡 Level Medium — *Menerapkan Varian*

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

### 🔴 Level Expert — *Menggabungkan & Menganalisis*

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
