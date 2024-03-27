Prerequisites
Ensure you have Node.js and Yarn installed on your system. You can download Node.js from https://nodejs.org/ and install Yarn by running npm install --global yarn.

Setting Up the Project
Clone the Repository

bash
Copy code
git clone <your-project-repository-url>
cd <your-project-directory>
Install Dependencies

Using Yarn, install the project's dependencies:

Copy code
yarn install
Stripe Integration

For Stripe integration, you will need a Stripe account and API keys. Follow the steps below:

Sign up or log in to your Stripe account at https://stripe.com/.

Navigate to the Developers section and find your API keys.

Copy the .env.example file to a new file named .env and fill in your Stripe API keys:

makefile
Copy code
STRIPE_PUBLIC_KEY=<your_stripe_public_key>
STRIPE_SECRET_KEY=<your_stripe_secret_key>
For more detailed instructions on Stripe integration, refer to the Stripe Documentation.

Google Authentication Setup

To set up Google Authentication:

Go to the Google Cloud Console.

Create a new project or select an existing one.

Navigate to "APIs & Services" > "Credentials" and create new OAuth client IDs.

Add the authorized redirect URIs as instructed in the Google Authentication setup guide relevant to your project.

Update the .env file with your Google client ID and secret:

makefile
Copy code
GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>
For a more comprehensive guide, visit the Google Identity Platform Documentation.

Running the Project
To run the project locally, use:

Copy code
yarn dev
This will start the development server, typically accessible at http://localhost:3000.
