export interface IMensajeAlerta {
    titulo: string,
    descripcion: string,
    textoBoton?: string
}

export interface IPagina {
    titulo: string,
    componente: any,
    icono: string
}

export interface IUsuario {
    idUsuario: string,
    nombres: string,
    apellidos: string,
    email: string,
    telefono: string,
    activo: boolean,
    nombreImagen: string
}