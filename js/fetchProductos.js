
fetch('./data/productos.json')
  .then(res => res.json())
  .then(data => {
    console.log('Productos cargados', data);
    Swal.fire('Productos cargados correctamente');
  })
  .catch(err => {
    Swal.fire('Error al cargar productos');
    console.error(err);
  });
