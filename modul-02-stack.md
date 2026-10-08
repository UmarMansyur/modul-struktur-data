# Modul 2: Tumpukan (*Stack*)

> **Mata Kuliah:** Struktur Data | **Durasi:** 1 × 100 menit | **Prasyarat:** Modul 1

> **Panduan menjalankan program:**
> 1. Salin satu contoh program secara utuh, mulai dari `#include` sampai `return 0`, ke dalam berkas `.cpp`.
> 2. Kompilasi program dengan perintah `g++ -std=c++17 nama.cpp -o nama`.
> 3. Jalankan program dengan perintah `./nama` pada Linux/macOS atau `.\nama.exe` pada Windows.
> 4. Bandingkan keluaran program dengan contoh keluaran pada bagian terkait.

## 1. Capaian Pembelajaran

Setelah menyelesaikan modul ini, mahasiswa mampu:

1. Menjelaskan prinsip LIFO dan operasi `push`, `pop`, `peek`/`top`, `isEmpty`, serta `isFull`.
2. Mengimplementasikan tumpukan berbasis larik dan senarai berantai serta membandingkan karakteristik keduanya.
3. Mengonversi notasi infiks, postfiks, dan prefiks serta mengevaluasi ekspresi.
4. Mensimulasikan fitur urungkan dan ulangi (*undo/redo*) pada penyunting teks.
5. Menjelaskan sejarah tumpukan dan menghubungkan prinsip LIFO dengan penggunaan praktisnya.

## 2. Sejarah dan Nilai Filosofis

**Sejarah singkat.** Istilah *stack* (Jerman: *Keller* = gudang/ruang bawah tanah) diperkenalkan oleh **Friedrich L. Bauer dan Klaus Samelson (1957)** untuk mengevaluasi ekspresi dalam bahasa ALGOL — salah satu fondasi bahasa pemrograman modern. Tak lama kemudian **Edsger W. Dijkstra (1961)** memakai tumpukan dalam algoritma *shunting-yard* untuk konversi infix → postfix (Studi Kasus 1 modul ini!). Konsep yang sama melahirkan *pushdown automaton* di teori komputasi dan — yang paling sering Anda pakai tanpa sadar — ***call stack***: setiap pemanggilan fungsi di C++ didorong ke stack memori dan di-pop saat `return`. Itulah sebabnya rekursi yang terlalu dalam menghasilkan error legendaris ***stack overflow*** (nama itu pula yang dipakai forum Q&A terbesar programmer dunia, Stack Overflow, founded 2008).

**Mengapa LIFO menang untuk masalah-masalah ini?** Karena banyak persoalan komputasi bersifat *menunda lalu menyelesaikan secara terbalik*: kurung buka menunggu kurung tutupnya, operator menunggu operandnya, fungsi pemanggil menunggu fungsi yang dipanggil. Stack adalah memori untuk "utang yang belum selesai" — dan utang terakhir selalu dilunasi pertama.

**Nilai filosofis — disiplin menuntaskan.** Bayangkan tumpukan piring kotor: Anda hanya boleh mengambil piring paling atas. Tidak bisa mengambil piring bawah tanpa membereskan yang di atasnya dulu. Itulah LIFO sebagai latihan karakter:
- *Tuntaskan yang terakhir sebelum kembali.* Seperti call stack: fungsi tidak boleh "kabur" sebelum mengembalikan hasil. Dalam hidup: selesaikan tugas yang baru Anda mulai sebelum menumpuk tugas baru.
- *Undo = penyesalan yang tercatat.* Fitur undo/redo mengajarkan bahwa setiap aksi punya konsekuensi yang bisa dibatalkan — asalkan riwayatnya jujur dicatat (stack `undo`). Tanpa catatan, tidak ada jalan kembali.
- *Kesabaran terbalik.* Antrean (Queue) mengajarkan adil ("siapa dulu, dia dulu"); Stack mengajarkan prioritas pada yang *terkini* ("yang baru datang harus dibereskan dulu agar tidak menumpuk"). Keduanya benar — tinggal pilih sesuai masalah. Programmer bijak tahu kapan bersikap antrean dan kapan bersikap tumpukan.
- *Amanah memori.* Setiap `push` tanpa `pop` yang seimbang = stack overflow / memory leak. Sama seperti janji: setiap yang didorong harus dipertanggungjawabkan (di-pop/di-delete).

> Renungan untuk laporan: ceritakan satu kebiasaan sehari-hari Anda yang LIFO (mis. tumpukan baju, riwayat browser Back, Ctrl+Z) dan satu yang FIFO. Kapan Anda memakai masing-masing — dan apa akibatnya jika tertukar?

## 3. Konsep LIFO

Tumpukan menerapkan prinsip **elemen terakhir yang masuk akan keluar lebih dahulu** (*Last In, First Out* atau LIFO). Variabel `TOP` menunjuk elemen teratas. Operasi `push`, `pop`, dan `peek` hanya mengakses satu ujung sehingga masing-masing memiliki kompleksitas waktu O(1).

![Diagram LIFO push/pop](https://upload.wikimedia.org/wikipedia/commons/e/e4/Lifo_stack.svg)
*Gambar 1. Prinsip LIFO. Sumber: Wikimedia Commons (CC0).*

![Stack push pop](https://cdn.programiz.com/sites/tutorial2program/files/stack.png)
*Gambar 2. Push menambah, Pop mengambil elemen teratas. Sumber: Programiz.*

![Operasi TOP](https://cdn.programiz.com/sites/tutorial2program/files/stack-operations.png)
*Gambar 3. `TOP = -1` (kosong), push → `TOP++`, pop → `TOP--`. Sumber: Programiz.*

| Operasi | Fungsi | Kompleksitas | Kondisi gagal |
|---|---|---|---|
| `push(x)` | Menambahkan elemen ke bagian atas | O(1) | *Overflow* (larik penuh) |
| `pop()` | Mengambil dan menghapus elemen teratas | O(1) | *Underflow* (tumpukan kosong) |
| `peek()`/`top()` | Membaca elemen teratas tanpa menghapusnya | O(1) | *Underflow* |
| `isEmpty()`/`isFull()` | Memeriksa kondisi tumpukan | O(1) | — |

### Mengapa Operasi Utama Memiliki Kompleksitas O(1)?

Variabel `TOP` selalu menunjuk lokasi operasi, sehingga algoritma tidak perlu menggeser atau mencari elemen. Sebaliknya, penyisipan di tengah larik biasa membutuhkan pergeseran elemen dengan kompleksitas O(n). Efisiensi tersebut juga membatasi akses: program tidak dapat mengambil elemen di tengah tumpukan sebelum mengeluarkan seluruh elemen di atasnya. Aturan ini menjaga urutan proses pada *call stack* dan parser.

### *Call Stack*: Tumpukan yang Mendukung Eksekusi Program

Setiap kali program C++ memanggil fungsi, sistem mendorong *frame* (alamat kembali + variabel lokal + parameter) ke call stack memori. Saat fungsi `return`, frame di-pop. Urutannya persis LIFO — fungsi yang dipanggil terakhir selesai pertama. Konsekuensinya:
- Rekursi = fungsi memanggil dirinya sendiri = frame menumpuk. Basis rekursi yang hilang → frame menumpuk sampai memori habis → ***stack overflow*** (segmentation fault).
- Variabel lokal (`int data[MAX]` di kode 4.1) hidup di call stack: cepat, otomatis dibersihkan saat fungsi selesai, tapi ukurannya kecil (umumnya 1–8 MB). Array raksasa di stack → overflow; pindahkan ke heap (`new`) atau jadikan `static`.
- Debugger (gdb/VS) menampilkan *call stack trace* saat crash — bacalah dari atas (yang sedang berjalan) ke bawah (yang memanggil). Itulah peta "utang fungsi yang belum selesai".

### Kesalahan umum pemula

1. **Tertukar pre/post increment** (`data[++TOP]` vs `data[TOP++]`) — sumber bug #1 modul ini. Hafalkan: push = naik dulu baru tulis; pop = baca dulu baru turun.
2. **Lupa guard** — pop/peek saat kosong mengembalikan sampah (`-1` di sini menutupi bug; di produksi, lempar `exception` atau pakai `std::optional`).
3. **`top()` + `pop()` STL dipisah** — `std::stack::pop()` bertipe `void` (demi exception-safety), jadi pola wajibnya `auto v = st.top(); st.pop();`. Menulis `x = st.pop();` tidak akan compile.
4. **Stack linked-list bocor** — push memakai `new` tetapi lupa `delete` di pop/destructor → memory leak. Setiap node yang didorong harus ada yang bertanggung jawab mem-pop-nya.

### Penerapan Tumpukan

- **Browser Back / Forward:** riwayat halaman = stack (Back = pop ke stack forward).
- **Undo/Redo (VS Code, Word, Photoshop):** dua stack snapshot/delta (Studi Kasus 2).
- **Evaluasi ekspresi & kompilator:** shunting-yard, pengecek kurung, parser.
- **DFS (Modul 6):** menelusuri graf dengan stack (eksplisit atau call stack rekursi).
- **Navigasi maze & backtracking:** maju dengan push, buntu → pop (mundur).

## 4. Implementasi

### 4.1 Implementasi Berbasis Larik

**Tujuan program:** Program mengimplementasikan tumpukan berkapasitas tetap dengan menggunakan larik. Variabel `TOP` menyimpan indeks elemen teratas, sedangkan nilai `TOP = -1` menandakan tumpukan kosong. Implementasi ini menggunakan pola *pre-increment* pada `push` dan *post-decrement* pada `pop`.

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
    // tambahan kecil agar gampang lihat isi (untuk belajar saja)
    void cetak() {
        if (isEmpty()) { cout << "[kosong]"; return; }
        cout << "[";
        for (int i = 0; i <= TOP; i++) {
            cout << data[i];
            if (i < TOP) cout << ", ";
        }
        cout << "]";
    }
    int getTOP() { return TOP; }
};

// Cara memakai: contoh program utuh yang bisa langsung jalan.
// Copy SEMUA kode dari #include sampai return 0 ke file stack_array.cpp
int main() {
    StackArray s;
    cout << "Awal: "; s.cetak(); cout << " (TOP=" << s.getTOP() << ")" << endl;

    s.push(10);
    cout << "push(10): "; s.cetak(); cout << " (TOP=" << s.getTOP() << ")" << endl;

    s.push(20);
    cout << "push(20): "; s.cetak(); cout << " (TOP=" << s.getTOP() << ")" << endl;

    cout << "peek() = " << s.peek() << " (cuma ngintip, tidak hapus)" << endl;
    cout << "isi sesudah peek: "; s.cetak(); cout << endl;

    cout << "pop() = " << s.pop() << " (ambil + hapus)" << endl;
    cout << "isi sesudah pop: "; s.cetak(); cout << endl;

    cout << "pop() = " << s.pop() << endl;
    cout << "isi sesudah pop: "; s.cetak(); cout << endl;

    cout << "pop() saat kosong = " << s.pop() << " (muncul Underflow!)" << endl;
    return 0;
}
```

**Cara menjalankan kode di atas:**

1. Simpan kode utuh (dari `#include` sampai `return 0`) ke file `stack_array.cpp`.
2. Buka terminal di folder file itu, lalu ketik:

```bash
g++ -std=c++17 stack_array.cpp -o stack_array
./stack_array
# di Windows: .\stack_array.exe
```

3. Hasil yang muncul di layar (output):

```text
Awal: [kosong] (TOP=-1)
push(10): [10] (TOP=0)
push(20): [10, 20] (TOP=1)
peek() = 20 (cuma ngintip, tidak hapus)
isi sesudah peek: [10, 20]
pop() = 20 (ambil + hapus)
isi sesudah pop: [10]
pop() = 10
isi sesudah pop: [kosong]
Underflow!
pop() saat kosong = -1 (muncul Underflow!)
```

> **Istilah penting:**
> - **Tumpukan (*stack*)** menyimpan dan mengambil elemen melalui bagian atas.
> - **LIFO (*Last In, First Out*)** berarti elemen terakhir yang masuk akan keluar lebih dahulu.
> - Operasi **`push`** menambahkan elemen, **`pop`** mengambil dan menghapus elemen teratas, sedangkan **`peek`/`top`** hanya membaca elemen teratas.
> - Variabel **`TOP`** menyimpan indeks elemen teratas. Nilai `-1` menandakan tumpukan kosong.
> - **Overflow** terjadi ketika program menambahkan elemen ke tumpukan yang penuh. **Underflow** terjadi ketika program mengambil elemen dari tumpukan yang kosong.

**Penjelasan program:**

- `int data[MAX]` — memori **statis** 100 int di stack (bukan heap). Alokasi O(1) sekaligus, cache-friendly (elemen bersebelahan → CPU prefetcher bekerja optimal). Harga: kapasitas tetap; `MAX` terlalu besar = buang memori, terlalu kecil = overflow.
- `TOP = -1` — trik agar `++TOP` pertama menjadi 0 (indeks valid pertama). Alternatif `TOP = 0` = "jumlah elemen" juga populer (`data[TOP++] = x`), tapi konvensi -1 dipakai modul ini konsisten dengan Gambar 3.
- **`push`: `data[++TOP] = x`** — **pre-increment**: naikkan dulu (misal -1→0), baru tulis ke indeks baru. Jika ditulis `data[TOP++] = x` (post), elemen pertama tertulis di indeks -1 → out-of-bounds! Guard `isFull()` mencegah `TOP` melewati `MAX-1`.
- **`pop`: `return data[TOP--]`** — **post-decrement**: baca dulu indeks TOP lama, baru turunkan. Jadi pop mengembalikan nilai teratas sekaligus menghapusnya secara logis (sel memorinya tidak di-nol-kan, hanya tidak dianggap ada — pop berikutnya menimpanya, tidak masalah).
- **`peek`:** sama seperti pop tapi **tanpa `--`** — hanya mengintip. Dipakai algoritma infix (butuh membandingkan operator teratas tanpa membuangnya).
- **Overflow vs Underflow:** overflow = push saat penuh (data akan hilang/tertulis liar tanpa guard); underflow = pop/peek saat kosong (mengembalikan sampah). Kedua guard mencetak pesan + return sentinel `-1` — untuk produksi, lempar exception lebih baik.
- **Trace:** push(10) → TOP=0 `[10]`; push(20) → TOP=1 `[10,20]`; peek → 20 (TOP tetap 1); pop → return 20, TOP=0; pop → return 10, TOP=-1; pop → "Underflow!".

### 4.2 Implementasi Berbasis Senarai Berantai

**Tujuan program:** Program membuat tumpukan yang dapat bertambah sesuai kebutuhan memori. Operasi `push` menggunakan pola `insertFirst`, sedangkan operasi `pop` menggunakan pola `deleteFirst`. Variabel `head` pada senarai menjadi bagian teratas tumpukan. Modul 4 akan membahas konsep `Node` dan `next` secara lebih rinci.

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
    void cetak() {
        if (isEmpty()) { cout << "[kosong]"; return; }
        cout << "[atas] ";
        for (Node* t = top; t; t = t->next) cout << t->data << " ";
        cout << "[bawah]";
    }
    ~StackLL() { while (!isEmpty()) pop(); }
};

// Contoh pakai yang bisa langsung jalan.
// Simpan SEMUA kode ke file stack_ll.cpp
int main() {
    StackLL s;
    s.push(10); s.push(20); s.push(30);
    cout << "Setelah push 10,20,30: "; s.cetak(); cout << endl;
    cout << "peek() = " << s.peek() << " (cuma ngintip)" << endl;
    cout << "pop() = " << s.pop() << endl;
    cout << "isi sekarang: "; s.cetak(); cout << endl;
    cout << "pop() = " << s.pop() << endl;
    cout << "pop() = " << s.pop() << endl;
    cout << "pop() saat kosong = " << s.pop() << endl;
    return 0;
}
```

**Cara menjalankan kode di atas:**

```bash
g++ -std=c++17 stack_ll.cpp -o stack_ll
./stack_ll
# di Windows: .\stack_ll.exe
```

**Output yang muncul:**

```text
Setelah push 10,20,30: [atas] 30 20 10 [bawah]
peek() = 30 (cuma ngintip)
pop() = 30
isi sekarang: [atas] 20 10 [bawah]
pop() = 20
pop() = 10
Underflow!
pop() saat kosong = -1
```

> **Istilah penting:**
> - **Senarai berantai (*linked list*)** menghubungkan sejumlah simpul melalui penunjuk `next`.
> - **Simpul (*node*)** menyimpan data dan penunjuk ke simpul berikutnya.
> - Struktur **dinamis** dapat bertambah atau berkurang selama program berjalan.
> - **Heap** merupakan area memori yang digunakan oleh alokasi dinamis melalui `new` dan dibebaskan melalui `delete`.
> - **Kebocoran memori (*memory leak*)** terjadi ketika program tidak membebaskan memori yang sudah tidak digunakan.

**Penjelasan program:**

- `push` **tidak butuh cek penuh** — selama gudang memori masih ada, selalu muat. Caranya sama seperti `insertFirst`: gerbong baru sambung ke atas lama, lalu atas pindah ke gerbong baru.
- `pop` menyimpan `v = tmp->data` **sebelum** `delete tmp` — urutan yang jika dibalik (delete dulu baru baca) menjadi use-after-free. Pola simpan-maju-hapus-kembalikan ini sama persis dengan `deleteFirst` Modul 4.
- **Perbandingan jujur array vs linked list:**

| Aspek | Array | Linked List |
|---|---|---|
| Kecepatan push/pop | Lebih cepat (tanpa `new`, cache rapat) | Sedikit overhead alokasi + pointer |
| Memori | Tetap `MAX × 4` byte walau kosong | Proporsional isi + 8 byte pointer/node |
| Kapasitas | Terbatas, overflow mungkin | Dinamis, hanya dibatasi RAM |
| Kegagalan khas | Overflow | Memory leak (lupa delete) |

> Praktik industri: `std::stack` (default berbasis `deque`) memakai strategi array yang tumbuh otomatis — gabungan kelebihan keduanya.

## 5. Studi Kasus 1: Konversi Infiks, Postfiks, dan Prefiks

**Latar belakang:** Manusia umumnya menulis operator di antara operand, seperti `A+B`. Notasi tersebut disebut infiks. Sistem komputasi juga menggunakan bentuk postfiks `AB+` atau prefiks `+AB` karena kedua bentuk tersebut tidak memerlukan aturan prioritas tambahan saat dievaluasi. Studi kasus ini menggunakan tumpukan untuk mengonversi ketiga notasi tersebut.

> **Istilah penting:**
> - Notasi **infiks** menempatkan operator di antara operand, seperti `A+B`.
> - Notasi **postfiks** menempatkan operator setelah operand, seperti `AB+`.
> - Notasi **prefiks** menempatkan operator sebelum operand, seperti `+AB`.
> - **Prioritas operator (*precedence*)** menentukan operator yang dikerjakan lebih dahulu. Pada `A+B*C`, perkalian dikerjakan sebelum penjumlahan.
> - **Asosiativitas** menentukan arah evaluasi operator dengan prioritas yang sama. `A+B+C` dievaluasi dari kiri, sedangkan `A^B^C` dievaluasi dari kanan.

**Aturan konversi:**
1. Algoritma menambahkan operand langsung ke hasil.
2. Algoritma mendorong `(` ke tumpukan dan mengeluarkan operator ketika menemukan `)` sampai `(` ditemukan.
3. Algoritma mengeluarkan operator lama yang memiliki prioritas lebih tinggi. Untuk prioritas yang sama, algoritma juga mempertimbangkan asosiativitas operator `^`.

```cpp
#include <iostream>
#include <stack>
#include <cctype>
#include <string>
#include <algorithm>
using namespace std;
// Simpan SEMUA kode ke file konversi.cpp

int prec(char c) {
    if (c == '^') return 3;
    if (c == '*' || c == '/') return 2;
    if (c == '+' || c == '-') return 1;
    return -1;
}
bool isOperator(char c) {
    return c=='+'||c=='-'||c=='*'||c=='/'||c=='^';
}

// 1. Infix -> Postfix (tengah -> belakang)
// Contoh: A+B*C jadi ABC*+
string infixToPostfix(string s) {
    stack<char> st; string out;
    for (char c : s) {
        if (c == ' ') continue;
        if (isalnum(c)) out += c;
        else if (c == '(') st.push(c);
        else if (c == ')') {
            while (!st.empty() && st.top() != '(') { out += st.top(); st.pop(); }
            if (!st.empty()) st.pop(); // buang '('
        } else if (isOperator(c)) {
            // keluarkan yang lebih kuat, atau sama kuat KECUALI '^'
            // karena '^' kumpul dari kanan, jadi jangan keluarkan sesama '^'
            while (!st.empty() && st.top() != '(' &&
                   (prec(st.top()) > prec(c) ||
                    (prec(st.top()) == prec(c) && c != '^'))) {
                out += st.top(); st.pop();
            }
            st.push(c);
        }
    }
    while (!st.empty()) { if (st.top() != '(') out += st.top(); st.pop(); }
    return out;
}

// 2. Infix -> Prefix (tengah -> depan)
// Contoh: A+B*C jadi +A*BC
// Cara: balik tulisan, tukar ( dengan ), jadi postfix, lalu balik lagi.
string infixToPrefix(string s) {
    string rev = "";
    for (int i = s.size()-1; i >= 0; i--) {
        if (s[i] == '(') rev += ')';
        else if (s[i] == ')') rev += '(';
        else rev += s[i];
    }
    stack<char> st; string out;
    for (char c : rev) {
        if (c == ' ') continue;
        if (isalnum(c)) out += c;
        else if (c == '(') st.push(c);
        else if (c == ')') {
            while (!st.empty() && st.top() != '(') { out += st.top(); st.pop(); }
            if (!st.empty()) st.pop();
        } else if (isOperator(c)) {
            // KEBALIKAN dari postfix: untuk prefix, yang sama kuat
            // hanya dikeluarkan kalau c == '^'. Ini karena tulisan dibalik.
            while (!st.empty() && st.top() != '(' &&
                   (prec(st.top()) > prec(c) ||
                    (prec(st.top()) == prec(c) && c == '^'))) {
                out += st.top(); st.pop();
            }
            st.push(c);
        }
    }
    while (!st.empty()) { if (st.top() != '(') out += st.top(); st.pop(); }
    reverse(out.begin(), out.end());
    return out;
}

// 3. Postfix -> Infix (belakang -> tengah)
// Contoh: ABC*+ jadi (A+(B*C))
// Cara: ketemu huruf -> dorong. Ketemu tanda -> ambil 2, bungkus kurung.
string postfixToInfix(string s) {
    stack<string> st;
    for (char c : s) {
        if (c == ' ') continue;
        if (isalnum(c)) st.push(string(1, c));
        else if (isOperator(c)) {
            if (st.size() < 2) return "ERROR";
            string b = st.top(); st.pop(); // kanan dulu
            string a = st.top(); st.pop(); // kiri
            st.push("(" + a + c + b + ")");
        }
    }
    return st.empty() ? "" : st.top();
}

// 4. Prefix -> Infix (depan -> tengah)
// Contoh: +A*BC jadi (A+(B*C))
// Cara: jalan dari BELAKANG. Sama seperti postfix tapi dari kanan.
string prefixToInfix(string s) {
    stack<string> st;
    for (int i = s.size()-1; i >= 0; i--) {
        char c = s[i];
        if (c == ' ') continue;
        if (isalnum(c)) st.push(string(1, c));
        else if (isOperator(c)) {
            if (st.size() < 2) return "ERROR";
            string a = st.top(); st.pop(); // kiri (karena dari belakang)
            string b = st.top(); st.pop(); // kanan
            st.push("(" + a + c + b + ")");
        }
    }
    return st.empty() ? "" : st.top();
}

int main() {
    cout << "== Tengah -> Belakang & Depan ==" << endl;
    cout << "A+B*C   -> postfix " << infixToPostfix("A+B*C") << " (harusnya ABC*+)" << endl;
    cout << "A+B*C   -> prefix  " << infixToPrefix("A+B*C") << " (harusnya +A*BC)" << endl;
    cout << "(A+B)*C -> postfix " << infixToPostfix("(A+B)*C") << " (harusnya AB+C*)" << endl;
    cout << "(A+B)*C -> prefix  " << infixToPrefix("(A+B)*C") << " (harusnya *+ABC)" << endl;
    cout << "A^B^C   -> postfix " << infixToPostfix("A^B^C") << " (harusnya ABC^^)" << endl;
    cout << "A^B^C   -> prefix  " << infixToPrefix("A^B^C") << " (harusnya ^A^BC)" << endl;

    cout << "\n== Belakang/Depan -> Tengah (kebalikannya) ==" << endl;
    cout << "ABC*+  -> infix " << postfixToInfix("ABC*+") << endl;
    cout << "+A*BC  -> infix " << prefixToInfix("+A*BC") << endl;
    cout << "ABC^^  -> infix " << postfixToInfix("ABC^^") << endl;
    cout << "^A^BC  -> infix " << prefixToInfix("^A^BC") << endl;

    cout << "\n== Cek bolak-balik (harus kembali) ==" << endl;
    string awal = "(A+B)*C";
    string post = infixToPostfix(awal);
    cout << awal << " -> " << post << " -> " << postfixToInfix(post) << endl;
    string pre = infixToPrefix(awal);
    cout << awal << " -> " << pre << " -> " << prefixToInfix(pre) << endl;
    return 0;
}
```

**Cara menjalankan:** simpan ke `konversi.cpp`, lalu:

```bash
g++ -std=c++17 konversi.cpp -o konversi
./konversi
# di Windows: .\konversi.exe
```

**Output:**

```text
== Tengah -> Belakang & Depan ==
A+B*C   -> postfix ABC*+ (harusnya ABC*+)
A+B*C   -> prefix +A*BC (harusnya +A*BC)
(A+B)*C -> postfix AB+C* (harusnya AB+C*)
(A+B)*C -> prefix *+ABC (harusnya *+ABC)
A^B^C   -> postfix ABC^^ (harusnya ABC^^)
A^B^C   -> prefix ^A^BC (harusnya ^A^BC)
== Belakang/Depan -> Tengah (kebalikannya) ==
ABC*+  -> infix (A+(B*C))
+A*BC  -> infix (A+(B*C))
ABC^^  -> infix (A^(B^C))
^A^BC  -> infix (A^(B^C))
== Cek bolak-balik (harus kembali) ==
(A+B)*C -> AB+C* -> ((A+B)*C)
(A+B)*C -> *+ABC -> ((A+B)*C)
```

**Penjelasan tiap fungsi (kalimat pendek):**

- `infixToPostfix`: huruf langsung ke hasil. `(` didorong sebagai pembatas. `)` keluarkan sampai `(`. Operator baru keluarkan yang lama kalau lama lebih kuat, atau sama kuat tapi bukan `^`. Contoh `A+B*C`: saat `*` datang, `+` di stack lebih lemah jadi tidak keluar → `*` numpang di atas `+`. Di akhir keluar `*` dulu baru `+` → `ABC*+`. Benar karena kali dikerjakan dulu.
- `infixToPrefix`: sama tapi lewat 3 langkah: 1) balik tulisan `A+B*C` jadi `C*B+A` + tukar kurung, 2) jadi postfix dengan aturan dibalik (sama kuat dikeluarkan hanya kalau `^`), 3) balik hasil. Harus dibalik karena prefix baca dari depan.
- `postfixToInfix`: jalan dari kiri. Huruf didorong sebagai kata. Tanda ambil 2 kata teratas (`b` kanan dulu, `a` kiri), bungkus jadi `(a tanda b)`, dorong lagi. Contoh `ABC*+`: `A` dorong, `B` dorong, `C` dorong, `*` ambil `B,C` jadi `(B*C)` dorong, `+` ambil `A,(B*C)` jadi `(A+(B*C))`.
- `prefixToInfix`: sama tapi jalan dari kanan (belakang). Karena tanda di depan, harus baca mundur baru ketemu huruf dulu. Ambil `a` dulu baru `b`, bungkus `(a tanda b)`.
- **Trace tabel `A+B*C` → `ABC*+`:**

| huruf | apa | hasil | tumpukan |
|---|---|---|---|
| A | huruf | A | [] |
| + | dorong | A | [+] |
| B | huruf | AB | [+] |
| * | `+` lebih lemah → dorong | AB | [+, *] |
| C | huruf | ABC | [+, *] |
| habis | keluarkan semua | ABC*+ | [] |

- **Trace `(A+B)*C` → `AB+C*`:** `(` dorong; A ke hasil; `+` dorong di atas `(`; B ke hasil; `)` keluarkan `+` lalu buang `(`; `*` dorong; C ke hasil; habis keluarkan `*` → `AB+C*`. Kurung bikin tambah dikerjakan dulu.
- **Contoh pangkat `A^B^C`:** `^` kumpul dari kanan. Jadi `A^B^C` = `A^(B^C)` → postfix `ABC^^` (bukan `AB^C^`), prefix `^A^BC`. Kalau salah aturan `>=`, hasilnya jadi kiri dan salah. Ini yang diuji di Tugas E2.

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

**Cara menjalankan:** simpan ke `undo.cpp`, lalu `g++ -std=c++17 undo.cpp -o undo` lalu `./undo`.

**Output:**

```text
Halo Dunia
Undo: Halo
Redo: Halo Dunia
```

> **Istilah penting:** **Undo** membatalkan perubahan terakhir, **redo** mengembalikan perubahan yang dibatalkan, dan **snapshot** menyimpan keadaan teks setelah suatu tindakan.

**Penjelasan alur dan isi tumpukan:**

1. **Setup:** `undo = [""]` (snapshot kosong wajib ada sebagai dasar; tanpanya undo terakhir akan mengosongkan stack dan `top()` crash). `redo = []`.
2. **Mengetik:** setiap selesai aksi (bukan per huruf, demi hemat memori), push snapshot baru. Setelah dua aksi: `undo = ["", "Halo", "Halo Dunia"]`, teks = "Halo Dunia".
3. **UNDO** = pindahkan top `undo` ke `redo`, teks = top `undo` yang baru: `redo = ["Halo Dunia"]`, `undo = ["", "Halo"]`, teks = "Halo".
4. **REDO** = kebalikan: pindahkan top `redo` kembali ke `undo`: `undo = ["", "Halo", "Halo Dunia"]`, teks = "Halo Dunia".
5. **Aturan yang disederhanakan di sini:** mengetik baru setelah undo seharusnya **mengosongkan redo** (cabang redo hangus — perilaku VS Code/Word). Versi lengkap: tiap aksi ketik baru → `while (!redo.empty()) redo.pop();`.
6. **Biaya:** menyimpan seluruh string tiap aksi = O(n) memori per aksi. Editor nyata menyimpan **delta** (operasi insert/delete + posisi), bukan snapshot penuh — optimasi yang bagus untuk Tugas.

### Studi Kasus 3: Kalkulator Prefiks dan Postfiks

**Gagasan utama:** Kalkulator infiks membaca `2 + 3`, kalkulator postfiks membaca `2 3 +`, dan kalkulator prefiks membaca `+ 2 3`. Evaluasi notasi postfiks dan prefiks tidak memerlukan tanda kurung serta hanya membutuhkan satu tumpukan angka.

> **Istilah penting:**
> - Evaluasi **postfiks** membaca ekspresi dari kiri ke kanan.
> - Evaluasi **prefiks** membaca ekspresi dari kanan ke kiri.
> - **Operand** merupakan nilai yang didorong ke tumpukan.
> - **Operator** seperti `+`, `-`, `*`, `/`, dan `^` mengambil dua operand teratas untuk menghasilkan nilai baru.
> - **Evaluasi** merupakan proses menghitung ekspresi sampai menghasilkan satu nilai akhir.

**Aturan hitung (ingat 2 baris ini):**
1. Postfix: jalan dari kiri. Angka → dorong. Tanda → ambil 2 (`b` atas, `a` bawahnya), hitung `a tanda b`, dorong hasil.
2. Prefix: sama, tapi jalan dari kanan (belakang). Angka → dorong. Tanda → ambil 2 (`a` atas, `b` bawahnya), hitung `a tanda b`, dorong hasil.

```cpp
#include <iostream>
#include <sstream>
#include <vector>
#include <cctype>
#include <cmath>
using namespace std;
// Simpan SEMUA kode ke file kalkulator.cpp
// Catatan: tumpukan di sini pakai vector biar gampang dicetak.
// push = push_back, pop = pop_back, top = back.

bool isOperator(char c) {
    return c=='+'||c=='-'||c=='*'||c=='/'||c=='^';
}
double terapkan(double a, double b, char op, bool &ok) {
    ok = true;
    if (op == '+') return a + b;
    if (op == '-') return a - b;
    if (op == '*') return a * b;
    if (op == '/') {
        if (b == 0) { cout << "ERROR: bagi nol!\n"; ok = false; return 0; }
        return a / b;
    }
    if (op == '^') return pow(a, b);
    ok = false; return 0;
}
// Pecah tulisan per spasi. Contoh "2 3 * 5 +" jadi ["2","3","*","5","+"]
// Kalau tidak ada spasi (mis "23*5+"), pecah per huruf.
vector<string> pecah(string s) {
    vector<string> hasil;
    if (s.find(' ') != string::npos) {
        stringstream ss(s); string w;
        while (ss >> w) hasil.push_back(w);
    } else {
        for (char c : s) {
            if (c == ' ') continue;
            hasil.push_back(string(1, c));
        }
    }
    return hasil;
}
void cetakTumpukan(vector<double> st) {
    cout << "[";
    for (int i = 0; i < st.size(); i++) {
        cout << st[i];
        if (i+1 < st.size()) cout << ", ";
    }
    cout << "]";
}
// Hitung postfix. Contoh "2 3 * 5 +" = 11
double evalPostfix(string s, bool jejak = false) {
    vector<string> tok = pecah(s);
    vector<double> st;
    for (string t : tok) {
        if (t.size() == 1 && isOperator(t[0])) {
            if (st.size() < 2) { cout << "ERROR: angka kurang!\n"; return 0; }
            double b = st.back(); st.pop_back();
            double a = st.back(); st.pop_back();
            bool ok; double h = terapkan(a, b, t[0], ok);
            if (!ok) return 0;
            st.push_back(h);
            if (jejak) { cout << "  baca '" << t << "': hitung " << a << t << b << "=" << h << " -> "; cetakTumpukan(st); cout << endl; }
        } else {
            st.push_back(stod(t));
            if (jejak) { cout << "  baca '" << t << "': dorong angka -> "; cetakTumpukan(st); cout << endl; }
        }
    }
    if (st.size() != 1) { cout << "ERROR: tulisan salah!\n"; return 0; }
    return st.back();
}
// Hitung prefix. Contoh "+ * 2 3 5" = 11. Jalan dari BELAKANG.
double evalPrefix(string s, bool jejak = false) {
    vector<string> tok = pecah(s);
    vector<double> st;
    for (int i = tok.size()-1; i >= 0; i--) {
        string t = tok[i];
        if (t.size() == 1 && isOperator(t[0])) {
            if (st.size() < 2) { cout << "ERROR: angka kurang!\n"; return 0; }
            double a = st.back(); st.pop_back();
            double b = st.back(); st.pop_back();
            bool ok; double h = terapkan(a, b, t[0], ok);
            if (!ok) return 0;
            st.push_back(h);
            if (jejak) { cout << "  baca '" << t << "': hitung " << a << t << b << "=" << h << " -> "; cetakTumpukan(st); cout << endl; }
        } else {
            st.push_back(stod(t));
            if (jejak) { cout << "  baca '" << t << "': dorong angka -> "; cetakTumpukan(st); cout << endl; }
        }
    }
    if (st.size() != 1) { cout << "ERROR: tulisan salah!\n"; return 0; }
    return st.back();
}

int main() {
    cout << "== 1. Kalkulator postfix (baca kiri) ==" << endl;
    cout << "Jejak '2 3 * 5 +':" << endl;
    double h1 = evalPostfix("2 3 * 5 +", true);
    cout << "Hasil = " << h1 << " (harusnya 11 karena (2*3)+5)" << endl;

    cout << "\n== 2. Kalkulator prefix (baca kanan) ==" << endl;
    cout << "Jejak '+ * 2 3 5':" << endl;
    double h2 = evalPrefix("+ * 2 3 5", true);
    cout << "Hasil = " << h2 << " (harusnya 11 juga)" << endl;

    cout << "\n== 3. Contoh lain ==" << endl;
    cout << "'5 1 2 + 4 * + 3 -' = " << evalPostfix("5 1 2 + 4 * + 3 -") << " (harusnya 14)" << endl;
    // prefix dari atas: 5 + ((1+2)*4) - 3  ->  - + 5 * + 1 2 4 3
    cout << "'- + 5 * + 1 2 4 3' = " << evalPrefix("- + 5 * + 1 2 4 3") << " (harusnya 14 juga)" << endl;
    cout << "'* + 2 3 4' = " << evalPrefix("* + 2 3 4") << " (harusnya 20 karena (2+3)*4)" << endl;

    cout << "\n== 4. Tanpa spasi (versi tugas) ==" << endl;
    cout << "'23*5+' = " << evalPostfix("23*5+") << " (harusnya 11)" << endl;
    cout << "'+*235' = " << evalPrefix("+*235") << " (harusnya 11)" << endl;

    cout << "\n== 5. Contoh salah ==" << endl;
    cout << "'4 0 /' = "; evalPostfix("4 0 /");
    cout << "'2 +' = "; evalPostfix("2 +");
    return 0;
}
```

**Cara menjalankan:** simpan ke `kalkulator.cpp`, lalu:

```bash
g++ -std=c++17 kalkulator.cpp -o kalkulator
./kalkulator
# di Windows: .\kalkulator.exe
```

**Output:**

```text
== 1. Kalkulator postfix (baca kiri) ==
Jejak '2 3 * 5 +':
  baca '2': dorong angka -> [2]
  baca '3': dorong angka -> [2, 3]
  baca '*': hitung 2*3=6 -> [6]
  baca '5': dorong angka -> [6, 5]
  baca '+': hitung 6+5=11 -> [11]
Hasil = 11 (harusnya 11 karena (2*3)+5)
== 2. Kalkulator prefix (baca kanan) ==
Jejak '+ * 2 3 5':
  baca '5': dorong angka -> [5]
  baca '3': dorong angka -> [5, 3]
  baca '2': dorong angka -> [5, 3, 2]
  baca '*': hitung 2*3=6 -> [5, 6]
  baca '+': hitung 6+5=11 -> [11]
Hasil = 11 (harusnya 11 juga)
== 3. Contoh lain ==
'5 1 2 + 4 * + 3 -' = 14 (harusnya 14)
'- + 5 * + 1 2 4 3' = 14 (harusnya 14 juga)
'* + 2 3 4' = 20 (harusnya 20 karena (2+3)*4)
== 4. Tanpa spasi (versi tugas) ==
'23*5+' = 11 (harusnya 11)
'+*235' = 11 (harusnya 11)
== 5. Contoh salah ==
'4 0 /' = ERROR: bagi nol!
'2 +' = ERROR: angka kurang!
```

**Penjelasan (kalimat pendek):**

1. **Kenapa postfix gampang?** Tidak butuh kurung. Angka numpang di tumpukan. Tanda selalu pakai 2 angka teratas. Urutan ambil penting untuk kurang/bagi: `b` = paling atas (kanan), `a` = bawahnya (kiri), hitung `a tanda b`. Contoh `5-3`: dorong 5, dorong 3, ketemu `-` ambil b=3, a=5, hitung 5-3=2. Kalau dibalik jadi -2, salah.
2. **Kenapa prefix jalan dari belakang?** Karena tanda di depan. Kalau jalan dari kiri akan ketemu tanda dulu padahal angka belum ada. Jadi balik: baca dari kanan, jadinya sama seperti postfix. Contoh `+ * 2 3 5` dibaca mundur jadi `5 3 2 * +`, lalu hitung seperti biasa.
3. **Fungsi `pecah`:** kalau ada spasi, potong per kata biar `12` tetap dua belas (bukan 1 dan 2). Kalau tidak ada spasi (versi tugas `23*5+`), potong per huruf biar cocok dengan tugas lama.
4. **Fungsi `terapkan`:** satu tempat untuk `+ - * / ^`. Bagi nol dicek dulu biar tidak crash. Pangkat pakai `pow` dari `<cmath>`.
5. **Hubungan dengan Studi Kasus 1:** kalkulator infix = ubah dulu ke postfix (`infixToPostfix`), lalu `evalPostfix`. Contoh `(2+3)*4` → postfix `2 3 + 4 *` → hasil 20. Jadi 3 studi kasus saling sambung: ubah (SK1) → hitung (SK3) → batal/ulang (SK2).

> **Coba sendiri:** ganti `main` dengan angka buatanmu. Aturan: postfix tulis angka-spasi-tanda, mis `10 2 8 * + 3 -`. Prefix tulis terbalik, mis `- + 10 * 2 8 3`. Hitung tangan dulu, lalu cek dengan program.

## 6. Tugas Praktikum 🧩

> Kerjakan tugas sesuai tingkat kesulitan yang ditentukan. Kumpulkan setiap tugas dalam bentuk **satu berkas `.cpp`, tangkapan layar keluaran, dan analisis singkat dalam laporan**. Pastikan `g++ -std=c++17` dapat mengompilasi program tanpa galat.

### 🟢 Tingkat Dasar — *Memahami Langkah Dasar*

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

### 🟡 Tingkat Menengah — *Menerapkan Pola Klasik*

**Tugas M1: Pemeriksa Kurung Seimbang `{[()]}`.**
1. Implementasikan fungsi `bool isBalanced(string s)` memakai `std::stack<char>`: untuk setiap kurung buka (`{[( `) di-push; untuk kurung tutup, cek top cocok lalu pop; jika stack kosong saat tutup datang → tidak seimbang.
2. Uji minimal 5 kasus: `{[()]}`, `{[(}]}`, `((()))`, `([)]`, string kosong (valid!). Cetak `VALID`/`TIDAK` untuk tiap kasus.
3. Analisis kompleksitas waktu & ruang di laporan (target: O(n) waktu, O(n) ruang) + jelaskan mengapa stack wajib di sini (tidak bisa diganti counter biasa).
*Kriteria nilai:* kebenaran 5 kasus (50%), penanganan stack kosong (20%), analisis O (30%).

**Tugas M2: Evaluasi Postfix + Coba Prefix.**
1. Lengkapi fungsi `int evalPostfix(string s)` untuk ekspresi satu digit (contoh `23*5+` = 11, `82/3-` = 1). Aturan: digit → dorong; operator `+-*/` → ambil dua (`b = pop, a = pop`), dorong `a op b`.
2. Tangani: pembagian nol (cetak error, return 0), ekspresi salah (isi akhir stack ≠ 1).
3. Uji minimal 4 ekspresi + tunjukkan isi stack untuk satu ekspresi di laporan.
4. Bonus: salin kode `konversi.cpp`, uji `infixToPrefix` dan `prefixToInfix` untuk `A+B*C` dan `(A+B)*C`. Tulis 2 kalimat: apa beda cara kerja prefix vs postfix?
*Kriteria nilai:* hitung benar (50%), atasi error (25%), jejak + bonus prefix (25%).

### 🔴 Tingkat Lanjut — *Menggabungkan dan Menganalisis*

**Tugas E1: Dua Stack dalam Satu Array (interview classic).**
1. Implementasikan class `TwoStacks` berkapasitas `MAX`: stack1 tumbuh dari kiri (`top1` mulai -1, naik), stack2 tumbuh dari kanan (`top2` mulai MAX, turun). Full saat `top1 + 1 == top2`.
2. Sediakan `push1/push2/pop1/pop2` + demo interleaved: push1(1,2,3), push2(9,8), pop1, pop2, cetak isi kedua stack.
3. Di laporan: buktikan mengapa skema ini hemat memori dibanding dua array terpisah + analisis kompleksitas tiap operasi.
*Kriteria nilai:* kebenaran logika dua arah (50%), demo interleaved (20%), analisis memori (30%).

**Tugas E2: Uji `^` + Prefix Bolak-balik + Undo/Redo Sempurna.**
1. Kode `konversi.cpp` sudah benar untuk pangkat `^` yang kumpul dari kanan (*right-associative* = kumpul dari kanan, arti mudahnya: `A^B^C` = `A^(B^C)`). Buktikan: uji `A^B^C` → `ABC^^` dan `^A^BC` (bukan `AB^C^`), `A+B*C` tetap `ABC*+` dan `+A*BC`. Jelaskan 3 kalimat: kenapa aturan `^` dibalik antara postfix dan prefix. Coba hapus aturan khusus `^` lalu tunjukkan hasilnya jadi salah.
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
