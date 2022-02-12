# Broaduct

broaduct is a fullstack e-commerce app made with NextJS, NextAuth, Fake Store API and MongoDB.

## Features

- Sign In/Sign Up with Credentials or Google Oauth.
- Light and Dark Mode.
- Searchable and Categorized Products
- CRUD functionality to user's cart

## Sections

- **Home Page**: The home page shows a list of products which you can sort by search or category.

- **Product Page**: The product page shows detailed information about the product. It can be navigated by clicking on the product image or name.

- **Login/Register Page**: The login/register page shows a form which the user can login/register with credentials or with Google Oauth.

- **Cart Page**: The cart page shows the user's cart items if any and the total price. This page is protected and can only be accessed by authenticated users.

  > Note: Unfortunatly i could not add a paypal checkout feature to the cart page because paypal doesn't support my country.

## Technologies

- NextJS
- NextAuth
- Tailwind CSS
- Zustand
- MongoDB with mongoose

## Running Locally

1. Clone this repo
2. run the command `npm install`
3. open `.env` file. You'll need to add 5 things: website url, google client id and client secret, mongodb url and jwt secret

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

4. rename `.env` to `.env.local`

5. run the command `npm run dev`

## Retrospectives

- Tailwind CSS is awesome! At first i was hesitated to use it thinking that it might bloat my code and make it look ugly but that was not the case. The classnames are easy to read and visualize, It has speed up my development process as well!

- I should've configured NextAuth at the very beginning stage of my project, Back before i used a global state to maintain the user state, It was pretty inefficient and introduced many bugs. Trying to integrate it with NextAuth was a nightmare i had to re-write the project from the ground up!

- I have now more familiarity working with git. Creating a branch for a feature i want to implement and then merging it to the `main` branch was a time and mental health saver!
