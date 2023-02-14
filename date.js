// jshint esversion:6

exports.getDate = function(){
    let today = new Date();
    
    // to give the data types
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    
    // to convert to the language format
    let day = today.toLocaleDateString("en-US",options);
    return day;
}

exports.getDay = function(){
    let today = new Date();
    
    // to give the data types
    const options = {
        weekday: "long",
    };
    
    // to convert to the language format
    let day = today.toLocaleDateString("en-US",options);
    return day;
}
