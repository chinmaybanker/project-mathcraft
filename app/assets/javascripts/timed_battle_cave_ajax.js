var wrong_answer_counter = 0;
var streak_counter = 0;

$(document).ready(function() {
    gon.cave_round_over = false;
    gon.cave_user_wrong_answer = false;
    gon.cave_user_right_answer = false;

    updateAnswerBox_withUserInput();
    clearText_fromAnswerBox();
    captureUserData_and_manipulateAnimation();

    $(".calculator_wrapper").css("background-image", "url('images/backgrounds/cave.png')");
});

var updateAnswerBox_withUserInput = function() {
  $(".calculator").on("click", function(e) {
    e.preventDefault();

    if (gon.cave_round_over == false) {
      var $number = $(this)[0].innerText;
      $(".answer_area").append($number);
    }
  });
}

var clearText_fromAnswerBox = function() {
  $(".calculator-cancel").on("click", function(e) {
    e.preventDefault();
    $(".answer_area")[0].innerText = "";
  });
}

var captureUserData_and_manipulateAnimation = function() {
  $(".calculator-submit").on("click", function(e) {
    e.preventDefault();

    if (gon.cave_round_over == false) {
      var $user_input = $(".answer_area")[0].innerText;

      if ($user_input == gon.answer) {
        gon.cave_user_right_answer = true;
        updateQuestionsviaAJAX();
        streak_counter += 1;

        if (streak_counter >= 2) {
          $(".streak_btn").html("<div id=\"streak_counter\" class=\"streak_counter\"><div>" + streak_counter + "</div><span>combo</span></div>");
        }
      }
      else {
        $(".streak_counter").remove();
        streak_counter = 0;

        gon.cave_user_wrong_answer = true;
      }
    }
  })
}

var updateQuestionsviaAJAX = function() {
  $.ajax({
    url: "/cave",
    method: 'GET'
  })
  .done(function(response) {
    $(".question_area").html(response.question);
    $(".answer_area")[0].innerText = "";
    gon.answer = response.answer;
  })
  .fail(function(response) {
    console.log("something went wrong!", response);
  });
}