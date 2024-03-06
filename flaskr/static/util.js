function loadText(obj, e, id_consola){
    console.log(e)
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
        document.getElementById(id_consola).value = e.target.result;
    }

    reader.readAsText(file);
}

function dropDown(obj) {
    // Selecciona todos los elementos div dentro de obj
    const divs = obj.querySelectorAll('div');
    // Itera sobre cada elemento div para cambiar su visibilidad
    divs.forEach(function(div) {
        if (div.style.display === 'none') {
            div.style.display = ''; // Si está oculto, lo muestra
        } else {
            div.style.display = 'none'; // Si está mostrado, lo oculta
        }
    });
}

let showDivA = true;
function toggleView(event){
    event.preventDefault();
    const divA = document.getElementById('consola_global');
    const divB = document.getElementById('consola_individual');
    
    showDivA = !showDivA;
    console.log(showDivA)
    divA.classList.toggle('hidden', !showDivA);
    divB.classList.toggle('hidden', showDivA);
}