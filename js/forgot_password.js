const API_BASE_URL = 'http://localhost:3001/api'; // 🛑 Ajusta esta URL si es diferente

const { createApp, reactive, ref } = Vue;

const recoveryApp = createApp({
    setup() {
        const form = reactive({
            email: ''
        });
        const loading = ref(false);
        const message = ref(null);
        const isError = ref(false);

        // --- MANEJO DE TOASTS ---
        // Usaremos una función simple para mostrar mensajes de éxito/error
        const showMessage = (msg, isErr = false) => {
            message.value = msg;
            isError.value = isErr;
            // Opcional: limpiar mensaje después de un tiempo
            setTimeout(() => {
                message.value = null;
                isError.value = false;
            }, 6000); 
        };

        // --- FUNCIÓN PRINCIPAL DE RECUPERACIÓN ---
        const handleRecoveryRequest = async () => {
            if (!form.email || !form.email.includes('@')) {
                showMessage('Por favor, ingresa un correo electrónico válido.', true);
                return;
            }

            loading.value = true;
            message.value = null; // Limpiar mensajes anteriores

            try {
                // 🛑 ENDPOINT: Solicitar Token 
                const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: form.email })
                });

                const data = await response.json();

                if (response.ok) {
                    // Éxito: Aunque el email no exista, mostramos éxito por seguridad
                    showMessage('✅ Solicitud enviada. Revisa tu email (y carpeta de spam).', false);
                    form.email = ''; // Limpiar campo
                } else {
                    // Error: Puede ser un error 404 (usuario no encontrado) o 500
                    const msg = data.msg || 'Error al procesar la solicitud. Inténtalo de nuevo.';
                    showMessage(`❌ ${msg}`, true);
                }
            } catch (error) {
                console.error('Error de conexión:', error);
                showMessage('❌ No se pudo conectar con el servidor. Verifica tu red.', true);
            } finally {
                loading.value = false;
            }
        };

        const goToLogin = () => {
            window.location.href = 'login.html';
        };

        return {
            form,
            loading,
            message,
            isError,
            handleRecoveryRequest,
            goToLogin
        };
    }
});

// Monta la aplicación en el contenedor #recovery-app
recoveryApp.mount('#recovery-app');