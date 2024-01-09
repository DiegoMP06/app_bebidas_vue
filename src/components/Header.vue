<script setup>
    import { computed } from 'vue';
    import { RouterLink, useRoute } from 'vue-router';
    import {useBebidasStore} from '../stores/bebidas';
    import { useNotificacionStore } from '@/stores/notificacion';

    const route = useRoute();
    const bebidasStore = useBebidasStore();
    const notificacionStore = useNotificacionStore();

    const handleSubmit = () => {
        if(Object.values(bebidasStore.busqueda).includes('')) {
            // notificacionStore.mostrar = true;
            // notificacionStore.texto = "Todos los Campos Son Obligatorios"
            // notificacionStore.error = true;

            // notificacionStore.$state = {
            //     texto: "Todos los Campos Son Obligatorios",
            //     mostrar: true,
            //     error: true,
            // };

            notificacionStore.$patch({
                texto: "Todos los Campos Son Obligatorios",
                mostrar: true,
                error: true,
            });
            return;
        }

        bebidasStore.obtenerRecetas();
    }

    const paginaInicio = computed(() => {
        return route.name === 'inicio'
    });
</script>

<template>
    <header class="bg-slate-800" :class="{header: paginaInicio}">
        <div class="mx-auto container px-5 py-16">
            <div class="flex justify-between items-center">
                <div>
                    <RouterLink :to="{name: 'inicio'}">
                        <img src="/img/logo.svg" alt="Logo de App de Bebidad" class="w-32">
                    </RouterLink>
                </div>

                <nav class="flex gap-4 text-white">
                    <RouterLink :to="{name: 'inicio'}" class="uppercase font-bold" active-class="text-orange-500">
                        Inicio
                    </RouterLink>

                    <RouterLink :to="{name: 'favoritos'}" class="uppercase font-bold" active-class="text-orange-500">
                        Favoritos
                    </RouterLink>
                </nav>
            </div>

            <form 
                @submit.prevent="handleSubmit"
                v-if="paginaInicio" 
                class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-1g shadow space-y-6">
                <div class="space-y-4">
                    <label for="ingrediente" class="block text-white uppercase font-extrabold text-lg">
                        Nombre o Ingredientes:
                    </label>

                    <input 
                        v-model="bebidasStore.busqueda.nombre"
                        type="text" 
                        name="ingrediente" 
                        id="ingrediente" 
                        placeholder="Nombre o Ingrediente, Ej: Vodke, Tequila, Etc."
                        class="p-3 w-full rounded-lg focus:outline-none"
                    />
                </div>
                
                <div class="space-y-4">
                    <label for="categoria" class="block text-white uppercase font-extrabold text-lg">
                        Categoria:
                    </label>

                    <select 
                        v-model="bebidasStore.busqueda.categoria"
                        name="categoria" 
                        id="categoria" 
                        class="p-3 w-full rounded-lg focus:outline-none"
                    >
                        <option value="" disabled selected>-- Seleccione --</option>
                        <option 
                            v-for="categoria in bebidasStore.categorias"
                            :key="categoria.strCategory"
                            :value="categoria.strCategory"
                        >{{ categoria.strCategory }}</option>
                    </select>
                </div>

                <input 
                    type="submit" 
                    value="Buscar Recetas" 
                    class="bg-orange-800 hover:bg-orange-900 cursor-pointer text-white font-extrabold w-full p-2 rounded-lg uppercase"
                />
            </form>
        </div>
    </header>
</template>

<style>
    .header {
        background-image: url(/img/bg.jpg);
        background-size: cover;
        background-position: center;
    }
</style>