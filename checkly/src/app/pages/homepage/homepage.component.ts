import { Component, OnInit } from '@angular/core';
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
      // console.log(response)
      this.mainList = response.lists[0].content
    })
    this.ListsService.getLists()
  }
}
