import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from 'src/app/models/session.model';
import { Table } from 'src/app/models/table.model';
import { SessionService } from 'src/app/services/session.service';
import { TableService } from 'src/app/services/table.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.styl']
})
export class DetailComponent implements OnInit {  
  id: string;
  seesion: Session;
  tables: Table;
  lines: [ { nome: string, pagante: 'Vitor' | 'Fernando', valor: number, data: Date, } ];


  constructor(
    private serviceSession: SessionService,
    private service: TableService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((res:any)=>{
      this.id = res.params.id;
      this.serviceSession.get(this.id).subscribe(seesion=>{
        this.seesion=seesion
        this.service.get(this.seesion.table).subscribe((table)=>{
          this.tables=table;
          if(!table.hasOwnProperty("createOn")){
            this.router.navigate(['/'])
          }else{
            this.lines=table.lines;
          }
        })
      });
    });
  }

  addLine(){
    this.lines.push({ nome: '', pagante: 'Fernando', valor: undefined, data: new Date(), })
  }
  removeLine(i){
    this.lines.splice(i,1);
  }
  save(){
    this.tables.lines = this.lines;
    this.service.createOrUpdate(this.tables).then(()=>{
      Swal.fire('Salvo!', 'Tabela salva com sucesso', 'success');
    })
  }

  get valorVitor(): number{
    let valor = 0;
    if(this.lines){
      this.lines.forEach(e => {
        if(e.pagante == 'Vitor'){ valor = valor+e.valor }
      });
    }
    return valor
  }
  get valorFernando(): number{
    let valor = 0;
    if(this.lines){
      this.lines.forEach(e => {
        if(e.pagante == 'Fernando'){ valor = valor+e.valor }
      });
    }
    return valor
  }
  get valorCasa(): number{
    let valor = 0;
    if(this.lines){ this.lines.forEach(e => { valor = valor+e.valor }); }
    return valor
  }
  get divida(): any {
    if(this.valorFernando <= this.valorCasa/2){
      return {nome: 'Fernando', valor: (this.valorCasa/2) - this.valorFernando}
    }else{
      return {nome: 'Vitor', valor: (this.valorCasa/2) - this.valorVitor}
    }
  }

  toogleTab(index){
    const aba = document.querySelectorAll('#abas>button');
    const boxAba = document.querySelectorAll('.box-aba');
    aba.forEach(e =>{ e.classList.remove('select') });
    boxAba.forEach(e =>{ e.classList.remove('select') });
    aba[index].classList.add('select');
    boxAba[index].classList.add('select');
  }
  test(){
    console.log(this.lines)
  }

}
