import { ref, onMounted, watch, computed } from 'vue';
import {defineStore} from 'pinia';
import { useBebidasStore } from './bebidas';
import {useModalStora} from './modal'
import { useNotificacionStore } from './notificacion';

export const useFavoritosStore = defineStore('favoritos', () => {
    const bebidasStore = useBebidasStore();
    const modalStore = useModalStora();
    const notificacionStore = useNotificacionStore();

    const favoritos = ref([]);

    onMounted(() => {
        favoritos.value = JSON.parse(localStorage.getItem('favoritos')) ?? [];
    });

    watch(favoritos, () => {
        localStorage.setItem('favoritos', JSON.stringify(favoritos.value));
    }, {
        deep: true,
    });

    function handleClickFavoritos() {
        if(existeUsuario(bebidasStore.receta.idDrink)) {
            eliminarFavorito();
        } else {
            agregarFavorito();
        }

        modalStore.handleClickModal();
    }
    function agregarFavorito() {
        favoritos.value = [...favoritos.value, {...bebidasStore.receta}]

        notificacionStore.mostrar = true;
        notificacionStore.texto = 'Se Agrego a Favoritos';
    }

    function eliminarFavorito() {
        favoritos.value = favoritos.value.filter(favorito => favorito.idDrink !== bebidasStore.receta.idDrink);
        
        notificacionStore.mostrar = true;
        notificacionStore.texto = 'Se Elimino de Favoritos';
    }

    function existeUsuario() {
        return favoritos.value.some(favorito => favorito.idDrink === bebidasStore.receta.idDrink);
    }

    const noFavoritos = computed(() => {
        return favoritos.value.length === 0;
    });

    return {
        handleClickFavoritos,
        favoritos,
        existeUsuario,
        noFavoritos
    }
});