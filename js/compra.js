const compra = new Carrito();
const listaCompra = document.querySelector('#lista-compra tbody');
const carrito = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');

cargarEventos();

function cargarEventos(){

    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());
    carrito.addEventListener('click', (e) => {compra.eliminarProducto(e)});
    compra.calcularTotal();
    procesarCompraBtn.addEventListener('click', procesarCompra);
}

function procesarCompra(e){
    e.preventDefault();

    if(compra.obtenerProductosLocalStorage().length === 0){
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Selececione algun producto',
            timer: 2000,
            showConfirmButton: false
        }).then(function (){
            window.location =  "productos.html";
        })
    }
    else if(cliente.value === ' ' || correo.value === ''){
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Ingresa todos los campos requeridos',
            timer: 2000,
            showConfirmButton: false
        })
    }
    else{
        
           

        
       const cargandoGif = document.querySelector('#cargando');
       cargandoGif.style.display = 'block';

        const enviado = document.createElement('img');
        Swal.fire({
            title: '¡Gracias por tu compra!',
            imageUrl: '/img/mail.gif',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
        

        setTimeout(() => {
            cargandoGif.style.display = 'none';
            document.querySelector('#loaders').appendChild(enviado);
            setTimeout(() => {
                enviado.remove();
                compra.vaciarLOcalStorage();
                window.location = "productos.html"
            },1000)
        }, 2000);
        

    }
    
}