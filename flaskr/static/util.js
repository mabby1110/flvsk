// eventos
const eventoClickDerecho = new MouseEvent('contextmenu', {
    bubbles: true,
    cancelable: true,
    view: window,
    button: 2 // Código para el botón derecho del mouse
});
// variables estaticas
const root = document.documentElement;
const consola_individual = document.getElementById('consola_individual')
const lista_dispositivos = document.getElementById('lista_dispositivos')

// variables de estado
let showDivA = true;
let dispositivos_seleccionados = []
let currentThemeIndex = 0;

// temas de la app
const obsidianTheme = {
    'main-bg': '#38008b', // Color de fondo principal de obsidiana obscuro
    'component-bg': '#1f0050', // Color de fondo de componentes de obsidiana obscuro
    'font': '#f7fab9', // Color de fuente de obsidiana obscuro
    'button': '#32164e', // Color de botones de obsidiana obscuro
    'bgAcepted': 'rgba(0, 128, 0, 0.692)', // Fondo aceptado
    'bgPending': 'rgba(255, 0, 0, 0.692)', // Fondo pendiente
    'bgPRejected': 'rgba(255, 0, 0, 0.692)', // Fondo rechazado
    'debug': 'LightSkyBlue', // Debug
    'info': 'DeepSkyBlue', // Info
    'warn': 'SteelBlue', // Advertencia
    'error': 'DarkSlateGray', // Error
    'selected': '#3A96DD' // Seleccionado
};
const lightTheme = {
    'main-bg': '#F0F4F8', // Color de fondo principal claro
    'component-bg': '#E5E5E5', // Color de fondo de componentes claro
    'font': '#333333', // Color de fuente claro
    'button': '#4A90E2', // Color de botones claro
    'bgAcepted': 'rgba(0, 128, 0, 0.692)', // Fondo aceptado
    'bgPending': 'rgba(255, 0, 0, 0.692)', // Fondo pendiente
    'bgPRejected': 'rgba(255, 0, 0, 0.692)', // Fondo rechazado
    'debug': 'LightSkyBlue', // Debug
    'info': 'DeepSkyBlue', // Info
    'warn': 'SteelBlue', // Advertencia
    'error': 'DarkSlateGray', // Error
    'selected': '#66B2FF' // Seleccionado
};
const darkTheme = {
    'main-bg': '#080808', // Color de fondo principal de obsidiana obscuro
    'component-bg': '#111111', // Color de fondo de componentes de obsidiana obscuro
    'font': '#CCCCCC', // Color de fuente de obsidiana obscuro
    'button': '#2E2E2E', // Color de botones de obsidiana obscuro
    'bgAcepted': 'rgba(0, 128, 0, 0.692)', // Fondo aceptado
    'bgPending': 'rgba(255, 0, 0, 0.692)', // Fondo pendiente
    'bgPRejected': 'rgba(255, 0, 0, 0.692)', // Fondo rechazado
    'debug': 'LightSkyBlue', // Debug
    'info': 'DeepSkyBlue', // Info
    'warn': 'SteelBlue', // Advertencia
    'error': 'DarkSlateGray', // Error
    'selected': '#3A96DD' // Seleccionado
};


// Array con los temas disponibles
const themes = [obsidianTheme, darkTheme, lightTheme];

// Función para cambiar el tema
const switch_theme = document.getElementsByClassName('switch_theme')
function switchTheme() {
    console.log(themes[currentThemeIndex])
    for (const property in themes[currentThemeIndex]) {
        root.style.setProperty(`--${property}`, themes[currentThemeIndex][property]);
    }
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
}
switch_theme[0].addEventListener('click', switchTheme)
switch_theme[1].addEventListener('click', switchTheme)

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
        if (child.classList.contains('code_area')) {
            if(child.classList.contains('hidden')){
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
    event.preventDefault();
    host = event.target

    if (host.classList.contains('selected')) {
        dispositivos_seleccionados.pop(host)
        host.classList.remove('selected');
        consola_individual.removeChild(document.getElementById('div_'+host.id))
        
    } else if (host.classList.contains('consola')){
        id = host.id.replace('div_', '')
        li = document.getElementById(id)
        li.classList.remove('selected');
        dispositivos_seleccionados.pop(id)
        consola_individual.removeChild(document.getElementById('div_'+id))
    }
    console.log('remove', dispositivos_seleccionados, host);
}
function addMultipleHost(event) {
    tipoDispositivo = event.target

    for (const child of tipoDispositivo.children) {
        if (child.classList.contains('dispositivo')){
            if (!child.classList.contains('selected')){
                child.click();
            }
        }
    }
}
function removeMultipleHost(event) {
    event.preventDefault();
    tipoDispositivo = event.target

    for (const child of tipoDispositivo.children) {
        if (child.classList.contains('dispositivo')){
            if (child.classList.contains('selected')){
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

        const sucursalDiv = document.createElement('div');
        sucursalDiv.setAttribute("id", branch)
        sucursalDiv.classList.add('sucursal');

        for (const deviceType in devices[branch]) {
            const tipoDispositivoDiv = document.createElement('div');
            tipoDispositivoDiv.setAttribute("id", branch+'_'+deviceType)
            tipoDispositivoDiv.classList.add('lista_dispositivos', 'hover');
            tipoDispositivoDiv.addEventListener('click', addMultipleHost);
            tipoDispositivoDiv.addEventListener('contextmenu', removeMultipleHost)

            const deviceTypeHeader = document.createElement('p');
            deviceTypeHeader.classList.add('tipo_dispositivo');
            deviceTypeHeader.textContent = deviceType;

            tipoDispositivoDiv.appendChild(deviceTypeHeader);
            
            for (const host in devices[branch][deviceType]) {
                const hostItem = document.createElement('div');
                hostItem.classList.add('dispositivo', 'hover', 'bgRed');
                hostItem.setAttribute("id", branch+'_'+deviceType+'_'+host)
                hostItem.addEventListener('click', addHost);
                hostItem.addEventListener('contextmenu', removeHost)
                
                const hostName = document.createElement('p');
                hostName.textContent = devices[branch][deviceType][host]['info']['host'];
                
                const hostIP = document.createElement('p');
                hostIP.textContent = devices[branch][deviceType][host]['info']['ip'];
                
                hostItem.appendChild(hostName);
                hostItem.appendChild(hostIP);
                
                tipoDispositivoDiv.appendChild(hostItem);
            }
            
            sucursalDiv.appendChild(tipoDispositivoDiv);
        }
        lista_dispositivos.appendChild(branchHeader);
        lista_dispositivos.appendChild(sucursalDiv);
    }
}
function createConsole(host){
    const consolaDiv = document.createElement('div');
    consolaDiv.addEventListener('click', showConsole);
    consolaDiv.addEventListener('contextmenu', removeHost);
    consolaDiv.setAttribute('id', 'div_'+host)
    consolaDiv.classList.add('consola', 'hover');
    
    const consolaTA = document.createElement('textarea')
    consolaTA.setAttribute('id', 'consola_'+host)
    consolaTA.classList.add('hidden', 'code_area')
    
    const consoleHeader = document.createElement('h3');
    consoleHeader.textContent = host;
    
    consolaDiv.appendChild(consoleHeader);
    consolaDiv.appendChild(consolaTA)
    consola_individual.appendChild(consolaDiv)
}

// peticiones al servidor
async function ping(){
    console.log('pingggg')
    for(const s of lista_dispositivos.children){
        if(s.classList.contains('sucursal')){
            for(const td of s.children){
                for(const d of td.children){
                    if(d.classList.contains('dispositivo')){
                        
                        // se cambia el bg para vizualizar el proceso
                        d.style.backgroundColor = "yellow"

                        // hacer ping x host
                        const host = d.id.split('_')
                        
                        const ping = await fetch("/api/ping", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(host),
                        })
                        const x = await ping.json()
                        
                        d.style.backgroundColor = x? "green": "Red"
                    }
                }
            }
        }
    }
}


// al iniciar
async function fetchDevices() {
    const response = await fetch("/api/devices");
    const dispositivos = await response.json();

    createList(dispositivos)
    ping()
}
fetchDevices()