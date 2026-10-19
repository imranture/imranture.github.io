/**
 * Project Page - Script for the static pages in projects/<id>/
 * The project content is in the HTML (built by scripts/build-project-pages.js);
 * this adds the click-to-zoom lightbox for project images
 */

initImageZoom();

/**
 * Initialize image zoom functionality for project images
 * Adds click handlers to open images in a modal lightbox
 */
function initImageZoom() {
    const images = document.querySelectorAll('.project-detail-images img');
    
    images.forEach(img => {
        img.addEventListener('click', () => {
            openImageModal(img.src, img.alt);
        });
    });
}

/**
 * Opens an image in a modal lightbox overlay
 * @param {string} src - Image source URL
 * @param {string} alt - Image alt text
 */
function openImageModal(src, alt) {
    const modal = document.createElement('div');
    modal.className = 'image-modal active';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'image-modal-close';
    closeBtn.innerHTML = '×';
    closeBtn.setAttribute('aria-label', 'Close image');
    closeBtn.setAttribute('type', 'button');
    
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.opacity = '0';
    
    img.onload = () => {
        img.style.transition = 'opacity 0.3s';
        img.style.opacity = '1';
    };
    
    modal.appendChild(closeBtn);
    modal.appendChild(img);
    document.body.appendChild(modal);
    
    document.body.style.overflow = 'hidden';
    
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => modal.remove(), 200);
    };
    
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    img.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}
