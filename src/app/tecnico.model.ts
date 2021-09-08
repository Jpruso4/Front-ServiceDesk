import { TipoDocumento } from "./tipoDocumento.model";
import { TipoTecnico } from "./tipoTecnico.model";

export class Tecnico{
    public idTecnico: number;
	public tipoDocumento: TipoDocumento;
	public tipoTecnico: TipoTecnico;
	public numeroDocumento: string;
	public nombres: string;
	public apellidos: string;
	public telefono: string ;
	public celular: string;
	public correo: string ;
	public contrasena: string;

    public getIdTecnico() {
		return this.idTecnico;
	}
	public setIdTecnico(idTecnico:number) {
		this.idTecnico = idTecnico;
	}
	public getTipoDocumento() {
		return this.tipoDocumento;
	}
	public setTipoDocumento(tipoDocumento:TipoDocumento) {
		this.tipoDocumento = tipoDocumento;
	}
	public getTipoTecnico() {
		return this.tipoTecnico;
	}
	public setTipoTecnico(tipoTecnico:TipoTecnico) {
		this.tipoTecnico = tipoTecnico;
	}
	public getNumeroDocumento() {
		return this.numeroDocumento;
	}
	public setNumeroDocumento(numeroDocumento:string) {
		this.numeroDocumento = numeroDocumento;
	}
	public getNombres() {
		return this.nombres;
	}
	public setNombres(nombres:string) {
		this.nombres = nombres;
	}
	public getApellidos() {
		return this.apellidos;
	}
	public setApellidos(apellidos:string) {
		this.apellidos = apellidos;
	}
	public getTelefono() {
		return this.telefono;
	}
	public setTelefono(telefono:string) {
		this.telefono = telefono;
	}
	public getCelular() {
		return this.celular;
	}
	public setCelular(celular:string) {
		this.celular = celular;
	}
	public getCorreo() {
		return this.correo;
	}
	public setCorreo(correo:string) {
		this.correo = correo;
	}
	public getContrasena() {
		return this.contrasena;
	}
	public setContrasena(contrasena:string) {
		this.contrasena = contrasena;
	}
	
}