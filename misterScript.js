var actualCode = `


function replaceAll( text, busca, reemplaza ){
    while (text.toString().indexOf(busca) != -1)
        text = text.toString().replace(busca,reemplaza);
    return text;
}

function conPuntos(cadena){
    if(cadena.length < 3){
        return cadena;
    }
    let long = cadena.length-1;
    let res = '';
    for(let i=long; i>=0; i--){
        if(i == (long-6) && i[0] != '-' && cadena[long-6] != '-' ){
            res = '.'+res;
        }
        if(i == (long-3)){
            res = '.'+res;
        }
        res = cadena[i]+res;
    }

    return res;
}
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
/////////////////////////////////////////////
/////////////////////////////////////////////
//                FEED VIEW                //
/////////////////////////////////////////////
/////////////////////////////////////////////

let add = document.querySelector('.ad-content-feed');
if(window.location.href === 'https://mister.mundodeportivo.com/feed'){
    
    let bajada = 0;
    let bottom = document.querySelector('.slideout-panel');
    //CREACION DE BOTON BAJAR
    let top = document.querySelector('.ad-header-feed');
    top.innerText = "";

    let botonBajar = document.createElement('button');
    botonBajar.innerText = '«';
    botonBajar.setAttribute('class', 'btn-post');
    botonBajar.setAttribute('onclick', 'bajar()');
    botonBajar.style.marginRight = '70px';

    bottom.appendChild(botonBajar);

    //CREACION DE BOTON REVISAR
    let botonImprimir = document.createElement('button');
    botonImprimir.innerText = 'Mostrar Transacciones';
    botonImprimir.setAttribute('onclick', 'revisar()');

    top.appendChild(botonImprimir);

    //CREAR BOTON SUBIR
    document.querySelector('.ui-add-big').remove();

    let botonSubir = document.createElement('button');
    botonSubir.innerText = '^';
    botonSubir.setAttribute('onclick', 'subir()');
    botonSubir.setAttribute('class', 'btn-post');
    bottom.appendChild(botonSubir);
    

    function bajar(){
        bajada += 5000;
        window.scrollTo(0, bajada);
    }

    function subir(){
        window.scrollTo(0, 0);
    }

    function revisar(){
        //RECOPILA TRANSACCIONES
        let transacciones = [];
        let titulos = document.querySelectorAll('.title');
        titulos.forEach(function(titulo){
            if(titulo.innerText === 'Nuevas transacciones en el mercado'){
                let fichajes = (titulo.parentNode.parentNode.querySelector('.player-list').childNodes);
                fichajes.forEach(function(fichaje){
                    if(fichaje.innerText !== 'Otras pujas' && fichaje.tagName == 'LI'){
                        // console.log(fichaje);
                        let precio = fichaje.querySelector('.item').querySelector('.player-row').querySelector('.price').innerText;
                        let contenido = fichaje.querySelector('.item').querySelector('.title');
                        let desde = contenido.getElementsByTagName('em')[0].innerText;
                        let hacia = contenido.getElementsByTagName('em')[1].innerText;
                        // console.log('Cambia de '+desde+' a '+hacia+' por '+precio);
                        transacciones.push({'desde':desde,'hacia':hacia,'precio':replaceAll(precio, ".", "")});
                    }
                });
            }
        });

        let todos = ['Alio', 'javi c.', 'RauL', 'Dani Sanchez B', 'Ruby', 'Adrian Rodriguez Besoy',
             'Potes', 'Roberto Argaña', 'im mvp', 'Pablo', 'lombra', 'RAGNAR LODBROK'];
    

        let resultados = [];

        //PINTA TRANSACCIONES
        let div = document.createElement('div');
        add.innerHTML = "";
        todos.forEach(function(nombre){
            let jugador = {'nombre':nombre,'gasto':0};
            transacciones.forEach(function(transaccion){
                if(transaccion.desde === nombre){
                    jugador.gasto = jugador.gasto+parseInt(transaccion.precio);
                    // console.log(transaccion.precio);
                }
                if(transaccion.hacia === nombre){
                    jugador.gasto = jugador.gasto-parseInt(transaccion.precio);
                }
            });
            jugador.gasto = conPuntos(String(jugador.gasto));
            resultados.push(jugador);
        });
        
        let colores = ['#FECDC6', '#E5FEC6']
        let ul = document.createElement('ul');
        ul.style.padding = '20px';
        ul.style.listStyle = 'none';
        div.style.width = '500px';
        let color = 0;
        resultados.forEach(function(elemento){
            let li = document.createElement('li');
            let diva = document.createElement('div');
            diva.style.display = 'flex';
            diva.style.flexDirection = 'row';
            diva.style.justifyContent = 'space-between';
            let spana = document.createElement('span');
            let spanb = document.createElement('span');
            spana.innerText = elemento.nombre;
            spanb.innerText = elemento.gasto;
            diva.appendChild(spana);
            diva.appendChild(spanb);
            li.appendChild(diva);
            
            
            li.style.margin = '5px';
            li.style.color = 'black';
            li.style.backgroundColor = colores[color%2];
            color = color+1;
            ul.appendChild(li);
            div.appendChild(ul);
            div.style.border = '3px solid green';
            div.style.borderRadius = '5px';
        });
        add.appendChild(div);
    }
    
}
`;

var script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
script.remove();