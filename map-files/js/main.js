


const birinchi = () => {


  let mapTitle = document.querySelector('.map-title');

  mapTitle.textContent="Suv xo'jalligi vazirligining hududiy boshqarmalari";


  // New map-pie series type that also allows lat/lon as center option.
// Also adds a sizeFormatter option to the series, to allow dynamic sizing
// of the pies.
Highcharts.seriesType('mappie', 'pie', {
  center: null, // Can't be array by default anymore
  clip: true, // For map navigation
  backgroundColor: 'rgba(242, 242, 242, 0.5)',
  states: {
    hover: {
      halo: {
        size: 5
      }
    }
  },
  dataLabels: {
    enabled: false
  }
}, {
  getCenter: function() {
    var options = this.options,
      chart = this.chart,
      slicingRoom = 2 * (options.slicedOffset || 0);
    if (!options.center) {
      options.center = [null, null]; // Do the default here instead
    }
    // Handle lat/lon support
    
    if (options.center.lat !== undefined) {
      var point = chart.fromLatLonToPoint(options.center);
      options.center = [
        chart.xAxis[0].toPixels(point.x, true),
        chart.yAxis[0].toPixels(point.y, true)
      ];
    }
        

    // Replace lat/lon with plotX/plotY
    if (options.center.plotX !== undefined) {
      options.center = [options.center.plotX, options.center.plotY];
    }


    // Handle dynamic size
    if (options.sizeFormatter) {
      options.size = options.sizeFormatter.call(this);
    }
    // Call parent function
    var result = Highcharts.seriesTypes.pie.prototype.getCenter.call(this);
    // Must correct for slicing room to get exact pixel pos
    result[0] -= slicingRoom;
    result[1] -= slicingRoom;
    return result;
  },
  translate: function(p) {
    this.options.center = this.userOptions.center;
    this.center = this.getCenter();
    return Highcharts.seriesTypes.pie.prototype.translate.call(this, p);
  }
});


var data = [
    // state, demVotes, repVotes, libVotes, grnVotes, sumVotes, winner, offset config for pies
    ['Tashkent', "Чирчиқ-Оҳангарон ирригация тизимлари ҳавза бошқармаси", "Тошкент ш., Роҳат к., 13-уй", "Абдураззоқов Жахонгир Боқижонович", "(71) 295-23-36", "tv.havza@minwater.uz", -1, 'Toshkent'],
    ['Andijon', "Норин-Қорадарё ирригация тизимлари ҳавза бошқармаси", "Андижон ш., Н.Охунов к., 40а-уй", "Хамидов Хушнудбек Собирович", "(74) 223-55-53", "nq.havza@minwater.uz", -1, 'Andijon'],
    ['Namangan', "Норин-Сирдарё ирригация тизимлари ҳавза бошқармаси", "Наманган ш., Ҳамроҳ к., 66-уй", "Алматов Фозилжон Абдукадирович", "(69) 227-69-40", "ns.havza@minwater.uz", -1, 'Namangan'],
    ['Ferghana', "Сирдарё-Сўх ирригация тизимлари ҳавза бошқармаси", "Фарғона ш., Ал-Фарғоний к., 72-уй", "Турсунов Фахриддин Султонович", "(73) 244-67-83", "fv.havza@minwater.uz", -1, "Farg'ona"],
    ['Sirdaryo', "Қуйи Сирдарё ирригация тизимлари ҳавза бошқармаси", "Гулистон ш., Хондамир к., 127-уй", "Исроилов Шавкат Отамуродович", "(67) 225-00-30", "qs.havza@minwater.uz", -1, 'Sirdaryo'],
    ['Jizzakh', "Сирдарё-Зарафшон ирригация тизимлари ҳавза бошқармаси", "Жиззах ш., Бешқувур к., 56-уй", "Джураев Шуҳрат Суярқулович", "(72) 226-91-28", "sz.havza@minwater.uz", -1, 'Jizzax'],
    ['Samarkand', "Зарафшон ирригация тизимлари ҳавза бошқармаси", "Самарқанд ш., Гагарин к., 70-уй", "Раджабов Фарход Валиевич", "(66) 234-44-10", "zar.havza@minwater.uz", -1, 'Samarqand'],
    ['Kashkadarya', "Аму-Қашқадарё ирригация тизимлари ҳавза бошқармаси", "Қарши ш., И.Каримов к., 81а-уй", "Вакант", "(75) 226-38-47", "aq.havza@minwater.uz", -1, 'Qashqadaryo'],
    ['Surkhandarya', "Аму-Сурхон ирригация тизимлари ҳавза бошқармаси", "Термиз ш., М.Қаххор к., 19-уй", "Алимов Тўлқин Жўраевич", "(76) 221-73-05", "as.havza@minwater.uz", -1, 'Surxandaryo'],
    ['Bukhoro', "Аму-Бухоро ирригация тизимлари ҳавза бошқармаси", "Бухоро ш., Б.Нақшбанд к., 297/1-уй", "Файзиллаев Эркин Бахшиллоевич", "(65) 225-09-35", "ab.havza@minwater.uz", -1, 'Buxoro'],
    ['Navoi', "Қуйи Зарафшон ирригация тизимлари ҳавза бошқармаси", "Навоий ш., А.Навоий к., 24-уй", "Шомуродов Нодир Намозович", "(79) 224-98-31", "qz.havza@minwater.uz", -1, 'Navoiy'],
    ['Khorezm', "Чапқирғоқ Амударё ирригация тизимлари ҳавза бошқармаси", "Урганч ш., М.Хоразмий к., 1-уй", "Тоиров Одилбек Рахимберганович", "(62) 226-01-35", "xz.havza@minwater.uz", -1, 'Xorazm'],
    ['Karakalpakstan', "Қорақалпоғистон Республикаси Сув хўжалиги вазирлиги", "Нукус ш., Т.Қайпберганов к., 25-уй", "Усаков Даулетбай Торебаевич", "(61) 224-13-68", "qqr@minwater.uz", -1, "Qoraqalpog'iston"]
  ],
  maxVotes = 0,
  demColor = '#333',
  repColor = 'rgba(220,71,71,0.80)',
  libColor = 'rgba(240,190,50,0.80)',
  grnColor = 'rgba(90,200,90,0.80)';


// Compute max votes to find relative sizes of bubbles
// Highcharts.each(data, function(row) {
//   maxVotes = Math.max(maxVotes, row[5]);
// });

// Build the chart
var chart = Highcharts.mapChart('container', {
  title: {
    text: 'j'
  },

  chart: {
    animation: false // Disable animation, especially for zooming
  },

  colorAxis: {
    min: 1,
    max: 1000,
    minColor: '#333',
    maxColor: '#333',
    dataClasses: [
    //   {
    //   from: -1,
    //   to: 0,
    //   color: 'rgba(90,200,90,0.80)',
    //   name: 'Nasoslar soni'
    // },
    // {
    //   from: 0,
    //   to: 1,
    //   color: 'rgba(90,200,90,0.80)',
    //   name: 'Kanallar soni'
    // }, {
    //   from: 2,
    //   to: 3,
    //   name: "Sug'oriladigan yerlar",
    //   color: '#333'
    // }, {
    //   from: 3,
    //   to: 4,
    //   name: 'Daryolar',
    //   color: grnColor
    // } 
  ]
  },

  mapNavigation: {
    enabled: true
  },
  // Limit zoom range
  yAxis: {
    minRange: 2300
  },

  tooltip: {
    useHTML: true
  },

  // Default options for the pies
  plotOptions: {
    mappie: {
      borderColor: 'rgba(255,255,255,0.4)',
      borderWidth: 1,
      tooltip: {
        headerFormat: ''
      }
    }
  },

  series: [{
    mapData: Highcharts.maps['countries/uz/uz-all'],
    data: data,
    name: 'States',
    borderColor: '#eee',
    showInLegend: false,
    joinBy: ['name', 'id'],
    keys: ['id', 'demVotes', 'repVotes', 'libVotes', 'grnVotes',
      'sumVotes', 'value', 'pieOffset'
    ],
    tooltip: {
      headerFormat: '',
      pointFormatter: function() {
        var regionType = "Бошлиқ"
        if(this.id == "Karakalpakstan") regionType="Вазир"
        else regionType = "Бошлиқ"
        var hoverVotes = this.hoverVotes; // Used by pie only
        return '<div class="my-div"><h3 class="map-t">' + this.demVotes+ ' </h3><br/>' +
          '<b class="item-title">' + regionType + ':' +'</b>' + '<span class="item-value">' + this.libVotes + '</span><br/>'+
          '<b class="item-title">Телефон:</b>' + '<span class="item-value">' + this.grnVotes + '</span><br/>' +
          '<b class="item-title">E-mail:</b>' + '<span class="item-value">' + this.sumVotes + '</span><br/>' +
          '<b class="item-title">Манзил:</b>' + '<span class="item-value">' + this.repVotes + '</span><br/></div>' 

      }
    },
    
  }]
});

// When clicking legend items, also toggle pies
Highcharts.each(chart.legend.allItems, function(item) {
  var old = item.setVisible;
  item.setVisible = function() {
    var legendItem = this;
    old.call(legendItem);
    Highcharts.each(chart.series[0].points, function(point) {
      if (chart.colorAxis[0].dataClasses[point.dataClass].name === legendItem.name) {
        // Find this state's pie and set visibility
        Highcharts.find(chart.series, function(item) {
          return item.name === point.id;
        }).setVisible(legendItem.visible, false);
      }
    });
    chart.redraw();
  };
});

// Add the pies after chart load
Highcharts.each(chart.series[0].points, function(state) {
  if (!state.id || !state.properties) {
    return; // Skip points with no data, if any
  }

  // var pieOffset = state.pieOffset || {},
  //   centerLat = parseFloat(state.properties.latitude),
  //   centerLon = parseFloat(state.properties.longitude);

  // Add the pie for this state
  chart.addSeries({
    type: 'mappie',
    name: state.id,
    zIndex: 6,
    sizeFormatter: function() {
      var yAxis = this.chart.yAxis[0],
        zoomFactor = (yAxis.dataMax - yAxis.dataMin) /
        (yAxis.max - yAxis.min);
      return Math.max(
        this.chart.chartWidth / 45 * zoomFactor, // Min size
        this.chart.chartWidth / 11 * zoomFactor * state.sumVotes / maxVotes
      );
    },
    tooltip: {
      // Use the state tooltip for the pies as well
      pointFormatter: function() {
        return state.series.tooltipOptions.pointFormatter.call({
          id: state.id,
          hoverVotes: this.stateName,
          demVotes: state.demVotes,
          repVotes: state.repVotes,
          libVotes: state.libVotes,
          grnVotes: state.grnVotes,
          sumVotes: state.sumVotes,
        });
      }
    },
    data: [{
      name: 'Democrats',
      y: state.demVotes,
      color: demColor
    }, {
      name: 'Republicans',
      y: state.repVotes,
      color: repColor
    }, {
      name: 'Libertarians',
      y: state.libVotes,
      color: libColor
    }, {
      name: 'Green',
      y: state.grnVotes,
      color: grnColor
    }],
    center: {
      plotX: state.plotX,
      plotY: state.plotY
    }
  }, false);


});
// Only redraw once all pies have been added
chart.redraw();

}



const ikkinchi = () => {

  let mapTitle = document.querySelector('.map-title');

  mapTitle.textContent="Hududlar kesimida sug'orish tarmoqlari haqida ma'lumot";

  
  // New map-pie series type that also allows lat/lon as center option.
// Also adds a sizeFormatter option to the series, to allow dynamic sizing
// of the pies.
Highcharts.seriesType('mappie', 'pie', {
  center: null, // Can't be array by default anymore
  clip: true, // For map navigation
  backgroundColor: '#1873B7',
  states: {
    hover: {
      halo: {
        size: 5
      }
    }
  },
  dataLabels: {
    enabled: false
  }
}, {
  getCenter: function() {
    var options = this.options,
      chart = this.chart,
      slicingRoom = 2 * (options.slicedOffset || 0);
    if (!options.center) {
      options.center = [null, null]; // Do the default here instead
    }
    // Handle lat/lon support
    
    if (options.center.lat !== undefined) {
      var point = chart.fromLatLonToPoint(options.center);
      options.center = [
        chart.xAxis[0].toPixels(point.x, true),
        chart.yAxis[0].toPixels(point.y, true)
      ];
    }
        

    // Replace lat/lon with plotX/plotY
    if (options.center.plotX !== undefined) {
      options.center = [options.center.plotX, options.center.plotY];
    }


    // Handle dynamic size
    if (options.sizeFormatter) {
      options.size = options.sizeFormatter.call(this);
    }
    // Call parent function
    var result = Highcharts.seriesTypes.pie.prototype.getCenter.call(this);
    // Must correct for slicing room to get exact pixel pos
    result[0] -= slicingRoom;
    result[1] -= slicingRoom;
    return result;
  },
  translate: function(p) {
    this.options.center = this.userOptions.center;
    this.center = this.getCenter();
    return Highcharts.seriesTypes.pie.prototype.translate.call(this, p);
  }
});

var data = [
  // state, demVotes, repVotes, libVotes, grnVotes, sumVotes, winner, offset config for pies
  ['Tashkent', "Чирчиқ-Оҳангарон ирригация тизимлари ҳавза бошқармаси", [292667,3157],[3057,12055] ,[2757,5615] , -1, 'Toshkent'],
  ['Andijon', "Норин-Қорадарё ирригация тизимлари ҳавза бошқармаси", [267912,2678], [2492,10670],[3607,4795] ,  -1, 'Andijon'],
  ['Namangan', "Норин-Сирдарё ирригация тизимлари ҳавза бошқармаси", [289998,2729], [2326,9590], [1813,3259], -1, 'Namangan'],
  ['Ferghana', "Сирдарё-Сўх ирригация тизимлари ҳавза бошқармаси", [362800,2773], [2260,16434], [4056,10474], -1, "Farg'ona"],
  ['Sirdaryo', "Қуйи Сирдарё ирригация тизимлари ҳавза бошқармаси", [286312,6256], [614,5645], [4741,11366], -1, 'Sirdaryo'],
  ['Jizzakh', "Сирдарё-Зарафшон ирригация тизимлари ҳавза бошқармаси", [268900,907], [651,4474],[1370,3513], -1, 'Jizzax'],
  ['Samarkand', "Зарафшон ирригация тизимлари ҳавза бошқармаси", [380200,1962], [1335,10918], [1892,2018], -1, 'Samarqand'],
  ['Kashkadarya', "Аму-Қашқадарё ирригация тизимлари ҳавза бошқармаси", [514114,2467], [2036,20450], [3547,10820], -1, 'Qashqadaryo'],
  ['Surkhandarya', "Аму-Сурхон ирригация тизимлари ҳавза бошқармаси", [326000,1630], [1377,12900],[1112,5581], -1, 'Surxandaryo'],
  ['Bukhoro', "Аму-Бухоро ирригация тизимлари ҳавза бошқармаси", [274599,1764], [1411,14977],[8743,5441], -1, 'Buxoro'],
  ['Navoi', "Қуйи Зарафшон ирригация тизимлари ҳавза бошқармаси", [123090,713], [713,5706], [1129,1999], -1, 'Navoiy'],
  ['Khorezm', "Чапқирғоқ Амударё ирригация тизимлари ҳавза бошқармаси", [246423,2221], [2221,14195],[3718,6755], -1, 'Xorazm'],
  ['Karakalpakstan', "Қорақалпоғистон Республикаси Сув хўжалиги вазирлиги", [514627,3868], [3266,18933], [4109,16470], -1, "Qoraqalpog'iston"]
],
  maxVotes = 0,
  demColor = '#333',
  repColor = 'rgba(220,71,71,0.80)',
  libColor = 'rgba(240,190,50,0.80)',
  grnColor = 'rgba(90,200,90,0.80)';


// Compute max votes to find relative sizes of bubbles
Highcharts.each(data, function(row) {
  maxVotes = Math.max(maxVotes, row[5]);
});

// Build the chart
var chart = Highcharts.mapChart('container', {
  title: {
    text: 'j'
  },

  chart: {
    animation: false // Disable animation, especially for zooming
  },

  colorAxis: {
    min: 1,
    max: 1000,
    minColor: '#333',
    maxColor: '#333',
    dataClasses: [
    //   {
    //   from: -1,
    //   to: 0,
    //   color: 'rgba(90,200,90,0.80)',
    //   name: 'Nasoslar soni'
    // },
    // {
    //   from: 0,
    //   to: 1,
    //   color: 'rgba(90,200,90,0.80)',
    //   name: 'Kanallar soni'
    // }, {
    //   from: 2,
    //   to: 3,
    //   name: "Sug'oriladigan yerlar",
    //   color: '#333'
    // }, {
    //   from: 3,
    //   to: 4,
    //   name: 'Daryolar',
    //   color: grnColor
    // } 
  ]
  },

  mapNavigation: {
    enabled: true
  },
  // Limit zoom range
  yAxis: {
    minRange: 2300
  },

  tooltip: {
    useHTML: true
  },

  // Default options for the pies
  plotOptions: {
    mappie: {
      borderColor: 'rgba(255,255,255,0.4)',
      borderWidth: 1,
      tooltip: {
        headerFormat: ''
      }
    }
  },

  series: [{
    mapData: Highcharts.maps['countries/uz/uz-all'],
    data: data,
    name: 'States',
    borderColor: '#eee',
    showInLegend: false,
    joinBy: ['name', 'id'],
    keys: ['id', 'demVotes', 'repVotes', 'libVotes', 'grnVotes',
      'sumVotes', 'value', 'pieOffset'
    ],
    tooltip: {
      headerFormat: '',
      pointFormatter: function() {
        var hoverVotes = this.hoverVotes; // Used by pie only
        return '<div class="my-div"><h3 class="map-t">' + this.demVotes+ ' </h3><br/>' +
        '<span style="margin-bottom: 20px; display: block !important;" class="item-title"><b>Каналлар'+'<br />'+' (сув хўжалиги ташкилотлари ҳисобидаги):</b>' + '<span class="item-value">'+ this.repVotes[1] + ' км</span>'+
        '<span style="margin-bottom: 20px; display: block;" class="item-title"><b>Ирригация тармоқлари '+'<br />'+' (сув хўжалиги ташкилотлари ҳисобидаги):</b>' + '<span class="item-value">' + this.libVotes[0] + ' км</span><br/>' +
        '<b class="item-title">СИУ, фермер ва '+'<br />'+' бошқаларнинг суғориш тармоқлари:</b>' + '<span class="item-value">' + this.libVotes[1] + ' км</span><br/><br/>' 

      }
    },
    
  }]
});

// When clicking legend items, also toggle pies
Highcharts.each(chart.legend.allItems, function(item) {
  var old = item.setVisible;
  item.setVisible = function() {
    var legendItem = this;
    old.call(legendItem);
    Highcharts.each(chart.series[0].points, function(point) {
      if (chart.colorAxis[0].dataClasses[point.dataClass].name === legendItem.name) {
        // Find this state's pie and set visibility
        Highcharts.find(chart.series, function(item) {
          return item.name === point.id;
        }).setVisible(legendItem.visible, false);
      }
    });
    chart.redraw();
  };
});

// Add the pies after chart load
Highcharts.each(chart.series[0].points, function(state) {
  if (!state.id || !state.properties) {
    return; // Skip points with no data, if any
  }

  // var pieOffset = state.pieOffset || {},
  //   centerLat = parseFloat(state.properties.latitude),
  //   centerLon = parseFloat(state.properties.longitude);

  // Add the pie for this state
  chart.addSeries({
    type: 'mappie',
    name: state.id,
    zIndex: 6,
    sizeFormatter: function() {
      var yAxis = this.chart.yAxis[0],
        zoomFactor = (yAxis.dataMax - yAxis.dataMin) /
        (yAxis.max - yAxis.min);
      return Math.max(
        this.chart.chartWidth / 45 * zoomFactor, // Min size
        this.chart.chartWidth / 11 * zoomFactor * state.sumVotes / maxVotes
      );
    },
    tooltip: {
      // Use the state tooltip for the pies as well
      pointFormatter: function() {
        return state.series.tooltipOptions.pointFormatter.call({
          id: state.id,
          hoverVotes: this.stateName,
          demVotes: state.demVotes,
          repVotes: state.repVotes,
          libVotes: state.libVotes,
          grnVotes: state.grnVotes,
          sumVotes: state.sumVotes,
        });
      }
    },
    data: [{
      name: 'Democrats',
      y: state.demVotes,
      color: demColor
    }, {
      name: 'Republicans',
      y: state.repVotes,
      color: repColor
    }, {
      name: 'Libertarians',
      y: state.libVotes,
      color: libColor
    }, {
      name: 'Green',
      y: state.grnVotes,
      color: grnColor
    }],
    center: {
      plotX: state.plotX,
      plotY: state.plotY
    }
  }, false);


});
// Only redraw once all pies have been added
chart.redraw();

}



const uchinchi = () => {

  let mapTitle = document.querySelector('.map-title');

  mapTitle.textContent="Hududlar kesimida nasos stansiyalari haqida ma'lumot";

  
  // New map-pie series type that also allows lat/lon as center option.
// Also adds a sizeFormatter option to the series, to allow dynamic sizing
// of the pies.
Highcharts.seriesType('mappie', 'pie', {
  center: null, // Can't be array by default anymore
  clip: true, // For map navigation
  backgroundColor: 'rgba(0,0,0,0.1)',
  states: {
    hover: {
      halo: {
        size: 5
      }
    }
  },
  dataLabels: {
    enabled: false
  }
}, {
  getCenter: function() {
    var options = this.options,
      chart = this.chart,
      slicingRoom = 2 * (options.slicedOffset || 0);
    if (!options.center) {
      options.center = [null, null]; // Do the default here instead
    }
    // Handle lat/lon support
    
    if (options.center.lat !== undefined) {
      var point = chart.fromLatLonToPoint(options.center);
      options.center = [
        chart.xAxis[0].toPixels(point.x, true),
        chart.yAxis[0].toPixels(point.y, true)
      ];
    }
        

    // Replace lat/lon with plotX/plotY
    if (options.center.plotX !== undefined) {
      options.center = [options.center.plotX, options.center.plotY];
    }


    // Handle dynamic size
    if (options.sizeFormatter) {
      options.size = options.sizeFormatter.call(this);
    }
    // Call parent function
    var result = Highcharts.seriesTypes.pie.prototype.getCenter.call(this);
    // Must correct for slicing room to get exact pixel pos
    result[0] -= slicingRoom;
    result[1] -= slicingRoom;
    return result;
  },
  translate: function(p) {
    this.options.center = this.userOptions.center;
    this.center = this.getCenter();
    return Highcharts.seriesTypes.pie.prototype.translate.call(this, p);
  }
});

var data = [
  // state, demVotes, repVotes, libVotes, grnVotes, sumVotes, winner, offset config for pies
  ['Tashkent', "Чирчиқ-Оҳангарон ирригация тизимлари ҳавза бошқармаси", 152, 10],
  ['Andijon', "Норин-Қорадарё ирригация тизимлари ҳавза бошқармаси", 148, 69  ],
  ['Namangan', "Норин-Сирдарё ирригация тизимлари ҳавза бошқармаси", 203, 810 ],
  ['Ferghana', "Сирдарё-Сўх ирригация тизимлари ҳавза бошқармаси", 170, 923 ],
  ['Sirdaryo', "Қуйи Сирдарё ирригация тизимлари ҳавза бошқармаси", 45, 142 ],
  ['Jizzakh', "Сирдарё-Зарафшон ирригация тизимлари ҳавза бошқармаси", 35, 62],
  ['Samarkand', "Зарафшон ирригация тизимлари ҳавза бошқармаси", 94, 387 ],
  ['Kashkadarya', "Аму-Қашқадарё ирригация тизимлари ҳавза бошқармаси", 76, 1093],
  ['Surkhandarya', "Аму-Сурхон ирригация тизимлари ҳавза бошқармаси", 113, 72],
  ['Bukhoro', "Аму-Бухоро ирригация тизимлари ҳавза бошқармаси", 37, 265],
  ['Navoi', "Қуйи Зарафшон ирригация тизимлари ҳавза бошқармаси", 36, 232],
  ['Khorezm', "Чапқирғоқ Амударё ирригация тизимлари ҳавза бошқармаси", 288, "-"],
  ['Karakalpakstan', "Қорақалпоғистон Республикаси Сув хўжалиги вазирлиги", 272, "-"]
],
  maxVotes = 0,
  demColor = '#333',
  repColor = 'rgba(220,71,71,0.80)',
  libColor = 'rgba(240,190,50,0.80)',
  grnColor = 'rgba(90,200,90,0.80)';


// Compute max votes to find relative sizes of bubbles
Highcharts.each(data, function(row) {
  maxVotes = Math.max(maxVotes, row[5]);
});

// Build the chart
var chart = Highcharts.mapChart('container', {
  title: {
    text: 'j'
  },

  chart: {
    animation: false // Disable animation, especially for zooming
  },

  colorAxis: {
    min: 1,
    max: 1000,
    minColor: '#333',
    maxColor: '#333',
    dataClasses: [
    //   {
    //   from: -1,
    //   to: 0,
    //   color: 'rgba(90,200,90,0.80)',
    //   name: 'Nasoslar soni'
    // },
    // {
    //   from: 0,
    //   to: 1,
    //   color: 'rgba(90,200,90,0.80)',
    //   name: 'Kanallar soni'
    // }, {
    //   from: 2,
    //   to: 3,
    //   name: "Sug'oriladigan yerlar",
    //   color: '#333'
    // }, {
    //   from: 3,
    //   to: 4,
    //   name: 'Daryolar',
    //   color: grnColor
    // } 
  ]
  },

  mapNavigation: {
    enabled: true
  },
  // Limit zoom range
  yAxis: {
    minRange: 2300
  },

  tooltip: {
    useHTML: true
  },

  // Default options for the pies
  plotOptions: {
    mappie: {
      borderColor: 'rgba(255,255,255,0.4)',
      borderWidth: 1,
      tooltip: {
        headerFormat: ''
      }
    }
  },

  series: [{
    mapData: Highcharts.maps['countries/uz/uz-all'],
    data: data,
    name: 'States',
    borderColor: '#eee',
    showInLegend: false,
    joinBy: ['name', 'id'],
    keys: ['id', 'demVotes', 'repVotes', 'libVotes', 'grnVotes',
      'sumVotes', 'value', 'pieOffset'
    ],
    tooltip: {
      headerFormat: '',
      pointFormatter: function() {
        var hoverVotes = this.hoverVotes; // Used by pie only
        return '<div class="my-div"><h3 class="map-t">' + this.demVotes+ ' </h3><br/>' +
        '<span style="margin-bottom: 20px; display: block !important;" class="item-title"><b ">Насос станциялари:</b>' +'<span class="item-value">' + this.repVotes + '</span><br/><br/>'+
        '<span style="margin-bottom: 20px; display: block !important;" class="item-title"><b ">Суғориш қудуқлари:</b>' +'<span class="item-value">' + this.libVotes + '</span><br/>'
      }
    },
    
  }]
});

// When clicking legend items, also toggle pies
Highcharts.each(chart.legend.allItems, function(item) {
  var old = item.setVisible;
  item.setVisible = function() {
    var legendItem = this;
    old.call(legendItem);
    Highcharts.each(chart.series[0].points, function(point) {
      if (chart.colorAxis[0].dataClasses[point.dataClass].name === legendItem.name) {
        // Find this state's pie and set visibility
        Highcharts.find(chart.series, function(item) {
          return item.name === point.id;
        }).setVisible(legendItem.visible, false);
      }
    });
    chart.redraw();
  };
});

// Add the pies after chart load
Highcharts.each(chart.series[0].points, function(state) {
  if (!state.id || !state.properties) {
    return; // Skip points with no data, if any
  }

  // var pieOffset = state.pieOffset || {},
  //   centerLat = parseFloat(state.properties.latitude),
  //   centerLon = parseFloat(state.properties.longitude);

  // Add the pie for this state
  chart.addSeries({
    type: 'mappie',
    name: state.id,
    zIndex: 6,
    sizeFormatter: function() {
      var yAxis = this.chart.yAxis[0],
        zoomFactor = (yAxis.dataMax - yAxis.dataMin) /
        (yAxis.max - yAxis.min);
      return Math.max(
        this.chart.chartWidth / 45 * zoomFactor, // Min size
        this.chart.chartWidth / 11 * zoomFactor * state.sumVotes / maxVotes
      );
    },
    tooltip: {
      // Use the state tooltip for the pies as well
      pointFormatter: function() {
        return state.series.tooltipOptions.pointFormatter.call({
          id: state.id,
          hoverVotes: this.stateName,
          demVotes: state.demVotes,
          repVotes: state.repVotes,
          libVotes: state.libVotes,
          grnVotes: state.grnVotes,
          sumVotes: state.sumVotes,
        });
      }
    },
    data: [{
      name: 'Democrats',
      y: state.demVotes,
      color: demColor
    }, {
      name: 'Republicans',
      y: state.repVotes,
      color: repColor
    }, {
      name: 'Libertarians',
      y: state.libVotes,
      color: libColor
    }, {
      name: 'Green',
      y: state.grnVotes,
      color: grnColor
    }],
    center: {
      plotX: state.plotX,
      plotY: state.plotY
    }
  }, false);


});
// Only redraw once all pies have been added
chart.redraw();

}



const turtinchi = () => {

  let mapTitle = document.querySelector('.map-title');

  mapTitle.textContent="Hududlar kesimida sug'orish me'yori: 1 gektar maydonga tog'ri keladigan suv miqdori";

  
  // New map-pie series type that also allows lat/lon as center option.
// Also adds a sizeFormatter option to the series, to allow dynamic sizing
// of the pies.
Highcharts.seriesType('mappie', 'pie', {
  center: null, // Can't be array by default anymore
  clip: true, // For map navigation
  backgroundColor: 'rgba(0,0,0,0.1)',
  states: {
    hover: {
      halo: {
        size: 5
      }
    }
  },
  dataLabels: {
    enabled: false
  }
}, {
  getCenter: function() {
    var options = this.options,
      chart = this.chart,
      slicingRoom = 2 * (options.slicedOffset || 0);
    if (!options.center) {
      options.center = [null, null]; // Do the default here instead
    }
    // Handle lat/lon support
    
    if (options.center.lat !== undefined) {
      var point = chart.fromLatLonToPoint(options.center);
      options.center = [
        chart.xAxis[0].toPixels(point.x, true),
        chart.yAxis[0].toPixels(point.y, true)
      ];
    }
        

    // Replace lat/lon with plotX/plotY
    if (options.center.plotX !== undefined) {
      options.center = [options.center.plotX, options.center.plotY];
    }


    // Handle dynamic size
    if (options.sizeFormatter) {
      options.size = options.sizeFormatter.call(this);
    }
    // Call parent function
    var result = Highcharts.seriesTypes.pie.prototype.getCenter.call(this);
    // Must correct for slicing room to get exact pixel pos
    result[0] -= slicingRoom;
    result[1] -= slicingRoom;
    return result;
  },
  translate: function(p) {
    this.options.center = this.userOptions.center;
    this.center = this.getCenter();
    return Highcharts.seriesTypes.pie.prototype.translate.call(this, p);
  }
});

var data = [
  // state, demVotes, repVotes, libVotes, grnVotes, sumVotes, winner, offset config for pies
  ['Tashkent', "Чирчиқ-Оҳангарон ирригация тизимлари ҳавза бошқармаси", [5500,7600], [5100,9900], [3600,3900], [3100,21200], -1, 'Toshkent'],
  ['Andijon', "Норин-Қорадарё ирригация тизимлари ҳавза бошқармаси", [5900,8100], [5400,10600], [2700,4100], [3300, "-"], -1, 'Andijon'],
  ['Namangan', "Норин-Сирдарё ирригация тизимлари ҳавза бошқармаси", [6450,8950], [5950,11650], [4200,4500], [3300,"-"], -1, 'Namangan'],
  ['Ferghana', "Сирдарё-Сўх ирригация тизимлари ҳавза бошқармаси", [5600,7800], [5200,10100], [3900,3900], [3400,"-"], -1, "Farg'ona"],
  ['Sirdaryo', "Қуйи Сирдарё ирригация тизимлари ҳавза бошқармаси", [6100,7300], [5600,11000], [4000,4300], [3000,21300], -1, 'Sirdaryo'],
  ['Jizzakh', "Сирдарё-Зарафшон ирригация тизимлари ҳавза бошқармаси", [6800,9400], [6300,12200], [4400,4800], [2700,"-"], -1, 'Jizzax'],
  ['Samarkand', "Зарафшон ирригация тизимлари ҳавза бошқармаси", [6300,8800], [5800,11300], [4100,4400], [3100,"-"], -1, 'Samarqand'],
  ['Kashkadarya', "Аму-Қашқадарё ирригация тизимлари ҳавза бошқармаси", [7550,10450], [6950,13600], [4900,5300], [3100,"-"], -1, 'Qashqadaryo'],
  ['Surkhandarya', "Аму-Сурхон ирригация тизимлари ҳавза бошқармаси", [8100,11250], [7500,14600], [5250,5650], [3300,31000], -1, 'Surxandaryo'],
  ['Bukhoro', "Аму-Бухоро ирригация тизимлари ҳавза бошқармаси", [6800,9400], [6500,12200], [4400,4800], [2800,"-"], -1, 'Buxoro'],
  ['Navoi', "Қуйи Зарафшон ирригация тизимлари ҳавза бошқармаси", [6250,8650], [6050,11250], [4000,4400], [2800,"-"], -1, 'Navoiy'],
  ['Khorezm', "Чапқирғоқ Амударё ирригация тизимлари ҳавза бошқармаси", [5100,7500], [5000,9200], [3300,3600], [2700,26200], -1, 'Xorazm'],
  ['Karakalpakstan', "Қорақалпоғистон Республикаси Сув хўжалиги вазирлиги", [6100,8500], [5700,11000], [4000,4300], [3300,22400], -1, "Qoraqalpog'iston"]
],
  maxVotes = 0,
  demColor = '#333',
  repColor = 'rgba(220,71,71,0.80)',
  libColor = 'rgba(240,190,50,0.80)',
  grnColor = 'rgba(90,200,90,0.80)';


// Compute max votes to find relative sizes of bubbles
Highcharts.each(data, function(row) {
  maxVotes = Math.max(maxVotes, row[5]);
});

// Build the chart
var chart = Highcharts.mapChart('container', {
  title: {
    text: 'j'
  },

  chart: {
    animation: false // Disable animation, especially for zooming
  },

  colorAxis: {
    min: 1,
    max: 1000,
    minColor: '#333',
    maxColor: '#333',
    dataClasses: [
    //   {
    //   from: -1,
    //   to: 0,
    //   color: 'rgba(90,200,90,0.80)',
    //   name: 'Nasoslar soni'
    // },
    // {
    //   from: 0,
    //   to: 1,
    //   color: 'rgba(90,200,90,0.80)',
    //   name: 'Kanallar soni'
    // }, {
    //   from: 2,
    //   to: 3,
    //   name: "Sug'oriladigan yerlar",
    //   color: '#333'
    // }, {
    //   from: 3,
    //   to: 4,
    //   name: 'Daryolar',
    //   color: grnColor
    // } 
  ]
  },

  mapNavigation: {
    enabled: true
  },
  // Limit zoom range
  yAxis: {
    minRange: 2300
  },

  tooltip: {
    useHTML: true
  },

  // Default options for the pies
  plotOptions: {
    mappie: {
      borderColor: 'rgba(255,255,255,0.4)',
      borderWidth: 1,
      tooltip: {
        headerFormat: ''
      }
    }
  },

  series: [{
    mapData: Highcharts.maps['countries/uz/uz-all'],
    data: data,
    name: 'States',
    borderColor: '#eee',
    showInLegend: false,
    joinBy: ['name', 'id'],
    keys: ['id', 'demVotes', 'repVotes', 'libVotes', 'grnVotes',
      'sumVotes', 'value', 'pieOffset'
    ],
    tooltip: {
      headerFormat: '',
      pointFormatter: function() {
        var hoverVotes = this.hoverVotes; // Used by pie only
        return '<div class="my-div"><h3 class="map-t">' + this.demVotes+ ' </h3><br/>' +
        '<span style="margin-bottom: 20px; display: block !important;" class="item-title"><b>Пахта:</b>' +'<span class="item-value">' + this.repVotes[0] + ' (м<sup>3</sup>/га)</span><br/>'+
        '<span style="margin-bottom: 20px; display: block !important;" class="item-title"><b>Беда:</b>' +'<span class="item-value">' + this.repVotes[1] + ' (м<sup>3</sup>/га)</span><br/>'+
        '<span style="margin-bottom: 20px; display: block !important;" class="item-title"><b>Маккажўхори:</b>' + '<span class="item-value">'+ this.libVotes[0] + ' (м<sup>3</sup>/га) </span>'+
        '<span style="margin-bottom: 20px; display: block !important;" class="item-title"><b>Картошка ва полиз махсулотлари:</b>' + '<span class="item-value">'+ this.libVotes[1] + ' (м<sup>3</sup>/га) </span>'+
        '<span style="margin-bottom: 20px; display: block;" class="item-title"><b>Томорқа:</b>' + '<span class="item-value">' + this.grnVotes[0] + ' (м<sup>3</sup>/га)</span><br/>' +
        '<span style="margin-bottom: 20px; display: block;" class="item-title"><b>Боғ ва узумзор:</b>' + '<span class="item-value">' + this.grnVotes[1] + ' (м<sup>3</sup>/га)</span><br/>' +
        '<b class="item-title">Ғалла:</b>' + '<span class="item-value">' + this.sumVotes[0] + ' (м<sup>3</sup>/га)</span><br/>' + 
        '<b class="item-title">Шоли:</b>' + '<span class="item-value">' + this.sumVotes[1] + ' (м<sup>3</sup>/га)</span><br/>' 


      }
    },
    
  }]
});

// When clicking legend items, also toggle pies
Highcharts.each(chart.legend.allItems, function(item) {
  var old = item.setVisible;
  item.setVisible = function() {
    var legendItem = this;
    old.call(legendItem);
    Highcharts.each(chart.series[0].points, function(point) {
      if (chart.colorAxis[0].dataClasses[point.dataClass].name === legendItem.name) {
        // Find this state's pie and set visibility
        Highcharts.find(chart.series, function(item) {
          return item.name === point.id;
        }).setVisible(legendItem.visible, false);
      }
    });
    chart.redraw();
  };
});

// Add the pies after chart load
Highcharts.each(chart.series[0].points, function(state) {
  if (!state.id || !state.properties) {
    return; // Skip points with no data, if any
  }

  // var pieOffset = state.pieOffset || {},
  //   centerLat = parseFloat(state.properties.latitude),
  //   centerLon = parseFloat(state.properties.longitude);

  // Add the pie for this state
  chart.addSeries({
    type: 'mappie',
    name: state.id,
    zIndex: 6,
    sizeFormatter: function() {
      var yAxis = this.chart.yAxis[0],
        zoomFactor = (yAxis.dataMax - yAxis.dataMin) /
        (yAxis.max - yAxis.min);
      return Math.max(
        this.chart.chartWidth / 45 * zoomFactor, // Min size
        this.chart.chartWidth / 11 * zoomFactor * state.sumVotes / maxVotes
      );
    },
    tooltip: {
      // Use the state tooltip for the pies as well
      pointFormatter: function() {
        return state.series.tooltipOptions.pointFormatter.call({
          id: state.id,
          hoverVotes: this.stateName,
          demVotes: state.demVotes,
          repVotes: state.repVotes,
          libVotes: state.libVotes,
          grnVotes: state.grnVotes,
          sumVotes: state.sumVotes,
        });
      }
    },
    data: [{
      name: 'Democrats',
      y: state.demVotes,
      color: demColor
    }, {
      name: 'Republicans',
      y: state.repVotes,
      color: repColor
    }, {
      name: 'Libertarians',
      y: state.libVotes,
      color: libColor
    }, {
      name: 'Green',
      y: state.grnVotes,
      color: grnColor
    }],
    center: {
      plotX: state.plotX,
      plotY: state.plotY
    }
  }, false);


});
// Only redraw once all pies have been added
chart.redraw();

}



const beshinchi = () => {

  let mapTitle = document.querySelector('.map-title');

  mapTitle.textContent="Hududlar kesimida sug'orish tarmoqlari haqida ma'lumot";

  
  // New map-pie series type that also allows lat/lon as center option.
// Also adds a sizeFormatter option to the series, to allow dynamic sizing
// of the pies.
Highcharts.seriesType('mappie', 'pie', {
  center: null, // Can't be array by default anymore
  clip: true, // For map navigation
  backgroundColor: 'rgba(0,0,0,0.1)',
  states: {
    hover: {
      halo: {
        size: 5
      }
    }
  },
  dataLabels: {
    enabled: false
  }
}, {
  getCenter: function() {
    var options = this.options,
      chart = this.chart,
      slicingRoom = 2 * (options.slicedOffset || 0);
    if (!options.center) {
      options.center = [null, null]; // Do the default here instead
    }
    // Handle lat/lon support
    
    if (options.center.lat !== undefined) {
      var point = chart.fromLatLonToPoint(options.center);
      options.center = [
        chart.xAxis[0].toPixels(point.x, true),
        chart.yAxis[0].toPixels(point.y, true)
      ];
    }
        

    // Replace lat/lon with plotX/plotY
    if (options.center.plotX !== undefined) {
      options.center = [options.center.plotX, options.center.plotY];
    }


    // Handle dynamic size
    if (options.sizeFormatter) {
      options.size = options.sizeFormatter.call(this);
    }
    // Call parent function
    var result = Highcharts.seriesTypes.pie.prototype.getCenter.call(this);
    // Must correct for slicing room to get exact pixel pos
    result[0] -= slicingRoom;
    result[1] -= slicingRoom;
    return result;
  },
  translate: function(p) {
    this.options.center = this.userOptions.center;
    this.center = this.getCenter();
    return Highcharts.seriesTypes.pie.prototype.translate.call(this, p);
  }
});

var data = [
  // state, demVotes, repVotes, libVotes, grnVotes, sumVotes, winner, offset config for pies
  ['Tashkent', "Чирчиқ-Оҳангарон ирригация тизимлари ҳавза бошқармаси", 398, 3243, 2712,-1, 'Toshkent'],
  ['Andijon', "Норин-Қорадарё ирригация тизимлари ҳавза бошқармаси", 273, 1883, 2102,-1, 'Andijon'],
  ['Namangan', "Норин-Сирдарё ирригация тизимлари ҳавза бошқармаси", 283, 1747, 2098,  -1, 'Namangan'],
  ['Ferghana', "Сирдарё-Сўх ирригация тизимлари ҳавза бошқармаси", 369, 2324, 2854, -1, "Farg'ona"],
  ['Sirdaryo', "Қуйи Сирдарё ирригация тизимлари ҳавза бошқармаси", 287, 1667, 2202, -1, 'Sirdaryo'],
  ['Jizzakh', "Сирдарё-Зарафшон ирригация тизимлари ҳавза бошқармаси", 300, 1829, 2347, -1, 'Jizzax'],
  ['Samarkand', "Зарафшон ирригация тизимлари ҳавза бошқармаси", 380, 2306, 2654,  -1, 'Samarqand'],
  ['Kashkadarya', "Аму-Қашқадарё ирригация тизимлари ҳавза бошқармаси", 515, 3015, 4221, -1, 'Qashqadaryo'],
  ['Surkhandarya', "Аму-Сурхон ирригация тизимлари ҳавза бошқармаси", 326, 2345, 3021,  -1, 'Surxandaryo'],
  ['Bukhoro', "Аму-Бухоро ирригация тизимлари ҳавза бошқармаси", 275, 2099, 3404, -1, 'Buxoro'],
  ['Navoi', "Қуйи Зарафшон ирригация тизимлари ҳавза бошқармаси", 123, 1330, 1209, -1, 'Navoiy'],
  ['Khorezm', "Чапқирғоқ Амударё ирригация тизимлари ҳавза бошқармаси", 266, 2365, 3113, -1, 'Xorazm'],
  ['Karakalpakstan', "Қорақалпоғистон Республикаси Сув хўжалиги вазирлиги", 511, 3846, 5922, -1, "Qoraqalpog'iston"]
],
  maxVotes = 0,
  demColor = '#333',
  repColor = 'rgba(220,71,71,0.80)',
  libColor = 'rgba(240,190,50,0.80)',
  grnColor = 'rgba(90,200,90,0.80)';


// Compute max votes to find relative sizes of bubbles
Highcharts.each(data, function(row) {
  maxVotes = Math.max(maxVotes, row[5]);
});

// Build the chart
var chart = Highcharts.mapChart('container', {
  title: {
    text: 'j'
  },

  chart: {
    animation: false // Disable animation, especially for zooming
  },

  colorAxis: {
    min: 1,
    max: 1000,
    minColor: '#333',
    maxColor: '#333',
    dataClasses: [
    //   {
    //   from: -1,
    //   to: 0,
    //   color: 'rgba(90,200,90,0.80)',
    //   name: 'Nasoslar soni'
    // },
    // {
    //   from: 0,
    //   to: 1,
    //   color: 'rgba(90,200,90,0.80)',
    //   name: 'Kanallar soni'
    // }, {
    //   from: 2,
    //   to: 3,
    //   name: "Sug'oriladigan yerlar",
    //   color: '#333'
    // }, {
    //   from: 3,
    //   to: 4,
    //   name: 'Daryolar',
    //   color: grnColor
    // } 
  ]
  },

  mapNavigation: {
    enabled: true
  },
  // Limit zoom range
  yAxis: {
    minRange: 2300
  },

  tooltip: {
    useHTML: true
  },

  // Default options for the pies
  plotOptions: {
    mappie: {
      borderColor: 'rgba(255,255,255,0.4)',
      borderWidth: 1,
      tooltip: {
        headerFormat: ''
      }
    }
  },

  series: [{
    mapData: Highcharts.maps['countries/uz/uz-all'],
    data: data,
    name: 'States',
    borderColor: '#eee',
    showInLegend: false,
    joinBy: ['name', 'id'],
    keys: ['id', 'demVotes', 'repVotes', 'libVotes', 'grnVotes',
      'sumVotes', 'value', 'pieOffset'
    ],
    tooltip: {
      headerFormat: '',
      pointFormatter: function() {
        var hoverVotes = this.hoverVotes; // Used by pie only
        return '<div class="my-div"><h3 class="map-t">' + this.demVotes+ ' </h3><br/>' +
        '<span style="margin-bottom: 20px; display: block !important;" class="item-title"><b>Суғориладиган ер майдони:</b>' +'<span class="item-value">' + this.repVotes + ' минг га</span><br/><br/>'+
        '<span style="margin-bottom: 20px; display: block !important;" class="item-title"><b>2021 йил суғориш мавсумига '+'<br />'+'ажратилган сув олиш лимити:</b>' + '<span class="item-value">'+ this.libVotes + ' (м<sup>3</sup>/га)</span><br/><br/>'+
        '<span style="margin-bottom: 20px; display: block;" class="item-title"><b>2020-2021 гидрологик йилда '+'<br />'+'олинган сув миқдори</b>' + '<span class="item-value">' + this.grnVotes + ' (м<sup>3</sup>/га)</span><br/><br/>'

      }
    },
    
  }]
});

// When clicking legend items, also toggle pies
Highcharts.each(chart.legend.allItems, function(item) {
  var old = item.setVisible;
  item.setVisible = function() {
    var legendItem = this;
    old.call(legendItem);
    Highcharts.each(chart.series[0].points, function(point) {
      if (chart.colorAxis[0].dataClasses[point.dataClass].name === legendItem.name) {
        // Find this state's pie and set visibility
        Highcharts.find(chart.series, function(item) {
          return item.name === point.id;
        }).setVisible(legendItem.visible, false);
      }
    });
    chart.redraw();
  };
});

// Add the pies after chart load
Highcharts.each(chart.series[0].points, function(state) {
  if (!state.id || !state.properties) {
    return; // Skip points with no data, if any
  }

  // var pieOffset = state.pieOffset || {},
  //   centerLat = parseFloat(state.properties.latitude),
  //   centerLon = parseFloat(state.properties.longitude);

  // Add the pie for this state
  chart.addSeries({
    type: 'mappie',
    name: state.id,
    zIndex: 6,
    sizeFormatter: function() {
      var yAxis = this.chart.yAxis[0],
        zoomFactor = (yAxis.dataMax - yAxis.dataMin) /
        (yAxis.max - yAxis.min);
      return Math.max(
        this.chart.chartWidth / 45 * zoomFactor, // Min size
        this.chart.chartWidth / 11 * zoomFactor * state.sumVotes / maxVotes
      );
    },
    tooltip: {
      // Use the state tooltip for the pies as well
      pointFormatter: function() {
        return state.series.tooltipOptions.pointFormatter.call({
          id: state.id,
          hoverVotes: this.stateName,
          demVotes: state.demVotes,
          repVotes: state.repVotes,
          libVotes: state.libVotes,
          grnVotes: state.grnVotes,
          sumVotes: state.sumVotes,
        });
      }
    },
    data: [{
      name: 'Democrats',
      y: state.demVotes,
      color: demColor
    }, {
      name: 'Republicans',
      y: state.repVotes,
      color: repColor
    }, {
      name: 'Libertarians',
      y: state.libVotes,
      color: libColor
    }, {
      name: 'Green',
      y: state.grnVotes,
      color: grnColor
    }],
    center: {
      plotX: state.plotX,
      plotY: state.plotY
    }
  }, false);


});
// Only redraw once all pies have been added
chart.redraw();

}

let birinchiBtn = document.querySelector('#birinchi');
let ikkinchiBtn = document.querySelector('#ikkinchi');
let uchinchiBtn = document.querySelector('#uchinchi');
let turtinchiBtn= document.querySelector('#turtinchi');
let beshinchiBtn = document.querySelector('#beshinchi');


birinchiBtn.addEventListener('click', ()=>{
  birinchi();
})

ikkinchiBtn.addEventListener('click', ()=>{
  ikkinchi();
})

uchinchiBtn.addEventListener('click', ()=>{
  uchinchi();
})

turtinchiBtn.addEventListener('click', ()=>{
  turtinchi();
})

beshinchiBtn.addEventListener('click', ()=>{
  beshinchi();
})

document.addEventListener("DOMContentLoaded", ()=> {
  birinchi();
})


let mapMain = document.querySelector('.map-main');

let btns = mapMain.querySelectorAll('button');

for(let i=0; i<btns.length; i++) {
  btns[i].addEventListener('click', ()=> {
    for(let j=0; j<btns.length; j++) {
      btns[j].classList.remove('button-active')
    }

    btns[i].classList.add('button-active')
  })
}