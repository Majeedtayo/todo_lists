import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
  TaskComponent,
  TaskDetailComponent,
  TaskUpdateComponent,
  TaskDeletePopupComponent,
  TaskDeleteDialogComponent,
  taskRoute,
  taskPopupRoute
} from './';
import {JhipsterSampleApplicationHomeModule} from 'app/home';
import {OwlDateTimeModule} from 'ng-pick-datetime';
import {AngularDateTimePickerModule} from 'angular2-datetimepicker';

const ENTITY_STATES = [...taskRoute, ...taskPopupRoute];

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES), OwlDateTimeModule, AngularDateTimePickerModule],
  declarations: [TaskComponent, TaskDetailComponent, TaskUpdateComponent, TaskDeleteDialogComponent, TaskDeletePopupComponent],
  entryComponents: [TaskComponent, TaskUpdateComponent, TaskDeleteDialogComponent, TaskDeletePopupComponent],
  exports: [
    TaskComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationTaskModule {}
