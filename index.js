// Your code here


//time card and payroll application

//time in and time out

// returns employee record object
function createEmployeeRecord(infoArray) {
    let timesIn = [];
    let timesOut = [];

    const employeeRecordObj = {
        firstName: `${infoArray[0]}`,
        familyName: `${infoArray[1]}`,
        title: `${infoArray[2]}`,
        payPerHour: infoArray[3],
        timeInEvents: timesIn,
        timeOutEvents: timesOut
    }

    return employeeRecordObj;
}

// returns an array of employee record objects
function createEmployeeRecords(employeeRecordArray) {
    let bigBoiArray = [];

    for (const record of employeeRecordArray) {
        bigBoiArray.push(createEmployeeRecord(record))
    }

    return bigBoiArray;
}

//takes in the employee record object, updates with date of their time in
function createTimeInEvent(employeeRecordObj, dateStamp) {
    employeeRecordObj.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt((dateStamp.substring(11)), 10),
        date: dateStamp.substring(0, 10)
    }
    )

    return employeeRecordObj
}

// same as above, updates with date and hour of timeout
function createTimeOutEvent(employeeRecordObj, dateStamp) {
    employeeRecordObj.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt((dateStamp.substring(11)), 10),
        date: dateStamp.substring(0, 10)
    })

    return employeeRecordObj
}

// takes in an employee record object, as well as a date. Returns the total hours worked.
function hoursWorkedOnDate (employeeRecordObj, dateStamp) {
    const timeInHour = findMatchingTimeInHour(employeeRecordObj, dateStamp)
    const timeOutHour = findMatchingTimeOutHour(employeeRecordObj, dateStamp)
    return ((timeOutHour - timeInHour)/100)


}
            // Helper function for hoursWorkedOnDate
            function findMatchingTimeInHour(employeeRecordObj, dateStamp){
                for (const event of employeeRecordObj.timeInEvents) {
                    if (event.date === dateStamp) {
                        return event.hour;
                    }
                }
            }

            // Helper function for hoursWorkedOnDate
            function findMatchingTimeOutHour(employeeRecordObj, dateStamp) {
                for (const event of employeeRecordObj.timeOutEvents) {
                    if (event.date === dateStamp) {
                        return event.hour;
                    }
                }
            }

function wagesEarnedOnDate(employeeRecordObj, dateOnlyStamp) {
    let hours = hoursWorkedOnDate(employeeRecordObj, dateOnlyStamp);
    let wages = hours * employeeRecordObj.payPerHour
    return wages;
}

//returns the total of all wages for Biblo
function allWagesFor(employeeRecordObj) {
    //Create an array with all the dates worked.
    let datesWorked = []; 
    for (const event of employeeRecordObj.timeInEvents) {
        datesWorked.push(event.date)
    }
    
    //Using this dateArray, create an array of all the dates.
    let wageArray = []
    for (const date of datesWorked) {
        wageArray.push(wagesEarnedOnDate(employeeRecordObj, date))
    }
    
    //Then, add up the wages with the reduce method.
    const totalWages = wageArray.reduce((accumulator, wage) => accumulator + wage)
    return totalWages
}

// takes in array of employeeRecordObj's, returns tehe total wages owed to all employees, for all dates
function calculatePayroll(employeeRecordArray) {
    /*
    I think for each record, we can just call the allWagesFor function on that record.
        Populate each of those wages into an array
        reduce method for that array
    */

    let allWagesArray = [];
    for (const employee of employeeRecordArray) {
        let wagesOwedToEmployee = allWagesFor(employee);
        allWagesArray.push(wagesOwedToEmployee)
    }

    const totalOwed = allWagesArray.reduce((accumulator, wage) => accumulator + wage)
    return totalOwed

}


    



const bibloArray = ['Billy', 'Luck', 'Project Coordinator', 20];

const bibloEmploymentRecord = createEmployeeRecord(bibloArray); 
// console.log('biblo employment record: ', bibloEmploymentRecord)

let bibloUpdatedWithTimes = createTimeOutEvent(bibloEmploymentRecord, '2022-04-01 1200')
bibloUpdatedWithTimes = createTimeInEvent(bibloEmploymentRecord, '2022-04-01 0800' )
// console.log('biblo with times added: ', bibloUpdatedWithTimes)

bibloUpdatedWithTimes = createTimeOutEvent(bibloEmploymentRecord, '2022-04-04 1700')
bibloUpdatedWithTimes = createTimeInEvent(bibloEmploymentRecord, '2022-04-04 1300' )

bibloUpdatedWithTimes = createTimeOutEvent(bibloEmploymentRecord, '2022-04-09 0900')
bibloUpdatedWithTimes = createTimeInEvent(bibloEmploymentRecord, '2022-04-09 0300' )

console.log(bibloUpdatedWithTimes)
allWagesFor(bibloUpdatedWithTimes)


// hoursWorkedOnDate(bibloUpdatedWithTimes, '2022-04-01')
// wanna filter through timeout events to find the correct date
// will involve going through array, with an object in each element, and looking for the correct date. 
// Probably something with reduce here. 





const timeInFormat = "YYYY-MM-DD 1800"

const testArrayofArrays = [
    ['Billy', 'Luck', 'Project Coordinator', 20],
    ['Diego', 'Medua', 'Marketing shit', 50],
    ['Po', 'Tot', 'junior marketing shit', 21],
    ['J', 'mlf', 'mental health ting', 25],

]

const employeeRecords = createEmployeeRecords(testArrayofArrays)



