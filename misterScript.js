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

    jugadoresJornada.forEach(function(jugador){
        let nombre = jugador.querySelector('.name').querySelector('h2').innerText;
        let jugados = (jugador.querySelector('.played').innerText).substr(0,2).trim();
        let puntos = (jugador.querySelector('.points').innerText).substr(-30,2).trim();
        let individuo = {'nombre':nombre, 'puntos': puntos, 'jugados': jugados};
        jornaderos.push(individuo);
    });

    grupos.forEach(function(grupo){
        let name = "";
            let points = 0;
            let value = 0;
        grupo.forEach(function(miembro){
            generales.forEach(function(tio){
                if(tio.nombre === miembro){
                    name = name+tio.nombre;
                    points = points+parseInt(tio.puntos);
                    value = value+parseFloat(tio.valor.substr(0,6));
                }
            });
        });
        console.log({'nombre':name, 'puntos': points, 'valor': value});
        imprimirGeneral.push({'nombre':name, 'puntos': points, 'valor': value});
        console.log("-----------");
    });


    grupos.forEach(function(grupo){
        let name = "";    
        let points = 0;
        let played = 0;
        grupo.forEach(function(miembro){
            generales.forEach(function(tio){
                if(tio.nombre === miembro){
                    name = name+' - '+tio.nombre;
                    points = points+parseInt(tio.puntos);
                    played = played+parseInt(tio.jugados);
                }
            });
        });
        imprimirJornada.push({'nombre':name, 'puntos': points, 'jugados': played});
        console.log("-----------");
    });

    
console.log(imprimirJornada);
}
`;

var script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
script.remove();