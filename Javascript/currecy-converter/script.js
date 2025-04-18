const API_KEY = "b953b1d7f6b4160f8a7aa12b"

let fromCurrency = ""
let toCurrency = ""
let amount = 0
let result = ""

const formElem = document.getElementById('form')
const selectElems = document.querySelectorAll('select')
const amountElem = document.getElementById('amount')
const fromCurrencySelect = document.getElementById('fromCurrency')
const toCurrencySelect = document.getElementById('toCurrency')
const msgElem = document.getElementById('msg')
const errorElem = document.getElementById('error')

const fetchCurrencies = async () => {
    try {
        const res = await fetch("https://restcountries.com/v3.1/all?fields=name,currencies,flag");

        if (!res.ok) {
            throw new Error("Failed to fetch currency details")
        }

        const data = await res.json();

        const val = data.reduce((list, currency) => {

            const currencies = Object.entries(currency.currencies);

            const temp = currencies.map(curr => `${curr[0]} - ${[curr[1].name]}`)

            temp.forEach(each => list.push(`${currency.flag} ${each}`))
            return list;
        }, [])
        const sortedCurrencyList = [...val].sort((a, b) => {
            const [, codeA] = a.split(" ")
            const [, codeB] = b.split(" ");
            if (codeA < codeB) return -1
            else return 1
        })

        selectElems.forEach(sel => {
            sortedCurrencyList.forEach(cl => {
                const option = document.createElement('option')
                option.innerText = cl;
                const [, code] = cl.split(" ")
                option.dataset.id = code
                sel.appendChild(option)
            })

        })
    } catch (error) {
        console.error(error)
    }
}

fetchCurrencies()

const convertCurrency = async (amount, fromCode, toCode) => {
    try {
        const res = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCode}/${toCode}`)

        if (!res.ok) {
            throw new Error("Error while converting")
        }
        const data = await res.json();

        const { conversion_rate } = data;

        return (amount * conversion_rate).toFixed(2)
    } catch (error) {
        console.error(error)
    }
}

formElem.addEventListener('submit', async (e) => {
    e.preventDefault()


    const amount = +(amountElem.value);
    const [, fromCode] = fromCurrencySelect.value.split(' ')
    const [, toCode] = toCurrencySelect.value.split(' ')

    if (!amount || !fromCode || !toCode) {
        errorElem.innerText = "Please select all the values"
        return;
    }
    errorElem.innerText = ""

    const convertedAmount = await convertCurrency(amount, fromCode, toCode)

    msgElem.innerText = `${amount} ${fromCode} = ${convertedAmount} ${toCode}`
})