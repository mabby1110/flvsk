let showDivA = true;
let carrito = []
let lista_ejecucion = []

function createList(devices, dispositivosContainer){
    for (const branch in devices) {
        const sucursalDiv = document.createElement('div');
        sucursalDiv.setAttribute("id", branch)
        sucursalDiv.classList.add('sucursal');

        const branchHeader = document.createElement('h5');
        branchHeader.textContent = branch;
        sucursalDiv.appendChild(branchHeader);

        for (const deviceType in devices[branch]) {
            const tipoDispositivoDiv = document.createElement('div');
            tipoDispositivoDiv.classList.add('tipo_dispositivo');

            const deviceTypeHeader = document.createElement('p');
            deviceTypeHeader.classList.add('tipo_dispositivo', 'hover');
            deviceTypeHeader.setAttribute("id", branch+'_'+deviceType)
            deviceTypeHeader.textContent = deviceType;
            tipoDispositivoDiv.appendChild(deviceTypeHeader);
            
            const hostList = document.createElement('div');
            tipoDispositivoDiv.appendChild(hostList);
 
            for (const host in devices[branch][deviceType]) {
                const hostItem = document.createElement('div');
                hostItem.classList.add('dispositivo', 'hover');
                hostItem.setAttribute("id", branch+'_'+deviceType+'_'+host)
                hostItem.addEventListener('click', add_host);

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

                hostList.appendChild(hostItem);
            }

            sucursalDiv.appendChild(tipoDispositivoDiv);
        }
        dispositivosContainer.appendChild(sucursalDiv);
    }
}

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

function loadText(obj, e, id_consola){
    console.log(e)
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
        document.getElementById(id_consola).value = e.target.result;
    }

    reader.readAsText(file);
}

function add_host(event) {
    host = event.target.id.split('_')
    consolas = document.getElementById('consola_individual')
    id = 'consola_'+host[0]+host[1]+host[3]

    // se crea elemento consola
    const contenedor = document.createElement('div');
    contenedor.setAttribute("id", id)
    contenedor.classList.add('consola');

    const branchHeader = document.createElement('p');
    branchHeader.textContent = host;
    contenedor.appendChild(branchHeader);

    // agregar a lista para ejecutar
    if (event.target.classList.contains('selected')) {
        consolas.removeChild(document.getElementById(id))
        event.target.classList.remove('selected');
        lista_ejecucion.pop(host)
        
        console.log('lista unselected', lista_ejecucion);
        
    // eliminar de lista para ejecutar
    } else {
        lista_ejecucion.push(host)
        event.target.classList.add('selected');
        consolas.appendChild(contenedor)

        console.log('lista selected', lista_ejecucion);
    }
}

async function fetchDevices() {
    const dispositivosContainer = document.querySelector('.dispositivos');
    const response = await fetch("/api/get_devices");
    const devices = await response.json();

    createList(devices, dispositivosContainer)
}
fetchDevices()