document.addEventListener('DOMContentLoaded', () => {
    const carrito = document.querySelector('#carrito');
    const contenedorCarrito = document.querySelector('#lista-carrito tbody');
    const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
    const listaProductos = document.querySelector('#lista-1');
    const totalPrecioElemento = document.querySelector('#total-precio');
    const contadorCarritoElemento = document.querySelector('#cart-count');
    const btnCargarMas = document.querySelector('#load-more');

    let articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

    carritoHTML();

    // Delegación global de clics
    document.addEventListener('click', (e) => {
        
        // 1. Agregar al carrito
        const btnAgregar = e.target.closest('.agregar-carrito');
        if (btnAgregar) {
            e.preventDefault();
            const productoCard = btnAgregar.closest('.box');
            agregarProducto(productoCard, btnAgregar.getAttribute('data-id'));
            return;
        }

        // 2. Eliminar del carrito
        const btnEliminar = e.target.closest('.borrar-producto');
        if (btnEliminar) {
            e.preventDefault();
            const productoId = btnEliminar.getAttribute('data-id');
            articulosCarrito = articulosCarrito.filter(prod => prod.id !== productoId);
            carritoHTML();
            return;
        }

        // 3. Filtrar categorías
        const btnFiltro = e.target.closest('.btn-filter, .btn-cat');
        if (btnFiltro) {
            const categoria = btnFiltro.getAttribute('data-filter');
            if (categoria) {
                filtrarProductos(categoria);
                
                document.querySelectorAll('.btn-cat').forEach(b => b.classList.remove('active'));
                const btnActivo = document.querySelector(`.btn-cat[data-filter="${categoria}"]`);
                if (btnActivo) btnActivo.classList.add('active');
            }
        }
    });

    if (vaciarCarritoBtn) {
        vaciarCarritoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            articulosCarrito = [];
            carritoHTML();
        });
    }

    if (btnCargarMas) {
        btnCargarMas.addEventListener('click', (e) => {
            e.preventDefault();
            cargarMasProductos();
        });
    }

    function agregarProducto(productoCard, id) {
        const infoProducto = {
            imagen: productoCard.querySelector('img').src,
            titulo: productoCard.querySelector('h3').textContent,
            precio: parseFloat(productoCard.querySelector('.Precio').textContent.replace('$', '')),
            id: id,
            cantidad: 1
        };

        const existe = articulosCarrito.some(prod => prod.id === infoProducto.id);

        if (existe) {
            articulosCarrito = articulosCarrito.map(prod => {
                if (prod.id === infoProducto.id) {
                    prod.cantidad++;
                }
                return prod;
            });
        } else {
            articulosCarrito.push(infoProducto);
        }

        carritoHTML();
    }

    function carritoHTML() {
        limpiarHTML();

        articulosCarrito.forEach(producto => {
            const { imagen, titulo, precio, cantidad, id } = producto;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${imagen}" width="40" style="border-radius:4px; object-fit:contain;"></td>
                <td style="font-size: 12px; font-weight:600;">${titulo}</td>
                <td>$${(precio * cantidad).toFixed(2)}</td>
                <td style="text-align:center;">${cantidad}</td>
                <td>
                    <button type="button" class="borrar-producto" data-id="${id}" style="background:none; border:none; color:#ef4444; cursor:pointer; font-weight:bold; font-size: 18px;">&times;</button>
                </td>
            `;
            contenedorCarrito.appendChild(row);
        });

        actualizarTotales();
        sincronizarStorage();
    }

    function actualizarTotales() {
        const total = articulosCarrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
        const cantidadTotal = articulosCarrito.reduce((acc, prod) => acc + prod.cantidad, 0);

        if (totalPrecioElemento) totalPrecioElemento.textContent = `$${total.toFixed(2)}`;
        if (contadorCarritoElemento) contadorCarritoElemento.textContent = cantidadTotal;
    }

    function limpiarHTML() {
        if (!contenedorCarrito) return;
        while (contenedorCarrito.firstChild) {
            contenedorCarrito.removeChild(contenedorCarrito.firstChild);
        }
    }

    function sincronizarStorage() {
        localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
    }

    function filtrarProductos(categoria) {
        const productos = document.querySelectorAll('.box');
        
        productos.forEach(prod => {
            const categoriasProducto = prod.getAttribute('data-category') || '';
            
            if (categoria === 'all' || categoriasProducto.includes(categoria)) {
                prod.classList.remove('hide');
            } else {
                prod.classList.add('hide');
            }
        });
    }

    function cargarMasProductos() {
        if (!listaProductos) return;

        const productosSiguientes = [
            { id: '7', titulo: 'Elysium Model 7', precio: 240, categoria: 'urbana', catTxt: 'Colección Urbana', imagen: 'images/pr7.png' },
            { id: '8', titulo: 'Elysium Model 8', precio: 175, categoria: 'deportivo', catTxt: 'Calzado Deportivo', imagen: 'images/pr8.png' },
            { id: '9', titulo: 'Elysium Model 9', precio: 215, categoria: 'accesorios', catTxt: 'Accesorios Premium', imagen: 'images/pr9.png' },
            { id: '10', titulo: 'Elysium Model 10', precio: 195, categoria: 'oferta urbana', catTxt: 'Colección Urbana', imagen: 'images/pr10.png' },
            { id: '11', titulo: 'Elysium Model 11', precio: 260, categoria: 'deportivo', catTxt: 'Calzado Deportivo', imagen: 'images/pr11.png' },
            { id: '12', titulo: 'Elysium Model 12', precio: 225, categoria: 'oferta accesorios', catTxt: 'Accesorios Premium', imagen: 'images/pr12.png' }
        ];

        productosSiguientes.forEach(prod => {
            const article = document.createElement('article');
            article.classList.add('box');
            article.setAttribute('data-category', prod.categoria);
            
            const promoBadge = prod.categoria.includes('oferta') ? '<div class="product-badge promo">-10%</div>' : '';

            article.innerHTML = `
                ${promoBadge}
                <div class="img-wrapper">
                    <img src="${prod.imagen}" alt="${prod.titulo}">
                </div>
                <div class="product-txt">
                    <h3>${prod.titulo}</h3>
                    <p class="category">${prod.catTxt}</p>
                    <p class="Precio">$${prod.precio}</p>
                    <button type="button" class="agregar-carrito btn-3" data-id="${prod.id}">
                        <i class="fa-solid fa-cart-plus"></i> Agregar al carrito
                    </button>
                </div>
            `;
            listaProductos.appendChild(article);
        });

        btnCargarMas.textContent = "No hay más productos";
        btnCargarMas.disabled = true;
        btnCargarMas.style.opacity = "0.5";
        btnCargarMas.style.cursor = "not-allowed";
    }
});


