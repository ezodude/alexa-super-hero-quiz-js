/* eslint semi: ["error", "always"] */

'use strict';

console.log('Starting Quiz Lambda');

var Alexa = require('alexa-sdk');
var shuffle = require('lodash.shuffle');

console.log('require dependencies');

var QuizQuestions = require('./QuizQuestions');
var NUMBER_OF_QUESTIONS = QuizQuestions.length;
console.log('NUMBER_OF_QUESTIONS', NUMBER_OF_QUESTIONS);

var handlers = {
  'NewSession': function () {
    // Get Questions in Random Order
    var questionData = shuffle(QuizQuestions);

    // Store Question Data and Current Question Number in Session Attributes:
    this.attributes['QuestionData'] = questionData;
    this.attributes['CurrentQuestionNumber'] = 1;

    // Get First Question as String:
    var firstQuestionString = questionData[0].question;
    var askText = `So, you think you're the ultimate super hero fan? To put you to the test - try getting ${NUMBER_OF_QUESTIONS} quiz questions right in a row! I don't think you have a chance... Ready - here we go! Question 1: ${firstQuestionString}`;
    this.emit(':ask', askText, firstQuestionString);
  }
};

exports.handler = function (event, context, callback) {
  console.log('Starting Handler');

  var alexa = Alexa.handler(event, context);
  console.log('Initialising Alexa');

  alexa.registerHandlers(handlers);
  console.log('Registered Alexa handlers');

  alexa.execute();
  console.log('Executed Alexa handlers');
};
