import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IListsResponse } from 'src/app/interfaces/lists';
import { AuthService } from '../auth/auth.service';
import { ListsService } from './lists.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  listsResponse!: IListsResponse;
  mainList!: { name: string, done: boolean }[] // That's the "todo" list "doing" & "done" will be implemented later
  isAuthenticated = false

  constructor(private ListsService: ListsService, private router: Router, private authService: AuthService) {
    this.authService.isAuthenticated.subscribe(changeInAuth => {
      this.isAuthenticated = changeInAuth
    })

    if (!this.isAuthenticated) {
      this.router.navigate(['/auth'])
    }
  }

  ngOnInit(): void {
    this.ListsService.listsFetched.subscribe((response: any) => {
      this.listsResponse = response
      this.mainList = response.lists[0].content
      this.countPendingTasks()
    })
    this.ListsService.listsEdited.subscribe(() => {
      this.ListsService.getLists()
    })
    this.ListsService.getLists()
  }

  addNewTodo(newTodoForm: NgForm): void {
    this.mainList.push({ name: newTodoForm.value.newTodo, done: false })
    this.updateList()
    newTodoForm.reset()
  }

  countPendingTasks() {
    return this.mainList.filter(todo => todo.done == false).length
  }

  toggleDone(todo: { name: string, done: boolean }) {
    todo.done = !todo.done
    this.updateList()
  }

  deleteTodo(idxToDelete: number) {
    this.mainList = this.mainList.filter((todos, idx) => idx !== idxToDelete)
    this.updateList()
  }

  updateList() {
    this.ListsService.updateLists([{
      name: 'todos',
      content: [...this.mainList]
    }])
  }
}
