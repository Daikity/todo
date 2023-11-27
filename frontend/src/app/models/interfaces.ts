export interface ApiResult {
    code: number
    title: string
    field: string
    message: string
    result?: any
    dataError?: any
}

/**
 * Guest
 * @id - id of the guest
 * @owner_id - id of the owner
 * @priority - priority of the invitation
 * @name - name of the guest
 * @is_adult - is adult (over 18 years old)
 * @role - role of the guest
 * @sex - gender of the guest
 * @max_drink - maximum allowed drink
 * @after_drink - multiplier of the state after drinking
 * @max_can_meal - maximum allowed meal
 */
export interface Guest {
    id: string
    owner_id: string
    priority: number
    is_adult: boolean
    name: string
    role: RoleGuest
    sex: 'male' | 'female'
    family_id?: Guest
    max_drink: number
    after_drink: number
    max_can_meal: number
}

/**
 * Owner
 * @id - id of the owner
 * @name - name of the owner
 * @sex - gender of the owner
 * @max_drink - maximum allowed drink
 * @max_can_meal - maximum allowed meal
 * @after_drink - multiplier of the state after drinking
 */
export interface Owner {
    id: string
    name: string
    sex: 'male' | 'female'
    max_drink: number 
    after_drink: number
    max_can_meal: number
}

export interface RoleGuest {
    id: string
    name: string
    importance: number
}

export interface FamilyGuest {
    id: string
    role: RoleGuest
    data: Guest
}

export interface Leisure {
    id: string
    title: string
    time: number
    description: string
    maxPeoples: number
}

export interface Gifts {
    id: string
    title: string
    cost: number
    description: string
}

export interface Drinks {
    id: string
    title: string
    cost: number
    volume: number
    alcohol: string
    alcoholExposure: number
}

export interface Products {
    id: string
    title: string
    cost: number
    weight: number
    description?: string
}

export interface Dishes {
    id: string
    title: string
    quantity: number
    showRecept: boolean
    products: DishesProducts[]
    receptProduct?: Products[]
    cost?: number
    weight: number
    recept: string
}

export interface DishesProducts {
    productId: string
    weight: number
    quantity: number
}