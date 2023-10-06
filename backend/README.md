# Running Project

- Entry **backend** Folder
- Install modules project

  ```json
  npm install
  ```

- Install nodemon globally

  ```json
  npm install nodemon -g
  ```

- And runnig project

  ```json
  nodemon index
  ```

# API Documentation

To run the API use **POSTMAN** or install the **REST Client** extension in VScode, then go to the **test-api.rest** file then **send request**.

The base URL for our API is `http://localhost:5000/`

## Member API

This API provides list members

### GET

- **URL:** `/members`
- **Method:** `GET`
- **Request Body:**

  **Success Response**

  ```json
  {
    "total": 1,
    "pageIndex": 0,
    "numberOfPages": 1,
    "data": [
      {
        "uuid": "member-uuid",
        "code": "member-code",
        "name": "member-name"
      }
    ]
  }
  ```

  **Error Response**

  ```json
  {
    "message": "Error message"
  }
  ```

## Book API

This API provides list books, borrow book and return book

### GET

- **URL:** `/books`
- **Method:** `GET`
- **Request Body:**

  **Success Response**

  ```json
  {
    "total": 1,
    "pageIndex": 0,
    "numberOfPages": 1,
    "data": [
      {
        "uuid": "book-uuid",
        "code": "book-code",
        "title": "book-title",
        "author": "book-author",
        "stock": 1
      }
    ]
  }
  ```

  **Error Response**

  ```json
  {
    "message": "Error message"
  }
  ```

### BORROW

- **URL:** `/books/borrow/{bookId}/{memberId}`
- **Method:** `POST`
- **Request Body:**

  **Success Response**

  ```json
  {
    "message": "Success message"
  }
  ```

  **Error Response**

  ```json
  {
    "message": "Error message"
  }
  ```

### RETURN

- **URL:** `/books/return/{bookId}/{memberId}`
- **Method:** `POST`
- **Request Body:**

  **Success Response**

  ```json
  {
    "message": "Success message"
  }
  ```

  **Error Response**

  ```json
  {
    "message": "Error message"
  }
  ```

## HISTORY

This API provides list history borrow by member and by book

### BY BOOK

- **URL:** `/history/book/{bookId}`
- **Method:** `GET`
- **Request Body:**

  **Success Response**

  ```json
  {
    "isActive": false,
    "createdAt": "2023-10-06T13:23:53.000Z",
    "updatedAt": "2023-10-06T13:23:56.000Z",
    "book": {
      "uuid": "book-uuid",
      "bookCode": "book-code",
      "title": "book-title",
      "author": "book-author"
    },
    "member": {
      "uuid": "member-uuid",
      "memberCode": "member-code",
      "name": "member-name"
    }
  }
  ```

  **Error Response**

  ```json
  {
    "message": "Error message"
  }
  ```

### BY MEMBER

- **URL:** `/history/member/{memberId}`
- **Method:** `GET`
- **Request Body:**

  **Success Response**

  ```json
  {
    "isActive": false,
    "createdAt": "2023-10-06T13:23:53.000Z",
    "updatedAt": "2023-10-06T13:23:56.000Z",
    "book": {
      "bookCode": "book-code",
      "title": "book-title",
      "author": "book-author"
    },
    "member": {
      "memberCode": "member-code",
      "name": "member-name"
    }
  }
  ```

  **Error Response**

  ```json
  {
    "message": "Error message"
  }
  ```
