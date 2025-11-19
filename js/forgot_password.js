const API_BASE_URL = 'http://localhost:3001/api/auth';
const { createApp, ref, reactive, onMounted } = Vue; // 🛑 Importamos onMounted

createApp({
    setup() {
        const form = reactive({ email: '' });
        const loading = ref(false);

        // --- FUNCIONES DE UTILIDAD LOCALES ---

        // Función para volver al login (usada por el enlace en el HTML)
        const goToLogin = (event) => {
            if (event) event.preventDefault();
            // Usar el efecto de fade-out que ya tienes
            document.body.classList.add('fade-out'); 
            setTimeout(() => {
                window.location.href = 'login.html'; 
            }, 650);
        };
        
        // Función de partículas (asumimos que ya existe en tu auth.js o un archivo de utilidades)
        const createParticles = () => {
            const container = document.getElementById('particles');
            if (!container) return;
            const particleCount = 25;
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                const size = Math.random() * 12 + 3;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                particle.style.left = `${posX}%`;
                particle.style.top = `${posY}%`;
                const opacity = Math.random() * 0.2 + 0.05;
                particle.style.background = `rgba(255, 255, 255, ${opacity})`;
                const delay = Math.random() * 5;
                particle.style.animationDelay = `${delay}s`;
                container.appendChild(particle);
            }
        };

        // --- LÓGICA PRINCIPAL DE RECUPERACIÓN ---
        
        const handleRecoveryRequest = async () => {
            if (!form.email || !window.authUtils.isValidEmail(form.email)) {
                window.authUtils.showToast('Por favor, ingresa un email válido.', 'error');
                return;
            }

            loading.value = true;

            try {
                const response = await fetch(`${API_BASE_URL}/forgot-password`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: form.email })
                });

                const data = await response.json();
                
                // Si la respuesta es 200 OK (incluso si el usuario no existe)
                window.authUtils.showToast(data.msg, 'success'); 
                
                // Después de 5 segundos, regresar a login
                setTimeout(() => {
                    goToLogin(); // 🛑 Usamos la función goToLogin definida 🛑
                }, 5000);

            } catch (error) {
                window.authUtils.showToast('Error de conexión con la API.', 'error');
            } finally {
                loading.value = false;
            }
        };

        // --- HOOKS DE VUE ---
        onMounted(() => {
            createParticles(); // Inicializa las partículas al cargar la página
        });
        
        // --- EXPORTACIÓN FINAL ---
        return {
            form,
            loading,
            handleRecoveryRequest,
            goToLogin, // 🛑 Exportamos goToLogin para el HTML 🛑
        };
    }
}).mount('#recovery-app');