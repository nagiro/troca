import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutochipsComponent } from './autochips/autochips.component';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatSelectModule, MatChipsModule, MatInputModule, MatCheckboxModule, MatDatepickerModule, MatCardModule } from '@angular/material';
import { FilterSelectTextPipe } from '../helpers/filter-select-text.pipe';
import { FilterSelectPipe } from '../helpers/filter-select.pipe';
import { FilterPipe } from '../helpers/filter.pipe';
import { SelectSearchComponent } from './select-search/select-search.component';
import { MatRadioModule } from '@angular/material/radio';
import { InputHelperComponent } from './input-helper/input-helper.component';
import { SelectHelperComponent } from './select-helper/select-helper.component';
import { DatepickerHelperComponent } from './datepicker-helper/datepicker-helper.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatChipsModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatTableModule,
  ],
  exports: [
    FilterSelectTextPipe,
    FilterSelectPipe,
    FilterPipe,
    AutochipsComponent,
    SelectSearchComponent,
    InputHelperComponent,
    SelectHelperComponent,
    DatepickerHelperComponent,
  ],
  declarations: [
    AutochipsComponent,
    FilterSelectPipe,
    FilterPipe,
    FilterSelectTextPipe,
    SelectSearchComponent,
    InputHelperComponent,
    SelectHelperComponent,
    DatepickerHelperComponent,
  ],
  entryComponents: [
    SelectSearchComponent,
  ]
})
export class FormHelperModule { }
