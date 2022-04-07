import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CustomerListPageComponent } from './customer-list-page/customer-list-page.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CustomerService } from './customer.service';
import { CustomerMockService } from './customer-mock.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomerCreateDialogComponent } from './customer-create-dialog/customer-create-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { StatusIconPipe } from './status-icon.pipe';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    CustomerListPageComponent,
    CustomerCreateDialogComponent,
    CustomerDetailComponent,
    StatusIconPipe,
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    FlexLayoutModule,
    CustomerRoutingModule,
    MatListModule,
//     EffectsModule.forFeature([CustomerEffects])
// }
  ],
  providers: [

      CustomerService
  ],
  entryComponents:[
    CustomerCreateDialogComponent
  ]
})
export class CustomerModule {}
