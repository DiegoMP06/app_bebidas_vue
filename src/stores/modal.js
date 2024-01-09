import {ref, computed} from 'vue';
import {defineStore} from 'pinia'
import { useBebidasStore } from './bebidas';
import { useFavoritosStore } from './favoritos';

export const useModalStora = defineStore('modal', () => {
    const bebidasStore = useBebidasStore();
    const favoritosStore = useFavoritosStore();
    const modal = ref(false);

    function handleClickModal() {
        modal.value = !modal.value;
    }

    const textoBoton = computed(() => {
        return favoritosStore.existeUsuario() ? 'Eliminar de Favoritos' : 'Agregar a Favoritos';
    });

    return {
        modal,
        handleClickModal,
        textoBoton,
    }
});