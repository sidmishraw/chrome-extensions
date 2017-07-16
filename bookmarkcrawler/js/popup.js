/**
 * popup.js
 *
 * @author sidmishraw < sidharth.mishra@sjsu.edu >
 * @description Popup.js is the logic for the Chrome extension
 * @created Sat Jul 15 2017 17:12:55 GMT-0700 (PDT)
 * @copyright None
 * @last-modified Sat Jul 15 2017 17:13:43 GMT-0700 (PDT)
 */

/**
 * Returns the module object you need at the moment
 * 
 * @param {string} moduleName the name of the module you need to import
 * 
 * @returns the module object
 */
function require(moduleName) {

  if (moduleName in chrome) {

    return chrome[moduleName];
  } else {

    console.log("Module not found");
  }
}

$.noConflict();

jQuery("document").ready(function () {

  const BookmarkCrawler = require("bookmarkcrawler");

  BookmarkCrawler.init();

  jQuery("#searchBox").unbind("change").bind("change", function (event) {

    event.preventDefault();

    let searchterm = jQuery(event.target).val();

    const displayTarget = "searchResultsDiv";

    BookmarkCrawler.search(searchterm, displayTarget);
  });
});