var random = require('./random');


var date = {

    past: function (years, refDate) {
        var date = (refDate) ? new Date(Date.parse(refDate)) : new Date();

        var past = date.getTime();
        past -= random.number(years) * 365 * 3600 * 1000; // some time from now to N years ago, in milliseconds
        date.setTime(past)

        return date;
    },

    future: function (years, refDate) {
        var date = (refDate) ? new Date(Date.parse(refDate)) : new Date();
        var future = date.getTime();
        future += random.number(years) * 365 * 3600 * 1000; // some time from now to N years later, in milliseconds
        date.setTime(future)

        return date;
    },
    
    between: function(from, to) {
        var fromMilli = Date.parse(from);
        var dateOffset = random.number(Date.parse(to) - fromMilli);
        
        var newDate = new Date(fromMilli + dateOffset);
        
        return newDate;
    },

    recent: function (days) {
        var date = new Date();
        var future = date.getTime();
        future -= random.number(days) * 3600 * 1000; // some time from now to N days ago, in milliseconds
        date.setTime(future)

        return date;
    }
};
module.exports = date;