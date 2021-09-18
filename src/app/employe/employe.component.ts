import { Component, OnInit } from '@angular/core';
import{ FormBuilder,FormGroup } from '@angular/forms';
import{ ApiService } from '../shared/api.service';
import{ EmployeeModel } from './employe.module';


@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.scss']
})
export class EmployeComponent implements OnInit {
  formValue !:FormGroup;
  employeeModelObj: EmployeeModel=new EmployeeModel();
  employeeData !:any;
  showAdd!:boolean;
  showupdate!:boolean;
  constructor(private formbuilder:FormBuilder,
    private api:ApiService) { }

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      fname:[''],
      lname:[''],
      email:[''],
      phone:[''],
      salary:['']

    })
    this.getAllEmployee();
  }

  clickAddEmployee()
  {
    this.formValue.reset();
    this.showAdd=true;
    this.showupdate=false;
  }
postEmployeeDetails()
{
  this.employeeModelObj.firstname=this.formValue.value.fname;
  this.employeeModelObj.lastname=this.formValue.value.lname;
  this.employeeModelObj.email=this.formValue.value.email;
  this.employeeModelObj.mobile=this.formValue.value.phone;
  this.employeeModelObj.salary=this.formValue.value.salary;
  
  this.api.postEmployee(this.employeeModelObj)
  .subscribe(res=>{
    console.log(res); 
    alert("Employee Added sucessfully")
    this.formValue.reset();
    this.getAllEmployee();
   
  },
  err=>{
    alert("Something went Wrong")
    let ref=document.getElementById('cancel')
   //ref?.click();
  })
 }
 getAllEmployee(){
   this.api.getEmployee()
   .subscribe(res=>{
     this.employeeData=res;


   })

 }
 deleteEmployee(row: any){
   this.api.deleteEmployee(row.id)
   .subscribe(res=>{
     alert("Employee Deleted")
     this.getAllEmployee();

   })
   
 }
 onEdit(row:any){
  this.showAdd=false;
  this.showupdate=true;
   this.employeeModelObj.id=row.id;
   this.formValue.controls['fname'].setValue(row.firstname);
   this.formValue.controls['lname'].setValue(row.lastname);
   this.formValue.controls['email'].setValue(row.email);
   this.formValue.controls['phone'].setValue(row.mobile);
   this.formValue.controls['salary'].setValue(row.salary);

 }
 updateEmployeeDetails()
 {
  this.employeeModelObj.firstname=this.formValue.value.fname;
  this.employeeModelObj.lastname=this.formValue.value.lname;
  this.employeeModelObj.email=this.formValue.value.email;
  this.employeeModelObj.mobile=this.formValue.value.phone;
  this.employeeModelObj.salary=this.formValue.value.salary;
  this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
.subscribe(res=> {
  alert("updated Successfully");
  let ref=document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getAllEmployee();
})
}

}

