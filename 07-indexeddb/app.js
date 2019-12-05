
// indexedDB: Reforzamiento
let request = window.indexedDB.open('database', 1);


// se actualiza cuando se crea o se sube de version la base de datos
request.onupgradeneeded = event =>{
  console.log('Actualizacion de BD');

  let db = event.target.result;

  db.createObjectStore('heroes', {
    keyPath: 'id'
  });
};



//Manejo de errores
request.onerror = event => {
  console.log('DB error:', event.target.error);
};

//insertar datos
request.onsuccess = event =>{
  let db = event.target.result;

  let heroesData = [
    {id: '1111', heroe: 'Spiderman', mensaje: 'Aqui su amigo Spiderman'},
    {id: '2222', heroe: 'wolverine', mensaje: 'Aqui su amigo el garras'}
  ];



  let heroesTransaction = db.transaction('heroes', 'readwrite');
  heroesTransaction.onerror = event =>{
  console.log('Error guardado', event.target.error);
  };

  //informa sobre el exito de la transaccion
  heroesTransaction.oncomplete = event =>{
    console.log('Transaccion Hecha', event);
  };

  let heroesStore = heroesTransaction.objectStore('heroes');
  for (let heroe of heroesData) {
    heroesStore.add(heroe);
  }

  heroesStore.onsucces = event =>{
    console.log('Nuevo item agregado a la base de datos');
  };
};
