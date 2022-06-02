import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from 'src/app/models/session.model';
import { Table } from 'src/app/models/table.model';
import { SessionService } from 'src/app/services/session.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.styl']
})
export class AddSessionComponent implements OnInit {
  inicio: Date;
  final: Date;
  description: string;
  table:any = { createOn: new Date(), lines: [], }
  data:any = { createOn: new Date(), inicio: new Date(), final: new Date(), description: '', table: '', pago: false };

  constructor(
    private serviceTable: TableService, 
    private service: SessionService, 
    private router: Router,
  ) { }

  ngOnInit(): void {}
  save(){
    if(this.inicio){ this.data.inicio = new Date(this.inicio+'T00:00:00'); }
    if(this.final){ this.data.final = new Date(this.final+'T00:00:00')  ; }
    if(this.description){ this.data.description = this.description; }
    this.serviceTable.createOrUpdate(this.table).then(()=>{
      this.data.table = this.table.id;
      console.log(this.data)
      this.service.createOrUpdate(this.data).then(()=>{ this.router.navigate(['/']) });
    })
  }

}
