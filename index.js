const personajesHtml = (array) => {
    const arrayReducido = array.reduce((acc, elemento) => {
        return acc + `
        <article>
            
            <div class="image-container">
                <img src="${elemento.image}" alt="Personaje">
            </div>
            <h2>${elemento.name}</h2>
            <p>Estado: ${elemento.status}</p>
            <p>Especie: ${elemento.species}</p>
            <p>Genero: ${elemento.gender}</p>

        </article>
        `
    }, "")

    document.querySelector(".contenedor").innerHTML = arrayReducido
}



fetch("https://rickandmortyapi.com/api/character")
    .then((respuesta) => respuesta.json())
    .then((data) => {
        const array = data.results
        personajesHtml(data.results)
    })
    .catch((error) => console.log("Algo salió mal"))



const form = document.querySelector("form")



form.onsubmit = (e) => {
    e.preventDefault()
swal({
    text: 'Busca el nombre de tu personaje favorito',
    content: "input",
    button: {
        text: "Buscar",
        closeModal: false,
    },
})
    .then(name => {
        if (!name) throw null;

        return fetch(`https://rickandmortyapi.com/api/character/?name=${name}`);
    })
    .then(results => {
        return results.json();
    })
    .then(json => {
        const personaje = json.results[0];

        if (!personaje) {
            return swal("Personaje no encontrado");
        }

        const name = personaje.name;
        const imageURL = personaje.image;

        swal({
            title: "Resultados",
            text: name,
            icon: imageURL,

        });
    })
    .catch(err => {
        if (err) {
            swal("Rayos!", "Personaje no encontrado");
        } else {
            swal.stopLoading();
            swal.close();
        }
    });

}