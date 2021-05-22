interface IList {
  name: string,
  content: { name: string, done: boolean }[]
}

export interface IListsResponse { // Must turn it to array to loop through it!
  status: string,
  message?: string
  // lists?: { name: string }[]
  lists: IList[]
}
