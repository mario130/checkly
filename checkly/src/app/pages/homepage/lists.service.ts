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

  private url = environment.apiUrl + '/lists/getLists'

  constructor(private http: HttpClient) { }

  getLists() {
    this.http.get<IListsResponse>(this.url).subscribe(
      (res) => {
        this.listsResponse = res
        this.listsFetched.next(this.listsResponse)
      }
    )
  }

}
