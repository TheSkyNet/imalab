var About = {
 md: 'Johnny Coder\n' +
 '============\n' +
 '\n' +
 '-------------------     ----------------------------\n' +
 '1 MyAddress                        email@example.com\n' +
 'MyTown 1000                          @twitter_handle\n' +
 'MyCountry                           1800 my-phone-nr\n' +
 '-------------------     ----------------------------\n' +
 '\n' +
 'Education\n' +
 '---------\n' +
 '\n' +
 '2010-2014 (expected)\n' +
 ':   **PhD, Computer Science**; Awesome University (MyTown)\n' +
 '\n' +
 '    *Thesis title: Deep Learning Approaches to the Self-Awesomeness\n' +
 '     Estimation Problem*\n' +
 '\n' +
 '2007-2010\n' +
 ':   **BSc, Computer Science and Electrical Engineering**; University of\n' +
 '    HomeTown (HomeTown)\n' +
 '\n' +
 '    *Minor: Awesomeology*\n' +
 '\n' +
 'Experience\n' +
 '----------\n' +
 '\n' +
 '**Your Most Recent Work Experience:**\n' +
 '\n' +
 'Short text containing the type of work done, results obtained,\n' +
 'lessons learned and other remarks. Can also include lists and\n' +
 'links:\n' +
 '\n' +
 '* First item\n' +
 '\n' +
 '* Item with [link](http://www.example.com). Links will work both in\n' +
 '  the html and pdf versions.\n' +
 '\n' +
 '**That Other Job You Had**\n' +
 '\n' +
 'Also with a short description.\n' +
 '\n' +
 'Technical Experience\n' +
 '--------------------\n' +
 '\n' +
 'My Cool Side Project\n' +
 ':   For items which don\'t have a clear time ordering, a definition\n' +
 '    list can be used to have named items.\n' +
 '\n' +
 '    * These items can also contain lists, but you need to mind the\n' +
 '      indentation levels in the markdown source.\n' +
 '    * Second item.\n' +
 '\n' +
 'Open Source\n' +
 ':   List open source contributions here, perhaps placing emphasis on\n' +
 '    the project names, for example the **Linux Kernel**, where you\n' +
 '    implemented multithreading over a long weekend, or **node.js**\n' +
 '    (with [link](http://nodejs.org)) which was actually totally\n' +
 '    your idea...\n' +
 '\n' +
 'Programming Languages\n' +
 ':   **first-lang:** Here, we have an itemization, where we only want\n' +
 '    to add descriptions to the first few items, but still want to\n' +
 '    mention some others together at the end. A format that works well\n' +
 '    here is a description list where the first few items have their\n' +
 '    first word emphasized, and the last item contains the final few\n' +
 '    emphasized terms. Notice the reasonably nice page break in the pdf\n' +
 '    version, which wouldn\'t happen if we generated the pdf via html.\n' +
 '\n' +
 ':   **second-lang:** Description of your experience with second-lang,\n' +
 '    perhaps again including a [link] [ref], this time placing the url\n' +
 '    reference elsewhere in the document to reduce clutter (see source\n' +
 '    file). \n' +
 '\n' +
 ':   **obscure-but-impressive-lang:** We both know this one\'s pushing\n' +
 '    it.\n' +
 '\n' +
 ':   Basic knowledge of **C**, **x86 assembly**, **forth**, **Common Lisp**\n' +
 '\n' +
 '[ref]: https://github.com/githubuser/superlongprojectname\n' +
 '\n' +
 'Extra Section, Call it Whatever You Want\n' +
 '----------------------------------------\n' +
 '\n' +
 '* Human Languages:\n' +
 '\n' +
 '     * English (native speaker)\n' +
 '     * ???\n' +
 '     * This is what a nested list looks like.\n' +
 '\n' +
 '* Random tidbit\n' +
 '\n' +
 '* Other sort of impressive-sounding thing you did',
  view: function () {
   var md = markdown.toHTML( this.md );

    return m("div" , {class:'container card '},[

      m( 'a', {class:'btn btn-info btn-download float-right'}, 'download my cv'),
      m('.card-block', m.trust(md)),
    ]);
  }
};
