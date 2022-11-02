import { existsSync, writeFileSync, readFileSync } from 'fs';

const archivo = './db/data.json'

const guardarDB = (data) => {
    writeFileSync(archivo, JSON.stringify(data));
}

const leerDB = () => {
    if( !existsSync(archivo) ) {
        return null;
    }

    const info = readFileSync(archivo, {encoding: 'utf8'});
    const data = JSON.parse(info);
    //console.log(data);

    return data;
}

export {
    guardarDB,
    leerDB
}