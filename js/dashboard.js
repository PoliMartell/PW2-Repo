// js/dashboard.js

const API_BASE_URL = 'http://localhost:3001/api';

const { createApp, ref, reactive, onMounted } = Vue;

createApp({
    setup() {
        // 1. Estado para almacenar los datos
        const userData = reactive({
            nombre: '@UsuarioFan',
            nivel: 0,
            cromosObtenidos: 0,
            progresoAlbum: 0,
            sobresDisponibles: 0,
            intercambios: 0
        });
        const loading = ref(true);

        // 2. Función para obtener el ID del usuario
        // Asumo que guardaste el ID en localStorage durante el login
        const getUserId = () => {
            // Aquí deberías obtener el ID guardado. Ejemplo:
            return localStorage.getItem('currentUserId') || '60c72b1234567890abcdef01'; 
            // Usaremos un ID de ejemplo por ahora
        };

        // 3. Función para hacer la llamada a la API
        const fetchUserData = async () => {
            const userId = getUserId();
            if (!userId) {
                console.error("ID de usuario no encontrado. Redirigiendo a login.");
                window.location.href = 'login.html'; // Redirigir si no hay ID
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
                    headers: {
                        // Si usas JWT, aquí iría el 'Authorization: Bearer <token>'
                    }
                });

                if (!response.ok) {
                    throw new Error('Error al cargar los datos del usuario: ' + response.status);
                }

                const data = await response.json();

                // 4. Actualizar el estado con los datos reales de la API
                userData.nombre = data.nombre || '@UsuarioFan';
                userData.nivel = data.nivel || 1;
                userData.cromosObtenidos = data.cromosObtenidos;
                userData.progresoAlbum = data.progresoAlbum;
                userData.sobresDisponibles = data.sobresDisponibles || 3;
                userData.intercambios = data.intercambios || 12;

            } catch (error) {
                console.error("Fallo al obtener el perfil:", error);
            } finally {
                loading.value = false;
            }
        };

        // 5. Llamar a la función al cargar el componente
        onMounted(() => {
            fetchUserData();
        });

        return { userData, loading };
    }
}).mount('#dashboard-app'); // Asumo que el contenedor principal es #dashboard-app