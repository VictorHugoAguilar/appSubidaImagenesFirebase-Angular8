import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-items';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent implements OnInit {

  estaSobreElemento: boolean = false;
  archivos: FileItem[] = [];

  constructor(public _cargaImagenes: CargaImagenesService) { }

  ngOnInit() {
  }

  cargarImagenes() {
    this._cargaImagenes.cargarImagenesFirebase(this.archivos);
  }

  limpiarCargas() {
    console.log('limpiado zona de ficheros ....');
    this.archivos = [];
  }

  pruebaSobreElemento(event){
    console.log(event);
  }

}
