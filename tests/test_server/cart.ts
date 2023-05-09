import nock from "nock";

export const response = {
  "success": true,
  "message": "Cart data fetched",
  "data": {
    "total": 6100,
    "subtotal": 6100,
    "tax": 1403,
    "items": [
      {
        "id": 242,
        "product_id": 192,
        "product_type": "EscolaLms\\Cart\\Models\\Product",
        "product": {
          "id": 192,
          "type": "single",
          "name": "Kurs wyświetlenia i ankiety",
          "description": null,
          "price": 1000,
          "price_old": null,
          "tax_rate": 23,
          "extra_fees": 0,
          "purchasable": true,
          "duration": null,
          "calculated_duration": 0,
          "limit_per_user": 1,
          "limit_total": null,
          "productables": [
            {
              "id": 243,
              "morph_class": "EscolaLms\\Courses\\Models\\Course",
              "productable_id": 243,
              "productable_type": "App\\Models\\Course",
              "quantity": 1,
              "name": "Kurs wyświetlenia i ankiety",
              "description": "3"
            }
          ],
          "teaser_url": null,
          "poster_path": null,
          "poster_url": null,
          "buyable": false,
          "owned": false,
          "categories": [],
          "tags": [],
          "updated_at": "2023-04-17T11:06:36.000000Z",
          "authors": [
            {
              "id": 264,
              "first_name": "Admin",
              "last_name": "Admine",
              "path_avatar": null,
              "categories": [],
              "Privacy Policy": true,
              "bio": "I'm an admin",
              "Terms of Service": true
            }
          ],
          "related_products": []
        },
        "price": 1000,
        "quantity": 1,
        "subtotal": 1000,
        "total": 1000,
        "tax_rate": 23,
        "tax": 23,
        "total_with_tax": 1230,
        "discount": 0
      },
      {
        "id": 247,
        "product_id": 188,
        "product_type": "EscolaLms\\Cart\\Models\\Product",
        "product": {
          "id": 188,
          "type": "single",
          "name": "Kurs obierania ziemniaków",
          "description": null,
          "price": 5000,
          "price_old": null,
          "tax_rate": 23,
          "extra_fees": 0,
          "purchasable": true,
          "duration": "500",
          "calculated_duration": 0,
          "limit_per_user": 1,
          "limit_total": null,
          "productables": [
            {
              "id": 235,
              "morph_class": "EscolaLms\\Courses\\Models\\Course",
              "productable_id": 235,
              "productable_type": "App\\Models\\Course",
              "quantity": 1,
              "name": "Kurs obierania ziemniaków",
              "description": "Wystarczy, że **zanurzysz ziemniaki w zimnej wodzie i zaczniesz pocierać je drucianą szczoteczką**. Skórka bardzo łatwo odejdzie od powierzchni ziemniaka. Tak obrane ziemniaki wystarczy opłukać i ugotować w osolonej wodzie."
            }
          ],
          "teaser_url": null,
          "poster_path": "https://api-stage.escolalms.com//storage/course/235/zzz.jpeg",
          "poster_url": "https://api-stage.escolalms.com//storage/course/235/zzz.jpeg",
          "buyable": false,
          "owned": false,
          "categories": [],
          "tags": [],
          "updated_at": "2023-04-14T11:06:22.000000Z",
          "authors": [
            {
              "id": 204,
              "first_name": "Artur",
              "last_name": "Kobos",
              "path_avatar": null,
              "categories": [],
              "Privacy Policy": true,
              "bio": "",
              "address": "",
              "Terms of Service": true
            }
          ],
          "related_products": []
        },
        "price": 5000,
        "quantity": 1,
        "subtotal": 5000,
        "total": 5000,
        "tax_rate": 23,
        "tax": 23,
        "total_with_tax": 6150,
        "discount": 0
      },
      {
        "id": 248,
        "product_id": 235,
        "product_type": "EscolaLms\\Cart\\Models\\Product",
        "product": {
          "id": 235,
          "type": "single",
          "name": "Test zakupu kursu 1",
          "description": null,
          "price": 100,
          "price_old": null,
          "tax_rate": 23,
          "extra_fees": 0,
          "purchasable": true,
          "duration": null,
          "calculated_duration": 0,
          "limit_per_user": 1,
          "limit_total": null,
          "productables": [
            {
              "id": 281,
              "morph_class": "EscolaLms\\Courses\\Models\\Course",
              "productable_id": 281,
              "productable_type": "App\\Models\\Course",
              "quantity": 1,
              "name": "Test zakupu kursu 1",
              "description": "No description field"
            }
          ],
          "teaser_url": null,
          "poster_path": null,
          "poster_url": null,
          "buyable": false,
          "owned": false,
          "categories": [],
          "tags": [],
          "updated_at": "2023-04-24T07:01:42.000000Z",
          "authors": [
            {
              "id": 2,
              "first_name": "Admin",
              "last_name": "Kowalskii",
              "path_avatar": "avatars/2/shutterstock-2099949526.jpg",
              "categories": [],
              "Privacy Policy": true,
              "bio": "Tutor with two years of experience.12",
              "address": "Warsaw1222",
              "Terms of Service": true
            }
          ],
          "related_products": []
        },
        "price": 100,
        "quantity": 1,
        "subtotal": 100,
        "total": 100,
        "tax_rate": 23,
        "tax": 23,
        "total_with_tax": 123,
        "discount": 0
      }
    ],
    "additional_discount": 0,
    "total_prediscount": 6100,
    "coupon": null
  }
}

export default (scope: nock.Scope) =>
  scope
    .get("/api/cart")
    .query(true)
    .reply(200, response);