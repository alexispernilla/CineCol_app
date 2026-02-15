
let USUARIOS = {
    admin: "admin123",
    usuario: "1234",
    demo: "demo"
};

let usuarioActual = null;
let peliculasGlobales = [];
let peliculaEnEdicion = null;


document.addEventListener("DOMContentLoaded", ()=>{
    inicializarApp();
    eventos();
});

function inicializarApp(){
    
    cargarUsuariosRegistrados();

    
    let userLogged = localStorage.getItem("usuarioLogueado");
    if(userLogged){
        usuarioActual = JSON.parse(userLogged);
        mostrarDashboard();
    }

    
    if(!localStorage.getItem("peliculas")){
        cargarDatosEjemplo();
    }

    
    document.querySelector("#inputBuscar")
        .addEventListener("input", aplicarFiltros);

    document.querySelector("#selectGenero")
        .addEventListener("change", aplicarFiltros);
}

function cargarUsuariosRegistrados(){
    
    let usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados")) || {};
    if(usuariosRegistrados){
        Object.assign(USUARIOS, usuariosRegistrados);
    }
}


function eventos(){
    
    document.querySelector("#formLogin").addEventListener("submit", login);
    
    document.querySelector("#btnSalir").addEventListener("click", logout);
    
    document.querySelector("#formRegister").addEventListener("submit", register);
    
    document.querySelector("#btnGuardarPelicula").addEventListener("click", guardarPelicula);
}


function login(e){
    e.preventDefault();
    let user = document.querySelector("#inputUser").value;
    let password = document.querySelector("#inputPassword").value;

    if(USUARIOS[user] && USUARIOS[user] == password){
        usuarioActual = user;
        localStorage.setItem("usuarioLogueado", JSON.stringify(user));
        mostrarDashboard();
        document.querySelector("#formLogin").reset();
    }else{
        alert("El usuario o contraseña no son validos");
    }
}

function mostrarDashboard(){
    document.querySelector("#loginSection").style.display = "none";
    document.querySelector("#btnEntrar").style.display = "none";
    document.querySelector("#dashboard").style.display = "block";
    document.querySelector("#btnSalir").style.display = "block";
    document.querySelector("#btnAgregarPelicula").style.display = "inline-block";
    document.querySelector(".userLogged").textContent = usuarioActual;
    
    cargarPeliculas();
}

function mostraLogin(){
    document.querySelector("#loginSection").style.display = "flex";
    document.querySelector("#btnEntrar").style.display = "block";
    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#btnSalir").style.display = "none";
    document.querySelector("#btnAgregarPelicula").style.display = "none";
}

function logout(){
    let confirmar = confirm("¿Desea cerrar sesión?");
    if(confirmar){
        usuarioActual = null;
        localStorage.removeItem("usuarioLogueado");
        mostraLogin();
        document.querySelector("#formLogin").reset();
    }
}

function register(e){
    e.preventDefault();
    let nombre = document.querySelector("#inputNombre").value.trim();
    let email = document.querySelector("#inputEmail").value.trim();
    let usuario = document.querySelector("#inputUserReg").value.trim();
    let password = document.querySelector("#inputPasswordReg").value.trim();
    let confirmpassword = document.querySelector("#inputConfirmPassword").value.trim();

    
    if(!nombre || !email || !usuario || !password || !confirmpassword){
        alert("Por favor completa todos los campos.");
        return;
    }

    if(usuario.length < 4){
        alert("El usuario debe tener mínimo 4 caracteres.");
        return;
    }

    if(password.length < 6){
        alert("La contraseña debe tener mínimo 6 caracteres.");
        return;
    }

    if(password !== confirmpassword){
        alert("Las contraseñas no coinciden.");
        return;
    }

    if(USUARIOS[usuario]){
        alert("El usuario ya existe, por favor elige otro.");
        return;
    }

    
    USUARIOS[usuario] = password;

    
    let usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados")) || {};
    usuariosRegistrados[usuario] = password;
    localStorage.setItem("usuariosRegistrados", JSON.stringify(usuariosRegistrados));

    
    alert("Usuario " + usuario + " registrado con éxito ✅, inicia sesión.");

    
    document.querySelector("#formRegister").reset();
    document.querySelector("#login-tab").click();
}


function cargarDatosEjemplo(){
    let peliculasEjemplo = [
        {
            id: 1,
            titulo: "Back to the Future",
            genero: "Ciencia ficción",
            director: "Robert Zemeckis",
            ano: 1985,
            calificacion: 8.5,
            descripcion: "Un joven viaja accidentalmente 30 años al pasado en un DeLorean y debe asegurar que sus padres se conozcan para salvar su existencia.",
            imagen: "https:
        },
        {
            id: 2,
            titulo: "Pulp Fiction",
            genero: "Crimen",
            director: "Quentin Tarantino",
            ano: 1994,
            calificacion: 8.8,
            descripcion: "Historias entrelazadas de violencia y redención en Los Ángeles, contadas con un estilo no lineal.",
            imagen: "https:
        },
        {
            id: 3,
            titulo: "The Godfather",
            genero: "Crimen",
            director: "Francis Ford Coppola",
            ano: 1972,
            calificacion: 9.2,
            descripcion: "La saga de una familia mafiosa que lucha por mantener el poder y el legado en Estados Unidos.",
            imagen: "https:
        },
        {
            id: 4,
            titulo: "El abrazo de la serpiente",
            genero: "Aventura",
            director: "Ciro Guerra",
            ano: 2015,
            calificacion: 8.0,
            descripcion: "Dos expediciones separadas por décadas recorren el Amazonas en busca de una planta sagrada y de sentido.",
            imagen: "https:
        },
        {
            id: 5,
            titulo: "La estrategia del caracol",
            genero: "Comedia",
            director: "Sergio Cabrera",
            ano: 1993,
            calificacion: 8.3,
            descripcion: "Un grupo de inquilinos se organiza creativamente para evitar el desalojo y defender su hogar.",
            imagen: "https:
        },
        {
            id: 6,
            titulo: "Los colores de la montaña",
            genero: "Drama",
            director: "Carlos César Arbeláez",
            ano: 2010,
            calificacion: 7.7,
            descripcion: "La infancia y el juego se enfrentan a la realidad del conflicto cuando un balón cae en un campo minado.",
            imagen: "https:
        },
        {
            id: 7,
            titulo: "Perro come perro",
            genero: "Crimen",
            director: "Carlos Moreno",
            ano: 2008,
            calificacion: 7.4,
            descripcion: "Un robo desencadena una cadena de traiciones y paranoia en el mundo criminal de Cali.",
            imagen: "https:
        },
        {
            id: 8,
            titulo: "Sumas y restas",
            genero: "Crimen",
            director: "Víctor Gaviria",
            ano: 2004,
            calificacion: 7.6,
            descripcion: "Un ingeniero se ve arrastrado al negocio del narcotráfico y descubre el costo real de esa vida.",
            imagen: "https:
        },
        {
            id: 9,
            titulo: "La vendedora de rosas",
            genero: "Drama",
            director: "Víctor Gaviria",
            ano: 1998,
            calificacion: 7.8,
            descripcion: "Una mirada cruda y humana a la vida en la calle de jóvenes en Medellín durante la Navidad.",
            imagen: "https:
        },
        {
            id: 10,
            titulo: "Satanás",
            genero: "Suspenso",
            director: "Andrés Baiz",
            ano: 2007,
            calificacion: 7.2,
            descripcion: "Historias que convergen en una noche trágica, mostrando tensiones sociales y personales en la ciudad.",
            imagen: "https:
        },
        {
            id: 11,
            titulo: "Mateo",
            genero: "Drama",
            director: "María Gamboa",
            ano: 2014,
            calificacion: 7.5,
            descripcion: "Un joven busca un futuro mejor mientras enfrenta presiones y decisiones difíciles en su entorno.",
            imagen: "https:
        },
        {
            id: 12,
            titulo: "Encanto",
            genero: "Animación",
            director: "Jared Bush & Byron Howard",
            ano: 2021,
            calificacion: 7.3,
            descripcion: "Una familia colombiana extraordinaria descubre que el verdadero don está en la unión y el propósito.",
            imagen: "https:
        }
    ];

    
    localStorage.setItem("peliculas", JSON.stringify(peliculasEjemplo));
}


function cargarPeliculas(){
    let peliculas = localStorage.getItem("peliculas");
    peliculasGlobales = peliculas ? JSON.parse(peliculas) : [];
    
    renderizarGrid(peliculasGlobales);
    renderizarSlider();
}


function renderizarGrid(pelis){
    let grid = document.querySelector("#gridPeliculas");
    let sinResulados = document.querySelector("#sinResultados");

    if(pelis.length === 0){
        grid.innerHTML = "";
        sinResulados.style.display = "block";
        return;
    }

    sinResulados.style.display = "none";
    grid.innerHTML = pelis.map(p =>
        `
            <div class="col-md-6 col-lg-4 col-xl-3">
                <div class="movie-card">
                    <img src="${p.imagen}" class="movie-image" onerror="this.src='https:
                    <div class="movie-content">
                        <h5 class="movie-title">${p.titulo}</h5>
                        <span class="movie-genero">${p.genero}</span>
                        <div class="movie-meta"> <b>${p.ano}</b> - ${p.director}</div>
                        <div class="movie-rating">⭐ ${p.calificacion} /10</div>
                        <div class="movie-description"> ${p.descripcion}</div>
                        <div class="movie-actions">
                            <button class="btn btn-info" onclick="verDetalles(${p.id})"> <i class="bi bi-eye-fill"></i> Detalles</button>
                            <button class="btn btn-warning" onclick="editarPelicula(${p.id})"> <i class="bi bi-pencil-fill"></i> Editar</button>
                            <button class="btn btn-danger" onclick="eliminarPelicula(${p.id})"> <i class="bi bi-trash3-fill"></i> Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        `
    ).join("");
}


function guardarPelicula(){
    if(!usuarioActual){
        alert("Debes iniciar sesión para realizar esta acción.");
        return;
    }

    
    let titulo = document.querySelector("#inputTitulo").value;
    let genero = document.querySelector("#inputGenero").value;
    let director = document.querySelector("#inputDirector").value;
    let ano = document.querySelector("#inputAno").value;
    let calificacion = document.querySelector("#inputCalificacion").value;
    let descripcion = document.querySelector("#inputDescripcion").value;
    let imagen = document.querySelector("#inputImagen").value;

    
    if(peliculaEnEdicion){
        
        
        let index = peliculasGlobales.findIndex((p)=>p.id === peliculaEnEdicion.id);
        
        if(index !== -1){

            peliculasGlobales[index] = {
                ...peliculasGlobales[index],
                titulo, genero, director, ano, calificacion, descripcion, imagen
            }
            alert("Película actualizada con éxito. ✅");
        }   
    }else{
        
        
        let nuevaPelicula = {
            id: Date.now(),
            titulo, genero, director, ano, calificacion, descripcion, imagen,
            fecha: new Date()
        }
        
        peliculasGlobales.unshift(nuevaPelicula);
        alert("Película agregada éxitosamente. ✅")
    }
        
        localStorage.setItem("peliculas", JSON.stringify(peliculasGlobales));
        peliculaEnEdicion = null; 
        
        cargarPeliculas();

        
        bootstrap.Modal.getInstance(document.querySelector("#modalAdd")).hide();
        
        document.querySelector("#formPelicula").reset();
}       

function editarPelicula(id){
    if(!usuarioActual){
        alert("Debes iniciar sesión para realizar esta acción.");
        return;
    }

    
    let pelicula = peliculasGlobales.find((p)=> p.id === id);

    
    if(pelicula){
        peliculaEnEdicion = pelicula;
        
        document.querySelector("#inputTitulo").value = pelicula.titulo;
        document.querySelector("#inputGenero").value = pelicula.genero;
        document.querySelector("#inputDirector").value = pelicula.director;
        document.querySelector("#inputAno").value = pelicula.ano;
        document.querySelector("#inputCalificacion").value = pelicula.calificacion;
        document.querySelector("#inputDescripcion").value = pelicula.descripcion;
        document.querySelector("#inputImagen").value = pelicula.imagen;
        
        document.querySelector("#modalAddLabel").textContent = "Editar película";

        
        let modal = new bootstrap.Modal(document.querySelector("#modalAdd"));
        modal.show();
    }
}


function eliminarPelicula(id){
    if(!usuarioActual){
        alert("Debes iniciar sesión para realizar esta acción.");
        return;
    }

    
    let confirmar = confirm("¿Seguro que desea eliminar la película?");
    if(confirmar){
        
        peliculasGlobales = peliculasGlobales.filter((p)=> p.id !== id);
        
        localStorage.setItem("peliculas", JSON.stringify(peliculasGlobales));
        
        cargarPeliculas();
        
        alert("Película eliminada con éxito. ✅");
    }
}


function verDetalles(id){
    
    let pelicula = peliculasGlobales.find((p)=> p.id === id);

    
    if(pelicula){
        document.querySelector("#detallesTitulo").textContent = pelicula.titulo;
        document.querySelector("#detallesGenero").textContent = pelicula.genero;
        document.querySelector("#detallesDirector").textContent = pelicula.director;
        document.querySelector("#detallesAno").textContent = pelicula.ano;
        document.querySelector("#detallesCalificacion").textContent = pelicula.calificacion;
        document.querySelector("#detallesDescripcion").textContent = pelicula.descripcion;
        document.querySelector("#detallesImagen").src = pelicula.imagen;

        
        let modal = new bootstrap.Modal(document.querySelector("#ModalDetalles"));
        modal.show();
    }
}


function renderizarSlider(){
    let carrusel = document.querySelector("#carruselMovies");
    carrusel.innerHTML = "";

    let recientes = peliculasGlobales.slice(0, 5);

    recientes.forEach((p)=>{
        let card = document.createElement("div");
        card.className = "slider-movie-card";
        card.innerHTML = `
            <img src="${p.imagen}" onerror="this.src='https:
            <div class="slider-movie-info">
                <h6>${p.titulo}</h6>
                <small class="text-muted">${p.ano}</small>
            </div>
        `;
        card.addEventListener("click", ()=>verDetalles(p.id));
        carrusel.appendChild(card);
    });
}


function scrollSlider(direccion){
    let slider = document.querySelector("#carruselMovies");
    let scroll = 200;
    slider.scrollBy({
        left: direccion * scroll,
        behavior: "smooth"
    });
}


function aplicarFiltros(){

    let texto = document.querySelector("#inputBuscar").value.toLowerCase().trim();
    let genero = document.querySelector("#selectGenero").value;

    let filtradas = peliculasGlobales.filter((p)=>{

        let coincideTexto = 
            p.titulo.toLowerCase().includes(texto) ||
            p.director.toLowerCase().includes(texto);

        let coincideGenero = 
            genero === "" || 
            p.genero.toLowerCase() === genero.toLowerCase();

        return coincideTexto && coincideGenero;
    });

    renderizarGrid(filtradas);
}