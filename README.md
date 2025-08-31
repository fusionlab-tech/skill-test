# Skill Test Website

A comprehensive skill assessment platform for testing technical skills in various programming technologies.

## Features

- **Candidate Registration**: Collect candidate information including name, email, address, phone, and skill selection
- **Multiple Skill Tests**: Support for 5 different skill areas:
  - .NET
  - Python/Django
  - C#
  - MERN Stack
  - React Native
- **Structured Questions**: Each skill test contains:
  - 3 Basic questions
  - 3 Middle questions  
  - 4 Advanced questions
- **Timer Functionality**: 1-hour countdown timer for each exam
- **Instant Scoring**: Real-time score calculation and results display
- **Email Integration**: Automatic email generation with detailed results sent to nathanfielder0530@gmail.com

## How to Use

1. **Open the Website**: Open `index.html` in a web browser
2. **Register Candidate**: Fill out the registration form with candidate details
3. **Select Skill**: Choose the skill area to test from the dropdown
4. **Start Exam**: Click "Start Exam" to begin the assessment
5. **Answer Questions**: Select one answer for each question (can change selections)
6. **Submit or Auto-Submit**: Either click "Submit Exam" or wait for timer to expire
7. **View Results**: See score percentage and detailed breakdown
8. **Email Results**: Results are automatically formatted and sent via email

## File Structure

- `index.html` - Main registration page
- `styles.css` - Styling for all pages
- `script.js` - Main JavaScript functionality
- `exam-{skill}.html` - Individual skill test pages
- `exam-{skill}.js` - JavaScript for each skill test

## Technical Details

- **Frontend Only**: Pure HTML, CSS, and JavaScript implementation
- **Local Storage**: Candidate information stored locally during session
- **Responsive Design**: Mobile-friendly interface
- **Timer Control**: JavaScript-based countdown with automatic submission
- **Email Integration**: Uses mailto links to open default email client

## Browser Compatibility

- Modern browsers with ES6 support
- Local storage enabled
- JavaScript enabled

## Setup

No server setup required. Simply open `index.html` in a web browser to start using the skill test platform.
