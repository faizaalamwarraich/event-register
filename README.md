#  Event Page Web App

A simple, responsive frontend web app that displays a list of featured events. The event data is dynamically loaded from a local JSON file. The project also includes a basic **Login** and **Signup** page as an extra feature.

##  Technologies Used

- **HTML5** – Structure of the pages  
- **CSS3** – Styling and layout  
- **JavaScript (ES6)** – Dynamic event loading  
- **JSON** – Event data source (`events.json`)  
- **Local Assets** – Images and icons  

##  How to Run the Project Locally

> Since JavaScript `fetch()` cannot read local files directly due to browser security (CORS), the project must be served through a local web server.

You can use **either of the following options**:

### Option 1 – Run with Python (if Python is installed)

1. Open Command Prompt or Terminal
2. Navigate to the project directory:
   ```bash
   cd path/to/event-page
Open your browser and go to:

arduino
Copy
Edit
http://localhost:3000

 Option 2 – Run with Live Server (in Visual Studio Code)
Open the project folder in VS Code

Install the Live Server extension (if not already installed)

Right-click index.html and select "Open with Live Server"

The project will open in your browser automatically

🌟 Extra Features
Login & Signup Pages
Basic UI for user authentication (no backend logic)

Dynamic Event Loading
Events are loaded from events.json using fetch() in JavaScript

Responsive Design
Layout adapts for mobile, tablet, and desktop

📁 Folder Structure
graphql
Copy
Edit
event-page/
├── index.html         # Main event listing page
├── login.html         # Login page
├── signup.html        # Signup page
├── events.json        # Dummy event data
├── script.js          # JavaScript for dynamic loading
├── style.css          # Global styles
└── assets/            # Images and other assets
