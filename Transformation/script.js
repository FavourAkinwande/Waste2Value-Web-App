document.addEventListener('DOMContentLoaded', () => {
    fetch('dataset.json')
        .then(response => response.json())
        .then(data => {
            window.dataset = data;
            populateTypes();
        });

    // Populate the 'Type' dropdown
    function populateTypes() {
        const typeSelect = document.getElementById('type');
        // Normalize and get unique types
        const types = [...new Set(window.dataset.map(item => item.Type.trim().toLowerCase()))];
        // Create a map to preserve original case
        const typeMap = new Map(window.dataset.map(item => [item.Type.trim().toLowerCase(), item.Type.trim()]));
        
        types.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = typeMap.get(type); // Use the original case
            typeSelect.appendChild(option);
        });
    }

    // Filter 'Category' based on selected 'Type'
    function filterCategories() {
        const type = document.getElementById('type').value.toLowerCase();
        const categorySelect = document.getElementById('category');
        categorySelect.innerHTML = '<option value="">Select Category</option>';
        // Normalize and get unique categories
        const categories = [...new Set(window.dataset.filter(item => item.Type.trim().toLowerCase() === type).map(item => item.Category.trim().toLowerCase()))];
        // Create a map to preserve original case
        const categoryMap = new Map(window.dataset.filter(item => item.Type.trim().toLowerCase() === type).map(item => [item.Category.trim().toLowerCase(), item.Category.trim()]));

        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = categoryMap.get(category); // Use the original case
            categorySelect.appendChild(option);
        });
        filterSources();
    }

    // Filter 'Source' based on selected 'Category'
    function filterSources() {
        const type = document.getElementById('type').value.toLowerCase();
        const category = document.getElementById('category').value.toLowerCase();
        const sourceSelect = document.getElementById('source');
        sourceSelect.innerHTML = '<option value="">Select Source</option>';
        // Normalize and get unique sources
        const sources = [...new Set(window.dataset.filter(item => item.Type.trim().toLowerCase() === type && item.Category.trim().toLowerCase() === category).map(item => item.Source.trim().toLowerCase()))];
        // Create a map to preserve original case
        const sourceMap = new Map(window.dataset.filter(item => item.Type.trim().toLowerCase() === type && item.Category.trim().toLowerCase() === category).map(item => [item.Source.trim().toLowerCase(), item.Source.trim()]));

        sources.forEach(source => {
            const option = document.createElement('option');
            option.value = source;
            option.textContent = sourceMap.get(source); // Use the original case
            sourceSelect.appendChild(option);
        });
        filterMaterials();
    }

    // Filter 'Material' based on selected 'Source'
    function filterMaterials() {
        const type = document.getElementById('type').value.toLowerCase();
        const category = document.getElementById('category').value.toLowerCase();
        const source = document.getElementById('source').value.toLowerCase();
        const materialSelect = document.getElementById('material');
        materialSelect.innerHTML = '<option value="">Select Material</option>';
        // Normalize and get unique materials
        const materials = [...new Set(window.dataset.filter(item => item.Type.trim().toLowerCase() === type && item.Category.trim().toLowerCase() === category && item.Source.trim().toLowerCase() === source).map(item => item.Material.trim().toLowerCase()))];
        // Create a map to preserve original case
        const materialMap = new Map(window.dataset.filter(item => item.Type.trim().toLowerCase() === type && item.Category.trim().toLowerCase() === category && item.Source.trim().toLowerCase() === source).map(item => [item.Material.trim().toLowerCase(), item.Material.trim()]));

        materials.forEach(material => {
            const option = document.createElement('option');
            option.value = material;
            option.textContent = materialMap.get(material); // Use the original case
            materialSelect.appendChild(option);
        });
        showSubproducts();
    }

    // Show 'Subproducts' based on selected 'Material'
    function showSubproducts() {
        const type = document.getElementById('type').value.toLowerCase();
        const category = document.getElementById('category').value.toLowerCase();
        const source = document.getElementById('source').value.toLowerCase();
        const material = document.getElementById('material').value.toLowerCase();
        const subproductsDiv = document.getElementById('subproducts');
        subproductsDiv.innerHTML = '';

        // Filter and normalize data
        const subproducts = window.dataset.filter(item => 
            item.Type.trim().toLowerCase() === type &&
            item.Category.trim().toLowerCase() === category &&
            item.Source.trim().toLowerCase() === source &&
            item.Material.trim().toLowerCase() === material
        );

        // Remove duplicates
        const uniqueSubproducts = [...new Set(subproducts.map(subproduct => subproduct.Subproduct.trim().toLowerCase()))];

        uniqueSubproducts.forEach(subproduct => {
            const subproductDiv = document.createElement('div');
            subproductDiv.textContent = `Subproduct: ${subproduct}`;
            subproductDiv.className = 'subproduct-item'; // Add a class for styling
            subproductsDiv.appendChild(subproductDiv);
        });
    }

    window.filterCategories = filterCategories;
    window.filterSources = filterSources;
    window.filterMaterials = filterMaterials;
    window.showSubproducts = showSubproducts;
});
