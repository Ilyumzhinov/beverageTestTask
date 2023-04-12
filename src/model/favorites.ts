// NOTE: Содержит фукнции для сохранения Избранных элементов

import { Beverage, getAllBeverages } from "./beverages"

/** Возвращает ID напитков из storage API */
function getIDs(): Set<number> {
    return new Set(JSON.parse(localStorage.getItem('favorites') ?? '[]'))
}

/** Возвращает все избранные напитки */
async function getFavorites(): Promise<Beverage[]> {
    const ids = getIDs()

    const beverages = await getAllBeverages()

    return beverages.filter(b => ids.has(b.id))
}

/** Созраняет ID напитка в storage API */
function saveFavorite(id: number): void {
    const favorites: Set<number> = getIDs()

    favorites.add(id)

    localStorage.setItem('favorites', JSON.stringify([...favorites]))
}

/** Удаляет напиток из storage API */
function deleteFavorite(id: number): void {
    const favorites = getIDs()

    favorites.delete(id)

    localStorage.setItem('favorites', JSON.stringify([...favorites]))
}

/** Проверяет добавлен ли напиток с ID в список избранных */
function isFavorite(id: number): boolean {
    const favorites = getIDs()

    return favorites.has(id)
}

export const Favorites = {
    get: getFavorites,
    save: saveFavorite,
    delete: deleteFavorite,
    has: isFavorite
}