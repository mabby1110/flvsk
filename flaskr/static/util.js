let showDivA = true;
let carrito = []

function toggleView(event){
    event.preventDefault();
    const divA = document.getElementById('consola_global');
    const divB = document.getElementById('consola_individual');
    
    showDivA = !showDivA;
    console.log(showDivA)
    divA.classList.toggle('hidden', !showDivA);
    divB.classList.toggle('hidden', showDivA);
}

function loadText(obj, e, id_consola){
    console.log(e)
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
        document.getElementById(id_consola).value = e.target.result;
    }

    reader.readAsText(file);
}

function agregar(event) {
    if (event.target.classList.contains('selected')) {
        console.log(':p', event.target.id.split('_'));
        event.target.classList.remove('selected');
    } else {
        console.log(':p', event.target.id);
        event.target.classList.add('selected');
    }
}