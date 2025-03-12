const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const XLSX = require('xlsx');

// const app = express();
// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'shop_website'))); // Serve static files

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

    const jsonPath = path.join(__dirname, 'uploads', `${path.parse(req.file.originalname).name}.json`);
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

    const excelPath = path.join(__dirname, 'uploads', `${path.parse(req.file.originalname).name}.xlsx`);
    XLSX.writeFile(workbook, excelPath);
    
    // Clean up uploaded JSON file
    fs.unlinkSync(req.file.path);
    res.download(excelPath, `${path.parse(req.file.originalname).name}.xlsx`);
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
