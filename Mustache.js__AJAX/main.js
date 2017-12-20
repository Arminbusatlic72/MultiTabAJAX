var booksRow = document.querySelector('.booksRow');
var boxingRow = document.querySelector('.boxingRow');
var template = document.getElementById('JS-template').innerHTML;
var navLinks = document.getElementsByClassName('navLinks');
var backToTop = document.querySelector('#back-to-top');
var body = document.getElementsByTagName('body')[0];
console.log(body);
backToTop.addEventListener('click', function animateToTop() {
  
    var scrollToTop = window.setInterval(function() {
        var pos = window.pageYOffset;
        if ( pos > 0 ) {
            window.scrollTo( 0, pos - 20 );
        } else {
            window.clearInterval( scrollToTop );
        }
    }, 10);
});

for (i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', display);
}


function display(e) {
    e.preventDefault();
    var link = e.currentTarget.getAttribute('href');
    var xml = new XMLHttpRequest();
    xml.open('get', link);
    xml.addEventListener('readystatechange', function () {
        if (xml.readyState == 4 && xml.status == 200) {
            //createTable(xml)
            var data = JSON.parse(xml.responseText);

            var header;


            header = Object.keys(data[0]);

            var dataValues = [];
            data.forEach(function(element) {
              //console.log(Object.values(element));
              dataValues.push(Object.values(element));
            });
            console.log(dataValues[0]);


            var html = Mustache.render(template, {
                header: header,
                data: dataValues
            });
            booksRow.innerHTML = html;
        }
    })
    xml.send();
}
// function displayBoxing(e) {
//   e.preventDefault();
//   var link = e.currentTarget.getAttribute('href');
//   var xml = new XMLHttpRequest();
//   xml.open('get', link);
//   xml.addEventListener('readystatechange', function () {
//     if(xml.readyState == 4 && xml.status == 200) {
//       var data = JSON.parse(xml.responseText);
//       var header;
//       header = Mustache.render(template, {
//         header: header,
//         data: data
//       });
//       boxingRow.innerHTML = html;
//     }
//   })
//   xml.send();
// }
