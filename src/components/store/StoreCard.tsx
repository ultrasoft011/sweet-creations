import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ThemedText } from '@/src/components/common/ThemedText';
import { ThemedView } from '@/src/components/common/ThemedView';
import { Store } from '@/src/types/store';
import { SPACING, FONT_SIZES, BORDER_RADIUS } from '@/src/constants/Styles';

interface StoreCardProps {
  store: Store;
  onPress: (store: Store) => void;
}

export function StoreCard({ store, onPress }: StoreCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(store)}
      activeOpacity={0.8}
    >
      <ThemedView style={styles.card}>
        {/* Imagen de la tienda */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: store.image }} style={styles.image} />
          {!store.isOpen && (
            <View style={styles.closedOverlay}>
              <ThemedText style={styles.closedText}>Cerrado</ThemedText>
            </View>
          )}
        </View>

        {/* Información de la tienda */}
        <View style={styles.infoContainer}>
          <View style={styles.headerRow}>
            <ThemedText type="defaultSemiBold" style={styles.storeName}>
              {store.name}
            </ThemedText>
            <View style={styles.ratingContainer}>
              <ThemedText style={styles.rating}>⭐ {store.rating}</ThemedText>
            </View>
          </View>

          <ThemedText style={styles.description} numberOfLines={2}>
            {store.description}
          </ThemedText>

          {/* Especialidades */}
          <View style={styles.specialtiesContainer}>
            {store.specialties.slice(0, 2).map((specialty, index) => (
              <View key={index} style={styles.specialtyTag}>
                <ThemedText style={styles.specialtyText}>{specialty}</ThemedText>
              </View>
            ))}
            {store.specialties.length > 2 && (
              <ThemedText style={styles.moreSpecialties}>
                +{store.specialties.length - 2} más
              </ThemedText>
            )}
          </View>

          {/* Información de entrega */}
          <View style={styles.deliveryRow}>
            <View style={styles.deliveryInfo}>
              <ThemedText style={styles.deliveryText}>🚚 {store.deliveryTime}</ThemedText>
              <ThemedText style={styles.deliveryText}>📍 {store.distance}</ThemedText>
            </View>
            <View style={styles.feeContainer}>
              <ThemedText style={styles.deliveryFee}>
                {store.deliveryFee === 0 ? 'Gratis' : formatPrice(store.deliveryFee)}
              </ThemedText>
            </View>
          </View>

          {store.minimumOrder && (
            <ThemedText style={styles.minimumOrder}>
              Pedido mínimo: {formatPrice(store.minimumOrder)}
            </ThemedText>
          )}
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  card: {
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    height: 160,
  },
  image: {
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
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: SPACING.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  storeName: {
    flex: 1,
    fontSize: FONT_SIZES.lg,
    marginRight: SPACING.sm,
  },
  ratingContainer: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
  },
  rating: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  description: {
    fontSize: FONT_SIZES.sm,
    opacity: 0.7,
    marginBottom: SPACING.sm,
    lineHeight: 20,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  specialtyTag: {
    backgroundColor: '#e8f4fd',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
    marginRight: SPACING.xs,
    marginBottom: 4,
  },
  specialtyText: {
    fontSize: FONT_SIZES.xs,
    color: '#0066cc',
    fontWeight: '500',
  },
  moreSpecialties: {
    fontSize: FONT_SIZES.xs,
    color: '#666',
    fontStyle: 'italic',
  },
  deliveryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  deliveryInfo: {
    flex: 1,
  },
  deliveryText: {
    fontSize: FONT_SIZES.sm,
    opacity: 0.8,
    marginBottom: 2,
  },
  feeContainer: {
    alignItems: 'flex-end',
  },
  deliveryFee: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: '#00aa00',
  },
  minimumOrder: {
    fontSize: FONT_SIZES.xs,
    opacity: 0.6,
    fontStyle: 'italic',
  },
});
