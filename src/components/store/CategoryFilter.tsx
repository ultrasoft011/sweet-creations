import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/src/components/common/ThemedText';
import { ThemedView } from '@/src/components/common/ThemedView';
import { StoreCategory } from '@/src/types/store';
import { SPACING, FONT_SIZES, BORDER_RADIUS } from '@/src/constants/Styles';

interface CategoryFilterProps {
  categories: StoreCategory[];
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

export function CategoryFilter({ categories, selectedCategory, onCategorySelect }: CategoryFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      style={styles.scrollView}
    >
      {categories.map((category) => {
        const isSelected = selectedCategory === category.id;
        
        return (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryButton}
            onPress={() => onCategorySelect(category.id)}
            activeOpacity={0.7}
          >
            <ThemedView
              style={[
                styles.categoryContent,
                isSelected && styles.selectedCategoryContent,
              ]}
            >
              <ThemedText style={styles.categoryIcon}>{category.icon}</ThemedText>
              <ThemedText
                style={[
                  styles.categoryText,
                  isSelected && styles.selectedCategoryText,
                ]}
              >
                {category.name}
              </ThemedText>
            </ThemedView>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 0,
  },
  container: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  categoryButton: {
    marginRight: SPACING.sm,
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: 'transparent',
  },
  selectedCategoryContent: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryIcon: {
    fontSize: FONT_SIZES.md,
    marginRight: SPACING.xs,
  },
  categoryText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#fff',
    fontWeight: '600',
  },
});
