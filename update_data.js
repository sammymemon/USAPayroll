const fs = require('fs');
const path = './src/data/interview-questions.ts';

let content = fs.readFileSync(path, 'utf8');

// The file contains: export const interviewQuestions: Question[] = [ ... ];
// We can just require it or evaluate it, but it's typescript. 
// A simpler way: string replace `category: Category;` to `category: Category;\n  domain: string;`
// And for the JSON array, we can't easily parse without dropping the type, but we can do a regex replace to add `domain: "Payroll",` inside each object.

content = content.replace('category: Category;', 'category: Category;\n  domain: string;');

// Add domain to all existing objects
content = content.replace(/"category":/g, '"domain": "Payroll",\n    "category":');

// Let's add some Bookkeeping and Taxation questions at the end of the array before ];
const extraQuestions = `
  ,
  {
    "id": "BK1",
    "domain": "Bookkeeping",
    "category": "General Bookkeeping",
    "q": "What is double-entry bookkeeping?",
    "a": "Double-entry bookkeeping is an accounting system where every transaction affects at least two accounts, keeping the accounting equation balanced (Assets = Liabilities + Equity)."
  },
  {
    "id": "BK2",
    "domain": "Bookkeeping",
    "category": "Accounts Payable",
    "q": "What is Accounts Payable (AP)?",
    "a": "Accounts Payable represents the money a company owes to its creditors or suppliers for goods and services purchased on credit."
  },
  {
    "id": "TX1",
    "domain": "Taxation",
    "category": "Corporate Tax",
    "q": "What is the federal corporate income tax rate in the USA as of 2026?",
    "a": "Under current law (TCJA), the federal corporate income tax rate is a flat 21%."
  },
  {
    "id": "TX2",
    "domain": "Taxation",
    "category": "Sales Tax",
    "q": "Is there a federal sales tax in the USA?",
    "a": "No, there is no federal sales tax. Sales taxes are imposed at the state and local levels, leading to thousands of different tax jurisdictions."
  }
`;

content = content.replace(/\s*\];\s*$/, extraQuestions + '\n];\n');

fs.writeFileSync(path, content);
console.log("Updated interview-questions.ts");
