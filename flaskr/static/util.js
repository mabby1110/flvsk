async function fetchDevices() {
    const response = await fetch("/api/get_devices");
    const devices = await response.json();
    console.log(devices);

    const dispositivosContainer = document.querySelector('.dispositivos');

    for (const branch in devices) {
        const sucursalDiv = document.createElement('div');
        sucursalDiv.setAttribute("id", 'id_'+branch)
        sucursalDiv.classList.add('sucursal');

        const branchHeader = document.createElement('h3');
        branchHeader.textContent = branch;
        sucursalDiv.appendChild(branchHeader);

        for (const deviceType in devices[branch]) {
            const tipoDispositivoDiv = document.createElement('div');
            tipoDispositivoDiv.classList.add('tipo_dispositivo', 'hover');
            tipoDispositivoDiv.setAttribute("id", 'id_'+branch+'_'+deviceType)

            const deviceTypeHeader = document.createElement('p');
            deviceTypeHeader.textContent = deviceType;
            tipoDispositivoDiv.appendChild(deviceTypeHeader);

            const hostList = document.createElement('ul');
            tipoDispositivoDiv.appendChild(hostList);

            for (const host in devices[branch][deviceType]) {
                const hostItem = document.createElement('li');
                hostItem.classList.add('dispositivo', 'hover');
                hostItem.setAttribute("id", 'id_'+branch+'_'+deviceType+'_'+host)

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
fetchDevices()

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

function loadText(obj, e, id_consola){
    console.log(e)
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
        document.getElementById(id_consola).value = e.target.result;
    }

    reader.readAsText(file);
}