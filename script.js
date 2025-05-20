document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            // ARIA attribute for accessibility
            const isExpanded = navMenu.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when a link is clicked (for SPA-like navigation)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // Gallery Images Data
    const galleryImages = [
        {
            id: 1, 
            src: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            alt: 'Majestic Mountain Landscape',
            category: 'paisajes',
            credits: 'Photo by Pixabay on Pexels',
            sourceUrl: 'https://www.pexels.com/photo/snowy-mountain-peak-325185/',
            experienceDescription: 'La inmensidad de estas montañas bajo un cielo despejado me recordó lo pequeños que somos. El aire era puro y el silencio, sobrecogedor. Un momento de paz absoluta.'
        },
        {
            id: 2, 
            src: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            alt: 'Serene Lake and Mountains',
            category: 'montanas',
            credits: 'Photo by James Wheeler on Pexels',
            sourceUrl: 'https://www.pexels.com/photo/blue-lake-reflecting-snow-covered-mountains-417074/',
            experienceDescription: 'El reflejo perfecto de las cumbres nevadas en el lago cristalino era hipnótico. Esperé horas para que la luz fuera perfecta, y valió la pena cada segundo.'
        },
        {
            id: 3, 
            src: 'https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            alt: 'Vibrant Sunset Over a Lake',
            category: 'atardeceres',
            credits: 'Photo by Pixabay on Pexels',
            sourceUrl: 'https://www.pexels.com/photo/silhouette-of-trees-during-sunset-36717/',
            experienceDescription: 'Los colores de este atardecer parecían pintados por un dios. El cielo ardía en tonos naranjas y púrpuras, una despedida del sol que te dejaba sin aliento.'
        },
        {
            id: 4, 
            src: 'https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            alt: 'Forest Path with Sunbeams',
            category: 'paisajes',
            credits: 'Photo by Luis del Río on Pexels',
            sourceUrl: 'https://www.pexels.com/photo/person-in-black-jacket-standing-on-forest-pathway-15286/',
            experienceDescription: 'Caminando por este sendero, los rayos de sol se filtraban entre los árboles creando un juego de luces y sombras mágico. Sentí una conexión profunda con la naturaleza.'
        },
        {
            id: 5, 
            src: 'https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            alt: 'Snowy Mountain Range Under Clear Sky',
            category: 'montanas',
            credits: 'Photo by eberhard grossgasteiger on Pexels',
            sourceUrl: 'https://www.pexels.com/photo/snowy-mountain-range-under-clear-sky-572897/',
            experienceDescription: 'La majestuosidad de esta cordillera nevada bajo un cielo azul intenso era imponente. El frío cortante contrastaba con la calidez del sol en la piel.'
        },
        {
            id: 6, 
            src: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            alt: 'Full Moon in Dark Sky',
            category: 'luna',
            credits: 'Photo by M सईद MPR on Pexels',
            sourceUrl: 'https://www.pexels.com/photo/silhouette-of-bare-tree-under-full-moon-1624496/',
            experienceDescription: 'Una noche de luna llena, donde su luz plateada bañaba el paisaje. La silueta del árbol contra el cielo oscuro creaba una atmósfera de misterio y ensueño.'
        },
        {
            id: 7,
            src: 'https://images.pexels.com/photos/2885320/pexels-photo-2885320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            alt: 'City skyline at night',
            category: 'urbano',
            credits: 'Photo by Brett Sayles on Pexels',
            sourceUrl: 'https://www.pexels.com/photo/city-skyline-at-night-2885320/',
            experienceDescription: 'Las luces de la ciudad titilando en la oscuridad, un mar de historias y vidas entrelazadas. Desde las alturas, el caos urbano se transforma en una sinfonía visual.'
        },
        {
            id: 8,
            src: 'https://images.pexels.com/photos/2440024/pexels-photo-2440024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            alt: 'Colorful sunset over the ocean',
            category: 'atardeceres',
            credits: 'Photo by Asad Photo Maldives on Pexels',
            sourceUrl: 'https://www.pexels.com/photo/scenic-view-of-ocean-during-sunset-2440024/',
            experienceDescription: 'Un atardecer sobre el océano Índico que parecía irreal. Cada ola reflejaba los tonos cálidos del cielo, creando un espectáculo de color y movimiento inolvidable.'
        }
    ];

    const galleryGrid = document.querySelector('.gallery-grid');
    const categoryButtons = document.querySelectorAll('.category-btn');

    // Modal elements
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalDescriptionText = document.querySelector('#modalDescription p');
    const closeModalBtn = document.querySelector('.close-modal-btn');

    function openModal(imageSrc, altText, description) {
        if (!modal || !modalImage || !modalDescriptionText) return;
        modalImage.src = imageSrc;
        modalImage.alt = altText;
        modalDescriptionText.textContent = description;
        modal.classList.add('modal-open');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('modal-open');
        document.body.style.overflow = 'auto'; // Restore background scroll
        // Clear content to prevent flash of old content if modal transitions are slow
        modalImage.src = ""; 
        modalImage.alt = "";
        modalDescriptionText.textContent = "";
    }

    if(closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    // Close modal on outside click
    if(modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) { // Check if the click is on the modal backdrop itself
                closeModal();
            }
        });
        // Close modal on Escape key press
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.classList.contains('modal-open')) {
                closeModal();
            }
        });
    }

    function displayGalleryImages(imagesToDisplay) {
        if (!galleryGrid) return;
        galleryGrid.innerHTML = ''; // Clear existing images
        imagesToDisplay.forEach(image => {
            const item = document.createElement('div');
            item.classList.add('gallery-item');
            item.dataset.category = image.category;
            item.innerHTML = `
                <img src="${image.src}" alt="${image.alt}" loading="lazy">
                <div class="caption">
                    <p>${image.alt}</p>
                    <p><a href="${image.sourceUrl}" target="_blank" rel="noopener noreferrer">Source: ${image.credits}</a></p>
                </div>
            `;
            // Add click listener to open modal
            item.addEventListener('click', () => {
                // Find the full image object to get the description
                const fullImageObject = galleryImages.find(img => img.id === image.id);
                if (fullImageObject) {
                    openModal(fullImageObject.src, fullImageObject.alt, fullImageObject.experienceDescription);
                } else {
                    // Fallback if somehow not found, though it should always be
                    openModal(image.src, image.alt, "Descripción no disponible.");
                }
            });
            galleryGrid.appendChild(item);
        });
        // Re-apply ScrollReveal to new items if needed, or handle animation directly
        if (typeof ScrollReveal !== 'undefined') {
            ScrollReveal().reveal('.gallery-item', { 
                duration: 800, 
                distance: '50px', 
                origin: 'bottom', 
                easing: 'ease-in-out',
                interval: 100,
                reset: false, // Animation will only play once
                viewFactor: 0.2 // Item revealed when 20% visible
            });
        }
    }

    // Initial display of all images
    displayGalleryImages(galleryImages);

    // Filter gallery
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                const selectedCategory = button.dataset.category;
                
                // Update active button state
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                if (selectedCategory === 'all') {
                    displayGalleryImages(galleryImages);
                } else {
                    const filteredImages = galleryImages.filter(image => image.category === selectedCategory);
                    displayGalleryImages(filteredImages);
                }
            });
        });
    }

    // Contact Form Validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent actual submission for this demo
            let isValid = true;

            const nombre = document.getElementById('nombre');
            const mensaje = document.getElementById('mensaje');

            // Validate Nombre
            if (nombre.value.trim() === '') {
                isValid = false;
                setErrorFor(nombre, 'El nombre es obligatorio.');
            } else {
                setSuccessFor(nombre);
            }

            // Validate Mensaje
            if (mensaje.value.trim() === '') {
                isValid = false;
                setErrorFor(mensaje, 'El mensaje no puede estar vacío.');
            } else {
                setSuccessFor(mensaje);
            }

            if (isValid) {
                // Here you would typically send the form data to a server
                // alert('¡Formulario enviado con éxito! (Simulación)');

                const subject = encodeURIComponent("Nuevo Mensaje del Blog de ELPAJARODV");
                const bodyParts = [
                    `Nombre: ${nombre.value.trim()}`,
                    `Mensaje: ${mensaje.value.trim()}`
                ];
                const body = encodeURIComponent(bodyParts.join("\n\n")); // Separate parts with double newline

                window.location.href = `mailto:emi46414@gmail.com?subject=${subject}&body=${body}`;

                contactForm.reset();
                clearErrors();
                // Optionally, remove success states after a delay or on next input
            }
        });

        function setErrorFor(input, message) {
            const formGroup = input.parentElement;
            const errorMessage = formGroup.querySelector('.error-message');
            input.classList.add('invalid');
            input.classList.remove('valid');
            errorMessage.innerText = message;
        }

        function setSuccessFor(input) {
            const formGroup = input.parentElement;
            const errorMessage = formGroup.querySelector('.error-message');
            input.classList.add('valid'); // Optional: add a class for valid inputs for styling
            input.classList.remove('invalid');
            errorMessage.innerText = '';
        }
        
        function clearErrors() {
            ['nombre', 'mensaje'].forEach(id => {
                const input = document.getElementById(id);
                if (input) {
                    setSuccessFor(input); // Clears error message and invalid class
                    input.classList.remove('valid'); // Remove valid class on reset
                }
            });
        }
    }

    // ScrollReveal Animations
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '60px',
            duration: 1000,
            delay: 200,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            reset: false, // Animations repeat only once
            useDelay: 'always', // `always` (default), `once`, `onload`
            viewFactor: 0.2, // Element is considered visible when 20% of it is in viewport
        });

        // Add a class to elements that ScrollReveal should hide before revealing
        // This is better than opacity:0 in CSS to avoid flash of unstyled content
        sr.reveal('h1, .hero p, h2, .sobre-mi-content, .category-btn, .blog-post, #contact-form', 
            { interval: 150, beforeReveal: (el) => { el.classList.remove('sr-hidden'); } }
        );
        // Initial gallery items are handled by displayGalleryImages function

        // Add sr-hidden to elements to be revealed
        document.querySelectorAll('h1, .hero p, h2, .sobre-mi-content, .category-btn, .blog-post, #contact-form, .gallery-item')
            .forEach(el => el.classList.add('sr-hidden'));
    } else {
        console.warn('ScrollReveal library not loaded.');
    }

    // Active Nav Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const headerOffset = document.querySelector('header').offsetHeight + 20; // Adjust offset as needed

    // Blog Post Full Content Data (Simple version)
    const blogPostFullContent = {
        "post1": {
            title: "Explorando los Misterios de la Luna Llena",
            imageSrc: "https://imagenes.elpais.com/resizer/v2/2T72MO3AZVEPRFK6QPYWAOCM5E.jpg?auth=7778854bf5ed41d4f31e12295cd226419dea19cf2c02d11c9356d905172c9b2c&width=1200",
            imageAlt: "Misterios de la Luna Llena",
            fullContent: "La luna llena ha cautivado a la humanidad durante milenios. Su ciclo regular y su luminosa presencia en la noche oscura han inspirado mitos, leyendas y un sinfín de obras de arte. En este artículo, nos adentramos en algunos de los aspectos más fascinantes de nuestro satélite natural cuando se presenta en su máximo esplendor. Desde su influencia gravitatoria que genera las mareas, hasta las supersticiones y creencias populares que la rodean. Hablaremos también sobre los mejores consejos para observarla y fotografiarla, capturando su cráteres y mares con detalle. ¿Sabías que cada luna llena tiene un nombre tradicional dependiendo de la época del año? Exploraremos estos nombres y sus orígenes culturales. Prepárate para un viaje celestial sin salir de casa, descubriendo cómo la tecnología actual nos permite apreciar aún más su belleza y entender mejor sus ciclos. Además, incluiremos una pequeña guía de eventos lunares para los próximos meses."
        },
        "post2": {
            title: "Atardeceres Mágicos: Guía para Capturar su Esencia",
            imageSrc: "https://images.mnstatic.com/4d/e6/4de6af49808ee8cdedef86e96ab3eac3.jpg",
            imageAlt: "Atardeceres Mágicos y Cómo Capturarlos",
            fullContent: "No hay dos atardeceres iguales, y cada uno ofrece un espectáculo de color efímero que merece ser contemplado y, si es posible, capturado. Esta guía está pensada para todos los amantes de los atardeceres, desde el observador casual hasta el fotógrafo aficionado que busca mejorar sus técnicas. Exploraremos cómo predecir la calidad de un atardecer basándonos en las condiciones atmosféricas, la importancia de la ubicación y la composición en la fotografía de paisajes. Además, daremos consejos prácticos sobre el equipo necesario (¡no siempre se necesita una cámara profesional!), los ajustes de cámara recomendados para diferentes efectos, y cómo procesar tus imágenes para resaltar la belleza natural de esos momentos dorados. Compartiremos también algunas de nuestras localizaciones favoritas alrededor del mundo para presenciar puestas de sol inolvidables y cómo la hora dorada y la hora azul son tus mejores aliadas. ¡Inspírate y sal a cazar tu próximo atardecer mágico!"
        }
    };

    // Blog Post Modal Elements
    const blogModal = document.getElementById('blogPostModal');
    const blogModalImage = document.getElementById('blogModalImage');
    const blogModalTitle = document.getElementById('blogModalTitle');
    const blogModalText = document.getElementById('blogModalText');
    const closeBlogModalBtn = document.querySelector('.close-blog-modal-btn');
    const readMoreLinks = document.querySelectorAll('.blog-post .read-more');

    function openBlogPostModal(postId) {
        if (!blogModal || !blogPostFullContent[postId]) return;
        
        const postData = blogPostFullContent[postId];
        
        if (blogModalImage) blogModalImage.src = postData.imageSrc;
        if (blogModalImage) blogModalImage.alt = postData.imageAlt;
        if (blogModalTitle) blogModalTitle.textContent = postData.title;
        if (blogModalText) blogModalText.innerHTML = postData.fullContent; // Use innerHTML if content has <p> tags or other HTML

        blogModal.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
    }

    function closeBlogPostModal() {
        if (!blogModal) return;
        blogModal.classList.remove('modal-open');
        document.body.style.overflow = 'auto';
        if (blogModalImage) blogModalImage.src = "";
        if (blogModalTitle) blogModalTitle.textContent = "";
        if (blogModalText) blogModalText.innerHTML = "";
    }

    if (closeBlogModalBtn) {
        closeBlogModalBtn.addEventListener('click', closeBlogPostModal);
    }

    if (blogModal) {
        blogModal.addEventListener('click', (event) => {
            if (event.target === blogModal) {
                closeBlogPostModal();
            }
        });
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && blogModal.classList.contains('modal-open')) {
                closeBlogPostModal();
            }
        });
    }

    readMoreLinks.forEach((link, index) => {
        // Assign a post ID based on order or a data-attribute if you add it to HTML
        // For this simple case, using index + 1 assuming they are in order post1, post2
        const postId = `post${index + 1}`;
        // We will add data-post-id to HTML later for more robustness
        link.setAttribute('data-post-id', postId);

        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            const clickedPostId = event.currentTarget.getAttribute('data-post-id');
            openBlogPostModal(clickedPostId);
        });
    });

    function changeNavOnScroll() {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerOffset;
            const sectionHeight = section.offsetHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
        // Handle hero section separately if it's not a <section> or if logic needs to be specific
        const heroSection = document.getElementById('inicio');
        if (heroSection && pageYOffset < heroSection.offsetTop + heroSection.offsetHeight - headerOffset) {
             navLinks.forEach(link => {
                if (link.getAttribute('href') === '#inicio') link.classList.add('active');
                else link.classList.remove('active');
            });
        } else if (!currentSectionId && pageYOffset < sections[0].offsetTop - headerOffset) {
            // If above all sections, highlight 'Inicio' or clear all
            navLinks.forEach(link => {
                if (link.getAttribute('href') === '#inicio') link.classList.add('active');
                else link.classList.remove('active');
            });
        }
    }

    window.addEventListener('scroll', changeNavOnScroll);
    changeNavOnScroll(); // Call on load to set initial state

    // Admin Panel Logic
    const adminAccessBtn = document.getElementById('adminAccessBtn');
    const adminPasswordModal = document.getElementById('adminPasswordModal');
    const adminPasswordInput = document.getElementById('adminPasswordInput');
    const adminPasswordError = document.getElementById('adminPasswordError');
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const closeAdminModalButton = document.querySelector('#adminPasswordModal .close-admin-modal-btn');
    const toggleAdminPasswordBtn = document.getElementById('toggleAdminPassword');
    let adminModeActive = false;
    const ADMIN_PASSWORD = "Yo soy ironman"; // Keep this secure if this were a real backend app!

    function openAdminPasswordModal() {
        if (adminPasswordModal) {
            adminPasswordInput.value = '';
            adminPasswordError.textContent = '';
            adminPasswordModal.classList.add('modal-open');
        }
    }

    function closeAdminPasswordModal() {
        if (adminPasswordModal) {
            adminPasswordModal.classList.remove('modal-open');
        }
    }

    function activateAdminMode() {
        document.body.classList.add('admin-mode-active');
        adminModeActive = true;
        console.log("Admin mode activated");
        // Setup editing for sections that are now editable
        setupSobreMiEditing(); 
        // Future: setupGalleryEditing();
        // Future: setupBlogEditing();
    }

    // Potentially call setup functions if admin mode is already active (e.g. after page reload and password was remembered)
    // This is a simplified scenario; robust state persistence would be more complex.
    // For now, we assume admin mode needs to be activated each session.
    
    function handleAdminLogin() {
        if (adminPasswordInput.value === ADMIN_PASSWORD) {
            adminPasswordError.textContent = '';
            activateAdminMode();
            closeAdminPasswordModal();
        } else {
            adminPasswordError.textContent = 'Contraseña incorrecta.';
        }
    }

    if (adminLoginBtn) {
        adminLoginBtn.addEventListener('click', handleAdminLogin);
    }
    if (adminPasswordInput) {
        adminPasswordInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                handleAdminLogin();
            }
        });
    }

    // Toggle password visibility for Admin Panel
    const toggleAdminPassword = document.getElementById('toggleAdminPassword');
    if (toggleAdminPassword && adminPasswordInput) {
        toggleAdminPassword.addEventListener('click', function() {
            const type = adminPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            adminPasswordInput.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }

    // Store original content for "Sobre mí" section
    let originalSobreMiContent = {};

    function setupSobreMiEditing() {
        const sobreMiContainer = document.getElementById('sobreMiTextoContainer');
        if (!sobreMiContainer) return;

        const editBtn = sobreMiContainer.querySelector('.admin-edit-text-btn');
        const actionsDiv = sobreMiContainer.querySelector('.admin-edit-actions');
        const saveBtn = actionsDiv ? actionsDiv.querySelector('.admin-save-btn') : null;
        const cancelBtn = actionsDiv ? actionsDiv.querySelector('.admin-cancel-btn') : null;
        
        const p1 = document.getElementById('sobreMiParrafo1');
        const p2 = document.getElementById('sobreMiParrafo2');

        if (!editBtn || !actionsDiv || !saveBtn || !cancelBtn || !p1 || !p2) {
            console.error("Error: Not all elements for 'Sobre Mí' editing found.");
            return;
        }
        
        // Store initial content if not already stored
        if (Object.keys(originalSobreMiContent).length === 0) {
            originalSobreMiContent.p1 = p1.innerHTML;
            originalSobreMiContent.p2 = p2.innerHTML;
        }

        editBtn.addEventListener('click', () => {
            // Store current live content as original for this editing session before making changes
            originalSobreMiContent.p1 = p1.innerHTML;
            originalSobreMiContent.p2 = p2.innerHTML;

            const text1 = p1.innerText;
            const text2 = p2.innerText;

            const textarea1 = document.createElement('textarea');
            textarea1.classList.add('editable-admin-text');
            textarea1.id = 'sobreMiTextarea1';
            textarea1.value = text1;
            
            const textarea2 = document.createElement('textarea');
            textarea2.classList.add('editable-admin-text');
            textarea2.id = 'sobreMiTextarea2';
            textarea2.value = text2;

            p1.replaceWith(textarea1);
            p2.replaceWith(textarea2);

            actionsDiv.style.display = 'block'; // Show save/cancel
            actionsDiv.classList.add('editing'); // For CSS if needed
            editBtn.style.display = 'none'; // Hide edit button
        });

        saveBtn.addEventListener('click', () => {
            const textarea1 = document.getElementById('sobreMiTextarea1');
            const textarea2 = document.getElementById('sobreMiTextarea2');

            if(textarea1 && textarea2) {
                // IMPORTANT: Sanitize this input if it were to be persistently stored and re-rendered as HTML.
                // For this project, we are assuming direct innerHTML update is acceptable given the controlled context.
                p1.innerHTML = textarea1.value.replace(/\n/g, '<br>'); // Preserve line breaks from textarea
                p2.innerHTML = textarea2.value.replace(/\n/g, '<br>');
                
                // Update original content to new saved state for next edit/cancel cycle
                originalSobreMiContent.p1 = p1.innerHTML;
                originalSobreMiContent.p2 = p2.innerHTML;
    
                textarea1.replaceWith(p1);
                textarea2.replaceWith(p2);
    
                actionsDiv.style.display = 'none';
                actionsDiv.classList.remove('editing');
                editBtn.style.display = 'inline-block'; // Show edit button
            }
        });

        cancelBtn.addEventListener('click', () => {
            const textarea1 = document.getElementById('sobreMiTextarea1');
            const textarea2 = document.getElementById('sobreMiTextarea2');

            if(textarea1 && textarea2) {
                p1.innerHTML = originalSobreMiContent.p1;
                p2.innerHTML = originalSobreMiContent.p2;
    
                textarea1.replaceWith(p1);
                textarea2.replaceWith(p2);
    
                actionsDiv.style.display = 'none';
                actionsDiv.classList.remove('editing');
                editBtn.style.display = 'inline-block';
            }
        });
    }
    
    // Initial setup when DOM is ready and potentially when admin mode is activated
    // We call this inside activateAdminMode as well, to ensure it runs if elements were not ready before.
    // And also if admin mode is activated after DOMContentLoaded.

    function activateAdminMode() {
        document.body.classList.add('admin-mode-active');
        adminModeActive = true;
        console.log("Admin mode activated");
        // Setup editing for sections that are now editable
        setupSobreMiEditing(); 
        // Future: setupGalleryEditing();
        // Future: setupBlogEditing();
    }

    // Keyboard shortcut for admin modal
    window.addEventListener('keydown', (event) => {
        if (event.key === '/' && !adminModeActive) { 
            // Check if focus is on an input/textarea or if another modal is open
            const activeElement = document.activeElement;
            const isTyping = activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA';
            const anyModalOpen = document.querySelector('.modal.modal-open');

            if (!isTyping && !anyModalOpen) {
                event.preventDefault(); // Prevent '/' from being typed into other inputs if any
                openAdminPasswordModal();
            }
        }
    });
    
});
