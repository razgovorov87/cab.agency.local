export default function dateFilter(value, format = 'date') {
    const options = {}

    if ( format.includes('monthDay') ) {
        options.month = 'short'
        options.day = '2-digit'
    }

    return Intl.DateTimeFormat('ru-RU', options).format(new Date(value))
}