
document.getElementById("default").click();

function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;    
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }   
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }   
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

/*
Date Countdown Widget for JavaScript
Copyright (c) 2010 idealmachine.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/


function startCountdown(dates, elem, format) {
    var now = new Date(), index = 0, targetDate;
    
    // Returns the next date a specific month/day combination occurs.
    function nextDateOccurs(arr) {
        var monthNotYet = now.getMonth() < arr[0] - 1,
            dayNotYet = now.getMonth() == arr[0] - 1 && now.getDate() < arr[1];
      
        if(monthNotYet || dayNotYet) {
            // Date will pass within this calendar year
            return new Date(now.getFullYear(), arr[0] - 1, arr[1]);
        } else {
            // Date has already passed within this calendar year
            return new Date(now.getFullYear() + 1, arr[0] - 1, arr[1]);
        }
    }
    
    // Returns the numeric argument followed by the singular
    // or plural name of the item as is correct (and then
    // a space character).
    function formatQuantity(num, singular, plural) {
        return num + " " + (num == 1 ? singular : plural) + " ";
    }

    // Pick the target date that is closest.
    for(var j = 0; j < dates.length; ++j) {
        if(nextDateOccurs(dates[j]) < nextDateOccurs(dates[index])) {
            index = j;
        }
    }
    
    // Make a Date object for the target date.
    targetDate = nextDateOccurs(dates[index]);
    
    
    // Update the countdown every second.
    function updateCountdown() {
        var months = 0, millis, advNow, advNow1, words = "";
    
        // Update now with the current date and time.
        advNow1 = now = new Date();
    
        // Has the target date already passed?
        if(now >= targetDate) {
            millis = 0;
        } else {
            // Find the last time that is a whole number of months past now
            // but less than one month before the target date.
            while(advNow1 < targetDate) {
                ++months;
                advNow = advNow1;
                advNow1 = new Date(now);
                advNow1.setMonth(now.getMonth() + months);
            }
            --months;
            
            // Find the time difference in milliseconds within the month.
            millis = targetDate - advNow;
        }
        
        // Turn that into months, days, hours, minutes, and seconds.
        words += formatQuantity(months, "month", "months");
        words += formatQuantity(Math.floor(millis / 864e5), "day", "days");
        words += formatQuantity(Math.floor(millis % 864e5 / 36e5), "hour", "hours");
        words += formatQuantity(Math.floor(millis % 36e5 / 6e4), "minute", "minutes");
        
        // Update the element.
        elem.innerHTML = format
            .replace(/%NAME%/g, dates[index][2])
            .replace(/%WORDS%/g, words);
        
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function countdownSettings() {
    startCountdown([
            // Change the dates here to customize the script.
            [1, 18, "Tiana"],
            [1, 22, "Brittany"],
            [1, 29, "Valentina"],
            [2, 27, "Zoe"],
            [3, 7, "Stella"],
            [3, 11, "Sophia"],
            [3, 19, "Shyra"],
            [3, 21, "Mathew"],
            [3, 29, "Daniel"],
            [4, 9, "Samia"],
            [4, 24, "Massimo"],
            [4, 25, "Devon"],
            [5, 9, "Gabrielle"],
            [5, 14, "Luke"],
            [5, 26, "Livia"],
            [5, 27, "Sheila"],
            [6, 15, "Luca"],
            [6, 24, "Siyuan"],
            [6, 26, "Tuphi"],
            [7, 7, "Barry and Kurt"],
            [7, 12, "Samia"],
            [7, 18, "Peter O"],
            [7, 26, "Remi"],
            [8, 10, "Myriam"],
            [8, 14, "Antonio"],
            [8, 19, "William"],
            [8, 24, "Victoria"],
            [9, 5, "Nai"],
            [9, 19, "James and Serena"],
            [10, 4, "Laith"],
            [10, 12, "Rachelle"],
            [10, 18, "Rafael"],
            [10, 19, "Callia"],
            [11, 3, "Fernanda"],
            [11, 20, "Melina"],
            [11, 30, "Julia"],
            [12, 1, "Arianna"],
            [12, 10, "Kamal"],
            [12, 16, "Sara"],
            [12, 20, "Massimo"],
            [12, 23, "Giuliano"],
            
        ],
        /* Element to update */ document.getElementById("countdown"),
        /* Format of HTML inserted */ "The next birthday is %NAME%'s in %WORDS%"
    );
}

// Run the script only after the page has fully loaded
// to ensure that elements are accessible from the DOM.
if(window.addEventListener) {
    window.addEventListener("load", countdownSettings, false);
} else {
    window.attachEvent("onload", countdownSettings);
}