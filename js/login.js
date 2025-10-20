// Lógica específica para login
const { createApp, ref, reactive, onMounted } = Vue;

createApp({
    setup() {
        // ESTADO REACTIVO
        const form = reactive({
            username: '',
            password: ''
        });
        
        const errors = reactive({});
        const loading = ref(false);
        const formSubmitted = ref(false);
        const showPassword = ref(false);
        
        // FUNCIONES DE VALIDACIÓN - Usar directamente
        const isValidEmail = (email) => {
            return window.authUtils.isValidEmail(email);
        };

        const showToast = (message, type = 'info', duration = 5000) => {
            window.authUtils.showToast(message, type, duration);
        };

        // VALIDACIÓN DEL FORMULARIO
        const validateForm = () => {
            errors.username = '';
            errors.password = '';
            
            let isValid = true;
            
            if (!form.username.trim()) {
                errors.username = 'Por favor ingresa tu email';
                isValid = false;
            } else if (!isValidEmail(form.username)) {
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

        // TOGGLE PASSWORD VISIBILITY
        const togglePasswordVisibility = () => {
            showPassword.value = !showPassword.value;
        };

        // LOGIN
        const handleLogin = async () => {
            formSubmitted.value = true;
            
            if (!validateForm()) {
                if (errors.username) {
                    showToast('Por favor ingresa un email válido', 'error');
                } else {
                    showToast('Por favor completa todos los campos correctamente', 'error');
                }
                return;
            }
            
            loading.value = true;
            
            try {
                // Simular llamada a API
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Simular diferentes escenarios de error
                const errorScenarios = [
                    { condition: form.password === 'incorrecta', message: 'Contraseña incorrecta', type: 'error' },
                    { condition: form.username === 'noexiste@test.com', message: 'Usuario no encontrado', type: 'error' },
                    { condition: form.username === 'bloqueado@test.com', message: 'Cuenta temporalmente bloqueada', type: 'warning' },
                    { condition: form.username === 'sinverificar@test.com', message: 'Verifica tu email para activar la cuenta', type: 'warning' }
                ];
                
                const errorScenario = errorScenarios.find(scenario => scenario.condition);
                
                if (errorScenario) {
                    showToast(errorScenario.message, errorScenario.type);
                    return;
                }
                
                // Si no hay errores, éxito
                showToast('¡Inicio de sesión exitoso! Redirigiendo...', 'success');
                
                // Aquí iría la redirección real
                // setTimeout(() => {
                //     window.location.href = '../pages/dashboard.html';
                // }, 2000);
                
            } catch (error) {
                showToast('Error de conexión. Intenta nuevamente.', 'error');
            } finally {
                loading.value = false;
            }
        };

        // GOOGLE LOGIN
        const handleGoogleLogin = () => {
            showToast('Inicio con Google en desarrollo', 'info');
        };

        // OLVIDÉ CONTRASEÑA
        const handleForgotPassword = () => {
            showToast('Función de recuperación de contraseña en desarrollo', 'info');
        };

        // IR A REGISTRO
        const goToRegister = (event) => {
            if (event) event.preventDefault();
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = 'registro.html';
            }, 650);
        };

        // INICIALIZAR PARTÍCULAS
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

        // INICIALIZAR
        onMounted(() => {
            createParticles();
        });

        // EXPORTAR AL TEMPLATE
        return {
            form,
            errors,
            loading,
            formSubmitted,
            showPassword,
            handleLogin,
            handleGoogleLogin,
            handleForgotPassword,
            goToRegister,
            togglePasswordVisibility
        };
    }
}).mount('#auth-app');