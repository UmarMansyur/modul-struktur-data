# Modul 7 (Pengayaan): Hash Table

> **Mata Kuliah:** Struktur Data | **Durasi:** 1 × 100 menit (opsional) | **Prasyarat:** Modul 4 (Linked List)

## 1. Capaian Pembelajaran

1. Menjelaskan Hash Function, key → index, dan load factor.
2. Menangani collision dengan Chaining & Open Addressing.
3. Menyelesaikan studi kasus kamus kata / pemetaan ID pengguna.
4. Menjelaskan sejarah Hash Table dan merefleksikan nilai filosofisnya (sidik jari & tabrakan yang tak terhindarkan).

## 2. Sejarah & Nilai Filosofis

**Sejarah singkat.** Gagasan memetakan data besar ke indeks kecil lahir di IBM 1950-an: **Hans Peter Luhn (1953)** memakai hashing untuk pencarian, disusul **Peterson (1957)** yang menganalisis open addressing. Istilah *hash* sendiri dipopulerkan dari kata "chop and mix" (mencacah-aduk, seperti *hash brown* — kentang yang dicacah!). Varian chaining (bucket = list, Modul 4 kembali beraksi!) vs open addressing (semua di array, warisan Knuth) menjadi dua mazhab abadi. Dari sini lahir `unordered_map` C++, `HashMap` Java, `dict` Python, hingga fungsi kriptografis (MD5, SHA) dan blockchain — semuanya "sidik jari digital": data raksasa diringkas menjadi kode pendek yang (hampir) unik.

**Mengapa collision tak terhindarkan?** Prinsip *pigeonhole*: jika 11 merpati masuk 10 lubang, minimal satu lubang berisi 2 merpati. Ruang key (semua NIM, semua string) jauh lebih besar dari tabel (m bucket) — tabrakan pasti ada. Maka strategi hash table bukan *mencegah* (mustahil), melainkan *menangani dengan anggun*: chaining menampung, probing mencari tetangga kosong, rehashing memperbesar rumah saat sesak (α > 0.75).

**Nilai filosofis — sidik jari, kerendahan hati, dan kompromi.**
- *Setiap hal punya sidik jari.* Fungsi hash yang baik memetakan "apel" dan "apel!" ke tempat jauh berbeda (avalanche) — seperti manusia: perbedaan kecil mencerminkan identitas berbeda. Ketidakpekaan hash naif (jumlah ASCII: "ab" = "ba") adalah prasangka: menilai dari jumlah, bukan susunan.
- *Tabrakan = takdir yang dikelola.* Hidup pun pigeonhole: sumber daya terbatas, keinginan tak terbatas — benturan pasti. Yang dinilai bukan apakah Anda bertabrakan, melainkan bagaimana menanganinya: menampung (chaining/lapang dada) atau mencari jalan lain (probing/ikhtiar) atau memperbesar kapasitas diri (rehashing/belajar).
- *Load factor = jangan tunggu penuh.* Rehashing saat α ≈ 0.75 mengajarkan antisipasi: perbesar wadah *sebelum* sesak, bukan sesudah macet. Organisasi dan diri pun butuh "rehash" berkala.
- *Cepat tapi tak terurut.* Hash memberi O(1) dengan harga kehilangan urutan (vs BST O(log n) yang terurut). Pelajaran memilih: butuh kecepatan cari (kamus, login) → hash; butuh urutan (ranking, rentang) → tree. Tidak ada struktur sempurna — hanya kompromi yang tepat.

> Renungan untuk laporan: jika nama Anda di-hash (jumlah ASCII % 10), bucket berapa Anda? Cari 1 teman yang se-bucket (collision!) dengan Anda — lalu diskusikan: apakah chaining (berbagi bucket dengan rukun) atau probing (salah satu pindah) yang lebih adil untuk kasus itu?

## 3. Konsep (diperdalam)

Hash Table = array + **fungsi hash** `h(k)` yang memetakan key (string/NIM) ke indeks. Jika fungsi bagus + tabel cukup longgar, insert/search/delete rata-rata **O(1)** — lebih cepat dari BST O(log n) dan array O(n). Worst case (semua key menumpuk di 1 bucket) merosot ke O(n), sehingga penanganan collision menentukan kualitas.

![Konsep key-value](https://cdn.programiz.com/sites/tutorial2program/files/Hash-0.png)
*Gambar 1. Pemetaan key → value. Sumber: Programiz.*

![Hash function ke index](https://cdn.programiz.com/sites/tutorial2program/files/Hash-2_0.png)
*Gambar 2. `h(k)` menghasilkan indeks tabel. Sumber: Programiz.*

![Chaining](https://cdn.programiz.com/sites/tutorial2program/files/Hash-3_1.png)
*Gambar 3. Collision ditangani dengan chaining (linked list). Sumber: Programiz.*

- **Collision (tabrakan):** dua key berbeda → indeks sama. Tak terhindarkan jika ruang key > ukuran tabel (prinsip pigeonhole) — jadi strateginya **menangani**, bukan mencegah total.
- **Load factor** `α = n / m` (n = elemen, m = bucket). Praktik: jika α > 0.7–0.75, **rehashing** (buat tabel ~2× + pindahkan semua) agar chain tetap pendek.
- **Chaining:** tiap bucket = linked list penampung. **Open Addressing:** semua di array; yang tabrakan mencari slot kosong lain (linear probing `h+i`, quadratic `h+i²`, double hashing).

> Visualisasi interaktif: **VisuAlgo Hash Table** – https://visualgo.net/en/hashtable (coba insert key yang sengaja collision dan bandingkan chaining vs probing)

### Anatomi fungsi hash yang baik (pendalaman)

Fungsi hash ideal memenuhi 4 sifat: (1) **deterministik** (key sama → indeks sama, selalu), (2) **cepat** O(panjang key), (3) **seragam** (menyebar ke semua bucket, tidak menumpuk), (4) **avalanche** (perubahan 1 karakter mengubah banyak bit hash). Bandingkan:
- **Naif (jumlah ASCII):** `h = Σc % m`. Cepat tapi buta urutan ("ab"="ba"="12"), mudah menumpuk (anagram collision).
- **Polynomial rolling (kode 3.1):** `h = (h×31 + c) % m`. Sensitif urutan (×31 menggeser digit), prima 31 = `(h<<5)−h` (cepat di CPU). Inilah yang dipakai `String.hashCode()` Java!
- **Aturan praktis:** pilih `m` prima (mengurangi pola periodik), jaga α < 0.75, dan uji empiris (studi kasus!) — teori tanpa ukur = spekulasi.

### Load factor & rehashing: kapan memperbesar rumah?

`α = n/m`. Chain rata-rata ≈ α (chaining) — α=2 berarti tiap search memindai ~2 node: masih O(1) dengan konstanta 2. Tetapi α=10 = daftar tersamar (O(n) praktis!). Praktik industri: saat α > 0.7–0.75, buat tabel ~2× (prima berikutnya) dan **hash ulang semua key** (wajib — karena `h` tergantung `m`!). Biaya rehash O(n) sesekali, tetapi menjaga operasi berikut tetap O(1) amortized — seperti pindah rumah: mahal sekali, nyaman seterusnya.

### Chaining vs Open Addressing (pilih dengan sadar)

| Aspek | Chaining | Open Addressing (probing) |
|---|---|---|
| Memori | Bucket + node + pointer | Hanya array (rapat, cache-friendly) |
| Tahan α tinggi | Ya (α>1 masih jalan) | Tidak (α>0.7 merosot, clustering) |
| Delete | Mudah (hapus node list) | Sulit (butuh `DELETED`) |
| Dipakai | Java HashMap, contoh 3.1 | Python dict (dulu), `flat_hash_map` |
| Cocok | Key banyak/tak terduga | Tabel longgar + butuh kecepatan cache |

### Kesalahan umum pemula

1. **Hash tidak modulo tiap langkah** → overflow int untuk string panjang.
2. **`m` tidak prima / terlalu kecil** → pola tabrakan periodik (semua key genap ke bucket genap!).
3. **Insert duplikat tanpa cek** → key sama menumpuk; search mengembalikan yang basi.
4. **Dereference hasil search tanpa cek null** (`*search("x")` saat x absen = crash).
5. **Delete probing dikosongkan fisik** (bukan `DELETED`) → pencarian seberang slot terputus prematur.
6. **Memakai hash untuk prefix/autocomplete** → hash dirancang acak; pencarian awalan butuh Trie (Tugas M2!).

### Hash di dunia nyata

- **Login & kamus:** `unordered_map<string,...>` untuk sesi, cache, frekuensi kata.
- **Database & compiler:** symbol table, indeks.
- **Kriptografi & integritas:** checksum file, password (dengan garam!), Git commit hash, blockchain.
- **Bukan untuk:** data terurut (pakai `map`/BST), prefix search (pakai Trie), kriptografi aman (butuh SHA, bukan hash edukasi ×31!).

## 4. Implementasi

### 4.1 Chaining (STL `list`)

**Tujuan kode:** hash table string→string lengkap (insert/update/search/delete) memakai `vector<list<...>>` — tiap bucket adalah linked list pasangan key-value. Pola ini = `unordered_map` yang disederhanakan.

```cpp
#include <iostream>
#include <list>
#include <vector>
using namespace std;

class HashTable {
    int SIZE; vector<list<pair<string,string>>> table;
    int hashFunc(string key) {
        int h = 0;
        for (char c : key) h = (h * 31 + c) % SIZE;
        return h;
    }
public:
    HashTable(int m): SIZE(m), table(m) {}
    void insert(string key, string val) {
        int i = hashFunc(key);
        for (auto &p : table[i])
            if (p.first == key) { p.second = val; return; } // update
        table[i].push_back({key, val});
    }
    string* search(string key) {
        int i = hashFunc(key);
        for (auto &p : table[i])
            if (p.first == key) return &p.second;
        return nullptr;
    }
    void remove(string key) {
        int i = hashFunc(key);
        table[i].remove_if([&](auto &p){ return p.first == key; });
    }
};

int main() {
    HashTable kamus(10);
    kamus.insert("apel", "buah merah");
    kamus.insert("kucing", "hewan peliharaan");
    cout << *kamus.search("apel") << endl;
    return 0;
}
```

**Penjelasan per fungsi:**

- **`hashFunc` (polynomial rolling):** `h = (h×31 + c) % SIZE` per karakter. Mengapa ×31? (a) menggeser kontribusi karakter lama ke digit tinggi sehingga **urutan berpengaruh** ("ab" ≠ "ba" — tidak seperti jumlah ASCII polos), (b) 31 prima kecil yang dikompilasi jadi `(h<<5)−h` (cepat). Modulo tiap langkah menjaga `h` tetap dalam int (tanpa ini, string panjang overflow). Hasil 0..SIZE−1 = indeks bucket. Kualitas fungsi ini vs jumlah-ASCII adalah inti eksperimen studi kasus.
- **Konstruktor `table(m)`:** membuat `m` list kosong. `SIZE` disimpan karena dipakai `hashFunc` — konsekuensinya fungsi hash **terikat ukuran tabel**; saat rehash (ukuran berubah), semua key harus di-hash ulang (tidak bisa sekadar salin).
- **`insert`:** hash → dapat bucket `i` → pindai list: jika key sudah ada, **update value + return** (semantik map: key unik; tanpa cabang ini, duplikat menumpuk dan search mengembalikan yang pertama basi). Jika tidak ada → `push_back` pasangan baru. Rata-rata O(1 + α): hash O(panjang key) + pindai chain pendek.
- **`search`:** hash ke bucket yang sama (deterministik — key sama selalu bucket sama), pindai, kembalikan **pointer ke value** (`&p.second`) agar pemanggil bisa baca (`*hasil`) bahkan ubah langsung. `nullptr` = tidak ada (pemanggil **wajib cek** sebelum dereference — `*kamus.search("x")` tanpa cek = crash jika x absen, jebakan di `main` contoh yang disederhanakan).
- **`remove`:** `remove_if` + lambda menghapus semua node ber-key cocok dari list bucket. O(1 + α). Tidak perlu re-hash sisanya (kelebihan chaining atas probing — lihat 3.2).
- **`main`:** tabel 10 bucket, 2 insert (kemungkinan beda bucket), search "apel" → hash → ketemu → cetak "buah merah". Load factor 0.2 — chain pasti panjang 1.

### 4.2 Open Addressing – Linear Probing

**Ide:** tanpa list — semua pasangan tinggal di array. Jika slot `h` terisi key lain, coba `h+1, h+2, ...` (modulo) sampai kosong/ketemu. Hemat pointer, cache-friendly, tapi rapuh saat penghapusan.

```cpp
// int h = hash(k) % m;
// int i = h;
// while (table[i] terisi && table[i].key != k) i = (i+1) % m;
// Kelemahan: primary clustering. Perbaikan: quadratic / double hashing.
```

**Penjelasan baris per baris (pola untuk Tugas 1):**

- `h = hash(k) % m` — posisi awal ideal. `i = h` — probe mulai dari sana.
- `while (table[i] terisi && table[i].key != k)` — berhenti pada 2 kondisi benar: slot kosong (key pasti tidak ada — karena insert pun akan berhenti di sini) atau key cocok (ketemu). Selama keduanya salah → geser `i = (i+1) % m` (bungkus ke 0).
- **Delete butuh penanda `DELETED` (bukan dikosongkan!):** jika slot di-nol-kan fisik, pencarian key yang probe-nya melewati slot itu akan berhenti prematur (dianggap "tidak ada") padahal key-nya ada di seberang. Solusi: tandai `DELETED` — search melompati, insert boleh menempati. Inilah detail yang paling sering menggagalkan Tugas 1.
- **Primary clustering:** kelompok slot terisi beruntun saling memanjangkan (probe baru makin sering menabrak kelompok) → performa merosot saat α > 0.5. Perbaikan: quadratic probing (`h+i²` — melompat makin jauh) atau double hashing (`h + i×h2(k)` — langkah tergantung key).
- **Kapan pilih apa:** chaining = sederhana + tahan load tinggi (dipakai Java HashMap, contoh 3.1); probing = hemat memori + cepat saat longgar (dipakai Python dict versi lama, C++ `flat_hash_map`).

## 5. Studi Kasus: Pemetaan ID Pengguna

**Soal:** 1000 mahasiswa, NIM sebagai key. Bandingkan 3 pendekatan dan ukur kualitas fungsi hash secara empiris.

```cpp
// Eksperimen: insert 100 NIM acak ke tabel m=50, hitung:
// - collision = insert yang bucket-nya sudah terisi
// - panjang chain maksimum
// Simpulkan di laporan: pengaruh m dan fungsi hash.
```

**Penjelasan rancangan eksperimen (untuk diimplementasikan):**

1. **Pendekatan 1 — array langsung** (indeks = NIM numerik): akses O(1) sejati, tapi jika NIM 8 digit (230101xx), array butuh ratusan juta sel — mayoritas kosong. Boros dan mustahil. Hash table lahir untuk masalah ini: petakan ruang besar → tabel kecil.
2. **Pendekatan 2 — chaining (kode 3.1):** hemat (hanya 50 bucket + node terisi), rata-rata O(1) selama α wajar (100/50 = 2.0 → chain rata-rata 2 — masih bagus, tapi waktunya rehash ke ~200).
3. **Pengukuran:** modifikasi `insert` agar mengembalikan/mencatat apakah bucket `i` sudah tak-kosong sebelum insert (collision++), dan lacak `max(table[i].size())`. Jalankan dua kali: (a) hash naif `sum ASCII % m`, (b) polynomial `×31 % m` dari kode 3.1.
4. **Hipotesis yang harus dibuktikan:** (b) menyebar lebih merata (collision lebih sedikit, max chain lebih pendek) karena sensitif urutan; memperbesar `m` menurunkan keduanya (α kecil). Sajikan tabel perbandingan + histogram panjang chain di laporan — inilah "analisis" yang dinilai, bukan sekadar kode jalan.

## 6. Tugas Praktikum 🧩

> Kumpulkan tiap tugas sebagai **file `.cpp` + screenshot output + analisis di laporan**. Pastikan `g++ -std=c++17` tanpa error.

### 🟢 Level Beginner — *Hash Pertama*

**Tugas B1: Hitung Hash Tangan + Chaining Mini (wajib).**
1. Tanpa program dulu: hitung manual `hashFunc` polynomial (×31) untuk key `"ab"`, `"ba"`, `"apel"` dengan SIZE=10 (tunjukkan langkah `h` tiap karakter!). Buktikan `"ab" ≠ "ba"` — lalu hitung versi naif jumlah-ASCII dan tunjukkan ia gagal membedakan.
2. Salin class `HashTable` chaining modul ke `hash_b1.cpp`. Insert 5 kata (`apel, kucing, buku, meja, apel=update`) lalu search semuanya + 1 key absen (cek `nullptr` dengan benar, jangan dereference buta!).
3. Cetak distribusi bucket (panjang tiap list) + jawab: bucket mana collision? Berapa α? Apa yang terjadi jika `SIZE` diganti 3?
*Kriteria nilai:* hitung manual benar (30%), program + cek-null benar (40%), distribusi + α (30%).

**Tugas B2: Load Factor & Kapan Rehash.**
1. Insert 20 NIM (`230101`–`230120`) ke tabel m=7 (sengaja kecil!). Catat collision + max chain (modifikasi insert untuk menghitung).
2. Ulangi dengan m=29 (prima). Sajikan tabel: m | α | collision | max chain. Buktikan m besar + prima menyebar lebih baik.
3. Jawab: pada α berapa Anda memutuskan rehash? Mengapa menunggu sampai penuh itu terlambat? (hubungkan ke filosofi antisipasi).
*Kriteria nilai:* dua eksperimen + tabel (50%), analisis prima vs kecil (25%), jawaban rehash (25%).

### 🟡 Level Medium — *Collision & Struktur Pembanding*

**Tugas M1: Linear Probing Lengkap dengan `DELETED`.**
1. Implementasikan tabel probing (`struct Slot{string key,val; bool terisi, dihapus;}`): `insert` (probe `h+i`), `search` (lompat `DELETED`, berhenti di kosong-murni), `remove` (tandai `DELETED`, bukan kosongkan!).
2. Uji jebakan klasik: insert A,B (collision) → hapus A → search B (harus tetap ketemu!). Tunjukkan bahwa versi "dikosongkan fisik" gagal pada uji ini (buktikan dengan flag eksperimen).
3. Ukur clustering: insert 15 key ke m=17, catat panjang probe rata-rata. Jelaskan mengapa α > 0.5 mulai melambat.
*Kriteria nilai:* insert/search/delete benar (50%), bukti jebakan DELETED (25%), ukur probe + analisis (25%).

**Tugas M2: Kamus 20 Entri + Autocomplete (dan Batas Hash).**
1. Bangun kamus 20 kata + arti memakai chaining. Tambahkan `autocomplete(prefix)`: sayangnya hash tak bisa prefix → implementasikan dengan **scan semua bucket** O(n) + jelaskan mengapa ini mahal.
2. Bandingkan: untuk tugas prefix, struktur apa yang tepat (Trie / BST terurut)? Tulis 1 paragraf + usulkan desain Trie 3 kalimat (tanpa harus implementasi penuh — cukup rancangan).
3. Uji: 3 prefix (mis. `"me"`, `"bu"`, `"z"`) + catat waktu/kompleksitas vs search eksak O(1).
*Kriteria nilai:* kamus + scan-prefix jalan (40%), uji 3 prefix (25%), analisis hash-vs-Trie (35%).

### 🔴 Level Expert — *Benchmark & Desain Fungsi*

**Tugas E1: `unordered_map` vs `map` — Benchmark 100rb Data.**
1. Benchmark: insert 100.000 NIM acak + 10.000 search ke `unordered_map<string,int>` vs `map<string,int>`; catat waktu (chrono) + uji iterasi terurut (map terurut, unordered acak!).
2. Sajikan tabel + grafik sederhana + simpulkan: kapan memakai hash (butuh O(1), tak peduli urutan: login, cache, frekuensi) vs tree (butuh rentang/terurut: ranking, prefix range, laporan).
3. Uji worst-case: masukkan key yang sengaja collision (atau hash buruk) → tunjukkan degradasi + jelaskan mitigasi (hash baik, reserve, max_load_factor).
*Kriteria nilai:* benchmark valid + tabel (50%), simpulan kapan-memakai (25%), uji degradasi + mitigasi (25%).

**Tugas E2: Desain Fungsi Hash Sendiri + Uji Avalanche.**
1. Rancang varian hash (mis. ×33 / FNV-1a mini / djb2) + uji avalanche: ubah 1 karakter (`"apel"`→`"apel!"`) dan ukur perubahan bucket (m=101). Bandingkan 3 fungsi (naif, ×31, rancanganmu) atas 50 kata: collision + max chain + stddev panjang chain.
2. Implementasikan **rehashing otomatis**: saat α > 0.75, alokasikan 2× prima + hash ulang semua. Buktikan dengan insert bertahap hingga rehash terpicu (cetak "REHASH m→m'" + distribusi sebelum/sesudah).
3. Refleksi filosofis 1 paragraf: hubungkan "sidik jari yang adil" (seragam + avalanche) dengan keadilan penilaian — mengapa penilai yang baik sensitif pada susunan (proses), bukan sekadar jumlah (hasil)?
*Kriteria nilai:* 3 fungsi + metrik (40%), rehash otomatis terbukti (30%), refleksi (30%).

## 7. Video Pembelajaran 🎬

1. **CodeBasics – Collision Handling in Hash Table.**
   https://www.youtube.com/watch?v=54iv1si4YCM
2. **CS50 – Hash Tables (linear probing vs chaining).**
   https://www.youtube.com/watch?v=h2d9b_nEzoA
3. **WilliamFiset – Hash table open addressing.**
   https://www.youtube.com/watch?v=xIejolxzZS8

## 8. Referensi Website 🌐

1. Programiz – *Hash Table* – https://www.programiz.com/dsa/hash-table
2. GeeksforGeeks – *Hash Table Data Structure* – https://www.geeksforgeeks.org/dsa/hash-table-data-structure/
3. GeeksforGeeks – *Collision Resolution* – https://www.geeksforgeeks.org/dsa/collision-resolution-techniques/
4. VisuAlgo – *Hash Table* – https://visualgo.net/en/hashtable
