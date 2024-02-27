const formateDate = (number) => number < 10 ? `0${number}` : number;

const _getYear = (date) => date.getFullYear();
const _getMonth = (date) => date.getMonth() + 1;
const _getDay = (date) => date.getDate();
const _getQuarter = (date) => {
    switch (_getMonth(date)) {
        case 1:
        case 2:
        case 3:
            return 'Q1';
        case 4:
        case 5:
        case 6:
            return 'Q2';
        case 7:
        case 8:
        case 9:
            return 'Q3';
        case 10:
        case 11:
        case 12:
            return 'Q4';
        default:
            return '';
    }
};

function getPeriod(dateFrom, days) {
    let nextDate = dateFrom;
    let period = [];
    for (let i = 0; i < days; i++) {
        period.push(`[Период.time].[${_getYear(nextDate)}].[${_getYear(nextDate)}.${_getQuarter(nextDate)}].[${_getYear(nextDate)}.${formateDate(_getMonth(nextDate))}].[${_getYear(nextDate)}.${formateDate(_getMonth(nextDate))}.${formateDate(_getDay(nextDate))}]`)
        nextDate = new Date(nextDate.getTime() + 86400000);
        nextDate.toLocaleDateString();
    }
    return period.join(', ');
}

function getUserList(users) {
    users = users.split(' ');
    const usersCount = users.length;
    const userList = [];
    for (let i = 0; i < usersCount; i++) {
        userList.push(`[userid].[${users[i]}]`);
    }
    //
    return userList.join(', ');
}

export function getQuery(dateFrom, days, users) {
    return `WITH
SET [~FILTER] AS
    {${getPeriod(dateFrom, days)}}
SET [~ROWS_partner_id_partner_id] AS
    {[partner_id].[30212]}
SET [~ROWS_userid_userid] AS
    {${getUserList(users)}}
SET [~ROWS_account group_account group.account_group] AS
    {[account group.account_group].[account group].Members}
SET [~ROWS_account_status_account_status] AS
    {[account_status].[account_status].Members}
SELECT
NON EMPTY {[Measures].[sum_in]} ON COLUMNS,
NON EMPTY NonEmptyCrossJoin([~ROWS_partner_id_partner_id], NonEmptyCrossJoin([~ROWS_userid_userid], NonEmptyCrossJoin([~ROWS_account group_account group.account_group], [~ROWS_account_status_account_status]))) ON ROWS
FROM [SB&Casino&Depositst]
WHERE [~FILTER]`
}