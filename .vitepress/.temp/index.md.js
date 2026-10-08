import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
//#region index.md
var __pageData = JSON.parse("{\"title\":\"Praktikum Struktur Data (C++)\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"index.md\",\"filePath\":\"index.md\"}");
var _sfc_main = { name: "index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="praktikum-struktur-data-c" tabindex="-1">Praktikum Struktur Data (C++) <a class="header-anchor" href="#praktikum-struktur-data-c" aria-label="Permalink to “Praktikum Struktur Data (C++)”">​</a></h1><p>Selamat datang di modul praktikum <strong>Struktur Data</strong> — Teknik Informatika UNIRA. Setiap modul berisi: tujuan, teori + diagram, kode C++ runnable, <strong>studi kasus</strong>, tugas, video YouTube, dan referensi website yang sudah diferifikasi.</p><h2 id="daftar-modul" tabindex="-1">Daftar Modul <a class="header-anchor" href="#daftar-modul" aria-label="Permalink to “Daftar Modul”">​</a></h2><table tabindex="0"><thead><tr><th>Modul</th><th>Topik</th><th>Studi Kasus</th></tr></thead><tbody><tr><td><a href="./modul-00-pendahuluan-cpp.html">Modul 0</a></td><td>Pendahuluan &amp; Review C++ (pointer, array, struct, complexity)</td><td>Data nilai mahasiswa + pointer</td></tr><tr><td><a href="./modul-01-searching-sorting.html">Modul 1</a></td><td>Searching (Linear/Binary) &amp; Sorting (Bubble–Merge)</td><td>Ranking &amp; pencarian mahasiswa</td></tr><tr><td><a href="./modul-02-stack.html">Modul 2</a></td><td>Stack LIFO (array vs linked list)</td><td>Infix→Postfix, Undo/Redo</td></tr><tr><td><a href="./modul-03-queue.html">Modul 3</a></td><td>Queue FIFO (linear/circular/priority)</td><td>Antrean bank &amp; printer spooler</td></tr><tr><td><a href="./modul-04-linked-list.html">Modul 4</a></td><td>Linked List (single/double/circular)</td><td>Antrean pelanggan</td></tr><tr><td><a href="./modul-05-tree-bst.html">Modul 5</a></td><td>Tree &amp; BST + 4 traversal</td><td>File directory / organisasi</td></tr><tr><td><a href="./modul-06-graph.html">Modul 6</a></td><td>Graph, Adjacency, BFS &amp; DFS</td><td>Rute terpendek / jejaring sosial</td></tr><tr><td><a href="./modul-07-hash-table.html">Modul 7</a></td><td>Hash Table (chaining vs open addressing)</td><td>Kamus kata / ID pengguna</td></tr></tbody></table><h2 id="cara-menjalankan-kode" tabindex="-1">Cara Menjalankan Kode <a class="header-anchor" href="#cara-menjalankan-kode" aria-label="Permalink to “Cara Menjalankan Kode”">​</a></h2><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#62687b",
		"--shiki-dark": "#818e99"
	})}"># compile salah satu contoh (disimpan dari blok kode modul)</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">g++</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}"> -std=c++17</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}"> -o</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> program</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> program.cpp</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">./program</span><span style="${ssrRenderStyle({
		"--shiki-light": "#62687b",
		"--shiki-dark": "#818e99"
	})}">        # Windows: program.exe</span></span></code></pre></div><p>Disarankan compiler: <strong>g++ 11+</strong> atau <strong>MinGW-w64</strong> di Windows, atau jalankan online di <a href="https://www.programiz.com/cpp-programming/online-compiler/" target="_blank" rel="noreferrer">https://www.programiz.com/cpp-programming/online-compiler/</a></p><h2 id="sumber-gambar-video" tabindex="-1">Sumber Gambar &amp; Video <a class="header-anchor" href="#sumber-gambar-video" aria-label="Permalink to “Sumber Gambar &amp; Video”">​</a></h2><ul><li><strong>Gambar/diagram:</strong> di-hotlink dari Programiz, GeeksforGeeks, dan Wikimedia Commons — URL dicantumkan di bawah setiap gambar sehingga atribusi jelas.</li><li><strong>Video YouTube:</strong> tautan lengkap ada di tiap modul (Kelas Terbuka, Jenny&#39;s Lectures, freeCodeCamp, Abdul Bari, CS50, dll).</li><li><strong>Website:</strong> Programiz, GeeksforGeeks, cppreference, VisuAlgo — URL lengkap di bagian Referensi tiap modul.</li></ul><h2 id="menjalankan-situs-dokumentasi" tabindex="-1">Menjalankan Situs Dokumentasi <a class="header-anchor" href="#menjalankan-situs-dokumentasi" aria-label="Permalink to “Menjalankan Situs Dokumentasi”">​</a></h2><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">npm</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> install</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">npm</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> run</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> docs:dev</span></span></code></pre></div></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("index.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Praktikum_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, Praktikum_default as default };
