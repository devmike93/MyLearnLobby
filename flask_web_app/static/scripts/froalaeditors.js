// Task Overview Editors

// Add Task Description text editor
var editor = new FroalaEditor('#descfroala', {
    toolbarButtons: {
      'moreText': {
        'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'insertLink']
        },
    },

    //
    
    //https://froala.com/wysiwyg-editor/docs/concepts/save/button/

    // Set the save param.
    saveParam: 'content',
    // Set the save URL.
    saveURL: 'http://example.com/save',
    // HTTP request type.
    saveMethod: 'POST',
    // Additional save params.
    saveParams: {id: 'my_editor'},
    events: {
      'save.before': function () {
        // Before save request is made.
      },
      'save.after': function () {
        // After successfully save request.
      },
      'save.error': function () {
        // Do something here.
      }
    }
  },
);

//Add Task Resource text editor 
var editor = new FroalaEditor('#resfroala', {
    toolbarButtons: {
    'moreText': {
    'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'insertLink']
    },
    }
});

//Add Task Note text editor
var editor = new FroalaEditor('#notesfroala', {
    toolbarButtons: {
    'moreText': {
      'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'specialCharacters', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting', 'insertImage', 'emoticons']
    },
    'moreParagraph': {
      'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote']
    },
    'moreMisc': {
      'buttons': ['undo', 'redo', 'fullscreen', 'spellChecker', 'selectAll'],
      'align': 'right',
      'buttonsVisible': 2
    }
  }
});

//submit data when save button is clicked
const buttons = ['#submitDesc', '#submitRes', '#submitNotes'];

buttons.forEach(selector => {
  document.querySelector(selector).addEventListener("click", 
  //function to POST froala content to server goes here
  function () {
    editor.save.save();
})
});


// //dashboard js events
// const dashHamburgerBtn = document.querySelector(".dashhamburger-btn");
// const dashMenu = document.querySelector(".navbar .links");
// const hideMenuBtn = dashMenu.querySelector(".close-btn");

// // Show mobile menu
// dashHamburgerBtn.addEventListener("click", () => {
//   dashMenu.classList.toggle("show-menu");
// });

// // Hide mobile menu
// hideMenuBtn.addEventListener("click", () =>  dashHamburgerBtn.click());

