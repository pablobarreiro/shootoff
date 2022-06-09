Rutas

Productos:
- traer todos los productos -> GET /api/product
- traer 1 solo producto -> GET /api/product/{id producto}
- crear 1 producto nuevo -> POST /api/product
- modificar 1 producto -> PUT /api/product/{id producto}
- eliminar 1 producto -> DELETE /api/product/{id producto}
- traer todos los productos de 1 determinada categoria -> GET /api/product/category/{categoria}
- traer productos en base a una busqueda -> GET /api/product/search/{valores de busqueda}

Usuarios:
- registrar nuevo usuario -> POST /api/user/register
- loguear usuario -> POST /api/user/login
- desloguear usuario -> POST /api/user/logout
- persistir sesion -> GET /api/user/me
- modificar datos de 1 usuario -> PUT /api/user/me/{id usuario}
- traer todos los usuarios (solo admin) -> GET /api/user/admin/{id admin}/users
- eliminar 1 usuario (solo admin) -> DELETE /api/user/admin/{id admin}/remove/{id usuario}
- promover/quitar rango de admin a un usuario (solo admin) -> PUT /api/user/admin/{id admin}/add/{id usuario}

Carritos:
- traer todos los productos que 1 usuario tiene en el carrito -> GET /api/cart/{id usuario}
- agregar 1 producto al carrito -> POST /api/cart
- modificar un producto agregado al carrito (cantidades) -> PUT /api/cart/{id carrito}
- eliminar 1 producto agregado -> DELETE /api/cart/{id carrito}

Checkout/sales:
- comprar carrito actual -> POST /api/checkout/{id usuario}
- confirmar un pedido -> PUT /api/checkout/confirm/{order_number}
- rechazar un pedido -> PUT /api/checkout/reject/{order_number}
- historial de pedidos de 1 usuario -> GET /api/checkout/sales/{id usuario}