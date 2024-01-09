import { ref, onMounted, reactive, computed } from 'vue';
import {defineStore} from 'pinia';
import APIService from '@/services/APIService';
import {useModalStora} from './modal'

export const useBebidasStore = defineStore('bebidas', () => {
    const modalStore = useModalStora();

    const categorias = ref([]);
    const recetas = ref([]);
    const receta = ref({});
    const busqueda = reactive({
        nombre: '',
        categoria: '',
    });

    onMounted(async function() {
        try {
            const {data: {drinks}} = await APIService.obtenerCategorias();
            categorias.value = drinks;
        } catch (error) {
            console.log(error)
        }
    });

    async function obtenerRecetas() {
        try {
            const {data: {drinks}} = await APIService.buscarRecetas(busqueda);

            recetas.value = drinks;
        } catch (error) {
            console.log(error)
        }
    }

    async function seleccionarBebida(id) {
        try {
            const {data: {drinks: [data]}} = await APIService.buscarReceta(id);
            receta.value = data;
            modalStore.handleClickModal();
        } catch (error) {
            console.log(error)
        }
    }

    const noRecetas = computed(() => {
        return recetas.value.length === 0;
    });

    return {
        categorias,
        busqueda,
        recetas,
        receta,
        obtenerRecetas,
        seleccionarBebida,
        noRecetas,
    }
});