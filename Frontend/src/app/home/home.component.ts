import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms'
import {ServiceService} from '../service/service.service'
import { MatTableDataSource, MatSort } from '@angular/material';
import {Router,ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
notes:any

notedata:MatTableDataSource<any>
displayedColumns:String[]=['notedata','action']
  constructor(private fb:FormBuilder,private service:ServiceService,private router:Router,private route:ActivatedRoute) {
   
    route.params.subscribe(val => {
      console.log("calling")
      this.ngOnInit();
    });
    
 //router.routeReuseStrategy.shouldReuseRoute=()=>false;
  }
noteForm=this.fb.group({
  notedata:[""]
})
  ngOnInit(){
  
    console.log("im ngonint")
    console.log(this.route.snapshot.params)
    console.log(this.route.snapshot.params)
  
    this.service.getsinglenote(this.route.snapshot.params['id']).subscribe(
      result=>{
        console.log(result)
        this.noteForm.setValue({
          notedata:result['data'][0].notedata
        })
      }
    )
    this.service.getnote().subscribe(result=>{
     this.notedata= new MatTableDataSource(result['data']);
    },
    err=>{
      console.log(err)
    })
   
   
 

  }
onSubmit()
{
  this.service.createnote(this.noteForm.value).subscribe(result=>
    {
      console.log(result)
     
    })
    this.router.navigate(['/home'])
    .then(() => {
      window.location.reload();
    });
    
}
logout()
{
  this.service.logout();
}

onEdit(id)
{
 
 this.router.navigate(['/home',id])
 
}
onUpdate()
{
  
  let id =this.route.snapshot.params['id']
  console.log(id)
  this.service.updatenote(id,this.noteForm.value).subscribe(
    result=>{
      console.log(result)
    }
  )
  this.router.navigate(['/home'])
  .then(() => {
    window.location.reload();
  });
}
onDelete(id)
{
  this.service.deletenote(id).subscribe(result=>{
    console.log(result)
  })
  this.router.navigate(['/home'])

}
}
