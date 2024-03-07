async function fetchDevices() {
    const response = await fetch("/api/get_devices");
    const devices = await response.json();
      
    const dispositivosContainer = document.querySelector('.dispositivos');

    for (const branch in devices) {
        const sucursalDiv = document.createElement('div');
        sucursalDiv.setAttribute("id", branch)
        sucursalDiv.classList.add('sucursal');

        const branchHeader = document.createElement('h3');
        branchHeader.textContent = branch;
        sucursalDiv.appendChild(branchHeader);

        for (const deviceType in devices[branch]) {
            const tipoDispositivoDiv = document.createElement('div');
            tipoDispositivoDiv.classList.add('tipo_dispositivo');

            const deviceTypeHeader = document.createElement('p');
            deviceTypeHeader.classList.add('tipo_dispositivo', 'hover');
            deviceTypeHeader.setAttribute("id", branch+'_'+deviceType)
            deviceTypeHeader.addEventListener('click', agregar);
            deviceTypeHeader.textContent = deviceType;
            tipoDispositivoDiv.appendChild(deviceTypeHeader);
            

            const hostList = document.createElement('ul');
            tipoDispositivoDiv.appendChild(hostList);
 
            for (const host in devices[branch][deviceType]) {
                const hostItem = document.createElement('li');
                hostItem.classList.add('dispositivo', 'hover');
                hostItem.setAttribute("id", branch+'_'+deviceType+'_'+host)
                hostItem.addEventListener('click', agregar);

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