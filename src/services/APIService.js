import axios from "@/lib/axios";

export default {
    obtenerCategorias() {
        return axios.get('/list.php?c=list')
    },
    buscarRecetas({categoria, nombre}) {
        return axios.get(`/filter.php?c=${categoria}&i=${nombre}`);
    },
    buscarReceta(id) {
        return axios.get(`/lookup.php?i=${id}`);
    }
}