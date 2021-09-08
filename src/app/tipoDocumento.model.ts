export class TipoDocumento{
    public idTipoDocumento: number;
	public nombreDocumento:string;

    public getIdTipoDocumento() {
		return this.idTipoDocumento;
	}
	public setIdTipoDocumento(idTipoDocumento:number) {
		this.idTipoDocumento = idTipoDocumento;
	}
	public getNombreDocumento() {
		return this.nombreDocumento;
	}
	public setNombreDocumento(nombreDocumento:string) {
		this.nombreDocumento = nombreDocumento;
	}
}