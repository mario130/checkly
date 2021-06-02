import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IListsResponse } from 'src/app/interfaces/lists'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  listsFetched = new Subject()
  // allLists!: IListsResponse
  listsResponse!: IListsResponse
  listsEdited = new Subject()

  private url = environment.apiUrl + '/lists/'

  constructor(private http: HttpClient) { }

  getLists() {
    this.http.get<IListsResponse>(this.url + 'getLists').subscribe(
      (res) => {
        this.listsResponse = res
        this.listsFetched.next(this.listsResponse)
      }
    )
  }

  updateLists(newLists: any) {
    this.http.post(this.url + 'editLists', {
      newLists: newLists
    }).subscribe(
      (res) => {
        // console.log(res)
        this.listsEdited.next(res)
      }
    )
  }
}
