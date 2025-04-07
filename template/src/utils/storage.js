export const getItem = name => {
    console.log('get',name)
    const data = sessionStorage.getItem(name)
    try {
      return JSON.parse(data)
    } catch (err) {
      return data
    }
  }
  
  export const setItem = (name, value) => {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
  
    sessionStorage.setItem(name, value)
  }
  
  export const removeItem = name => {
    console.log('remove',name)
    sessionStorage.removeItem(name)
  }
  