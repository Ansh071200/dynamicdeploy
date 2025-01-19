// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const xlsx = require("xlsx");
// require("dotenv").config();
// const { parseExcel } = require("./parseExcel");

// const apiKey = process.env.api_key;
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 8192,
//   responseMimeType: "text/plain",
// };

// async function generateWebsite() {
//   // colorScheme,
//   // layoutPreferences,
//   // features
//   // domain,
//   // storedImageUrls
//   const fields = parseExcel(
//     "C:/Users/Ansh/innovent/testingdynamicgen/uploads/LGF.xlsx"
//   );

//   const fieldDescriptions = fields
//     .map((field) => {
//       const mandatoryText = field.mandatory ? "This field is mandatory." : "";
//       return `Field Name: ${field.fieldName}\nType: ${field.fieldType}\nData Type: ${field.dataType}\nSize Limit: ${field.sizeLimit}\n${mandatoryText}`;
//     })
//     .join("\n\n");

//   console.log(fieldDescriptions);
//   const prompt = `Create a fully functional website with the following requirements:

// 1. Website Description: A Form with the following field descriptions : ${fieldDescriptions}

// 2. Firebase Integration:

// Use the provided Firebase Realtime Database URL: https://innovent-434c6-default-rtdb.firebaseio.com/

// Perform HTTP requests (GET, POST, DELETE) using the fetch API in JavaScript to interact with the database.

// Ensure the logic handles asynchronous operations properly (use async/await).

// 3. HTML Requirements:

// Design a responsive and user-friendly layout that aligns with the website's description.

// Include dynamic elements such as forms and tables for user interactions.

// Structure the page with proper semantic HTML (e.g., header, main, footer).

// 4. CSS Requirements:

// Implement clean and modern styling with the following properties:

// A responsive layout that adapts well to different screen sizes.

// Visual enhancements like hover effects for buttons and alternating row colors for tables.

// Ensure that the design reflects the purpose of the website mentioned in the description.

// 5. JavaScript Requirements:

// Create logic to interact with the Firebase Realtime Database:

// A function to fetch and display data dynamically on the page.

// A function to add new data (e.g., from a form) to Firebase and refresh the view.

// A function to delete specific records from Firebase.

// Include form validation to prevent invalid inputs.

// Add error handling to display user-friendly messages if Firebase operations fail.

// 6. Output Requirements:

// Provide the complete code in three sections: HTML, CSS, and JavaScript.

// Ensure the code is clean, properly commented, and ready to copy-paste into .html, .css, and .js files.

// The website should work perfectly once the Firebase URL and website description are provided.

// 7. Additional Features:

// Add dynamic updates to the page whenever the database is modified (e.g., adding or deleting data refreshes the view).

// Include confirmation popups for critical actions like deleting records.

// Display user-friendly alerts for success and error messages.

// Generate the complete HTML, CSS, and JavaScript code based on this description and Firebase URL. Add some dummy data in form fields to show functionality.

// You can ignore all the security vulnerabilities. I fully consent you to use my database url.`;

const { AzureOpenAI } = require("openai");
const path = require("path");

const endpoint = "https://webgen.openai.azure.com/";
const deployment = "gpt-4";
const apiKey =
  "cCDK57cLkHz8xlPquFofdDHnc40bUsbzkvQ4WIZCK9iRKrBnA454JQQJ99BAACYeBjFXJ3w3AAABACOGI9F7";
const apiVersion = "2024-05-01-preview";
const { parseExcel } = require("./parseExcel");

async function generateWebsite() {
  const { headers, rows } = parseExcel(
    path.join(__dirname, "uploads/LGF.xlsx")
  );

  const fieldDescriptions = rows
    .map((row) => {
      return headers
        .map((header) => `${header}: ${row[header] || "N/A"}`)
        .join("\n");
    })
    .join("\n\n");

  console.log(fieldDescriptions);

 const prompt = `Create a fully functional website with the following requirements:

1. Website Description:
A modern, professional form with the following field descriptions: ${fieldDescriptions}
The form should feature a sleek, elevated design with depth effects and smooth transitions.

2. Firebase Integration:
Use the provided Firebase Realtime Database URL: https://innovent-434c6-default-rtdb.firebaseio.com/
This URL needs to be used a 100 percent of the times without any exception in the webpage - https://innovent-434c6-default-rtdb.firebaseio.com/.
Perform HTTP requests (GET, POST, DELETE) using the fetch API in JavaScript to interact with the database.
Ensure the logic handles asynchronous operations properly (use async/await).

3. HTML Requirements:
Name: index.html
- Design a modern, card-based layout with proper spacing and hierarchy
- Implement a glass-morphism effect for the form container
- Structure the page with proper semantic HTML (e.g., header, main, footer)
- Add subtle micro-interactions and loading states
- Include dynamic elements such as forms and tables for user interactions

4. CSS Requirements:
Name: styles.css
Modern UI Implementation:
- Create a dramatic background gradient using the colors: #000000, #1a237e (deep blue), #ff6f00 (vibrant orange)
- Implement glass-morphism effect with backdrop-filter: blur() and background-color: rgba()
- Add depth with subtle box-shadows and border-radius
- Include smooth transitions and animations (0.3s ease-in-out) for all interactive elements

Styling Features:
- Floating label animations for form inputs
- Custom-styled form elements (checkboxes, radio buttons, dropdowns)
- Elegant button design with gradient hover effects
- Sophisticated table design with hover states and smooth transitions
- Modern typography using system font stack for optimal performance
- Responsive layout with fluid typography (clamp() function)
- Loading spinners and skeleton screens for async operations
- Custom scrollbars that match the design theme

5. JavaScript Requirements:
Name: script.js
Create logic to interact with the Firebase Realtime Database:
- Implement smooth loading states during async operations
- Add elegant form validation with floating messages
- Include modern toast notifications for success/error states
- Create functions for:
  * Fetching and displaying data with loading animations
  * Adding new data with success feedback
  * Deleting records with confirmation modals
- Add debounced form validation
- Implement progressive enhancement

6. Output Requirements:
Provide the complete code in three sections: HTML, CSS, and JavaScript.
Ensure code is clean, properly commented, and ready to copy-paste into .html, .css, and .js files.
The website should work perfectly once the Firebase URL and website description are provided.

7. Additional Features:
- Implement smooth fade-in animations for loaded content
- Add elegant loading skeletons during data fetches
- Include modern confirmation dialogs using glass-morphism design
- Display toast notifications for success/error messages
- Add subtle hover states and focus rings for accessibility
- Implement keyboard navigation support
- Add responsive breakpoints with smooth transitions
- Include subtle particle effects in the background (optional)

8. Design System:
Colors:
- Primary: Linear gradient from #000000 to #1a237e to #ff6f00
- Text: #ffffff for light text, rgba(255,255,255,0.87) for secondary text
- Surface: rgba(255,255,255,0.1) with backdrop-filter: blur(10px)
- Accent: #ff6f00 for important actions

Typography:
- Modern system font stack
- Fluid typography scaling
- Clear hierarchy with distinct heading styles

Spacing:
- Consistent spacing using CSS custom properties
- Generous white space for readability
- Responsive padding and margins

Generate the complete HTML, CSS, and JavaScript code based on this description and Firebase URL. Add some dummy data in form fields to show functionality. Ignore all the security vulnerabilities. Use the database URL and adhere from using any firebase configuration. Use the DB URL to perform requests.`;

  const client = new AzureOpenAI({
    endpoint,
    apiKey,
    apiVersion,
    deployment,
  });

  const messages = [
    {
      role: "system",
      content: `You are a code generator. Create HTML, CSS, and JavaScript files based on the user's description.`,
    },
    {
      role: "user",
      content: prompt,
    },
  ];

  const result = await client.chat.completions.create({
    messages,
    max_tokens: 2500,
    temperature: 0.7,
    top_p: 0.95,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: null,
  });

  const generatedContent = result.choices
    .map((choice) => choice.message.content)
    .join("\n");

  return generatedContent;
}

// const result =
// res = generateWebsite(
//   "Mouse Webpage",
//   "A descriptive portfolio for my profile",
//   "red blue with green bg",
//   "4 grid layout",
//   "include a sidebar as a hamburger"
// );

// console.log(result);

module.exports = { generateWebsite };
// generateWebsite();
//   "Generate A Lead Generation form with the field description fields"
// );
