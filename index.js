
class Car {
    constructor(brand, model, year, price, color) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.price = price;
        this.color = color;
    }
}


const basePrices = {
    'Toyota-Corolla': 1200000,
    'Honda-Civic': 1100000,
    'Ford-Ranger': 1800000
};


const carForm = document.getElementById('carForm');
const brandSelect = document.getElementById('brand');
const modelSelect = document.getElementById('model');
const inventoryTable = document.getElementById('inventoryTable').querySelector('tbody');
const modal = document.getElementById('addCarModal');
const btnAddNew = document.getElementById('btnAddNew');
const btnCancel = document.getElementById('btnCancel');
const closeBtn = document.querySelector('.close');
const addCarModelForm = document.getElementById('addCarModelForm');


btnAddNew.addEventListener('click', function() {
    modal.style.display = 'block';
});

btnCancel.addEventListener('click', function() {
    modal.style.display = 'none';
    addCarModelForm.reset();
});

closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    addCarModelForm.reset();
});

window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
        addCarModelForm.reset();
    }
});


addCarModelForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newBrand = document.getElementById('newBrand').value.trim();
    const newModel = document.getElementById('newModel').value.trim();
    const newPrice = parseInt(document.getElementById('newPrice').value);
    
    
    let brandExists = false;
    const brandOptions = brandSelect.querySelectorAll('option');
    brandOptions.forEach(option => {
        if (option.value === newBrand) {
            brandExists = true;
        }
    });
    
    if (!brandExists) {
        const newBrandOption = document.createElement('option');
        newBrandOption.value = newBrand;
        newBrandOption.textContent = newBrand;
        brandSelect.appendChild(newBrandOption);
    }
    
   
    const newModelOption = document.createElement('option');
    newModelOption.value = newModel;
    newModelOption.textContent = newModel;
    newModelOption.setAttribute('data-brand', newBrand);
    modelSelect.appendChild(newModelOption);
    
   
    const priceKey = `${newBrand}-${newModel}`;
    basePrices[priceKey] = newPrice;
    
    
    modal.style.display = 'none';
    addCarModelForm.reset();
    
   
    alert(`Successfully added ${newBrand} ${newModel} with base price of ₱${newPrice.toLocaleString('en-PH')}!`);
});


brandSelect.addEventListener('change', function() {
    const selectedBrand = this.value;
    const modelOptions = modelSelect.querySelectorAll('option');
    
    modelSelect.value = '';
    
    modelOptions.forEach(option => {
        if (option.value === '') {
            option.style.display = 'block';
        } else {
            const optionBrand = option.getAttribute('data-brand');
            option.style.display = (optionBrand === selectedBrand) ? 'block' : 'none';
        }
    });
});


function calculateFinalPrice(basePrice, color) {
    let taxRate = 0.10; 
    
    
    if (color !== 'Black' && color !== 'White') {
        taxRate += 0.02;
    }
    
    return basePrice * (1 + taxRate);
}


function formatCurrency(amount) {
    return '₱' + amount.toLocaleString('en-PH', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    });
}


carForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const brand = brandSelect.value;
    const model = modelSelect.value;
    const color = document.querySelector('input[name="color"]:checked').value;
    const year = 2024;
    
   
    if (!brand || !model) {
        alert('Please select both brand and model!');
        return;
    }
    
 
    const priceKey = `${brand}-${model}`;
    const basePrice = basePrices[priceKey];
    
  
    const car = new Car(brand, model, year, basePrice, color);
    
   
    const finalPrice = calculateFinalPrice(car.price, car.color);
    
    
    const emptyRow = inventoryTable.querySelector('.empty-row');
    if (emptyRow) {
        emptyRow.remove();
    }
    
  
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${car.brand}</td>
        <td>${car.model}</td>
        <td>${car.color}</td>
        <td>${formatCurrency(car.price)}</td>
        <td>${formatCurrency(finalPrice)}</td>
    `;
    
    inventoryTable.appendChild(row);
    
   
    carForm.reset();
    brandSelect.value = '';
    modelSelect.value = '';
});