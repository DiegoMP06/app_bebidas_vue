<script setup>
    import { useFavoritosStore } from '@/stores/favoritos';
    import Receta from '@/components/Receta.vue';

    const favoritosStore = useFavoritosStore();
</script>

<template>
    <h1 class="text-6xl font-extrabold">Favoritos</h1>

    <p 
        v-if="favoritosStore.noFavoritos"
        class="my-10 text-center text-2xl"
    >
        No Hay Favoritos
    </p>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
        <Receta 
            v-for="receta in favoritosStore.favoritos"
            :key="receta.idDrink"
            :receta="receta"
        />
    </div>
</template>