# E-Commerce Shop

E-Commerce Shop provides a shop interface that allows user to purchase listed items online with secure third party card verification using Stripe.
User can add selected products into a cart and pay using card. On successful payment user will receive a receipt and purchase history will be saved.

Visit the deployed site [here](https://mhcheng-shop.netlify.app/)

## Demo

![Demo](Documentation/Shop.gif)

## Technical Architecture

Frontend:

- React.js App
- Hosted on Netlify

Backend:

- Express server using Node.js
- Redis Caching
- Hosted on Heroku
- Unit testing with Jest

Database:

- MySQL

Diagram:

![Technical Architecture](Documentation/Architecture.png)

User's Flow

- User accesses the web app in browser.
- Browser pulls static resources from cache or Commercejs site.
- Update product catalog to database if needed.
- User login with Google Auth and register user to database, update states in Redux.
- User add items to cart and checkout.
- Web site posts order detail on success to database.
- User view completed order and queries database.

Third Party Integrations:

- [Stripejs](https://stripe.com/) integrated in checkout component to verify card payment
- [Commercejs](https://commercejs.com/) is used for storing/retrieving item information such as item name, price, and image and maintaining the cart
- `react-google-login` package allows for Google auth

## Relational Database

The database is hosted using ClearDB MySQL add-ons on Heroku.

Diagram:

![ER-Diagram](Documentation/ER-Diagram.png)

### Run the App Locally

Enter frontend directory from root directory

`cd front-end`

Download requirements

`npm install`

Run

`npm start`

Enter server directory from root directory

`cd server`

Download requirements

`npm install`

Run

`node server.js`

Jest Testing

`npm test`

For the env variables to work create dotenv files in both front-end and server directory following exampleENV.txt

## Future Implementations

Register User

- Increase login options besides google OAuth
- Allow user to register using email and password for this site
- May need to increase security ex. preventing SQL injections
