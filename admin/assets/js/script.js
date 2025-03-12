// Function to fetch JSON data from a file and render it as a table
async function fetchAndRenderTable() {
    try {
        const response = await fetch('../items.json'); // Correct path to your JSON file
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Filter the data to include only the necessary fields
        const filteredData = data.map(item => ({
            name: item.name,
            cost: item.cost,
            discount: Math.round(item.discount),
            count: item.count
        }));

        renderTable(filteredData);
    } catch (error) {
        console.error('Error fetching JSON data:', error);
    }
}

// Function to render JSON data as a table
function renderTable(data) {
    const tableHeader = document.getElementById('table-header');
    const tableBody = document.getElementById('table-body');

    // Clear previous content
    tableHeader.innerHTML = '';
    tableBody.innerHTML = '';

    // Create table headers
    if (data.length > 0) {
        Object.keys(data[0]).forEach(key => {
            const th = document.createElement('th');
            th.classList.add('table-header');
            th.textContent = key.charAt(0).toUpperCase() + key.slice(1); // Capitalize the header
            tableHeader.appendChild(th);
        });
    }

    // Create table rows
    data.forEach(item => {
        const row = document.createElement('tr');
        Object.values(item).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            row.appendChild(td);
        });
        tableBody.appendChild(row);
    });
}

// Call the function to fetch and render the table when the page loads
window.onload = fetchAndRenderTable;


// // Add any JavaScript needed for the frontend here
// document.getElementById('excelToJsonForm').onsubmit = () => {
//     alert('Excel to JSON conversion initiated!');
// };

// document.getElementById('jsonToExcelForm').onsubmit = () => {
//     alert('JSON to Excel conversion initiated!');
// };


// Add any JavaScript needed for the frontend here
document.getElementById('excelToJsonForm').onsubmit = () => {
    alert('Excel to JSON conversion initiated!');
};

document.getElementById('jsonToExcelForm').onsubmit = () => {
    alert('JSON to Excel conversion initiated!');
};


// const filePath = path.resolve(__dirname, 'uploaded-file.json');

// document.getElementById("generatePresentation").addEventListener("click", () => {
//     // Fetch JSON file
//     fetch(".././items.json")
//       .then((response) => {
//         if (!response.ok) throw new Error("Failed to load JSON file");
//         return response.json();
//       })
//       .then((jsonData) => {
//         // Initialize a new PowerPoint presentation
//         const pptx = new PptxGenJS();
  
//         // Add a title slide
//         const titleSlide = pptx.addSlide();
//         titleSlide.addText("Product Overview", {
//           x: 1.5,
//           y: 1.5,
//           fontSize: 24,
//           bold: true,
//         });
  
//         // Add slides for each product
//         jsonData.products.forEach((product, index) => {
//           const slide = pptx.addSlide();
//           slide.addText(`Product ${index + 1}: ${product.name}`, { x: 1, y: 0.5, fontSize: 20, bold: true });
//           slide.addText(`Type: ${product.type}`, { x: 1, y: 1, fontSize: 16 });
//           slide.addText(`Cost: $${product.cost}`, { x: 1, y: 1.5, fontSize: 16 });
//           slide.addText(`Discount: ${Math.round(product.discount)}`, { x: 1, y: 2, fontSize: 16 });
//           slide.addText(`Available Count: ${product.count}`, { x: 1, y: 2.5, fontSize: 16 });
  
//           // Add a placeholder for the product icon
//           slide.addText(`[Icon: ${product.icon}]`, { x: 1, y: 3, fontSize: 14, italic: true });
//         });
  
//         // Trigger file download
//         pptx.writeFile({ fileName: "Product_Presentation.pptx" });
//       })
//       .catch((error) => console.error("Error:", error));
//   });
  
  function setupDragAndDrop(dropZoneId, inputId, formId, submitButtonId, defaultFilePath) {
    const dropZone = document.getElementById(dropZoneId);
    const fileInput = document.getElementById(inputId);
    const submitButton = document.getElementById(submitButtonId);

    // Handle drag-and-drop
    dropZone.addEventListener("click", () => fileInput.click());
    dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.style.backgroundColor = "#e8f4ff";
    });
    dropZone.addEventListener("dragleave", () => {
        dropZone.style.backgroundColor = "";
    });
    dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.style.backgroundColor = "";
        if (e.dataTransfer.files.length > 0) {
            fileInput.files = e.dataTransfer.files;
            dropZone.textContent = e.dataTransfer.files[0].name;
        }
    });

    // Handle submit button with default file path
    submitButton.addEventListener("click", () => {
        if (fileInput.files.length === 0) {
            // Set default file
            const defaultFile = new File([defaultFilePath], "defaultFile");
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(defaultFile);
            fileInput.files = dataTransfer.files;
        }
        document.getElementById(formId).submit();
    });
}
