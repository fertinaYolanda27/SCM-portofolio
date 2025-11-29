document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('sketchup-carousel');
    // Jika track tidak ada (karena gambar tidak dimuat), hentikan script
    if (!track) return; 
    
    const container = track.closest('.carousel-container');
    const slides = Array.from(track.children);
    let slideIndex = 0;
    
    // Perlu dihitung ulang setelah DOM dimuat
    const slideWidth = slides[0].getBoundingClientRect().width; 
    
    const intervalTime = 4000; // Geser setiap 4 detik (4000ms)

    // Fungsi untuk menggeser track
    const moveToSlide = () => {
        // Perlu dikalikan dengan 5 (jumlah item) karena setiap slide item adalah 20% lebar track
        track.style.transform = 'translateX(-' + slideIndex * slideWidth + 'px)'; 
    };

    // Fungsi untuk bergerak maju/mundur
    window.moveSlide = (n) => {
        slideIndex += n;
        if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        } else if (slideIndex >= slides.length) {
            slideIndex = 0;
        }
        moveToSlide();
    };

    // AutoPlay Logic
    let sliderInterval = setInterval(() => {
        moveSlide(1);
    }, intervalTime);

    // Pause saat kursor mendekat (Interaktif)
    container.addEventListener('mouseenter', () => {
        clearInterval(sliderInterval);
    });

    // Lanjutkan AutoPlay saat kursor menjauh
    container.addEventListener('mouseleave', () => {
        sliderInterval = setInterval(() => {
            moveSlide(1);
        }, intervalTime);
    });
});

    let indexSpesial = 0;

    function moveSpecialSlide(arah) {
        const track = document.getElementById('trackUnik');
        const cards = document.querySelectorAll('.special-track .special-card');
        
        // Logika Responsif (HP = 1, Laptop = 3)
        const itemsPerLayar = window.innerWidth <= 768 ? 1 : 3; 
        const totalCards = cards.length;
        
        // Ambil lebar kartu pertama + gap 20px
        const lebarKartu = cards[0].offsetWidth + 20; 

        indexSpesial += arah;

        // Batas Kiri
        if (indexSpesial < 0) {
            indexSpesial = 0;
        } 
        // Batas Kanan
        else if (indexSpesial > totalCards - itemsPerLayar) {
            indexSpesial = totalCards - itemsPerLayar;
        }

        // Geser
        track.style.transform = `translateX(-${indexSpesial * lebarKartu}px)`;
    }

    // Reset posisi kalau layar diubah ukurannya (biar rapi)
    window.addEventListener('resize', () => {
        indexSpesial = 0;
        document.getElementById('trackUnik').style.transform = `translateX(0)`;
    });