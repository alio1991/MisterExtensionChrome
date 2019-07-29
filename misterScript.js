var actualCode = `// Code here.
// If you want to use a variable, use $ and curly braces.
// For example, to use a fixed random number:
let liga = document.querySelector(".league-name").innerText;
if(liga === 'Trapis-League'){
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
    
    let generales = [];
    let jornaderos = [];

    let imprimirGeneral = [];
    let imprimirJornada = [];

    jugadoresGeneral.forEach(function(jugador){
        let nombre = jugador.querySelector('.name').querySelector('h2').innerText;
        let valorEquipo = jugador.querySelector('.played').innerText;
        let puntos = (jugador.querySelector('.points').innerText).substr(-30,2).trim();
        let individuo = {'nombre':nombre, 'puntos': puntos, 'valor': valorEquipo};
        generales.push(individuo);
    });

    grupos.forEach(function(grupo){
        grupo.forEach(function(miembro){
            let equipo = {'nombre':'', 'puntos': 0, 'valor': 0};
            generales.forEach(function(tio){
                if(tio.nombre === miembro){
                    console.log(tio);
                }
            })
        })
        console.log("-----------");
    });


    console.log("----------------------");
    // jugadoresJornada.forEach(function(jugador){
    //     let nombre = jugador.querySelector('.name').querySelector('h2').innerText;
    //     console.log(nombre);
    //     let valorEquipo = 0;
    //     let puntos = 0;
    // });
}




// NOTE: Do not insert unsafe variables in this way, see below
// at "Dynamic values in the injected code"
`;

var script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
script.remove();