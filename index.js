    function openLightbox(element) {
        const imgSrc = element.querySelector('img').src;
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightboxImg');
        
        lightboxImg.src = imgSrc;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    const galleryImages = [
        './images/gallery1.jpg',
        './images/gallery2.jpg',
        './images/gallery3.jpg',
        './images/gallery4.jpg',
        './images/gallery5.jpg',
        './images/gallery6.jpg',
        './images/gallery7.jpg',
        './images/gallery8.jpg',
        './images/gallery9.jpg',
        './images/gallery10.jpg'
    ];

    const galleryTrack = document.getElementById('galleryTrack');
    const prevButton = document.querySelector('.gallery-arrow--prev');
    const nextButton = document.querySelector('.gallery-arrow--next');

    function getVisibleSlides() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 3;
        return 4;
    }

    function buildGallery() {
        const visibleSlides = getVisibleSlides();
        const frontClones = galleryImages.slice(-visibleSlides);
        const backClones = galleryImages.slice(0, visibleSlides);
        const allSlides = [...frontClones, ...galleryImages, ...backClones];

        galleryTrack.innerHTML = allSlides.map((src, index) => {
            const isClone = index < visibleSlides || index >= visibleSlides + galleryImages.length;
            const slideNumber = isClone ? '' : `Вантажні роботи ${((index - visibleSlides) % galleryImages.length) + 1}`;
            const imageAlt = slideNumber || 'Вантажні роботи';

            return `
                <div class="gallery-slide">
                    <div class="gallery-item" onclick="openLightbox(this)">
                        <img src="${src}" alt="${imageAlt}">
                        <div class="gallery-overlay">
                            <span>Дивитись</span>
                            <i class="fa-solid fa-expand"></i>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    let currentIndex = getVisibleSlides();
    let transitionLock = false;

    function updateGallery(animate = true) {
        const visibleSlides = getVisibleSlides();
        const gap = 16;
        const gapWidth = gap * (visibleSlides - 1);
        const trackWidth = galleryTrack.clientWidth;
        const slideWidth = (trackWidth - gapWidth) / visibleSlides;
        const offset = currentIndex * (slideWidth + gap);

        galleryTrack.style.transition = animate ? 'transform 0.45s ease' : 'none';
        galleryTrack.style.transform = `translateX(-${offset}px)`;
    }

    function handleTransitionEnd() {
        const visibleSlides = getVisibleSlides();
        const totalRealSlides = galleryImages.length;

        if (currentIndex >= visibleSlides + totalRealSlides) {
            currentIndex = visibleSlides;
            updateGallery(false);
        }

        if (currentIndex < visibleSlides) {
            currentIndex = visibleSlides + totalRealSlides - 1;
            updateGallery(false);
        }

        transitionLock = false;
    }

    prevButton.addEventListener('click', () => {
        if (transitionLock) return;
        transitionLock = true;
        currentIndex -= 1;
        updateGallery(true);
    });

    nextButton.addEventListener('click', () => {
        if (transitionLock) return;
        transitionLock = true;
        currentIndex += 1;
        updateGallery(true);
    });

    galleryTrack.addEventListener('transitionend', handleTransitionEnd);
    window.addEventListener('resize', () => {
        updateGallery(false);
    });

    buildGallery();
    updateGallery(false);

    const visibleSlides = getVisibleSlides();
    const totalRealSlides = galleryImages.length;
    currentIndex = visibleSlides;
    updateGallery(false);