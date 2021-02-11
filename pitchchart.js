 /*   <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js"></script>
    <script Src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/4.6.0/papaparse.min.js"></script>

    <div style="width: 90%;">
        <canvas id="myChart" style="height: 200px; width: 700px;"></canvas>
    </div> */
        
        
        //<script>



        const ctx = wavesurfer.drawer.canvases[0].waveCtx;
  

        fetch("https://raw.githubusercontent.com/diagrammaticreadings/Sing-Page-Web/main/WCWsomuch.csv")
            .then(response => response.text())
            .then((csv) => {
                const data = Papa.parse(csv, {header: true}).data;
                drawData(data);
            }); 


        function drawData (datasets) {

        const pitch = [];
        datasets.forEach(d => {
            const obj = {
                x: d.Time,
                y: d.Frequency
            }
            pitch.push(obj);
        });

        const dataObj = {       
            datasets: [{
                label: 'Scatter Dataset',
                data: pitch, 
                pointRadius: 1.5,
                backgroundColor: 'blue'
            }]

        }

        const chart = new Chart(ctx, {
            type: "scatter", 
            data: dataObj,  //add data
            options: {
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                layout: {
                    padding: {
                        top: 50,
                        left: -120
                    }
                },
                title: {
                    display: false,
                    text: 'WCWsomuch',
                    position: 'top'
                },

                scales: {
                    xAxes: [{
                        type: 'linear',
                        position: 'bottom',
                        scaleLabel: {
                            display: true,
                            labelString: "Time (s)",
                            fontsize: 12
                        }
                    }],
                    yAxes: [{
                        ticks: {min: 50, max: 250},
                        scaleLabel: {
                            display: true,
                            labelString: "Frequency (Hz)",
                            fontsize: 12
                        }
                    }]
                },
                tooltips: {
                    callbacks: {
                        title: (items,data) => pitch[items[0].index].y //show frequency
                    }
                }
            }
        });

        }
        //</script>