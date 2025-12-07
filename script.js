document.addEventListener('DOMContentLoaded', function() {
    
    // =========================================
    // 1. LOGIKA PROJECT SLIDER (SMART CENTER)
    // =========================================
    const carousels = document.querySelectorAll('.carousel-wrapper');

    carousels.forEach(wrapper => {
        const track = wrapper.querySelector('.carousel-track');
        const prevBtn = wrapper.querySelector('.slider-btn.prev');
        const nextBtn = wrapper.querySelector('.slider-btn.next');
        const items = wrapper.querySelectorAll('.carousel-item');
        
        // Safety check
        if (!track || !items.length) return;

        let currentIndex = 0;
        
        // Fungsi utama update tampilan
        function updateCarousel() {
            // Cek tampilan layar (Desktop = 3 gambar, HP = 1 gambar)
            const visibleItems = window.innerWidth > 768 ? 3 : 1;
            
            // --- FITUR BARU: AUTO CENTER ---
            // Jika jumlah gambar kurang dari atau sama dengan slot layar (misal cuma 1 atau 2 di Desktop)
            if (items.length <= visibleItems) {
                // 1. Buat track jadi rata tengah
                track.classList.add('track-center');
                
                // 2. Sembunyikan tombol panah karena tidak perlu geser
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'none';
                
                // 3. Reset posisi ke awal (biar gak error saat resize)
                track.style.transform = 'translateX(0px)';
                return; // Stop, tidak perlu jalankan logika geser di bawah
            } else {
                // Jika gambar banyak, kembalikan ke normal (rata kiri)
                track.classList.remove('track-center');
                prevBtn.style.display = 'flex';
                nextBtn.style.display = 'flex';
            }
            // -------------------------------

            // Ambil lebar item pertama
            const itemWidth = items[0].getBoundingClientRect().width;
            const gap = 20; // Sesuai CSS gap
            
            // Rumus geser
            const amountToMove = (itemWidth + gap) * currentIndex;
            track.style.transform = `translateX(-${amountToMove}px)`;

            // Logika matikan tombol jika mentok (Disable visual)
            const maxIndex = items.length - visibleItems;
            
            // Tombol kiri
            if (currentIndex === 0) {
                prevBtn.style.opacity = '0.3';
                prevBtn.style.cursor = 'not-allowed';
            } else {
                prevBtn.style.opacity = '1';
                prevBtn.style.cursor = 'pointer';
            }

            // Tombol kanan
            if (currentIndex >= maxIndex) {
                nextBtn.style.opacity = '0.3';
                nextBtn.style.cursor = 'not-allowed';
            } else {
                nextBtn.style.opacity = '1';
                nextBtn.style.cursor = 'pointer';
            }
        }

        // Event Klik Tombol Next
        nextBtn.addEventListener('click', () => {
            const visibleItems = window.innerWidth > 768 ? 3 : 1;
            if (currentIndex < items.length - visibleItems) {
                currentIndex++; 
                updateCarousel();
            }
        });

        // Event Klik Tombol Prev
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--; 
                updateCarousel();
            }
        });

        // Update saat layar di-resize (responsif)
        window.addEventListener('resize', () => {
            currentIndex = 0; // Reset ke awal biar rapi
            updateCarousel();
        });
        
        // Jalankan sekali saat loading selesai
        updateCarousel();
    });


    // =========================================
    // 2. LOGIKA LIGHTBOX (POPUP GAMBAR)
    // =========================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-lightbox');
    const allImages = document.querySelectorAll('.carousel-img');

    if (lightbox) {
        allImages.forEach(img => {
            img.addEventListener('click', function() {
                lightbox.classList.add('show');
                lightboxImg.src = this.src;
                
                // Ambil caption dari bawah gambar
                const captionEl = this.nextElementSibling;
                if (captionEl) {
                    lightboxCaption.innerText = captionEl.innerText;
                } else {
                    lightboxCaption.innerText = "";
                }
            });
        });

        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('show');
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('show');
            }
        });
        
        // Tombol ESC untuk tutup
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape" && lightbox.classList.contains('show')) {
                lightbox.classList.remove('show');
            }
        });
    }
});


// =========================================
// 3. LOGIKA SLIDER SERTIFIKAT (TETAP)
// =========================================
let indexSpesial = 0;

function moveSpecialSlide(arah) {
    const track = document.getElementById('trackUnik');
    if (!track) return; 

    const cards = document.querySelectorAll('.special-track .special-card');
    const itemsPerLayar = window.innerWidth <= 768 ? 1 : 3; 
    const totalCards = cards.length;
    
    if (cards.length > 0) {
        const lebarKartu = cards[0].offsetWidth + 20; 

        indexSpesial += arah;

        if (indexSpesial < 0) {
            indexSpesial = 0;
        } else if (indexSpesial > totalCards - itemsPerLayar) {
            indexSpesial = totalCards - itemsPerLayar;
        }

        track.style.transform = `translateX(-${indexSpesial * lebarKartu}px)`;
    }
}

window.addEventListener('resize', () => {
    const track = document.getElementById('trackUnik');
    if (track) {
        indexSpesial = 0;
        track.style.transform = `translateX(0)`;
    }
});