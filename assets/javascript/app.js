// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
// var firebaseConfig = {
//     apiKey: "AIzaSyDv10nx-GPJtURLfAE1s2TSwPHPAvZU8T0",
//     authDomain: "click-counter-e8f47.firebaseapp.com",
//     databaseURL: "https://click-counter-e8f47.firebaseio.com",
//     projectId: "click-counter-e8f47",
//     storageBucket: "click-counter-e8f47.appspot.com",
//     messagingSenderId: "192321113131",
//     appId: "1:192321113131:web:938a0871b99f2faf"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);

//   var database = firebase.database();

//   // 2. Button for adding Employees
//   $("#add-employee-btn").on("click", function(event) {
//     event.preventDefault();

//     // Grabs user input
//     var empName = $("#employee-name-input").val().trim();
//     var empRole = $("#role-input").val().trim();
//     var empStart = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");
//     var empRate = $("#rate-input").val().trim();

//     // Creates local "temporary" object for holding employee data
//     var newEmp = {
//       name: empName,
//       role: empRole,
//       start: empStart,
//       rate: empRate
//     };

//     // Uploads employee data to the database
//     database.ref().push(newEmp);

//     // Logs everything to console
//     console.log(newEmp.name);
//     console.log(newEmp.role);
//     // console.log(newEmp.start);
//     console.log(newEmp.rate);

//     alert("Employee successfully added");

//     // Clears all of the text-boxes
//     $("#employee-name-input").val("");
//     $("#role-input").val("");
//     $("#start-input").val("");
//     $("#rate-input").val("");
//   });

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
//   database.ref().on("child_added", function(childSnapshot) {
//     console.log(childSnapshot.val());

// Store everything into a variable.
// var empName = childSnapshot.val().name;
// var empRole = childSnapshot.val().role;
// var empStart = childSnapshot.val().start;
// var empRate = childSnapshot.val().rate;

// // Employee Info
// console.log(empName);
// console.log(empRole);
// console.log(empStart);
// console.log(empRate);

// Prettify the employee start
// var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");

// Calculate the months worked using hardcore math
// To calculate the months worked
// var empMonths = moment().diff(moment(empStart, "X"), "months");
// console.log(empMonths);

// Calculate the total billed rate
// var empBilled = empMonths * empRate;
// console.log(empBilled);

// Create the new row
//     var newRow = $("<tr>").append(
//       $("<td>").text(empName),
//       $("<td>").text(empRole),
//       $("<td>").text(empStartPretty),
//       $("<td>").text(empMonths),
//       $("<td>").text(empRate),
//       $("<td>").text(empBilled)
//     );

//     // Append the new row to the table
//     $("#employee-table > tbody").append(newRow);
//   });

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case

var firebaseConfig = {
    apiKey: "AIzaSyArqmAyBu8b5l85ktKn1MoCaWbh8gSjqOQ",
    authDomain: "exampleproject-93024.firebaseapp.com",
    databaseURL: "https://exampleproject-93024.firebaseio.com",
    projectId: "exampleproject-93024",
    storageBucket: "exampleproject-93024.appspot.com",
    messagingSenderId: "858890011209",
    appId: "1:858890011209:web:c912bacc1a5605ae"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Create a variable to reference the database.
var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
        event.preventDefault();
    
        // Grabs user input
        var trainName = $("#train-name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        //will need to do some sort of moment function here
        var firstTime = moment($("#first-time-input").val().trim(), "hh:mm").format("hh:mm a");
        var frequency = $("#frequency-input").val().trim();
    
        // Creates local "temporary" object for holding employee data
        var newTrain = {
          trainName: trainName, 
          destination: destination, 
          firstTime: firstTime, 
          frequency: frequency
        };
    
        // Uploads employee data to the database
        database.ref().push(newTrain);
    
        // Logs everything to console
        console.log(newTrain.trainName);
        console.log(newTrain.destination);
        console.log(newTrain.firstTime);
        console.log(newTrain.frequency);
    
        // alert("Employee successfully added");
    
        // Clears all of the text-boxes
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-time-input").val("");
        $("#frequency-input").val("");
      });

      database.ref().on("child_added", function(childSnapshot) {
            console.log(childSnapshot.val());
        
        //Store everything into a variable.
        var trainName = childSnapshot.val().trainName;
        var destination = childSnapshot.val().destination;
        var firstTime = childSnapshot.val().firstTime;
        var frequency = childSnapshot.val().frequency;
        
        // Employee Info
        console.log(trainName);
        console.log(destination);
        console.log(firstTime);
        console.log(frequency);


        
        //Prettify the employee start
        // var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");
        
        // //Calculate the months worked using hardcore math
        // //o calculate the months worked
        // var empMonths = moment().diff(moment(empStart, "X"), "months");
        // console.log(empMonths);
        
        // //Calculate the total billed rate
        // var empBilled = empMonths * empRate;
        // console.log(empBilled);
        
        //Create the new row
            var newRow = $("<tr>").append(
              $("<td>").text(trainName),
              $("<td>").text(destination),
              $("<td>").text(frequency),
              $("<td>").text(""),
              $("<td>").text(""),
            );
        
            // Append the new row to the table
            $("#employee-table > tbody").append(newRow);

            console.log("Current Time " + new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"}));
          });
        