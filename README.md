# travel-news
Travel-News for Phase 2 Group Project

## **User Table**
---
| Field     | Datatype | Modifiers   |
|-----------|----------|-------------|
| id        | SERIAL   | PRIMARY KEY |
| full_name | VARCHAR  |             |
| email     | VARCHAR  | UNIQUE      |
| password  | VARCHAR  |             |
| createdAt | DATE     | NOT NULL    |
| updatedAt | DATE     | NOT NULL    |

## **Server Routes**
---
| Method | Route          | Description                                |
|--------|----------------|--------------------------------------------|
| GET    | /news          | Menampilkan berita travel terkini          |
| POST   | /login         | Login User Menggunakan Email & Password    |
| POST   | /register      | Register User Menggunakan Email & Password |
| POST   | /googlelogin   | Login User Menggunakan Google OAuth 2.0    |
| POST   | /githublogin   | Login User Menggunakan Github OAuth 2.0    |
| POST   | /facebooklogin | Login User Menggunakan Facebook OAuth 2.0  |

## **News**
---
  Mengembalikan data id beserta email berformat JSON setelah berhasil register.

* **URL**

  /news

* **Method:**

  `GET`
  
*  **URL Params**

   None

* **Data Params**

   None

* **Header Params**

   `accessToken: 'eyJhbXXXXXXXX.ayaXXXX'`

* **Success Response:**

  * **Code:** 200 **OK** <br />
    **Content:** 
    ```json
    {
        "berita": [
            {
                "title": "Kasus Corona Masih Tinggi ...",
                "imageURL": "https://awsimages.xxx.xxx/xxxx.jpg",
                "postURL": "https://travel.xxxx.xxx/travel-news/xxxxx",
                "pubish_date": "2020-10-29T17:00:00.000+07:00",
                "text": "Sejumlah destinasi mulai ....."
            },
            {
                "title": " ...",
                "imageURL": " ...",
                "postURL": " ...",
                "pubish_date": " ...",
                "text": " ..."
            }
        ],
        "cuaca": {
            "lat": -6.17,
            "lon": 106.83,
            "timezone": "Asia/Jakarta",
            "timezone_offset": 25200,
            "current": {
                "dt": 1603991317,
                "sunrise": "",
                "xxx": "xx",
                "weather": [
                    {
                      "id": 802,
                      "xxx": "xx"
                    },
                    {
                      "id": 802,
                      "xxx": "xx"
                    }
                ]
            },
            "daily": [
                {
                    "dt": 1603991317,
                    "sunrise": "1604010402",
                    "xxx": "xx",
                    "weather": [
                        {
                            "id": 802,
                            "xxx": "xx"
                        },
                        {
                            "id": 802,
                            "xxx": "xx"
                        }
                    ]
                },
                {
                    "dt": 1604030400,
                    "sunrise": "1604010402",
                    "xxx": "xx",
                    "weather": [
                        {
                            "id": 802,
                            "xxx": "xx"
                        },
                        {
                            "id": 802,
                            "xxx": "xx"
                        }
                    ]
                }
            ]
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 403 **Forbidden** <br />
    **Content:**
    ```json
    {
        "msg": "You dont have access"
    }
    ```

* **Sample Call:**
    ```js
    $.ajax({
        method: 'GET',
        url: 'http://127.0.0.1:3000/news',
        headers: {
          accessToken: 'eyJhbXXXXXXXX.ayaXXXX'
        }
    });
    ```

## **User Login**
---
  Mengembalikan accessToken JSON setelah berhasil login.

* **URL**

  /login

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

   None

* **Header Params**

   None

* **Success Response:**

  * **Code:** 200 **OK** <br />
    **Content:** 
    ```json
    {
        "accessToken": "eyJhbXXXXXXXX.ayaXXXX"
    }
    ```
 
* **Error Response:**

  * **Code:** 401 **UNAUTHORIZED** <br />
    **Content:**
    ```json
    {
        "msg": "Email atau Password salah"
    }
    ```

* **Sample Call:**
  ```js
  $.ajax({
      method: 'POST',
      url: 'http://127.0.0.1:3000/login'
  });
  ```

## **User Register**
---
  Mengembalikan data id beserta email berformat JSON setelah berhasil register.

* **URL**

  /register

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

   None

* **Header Params**

   None

* **Success Response:**

  * **Code:** 200 **OK** <br />
    **Content:** 
    ```json
    {
        "id": 1,
        "email": "admin@travelnews.com"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 **Bad Request** <br />
    **Content:**
    ```json
    {
        "msg": "Nama panjang tidak boleh kosong"
    }
    ```
    
    OR

    ```json
    {
        "msg": "Oops.. Email telah digunakan..."
    }
    ```
     
    OR

    ```json
    {
        "msg": "Input harus berformat email"
    }
    ```
     
    OR

    ```json
    {
        "msg": "Password harus memiliki minimal 4 karakter dan maksimal 16 karakter"
    }
    ```

* **Sample Call:**
  ```js
  $.ajax({
      method: 'POST',
      url: 'http://127.0.0.1:3000/register'
  });
  ```