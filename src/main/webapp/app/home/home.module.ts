import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
// import {JhipsterSampleApplicationEntityModule} from 'app/entities/entity.module';
import {JhipsterSampleApplicationTaskModule} from 'app/entities/task/task.module';
 // import {JhipsterSampleApplicationTaskModule} from 'app/entities/task/task.module';
 // import {TaskComponent} from 'app/entities/task';

@NgModule({

  // imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild([HOME_ROUTE]), JhipsterSampleApplicationTaskModule],
  declarations: [HomeComponent],
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild([HOME_ROUTE])],
  exports: [
    HomeComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationHomeModule {}
