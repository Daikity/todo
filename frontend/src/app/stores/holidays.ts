import { ref, computed, inject } from 'vue'
import { defineStore } from 'pinia'
import type { AxiosStatic } from "axios";
import type { Owner, Guest, RoleGuest } from "@/app/models/interfaces";

export const useHolidaysStore = defineStore('Holidays', () => {
  const api = inject<AxiosStatic>("$api");
  const title = ref<string | null>(null)
  const ownersData = ref<Owner[]>([]);
  const guestsData = ref<Guest[]>([]);
  
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

  const getRole = (id: string): RoleGuest | undefined => {
    return rolesGuest.find((role: RoleGuest) => role.id === id);
  };

  const setHoliday = (newTitle: string): void => {
    title.value = newTitle
  }

  return { owners, guests, rolesGuest, titleHoliday, getRole, setHoliday }
})
