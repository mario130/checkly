import { Component, OnInit } from '@angular/core';
import { IListsResponse } from 'src/app/interfaces/lists';
import { ListsService } from './lists.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  listsResponse!: IListsResponse;
  mainList!: { name: string }[]

  constructor(private ListsService: ListsService) { }

  ngOnInit(): void {
    this.ListsService.listsFetched.subscribe((response: any) => {
      this.listsResponse = response
      // console.log(response)
      this.mainList = response.lists[0].content
    })
    this.ListsService.getLists()
  }
}
