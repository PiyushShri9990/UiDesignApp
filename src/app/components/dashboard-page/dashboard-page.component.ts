import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { DetailModel } from './detail-dashboard.model';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit {
  formValue!: FormGroup;
  detailModelObj: DetailModel = new DetailModel();
  detailData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  constructor(private formBuilder: FormBuilder, private api: ApiService) {}
  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      phoneNumber: [''],
      emailAddress: [''],
    });
    this.getAllDetails();
  }

  clickAddDetails() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postDashboardDetails() {
    this.detailModelObj.name = this.formValue.value.name;
    this.detailModelObj.phoneNumber = this.formValue.value.phoneNumber;
    this.detailModelObj.emailAddress = this.formValue.value.emailAddress;

    this.api.postDetails(this.detailModelObj).subscribe(
      (res) => {
        console.log(res);
        alert('User Details updated successfully');
        let ref = document.getElementById('cancle');
        ref?.click();
        this.formValue.reset();
        this.getAllDetails();
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }

  getAllDetails() {
    this.api.getDetails().subscribe((res) => {
      this.detailData = res;
    });
  }

  deleteDetail(row: any) {
    this.api.deleteDetails(row.id).subscribe((res) => {
      alert('Details Deleted Successfully');
      this.getAllDetails();
    });
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.detailModelObj.id = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['phoneNumber'].setValue(row.phoneNumber);
    this.formValue.controls['emailAddress'].setValue(row.emailAddress);
  }

  updateDashboardDetails() {
    this.detailModelObj.name = this.formValue.value.name;
    this.detailModelObj.phoneNumber = this.formValue.value.phoneNumber;
    this.detailModelObj.emailAddress = this.formValue.value.emailAddress;

    this.api
      .updateDetails(this.detailModelObj, this.detailModelObj.id)
      .subscribe((res) => {
        alert('Updated Successfully');
        let ref = document.getElementById('cancle');
        ref?.click();
        this.formValue.reset();
        this.getAllDetails();
      });
  }
}
