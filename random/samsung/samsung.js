// this helped a lot: http://www.samsung.com/uk/support/skp/faq/1052003

var DISPLAY_TYPES = {
  U: 'LED',
  P: 'PLASMA',
  L: 'LCD',
  H: 'DLP',
  K: 'OLED'
};
var MARKETS = {
  A: 'Asia',
  E: 'Europe',
  N: 'North America'
};
var MODEL_YEARS = {
  A: 2008,
  B: 2009,
  C: 2010,
  D: 2011,
  E: 2012,
  F: 2013,
  H: 2014,
  J: 2015,
  L: 2015
};

var EXTRA_IDENTIFIERS_BEFORE_2014 = {
  S: 'Slim',
  H: 'Hybrid'
};

var EXTRA_IDENTIFIERS_SINCE_2014 = {
  U: 'UHD',
  S: 'SUHD'
};

function parseModel(model) {
  if (!model || model.indexOf('-') > -1) {
    console.log("model left empty or is from before 2008");
    return;
  }
  // remove all whitespace
  model = model.replace(/\s/g, "");
  model = model.toUpperCase();

  var i = 0;
  var displayType = model.substring(i, ++i);
  var producedForMarket = model.substring(i, ++i);
  var screenSize = model.substring(i, i += 2); // in inches

  // for 100+ inches
  if (!isNaN(model.substring(i, i + 1))) {
    screenSize += model.substring(i, ++i);
    i = 5;
  }

  var manufacturedIn = model.substring(i, ++i);

  var extraSpecifier = null;
  if (isNaN(model.substring(i, i + 1))) {
    extraSpecifier = model.substring(i, ++i);
    i = 6;
  }

  var series = model.substring(i, i + 4);
  var designFeatures = model.substring(i + 4, i + 5);
  var manufacturingInfo = model.substring(i + 5, i + 8);

  var extraIdentifiers = MODEL_YEARS[manufacturedIn] < 2014 ?
      EXTRA_IDENTIFIERS_BEFORE_2014
      : EXTRA_IDENTIFIERS_SINCE_2014;

  var tvInfo = {
    model: model,
    displayType: DISPLAY_TYPES[displayType],
    producedForMarket: MARKETS[producedForMarket],
    screenSize: screenSize,
    manufacturedIn: MODEL_YEARS[manufacturedIn],
    extraSpecifier: extraIdentifiers[extraSpecifier],
    series: series,
    designFeatures: designFeatures,
    manufacturingInfo: manufacturingInfo
  };

  //console.table(inf);

  var template = '<h4>Model: ' + tvInfo.model + '</h4>';
  template += '<table class="specs_table">';
  template += rowTemplate('Display type', tvInfo.displayType);
  template += rowTemplate('Produced for market', tvInfo.producedForMarket);
  template += rowTemplate('Screen size', tvInfo.screenSize + '″');
  template += rowTemplate('Manufactured in', tvInfo.manufacturedIn);
  template += rowTemplate('Extra specifiers', tvInfo.extraSpecifier);
  template += rowTemplate('Series', tvInfo.series);
  template += rowTemplate('Design features', tvInfo.designFeatures);
  template += rowTemplate('Manufacturing info', tvInfo.manufacturingInfo);
  template += '</table>';

  document.getElementById('dynamic_content').innerHTML = template;
}

function rowTemplate(title, value) {
  return '<tr><th scope="row">' + title + '</th><td>' + value + '</td></tr>';
}