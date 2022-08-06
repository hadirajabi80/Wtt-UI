import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/Services/project.service';

@Component({
  selector: 'app-admin-add-project',
  templateUrl: './admin-add-project.component.html',
  styleUrls: ['./admin-add-project.component.scss']
})
export class AdminAddProjectComponent implements OnInit {

  modalRef : NgbModalRef;
  projectName='';
  projectId:number=0;
  showDelete = false;
  constructor(public projectService:ProjectService,
    private modalService: NgbModal , 
    private toastr:ToastrService,
    ) { }
  ngOnInit(): void {
    this.projectService.getProjects();
  }
  open(content) {    
      this.modalRef = this.modalService.open( content ,{size:'md' , centered:true , backdrop:false});      
  }
  closeModal()
  {
    this.projectName=='';
  }
  onSave()
  {
    this.projectService.addProject(this.projectName)
    .subscribe(res=>{
      if(res)
      {
        this.projectService.project.push(res);
        this.toastr.success("پروژه با موفقیت اضافه شد");
        this.modalService.dismissAll();
 
      }
      else
      {
        this.toastr.error("عملیات انجام نشد"); 
      }
    })
  }
  onDeleteChild()
  {        
    this.projectService.deleteProject(this.projectId)
    .subscribe((res) => {
      if(res==true)
      {
     
        let index = this.projectService.project.findIndex(x=>x.id==this.projectId);                
        if (index > -1) this.projectService.project.splice(index, 1); 
        this.toastr.success("پروژه با موفقیت حذف شد");
        this.modalService.dismissAll();
        this.projectId=0;
      }      
      else
      {
        this.toastr.error("پروژه حذف نشد")
      }
    });
  }
  onSelect()
  {
    this.showDelete=true;
  }
}
