import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, Inject } from "@angular/core";
import { Icons } from 'src/shared';


import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { EnginService } from 'src/admin/services';

@Component({
    selector: 'app-vehicule-add',
    templateUrl: './vehicule-add.component.html',
    styleUrls: ['./vehicule-add.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehiculeAddComponent implements OnInit {
    formVehicule: FormGroup;
    date = new FormControl(moment());
    fileData: File = null;
    previewUrl: any = null;
    lhmIcon = Icons.lhmIcon;
    de: any;
    engins: any;


    constructor(private formBuilder: FormBuilder, private enginService: EnginService) { }

    ngOnInit() {
        this.formVehicule = this.formBuilder.group({
            type: ['', Validators.required],
            matricule: ['', Validators.required]
        });

        this.enginService.getEngins().subscribe(res => {
            if (res) {
              console.log('engin :', res)
              this.engins = res;
            }
          });
    }

    public upload(event: any): void {
        this.fileData = event.target.files[0];
        console.log('FileName: ', this.fileData.name);
        this.preview();
    }

    preview() {
        // Show preview 
        const mimeType = this.fileData.type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(this.fileData);
        reader.onload = (event) => {
            this.previewUrl = reader.result;
            console.log('Result: ', reader.result);
            console.log('Reader: ', this.previewUrl);
        };
    }
}