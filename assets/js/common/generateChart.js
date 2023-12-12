import Chart from "chart.js/auto";

const defaultColors = ["#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"];

const getColors = (params) => {
    let colors = [];

    if (params.type !== 'pie') {
        if (params.data.datasets.length > 1) {
            let countData = params.data.datasets.length;
            let indexColor = 0;

            for (let i = 0; i < countData; i++) {
                if (indexColor === defaultColors.length)
                    indexColor = 0;

                colors.push(defaultColors[indexColor]);

                ++indexColor;
            }

            $.each(params.data.datasets, function (index, data) {
                params.data.datasets[index]['backgroundColor'] = colors[index];
                params.data.datasets[index]['borderColor'] = colors[index];
            });
        }
        else {
            params.data.datasets[0]['backgroundColor'] = [defaultColors[0]];
            params.data.datasets[0]['borderColor'] = [defaultColors[0]];
        }
    }
    else {
        let countData = params.data.datasets[0].data.length;
        let indexColor = 0;

        for (let i = 0; i < countData; i++) {
            if (indexColor === defaultColors.length)
                indexColor = 0;

            colors.push(defaultColors[indexColor]);

            ++indexColor;
        }


        params.data.datasets[0]['backgroundColor'] = colors;
        params.data.datasets[0]['borderColor'] = colors;
    }
}

const sum = (tooltipItems) => {
    let sum = 0;

    $.each(tooltipItems, function (index, tooltipItem) {
       sum += tooltipItem.parsed.y;
    });

    return `Total: ${sum}`;
}

export const generateChartFromQuery = (params, elm) => {
    let config = {
        type: params.type,
        data: {
            labels: params.labels,
            datasets: params.data
        },
        options: {
            plugins: {
                legend: {
                    display: true,
                    position: 'right'
                }
            },
        }
    };

    switch (config.type) {
        case 'stack_bar':
            config.type = 'bar'
            config.options.responsive = true
            config.options.scales = {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                },
            }
            config.options.interaction = {
                intersect: false,
                mode: 'index',
            }
            config.options.plugins.tooltip = {
                callbacks: {
                    footer: sum
                }
            }
            break;

        case 'line':
            config.options.elements = {
                point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 10
                }
            };
            break;

        case 'pie':
            config.options.plugins.legend.display = true;
            break;
    }

    getColors(config);
    new Chart(elm, config);
}

export const generateStatsChart = (params, elm) => {
    let config = {
        type: 'bar',
        data: params.data,
        options: {
            interaction: {
                intersect: false,
                mode: 'index',
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Number of search by month'
                },
                legend: {
                    display: true,
                    position: 'right'
                },
                tooltip : {
                    callbacks: {
                        footer: sum
                    }
                }
            },
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true
                }
            }
        }
    };

    getColors(config);
    new Chart(elm, config);
}
