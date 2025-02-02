import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { USER_RULES } from 'src/entities/user';
import { DynamicDialogControl } from 'src/shared/foundations';
import { BaseForm } from 'src/shared/foundations/form';
import { StepControl } from 'src/shared/foundations/stepper';
import { ToFormGroup } from 'src/shared/types';

@Component({
    selector: 'step-02',
    templateUrl: './step02.ui.html',
    imports: [
        ReactiveFormsModule,
    ],
})
export class Step02UI extends BaseForm {

    readonly userRules = USER_RULES;
    override formGroup: FormGroup<ToFormGroup<{ otp: string }>>;

    private readonly email: string;
    private readonly fb = inject(FormBuilder);
    private readonly stepControl = inject(StepControl);
    private readonly ddc = inject(DynamicDialogControl);

    constructor() {
        super();

        this.email = this.ddc.getData<{ email: string }>().email;

        this.formGroup = this.fb.group({
            otp: this.fb.nonNullable.control('', [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(6),
            ]),
        });
    }

    onSubmit() {
        if (!this.formGroup.valid) {
            this.formGroup.markAllAsTouched();
            return;
        }
        const { otp } = this.formGroup.getRawValue();

        this.stepControl.next({
            otp,
            email: this.email,
        });
    }
}
