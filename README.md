## Bookmarks APIs

url: https://apicollections.herokuapp.com

### End point

| path                    | description             | params | verbs                                   |
| ----------------------- | ----------------------- | ------ | --------------------------------------- |
| /api/articles           | articles data           | /:id   | `POST`, `PUT`, `GET`, `DELETE`, `PATCH` |
| /api/article-categories | article categories data | /:id   | `POST`, `PUT`, `GET`, `DELETE`, `PATCH` |
| /api/bookmarks          | bookmarks data          | /:id   | `POST`, `PUT`, `GET`, `DELETE`, `PATCH` |
| /api/categories         | categories data         | /:id   | `POST`, `PUT`, `GET`, `DELETE`, `PATCH` |
| /api/quotes         | quotes data         | /:id   | `POST`, `PUT`, `GET`, `DELETE`, `PATCH` |
| /api/quotes?skip=0&sort[text]=1&sort[author]=1        | quotes with params skip & sort         | multiple   | `GET` |
| /api/quotes?page=1&limit=10&sort[text]=-1&sort[author]=-1        | quotes with params page, limit & sort         | multiple   | `GET` |
| /api/quotes?q=steve        | quotes with params q for search         | multiple   | `GET` |

### Example

```javascript
let BASE_URL = "https://apicollections.herokuapp.com";

// Bookmark API
// GET All
fetch(`${BASE_URL}/api/bookmarks`).then();

// POST (create)
fetch(`${BASE_URL}/api/bookmarks`, {
  method: "POST", // *GET, POST, PUT, DELETE, etc.
  body: JSON.stringify(data)
}).then();

// GET by id (show single bookmark)
// params id
fetch(`${BASE_URL}/api/bookmarks/${id}`).then();

// DELETE by id (remove single bookmark)
// params id
fetch(`${BASE_URL}/api/bookmarks/${id}`, {
  method: "DELETE" // *GET, POST, PUT, DELETE, etc.
}).then();

// PUT by id (update single bookmark)
// params id
fetch(`${BASE_URL}/api/bookmarks/${id}`, {
  method: "PUT", // *GET, POST, PUT, DELETE, etc.
  body: JSON.stringify(data)
}).then();

// Article API

// GET All
fetch(`${BASE_URL}/api/articles`).then();

// POST (create)
fetch(`${BASE_URL}/api/articles`, {
  method: "POST", // *GET, POST, PUT, DELETE, etc.
  body: JSON.stringify(data)
}).then();

// GET by id (show single article)
// params id
fetch(`${BASE_URL}/api/articles/${id}`).then();

// DELETE by id (remove single article)
// params id
fetch(`${BASE_URL}/api/articles/${id}`, {
  method: "DELETE" // *GET, POST, PUT, DELETE, etc.
}).then();

// PUT by id (update single article)
// params id
fetch(`${BASE_URL}/api/articles/${id}`, {
  method: "PUT", // *GET, POST, PUT, DELETE, etc.
  body: JSON.stringify(data)
}).then();
```

## Implementation Axios

```javascript
const BASE_URL = "https://bookmarks-apis.herokuapp.com";
const articleUrl = BASE_URL + "/api/articles";

// GET Semua Articles (nge list)
axios
  .get(articleUrl)
  .then()
  .catch();

// GET Semua Articles berdasar category
const category = 'hsafdjsdfhjsdf' // category id
axios
  .get(articleUrl + '?' + 'category=' + category)
  .then()
  .catch();

// POST (buat baru)
axios
  .post(articleUrl, {
    title: "Fred",
    description: "Flintstone",
    categories: ["312637ncnsdfbjbbcd"]
  })
  .then()
  .catch();

// PUT (update berdasarkan id)
const _id = "ahsdjasdhjasd2346237bdsc7234b";
axios
  .put(articleUrl + "/" + _id, {
    title: "Fred",
    description: "Flintstone",
    categories: ["312637ncnsdfbjbbcd"]
  })
  .then()
  .catch();

// DELETE (hapus berdasarkan id)
axios
  .delete(articleUrl + "/" + _id)
  .then()
  .catch();

// GET article dengan id
axios
  .get(articleUrl + "/" + _id)
  .then()
  .catch();
```

Happy Xploring JavaScript!
