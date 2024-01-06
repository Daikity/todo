import { ref, computed, inject } from 'vue'
import { defineStore } from 'pinia'
import type { AxiosStatic } from "axios";
import type { Owner, Guest, RoleGuest, Leisure, Gifts, Drinks, Products, Dishes, DishesProducts } from "@/app/models/interfaces";

export const useHolidaysStore = defineStore('Holidays', () => {
  const api = inject<AxiosStatic>("$api");
  const title = ref<string | null>("Birthday of the daughter")
  const ownersData = ref<Owner[]>([]);
  const guestsData = ref<Guest[]>([]);
  const giftsData = ref<Gifts[]>([]);
  const leisureData = ref<Leisure[]>([]);
  const totalData = ref<number>(0);
  const drinksData = ref<Drinks[]>([]);
  const productsData = ref<Products[]>([
    {
      id: "1",
      title: "Колбаса",
      weight: 1000,
      cost: 400
    },
    {
      id: "2",
      title: "Хлеб",
      weight: 400,
      cost: 50
    }
  ]);
  const dishesData = ref<Dishes[]>([]);
  
  
  const rolesGuest: Array<RoleGuest> = [
    {
      id: "1",
      name: "Mother",
      importance: 1,
    },
    {
      id: "2",
      name: "Father",
      importance: 1,
    },
    {
      id: "3",
      name: "Daughter",
      importance: 1,
    },
    {
      id: "4",
      name: "Friend",
      importance: 2,
    },
    {
      id: "5",
      name: "Child guest",
      importance: 3,
    },
    {
      id: "6",
      name: "Colleague",
      importance: 4,
    },
  ];
  
  const titleHoliday  = computed<string | null>(() => title.value)
  const owners        = computed<Owner[]>(() => ownersData.value);
  const guests        = computed<Guest[]>(() => guestsData.value);
  const gifts         = computed<Gifts[]>(() => giftsData.value);
  const leisure       = computed<Leisure[]>(() => leisureData.value);
  const drinks        = computed<Drinks[]>(() => drinksData.value);
  const products      = computed<Products[]>(() => productsData.value);
  const dishes        = computed<Dishes[]>(() => {
    dishesData.value.forEach((dish: Dishes) => {
      dish.cost = 0
      dish.receptProduct = []
      dish.products.forEach((product: DishesProducts) => {
        const article: Products = productsData.value.find((productData: Products) => productData.id === product.productId) as Products
        if (article) {
          dish.cost =+ Math.ceil(((product.weight / article.weight) * article.cost) * Number(dish.quantity))
          dish.receptProduct?.push(article)
        }
        product.quantity = Math.ceil( (Number(dish.quantity) * product.weight) / article.weight)
      })
    })    
    return dishesData.value
  });
  const total = computed<number>(() => totalData.value);
  
  const holiday = computed(() => {
    return {
      title: titleHoliday.value,
      guests: guests.value,
      owners: owners.value
    }
  })

  const setQuantity = (id: string, quantity: number) => {
    const dish = dishesData.value.find(el => el.id === id)
    if (dish) {
      dish.quantity = Number(dish.quantity) + quantity
    }
  }

  const getRole = (id: string): RoleGuest | undefined => {
    return rolesGuest.find((role: RoleGuest) => role.id === id);
  };

  const getDishesData = async () => {
    const response = await api?.get('dishes')
    if(response){
      dishesData.value = response.data
    }
  };

  getDishesData()

  const setHoliday = (newTitle: string): void => {
    title.value = newTitle
  }

  return { owners, guests, rolesGuest, titleHoliday, holiday, total, dishes, getRole, setHoliday, setQuantity, getDishesData }
})

/**
  gifts
 */