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

let todos = ['Alio', 'javi c.', 'RauL', 'Potes', 'im mvp', 'Pablo', 'Leandro', 'Alles F.C']
let grupoA = ['Alio', 'RauL']
let grupoB = ['Leandro', 'Pablo']
let grupoC = ['Potes', 'im mvp']
let grupoD = ['javi c.', 'Alles F.C']
let grupos = [grupoA, grupoB, grupoC, grupoD]


let transaccionesTotales = [];
let select = document.createElement("select");  
/////////////////////////////////////////////
/////////////////////////////////////////////
//          CLASIFICATION VIEW             //
/////////////////////////////////////////////
/////////////////////////////////////////////

if(document.querySelector(".league-name").innerText === 'Yogures 20/21' && window.location.href === 'https://mister.mundodeportivo.com/standings'){
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
        let nombre = jugador.querySelector('.info').querySelector('.name').innerText;
        let valorEquipo = jugador.querySelector('.info').querySelector('.played').innerText;
        // let pointIndex = jugador.querySelector('.info').querySelector('.points').innerText.match(/\s/).index-3;
        let puntos = jugador.querySelector('.points').innerText;
        // .substr(0,pointIndex).trim()
        let individuo = {'nombre':nombre, 'puntos': puntos, 'valor': valorEquipo};
        generales.push(individuo);
    });

    //CREACION DE LOS OBJETOS DE CADA JUGADOR PARA JORNADA
    jugadoresJornada.forEach(function(jugador){
        jugador = jugador.querySelector('a');
        let nombre = jugador.querySelector('.info').querySelector('.name').innerText;
        let jugados;
        if(jugador.querySelector('.info').querySelector('.played') !== null){
            jugados = (jugador.querySelector('.played').innerText).substr(0,2).trim();
        }
        let puntos = (jugador.querySelector('.points').innerText).substr(-30,3).trim();
        let individuo = {'nombre':nombre, 'puntos': puntos, 'jugados': jugados};
        jornaderos.push(individuo);
    });

    //CREACION DE GRUPOS GENERALES
    grupos.forEach(function(grupo){
        let name = "";
            let points = 0;
            let value = 0;
            let jugadores = 0;
        grupo.forEach(function(miembro){
            generales.forEach(function(tio){
                if(tio.nombre === miembro){
                    indexValue = tio.valor.indexOf('jug.');
                    name = name+' - '+tio.nombre;
                    points = points+parseInt(tio.puntos);
                    value = value+parseInt(replaceAll(tio.valor.substr(indexValue+7), ".", ""));
                    jugadores = jugadores + parseInt(replaceAll(tio.valor.substr(0,indexValue), ".", ""));
                }
            });
        });

        imprimirGeneral.push({'nombre':name.substr(3,100), 'puntos': points, 'valor': 
        'jugadores: '+jugadores+' . '+conPuntos(String(value))});
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
        return (b.puntos - a.puntos);
    });

    imprimirJornada.sort(function(a, b) {
        return (b.puntos - a.puntos);
    });

    //ELIMINACION DE LOS DATOS REALES DE LA WEB
    // let ulG = document.querySelectorAll('.user-list')[0];
    // ulG.innerText = "";
    let generalPosition = document.querySelectorAll('.user-list')[1];
    generalPosition.innerText = "";


    //INSERCION DE LOS DATOS POR GRUPOS
    // let generalPosition = document.querySelector('.ad-content-standings');
    generalPosition.innerText = "";
    generalPosition.setAttribute('class','panels');
    generalPosition.setAttribute('class','panels-standings');
    let title = document.createElement('h2');
    title.style.marginLeft = '30px';
    title.style.paddingTop = '20px';
    title.innerText = 'CLASIFICACIÓN GENERAL';
    generalPosition.appendChild(title);
    let count = 1;
    imprimirGeneral.forEach(function(elemento){
        generalPosition.innerHTML += '<li style="list-style:none; margin:10px; padding:5px;" class=""><div class="user-row"><a class="btn btn-sw-link user" href="" data-title="'+elemento.nombre+'"><div class="position">'+count+'º</div><div class="pic" style="background-color: #FF8A65; margin-right: 20px;"><span>'+elemento.nombre.substr(0,1)+'</span></div><div class="name"><h2 class="">'+elemento.nombre+'</h2><div class="played">'+elemento.valor+'</div></div><div class="points">'+elemento.puntos+' <span>pts</span></div></a></div></li>'
        count +=1;
    });
    let titleJornada = document.createElement('h2');
    titleJornada.style.marginLeft = '30px';
    titleJornada.style.paddingTop = '20px';
    titleJornada.innerText = 'CLASIFICACIÓN DE JORNADA';
    generalPosition.appendChild(titleJornada);
    count = 1;
    imprimirJornada.forEach(function(elemento){
        jornada.innerHTML += '<li style="list-style:none; margin:10px; padding:5px;" class=""><div class="user-row"><a class="btn btn-sw-link user" href="" data-title="'+elemento.nombre+'"><div class="position">'+count+'º</div><div class="pic" style="background-color: #FF8A65; margin-right: 20px;"><span>'+elemento.nombre.substr(0,1)+'</span></div><div class="name"><h2 class="">'+elemento.nombre+'</h2><div class="played">'+elemento.jugados+'</div></div><div class="points">'+elemento.puntos+' <span>pts</span></div></a></div></li>'
        count +=1;
    });
    
}
/////////////////////////////////////////////
/////////////////////////////////////////////
//                TEAM VIEW                //
/////////////////////////////////////////////
/////////////////////////////////////////////

let suplentes = [];
let titulares = [];
if(window.location.href === 'https://mister.mundodeportivo.com/team'){
    let lista = document.querySelector('.player-list');
    let jugadores = lista.querySelectorAll('li');

    //SELECCIONAR Y GUARDAR EN suplentes LOS JUGADORES SUPLENTES
    jugadores.forEach(function(jugador){
        if(jugador.className !== '' && !jugador.className.includes('in-lineup')){
            jugador.style.padding = '3px';
            suplentes.push(jugador);
        }
        if(jugador.className !== '' && jugador.className.includes('in-lineup')){
            jugador.style.padding = '3px';
            titulares.push(jugador);
        }
    });

    let contenido = document.querySelector('#content');

    //IMPRIMIR LOS JUGADORES SUPENTES
    let ubicacion = document.createElement('div');
    ubicacion.style.position = 'absolute';
    ubicacion.style.top = '200px';
    ubicacion.style.left = '0';
    contenido.appendChild(ubicacion);
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

    //IMPRIMIR LOS JUGADORES TITULARES
    let ubicacionx = document.createElement('div');
    ubicacionx.style.position = 'absolute';
    ubicacionx.style.top = '100px';
    ubicacionx.style.right = '0';
    contenido.appendChild(ubicacionx);
    ubicacionx.innerText="";
    // ubicacionx.style.position = 'absolute';
    // ubicacionx.style.right = '100%';
    // ubicacionx.style.top = '-5%';
    ubicacionx.style.zIndex = '10';
    ubicacionx.style.display = 'flex';
    ubicacionx.style.flexDirection = 'column';
    ubicacionx.style.listStyle = 'none';
    ubicacionx.style.marginTop = '10px';
    ubicacionx.style.padding = '3px';
    ubicacionx.style.heigth = 'fit-content';
    ubicacionx.style.transform = 'scale(0.8)';
    let h22 = document.createElement('h2');
    h22.innerText = 'TITULARES';
    h22.style.padding = '5px';
    ubicacionx.appendChild(h22);
    titulares.forEach(function(suplente){
        ubicacionx.appendChild(suplente);
    });


    //CREACION DE BOTON Quitar venta y Poner Venta
    let container = document.querySelector('.slideout-panel');
    
    let botonAlternar = document.createElement('button');
    botonAlternar.innerText = 'Quitar/Poner Venta todos';
    botonAlternar.setAttribute('class', 'offerOrLeaveMarket');
    botonAlternar.setAttribute('onclick', 'alternar()');
    botonAlternar.style.marginRight = '70px';
    botonAlternar.style.backgroundColor = '#1bd171';
    botonAlternar.style.border = '2px solid black';
    botonAlternar.style.borderRadius = '5px';
    botonAlternar.style.padding = '3px';
    botonAlternar.style.position = 'absolute';
    botonAlternar.style.left = '85%';
    botonAlternar.style.top = '15%';
    botonAlternar.style.zIndex = '100';
    container.appendChild(botonAlternar);

    function alternar(){
        let botonesJugador = document.querySelectorAll('.btn-sale');
        botonesJugador.forEach(function(boton){
            boton.click();
            let botonSecundario = document.querySelectorAll('#btn-send')[0];
            botonSecundario.click();
        });
    }

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
    // top.innerText = "";

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
    botonImprimir.style.backgroundColor = '#1bd171';
    botonImprimir.style.border = '2px solid black';
    botonImprimir.style.borderRadius = '5px';
    botonImprimir.style.padding = '3px';

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
                        transaccionesTotales.push(fichaje);
                        transacciones.push({'desde':desde,'hacia':hacia,'precio':replaceAll(precio, ".", "")});
                    }
                });
            }
        });

        //RECOPILA CANCELADOS
        let cancelados = [];
        let cancel = document.querySelectorAll('.card-transfers_cancelled');
        cancel.forEach(function(cancelado){
            let transacciones = cancelado.querySelector('.transfers').querySelectorAll('li');
            transacciones.forEach(function(transaccion){
                let iDesde = transaccion.innerText.indexOf(', fichaje de ')+13;
                let fDesde = transaccion.innerText.indexOf(' por ');
                let iPrecio = transaccion.innerText.indexOf(' por ')+5;
                let fPrecio = transaccion.innerText.indexOf(', vuelve a ');
                let iHacia = transaccion.innerText.indexOf(', vuelve a ')+11;

                let precio = transaccion.innerText.substr(iPrecio,(fPrecio-iPrecio));
                let desde = transaccion.innerText.substr(iDesde,(fDesde-iDesde));
                let hacia = transaccion.innerText.substr(iHacia);
                // console.log('Cambia de '+desde+' a '+hacia+' por '+precio);
                cancelados.push({'desde':desde,'hacia':hacia,'precio':replaceAll(precio, ".", "")});
            });
        });


        //RECOPILA PAGOS JORNADA
        let pagosJornada = [];
        let jornadas = document.querySelectorAll('.card-gameweek_end > .user-list');
        jornadas.forEach(function(jornada){
            let transacciones = jornada.querySelectorAll('li');
            transacciones.forEach(function(transaccion){
                let uno = transaccion.querySelector('#feed-170340262 > ul > li > div > a > div.name');
                // console.log(uno);
                if(uno !== null){
                    let nombre = uno.querySelector('h3').innerText;
                    let pago = uno.querySelector('div').innerText;
                    // console.log(nombre+' --> '+pago);
                    pagosJornada.push({'nombre':nombre,'dinero':replaceAll(pago, ".", "")});
                }
            });
        });



        let resultados = [];

        //PINTA TRANSACCIONES
        let div = document.createElement('div');
        add.innerHTML = "";
        todos.forEach(function(nombre){
            let jugador = {'nombre':nombre,'gasto':0};
            //CUENTAS DE TRANSACCIONES
            transacciones.forEach(function(transaccion){
                if(transaccion.desde === nombre){
                    jugador.gasto = jugador.gasto+parseInt(transaccion.precio);
                }
                if(transaccion.hacia === nombre){
                    jugador.gasto = jugador.gasto-parseInt(transaccion.precio);
                }
            });
            //CUENTAS DE CANCELACIONES
            cancelados.forEach(function(transaccion){
                if(transaccion.desde === nombre){
                    jugador.gasto = jugador.gasto+parseInt(transaccion.precio);
                }
                if(transaccion.hacia === nombre){
                    jugador.gasto = jugador.gasto-parseInt(transaccion.precio);
                }
            });
            //CUENTAS DE PAGOS JORNADA
            pagosJornada.forEach(function(transaccion){
                if(transaccion.nombre === nombre){
                    jugador.gasto = jugador.gasto+parseInt(transaccion.dinero);
                }
            });
            jugador.gasto = conPuntos(String(jugador.gasto));
            resultados.push(jugador);
        });

        
        //ORDENACION DE LOS RESULTADOS
        resultados.sort(function(a, b) {
            replaceAll(a, ".", "")
            return (replaceAll(a.gasto, ".", "") - replaceAll(b.gasto, ".", ""));
        });
        
        let colores = ['#FECDC6', '#E5FEC6']
        let ul = document.createElement('ul');
        let ulEquipos = document.createElement('ul');
        ulEquipos.style.padding = '20px';
        ulEquipos.style.listStyle = 'none';
        ul.style.padding = '20px';
        ul.style.listStyle = 'none';
        div.style.width = '500px';
        let color = 0;
        let h2 = document.createElement('h2');
        h2.innerText = '   GASTOS INDIVIDUALES';
        ul.appendChild(h2);
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

        if(document.querySelector(".league-name").innerText === 'Yogures 20/21' && window.location.href === 'https://mister.mundodeportivo.com/feed'){

            //POR GRUPOS
            let resultadoPorGrupos = [];
            grupos.forEach(function(grupo){
                let name = "";
                let pasta = 0;
                grupo.forEach(function(miembro){
                    resultados.forEach(function(tio){
                        if(tio.nombre === miembro){
                            name = name+' - '+tio.nombre;
                            pasta = pasta+parseInt(replaceAll(tio.gasto, ".", ""));
                        }
                    });
                });
                resultadoPorGrupos.push({'nombre':name.substr(3,100), 'gasto': conPuntos(String(pasta))});
            });
            
            //ORDENACION DE LOS RESULTADOS POR GRUPOS
            resultadoPorGrupos.sort(function(a, b) {
                replaceAll(a, ".", "")
                return (replaceAll(a.gasto, ".", "") - replaceAll(b.gasto, ".", ""));
            });



            let h22 = document.createElement('h2');
            h22.innerText = '    GASTOS POR EQUIPO';
            ulEquipos.appendChild(h22);
            resultadoPorGrupos.forEach(function(elemento){
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
                ulEquipos.appendChild(li);
                div.appendChild(ulEquipos);
                div.style.border = '3px solid green';
                div.style.borderRadius = '5px';
            });
            add.appendChild(div);

            
            }
            //ELEMENTO BUSCAR TRANSACCIONES JUGADOR
            let wraper = document.querySelector('.wrapper');

            
            if(wraper.querySelector('.resultadosFiltro') == null){
                select.setAttribute('id','seleccion');
                todos.forEach(function(tio){
                    let entrada = document.createElement("option");
                    entrada.setAttribute('value',tio);
                    entrada.innerText = tio;
                    select.appendChild(entrada);
                });

                let hijos = wraper.children

                let boton = document.createElement('button'); 
                boton.innerText = 'Buscar';
                boton.setAttribute('onclick','setSelect()');
                boton.style.backgroundColor = '#1bd171';
                boton.style.border = '2px solid black';
                boton.style.borderRadius = '5px';
                boton.style.padding = '3px';
                let res = document.createElement('div'); 
                let busquedaTransaccionesJugador = document.createElement("div");
                let caja = document.createElement("div");
                caja.style.display = 'flex';
                caja.style.flexDirection = 'row';
                caja.setAttribute('class','caja');
                busquedaTransaccionesJugador.style.position = 'absolute';
                busquedaTransaccionesJugador.style.left = '-55%';
                busquedaTransaccionesJugador.style.top = '50px';
                busquedaTransaccionesJugador.style.width = '300px';
                
                
                busquedaTransaccionesJugador.setAttribute('class','resultadosFiltro');
                caja.appendChild(select);
                caja.appendChild(boton);
                busquedaTransaccionesJugador.appendChild(caja);
                let cajaRes = document.createElement("div");
                cajaRes.appendChild(res);
                cajaRes.setAttribute('class','cajaRes');
                cajaRes.style.listStyle = 'none';
    
                busquedaTransaccionesJugador.appendChild(cajaRes);
                wraper.appendChild(busquedaTransaccionesJugador);
        }
        
    }
    showClausulas();
}

function showClausulas(){
    let wraper = document.querySelector('.wrapper');
    let botonCalcular = document.createElement('button'); 
    botonCalcular.innerText = 'Calcular';
    botonCalcular.setAttribute('onclick','calculaClausula(this)');
    botonCalcular.style.backgroundColor = '#1bd171';
    botonCalcular.style.border = '2px solid black';
    botonCalcular.style.borderRadius = '5px';
    botonCalcular.style.padding = '3px';

    let inputValor = document.createElement('input'); 
    inputValor.style.border = '2px solid black';
    inputValor.style.borderRadius = '5px';
    inputValor.style.padding = '5px';
    inputValor.setAttribute('placeHolder','Valor máximo del jugador');
    inputValor.setAttribute('class','valor');
    let inputClausula = document.createElement('input'); 
    inputClausula.style.border = '2px solid black';
    inputClausula.style.borderRadius = '5px';
    inputClausula.setAttribute('placeHolder','Valor de su clausula');
    inputClausula.setAttribute('class','clausula');
    inputClausula.style.padding = '5px';


    let pregunta = document.createElement("div");
    let respuesta = document.createElement('div');
    respuesta.setAttribute('class','respuestaClausula');

    pregunta.appendChild(inputValor);
    pregunta.appendChild(inputClausula);
    pregunta.appendChild(botonCalcular);
    respuesta.style.paddingTop = '20px';

    
    let contenedorClausula = document.createElement("div");
    contenedorClausula.style.display = 'flex';
    contenedorClausula.style.flexDirection = 'column';
    contenedorClausula.setAttribute('class','clausula');
    contenedorClausula.style.position = 'absolute';
    contenedorClausula.style.left = '105%';
    contenedorClausula.style.top = '50px';
    contenedorClausula.style.width = '300px';
    
    contenedorClausula.appendChild(pregunta);
    contenedorClausula.appendChild(respuesta);

    wraper.appendChild(contenedorClausula);
}

function calculaClausula(ev){
    let valor = parseInt(ev.parentElement.querySelector('.valor').value);
    let clausula = parseInt(ev.parentElement.querySelector('.clausula').value);
    let solucion = ev.parentElement.querySelector('.respuestaClausula');
    let cont = document.querySelector('.respuestaClausula');
    if(valor > clausula){
        alert('La clausula no puede ser menor al valor');
    }else{
        let valorPorEscalon = valor/2;
        let costeSubidaEscalon = valor/5;
        let escalonesSubidos = -1;

        //CALCULA ESCALONES
        if(clausula < (valor+valorPorEscalon+500000)){
            escalonesSubidos = 0;
        }else{
            for(let i=valor; i<clausula; i = i+valorPorEscalon+100000){
                escalonesSubidos++;
            }
        }
        let dineroGastado = escalonesSubidos*costeSubidaEscalon;

        costeSubidaEscalon = conPuntos(costeSubidaEscalon.toString());
        escalonesSubidos = escalonesSubidos.toString();
        dineroGastado = conPuntos(dineroGastado.toString());

        //ESCRIBIR RESULTADOS
        // console.log('Coste de subida de escalon: '+costeSubidaEscalon);
        // console.log('Escalones subidos: '+escalonesSubidos);
        // console.log('Dinero Gastado: '+dineroGastado);
        let subida = document.createElement('h3');
        subida.innerText = 'Coste de subida de escalon: '+costeSubidaEscalon;
        let escalon = document.createElement('h3');
        escalon.innerText = 'Escalones subidos: '+escalonesSubidos;
        let pasta = document.createElement('h3');
        pasta.innerText = 'Dinero Gastado: '+dineroGastado;
        cont.appendChild(subida);
        cont.appendChild(escalon);
        cont.appendChild(pasta);
    }
}


function setSelect(){
    let contenedor = document.querySelector('.resultadosFiltro').querySelector('.cajaRes');
    contenedor.innerHTML = '';
    transaccionesTotales.forEach(function(transaccion){
        let contenido = transaccion.querySelector('.item').querySelector('.title');
        let comprador = contenido.getElementsByTagName('em')[1].innerText;
        if(comprador == select.value){
            transaccion.style.transform = 'scale(0.9)';
            transaccion.style.margin = '5px';
            contenedor.appendChild(transaccion);
        }
    });
}

/////////////////////////////////////////////
/////////////////////////////////////////////
//               MARKET VIEW               //
/////////////////////////////////////////////
/////////////////////////////////////////////

if(window.location.href === 'https://mister.mundodeportivo.com/market'){
    let cont = document.querySelector('#content');
    let add = document.createElement('div');
    cont.appendChild(add);
    add.style.marginLeft = '20px';
    add.style.position = 'absolute';
    add.style.top = '200px';
    add.style.right = '0';

    add.innerText = "";
    let jugadoresEnVenta = document.querySelector('#list-on-sale').querySelectorAll('li');
    // console.log(jugadoresEnVenta);
    let jugadoresPujados = [];

    jugadoresEnVenta.forEach(function(jugador){
        jugador.style.listStyle = 'none';
        add.style.marginTop = '60px';
        if(jugador.classList.length > 0 && jugador.querySelector('.header').querySelector('.date').querySelector('strong').innerText != 'Alio'){
            if(jugador.querySelector('.player-row').querySelector('.player-btns').querySelector('.btn-bid').classList.contains('btn-green')){
                jugadoresPujados.push(jugador);
            }
        }
        
    });

    let h2 = document.createElement('h2');
    h2.innerText = 'PUJAS ACTIVAS';
    h2.style.marginBottom = '10px';
    h2.style.color = 'red';
    add.appendChild(h2);
    jugadoresPujados.forEach(function(jugador){
        add.appendChild(jugador);
    });
}


/////////////////////////////////////////////
/////////////////////////////////////////////
//               PLAYER VIEW               //
/////////////////////////////////////////////
/////////////////////////////////////////////

if(window.location.href.includes('https://mister.mundodeportivo.com/standings#players/') || window.location.href.includes('https://mister.mundodeportivo.com/team#players/')){
    let superficie = document.querySelector('body');
    
    let botonClausulas = document.createElement('button'); 
    botonClausulas.innerText = 'Mostrar valor clausulas';
    botonClausulas.setAttribute('onclick','incrustaClausulas()');
    botonClausulas.style.backgroundColor = '#1bd171';
    botonClausulas.style.border = '2px solid black';
    botonClausulas.style.borderRadius = '5px';
    botonClausulas.style.padding = '3px';
    botonClausulas.style.position = 'absolute';
    botonClausulas.style.left = '85%';
    botonClausulas.style.top = '20%';
    botonClausulas.style.zIndex = '99999';
    superficie.appendChild(botonClausulas);
}

function incrustaClausulas(){
    let barra = document.querySelector('.profile-player').querySelector('.wrapper').querySelector('.numbers').querySelector('.items');
    let valor = barra.querySelectorAll('.item')[0].querySelector('.value').innerText;
    let clausula = barra.querySelectorAll('.item')[1].querySelector('.value').innerText;
    let compradoPorClausula = document.querySelector("body > div.sw > div.sw-content > div.wrapper.sw-profile > div.boxes > div.box.box-owner > p")
    valor = parseInt(replaceAll(valor, ".", ""));
    clausula = parseInt(replaceAll(clausula, ".", ""));

    if(compradoPorClausula.innerText.includes(', fichado el ')){
        let iPrecio = compradoPorClausula.innerText.indexOf(' por ')+5;
        let valorP = compradoPorClausula.innerText.substr(iPrecio);
        valorP = parseInt(replaceAll(valorP, ".", ""));
        if(valorP > valor){
            valor = valorP;
        }
        if(valor < 666666){
            valor = 666664;
        }
    }
    
    let valorPorEscalon = valor/2;
    let costeSubidaEscalon = valor/5;
    let escalonesSubidos = -1;

    //CALCULA ESCALONES
    if(clausula < (valor+valorPorEscalon+500000)){
        escalonesSubidos = 0;
    }else{
        for(let i=valor; i<clausula; i = i+valorPorEscalon+100000){
            escalonesSubidos++;
        }
    }
    let dineroGastado = escalonesSubidos*costeSubidaEscalon;

    costeSubidaEscalon = conPuntos(costeSubidaEscalon.toString());
    escalonesSubidos = escalonesSubidos.toString();
    dineroGastado = conPuntos(dineroGastado.toString());

    //ESCRIBIR RESULTADOS
    let escalones = document.createElement('div');
    escalones.setAttribute('class','item');
    escalones.innerHTML = '<div class="value">'+escalonesSubidos+'/5</div><div class="label">Escalones</div>';

    let valorSubida = document.createElement('div');
    valorSubida.setAttribute('class','item');
    valorSubida.innerHTML = '<div class="value">'+costeSubidaEscalon+'</div><div class="label">Dinero/escalon</div>';

    let valorClausula = document.createElement('div');
    valorClausula.setAttribute('class','item');
    valorClausula.innerHTML = '<div class="value" style="width: 300px">'+dineroGastado+'</div><div class="label">Dinero total clausula</div>';

    barra.appendChild(escalones);
    barra.appendChild(valorSubida);
    barra.appendChild(valorClausula);
    
}


/////////////////////////////////////////////
/////////////////////////////////////////////
//            PLAYER OFFERS VIEW           //
/////////////////////////////////////////////
/////////////////////////////////////////////

if(window.location.href === 'https://mister.mundodeportivo.com/market#market/offers-received'){

    let container = document.querySelector('.sw-content');
    //CREACION DE BOTON DENEGAR OFERTA
    let botonDenegar = document.createElement('button');
    botonDenegar.innerText = 'Denegar Ofertas';
    botonDenegar.setAttribute('class', 'deniedOffer');
    botonDenegar.setAttribute('onclick', 'denegar()');
    botonDenegar.style.marginRight = '70px';
    botonDenegar.style.backgroundColor = '#1bd171';
    botonDenegar.style.border = '2px solid black';
    botonDenegar.style.borderRadius = '5px';
    botonDenegar.style.padding = '3px';
    botonDenegar.style.position = 'absolute';
    botonDenegar.style.left = '85%';
    botonDenegar.style.top = '1%';
    botonDenegar.style.zIndex = '99999';
    container.appendChild(botonDenegar);

    function denegar(){
        let botonesDenegar = document.querySelectorAll('.btn-decline');
        botonesDenegar.forEach(function(boton){
            boton.click();
        });
    }
}


/////////////////////////////////////////////
/////////////////////////////////////////////
//             PLAYERS RANKING             //
/////////////////////////////////////////////
/////////////////////////////////////////////

if(window.location.href === 'https://mister.mundodeportivo.com/more#players'){

    let container = document.querySelector('.sw-content');
    //CREACION DE BOTON CLAUSULAS BARATAS
    let menoresClausulas = document.createElement('button');
    menoresClausulas.innerText = 'Filtrar';
    menoresClausulas.setAttribute('class', 'btn-green');
    menoresClausulas.setAttribute('onclick', 'filtrar()');
    menoresClausulas.style.marginRight = '70px';
    menoresClausulas.style.backgroundColor = '#1bd171';
    menoresClausulas.style.border = '2px solid black';
    menoresClausulas.style.borderRadius = '5px';
    menoresClausulas.style.padding = '3px';
    menoresClausulas.style.position = 'absolute';
    menoresClausulas.style.left = '85%';
    menoresClausulas.style.top = '4%';
    menoresClausulas.style.zIndex = '99999';
    

    //INPUT VALOR LIMITE
    let inputLimite = document.createElement('input'); 
    inputLimite.style.border = '2px solid black';
    inputLimite.style.borderRadius = '5px';
    inputLimite.style.padding = '5px';
    inputLimite.setAttribute('placeHolder','Valor máximo de la clausula');
    inputLimite.setAttribute('class','valor');
    inputLimite.style.position = 'absolute';
    inputLimite.style.zIndex = '99990';
    inputLimite.style.left = '85%';
    inputLimite.style.top = '1%';

    setTimeout(function(){ 
        
        container.appendChild(menoresClausulas);
        container.appendChild(inputLimite);
    }, 1500);


    function filtrar(){
        let lista = document.querySelector('.player-list');
        let listaJugadores = lista.querySelectorAll('li');
        listaJugadores.forEach(function(jugador){
            let numbers = jugador.querySelector('div > a > div.name > div.numbers');
            if(numbers.innerText.includes('cláusula')){

                let iClausula = numbers.innerText.indexOf(' cláusula')-10;
                let fClausula = numbers.innerText.indexOf(' cláusula');

                let clausula = numbers.innerText.substr(iClausula,(fClausula-iClausula));
                clausula = replaceAll(clausula, ".", " ");
                clausula = replaceAll(clausula, " ", "");
                clausula = parseInt(clausula)
                if(clausula>parseInt(inputLimite.value)){
                    jugador.innerHTML = '';
                }
            }
        });
    }
}

`;

var script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
script.remove();