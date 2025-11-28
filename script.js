// Variable global para rastrear la pantalla actual, inicia en la de bienvenida
let currentScreen = 'welcome-screen';

// Objeto para almacenar la información del usuario (valores por defecto)
let userData = {
    nombre: 'Ariana Araya Cordero', 
    telefono: '8888-8888',
    emergencia: '5555-5555 (Mamá)'
};

/**
 * Función principal para navegar entre las diferentes pantallas.
 * @param {string} targetScreenId - El ID de la pantalla a la que queremos navegar (ej: 'home-screen').
 */
function navigateTo(targetScreenId) {
    // 1. Ocultar la pantalla actual
    const currentElement = document.getElementById(currentScreen);
    if (currentElement) {
        currentElement.style.display = 'none';
    }

    // 2. Mostrar la pantalla de destino
    const targetElement = document.getElementById(targetScreenId);
    if (targetElement) {
        // La pantalla de bienvenida, el traductor y el modal usan 'flex', el resto 'block'
        targetElement.style.display = (targetScreenId === 'welcome-screen' || targetScreenId === 'confirmation-screen' || targetScreenId === 'translator-mode-screen') ? 'flex' : 'block';
        
        // Forzar el scroll a la parte superior
        targetElement.scrollTo(0, 0);
    }

    // 3. Actualizar la variable de la pantalla actual (solo si no es la pantalla de confirmación/modal)
    // NOTA: Para este prototipo, permitimos que el modal se establezca como currentScreen
    currentScreen = targetScreenId;
    
    console.log(`Navegando a: ${currentScreen}`);
}

/**
 * Función para actualizar la interfaz con los datos del usuario.
 */
function updateUserDataDisplay() {
    // Actualizar Home (nombre y iniciales)
    const homeName = document.querySelector('#home-screen h2');
    if (homeName) {
        const firstName = userData.nombre.split(' ')[0];
        homeName.textContent = `Hola, ${firstName || 'Usuario'}`;
    }
    const profileInitials = document.getElementById('to-profile-button');
    if (profileInitials) {
        const parts = userData.nombre.trim().split(' ');
        let initials = '';
        if (parts.length > 0) initials += parts[0][0]; 
        if (parts.length > 1) initials += parts[parts.length - 1][0];
        profileInitials.textContent = initials.toUpperCase() || 'AA';
    }

    // Actualizar Perfil (generación dinámica)
    const profileScreen = document.getElementById('profile-screen');
    if (profileScreen) {
        profileScreen.innerHTML = `
            <div class="flex items-center mb-6">
                <button id="back-from-profile" class="text-gray-600 mr-4">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                </button>
                <span class="text-gray-600 font-medium">Volver a Home</span>
            </div>
            <h1 class="text-3xl font-bold text-primary-blue mb-2">Perfil y Ajustes</h1>
            <p class="text-gray-600 mb-8">Configuración de tu cuenta</p>

            <div class="space-y-4">
                <div class="p-4 bg-white rounded-xl shadow-md">
                    <p class="font-semibold">Nombre:</p>
                    <p class="text-primary-blue">${userData.nombre || 'No ingresado'}</p>
                </div>
                <div class="p-4 bg-white rounded-xl shadow-md">
                    <p class="font-semibold">Teléfono:</p>
                    <p class="text-primary-blue">${userData.telefono || 'No ingresado'}</p>
                </div>
                <div class="p-4 bg-white rounded-xl shadow-md">
                    <p class="font-semibold">Contacto de Emergencia:</p>
                    <p class="text-primary-blue">${userData.emergencia || 'No ingresado'}</p>
                </div>
                <button class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-2xl transition">Editar Perfil</button>
                <button class="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 mt-8 rounded-2xl transition">Cerrar Sesión</button>
            </div>
        `;
        // Se debe re-adjuntar el listener de regreso del perfil
        document.getElementById('back-from-profile')?.addEventListener('click', () => navigateTo('home-screen'));
    }
}

/**
 * Muestra el modal de confirmación con un mensaje personalizado.
 * @param {string} title - Título del mensaje.
 * @param {string} message - Cuerpo del mensaje.
 * @param {string} emoji - Emoji a mostrar.
 * @param {string} returnToScreenId - La pantalla a la que debe regresar el modal.
 */
function showConfirmation(title, message, emoji, returnToScreenId) {
    document.getElementById('confirmation-title').textContent = title;
    document.getElementById('confirmation-message').textContent = message;
    document.getElementById('confirmation-emoji').textContent = emoji;
    
    // Guardar la pantalla de retorno en el elemento del modal
    document.getElementById('confirmation-screen').dataset.returnTo = returnToScreenId;
    
    // Mostrar el modal
    navigateTo('confirmation-screen');
}


/**
 * Función para inicializar listeners de eventos y la vista inicial.
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicialización de Pantallas
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        if (screen.id !== currentScreen) {
            screen.style.display = 'none';
        } else {
            screen.style.display = 'flex'; // La bienvenida siempre en flex
        }
    });

    // 2. Inicialización de datos en Home y Perfil
    updateUserDataDisplay();

    // --- Listeners de Navegación General ---
    
    document.getElementById('to-signup-button')?.addEventListener('click', () => navigateTo('signup-screen'));

    // Registro
    document.getElementById('signup-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombreInput = document.getElementById('nombre');
        const telInput = document.getElementById('telefono');
        const emergenciaInput = document.getElementById('emergencia');

        if (nombreInput.value) {
            userData.nombre = nombreInput.value;
            userData.telefono = telInput.value || 'No ingresado';
            userData.emergencia = emergenciaInput.value || 'No ingresado';
            updateUserDataDisplay(); 
        }
        
        navigateTo('home-screen');
    });
    document.getElementById('skip-signup-button')?.addEventListener('click', () => navigateTo('home-screen'));
    
    // --- Listeners del Menú Principal (Home) ---
    document.getElementById('to-quick-messages-button')?.addEventListener('click', () => navigateTo('quick-messages-screen'));
    document.getElementById('to-emergencies-button')?.addEventListener('click', () => navigateTo('emergencies-screen'));
    document.getElementById('to-translator-mode-button')?.addEventListener('click', () => navigateTo('translator-mode-screen'));
    document.getElementById('to-history-button')?.addEventListener('click', () => navigateTo('history-screen'));
    document.getElementById('to-help-button')?.addEventListener('click', () => navigateTo('help-screen'));
    document.getElementById('to-profile-button')?.addEventListener('click', () => navigateTo('profile-screen'));
    
    // --- Listeners de Retorno a Home ---
    document.getElementById('back-from-quick-messages')?.addEventListener('click', () => navigateTo('home-screen'));
    document.getElementById('back-from-emergencies')?.addEventListener('click', () => navigateTo('home-screen'));
    document.getElementById('back-from-translator')?.addEventListener('click', () => navigateTo('home-screen'));
    document.getElementById('back-from-history')?.addEventListener('click', () => navigateTo('home-screen'));
    document.getElementById('back-from-help')?.addEventListener('click', () => navigateTo('home-screen'));
    // El listener de back-from-profile se re-adjunta en updateUserDataDisplay()
    
    // --- Listeners de Navegación de Categorías (¡Interacción clave!) ---
    
    document.getElementById('to-messages-emergencia')?.addEventListener('click', () => navigateTo('messages-emergencia-screen'));
    document.getElementById('to-messages-policia')?.addEventListener('click', () => navigateTo('messages-policia-screen'));
    document.getElementById('to-messages-hospital')?.addEventListener('click', () => navigateTo('messages-hospital-screen'));
    document.getElementById('to-messages-banco')?.addEventListener('click', () => navigateTo('messages-banco-screen'));
    document.getElementById('to-messages-generales')?.addEventListener('click', () => navigateTo('messages-generales-screen'));
    
    // --- Listeners de Retorno de Categorías de Mensajes a la Lista de Categorías ---
    
    document.getElementById('back-from-messages-emergencia')?.addEventListener('click', () => navigateTo('quick-messages-screen'));
    document.getElementById('back-from-messages-policia')?.addEventListener('click', () => navigateTo('quick-messages-screen'));
    document.getElementById('back-from-messages-hospital')?.addEventListener('click', () => navigateTo('quick-messages-screen'));
    document.getElementById('back-from-messages-banco')?.addEventListener('click', () => navigateTo('quick-messages-screen'));
    document.getElementById('back-from-messages-generales')?.addEventListener('click', () => navigateTo('quick-messages-screen'));

    // ============================
//   NAVEGACIÓN TRADUCTOR
// ============================

// Ir desde Home → Selector del Traductor
document.getElementById("to-translator-mode-button")?.addEventListener("click", () => {
    navigateTo("translator-screen");
});

// Selector → Pantalla SEÑAS → TEXTO/VOZ
document.getElementById("to-signs-to-text")?.addEventListener("click", () => {
    navigateTo("signs-to-text-screen");
});

// Selector → Pantalla TEXTO/VOZ → SEÑAS
document.getElementById("to-text-to-signs")?.addEventListener("click", () => {
    navigateTo("text-to-signs-screen");
});

// Pantalla SEÑAS → TEXTO/VOZ → volver al selector
document.getElementById("back-to-translator-from-signs")?.addEventListener("click", () => {
    navigateTo("translator-screen");
});

// Pantalla TEXTO/VOZ → SEÑAS → volver al selector
document.getElementById("back-to-translator-from-text")?.addEventListener("click", () => {
    navigateTo("translator-screen");
});

// Selector del traductor → volver a Home
document.getElementById("back-from-translator-main")?.addEventListener("click", () => {
    navigateTo("home-screen");
});

    // --- Lógica de Envío de Mensajes (Botones de "Enviar" / "Mostrar en Señas") ---
    
    document.querySelectorAll('.send-message-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); 
            
            const messageItem = this.closest('.message-item');
            const message = messageItem.getAttribute('data-message');
            const buttonText = this.textContent;
            
            // Determinar la pantalla de retorno (la pantalla de categoría actual)
            const returnToScreenId = this.closest('.screen').id;

            let title = '';
            let emoji = '🤟';
            let confirmationMsg = '';

            if (buttonText.includes('Enviar con Ubicación') || buttonText.includes('ENVIAR ALERTA RÁPIDA')) {
                title = '¡Alerta Enviada!';
                emoji = '🚨';
                confirmationMsg = `El mensaje: "${message}" ha sido notificado al servicio de emergencia y tu ubicación fue enviada automáticamente. Espera la respuesta.`;
                
            } else if (buttonText.includes('Mostrar en Señas')) {
                title = 'Mostrando en LESCO';
                emoji = '✅';
                confirmationMsg = `El mensaje: "${message}" se está mostrando en Lenguaje de Señas. (Simulación de traducción).`;
                
            } else {
                title = 'Acción realizada';
                confirmationMsg = `Se ha procesado el mensaje: "${message}"`;
            }

            // Llamar al modal, pasando la ID de la pantalla de la categoría actual como retorno
            showConfirmation(title, confirmationMsg, emoji, returnToScreenId);
        });
    });

    // Listener para cerrar el modal de confirmación
    document.getElementById('close-confirmation-button')?.addEventListener('click', () => {
        const modalElement = document.getElementById('confirmation-screen');
        // Usar la ID de retorno guardada en el dataset
        const returnScreenId = modalElement.dataset.returnTo || 'home-screen'; 

        // Ocultar el modal (se usa navigateTo para que la variable currentScreen sea correcta)
        navigateTo(returnScreenId);
        // Ocultar el modal manualmente, ya que navigateTo lo intentará mostrar si es 'confirmation-screen'
        modalElement.style.display = 'none';
        
    });

    // --- Simulación de Traductor ---
    document.getElementById('translator-mode-screen')?.addEventListener('click', (e) => {
        if (e.target.id !== 'back-from-translator') {
             showConfirmation('Traducción simulada', 'La traducción "¡Necesito un médico de inmediato!" ha sido procesada por la cámara.', '🤟', 'translator-mode-screen');
        }
    });

});