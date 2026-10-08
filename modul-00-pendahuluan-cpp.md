# Modul 0: Pendahuluan dan Tinjauan Ulang Bahasa C++

> **Mata Kuliah:** Struktur Data | **Program Studi:** Teknik Informatika – UNIRA
> **Durasi:** 2 × 100 menit | **Prasyarat:** Dasar Pemrograman

> **Panduan menjalankan program:**
> 1. Salin satu blok kode secara utuh, mulai dari `#include` sampai `return 0`, ke dalam berkas, misalnya `kartu.cpp`.
> 2. Buka terminal pada direktori penyimpanan berkas tersebut.
> 3. Kompilasi program dengan perintah `g++ -std=c++17 kartu.cpp -o kartu`.
> 4. Jalankan program dengan perintah `./kartu` pada Linux/macOS atau `.\kartu.exe` pada Windows.
> 5. Bandingkan keluaran program dengan contoh keluaran yang tersedia pada setiap bagian.
>
> **Istilah penting:**
> - **Kompleksitas waktu (*time complexity*)** menjelaskan laju pertambahan waktu eksekusi ketika jumlah data bertambah.
> - **Kompleksitas ruang (*space complexity*)** menjelaskan jumlah memori tambahan yang dibutuhkan oleh algoritma.
> - **Penunjuk (*pointer*)** menyimpan alamat memori, sedangkan **referensi (*reference*)** menjadi nama lain bagi variabel yang sama.

## 1. Capaian Pembelajaran

Setelah menyelesaikan modul ini, mahasiswa mampu:

1. Menjelaskan pengertian struktur data serta kompleksitas waktu dan ruang.
2. Menggunakan variabel, tipe data primitif, konstanta, dan kontrol alur di C++.
3. Menggunakan penunjuk (*pointer*) dan referensi (*reference*) serta menjelaskan hubungan keduanya dengan memori.
4. Menggunakan larik satu dimensi, larik dua dimensi, `struct`, dan larik berisi `struct` sebagai struktur data dasar.

## 2. Konsep Dasar Struktur Data

**Struktur data** merupakan cara untuk mengatur dan menyimpan data agar program dapat mengakses serta mengubah data secara efisien. Sebagai contoh, petugas perpustakaan dapat menemukan buku lebih cepat ketika ia menyusun buku berdasarkan kategori, rak, dan kode. Dalam pemrograman, pemilihan struktur data juga memengaruhi kecepatan eksekusi dan penggunaan memori.

Programmer biasanya mengukur efisiensi algoritma melalui dua aspek. **Kompleksitas waktu** menunjukkan laju pertambahan waktu eksekusi ketika jumlah data (`n`) meningkat. **Kompleksitas ruang** menunjukkan jumlah memori tambahan yang digunakan algoritma di luar memori untuk data masukan. Programmer perlu mempertimbangkan kedua aspek tersebut sebelum memilih algoritma.

| Notasi | Nama | Artinya secara intuitif | Contoh |
|---|---|---|---|
| O(1) | Konstan | Waktu tetap, tidak peduli n | Akses `arr[i]` |
| O(log n) | Logaritmik | Setiap langkah mengurangi separuh ruang pencarian | Pencarian biner |
| O(n) | Linear | Waktu bertambah sebanding dengan `n` | Penelusuran larik |
| O(n log n) | Linearitmik | Waktu bertambah sebanding dengan `n log n` | *Merge Sort* |
| O(n²) | Kuadratik | Algoritma memakai dua perulangan bersarang | *Bubble Sort* |

Sebagai perbandingan, *Bubble Sort* hanya membutuhkan satu variabel bantu sehingga kompleksitas ruangnya O(1). *Merge Sort* membutuhkan larik bantu berukuran `n` sehingga kompleksitas ruangnya O(n). Perbedaan kebutuhan memori tersebut akan semakin terasa ketika program mengolah jutaan data.

![Pointer bekerja: variabel, address, dereference](https://www.programiz.com/sites/tutorial2program/files/cpp-pointer-working_0.png)
*Gambar 1. Cara kerja pointer: `var`, `&var` (address), `*p` (dereference). Sumber: Programiz.*

![Diagram pointer ptr = &x](https://media.geeksforgeeks.org/wp-content/uploads/20241210113214643291/pointer-in-c.png)
*Gambar 2. Pointer `ptr` menyimpan alamat `x`. Sumber: GeeksforGeeks.*

## 3. Dasar C++

### 3.1 Variabel, Tipe Data, dan Konstanta

Variabel menjadi dasar penyimpanan data dalam program. Setiap variabel memberikan nama pada suatu lokasi di memori. C++ merupakan bahasa dengan tipe statis (*statically typed*), sehingga programmer harus menentukan tipe setiap variabel saat deklarasi. Setelah deklarasi, tipe variabel tersebut tidak dapat berubah. Aturan ini membantu kompilator menemukan kesalahan sebelum program berjalan dan mengatur penggunaan memori secara tepat.

Program berikut mendeklarasikan lima tipe data yang sering digunakan dalam praktikum. Program memakai `int` untuk NIM, `float` untuk IPK, `char` untuk nilai huruf, `bool` untuk status kelulusan, dan `string` untuk nama. Kata kunci `const` pada `PI` menetapkan nilai yang tidak dapat diubah setelah inisialisasi. Oleh karena itu, `const` sesuai untuk konstanta matematika atau batas ukuran larik. Kompilator akan menghasilkan galat apabila program mencoba menjalankan pernyataan seperti `PI = 3.0;`.

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    int nim = 230101;          // integer 4 byte untuk NIM numerik
    float ipk = 3.75f;         // float 4 byte; huruf f menegaskan literal float
    char grade = 'A';          // 1 byte; wajib kutip SATU ('A', bukan "A")
    bool lulus = true;         // hanya true/false, cocok untuk flag
    const float PI = 3.14f;    // dikunci, tidak boleh diubah
    string nama = "Ahmad";     // tipe komposit dari <string>

    cout << "===== KARTU MAHASISWA =====" << endl;
    cout << "NIM   : " << nim << endl;
    cout << "Nama  : " << nama << endl;
    cout << "IPK   : " << ipk << endl;
    cout << "Grade : " << grade << endl;
    cout << "Lulus : " << (lulus ? "Ya" : "Tidak") << endl;
    return 0;
}
```

Mahasiswa perlu memperhatikan beberapa detail pada program tersebut. Huruf `f` pada `3.75f` menegaskan bahwa literal itu bertipe `float`; tanpa huruf tersebut, kompilator akan menganggapnya sebagai `double`. Tipe `char` menggunakan tanda petik tunggal, seperti `'A'`, sedangkan `"A"` merupakan literal string. Baris `#include <iostream>` memuat pustaka masukan dan keluaran agar program dapat memakai `cout`. Pernyataan `using namespace std;` memungkinkan program menulis `cout` tanpa awalan `std::`.

**Output program:**

```text
===== KARTU MAHASISWA =====
NIM   : 230101
Nama  : Ahmad
IPK   : 3.75
Grade : A
Lulus : Ya
```

> **Kesalahan umum:** programmer melupakan akhiran `f` pada literal `float`, menukar `'A'` dengan `"A"`, atau mencoba mengubah nilai variabel `const`. Kesalahan tersebut dapat menghasilkan peringatan atau galat saat kompilasi.

### 3.2 Kontrol Alur: Percabangan dan Perulangan

Program menggunakan percabangan untuk mengambil keputusan dan menggunakan perulangan untuk mengerjakan langkah yang sama secara berulang. Kedua mekanisme tersebut menjadi dasar berbagai algoritma struktur data. Algoritma pencarian mengulang proses perbandingan, algoritma pengurutan mengulang proses pertukaran, dan algoritma penelusuran mengunjungi setiap elemen secara sistematis.

Kode berikut memperagakan tiga pola kontrol yang akan muncul terus-menerus di modul-modul berikutnya. Blok `if-else if-else` menentukan grade dari IPK dengan cara mengevaluasi kondisi dari atas ke bawah — kondisi pertama yang benar langsung dieksekusi dan sisanya dilewati. Karena itu urutan sangat penting: jika `ipk >= 3.0` ditulis sebelum `ipk >= 3.5`, maka IPK 3.8 pun akan terjebak di grade B. Selanjutnya blok `switch` memilih pesan berdasarkan nilai grade secara persis, di mana setiap `case` wajib diakhiri `break` agar tidak terjadi *fall-through* ke case berikutnya. Terakhir, tiga jenis loop diperagakan: `for` untuk jumlah iterasi yang sudah diketahui, `while` untuk iterasi berbasis kondisi yang dicek di awal, dan `do-while` yang kondisinya dicek di akhir sehingga badannya minimal berjalan satu kali.

```cpp
#include <iostream>
using namespace std;

int main() {
    float ipk = 3.2;
    char grade;

    // --- Selection bertingkat ---
    if (ipk >= 3.5) grade = 'A';
    else if (ipk >= 3.0) grade = 'B';
    else grade = 'C';

    cout << "IPK " << ipk << " => Grade " << grade << " => ";

    // --- Selection nilai ---
    switch (grade) {
        case 'A': cout << "Sangat Baik"; break;
        case 'B': cout << "Baik"; break;
        default:  cout << "Cukup";
    }
    cout << endl;

    // --- Looping ---
    cout << "for   : ";
    for (int i = 0; i < 5; i++) cout << i << " ";
    cout << endl;

    int j = 0;
    cout << "while : ";
    while (j < 5) { cout << j << " "; j++; }
    cout << "(j berakhir = " << j << ")" << endl;

    cout << "do-while: ";
    do { cout << j << " "; j--; } while (j > 0);
    cout << "(j berakhir = " << j << ")" << endl;
    return 0;
}
```

Mari kita telusuri nilai `j` agar perilaku ketiga loop benar-benar jelas. Loop `for` mencetak `0 1 2 3 4` dengan variabel `i` yang hidup hanya di dalam loop itu. Kemudian `while` mencetak hal yang sama (`0 1 2 3 4`) tetapi memakai variabel luar `j`, sehingga ketika loop selesai nilai `j` tertinggal di angka 5. Nilai sisa 5 inilah yang menjadi modal `do-while`: karena kondisinya dicek sesudah badan loop, ia mencetak mundur `5 4 3 2 1` sebelum akhirnya berhenti di nol. Dari sini terlihat perbedaan filosofinya — `for` untuk traversal array berukuran pasti, `while` untuk kondisi seperti antrean yang belum kosong, dan `do-while` untuk menu yang minimal harus tampil sekali.

**Output program (untuk ipk = 3.2):**

```text
IPK 3.2 => Grade B => Baik
for   : 0 1 2 3 4
while : 0 1 2 3 4 (j berakhir = 5)
do-while: 5 4 3 2 1 (j berakhir = 0)
```

### 3.3 Penunjuk (*Pointer*) dan Referensi (*Reference*)

Penunjuk dan referensi menjadi dasar bagi sebagian besar struktur data dinamis. Senarai berantai, pohon, dan graf menggunakan penunjuk untuk menghubungkan satu elemen dengan elemen lain. Variabel biasa menyimpan nilai, sedangkan penunjuk menyimpan alamat lokasi nilai tersebut. Referensi menjadi nama lain atau alias bagi variabel yang sudah ada. Operator `&` mengambil alamat suatu variabel, sedangkan operator `*` mengakses nilai pada alamat yang ditunjuk. Dalam deklarasi `int* p`, simbol `*` menyatakan bahwa `p` merupakan penunjuk. Dalam ekspresi `*p`, simbol yang sama melakukan dereferensi terhadap `p`.

Program di bawah ini membuktikan hubungan tersebut secara empiris. Misalkan sistem operasi menaruh variabel `x` di alamat `0x1000` berisi nilai 10. Baris `int* p = &x` mengisi pointer `p` dengan alamat itu, sehingga `p` dan `&x` mencetak nilai yang sama persis. Baris `int& r = x` menciptakan alias `r` yang tidak memiliki memori sendiri — `r` dan `x` adalah dua nama untuk sel `0x1000` yang sama. Ketika program menjalankan `*p = 20`, ia menulis angka 20 ke alamat yang ditunjuk `p`, sehingga `x` ikut berubah karena `x` memang tinggal di sana. Ketika program menjalankan `r = 30`, itu identik dengan menulis `x = 30` karena keduanya menunjuk sel yang sama. Perbedaan kunci yang harus diingat: pointer bisa bernilai `nullptr` dan bisa dipindahkan menunjuk variabel lain (`p = &y`), sedangkan reference wajib langsung diinisialisasi, tidak bisa null, dan menempel permanen pada variabel pertamanya.

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 10;
    int* p = &x;      // p menyimpan ALAMAT x
    int& r = x;       // r adalah ALIAS dari x (tanpa memori sendiri)

    cout << "--- Kondisi awal ---" << endl;
    cout << "x   = " << x << endl;
    cout << "&x  = " << &x << "  (alamat x)" << endl;
    cout << "p   = " << p << "  (sama dengan &x, bukti p menunjuk x)" << endl;
    cout << "*p  = " << *p << "  (dereference: isi yang ditunjuk p)" << endl;
    cout << "r   = " << r << "  (alias, ikut bernilai 10)" << endl;

    *p = 20;  // tulis 20 ke alamat yang ditunjuk p -> x ikut berubah
    cout << "\nSetelah *p = 20  -> x = " << x << endl;

    r = 30;   // sama dengan x = 30
    cout << "Setelah r = 30   -> x = " << x << endl;
    cout << "Cek silang: *p = " << *p << ", r = " << r << endl;
    return 0;
}
```

Analogi yang paling membantu adalah membayangkan `x` sebagai sebuah rumah. Maka `&x` adalah alamat rumah itu, `p` adalah secarik kertas bertuliskan alamat yang bisa disobek atau diganti tulisannya, sedangkan `r` adalah nama panggilan rumah seperti "si Kuning" yang tetap merujuk ke rumah yang sama selamanya. Analogi ini menjelaskan mengapa pointer menjadi berbahaya jika ceroboh: kertas alamat yang kosong (pointer belum diinisialisasi) lalu didatangi (`*p = 5`) akan menulis ke sembarang tempat di memori dan membuat program crash. Sebaliknya reference selalu aman karena ia tidak pernah kosong.

**Output program (alamat heksadesimal berbeda setiap run):**

```text
--- Kondisi awal ---
x   = 10
&x  = 0x61ff0c  (alamat x)
p   = 0x61ff0c  (sama dengan &x, bukti p menunjuk x)
*p  = 10  (dereference: isi yang ditunjuk p)
r   = 10  (alias, ikut bernilai 10)

Setelah *p = 20  -> x = 20
Setelah r = 30   -> x = 30
Cek silang: *p = 30, r = 30
```

> **Kesalahan umum:** mendereference pointer yang belum diinisialisasi (`int* p; *p = 5;` → crash), serta lupa `delete` untuk setiap `new` sehingga terjadi memory leak (dibahas di Modul 4).

### 3.4 Larik, `struct`, dan Larik Berisi `struct`

Larik (*array*) menyimpan sekumpulan elemen dengan tipe yang sama secara berurutan di memori. Program dapat menghitung alamat elemen ke-`i` dengan rumus `alamat_awal + i × ukuran_elemen`. Oleh karena itu, program dapat mengakses elemen larik dalam kompleksitas O(1). Namun, satu larik hanya dapat menampung satu tipe data. `struct` mengatasi keterbatasan tersebut dengan menggabungkan beberapa bidang yang memiliki tipe berbeda. Sebagai contoh, satu `struct Mahasiswa` dapat menyimpan NIM, nama, dan IPK. Modul 1 akan menggunakan larik berisi `struct` untuk mengolah data mahasiswa.

Program berikut memperagakan ketiga level penyimpanan itu dalam satu tempat. Array satu dimensi `nilai` menyimpan lima angka berurutan, sedangkan matriks `2×3` disimpan secara *row-major* (baris demi baris: 1 2 3 4 5 6) sehingga `matriks[1][2]` bernilai 6. Kemudian array of struct `mhs` menyimpan tiga mahasiswa utuh, di mana setiap elemen diinisialisasi secara agregat seperti `{"230101", "Ahmad", 3.75}` yang mengisi field nim, nama, dan ipk secara berurutan. Operator titik (`mhs[i].nim`) dipakai untuk mengakses field, sedangkan versi panah (`->`) akan muncul pada studi kasus ketika datanya berupa pointer. Satu keterbatasan penting perlu dicatat: ukuran array statis seperti ini sudah dikunci saat compile, sehingga untuk ukuran yang baru diketahui saat program berjalan (input user) kita memerlukan alokasi dinamis `new[]` atau `vector`.

```cpp
#include <iostream>
#include <string>
using namespace std;

struct Mahasiswa {
    string nim;
    string nama;
    float ipk;
};

int main() {
    int nilai[5] = {80, 75, 90, 85, 70};       // array 1D
    int matriks[2][3] = {{1,2,3},{4,5,6}};     // array 2D (row-major)

    Mahasiswa mhs[3] = {                        // array of struct
        {"230101", "Ahmad", 3.75},
        {"230102", "Budi", 3.20},
        {"230103", "Citra", 3.90}
    };

    cout << "nilai[2]     = " << nilai[2] << " (elemen ke-3)" << endl;
    cout << "matriks[1][2] = " << matriks[1][2] << " (baris 2, kolom 3)" << endl;
    cout << "\n===== DAFTAR MAHASISWA =====" << endl;
    cout << "NIM\t\tNama\tIPK" << endl;
    for (int i = 0; i < 3; i++)
        cout << mhs[i].nim << "\t" << mhs[i].nama << "\t" << mhs[i].ipk << endl;
    return 0;
}
```

**Output program:**

```text
nilai[2]     = 90 (elemen ke-3)
matriks[1][2] = 6 (baris 2, kolom 3)

===== DAFTAR MAHASISWA =====
NIM		Nama	IPK
230101	Ahmad	3.75
230102	Budi	3.2
230103	Citra	3.9
```

## 4. Studi Kasus: Data Nilai Mahasiswa

Studi kasus ini menggabungkan seluruh materi tinjauan ulang ke dalam satu program. Program menyimpan data lima mahasiswa, menghitung rata-rata IPK, serta menemukan mahasiswa dengan IPK tertinggi. Program menggunakan alokasi dinamis `new[]` dan penelusuran dengan aritmetika penunjuk `(data + i)->ipk`. Melalui langkah tersebut, mahasiswa dapat membuktikan bahwa `data[i].ipk` setara dengan `(data + i)->ipk`. Pemahaman ini akan membantu mahasiswa mempelajari senarai berantai pada Modul 4.

Alur program terbagi dalam empat tahap yang runtut. Tahap pertama adalah alokasi dinamis `new Mahasiswa[5]`, yang meminta memori sebesar lima struct langsung dari *heap* saat program berjalan — kelebihannya, angka 5 ini bisa diganti variabel dari input user, sesuatu yang mustahil dilakukan array statis. Tahap kedua adalah loop input yang membaca NIM, nama, dan IPK untuk setiap mahasiswa; di sini `data[i].nim` memakai operator titik karena `data[i]` adalah objek struct hasil dereference implisit. Tahap ketiga adalah loop agregasi yang menjadi inti latihan: baris `total += (data+i)->ipk` menjumlahkan IPK lewat alamat elemen (`data+i`) dan operator panah (`->`), sementara variabel `maks` dan `idx` yang diinisialisasi dari elemen pertama terus diperbarui setiap kali ditemukan IPK yang lebih besar. Tahap terakhir mencetak hasil dan mengembalikan memori lewat `delete[] data` — tanda kurung siku di sana hukumnya wajib, karena tanpanya hanya elemen pertama yang dihancurkan dan sisanya bocor.

```cpp
#include <iostream>
#include <string>
using namespace std;

struct Mahasiswa { string nim, nama; float ipk; };

int main() {
    Mahasiswa *data = new Mahasiswa[5]; // alokasi dinamis di heap
    for (int i = 0; i < 5; i++) {
        cout << "Mahasiswa " << i+1 << " (NIM Nama IPK): ";
        cin >> data[i].nim >> data[i].nama >> data[i].ipk;
    }
    float total = 0, maks = data[0].ipk;
    int idx = 0;
    for (int i = 0; i < 5; i++) {
        total += (data+i)->ipk; // pointer arithmetic, setara data[i].ipk
        if (data[i].ipk > maks) { maks = data[i].ipk; idx = i; }
    }
    cout << "\n===== HASIL =====" << endl;
    cout << "Rata-rata IPK : " << total/5 << endl;
    cout << "IPK Tertinggi : " << data[idx].nama
         << " (" << data[idx].nim << ") = " << maks << endl;
    delete[] data; // wajib! kembalikan memori heap
    return 0;
}
```

Mari kita simulasikan program dengan contoh konkret agar angkanya hidup. Misalkan lima IPK yang dimasukkan adalah 3.0, 3.5, 2.8, 3.9, dan 3.2 — maka `total` terkumpul menjadi 16.4 dan `maks` bergerak dari 3.0 naik ke 3.5, bertahan, melonjak ke 3.9, lalu bertahan, sehingga `idx` berhenti di angka 3 (mahasiswa keempat). Karena `total` bertipe float, pembagian `total/5` menghasilkan 3.28 yang presisi; seandainya `total` bertipe int, hasilnya akan terpotong menjadi 3 — jebakan klasik yang wajib diwaspadai. Setelah `delete[]`, pointer `data` menjadi *dangling* dan tidak boleh dipakai lagi kecuali di-set `nullptr`.

**Output program (contoh interaksi):**

```text
Mahasiswa 1 (NIM Nama IPK): 230101 Ahmad 3.0
Mahasiswa 2 (NIM Nama IPK): 230102 Budi 3.5
Mahasiswa 3 (NIM Nama IPK): 230103 Citra 2.8
Mahasiswa 4 (NIM Nama IPK): 230104 Dewi 3.9
Mahasiswa 5 (NIM Nama IPK): 230105 Eka 3.2

===== HASIL =====
Rata-rata IPK : 3.28
IPK Tertinggi : Dewi (230104) = 3.9
```

## 5. Tugas Praktikum

1. **Tugas 1:** Buatlah program yang menyimpan matriks berukuran 3 × 3, lalu tampilkan transposenya. Jelaskan kompleksitas waktu program tersebut.
2. **Tugas 2:** Tulis ulang studi kasus di atas dengan menggunakan `vector<Mahasiswa>` dan referensi pada perulangan `for (auto &m : data)`.
3. **Tugas 3 (laporan):** Jelaskan perbedaan antara `int* p`, `int** q`, dan `int& r`. Sertakan diagram memori untuk mendukung penjelasan.

## 6. Video Pembelajaran 🎬

1. **Kelas Terbuka – Playlist Belajar C++ Dasar (Indonesia)** – Pointer, Reference, Struct dijelaskan bertahap.
   https://www.youtube.com/playlist?list=PLZS-MHyEIRo4Ze0bbGB1WKBSNMPzi-eWI
2. **Apna College – Pointers in C++ In Detail (46 mnt, Inggris).**
   https://www.youtube.com/watch?v=qYEjR6M0wSk
3. **freeCodeCamp – C++ Programming Course Beginner to Advanced (31 jam).**
   https://www.youtube.com/watch?v=8jLOx1hD3_o

## 7. Referensi Website 🌐

1. Programiz – *C++ Pointers (With Examples)* – https://www.programiz.com/cpp-programming/pointers
2. GeeksforGeeks – *C++ Pointers* – https://www.geeksforgeeks.org/cpp/cpp-pointers/
3. Programiz – *C++ Structures* – https://www.programiz.com/cpp-programming/structure
4. GeeksforGeeks – *Time and Space Complexity* – https://www.geeksforgeeks.org/dsa/time-complexity-and-space-complexity/
5. cppreference – *std::array* – https://en.cppreference.com/w/cpp/container/array
