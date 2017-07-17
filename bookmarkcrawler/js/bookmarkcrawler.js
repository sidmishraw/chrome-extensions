/**
 * bookmarkcrawler.js
 *
 * @author sidmishraw < sidharth.mishra@sjsu.edu >
 * @description Bookmark crawler logic goes here
 * @created Sat Jul 15 2017 17:41:36 GMT-0700 (PDT)
 * @copyright None
 * @last-modified Sat Jul 15 2017 17:41:36 GMT-0700 (PDT)
 */

/**
 * `bookmarkcrawler` is the object that needs to be imported for extending this feature.
 * This works as a namespace to encapsulate the logic.
 */
(function (bookmarkcrawler) {
  "use strict";

  /**
   * Initializer function that takes care of all setup tasks
   */
  bookmarkcrawler.init = function () {
    console.log("Bookmarkscrawler is Online!");
  }

  /**
   * Searches for the term entered in the bookmarks of the chrome browser, if not found
   * asks google for it.
   * 
   * @param {string} searchterm the search term being searched by the user
   * @param {string} displayTarget the name of the element to display the results at
   */
  bookmarkcrawler.search = function (searchterm, displayTarget) {

    chrome.bookmarks.search(searchterm, (results) => {

      if (results && results.length > 0) {

        renderSearchResults(results, displayTarget);
      } else {
        queryGoogle(searchterm);
      }
    });
  }

  /**
   * Queries google and opens the page in a new tab or window depending on the user preferences
   * 
   * @param {string} searchterm the term being searched
   */
  function queryGoogle(searchterm) {

    let googleQueryString = `https://www.google.com/#q=${searchterm}`;
    window.open(googleQueryString);
  }

  /**
   * Renders the search results at the location specified by the target
   * 
   * @param {Array<BookmarkTreeNode>} results the search results obtained from the bookmarks
   * @param {string} displayTarget the name of the `div` to display the results in.
   */
  function renderSearchResults(results, displayTarget) {

    jQuery("body").addClass("bcbody");

    let urlMapping = new Map();
    let renderString = `<ul id="results">`;

    /**
     * Sample object structure of the result - BookmarkTreeNode
     * {
     *    "dateAdded":1484273767363,
     *    "id":"964",
     *    "index":226,
     *    "parentId":"30",
     *    "title":"abc — Abstract Base Classes — PyMOTW 3",
     *    "url":"https://pymotw.com/3/abc/"
     * }
     */
    jQuery(results).each((index, result) => {

      if (result && result["url"]) {

        let titleString = result["title"].replace(/[<>]/g, "&<>;");

        urlMapping.set(titleString, result["url"]);

        renderString += `<li><a id="${titleString}" href="#">${titleString}</a></li>`
      }
    });

    renderString += "</ul>"

    jQuery(`#${displayTarget}`).html(renderString);

    jQuery("#results>li>a").each((index, element) => {

      jQuery(element).unbind("click").bind("click", (event) => {

        event.preventDefault();

        let URL = urlMapping.get(jQuery(element).attr("id"));

        window.open(URL);
      });
    });
  }
}(chrome.bookmarkcrawler = {}));