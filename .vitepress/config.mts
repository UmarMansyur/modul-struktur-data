import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Praktikum Struktur Data",
  description: "Modul Praktikum Struktur Data C++ - UNIRA",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Modul 0', link: '/modul-00-pendahuluan-cpp' }
    ],

    sidebar: [
      {
        text: 'Modul Praktikum',
        items: [
          { text: 'Modul 0: Review C++', link: '/modul-00-pendahuluan-cpp' },
          { text: 'Modul 1: Searching & Sorting', link: '/modul-01-searching-sorting' },
          { text: 'Modul 2: Stack', link: '/modul-02-stack' },
          { text: 'Modul 3: Queue', link: '/modul-03-queue' },
          { text: 'Modul 4: Linked List', link: '/modul-04-linked-list' },
          { text: 'Modul 5: Tree & BST', link: '/modul-05-tree-bst' },
          { text: 'Modul 6: Graph', link: '/modul-06-graph' },
          { text: 'Modul 7: Hash Table', link: '/modul-07-hash-table' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
