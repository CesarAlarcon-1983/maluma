'use strict';

// Constructor
var Pagination = {
  generate: function(pages, currentPage, operacion) {
    var paginationStructureContainer = $('.pagination__list');

    this.pagesIndex(pages, currentPage);

    paginationStructureContainer.append(this.paginationHtmlStructure(pages, currentPage, operacion))
  },

  getParams: function (url) {
    var params = {};
    var parser = document.createElement('a');
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
  
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      params[pair[0]] = decodeURIComponent(pair[1]);
    }
    
    return params;
  },

  urlSelector: function(params, page) {
    var keys = Object.keys(params);
    var operacion = window.location.href.indexOf('venta') > 0 ? 'venta' : 'alquiler';

    var formattedParams = [];

    for(var i = 0; i < keys.length; i++) {
      if(params[keys[i]] !== "" && keys[i] !== "page") {
        formattedParams.push( keys[i] + "=" + params[keys[i]])
      }
    }

    var paramsForUrl = formattedParams.join('&');
    var url = `/${operacion}?data=${operacion}&tipo_operacion=${operacion}&page=${page}&${paramsForUrl}`;

    console.log(paramsForUrl);
    return url;
  },
  
  paginationHtmlStructure: function(pages, currentPage) {
    return (
      `<li>
        <a class="pagination__button ${currentPage === 1 && '-active'}" href="${this.urlSelector(this.getParams(window.location.href), 1)}">1</a>
      </li>
      ${currentPage > 3 ? `<li><span class="pagination__dots">...</span></li>` : ''}
      ${pages > 2 ? `<li><a class="pagination__button ${currentPage === this.pagesArray[0] && '-active'}" href="${this.urlSelector(this.getParams(window.location.href), this.pagesArray[0])}">${this.pagesArray[0]}</a></li>`: ""}
      ${pages > 3 ? `<li><a class="pagination__button ${currentPage === this.pagesArray[1] && '-active'}" href="${this.urlSelector(this.getParams(window.location.href), this.pagesArray[1])}">${this.pagesArray[1]}</a></li>`: ""}
      ${pages > 4 ? `<li><a class="pagination__button ${currentPage === this.pagesArray[2] && '-active'}" href="${this.urlSelector(this.getParams(window.location.href), this.pagesArray[2])}">${this.pagesArray[2]}</a></li>` : ""}
      ${currentPage <= pages - 3 ? `<li><span class="pagination__dots">...</span></li>` : ''}
      ${pages > 1 ? `<li><a class="pagination__button ${currentPage === pages && '-active'}" href="${this.urlSelector(this.getParams(window.location.href), pages)}">${pages}</a></li>`: ""}
      `
    )
  },

  pagesArray: [],

  pagesIndex: function(pages, currentPage) {
    this.pagesArray = [];

    if(pages <= 5) {
      switch(pages) {
        case 5: 
          this.pagesArray.push(2,3,4);
          break;
        case 4:
          this.pagesArray.push(2,3);
          break;
        case 3:
          this.pagesArray.push(2);
          break;
        default:
          this.pagesArray = [];
          break;
      }
      return
    }

    if(currentPage <= 3 && pages > 5) {
      this.pagesArray.push(2,3,4);

      return
    }

    if(currentPage > 2 && currentPage < pages - 4) {
      this.pagesArray.push(currentPage, currentPage + 1, currentPage + 2);

      return
    }

    if(currentPage >= 4 && currentPage <= pages - 3) {
      this.pagesArray.push(currentPage - 2, currentPage - 1, currentPage);

      return
    }

    if(currentPage > pages - 3) {
      this.pagesArray.push(pages - 3, pages - 2, pages - 1);
      
      return
    }
  }
}

module.exports = Pagination;
