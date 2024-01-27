// Function to parse CSV data
function parseCSV(csv) {
    const lines = csv.split('\n');
    const result = [];

    for (let i = 1; i < lines.length; i++) {
        const columns = lines[i].split(',');
        if (columns.length === 7) {
            result.push({
                url: columns[0].trim(),
                type: columns[1].trim(),
                version: columns[2].trim(),
                miTM: columns[3].trim(),
                country: columns[4].trim(),
                hostedBy: columns[5].trim(),
                source: columns[6].trim()
            });
        }
    }

    return result;
}

// Function to get URL parameter
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Function to display links
function displayLinks(instances) {
    const vParameter = getUrlParameter('v');
    const instancesTable = document.getElementById('instancesTable');

    // Create table element
    const table = document.createElement('table');
    table.setAttribute('border', '1');

    // Create table header row
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th>URL</th><th>Type</th><th>Version</th><th>MiTM</th><th>Country</th><th>Hosted By</th><th>Source</th>';
    table.appendChild(headerRow);

    // Create table body rows
    instances.forEach(instance => {
        const linkHref = vParameter ? `https://${instance.url}/watch/?v=${vParameter}` : `https://${instance.url}`;

        const row = document.createElement('tr');
        row.innerHTML = `<td><a href="${linkHref}">${instance.url}</a></td><td>${instance.type}</td><td>${instance.version}</td><td>${instance.miTM}</td><td>${instance.country}</td><td>${instance.hostedBy}</td><td>${instance.source}</td>`;

        table.appendChild(row);
    });

    // Clear existing content and append the new table
    instancesTable.innerHTML = '';
    instancesTable.appendChild(table);
}


// Fetch CSV file asynchronously
fetch('instances.csv')
    .then(response => response.text())
    .then(csvData => {
        // Parse CSV data and display links
        const instances = parseCSV(csvData);
        displayLinks(instances);
    })
    .catch(error => console.error('Error fetching CSV file:', error));
