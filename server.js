// shop_website/server.js

const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const XLSX = require('xlsx');

const app = express();
app.use(express.json());
app.use(express.static(__dirname));
// app.use(express.static(path.join(__dirname, 'shop_website')));

const cartPath = path.join(__dirname, 'cart', 'cart.json');

// Helper function to read cart.json
function readCartFile(callback) {
    fs.readFile(cartPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading cart.json:', err);
            return callback(err, null);
        }
        try {
            const cart = JSON.parse(data);
            callback(null, cart);
        } catch (parseError) {
            console.error('Error parsing cart.json:', parseError);
            callback(parseError, null);
        }
    });
}

// Helper function to write to cart.json
function writeCartFile(cart, callback) {
    fs.writeFile(cartPath, JSON.stringify(cart, null, 2), 'utf8', (err) => {
        if (err) {
            console.error('Error writing to cart.json:', err);
            return callback(err);
        }
        callback(null);
    });
}

// Add product to cart
app.post('/add-to-cart', (req, res) => {
    const product = req.body;

    readCartFile((readErr, cart) => {
        if (readErr) return res.status(500).json({ error: 'Failed to read cart data' });
        
        const existingProduct = cart.find(item => item.name === product.name);
        if (existingProduct) {
            existingProduct.count += 1;
        } else {
            product.count = 1;
            cart.push(product);
        }
        writeCartFile(cart, (writeErr) => {
            if (writeErr) return res.status(500).json({ error: 'Failed to add product to cart' });
            res.json({ message: 'Product added to cart successfully' });
        });
    });
});

// Remove product from cart
app.post('/remove-from-cart', (req, res) => {
    const { name } = req.body;

    readCartFile((readErr, cart) => {
        if (readErr) return res.status(500).json({ error: 'Failed to read cart data' });
        
        const productIndex = cart.findIndex(item => item.name === name);

        if (productIndex !== -1) {
            if (cart[productIndex].count > 1) {
                // Decrease the count if more than 1
                cart[productIndex].count -= 1;
            } else {
                // Remove product from the cart if count is 1
                cart.splice(productIndex, 1);
            }

            writeCartFile(cart, (writeErr) => {
                if (writeErr) return res.status(500).json({ error: 'Failed to update cart' });
                res.json({ message: 'Product removed from cart successfully' });
            });
        } else {
            res.status(404).json({ error: 'Product not found in cart' });
        }
    });
});


const itemsPath = path.join(__dirname, 'items.json');

// Helper function to read JSON files
function readJSONFile(filePath, callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${filePath}:`, err);
            return callback(err, null);
        }
        try {
            const jsonData = JSON.parse(data);
            callback(null, jsonData);
        } catch (parseError) {
            console.error(`Error parsing ${filePath}:`, parseError);
            callback(parseError, null);
        }
    });
}

// Helper function to write JSON files
function writeJSONFile(filePath, data, callback) {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
        if (err) {
            console.error(`Error writing to ${filePath}:`, err);
            return callback(err);
        }
        callback(null);
    });
}

// Buy All endpoint
app.post('/buy-all', (req, res) => {
    const cartPath = path.join(__dirname, 'cart/cart.json');
    const itemsPath = path.join(__dirname, 'items.json');

    // Read the cart data
    readJSONFile(cartPath, (cartReadErr, cart) => {
        if (cartReadErr) return res.status(500).json({ error: 'Failed to read cart data' });

        // Read the items data
        readJSONFile(itemsPath, (itemsReadErr, items) => {
            if (itemsReadErr) return res.status(500).json({ error: 'Failed to read items data' });

            // Update item counts based on cart contents
            cart.forEach(cartItem => {
                let itemToUpdate = items.find(item => item.name === cartItem.name);
                if (itemToUpdate) {
                    // Increase the count in items.json by the count in cart.json
                    itemToUpdate.count = (parseInt(itemToUpdate.count || 0, 10)) + (parseInt(cartItem.count || 0, 10));
                }
            });

            // Write the updated items data back to items.json
            writeJSONFile(itemsPath, items, (writeErr) => {
                if (writeErr) return res.status(500).json({ error: 'Failed to update items' });
                
                res.json({ message: 'Purchase successful, items updated' });
            });
        });
    });
});

app.post('/buy-all', (req, res) => {
    // const cartPath = path.join(__dirname, 'cart/cart.json');
    // const itemsPath = path.join(__dirname, 'items.json');

    // Read the cart data
    readJSONFile(cartPath, (cartReadErr, cart) => {
        if (cartReadErr) return res.status(500).json({ error: 'Failed to read cart data' });

        // Read the items data
        readJSONFile(itemsPath, (itemsReadErr, items) => {
            if (itemsReadErr) return res.status(500).json({ error: 'Failed to read items data' });

            // Iterate through each item in the cart
            cart.forEach(cartItem => {
                const itemToUpdate = items.find(item => item.name === cartItem.name);

                if (itemToUpdate) {
                    // If item exists, update its properties based on cart
                    itemToUpdate.count = (parseInt(itemToUpdate.count || 0, 10)) + (parseInt(cartItem.count || 0, 10));
                    // You may want to merge other details here if necessary, e.g.,
                    itemToUpdate.icon = cartItem.icon; // Update icon if needed
                } else {
                    // If item does not exist, you might add it to the items array
                    items.push({ ...cartItem }); // Add new item with all details from the cart
                }
            });

            // Write the updated items data back to items.json
            writeJSONFile(itemsPath, items, (writeErr) => {
                if (writeErr) return res.status(500).json({ error: 'Failed to update items' });

                res.json({ message: 'Purchase successful, items updated' });
            });
        });
    });
});

// Endpoint to save input data to a JSON file
// app.post('/save-input', (req, res) => {
//     const inputData = req.body;
//     const inputFilePath = path.join(__dirname, 'inputData.json');

//     fs.access(inputFilePath, fs.constants.F_OK, (err) => {
//         if (err) {
//             // File does not exist, create a new one
//             fs.writeFile(inputFilePath, JSON.stringify([inputData], null, 2), 'utf8', (writeErr) => {
//                 if (writeErr) {
//                     return res.status(500).json({ error: 'Failed to save input data' });
//                 }
//                 res.json({ message: 'Input data saved successfully, created new file' });
//             });
//         }
//         // } else {
//         //     // File exists, append new data
//         //     readJSONFile(inputFilePath, (readErr, existingData) => {
//         //         if (readErr) {
//         //             return res.status(500).json({ error: 'Failed to read existing data' });
//         //         }

//         //         existingData.push(inputData); // Add new input data to the existing array

//         //         writeJSONFile(inputFilePath, existingData, (writeErr) => {
//         //             if (writeErr) {
//         //                 return res.status(500).json({ error: 'Failed to update input data' });
//         //             }
//         //             res.json({ message: 'Input data saved successfully, updated existing file' });
//         //         });
//         //     });
//         // }
//         else {
//             // File exists, replace the existing data
//             readJSONFile(inputFilePath, (readErr, existingData) => {
//                 if (readErr) {
//                     return res.status(500).json({ error: 'Failed to read existing data' });
//                 }
        
//                 // Replace the existing data with the new input data
//                 const updatedData = inputData; // Assuming inputData is the new object you want to write
        
//                 writeJSONFile(inputFilePath, updatedData, (writeErr) => {
//                     if (writeErr) {
//                         return res.status(500).json({ error: 'Failed to update input data' });
//                     }
//                     res.json({ message: 'Input data saved successfully, replaced existing file' });
//                 });
//             });
//         }
        
//     });
// });



app.post('/save-input', (req, res) => {
    const inputData = req.body;
    const inputFilePath = path.join(__dirname, 'inputData.json');

    // Generate order ID and current date
    const orderId = generateOrderId(); // You can define this function to create a unique order ID
    const currentDate = new Date().toISOString(); // Get the current date in ISO format

    // Add order ID and date to the input data
    const dataToSave = {
        ...inputData, // Spread the existing input data
        orderId: orderId,
        date: currentDate
    };

    fs.access(inputFilePath, fs.constants.F_OK, (err) => {
        if (err) {
            // File does not exist, create a new one
            fs.writeFile(inputFilePath, JSON.stringify([dataToSave], null, 2), 'utf8', (writeErr) => {
                if (writeErr) {
                    return res.status(500).json({ error: 'Failed to save input data' });
                }
                res.json({ message: 'Input data saved successfully, created new file' });
            });
        } else {
            // File exists, append new data
            readJSONFile(inputFilePath, (readErr, existingData) => {
                if (readErr) {
                    return res.status(500).json({ error: 'Failed to read existing data' });
                }

                existingData.push(dataToSave); // Append new input data to the existing array

                writeJSONFile(inputFilePath, existingData, (writeErr) => {
                    if (writeErr) {
                        return res.status(500).json({ error: 'Failed to update input data' });
                    }
                    res.json({ message: 'Input data saved successfully, updated existing file' });
                });
            });
        }
    });
});

// Function to generate a unique order ID
// function generateOrderId() {
//     // You can implement your own logic for generating an order ID
//     return 'ORDER-' + Math.floor(1000 + Math.random() * 9000); // Example: ORDER-1234
// }
//
//
//

// const inputPath = path.join(__dirname, 'inputData.json');
// const orderPath = path.join(__dirname, 'order', 'order.json');

// // Function to get the current date
// function getCurrentDate() {
//     const now = new Date();
//     return now.toISOString().split('T')[0]; // Format: YYYY-MM-DD
// }

// // Endpoint to finalize the order
// app.post('/finalize-order', (req, res) => {
//     // Step 1: Read from cart.json
//     fs.readFile(cartPath, 'utf8', (err, cartData) => {
//         if (err) {
//             console.error('Error reading cart.json:', err);
//             return res.status(500).json({ message: 'Error finalizing order.' });
//         }

//         // Step 2: Parse the cart data and add the order date and status
//         const cartItems = JSON.parse(cartData);
//         // const user2 = JSON.parse(user);
//         const newOrder = {
//             // user: user2,
//             paymentStatus: true,
//             items: cartItems
//         };

//         // Step 3: Check if order.json exists, and either append or create it
//         fs.readFile(orderPath, 'utf8', (err, orderData) => {
//             let orders = [];
//             if (!err) {
//                 // If order.json exists, parse the existing orders
//                 orders = JSON.parse(orderData);
//             }

//             // Add the new order to the orders array
//             orders.push(newOrder);

//             // Step 4: Write the updated orders array back to order.json
//             fs.writeFile(orderPath, JSON.stringify(orders, null, 2), (err) => {
//                 if (err) {
//                     console.error('Error updating order.json:', err);
//                     return res.status(500).json({ message: 'Error finalizing order.' });
//                 }

//                 // Step 5: Clear cart.json
//                 fs.writeFile(cartPath, JSON.stringify([]), (err) => {
//                     if (err) {
//                         console.error('Error clearing cart.json:', err);
//                         return res.status(500).json({ message: 'Error finalizing order.' });
//                     }

//                     console.log('Order finalized successfully.');
//                     res.json({ message: 'Order finalized and cart cleared.' });
//                 });
//             });
//         });
//     });
// });


const inputPath = path.join(__dirname, 'inputData.json');
const orderPath = path.join(__dirname, 'order', 'order.json');
// const cartPath = path.join(__dirname, 'cart.json'); // Assuming cartPath is defined

// Function to get the current date
function getCurrentDate() {
    const now = new Date();
    return now.toISOString().split('T')[0]; // Format: YYYY-MM-DD
}

// Function to generate a unique order ID
function generateOrderId() {
    return 'ORDER-' + Math.floor(1000 + Math.random() * 9000); // Example: ORDER-1234
}

// Endpoint to finalize the order
app.post('/finalize-order', (req, res) => {
    // Step 1: Read from cart.json
    fs.readFile(cartPath, 'utf8', (err, cartData) => {
        if (err) {
            console.error('Error reading cart.json:', err);
            return res.status(500).json({ message: 'Error finalizing order.' });
        }

        // Step 2: Read user data from inputData.json
        fs.readFile(inputPath, 'utf8', (err, userData) => {
            if (err) {
                console.error('Error reading inputData.json:', err);
                return res.status(500).json({ message: 'Error finalizing order.' });
            }

            try {
                // Parse the cart data and user data
                const cartItems = JSON.parse(cartData);
                const users = JSON.parse(userData);

                // Check if there are any users
                if (users.length === 0) {
                    return res.status(400).json({ message: 'No users found.' });
                }

                // Get the last user in the array
                const lastUser = users[users.length - 1];
                let tot_cost = 0;
                for(let i  = 0; i < cartItems.length; i++){
                    tot_cost += (cartItems[i].cost - (cartItems[i].cost * cartItems[i].discount) / 100) * cartItems[i].count;
                }
                // Create a new order object (avoid circular reference)
                const orderId = generateOrderId(); // Generate a unique order ID
                const newOrder = {
                    orderId, // Assign the order ID
                    user_address: lastUser.address,
                    user_state: lastUser.state,
                    user_city: lastUser.district, // Store user's name or identifier
                    paymentStatus: true,
                    items: cartItems,
                    total_cost: tot_cost,
                    orderDate: getCurrentDate(), // Add order date
                };

                // Step 3: Check if order.json exists, and either append or create it
                fs.readFile(orderPath, 'utf8', (err, orderData) => {
                    let orders = [];
                    if (!err) {
                        // If order.json exists, parse the existing orders
                        orders = JSON.parse(orderData);
                    }

                    // Check for duplicates in the orders array
                    const existingOrder = orders.find(order => order.orderId === orderId);
                    if (existingOrder) {
                        return res.status(400).json({ message: 'Order already exists for this user.' });
                    }

                    // Add the new order to the orders array
                    orders.push(newOrder);

                    // Step 4: Write the updated orders array back to order.json
                    fs.writeFile(orderPath, JSON.stringify(orders, null, 1), (err) => {
                        if (err) {
                            console.error('Error updating order.json:', err);
                            return res.status(500).json({ message: 'Error finalizing order.' });
                        }

                        // Step 5: Clear cart.json
                        fs.writeFile(cartPath, JSON.stringify([]), (err) => {
                            if (err) {
                                console.error('Error clearing cart.json:', err);
                                return res.status(500).json({ message: 'Error finalizing order.' });
                            }

                            console.log('Order finalized successfully.');
                            res.json({ message: 'Order finalized and cart cleared.' });
                        });
                    });
                });
            } catch (parseError) {
                console.error('Error parsing JSON:', parseError);
                return res.status(500).json({ message: 'Error finalizing order due to invalid data.' });
            }
        });
    });
});


// Set up multer for file uploads
const upload = multer({ dest: path.join(__dirname, 'admin', 'uploads') });

// Route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin','index.html'));
});

// Endpoint to convert Excel to JSON
app.post('/excel-to-json', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'Please upload an Excel file' });

    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const jsonPath = path.join(__dirname, `${path.parse(req.file.originalname).name}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2), 'utf-8');
    
    // Clean up uploaded Excel file
    fs.unlinkSync(req.file.path);
    res.download(jsonPath, `${path.parse(req.file.originalname).name}.json`);
});

// Endpoint to convert JSON to Excel
app.post('/json-to-excel', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'Please upload a JSON file' });

    const jsonData = JSON.parse(fs.readFileSync(req.file.path, 'utf-8'));
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const excelPath = path.join(__dirname, `${path.parse(req.file.originalname).name}.xlsx`);
    XLSX.writeFile(workbook, excelPath);
    
    // Clean up uploaded JSON file
    fs.unlinkSync(req.file.path);
    res.download(excelPath, `${path.parse(req.file.originalname).name}.xlsx`);
});



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
