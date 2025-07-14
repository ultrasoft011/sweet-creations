import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  DocumentData,
  QuerySnapshot
} from 'firebase/firestore';
import { db } from '@/src/config/firebase';
import { Store, StoreCategory } from '@/src/types/store';

// Nombre de las colecciones en Firestore
const STORES_COLLECTION = 'stores';
const CATEGORIES_COLLECTION = 'storeCategories';

export class StoreService {
  // Obtener todas las tiendas
  static async getAllStores(): Promise<Store[]> {
    try {
      const storesCollection = collection(db, STORES_COLLECTION);
      const storesSnapshot = await getDocs(storesCollection);
      
      const stores: Store[] = [];
      storesSnapshot.forEach((doc) => {
        stores.push({
          id: doc.id,
          ...doc.data()
        } as Store);
      });
      
      return stores;
    } catch (error) {
      console.error('Error fetching stores:', error);
      throw new Error('No se pudieron cargar las tiendas');
    }
  }

  // Obtener una tienda por ID
  static async getStoreById(storeId: string): Promise<Store | null> {
    try {
      const storeDoc = doc(db, STORES_COLLECTION, storeId);
      const storeSnapshot = await getDoc(storeDoc);
      
      if (storeSnapshot.exists()) {
        return {
          id: storeSnapshot.id,
          ...storeSnapshot.data()
        } as Store;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching store:', error);
      throw new Error('No se pudo cargar la tienda');
    }
  }

  // Obtener tiendas por categoría
  static async getStoresByCategory(category: string): Promise<Store[]> {
    try {
      const storesCollection = collection(db, STORES_COLLECTION);
      const q = query(
        storesCollection, 
        where('category', '==', category),
        orderBy('rating', 'desc')
      );
      
      const storesSnapshot = await getDocs(q);
      
      const stores: Store[] = [];
      storesSnapshot.forEach((doc) => {
        stores.push({
          id: doc.id,
          ...doc.data()
        } as Store);
      });
      
      return stores;
    } catch (error) {
      console.error('Error fetching stores by category:', error);
      throw new Error('No se pudieron cargar las tiendas de esta categoría');
    }
  }

  // Buscar tiendas por nombre o descripción
  static async searchStores(searchTerm: string): Promise<Store[]> {
    try {
      // Nota: Firestore no tiene búsqueda de texto completo nativa
      // Esta es una implementación básica que busca por nombre
      const storesCollection = collection(db, STORES_COLLECTION);
      const storesSnapshot = await getDocs(storesCollection);
      
      const stores: Store[] = [];
      const searchTermLower = searchTerm.toLowerCase();
      
      storesSnapshot.forEach((doc) => {
        const storeData = doc.data() as Store;
        const storeName = storeData.name.toLowerCase();
        const storeDescription = storeData.description.toLowerCase();
        const storeSpecialties = storeData.specialties.join(' ').toLowerCase();
        
        if (
          storeName.includes(searchTermLower) ||
          storeDescription.includes(searchTermLower) ||
          storeSpecialties.includes(searchTermLower)
        ) {
          stores.push({
            ...storeData,
            id: doc.id
          });
        }
      });
      
      return stores;
    } catch (error) {
      console.error('Error searching stores:', error);
      throw new Error('Error en la búsqueda');
    }
  }

  // Obtener tiendas abiertas
  static async getOpenStores(): Promise<Store[]> {
    try {
      const storesCollection = collection(db, STORES_COLLECTION);
      const q = query(
        storesCollection, 
        where('isOpen', '==', true),
        orderBy('rating', 'desc')
      );
      
      const storesSnapshot = await getDocs(q);
      
      const stores: Store[] = [];
      storesSnapshot.forEach((doc) => {
        stores.push({
          id: doc.id,
          ...doc.data()
        } as Store);
      });
      
      return stores;
    } catch (error) {
      console.error('Error fetching open stores:', error);
      throw new Error('No se pudieron cargar las tiendas abiertas');
    }
  }

  // Agregar una nueva tienda (para administradores)
  static async addStore(storeData: Omit<Store, 'id'>): Promise<string> {
    try {
      const storesCollection = collection(db, STORES_COLLECTION);
      const docRef = await addDoc(storesCollection, storeData);
      return docRef.id;
    } catch (error) {
      console.error('Error adding store:', error);
      throw new Error('No se pudo agregar la tienda');
    }
  }

  // Actualizar una tienda
  static async updateStore(storeId: string, storeData: Partial<Store>): Promise<void> {
    try {
      const storeDoc = doc(db, STORES_COLLECTION, storeId);
      await updateDoc(storeDoc, storeData);
    } catch (error) {
      console.error('Error updating store:', error);
      throw new Error('No se pudo actualizar la tienda');
    }
  }

  // Eliminar una tienda
  static async deleteStore(storeId: string): Promise<void> {
    try {
      const storeDoc = doc(db, STORES_COLLECTION, storeId);
      await deleteDoc(storeDoc);
    } catch (error) {
      console.error('Error deleting store:', error);
      throw new Error('No se pudo eliminar la tienda');
    }
  }

  // Obtener categorías de tiendas
  static async getStoreCategories(): Promise<StoreCategory[]> {
    try {
      const categoriesCollection = collection(db, CATEGORIES_COLLECTION);
      const categoriesSnapshot = await getDocs(categoriesCollection);
      
      const categories: StoreCategory[] = [];
      categoriesSnapshot.forEach((doc) => {
        categories.push({
          id: doc.id,
          ...doc.data()
        } as StoreCategory);
      });
      
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('No se pudieron cargar las categorías');
    }
  }

  // Función para inicializar datos de ejemplo (solo para desarrollo)
  static async initializeExampleData(): Promise<void> {
    try {
      // Esta función se puede usar para poblar Firestore con datos de ejemplo
      console.log('Inicializando datos de ejemplo...');
      // Implementar según sea necesario
    } catch (error) {
      console.error('Error initializing example data:', error);
      throw new Error('No se pudieron inicializar los datos de ejemplo');
    }
  }
}

export default StoreService;
