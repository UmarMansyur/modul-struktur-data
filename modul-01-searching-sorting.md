# Modul 1: Searching & Sorting

> **Mata Kuliah:** Struktur Data | **Durasi:** 2 × 100 menit | **Prasyarat:** Modul 0

## 1. Capaian Pembelajaran

Setelah menyelesaikan modul ini, mahasiswa mampu:

1. Menjelaskan dan mengimplementasikan Linear Search dan Binary Search.
2. Menjelaskan dan mengimplementasikan Bubble, Selection, Insertion Sort serta prinsip Quick & Merge Sort.
3. Menganalisis kompleksitas masing-masing algoritma.
4. Menyelesaikan studi kasus pengurutan & pencarian data mahasiswa berbasis Array of Struct.

## 2. Searching (Pencarian)

Pencarian adalah aktivitas paling manusiawi dalam komputasi: dari mencari nama di daftar hadir, mencari buku di perpustakaan, hingga mencari satu baris data di antara jutaan baris database. Setiap kali kita mengetik di kolom pencarian Google, sesungguhnya sebuah algoritma searching sedang bekerja di balik layar. Karena itu memahami searching bukan sekadar menghafal kode, melainkan memahami strategi menemukan sesuatu secara efisien — dan strategi yang tepat selalu bergantung pada kondisi datanya.

Ada dua pendekatan pencarian yang akan kita pelajari. Yang pertama adalah Linear Search, si pekerja jujur yang memeriksa satu per satu dari awal sampai akhir tanpa melewatkan apa pun. Ia tidak menuntut data yang rapi, tetapi ia lambat ketika data membesar. Yang kedua adalah Binary Search, si ahli strategi yang membelah masalah menjadi dua di setiap langkah dan membuang separuh yang tidak mungkin — tetapi ia menuntut satu syarat mutlak: data harus sudah terurut. Perbandingan keduanya mengajarkan pelajaran hidup yang dalam, yang akan kita renungkan di akhir bab ini.

### 2.1 Linear Search – O(n)

Linear Search adalah algoritma pencarian yang paling natural karena persis seperti cara manusia mencari kunci yang hilang di dalam tas: keluarkan satu per satu, periksa, jika bukan lanjutkan ke barang berikutnya. Ia tidak membutuhkan persiapan apa pun — data boleh acak, boleh belum diurutkan, boleh dalam kondisi apa pun. Kelebihan inilah yang membuatnya tetap relevan: untuk data kecil atau pencarian yang hanya dilakukan sekali, biaya mengurutkan data terlebih dahulu justru lebih mahal daripada mencarinya secara linear.

Perhatikan kodenya yang sangat pendek di bawah ini. Fungsi menerima tiga hal: array `arr`, ukurannya `n`, dan target `x`. Perlu dicatat bahwa parameter `int arr[]` sebenarnya diterima compiler sebagai pointer (`int*`), sehingga `sizeof(arr)` di dalam fungsi tidak akan memberi ukuran array yang sebenarnya — inilah alasan mengapa ukuran `n` harus dilewatkan secara eksplisit, dan ini adalah jebakan klasik yang wajib diingat. Loop berjalan dari indeks 0 hingga n−1, membandingkan setiap elemen dengan target; begitu ditemukan yang sama, fungsinya langsung mengembalikan indeks tersebut tanpa memeriksa sisanya. Pengembalian dini inilah yang membuat kasus terbaiknya O(1) — ketika target ternyata ada di posisi pertama. Namun jika loop selesai tanpa satu pun yang cocok, fungsi mengembalikan −1 sebagai konvensi universal "tidak ditemukan", karena indeks valid tidak pernah negatif.

```cpp
#include <iostream>
using namespace std;

int linearSearch(int arr[], int n, int x) {
    for (int i = 0; i < n; i++) {
        cout << "  cek indeks " << i << " (nilai " << arr[i] << ")... ";
        if (arr[i] == x) { cout << "KETEMU!" << endl; return i; }
        cout << "bukan" << endl;
    }
    return -1;
}

int main() {
    int arr[] = {5, 2, 9, 1, 7};
    int n = 5, x = 9;
    cout << "Mencari " << x << " secara linear:" << endl;
    int pos = linearSearch(arr, n, x);
    if (pos != -1) cout << "=> " << x << " ditemukan di indeks " << pos << endl;
    else cout << "=> " << x << " tidak ada" << endl;
    return 0;
}
```

Mari kita telusuri eksekusinya langkah demi langkah untuk target 9 pada array `[5, 2, 9, 1, 7]`. Iterasi pertama memeriksa indeks 0 (nilai 5, bukan), iterasi kedua memeriksa indeks 1 (nilai 2, bukan), dan iterasi ketiga memeriksa indeks 2 (nilai 9, cocok!) sehingga fungsi mengembalikan 2 setelah tepat tiga perbandingan. Dalam kasus terburuk — target tidak ada atau ada di posisi terakhir — algoritma harus memeriksa seluruh n elemen sehingga kompleksitasnya O(n). Kesimpulannya jelas: Linear Search adalah pilihan tepat ketika data kecil, tidak terurut, atau hanya dicari sesekali.

**Output program:**

```text
Mencari 9 secara linear:
  cek indeks 0 (nilai 5)... bukan
  cek indeks 1 (nilai 2)... bukan
  cek indeks 2 (nilai 9)... KETEMU!
=> 9 ditemukan di indeks 2
```

### 2.2 Binary Search – O(log n) ⚠️ data HARUS terurut

Jika Linear Search adalah pekerja keras, maka Binary Search adalah ahli strategi. Bayangkan permainan tebak angka 1 sampai 100: pemain buruk menebak 1, 2, 3 satu per satu, sedangkan pemain cerdas selalu menebak angka tengah — jika jawabannya "lebih besar", ia membuang seluruh separuh bawah sekaligus. Dengan strategi ini, menebak di antara satu juta angka pun hanya butuh sekitar 20 tebakan, karena 2²⁰ ≈ 1.000.000. Inilah keajaiban logaritmik: setiap langkah memangkas separuh ruang masalah, sehingga waktu tumbuh sangat lambat meski data membesar pesat.

Syarat mutlaknya hanya satu tetapi tidak bisa ditawar: data harus sudah terurut menaik. Tanpa keterurutan, keputusan "buang separuh kiri" tidak memiliki dasar kebenaran sama sekali. Perhatikan implementasi iteratifnya di bawah ini. Dua variabel `l` (low) dan `r` (right) menandai batas inklusif area yang masih mungkin mengandung target; selama `l <= r` berarti masih ada elemen tersisa untuk diperiksa. Titik tengah dihitung dengan rumus `l + (r - l) / 2` dan bukan `(l + r) / 2` — penulisan ini disengaja untuk mencegah integer overflow ketika `l + r` melampaui batas tipe int, sebuah bug nyata yang pernah bertahun-tahun bersembunyi di library standar populer. Setiap iterasi hanya punya tiga kemungkinan: tepat sama (ketemu, kembalikan), nilai tengah lebih kecil (target pasti di kanan, geser `l`), atau sebaliknya (geser `r`). Karena array terurut, pembuangan separuh ini dijamin aman dan tidak akan pernah membuang target yang sebenarnya ada.

![Array awal binary search](https://cdn.programiz.com/sites/tutorial2program/files/binary-search-initial-array.png)
*Gambar 1. Array awal binary search. Sumber: Programiz.*

![Setting pointer low/high](https://cdn.programiz.com/sites/tutorial2program/files/binary-search-set-pointers.png)
*Gambar 2. Pointer `low`, `mid`, `high`. Sumber: Programiz.*

```cpp
#include <iostream>
using namespace std;

int binarySearch(int arr[], int l, int r, int x) {
    int langkah = 1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        cout << "  langkah " << langkah++ << ": l=" << l << " r=" << r
             << " mid=" << mid << " (nilai " << arr[mid] << ")... ";
        if (arr[mid] == x) { cout << "KETEMU!" << endl; return mid; }
        if (arr[mid] < x) { cout << "terlalu kecil, buang kiri" << endl; l = mid + 1; }
        else { cout << "terlalu besar, buang kanan" << endl; r = mid - 1; }
    }
    return -1;
}

int main() {
    int arr[] = {1, 3, 5, 7, 9, 11, 13};
    int n = 7, x = 7;
    cout << "Mencari " << x << " secara biner:" << endl;
    int pos = binarySearch(arr, 0, n - 1, x);
    if (pos != -1) cout << "=> " << x << " ditemukan di indeks " << pos << endl;
    else cout << "=> " << x << " tidak ada" << endl;
    return 0;
}
```

Mari kita telusuri pencarian angka 7 pada array `[1, 3, 5, 7, 9, 11, 13]`. Langkah pertama: l=0, r=6, mid=3 (nilai 7) — langsung cocok dan fungsi mengembalikan 3 hanya dalam satu langkah, sedangkan Linear Search butuh empat perbandingan untuk kasus yang sama. Untuk target yang tidak seberuntung itu, misalnya 11: langkah pertama mid=3 (nilai 7 < 11, buang kiri, l=4), langkah kedua mid=5 (nilai 11, ketemu) — hanya dua langkah untuk tujuh elemen. Secara umum, binary search pada n elemen butuh maksimal sekitar log₂(n) + 1 langkah, sehingga satu miliar data terurut pun hanya butuh sekitar 30 langkah. Inilah alasan database dan kamus digital selalu menyimpan data dalam keadaan terurut atau terindeks.

**Output program:**

```text
Mencari 7 secara biner:
  langkah 1: l=0 r=6 mid=3 (nilai 7)... KETEMU!
=> 7 ditemukan di indeks 3
```

> **Renungan filosofis searching:** Linear Search mengajarkan *kejujuran proses* — tidak ada jalan pintas, setiap elemen diperiksa dengan adil tanpa prasangka, tetapi kesabaran itu mahal harganya. Binary Search mengajarkan *pentingnya persiapan* — ia hanya bisa berlari kencang karena seseorang telah bersusah payah mengurutkan data sebelumnya; kecepatan hari ini selalu dibayar oleh kedisiplinan kemarin. Dalam hidup pun demikian: orang yang terlihat "instan menemukan jawaban" biasanya telah lama merapikan pengetahuannya, sedangkan yang datanya (hidupnya) masih berantakan mau tidak mau harus menelusuri satu per satu dengan sabar.

## 3. Sorting (Pengurutan)

Jika searching adalah seni menemukan, maka sorting adalah seni merapikan. Manusia secara naluriah menyukai keteraturan: kartu di tangan diurutkan dari kecil ke besar, buku di rak disusun alfabetis, antrean diaturตาม nomor. Komputer pun demikian — data yang terurut tidak hanya enak dipandang, tetapi membuka pintu bagi algoritma cepat seperti Binary Search. Tanpa sorting, Binary Search lumpuh; tanpa keteraturan, strategi terbaik pun tidak bisa berjalan. Maka mempelajari sorting berarti mempelajari cara menciptakan ketertiban dari kekacauan, langkah demi langkah.

Tabel berikut merangkum lima algoritma yang akan kita bedah. Tiga yang pertama (Bubble, Selection, Insertion) berkompleksitas kuadratik — lambat untuk data besar tetapi sempurna sebagai laboratorium pemahaman karena logikanya transparan. Dua yang terakhir (Quick, Merge) berkompleksitas n log n — jauh lebih cepat dan dipakai di dunia nyata, tetapi mekanismenya (rekursi, partisi, penggabungan) menuntut abstraksi yang lebih tinggi. Kata "stabil" pada tabel berarti algoritma tidak akan menukar urutan relatif dua elemen yang nilainya sama — sifat penting ketika mengurutkan struct, misalnya dua mahasiswa ber-IPK sama harus tetap dalam urutan NIM semula.

| Algoritma | Best | Average | Worst | Stabil | Ide 1 kalimat |
|---|---|---|---|---|---|
| Bubble Sort | O(n) | O(n²) | O(n²) | Ya | Gelembungkan terbesar ke kanan tiap pass |
| Selection Sort | O(n²) | O(n²) | O(n²) | Tidak | Pilih minimum, taruh di depan |
| Insertion Sort | O(n) | O(n²) | O(n²) | Ya | Sisipkan kartu ke tangan yang sudah urut |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | Tidak | Partisi sekitar pivot, rekursi |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | Ya | Belah dua, urutkan, gabung |

### 3.1 Bubble Sort

Bubble Sort bekerja persis seperti gelembung udara dalam air soda: yang terbesar selalu naik ke permukaan. Dalam setiap *pass* (putaran penuh), algoritma membandingkan pasangan-pasangan bersebelahan dan menukar yang salah urutan, sehingga elemen terbesar "menggelembung" ke posisi paling kanan dan tidak perlu disentuh lagi. Karena `i` elemen kanan sudah final setelah `i` pass, batas loop dalam menyusut menjadi `n−i−1` — detail kecil yang sekaligus menghemat kerja dan mencegah akses keluar batas. Bendera `swapped` adalah optimasi yang elegan: jika satu pass penuh berlalu tanpa satu pun pertukaran, berarti array sudah urut dan algoritma boleh berhenti lebih awal, sehingga kasus terbaiknya (data sudah urut) hanya butuh satu pass alias O(n).

Perbandingan memakai operator tegas `>` dan bukan `>=`, sehingga dua elemen yang sama nilainya tidak pernah ditukar — inilah yang membuat Bubble Sort stabil dan aman untuk data struct. Setiap pertukaran memakai `swap` bawaan C++ yang bekerja O(1). Kelemahannya tentu kompleksitas kuadratik pada kasus rata-rata dan terburuk, sehingga ia tidak cocok untuk data besar; tetapi sebagai alat belajar, tidak ada algoritma yang lebih jujur memperlihatkan cara kerja pertukaran bersebelahan.

```cpp
#include <iostream>
using namespace std;

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        bool swapped = false;
        cout << "pass " << i+1 << ": ";
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) { swap(arr[j], arr[j+1]); swapped = true; }
        }
        for (int k = 0; k < n; k++) cout << arr[k] << " ";
        cout << (swapped ? "(ada tukar)" : "(rapi, berhenti)") << endl;
        if (!swapped) break;
    }
}

int main() {
    int arr[] = {5, 1, 4, 2};
    int n = 4;
    cout << "Awal: 5 1 4 2" << endl;
    bubbleSort(arr, n);
    cout << "Akhir: ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    return 0;
}
```

Telusuri contoh `[5, 1, 4, 2]`: pass pertama membandingkan 5–1 (tukar), 5–4 (tukar), 5–2 (tukar) menghasilkan `[1, 4, 2, 5]` dengan 5 sudah final di ujung. Pass kedua menghasilkan `[1, 2, 4, 5]`, dan pass ketiga tidak menemukan pertukaran sehingga algoritma berhenti dini. Total hanya tiga pass untuk empat elemen, dan cetakan per pass di atas membuktikan gelembung terbesar selalu menetap di kanan tepat seperti teori.

**Output program:**

```text
Awal: 5 1 4 2
pass 1: 1 4 2 5 (ada tukar)
pass 2: 1 2 4 5 (ada tukar)
pass 3: 1 2 4 5 (rapi, berhenti)
Akhir: 1 2 4 5
```

### 3.2 Selection & Insertion Sort

Selection Sort menganut filosofi yang berbeda: alih-alih menukar berkali-kali seperti Bubble, ia memilih dengan tenang lalu menukar tepat satu kali per iterasi. Array dibagi menjadi zona kiri yang sudah urut dan zona kanan yang belum; setiap iterasi memindai seluruh zona kanan untuk menemukan nilai minimum, mencatat posisinya di `minIdx`, dan hanya di akhir melakukan satu `swap` ke ujung kiri zona kanan. Kelebihannya adalah jumlah pertukaran yang minimal (maksimal n−1 kali) sehingga cocok ketika operasi swap mahal — misalnya memindahkan record besar di memori. Namun pemindaian penuh di setiap iterasi membuatnya selalu O(n²) dalam semua kasus, dan lompatan swap jarak jauh dapat melompati elemen yang nilainya sama sehingga algoritma ini tidak stabil.

Insertion Sort justru meniru cara manusia mengurutkan kartu remi di tangan: ambil satu kartu baru, bandingkan dengan kartu-kartu yang sudah tersusun dari kanan ke kiri, geser yang lebih besar satu langkah ke kanan untuk memberi ruang, lalu selipkan kartu baru di posisi yang tepat. Kunci implementasinya adalah menyalin `arr[i]` ke variabel `key` terlebih dahulu, karena sel asalnya akan tertimpa selama proses penggeseran. Pointer `j` berjalan mundur selama `arr[j] > key`, dan syarat `j >= 0` wajib ditulis lebih dulu agar short-circuit mencegah akses ke `arr[-1]`. Ketika data sudah hampir urut, loop dalamnya nyaris tidak pernah berjalan sehingga Insertion Sort mencapai O(n) — alasan ia menjadi pilihan utama untuk data kecil, hampir urut, dan untuk studi kasus ranking IPK di bawah.

```cpp
#include <iostream>
using namespace std;

void selectionSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        int minIdx = i;
        for (int j = i+1; j < n; j++)
            if (arr[j] < arr[minIdx]) minIdx = j;
        cout << "iterasi " << i+1 << ": min=" << arr[minIdx]
             << ", tukar indeks " << i << " <-> " << minIdx << endl;
        swap(arr[i], arr[minIdx]);
    }
}

void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i], j = i - 1;
        while (j >= 0 && arr[j] > key) { arr[j+1] = arr[j]; j--; }
        arr[j+1] = key;
        cout << "sisipkan " << key << ": ";
        for (int k = 0; k < n; k++) cout << arr[k] << " ";
        cout << endl;
    }
}

int main() {
    int a[] = {5, 1, 4, 2}; int b[] = {5, 1, 4, 2};
    cout << "== Selection ==" << endl;
    selectionSort(a, 4);
    cout << "Hasil: ";
    for (int x : a) cout << x << " ";
    cout << "\n\n== Insertion ==" << endl;
    insertionSort(b, 4);
    cout << "Hasil: ";
    for (int x : b) cout << x << " ";
    cout << endl;
    return 0;
}
```

Perhatikan perbedaan jejak keduanya pada data `[5, 1, 4, 2]` yang sama. Selection Sort iterasi pertama menemukan minimum 1 di indeks 1 lalu menukarnya ke depan (`[1, 5, 4, 2]`), iterasi kedua menemukan minimum 2 lalu menukarnya (`[1, 2, 4, 5]`), dan selesai — hanya dua swap untuk mengurutkan empat elemen. Insertion Sort bergerak sebaliknya: ia mengambil 1 dan menyisipkannya di depan (`[1, 5, 4, 2]`), lalu mengambil 4 dan menyisipkannya di tengah (`[1, 4, 5, 2]`), akhirnya mengambil 2 dan menggeser 4 dan 5 (`[1, 2, 4, 5]`). Keduanya tiba di tujuan yang sama melalui jalan yang berlawanan: Selection mencari yang terkecil untuk ditaruh di depan, Insertion mengambil yang berikutnya untuk disisipkan pada tempatnya.

**Output program:**

```text
== Selection ==
iterasi 1: min=1, tukar indeks 0 <-> 1
iterasi 2: min=2, tukar indeks 1 <-> 3
iterasi 3: min=4, tukar indeks 2 <-> 2
Hasil: 1 2 4 5

== Insertion ==
sisipkan 1: 1 5 4 2
sisipkan 4: 1 4 5 2
sisipkan 2: 1 2 4 5
Hasil: 1 2 4 5
```

### 3.3 Quick Sort & Merge Sort (pengenalan)

Dua algoritma sebelumnya bekerja dengan cara yang sabar tetapi lambat, sedangkan Quick Sort dan Merge Sort bekerja dengan cara yang cerdas: *divide and conquer* — pecah masalah besar menjadi potongan-potongan kecil, selesaikan setiap potongan, lalu gabungkan kembali. Quick Sort memilih seorang *pivot* sebagai pembatas, mempartisi array sehingga yang lebih kecil dari pivot berkumpul di kiri dan yang lebih besar di kanan, kemudian secara rekursif mengurutkan kedua sisi. Karena pivot telah berada di posisi finalnya, masalah menyusut dengan cepat dan rata-rata kompleksitasnya O(n log n) dengan keunggulan praktis berupa pengurutan di tempat (in-place) yang ramah cache.

Jantung Quick Sort terletak pada fungsi `partition` skema Lomuto di bawah ini, di mana pivot diambil dari elemen terakhir demi kesederhanaan praktikum. Pointer `i` menandai batas zona "lebih kecil dari pivot" yang awalnya kosong (`low−1`), sedangkan pointer `j` memindai dari `low` hingga `high−1`: setiap kali ditemukan elemen lebih kecil dari pivot, zona diperluas (`++i`) lalu elemen itu ditarik masuk lewat swap. Elemen yang lebih besar atau sama dibiarkan lewat di zona kanan. Setelah pemindaian selesai, pivot ditukar ke posisi `i+1` — tepat di perbatasan — sehingga seluruh kiri lebih kecil dan seluruh kanan lebih besar darinya. Fungsi `quickSort` kemudian memanggil dirinya sendiri untuk sisi kiri (`low..pi−1`) dan kanan (`pi+1..high`), dengan basis `low < high` yang berarti masih ada minimal dua elemen untuk diurutkan. Kelemahannya perlu diwaspadai: jika pivot selalu jatuh di ujung (misalnya data sudah urut dan pivot selalu elemen terakhir), partisi menjadi sangat timpang dan kompleksitas merosot ke O(n²).

![Contoh divide and conquer Merge Sort](https://www.programiz.com/sites/tutorial2program/files/merge-sort-example_0.png)
*Gambar 3. Prinsip divide-and-conquer Merge Sort. Sumber: Programiz.*

```cpp
#include <iostream>
using namespace std;

int partition(int arr[], int low, int high) {
    int pivot = arr[high], i = low - 1;
    cout << "  partisi [" << low << ".." << high << "] pivot=" << pivot << ": ";
    for (int j = low; j < high; j++)
        if (arr[j] < pivot) swap(arr[++i], arr[j]);
    swap(arr[i+1], arr[high]);
    for (int k = low; k <= high; k++) cout << arr[k] << " ";
    cout << "-> pivot di indeks " << i+1 << endl;
    return i + 1;
}
void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi-1);
        quickSort(arr, pi+1, high);
    }
}

int main() {
    int arr[] = {3, 6, 1, 5, 2};
    cout << "Awal: 3 6 1 5 2" << endl;
    quickSort(arr, 0, 4);
    cout << "Akhir: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    return 0;
}
```

Telusuri partisi pertama pada `[3, 6, 1, 5, 2]` dengan pivot 2: pemindaian melewatkan 3 dan 6 (lebih besar), menarik 1 ke zona kecil, melewatkan 5, lalu menukar pivot ke perbatasan sehingga array menjadi `[1, 2, 3, 5, 6]` dengan pivot mendarat di indeks 1. Rekursi kiri (rentang kosong, langsung berhenti) dan rekursi kanan (`[3, 5, 6]`) melanjutkan pekerjaan hingga seluruh array urut. Sementara itu Merge Sort menempuh jalan yang berlawanan tetapi sama-sama divide-and-conquer: ia membelah array menjadi dua hingga berukuran satu (yang trivially sorted), lalu menggabungkan kembali dua bagian yang sudah urut dengan dua pointer berjalan — ambil yang lebih kecil, majukan. Merge Sort membutuhkan array bantu O(n) tetapi menjamin O(n log n) di semua kasus sekaligus stabil, sehingga ia menjadi pilihan ketika jaminan waktu terburuk lebih penting daripada hemat memori.

**Output program:**

```text
Awal: 3 6 1 5 2
  partisi [0..4] pivot=2: 1 2 3 5 6 -> pivot di indeks 1
  partisi [2..4] pivot=6: 3 5 6 -> pivot di indeks 4
  partisi [2..3] pivot=5: 3 5 -> pivot di indeks 3
Akhir: 1 2 3 5 6
```

> **Renungan filosofis sorting:** Bubble Sort mengajarkan *ketekunan* — perbaikan kecil yang dilakukan berulang-ulang pada akhirnya merapikan segalanya, seperti kebiasaan baik yang dibangun hari demi hari. Selection Sort mengajarkan *kebijaksanaan memilih* — jangan menukar sebelum yakin menemukan yang terbaik, tetapi ingat bahwa terlalu lama memilih juga memakan waktu kuadratik. Insertion Sort mengajarkan *menemukan tempat yang tepat* — setiap elemen punya posisi di mana ia seharusnya berada, dan tugas kita adalah menggeser yang lain dengan hormat untuk memberinya ruang. Sedangkan Quick dan Merge Sort mengajarkan *manajemen masalah besar* — jangan hadapi raksasa sekaligus, pecahlah menjadi bagian-bagian kecil yang bisa ditaklukkan satu per satu. Keteraturan, pada akhirnya, bukanlah bakat melainkan hasil dari strategi yang dijalankan dengan disiplin.

## 4. Studi Kasus: Data Mahasiswa (Array of Struct)

Kini seluruh teori diuji dalam satu skenario nyata yang terdiri dari dua fase. Fase pertama adalah menampilkan *ranking* mahasiswa berdasarkan IPK secara menurun dengan Insertion Sort — wajar dipilih karena data mahasiswa berjumlah kecil dan algoritmanya stabil. Fase kedua adalah menyiapkan data agar bisa dicari cepat dengan Binary Search berdasarkan NIM memakai Bubble Sort menaik — langkah ini hukumnya wajib karena Binary Search hanya sah pada kunci yang terurut, dan mengurutkan berdasarkan IPK tidak membantu pencarian berdasarkan NIM sama sekali. Poin terpenting yang harus dipahami: setiap operasi `swap` di sini memindahkan satu struct utuh (NIM, nama, dan IPK ikut berpindah bersama), sehingga identitas setiap mahasiswa tidak pernah tercerai-berai.

Fungsi `sortByIPK` adalah Insertion Sort biasa yang dibalik pembandingnya menjadi `a[j].ipk < key.ipk`, sehingga elemen yang lebih kecil digeser ke kanan dan `key` yang besar terselip di depan — hasilnya urutan menurun dari Citra 3.9 hingga Eka 3.1. Fungsi `sortByNIM` adalah Bubble Sort yang membandingkan string secara leksikografis; untuk NIM berformat sama panjang seperti "230101" versus "230105", urutan kamus ini ekuivalen dengan urutan numerik. Fungsi `binarySearchNIM` identik dengan binary search integer, hanya pembandingnya memakai operator string (`==`, `<`) yang bekerja karakter per karakter. Di dalam `main`, pola dua fase terlihat jelas: cetak ranking dulu, lalu urutkan ulang berdasarkan NIM dan cari "230103" yang ternyata berada di indeks 2. Konsekuensi yang harus disadari adalah urutan ranking hilang setelah fase kedua — jika kedua urutan dibutuhkan bersamaan, salinlah array terlebih dahulu atau gunakan array indeks terpisah.

```cpp
#include <iostream>
#include <string>
using namespace std;

struct Mahasiswa { string nim, nama; float ipk; };

void sortByIPK(Mahasiswa a[], int n) {
    for (int i = 1; i < n; i++) {
        Mahasiswa key = a[i]; int j = i - 1;
        while (j >= 0 && a[j].ipk < key.ipk) { a[j+1] = a[j]; j--; }
        a[j+1] = key;
    }
}

void sortByNIM(Mahasiswa a[], int n) {
    for (int i = 0; i < n-1; i++)
        for (int j = 0; j < n-i-1; j++)
            if (a[j].nim > a[j+1].nim) swap(a[j], a[j+1]);
}

int binarySearchNIM(Mahasiswa a[], int n, string x) {
    int l = 0, r = n - 1;
    while (l <= r) {
        int m = (l + r) / 2;
        if (a[m].nim == x) return m;
        if (a[m].nim < x) l = m + 1; else r = m - 1;
    }
    return -1;
}

int main() {
    Mahasiswa mhs[5] = {{"230105","Eka",3.1},{"230101","Ahmad",3.75},
                        {"230103","Citra",3.9},{"230102","Budi",3.2},
                        {"230104","Dewi",3.6}};
    sortByIPK(mhs, 5);
    cout << "== Ranking IPK (desc) ==" << endl;
    for (int i = 0; i < 5; i++)
        cout << i+1 << ". " << mhs[i].nama << " (" << mhs[i].nim
             << ") - " << mhs[i].ipk << endl;

    sortByNIM(mhs, 5);
    cout << "\n== Setelah sort NIM (asc) ==" << endl;
    for (int i = 0; i < 5; i++) cout << mhs[i].nim << " ";
    cout << endl;
    int pos = binarySearchNIM(mhs, 5, "230103");
    cout << "Cari NIM 230103 => indeks " << pos
         << " (" << mhs[pos].nama << ")" << endl;
    return 0;
}
```

**Output program:**

```text
== Ranking IPK (desc) ==
1. Citra (230103) - 3.9
2. Ahmad (230101) - 3.75
3. Dewi (230104) - 3.6
4. Budi (230102) - 3.2
5. Eka (230105) - 3.1

== Setelah sort NIM (asc) ==
230101 230102 230103 230104 230105
Cari NIM 230103 => indeks 2 (Citra)
```

## 5. Tugas Praktikum 🧩

> Kerjakan sesuai level. Setiap tugas wajib dikumpulkan sebagai **satu file `.cpp` + screenshot output + analisis singkat di laporan**. Kode yang tidak bisa dicompile otomatis bernilai nol — pastikan `g++ -std=c++17` lolos tanpa error.

### 🟢 Level Beginner — *Memahami Gerakan Dasar*

**Tugas B1: Jejak Linear Search (wajib semua mahasiswa).**
1. Salin fungsi `linearSearch` versi modul (yang mencetak setiap cek).
2. Di `main`, buat array `{10, 20, 30, 40, 50}` dan cari `x = 40`. Catat berapa perbandingan yang terjadi.
3. Ulangi untuk `x = 60` (tidak ada). Catat outputnya.
4. Di laporan, jawab: (a) berapa perbandingan tiap kasus? (b) mengapa kasus (2) selalu butuh n perbandingan? (c) kapan Linear Search lebih masuk akal dibanding mengurutkan dulu?

*Kriteria nilai:* program jalan (40%), jejak cetakan benar (30%), jawaban analisis tepat (30%).

**Tugas B2: Bubble Sort Satu Pass.**
1. Buat array `{4, 3, 2, 1}` dan jalankan `bubbleSort` versi modul.
2. Salin seluruh output pass ke laporan, lalu lingkari elemen yang "sudah final" di tiap pass.
3. Jawab: mengapa pass ke-3 berhenti dini? Apa peran flag `swapped`?

*Kriteria nilai:* output benar (50%), penandaan final tepat (25%), penjelasan `swapped` benar (25%).

### 🟡 Level Medium — *Memodifikasi & Membandingkan*

**Tugas M1: Binary Search Rekursif + Bukti Syarat Terurut.**
1. Tulis ulang `binarySearch` secara **rekursif** (basis: `l > r` → −1).
2. Uji pada array terurut `{2, 5, 8, 12, 16, 23, 38}` untuk `x = 23` dan `x = 15`. Tampilkan jejak `l, mid, r` tiap pemanggilan.
3. Uji fungsi yang sama pada array **belum terurut** `{23, 2, 38, 5, 16}` untuk `x = 5`. Tunjukkan bahwa hasilnya salah/tidak ditemukan, lalu jelaskan di laporan mengapa keterurutan adalah syarat matematis (bukan sekadar anjuran).

*Kriteria nilai:* rekursi benar (35%), jejak tampil (25%), bukti kegagalan + penjelasan (40%).

**Tugas M2: Duel Bubble vs Selection (struct Barang).**
1. Definisikan `struct Barang { string kode, nama; int harga; }` dengan 6 data bebas.
2. Urutkan berdasarkan `harga` menaik sekali dengan Bubble Sort dan sekali dengan Selection Sort. Hitung dan cetak **jumlah perbandingan dan jumlah swap** masing-masing (tambahkan counter).
3. Sajikan dalam tabel + jawab: algoritma mana yang swap-nya lebih sedikit? Mengapa? Mana yang stabil — buktikan dengan dua barang berharga sama!

*Kriteria nilai:* struct + dua sort jalan (40%), counter akurat (30%), analisis stabilitas + tabel (30%).

### 🔴 Level Expert — *Menganalisis & Merancang*

**Tugas E1: Benchmark Empiris (tabel waktu eksekusi).**
1. Bangkitkan array acak berukuran n = 1.000, 10.000, dan 50.000 (`rand()` dengan seed tetap agar reproduksibel).
2. Ukur waktu Bubble Sort vs Quick Sort untuk tiap n memakai `<chrono>` (`high_resolution_clock`), masing-masing 3 kali ulangan lalu ambil rata-ratanya.
3. Sajikan tabel n × waktu (ms), plot grafiknya (boleh Excel/manual), dan jawab: (a) apakah rasio waktu Bubble mendekati kuadratik? (b) apakah Quick Sort mendekati n log n? (c) pada n berapa Bubble menjadi tidak praktis dan mengapa?

*Kriteria nilai:* metodologi benar (seed, ulangan, chrono) (40%), tabel + grafik (30%), analisis kuantitatif (30%). Nilai plus jika menyertakan Insertion Sort sebagai pembanding ketiga.

**Tugas E2: Hibrida Pencarian + Pengurutan (mini project).**
1. Bangun program data nilai 20 mahasiswa (NIM, nama, IPK) yang dimasukkan pengguna atau dibangkitkan acak.
2. Program harus menyediakan menu: (1) tampil ranking IPK (Insertion Sort desc), (2) cari NIM (otomatis sort by NIM + Binary Search — ukur dan tampilkan total langkahnya), (3) cari nama (Linear Search karena tidak terurut — jelaskan pilihan ini di laporan!).
3. Tulis analisis 1 halaman: mengapa operasi (2) memakai Binary dan (3) memakai Linear? Kapan strategi (2) menjadi merugikan (misal data sering berubah)? Ajukan perbaikan (misal jaga data selalu terurut / gunakan indeks).

*Kriteria nilai:* fitur lengkap + langkah terukur (40%), justifikasi pemilihan algoritma (35%), analisis trade-off + usulan perbaikan (25%).

## 6. Video Pembelajaran 🎬

1. **freeCodeCamp – Understanding Sorting Algorithms (1 jam 11 mnt).**
   https://www.youtube.com/watch?v=l7-f9gS8VOs
2. **GeeksforGeeks – Searching & Sorting in Array using STL.**
   https://www.youtube.com/watch?v=QTjc0HYfjYg
3. **freeCodeCamp – Algorithms and Data Structures (Big-O, Linear/Binary Search).**
   https://www.youtube.com/watch?v=8hly31xKli0

## 7. Referensi Website 🌐

1. Programiz – *Binary Search* – https://www.programiz.com/dsa/binary-search
2. GeeksforGeeks – *Binary Search* – https://www.geeksforgeeks.org/dsa/binary-search/
3. Programiz – *Bubble Sort* – https://www.programiz.com/dsa/bubble-sort
4. Programiz – *Merge Sort* – https://www.programiz.com/dsa/merge-sort
5. Programiz – *Quick Sort* – https://www.programiz.com/dsa/quick-sort
