// Define la URL base de tu API de Backend corriendo en el puerto 3001
const API_BASE_URL = 'https://api-pw2-9izd.onrender.com/api/auth'; 

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

        // FUNCIONES DE VALIDACIÓN (Asumiendo que window.authUtils existe)
        const isValidEmail = (email) => {
            return window.authUtils.isValidEmail(email);
        };

        const validatePassword = (password) => {
            return window.authUtils.validatePassword(password);
        };

        const showToast = (message, type = 'info', duration = 5000) => {
            return window.authUtils.showToast(message, type, duration);
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

        // VALIDACIÓN DEL FORMULARIO
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

        // ===============================================
        // FUNCIÓN handleRegister MODIFICADA PARA USAR LA API
        // ===============================================
        const handleRegister = async () => {
            formSubmitted.value = true;
            
            if (!validateForm()) {
                showToast('Por favor completa todos los campos correctamente', 'error');
                return;
            }
            
            loading.value = true;
            
            try {
                // 1. Preparar los datos que el backend espera
                const registerData = {
                    email: form.email,
                    password: form.password,
                    // Concatenamos nombre y apellido si tu backend solo espera un campo 'nombre'
                    nombre: `${form.firstName} ${form.lastName}`, 
                    username: form.username 
                };
                
                // Simular subida de foto si existe (ESTA LÓGICA DE FOTO NO USA LA API)
                if (photoFile.value) {
                    showToast('Subiendo foto de perfil...', 'info', 2000);
                    // Aquí iría el código de subida real a la API, pero lo omitimos por ahora para centrarnos en el registro de usuario.
                    await new Promise(resolve => setTimeout(resolve, 1000)); 
                }

                // 2. PETICIÓN REAL A LA API
                const response = await fetch(`${API_BASE_URL}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(registerData)
                });
                
                const data = await response.json();

                // 3. Manejo de Errores (400 Bad Request, 500 Server Error)
                if (!response.ok) {
                    // El Backend debe devolver un JSON con un campo 'msg'
                    const errorMessage = data.msg || 'Error desconocido al registrarse.';
                    showToast(errorMessage, 'error');
                    
                    // Manejar error de email ya registrado
                    if (errorMessage.toLowerCase().includes('email') || errorMessage.toLowerCase().includes('registrado')) {
                         errors.email = errorMessage;
                    }
                    return; // Detiene la función aquí si hay error
                }
                
                // 4. ÉXITO (201 Created)
                showToast('¡Cuenta creada exitosamente! Redirigiendo...', 'success');
                
                // Redirección al login
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 3000);
                
            } catch (error) {
                console.error("Error de red/conexión:", error);
                showToast('Error de conexión. Asegúrate que la API (puerto 3001) esté activa.', 'error');
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
            form, errors, loading, formSubmitted, passwordStrength, usernameStatus, showPassword, showConfirmPassword, photoFile, photoPreview, fileInput, passwordsMatch, 
            handleRegister, handleGoogleRegister, goToLogin, updatePasswordStrength, checkUsernameAvailability, triggerFileInput, handlePhotoUpload, togglePasswordVisibility
        };
    }
}).mount('#auth-app');