// NOTE: Содержит фукнции для сохранения Напитков

/** Данные о напитке */
export interface Beverage {
  id: number,
  name: string,
  abv: number,
  ibu: number,
  image_url: string,
  description: string,
  first_brewed: string,
  tagline: string
}

/** Загружает напитки для выбранной страницы. Возвращает пустой массив при ошибке API */
export async function getBeverages(pageID: number): Promise<Beverage[]> {
  const perPage = 5

  const res = await fetch(`https://api.punkapi.com/v2/beers?page=${pageID}&per_page=${perPage}`)

  if (!res.ok) {
    console.error(`An error has occured: ${res.status}`)
    return []
  }
  return await res.json()
}

/** Загружает выбранный напиток. Возвращает undefined при ошибке API */
export async function getBeverage(beverageID: number): Promise<Beverage | undefined> {
  const res = await fetch(`https://api.punkapi.com/v2/beers/${beverageID}`)

  if (!res.ok) {
    console.error(`An error has occured: ${res.status}`)
    return undefined
  }

  const data = await res.json()

  return data[0]
}

/** Возвращает все напитки, ограниченные лимитом. Возвращает пустой массив при ошибке API */
export async function getAllBeverages(): Promise<Beverage[]> {
  const n_max = 15

  const res = await fetch(`https://api.punkapi.com/v2/beers?page=1&per_page=${n_max}`)

  if (!res.ok) {
    console.error(`An error has occured: ${res.status}`)
    return []
  }
  return await res.json()
}