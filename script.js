$(function(){
    var editArea = $('#edit-area');
    editArea.extend({
        setContent: function(title, content) {
            //editArea.data('title', title);
            editArea.attr('data-title', title);
            editArea.val(content);
        },
    });

    var noteList = $('#note-list');
    noteList.extend({
        appendItem: function(key, title) {
            noteList.append('<li><a href="#'+key+'" class="item">'+title+'</a></li>');
        },
        refresh: function() {
            // @todo
        }
    });

    var saveButton = $('#save');
    saveButton.click(function(e){
        //var key = editArea.data('title');
        var key = editArea.attr('data-title');
        if ( key.length > 0 ) {
            localStorage.setItem(key, editArea.val());
        }
        else {
            console.error('no key');
        }
    });

    // clicked list item
    $('#note-list li a.item').live('click', function(e){
        var key = $(this).attr('href').substr(1);
        if ( key.length > 0 ) {
            var content = localStorage.getItem(key);
            editArea.setContent(key, content);
        }
        return false;
    });

    $('#addnote').click(function(e){
        var noteName = window.prompt('New note');
        if ( noteName && noteName.length > 0 ) {
            var content = localStorage.getItem(noteName);
            editArea.setContent(noteName, content);
        }
    });

    $(document).ready(function(){
        for ( var key in localStorage ) {
            noteList.appendItem(key, key);
        }
    });
});
