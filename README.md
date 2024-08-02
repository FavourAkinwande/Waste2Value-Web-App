
**Waste2Value**
Waste2Value is an innovative platform designed to address the global issue of food waste by transforming it into valuable products. This application educates and empowers individuals and businesses to view food waste not as a disposal problem but as a resource, offering practical tools and community engagement to promote sustainability.

**Table of Contents**
Features
Installation
Usage
API Endpoints
Technologies Used
Contributing
License
Contact


**Features**
User Registration & Authentication: Secure registration and login with email verification.
Waste Repurposing Tools: Suggestions for converting food waste into valuable products.
Educational Resources: Information on the impact of food waste and methods to reduce it.
Community Engagement: Forums and discussion boards for users to share experiences and ideas.


**Installation**
Backend

Clone the repository:
git clone https://github.com/FavourAkinwande/Waste2Value-Web-App.git
cd Waste2Value-Web-App

Install dependencies:
npm install

Set up environment variables:
Create a .env file in the root directory and add the following:
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
SENDGRID_API_KEY=your_sendgrid_api_key

Run the backend server:
npm start

The server will run on https://waste2value-web-app.onrender.com.


Frontend
Navigate to the frontend directory:
cd frontend

Install dependencies:
npm install

Run the frontend app:
npm start

The frontend will run on https://waste2value.netlify.app/transformation/drop.

**Usage**
Register and Verify: Sign up on the platform and verify your email.
Login: Log in with your credentials.
Explore: Access tools, resources, and community discussions on repurposing food waste.


**API Endpoints**
POST /register: Register a new user.
POST /login: Authenticate a user and provide a token.
GET /verify/:token: Verify a user's email address.
GET /test: Test the server's functionality.

**Technologies Used**
Backend: Node.js, Express.js, MongoDB, Mongoose
Authentication: JWT
Email: SendGrid
Frontend: HTML, CSS, JavaScript
Hosting: Render (Backend), Netlify (Frontend)

**Contributing**
We welcome contributions from the community! To contribute:
Fork the repository.
Create a new branch (git checkout -b feature/YourFeature).
Make your changes.
Commit your changes (git commit -am 'Add some feature').
Push to the branch (git push origin feature/YourFeature).
Create a new Pull Request.

**License**
This project is licensed under the MIT License. See the LICENSE file for more details.

**Contact**
For any inquiries or issues, please contact us at waste2value1234@gmail.com. We are always happy to assist!
