<h1 align="center">
BROADUCT
</h1>

<p align="center">
broaduct is a fullstack e-commerce app made with NextJS, NextAuth, Fake Store API and MongoDB.
</p>

## Features

- Sign In/Sign Up with Credentials or Google Oauth.
- Light and Dark Mode.
- Searchable and Categorized Products
- CRUD functionality for user's cart

## Sections

- **Home Page**: The home page shows a list of products which you can sort by search or category.

![image](https://user-images.githubusercontent.com/88052316/153936245-0683a3b2-4b22-4916-ae70-9bbf31f492f1.png)

- **Product Page**: The product page shows detailed information about the product. It can be navigated by clicking on the product image or name.

![image](https://user-images.githubusercontent.com/88052316/153936360-feff69a7-39da-49af-97c7-12fd3ed70949.png)


- **Login/Register Page**: The login/register page shows a form which the user can login/register with credentials or with Google Oauth.

![image](https://user-images.githubusercontent.com/88052316/153936066-40093748-7efe-49f8-be9e-dd33b75323bf.png)

- **Cart Page**: The cart page shows the user's cart items if any and the total price. This page is protected and can only be accessed by authenticated users.

  > Note: I could not add a paypal checkout feature to the cart page because paypal doesn't support my country.

![image](https://user-images.githubusercontent.com/88052316/153936535-b745b9c9-2a25-42f3-8430-f634e89f2d63.png)


## Technologies

- NextJS
- NextAuth
- Tailwind CSS
- Zustand
- MongoDB with mongoose

## Running Locally

1. Clone this repo
2. run the command `npm install`
3. create a `.env.local` file. You'll need to add 5 things: website url, google client id and client secret, mongodb url and jwt secret

```javascript
// example:

MONGODB_URI="your mongodb url here without the quotes"

SECRET="a secret word to generate jwt secret without the quotes"

NEXTAUTH_URL=http://localhost:3000 // if you deploy your website you need to change this to the website url

SERVER=http://localhost:3000 // change it here as well

CLIENT_ID="your google oauth client id without the quotes"
CLIENT_SECRET="your google oauth client secret without the quotes"

```

You can obtain Google Oauth Credentials over [here](https://developers.google.com/identity/protocols/oauth2)

4. run the command `npm run dev`

## Retrospectives

- Tailwind CSS is awesome! At first i was hesitated to use it thinking that it might bloat my code and make it look ugly but that was not the case. The classnames are easy to read and visualize, It has speed up my development process as well!

- I should've configured NextAuth at the very beginning stage of my project, Back before i used a global state to maintain the user state, It was pretty inefficient and introduced many bugs. Trying to integrate it with NextAuth was a nightmare i had to re-write the project from the ground up!

- I have now more familiarity working with git. Creating a branch for a feature i want to implement and then merging it to the `main` branch was a time saver! Although i should've squash the commits before merging them.
