export function formatDate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`
}

export function formatCalenderDate(date) {
    const day = date.getDate()
    let suffix = 'th'
    if(day%10 === 1 && day !== 11) 
        {
            suffix = 'st'
        }
   else if(day%10 === 2 && day !== 12) 
        {
            suffix = 'nd'
        }
   else if(day%10 === 3 && day !== 13) 
        {
            suffix = 'rd'
        }
    else 
        {
            suffix = 'th'
        }
    return `${day}${suffix}`
}