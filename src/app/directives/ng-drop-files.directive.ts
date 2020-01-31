import { FileItem } from '../models/file-items';
import {
  Directive, EventEmitter, ElementRef,
  HostListener, Input, Output
} from '@angular/core';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivos: FileItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.mouseSobre.emit(true);
    // Prevenimos que no se abra la imagen que arrastramos
    this._prevenirDetener(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseSobre.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {

    const trasferencia = this._getTransferencia(event);

    if (!trasferencia) {
      return;
    }

    this._extraerArchivos(trasferencia.files);

    this._prevenirDetener(event);

    this.mouseSobre.emit(false);
  }

  private _getTransferencia(event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extraerArchivos(archivosLista: FileList) {
    console.log(archivosLista);
    // tslint:disable-next-line:forin
    for (const propiedad in Object.getOwnPropertyNames(archivosLista)) {
      const archivoTemporal = archivosLista[propiedad];
      if (this._archivoPuedeSerCargado(archivoTemporal)) {
        const nuevoArchivo = new FileItem(archivoTemporal);
        this.archivos.push(nuevoArchivo);
      }
    }
    console.log(this.archivos);
  }


  // Validaciones

  private _archivoPuedeSerCargado(archivo: File): boolean {
    if (!this._archivoExistenteArray(archivo.name) && this._isImagen(archivo.type)) {
      return true;
    }
    return false;
  }

  private _prevenirDetener(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoExistenteArray(nombreArchivo: string): boolean {
    for (const archivo of this.archivos) {
      if (archivo.nombreArchivo === nombreArchivo) {
        console.error('Fichero ya añadido a la zona');
        return true;
      }
    }
    return false;
  }

  private _isImagen(tipoArchivo: string): boolean {
    return (tipoArchivo === '' || tipoArchivo === undefined) ? false :
      tipoArchivo.startsWith('image');
  }




}
