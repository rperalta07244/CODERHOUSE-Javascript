const prompt = require("prompt-sync")({ sigint: true });

//0. Mostar menu-------------------------------------------------------------------------
function mostarMenu() {
    console.log(
        "BIENVENIDO A TU AGENDA PERSONAL \n Elija una opcion: \n1.Agregar una tarea \n2.Ver lista de tareas \n3. Modificar estado de tarea \n4.Borrar una tarea \n5.Agregar dinero a tu cuenta \n6.Retirar dinero de tu cuenta \n7.Ver balance \n0.Salir"
    );
}

//--------------------------------------------------------------------------------------
//VARIABLES GLOBALES

let listaDeTareas = [];
let totalCuenta = 0;


//1 . CREAR ARRAY Y AGREGAR TAREAS ------------------------------------------------------

function agregarTareas(tarea, fecha, estado) {
  let nuevaTarea = {
    tarea: tarea,
    fecha: fecha,
    estado: estado,
  };
  listaDeTareas.push(nuevaTarea);
  console.log("Se agrego una nueva tarea con exito: ");
  console.log(listaDeTareas);
  return listaDeTareas;
}

// 3. MODIFICAR ESTADO DE TAREA

 function modificarTarea(indice, estado) {
    listaDeTareas[indice].estado =  estado;
    console.log("Usted ha modificado el estado de la tarea en indice [" + indice + "] con exito." );
    console.log("La lista de tareas ha sido modificada");
    console.log(listaDeTareas);
 }

// 4. ELIMINAR TAREA ---------------------------------------------------------------------

function eliminarTarea(indiceTarea) {
  if (indiceTarea >= 0 && indiceTarea < listaDeTareas.length) {
    listaDeTareas.splice(indiceTarea, 1);
    console.log("La tarea de índice: " + indiceTarea +". Ha sido eliminada correctamente");
} else {
    console.log("Indice Invalido");  
}  
}  

//5. RETIRAR DINERO DE LA CUENTA -  -------------------------------------------------------

function agregarDinero(deposito) {
totalCuenta += deposito;
console.log("Usted ha depositado: $" + deposito + ". Su nuevo balance es de: $" + totalCuenta);
return totalCuenta;
}

//6. RETIRAR DINERO DE LA CUENTA --------------------------------------------------------

function retirarDinero(retiro) {
    totalCuenta -= retiro;
    console.log("Usted ha retirado: $" + retiro + ". Su nuevo balance es de: $" + totalCuenta);
    return totalCuenta;
}


// FUNCION DE MENU E INTERACCION - RECORDAR ACTUALIZAR SWITCH ----------------------------

function interactuar() {
    let opcion = -1;  
    while (opcion != 0) {
        mostarMenu();  
        opcion = parseInt(prompt("Ingrese una opcion de la lista: "));
        switch (opcion) {
            case 1: //agregar tareas  
            agregarTareas(
                prompt("Ingrese la tarea: "),  
                prompt("Ingrese la fecha (dd/mm/aa): "),
          prompt("Ingrese el estado (Pendiente/Completa): ")
        );  
        break;
      case 2: //mostrar tareas agregadas
        console.log("Esta es tu lista de tareas: ");
        console.log(listaDeTareas);
        break;
        case 3: //modificar estado de tarea
        modificarTarea(parseInt(prompt("Ingrese el indice de la tarea a modificar: ")), prompt("Ingrese el nuevo estado de la tarea (Pendiente / Completa): "));
        break;  
        case 4: //borrar una tarea agregada  
        eliminarTarea(parseInt(prompt("Elija el indice de la tarea a eliminar: ")));
        console.log(listaDeTareas);
        break;
      case 5:
        agregarDinero(parseFloat(prompt("Ingrese la cantidad a depositar (c/centavos): $")));  
        break;
      case 6:
        retirarDinero(parseFloat(prompt("Ingrese la cantidad a retirar (c/centavos): $")));  
        break;
      case 7:
        console.log("El balance de su cuenta es: $" + totalCuenta);  
        break;  
      case 0:
        console.log("Ha cerrado el programa, gracias por utilizar la app.");  
        break;
      default:
        console.log("Ingrese una opcion valida");  
        break;
    }    
  }  
}  


interactuar();
