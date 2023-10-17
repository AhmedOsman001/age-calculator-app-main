const day = document.querySelector("#day")
const month = document.querySelector("#month")
const year = document.querySelector("#year")
const day_out = document.querySelector("#result3")
const month_out = document.querySelector("#result2")
const year_out = document.querySelector("#result1")
const submit = document.querySelector("button")

$(".error").hide()

let ListofDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

//handles input to only numbers
function handleInput(input) {
    input.value = input.value.replace(/[^0-9]/g, '');
}

function calcAge (inputDate) {
    const today = new Date();
    const input = new Date(inputDate)
    
    let curr_date = today.getDate()
    let curr_month = today.getMonth()+1
    let curr_year = today.getFullYear()

    //if the day input is greater than current day 
    //dont count this month and add the number of days in that month 
    //to current day as to subtract the date and get the remaining days
    if (input.getDate() > curr_date) {
        curr_month -= 1
        curr_date = curr_date + ListofDays[month.value-1]
    }

    //if the input month is greater than current 
    //dont count this year and add 12 to month 
    //to get the difference
    if (month.value > curr_month ) {
        curr_year-- 
        curr_month += 12 
        console.log("hello")
    }

    //calculate year,month,date
    const years = curr_year - input.getFullYear()
    const months = curr_month - month.value
    const days = curr_date - input.getDate()

    //store the output of calculation in object  
    const age = {
        years : years,
        months: months,
        days:days
    }
    return age 
}


//validate day input
let dayError = true
function validDay () {

    //default 
    $("#day-err-1").hide()
    $("#day-err-2").hide()
    $("#empty-day").hide()

    //if day exceeds 31 show error message 
    if(day.value > 31){ 
        $("#day-err-1").show()
        dayError = true
    }
    //if day is greater than the days in specified month
    //show error message
    else if (day.value > ListofDays[month.value-1]){
        $("#day-err-2").show()
        dayError = true

    }

    //if empty 
    else if (day.value == ''){
        $("#empty-day").show()
        dayError = true
    }
    else {
        dayError = false
    }

}


//validate month input 
let monthError = true
function validMonth(){
    //default
    $("#month-err").hide()
    $("#empty-month").hide()
    //if month greater than 12 show error message 
    if(month.value > 12){
        $("#month-err").show()
        monthError = true

    }
    //if empty
    else if(month.value == ''){
        $("#empty-month").show()
        monthError = true

    }
    else { 

        monthError= false
    }
}


//validate year input 
let yearError = true
function validYear() {
    //default
    $("#year-err").hide()
    $("#empty-year").hide()

    //get current year
    const date = new Date()
    //if the input of year is in the future 
    //show error message 
    if(year.value > date.getFullYear()){
        $("#year-err").show()
        yearError = true
    
    }
    //if empty
    else if (year.value == ''){
        $("#empty-year").show()
        yearError = true
    }
    else{ 
        yearError = false
    }
}

//count up animation 
function countUp(target, start, end, duration) {
    let current = start;
    const element = target;
    const range = end - start;
    const increment = range / duration;
    const interval = setInterval(updateCounter, Math.abs(Math.floor(duration / range)));

    //updating the counter till the end value 
    function updateCounter() {
        element.textContent = Math.floor(current);
        if (current < end) {
            current += increment;
        } else {
            clearInterval(interval);
        }
    }
}


$(submit).on("click",function() {
    
    const inputDate = new Date(year.value,month.value,day.value)
    const age = calcAge(inputDate)
    
    validDay();
    validMonth();
    validYear();

    //default 
    $("#day, #month, #year").removeClass("red-border");
    $("#lbl-day, #lbl-month, #lbl-year").removeClass("red-alert");

    //validate if an input validate fucntion returns true 
    if (dayError == true || monthError== true || yearError == true)
    {
        if (dayError == true) {
            $("#day").addClass("red-border")
            $("#lbl-day").addClass("red-alert")
        }
            
        if (monthError == true){
            $("#month").addClass("red-border")
            $("#lbl-month").addClass("red-alert")
        }
        if (yearError==true){
            $("#year").addClass("red-border")
            $("#lbl-year").addClass("red-alert")        

        }
    }
    //if false then return the result of the calculated values
    //and do the countup animation
    else { 
        countUp(day_out, 0, age.days, 50);
        countUp(month_out, 0, age.months, 60);
        countUp(year_out, 0, age.years, 90);

    }
    
  
})



