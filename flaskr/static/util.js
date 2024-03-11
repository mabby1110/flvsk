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
let carrito = []
let dispositivos_seleccionados = []
let currentThemeIndex = 0;
// temas de la app
const darkTheme = {
    'main-bg': '#1e1e1e', // Color de fondo principal de VS Code
    'component-bg': '#252526', // Color de fondo de componentes en VS Code
    'font': '#D4D4D4', // Color de fuente en VS Code
    'button': '#0E639C', // Color de botones en VS Code
    'bgGreen': 'rgba(0, 128, 0, 0.692)',
    'bgRed': 'rgba(255, 0, 0, 0.692)',
    'debug': 'Snow',
    'info': 'LawnGreen',
    'warn': 'GoldenRod',
    'error': 'LightCoral',
    'selected': '#3A96DD' // Color de selección en VS Code
  };
const lightTheme = {
'main-bg': '#f2f2f2',
'component-bg': '#ffffff',
'font': '#333333',
'button': '#6A5ACD', // Color morado para botones
'bgGreen': 'rgba(0, 128, 0, 0.692)',
'bgRed': 'rgba(255, 0, 0, 0.692)',
'debug': 'DarkSlateBlue',
'info': 'DarkGreen',
'warn': 'DarkGoldenRod',
'error': 'DarkRed',
'selected': '#4169E1' // Color azul para el borde seleccionado
};
const obsidianTheme = {
    'main-bg': 'rgb(10, 5, 40)', // Color principal
    'component-bg': 'rgba(20, 10, 80, 0.8)', // Componentes más oscuros
    'font': '#C8C8C8', // Fuente gris claro
    'button': '#8B7DD1', // Botones en un tono morado
    'bgGreen': 'rgba(0, 128, 0, 0.692)',
    'bgRed': 'rgba(255, 0, 0, 0.692)',
    'debug': '#A9A9A9', // Gris claro para depuración
    'info': '#9370DB', // Morado claro para información
    'warn': '#FFD700', // Amarillo para advertencias
    'error': '#FF6347', // Rojo oscuro para errores
    'selected': '#9370DB' // Morado claro para el borde seleccionado
};
// Array con los temas disponibles
const themes = [darkTheme, obsidianTheme, lightTheme];

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
            
            const deviceTypeHeader = document.createElement('p');
            deviceTypeHeader.classList.add('tipo_dispositivo');
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

// al iniciar
async function fetchDevices() {
    const response = await fetch("/api/get_devices");
    const dispositivos = await response.json();

    createList(dispositivos)
}
fetchDevices()