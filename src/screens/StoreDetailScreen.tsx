import React, { useState } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  View, 
  Image, 
  TouchableOpacity, 
  FlatList,
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/src/components/common/ThemedText';
import { ThemedView } from '@/src/components/common/ThemedView';
import { Store, MenuItem, MenuCategory } from '@/src/types/store';
import { SPACING, FONT_SIZES, BORDER_RADIUS } from '@/src/constants/Styles';

interface StoreDetailScreenProps {
  store: Store;
  onBack: () => void;
}

export default function StoreDetailScreen({ store, onBack }: StoreDetailScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState(store.menu?.[0]?.id || '');
  const [cart, setCart] = useState<{[key: string]: number}>({});

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const addToCart = (item: MenuItem) => {
    setCart(prev => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1
    }));
    Alert.alert('Agregado', `${item.name} agregado al carrito`);
  };

  const getCartTotal = () => {
    if (!store.menu) return 0;
    let total = 0;
    store.menu.forEach(category => {
      category.items.forEach(item => {
        if (cart[item.id]) {
          total += item.price * cart[item.id];
        }
      });
    });
    return total;
  };

  const getCartItemsCount = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <TouchableOpacity 
      style={[styles.menuItem, !item.isAvailable && styles.unavailableItem]}
      onPress={() => item.isAvailable && addToCart(item)}
      disabled={!item.isAvailable}
    >
      <Image source={{ uri: item.image }} style={styles.menuItemImage} />
      <View style={styles.menuItemInfo}>
        <View style={styles.menuItemHeader}>
          <ThemedText type="defaultSemiBold" style={styles.menuItemName}>
            {item.name}
          </ThemedText>
          {item.isPopular && (
            <View style={styles.popularBadge}>
              <ThemedText style={styles.popularText}>Popular</ThemedText>
            </View>
          )}
        </View>
        
        <ThemedText style={styles.menuItemDescription} numberOfLines={2}>
          {item.description}
        </ThemedText>

        {item.preparationTime && (
          <ThemedText style={styles.preparationTime}>
            ⏱️ {item.preparationTime}
          </ThemedText>
        )}

        {item.allergens && item.allergens.length > 0 && (
          <ThemedText style={styles.allergens}>
            ⚠️ Contiene: {item.allergens.join(', ')}
          </ThemedText>
        )}

        <View style={styles.menuItemFooter}>
          <ThemedText type="defaultSemiBold" style={styles.menuItemPrice}>
            {formatPrice(item.price)}
          </ThemedText>
          {cart[item.id] && (
            <View style={styles.cartQuantity}>
              <ThemedText style={styles.cartQuantityText}>
                {cart[item.id]}
              </ThemedText>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryTab = (category: MenuCategory) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryTab,
        selectedCategory === category.id && styles.selectedCategoryTab
      ]}
      onPress={() => setSelectedCategory(category.id)}
    >
      <ThemedText style={styles.categoryIcon}>{category.icon}</ThemedText>
      <ThemedText 
        style={[
          styles.categoryName,
          selectedCategory === category.id && styles.selectedCategoryName
        ]}
      >
        {category.name}
      </ThemedText>
    </TouchableOpacity>
  );

  const selectedCategoryData = store.menu?.find(cat => cat.id === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <ThemedText type="defaultSemiBold" style={styles.headerTitle}>
            {store.name}
          </ThemedText>
          <View style={styles.headerRight} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Store Image */}
          <View style={styles.imageContainer}>
            <Image source={{ uri: store.image }} style={styles.storeImage} />
            {!store.isOpen && (
              <View style={styles.closedOverlay}>
                <ThemedText style={styles.closedText}>Cerrado</ThemedText>
              </View>
            )}
          </View>

          {/* Store Info */}
          <View style={styles.storeInfo}>
            <View style={styles.storeHeader}>
              <ThemedText type="title" style={styles.storeName}>
                {store.name}
              </ThemedText>
              <View style={styles.ratingContainer}>
                <ThemedText style={styles.rating}>⭐ {store.rating}</ThemedText>
                <ThemedText style={styles.reviewCount}>
                  ({store.totalReviews || 0} reseñas)
                </ThemedText>
              </View>
            </View>

            <ThemedText style={styles.storeDescription}>
              {store.description}
            </ThemedText>

            {/* Store Details */}
            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <ThemedText style={styles.detailLabel}>🚚 Tiempo de entrega:</ThemedText>
                <ThemedText style={styles.detailValue}>{store.deliveryTime}</ThemedText>
              </View>
              <View style={styles.detailRow}>
                <ThemedText style={styles.detailLabel}>💰 Costo de envío:</ThemedText>
                <ThemedText style={styles.detailValue}>
                  {store.deliveryFee === 0 ? 'Gratis' : formatPrice(store.deliveryFee)}
                </ThemedText>
              </View>
              <View style={styles.detailRow}>
                <ThemedText style={styles.detailLabel}>📍 Distancia:</ThemedText>
                <ThemedText style={styles.detailValue}>{store.distance}</ThemedText>
              </View>
              {store.minimumOrder && (
                <View style={styles.detailRow}>
                  <ThemedText style={styles.detailLabel}>🛒 Pedido mínimo:</ThemedText>
                  <ThemedText style={styles.detailValue}>
                    {formatPrice(store.minimumOrder)}
                  </ThemedText>
                </View>
              )}
            </View>

            {/* Contact Info */}
            {(store.address || store.phone) && (
              <View style={styles.contactContainer}>
                <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
                  Información de contacto
                </ThemedText>
                {store.address && (
                  <View style={styles.contactRow}>
                    <ThemedText style={styles.contactLabel}>📍 Dirección:</ThemedText>
                    <ThemedText style={styles.contactValue}>{store.address}</ThemedText>
                  </View>
                )}
                {store.phone && (
                  <View style={styles.contactRow}>
                    <ThemedText style={styles.contactLabel}>📞 Teléfono:</ThemedText>
                    <ThemedText style={styles.contactValue}>{store.phone}</ThemedText>
                  </View>
                )}
              </View>
            )}

            {/* Menu Section */}
            {store.menu && store.menu.length > 0 && (
              <View style={styles.menuContainer}>
                <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
                  Menú
                </ThemedText>

                {/* Category Tabs */}
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  style={styles.categoryTabs}
                >
                  {store.menu.map(renderCategoryTab)}
                </ScrollView>

                {/* Menu Items */}
                {selectedCategoryData && (
                  <FlatList
                    data={selectedCategoryData.items}
                    renderItem={renderMenuItem}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={false}
                    style={styles.menuList}
                  />
                )}
              </View>
            )}
          </View>
        </ScrollView>

        {/* Cart Summary */}
        {getCartItemsCount() > 0 && (
          <View style={styles.cartSummary}>
            <View style={styles.cartInfo}>
              <ThemedText style={styles.cartItems}>
                {getCartItemsCount()} productos
              </ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.cartTotal}>
                {formatPrice(getCartTotal())}
              </ThemedText>
            </View>
            <TouchableOpacity 
              style={styles.cartButton}
              onPress={() => Alert.alert('Carrito', 'Funcionalidad de carrito próximamente')}
            >
              <ThemedText style={styles.cartButtonText}>Ver Carrito</ThemedText>
            </TouchableOpacity>
          </View>
        )}
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: SPACING.xs,
  },
  headerTitle: {
    fontSize: FONT_SIZES.lg,
  },
  headerRight: {
    width: 40,
  },
  imageContainer: {
    position: 'relative',
    height: 200,
  },
  storeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  closedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closedText: {
    color: '#fff',
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
  },
  storeInfo: {
    padding: SPACING.md,
  },
  storeHeader: {
    marginBottom: SPACING.sm,
  },
  storeName: {
    fontSize: FONT_SIZES.xxl,
    marginBottom: SPACING.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    marginRight: SPACING.xs,
  },
  reviewCount: {
    fontSize: FONT_SIZES.sm,
    opacity: 0.7,
  },
  storeDescription: {
    fontSize: FONT_SIZES.md,
    opacity: 0.8,
    marginBottom: SPACING.lg,
    lineHeight: 22,
  },
  detailsContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  detailLabel: {
    fontSize: FONT_SIZES.sm,
    flex: 1,
  },
  detailValue: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    textAlign: 'right',
  },
  contactContainer: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    marginBottom: SPACING.md,
  },
  contactRow: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
  },
  contactLabel: {
    fontSize: FONT_SIZES.sm,
    width: 100,
  },
  contactValue: {
    fontSize: FONT_SIZES.sm,
    flex: 1,
  },
  menuContainer: {
    marginBottom: SPACING.xl,
  },
  categoryTabs: {
    marginBottom: SPACING.md,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginRight: SPACING.sm,
    backgroundColor: '#f0f0f0',
    borderRadius: BORDER_RADIUS.lg,
  },
  selectedCategoryTab: {
    backgroundColor: '#007bff',
  },
  categoryIcon: {
    fontSize: FONT_SIZES.md,
    marginRight: SPACING.xs,
  },
  categoryName: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
  },
  selectedCategoryName: {
    color: '#fff',
  },
  menuList: {
    marginTop: SPACING.sm,
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  unavailableItem: {
    opacity: 0.5,
  },
  menuItemImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: BORDER_RADIUS.md,
    borderBottomLeftRadius: BORDER_RADIUS.md,
    resizeMode: 'cover',
  },
  menuItemInfo: {
    flex: 1,
    padding: SPACING.md,
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.xs,
  },
  menuItemName: {
    fontSize: FONT_SIZES.md,
    flex: 1,
    marginRight: SPACING.sm,
  },
  popularBadge: {
    backgroundColor: '#ff6b35',
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  popularText: {
    color: '#fff',
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
  menuItemDescription: {
    fontSize: FONT_SIZES.sm,
    opacity: 0.7,
    marginBottom: SPACING.xs,
    lineHeight: 18,
  },
  preparationTime: {
    fontSize: FONT_SIZES.xs,
    opacity: 0.8,
    marginBottom: SPACING.xs,
  },
  allergens: {
    fontSize: FONT_SIZES.xs,
    color: '#ff6b35',
    marginBottom: SPACING.xs,
  },
  menuItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemPrice: {
    fontSize: FONT_SIZES.md,
    color: '#007bff',
  },
  cartQuantity: {
    backgroundColor: '#007bff',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartQuantityText: {
    color: '#fff',
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
  cartSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cartInfo: {
    flex: 1,
  },
  cartItems: {
    fontSize: FONT_SIZES.sm,
    opacity: 0.7,
  },
  cartTotal: {
    fontSize: FONT_SIZES.lg,
    color: '#007bff',
  },
  cartButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  cartButtonText: {
    color: '#fff',
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
});
