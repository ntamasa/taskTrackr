# TaskTrackr

TaskTrackr is a full-stack, personalized to-do application designed to streamline task management. Built with modern technologies, TaskTrackr caters to my specific needs as I sought a solution tailored for my workflow, eliminating repetitive task entries and improving overall productivity.

## Features

- **Customizable Task Management**: Easily organize, track, and update tasks based on personal preferences.
- **Streamlined Workflow**: Avoid repetitive typing by reusing and managing tasks efficiently.
- **Full-Stack Integration**: A robust backend supports a seamless user experience.

## Technologies Used

- **Frontend**: Angular (TypeScript)
- **Backend**: Java Spring Boot
- **Database**: PostgreSQL
- **Design**: Figma
- **Language**: TypeScript

## Motivation

This project was born out of frustration with existing to-do applications that failed to meet my requirements. As my first learning project with Angular, TaskTrackr allowed me to explore full-stack development while solving a real-world problem.

## Installation

### Prerequisites

- Node.js
- Angular CLI
- Java (JDK 17 or higher)
- PostgreSQL

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/ntamasa/taskTrackr.git
   ```
2. Navigate to the project directiory:
   ```bash
   cd taskTrackr
   ```
3. Set up the backend:
   - Configure the PostgreSQL databse in the Spring Boot application properties file.
   - Build and run the Spring Boot application.
   ```bash
   ./mvnw spring-boot:run
   ```
4. Set up the frontend:

   - Navigate to the Angular project folder:

   ```bash
   cd frontend
   ```

   - Install dependencies:

   ```bash
   npm install
   ```

   - start the development server:
     ng serve

5. Access the application at http://localhost:4200

## Usage

TaskTrackr helps you:

- Create tasks quickly without repetitive data entry.
- Organize tasks by priority or category.
- Track progress and manage deadlines.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- This project represents my first hands-on experience with Angular and full-stack development.

Feel free to contribute or suggest features via [GitHub Issues](https://github.com/ntamasa/taskTrackr/issues).
