function formatPrice(price) {
    const priceString = String(price)
    const formattedPrice = priceString.substring(0, priceString.length - 2) + "." + priceString.substring(priceString.length - 2)
    return formattedPrice
}

module.exports = {
    formatPrice
}