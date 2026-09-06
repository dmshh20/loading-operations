    function openLightbox(element) {
        const imgSrc = element.querySelector('img').src;
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightboxImg');
        
        lightboxImg.src = imgSrc;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Блокуємо прокрутку сторінки
    }

    function closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Відновлюємо прокрутку
    }