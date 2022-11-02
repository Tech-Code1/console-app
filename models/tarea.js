import { nanoid } from 'nanoid'

class Tarea {
    id = '';
    desc = '';
    completadoEn = null;

    constructor(desc) {
        this.id = nanoid();
        this.desc = desc;
        this.completadoEn = null;
    }
}

export default Tarea