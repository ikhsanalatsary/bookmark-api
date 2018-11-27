## Bookmarks APIs

url: https://bookmarks-apis.herokuapp.com/

### End point

| path | description | params | verbs |
| ---- | ----------- | ------ | ----- |
| /api/bookmarks  | bookmarks data  | /:id | `POST`, `PUT`, `GET`, `DELETE`, `PATCH` |
| /api/categories | categories data | /:id | `POST`, `PUT`, `GET`, `DELETE`, `PATCH` |

### Example

```javascript
  let BASE_URL = 'https://bookmarks-apis.herokuapp.com'

  // GET All
  fetch(`${BASE_URL}/api/bookmarks`).then();

  // POST (create)
  fetch(`${BASE_URL}/api/bookmarks`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    body: JSON.stringify(data)
  }).then();

  // GET by id (show single bookmark)
  fetch(`${BASE_URL}/api/bookmarks/${id}`).then();

  // DELETE by id (remove single bookmark)
  fetch(`${BASE_URL}/api/bookmarks/${id}`, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
  }).then();

  // PUT by id (update single bookmark)
  fetch(`${BASE_URL}/api/bookmarks/${id}`, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
  }).then();
```

For Xcidic course. Xploring JavaScript!
