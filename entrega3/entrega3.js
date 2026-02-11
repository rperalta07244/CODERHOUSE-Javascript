// LOGIN - Solo en index.html
const formularioLogIn = document.querySelector('#formulario');
if (formularioLogIn) {
  const user_name = document.querySelector('#username');
  const contraseña = document.querySelector('#password');

  //crear login
  const user = "rodrigo";
  const passwd = "123456"

  formularioLogIn.addEventListener('submit', (event) => {
    event.preventDefault();
    if (user_name.value === user && contraseña.value === passwd) {
      let timerInterval;
      Swal.fire({
        title: "Ingresando a la App...",
        html: "Aguarde unos momentos...",
        timer: 1500,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then((result) => {
        window.location.href = 'main.html';
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ingrese un Usuario y/o Contraseña validos",
      });
    }
  });
}

// agregado de logout

document.addEventListener('DOMContentLoaded', () => {

  // Botón cerrar sesión
  const btnCerrarSesion = document.querySelector('#cerrar_sesion');
  if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }

  // Funcionalidad de menús desplegables
  const collapsibles = document.querySelectorAll('.collapsible');

  collapsibles.forEach(collapsible => {
    collapsible.addEventListener('click', function () {
      const targetId = this.getAttribute('data-target');
      const content = document.getElementById(targetId);

      // Toggle active class
      this.classList.toggle('active');
      content.classList.toggle('active');
    });
  });

  // Abrir todas las secciones por defecto
  collapsibles.forEach(collapsible => {
    const targetId = collapsible.getAttribute('data-target');
    const content = document.getElementById(targetId);
    collapsible.classList.add('active');
    content.classList.add('active');
  });

  //CREACION DEL ARRAY
  const arrayDeTareas = [];
  //--------------------------------------------------------------------////
  const STORAGE_TAREAS = 'tareas';
  const STORAGE_GASTOS = 'gastos';
  const STORAGE_BALANCE = 'balance';

  // Cargar tareas desde localStorage al iniciar
  const savedTareas = JSON.parse(localStorage.getItem(STORAGE_TAREAS)) || [];
  arrayDeTareas.push(...savedTareas);
  //---------------------------------------------------------------------///
  //RECICLAJE DE FUNCION DE ENTRAGA 1 PARA INSERTAR TAREAS AL RRAY
  function agregarTareas(tarea, fecha, estado) {
    const nuevaTarea = {
      tarea: tarea,
      fecha: fecha,
      estado: estado,
    };
    arrayDeTareas.push(nuevaTarea);
    return nuevaTarea;
  }

  //SELECCION DE NODOS DEL DOM
  const formulario = document.querySelector("#formulario_tareas");
  const tarea = document.querySelector("#tarea");
  const estado = document.querySelector("#estado");
  const fecha = document.querySelector("#fecha");
  const listaDeTareas = document.querySelector("#lista_tareas");

  // Solo ejecutar si existen los elementos (estamos en index.html)
  if (!formulario) return;

  // Funciones para guardar y renderizar tareas
  //--------------------------------------------------------------------////
  function saveTareas() {
    localStorage.setItem(STORAGE_TAREAS, JSON.stringify(arrayDeTareas));
  }
  function renderTareas() {
    listaDeTareas.innerHTML = "";
    arrayDeTareas.forEach((tareaObj, index) => {
      const nuevoElemento = document.createElement("li");
      nuevoElemento.textContent =
        tareaObj.tarea + " -- Fecha: " + tareaObj.fecha + " -- Estado: " + tareaObj.estado;


      //--------------------------------------------------------------------////
      // Crear botón de borrar
      const botonBorrar = document.createElement("button");
      botonBorrar.textContent = "Borrar";
      botonBorrar.style.marginLeft = "10px";
      botonBorrar.style.borderRadius = "15px";
      botonBorrar.style.padding = "5px 10px";
      botonBorrar.onclick = () => {
        arrayDeTareas.splice(index, 1);
        saveTareas();
        renderTareas();
        Toastify({
          text: "Tarea eliminada",
          duration: 3000,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to right, #b01500ff, #d32121ff)",
          },
          onClick: function () { } // Callback after click
        }).showToast();
      };
      //--------------------------------------------------------------------////
      // Botón modificar estado
      const botonModificar = document.createElement("button");
      botonModificar.textContent = "Modificar Estado";
      botonModificar.style.marginLeft = "10px";
      botonModificar.style.borderRadius = "15px";
      botonModificar.style.padding = "5px 10px";
      botonModificar.onclick = () => {
        tareaObj.estado = tareaObj.estado === "Pendiente" ? "Completa" : "Pendiente";
        saveTareas();
        renderTareas();
        Toastify({
          text: "Estado modificado",
          duration: 3000,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to right, #277bd4ff, rgba(29, 104, 141, 1)ff)",
          },
          onClick: function () { } // Callback after click
        }).showToast();
      };
      //--------------------------------------------------------------------////
      nuevoElemento.appendChild(botonBorrar);
      nuevoElemento.appendChild(botonModificar);
      listaDeTareas.appendChild(nuevoElemento);
    });
  }
  //--------------------------------------------------------------------////
  function saveBalance() {
    localStorage.setItem(STORAGE_BALANCE, totalCuenta.toString());
  }
  //--------------------------------------------------------------------////
  // Render inicial de tareas
  renderTareas();
  //--------------------------------------------------------------------////
  //LLAMADO A EVENTOS DEL DOM
  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const valor_tarea = tarea.value;
    const valor_fecha = fecha.value;
    let valor_estado = estado.value;


    //VALIDACION PARA ASEGUAR QUE LOS CAMPOS NO SE ENVIEN EN BCO
    if (valor_tarea !== "" && valor_fecha !== null && valor_estado !== "") {
      agregarTareas(valor_tarea, valor_fecha, valor_estado);
      saveTareas();
      renderTareas();

      // Mostrar notificación de tarea agregada
      Toastify({
        text: "Tarea agregada",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () { }
      }).showToast();

      // LIMPIAR INPUT
      tarea.value = "";
      tarea.focus();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debe completar todos los campos",
      });
    }
  });

  //---------------- SECCION GASTOS-----------------//
  //--------------------------------------------------------------------////
  //CREACION DEL ARRAY
  const arrayDeGastos = [];
  // Cargar gastos desde localStorage al iniciar
  const savedGastos = JSON.parse(localStorage.getItem(STORAGE_GASTOS)) || [];
  arrayDeGastos.push(...savedGastos);
  //--------------------------------------------------------------------////
  //RECICLAJE DE FUNCION DE ENTRAGA 1 PARA INSERTAR TAREAS AL RRAY
  function agregarGastos(gasto, monto, fecha) {
    const nuevoGasto = {
      gasto: gasto,
      monto: monto,
      fecha: fecha,
    };
    arrayDeGastos.push(nuevoGasto);
    return nuevoGasto;
  }
  //--------------------------------------------------------------------////
  //SELECCION DE NODOS DEL DOM
  const formulario_gastos = document.querySelector("#formulario_gastos");
  const gasto = document.querySelector("#gasto");
  const monto = document.querySelector("#monto");
  const fecha_gasto = document.querySelector("#fecha_compra");
  const listaDeGastos = document.querySelector("#lista_gastos");
  //--------------------------------------------------------------------////
  function saveGastos() {
    localStorage.setItem(STORAGE_GASTOS, JSON.stringify(arrayDeGastos));
  }
  function renderGastos() {
    listaDeGastos.innerHTML = "";
    arrayDeGastos.forEach((gastoObj, index) => {
      const nuevoElemento = document.createElement("li");
      nuevoElemento.textContent =
        "   " +
        gastoObj.gasto +
        " -- Monto: $" +
        gastoObj.monto +
        " -- Fecha: " +
        gastoObj.fecha;

      const botonBorrar = document.createElement("button");
      botonBorrar.textContent = "Borrar";
      botonBorrar.style.marginLeft = "10px";
      botonBorrar.style.borderRadius = "15px";
      botonBorrar.style.padding = "5px 10px";

      botonBorrar.onclick = () => {
        arrayDeGastos.splice(index, 1);
        saveGastos();
        renderGastos();
        Toastify({
          text: "Gasto eliminado",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "linear-gradient(to right, #b00c00ff, #cd2929ff)",
          },
          onClick: function () { }
        }).showToast();
      };

      nuevoElemento.appendChild(botonBorrar);
      listaDeGastos.appendChild(nuevoElemento);
    });
  }
  //--------------------------------------------------------------------////
  // Render inicial de gastos
  renderGastos();
  //--------------------------------------------------------------------////
  //LLAMADO A EVENTOS DEL DOM
  formulario_gastos.addEventListener("submit", function (event) {
    event.preventDefault();

    const valor_gasto = gasto.value;
    const valor_monto = monto.value;
    const valor_fecha = fecha_gasto.value;


    //VALIDACION PARA ASEGUAR QUE LOS CAMPOS NO SE ENVIEN EN BCO
    if (valor_gasto !== "" && valor_monto !== "" && valor_fecha !== "") {
      agregarGastos(valor_gasto, valor_monto, valor_fecha);
      saveGastos();
      renderGastos();
      Toastify({
        text: "Gasto agregado",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () { }
      }).showToast();

      // LIMPIAR INPUT
      gasto.value = "";
      monto.value = "";
      gasto.focus();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debe completar todos los campos",
      });
    }
  });

  // -------------------SECCION BALANCE / INGRESOS - EGRESOS-----------------------//
  const STORAGE_MOVIMIENTOS = 'movimientos';
  let totalCuenta = parseFloat(localStorage.getItem(STORAGE_BALANCE));
  if (isNaN(totalCuenta)) totalCuenta = 0;

  //INGRESAR DINERO A LA CUENTA
  function agregarDinero(deposito) {
    totalCuenta += deposito;
    return totalCuenta;
  }

  const deposito = document.querySelector("#depositado");
  const balance = document.querySelector("#balance");
  balance.textContent = "Disponible: $" + totalCuenta;
  const formularioIngreso = document.querySelector("#formulario_ingreso");
  const retirado = document.querySelector("#retirado");
  const formularioEgreso = document.querySelector("#formulario_egreso");
  const historialMovimientos = document.querySelector("#movimientos");

  // Cargar movimientos desde localStorage
  const arrayMovimientos = JSON.parse(localStorage.getItem(STORAGE_MOVIMIENTOS)) || [];

  function renderMovimientos() {
    historialMovimientos.innerHTML = "";
    arrayMovimientos.forEach((movimiento) => {
      const nuevoElemento = document.createElement("li");
      nuevoElemento.textContent = movimiento;
      historialMovimientos.appendChild(nuevoElemento);
    });
  }

  function saveMovimientos() {
    localStorage.setItem(STORAGE_MOVIMIENTOS, JSON.stringify(arrayMovimientos));
  }

  // Renderizar movimientos al iniciar
  renderMovimientos();

  //LLAMADO DE EVENTOS AL DOM
  formularioIngreso.addEventListener("submit", function (event) {
    event.preventDefault();

    const valor_depositado = parseFloat(deposito.value);


    if (valor_depositado > 0) {
      agregarDinero(valor_depositado);
      balance.textContent = "Disponible: $" + totalCuenta;
      saveBalance();
      const fecha = new Date();
      const textoMovimiento = "Ingresaste: $" + valor_depositado + " - " + fecha.toLocaleDateString() + " - " + fecha.toLocaleTimeString() + " - Balance a la fecha: $" + totalCuenta;
      arrayMovimientos.push(textoMovimiento);
      saveMovimientos();
      renderMovimientos();

      deposito.value = "";
      deposito.focus();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ingrese un monto valido",
      });
    }
  });

  //RETIRAR DINERO DE LA CUENTA --------------------------------------------------------
  function retirarDinero(retiro) {
    totalCuenta -= retiro;
    return totalCuenta;
  }

  formularioEgreso.addEventListener("submit", function (event) {
    event.preventDefault();

    const valor_retirado = parseFloat(retirado.value);


    if (valor_retirado > 0 && totalCuenta >= valor_retirado) {
      retirarDinero(valor_retirado);
      balance.textContent = "Disponible: $" + totalCuenta;
      saveBalance();
      const fecha = new Date();
      const textoMovimiento = "Retiraste: $" + valor_retirado + " - " + fecha.toLocaleDateString() + " - " + fecha.toLocaleTimeString() + " - Balance a la fecha: $" + totalCuenta;
      arrayMovimientos.push(textoMovimiento);
      saveMovimientos();
      renderMovimientos();

      retirado.value = "";
      retirado.focus();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ingrese un monto valido // Asegurese de tener dinero en su cuenta",
      });
    }
  });
});
