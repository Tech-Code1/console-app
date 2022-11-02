import { guardarDB, leerDB } from './helpers/guardarArchivo.js';
import { 
    inquirerMenu, 
    pausa, 
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
} from './helpers/inquirer.js';
import Tareas from './models/tareas.js'
import colors from 'colors';



const main = async () => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    // Cargar tareas
    if( tareasDB ) {
        tareas.cargarTareasFromArray( tareasDB );
    }

    do {
        
        // Imprimir el menú
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                // Crear tarea
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea( desc );
                break;
            case '2':
                // Listar tarea
                tareas.listadoCompleto();
                break;
            case '3':
                // Listar Completadas
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                // Listar Pendientes
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                // Completar tarea(s)
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                // Borrar tareas
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if( id !== '0') {

                    const ok = await confirmar('¿Está seguro?')
                    if (ok) {
                        tareas.borrarTarea(id)
                        console.log("-------------");
                        console.log("Tarea borrada correctamente");
                    }
                } 
                
                break;
        
            default:
                break;
        }

        guardarDB(tareas.listadoArr);

        await pausa();

    } while (opt !== '0');

}

main();