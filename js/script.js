// js/script.js

// ====================================
// 1. SİZİN BELİRLEDİĞİNİZ İÇERİKLER (VERİ TABANI)
// ====================================
const allContents = [
    // LÜTFEN URL'LERİ KENDİ LİNKLERİNİZLE DEĞİŞTİRİN
    {
        id: 1,
        type: 'video', 
        title: 'Sitemin Tanıtım Videosu ve Vlog',
        description: 'Bu video sitemin nasıl çalıştığını ve ilk vlog maceralarımı içeriyor. İzlemek için tıklayın!',
        // TIKLANDIĞINDA GİDECEĞİ YER: YouTube İzleme Linki
        url: 'https://www.youtube.com/watch?v=SjVv3kL1wzI', 
        thumbnail: 'https://via.placeholder.com/350x200?text=VIDEO+1+KAPAGI'
    },
    {
        id: 2,
        type: 'image',
        title: 'Mükemmel Gün Batımı Fotoğrafı',
        description: 'En son çektiğim harika manzara fotoğrafı. Yüksek çözünürlüklü görmek için tıklayın!',
        // TIKLANDIĞINDA GİDECEĞİ YER: Fotoğrafın Yüksek Çözünürlüklü Linki
        url: 'https://via.placeholder.com/1600x1200?text=GUN+BATIMI+FULL+SIZE', 
        thumbnail: 'https://via.placeholder.com/350x200?text=FOTO+1+KAPAGI'
    },
    {
        id: 3,
        type: 'video',
        title: 'Kodlama Süreci ve İpuçları',
        description: 'Bu portalı yaparken kullandığım araçlar ve teknikler hakkında bir video.',
        url: 'https://www.youtube.com/watch?v=rN6nlO83D2A',
        thumbnail: 'https://via.placeholder.com/350x200?text=KODLAMA+VLOGU'
    },
    {
        id: 4,
        type: 'announcement',
        title: 'YENİ İÇERİK YÜKLENDİ!',
        description: 'Bütün videolarımız güncellenmiştir. Tümünü Görüntüle sekmesini kontrol edin!',
        // Duyurular yönlendirme yapmayacağı için URL'si boş kalabilir
        url: '', 
        thumbnail: '' 
    }
];

// ====================================
// 2. DOM ELEMANLARINI SEÇME
// ====================================
const galleryElement = document.getElementById('content-gallery');
const tabButtons = document.querySelectorAll('.tab-button');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

let currentFilter = 'all'; 

// ====================================
// 3. İŞLEV FONKSİYONLARI
// ====================================

/**
 * İçeriğe tıklandığında kullanıcıyı harici URL'ye yönlendirir.
 * @param {object} item - Tıklanan içerik nesnesi
 */
function handleClick(item) {
    if (item.url) {
        // Tarayıcıyı yeni bir sekmede (blank) URL'ye yönlendirir.
        window.open(item.url, '_blank');
    } else {
        alert("Bu içerik doğrudan yönlendirme içermiyor.");
    }
}

/**
 * İçerikleri filtreler, arar ve galeriye render eder.
 */
function renderGallery(filterType = 'all', searchTerm = '') {
    galleryElement.innerHTML = ''; 

    const filteredContents = allContents.filter(item => {
        const matchesFilter = (filterType === 'all' || item.type === filterType);
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              item.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (filteredContents.length === 0) {
        galleryElement.innerHTML = `<p style="text-align: center; color: #aaa; font-size: 1.2em; margin-top: 50px;">Aradığınız kriterlere uygun içerik bulunamadı.</p>`;
        return;
    }

    filteredContents.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('content-card');
        card.setAttribute('data-type', item.type);
        
        let mediaHtml = '';
        if (item.type === 'video' || item.type === 'image') {
            mediaHtml = `
                <div class="media-wrapper">
                    <img src="${item.thumbnail}" alt="${item.title}">
                    ${item.type === 'video' ? '<div class="play-icon">▶</div>' : ''}
                </div>
            `;
        } else if (item.type === 'announcement') {
            mediaHtml = `<div class="media-wrapper"><h3>📢 ${item.title}</h3></div>`;
        }
        
        card.innerHTML = `
            ${mediaHtml}
            <div class="content-info">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;

        // Tıklama Olayı: Sadece video ve fotoğraf kartları yönlendirsin
        if (item.type === 'video' || item.type === 'image') {
            card.addEventListener('click', () => handleClick(item)); 
        } else {
             card.style.cursor = 'default';
        }
        
        galleryElement.appendChild(card);
    });
}

// ====================================
// 4. UYGULAMA BAŞLATMA
// ====================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Sayfa yüklendiğinde galeriyi oluştur
    renderGallery(currentFilter); 

    // 2. Sekme Butonları için olay dinleyicileri
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            currentFilter = button.dataset.filter; 
            searchInput.value = ''; 
            renderGallery(currentFilter); 
        });
    });

    // 3. Arama Fonksiyonu
    const handleSearch = () => {
        const searchTerm = searchInput.value;
        renderGallery(currentFilter, searchTerm);
    };

    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
});