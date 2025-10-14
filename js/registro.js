// Lógica específica para registro
const { createApp, ref, reactive, onMounted, computed } = Vue;

createApp({
    setup() {
        const form = reactive({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            acceptTerms: false
        });
        
        const errors = reactive({});
        const loading = ref(false);
        const formSubmitted = ref(false);
        const passwordStrength = ref('');

        // Obtener el componente global de auth
        const getAuthComponent = () => {
            return document.querySelector('auth-component');
        };

        // Computed para validar contraseñas coincidentes
        const passwordsMatch = computed(() => {
            return form.password === form.confirmPassword && form.password !== '';
        });

        const updatePasswordStrength = () => {
            const password = form.password;
            let strength = 0;
            
            if (password.length >= 8) strength++;
            if (password.match(/[a-z]+/)) strength++;
            if (password.match(/[A-Z]+/)) strength++;
            if (password.match(/[0-9]+/)) strength++;
            if (password.match(/[!@#$%^&*(),.?":{}|<>]/)) strength++;
            
            if (password.length === 0) {
                passwordStrength.value = '';
            } else if (strength <= 2) {
                passwordStrength.value = 'weak';
            } else if (strength <= 4) {
                passwordStrength.value = 'medium';
            } else {
                passwordStrength.value = 'strong';
            }
        };

        const validateForm = () => {
            const authComponent = getAuthComponent();
            
            // Limpiar errores
            Object.keys(errors).forEach(key => errors[key] = '');
            
            let isValid = true;
            
            // Validar nombre
            if (!form.firstName.trim()) {
                errors.firstName = 'El nombre es obligatorio';
                isValid = false;
            } else if (form.firstName.trim().length < 2) {
                errors.firstName = 'El nombre debe tener al menos 2 caracteres';
                isValid = false;
            }
            
            // Validar apellido
            if (!form.lastName.trim()) {
                errors.lastName = 'El apellido es obligatorio';
                isValid = false;
            } else if (form.lastName.trim().length < 2) {
                errors.lastName = 'El apellido debe tener al menos 2 caracteres';
                isValid = false;
            }
            
            // Validar email
            if (!form.email.trim()) {
                errors.email = 'El email es obligatorio';
                isValid = false;
            } else if (!authComponent.isValidEmail(form.email)) {
                errors.email = 'Por favor ingresa un email válido';
                isValid = false;
            }
            
            // Validar contraseña
            const passwordValidation = authComponent.validatePassword(form.password);
            if (!form.password) {
                errors.password = 'La contraseña es obligatoria';
                isValid = false;
            } else if (!passwordValidation.isValid) {
                errors.password = passwordValidation.message;
                isValid = false;
            }
            
            // Validar confirmación de contraseña
            if (!form.confirmPassword) {
                errors.confirmPassword = 'Confirma tu contraseña';
                isValid = false;
            } else if (!passwordsMatch.value) {
                errors.confirmPassword = 'Las contraseñas no coinciden';
                isValid = false;
            }
            
            // Validar términos
            if (!form.acceptTerms) {
                errors.acceptTerms = 'Debes aceptar los términos y condiciones';
                isValid = false;
            }
            
            return isValid;
        };

        const handleRegister = async () => {
            formSubmitted.value = true;
            const authComponent = getAuthComponent();
            
            if (!validateForm()) {
                authComponent.showNotification('❌ Por favor completa todos los campos correctamente', true);
                return;
            }
            
            loading.value = true;
            
            try {
                // Simular registro
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                authComponent.showNotification('✅ ¡Cuenta creada exitosamente! Redirigiendo al login...', false);
                
                // Redirección al login
                setTimeout(() => {
                    window.location.href = '../pages/login.html';
                }, 2000);
                
            } catch (error) {
                authComponent.showNotification('❌ Error al crear la cuenta. Intenta nuevamente.', true);
            } finally {
                loading.value = false;
            }
        };

        const handleGoogleRegister = () => {
            const authComponent = getAuthComponent();
            authComponent.showNotification('Registro con Google en desarrollo', false);
        };

        const goToLogin = () => {
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = '../pages/login.html';
            }, 650);
        };

        // Inicializar partículas
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
            passwordStrength,
            passwordsMatch,
            handleRegister,
            handleGoogleRegister,
            goToLogin,
            updatePasswordStrength
        };
    }
}).mount('#auth-app');