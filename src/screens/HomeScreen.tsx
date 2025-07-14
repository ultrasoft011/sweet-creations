import React, { useState, useMemo } from 'react';
import { StyleSheet, FlatList, View, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/src/components/common/ThemedText';
import { ThemedView } from '@/src/components/common/ThemedView';
import { StoreCard } from '@/src/components/store/StoreCard';
import { CategoryFilter } from '@/src/components/store/CategoryFilter';
import { mockStores, storeCategories } from '@/src/data/mockStores';
import { Store } from '@/src/types/store';
import { SPACING, FONT_SIZES } from '@/src/constants/Styles';

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('1'); // '1' es "Todas"
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrar tiendas por categoría y búsqueda
  const filteredStores = useMemo(() => {
    let filtered = mockStores;

    // Filtrar por categoría
    if (selectedCategory !== '1') { // '1' es "Todas"
      const categoryName = storeCategories.find(cat => cat.id === selectedCategory)?.name.toLowerCase();
      if (categoryName) {
        filtered = filtered.filter(store => 
          store.category === categoryName || 
          store.category === categoryName.slice(0, -1) + 'ía' // Para manejar plural/singular
        );
      }
    }

    // Filtrar por búsqueda
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(store =>
        store.name.toLowerCase().includes(query) ||
        store.description.toLowerCase().includes(query) ||
        store.specialties.some((specialty: string) => specialty.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  const handleStorePress = (store: Store) => {
    Alert.alert(
      store.name,
      `¡Pronto podrás ver el menú de ${store.name}!`,
      [{ text: 'OK' }]
    );
  };

  const renderStoreItem = ({ item }: { item: Store }) => (
    <StoreCard store={item} onPress={handleStorePress} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            Sweet Creations 🧁
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Descubre las mejores reposterías cerca de ti
          </ThemedText>
        </View>

        {/* Barra de búsqueda */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar tiendas, postres..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>

        {/* Filtros de categoría */}
        <CategoryFilter
          categories={storeCategories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        {/* Lista de tiendas */}
        <FlatList
          data={filteredStores}
          renderItem={renderStoreItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <ThemedText style={styles.emptyText}>
                No se encontraron tiendas que coincidan con tu búsqueda
              </ThemedText>
            </View>
          }
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    opacity: 0.7,
  },
  searchContainer: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: FONT_SIZES.md,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  listContainer: {
    paddingBottom: SPACING.xl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
    paddingHorizontal: SPACING.md,
  },
  emptyText: {
    fontSize: FONT_SIZES.md,
    textAlign: 'center',
    opacity: 0.6,
  },
});
