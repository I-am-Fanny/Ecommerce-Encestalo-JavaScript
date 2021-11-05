class Carrito{
    //Añadir producto al carrito
    comprarProducto(e){
        e.preventDefault();
        if(e.target.classList.contains('agregar-carrito')){
            const producto = e.target.parentElement.parentElement;
            this.leerDatosProducto(producto);
            
        }
    }
    leerDatosProducto(producto){
        const infoProducto = {
            imagen : producto.querySelector('img').src,
            titulo : producto.querySelector('h4').textContent,
            precio : producto.querySelector('.precio span').textContent,
            id : producto.querySelector('a').getAttribute('data-id'),
            cantidad : 1
        }
        
        this.insertarCarrito(infoProducto);
    }


    insertarCarrito(producto){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
            <img src="${producto.imagen}" width=100>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
                <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
            </td>
        `;
        listaProductos.appendChild(row);
        this.guardarProductosLocalStorage(producto);
    }



    eliminarProducto(e){
        e.preventDefault();
        let producto, productoID;
        if(e.target.classList.contains('borrar-producto')){
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoID = producto.querySelector('a').getAttribute('data-id');
        }
        this.eliminarProductoLocalStorage(productoID);
        this.calcularTotal();
    }




    vaciarCarrito (e){
        e.preventDefault();
        while(listaProductos.firstChild){
            listaProductos.removeChild(listaProductos.firstChild);
        }
        this.vaciarLOcalStorage();
        return false;
    }
    guardarProductosLocalStorage(producto){
        let productos;
        productos = this.obtenerProductosLocalStorage();
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));

    }
    obtenerProductosLocalStorage(){
        let productoLS;

        if(localStorage.getItem('productos') === null){
            productoLS = [];
        }
        else{
            productoLS = JSON.parse(localStorage.getItem('productos'));
        }
        return productoLS;
    }




    eliminarProductoLocalStorage(productoID){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(productoLS, index){
            if(productoLS.id === productoID){
                productosLS.splice(index, 1);
            }
        });
        localStorage.setItem('productos', JSON.stringify(productosLS));
    }


    leerLocalStorage(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(producto){
            const row = document.createElement('tr');
        row.innerHTML = `
            <td>
            <img src="${producto.imagen}" width=100>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
                <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
            </td>
        `;
        listaProductos.appendChild(row);
        });
    }

    leerLocalStorageCompra(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(producto){
            const row = document.createElement('tr');
        row.innerHTML = `
            <td>
            <img src="${producto.imagen}" width=100>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
                <input type="text" class="form-control cantidad" min="1" value=${producto.cantidad}>
            </td>
            <td>${producto.precio * producto.cantidad}</td>
            <td>
                <a href="#" class="borrar-producto fas fa-times-circle" style="font-size:30px" data-id="${producto.id}"></a>
            </td>
        `;
        listaCompra.appendChild(row);
        });
    }

    vaciarLOcalStorage(){
        localStorage.clear();
    }
    procesarPedido(e){
        e.preventDefault();
        if(this.obtenerProductosLocalStorage().length === 0){
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Agregue algun producto al carrito ',
                timer: 2000,
                showConfirmButton: false
            })
        }
        else{
            location.href = "compra.html" ;
        }
        
    }
    calcularTotal(){
        let productoLS;
        let total = 0, subtotal = 0, iva = 0;
        productoLS = this.obtenerProductosLocalStorage();
        for(let i = 0; i < productoLS.length; i++){
            let element = Number(productoLS[i].precio * productoLS[i].cantidad);
            total = total + element;
        }
        iva = parseFloat(total * 0.21).toFixed(2);
        subtotal = parseFloat(total - iva).toFixed(2);

        document.getElementById('subtotal').innerHTML = "$" + subtotal;
        document.getElementById('iva').innerHTML = "$" + iva;
        document.getElementById('total').innerHTML = "$" + total.toFixed(2);
    }
}

