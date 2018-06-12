/***************
@param
  Date: Date.now()
 return '2018-3-29 周五'
********************/
export function formatDate(locale) {
    const Monday = locale === 'zh'?'周一':'Mon',
          Tuesday = locale === 'zh'?'周二':'Tue',
          Wednesday  = locale === 'zh'?'周三':'Wed',
          Thursday = locale === 'zh'?'周四': 'Thu',
          Friday = locale === 'zh'?'周五':'Fri',
          Saturday = locale === 'zh'? '周六':'Sat',
          Sunday = locale === 'zh'?'周日':'Sun';

    let date = new Date(Date.now());
    let nowDate = {};
    nowDate.year = date.getFullYear();
    nowDate.month = (date.getMonth()+1) < 10 ? '0' + (date.getMonth() + 1): date.getMonth()+1;
    nowDate.day = date.getDate() < 10 ? '0' + date.getDate(): date.getDate();
    let resultWeekday= '';
     switch (date.getDay()) {
        case 1:
            resultWeekday = Monday;
            break;
        case 2:
            resultWeekday = Tuesday;
            break;
        case 3:
            resultWeekday = Wednesday;
            break;
        case 4:
            resultWeekday = Thursday;
            break;
        case 5:
            resultWeekday = Friday;
            break;
        case 6:
            resultWeekday = Saturday;
            break;
        case 7:
            resultWeekday = Sunday;
            break;
    }
    nowDate.weekdays = resultWeekday;
    return nowDate.year + '-' + nowDate.month + '-' + nowDate.day + ' ' + nowDate.weekdays;
}