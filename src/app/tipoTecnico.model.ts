export class TipoTecnico {
    public idTipoTecnico: number;
	public especialidad: string;

    public getIdTipoTecnico() {
		return this.idTipoTecnico;
	}
	public setIdTipoTecnico(idTipoTecnico:number) {
		this.idTipoTecnico = idTipoTecnico;
	}
	public getEspecialidad() {
		return this.especialidad;
	}
	public setEspecialidad(especialidad:string) {
		this.especialidad = especialidad;
	}
}