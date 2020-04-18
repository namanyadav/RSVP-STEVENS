var currentTab = 0; // Current tab is set to be the first tab (0)
if($('#new_event_form').length>0) {
    showTab(currentTab); // Display the current tab
}

function showTab(n) {
    // This function will display the specified tab of the form ...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    // ... and fix the Previous/Next buttons:
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
    // ... and run a function that displays the correct step indicator:
    fixStepIndicator(n)
    fixStepCountIndicator(n)
}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateNewEventForm()) return false;
    if (currentTab < x.length) {

    }

    let nextTab = currentTab + n;
    // if you have reached the end of the form... :
    if (nextTab >= x.length) {
        //...the form gets submitted:
        $("#new_event_form").find('#submit').click();
        //submitting the form programmatically, does not trigger the submit event in js
        // document.getElementById("new_event_form").submit();
        return false;
    } else {
        // Hide the current tab:
        x[currentTab].style.display = "none";
        // Otherwise, display the correct tab:
        showTab(nextTab);
        // Increase or decrease the current tab by 1:
        currentTab = nextTab;
    }

}

function validateForm(bypass) {
    // This function deals with validation of the form fields
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    if(!bypass) {
        // A loop that checks every input field in the current tab:
        for (i = 0; i < y.length; i++) {
            // If a field is empty...
            if (y[i].value == "") {
                // add an "invalid" class to the field:
                y[i].className += " invalid";
                // and set the current valid status to false:
                valid = false;
            }
        }
    }

    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        document.getElementsByClassName("w3-step")[currentTab].className += " finish";
    }
    return valid; // return the valid status
}

const fieldsInTab = {
    0   :   ['category', 'title', 'sDate', 'eDate'],
    1   :   ['capacity', 'country', 'state', 'stAddr'],
    2   :   ['pricing']
};
// fieldsInTab[0] = []
// fieldsInTab[1] = []
let new_event_form = '#new_event_form';
function validateField(fieldName) {
    $(new_event_form).form('validate field', fieldName)
}
function isFieldValid(fieldName) {
    return $(new_event_form).form('is valid', fieldName)
}
function validateFieldList(fieldList) {
    for (let i=0; i<fieldList.length; i++) {
        validateField(fieldList[i]);
    }
}
function areFieldsValid(fieldList) {
    // let valid = true;
    for (let i=0; i<fieldList.length; i++) {
        if(!isFieldValid(fieldList[i])) {
            return false;
        }
    }
    return true;
}
function validateForm() {
    $(new_event_form).form('validate form');
}
function validateNewEventForm() {
    let valid = areFieldsValid(fieldsInTab[currentTab]);
    validateFieldList(fieldsInTab[currentTab]);

    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        document.getElementsByClassName("w3-step")[currentTab].className += " finish";
    }
    return valid; // return the valid status
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("w3-step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class to the current step:
    x[n].className += " active";
}

function fixStepCountIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class to the current step:
    x[n].className += " active";
}