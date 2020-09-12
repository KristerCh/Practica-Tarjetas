import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { TarjetaCredito } from 'src/app/models/tarjetaCredito';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit, OnDestroy {

  formulario: FormGroup;
  suscription: Subscription;
  tarjeta: TarjetaCredito;
  idTarjeta = 0;

  constructor(private formBuilder: FormBuilder, 
    private tarjetaService: TarjetaService,
    private toastr: ToastrService) { 
    this.formulario = this.formBuilder.group({
      id: 0,
      titular: ['', [Validators.required]],
      numeroTarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
      
    })
    }

  ngOnInit(): void {
    this.suscription = this.tarjetaService.obtenerTarjeta().subscribe(data => {
      console.log(data);
      this.tarjeta = data;
      this.formulario.patchValue({
        titular: this.tarjeta.titular,
        numeroTarjeta: this.tarjeta.numeroTarjeta,
        fechaExpiracion: this.tarjeta.fechaExpiracion,
        cvv: this.tarjeta.cvv
      });
      this.idTarjeta = this.tarjeta.id;
    });
  }

  ngOnDestroy(){
    this.suscription.unsubscribe();
  }

  guardarTarjeta(){
    if(this.idTarjeta == 0){
      this.agregar();
    }else{
      this.editar();
    }

  }

  agregar(){
    const tarjeta: TarjetaCredito = {
      titular: this.formulario.get('titular').value,
      numeroTarjeta: this.formulario.get('numeroTarjeta').value,
      fechaExpiracion: this.formulario.get('fechaExpiracion').value,
      cvv: this.formulario.get('cvv').value
    }
    
    this.tarjetaService.guardarTarjeta(tarjeta).subscribe(data => {
      this.toastr.success('Registro Agregado', 'La Tarjeta fue agregada');
      this.tarjetaService.obtenerTarjetas();
      this.formulario.reset();
    });
  }

  editar(){
    const tarjeta: TarjetaCredito = {
      id: this.tarjeta.id,
      titular: this.formulario.get('titular').value,
      numeroTarjeta: this.formulario.get('numeroTarjeta').value,
      fechaExpiracion: this.formulario.get('fechaExpiracion').value,
      cvv: this.formulario.get('cvv').value
    };

    this.tarjetaService.actualizarTarjeta(this.idTarjeta, tarjeta).subscribe(data => {
      this.toastr.warning('Registro Actualizado', 'La Tarjeta fue Actualizada');
      this.tarjetaService.obtenerTarjetas();
      this.formulario.reset();
      this.idTarjeta = 0;
    });
  }
}
