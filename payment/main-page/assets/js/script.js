const stateDistricts = {
    "Andhra Pradesh": ["Ananthapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari"],
    "Arunachal Pradesh": ["Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kurung Kumey", "Lohit", "Namsai", "Papum Pare", "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"],
    "Assam": ["Baksa", "Barpeta", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dibrugarh", "Goalpara", "Golaghat", "Hailakandi", "Jorhat", "Kamrup", "Karbi Anglong", "Karimganj", "Lakhimpur", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "Tinsukia", "Udalguri"],
    "Bihar": ["Araria", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Buxar", "Darbhanga", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Nalanda", "Nawada", "Purnea", "Rohtas", "Saran", "Sheikhpura", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
    "Chhattisgarh": ["Balod", "Baloda Bazar", "Bastar", "Dantewada", "Dhamtari", "Durg", "Kabirdham", "Kanker", "Korba", "Mahasamund", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surguja"],
    "Goa": ["North Goa", "South Goa"],
    "Gujarat": ["Ahmedabad", "Amreli", "Anand", "Banaskantha", "Bharuch", "Bhavnagar", "Dahod", "Dangs", "Gandhinagar", "Kutch", "Kheda", "Mahisagar", "Mehsana", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Vadodara", "Valsad"],
    "Haryana": ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
    "Himachal Pradesh": ["Bilaspur", "Chamba", "Hamirpur", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
    "Jharkhand": ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ranchi", "Sahibganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"],
    "Karnataka": ["Bagalkot", "Ballari", "Belagavi", "Bengaluru", "Bengaluru Rural", "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kodagu", "Kolar", "Kumta", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"],
    "Kerala": ["Alappuzha", "Ernakulam", "Idukki", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
    "Madhya Pradesh": ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhindwara", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narmada", "Neemuch", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Shahdol", "Shajapur", "Sheopur", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"],
    "Maharashtra": ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Jalna", "Kolhapur", "Latur", "Mumbai", "Nagpur", "Nanded", "Nasik", "Osmanabad", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
    "Manipur": ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Ukhrul"],
    "Meghalaya": ["East Garo Hills", "East Khasi Hills", "North Garo Hills", "Ri Bhoi", "South Garo Hills", "South Khasi Hills", "West Garo Hills", "West Khasi Hills"],
    "Mizoram": ["Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Lunglei", "Mamit", "Saiha", "Serchhip"],
    "Nagaland": ["Dimapur", "Kiphire", "Kohima", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"],
    "Odisha": ["Angul", "Baleswar", "Bargarh", "Bhadrak", "Bolangir", "Dhenkanal", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kandhamal", "Kendrapara", "Kendujhar", "Khurda", "Nabarangpur", "Nayagarh", "Nuapada", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"],
    "Punjab": ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Muktsar", "Pathankot", "Patiala", "Rupnagar", "Sangrur", "SAS Nagar"],
    "Rajasthan": ["Ajmer", "Alwar", "Banswara", "Baran", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhunjhunu", "Jodhpur", "Kota", "Nagaur", "Pali", "Rajasamand", "Sawai Madhopur", "Sikar", "Tonk", "Udaipur"],
    "Sikkim": ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
    "Tamil Nadu": ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Perambalur", "Pudukkottai", "Salem", "Sivaganga", "Thanjavur", "Theni", "Tirunelveli", "Tirupattur", "Tiruvallur", "Tiruvannamalai", "Vellore", "Villupuram", "Virudhunagar"],
    "Telangana": ["Adilabad", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Mahabubnagar", "Mancherial", "Medak", "Mulugu", "Nalgonda", "Narayanpet", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Rangareddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Warangal", "Yadadri Bhuvanagiri"],
    "Tripura": ["Dhalai", "Gomati", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"],
    "Uttar Pradesh": ["Agra", "Aligarh", "Ambedkarnagar", "Amethi", "Amroha", "Auraiya", "Ayodhya", "Azamgarh", "Badaun", "Baghpat", "Bahraich", "Banda", "Barabanki", "Bareilly", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Faizabad", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur", "Kasganj", "Kaushambi", "Kheri", "Lakhimpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Raebareli", "Rampur", "Saharanpur", "Shahjahanpur", "Shrawasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"],
    "Uttarakhand": ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"],
    "West Bengal": ["Alipurduar", "Bankura", "Birbhum", "Burdwan", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Malda", "Midnapore", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Purba Bardhaman", "Purulia", "South 24 Parganas", "Uttar Dinajpur", "Uttardinajpur"]
};

const stateInput = document.getElementById('state');
const stateAutocomplete = document.getElementById('state-autocomplete');
const districtInput = document.getElementById('district');
const districtAutocomplete = document.getElementById('district-autocomplete');

// Show state autocomplete dropdown
function showStateAutocomplete() {
    stateAutocomplete.style.display = 'block';
    filterStates();
}

// Hide state autocomplete dropdown
function hideStateAutocomplete() {
    setTimeout(() => {
        stateAutocomplete.style.display = 'none';
    }, 100); // Delay to allow click event to register
}

// Filter states based on input
function filterStates() {
    const input = stateInput.value.toLowerCase();
    stateAutocomplete.innerHTML = '';
    if (input) {
        const matchedStates = Object.keys(stateDistricts).filter(state => 
            state.toLowerCase().includes(input)
        );
        matchedStates.forEach(state => {
            const div = document.createElement('div');
            div.textContent = state;
            div.onclick = () => {
                stateInput.value = state;
                districtInput.value = '';  // Reset district input
                stateAutocomplete.style.display = 'none';
                filterDistricts();  // Update districts based on selected state
            };
            stateAutocomplete.appendChild(div);
        });
    }
}

// Show district autocomplete dropdown
function showDistrictAutocomplete() {
    if (stateInput.value) {
        districtAutocomplete.style.display = 'block';
        filterDistricts();
    }
}

// Hide district autocomplete dropdown
function hideDistrictAutocomplete() {
    setTimeout(() => {
        districtAutocomplete.style.display = 'none';
    }, 100); // Delay to allow click event to register
}

// Filter districts based on input
function filterDistricts() {
    const input = districtInput.value.toLowerCase();
    districtAutocomplete.innerHTML = '';
    const selectedState = stateInput.value;

    if (selectedState && stateDistricts[selectedState]) {
        const matchedDistricts = stateDistricts[selectedState].filter(district => 
            district.toLowerCase().includes(input)
        );
        matchedDistricts.forEach(district => {
            const div = document.createElement('div');
            div.textContent = district;
            div.onclick = () => {
                districtInput.value = district;
                districtAutocomplete.style.display = 'none';
            };
            districtAutocomplete.appendChild(div);
        });
    }
}

function saveCheckoutDetails(mode) {
    const address = document.querySelector('input[placeholder="Address"]').value;
    const state = document.getElementById('state').value;
    const district = document.getElementById('district').value;

    const checkoutData = {
        address: address,
        state: state,
        district: district,
        pay_mode: mode
    };

    fetch('/save-input', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(checkoutData)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Failed to save input data');
    });
}


async function fetchBest(type = "total") {
    let response = await fetch("../../../cart/cart.json");
    const data = await response.json();
    return data;
}

let total = 0;  // Total original cost
let discountTotal = 0;  // Total discount amount

function showBestBuy(products) {
    let skillsContainer2 = document.getElementById("total");
    let skillHTML = "";

    products.forEach((b, index) => {
        const itemTotalCost = b.cost * b.count;  // Total cost for this item
        const itemDiscountAmount = itemTotalCost * (b.discount / 100);  // Total discount for this item
        const itemDiscountedPrice = itemTotalCost - itemDiscountAmount;  // Discounted total price for this item

        // Accumulate total cost and discount
        total += itemTotalCost;
        discountTotal += itemDiscountAmount;

        skillHTML += `
            <div class="bar">
                <div class="info" style="max-height: 500px;">
                    <div class="btn-top">
                        <span>Product: ${b.name}</span><br>
                        <span>Price per item: ${b.cost}</span><br>
                        <span>Quantity: ${b.count}</span><br>
                        <span>Discount: ${b.discount}%</span><br>
                        <span>Total Cost (Before Discount): ${itemTotalCost.toFixed(2)}</span><br>
                        <span>Discount Applied: ${itemDiscountAmount.toFixed(2)}</span><br>
                        <span>Cost After Discount: ${itemDiscountedPrice.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        `;
    });

    // Display total costs after all items
    skillHTML += `
        <div class="bar">
            <div class="info" style="max-height: 500px;">
                <div class="btn-top">
                    <span>Total Cost (Before Discount): ${total.toFixed(2)}</span><br>
                    <span>Total Discount: ${discountTotal.toFixed(2)}</span><br>
                    <span>Final Cost (After Discount): ${(total - discountTotal).toFixed(2)}</span>
                </div>
            </div>
        </div>
    `;
    skillsContainer2.innerHTML = skillHTML;
}

fetchBest().then(data => {
    showBestBuy(data);
});


function credit(){
    if(total > 0){
        saveCheckoutDetails("credit");
        window.open("../card-payment/index.html", "_blank");
    }
    else{
        alert("Cart is empty");
    }
}
function cash(){
    if(total > 0){
        saveCheckoutDetails("cash");
        window.open("../confirmation/index.html", "_blank");
    }
    else{
        alert("Cart is empty");
    }
}
function qrPay(){
    if(total > 0){
        saveCheckoutDetails("qr");
        window.open("../qr-payment/index.html", "_blank");
    }
    else{
        alert("Cart is empty");
    }
}

function goToCart() {
    window.open("../cart/index.html", "_blank");
}
