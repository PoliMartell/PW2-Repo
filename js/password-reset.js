// js/password_reset.js

const API_BASE_URL = 'https://api-pw2-9izd.onrender.com/api'; 
const { createApp, ref, onMounted } = Vue;

const resetApp = createApp({
    setup() {
        const password = ref('');
        const confirmPassword = ref('');
        const token = ref(null); // Aquí se guarda el token de la URL
        const loading = ref(false);
        const message = ref('Ingresa tu nueva contraseña.');
        const isError = ref(false);

        const getTokenFromUrl = () => {
            const params = new URLSearchParams(window.location.search);
            const urlToken = params.get('token');
            
            if (!urlToken) {
                isError.value = true;
                message.value = '❌ Token de recuperación no encontrado o inválido.';
            }
            token.value = urlToken;
        };
        
        const cambiarContrasena = async () => {
            if (!token.value || password.value !== confirmPassword.value || password.value.length < 6) {
                isError.value = true;
                message.value = '❌ Las contraseñas no coinciden o son demasiado cortas.';
                return;
            }

            loading.value = true;
            isError.value = false;
            message.value = 'Cambiando contraseña...';

            try {
                // 🛑 LLAMADA AL ENDPOINT 2 🛑
                const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        token: token.value,
                        newPassword: password.value
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    message.value = '🎉 Contraseña cambiada con éxito! Redirigiendo...';
                    setTimeout(() => (window.location.href = 'login.html'), 3000);
                } else {
                    message.value = data.msg || '❌ Error: El token ha expirado o es inválido.';
                    isError.value = true;
                }
            } catch (e) {
                message.value = '❌ Error de conexión con el servidor.';
                isError.value = true;
            } finally {
                loading.value = false;
            }
        };
        
        onMounted(getTokenFromUrl);

        return {
            password, confirmPassword, token, loading, message, isError, cambiarContrasena
        };
    }
});

resetApp.mount('#reset-app');