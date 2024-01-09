<script setup>
    import { useBebidasStore } from '../stores/bebidas';

    const bebidasStore = useBebidasStore();

    defineProps({
        receta: {
            type: Object,
            required: true,
        }
    });
</script>

<template>
    <div class="border shadow-lg">
        <div class="overflow-hidden">
            <img 
                class="hover:scale-110 hover:rotate-3 transition-all"
                :src="receta.strDrinkThumb"
                :alt="[`imagen de la Receta: ${receta.strDrink}`]"
            />
        </div>

        <div class="p-5">
            <h2 class="text-2xl truncate font-extrabold">{{ receta.strDrink }}</h2>

            <button 
                @click="bebidasStore.seleccionarBebida(receta.idDrink)"
                type="button" 
                class="bg-orange-400 hover:bg-orange-500 mt-5 w-full p-3 font-bold text-white text-lg"
            >
                Ver Receta
            </button>
        </div>
    </div>
</template>