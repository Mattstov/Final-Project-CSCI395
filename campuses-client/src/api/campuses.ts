import type { Campus } from '../types/Campus'
import { API_BASE_URL } from './base'

export async function getCampuses(): Promise<Campus[]> {
  const res = await fetch(`${API_BASE_URL}/campuses`)
  if (!res.ok) throw new Error('Failed to fetch campuses')
  return res.json()
}

export async function getCampus(id: string): Promise<Campus> {
  const res = await fetch(`${API_BASE_URL}/campuses/${id}`)
  if (!res.ok) throw new Error('Failed to fetch campus')
  return res.json()
}

export async function createCampus(data: Omit<Campus, 'id'>): Promise<Campus> {
  const res = await fetch(`${API_BASE_URL}/campuses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create campus')
  return res.json()
}

export async function deleteCampus(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/campuses/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete campus')
}

export async function updateCampus(id: number, data: Omit<Campus, 'id'>): Promise<Campus> {
  const res = await fetch(`${API_BASE_URL}/campuses/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update campus')
  return res.json()
}
