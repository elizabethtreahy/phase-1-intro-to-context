// Your code here
function createEmployeeRecord(row) {
  return {
    firstName: row[0],
    familyName: row[1],
    title: row[2],
    payPerHour: row[3],
    timeInEvents: [],
    timeOutEvents: [],
  }
}

function createEmployeeRecords(employeeRecords) {
  return employeeRecords.map(employee => {
    return createEmployeeRecord(employee)
  })
}

function createTimeInEvent(employee, dateStamp) { 
  let [date, hour] = dateStamp.split(" ")
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  })
  return employee
}

function createTimeOutEvent(employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ")
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  })
  return employee
}
function hoursWorkedOnDate(employee, dateStamp) {
  let inEvent = employee.timeInEvents.find(function(e) {
    return e.date === dateStamp
  })
  let outEvent = employee.timeOutEvents.find(function(e) {
    return e.date === dateStamp
  })
  return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(employee, dateStamp) {
  return hoursWorkedOnDate(employee, dateStamp) * employee.payPerHour
}

function allWagesFor(employee) {
  let workDates = employee.timeInEvents.map(function(e) {
    return e.date
  })
  let pay = workDates.reduce(function(memo, d) {
    return memo + wagesEarnedOnDate(employee, d)
  }, 0)
  return pay
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

function calculatePayroll(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}
