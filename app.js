
//? Variables
// Seleccion de elementos HTML
const cardContainer = document.querySelector('.cards-container')
const input = document.querySelector('.search input')
let titulos = []

//? Funciones
// Declarar funcion FETCH para insertar nuestros productos en pantalla
const getProducts = async() => {
  const resp = await fetch('https://fakestoreapi.com/products')
  const data = await resp.json()

  data.forEach(product => {
    const title = product.title.length > 20 
      ? product.title.substring(0, 20) + '...'
      : product.title

    const description = product.description.length > 60
      ? product.description.substring(0, 70) + '...'
      : product.description

    // Crear estructura HTML para la CARD
    const card = `
      <div class="card">
        <img src="${product.image}" alt="${product.title}">

        <div class="card-info">
          <span class="card-info_title">${title}</span>
          <p>${description}</p>
        </div>

        <button>Comprar</button>
      </div>
    `

    // Insertar CARDS de productos en pantala
    cardContainer.insertAdjacentHTML('beforeend', card)
    titulos = document.querySelectorAll('.card-info_title')
  });
}

//? Eventos
// Cargar todos los productos en pantalla
window.addEventListener('DOMContentLoaded', getProducts)

// Filtrar segun TITULO
input.addEventListener('input', (e) => {
  const inputValue = e.target.value.toLocaleLowerCase().trim()

  titulos.forEach(titulo => {
    if (titulo.parentNode.parentNode.classList.contains('hidden')) {
      titulo.parentNode.parentNode.classList.remove('hidden')
    }

    if (!titulo.textContent.toLocaleLowerCase().includes(inputValue)) {
      console.log(titulo.parentNode.parentNode.classList.add('hidden'))
    }
  })
})

