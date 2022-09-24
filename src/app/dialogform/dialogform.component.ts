import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { ApiService } from './../services/api.service';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog'
@Component({
  selector: 'app-dialogform',
  templateUrl: './dialogform.component.html',
  styleUrls: ['./dialogform.component.scss']
})
export class DialogformComponent implements OnInit {

  donationPurposes = ["Medical Transplant(MT)","Educational Research(ER)","Both MT and ER"];
  donorDetailsForm !: FormGroup;
  actionButton:string ="Submit"

  constructor(private formBuilder:FormBuilder,private api:ApiService,
    @Inject(MAT_DIALOG_DATA) public editDonor:any,
    private dialogRef : MatDialogRef<DialogformComponent>) { }

  ngOnInit(): void {
    this.donorDetailsForm=this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      age:['',Validators.required],
      dob:['',Validators.required],
      address:['',Validators.required],
      phoneNo:['',Validators.required],
      bloodGroup:['',Validators.required],
      healthDetails:['',Validators.required],
      organstoDonate:['',Validators.required],
      specificPurpose:['',Validators.required],
    })

    if(this.editDonor){
      this.actionButton="Update";
      this.donorDetailsForm.controls['firstName'].setValue(this.editDonor.firstName)
      this.donorDetailsForm.controls['lastName'].setValue(this.editDonor.lastName)
      this.donorDetailsForm.controls['age'].setValue(this.editDonor.age)
      this.donorDetailsForm.controls['dob'].setValue(this.editDonor.dob)
      this.donorDetailsForm.controls['address'].setValue(this.editDonor.address)
      this.donorDetailsForm.controls['phoneNo'].setValue(this.editDonor.phoneNo)
      this.donorDetailsForm.controls['bloodGroup'].setValue(this.editDonor.bloodGroup)
      this.donorDetailsForm.controls['healthDetails'].setValue(this.editDonor.healthDetails)
      this.donorDetailsForm.controls['organstoDonate'].setValue(this.editDonor.organstoDonate)
      this.donorDetailsForm.controls['specificPurpose'].setValue(this.editDonor.specificPurpose)
    }

  }

  addDonors(){

    if(!this.editDonor){
      if(this.donorDetailsForm.valid){
        this.api.postDonor(this.donorDetailsForm.value)
        .subscribe({
          next:(res)=>{
            alert("You are added to the Donors List!😊 You are a saver!❤️‍🔥")
            this.donorDetailsForm.reset()
            this.dialogRef.close('submit')
          },
          error:()=>{
            alert("You are added to the Donors List!🥹💔")
          }
        })
      }
    }

    else{
      this.updateDonor()
    }
  }

  updateDonor(){
    this.api.putDonor(this.donorDetailsForm.value,this.editDonor.id)
    .subscribe({
      next:(res)=>{
        alert("Details Updated Successfully")
        this.donorDetailsForm.reset()
          this.dialogRef.close('updated')
      },
      error:()=>{
        alert("Details not Updated🥹")
      }
    })
  }
}
