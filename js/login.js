// Define la URL base de tu API de Backend corriendo en el puerto 3001
const API_BASE_URL = 'https://api-pw2-9izd.onrender.com/api/auth'; 

// Lógica específica para login
const { createApp, ref, reactive, onMounted } = Vue;

createApp({
    setup() {
        // ESTADO REACTIVO
        const form = reactive({
            username: '', // En el backend este campo es el 'email'
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

        // ===============================================
        // FUNCIÓN handleLogin MODIFICADA PARA USAR LA API
        // ===============================================
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
                // 1. Preparar los datos que el backend espera
                const loginData = {
                    // El backend espera 'email', pero el frontend usa 'username' para el campo
                    email: form.username, 
                    password: form.password
                };

                // 2. PETICIÓN REAL A LA API
                const response = await fetch(`${API_BASE_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(loginData)
                });
                
                const data = await response.json();

                // 3. Manejo de Errores (400 Bad Request)
                if (!response.ok) {
                    // El Backend debe devolver un JSON con un campo 'msg' para el error
                    const errorMessage = data.msg || 'Error al iniciar sesión. Verifica tus credenciales.';
                    showToast(errorMessage, 'error');
                    
                    // Si el error es de credenciales, lo mostramos en el campo
                    errors.username = errorMessage;
                    
                    return; // Detiene la función aquí si hay error
                }
                
                // 4. ÉXITO (200 OK)
                
                // Aquí deberías guardar el token JWT si tu backend lo devuelve (tarea futura)
                //  <<<<< 🛑 INSERTA ESTA LÍNEA AQUÍ 🛑 >>>>>
                //  Guardar el ID del usuario para que el Dashboard lo use:
               window.AuthService.loadSession({
                 id: data.user.id,
                 nombre: data.user.nombre,
                         // Puedes incluir más datos aquí si tu Backend los devuelve en el login:
                    // avatarURL: data.user.avatar || 'URL_DE_FALLBACK',
                          // level: data.user.level || 1, 
                   });

                       showToast('¡Inicio de sesión exitoso! Redirigiendo...', 'success');

                    // Redirección al dashboard...
                          setTimeout(() => {
                           window.location.href = 'dashboard.html';
                            }, 1000);
                
            } catch (error) {
                console.error("Error de red/conexión:", error);
                // Este catch atrapa errores de red (ej: API apagada)
                showToast('Error de conexión. Asegúrate que la API (puerto 3001) esté activa.', 'error');
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
    // 1. Mostrar un mensaje de progreso
    showToast('Enviando solicitud de recuperación...', 'info', 2000);
    
    // 2. 🛑 Redirigir a una nueva página para el formulario 🛑
    // Asumimos que crearás una página llamada 'olvide-contrasena.html'
    
    // Usamos el efecto de fade out que ya tienes
    document.body.classList.add('fade-out');
    setTimeout(() => {
        // Debes crear este archivo HTML en tu carpeta pages/
        window.location.href = 'olvide-contraseña.html'; 
    }, 650);
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