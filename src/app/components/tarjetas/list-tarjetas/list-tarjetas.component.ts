import { Component, OnInit } from '@angular/core';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-list-tarjetas',
  templateUrl: './list-tarjetas.component.html',
  styleUrls: ['./list-tarjetas.component.css']
})
export class ListTarjetasComponent implements OnInit {

  constructor(public tarjetaService: TarjetaService,
              public toastr: ToastrService) { }

  ngOnInit(): void {
    this.tarjetaService.obtenerTarjetas();
  }

  eliminarTarjeta(id: number){
    if(confirm("¿Esta seguro de Eliminar el Registro?")){
      this.tarjetaService.eliminarTarjeta(id).subscribe(data => {
        this.toastr.error('Registro Eliminado','La tarjeta fue Eliminada');
        this.tarjetaService.obtenerTarjetas();
      })
    }
  }

  editar(tarjeta){
    this.tarjetaService.actualizar(tarjeta);
  }

}
