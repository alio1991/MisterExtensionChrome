var actualCode = `

/////////////////////////////////////////////
/////////////////////////////////////////////
//          CLASIFICATION VIEW             //
/////////////////////////////////////////////
/////////////////////////////////////////////

if(document.querySelector(".league-name").innerText === 'Trapis-League' && window.location.href === 'https://mister.mundodeportivo.com/standings'){
    let todos = ['Alio', 'javi c.', 'RauL', 'Dani Sanchez B', 'Ruby', 'Adrian Rodriguez Besoy',
             'Potes', 'Roberto Argaña', 'im mvp', 'Pablo', 'lombra', 'RAGNAR LODBROK']
    let grupoA = ['Alio', 'javi c.', 'RauL']
    let grupoB = ['Dani Sanchez B', 'Ruby', 'Adrian Rodriguez Besoy']
    let grupoC = ['Potes', 'Roberto Argaña', 'im mvp']
    let grupoD = ['RAGNAR LODBROK', 'Pablo', 'lombra']
    let grupos = [grupoA, grupoB, grupoC, grupoD]

    let general = document.querySelector('.panel-total');
    let jugadoresGeneral = general.querySelectorAll('.user-row');
    let jornada = document.querySelector('.panel-gameweek');
    let jugadoresJornada = jornada.querySelectorAll('.user-row');
    
    //LISTAS CON LOS USUARIOS
    let generales = [];
    let jornaderos = [];

    //LISTAS CON LOS GRUPOS
    let imprimirGeneral = [];
    let imprimirJornada = [];


    //CREACION DE LOS OBJETOS DE CADA JUGADOR PARA GENERAL
    jugadoresGeneral.forEach(function(jugador){
        let nombre = jugador.querySelector('.name').querySelector('h2').innerText;
        let valorEquipo = jugador.querySelector('.played').innerText;
        let puntos = (jugador.querySelector('.points').innerText).substr(-30,2).trim();
        let individuo = {'nombre':nombre, 'puntos': puntos, 'valor': valorEquipo};
        generales.push(individuo);
    });

    //CREACION DE LOS OBJETOS DE CADA JUGADOR PARA JORNADA
    jugadoresJornada.forEach(function(jugador){
        let nombre = jugador.querySelector('.name').querySelector('h2').innerText;
        let jugados = (jugador.querySelector('.played').innerText).substr(0,2).trim();
        let puntos = (jugador.querySelector('.points').innerText).substr(-30,2).trim();
        let individuo = {'nombre':nombre, 'puntos': puntos, 'jugados': jugados};
        jornaderos.push(individuo);
    });

    //CREACION DE GRUPOS GENERALES
    grupos.forEach(function(grupo){
        let name = "";
            let points = 0;
            let value = 0;
        grupo.forEach(function(miembro){
            generales.forEach(function(tio){
                if(tio.nombre === miembro){
                    name = name+' - '+tio.nombre;
                    points = points+parseInt(tio.puntos);
                    value = value+parseFloat(tio.valor.substr(0,6));
                }
            });
        });
        imprimirGeneral.push({'nombre':name.substr(3,100), 'puntos': points, 'valor': String(value.toFixed(3))+'.000'});
    });

    //CREACION DE GRUPOS DE JORNADA
    grupos.forEach(function(grupo){
        let name = "";    
        let points = 0;
        let played = 0;
        grupo.forEach(function(miembro){
            jornaderos.forEach(function(tio){
                if(tio.nombre === miembro){
                    name = name+' - '+tio.nombre;
                    points = points+parseInt(tio.puntos);
                    played = played+parseInt(tio.jugados);
                }
            });
        });
        imprimirJornada.push({'nombre':name.substr(3,100), 'puntos': points, 'jugados': String(played)+'/33 jugados'});
    });

    //ORDENACION DE LAS LISTAS
    imprimirGeneral.sort(function(a, b) {
        return (a.puntos - b.puntos);
    });

    imprimirJornada.sort(function(a, b) {
        return (a.puntos - b.puntos);
    });

    //ELIMINACION DE LOS DATOS REALES DE LA WEB
    let ulG = document.querySelectorAll('.user-list')[0];
    ulG.innerText = "";
    let ulJ = document.querySelectorAll('.user-list')[1];
    ulJ.innerText = "";


    //INSERCION DE LOS DATOS POR GRUPOS
    let count = 1;
    imprimirGeneral.forEach(function(elemento){
        general.innerHTML += '<li style="list-style:none; margin:10px;" class=""><div class="user-row"><a class="btn btn-sw-link user" href="" data-title="'+elemento.nombre+'"><div class="position">'+count+'º</div><div class="pic" style="background-color: #FF8A65"><span>'+elemento.nombre.substr(0,1)+'</span></div><div class="name"><h2 class="">'+elemento.nombre+'</h2><div class="played">'+elemento.valor+'</div></div><div class="points">'+elemento.puntos+' <span>pts</span></div></a></div></li>'
        count +=1;
    });

    count = 1;
    imprimirJornada.forEach(function(elemento){
        jornada.innerHTML += '<li style="list-style:none; margin:10px;" class=""><div class="user-row"><a class="btn btn-sw-link user" href="" data-title="'+elemento.nombre+'"><div class="position">'+count+'º</div><div class="pic" style="background-color: #FF8A65"><span>'+elemento.nombre.substr(0,1)+'</span></div><div class="name"><h2 class="">'+elemento.nombre+'</h2><div class="played">'+elemento.jugados+'</div></div><div class="points">'+elemento.puntos+' <span>pts</span></div></a></div></li>'
        count +=1;
    });
    
}
/////////////////////////////////////////////
/////////////////////////////////////////////
//                TEAM VIEW                //
/////////////////////////////////////////////
/////////////////////////////////////////////

let suplentes = [];

if(window.location.href === 'https://mister.mundodeportivo.com/team'){
    let lista = document.querySelector('.player-list');
    let jugadores = lista.querySelectorAll('li');

    //SELECCIONAR Y GUARDAR EN suplentes LOS JUGADORES SUPLENTES
    jugadores.forEach(function(jugador){
        if(jugador.className !== '' && !jugador.className.includes('in-lineup')){
            jugador.style.padding = '3px';
            suplentes.push(jugador);
        }
    });

    //IMPRIMIR LOS JUGADORES
    let ubicacion = document.querySelector('.ad-sidebar');
    ubicacion.innerText="";
    ubicacion.style.listStyle = 'none';
    ubicacion.style.marginTop = '10px';
    ubicacion.style.padding = '3px';
    ubicacion.style.heigth = 'fit-content';
    ubicacion.style.transform = 'scale(0.8)';
    let h2 = document.createElement('h2');
    h2.innerText = 'SUPLENTES';
    h2.style.padding = '5px';
    ubicacion.appendChild(h2);
    suplentes.forEach(function(suplente){
        ubicacion.appendChild(suplente);
    });
}

`;

var script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
script.remove();