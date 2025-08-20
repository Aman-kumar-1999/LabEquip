export interface Product {
    id: string;
    name: string;
    category: string;
    brand: string;
    priceRetail: number;
    priceInstitutional: number;
    stockStatus: string;
    purity: string | null;
    imageUrl: string;
}

export const products: Product[] = [{
    id: 'P-1001',
    name: 'Zeiss Axio Lab.A1 Microscope',
    category: 'Microscopes',
    brand: 'Zeiss',
    priceRetail: 2999,
    priceInstitutional: 2699,
    stockStatus: 'In Stock',
    purity: null,
    imageUrl: 'assets/default_product_image_for_micr_1_80ec5141.jpg'
}, {
    id: 'P-1002',
    name: 'Nikon Eclipse E200 Microscope',
    category: 'Microscopes',
    brand: 'Nikon',
    priceRetail: 2499,
    priceInstitutional: 2249,
    stockStatus: 'In Stock',
    purity: null,
    imageUrl: 'assets/default_product_image_for_micr_2_bca2f49a.jpg'
}, {
    id: 'P-1003',
    name: 'Olympus CX23 Microscope',
    category: 'Microscopes',
    brand: 'Olympus',
    priceRetail: 1999,
    priceInstitutional: 1799,
    stockStatus: 'Out of Stock',
    purity: null,
    imageUrl: 'assets/default_product_image_for_micr_3_4700d789.jpg'
}, {
    id: 'P-2001',
    name: 'AcmeChem Sodium Chloride (NaCl)',
    category: 'Reagents',
    brand: 'AcmeChem',
    priceRetail: 45,
    priceInstitutional: 39,
    stockStatus: 'In Stock',
    purity: '98%',
    imageUrl: 'assets/category_banner_for_reagents___1_3220ddae.jpg'
}, {
    id: 'P-2002',
    name: 'AcmeChem Ethanol (Analytical Grade)',
    category: 'Reagents',
    brand: 'AcmeChem',
    priceRetail: 89,
    priceInstitutional: 79,
    stockStatus: 'In Stock',
    purity: '95%',
    imageUrl: 'assets/category_banner_for_reagents___2_868c8f75.jpg'
}, {
    id: 'P-2003',
    name: 'UltraPure Water (HPLC Grade)',
    category: 'Reagents',
    brand: 'AcmeChem',
    priceRetail: 120,
    priceInstitutional: 105,
    stockStatus: 'In Stock',
    purity: '99.9%',
    imageUrl: 'assets/category_banner_for_microscopy_1_015320f9.jpg'
}, {
    id: 'P-1004',
    name: 'Zeiss Stemi 305 Stereo Microscope',
    category: 'Microscopes',
    brand: 'Zeiss',
    priceRetail: 3299,
    priceInstitutional: 2950,
    stockStatus: 'In Stock',
    purity: null,
    imageUrl: 'assets/category_banner_for_microscopy_2_45b7d467.jpg'
}, {
    id: 'P-1005',
    name: 'Nikon SMZ445 Stereo Microscope',
    category: 'Microscopes',
    brand: 'Nikon',
    priceRetail: 1899,
    priceInstitutional: 1699,
    stockStatus: 'In Stock',
    purity: null,
    imageUrl: 'assets/category_banner_for_microscopy_3_40d7c381.jpg'
}, {
    id: 'P-3001',
    name: 'Olympus Immersion Oil',
    category: 'Reagents',
    brand: 'Olympus',
    priceRetail: 39,
    priceInstitutional: 34,
    stockStatus: 'In Stock',
    purity: '98%',
    imageUrl: 'assets/category_banner_for_reagents___1_3220ddae.jpg'
}, {
    id: 'P-3002',
    name: 'Zeiss Lens Cleaning Solution',
    category: 'Reagents',
    brand: 'Zeiss',
    priceRetail: 25,
    priceInstitutional: 22,
    stockStatus: 'In Stock',
    purity: '95%',
    imageUrl: 'assets/category_banner_for_reagents___2_868c8f75.jpg'
}, {
    id: 'P-3003',
    name: 'Olympus Stage Micrometer',
    category: 'Microscopes',
    brand: 'Olympus',
    priceRetail: 210,
    priceInstitutional: 189,
    stockStatus: 'In Stock',
    purity: null,
    imageUrl: 'assets/default_product_image_for_micr_1_80ec5141.jpg'
}, {
    id: 'P-4001',
    name: 'Zeiss Cover Slips Pack',
    category: 'Reagents',
    brand: 'Zeiss',
    priceRetail: 18,
    priceInstitutional: 16,
    stockStatus: 'In Stock',
    purity: '99.9%',
    imageUrl: 'assets/default_product_image_for_micr_2_bca2f49a.jpg'
}];
