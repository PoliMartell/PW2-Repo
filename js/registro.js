// Lógica específica para registro
const { createApp, ref, reactive, onMounted, computed } = Vue;

createApp({
    setup() {
        // ESTADO REACTIVO
        const form = reactive({
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            acceptTerms: false
        });
        
        const errors = reactive({});
        const loading = ref(false);
        const formSubmitted = ref(false);
        const passwordStrength = ref('');
        const usernameStatus = reactive({
            checking: false,
            available: false,
            message: '',
            class: ''
        });
        
        // Estado para mostrar/ocultar contraseñas
        const showPassword = ref(false);
        const showConfirmPassword = ref(false);
        
        // Estado para la foto
        const photoFile = ref(null);
        const photoPreview = ref('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiMzMzMiLz4KPHBhdGggZD0iTTQwIDQ0QzQ0LjQxODMgNDQgNDggNDAuNDE4MyA0OCAzNkM0OCAzMS41ODE3IDQ0LjQxODMgMjggNDAgMjhDMzUuNTgxNyAyOCAzMiAzMS41ODE3IDMyIDM2QzMyIDQwLjQxODMgMzUuNTgxNyA0NCA0MCA0NFoiIGZpbGw9IiNmZmZmZmYiLz4KPHBhdGggZD0iTTUyIDUyQzUyIDU3LjUyMjggNDcuNTIyOCA2MiA0MiA2MkMzNi40NzcyIDYyIDMyIDU3LjUyMjggMzIgNTJWMzJINTJWNjJaIiBmaWxsPSIjZmZmZmZmIi8+Cjwvc3ZnPgo=');
        const fileInput = ref(null);

        // FUNCIONES DE VALIDACIÓN
        const isValidEmail = (email) => {
            return window.authUtils.isValidEmail(email);
        };

        const validatePassword = (password) => {
            return window.authUtils.validatePassword(password);
        };

        const showToast = (message, type = 'info', duration = 5000) => {
            window.authUtils.showToast(message, type, duration);
        };

        // MÉTODOS PARA LA FOTO
        const triggerFileInput = () => {
            if (fileInput.value) {
                fileInput.value.click();
            }
        };

        const handlePhotoUpload = (event) => {
            const file = event.target.files[0];
            if (file) {
                // Validar tipo de archivo
                if (!file.type.startsWith('image/')) {
                    showToast('Por favor selecciona una imagen válida', 'error');
                    return;
                }
                
                // Validar tamaño (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    showToast('La imagen debe ser menor a 5MB', 'error');
                    return;
                }
                
                photoFile.value = file;
                
                // Crear preview
                const reader = new FileReader();
                reader.onload = (e) => {
                    photoPreview.value = e.target.result;
                };
                reader.readAsDataURL(file);

                showToast('Foto cargada correctamente', 'success', 3000);
            }
        };

        // TOGGLE PASSWORD VISIBILITY
        const togglePasswordVisibility = (field) => {
            if (field === 'password') {
                showPassword.value = !showPassword.value;
            } else if (field === 'confirmPassword') {
                showConfirmPassword.value = !showConfirmPassword.value;
            }
        };

        // VALIDACIÓN DE USUARIO
        const checkUsernameAvailability = () => {
            if (!form.username || form.username.length < 3) {
                usernameStatus.checking = false;
                usernameStatus.available = false;
                usernameStatus.message = '';
                return;
            }

            usernameStatus.checking = true;
            
            setTimeout(() => {
                const takenUsernames = ['admin', 'user', 'test', 'fifa', 'fanscore'];
                const isAvailable = !takenUsernames.includes(form.username.toLowerCase());
                
                usernameStatus.checking = false;
                usernameStatus.available = isAvailable;
                usernameStatus.message = isAvailable 
                    ? 'Nombre de usuario disponible' 
                    : 'Este usuario ya está en uso';
                usernameStatus.class = isAvailable ? 'username-available' : 'username-taken';
                
                if (!isAvailable) {
                    showToast('Este nombre de usuario no está disponible', 'error', 4000);
                }
            }, 800);
        };

        // FORTALEZA DE CONTRASEÑA
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

        // VALIDACIÓN DE CONTRASEÑAS COINCIDENTES
        const passwordsMatch = computed(() => {
            return form.password === form.confirmPassword && form.password !== '';
        });

        // VALIDACIÓN DEL FORMULARIO - CORREGIDO
        const validateForm = () => {
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
            
            // Validar usuario
            if (!form.username.trim()) {
                errors.username = 'El nombre de usuario es obligatorio';
                isValid = false;
            } else if (form.username.trim().length < 3) {
                errors.username = 'El usuario debe tener al menos 3 caracteres';
                isValid = false;
            } else if (!usernameStatus.available && form.username.length >= 3) {
                errors.username = 'Este nombre de usuario no está disponible';
                isValid = false;
            }
            
            // Validar email
            if (!form.email.trim()) {
                errors.email = 'El email es obligatorio';
                isValid = false;
            } else if (!isValidEmail(form.email)) {
                errors.email = 'Por favor ingresa un email válido';
                isValid = false;
            }
            
            // Validar contraseña
            const passwordValidation = validatePassword(form.password);
            if (!form.password) {
                errors.password = 'La contraseña es obligatoria';
                isValid = false;
            } else if (!passwordValidation.isValid) {
                errors.password = passwordValidation.message;
                isValid = false;
            }
            
            // Validar confirmación de contraseña - CORREGIDO
            if (!form.confirmPassword) {
                errors.confirmPassword = 'Confirma tu contraseña';
                isValid = false;
            } else if (!passwordsMatch.value) { // ✅ Usar .value
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

        // REGISTRO
        const handleRegister = async () => {
            formSubmitted.value = true;
            
            if (!validateForm()) {
                showToast('Por favor completa todos los campos correctamente', 'error');
                return;
            }
            
            loading.value = true;
            
            try {
                // Simular subida de foto si existe
                let photoUrl = '';
                if (photoFile.value) {
                    showToast('Subiendo foto de perfil...', 'info', 2000);
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    photoUrl = 'uploaded/' + photoFile.value.name;
                }
                
                // Simular registro completo
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Simular posibles errores
                if (form.email === 'existente@test.com') {
                    showToast('Este email ya está registrado', 'error');
                    return;
                }
                
                if (form.username === 'admin') {
                    showToast('Este usuario no está disponible', 'error');
                    return;
                }
                
                const userData = {
                    ...form,
                    photo: photoUrl
                };
                
                console.log('Usuario registrado:', userData);
                
                showToast('¡Cuenta creada exitosamente! Bienvenid@ a FanScore.', 'success');
                
                // Redirección al login
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 3000);
                
            } catch (error) {
                showToast('Error al crear la cuenta. Intenta nuevamente.', 'error');
            } finally {
                loading.value = false;
            }
        };

        // GOOGLE REGISTER
        const handleGoogleRegister = () => {
            showToast('Registro con Google en desarrollo', 'info');
        };

        // IR A LOGIN
        const goToLogin = (event) => {
            if (event) event.preventDefault();
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 650);
        };

        // INICIALIZAR PARTÍCULAS
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

        // INICIALIZAR
        onMounted(() => {
            createParticles();
        });

        return {
            form,
            errors,
            loading,
            formSubmitted,
            passwordStrength,
            usernameStatus,
            showPassword,
            showConfirmPassword,
            photoFile,
            photoPreview,
            fileInput,
            passwordsMatch, 
            handleRegister,
            handleGoogleRegister,
            goToLogin,
            updatePasswordStrength,
            checkUsernameAvailability,
            triggerFileInput,
            handlePhotoUpload,
            togglePasswordVisibility
        };
    }
}).mount('#auth-app');