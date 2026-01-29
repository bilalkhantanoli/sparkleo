# Sparkleo - Coding Challenges & React Tasks

This repository contains solutions for three coding challenges and a React application:

1. **Q1: Two Sum** - Finding two numbers that sum to a target
2. **Q2: Longest Substring Without Repeating Characters** - Finding the longest substring with unique characters
3. **Q3: React Products Search** - Fetching and displaying products from Fake Store API with search functionality

---

## Q1: Two Sum

### Problem Statement

Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to the target.

**Constraints:**

- You may assume that exactly one valid solution exists.
- You cannot use the same element twice.
- Return the indices in any order.

### Example

```
Input: nums = [2, 7, 11, 15], target = 18
Output: [1, 2]
```

### Approach

**Hash Map (Two-pass) Solution:**

- Create a hash map to store numbers and their indices
- Iterate through the array and for each number, check if `(target - number)` exists in the map
- If found, return the indices

### Complexity Analysis

- **Time Complexity:** O(n) - Single pass through the array
- **Space Complexity:** O(n) - Hash map storage for n elements

---

## Q2: Longest Substring Without Repeating Characters

### Problem Statement

Given a string `s`, find the length of the longest substring without repeating characters.

### Example

```
Input: "abcabcbb"
Output: 3
Explanation: The answer is "abc", which has a length of 3.
```

### Approach

**Sliding Window with Hash Map:**

- Use two pointers (left and right) to maintain a sliding window
- Use a hash map to track the last seen index of each character
- When a duplicate is found, move the left pointer to skip the previous occurrence
- Track the maximum length found during iteration

### Complexity Analysis

- **Time Complexity:** O(n) - Two pointers traverse the string once
- **Space Complexity:** O(min(m, n)) where m is the charset size

---

## Q3: React Products Search

### Problem Statement

Build a React application that:

1. Fetches products from the Fake Store API (https://fakestoreapi.com/products)
2. Displays products in a table format
3. Implements case-insensitive search by product title and category
4. Shows loading and error states

### Features

- ✅ **Data Fetching** - Loads products on component mount using `useEffect`
- ✅ **Loading State** - Shows spinner while fetching data
- ✅ **Error Handling** - Displays error messages if API call fails
- ✅ **Product Table** - Displays Title, Price, Category, and Rating columns
- ✅ **Product Images** - Shows product thumbnails in the table
- ✅ **Search Functionality** - Case-insensitive search on title and category
- ✅ **Real-time Filtering** - Updates results as user types
- ✅ **Responsive Design** - Works on desktop and mobile devices

### API Response Structure

The API returns an array of product objects with the following structure:

```json
[
  {
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 109.95,
    "description": "Your perfect pack for everyday use and walks in the forest...",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    "rating": {
      "rate": 3.9,
      "count": 120
    }
  },
  {
    "id": 2,
    "title": "Mens Casual Premium Slim Fit T-Shirts",
    "price": 22.3,
    "description": "Slim-fitting style, contrast raglan long sleeve...",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
    "rating": {
      "rate": 4.1,
      "count": 259
    }
  }
]
```

### Testing the API with Postman

#### Step 1: Open Postman

- Download and install [Postman](https://www.postman.com/downloads/)
- Launch the application

#### Step 2: Create a New Request

- Click **+ New** or **Create** button
- Select **HTTP Request**

#### Step 3: Configure the Request

- **Method**: Select `GET` from the dropdown
- **URL**: Enter `https://fakestoreapi.com/products`
- **Headers**: (Optional, but good practice)
  - Add header `Accept: application/json`

#### Step 4: Send the Request

- Click the **Send** button
- You'll receive a JSON array with 20 products from the API

#### Step 5: Analyze the Response

- Check the response body to understand the data structure
- Note the important fields:
  - `id` - Product ID
  - `title` - Product name
  - `price` - Product price (number)
  - `category` - Product category (string: "men's clothing", "women's clothing", "electronics", "jewelery")
  - `image` - Product image URL
  - `rating` - Object containing `rate` (float) and `count` (number of reviews)

### API Details

**Endpoint**: `GET https://fakestoreapi.com/products`

**Response**: Array of 20 product objects

**Categories Available**:

- `men's clothing`
- `women's clothing`
- `electronics`
- `jewelery`

**Sample Response Data** (20 products total):

- Backpacks & Clothing items (men's & women's)
- Jewelry pieces
- Electronics (storage drives, SSDs, monitors)

### Data Implementation Strategy

Based on the API response, here's how to implement the solution:

1. **State Management**:

   ```javascript
   const [products, setProducts] = useState([]); // Store all products
   const [searchTerm, setSearchTerm] = useState(""); // Store search input
   const [loading, setLoading] = useState(true); // Track loading state
   const [error, setError] = useState(null); // Track errors
   ```

2. **Data Fetching** (useEffect):

   ```javascript
   useEffect(() => {
     fetch("https://fakestoreapi.com/products")
       .then((response) => response.json())
       .then((data) => setProducts(data))
       .catch((err) => setError(err.message))
       .finally(() => setLoading(false));
   }, []);
   ```

3. **Search Filtering**:

   ```javascript
   const filteredProducts = products.filter((product) => {
     const searchLower = searchTerm.toLowerCase();
     return (
       product.title.toLowerCase().includes(searchLower) ||
       product.category.toLowerCase().includes(searchLower)
     );
   });
   ```

4. **Table Rendering**:
   - Display `title`, `price`, `category`, and `rating` columns
   - Show product image as thumbnail
   - Format price with 2 decimal places
   - Display rating with star icon and review count
   - Show category as a styled badge

### Project Structure

```
sparkleo_test/
├── src/
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # App styles
│   ├── ProductsSearch.jsx      # Products search component
│   ├── ProductsSearch.css      # Product table styles
│   ├── main.jsx               # React entry point
│   ├── index.css              # Global styles
│   └── assets/                # Static assets
├── index.html                 # HTML entry point
├── package.json               # Dependencies
├── vite.config.js            # Vite configuration
└── README.md                  # Project readme
```

### Tech Stack

- **React** - Functional components with Hooks
- **Vite** - Fast build tool and development server
- **CSS3** - Custom styling (no UI libraries)
- **Fetch API** - For HTTP requests

### Hooks Used

- `useState` - For managing state (products, search term, loading, error)
- `useEffect` - For fetching data on component mount

---

## API Response Data - All 20 Products

The Fake Store API returns 20 products across 4 categories. Here's the complete dataset:

### Men's Clothing (4 products)

1. **Fjallraven - Foldsack No. 1 Backpack** - $109.95 - Rating: 3.9/5 (120 reviews)
2. **Mens Casual Premium Slim Fit T-Shirts** - $22.30 - Rating: 4.1/5 (259 reviews)
3. **Mens Cotton Jacket** - $55.99 - Rating: 4.7/5 (500 reviews)
4. **Mens Casual Slim Fit** - $15.99 - Rating: 2.1/5 (430 reviews)

### Jewelry (4 products)

5. **John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet** - $695.00 - Rating: 4.6/5 (400 reviews)
6. **Solid Gold Petite Micropave** - $168.00 - Rating: 3.9/5 (70 reviews)
7. **White Gold Plated Princess** - $9.99 - Rating: 3.0/5 (400 reviews)
8. **Pierced Owl Rose Gold Plated Stainless Steel Double** - $10.99 - Rating: 1.9/5 (100 reviews)

### Electronics (6 products)

9. **WD 2TB Elements Portable External Hard Drive - USB 3.0** - $64.00 - Rating: 3.3/5 (203 reviews)
10. **SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s** - $109.00 - Rating: 2.9/5 (470 reviews)
11. **Silicon Power 256GB SSD 3D NAND A55** - $109.00 - Rating: 4.8/5 (319 reviews)
12. **WD 4TB Gaming Drive Works with Playstation 4** - $114.00 - Rating: 4.8/5 (400 reviews)
13. **Acer SB220Q bi 21.5 inches Full HD IPS Ultra-Thin** - $599.00 - Rating: 2.9/5 (250 reviews)
14. **Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor** - $999.99 - Rating: 2.2/5 (140 reviews)

### Women's Clothing (6 products)

15. **BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats** - $56.99 - Rating: 2.6/5 (235 reviews)
16. **Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket** - $29.95 - Rating: 2.9/5 (340 reviews)
17. **Rain Jacket Women Windbreaker Striped Climbing Raincoats** - $39.99 - Rating: 3.8/5 (679 reviews)
18. **MBJ Women's Solid Short Sleeve Boat Neck V** - $9.85 - Rating: 4.7/5 (130 reviews)
19. **Opna Women's Short Sleeve Moisture** - $7.95 - Rating: 4.5/5 (146 reviews)
20. **DANVOUY Womens T Shirt Casual Cotton Short** - $12.99 - Rating: 3.6/5 (145 reviews)

---

## How to Run Locally

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Postman (optional, for API testing)

### Setup Instructions

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd sparkleo
```

#### 2. Setup TypeScript Solutions

For Q1 and Q2, you can run either the TypeScript or JavaScript versions:

**Option A: Run JavaScript files (faster)**

```bash
# Run Q1: Two Sum
node two_sum.js

# Run Q2: Longest Substring
node longest_substring.js
```

**Option B: Run TypeScript files (requires TypeScript installed)**

```bash
# Install TypeScript globally (if not already installed)
npm install -g typescript

# Compile and run
tsc two_sum.ts && node two_sum.js
tsc longest_substring.ts && node longest_substring.js
```

**Option C: Use ts-node for direct execution**

```bash
npx ts-node two_sum.ts
npx ts-node longest_substring.ts
```

#### 3. Test API with Postman (Optional but Recommended)

Before running the React app, test the API endpoint:

1. Open Postman
2. Create a new GET request to: `https://fakestoreapi.com/products`
3. Click **Send**
4. Review the response to understand the data structure
5. You should see an array of 20 products with all the fields mentioned above

#### 4. Setup React Application (Q3)

```bash
cd sparkleo_test

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in terminal)

**What to expect:**

- Initial load shows "Loading products..." spinner
- Products table displays all 20 products
- Search input filters by title or category in real-time
- Try searching for: "backpack", "electronics", "clothing", "$", etc.

---

## Test Results

### Q1: Two Sum Test Output

```
=== Two Sum Test Results ===

Test 1:
Input: nums = [2,7,11,15], target = 18
Output: [1,2]
Status: ✓ PASSED

Test 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]
Status: ✓ PASSED

Test 3:
Input: nums = [3,3], target = 6
Output: [0,1]
Status: ✓ PASSED

Test 4:
Input: nums = [1,2,3,4,5], target = 9
Output: [3,4]
Status: ✓ PASSED
```

### Q2: Longest Substring Test Output

```
=== Longest Substring Without Repeating Characters Test Results ===

Test 1:
Input: "abcabcbb"
Output: 3 (substring: "abc")
Status: ✓ PASSED

Test 2:
Input: "bbbbb"
Output: 1 (substring: "b")
Status: ✓ PASSED

Test 3:
Input: "pwwkew"
Output: 3 (substring: "wke")
Status: ✓ PASSED

Test 4:
Input: "au"
Output: 2 (substring: "au")
Status: ✓ PASSED

Test 5:
Input: ""
Output: 0 (substring: "")
Status: ✓ PASSED

Test 6:
Input: "dvdf"
Output: 3 (substring: "vdf")
Status: ✓ PASSED

Test 7:
Input: "abcdefghijklmnopqrstuvwxyz"
Output: 26 (substring: "abcdefghijklmnopqrstuvwxyz")
Status: ✓ PASSED
```

### Q3: React Products Application

The React application loads all 20 products from the Fake Store API and displays them in an interactive table with:

- Product images and titles
- Prices formatted with 2 decimal places
- Category badges with color coding
- Star ratings with count information
- Real-time search filtering by title or category
- Responsive grid layout for all screen sizes

---

## Git Branches

This project is organized into three branches:

1. **two-sum** - Contains the Two Sum solution

   ```bash
   git checkout two-sum
   ```

2. **longest-substring** - Contains the Longest Substring solution

   ```bash
   git checkout longest-substring
   ```

3. **react-products-search** - Contains the React Products Search application
   ```bash
   git checkout react-products-search
   ```

### Switch Between Branches

```bash
# List all branches
git branch -a

# Switch to a specific branch
git checkout <branch-name>
```

---

## Key Implementation Highlights

### Two Sum

- Efficient O(n) time complexity using hash map
- Clean, readable code with comments
- Comprehensive test cases covering edge cases

### Longest Substring

- Sliding window technique for optimal performance
- Helper function to extract the actual substring
- Multiple test cases including edge cases (empty string, single character, full alphabet)

### React Products

- Modern functional components with hooks
- Async data fetching with error handling
- Real-time search with case-insensitive filtering
- Responsive CSS Grid/Flexbox layout
- Loading and error states for better UX
- Product image thumbnails and detailed information

---

## Troubleshooting

### React App Not Loading

1. Ensure you're in the `sparkleo_test` directory
2. Check that all dependencies are installed: `npm install`
3. Clear cache: `npm cache clean --force`
4. Delete `node_modules` and reinstall

### Search Not Working

- Ensure you're typing in the search input field
- Search is case-insensitive and works on both title and category
- Results update in real-time as you type

### API Connection Issues

- Check your internet connection
- Verify that `https://fakestoreapi.com/products` is accessible
- Check browser console for detailed error messages

---

## Performance Considerations

### Q1: Two Sum

- Single pass through array is optimal for this problem
- Hash map lookup is O(1) on average
- No additional algorithms can improve beyond O(n)

### Q2: Longest Substring

- Sliding window is the most efficient approach
- Early termination not possible (need to check entire string)
- Space optimization: O(1) space if charset is fixed (e.g., ASCII)

### Q3: React Products

- Data fetched once on mount (not on every re-render)
- Search filtering uses native JavaScript filter (acceptable for 20 items)
- Virtualization not needed for current dataset size
- CSS optimizations: use transform for animations instead of position changes

---

## Author

Solution implementation for Sparkleo coding challenges.

## License

MIT
