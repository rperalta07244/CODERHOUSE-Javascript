//----------- SECCION DE GESTION DE TAREAS -----------------------//

//CREACION DEL ARRAY
const arrayDeTareas = [];

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


//LLAMADO A EVENTOS DEL DOM
formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const valor_tarea = tarea.value;
  const valor_fecha = fecha.value;
  let valor_estado = estado.value;


  //VALIDACION PARA ASEGUAR QUE LOS CAMPOS NO SE ENVIEN EN BCO
  if (valor_tarea !== "" && valor_fecha !== null && valor_estado !== "") {
    agregarTareas(valor_tarea, valor_fecha, valor_estado);

    const nuevoElemento = document.createElement("li");
    nuevoElemento.textContent =
      valor_tarea + " -- Fecha: " + valor_fecha + " -- Estado: " + valor_estado;
    
    // Crear botón de borrar
    const botonBorrar = document.createElement("button");
    botonBorrar.textContent = "Eliminar";
    botonBorrar.style.marginLeft = "10px";
    botonBorrar.style.fontWeight = "600";
    botonBorrar.style.borderRadius = "15px";
    botonBorrar.onclick = () => {
      nuevoElemento.remove();
      
    }
    nuevoElemento.appendChild(botonBorrar);
    listaDeTareas.appendChild(nuevoElemento);

    // ---------------BOTON MODIFICAR ESTADO ----------------------
    const botonModificar = document.createElement("button");
    botonModificar.textContent = "Modificar Estado";
    botonModificar.style.marginLeft = "10px";
    botonModificar.style.borderRadius = "15px";
    botonModificar.style.fontWeight = "600";

    // ESTA ES LA LOGICA QUE PENSE PERO NO FUNCIONA JAJAJA - SE QUE ME FALTA VOLVER  A IMPRIMIR O ACTUALIZAR PERO NO SE COMO AGREGARLO
    botonModificar.onclick = () => {
        if (valor_estado === "Pendiente") {
            valor_estado = "Completa";
        } else if (valor_estado === "Completa"){
            valor_estado = "Pendiente";
        }
        nuevoElemento.textContent = valor_tarea + " -- Fecha: " + valor_fecha + " -- Estado: " + valor_estado;
        nuevoElemento.appendChild(botonBorrar);
        nuevoElemento.appendChild(botonModificar);
        
      };
        nuevoElemento.appendChild(botonModificar);
    // LIMPIAR INPUT
    tarea.value = "";
    tarea.focus();
  } else {
    alert("DEBE COMPLETAR LOS CAMPOS");
  }
});

//---------------- SECCION GASTOS-----------------//

//CREACION DEL ARRAY
const arrayDeGastos = [];

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

//SELECCION DE NODOS DEL DOM
const formulario_gastos = document.querySelector("#formulario_gastos");
const gasto = document.querySelector("#gasto");
const monto = document.querySelector("#monto");
const fecha_gasto = document.querySelector("#fecha_compra");
const listaDeGastos = document.querySelector("#lista_gastos");

//LLAMADO A EVENTOS DEL DOM
formulario_gastos.addEventListener("submit", function (event) {
  event.preventDefault();

  const valor_gasto = gasto.value;
  const valor_monto = monto.value;
  const valor_fecha = fecha_gasto.value;


  //VALIDACION PARA ASEGUAR QUE LOS CAMPOS NO SE ENVIEN EN BCO
  if (valor_gasto !== "" && valor_monto > "0" && valor_fecha !== "") {
    agregarGastos(valor_gasto, valor_monto, valor_fecha);

    const nuevoElemento = document.createElement("li");
    nuevoElemento.textContent = 
      "   " +
      valor_gasto +
      " -- Monto: $" +
      valor_monto +
      " -- Fecha: " +
      valor_fecha;



    // BOTON DE BORRAR TAREA
    const botonBorrar = document.createElement("button");
    botonBorrar.textContent = "Borrar";
    botonBorrar.style.marginLeft = "10px";
    botonBorrar.style.borderRadius = "15px";
    botonBorrar.style.fontWeight = "600";
    botonBorrar.onclick = () => nuevoElemento.remove();

    nuevoElemento.appendChild(botonBorrar);
    listaDeGastos.appendChild(nuevoElemento);

    // LIMPIAR INPUT
    gasto.value = "";
    monto.value = "";
    gasto.focus();
  } else {
    alert("DEBE COMPLETAR LOS CAMPOS");
  }
});

// -------------------SECCION BALANCE / INGRESOS - EGRESOS-----------------------//
let totalCuenta = 0;

//INGRESAR DINERO A LA CUENTA
function agregarDinero(deposito) {
  totalCuenta += deposito;
  return totalCuenta;
}

const deposito = document.querySelector("#depositado");
const balance = document.querySelector("#balance");
const formularioIngreso = document.querySelector("#formulario_ingreso");
const retirado = document.querySelector("#retirado");
const formularioEgreso = document.querySelector("#formulario_egreso");
const historialMovimientos = document.querySelector("#movimientos");

//LLAMADO DE EVENTOS AL DOM
formularioIngreso.addEventListener("submit", function (event) {
  event.preventDefault();

  const valor_depositado = parseFloat(deposito.value);


  if (valor_depositado > 0) {
    agregarDinero(valor_depositado);
    balance.textContent = "Disponible: $" + totalCuenta;
    const nuevoElemento = document.createElement("li");
    const fecha = new Date();

    nuevoElemento.textContent = "Ingresaste: $" + valor_depositado + " - " + fecha.toLocaleDateString() + " - " +  fecha.toLocaleTimeString() + " - Balance a la fecha: $" + totalCuenta;
    // HISTORIAL DE MOVIMIENTOS -Ingresos
    historialMovimientos.appendChild(nuevoElemento);

    deposito.value = "";
    deposito.focus();
  } else {
    alert("INGRESE UN MONTO VALIDO!");
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
    const nuevoElemento = document.createElement("li");
    const fecha = new Date();

    nuevoElemento.textContent = "Retiraste: $" + valor_retirado + " - " + fecha.toLocaleDateString() + " - " +  fecha.toLocaleTimeString() + " - Balance a la fecha: $" + totalCuenta;
    // HISTORIAL DE MOVIMIENTOS - egresos
    historialMovimientos.appendChild(nuevoElemento);

    retirado.value = "";
    retirado.focus();
  } else {
    alert("INGRESE UN MONTO VALIDO! // ASEGURESE DE TENER DINERO EN SU CUENTA");
  }
});
