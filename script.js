// Variable global para rastrear la pantalla actual
let currentScreen = 'welcome-screen';
let historyList = [];




// Objeto para almacenar la información del usuario
let userData = {
    nombre: 'Invitado',
    telefono: 'N/A',
    email: 'N/A',
    emergencia: 'N/A'
};

/**
 * Función principal para navegar entre pantallas
 */
function navigateTo(targetScreenId) {
    const targetElement = document.getElementById(targetScreenId);

    // Evita pantallas blancas si el ID no existe
    if (!targetElement) {
        console.error(`❌ ERROR: La pantalla "${targetScreenId}" no existe en el HTML.`);
        alert(`Pantalla no encontrada: ${targetScreenId}`);
        return;
    }

    // Oculta la pantalla actual
    const currentElement = document.getElementById(currentScreen);
    if (currentElement) {
        currentElement.style.display = 'none';
    }

    // Muestra la pantalla objetivo
    targetElement.style.display = (targetScreenId === 'welcome-screen') ? 'flex' : 'block';
    targetElement.scrollTo(0, 0);

    // Actualiza pantalla actual
    currentScreen = targetScreenId;

    console.log(`📌 Navegando a: ${currentScreen}`);
}


/**
 * Actualiza la interfaz con los datos del usuario
 */
function updateUserDataDisplay() {
    const isGuest = userData.nombre === 'Invitado';

    // Actualizar nombre en Home
    const homeName = document.getElementById('user-display-name');
    if (homeName) {
        const displayName = isGuest ? 'Invitado' : userData.nombre.split(' ')[0];
        homeName.textContent = `Hola, ${displayName}`;
    }

    // Actualizar iniciales en Home
    const profileInitials = document.getElementById('user-initials');
    if (profileInitials) {
        const initialsSource = isGuest ? 'I' : userData.nombre;
        const parts = initialsSource.trim().split(' ');
        let initials = '';
        if (parts.length > 0) initials += parts[0][0];
        if (!isGuest && parts.length > 1) {
            initials += parts[parts.length - 1][0];
        }
        profileInitials.textContent = initials.toUpperCase() || 'AA';
    }

    // Actualizar pantalla de perfil
    updateProfileScreen(isGuest);
}

/**
 * Actualiza la pantalla de perfil dinámicamente
 */
function updateProfileScreen(isGuest) {
    const profileScreen = document.getElementById('profile-screen');
    if (!profileScreen) return;

    profileScreen.innerHTML = `
        <div class="flex items-center mb-6">
            <button id="back-from-profile" class="text-gray-600 mr-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
            </button>
            <span class="text-gray-600 font-medium">Volver a Home</span>
        </div>

        <h1 class="text-3xl font-bold text-blue-700 mb-2">Perfil</h1>
        <p class="text-gray-600 mb-6">Configuración de tu cuenta</p>

        <!-- Avatar circular -->
        <div class="flex flex-col items-center mb-8">
            <div class="w-32 h-32 bg-blue-500 text-white font-extrabold text-5xl flex items-center justify-center rounded-full shadow-lg mb-4">
                ${getInitials()}
            </div>
            <h2 class="text-2xl font-bold text-gray-800">${userData.nombre}</h2>
            <p class="text-gray-500">${userData.email}</p>
            ${userData.telefono !== 'N/A' ? `<p class="text-gray-500">${userData.telefono}</p>` : ''}
        </div>

        <!-- Opciones de perfil -->
        <div class="space-y-3 mb-6">

            <!-- BOTÓN: Editar perfil -->
            <button id="edit-profile-button"
                class="w-full p-4 bg-white rounded-xl shadow-md flex items-center justify-between hover:bg-gray-50 transition">
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                    </div>
                    <div class="text-left">
                        <p class="font-semibold text-gray-800">Editar perfil</p>
                        <p class="text-sm text-gray-500">Actualiza tu información personal</p>
                    </div>
                </div>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M9 5l7 7-7 7"></path>
                </svg>
            </button>

            <!-- BOTÓN: Tamaño de texto -->
            <button 
                class="size-text-btn w-full p-4 bg-white rounded-xl shadow-md flex items-center justify-between hover:bg-gray-50 transition">
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span class="text-2xl">👤</span>
                    </div>
                    <div class="text-left">
                        <p class="font-semibold text-gray-800">Tamaño de texto</p>
                        <p class="text-sm text-gray-500">Ajusta el tamaño de la letra</p>
                    </div>
                </div>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M9 5l7 7-7 7"></path>
                </svg>
            </button>

            <!-- BOTÓN: Vibración -->
            <button 
                class="vibration-btn w-full p-4 bg-white rounded-xl shadow-md flex items-center justify-between hover:bg-gray-50 transition">
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                        <span class="text-2xl">📳</span>
                    </div>
                    <div class="text-left">
                        <p class="font-semibold text-gray-800">Vibración</p>
                        <p class="text-sm text-gray-500">Configurar alertas táctiles</p>
                    </div>
                </div>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M9 5l7 7-7 7"></path>
                </svg>
            </button>

        </div>

        <!-- Información de contacto de emergencia -->
        ${!isGuest && userData.emergencia !== 'N/A' ? `
        <div class="bg-red-50 p-4 rounded-xl mb-6">
            <p class="font-semibold text-red-800 mb-1">Contacto de emergencia</p>
            <p class="text-red-700">${userData.emergencia}</p>
        </div>
        ` : ''}

        <!-- Botón de cerrar sesión -->
        <button id="logout-button" 
            class="w-full ${isGuest ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} 
            text-white font-bold py-4 rounded-2xl shadow-lg transition flex items-center justify-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            ${isGuest ? 'Iniciar sesión / Registrarse' : 'Cerrar sesión'}
        </button>
    `;

    // Re-adjuntar listeners
    attachProfileListeners(isGuest);
}

/**
 * Obtiene las iniciales del usuario
 */
function getInitials() {
    const isGuest = userData.nombre === 'Invitado';
    if (isGuest) return 'I';

    const parts = userData.nombre.trim().split(' ');
    let initials = '';
    if (parts.length > 0) initials += parts[0][0];
    if (parts.length > 1) initials += parts[parts.length - 1][0];
    return initials.toUpperCase() || 'AA';
}

/**
 * Adjunta listeners a los botones del perfil
 */
function attachProfileListeners(isGuest) {
    document.getElementById('back-from-profile')?.addEventListener('click', () => {
        navigateTo('home-screen');
    });

    document.getElementById('logout-button')?.addEventListener('click', () => {
        if (isGuest) {
            navigateTo('signup-screen');
        } else {
            if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
                userData = {
                    nombre: 'Invitado',
                    telefono: 'N/A',
                    email: 'N/A',
                    emergencia: 'N/A'
                };
                updateUserDataDisplay();
                navigateTo('welcome-screen');
            }
        }
    });

    document.getElementById('edit-profile-button')?.addEventListener('click', () => {
        navigateTo('edit-profile-screen');
    });

    document.querySelector('.size-text-btn')?.addEventListener('click', () => {
        navigateTo('text-size-screen');
    });

    document.querySelector('.vibration-btn')?.addEventListener('click', () => {
        navigateTo('vibration-screen');
    });

}

// AGREGA un elemento al historial
function addToHistory(texto, tipo) {
    const fecha = new Date().toLocaleString('es-CR', { hour12: false });

    historyList.unshift({
        texto,
        tipo,
        fecha
    });

    updateHistoryUI();
}

// ACTUALIZA la pantalla del historial
function updateHistoryUI() {
    const container = document.getElementById("history-list");
    container.innerHTML = "";

    if (historyList.length === 0) {
        container.innerHTML = `
            <p class="text-gray-500 text-center">Aún no hay historial...</p>
        `;
        return;
    }

    historyList.forEach(item => {
        container.innerHTML += `
            <div class="p-4 bg-white rounded-xl shadow-md border-l-4 border-yellow-500">
                <p class="font-semibold">${item.tipo}: ${item.texto}</p>
                <small class="text-gray-500">${item.fecha}</small>
            </div>
        `;
    });
}



/**
 * Maneja la selección de mensajes en las categorías
 */
function setupMessageSelection() {
    document.querySelectorAll('.msg-btn').forEach(button => {
        button.addEventListener('click', function () {
            // Remover selección previa
            const category = this.closest('.screen').id;
            this.closest('.space-y-3').querySelectorAll('.msg-btn').forEach(btn => {
                btn.classList.remove('font-semibold', 'shadow');
                btn.classList.remove('bg-red-500', 'bg-blue-600', 'bg-green-600', 'bg-yellow-500', 'bg-cyan-500');
                btn.classList.remove('text-white');

                // Re-agregar clases originales
                if (category.includes('emergencia')) {
                    btn.classList.add('bg-red-100', 'text-red-700');
                } else if (category.includes('policia')) {
                    btn.classList.add('bg-blue-100', 'text-blue-700');
                } else if (category.includes('hospital')) {
                    btn.classList.add('bg-green-100', 'text-green-700');
                } else if (category.includes('banco')) {
                    btn.classList.add('bg-yellow-100', 'text-yellow-700');
                } else if (category.includes('generales')) {
                    btn.classList.add('bg-cyan-100', 'text-cyan-700');
                }
            });

            // Agregar selección al botón clickeado
            if (category.includes('emergencia')) {
                this.classList.remove('bg-red-100', 'text-red-700');
                this.classList.add('bg-red-500', 'text-white', 'font-semibold', 'shadow');
            } else if (category.includes('policia')) {
                this.classList.remove('bg-blue-100', 'text-blue-700');
                this.classList.add('bg-blue-600', 'text-white', 'font-semibold', 'shadow');
            } else if (category.includes('hospital')) {
                this.classList.remove('bg-green-100', 'text-green-700');
                this.classList.add('bg-green-600', 'text-white', 'font-semibold', 'shadow');
            } else if (category.includes('banco')) {
                this.classList.remove('bg-yellow-100', 'text-yellow-700');
                this.classList.add('bg-yellow-500', 'text-white', 'font-semibold', 'shadow');
            } else if (category.includes('generales')) {
                this.classList.remove('bg-cyan-100', 'text-cyan-700');
                this.classList.add('bg-cyan-500', 'text-white', 'font-semibold', 'shadow');
            }

            // Actualizar el texto del mensaje seleccionado
            const messageText = this.textContent;
            const selectedMessageElement = this.closest('.screen').querySelector('[id^="selected-message"]');
            if (selectedMessageElement) {
                selectedMessageElement.textContent = messageText;
            }
            addToHistory(this.textContent.trim(), "Mensaje rápido");
        });
    });
}

/**
 * Inicialización cuando carga el DOM
 */
document.addEventListener('DOMContentLoaded', () => {
    // Ocultar todas las pantallas excepto la inicial
    document.querySelectorAll('.screen').forEach(screen => {
        if (screen.id !== currentScreen) {
            screen.style.display = 'none';
        } else {
            screen.style.display = 'flex';
        }
    });

    // Inicializar datos de usuario
    updateUserDataDisplay();

    // Setup de selección de mensajes
    setupMessageSelection();

    // === LISTENERS DE NAVEGACIÓN ===

    // Welcome -> Signup
    document.getElementById('to-signup-button')?.addEventListener('click', () => {
        navigateTo('signup-screen');
    });

    // Registro
    document.getElementById('signup-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        userData.nombre = document.getElementById('nombre').value || 'Invitado';
        userData.telefono = document.getElementById('telefono').value || 'N/A';
        userData.email = document.getElementById('email').value || 'N/A';
        userData.emergencia = document.getElementById('emergencia').value || 'N/A';

        updateUserDataDisplay();
        navigateTo('home-screen');
    });

    document.getElementById('edit-profile-form')?.addEventListener('submit', (e) => {
        e.preventDefault();

        userData.nombre = document.getElementById('edit-nombre').value || userData.nombre;
        userData.telefono = document.getElementById('edit-telefono').value || userData.telefono;
        userData.email = document.getElementById('edit-email').value || userData.email;
        userData.emergencia = document.getElementById('edit-emergencia').value || userData.emergencia;

        updateUserDataDisplay();

        alert("Perfil actualizado correctamente");
        navigateTo('profile-screen');
    });

    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const size = btn.getAttribute('data-size');
            document.documentElement.style.fontSize = size + "px";
        });
    });

    document.getElementById('vibration-toggle')?.addEventListener('change', (e) => {
        if (e.target.checked && navigator.vibrate) {
            navigator.vibrate(200);
        }
    });

    document.querySelectorAll('.camera-btn').forEach(cameraBtn => {
        cameraBtn.addEventListener('click', function (e) {
            e.stopPropagation(); // Bloquea el click del contenedor

            const action = this.getAttribute('data-action');
            const message = this.getAttribute('data-message');

            if (action === 'show-sign-video') {
                console.log(`🎥 Reproduciendo video de LESCO: ${message}`);
                alert(`Simulación: Video de señas para "${message}"`);
            }
        });
    });


    // Skip signup
    document.getElementById('skip-signup-button')?.addEventListener('click', () => {
        userData = { nombre: 'Invitado', telefono: 'N/A', email: 'N/A', emergencia: 'N/A' };
        updateUserDataDisplay();
        navigateTo('home-screen');
    });

    // === HOME NAVIGATION ===
    document.getElementById('to-quick-messages-button')?.addEventListener('click', () => {
        navigateTo('quick-messages-screen');
    });

    document.getElementById('to-emergencies-button')?.addEventListener('click', () => {
        navigateTo('emergencies-screen');
    });

    document.getElementById('to-translator-mode-button')?.addEventListener('click', () => {
        navigateTo('translator-screen');
    });

    document.getElementById('to-history-button')?.addEventListener('click', () => {
        updateHistoryUI();
        navigateTo('history-screen');
    });


    document.getElementById('to-help-button')?.addEventListener('click', () => {
        navigateTo('help-screen');
    });

    // PERFIL - LISTENER CLAVE
    // DEBUG: mostrar y forzar visibilidad del profile-screen al clicar las iniciales
    document.getElementById('user-initials')?.addEventListener('click', () => {
        console.log('Click en perfil detectado');

        const ps = document.getElementById('profile-screen');
        if (!ps) {
            console.error('profile-screen NO existe en el DOM');
            return;
        }

        // Log de ancestros y su display para detectar si alguno está ocultando el screen
        let node = ps;
        while (node) {
            console.log('Ancestor:', node.tagName, node.id || node.className, 'computed display:',
                window.getComputedStyle(node).display);
            node = node.parentElement;
        }

        // Rellenar campos del perfil desde userData (asegura que no queden vacíos)
        document.getElementById('profile-nombre').textContent = (window.userData && userData.nombre) || 'Invitado';
        document.getElementById('profile-telefono').textContent = (window.userData && userData.telefono) || '--';
        document.getElementById('profile-email').textContent = (window.userData && userData.email) || '--';
        document.getElementById('profile-emergencia').textContent = (window.userData && userData.emergencia) || '--';

        // Forzar que todas las screens estén ocultas y luego mostrar profile-screen
        document.querySelectorAll('.screen').forEach(s => {
            s.classList.add('hidden');
            s.style.display = '';
        });
        ps.classList.remove('hidden');
        ps.style.display = 'block';
        ps.style.zIndex = '50';
        ps.scrollTo(0, 0);

        console.log('profile-screen mostrado. clases:', ps.className, 'inline display:', ps.style.display);
    });


    // DEBUG: comprobar y forzar apertura de perfil al clicar iniciales
    document.addEventListener('DOMContentLoaded', () => {
        const initials = document.getElementById('user-initials');
        console.log('[DEBUG] user-initials existe:', !!initials, initials);

        if (!initials) return;

        initials.style.cursor = 'pointer';
        initials.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('[DEBUG] click en user-initials recibido. target:', e.target);

            const ps = document.getElementById('profile-screen');
            if (!ps) {
                console.error('[DEBUG] profile-screen NO existe en el DOM');
                return;
            }

            // Imprimir ancestros y estilos computados para detectar quién lo oculta
            let node = ps;
            while (node) {
                const cs = window.getComputedStyle(node);
                console.log('[DEBUG] Ancestor:', node.tagName, node.id || node.className, {
                    display: cs.display,
                    visibility: cs.visibility,
                    opacity: cs.opacity,
                    pointerEvents: cs.pointerEvents
                });
                node = node.parentElement;
            }

            // Rellenar campos del perfil desde userData (seguro)
            document.getElementById('profile-nombre') && (document.getElementById('profile-nombre').textContent = (window.userData && userData.nombre) || 'Invitado');
            document.getElementById('profile-telefono') && (document.getElementById('profile-telefono').textContent = (window.userData && userData.telefono) || '--');
            document.getElementById('profile-email') && (document.getElementById('profile-email').textContent = (window.userData && userData.email) || '--');
            document.getElementById('profile-emergencia') && (document.getElementById('profile-emergencia').textContent = (window.userData && userData.emergencia) || '--');

            // Ocultar todas las screens (clase hidden) y mostrar profile-screen
            document.querySelectorAll('.screen').forEach(s => {
                s.classList.add('hidden');
                s.style.display = '';
            });
            ps.classList.remove('hidden');
            ps.style.display = 'block';
            ps.style.zIndex = '9999';
            ps.scrollTo(0, 0);

            console.log('[DEBUG] profile-screen forzado visible. clases:', ps.className, 'display:', ps.style.display);
        });
    });


    // === BACK BUTTONS ===
    document.getElementById('back-from-quick-messages')?.addEventListener('click', () => {
        navigateTo('home-screen');
    });

    document.getElementById('back-from-emergencies')?.addEventListener('click', () => {
        navigateTo('home-screen');
    });

    document.getElementById('back-from-history')?.addEventListener('click', () => {
        navigateTo('home-screen');
    });

    document.getElementById('back-from-help')?.addEventListener('click', () => {
        navigateTo('home-screen');
    });

    // === CATEGORÍAS DE MENSAJES ===
    document.getElementById('to-messages-emergencia')?.addEventListener('click', () => {
        navigateTo('messages-emergencia-screen');
    });

    document.getElementById('to-messages-policia')?.addEventListener('click', () => {
        navigateTo('messages-policia-screen');
    });

    document.getElementById('to-messages-hospital')?.addEventListener('click', () => {
        navigateTo('messages-hospital-screen');
    });

    document.getElementById('to-messages-banco')?.addEventListener('click', () => {
        navigateTo('messages-banco-screen');
    });

    document.getElementById('to-messages-generales')?.addEventListener('click', () => {
        navigateTo('messages-generales-screen');
    });

    // Back de categorías
    document.getElementById('back-from-messages-emergencia')?.addEventListener('click', () => {
        navigateTo('quick-messages-screen');
    });

    document.getElementById('back-from-messages-policia')?.addEventListener('click', () => {
        navigateTo('quick-messages-screen');
    });

    document.getElementById('back-from-messages-hospital')?.addEventListener('click', () => {
        navigateTo('quick-messages-screen');
    });

    document.getElementById('back-from-messages-banco')?.addEventListener('click', () => {
        navigateTo('quick-messages-screen');
    });

    document.getElementById('back-from-messages-generales')?.addEventListener('click', () => {
        navigateTo('quick-messages-screen');
    });

    // === TRADUCTOR ===
    document.getElementById('to-signs-to-text')?.addEventListener('click', () => {
        navigateTo('signs-to-text-screen');
    });

    document.getElementById('to-text-to-signs')?.addEventListener('click', () => {
        navigateTo('text-to-signs-screen');
    });

    document.getElementById('back-to-translator-from-signs')?.addEventListener('click', () => {
        navigateTo('translator-screen');
    });

    document.getElementById('back-to-translator-from-text')?.addEventListener('click', () => {
        navigateTo('translator-screen');
    });

    document.getElementById('back-from-edit-profile')?.addEventListener('click', () => {
        navigateTo('profile-screen');
    });

    document.getElementById('back-from-text-size')?.addEventListener('click', () => {
        navigateTo('profile-screen');
    });

    document.getElementById('back-from-vibration')?.addEventListener('click', () => {
        navigateTo('profile-screen');
    });

    document.getElementById('back-from-translator-main')?.addEventListener('click', () => {
        navigateTo('home-screen');
    });
}); // fin DOMContentLoaded

// Reemplazar cualquier listener anterior de 'user-initials' por este bloque seguro:
(function attachProfileClickOnce() {
    const initials = document.getElementById('user-initials');
    if (!initials) return;
    // Evitar duplicados
    if (initials.dataset.listenerAttached === '1') return;
    initials.dataset.listenerAttached = '1';
    initials.style.cursor = 'pointer';

    initials.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('[DEBUG] click en user-initials recibido.');

        // Obtener elementos del perfil de forma segura
        const profileNombre = document.getElementById('profile-nombre');
        const profileTelefono = document.getElementById('profile-telefono');
        const profileEmail = document.getElementById('profile-email');
        const profileEmergencia = document.getElementById('profile-emergencia');
        const ps = document.getElementById('profile-screen');

        if (!ps) {
            console.error('[DEBUG] profile-screen NO existe en el DOM');
            return;
        }

        // Rellenar solo si existen los nodos en el DOM
        if (profileNombre) profileNombre.textContent = (window.userData && userData.nombre) || 'Invitado';
        if (profileTelefono) profileTelefono.textContent = (window.userData && userData.telefono) || '--';
        if (profileEmail) profileEmail.textContent = (window.userData && userData.email) || '--';
        if (profileEmergencia) profileEmergencia.textContent = (window.userData && userData.emergencia) || '--';

        // Navegación: usa tu función navigateTo si existe, si no, muestra manualmente
        if (typeof navigateTo === 'function') {
            navigateTo('profile-screen');
        } else {
            // Fallback seguro
            document.querySelectorAll('.screen').forEach(s => {
                s.classList.add('hidden');
                s.style.display = '';
            });
            ps.classList.remove('hidden');
            ps.style.display = 'block';
        }

        console.log('[DEBUG] profile-screen mostrado (forzado/por navigateTo).');
    });
})();
