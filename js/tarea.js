// Variables
const formulario = document.querySelector('#formulario');
const listaTareas = document.querySelector('#lista-tareas'); // Verificamos que esto exista en el HTML
let tareas = [];

// Event listeners
eventlisteners();

function eventlisteners() {
    if (formulario) {
        formulario.addEventListener('submit', agregarTarea);
    }

    document.addEventListener('DOMContentLoaded', () => {
        // Cargar las tareas desde localStorage al cargar la página
        tareas = JSON.parse(localStorage.getItem('tareas')) || [];
        // console.log('Tareas cargadas al inicio:', tareas);
        crearHTML(); // Mostrar las tareas en la lista
    });
    
}

// Funciones
function agregarTarea(e) {
    e.preventDefault();

    // Obtener valores del formulario
    const tituloTarea = document.querySelector('#tituloTarea').value;
    const prioridad = document.querySelector('#prioridad').value;
    const descripcion = document.querySelector('#descripcion').value;

    // Validación: verificar que no falten campos
    if (tituloTarea === '' || prioridad === '' || descripcion === '') {
        mostrarError('Faltan elementos');
        return;
    }

    // Crear objeto tarea
    const tareaObj = {
        id: Date.now(),
        tituloTarea: tituloTarea,
        prioridad: prioridad,
        descripcion: descripcion,
    };

    // Añadir la tarea al arreglo de tareas
    tareas = [...tareas, tareaObj];

    // Depuración: Verificar que la tarea se ha añadido correctamente
    // console.log('Tareas después de agregar:', tareas);

    // Crear el HTML para mostrar la tarea en la lista
    crearHTML();
    mostrarSuccess(tareaObj.tituloTarea);

    // Guardar tareas en localStorage
    sincronizarStorage();

    // Limpiar el formulario
    formulario.reset();
}

function crearHTML() {
    if (!listaTareas) return; // Si no hay lista de tareas, salir de la función

    limpiarHTML(); // Limpiar el HTML antes de agregar las nuevas tareas

    // Si hay tareas, iterar y mostrarlas
    if (tareas.length > 0) {
        tareas.forEach((tarea) => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center','m-2');

            li.innerHTML = `
                <span>${tarea.tituloTarea} - Prioridad: ${tarea.prioridad} - ${tarea.descripcion}</span>
            `;

            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-success', 'btn-sm','rounded-pill');
            btnEliminar.innerText = 'Completar';
            

            // Función para eliminar la tarea
            btnEliminar.onclick = () => borrarTarea(tarea.id);
            // btnEliminar.onclick = () => mostrarSuccessTarea(tarea.tituloTarea);

            li.appendChild(btnEliminar);
            listaTareas.appendChild(li);
        });
        
    }

    // Asegurar que las tareas se guarden en el almacenamiento local
    sincronizarStorage();
}

// Sincronizar las tareas con el localStorage
function sincronizarStorage() {
    // console.log("Sincronizando almacenamiento:", tareas);
    localStorage.setItem('tareas', JSON.stringify(tareas));

    // Depuración: Verificar si se guardaron bien en el localStorage
    const tareasGuardadas = JSON.parse(localStorage.getItem('tareas'));
    // console.log("Tareas en localStorage después de guardar:", tareasGuardadas);
}

// Limpiar el HTML
function limpiarHTML() {
    while (listaTareas.firstChild) {
        listaTareas.removeChild(listaTareas.firstChild);
    }
}

// Borrar tarea
function borrarTarea(id) {
    // Filtrar las tareas, manteniendo solo las que no coincidan con el id
    tareas = tareas.filter((tarea) => tarea.id !== id);
    crearHTML(); // Volver a crear el HTML para actualizar la lista
}

// Mostrar mensaje de error
function mostrarError(error) {
    Swal.fire({
        position: "center",
        icon: "error",
        title: error,
        showConfirmButton: false,
        timer: 1100
      });
}

// Mostrar mensaje de éxito
function mostrarSuccess(tarea) {
    Swal.fire({
        position: "center",
        icon: "success",
        title: `Tarea <b> ${tarea}</b> guardada con exito!`,
        showConfirmButton: false,
        timer: 1500,
        footer: 'Puedes ver tus tareas en <b><a href="./mi_lista.html">MI LISTA </a></b>'
      });
}
function mostrarSuccessTarea(tarea) {
    Swal.fire({
        position: "center",
        icon: "success",
        title: 'aaa',
        showConfirmButton: false,
        timer: 1500,
        footer: 'Puedes ver tus tareas en <b><a href="./mi_lista.html">MI LISTA </a></b>'
      });
}
