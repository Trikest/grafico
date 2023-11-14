
function lerCSV(arquivo, callback) {
    fetch(arquivo)
        .then(response => response.text())
        .then(data => {
            const linhas = data.split('\n');
            const labels = linhas[0].split(',').slice(1);

            const dataset = {
                labels: labels,
                datasets: []
            };

            for (let i = 1; i < linhas.length; i++) {
                const valores = linhas[i].split(',').map(Number);
                const nome = valores[0];
                const idade = valores.slice(1);

                dataset.datasets.push({
                    label: nome,
                    data: idade,
                    fill: false,
                    borderColor: randomColor(),
                });
            }

            callback(dataset);
        });
}


function criarGrafico(idCanvas, dataset, tipoGrafico) {
    const ctx = document.getElementById(idCanvas).getContext('2d');
    new Chart(ctx, {
        type: tipoGrafico,
        data: dataset,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


function randomColor() {
    return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`;
}


lerCSV('https://raw.githubusercontent.com/Trikest/sonhos-viajantes/main/aquivo/oscar_age_male.csv', dataset => {
    criarGrafico('atores-grafico', dataset, 'bar');
});

lerCSV('https://raw.githubusercontent.com/Trikest/sonhos-viajantes/main/aquivo/oscar_age_female.csv', dataset => {
    criarGrafico('atriz-grafico', dataset, 'bar');
});

lerCSV('https://raw.githubusercontent.com/Trikest/sonhos-viajantes/main/aquivo/oscar_age_male.csv', datasetAtores => {
    lerCSV('https://raw.githubusercontent.com/Trikest/sonhos-viajantes/main/aquivo/oscar_age_female.csv', datasetAtrizes => {
        const datasetAmbos = {
            labels: datasetAtores.labels,
            datasets: datasetAtores.datasets.concat(datasetAtrizes.datasets)
        };

        criarGrafico('ambos-grafico', datasetAmbos, 'bar');
    });
});