import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../../types/Product";

// Fetch products from the Fake Store API
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get<Product[]>(
      "https://fakestoreapi.com/products"
    );
    return response.data;
  }
);

interface Filters {
  category: string;
  priceRange: [number, number];
  brand: string;
  searchQuery: string;
}

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  filters: Filters;
  status: "idle" | "loading" | "failed";
}

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  filters: {
    category: "all",
    priceRange: [0, 1000],
    brand: "all",
    searchQuery: "",
  },
  status: "idle",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.filters.category = action.payload;
      state.filteredProducts = applyFilters(state.products, state.filters);
    },
    setPriceFilter: (state, action: PayloadAction<[number, number]>) => {
      state.filters.priceRange = action.payload;
      state.filteredProducts = applyFilters(state.products, state.filters);
    },
    setBrandFilter: (state, action: PayloadAction<string>) => {
      state.filters.brand = action.payload;
      state.filteredProducts = applyFilters(state.products, state.filters);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filters.searchQuery = action.payload;
      state.filteredProducts = applyFilters(state.products, state.filters);
    },
    setSortOption: (state, action: PayloadAction<string>) => {
      state.filteredProducts = sortProducts(
        state.filteredProducts,
        action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// Helper function to filter products
const applyFilters = (products: Product[], filters: Filters): Product[] => {
  return products.filter((product) => {
    const matchCategory =
      filters.category === "all" || product.category === filters.category;
    const matchPrice =
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1];
    const matchBrand =
      filters.brand === "all" ||
      product.title.toLowerCase().includes(filters.brand.toLowerCase());
    const matchSearchQuery =
      filters.searchQuery === "" ||
      product.title.toLowerCase().includes(filters.searchQuery.toLowerCase());

    return matchCategory && matchPrice && matchBrand && matchSearchQuery;
  });
};

// Helper function to sort products
// src/redux/slices/productSlice.ts
const sortProducts = (products: Product[], option: string): Product[] => {
  if (option === "price-asc") {
    return [...products].sort((a, b) => a.price - b.price);
  } else if (option === "price-desc") {
    return [...products].sort((a, b) => b.price - a.price);
  } else if (option === "popularity") {
    // Sort by rating rate (descending)
    return [...products].sort((a, b) => b.rating.rate - a.rating.rate);
  } else {
    return products;
  }
};

export const {
  setCategoryFilter,
  setPriceFilter,
  setBrandFilter,
  setSearchQuery,
  setSortOption,
} = productSlice.actions;
export default productSlice.reducer;
