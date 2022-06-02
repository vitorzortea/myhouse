import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/models/session.model';
import { SessionService } from 'src/app/services/session.service';
import { TableService } from 'src/app/services/table.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.styl']
})
export class SessionsComponent implements OnInit {
  list: Session[] = [];

  constructor(
    private seviceTable: TableService,
    private service: SessionService,
  ) { }

  ngOnInit(): void {
    this.service.list().subscribe((res)=>{ this.list = res.sort((a, b)=>{
      if (a.inicio > b.inicio) { return -1; }
      if (a.inicio < b.inicio) { return 1; }
      return 0;
    })})
  }
  tooglePago(item: Session){
    item.pago = !item.pago;
    this.service.createOrUpdate(item);
  }
  delete(item){
    //this.service.delete(id)
    Swal.fire({
      title: "Remover",
      text: "Tem certeza que deseja remover esse período?",
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: `Sim`,
      denyButtonText: `Não`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.seviceTable.delete(item.table).then(()=>{
          this.service.delete(item.id).then(()=>{Swal.fire('Removido!', 'Item removido com sucesso', 'success')})
        })
      } 
    })
  }

}
