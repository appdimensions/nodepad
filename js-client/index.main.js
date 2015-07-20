var theEl, theEl2;
$(function(){
    var timer;
    $('textarea').on("keyup", function(){
        theEl = this;
        clearTimeout(timer);
        timer = setTimeout(updateDB, 3000);
        $(theEl).prev().prev().html(dateFormat(new Date(), "h:MMTT (mmm. d)"));
    });
    $('textarea').on("change", function(){
        theEl = this;
        clearTimeout(timer);
        updateDB();
    });
    $('.delete a').click(deleteNote);
    $('#newNoteBtn').click(newNote);
    $('.entry textarea').filter('[data-id="0"]').prop("disabled", true);
});

function newNote(){
    $('#newNoteBtn').html('...');
    $.post("/newnote", function(data){
        $('#newNoteBtn').html('+');
        if(data != "error" && data !== ""){
            var newRow = $('.entry').filter(':first').clone(true, true);
            newRow.find('.date').html(dateFormat(new Date(), "h:MMTT (mmm. d)"));
            newRow.find('textarea').attr("data-id", String(data));
            newRow.find('textarea').prop("disabled", false);
            newRow.find('textarea').val("This is a new note. You should start writing!");
            newRow.css("display", "none");
            newRow.insertBefore('.entry:first').fadeIn();
            $('.entry textarea').filter('[data-id="0"]').parents('.entry:first').fadeOut(function(){
                $('.entry textarea').filter('[data-id="0"]').parents('.entry:first').remove();
            });
        }else{
            alert("Great, could not create a new note.");
        }
    });
}

function updateDB(){
    if($(theEl).attr("data-id") != "0"){
        $("#savingMsg").fadeIn();
        $.post("/update", {id: $(theEl).attr("data-id"), content: $(theEl).val()}, function(data){
            if(data == "good"){
                $("#savingMsg").fadeOut();
            }else{
                $('#savingMsg').html('Error saving. <a href="javascript:window.location.reload();">Refresh</a>.');
            }
        });
    }
}

function deleteNote(e){
    e.preventDefault();
    theEl2 = this;
    if($(theEl2).parent().next().attr("data-id") != "0"){
        $.post("/delete", {id: $(theEl2).parent().next().attr("data-id")}, function(data){
            if(data == "good"){
                if($('.entry').length > 1){
                    $(theEl2).parents('.entry:first').fadeOut(function(){
                        $(theEl2).parents('.entry:first').remove();
                    });
                }else{
                    $(theEl2).parents('.entry:first').find('.date').html("Right now:");
                    $(theEl2).parents('.entry:first').find('textarea').attr("data-id", "0");
                    $(theEl2).parents('.entry:first').find('textarea').attr("disabled", true);
                    $(theEl2).parents('.entry:first').find('textarea').val("It's time to create a new note!");
                }
            }else{
                alert("Great, could not delete.");
            }
        });
    }
}