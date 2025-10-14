// Lógica específica para login
const { createApp, ref, reactive, onMounted } = Vue;

createApp({
    setup() {
        const form = reactive({
            username: '',
            password: ''
        });
        
        const errors = reactive({});
        const loading = ref(false);
        const formSubmitted = ref(false);
        
        // Obtener el componente global de auth
        const getAuthComponent = () => {
            return document.querySelector('auth-component');
        };

        const validateForm = () => {
            const authComponent = getAuthComponent();
            errors.username = '';
            errors.password = '';
            
            let isValid = true;
            
            if (!form.username.trim()) {
                errors.username = 'Por favor ingresa tu email';
                isValid = false;
            } else if (!authComponent.isValidEmail(form.username)) {
                errors.username = 'Por favor ingresa un email válido';
                isValid = false;
            }
            
            if (!form.password) {
                errors.password = 'Por favor ingresa tu contraseña';
                isValid = false;
            } else if (form.password.length < 4) {
                errors.password = 'La contraseña debe tener al menos 4 caracteres';
                isValid = false;
            }
            
            return isValid;
        };

        const handleLogin = async () => {
            formSubmitted.value = true;
            const authComponent = getAuthComponent();
            
            if (!validateForm()) {
                authComponent.showNotification('❌ Por favor completa todos los campos correctamente', true);
                return;
            }
            
            loading.value = true;
            
            try {
                // Simular llamada a API
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                authComponent.showNotification('✅ ¡Inicio de sesión exitoso! Redirigiendo...', false);
                
                // Redirección real (descomentar cuando esté lista)
                // setTimeout(() => {
                //     window.location.href = '../pages/dashboard.html';
                // }, 2000);
                
            } catch (error) {
                authComponent.showNotification('❌ Error al iniciar sesión. Intenta nuevamente.', true);
            } finally {
                loading.value = false;
            }
        };

        const handleGoogleLogin = () => {
            const authComponent = getAuthComponent();
            authComponent.showNotification('Inicio con Google en desarrollo', false);
        };

        const handleForgotPassword = () => {
            const authComponent = getAuthComponent();
            authComponent.showNotification('Función de recuperación de contraseña en desarrollo', false);
        };

        const goToRegister = () => {
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = '../pages/registro.html';
            }, 650);
        };

        // Inicializar partículas (código de tu ejemplo)
        const createParticles = () => {
            const container = document.getElementById('particles');
            if (!container) return;
            
            const particleCount = 30;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                const size = Math.random() * 15 + 5;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                particle.style.left = `${posX}%`;
                particle.style.top = `${posY}%`;
                
                const opacity = Math.random() * 0.3 + 0.1;
                particle.style.background = `rgba(255, 255, 255, ${opacity})`;
                
                const delay = Math.random() * 5;
                particle.style.animationDelay = `${delay}s`;
                
                container.appendChild(particle);
            }
        };

        onMounted(() => {
            createParticles();
        });

        return {
            form,
            errors,
            loading,
            formSubmitted,
            handleLogin,
            handleGoogleLogin,
            handleForgotPassword,
            goToRegister
        };
    }
}).mount('#auth-app');