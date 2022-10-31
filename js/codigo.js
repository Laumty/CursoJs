let contenedorProductos = document.getElementById('contenedor-productos')
let contenedorCarrito = document.getElementById('carrito-contenedor')
let botonVaciar = document.getElementById('vaciar-carrito')
let contadorCarrito = document.getElementById('contadorCarrito')
    

let cantidad = document.getElementById('cantidad')
let precioTotal = document.getElementById('precioTotal')
let cantidadTotal = document.getElementById('cantidadTotal')

class Producto {
    constructor(id, nombre, precio, talle,img){
        this.id =id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.talle = talle;
        this.cantidad = 1;
    }
}


let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})


stockProductos.forEach((producto) => {
    let div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>

    `
    contenedorProductos.appendChild(div)


    let boton = document.getElementById(`agregar${producto.id}`)


    boton.addEventListener('click', () => {

        agregarAlCarrito(producto.id)
        
    })
})



let agregarAlCarrito = (prodId) => {

    let existe = carrito.some (prod => prod.id === prodId) 

    if (existe){ 
        let prod = carrito.map (prod => {
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else {
        let item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
   
    actualizarCarrito()
}

let eliminarDelCarrito = (prodId) => {
    let item = carrito.find((prod) => prod.id === prodId)

    let indice = carrito.indexOf(item) 
    carrito.splice(indice, 1) 

    actualizarCarrito() 
    console.log(carrito)
}

let actualizarCarrito = () => {
   
    contenedorCarrito.innerHTML = ""
    carrito.forEach((prod) => {
        let div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
   
    contadorCarrito.innerText = carrito.length 
    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
   

}