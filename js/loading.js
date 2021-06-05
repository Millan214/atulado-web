let spinnerWrapper = document.querySelector(".spinner-wrapper")

/**
 * Esto se ejecuta al cargar la página
 */
window.addEventListener('load', () => {
    /**
     * Le pongo un delay de medio segundo porque si le pongo que dure hasta que todo se cargue
     * se podrá ver las imágenes de las tarjetas porque se carga de forma asíncrona
     * */
    setTimeout(() => {spinnerWrapper.style.display = 'none'}, 500);
})