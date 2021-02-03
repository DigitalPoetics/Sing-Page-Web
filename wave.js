var wavesurfer = WaveSurfer.create({
    container: document.querySelector('#waveform'),
    progressColor: "black",
    waveColor: 'gray',
    backgroundColor: '#fcfcfc',
    loop: true,
    scrollParent: true,
    mediaControls: true,		
    minPxPerSec: 75,
    hideScrollbar: false,
    renderer: 'MultiCanvas'
});		
    
wavesurfer.on('ready', function () {
    wavesurfer.addRegion({
    start: 2,
    end: 5,
    color: 'hsla(100, 100%, 30%, 0.1)' 
    });
});

wavesurfer.on('ready', function () {
    var timeline = Object.create(WaveSurfer.Timeline);
    timeline.init({
        wavesurfer: wavesurfer,
        container: "#wave-timeline"
    });
});	

wavesurfer.on('ready', function () {
    var elan = Object.create(WaveSurfer.Elan);
    elan.init({
        wavesurfer: wavesurfer,
        url: 'https://raw.githubusercontent.com/diagrammaticreadings/Sing-Page-Web/main/001z.xml',
        container: "#annotations",
        tiers: {
            Text: true,
            Comments: false
        }			
    });
});

wavesurfer.load('https://raw.githubusercontent.com/diagrammaticreadings/Sing-Page-Web/main/WCWsomuch.mp3');

var slider = document.querySelector('#slider');

slider.oninput = function () {
      var zoomLevel = Number(slider.value);
      wavesurfer.zoom(zoomLevel);
};
