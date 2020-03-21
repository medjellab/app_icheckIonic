import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, Inject, Output, EventEmitter } from "@angular/core";
import { Icons } from 'src/shared';


import * as $ from 'jquery';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatDialog, MAT_DIALOG_DATA, MatDialogRef, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import * as moment from 'moment';
import { FormErrorStateMatcher } from 'src/core/handlers/form-error-state-matcher';

@Component({
    selector: 'app-vehicule-edit',
    templateUrl: './vehicule-edit.component.html',
    styleUrls: ['./vehicule-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
        // `MatMomentDateModule` in your applications root module. We provide it at the component level
        // here, due to limitations of our example generation script.
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
        { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
    ]
})
export class VehiculeEditComponent implements OnInit {

    @Output() close = new EventEmitter();
    @Output() edit = new EventEmitter();
    @Input() engins: Observable<any[]>;

    editFormVehicule: FormGroup;
    date = new FormControl(moment());
    matcher = new FormErrorStateMatcher();
    fileData: File = null;
    previewUrl: any = null;
    selected: any;

    de: any;

    constructor(private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<VehiculeEditComponent>) { }

    ngOnInit() {
        this.editFormVehicule = this.formBuilder.group({
            type: ['', Validators.required],
            matricule: ['', Validators.required]
        });
        this.editFormVehicule.controls['matricule'].setValue(this.data.vehicule.matricule);
    }

    ngAfterViewInit(): void {
        this.de = moment(this.date.value).format('YYYY-MM-DD') + 'T00:00:00';
        // this.de = this.validateDate(moment(this.date.value).format('YYYY-MM-DD') + 'T00:00:00');
        console.log(`dateValidite : ${this.de}`);
    }

    closeDialog() {
        this.close.emit();
    }

    editVehicule(form) {
        if (!form.valid) {
            return;
        }

        this.edit.emit(form.value);
    }

    onChange(term) {
        console.log('Date: ', term.value);
        this.de = this.validateDate(term);
        console.log('date', this.de);
    }

    validateDate(date) {
        let result = `${date.value._i.year}`;
        const validateMonth = `${date.value._i.month}`;
        const validateDay = `${date.value._i.date}`;
        console.log('Month: ', validateMonth + ', Day: ' + validateDay);
        const time = 'T00:00:00';
        if (Number(validateMonth) < 9 && Number(validateDay) < 10) {
            result += `-0${Number(validateMonth) + 1}-0${validateDay}${time}`;
            // console.log('Resultat 1: ', result);
        } else {
            if (Number(validateMonth) >= 9) {
                result += `-${Number(validateMonth) + 1}`;
                // console.log('Resultat 2: ', result);
            } else {
                result += `-0${Number(validateMonth) + 1}`;
                // console.log('Resultat 3: ', result);
            }

            if (Number(validateDay) >= 10) {
                result += `-${validateDay}${time}`;
                // console.log('Resultat 4: ', result);
            } else {
                result += `-0${validateDay}${time}`;
                // console.log('Resultat 5: ', result);
            }
        }
        return result;
    }

    public upload(event: any): void {
        this.fileData = event.target.files[0];
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