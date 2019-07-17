import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import {JhipsterSampleApplicationTaskModule} from 'app/entities/task/task.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule.forChild([
      {
        path: 'task',
        loadChildren: './task/task.module#JhipsterSampleApplicationTaskModule'
      },
      {
        path: 'comment',
        loadChildren: './comment/comment.module#JhipsterSampleApplicationCommentModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  exports: [JhipsterSampleApplicationTaskModule],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationEntityModule {}
