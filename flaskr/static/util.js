// variables de estado
let showDivA = true;
let carrito = []
let dispositivos_seleccionados = []

// variables estaticas
const consola_individual = document.getElementById('consola_individual')
const lista_dispositivos = document.getElementById('lista_dispositivos')

// eventos
const eventoClickDerecho = new MouseEvent('contextmenu', {
    bubbles: true,
    cancelable: true,
    view: window,
    button: 2 // Código para el botón derecho del mouse
});

// funciones dinamicas
function toggleView(event){
    event.preventDefault();
    const divA = document.getElementById('consola_global');
    const divB = document.getElementById('consola_individual');
    const titulo = document.getElementById('titulo_consola')

    showDivA = !showDivA;
    titulo.innerHTML = showDivA? 'Consola induvidual':'Consola global'
    divB.classList.toggle('hidden', !showDivA);
    divA.classList.toggle('hidden', showDivA);
}
function showConsole(event){
    
    for (const child of event.target.children) {
        if (child.id === 'code_area') {
            console.log(child, child.id)
            if(child.className.split(' ').includes('hidden')){
                child.classList.toggle('hidden', false)
            } else {
                child.classList.toggle('hidden', true)
            }
        }
    }
    // divB.classList.toggle('hidden', !showDivA);
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
function addHost(event) {
    host = event.target.id
    id = 'consola_'+host

    // se crea elemento consola
    const contenedor = document.createElement('div');
    contenedor.setAttribute("id", id)
    contenedor.classList.add('consola');

    const branchHeader = document.createElement('p');
    branchHeader.textContent = host;
    contenedor.appendChild(branchHeader);

    if (!event.target.classList.contains('selected')) {
        dispositivos_seleccionados.push(host)
        event.target.classList.add('selected');
        // consola_individual.appendChild(contenedor)
        createConsole(host)
        
        console.log('add', host, dispositivos_seleccionados)
    }
}
function removeHost(event) {
    host = event.target.id
    id = 'consola_'+host

    if (event.target.classList.contains('selected')) {
        dispositivos_seleccionados.pop(host)
        event.target.classList.remove('selected');
        consola_individual.removeChild(document.getElementById(id))
        
        console.log('remove', host, dispositivos_seleccionados);
    }
}
function addMultipleHost(event) {
    event.preventDefault();
    tipoDispositivo = event.target

    for (const child of tipoDispositivo.children) {
        if (child.className.split(' ').includes('dispositivo')){
            if (!child.className.split(' ').includes('selected')){
                child.click();
            }
        }
    }
}
function removeMultipleHost(event) {
    event.preventDefault();
    tipoDispositivo = event.target

    for (const child of tipoDispositivo.children) {
        if (child.className.split(' ').includes('dispositivo')){
            if (child.className.split(' ').includes('selected')){
                child.dispatchEvent(eventoClickDerecho);
            }
        }
    }
}

// creacion de componentes
function createList(devices){
    for (const branch in devices) {
        const branchHeader = document.createElement('h3');
        branchHeader.textContent = branch;
        lista_dispositivos.appendChild(branchHeader);
        
        const sucursalDiv = document.createElement('div');
        sucursalDiv.setAttribute("id", branch)
        sucursalDiv.classList.add('sucursal');

        for (const deviceType in devices[branch]) {
            const tipoDispositivoDiv = document.createElement('div');
            tipoDispositivoDiv.setAttribute("id", branch+'_'+deviceType)
            tipoDispositivoDiv.classList.add('lista_dispositivos', 'hover');
            tipoDispositivoDiv.addEventListener('click', addMultipleHost);
            tipoDispositivoDiv.addEventListener('contextmenu', removeMultipleHost)

            const deviceTypeHeader = document.createElement('h5');
            deviceTypeHeader.textContent = deviceType;

            tipoDispositivoDiv.appendChild(deviceTypeHeader);
            
            for (const host in devices[branch][deviceType]) {
                const hostItem = document.createElement('div');
                hostItem.classList.add('dispositivo', 'hover');
                hostItem.setAttribute("id", branch+'_'+deviceType+'_'+host)
                hostItem.addEventListener('click', addHost);
                hostItem.addEventListener('contextmenu', removeHost)
                
                if (devices[branch][deviceType][host]['conn']) {
                    hostItem.classList.add('bgGreen');
                } else {
                    hostItem.classList.add('bgRed');
                }
                
                const hostName = document.createElement('p');
                hostName.textContent = devices[branch][deviceType][host]['info']['host'];
                hostItem.appendChild(hostName);
                
                const hostIP = document.createElement('p');
                hostIP.textContent = devices[branch][deviceType][host]['info']['ip'];
                hostItem.appendChild(hostIP);

                tipoDispositivoDiv.appendChild(hostItem);
            }

            sucursalDiv.appendChild(tipoDispositivoDiv);
        }
        lista_dispositivos.appendChild(sucursalDiv);
    }
}
function createConsole(host){
    
    const consolaDiv = document.createElement('div');
    consolaDiv.setAttribute("id", 'consola_'+host)
    consolaDiv.addEventListener('click', showConsole);
    consolaDiv.classList.add('consola');
    
    const consolaTA = document.createElement('textarea')
    consolaTA.setAttribute('id', 'code_area')
    consolaTA.classList.add('hidden')
    
    const consoleHeader = document.createElement('h3');
    consoleHeader.textContent = host;
    
    consolaDiv.appendChild(consoleHeader);
    consolaDiv.appendChild(consolaTA)
    consola_individual.appendChild(consolaDiv)
}

// al iniciar
async function fetchDevices() {
    const response = await fetch("/api/get_devices");
    const dispositivos = await response.json();

    createList(dispositivos)
}
fetchDevices()