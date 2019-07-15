import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ITask, Task } from 'app/shared/model/task.model';
import { TaskService } from './task.service';
import { IUser, UserService } from 'app/core';
import {MY_NATIVE_FORMATS} from 'app/app.module';

@Component({
  selector: 'jhi-task-update',
  templateUrl: './task-update.component.html'
})
export class TaskUpdateComponent implements OnInit {

  today: Date = new Date();
  date: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'fullDate',
    defaultOpen: false,
    closeOnSelect: true
  };

  isSaving: boolean;

  users: IUser[];

  // cloneUsers = this.users;

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    description: [],
    done: [],
    createdDate: [null, [Validators.required]],
    schedule: [],
    priority: [],
    user: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected taskService: TaskService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {

    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ task }) => {
      this.updateForm(task);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.setUsers(res)), (res: HttpErrorResponse) => this.onError(res.message));
  }

  /*setUsers() {
    this.cloneUsers = [...this.users];
  }*/

  updateForm(task: ITask) {
    this.editForm.patchValue({
      id: task.id,
      title: task.title,
      description: task.description,
      done: task.done,
      createdDate: task.createdDate != null ? task.createdDate.format(DATE_TIME_FORMAT) : null,
      schedule: task.schedule != null ? task.schedule.format(DATE_TIME_FORMAT) : null,
      priority: task.priority,
      user: task.user
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const task = this.createFromForm();
    if (task.id !== undefined) {
      this.subscribeToSaveResponse(this.taskService.update(task));
    } else {
      this.subscribeToSaveResponse(this.taskService.create(task));
    }
  }

  private createFromForm(): ITask {
    const entity = {
      ...new Task(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      description: this.editForm.get(['description']).value,
      done: this.editForm.get(['done']).value,
      createdDate:
        this.editForm.get(['createdDate']).value != null ? moment(this.editForm.get(['createdDate']).value, DATE_TIME_FORMAT) : undefined,
      // schedule: this.editForm.get(['schedule']).value != null ? moment(this.editForm.get(['schedule']).value, DATE_TIME_FORMAT) : undefined,
      schedule: this.editForm.get(['schedule']).value != null ? moment(this.editForm.get(['schedule']).value, DATE_TIME_FORMAT) : undefined,
      priority: this.editForm.get(['priority']).value,
      user: this.editForm.get(['user']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITask>>) {
    result.subscribe((res: HttpResponse<ITask>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackUserById(index: number, item: IUser) {
      return item.id;
  }

  setUsers(userList: IUser[]) {
    this.users = [];
    console.log(userList);
    if (userList && userList.length > 0) {
      userList.forEach(user => {
        if (user.login !== 'system') {
          this.users.push(user);
        }
      });
    }
  }
}
