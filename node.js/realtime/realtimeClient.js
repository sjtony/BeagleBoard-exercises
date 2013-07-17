    var socket;
    var firstconnect = true,
        fs = 8000,
        Ts = 1/fs*1000,
        samples = 800,
        plot,
        globalDataL = [],
        globalDataR = [];
    globalDataL[samples] = 0;
    globalDataR[samples] = 0;

    function connect() {
      if(firstconnect) {
        socket = io.connect(null);

        socket.on('message', function(data){ message(data); });
        socket.on('connect', function()
            { status_update("Connected to Server"); });
        socket.on('disconnect', function()
            { status_update("Disconnected from Server"); });
        socket.on('reconnect', function()
            { status_update("Reconnected to Server"); });
        socket.on('reconnecting', function( nextRetry )
            { status_update("Reconnecting in " + nextRetry/1000 + " s"); });
        socket.on('reconnect_failed', function()
            { message("Reconnect Failed"); });

        firstconnect = false;
      }
      else {
        socket.socket.reconnect();
      }
    }

    function disconnect() {
      socket.disconnect();
    }

    // When new data arrived, convert it and plot it.
    function message(data) {
        var myData = window.atob(data);
        // Pull out left and right channels
        for(var i=0; i<samples; i++) {
            globalDataL[i] = [i*Ts, myData.charCodeAt(2*i  )-128];
            globalDataR[i] = [i*Ts, myData.charCodeAt(2*i+1)-128];
        }
        plot.setData([ globalDataL, globalDataR ]);
        // since the axes don't change, we don't need to call plot.setupGrid()
        plot.draw();

      document.getElementById('message').innerHTML = "Server says: " +
          globalDataL.length + " points: ";
    }

    function status_update(txt){
      document.getElementById('status').innerHTML = txt;
    }

    function send(){
      socket.send("Hello Server!");    
    };

// jQuery
$(function () {

    function initPlotData() {
        // zip the generated y values with the x values
        var result = [];
        for (var i = 0; i <= samples; i++)
            result[i] = [i*Ts, 0];
        return result;
    }

    // setup control widget
    var updateInterval = 100;
    $("#updateInterval").val(updateInterval).change(function () {
        var v = $(this).val();
        if (v && !isNaN(+v)) {
            updateInterval = +v;
            if (updateInterval < 1)
                updateInterval = 1;
            if (updateInterval > 2000)
                updateInterval = 2000;
            $(this).val("" + updateInterval);
        }
    });

    // setup plot
    var options = {
        series: { 
            shadowSize: 0, // drawing is faster without shadows
            points: { show: false},
            lines:  { show: true, lineWidth: 5},
        }, 
        yaxis:    { min: -128, max: 128, 
                  zoomRange: [10, 256], panRange: [-128, 128] },
        xaxis:	{ show: true, 
                  zoomRange: [10, 100], panRange: [0, 100] },
        legend:	{ position: "sw" },
        zoom:	{ interactive: true, amount: 1.1 },
        pan:	{ interactive: true }
    };
    plot = $.plot($("#plotTop"), 
        [ 
          { data:  initPlotData(), 
            label: "Left Channel" },
          { data:  initPlotData(),
            label: "Right Channel" }
        ],
            options);

    // Request data every updateInterval ms
    function update() {
        socket.send("Send more data");
        setTimeout(update, updateInterval);
    }
    update();
});

