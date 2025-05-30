# Client Introduction App

This is a web-based application designed to facilitate the entry of client details and the sending of pre-written email introductions to 360spaces.

## Features

- Input fields for client details: name, email, company name, and phone number.
- Selection of pre-written email templates for introductions.
- A button to send the selected email to the entered client details.

## Project Structure

```
client-intro-app
├── public
│   └── index.html          # Main HTML file for the application
├── src
│   ├── components          # Contains React components
│   │   ├── ClientForm.tsx  # Component for entering client details
│   │   ├── EmailSelector.tsx # Component for selecting email templates
│   │   └── SendEmailButton.tsx # Component for sending emails
│   ├── emails              # Contains email templates
│   │   └── templates.ts    # Pre-written email templates
│   ├── App.tsx             # Main application component
│   └── types               # TypeScript interfaces
│       └── index.ts        # Interfaces for client data and email templates
├── package.json            # npm configuration file
├── tsconfig.json           # TypeScript configuration file
└── README.md               # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd client-intro-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Start the development server:
   ```
   npm start
   ```
2. Open your browser and go to `http://localhost:3000` to access the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License.