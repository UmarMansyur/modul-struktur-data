# Modul 2: Stack (Tumpukan)

> **Mata Kuliah:** Struktur Data | **Durasi:** 1 × 100 menit | **Prasyarat:** Modul 1

## 1. Capaian Pembelajaran

1. Menjelaskan prinsip LIFO dan operasi Push, Pop, Peek/Top, IsEmpty, IsFull.
2. Mengimplementasikan Stack berbasis Array dan berbasis Linked List, membandingkan keduanya.
3. Menyelesaikan konversi Infix → Postfix dan evaluasi ekspresi.
4. Mensimulasikan fitur Undo/Redo pada text editor.
5. Menjelaskan sejarah Stack dan merefleksikan nilai filosofisnya (disiplin LIFO).

## 2. Sejarah & Nilai Filosofis

**Sejarah singkat.** Istilah *stack* (Jerman: *Keller* = gudang/ruang bawah tanah) diperkenalkan oleh **Friedrich L. Bauer dan Klaus Samelson (1957)** untuk mengevaluasi ekspresi dalam bahasa ALGOL — salah satu fondasi bahasa pemrograman modern. Tak lama kemudian **Edsger W. Dijkstra (1961)** memakai tumpukan dalam algoritma *shunting-yard* untuk konversi infix → postfix (Studi Kasus 1 modul ini!). Konsep yang sama melahirkan *pushdown automaton* di teori komputasi dan — yang paling sering Anda pakai tanpa sadar — ***call stack***: setiap pemanggilan fungsi di C++ didorong ke stack memori dan di-pop saat `return`. Itulah sebabnya rekursi yang terlalu dalam menghasilkan error legendaris ***stack overflow*** (nama itu pula yang dipakai forum Q&A terbesar programmer dunia, Stack Overflow, founded 2008).

**Mengapa LIFO menang untuk masalah-masalah ini?** Karena banyak persoalan komputasi bersifat *menunda lalu menyelesaikan secara terbalik*: kurung buka menunggu kurung tutupnya, operator menunggu operandnya, fungsi pemanggil menunggu fungsi yang dipanggil. Stack adalah memori untuk "utang yang belum selesai" — dan utang terakhir selalu dilunasi pertama.

**Nilai filosofis — disiplin menuntaskan.** Bayangkan tumpukan piring kotor: Anda hanya boleh mengambil piring paling atas. Tidak bisa mengambil piring bawah tanpa membereskan yang di atasnya dulu. Itulah LIFO sebagai latihan karakter:
- *Tuntaskan yang terakhir sebelum kembali.* Seperti call stack: fungsi tidak boleh "kabur" sebelum mengembalikan hasil. Dalam hidup: selesaikan tugas yang baru Anda mulai sebelum menumpuk tugas baru.
- *Undo = penyesalan yang tercatat.* Fitur undo/redo mengajarkan bahwa setiap aksi punya konsekuensi yang bisa dibatalkan — asalkan riwayatnya jujur dicatat (stack `undo`). Tanpa catatan, tidak ada jalan kembali.
- *Kesabaran terbalik.* Antrean (Queue) mengajarkan adil ("siapa dulu, dia dulu"); Stack mengajarkan prioritas pada yang *terkini* ("yang baru datang harus dibereskan dulu agar tidak menumpuk"). Keduanya benar — tinggal pilih sesuai masalah. Programmer bijak tahu kapan bersikap antrean dan kapan bersikap tumpukan.
- *Amanah memori.* Setiap `push` tanpa `pop` yang seimbang = stack overflow / memory leak. Sama seperti janji: setiap yang didorong harus dipertanggungjawabkan (di-pop/di-delete).

> Renungan untuk laporan: ceritakan satu kebiasaan sehari-hari Anda yang LIFO (mis. tumpukan baju, riwayat browser Back, Ctrl+Z) dan satu yang FIFO. Kapan Anda memakai masing-masing — dan apa akibatnya jika tertukar?

## 3. Konsep LIFO (diperdalam)

Stack = tumpukan piring: yang **terakhir masuk, pertama keluar** (Last In, First Out). `TOP` menunjuk elemen teratas. Semua operasi hanya di satu ujung, sehingga push/pop/peek **selalu O(1)** — tidak ada traversal.

![Diagram LIFO push/pop](https://upload.wikimedia.org/wikipedia/commons/e/e4/Lifo_stack.svg)
*Gambar 1. Prinsip LIFO. Sumber: Wikimedia Commons (CC0).*

![Stack push pop](https://cdn.programiz.com/sites/tutorial2program/files/stack.png)
*Gambar 2. Push menambah, Pop mengambil elemen teratas. Sumber: Programiz.*

![Operasi TOP](https://cdn.programiz.com/sites/tutorial2program/files/stack-operations.png)
*Gambar 3. `TOP = -1` (kosong), push → `TOP++`, pop → `TOP--`. Sumber: Programiz.*

| Operasi | Fungsi | Kompleksitas | Kondisi gagal |
|---|---|---|---|
| `push(x)` | Tambah ke atas | O(1) | Overflow (array penuh) |
| `pop()` | Ambil + hapus dari atas | O(1) | Underflow (kosong) |
| `peek()/top()` | Intip tanpa hapus | O(1) | Underflow |
| `isEmpty/isFull` | Cek kondisi | O(1) | — |

### Mengapa semua O(1)? (pendalaman)

Karena `TOP` selalu menunjuk ujung operasi, tidak ada pergeseran elemen dan tidak ada pencarian. Bandingkan dengan array biasa: `insert` di tengah butuh geser O(n); di stack, posisi operasi sudah dikunci di satu ujung. Inilah kekuatan sekaligus keterbatasan stack: **super cepat, tapi super kaku** — Anda tidak bisa mengakses elemen tengah tanpa mem-pop semua di atasnya. Kekakuan inilah yang justru membuatnya aman untuk call stack dan parser: tidak ada jalan pintas yang merusak urutan.

### Call stack: stack yang menjalankan program Anda

Setiap kali program C++ memanggil fungsi, sistem mendorong *frame* (alamat kembali + variabel lokal + parameter) ke call stack memori. Saat fungsi `return`, frame di-pop. Urutannya persis LIFO — fungsi yang dipanggil terakhir selesai pertama. Konsekuensinya:
- Rekursi = fungsi memanggil dirinya sendiri = frame menumpuk. Basis rekursi yang hilang → frame menumpuk sampai memori habis → ***stack overflow*** (segmentation fault).
- Variabel lokal (`int data[MAX]` di kode 4.1) hidup di call stack: cepat, otomatis dibersihkan saat fungsi selesai, tapi ukurannya kecil (umumnya 1–8 MB). Array raksasa di stack → overflow; pindahkan ke heap (`new`) atau jadikan `static`.
- Debugger (gdb/VS) menampilkan *call stack trace* saat crash — bacalah dari atas (yang sedang berjalan) ke bawah (yang memanggil). Itulah peta "utang fungsi yang belum selesai".

### Kesalahan umum pemula

1. **Tertukar pre/post increment** (`data[++TOP]` vs `data[TOP++]`) — sumber bug #1 modul ini. Hafalkan: push = naik dulu baru tulis; pop = baca dulu baru turun.
2. **Lupa guard** — pop/peek saat kosong mengembalikan sampah (`-1` di sini menutupi bug; di produksi, lempar `exception` atau pakai `std::optional`).
3. **`top()` + `pop()` STL dipisah** — `std::stack::pop()` bertipe `void` (demi exception-safety), jadi pola wajibnya `auto v = st.top(); st.pop();`. Menulis `x = st.pop();` tidak akan compile.
4. **Stack linked-list bocor** — push memakai `new` tetapi lupa `delete` di pop/destructor → memory leak. Setiap node yang didorong harus ada yang bertanggung jawab mem-pop-nya.

### Stack di dunia nyata

- **Browser Back / Forward:** riwayat halaman = stack (Back = pop ke stack forward).
- **Undo/Redo (VS Code, Word, Photoshop):** dua stack snapshot/delta (Studi Kasus 2).
- **Evaluasi ekspresi & kompilator:** shunting-yard, pengecek kurung, parser.
- **DFS (Modul 6):** menelusuri graf dengan stack (eksplisit atau call stack rekursi).
- **Navigasi maze & backtracking:** maju dengan push, buntu → pop (mundur).

## 4. Implementasi

### 4.1 Berbasis Array (ukuran tetap, risiko overflow)

**Tujuan kode:** implementasi paling hemat dan cepat. `TOP` = indeks elemen teratas; konvensi `TOP = -1` berarti kosong. Pola pre-increment / post-decrement di bawah adalah idiom stack array yang wajib dihafal.

```cpp
#include <iostream>
#define MAX 100
using namespace std;

class StackArray {
    int data[MAX]; int TOP;
public:
    StackArray(): TOP(-1) {}
    bool isEmpty() { return TOP == -1; }
    bool isFull()  { return TOP == MAX-1; }
    void push(int x) {
        if (isFull()) { cout << "Overflow!\n"; return; }
        data[++TOP] = x;
    }
    int pop() {
        if (isEmpty()) { cout << "Underflow!\n"; return -1; }
        return data[TOP--];
    }
    int peek() { return isEmpty() ? -1 : data[TOP]; }
};
```

**Penjelasan detail:**

- `int data[MAX]` — memori **statis** 100 int di stack (bukan heap). Alokasi O(1) sekaligus, cache-friendly (elemen bersebelahan → CPU prefetcher bekerja optimal). Harga: kapasitas tetap; `MAX` terlalu besar = buang memori, terlalu kecil = overflow.
- `TOP = -1` — trik agar `++TOP` pertama menjadi 0 (indeks valid pertama). Alternatif `TOP = 0` = "jumlah elemen" juga populer (`data[TOP++] = x`), tapi konvensi -1 dipakai modul ini konsisten dengan Gambar 3.
- **`push`: `data[++TOP] = x`** — **pre-increment**: naikkan dulu (misal -1→0), baru tulis ke indeks baru. Jika ditulis `data[TOP++] = x` (post), elemen pertama tertulis di indeks -1 → out-of-bounds! Guard `isFull()` mencegah `TOP` melewati `MAX-1`.
- **`pop`: `return data[TOP--]`** — **post-decrement**: baca dulu indeks TOP lama, baru turunkan. Jadi pop mengembalikan nilai teratas sekaligus menghapusnya secara logis (sel memorinya tidak di-nol-kan, hanya tidak dianggap ada — pop berikutnya menimpanya, tidak masalah).
- **`peek`:** sama seperti pop tapi **tanpa `--`** — hanya mengintip. Dipakai algoritma infix (butuh membandingkan operator teratas tanpa membuangnya).
- **Overflow vs Underflow:** overflow = push saat penuh (data akan hilang/tertulis liar tanpa guard); underflow = pop/peek saat kosong (mengembalikan sampah). Kedua guard mencetak pesan + return sentinel `-1` — untuk produksi, lempar exception lebih baik.
- **Trace:** push(10) → TOP=0 `[10]`; push(20) → TOP=1 `[10,20]`; peek → 20 (TOP tetap 1); pop → return 20, TOP=0; pop → return 10, TOP=-1; pop → "Underflow!".

### 4.2 Berbasis Linked List (dinamis, tanpa overflow — pratinjau Modul 4)

**Tujuan kode:** stack yang tumbuh sesuai kebutuhan — tiap push = `insertFirst`, tiap pop = `deleteFirst` dari Modul 4. Ujung stack = head list. Konsep Node/`next` dibahas tuntas di Modul 4; di sini cukup pahami polanya.

```cpp
#include <iostream>
using namespace std;

struct Node { int data; Node* next; };

class StackLL {
    Node* top;
public:
    StackLL(): top(nullptr) {}
    bool isEmpty() { return top == nullptr; }
    void push(int x) {
        Node* b = new Node{x, top};
        top = b;
    }
    int pop() {
        if (isEmpty()) { cout << "Underflow!\n"; return -1; }
        Node* tmp = top; int v = tmp->data;
        top = top->next; delete tmp; return v;
    }
    int peek() { return isEmpty() ? -1 : top->data; }
};
```

**Penjelasan detail:**

- `push` **tidak butuh cek penuh** — selama heap masih ada, selalu muat (itulah "tanpa overflow"). Dua barisnya identik `insertFirst`: node baru menunjuk top lama, top pindah. O(1) tanpa syarat.
- `pop` menyimpan `v = tmp->data` **sebelum** `delete tmp` — urutan yang jika dibalik (delete dulu baru baca) menjadi use-after-free. Pola simpan-maju-hapus-kembalikan ini sama persis dengan `deleteFirst` Modul 4.
- **Perbandingan jujur array vs linked list:**

| Aspek | Array | Linked List |
|---|---|---|
| Kecepatan push/pop | Lebih cepat (tanpa `new`, cache rapat) | Sedikit overhead alokasi + pointer |
| Memori | Tetap `MAX × 4` byte walau kosong | Proporsional isi + 8 byte pointer/node |
| Kapasitas | Terbatas, overflow mungkin | Dinamis, hanya dibatasi RAM |
| Kegagalan khas | Overflow | Memory leak (lupa delete) |

> Praktik industri: `std::stack` (default berbasis `deque`) memakai strategi array yang tumbuh otomatis — gabungan kelebihan keduanya.

## 5. Studi Kasus 1: Infix → Postfix

**Latar:** manusia menulis `A+B*C` (infix, butuh kurung & precedence), komputer lebih mudah mengevaluasi `ABC*+` (postfix, cukup scan kiri→kanan dengan stack). Konversi ini aplikasi klasik stack.

**Aturan:** operand langsung ke output; `(` didorong; `)` memuntahkan sampai `(`; operator memuntahkan operator ≥ precedence-nya dulu, baru dirinya didorong.

```cpp
#include <iostream>
#include <stack>
#include <cctype>
using namespace std;

int prec(char c) {
    if (c == '^') return 3;
    if (c == '*' || c == '/') return 2;
    if (c == '+' || c == '-') return 1;
    return -1;
}

string infixToPostfix(string s) {
    stack<char> st; string out;
    for (char c : s) {
        if (isalnum(c)) out += c;
        else if (c == '(') st.push(c);
        else if (c == ')') {
            while (!st.empty() && st.top() != '(') { out += st.top(); st.pop(); }
            st.pop();
        } else {
            while (!st.empty() && prec(st.top()) >= prec(c)) { out += st.top(); st.pop(); }
            st.push(c);
        }
    }
    while (!st.empty()) { out += st.top(); st.pop(); }
    return out;
}

int main() {
    cout << infixToPostfix("A+B*C") << endl;   // ABC*+
    cout << infixToPostfix("(A+B)*C") << endl; // AB+C*
    return 0;
}
```

**Penjelasan per cabang + trace `A+B*C` → `ABC*+`:**

- `prec(c)` — tabel precedence: `^`=3 (paling kuat), `*`/`/`=2, `+`/`-`=1, selainnya −1 (termasuk `(` sehingga tidak pernah ikut tertandingi dan aman tertinggal di stack).
- `if (isalnum(c)) out += c` — operand (huruf/angka) **tidak pernah menyentuh stack**, langsung ke output. Ini alasan postfix tidak butuh kurung: urutan operand sudah final.
- `c == '('` → push mentah. Fungsinya sebagai **pembatas**: operator di dalamnya tidak boleh keluar sebelum `)` tiba.
- `c == ')'` → muntahkan (`out += top; pop`) sampai menemukan `(`, lalu `st.pop()` **membuang** `(` tanpa ke output. Jika tidak ada `(` (kurung tak seimbang) → `st.pop()` pada stack kosong = undefined; versi produksi perlu guard.
- **Cabang operator:** `while (top ≥ c) muntahkan` menjamin operator lemah/kuat-yang-datang-duluan keluar dulu. Contoh `A+B*C`: `+` sudah di stack saat `*` tiba; karena prec(`+`)=1 < prec(`*`)=2, while tidak jalan → `*` didorong di atas `+`. Di akhir, pemuntahan menghasilkan `*` dulu baru `+` → `ABC*+` (perkalian dievaluasi dulu — benar!).
- **Trace tabel `A+B*C`:**

| c | Aksi | out | stack |
|---|---|---|---|
| A | operand | A | [] |
| + | stack kosong → push | A | [+] |
| B | operand | AB | [+] |
| * | top(+) < * → push | AB | [+, *] |
| C | operand | ABC | [+, *] |
| akhir | muntahkan semua | ABC*+ | [] |

- **Trace `(A+B)*C`:** `(` push; A→out; `+` push (di atas `(`); B→out; `)` muntahkan `+` lalu buang `(`; `*` push; C→out; akhir muntahkan `*` → `AB+C*`. Terlihat kurung memaksa penjumlahan duluan.

### Studi Kasus 2: Undo/Redo Text Editor

**Ide:** dua stack menyimpan **snapshot** teks. `undo` = riwayat keadaan (termasuk keadaan awal kosong), `redo` = keadaan yang dibatalkan dan bisa dikembalikan.

```cpp
#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
    stack<string> undo, redo;
    string teks = "";
    undo.push(teks);
    // ketik "Halo"
    teks += "Halo"; undo.push(teks);
    teks += " Dunia"; undo.push(teks);
    cout << teks << endl;               // Halo Dunia
    // UNDO
    redo.push(undo.top()); undo.pop();
    teks = undo.top();
    cout << "Undo: " << teks << endl;   // Halo
    // REDO
    teks = redo.top(); redo.pop(); undo.push(teks);
    cout << "Redo: " << teks << endl;   // Halo Dunia
    return 0;
}
```

**Penjelasan alur + isi stack:**

1. **Setup:** `undo = [""]` (snapshot kosong wajib ada sebagai dasar; tanpanya undo terakhir akan mengosongkan stack dan `top()` crash). `redo = []`.
2. **Mengetik:** setiap selesai aksi (bukan per huruf, demi hemat memori), push snapshot baru. Setelah dua aksi: `undo = ["", "Halo", "Halo Dunia"]`, teks = "Halo Dunia".
3. **UNDO** = pindahkan top `undo` ke `redo`, teks = top `undo` yang baru: `redo = ["Halo Dunia"]`, `undo = ["", "Halo"]`, teks = "Halo".
4. **REDO** = kebalikan: pindahkan top `redo` kembali ke `undo`: `undo = ["", "Halo", "Halo Dunia"]`, teks = "Halo Dunia".
5. **Aturan yang disederhanakan di sini:** mengetik baru setelah undo seharusnya **mengosongkan redo** (cabang redo hangus — perilaku VS Code/Word). Versi lengkap: tiap aksi ketik baru → `while (!redo.empty()) redo.pop();`.
6. **Biaya:** menyimpan seluruh string tiap aksi = O(n) memori per aksi. Editor nyata menyimpan **delta** (operasi insert/delete + posisi), bukan snapshot penuh — optimasi yang bagus untuk Tugas.

## 6. Tugas Praktikum 🧩

> Kerjakan sesuai level. Setiap tugas wajib dikumpulkan sebagai **satu file `.cpp` + screenshot output + analisis singkat di laporan**. Kode yang tidak bisa dicompile (`g++ -std=c++17`) otomatis bernilai nol.

### 🟢 Level Beginner — *Memahami Gerakan Dasar*

**Tugas B1: Stack Array Manual + Jejak TOP (wajib semua mahasiswa).**
1. Salin class `StackArray` dari kode 4.1 ke file `stack_b1.cpp`.
2. Di `main`, lakukan urutan ini dan **cetak TOP + isi stack setiap langkah**: `push(10)`, `push(20)`, `peek()`, `pop()`, `pop()`, `pop()` (underflow!).
3. Di laporan, jawab: (a) berapa nilai TOP setelah tiap langkah? (b) mengapa pop ketiga mencetak "Underflow!"? (c) apa beda `peek` dan `pop` dari sisi TOP?
4. *Contoh output yang diharapkan:* baris `TOP=0 [10]`, `TOP=1 [10,20]`, dst.
*Kriteria nilai:* program jalan (40%), jejak TOP benar (30%), jawaban analisis tepat (30%).

**Tugas B2: Balik String & Cek Kurung Siku Sederhana.**
1. Buat program yang membaca satu string (mis. ` Halo`), mendorong tiap karakter ke `std::stack<char>`, lalu mem-pop semuanya untuk mencetak string terbalik.
2. Kembangkan: baca string kurung yang hanya berisi `(` dan `)` (mis. `(()())`), gunakan stack counter untuk menentukan valid/tidak. Uji minimal 3 kasus: `()`, `(()`, `())(`.
3. Di laporan jelaskan dengan 1 paragraf: mengapa stack cocok untuk "membalik urutan"?
*Kriteria nilai:* output benar (50%), minimal 3 uji kasus terdokumentasi (25%), penjelasan tepat (25%).

### 🟡 Level Medium — *Menerapkan Pola Klasik*

**Tugas M1: Pemeriksa Kurung Seimbang `{[()]}`.**
1. Implementasikan fungsi `bool isBalanced(string s)` memakai `std::stack<char>`: untuk setiap kurung buka (`{[( `) di-push; untuk kurung tutup, cek top cocok lalu pop; jika stack kosong saat tutup datang → tidak seimbang.
2. Uji minimal 5 kasus: `{[()]}`, `{[(}]}`, `((()))`, `([)]`, string kosong (valid!). Cetak `VALID`/`TIDAK` untuk tiap kasus.
3. Analisis kompleksitas waktu & ruang di laporan (target: O(n) waktu, O(n) ruang) + jelaskan mengapa stack wajib di sini (tidak bisa diganti counter biasa).
*Kriteria nilai:* kebenaran 5 kasus (50%), penanganan stack kosong (20%), analisis O (30%).

**Tugas M2: Evaluasi Postfix Lengkap.**
1. Lengkapi fungsi `int evalPostfix(string s)` untuk ekspresi satu digit (contoh `23*5+` = 11, `82/3-` = 1). Aturan: digit → push; operator `+-*/` → pop dua operan (`b = pop, a = pop`), push `a op b`.
2. Tangani: pembagian nol (cetak error, return 0), ekspresi invalid (stack akhir ≠ 1 elemen).
3. Uji minimal 4 ekspresi + tunjukkan trace stack untuk satu ekspresi di laporan.
*Kriteria nilai:* kebenaran hitung (50%), penanganan error (25%), trace di laporan (25%).

### 🔴 Level Expert — *Menggabungkan & Menganalisis*

**Tugas E1: Dua Stack dalam Satu Array (interview classic).**
1. Implementasikan class `TwoStacks` berkapasitas `MAX`: stack1 tumbuh dari kiri (`top1` mulai -1, naik), stack2 tumbuh dari kanan (`top2` mulai MAX, turun). Full saat `top1 + 1 == top2`.
2. Sediakan `push1/push2/pop1/pop2` + demo interleaved: push1(1,2,3), push2(9,8), pop1, pop2, cetak isi kedua stack.
3. Di laporan: buktikan mengapa skema ini hemat memori dibanding dua array terpisah + analisis kompleksitas tiap operasi.
*Kriteria nilai:* kebenaran logika dua arah (50%), demo interleaved (20%), analisis memori (30%).

**Tugas E2: Infix → Postfix dengan `^` Right-Associative + Undo/Redo Sempurna.**
1. Perluas `infixToPostfix` modul: pangkat `^` bersifat *right-associative* (aturan pop: `prec(top) > prec(c)` untuk `^`, `>=` untuk lainnya). Uji: `A^B^C` → `ABC^^` (bukan `AB^C^`), `A+B*C` tetap `ABC*+`.
2. Perluas studi kasus Undo/Redo: tiap aksi ketik baru **wajib mengosongkan `redo`** (`while (!redo.empty()) redo.pop();`). Simulasikan skenario: ketik A, ketik B, undo, ketik C (maka redo hangus → redo setelah ini harus gagal).
3. Tulis refleksi filosofis 1 paragraf: hubungkan perilaku "redo hangus" dengan keputusan hidup yang tidak bisa diulang setelah cabang baru diambil.
*Kriteria nilai:* associativity benar (30%), redo-clear benar (30%), skenario uji + refleksi (40%).

## 7. Video Pembelajaran 🎬

1. **freeCodeCamp – Data Structures Full Course (bab Stack: array, linked list, infix/postfix, undo).**
   https://www.youtube.com/watch?v=B31LgI4Y4DQ
2. **Sudhakar Atchala – Stacks and Queues Tutorial (4 jam, infix to postfix 1:15).**
   https://www.youtube.com/watch?v=GlZ5sAPnClA
3. **freeCodeCamp – Data Structures Easy to Advanced (Google Engineer).**
   https://www.youtube.com/watch?v=RBSGKlAvoiM

## 8. Referensi Website 🌐

1. Programiz – *Stack Data Structure* – https://www.programiz.com/dsa/stack
2. GeeksforGeeks – *Stack using Array in C++* – https://www.geeksforgeeks.org/cpp/cpp-program-to-implement-stack-using-array/
3. GeeksforGeeks – *Stack using Linked List* – https://www.geeksforgeeks.org/dsa/implement-a-stack-using-singly-linked-list/
4. GeeksforGeeks – *Infix to Postfix in C++* – https://www.geeksforgeeks.org/cpp/infix-to-postfix-conversion-using-stack-in-cpp/
