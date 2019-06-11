//Firebase Setup
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

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTime = moment($("#first-time-input").val().trim(), "hh:mm")._i;
    var frequency = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        trainName: trainName,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency
    };

    database.ref().push(newTrain);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");
});

//called every time train is added or page is updated
database.ref().on("child_added", function (childSnapshot) {

    //Store everything into a variable.
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTime = childSnapshot.val().firstTime;
    var frequency = childSnapshot.val().frequency;

    var currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric" });
    var formattedCurrentTime = moment(currentTime, "hh:mm");
    var currentMinutes = convertTimeToMins(formattedCurrentTime);
    var startMinutes = convertTimeToMins(moment(firstTime, "hh:mm"));
    var minsToNextTrain = findMinsToNextTrain(currentMinutes, startMinutes, parseInt(frequency));
    var nextTrainTime = (moment(formattedCurrentTime.add(minsToNextTrain, 'minutes')).format("hh:mm a")).toUpperCase();

    //Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextTrainTime),
        $("<td>").text(minsToNextTrain),
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});

//helper function to calculate use input parameters to calculate minutes to next train
function findMinsToNextTrain(currentTime, startTime, frequency) {
    var temp = startTime;
    while ((temp + frequency) <= currentTime) {
        console.log("This ran");
        temp += frequency;
    }
    temp+=frequency;
    return temp - currentTime;
}

//helper function to convert time to minutes
function convertTimeToMins(currentTime) {
    var hours = currentTime.hours();
    var minutes = currentTime.minutes();
    return ((hours * 60) + minutes);
}
