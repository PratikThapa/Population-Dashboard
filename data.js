document.getElementById('btn').addEventListener('click', async () =>
    {
    const stateName = document.getElementById('userInput').value.trim();
    const tableBody = document.getElementById('tableBody');
    const loading = document.getElementById('loading');
    const errorDiv = document.getElementById('error');
    tableBody.innerHTML = ''; 
    loading.classList.remove('hidden');
    errorDiv.classList.add('hidden');
    document.getElementById('table').classList.add('hidden');

    //Validating User Input
    const stateValidation = /^[a-zA-Z\s]+$/.test(stateName);
    if (!stateValidation)
    {
        errorDiv.textContent = 'Please enter a valid state name!!! Letters only.';
        errorDiv.classList.remove('hidden');
        loading.classList.add('hidden');
        return;
    }

    try {
        const response = await fetch(`https://datausa.io/api/data?drilldowns=State&measures=Population`);
        const data = await response.json();

        // Data filtering based on state name
        const filteredData = data.data.filter(item => item.State.toLowerCase() === stateName.toLowerCase());

        if (filteredData.length === 0) {
            errorDiv.textContent = 'State not found!!';
            errorDiv.classList.remove('hidden');
            loading.classList.add('hidden');
            return;
        }

        // delay for rendering table
        setTimeout(() => {
            filteredData.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.State}</td>
                    <td>${item.Year}</td>
                    <td>${item.Population.toLocaleString()}</td>
                `;
                tableBody.appendChild(row);
            });

            document.getElementById('table').classList.remove('hidden');
            loading.classList.add('hidden');
        }, 2000); 
    } catch (error) {
        errorDiv.textContent = 'Error fetching data. Please try again later.';
        errorDiv.classList.remove('hidden');
        loading.classList.add('hidden');
    }
});