# FullStack_ECommerce_Website
## E-Commerce Website for Amman Textiles

## Project Overview
This project is a full-fledged **E-Commerce Website** designed for **Amman Textiles**, offering a seamless shopping experience for users while providing an efficient **admin panel** for managing inventory and orders.

The website includes **product categorization, cart management, order finalization**, and **admin functionalities** like **report generation, Excel-JSON conversion, and inventory updates**.

## Features & Functionalities
### **User Side:**
- **Product Browsing**: View categorized products with images and details.
- **Cart Management**: Add, remove, and manage product quantities in the cart.
- **Multiple Payment Methods**: Choose between **Cash on Delivery, QR Code, and Credit Card (demo integration)**.
- **Order Finalization**: Save order details with automatic **order ID and timestamp**.
- **Dynamic UI**: Smooth animations, filtering, and user-friendly interface.

### **Admin Side:**
- **Dashboard Access**: Manage orders, inventory, and customer data.
- **Sales Reports**: Generate **Excel and JSON reports**.
- **Product Management**: Update product details and stock.
- **Excel-JSON Converter**: Convert and update inventory from an Excel file.

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js (Express.js)
- **Data Management:** JSON files (for storing product, cart, and order data)
- **Libraries Used:** Multer (for file uploads), XLSX (for Excel operations)

## Directory Structure
```
shop_website/
|-- index.html  (Main Landing Page)
|-- server.js  (Backend API Server)
|-- products.json  (Product List)
|-- cart/  (Cart Management)
|-- order/  (Order History)
|-- admin/  (Admin Panel)
|-- assets/
|   |-- css/
|   |-- js/
|   |-- media/
|-- payment/ (Handles Payment Demo Pages)
|-- README.md
```

## Installation & Running the Project
1. **Clone the Repository:**
   ```sh
   git clone <repo-url>
   cd shop_website
   ```
2. **Install Dependencies:**
   ```sh
   npm install
   ```
3. **Start the Server:**
   ```sh
   node server.js
   ```
4. **Access the Website:**
   - **User Portal:** `http://localhost:3000`
   - **Admin Panel:** `http://localhost:3000/admin`

## API Endpoints
- `POST /add-to-cart` - Add item to cart
- `POST /remove-from-cart` - Remove item from cart
- `POST /save-input` - Save user checkout details
- `POST /finalize-order` - Finalize purchase & store order
- `POST /excel-to-json` - Convert Excel to JSON
- `POST /json-to-excel` - Convert JSON to Excel

## Future Scope
- **User Authentication**
- **Real Payment Integration**
- **Mobile App Version**

## License
This project is for educational purposes only.
