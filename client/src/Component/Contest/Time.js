function getCalendarLink(data) {
    const normalizeDate = (date) => { return date.split('-').join('').split(':').join('').split('.').join(''); };
    
    const stime = normalizeDate(data.start);
    const etime = normalizeDate(data.end);

    let res = 'https://calendar.google.com/event?action=TEMPLATE';
    res += `&dates=${stime}/${etime}`;
    res += `&text=${encodeURIComponent(data.name)}`;
    res += `&location=${data.url}`;
    return res;
  }
function showTime(givenTime){
    const [date, time] = givenTime.split("T");
    return time;
}
function showDate(givenTime){
    const [date, time] = givenTime.split("T");
    return date;
}
export {getCalendarLink,showTime,showDate} ;