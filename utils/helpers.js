
// this is the function that 
// we are using the javascript Date methods to get 
// the date and format the month,date and year 
module.exports = {
    format_date: date => {
        return `${new Date(date).getDate()}/${new Date(date).getMonth() + 1}/${new Date(date).getFullYear()}`;
      },

}