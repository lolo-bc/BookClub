$(() =>{

$(".button").click(function() {
  var val = $(this).attr('id');
  if (val == 1) {
      $(".mobileNav").hide();
      $(this).attr('id', '0');
  } else {
      $(".mobileNav").show();
      $(this).attr('id', '1');
  }

});

//Mouse click on setting button and ul list
$(".mobileNav, .button").mouseup(function() {
  return false;
});

//Document Click
$(document).mouseup(function() {
  $(".mobileNav").hide();
  $(".button").attr('id', '0');
});


//submit button
$("#addClub").on("click", (event) => {
  event.preventDefault();
  let newClub = {
    clubName: $("#clubName").val().trim(),
    userName: $("#userName").val().trim(),
    description: $("#description").val().trim()};
  
    // Send the POST request.
    $.ajax("/api/clubs", {
      type: "POST",
      data: newClub
    }).then(
      () => {
      
        // Reload the page to get the updated list
        location.reload();
      });
  });

//delete club - not using
$(".delete-club").on("click", function(event) {
  var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/clubs/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted club", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

 
});
