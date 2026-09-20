# Praktikum Struktur Data (C++)

Selamat datang di modul praktikum **Struktur Data** — Teknik Informatika UNIRA.
Setiap modul berisi: tujuan, teori + diagram, kode C++ runnable, **studi kasus**, tugas, video YouTube, dan referensi website yang sudah diferifikasi.

## Daftar Modul

| Modul | Topik | Studi Kasus |
|---|---|---|
| [Modul 0](./modul-00-pendahuluan-cpp.md) | Pendahuluan & Review C++ (pointer, array, struct, complexity) | Data nilai mahasiswa + pointer |
| [Modul 1](./modul-01-searching-sorting.md) | Searching (Linear/Binary) & Sorting (Bubble–Merge) | Ranking & pencarian mahasiswa |
| [Modul 2](./modul-02-stack.md) | Stack LIFO (array vs linked list) | Infix→Postfix, Undo/Redo |
| [Modul 3](./modul-03-queue.md) | Queue FIFO (linear/circular/priority) | Antrean bank & printer spooler |
| [Modul 4](./modul-04-linked-list.md) | Linked List (single/double/circular) | Antrean pelanggan |
| [Modul 5](./modul-05-tree-bst.md) | Tree & BST + 4 traversal | File directory / organisasi |
| [Modul 6](./modul-06-graph.md) | Graph, Adjacency, BFS & DFS | Rute terpendek / jejaring sosial |
| [Modul 7](./modul-07-hash-table.md) | Hash Table (chaining vs open addressing) | Kamus kata / ID pengguna |

## Cara Menjalankan Kode

```bash
# compile salah satu contoh (disimpan dari blok kode modul)
g++ -std=c++17 -o program program.cpp
./program        # Windows: program.exe
```

Disarankan compiler: **g++ 11+** atau **MinGW-w64** di Windows, atau jalankan online di https://www.programiz.com/cpp-programming/online-compiler/

## Sumber Gambar & Video

- **Gambar/diagram:** di-hotlink dari Programiz, GeeksforGeeks, dan Wikimedia Commons — URL dicantumkan di bawah setiap gambar sehingga atribusi jelas.
- **Video YouTube:** tautan lengkap ada di tiap modul (Kelas Terbuka, Jenny's Lectures, freeCodeCamp, Abdul Bari, CS50, dll).
- **Website:** Programiz, GeeksforGeeks, cppreference, VisuAlgo — URL lengkap di bagian Referensi tiap modul.

## Menjalankan Situs Dokumentasi

```bash
npm install
npm run docs:dev
```
