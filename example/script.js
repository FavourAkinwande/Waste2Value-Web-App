document.addEventListener('DOMContentLoaded', () => {
    fetch('dataset.json')
        .then(response => response.json())
        .then(data => {
            window.dataset = data;
            populateTypes();
            createCategoryChart();
        });

    function populateTypes() {
        const typeSelect = document.getElementById('type');
        const types = [...new Set(window.dataset.map(item => item.Type.trim().toLowerCase()))];
        const typeMap = new Map(window.dataset.map(item => [item.Type.trim().toLowerCase(), item.Type.trim()]));
        
        types.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = typeMap.get(type);
            typeSelect.appendChild(option);
        });
    }

    function filterCategories() {
        const type = document.getElementById('type').value.toLowerCase();
        const categorySelect = document.getElementById('category');
        categorySelect.innerHTML = '<option value="">Select Category</option>';
        const categories = [...new Set(window.dataset.filter(item => item.Type.trim().toLowerCase() === type).map(item => item.Category.trim().toLowerCase()))];
        const categoryMap = new Map(window.dataset.filter(item => item.Type.trim().toLowerCase() === type).map(item => [item.Category.trim().toLowerCase(), item.Category.trim()]));

        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = categoryMap.get(category);
            categorySelect.appendChild(option);
        });
        filterSources();
    }

    function filterSources() {
        const type = document.getElementById('type').value.toLowerCase();
        const category = document.getElementById('category').value.toLowerCase();
        const sourceSelect = document.getElementById('source');
        sourceSelect.innerHTML = '<option value="">Select Source</option>';
        const sources = [...new Set(window.dataset.filter(item => item.Type.trim().toLowerCase() === type && item.Category.trim().toLowerCase() === category).map(item => item.Source.trim().toLowerCase()))];
        const sourceMap = new Map(window.dataset.filter(item => item.Type.trim().toLowerCase() === type && item.Category.trim().toLowerCase() === category).map(item => [item.Source.trim().toLowerCase(), item.Source.trim()]));

        sources.forEach(source => {
            const option = document.createElement('option');
            option.value = source;
            option.textContent = sourceMap.get(source);
            sourceSelect.appendChild(option);
        });
        filterMaterials();
    }

    function filterMaterials() {
        const type = document.getElementById('type').value.toLowerCase();
        const category = document.getElementById('category').value.toLowerCase();
        const source = document.getElementById('source').value.toLowerCase();
        const materialSelect = document.getElementById('material');
        materialSelect.innerHTML = '<option value="">Select Material</option>';
        const materials = [...new Set(window.dataset.filter(item => item.Type.trim().toLowerCase() === type && item.Category.trim().toLowerCase() === category && item.Source.trim().toLowerCase() === source).map(item => item.Material.trim().toLowerCase()))];
        const materialMap = new Map(window.dataset.filter(item => item.Type.trim().toLowerCase() === type && item.Category.trim().toLowerCase() === category && item.Source.trim().toLowerCase() === source).map(item => [item.Material.trim().toLowerCase(), item.Material.trim()]));

        materials.forEach(material => {
            const option = document.createElement('option');
            option.value = material;
            option.textContent = materialMap.get(material);
            materialSelect.appendChild(option);
        });
        showSubproducts();
    }

    function showSubproducts() {
        const type = document.getElementById('type').value.toLowerCase();
        const category = document.getElementById('category').value.toLowerCase();
        const source = document.getElementById('source').value.toLowerCase();
        const material = document.getElementById('material').value.toLowerCase();
        const subproductsDiv = document.getElementById('subproducts');
        subproductsDiv.innerHTML = '';

        const subproducts = window.dataset.filter(item => 
            item.Type.trim().toLowerCase() === type &&
            item.Category.trim().toLowerCase() === category &&
            item.Source.trim().toLowerCase() === source &&
            item.Material.trim().toLowerCase() === material
        );

        const uniqueSubproducts = [...new Set(subproducts.map(subproduct => subproduct.Subproduct.trim().toLowerCase()))];

        uniqueSubproducts.forEach(subproduct => {
            const subproductDiv = document.createElement('div');
            subproductDiv.textContent = `Subproduct: ${subproduct}`;
            subproductsDiv.appendChild(subproductDiv);
        });
    }

    function createCategoryChart() {
        const ctx = document.getElementById('categoryChart').getContext('2d');
        const categoryCounts = window.dataset.reduce((acc, item) => {
            acc[item.Category] = (acc[item.Category] || 0) + 1;
            return acc;
        }, {});

        const data = {
            labels: Object.keys(categoryCounts),
            datasets: [{
                label: 'Count of Subproducts by Category',
                data: Object.values(categoryCounts),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        };

        const config = {
            type: 'bar',
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };

        new Chart(ctx, config);
    }

    window.filterCategories = filterCategories;
    window.filterSources = filterSources;
    window.filterMaterials = filterMaterials;
    window.showSubproducts = showSubproducts;
});
