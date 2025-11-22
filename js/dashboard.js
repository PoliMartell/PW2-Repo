
const API_BASE_URL = 'https://api-pw2-9izd.onrender.com/api';
const TOTAL_CROMOS = 20; // <-- ajusta si tu álbum tiene otro total

const { createApp, ref, reactive, onMounted } = Vue;

createApp({
  setup() {
    const userData = reactive({
      nombre: '@UsuarioFan',
      nivel: 0,
      cromosObtenidos: 0,
      progresoAlbum: 0,
      sobresDisponibles: 0,
      intercambios: 0
    });
    const loading = ref(true);

    // Claves de storage unificadas
    const STORAGE_KEYS = {
      userId: 'currentUserId',
      token: 'jwt'
    };

    const readStorage = () => {
      const id = localStorage.getItem(STORAGE_KEYS.userId);   // debe ser el _id (24 hex)
      const token = localStorage.getItem(STORAGE_KEYS.token); // opcional
      return { id, token };
    };

    // Valida ObjectId
    const isValidObjectId = (s) => typeof s === 'string' && /^[0-9a-fA-F]{24}$/.test(s);

    const fetchUserData = async () => {
      const { id: userId, token } = readStorage();

      if (!isValidObjectId(userId)) {
        console.warn('[Dashboard] ID ausente o inválido en localStorage:', userId);
        // Evita loop si ya estás en login
        if (!location.pathname.includes('login')) {
          window.location.href = 'login.html';
        }
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/usuarios/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          }
        });

        // Manejo explícito de estados
        if (response.status === 401) {
          console.warn('[Dashboard] 401 no autorizado. Redirigiendo a login…');
          window.location.href = 'login.html';
          return;
        }
        if (response.status === 404) {
          console.warn('[Dashboard] 404 usuario no encontrado:', userId);
          // Mantén en la página pero muestra defaults
        }
        if (!response.ok) {
          throw new Error(`Fallo API (${response.status})`);
        }

        const data = await response.json();

        // Nombre (según tu API puede venir como nombre o username)
        userData.nombre = (data?.nombre || data?.username || '@UsuarioFan');

        // Números con coerción para evitar undefined/NaN
        const cromos = Number(data?.cromosObtenidos ?? data?.cromos ?? 0);
        const nivel = Number(data?.nivel ?? 0);
        const sobres = Number(data?.sobresDisponibles ?? data?.sobres ?? 0);
        const interc = Number(data?.intercambios ?? data?.trades ?? 0);

        userData.cromosObtenidos = cromos;
        userData.nivel = nivel;
        userData.sobresDisponibles = sobres;
        userData.intercambios = interc;

        // Si tu API no manda porcentaje, calcúlalo aquí
        const total = Number(data?.totalCromos ?? TOTAL_CROMOS);
        userData.progresoAlbum = total > 0 ? Math.round((cromos / total) * 100) : 0;

        // Si tu HTML muestra "Álbum: NaN%", con esto se corrige.
      } catch (err) {
        console.error('[Dashboard] Error al obtener perfil:', err);
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchUserData);

    return { userData, loading };
  }
}).mount('#dashboard-app');

