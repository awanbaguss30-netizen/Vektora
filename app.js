const DUMMY_DATA = [
  {
    id: "1",
    title: "Mobil Listrik Semakin Diminati, Penjualan Meningkat Tajam di 2026",
    summary: "Tren kendaraan ramah lingkungan terus berlanjut. Berbagai pabrikan otomotif mencatatkan rekor penjualan mobil listrik.",
    content: "Penjualan mobil listrik (EV) di Indonesia mengalami lonjakan signifikan sepanjang kuartal pertama 2026. Data terbaru menunjukkan peningkatan hingga 150% dibandingkan tahun sebelumnya.\n\nHal ini didorong oleh infrastruktur pengisian daya yang semakin memadai di berbagai kota besar serta insentif pemerintah yang terus berlanjut.\n\nBanyak konsumen yang beralih ke EV karena dinilai lebih hemat biaya perawatan dan ramah lingkungan.",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938cb?auto=format&fit=crop&w=800&q=80",
    category: "Otomotif",
    date: "5 Mei 2026",
    views: 4500,
    tags: ["MobilListrik", "Otomotif", "RamahLingkungan"]
  },
  {
    id: "2",
    title: "Festival Musik Terbesar Asia Akan Digelar di Jakarta Akhir Tahun Ini",
    summary: "Siap-siap! Puluhan musisi internasional dan lokal papan atas akan memeriahkan festival musik yang paling ditunggu tahun ini.",
    content: "Jakarta kembali dipercaya menjadi tuan rumah festival musik berskala internasional. Pihak penyelenggara baru saja merilis daftar musisi fase pertama yang dipastikan hadir.\n\nTidak hanya menampilkan genre pop dan rock, festival ini juga akan menghadirkan panggung khusus untuk musik elektronik (EDM) dan hip hop.\n\nTiket pre-sale dikabarkan telah ludes terjual hanya dalam waktu 15 menit setelah dibuka secara online.",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80",
    category: "Musik",
    date: "4 Mei 2026",
    views: 8200,
    tags: ["FestivalMusik", "Konser", "Jakarta"]
  },
  {
    id: "3",
    title: "Timnas Basket Raih Kemenangan Gemilang di Kejuaraan Asia",
    summary: "Semangat juang luar biasa ditunjukkan oleh timnas basket yang sukses menumbangkan raksasa Asia di laga krusial.",
    content: "Tim Nasional Bola Basket mencetak sejarah baru setelah mengalahkan tim favorit juara di babak perempat final Kejuaraan Asia 2026.\n\nPertandingan berjalan sangat sengit hingga kuarter terakhir, namun tembakan tiga angka di detik-detik akhir memastikan kemenangan dramatis bagi timnas.\n\nKini mereka bersiap menghadapi lawan berat lainnya di babak semifinal yang akan digelar besok malam.",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80",
    category: "Sport",
    date: "3 Mei 2026",
    views: 12400,
    tags: ["Basket", "Timnas", "KejuaraanAsia"]
  },
  {
    id: "4",
    title: "Update Teknologi AI Terbaru: Bikin Pekerjaan Makin Cepat",
    summary: "Berita terbaru seputar perkembangan teknologi AI yang mulai diintegrasikan ke berbagai alat produktivitas sehari-hari.",
    content: "Perkembangan Kecerdasan Buatan (AI) kini semakin mempermudah pekerjaan sehari-hari. Mulai dari asisten penulis hingga pembuat presentasi otomatis.\n\nPerusahaan teknologi berlomba-lomba meluncurkan pembaruan yang membuat AI lebih mengerti konteks bahasa manusia yang natural.\n\nDiharapkan efisiensi kerja dapat meningkat hingga 40% berkat integrasi teknologi mutakhir ini di lingkungan kerja.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    category: "News",
    date: "2 Mei 2026",
    views: 6700,
    tags: ["Teknologi", "AI", "News"]
  }
];

function initDB() {
  if (!localStorage.getItem('articles')) {
    localStorage.setItem('articles', JSON.stringify(DUMMY_DATA));
  }
}

function getArticles() {
  return JSON.parse(localStorage.getItem('articles') || '[]');
}

function getTodayDate() {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString('id-ID', options);
}

// Global Check Auth (for navbar if exists)
function checkAuth() {
  const isAuth = localStorage.getItem('isAuth') === 'true';
  const loginLink = document.getElementById('login-link-footer');
  if (loginLink) {
    if (isAuth) {
      loginLink.innerHTML = 'DASHBOARD SUPER ADMIN';
      loginLink.href = 'superadmin.html';
    } else {
      loginLink.innerHTML = 'LOGIN ADMIN';
      loginLink.href = 'login.html';
    }
  }
  return isAuth;
}

// ROUTING LOGIC
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  initDB();
  checkAuth();

  // INDEX.HTML
  if (path.endsWith('index.html') || path === '/' || path.endsWith('/')) {
    const articles = getArticles();
    if (articles.length === 0) return;
    
    const reversed = [...articles].reverse();
    const hero = reversed[0];
    
    // Render Hero
    document.getElementById('hero-article').innerHTML = `
      <div class="hero-content">
        <span class="card-category">${hero.category}</span>
        <h2><a href="article.html?id=${hero.id}">${hero.title}</a></h2>
        <div class="card-meta"><span>${hero.date}</span><span>👁 ${hero.views} Views</span></div>
        <p class="card-summary" style="font-size: 1.1rem; margin-top: 1rem;">${hero.summary}</p>
      </div>
      <div class="card-img-wrap" style="margin:0; height:100%;">
        <img src="${hero.image}" alt="${hero.title}">
      </div>
    `;

    // Render Grid
    const grid = document.getElementById('latest-articles');
    reversed.slice(1).forEach(item => {
      grid.innerHTML += `
        <div class="card">
          <a href="article.html?id=${item.id}" class="card-img-wrap"><img src="${item.image}" alt="${item.title}" class="card-img"></a>
          <div class="card-meta"><span class="card-category">${item.category}</span><span>${item.date}</span></div>
          <h3 class="card-title"><a href="article.html?id=${item.id}">${item.title}</a></h3>
          <p class="card-summary">${item.summary}</p>
        </div>
      `;
    });
  }

  // ARTICLE.HTML
  if (path.endsWith('article.html')) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) return window.location.href = 'index.html';
    
    const articles = getArticles();
    const article = articles.find(a => a.id === id);
    
    if (article) {
      article.views++;
      localStorage.setItem('articles', JSON.stringify(articles));
      
      document.title = article.title + " - Vektora";
      document.getElementById('article-category').textContent = article.category;
      document.getElementById('article-title').textContent = article.title;
      document.getElementById('article-date').textContent = article.date;
      document.getElementById('article-views').textContent = `${article.views} Views`;
      document.getElementById('article-image').src = article.image;
      
      document.getElementById('article-content-body').innerHTML = article.content.split('\n\n').map(p => `<p>${p}</p>`).join('');
      
      const tagsContainer = document.getElementById('article-tags');
      if (article.tags && article.tags.length > 0) {
        tagsContainer.innerHTML = article.tags.map(t => `<span class="hashtag">${t.trim()}</span>`).join('');
      }
    }
  }

  // LOGIN.HTML
  if (path.endsWith('login.html')) {
    if (localStorage.getItem('isAuth') === 'true') window.location.href = 'superadmin.html';
    document.getElementById('login-form').addEventListener('submit', (e) => {
      e.preventDefault();
      if (document.getElementById('username').value === 'admin' && document.getElementById('password').value === 'admin') {
        localStorage.setItem('isAuth', 'true');
        window.location.href = 'superadmin.html';
      } else {
        alert("Login Gagal!");
      }
    });
  }

  // SUPERADMIN.HTML & ADMIN.HTML Logic (Shared functions)
  if (path.endsWith('superadmin.html') || path.endsWith('admin.html')) {
    if (localStorage.getItem('isAuth') !== 'true') return window.location.href = 'login.html';
    
    document.getElementById('btn-logout').addEventListener('click', () => {
      localStorage.removeItem('isAuth');
      window.location.href = 'index.html';
    });
    
    // Image Preview Logic
    const imageInput = document.getElementById('form-image');
    const previewContainer = document.getElementById('image-preview');
    const previewImg = document.getElementById('preview-img');
    let base64Image = "";

    if (imageInput) {
      imageInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
            base64Image = e.target.result;
            previewImg.src = base64Image;
            previewContainer.style.display = 'block';
          }
          reader.readAsDataURL(file);
        }
      });
    }
    
    // CMS Upload Form
    const adminForm = document.getElementById('admin-form');
    const articleList = document.getElementById('article-list');
    const cmsTitle = document.getElementById('cms-title');
    const btnSubmit = document.getElementById('btn-submit');
    const btnCancel = document.getElementById('btn-cancel');
    const formId = document.getElementById('form-id');

    function renderAdminTable() {
      if (!articleList) return;
      const articles = getArticles();
      articleList.innerHTML = articles.map(item => `
        <tr>
          <td><div style="max-width:300px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${item.title}</div></td>
          <td>${item.category}</td>
          <td>${item.date}</td>
          <td>${item.views}</td>
          <td>
            <button class="btn btn-primary" style="padding: 0.3rem 0.6rem; font-size:0.8rem;" onclick="editArticle('${item.id}')">Edit</button>
            <button class="btn btn-danger" style="padding: 0.3rem 0.6rem; font-size:0.8rem;" onclick="deleteArticle('${item.id}')">Hapus</button>
          </td>
        </tr>
      `).join('');
    }

    window.editArticle = function(id) {
      const articles = getArticles();
      const article = articles.find(a => a.id === id);
      if (!article) return;

      // Fill form
      formId.value = article.id;
      document.getElementById('form-title').value = article.title;
      document.getElementById('form-category').value = article.category;
      document.getElementById('form-tags').value = article.tags ? article.tags.join(', ') : '';
      document.getElementById('form-summary').value = article.summary;
      document.getElementById('form-content').value = article.content;
      
      if (article.image) {
        base64Image = article.image;
        previewImg.src = base64Image;
        previewContainer.style.display = 'block';
      }

      // Update UI
      cmsTitle.textContent = "Edit Artikel: " + article.title;
      btnSubmit.textContent = "SIMPAN PERUBAHAN ARTIKEL";
      btnCancel.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if(window.calculateSEO) calculateSEO();
    };

    window.deleteArticle = function(id) {
      if (confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
        let articles = getArticles();
        articles = articles.filter(a => a.id !== id);
        localStorage.setItem('articles', JSON.stringify(articles));
        renderAdminTable();
      }
    };

    btnCancel.addEventListener('click', () => {
      adminForm.reset();
      formId.value = "";
      base64Image = "";
      previewContainer.style.display = 'none';
      cmsTitle.textContent = "Buat Artikel Baru & Analisis SEO";
      btnSubmit.textContent = "UPLOAD ARTIKEL KE WEBSITE RESMI";
      btnCancel.style.display = 'none';
      if(window.calculateSEO) calculateSEO();
    });

    if (adminForm) {
      adminForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const tagsVal = document.getElementById('form-tags').value;
        const articles = getArticles();
        const id = formId.value;

        if (id) {
          // UPDATE Existing
          const index = articles.findIndex(a => a.id === id);
          if (index !== -1) {
            articles[index].title = document.getElementById('form-title').value;
            articles[index].category = document.getElementById('form-category').value;
            articles[index].summary = document.getElementById('form-summary').value;
            articles[index].content = document.getElementById('form-content').value;
            articles[index].tags = tagsVal ? tagsVal.split(',').map(t => t.trim()).filter(t=>t) : [];
            if (base64Image) articles[index].image = base64Image;
            alert('Artikel berhasil diperbarui!');
          }
        } else {
          // CREATE New
          const newArticle = {
            id: Date.now().toString(),
            title: document.getElementById('form-title').value,
            category: document.getElementById('form-category').value,
            summary: document.getElementById('form-summary').value,
            content: document.getElementById('form-content').value,
            image: base64Image || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80",
            date: getTodayDate(),
            views: 0,
            tags: tagsVal ? tagsVal.split(',').map(t => t.trim()).filter(t=>t) : []
          };
          articles.push(newArticle);
          alert('Artikel berhasil diupload ke website resmi!');
        }

        localStorage.setItem('articles', JSON.stringify(articles));
        adminForm.reset();
        formId.value = "";
        previewContainer.style.display = 'none';
        base64Image = "";
        cmsTitle.textContent = "Buat Artikel Baru & Analisis SEO";
        btnSubmit.textContent = "UPLOAD ARTIKEL KE WEBSITE RESMI";
        btnCancel.style.display = 'none';
        
        renderAdminTable();
        if(window.calculateSEO) calculateSEO();
      });
    }

    renderAdminTable();
  }
});
