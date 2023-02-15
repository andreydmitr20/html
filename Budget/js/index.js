const projName = () => 'Budget'

// get month data
const getMonthData = month => {
  let data = localStorage.getItem(projName() + month)
  if (data === null) return {}
  else return JSON.parse(data)
}

// save data
const saveMonthData = (month, data) => {
  localStorage.setItem(projName() + month, JSON.stringify(data))
}

// add data to month data
const addMonthData = (month, newData) => {
  const data = getMonthData(month)
  let time = new Date().getTime()
  while (data[time]) time++
  data[time] = newData
  saveMonthData(month, data)
}

// del data from month data
const delMonthData = (month, index) => {
  const data = getMonthData(month)
  console.log(index)
  console.log(data)
  delete data[index]
  console.log(data)
  saveMonthData(month, data)
}

// budget sum
const monthSelect = document.querySelector('.available-budget select')
const budgetSum = document.querySelector('.budget-summary .budget-sum')
const budgetSumIncome = document.querySelector(
  '.budget-summary .div-income div:last-child'
)
const budgetSumExpences = document.querySelector(
  '.budget-summary .div-expences div:last-child'
)

// add value
const formBudgetSign = document.querySelector('.form-budget select')
const formBudgetDesc = document.querySelector('.form-budget input[type="text"]')
const formBudgetValue = document.querySelector(
  '.form-budget input[type="number"]'
)
const formBudgetAdd = document.querySelector(
  '.form-budget button[type="submit"]'
)

// lists
const incomeList = document.querySelector('#income-list')
const expencesList = document.querySelector('#expences-list')
const liHtml = (text, value) =>
  `<span>${text[0].toUpperCase() + text.slice(1)}</span>
          <span>${value.toFixed(2)}</span>
          <div></div>
          <div>X</div>
    `
// click on li
const liClick = event => {
  //   console.log(event)
  if (event.target.innerText === 'X') {
    // console.log('X')
    const li = event.target.parentNode
    // console.log(li.dataset.id)
    // console.dir(li.querySelector('span:first-child'))
    let sure = confirm(`Are you sure you want to delete 
    ${li.querySelector('span:first-child').innerText}`)
    if (sure) {
      // delete
      delMonthData(+monthSelect.value, li.dataset.id)
      refreshUI()
    }
  }
}
// iterator by dataset
const iteratorData = function* () {
  const data = getMonthData(+monthSelect.value)
  for (const key in data) yield { key: key, data: data[key] }
}

// refresh data
const refreshUI = () => {
  let incomeSum = 0
  let expencesSum = 0

  const it = iteratorData()
  expencesList.innerHTML = ''
  incomeList.innerHTML = ''
  while ((item = it.next()) && !item.done) {
    // console.log(item.value)
    let value = +item.value.data.value
    const li = document.createElement('li')
    li.setAttribute('data-id', item.value.key)
    li.innerHTML += liHtml(item.value.data.desc, value)
    li.addEventListener('click', liClick)
    if (value < 0) {
      expencesSum += -value
      expencesList.appendChild(li)
    } else {
      // income
      incomeList.appendChild(li)
      incomeSum += value
    }
  }
  //   console.log(incomeSum)
  //   console.log(expencesSum)
  budgetSum.textContent = (incomeSum - expencesSum).toFixed(2)
  budgetSumIncome.textContent = incomeSum.toFixed(2)
  budgetSumExpences.textContent = (-expencesSum).toFixed(2)
  // percent
  Array.from(incomeList.children).forEach(li => {
    li.querySelectorAll('div')[0].textContent =
      ((+li.querySelectorAll('span')[1].innerText * 100) / incomeSum).toFixed(
        1
      ) + ' %'
  })
  Array.from(expencesList.children).forEach(li => {
    li.querySelectorAll('div')[0].textContent =
      ((-li.querySelectorAll('span')[1].innerText * 100) / expencesSum).toFixed(
        1
      ) + ' %'
  })
}

// add to budget
const formBudgetAddClicked = event => {
  event.preventDefault()
  // check
  let desc = formBudgetDesc.value
  let value = +formBudgetValue.value
  if (desc === '' || value === NaN || value === 0) return
  addMonthData(+monthSelect.value, {
    desc: desc,
    value: formBudgetSign.value + value
  })
  formBudgetDesc.value = ''
  formBudgetValue.value = ''
  refreshUI()
}

// month has changed
const monthChanged = event => {
  refreshUI()
}

// init
const date = new Date()
monthSelect.value = date.getMonth() + 1
refreshUI()

formBudgetAdd.addEventListener('click', formBudgetAddClicked)
monthSelect.addEventListener('input', monthChanged)
